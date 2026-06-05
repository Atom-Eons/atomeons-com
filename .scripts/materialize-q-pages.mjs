#!/usr/bin/env node
/**
 * materialize-q-pages.mjs
 *
 * Parse the warp-9-ai-search workflow output and write 20 AI-search
 * "What is X" pages to app/q/<slug>/page.tsx.
 *
 * Each agent's content has the shape:
 *   # SLUG: ...
 *   # QUESTION: ...
 *   # TITLE: ...
 *   ## The short answer ...
 *   ## The longer answer ...
 *   ## Key facts ...
 *   ## Related questions ...
 *   ## Sources ...
 *   ```tsx
 *   <complete Next.js page.tsx>
 *   ```
 *
 * Unescapes HTML entities in the TSX block. Refuses to overwrite.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";

const ROOT = "C:/AtomEons/github/atomeons-com";
const Q_DIR = join(ROOT, "app/q");

const taskFile = process.argv[2];
if (!taskFile) {
  console.error("usage: node materialize-q-pages.mjs <task-output-file>");
  process.exit(2);
}

const raw = readFileSync(taskFile, "utf8");
let payload;
try {
  const env = JSON.parse(raw);
  payload = typeof env.result === "string" ? JSON.parse(env.result) : env.result;
} catch {
  payload = JSON.parse(raw);
}

if (!payload?.questions || !Array.isArray(payload.questions)) {
  console.error("No questions[] in payload");
  process.exit(1);
}

function unescapeHtml(s) {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&middot;/g, "·")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–");
}

function extractTsx(content) {
  if (!content) return null;
  const m = content.match(/```(?:tsx|jsx|ts)\s*\n([\s\S]*?)```/);
  if (!m) return null;
  const body = m[1].replace(/^\/\/ FILE:.*\n/, "").trim();
  return unescapeHtml(body);
}

function validate(tsx) {
  if (!tsx) return "no tsx block";
  if (!/export\s+default\s+function/.test(tsx)) return "no default export";
  if (!/export\s+const\s+metadata/.test(tsx)) return "no metadata";
  if (tsx.length < 1000) return `too short (${tsx.length})`;
  return null;
}

if (!existsSync(Q_DIR)) mkdirSync(Q_DIR, { recursive: true });

let ok = 0, skip = 0, fail = 0;
const built = [];

for (const q of payload.questions) {
  const tsx = extractTsx(q.content);
  const err = validate(tsx);
  if (err) {
    console.log(`  ${q.slug} — FAIL ${err}`);
    fail++;
    continue;
  }
  const slugDir = join(Q_DIR, q.slug);
  const target = join(slugDir, "page.tsx");
  if (existsSync(target)) {
    console.log(`  ${q.slug} — SKIP exists`);
    skip++;
    continue;
  }
  mkdirSync(slugDir, { recursive: true });
  writeFileSync(target, tsx, "utf8");
  console.log(`  ${q.slug} — ok (${tsx.length} chars)`);
  built.push({ slug: q.slug, question: q.question });
  ok++;
}

// Also write an index of the questions for the /q index page to consume
if (built.length > 0) {
  const indexPath = join(ROOT, "app/_data/q-questions.ts");
  const ts =
    `// AUTO-GENERATED 2026-06-05 from warp-9-ai-search workflow.\n` +
    `// 20 AI-search "What is X" pages at /q/<slug>.\n\n` +
    `export type QuestionRecord = { slug: string; question: string };\n\n` +
    `export const QUESTIONS: QuestionRecord[] = ${JSON.stringify(built, null, 2)};\n`;
  writeFileSync(indexPath, ts, "utf8");
  console.log(`\nWrote index: ${indexPath} (${built.length} questions)`);
}

console.log(`\nResult: ok=${ok} skip=${skip} fail=${fail}`);
