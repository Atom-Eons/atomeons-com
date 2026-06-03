#!/usr/bin/env node
/**
 * decode-marketing.mjs
 *
 * Reads the marketing-on-the-phone workflow JSON output and emits:
 *   1. app/orangebox-primer/page.tsx — full file from the judge-winning draft
 *   2. /tmp/headline-verdicts.md — operator-readable list of winners + reasoning
 *
 * The workflow returns:
 *   { primerDrafts: [string, string, string],
 *     primerJudge: string,
 *     judgeVerdicts: [{key, verdict}, ...] }
 *
 * Each primer draft begins with a ```tsx fence then `// FILE: ...` then
 * the TSX body. We strip the fence + extract the TSX after the FILE
 * header, then unescape JSON + HTML entities the same way decode-cannons
 * does. Identical materializer pattern.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const REPO = resolve("C:/AtomEons/github/atomeons-com");
const SRC = resolve(
  "C:/Users/a/.claude/projects/C--AtomEons--claude-worktrees-bold-leakey-4470e8/36c5895e-6dd9-41db-9f77-29d3975f016f/tool-results/bc22derib.txt",
);

// Persisted-output files sometimes have a directory-listing preamble
// before the actual JSON. Slice from the first {.
const rawAll = readFileSync(SRC, "utf8");
const start = rawAll.indexOf("\n{\n");
const raw = start === -1 ? rawAll : rawAll.slice(start + 1);
const doc = JSON.parse(raw);

const drafts = doc.result.primerDrafts;
const primerJudge = doc.result.primerJudge;
const verdicts = doc.result.judgeVerdicts;

console.log("=== PRIMER JUDGE VERDICT ===");
console.log(primerJudge);
console.log("");
console.log("=== SURFACE JUDGE VERDICTS ===");
for (const v of verdicts) {
  console.log(`-- ${v.key} --`);
  console.log(v.verdict);
  console.log("");
}

// Parse the judge's WINNER line for which draft to materialize.
function extractWinnerIndex(verdict) {
  const m = verdict.match(/WINNER\s*:\s*(?:draft\s+)?(\d)/i);
  return m ? parseInt(m[1], 10) - 1 : 0;
}

const winnerIdx = extractWinnerIndex(primerJudge);
console.log(`>>> Primer winner: draft ${winnerIdx + 1}`);

function htmlDecode(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function extractTsxFromDraft(draft) {
  // Strip ```tsx ... ``` fences if present
  let body = draft;
  body = body.replace(/^```(?:tsx)?\s*\n?/, "");
  body = body.replace(/\n?```\s*$/, "");

  // Find FILE header
  const fileMatch = body.match(/\/\/\s*FILE:\s*([^\s\n\r]+)\s*\r?\n/);
  if (!fileMatch) {
    throw new Error("No // FILE: header in winning draft");
  }
  const path = fileMatch[1].trim();
  const after = body.slice(fileMatch.index + fileMatch[0].length);
  return { path, body: htmlDecode(after) };
}

const winner = extractTsxFromDraft(drafts[winnerIdx]);
const outPath = join(REPO, winner.path.replace(/^\.\//, ""));
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, winner.body, "utf8");
console.log(`>>> Wrote ${winner.path} (${winner.body.length} bytes)`);

// Write all headline verdicts to a single markdown summary
const md = [
  "# Marketing-on-the-phone — judge verdicts",
  "",
  "Run: 2026-06-03 · wsg4nxdol",
  "",
  "## Primer judge",
  "",
  "```",
  primerJudge,
  "```",
  "",
  "## Surface headline judges",
  "",
];
for (const v of verdicts) {
  md.push(`### ${v.key}`, "", "```", v.verdict, "```", "");
}

const mdPath = join(REPO, ".scripts/audit-out/headline-verdicts.md");
mkdirSync(dirname(mdPath), { recursive: true });
writeFileSync(mdPath, md.join("\n"), "utf8");
console.log(`>>> Wrote .scripts/audit-out/headline-verdicts.md`);
