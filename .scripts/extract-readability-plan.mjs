import { readFileSync, writeFileSync } from "node:fs";

const PATH = "C:/Users/a/AppData/Local/Temp/claude/C--AtomEons--claude-worktrees-bold-leakey-4470e8/36c5895e-6dd9-41db-9f77-29d3975f016f/tasks/wzq88p439.output";

const raw = readFileSync(PATH, "utf8");
console.log("File size:", raw.length);

// The JSON is the entire file. Parse it.
const outer = JSON.parse(raw);
const data = outer.result || outer;

// Top-level keys are: audits, synthesis, approvedPrescriptions, plan
console.log("Outer keys:", Object.keys(outer));
console.log("Result keys:", Object.keys(data));
console.log("");
console.log("=== SYNTHESIS THEMES ===");
if (data.synthesis && data.synthesis.themes) {
  for (const t of data.synthesis.themes) {
    console.log(`• ${t.theme}`);
  }
}
console.log("");
console.log("=== TOP FIXES ACROSS DIMENSIONS ===");
if (data.synthesis && data.synthesis.topFixesAcrossDimensions) {
  for (const f of data.synthesis.topFixesAcrossDimensions) {
    console.log(`★ ${f}`);
  }
}
console.log("");
console.log("=== TOP ISSUES (full list) ===");
if (data.synthesis && data.synthesis.topIssues) {
  for (const i of data.synthesis.topIssues) {
    console.log(`#${i.rank} [${i.severity}] ${i.title}`);
    console.log(`  file: ${i.file}`);
    console.log(`  issue: ${i.issue.slice(0, 200)}${i.issue.length > 200 ? "..." : ""}`);
  }
}
console.log("");
console.log("=== FINAL PLAN ===");
if (data.plan) {
  console.log("EXECUTIVE SUMMARY:");
  console.log(data.plan.executiveSummary);
  console.log("");
  console.log("TOP THEMES:");
  if (data.plan.topThemes) {
    for (const t of data.plan.topThemes) {
      console.log(`• ${t.theme}`);
      console.log(`  Diagnosis: ${t.diagnosis}`);
      console.log(`  Remedy: ${t.remedy}`);
      console.log("");
    }
  }
  console.log("ESTIMATED IMPACT:", data.plan.estimatedTotalImpact);
  console.log("");
  console.log("RISK NOTES:");
  if (data.plan.riskNotes) {
    for (const r of data.plan.riskNotes) console.log(`! ${r}`);
  }
  console.log("");
  console.log(`IMPLEMENTATION ORDER (${(data.plan.implementationOrder || []).length} steps):`);
  if (data.plan.implementationOrder) {
    for (const s of data.plan.implementationOrder) {
      console.log(`\n--- STEP ${s.step}: ${s.file} ---`);
      console.log(`CHANGE: ${s.change}`);
      console.log(`RATIONALE: ${s.rationale}`);
      console.log(`EXAMPLE AFTER:`);
      console.log(s.exampleAfter);
    }
  }
}

// Also write the consolidated plan to a file for posterity
writeFileSync(".scripts/readability-plan.json", JSON.stringify(data.plan, null, 2));
console.log("");
console.log("Plan written to .scripts/readability-plan.json");
