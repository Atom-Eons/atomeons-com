import fs from "node:fs";
const SRC = "C:/Users/a/AppData/Local/Temp/claude/C--AtomEons--claude-worktrees-bold-leakey-4470e8/36c5895e-6dd9-41db-9f77-29d3975f016f/tasks/wn2rccbpi.output";
const data = JSON.parse(fs.readFileSync(SRC, "utf8")).result;
console.log("=== NAV RECOMMENDATION ===");
console.log(JSON.stringify(data.strategy.nav.recommendation, null, 2));
console.log("\n=== CURRENT-SITE CRITIQUE ===");
data.strategy.nav.currentSiteCritique.forEach((c, i) => {
  console.log(`${i + 1}. ${c.issue}`);
  console.log(`   fix → ${c.fix}\n`);
});
console.log("\n=== PRINCIPLES ===");
data.strategy.nav.principlesExtracted.forEach((p, i) => console.log(`${i + 1}. ${p}`));
