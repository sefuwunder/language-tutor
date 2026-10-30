#!/usr/bin/env python3
"""Build public/audio-segments.json for language-tutor.

Pipeline: download the original FSI Spanish Basic Course (Volume 1) tapes
from Live Lingua -> transcribe locally with faster-whisper (word timestamps)
-> fuzzy-align each app phrase to its best transcript window -> write a
playback database keyed by normalized phrase.

Local-only: transcription runs on this machine, no cloud APIs, no keys.
MP3s and raw transcripts stay in --tapes-dir (default /tmp/fsi-tapes) and are
NEVER written into the repo tree. Only audio-segments.json (tape offsets, not
audio) and this script live in the repo, so the repo stays light and the
player streams the original tapes from Live Lingua at playback time.

Phrase normalization replicates the app's norm() in public/app.js exactly:
NFD-decompose, drop combining marks U+0300-U+036F, lowercase, strip
¿?¡!.,;:" and collapse whitespace.

Usage:
  python3 tools/build-audio-db.py [--model base] [--beam-size 1]
      [--tapes-dir /tmp/fsi-tapes] [--skip-download] [--skip-transcribe]
      [--skip-align]

Reruns are cheap: existing downloads and transcripts are reused, so
--skip-download --skip-transcribe re-runs only the alignment.
"""

import argparse
import hashlib
import json
import re
import sys
import unicodedata
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
APP_JS = REPO / "public" / "app.js"
OUT_JSON = REPO / "public" / "audio-segments.json"

# code -> (unit number, mp3 filename, Live Lingua URL; literal spaces are
# percent-encoded at request time). Tapes are US-government public domain.
TAPES = {
    "01A": (1, "Unit 01A.mp3",
            "https://www.livelingua.com/fsi/Spanish/Basic/Volume 1/FSI - Spanish Basic Course - Volume 1 - Unit 01A.mp3"),
    "01B": (1, "Unit 01B.mp3",
            "https://www.livelingua.com/fsi/Spanish/Basic/Volume 1/FSI - Spanish Basic Course - Volume 1 - Unit 01B.mp3"),
    "03A": (3, "Unit 03A.mp3",
            "https://www.livelingua.com/fsi/Spanish/Basic/Volume 1/FSI - Spanish Basic Course - Volume 1 - Unit 03A.mp3"),
    "03B": (3, "Unit 03B.mp3",
            "https://www.livelingua.com/fsi/Spanish/Basic/Volume 1/FSI - Spanish Basic Course - Volume 1 - Unit 03B.mp3"),
}

MIN_MATCH = 0.8  # at least 80% of a phrase's words, in order
START_PAD = 0.2  # seconds before the first matched word
END_PAD = 0.3    # seconds after the last matched word
LOOKAHEAD = 8    # transcript words scanned for each phrase word


