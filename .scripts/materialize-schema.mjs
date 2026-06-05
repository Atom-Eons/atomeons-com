#!/usr/bin/env node
/**
 * materialize-schema.mjs
 *
 * Extracts the 10 schema.org React components from the warp-9-jsonld
 * workflow result and writes them to app/_components/schema/<Type>.tsx.
 *
 * Workflow output shape: { types: [{ name, content }, ...] }
 *
 * The `content` field is a markdown string containing one fenced
 * ```tsx code block. JSX angle brackets in the JSON-serialized
 * content arrive as HTML-escaped entities (&lt; &gt; &amp;) — we
 * unescape before writing.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = "C:/AtomEons/github/atomeons-com";
const SCHEMA_DIR = join(ROOT, "app/_components/schema");

const resultPath = process.argv[2];
if (!resultPath) {
  console.error("usage: node materialize-schema.mjs <task-output-file>");
  process.exit(2);
}

const rawTask = readFileSync(resultPath, "utf8");
// The task-output file is a JSON envelope with a `.result` field that is itself a JSON-stringified payload.
let payload;
try {
  const env = JSON.parse(rawTask);
  payload = typeof env.result === "string" ? JSON.parse(env.result) : env.result;
} catch (e) {
  // Fallback: maybe the file IS the raw workflow return value.
  payload = JSON.parse(rawTask);
}

if (!payload?.types || !Array.isArray(payload.types)) {
  console.error("No types[] in payload. Keys:", Object.keys(payload || {}));
  process.exit(1);
}

if (!existsSync(SCHEMA_DIR)) mkdirSync(SCHEMA_DIR, { recursive: true });

function unescapeHtml(s) {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function extractTsx(content) {
  if (!content) return null;
  const m = content.match(/```(?:tsx|jsx|ts)\s*\n([\s\S]*?)```/);
  if (!m) return null;
  const body = m[1].replace(/^\/\/ FILE:.*\n/, "").trim();
  return unescapeHtml(body);
}

let ok = 0;
let skip = 0;
let fail = 0;

for (const t of payload.types) {
  const tsx = extractTsx(t.content);
  if (!tsx) {
    console.log(`  ${t.name} — FAIL no tsx block`);
    fail++;
    continue;
  }
  const out = join(SCHEMA_DIR, `${t.name}.tsx`);
  if (existsSync(out)) {
    console.log(`  ${t.name} — SKIP exists`);
    skip++;
    continue;
  }
  writeFileSync(out, tsx, "utf8");
  console.log(`  ${t.name} — ok (${tsx.length} chars)`);
  ok++;
}

console.log(`\nResult: ok=${ok} skip=${skip} fail=${fail}`);
