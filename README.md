# language-tutor

A Duolingo-style Spanish learning app built on the **FSI Spanish Basic Course**,
self-hosted with Bun + zero dependencies + SQLite.

## Run it

```sh
bun server.ts
```

Then open http://127.0.0.1:3044

- Port: `3044` by default. Override with `LANGUAGE_TUTOR_PORT`.
- Host: `127.0.0.1` by default. Override with `LANGUAGE_TUTOR_HOST`.
- Database: `data/language-tutor.db` by default (created on first run).
  Override with `LANGUAGE_TUTOR_DB`.
- No npm dependencies. No build step. Single-page frontend served from `public/`
  (`index.html` + `app.js` + `styles.css`).

## What it is

A learning path of lesson nodes, Duolingo-style: each lesson opens with dialogue
study cards (speaker + Spanish line + English, tap 🔊 to hear it via server
speech — cloud TTS, then local Piper, then the browser's Spanish voice),
then drills generated from that lesson's phrase pairs:

- Multiple choice, Spanish → English and English → Spanish
- Typed translation, English → Spanish (accent-, punctuation-, and
  case-insensitive checking, with on-screen accent keys á é í ó ú ñ ¡ ¿)
- Fill-in-the-blank with a word bank
- Listening (hear the Spanish, pick the written phrase)
- Matching pairs

Audio: each lesson's study screen also carries the original FSI tape
recordings for its unit (Tape A and Tape B), streamed from Live Lingua's free
public-domain FSI archive — not bundled with the repo, so the repo stays light.
The tapes are whole-unit recordings, not per-phrase clips: per-line 🔊 buttons
and listening drills use server speech (see below) when a line has no tape
segment. If Live Lingua is unreachable, the players simply can't load and
everything else still works.

## Speech (TTS)

Lines without a tape segment are voiced by the server, in this order:

1. **Cloud TTS** (Google Cloud Neural2, `es-US-Neural2-A` by default) —
   set `TTS_GOOGLE_API_KEY` in a `.env` file in the repo root (gitignored,
   never committed, never shared in chat). Override the voice with
   `TTS_GOOGLE_VOICE`. The key is only ever sent to Google's TTS endpoint.
2. **Local Piper** — offline neural voice, no key. Run `sh scripts/setup-tts.sh`
   once: it installs the Piper binary and the default Mexican voice
   (`es_MX-ald-medium`, FSI teaches Latin American Spanish) under `data/piper/`
   (gitignored). Swap voices with `PIPER_VOICE` (e.g. `es_ES-davefx-medium`,
   `es_AR-daniela-high`), or point at your own build with `PIPER_BIN`.
3. **Browser device voice** — if the server has neither engine, `/api/speak`
   returns 503 and the browser falls back to its own Spanish voice, so
   speech never breaks.

`GET /api/speak?text=…` returns the audio (MP3 from cloud, WAV from Piper);
`GET /api/tts/status` reports which engines are configured (never the key).
Synthesized audio is cached under `data/tts-cache/` (gitignored) by engine,
voice, and text hash, so repeated drills don't re-synthesize or re-bill.
Cloud failures fall through to Piper automatically; only the failure is
logged, never the key or the text.

Hearts: 5 per lesson. A wrong answer loses one heart; 0 hearts fails the
lesson with a retry screen. The lesson-complete screen shows XP earned and
accuracy. Locked lessons unlock by completing the previous one.

Review drills: once a unit has a completed lesson, a blue ↻ node appears
after that unit's lessons on the Learn path. A review session draws a fresh
shuffle (up to 12 cards) from the unit's completed lessons and runs the same
drill types — no study phase, since this is reinforcement, not new material.
Completing a review awards XP and keeps the streak, but never marks a lesson
complete or unlocks anything.

Progress (total XP, day streak with last-study date, completed lesson ids,
per-day XP history, hearts) lives in SQLite on the server, not in browser
storage. The Profile view shows totals, last-14-days activity, and a reset
option.

## API

- `GET /api/progress` → `{ totalXp, streak, lastStudyDate, hearts, completedLessonIds }`
- `POST /api/complete-lesson` `{ lessonId, xp, correct, total }` → updated progress
  (adds XP, marks the lesson complete, updates the streak, refills hearts to 5)
- `GET /api/history` → last 14 days as `[{ date, xp }]`
- `POST /api/sync-hearts` `{ hearts }` → updated progress (hearts clamped 0–5)
- `POST /api/reset-progress` → cleared progress
- `POST /api/review-complete` `{ xp }` → updated progress (XP + streak, no lesson marked complete)
- `GET /api/speak?text=…` → spoken audio (cloud TTS, then local Piper; 503 when neither is configured)
- `GET /api/tts/status` → `{ cloud, piper, voice }` (key presence only, never the key)

## v1 scope

**Playable: Units 1, 2, and 3 — 16 lessons.**

- Unit 1, Useful Phrases & Pronunciation I: Greetings, How Are You?,
  Polite Expressions, Introductions, Farewells.
- Unit 2, Useful Phrases & Pronunciation II: Classroom Commands,
  Requesting & Identifying Objects, Directions, Numbers 1–21, esto & eso,
  Hear the Difference: r vs rr.
- Unit 3, White's Arrival in Surlandia: At the Hotel Room, Going Down &
  the Cashier's Desk, Gender & Translation Drill, ¿Le gusta…? & Location,
  Hay que, ¿Puede…? & ¿Cuánto cuesta…?

All other units (Units 4–55) appear locked on the course map with
their real titles and grammar topics. Adding a unit means fetching its FSI
dialogue and drill pages and adding its cards to `public/app.js` — the lesson
engine generates all five drill types from the cards.

## Audio segments (real tape clips per phrase)

Study screens stream the whole-unit FSI tapes, but per-line speaker buttons
and listening drills play exact clips from those tapes instead of
text-to-speech whenever a clip is known:

- `public/audio-segments.json` maps each normalized phrase to
  `{ es, tape, start, end }` — offsets in seconds into the original tape
  (start = first matched word − 0.2s, end = last matched word + 0.3s).
  Phrases with no confident match have no entry and keep the TTS fallback;
  timestamps are never guessed.
- The player (`playPhrase` in `public/app.js`) seeks one shared audio
  element to the clip, pauses at the end, cancels any speaking TTS (and vice
  versa), and stops when the lesson is exited or steps advance. If the JSON
  fails to load, everything silently stays TTS.

The database is built by `tools/build-audio-db.py`:

```sh
python3 tools/build-audio-db.py [--model base] [--beam-size 1]
```

It downloads the four Unit 1/3 tapes from Live Lingua to `/tmp/fsi-tapes`
(skip if already there), transcribes them locally with faster-whisper
(word timestamps, Spanish forced, VAD off by default — VAD dropped the
opening ~2 minutes of Unit 1 in testing, so completeness wins over speed),
fuzzy-matches each app phrase against both tapes of its unit (same normalization as the app; ≥80% of the
phrase's words in order, else unmatched), and writes
`public/audio-segments.json`. MP3s and raw transcripts stay in `/tmp` and
are never committed; only the offsets JSON and the script live in the repo.
Re-running with `--skip-download --skip-transcribe` redoes just the
alignment. (Live Lingua's Unit 01B file is byte-identical to 01A, so the
script transcribes it once and reuses the transcript.)

## Source material & credit

All lesson phrases and grammar notes are verbatim text from the **FSI Spanish
Basic Course**, developed by the US Foreign Service Institute and in the
public domain as US-government work. Nothing presented as FSI text is invented;
later units are shown locked rather than filled with FSI-style imitations.

Source pages (fetched 2026-10-30):

- Course index (full 55-unit / 4-volume roadmap):
  https://www.fsi-language-courses.org/fsi-spanish-basic-course/
- Unit 1, Useful Phrases & Pronunciation I:
  https://www.fsi-language-courses.org/fsi-spanish-basic-course/1-useful-phrases-pronunciation-i/
- Unit 3, White's Arrival in Surlandia:
  https://www.fsi-language-courses.org/fsi-spanish-basic-course/3-whites-arrival-in-surlandia/
- Original tape recordings (Units 1, 2, and 3, streamed on study screens):
  https://www.livelingua.com/course/fsi/spanish-basic-course---volume-1
  (Unit 01A/01B, 02A/02B, and 03A/03B MP3s)

## Files

- `server.ts` — Bun server + SQLite progress store + REST API + static files
- `public/index.html` — app shell (Learn / Course map / Profile / Lesson views)
- `public/app.js` — curriculum data (verbatim FSI) + lesson engine
- `public/styles.css` — Duolingo-like styling, mobile-friendly
