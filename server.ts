// language-tutor — Duolingo-style Spanish learning app on the FSI Spanish Basic Course.
// Bun + zero dependencies + SQLite. Run from the repo root: bun server.ts
// Port: 3044 by default (LANGUAGE_TUTOR_PORT overrides, LANGUAGE_TUTOR_HOST overrides,
// LANGUAGE_TUTOR_DB overrides the SQLite path).

import { Database } from "bun:sqlite";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

const PORT = Number(process.env.LANGUAGE_TUTOR_PORT || 3044);
const HOST = process.env.LANGUAGE_TUTOR_HOST || "127.0.0.1";
const DB_PATH =
  process.env.LANGUAGE_TUTOR_DB ||
  join(import.meta.dir, "data", "language-tutor.db");

mkdirSync(dirname(DB_PATH), { recursive: true });
const db = new Database(DB_PATH);
db.exec(`
  CREATE TABLE IF NOT EXISTS progress (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    total_xp INTEGER NOT NULL DEFAULT 0,
    streak INTEGER NOT NULL DEFAULT 0,
    last_study_date TEXT,
    hearts INTEGER NOT NULL DEFAULT 5
  );
  CREATE TABLE IF NOT EXISTS completed_lessons (
    lesson_id TEXT PRIMARY KEY,
    completed_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS daily_xp (
    date TEXT PRIMARY KEY,
    xp INTEGER NOT NULL DEFAULT 0
  );
`);
db.exec(
  `INSERT OR IGNORE INTO progress (id, total_xp, streak, last_study_date, hearts)
   VALUES (1, 0, 0, NULL, 5)`
);

function todayLocal() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function yesterdayLocal() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function getProgress() {
  const row = db
    .query("SELECT total_xp, streak, last_study_date, hearts FROM progress WHERE id = 1")
    .get();
  const ids = db
    .query("SELECT lesson_id FROM completed_lessons ORDER BY completed_at")
    .all()
    .map((r) => r.lesson_id);
  return {
    totalXp: row.total_xp,
    streak: row.streak,
    lastStudyDate: row.last_study_date,
    hearts: row.hearts,
    completedLessonIds: ids,
  };
}

function getHistory() {
  const out = [];
  const now = new Date();
  for (let i = 13; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const date = `${y}-${m}-${day}`;
    const row = db.query("SELECT xp FROM daily_xp WHERE date = ?").get(date);
    out.push({ date, xp: row ? row.xp : 0 });
  }
  return out;
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });
}

const PUBLIC_DIR = join(import.meta.dir, "public");
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
};

Bun.serve({
  hostname: HOST,
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname;

    if (path === "/api/progress" && req.method === "GET") {
      return json(getProgress());
    }

    if (path === "/api/history" && req.method === "GET") {
      return json(getHistory());
    }

    if (path === "/api/complete-lesson" && req.method === "POST") {
      let body;
      try {
        body = await req.json();
      } catch {
        return json({ error: "invalid JSON" }, 400);
      }
      const lessonId = String(body.lessonId || "");
      const xp = Math.max(0, Math.floor(Number(body.xp) || 0));
      if (!lessonId) return json({ error: "lessonId required" }, 400);
      const today = todayLocal();
      const prev = db
        .query("SELECT streak, last_study_date FROM progress WHERE id = 1")
        .get();
      const already = db
        .query("SELECT 1 FROM completed_lessons WHERE lesson_id = ?")
        .get(lessonId);
      let streak = prev.streak;
      if (prev.last_study_date === today) {
        // streak unchanged
      } else if (prev.last_study_date === yesterdayLocal()) {
        streak = prev.streak + 1;
      } else {
        streak = 1;
      }
      db.exec("BEGIN");
      try {
        db.query(
          "INSERT OR IGNORE INTO completed_lessons (lesson_id, completed_at) VALUES (?, ?)"
        ).run(lessonId, new Date().toISOString());
        db.query(
          "INSERT INTO daily_xp (date, xp) VALUES (?, ?) ON CONFLICT(date) DO UPDATE SET xp = xp + ?"
        ).run(today, xp, xp);
        db.query(
          "UPDATE progress SET total_xp = total_xp + ?, streak = ?, last_study_date = ?, hearts = 5 WHERE id = 1"
        ).run(xp, streak, today);
        db.exec("COMMIT");
      } catch (e) {
        db.exec("ROLLBACK");
        throw e;
      }
      return json({ ...getProgress(), isFirstCompletion: !already });
    }

    if (path === "/api/sync-hearts" && req.method === "POST") {
      let body;
      try {
        body = await req.json();
      } catch {
        return json({ error: "invalid JSON" }, 400);
      }
      const hearts = Math.min(5, Math.max(0, Math.floor(Number(body.hearts) || 0)));
      db.query("UPDATE progress SET hearts = ? WHERE id = 1").run(hearts);
      return json(getProgress());
    }

    if (path === "/api/reset-progress" && req.method === "POST") {
      db.exec("BEGIN");
      try {
        db.exec("DELETE FROM completed_lessons");
        db.exec("DELETE FROM daily_xp");
        db.exec(
          "UPDATE progress SET total_xp = 0, streak = 0, last_study_date = NULL, hearts = 5 WHERE id = 1"
        );
        db.exec("COMMIT");
      } catch (e) {
        db.exec("ROLLBACK");
        throw e;
      }
      return json(getProgress());
    }

    // Static files. Only / and files under /public are served; anything else 404s.
    let filePath = path === "/" ? join(PUBLIC_DIR, "index.html") : join(PUBLIC_DIR, path);
    if (!filePath.startsWith(PUBLIC_DIR)) return new Response("Not found", { status: 404 });
    const file = Bun.file(filePath);
    if (!(await file.exists())) return new Response("Not found", { status: 404 });
    const ext = filePath.slice(filePath.lastIndexOf("."));
    return new Response(file, {
      headers: { "content-type": MIME[ext] || "application/octet-stream" },
    });
  },
});

console.log(`language-tutor listening on http://${HOST}:${PORT}`);
