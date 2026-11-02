// language-tutor — server-side speech for TTS fallback lines.
// Chain: cloud TTS first, local Piper second, browser device voice
// last (the browser falls back on its own when /api/speak fails).
// The FSI tape segments stay primary; this only voices lines with
// no segment, plus the drills that speak through playPhrase.
// Zero dependencies: cloud is plain fetch, Piper is a child process
// (same pattern as sherry's src/tts.ts).

import { createHash } from "node:crypto";
import {
  accessSync,
  constants,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const DATA_DIR = join(import.meta.dir, "data");
const CACHE_DIR = join(DATA_DIR, "tts-cache");
const MAX_CHARS = 1000;

export interface TtsPaths {
  bin: string;
  voice: string;
  voiceName: string;
}

/** Resolve binary + voice locations. Env overrides (read per call,
 *  so tests can point at fakes): PIPER_BIN, PIPER_VOICE (voice name,
 *  files live under data/piper/). Default is a neutral Latin
 *  American voice: FSI teaches Latin American Spanish, so the
 *  Mexican voice fits better than the Spain one; swap any time
 *  with PIPER_VOICE (es_ES-davefx-medium, es_AR-daniela-high). */
export function ttsPaths(): TtsPaths {
  const bin = process.env.PIPER_BIN || join(DATA_DIR, "piper", "piper");
  const voiceName = process.env.PIPER_VOICE || "es_MX-ald-medium";
  const voice = join(DATA_DIR, "piper", `${voiceName}.onnx`);
  return { bin, voice, voiceName };
}

/** True when the binary is executable and the voice model + config exist. */
export function isPiperAvailable(): boolean {
  const { bin, voice } = ttsPaths();
  try {
    accessSync(bin, constants.X_OK);
  } catch {
    return false;
  }
  return existsSync(voice) && existsSync(voice + ".json");
}

/** True when a cloud key is configured. The key itself is never
 *  exposed (status reports only presence). */
export function isCloudAvailable(): boolean {
  return !!process.env.TTS_GOOGLE_API_KEY;
}

/** Public status for GET /api/tts/status. Never exposes the key. */
export function getTtsStatus(): { cloud: boolean; piper: boolean; voice: string } {
  return { cloud: isCloudAvailable(), piper: isPiperAvailable(), voice: ttsPaths().voiceName };
}

function clean(text: string): string {
  return text.replace(/\s+/g, " ").trim().slice(0, MAX_CHARS);
}

function isValidWav(wav: Uint8Array): boolean {
  return (
    wav.length > 44 &&
    wav[0] === 0x52 && // R
    wav[1] === 0x49 && // I
    wav[2] === 0x46 && // F
    wav[3] === 0x46 && // F
    wav[8] === 0x57 && // W
    wav[9] === 0x41 && // A
    wav[10] === 0x56 && // V
    wav[11] === 0x45 // E
  );
}

function cachePath(engine: string, voice: string, text: string, ext: string): string {
  const hash = createHash("sha256").update(`${engine}:${voice}:${text}`).digest("hex");
  return join(CACHE_DIR, `${engine}-${voice}-${hash}.${ext}`);
}

function readCache(path: string): Uint8Array | null {
  try {
    return new Uint8Array(readFileSync(path));
  } catch {
    return null;
  }
}

function writeCache(path: string, audio: Uint8Array): void {
  try {
    mkdirSync(CACHE_DIR, { recursive: true });
    writeFileSync(path, audio);
  } catch {
    // Cache is best-effort; a failed write must not fail synthesis.
  }
}

/**
 * Synthesize text with local Piper to a WAV buffer (22050 Hz mono
 * for stock Piper voices). Throws on missing engine, non-zero
 * exit, or timeout. Piper reads the text from stdin; the WAV lands
 * in a temp dir. NOTE: env is passed explicitly — Bun.spawn does
 * not pick up runtime mutations of process.env on its own.
 */
export async function synthesizePiper(text: string, timeoutMs = 30 * 1000): Promise<Uint8Array> {
  const cleanText = clean(text);
  if (!cleanText) throw new Error("nothing to say");
  const { bin, voice } = ttsPaths();
  if (!isPiperAvailable()) {
    throw new Error("voice not set up — run scripts/setup-tts.sh");
  }
  const tmpDir = mkdtempSync(join(tmpdir(), "tutor-tts-"));
  const outPath = join(tmpDir, "out.wav");
  const proc = Bun.spawn([bin, "--model", voice, "--output_file", outPath], {
    stdin: "pipe",
    stdout: "ignore",
    stderr: "ignore",
    env: { ...process.env },
  });
  let timedOut = false;
  const killer = setTimeout(() => {
    timedOut = true;
    try {
      proc.kill("SIGKILL");
    } catch {
      /* already exited */
    }
  }, timeoutMs);
  try {
    // The child may already have exited (bad binary, missing libs) — a
    // failed write just means the exit code below tells the story.
    try {
      proc.stdin.write(cleanText);
      proc.stdin.end();
    } catch {
      /* child already gone; fall through to proc.exited */
    }
    const code = await proc.exited;
    if (timedOut) throw new Error("synthesis timed out");
    if (code !== 0) throw new Error(`piper exited with code ${code}`);
    let wav: Uint8Array;
    try {
      wav = new Uint8Array(readFileSync(outPath));
    } catch {
      throw new Error("piper produced no audio output");
    }
    if (!isValidWav(wav)) throw new Error("piper produced invalid audio");
    return wav;
  } finally {
    clearTimeout(killer);
    try {
      proc.kill();
    } catch {
      /* noop */
    }
    rmSync(tmpDir, { recursive: true, force: true });
  }
}

/**
 * Synthesize text with Google Cloud TTS (Neural2 voice) to MP3.
 * Auth is an API key from TTS_GOOGLE_API_KEY (set it in .env, never
 * in chat, never in the repo). Throws on any failure so the caller
 * can fall through to Piper.
 */
export async function synthesizeCloud(text: string): Promise<Uint8Array> {
  const cleanText = clean(text);
  if (!cleanText) throw new Error("nothing to say");
  const key = process.env.TTS_GOOGLE_API_KEY;
  if (!key) throw new Error("no cloud key configured");
  const voiceName = process.env.TTS_GOOGLE_VOICE || "es-US-Neural2-A";
  const res = await fetch(
    `https://texttospeech.googleapis.com/v1/text:synthesize?key=${encodeURIComponent(key)}`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        input: { text: cleanText },
        voice: { languageCode: "es-US", name: voiceName },
        audioConfig: { audioEncoding: "MP3" },
      }),
      // Under Bun.serve's idle timeout (30 s, see server.ts):
      // fail fast so the Piper fallback still lands in time.
      signal: AbortSignal.timeout(8 * 1000),
    }
  );
  if (!res.ok) throw new Error(`cloud TTS HTTP ${res.status}`);
  const body = await res.json();
  const b64 = typeof body?.audioContent === "string" ? body.audioContent : "";
  if (!b64) throw new Error("cloud TTS returned no audio");
  const audio = Buffer.from(b64, "base64");
  if (audio.length === 0) throw new Error("cloud TTS returned empty audio");
  return new Uint8Array(audio);
}

