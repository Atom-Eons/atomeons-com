#!/usr/bin/env node
/**
 * sweep-og-cards.mjs · idempotent OG card generator
 *
 * For each route listed in CONFIG below, writes an opengraph-image.tsx
 * file (if one does not exist) using the shared NoirCard renderer.
 *
 * Safe to re-run · skips existing opengraph-image.tsx files.
 *
 * After this runs, every listed route serves a 1200x630 PNG when
 * crawlers / social cards request its /opengraph-image surface.
 */
import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";

const ROOT = "C:/AtomEons/github/atomeons-com/app";

const CONFIG = [
  // Trust / credibility lane
  { route: "trust", section: "§ trust · posture", title: "Trust is given when a claim can be opened.", stamp: "POSTURE", accent: "cyan", rightPrimary: "10", rightLabel: "WILL-NOT clauses" },
  { route: "transparency", section: "§ financial transparency · 2026-06", title: "What the lab costs to run.", stamp: "OPEN BOOK", accent: "gold", rightPrimary: "$0", rightLabel: "VC dollars taken · ever" },
  { route: "lab", section: "§ the lab · Marco Island, FL", title: "One room. One operator.", stamp: "ANTI-LARP", accent: "cyan", rightPrimary: "1", rightLabel: "operator on file" },
  { route: "integrations", section: "§ integrations · stack map", title: "Where the lab connects.", stamp: "PUBLIC", accent: "cyan", rightPrimary: "20", rightLabel: "services categorized · CC-BY 4.0" },
  { route: "aesthetic", section: "§ visual language · V3 noir", title: "Every choice is deliberate.", stamp: "MANIFESTO", accent: "cyan", rightPrimary: "11", rightLabel: "color palette · 10 authoring rules" },
  { route: "colophon", section: "§ colophon · stack inventory", title: "No mystery boxes.", stamp: "OPEN STACK", accent: "cyan", rightPrimary: "16", rightLabel: "deps pinned · 9 explicit no-uses" },
  { route: "timeline", section: "§ timeline · ship log", title: "What the lab has shipped.", stamp: "CHRONO", accent: "cyan", rightPrimary: "25", rightLabel: "entries in time order" },
  { route: "influences", section: "§ influences · named", title: "The inputs to the output.", stamp: "DISCLOSED", accent: "cyan", rightPrimary: "30", rightLabel: "people named · with reasoning" },
  { route: "live", section: "§ live · polling every 8s", title: "What the lab is doing right now.", stamp: "LIVE", accent: "pulse", rightPrimary: "8s", rightLabel: "poll interval · honest offline state" },

  // Product depth lane (orangebox · b00kmakor · skilski)
  { route: "orangebox/changelog", section: "§ ORANGEBOX · changelog", title: "Every release on file.", stamp: "SHIPPED", accent: "cyan", rightPrimary: "v1.0.0", rightLabel: "current · SHA-256 stamped" },
  { route: "orangebox/roadmap", section: "§ ORANGEBOX · roadmap", title: "What we will build · what we will not.", stamp: "BINDING", accent: "pulse", rightPrimary: "8", rightLabel: "anti-roadmap clauses · §4A binding" },
  { route: "orangebox/competitors", section: "§ ORANGEBOX vs alternatives", title: "Where we lose. Where we win.", stamp: "HONEST", accent: "gold", rightPrimary: "6", rightLabel: "head-to-heads named" },
  { route: "b00kmakor/changelog", section: "§ B00KMAKR · changelog", title: "From prototype to publishing instrument.", stamp: "SHIPPED", accent: "cyan", rightPrimary: "v3.2", rightLabel: "Mac + Windows · audiobook ready" },
  { route: "b00kmakor/roadmap", section: "§ B00KMAKR · roadmap", title: "An instrument, not a content factory.", stamp: "BINDING", accent: "pulse", rightPrimary: "6", rightLabel: "anti-roadmap clauses" },
  { route: "b00kmakor/competitors", section: "§ B00KMAKR vs alternatives", title: "Different instruments for different stages.", stamp: "HONEST", accent: "gold", rightPrimary: "5", rightLabel: "head-to-heads named" },
  { route: "skilski/changelog", section: "§ skil.ski · changelog", title: "From internal Oski to public registry.", stamp: "LIVE v1.0", accent: "cyan", rightPrimary: "2127", rightLabel: "skills indexed · 13 sectors" },
  { route: "skilski/roadmap", section: "§ skil.ski · roadmap", title: "The registry, not the marketplace-of-everything.", stamp: "BINDING", accent: "pulse", rightPrimary: "7", rightLabel: "anti-roadmap clauses" },
  { route: "skilski/competitors", section: "§ skil.ski vs alternatives", title: "Different shapes for different buyers.", stamp: "HONEST", accent: "gold", rightPrimary: "5", rightLabel: "head-to-heads named" },

  // Teaching lane
  { route: "teach", section: "§ teach · methodology", title: "How we made the curriculum.", stamp: "CC-BY 4.0", accent: "cyan", rightPrimary: "8", rightLabel: "principles · open source" },
  { route: "learn/labs", section: "§ labs · hands-on", title: "Stop reading. Start doing.", stamp: "HANDS-ON", accent: "cyan", rightPrimary: "12", rightLabel: "labs · 5-level coverage" },
  { route: "learn/projects", section: "§ projects · build-along", title: "Ship the artifact, learn the lesson.", stamp: "BUILD", accent: "cyan", rightPrimary: "7", rightLabel: "projects · upper 4 levels" },
  { route: "learn/exam", section: "§ exam · self-assessment", title: "Find your honest level.", stamp: "NO CREDS", accent: "gold", rightPrimary: "25", rightLabel: "questions · 5-level ladder" },

  // Personal / signature
  { route: "library", section: "§ library · books", title: "The shelf as it stands.", stamp: "OPERATOR", accent: "cyan", rightPrimary: "20", rightLabel: "books named · with reviews" },
  { route: "listening", section: "§ listening · studio music", title: "What plays while the work happens.", stamp: "STUDIO", accent: "cyan", rightPrimary: "20", rightLabel: "albums · one-line notes" },
  { route: "watching", section: "§ watching · films + TV", title: "What we keep coming back to.", stamp: "CINEMA", accent: "cyan", rightPrimary: "22", rightLabel: "works · honest notes" },
  { route: "dear-reader", section: "§ dear reader · letters", title: "Letters that needed more room.", stamp: "LONG-FORM", accent: "cyan", rightPrimary: "5", rightLabel: "letters · irregular cadence" },
  { route: "correspondence", section: "§ correspondence · inbox", title: "What the lab actually says.", stamp: "SANITIZED", accent: "cyan", rightPrimary: "7", rightLabel: "real email replies · with permission" },

  // Discovery
  { route: "compare", section: "§ compare · honest matrices", title: "Where we win. Where we lose.", stamp: "MATRICES", accent: "gold", rightPrimary: "3", rightLabel: "head-to-head products" },
  { route: "use-cases", section: "§ use cases · by persona", title: "Who AtomEons is for.", stamp: "PERSONA", accent: "cyan", rightPrimary: "10", rightLabel: "personas named · workflows" },
  { route: "api", section: "§ developer API · public", title: "Build on atomeons.com.", stamp: "OPEN API", accent: "cyan", rightPrimary: "6", rightLabel: "endpoints · CORS open · CC-BY 4.0" },
];

