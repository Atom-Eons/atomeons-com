import { readFileSync } from "node:fs";

const PATH = "C:/Users/a/AppData/Local/Temp/claude/C--AtomEons--claude-worktrees-bold-leakey-4470e8/36c5895e-6dd9-41db-9f77-29d3975f016f/tasks/woz227isj.output";

const raw = readFileSync(PATH, "utf8");
const json = JSON.parse(raw);

console.log("Top-level keys:", Object.keys(json));
console.log("result keys:", Object.keys(json.result));
for (const k of Object.keys(json.result)) {
  const v = json.result[k];
  if (Array.isArray(v)) {
    console.log(`  ${k}: array len=${v.length}`);
    if (v[0]) console.log(`    first item keys:`, Object.keys(v[0]));
  } else {
    console.log(`  ${k}: ${typeof v}`);
  }
}