export interface Synthesized {
  audio: Uint8Array;
  contentType: string;
  engine: "cloud" | "piper";
}

/**
 * Full chain: cloud first (cached MP3), Piper second (cached WAV).
 * Throws when neither engine is available, so the browser can fall
 * back to its device voice. Cloud failures never surface to the
 * caller as errors when Piper succeeds — they are logged only.
 */
export async function synthesize(text: string): Promise<Synthesized> {
  const cleanText = clean(text);
  if (!cleanText) throw new Error("nothing to say");
  if (isCloudAvailable()) {
    const voiceName = process.env.TTS_GOOGLE_VOICE || "es-US-Neural2-A";
    const cached = readCache(cachePath("cloud", voiceName, cleanText, "mp3"));
    if (cached) return { audio: cached, contentType: "audio/mpeg", engine: "cloud" };
    try {
      const audio = await synthesizeCloud(cleanText);
      writeCache(cachePath("cloud", voiceName, cleanText, "mp3"), audio);
      return { audio, contentType: "audio/mpeg", engine: "cloud" };
    } catch (e) {
      console.error(`cloud TTS failed, falling back to Piper: ${e}`);
    }
  }
  const { voiceName } = ttsPaths();
  const cached = readCache(cachePath("piper", voiceName, cleanText, "wav"));
  if (cached) return { audio: cached, contentType: "audio/wav", engine: "piper" };
  const audio = await synthesizePiper(cleanText);
  writeCache(cachePath("piper", voiceName, cleanText, "wav"), audio);
  return { audio, contentType: "audio/wav", engine: "piper" };
}