let written = 0;
let skipped = 0;

for (const c of CONFIG) {
  const dir = join(ROOT, c.route);
  const outFile = join(dir, "opengraph-image.tsx");

  if (existsSync(outFile)) {
    skipped++;
    continue;
  }

  mkdirSync(dir, { recursive: true });

  const tsx = `import { renderNoirCard, ogSize, ogContentType } from "@/app/_components/og/NoirCard";

export const runtime = "edge";
export const alt =
  ${JSON.stringify(`${c.title} · AtomEons Systems Laboratory`)};
export const size = ogSize;
export const contentType = ogContentType;

/**
 * /${c.route} · OG card · generated by .scripts/sweep-og-cards.mjs
 * Edit the CONFIG array in the script if you want to retune; this file
 * is otherwise a thin wrapper around the shared NoirCard renderer.
 */
export default function OG() {
  return renderNoirCard({
    section: ${JSON.stringify(c.section)},
    title: ${JSON.stringify(c.title)},
    stamp: ${JSON.stringify(c.stamp)},
    accent: ${JSON.stringify(c.accent)},
    rightPrimary: ${JSON.stringify(c.rightPrimary)},
    rightLabel: ${JSON.stringify(c.rightLabel)},
    bottomReceipt: "atomeons.com/${c.route} · CC-BY 4.0",
  });
}
`;
  writeFileSync(outFile, tsx, "utf8");
  written++;
  console.log(`  wrote · ${c.route}/opengraph-image.tsx`);
}

console.log(`\nDone · wrote=${written} · skipped=${skipped}`);
