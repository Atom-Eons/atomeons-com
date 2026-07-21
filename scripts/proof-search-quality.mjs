import { SITE_INDEX } from "../app/_data/site-index.ts";

const checks = [
  ["download", "/cablebox"],
  ["installer", "/cablebox"],
  ["windows", "/cablebox"],
  ["audiobook", "/i-am-ai"],
  ["youtube", "/atom-alive"],
  ["aicodeshow", "/atom-alive"],
  ["openapi", "/openapi.json"],
  ["llms", "/llms.txt"],
  ["press", "/press"],
  ["memory", "/research/discoveries/aememory"],
  ["radiance", "/research/papers/radiance-luminance-alpha-wolf-eyes"],
];

function scoreEntry(entry, terms) {
  if (!terms.length) {
    if (entry.category === "Products") return 120;
    if (entry.title === "Atom Alive") return 110;
    if (entry.category === "Research") return 100;
    return 40;
  }

  const title = entry.title.toLowerCase();
  const description = entry.description.toLowerCase();
  const category = entry.category.toLowerCase();
  const keywords = entry.keywords.join(" ").toLowerCase();

  return terms.reduce((score, term) => {
    if (title === term) return score + 160;
    if (title.includes(term)) score += 80;
    if (category.includes(term)) score += 42;
    if (keywords.includes(term)) score += 34;
    if (description.includes(term)) score += 24;
    if (term === "audiobook" && entry.href === "/i-am-ai") score += 60;
    if (term === "audio" && entry.href === "/i-am-ai") score += 44;
    return score;
  }, 0);
}

const results = checks.map(([query, expected]) => {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const ranked = SITE_INDEX
    .map((entry) => ({ entry, score: scoreEntry(entry, terms) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title));

  return {
    query,
    expected,
    actual: ranked[0]?.entry.href ?? null,
    score: ranked[0]?.score ?? 0,
    pass: ranked[0]?.entry.href === expected,
  };
});

console.log(JSON.stringify({ pass: results.every((item) => item.pass), results }, null, 2));

if (results.some((item) => !item.pass)) {
  process.exit(1);
}