def norm(s):
    """Same normalization as norm() in public/app.js."""
    s = unicodedata.normalize("NFD", s)
    s = "".join(c for c in s if not (0x0300 <= ord(c) <= 0x036F))
    s = s.lower()
    s = re.sub(r"[¿?¡!.,;:\"]", "", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s


def parse_phrases(text):
    """Extract {(normalized phrase): (unit, original Spanish)} from app.js.

    Only the UNITS section (before the Roadmap marker) is scanned, so the
    roadmap titles and the tape-URL tables cannot leak in as phrases.
    First occurrence wins when two cards normalize to the same key.
    """
    units_text = text.split("/* ---------------- Roadmap")[0]
    phrases = {}
    cur = None
    for m in re.finditer(r"n:\s*(\d+),|es:\s*\"((?:[^\"\\]|\\.)*)\"", units_text):
        if m.group(1) is not None:
            cur = int(m.group(1))
        else:
            es = m.group(2).replace('\\"', '"').replace("\\\\", "\\")
            if cur in (1, 3):
                phrases.setdefault(norm(es), (cur, es))
    return phrases


def download(tapes_dir):
    from urllib.parse import quote
    from urllib.request import urlretrieve

    for code, (_unit, fname, url) in TAPES.items():
        dest = tapes_dir / fname
        if dest.exists() and dest.stat().st_size > 100_000:
            print(f"[{code}] already downloaded: {fname} ({dest.stat().st_size} bytes)", flush=True)
            continue
        print(f"[{code}] downloading {fname} ...", flush=True)
        urlretrieve(quote(url, safe=":/"), dest)
        print(f"[{code}] -> {dest} ({dest.stat().st_size} bytes)", flush=True)


def transcribe_all(tapes_dir, model_name, beam_size, vad_filter=False):
    """Return {tape code: [(normalized word, start, end), ...]}."""
    try:
        from faster_whisper import WhisperModel
    except ImportError:
        print("ERROR: faster-whisper is not installed. Run:\n"
              "  python3 -m pip install --user --break-system-packages faster-whisper onnxruntime",
              file=sys.stderr)
        sys.exit(2)
    # Compatibility shim: faster-whisper passes metadata_errors="ignore" to
    # av.open, but newer PyAV releases removed that parameter. Dropping the
    # kwarg keeps this script working across PyAV versions instead of
    # pinning one.
    try:
        import av as _av
        _orig_open = _av.open

        def _open(*a, **k):
            k.pop("metadata_errors", None)
            return _orig_open(*a, **k)

        _av.open = _open
    except Exception:
        pass
    model = WhisperModel(model_name, device="cpu", compute_type="int8", cpu_threads=2)
    out = {}
    seen = {}  # mp3 md5 -> (code, transcript path); Live Lingua's 01B serves 01A's bytes
    for code, (_unit, fname, _url) in TAPES.items():
        tpath = tapes_dir / "transcripts" / f"{code}.words.json"
        if tpath.exists():
            words = json.loads(tpath.read_text())["words"]
            print(f"[{code}] reused transcript: {len(words)} words", flush=True)
            out[code] = [(norm(w["w"]), w["start"], w["end"]) for w in words if norm(w["w"])]
            seen.setdefault(hashlib.md5((tapes_dir / fname).read_bytes()).hexdigest(), (code, tpath))
            continue
        h = hashlib.md5((tapes_dir / fname).read_bytes()).hexdigest()
        if h in seen:
            src_code, src_path = seen[h]
            print(f"[{code}] file is byte-identical to {src_code}; reusing its transcript", flush=True)
            words = json.loads(src_path.read_text())["words"]
            tpath.parent.mkdir(parents=True, exist_ok=True)
            tpath.write_text(json.dumps({"tape": code, "words": words}, ensure_ascii=False))
            out[code] = [(norm(w["w"]), w["start"], w["end"]) for w in words if norm(w["w"])]
            continue
        print(f"[{code}] transcribing {fname} (model={model_name}, beam={beam_size}, vad={vad_filter}) ...", flush=True)
        segments, _info = model.transcribe(
            str(tapes_dir / fname), language="es", word_timestamps=True,
            vad_filter=vad_filter, beam_size=beam_size)
        words = collect_words(segments)
        tpath.parent.mkdir(parents=True, exist_ok=True)
        tpath.write_text(json.dumps({"tape": code, "words": words}, ensure_ascii=False))
        print(f"[{code}] done: {len(words)} words", flush=True)
        out[code] = [(norm(w["w"]), w["start"], w["end"]) for w in words if norm(w["w"])]
        seen[h] = (code, tpath)
    return out


def collect_words(segments):
    words = []
    for seg in segments:
        for w in (seg.words or []):
            words.append({"w": w.word.strip(), "start": round(w.start, 2), "end": round(w.end, 2)})
    return words


def lev(a, b):
    if a == b:
        return 0
    if abs(len(a) - len(b)) > 2:
        return 99
    prev = list(range(len(b) + 1))
    for i, ca in enumerate(a, 1):
        cur = [i]
        for j, cb in enumerate(b, 1):
            cur.append(min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (ca != cb)))
        prev = cur
    return prev[len(b)]


def word_match(pw, tw):
    if pw == tw:
        return True
    return len(pw) >= 5 and lev(pw, tw) <= 1


def best_window(pwords, t):
    """Best fuzzy ordered window of pwords inside transcript t.

    Returns (score, span, first_index, last_index) or None. A phrase word
    that is not found within LOOKAHEAD transcript words counts as unmatched;
    the scan continues with the next phrase word.
    """
    best = None
    n = len(pwords)
    for i in range(len(t)):
        if not word_match(pwords[0], t[i][0]):
            continue
        j = i
        matched = 0
        last = i
        for pw in pwords:
            hit = None
            for k in range(j, min(j + LOOKAHEAD, len(t))):
                if word_match(pw, t[k][0]):
                    hit = k
                    break
            if hit is not None:
                matched += 1
                last = hit
                j = hit + 1
        score = matched / n
        span = last - i + 1
        if score >= MIN_MATCH and (best is None or score > best[0]
                                  or (score == best[0] and span < best[1])):
            best = (score, span, i, last)
    return best


