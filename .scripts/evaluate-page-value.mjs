import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const APP = path.join(ROOT, "app");
const REPORTS = path.join(ROOT, "reports");
const DATE = "2026-07-17";
const MD_OUT = path.join(REPORTS, `aether-page-value-evaluation-${DATE}.md`);
const CSV_OUT = path.join(REPORTS, `aether-page-value-evaluation-${DATE}.csv`);

const PAGE_FILE = /^page\.(?:tsx|ts|jsx|js|mdx)$/;
const STEALTH = /^\/skilski(?:\/|$)/;

const flagship = new Map([
  ["/", [100, "The front door: it establishes the new artist-led AtomEons identity and routes attention into every flagship creation."]],
  ["/i-am-ai", [98, "The strongest cultural artifact and clearest category-defining story: a book authored by AI, not merely written about AI."]],
  ["/cablebox", [97, "A highly visual, immediately understandable product with entertainment pull and strong demonstration value."]],
  ["/b00kmakor", [96, "A concrete publishing machine with obvious buyer value, proof potential, and a natural bridge into I AM AI."]],
  ["/orange5", [95, "The clearest expression of the massive AI workforce: high product value and strong proof of AtomEons' operating thesis."]],
  ["/atom-alive", [95, "The recurring media engine: it can turn product building into audience, trust, personality, and repeat visits."]],
  ["/i-am-ai/listen", [94, "The lowest-friction emotional demo of the AI-authored book and a powerful conversion bridge into the full work."]],
  ["/i-am-ai/sample", [92, "A high-intent sampling surface that proves the book's voice before asking for deeper attention or purchase."]],
  ["/about", [91, "The founder story is unusually differentiated: poet, artist, marketer, and inventor directing an AI workforce."]],
  ["/press", [90, "The compression layer for journalists, partners, and cultural gatekeepers; it makes the story easy to repeat accurately."]],
  ["/research", [89, "Turns the rogue-lab posture into authority by showing serious, inspectable intellectual output."]],
  ["/research/papers", [88, "A high-density authority hub that supports citations, press credibility, and long-tail discovery."]],
  ["/learn", [87, "The broadest public utility surface and a durable organic-acquisition engine when the curriculum is tightly curated."]],
  ["/receipts", [86, "Critical proof infrastructure: it converts ambitious claims from theater into inspectable evidence."]],
  ["/trust", [85, "Reduces risk for serious users and reinforces the lab's receipts-first operating doctrine."]],
  ["/manifesto", [84, "Codifies the worldview and gives the brand a quotable, ownable doctrine beyond product features."]],
  ["/innovations", [83, "A strong proof-and-positioning inventory when claims stay precise and link directly to evidence."]],
  ["/orangebox", [82, "A deep legacy product surface with substantial proof, but its story should be clarified relative to Orange5."]],
  ["/aiware", [80, "A useful product-line bridge, though it needs to serve the new Creations architecture rather than the old software taxonomy."]],
  ["/faq", [79, "Handles confusion around the lab, products, and I AM AI at the point where uncertainty would otherwise become abandonment."]],
  ["/use-cases", [78, "Translates unusual systems into buyer-recognizable outcomes and supports high-intent evaluation."]],
]);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function templateFromFile(file) {
  const relative = path.relative(APP, path.dirname(file)).replaceAll("\\", "/");
  const segments = relative
    .split("/")
    .filter(Boolean)
    .filter((segment) => !segment.startsWith("(") && !segment.startsWith("@"));
  return segments.length ? `/${segments.join("/")}` : "/";
}

function routeRegex(template) {
  const escaped = template
    .split("/")
    .map((segment) => {
      if (/^\[\[\.\.\..+\]\]$/.test(segment)) return ".*";
      if (/^\[\.\.\..+\]$/.test(segment)) return ".+";
      if (/^\[.+\]$/.test(segment)) return "[^/]+";
      return segment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    })
    .join("/");
  return new RegExp(`^${escaped}/?$`);
}

