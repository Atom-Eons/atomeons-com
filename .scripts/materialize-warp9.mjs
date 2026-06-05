#!/usr/bin/env node
/**
 * materialize-warp9.mjs
 *
 * Master materializer for the warp-9 education build.
 *
 * Reads workflow result JSON files (one per workflow), extracts the
 * ```tsx code blocks from each agent's markdown output, and writes
 * paste-ready Next.js page.tsx files to the correct route paths.
 *
 * USAGE:
 *   node .scripts/materialize-warp9.mjs \
 *     --atlas    <path-to-warp-9-education.json> \
 *     --decoded  <path-to-warp-9-decoded-papers.json> \
 *     --breaches <path-to-warp-9-cyber-breaches.json> \
 *     --vertical <path-to-warp-9-vertical-ai.json>
 *
 * Any flag may be omitted; only provided workflows are materialized.
 *
 * SAFETY
 *   - Refuses to overwrite an existing page.tsx (skip-with-report).
 *   - Strips agent preamble / chatter outside the ```tsx block.
 *   - Validates that the TSX has `export default function` + `export
 *     const metadata` before writing.
 *   - Reports a final ledger to stdout: ok / skip / fail counts.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

const ROOT = "C:/AtomEons/github/atomeons-com";

// ─── argv parsing (no deps) ───────────────────────────────────────────
function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const key = a.slice(2);
      const val = argv[i + 1];
      if (val && !val.startsWith("--")) {
        args[key] = val;
        i++;
      } else {
        args[key] = true;
      }
    }
  }
  return args;
}

// ─── extract the first complete ```tsx ... ``` block ──────────────────
function extractTsx(content) {
  if (typeof content !== "string") return null;
  const m = content.match(/```(?:tsx|jsx|ts)\s*\n([\s\S]*?)```/);
  if (!m) return null;
  const tsx = m[1].trim();
  // Strip leading "// FILE: ..." comment if present — we set the path ourselves
  return tsx.replace(/^\/\/ FILE:.*\n/, "").trim();
}

function validateTsx(tsx) {
  if (!tsx) return "no tsx block";
  if (!/export\s+default\s+function/.test(tsx)) return "no default export";
  if (!/export\s+const\s+metadata/.test(tsx)) return "no metadata export";
  if (!/import\s+/.test(tsx)) return "no imports";
  if (tsx.length < 1500) return "too short (< 1500 chars)";
  return null;
}

function ensureDir(filePath) {
  const dir = dirname(filePath);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

function materialize(items, routeOf, label) {
  const out = { ok: [], skip: [], fail: [] };
  for (const item of items) {
    const slug = item.slug;
    const tsx = extractTsx(item.content);
    const err = validateTsx(tsx);
    const target = join(ROOT, routeOf(slug)).replace(/\\/g, "/");
    if (err) {
      out.fail.push({ slug, target, reason: err });
      continue;
    }
    if (existsSync(target)) {
      out.skip.push({ slug, target, reason: "exists" });
      continue;
    }
    try {
      ensureDir(target);
      writeFileSync(target, tsx, "utf8");
      out.ok.push({ slug, target, bytes: tsx.length });
    } catch (e) {
      out.fail.push({ slug, target, reason: String(e.message || e) });
    }
  }
  console.log(
    `[${label}] ok=${out.ok.length} skip=${out.skip.length} fail=${out.fail.length}`,
  );
  if (out.fail.length) {
    console.log(`  FAILED:`);
    for (const f of out.fail) console.log(`    ${f.slug} — ${f.reason}`);
  }
  if (out.skip.length) {
    console.log(`  SKIPPED (already exists):`);
    for (const s of out.skip) console.log(`    ${s.slug}`);
  }
  return out;
}

// ─── main ─────────────────────────────────────────────────────────────
const args = parseArgs(process.argv.slice(2));

const allLedgers = {};

if (args.atlas) {
  const raw = JSON.parse(readFileSync(args.atlas, "utf8"));
  // Atlas workflow returns { atlas: [...], cyber: [...] }
  const atlasItems = raw.atlas ?? [];
  const cyberItems = raw.cyber ?? [];
  allLedgers.atlas = materialize(
    atlasItems,
    (s) => `app/learn/atlas/${s}/page.tsx`,
    "atlas",
  );
  allLedgers.atlasCyber = materialize(
    cyberItems,
    (s) => `app/learn/cyber/${s}/page.tsx`,
    "atlas-cyber",
  );
}

if (args.decoded) {
  const raw = JSON.parse(readFileSync(args.decoded, "utf8"));
  const items = raw.papers ?? [];
  allLedgers.decoded = materialize(
    items,
    (s) => `app/research/decoded/${s}/page.tsx`,
    "decoded",
  );
}

if (args.breaches) {
  const raw = JSON.parse(readFileSync(args.breaches, "utf8"));
  const items = raw.breaches ?? [];
  allLedgers.breaches = materialize(
    items,
    (s) => `app/learn/cyber/${s}/page.tsx`,
    "breaches",
  );
}

if (args.vertical) {
  const raw = JSON.parse(readFileSync(args.vertical, "utf8"));
  const items = raw.sectors ?? [];
  allLedgers.vertical = materialize(
    items,
    (s) => `app/learn/vertical/${s}/page.tsx`,
    "vertical",
  );
}

// ─── final summary ───────────────────────────────────────────────────
const totals = Object.values(allLedgers).reduce(
  (acc, l) => {
    acc.ok += l.ok.length;
    acc.skip += l.skip.length;
    acc.fail += l.fail.length;
    return acc;
  },
  { ok: 0, skip: 0, fail: 0 },
);

console.log(
  `\n═══════════════════════════════════════════════════════════════\n` +
    ` MATERIALIZATION COMPLETE\n` +
    ` ok=${totals.ok}  skip=${totals.skip}  fail=${totals.fail}\n` +
    `═══════════════════════════════════════════════════════════════`,
);
