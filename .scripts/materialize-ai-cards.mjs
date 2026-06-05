#!/usr/bin/env node
/**
 * materialize-ai-cards.mjs
 *
 * Parse the warp-9-ai-cards workflow output and write 20 React Server
 * Components to app/_components/ai-summary/<slug>-ai-summary.tsx.
 *
 * Unescapes HTML entities in JSX (the workflow result envelopes JSX
 * angle brackets as &lt; &gt; through JSON serialization).
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";

const ROOT = "C:/AtomEons/github/atomeons-com";
const OUT_DIR = join(ROOT, "app/_components/ai-summary");

const taskFile = process.argv[2];
if (!taskFile) {
  console.error("usage: node materialize-ai-cards.mjs <task-output-file>");
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
if (!payload?.cards) {
  console.error("No cards[] in payload");
  process.exit(1);
}

function unescapeHtml(s) {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&middot;/g, "·")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&apos;/g, "'");
}

function extractTsx(content) {
  if (!content) return null;
  const m = content.match(/```(?:tsx|jsx|ts)\s*\n([\s\S]*?)```/);
  if (!m) return null;
  const body = m[1].replace(/^\/\/ FILE:.*\n/, "").trim();
  return unescapeHtml(body);
}

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

let ok = 0;
let skip = 0;
let fail = 0;

const exportLines = [];

for (const c of payload.cards) {
  const tsx = extractTsx(c.content);
  if (!tsx) {
    console.log(`  ${c.slug} — FAIL no tsx`);
    fail++;
    continue;
  }
  const out = join(OUT_DIR, `${c.slug}-ai-summary.tsx`);
  if (existsSync(out)) {
    console.log(`  ${c.slug} — SKIP exists`);
    skip++;
  } else {
    writeFileSync(out, tsx, "utf8");
    console.log(`  ${c.slug} — ok (${tsx.length} chars)`);
    ok++;
  }
  // Capture the export name for the barrel
  const expMatch = tsx.match(/export\s+function\s+(\w+)/);
  if (expMatch) {
    exportLines.push(
      `export { ${expMatch[1]} } from "./${c.slug}-ai-summary";`,
    );
  }
}

// Write the barrel
const barrel = join(OUT_DIR, "index.ts");
writeFileSync(
  barrel,
  `/**\n * AI Summary component barrel.\n * Generated 2026-06-05 from warp-9-ai-cards workflow.\n * 20 per-page server components that emit a noir aside with a\n * Gemini-tuned summary block (topic statement + key facts +\n * what-this-is-not bullets + canonical URL).\n */\n${exportLines.join("\n")}\n`,
  "utf8",
);
console.log(`\nWrote barrel: ${barrel}`);
console.log(`Result: ok=${ok} skip=${skip} fail=${fail}`);