def align(phrases, transcripts):
    """Return (db, report). Phrases with no confident match get no entry."""
    db = {}
    report = []  # (key, unit, es, tape, score, start, end, t, i, last)
    for key, (unit, es) in sorted(phrases.items()):
        pwords = key.split()
        if not pwords:
            continue
        best = None  # (score, span, tape, i, last)
        for code, (u, _f, _u) in TAPES.items():
            if u != unit:
                continue
            w = best_window(pwords, transcripts[code])
            if w and (best is None or w[0] > best[0] or (w[0] == best[0] and w[1] < best[1])):
                best = (w[0], w[1], code, w[2], w[3])
        if best is None:
            continue
        score, _span, code, i, last = best
        t = transcripts[code]
        start = max(0.0, round(t[i][1] - START_PAD, 2))
        end = round(t[last][2] + END_PAD, 2)
        db[key] = {"es": es, "tape": code, "start": start, "end": end}
        report.append((key, unit, es, code, score, start, end, t, i, last))
    return db, report


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--model", default="base",
                    help="faster-whisper model (default: base; small is more accurate but slower)")
    ap.add_argument("--beam-size", type=int, default=1,
                    help="decoding beam size (default: 1, greedy)")
    ap.add_argument("--vad-filter", action="store_true",
                    help="enable Silero VAD pre-filtering (default: off -- VAD "
                    "dropped the opening ~2 minutes of Unit 1 in testing, so "
                    "completeness wins over speed)")
    ap.add_argument("--tapes-dir", default="/tmp/fsi-tapes")
    ap.add_argument("--skip-download", action="store_true")
    ap.add_argument("--skip-transcribe", action="store_true")
    ap.add_argument("--skip-align", action="store_true")
    args = ap.parse_args()

    tapes_dir = Path(args.tapes_dir)
    tapes_dir.mkdir(parents=True, exist_ok=True)

    if not args.skip_download:
        download(tapes_dir)

    transcripts = {}
    if not args.skip_transcribe:
        transcripts = transcribe_all(tapes_dir, args.model, args.beam_size, args.vad_filter)
    else:
        for code in TAPES:
            tpath = tapes_dir / "transcripts" / f"{code}.words.json"
            if not tpath.exists():
                print(f"ERROR: transcript missing for {code}: {tpath}", file=sys.stderr)
                sys.exit(2)
            words = json.loads(tpath.read_text())["words"]
            transcripts[code] = [(norm(w["w"]), w["start"], w["end"]) for w in words if norm(w["w"])]

    if args.skip_align:
        print("Alignment skipped (--skip-align).")
        return

    phrases = parse_phrases(APP_JS.read_text())
    print(f"Parsed {len(phrases)} unique phrases from app.js (Units 1+3).")
    db, report = align(phrases, transcripts)
    OUT_JSON.write_text(json.dumps(db, ensure_ascii=False, indent=1, sort_keys=True) + "\n")
    print(f"Wrote {OUT_JSON} with {len(db)} segments.")

    for unit in (1, 3):
        total = sum(1 for _k, (u, _e) in phrases.items() if u == unit)
        hit = sum(1 for (_k, u, _e, _c, _s, _a, _b, _t, _i, _l) in report if u == unit)
        print(f"Unit {unit}: {hit}/{total} phrases matched ({hit / total:.0%}).")
    unmatched = sorted(k for k, (u, _e) in phrases.items()
                       if k not in db)
    if unmatched:
        print(f"Unmatched ({len(unmatched)}, keep TTS fallback):")
        for k in unmatched:
            print(f"  - {k}")

    print("Samples (transcript words around each match):")
    for (key, unit, es, code, score, start, end, t, i, last) in report[:3]:
        ctx = " ".join(w for w, _s, _e in t[max(0, i - 3):last + 4])
        print(f"  [{code} {start}-{end}s score={score:.2f}] {es!r} :: ...{ctx}...")
    return


if __name__ == "__main__":
    main()