function titleFromSource(source, route) {
  const match =
    source.match(/title:\s*["'`]([^"'`]+)["'`]/) ||
    source.match(/<h1[^>]*>\s*([^<{][^<]*)<\/h1>/s);
  return match?.[1]?.replace(/\s+/g, " ").trim() || (route === "/" ? "AtomEons" : route.split("/").at(-1));
}

function familyFor(route) {
  if (STEALTH.test(route)) return "stealth";
  if (route === "/") return "home";
  const first = route.split("/").filter(Boolean)[0] || "home";
  if (["cablebox", "b00kmakor", "orange5", "orangebox", "aiware"].includes(first)) return "products";
  if (["i-am-ai", "books", "library"].includes(first)) return "publishing";
  if (first === "atom-alive" || first === "watching" || first === "cinema") return "show-media";
  if (first === "research" || first === "intel") return "research";
  if (first === "learn" || first === "q" || first === "best-practices" || first === "tools") return "learning-search";
  if (first === "founders-view" || first === "about" || first === "personal" || first === "influences" || first === "listening") return "founder-brand";
  if (["press", "receipts", "trust", "transparency", "manifesto", "doctrine", "vendor-pack", "legal"].includes(first)) return "authority-trust";
  if (["account", "success", "cancel", "search", "atlas", "explore", "start", "welcome"].includes(first)) return "utility";
  if (["home-v3", "v3", "version", "changelog"].includes(first)) return "legacy-meta";
  return "lab-catalog";
}

function heuristicScore(route, family, source) {
  if (STEALTH.test(route)) return 0;
  if (flagship.has(route)) return flagship.get(route)[0];

  let score = {
    products: 76,
    publishing: 78,
    "show-media": 73,
    research: 76,
    "learning-search": 70,
    "founder-brand": 68,
    "authority-trust": 72,
    utility: 48,
    "legacy-meta": 34,
    "lab-catalog": 57,
    home: 100,
  }[family] ?? 50;

  const depth = route.split("/").filter(Boolean).length;
  if (/\/(?:lesson|deep|synthesis|cheatsheet)\//.test(route)) score += 4;
  if (/\/papers\//.test(route)) score += 6;
  if (/\/chapters\//.test(route)) score += 5;
  if (/^\/q\//.test(route)) score += 3;
  if (/^\/vs\//.test(route) || /competitors$/.test(route)) score += 4;
  if (/\/(?:roadmap|changelog)$/.test(route)) score -= 10;
  if (/^\/(?:account|success|cancel|search)(?:\/|$)/.test(route)) score = Math.min(score, 45);
  if (/^\/(?:home-v3|v3|cinema|version)(?:\/|$)/.test(route)) score = Math.min(score, 30);
  if (/^\/legal(?:\/|$)/.test(route)) score = 42;
  if (/\[(?:\.\.\.)?[^\]]+\]/.test(route)) score -= 4;
  if (depth > 3) score -= 2;

  const words = source.replace(/<[^>]+>/g, " ").match(/[A-Za-z][A-Za-z'-]+/g)?.length ?? 0;
  if (words > 1200) score += 2;
  if (words < 120) score -= 4;
  return Math.max(10, Math.min(91, score));
}

function reasonFor(route, family, score) {
  if (STEALTH.test(route)) return "Intentionally retained as a direct-access build but removed from navigation, search, sitemaps, and indexing while the product is in stealth.";
  if (flagship.has(route)) return flagship.get(route)[1];
  const reasons = {
    products: "A product or product-proof page with direct commercial value; its ceiling depends on distinct positioning, current evidence, and a clear next action.",
    publishing: "Extends the publishing world and the AI-authorship story; valuable when it moves readers toward sampling, listening, ownership, or citation.",
    "show-media": "Builds repeat attention and personality through media; value rises when episodes connect directly to creations and proof.",
    research: "Creates authority and citation value; strongest when the source, claim, and practical implication are obvious above the fold.",
    "learning-search": "Captures educational or search intent and earns trust through utility; it should feed readers toward a flagship creation without becoming generic SEO inventory.",
    "founder-brand": "Makes the operator and worldview legible; valuable because AtomEons' human story is more differentiated than another anonymous AI lab.",
    "authority-trust": "Reduces skepticism and supports press or purchase decisions through doctrine, evidence, governance, or disclosure.",
    utility: "Necessary journey infrastructure, but it supports rather than creates demand; keep it fast, clear, and out of the primary narrative.",
    "legacy-meta": "Primarily historical or duplicated site infrastructure; it adds maintenance and narrative fragmentation unless consolidated.",
    "lab-catalog": "A supporting lab surface with situational value; it needs a clearer role in the Creations, Show, Lab, About, or Press architecture.",
  };
  return reasons[family] || `Supporting page with a strategic value score of ${score}; clarify its audience, promise, and next action.`;
}

function actionFor(route, score) {
  if (STEALTH.test(route)) return "STEALTH";
  if (score >= 92) return "HERO";
  if (score >= 78) return "KEEP";
  if (score >= 60) return "IMPROVE";
  if (score >= 45) return "UTILITY";
  if (score >= 25) return "MERGE";
  return "ARCHIVE";
}

function dimensions(total, family) {
  const profiles = {
    products: [0.3, 0.2, 0.18, 0.14, 0.18],
    publishing: [0.26, 0.24, 0.2, 0.15, 0.15],
    "show-media": [0.24, 0.27, 0.18, 0.12, 0.19],
    research: [0.18, 0.18, 0.24, 0.27, 0.13],
    "learning-search": [0.16, 0.14, 0.3, 0.18, 0.22],
    "founder-brand": [0.2, 0.3, 0.18, 0.2, 0.12],
    "authority-trust": [0.18, 0.16, 0.16, 0.38, 0.12],
    utility: [0.14, 0.08, 0.16, 0.2, 0.42],
  };
  const p = profiles[family] || [0.22, 0.2, 0.2, 0.2, 0.18];
  const caps = [30, 20, 20, 15, 15];
  const raw = p.map((weight, i) => Math.min(caps[i], Math.round(total * weight)));
  let delta = total - raw.reduce((sum, value) => sum + value, 0);
  for (let i = 0; delta > 0; i = (i + 1) % raw.length) {
    if (raw[i] < caps[i]) {
      raw[i] += 1;
      delta -= 1;
    }
  }
  return raw;
}

const sourceFiles = walk(APP).filter((file) => PAGE_FILE.test(path.basename(file)));
const manifestPath = path.join(ROOT, ".next", "prerender-manifest.json");
const manifest = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, "utf8")) : { routes: {} };
const builtRoutes = Object.keys(manifest.routes || {});
const records = [];

for (const file of sourceFiles) {
  const template = templateFromFile(file);
  const source = fs.readFileSync(file, "utf8");
  const dynamic = template.includes("[");
  const instances = dynamic ? builtRoutes.filter((route) => routeRegex(template).test(route)) : [template];
  const routes = instances.length ? instances : [template];
  for (const route of routes) {
    const family = familyFor(route);
    const score = heuristicScore(route, family, source);
    const [strategic, brand, acquisition, authority, utility] = dimensions(score, family);
    records.push({
      route,
      template,
      title: titleFromSource(source, route),
      family,
      score,
      strategic,
      brand,
      acquisition,
      authority,
      utility,
      action: actionFor(route, score),
      why: reasonFor(route, family, score),
      source: path.relative(ROOT, file).replaceAll("\\", "/"),
    });
  }
}

records.sort((a, b) => b.score - a.score || a.route.localeCompare(b.route));
fs.mkdirSync(REPORTS, { recursive: true });

const csvEscape = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
const columns = ["rank", "route", "template", "title", "family", "score", "strategic_30", "brand_20", "acquisition_20", "authority_15", "utility_15", "action", "why", "source"];
const csv = [
  columns.join(","),
  ...records.map((record, index) =>
    [
      index + 1,
      record.route,
      record.template,
      record.title,
      record.family,
      record.score,
      record.strategic,
      record.brand,
      record.acquisition,
      record.authority,
      record.utility,
      record.action,
      record.why,
      record.source,
    ].map(csvEscape).join(","),
  ),
].join("\n");
fs.writeFileSync(CSV_OUT, `${csv}\n`, "utf8");

const families = [...new Set(records.map((record) => record.family))]
  .map((family) => {
    const rows = records.filter((record) => record.family === family);
    return { family, pages: rows.length, average: Math.round(rows.reduce((sum, row) => sum + row.score, 0) / rows.length) };
  })
  .sort((a, b) => b.average - a.average);

const actions = [...new Set(records.map((record) => record.action))]
  .map((action) => ({ action, pages: records.filter((record) => record.action === action).length }))
  .sort((a, b) => b.pages - a.pages);

const table = (rows) =>
  rows.map((record, index) => `| ${index + 1} | \`${record.route}\` | ${record.score} | ${record.action} | ${record.why} |`).join("\n");

const markdown = `# AtomEons Aether page-value evaluation

Generated: ${DATE}
Scope: ${records.length} public page instances from ${sourceFiles.length} Next.js page implementations. Dynamic page templates were expanded using the latest successful build manifest.
Basis: strategic editorial evaluation, not observed traffic or conversion performance. No production analytics were supplied, so the scores measure expected brand, acquisition, authority, utility, and commercial value.

## Scoring model

- Strategic and conversion value: 30
- Brand differentiation: 20
- Acquisition and search value: 20
- Authority and trust: 15
- Utility and retention: 15

Action bands: HERO 92–100 · KEEP 78–91 · IMPROVE 60–77 · UTILITY 45–59 · MERGE 25–44 · ARCHIVE 0–24. STEALTH is an explicit operator decision and overrides the score band.

## Portfolio read

${actions.map((item) => `- ${item.action}: ${item.pages} pages`).join("\n")}

The top of the portfolio is strongest when AtomEons behaves like an artist-led invention studio: the Aether homepage, I AM AI, CableBox, AI Bookmaker, Orange5, Atom Alive, the founder story, and proof. The greatest structural risk is not lack of content; it is dilution. Hundreds of useful pages compete with the few creations capable of defining the brand. The redesign should keep deep research and learning available while making the primary experience feel deliberately edited.

## Highest-value pages

| Rank | Route | Score | Action | Why |
|---:|---|---:|---|---|
${table(records.slice(0, 30))}

## Lowest-value pages

| Rank | Route | Score | Action | Why |
|---:|---|---:|---|---|
${table(records.slice(-30).reverse())}

## Value by page family

| Family | Pages | Average score |
|---|---:|---:|
${families.map((item) => `| ${item.family} | ${item.pages} | ${item.average} |`).join("\n")}

## Editorial decision

1. Make the six flagship worlds impossible to miss: Aether home, I AM AI, CableBox, AI Bookmaker, Orange5, and Atom Alive.
2. Use About, Press, Research, Receipts, Trust, and Manifesto as the authority ring around those creations.
3. Keep learning and question pages as the organic acquisition layer, but route them into the flagship worlds instead of letting them become the brand.
4. Consolidate legacy home versions, historical meta pages, and duplicated navigation hubs. Preserve redirects and evidence; remove them from the primary journey.
5. Keep the stealth product's source and direct URLs intact while excluding it from navigation, search, sitemaps, AI indexes, and crawler discovery.

## Complete ranking

The complete high-to-low inventory—including every generated lesson, research paper, chapter, comparison, utility page, and stealth route—is in [the CSV](./aether-page-value-evaluation-${DATE}.csv).
`;

fs.writeFileSync(MD_OUT, markdown, "utf8");
console.log(JSON.stringify({
  sourceImplementations: sourceFiles.length,
  evaluatedPageInstances: records.length,
  markdown: path.relative(ROOT, MD_OUT),
  csv: path.relative(ROOT, CSV_OUT),
  top: records.slice(0, 10).map(({ route, score }) => ({ route, score })),
  actions,
}, null, 2));
