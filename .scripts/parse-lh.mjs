#!/usr/bin/env node
// Quick parser · prints failed lighthouse audits from a report.json
import fs from "node:fs";

const path = process.argv[2];
if (!path) {
  console.error("usage: parse-lh.mjs <report.json>");
  process.exit(1);
}
const r = JSON.parse(fs.readFileSync(path, "utf8"));
console.log(`=== ${r.requestedUrl} ===`);
console.log(`Performance: ${r.categories?.performance?.score ?? "n/a"}`);
console.log(`Accessibility: ${r.categories?.accessibility?.score ?? "n/a"}`);
console.log(`Best Practices: ${r.categories?.["best-practices"]?.score ?? "n/a"}`);
console.log(`SEO: ${r.categories?.seo?.score ?? "n/a"}`);
console.log();
console.log("=== FAILED AUDITS ===");
for (const [k, v] of Object.entries(r.audits)) {
  if (
    v.score !== null &&
    v.score !== undefined &&
    v.score < 1 &&
    (v.scoreDisplayMode === "binary" ||
      v.scoreDisplayMode === "numeric" ||
      v.scoreDisplayMode === "metricSavings")
  ) {
    console.log(`[${v.score.toFixed(2)}] ${k}`);
    console.log(`  ${v.title}`);
    if (v.displayValue) console.log(`  → ${v.displayValue}`);
    // Surface the items list if present
    const items = v.details?.items;
    if (Array.isArray(items) && items.length > 0) {
      console.log(`  ${items.length} item(s):`);
      for (const it of items.slice(0, 3)) {
        const snippet =
          it.node?.snippet ||
          it.node?.selector ||
          it.url ||
          it.source ||
          JSON.stringify(it).slice(0, 100);
        console.log(`    · ${snippet.slice(0, 140)}`);
      }
    }
  }
}
