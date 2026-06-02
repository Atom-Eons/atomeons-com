/**
 * Inject heroImageSlug + heroImageAlt props into GenericPage and Calculator
 * JSX calls in the 38 nvidia-tier-50 materialized pages.
 *
 * Only acts when:
 *   - target page file exists
 *   - public/learn-images/{slug}.png exists
 *   - the page JSX doesn't already have heroImageSlug
 *
 * Idempotent. Re-run safely.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";

const ROOT = "C:/AtomEons/github/atomeons-com";

// section-prefix slug -> page path -> alt
const PAGES = [
  // ATLAS (12)
  { slug: "atlas-history", path: "app/learn/atlas/history/page.tsx", alt: "Three artifacts on dark slate: a vacuum tube, a perforated punch-card, and a black silicon chip — the chronology of compute." },
  { slug: "atlas-transformer-variants", path: "app/learn/atlas/transformer-variants/page.tsx", alt: "Polished black branching Y-form sculpture against deep void black — the transformer family tree." },
  { slug: "atlas-rlhf-family", path: "app/learn/atlas/rlhf-family/page.tsx", alt: "Four matte-black tuning forks of decreasing size on dark slate — RLHF, DPO, KTO, ORPO." },
  { slug: "atlas-mech-interp", path: "app/learn/atlas/mech-interp/page.tsx", alt: "Macro of an open mechanical watch movement showing gears and jewels — interpretability is looking inside." },
  { slug: "atlas-multimodal", path: "app/learn/atlas/multimodal/page.tsx", alt: "A black sphere, a black cube, and a black cylinder on dark slate — three modalities, one form factor." },
  { slug: "atlas-embeddings", path: "app/learn/atlas/embeddings/page.tsx", alt: "A single point of bio-cyan light suspended inside a clear crystal cube — a vector in semantic space." },
  { slug: "atlas-hallucinations", path: "app/learn/atlas/hallucinations/page.tsx", alt: "A black-mirror surface with a slightly distorted reflection — confident lies look like truth." },
  { slug: "atlas-safety", path: "app/learn/atlas/safety/page.tsx", alt: "A single small bio-cyan light glowing in a vast dark concrete chamber — safety is what you keep contained." },
  { slug: "atlas-moe", path: "app/learn/atlas/moe/page.tsx", alt: "Seven identical matte-black gears in a hexagonal cluster, one glowing cyan — mixture of experts." },
  { slug: "atlas-context", path: "app/learn/atlas/context/page.tsx", alt: "A long folded accordion-fan form extending into vanishing-point distance — the context window." },
  { slug: "atlas-training", path: "app/learn/atlas/training/page.tsx", alt: "Vast top-down architectural shot of an empty server room — where training actually happens." },
  { slug: "atlas-post-training", path: "app/learn/atlas/post-training/page.tsx", alt: "A watchmaker's precision tool kit on dark felt — post-training is the craft layer." },

  // CAREER (8)
  { slug: "career-pathways", path: "app/learn/career/pathways/page.tsx", alt: "A dark wet road forking into two paths, a single bio-cyan trail following one — career pathways branch." },
  { slug: "career-skill-tree", path: "app/learn/career/skill-tree/page.tsx", alt: "Bare leafless tree branches against deep navy sky, a single bio-cyan light at one branch tip." },
  { slug: "career-salaries", path: "app/learn/career/salaries/page.tsx", alt: "Five matte-black machined blocks of ascending heights — salary bands as bar chart." },
  { slug: "career-resume", path: "app/learn/career/resume/page.tsx", alt: "A folded dark sheet of paper on slate with a single bio-cyan thread through the fold." },
  { slug: "career-interviews", path: "app/learn/career/interviews/page.tsx", alt: "Two empty matte-black chairs across a wide dark wooden table — the interview is the conversation." },
  { slug: "career-non-technical", path: "app/learn/career/non-technical/page.tsx", alt: "A closed matte-black notebook with a pen beside it on dark slate — non-technical roles." },
  { slug: "career-negotiation", path: "app/learn/career/negotiation/page.tsx", alt: "An unlit chess board with all matte-black pieces, single bio-cyan rim on the king — negotiation." },
  { slug: "career-independent", path: "app/learn/career/independent/page.tsx", alt: "A long dark corridor with a single warm-lit doorway at the end, bio-cyan light spilling from beneath." },

  // TRUST (4)
  { slug: "trust-threat-model", path: "app/learn/trust/threat-model/page.tsx", alt: "A massive dark concrete fortress wall from below, single bio-cyan watchpoint at the top." },
  { slug: "trust-prompt-injection", path: "app/learn/trust/prompt-injection/page.tsx", alt: "A single drop of liquid suspended above a perfectly still dark pool — prompt injection is one drop." },
  { slug: "trust-data-residency", path: "app/learn/trust/data-residency/page.tsx", alt: "A matte-black machined globe with a single bio-cyan equatorial line — where data lives matters." },
  { slug: "trust-compliance", path: "app/learn/trust/compliance/page.tsx", alt: "A precise stack of three dark sealed folders with a bio-cyan ribbon — compliance is paperwork done right." },

  // DECODE (4)
  { slug: "decode-acronyms", path: "app/learn/decode/acronyms/page.tsx", alt: "Geometric raised dots on dark paper, one bio-cyan dot illuminated — acronyms decoded." },
  { slug: "decode-papers", path: "app/learn/decode/papers/page.tsx", alt: "A folded dark paper manuscript edge-on, the fold catching a thin bio-cyan rim light." },
  { slug: "decode-people", path: "app/learn/decode/people/page.tsx", alt: "A matte-black desk lamp casting a warm pool of light on dark wood — the people behind the field." },
  { slug: "decode-jargon", path: "app/learn/decode/jargon/page.tsx", alt: "Dark woven fabric with three bio-cyan threads in a geometric pattern — jargon is just woven language." },

  // TRACKERS (10)
  { slug: "tracker-models", path: "app/learn/models/page.tsx", alt: "A row of seven matte-black machined cylinders of varying heights — every shipping AI model." },
  { slug: "tracker-inference-providers", path: "app/learn/inference-providers/page.tsx", alt: "A matte-black aluminum heatsink with a single bio-cyan LED — where inference actually runs." },
  { slug: "tracker-leaderboard", path: "app/learn/leaderboard/page.tsx", alt: "Five identical matte-black stacked trays of varying heights — the leaderboard." },
  { slug: "tracker-open-weights", path: "app/learn/open-weights/page.tsx", alt: "An open dark leather folio with a bio-cyan bookmark — open-weight models are the field's library." },
  { slug: "tracker-news", path: "app/learn/news/page.tsx", alt: "A precise stack of folded dark newsprint pages with a bio-cyan light strip along one edge." },
  { slug: "tracker-funding", path: "app/learn/funding/page.tsx", alt: "A single matte-black coin balanced on edge on dark slate, casting a long shadow — funding." },
  { slug: "tracker-regulation", path: "app/learn/regulation/page.tsx", alt: "A single matte-black wax-sealed legal document on dark slate — regulation arriving." },
  { slug: "tracker-failures", path: "app/learn/failures/page.tsx", alt: "A matte-black ceramic tile with a hairline fracture, bio-cyan light leaking from beneath — failures." },
  { slug: "tracker-layoffs", path: "app/learn/layoffs/page.tsx", alt: "A single empty matte-black office chair in a vast empty dark office under one cool spotlight." },
  { slug: "tracker-conferences", path: "app/learn/conferences/page.tsx", alt: "Three matte-black microphone stands on a dark stage under a single overhead spotlight." },

  // CALC TOOLS (6 generated images out of 12 total)
  { slug: "calc-cost-calculator", path: "app/learn/calc/tools/cost-calculator/page.tsx", alt: "A single matte-black abacus bead on dark slate with bio-cyan rim light." },
  { slug: "calc-token-counter", path: "app/learn/calc/tools/token-counter/page.tsx", alt: "Fine dark grains falling through a matte-black hourglass — tokens." },
  { slug: "calc-model-comparator", path: "app/learn/calc/tools/model-comparator/page.tsx", alt: "Two near-identical matte-black cubes on dark slate, one with bio-cyan rim light." },
  { slug: "calc-stack-recommender", path: "app/learn/calc/tools/stack-recommender/page.tsx", alt: "A precise stack of seven matte-black machined blocks of varying sizes." },
  { slug: "calc-hardware-calculator", path: "app/learn/calc/tools/hardware-calculator/page.tsx", alt: "Macro of a graphics card heatsink with parallel cooling fins and a bio-cyan LED." },
  { slug: "calc-break-even", path: "app/learn/calc/tools/break-even/page.tsx", alt: "A perfectly balanced matte-black seesaw fulcrum on dark slate." },
];

let added = 0;
let skipped = 0;

for (const p of PAGES) {
  const filePath = `${ROOT}/${p.path}`;
  const imagePath = `${ROOT}/public/learn-images/${p.slug}.png`;
  if (!existsSync(filePath)) {
    console.log(`  SKIP ${p.path} — page file not found`);
    skipped++;
    continue;
  }
  if (!existsSync(imagePath)) {
    console.log(`  SKIP ${p.path} — image not generated yet (${p.slug}.png)`);
    skipped++;
    continue;
  }

  let content = readFileSync(filePath, "utf8");

  if (content.includes("heroImageSlug")) {
    console.log(`  noop  ${p.path} — already has heroImageSlug`);
    skipped++;
    continue;
  }

  // Look for either <GenericPage ... /> or <Calculator ... /> JSX self-closing tag.
  const reGeneric = /<GenericPage\s+([^>]*?)\/>/;
  const reCalc = /<Calculator\s+([^>]*?)\/>/;
  let m = content.match(reGeneric);
  let tag = "GenericPage";
  if (!m) {
    m = content.match(reCalc);
    tag = "Calculator";
  }
  if (!m) {
    console.log(`  SKIP ${p.path} — no <GenericPage> or <Calculator> JSX found`);
    skipped++;
    continue;
  }

  const propsText = m[1].trim();
  const newPropsText = `${propsText} heroImageSlug="${p.slug}" heroImageAlt={${JSON.stringify(p.alt)}}`;
  const replacement = `<${tag} ${newPropsText} />`;
  content = content.replace(m[0], replacement);

  writeFileSync(filePath, content, "utf8");
  console.log(`  ok    ${p.path}  (slug=${p.slug})`);
  added++;
}

console.log("");
console.log(`done. ${added} injected, ${skipped} skipped.`);
