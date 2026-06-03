#!/usr/bin/env node
/**
 * decode-cannons.mjs
 *
 * Reads the all-cannons-surgery workflow output (JSON object with
 * { results: [string, string, ...] }) and writes each agent's TSX
 * payload to its target path.
 *
 * Strategy:
 *   1. Parse the JSON.
 *   2. For each result string, locate the `// FILE: <path>` header
 *      (agents were instructed to emit this).
 *   3. Slice out everything between that header and the next `// FILE:`
 *      (or end of string).
 *   4. JSON-unescape (\n, \", \\), then HTML-decode (&amp; &gt; &lt; &quot;
 *      &#39; &apos;) — the workflow journal double-encodes once each way.
 *   5. Write to <repo>/<path>.
 *
 * Strict: if a target path was expected but no FILE block found, the
 * script bails with the agent index. Operator should re-fire that lane.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const REPO = resolve("C:/AtomEons/github/atomeons-com");
const SRC = resolve(
  "C:/Users/a/.claude/projects/C--AtomEons--claude-worktrees-bold-leakey-4470e8/36c5895e-6dd9-41db-9f77-29d3975f016f/tool-results/b9ha5i9x1.txt",
);

const raw = readFileSync(SRC, "utf8");

let doc;
try {
  doc = JSON.parse(raw);
} catch (err) {
  console.error("FAIL: could not parse workflow output as JSON:", err.message);
  process.exit(1);
}

const results = doc?.result?.results ?? doc?.results;
if (!Array.isArray(results)) {
  console.error("FAIL: no { result.results } or { results } array.");
  process.exit(1);
}

// Decode HTML entities the workflow journal may have inserted into TSX
// source ( &amp;&amp; , &lt; , &gt; , &quot; , &#39; , &apos; ).
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

// JSON.parse already unescaped \n \" \\ at the JSON layer when the
// outer object loaded — the strings handed to us are real TSX with real
// newlines. We only need the HTML pass.

const FILE_RE = /\/\/\s*FILE:\s*([^\s\n\r]+)\s*\r?\n/g;

const written = [];
const skipped = [];

for (let i = 0; i < results.length; i++) {
  const result = results[i];
  if (typeof result !== "string") {
    skipped.push({ idx: i, reason: "non-string result" });
    continue;
  }

  // Find every FILE: header in this agent's output (an agent might
  // emit several files — accept all of them).
  const decoded = htmlDecode(result);
  const matches = [...decoded.matchAll(FILE_RE)];

  if (matches.length === 0) {
    skipped.push({ idx: i, reason: "no // FILE: header" });
    continue;
  }

  for (let m = 0; m < matches.length; m++) {
    const match = matches[m];
    const relPath = match[1].trim();
    const start = match.index + match[0].length;
    const end =
      m + 1 < matches.length ? matches[m + 1].index : decoded.length;

    let body = decoded.slice(start, end).trimEnd() + "\n";

    // Trim agent narrator preamble if the agent kept talking after
    // the file boundary marker. We accept content up to a sentinel
    // like `// END FILE` or the next `// FILE:` (already handled).
    const endMarker = body.match(/\n\/\/\s*END\s+FILE[^\n]*\n/);
    if (endMarker) body = body.slice(0, endMarker.index) + "\n";

    const outPath = join(REPO, relPath.replace(/^\.\//, ""));
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, body, "utf8");
    written.push({ idx: i, path: relPath, bytes: body.length });
  }
}

console.log(`written: ${written.length} file(s)`);
for (const w of written) {
  console.log(`  agent ${w.idx} → ${w.path}  (${w.bytes} bytes)`);
}
if (skipped.length) {
  console.log(`skipped: ${skipped.length} agent(s)`);
  for (const s of skipped) console.log(`  agent ${s.idx}: ${s.reason}`);
}
