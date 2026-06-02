import { readFileSync, writeFileSync } from "node:fs";

const PATH = "C:/Users/a/AppData/Local/Temp/claude/C--AtomEons--claude-worktrees-bold-leakey-4470e8/36c5895e-6dd9-41db-9f77-29d3975f016f/tasks/wkr310pbs.output";

const raw = readFileSync(PATH, "utf8");
console.log("File size:", raw.length);
const outer = JSON.parse(raw);
const data = outer.result || outer;
console.log("Top-level keys:", Object.keys(data));
console.log("");

console.log("=== WINNER ===");
console.log(JSON.stringify(data.winner, null, 2).slice(0, 2000));
console.log("");

console.log("=== IMPLEMENTATIONS ===");
if (data.files && Array.isArray(data.files)) {
  console.log(`Total files: ${data.files.length}`);
  for (const f of data.files) {
    console.log(`  ${f.path}  (${f.code?.length || 0} chars)`);
  }
}
console.log("");

console.log("=== SHIP BRIEF ===");
if (data.shipBrief) {
  console.log("winnerDirection:", data.shipBrief.winnerDirection);
  console.log("summary:");
  console.log(data.shipBrief.summary);
  console.log("");
  console.log("shipOrder:");
  console.log(data.shipBrief.shipOrder);
}

// Write the consolidated workflow result to a more readable file
writeFileSync(".scripts/trillion-v2-output.json", JSON.stringify(data, null, 2));
console.log("");
console.log("Full output written to .scripts/trillion-v2-output.json");
