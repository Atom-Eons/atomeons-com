import { readFileSync } from "node:fs";

const raw = readFileSync(
  "C:/Users/a/.claude/projects/C--AtomEons--claude-worktrees-bold-leakey-4470e8/36c5895e-6dd9-41db-9f77-29d3975f016f/tool-results/b9ha5i9x1.txt",
  "utf8",
);

const doc = JSON.parse(raw);
const r = doc.result.results[4];
console.log("--- AGENT 4 RAW LENGTH:", r.length);
console.log("--- AGENT 4 OUTPUT ---");
console.log(r);
console.log("--- END ---");
