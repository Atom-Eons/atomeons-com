#!/usr/bin/env node
/**
 * materialize-llm-routes.mjs
 *
 * Parse the warp-9-llm-indexable workflow output and write:
 *   - public/llm-routes.json     (crawler-readable index, AI-discoverable)
 *   - app/_data/llm-routes.ts    (typed module the site imports)
 *
 * Each entry has: { route, title, description, keywords, openGraph,
 * twitter, jsonLd, forLlms (the markdown summary as a string) }.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";

const ROOT = "C:/AtomEons/github/atomeons-com";
const taskFile = process.argv[2];

if (!taskFile) {
  console.error("usage: node materialize-llm-routes.mjs <task-output-file>");
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

if (!payload?.routes || !Array.isArray(payload.routes)) {
  console.error("No routes[] in payload");
  process.exit(1);
}

function extractJson(content) {
  const m = content.match(/```json\s*\n([\s\S]*?)```/);
  if (!m) return null;
  try {
    return JSON.parse(m[1]);
  } catch (e) {
    return null;
  }
}

function extractForLlms(content) {
  const m = content.match(/```markdown\s*\n([\s\S]*?)```/);
  return m ? m[1].trim() : null;
}

const records = [];
for (const r of payload.routes) {
  const meta = extractJson(r.content);
  const forLlms = extractForLlms(r.content);
  if (!meta) {
    console.log(`  ${r.path} — FAIL no JSON block`);
    continue;
  }
  records.push({
    ...meta,
    forLlms: forLlms || null,
  });
}

// 1. Crawler-discoverable JSON
const pubPath = join(ROOT, "public/llm-routes.json");
writeFileSync(
  pubPath,
  JSON.stringify(
    {
      v: 1,
      built: "2026-06-05",
      count: records.length,
      records,
    },
    null,
    2,
  ),
  "utf8",
);
console.log(`Wrote ${pubPath} (${records.length} routes)`);

// 2. Typed TypeScript module
const dataDir = join(ROOT, "app/_data");
if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });
const tsPath = join(dataDir, "llm-routes.ts");
const ts =
  `// AUTO-GENERATED 2026-06-05 from .scripts/materialize-llm-routes.mjs.\n` +
  `// Source: warp-9-llm-indexable workflow output.\n` +
  `// Each route has tightened SEO metadata + JSON-LD + an LLM-friendly\n` +
  `// summary markdown block ("forLlms"). Imported by <LLMSummary /> and\n` +
  `// by individual page metadata exports for site-wide AI SEO.\n` +
  `\n` +
  `export type LlmRouteRecord = {\n` +
  `  route: string;\n` +
  `  title: string;\n` +
  `  description: string;\n` +
  `  keywords: string[];\n` +
  `  openGraph: { title: string; description: string; type: string };\n` +
  `  twitter: { card: string; title: string; description: string };\n` +
  `  jsonLd: Record<string, unknown>;\n` +
  `  forLlms: string | null;\n` +
  `};\n` +
  `\n` +
  `export const LLM_ROUTES: LlmRouteRecord[] = ${JSON.stringify(records, null, 2)};\n` +
  `\n` +
  `export const LLM_ROUTE_MAP: Record<string, LlmRouteRecord> = Object.fromEntries(\n` +
  `  LLM_ROUTES.map((r) => [r.route, r]),\n` +
  `);\n` +
  `\n` +
  `export function llmRoute(path: string): LlmRouteRecord | null {\n` +
  `  return LLM_ROUTE_MAP[path] ?? null;\n` +
  `}\n`;

writeFileSync(tsPath, ts, "utf8");
console.log(`Wrote ${tsPath} (${records.length} routes typed)`);

console.log(`\nDone. ${records.length}/${payload.routes.length} routes materialized.`);
