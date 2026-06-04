#!/usr/bin/env node
/**
 * build-search-index.mjs
 *
 * Walks app/** and builds /public/search-index.json — the static
 * index the client-side search palette loads on first Cmd-K press.
 *
 * Why static + client-side:
 *   - sub-50ms response on every keystroke (no server roundtrip)
 *   - works offline / cached
 *   - 200-page index fits in ~80 KB gzipped — cheap to ship
 *   - operator's directive: "better than modern search engines" =
 *     instant. Algolia is fast; static-local is faster.
 *
 * What's extracted per page:
 *   - route       — the URL path
 *   - title       — metadata.title (or title default)
 *   - description — metadata.description (truncated)
 *   - h1s + h2s   — headlines that anchor the page
 *   - bodySample  — first ~600 chars of human-readable copy
 *   - category    — derived from route prefix
 *   - tags        — pulled from the file (keywords, plus inferred)
 *   - priority    — 1.0 (top-level) down to 0.3 (deep leaf)
 *
 * Ranking happens in the palette client — the index is just the
 * data layer.
 */
import { readdirSync, readFileSync, statSync, writeFileSync, mkdirSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ROOT = "C:/AtomEons/github/atomeons-com";
const APP = join(ROOT, "app");
const OUT = join(ROOT, "public", "search-index.json");

/* ────────────────────────────────────────────────────────────────────
 * 1. Walk app/ — collect every page.tsx
 * ──────────────────────────────────────────────────────────────────── */
function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) walk(full, out);
    else if (stat.isFile()) out.push(full);
  }
  return out;
}

const pageFiles = walk(APP).filter((p) => /[\\/]page\.tsx?$/.test(p));

function pageFileToRoute(file) {
  let rel = relative(APP, file).split(sep).slice(0, -1).join("/");
  rel = rel.replace(/\(([^)]+)\)\/?/g, ""); // erase route groups
  rel = rel.replace(/\/+/g, "/");
  if (!rel.startsWith("/")) rel = "/" + rel;
  if (rel === "/") return "/";
  return rel.replace(/\/$/, "");
}

/* ────────────────────────────────────────────────────────────────────
 * 2. Category derivation from route prefix
 * ──────────────────────────────────────────────────────────────────── */
function categorize(route) {
  if (route === "/") return { cat: "Home", weight: 1.0 };
  if (route.startsWith("/orangebox")) return { cat: "Product", weight: 0.95 };
  if (route.startsWith("/b00kmakor")) return { cat: "Product", weight: 0.95 };
  if (route.startsWith("/i-am-ai")) return { cat: "Book", weight: 0.92 };
  if (route.startsWith("/books")) return { cat: "Book", weight: 0.85 };
  if (route.startsWith("/supermodels")) return { cat: "Rankings", weight: 0.92 };
  if (route.startsWith("/research/decoded")) return { cat: "Decoded paper", weight: 0.78 };
  if (route.startsWith("/research/papers")) return { cat: "Manuscript", weight: 0.82 };
  if (route.startsWith("/research")) return { cat: "Research", weight: 0.8 };
  if (route.startsWith("/learn/atlas")) return { cat: "Atlas", weight: 0.78 };
  if (route.startsWith("/learn/cyber")) return { cat: "Cyber", weight: 0.78 };
  if (route.startsWith("/learn/decode")) return { cat: "Decode", weight: 0.75 };
  if (route.startsWith("/learn/calc")) return { cat: "Calculator", weight: 0.7 };
  if (route.startsWith("/learn/lesson")) return { cat: "Lesson", weight: 0.78 };
  if (route.startsWith("/learn/career")) return { cat: "Career", weight: 0.75 };
  if (route.startsWith("/learn")) return { cat: "Learn", weight: 0.78 };
  if (route.startsWith("/founders-view")) return { cat: "Founder's View", weight: 0.85 };
  if (route.startsWith("/intel")) return { cat: "Intel", weight: 0.78 };
  if (route.startsWith("/press")) return { cat: "Press", weight: 0.7 };
  if (route.startsWith("/now")) return { cat: "Now", weight: 0.8 };
  if (route.startsWith("/about")) return { cat: "About", weight: 0.8 };
  if (route.startsWith("/manifesto")) return { cat: "Doctrine", weight: 0.85 };
  if (route.startsWith("/changelog")) return { cat: "Log", weight: 0.7 };
  if (route.startsWith("/receipts")) return { cat: "Receipts", weight: 0.8 };
  if (route.startsWith("/legal")) return { cat: "Legal", weight: 0.6 };
  if (route.startsWith("/faq")) return { cat: "FAQ", weight: 0.7 };
  if (route.startsWith("/tools")) return { cat: "Tools", weight: 0.75 };
  return { cat: "Page", weight: 0.5 };
}

/* ────────────────────────────────────────────────────────────────────
 * 3. Field extraction from TSX source
 * ──────────────────────────────────────────────────────────────────── */
function extractTitle(src, route) {
  // metadata.title can be a string OR { default: ... }
  const tplMatch = src.match(/title:\s*\{[^}]*?default:\s*["'`]([^"'`]+)["'`]/s);
  if (tplMatch) return cleanString(tplMatch[1]);
  const strMatch = src.match(/title:\s*["'`]([^"'`]+)["'`]/);
  if (strMatch) return cleanString(strMatch[1]);
  // fallback: derive from route
  return route === "/" ? "Lab home" : route.split("/").pop().replace(/-/g, " ");
}

function extractDescription(src) {
  const m = src.match(/description:\s*["'`]([^"'`]+(?:[^"'`]|\\.){0,800})["'`]/);
  if (!m) return "";
  return cleanString(m[1]).slice(0, 320);
}

function extractHeadings(src) {
  const heads = [];
  // text inside h1>...</h1> and h2>...</h2> (JSX-style)
  const reHead = /<h[12][^>]*>([\s\S]*?)<\/h[12]>/g;
  let m;
  while ((m = reHead.exec(src)) !== null) {
    const text = stripJsx(m[1]);
    if (text) heads.push(text);
    if (heads.length >= 8) break;
  }
  return heads;
}

function extractBodySample(src) {
  // Grab the first paragraph-ish text content from the TSX, stripping
  // JSX/expressions. We keep it as a single sample so the search can
  // hit body words; precision is "well enough."
  const para = src.match(/<p[^>]*>([\s\S]*?)<\/p>/);
  if (!para) return "";
  return stripJsx(para[1]).slice(0, 500);
}

function extractKeywords(src) {
  const m = src.match(/keywords:\s*\[([^\]]+)\]/);
  if (!m) return [];
  return m[1]
    .split(",")
    .map((s) => s.trim().replace(/^['"`]|['"`]$/g, ""))
    .filter(Boolean)
    .slice(0, 24);
}

function stripJsx(s) {
  return cleanString(
    s
      .replace(/<[^>]+>/g, " ") // strip tags
      .replace(/\{[^}]*\}/g, " ") // strip JSX expressions
      .replace(/\s+/g, " ")
      .trim(),
  );
}

function cleanString(s) {
  return s
    .replace(/\\n/g, " ")
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/* ────────────────────────────────────────────────────────────────────
 * 4. Build records
 * ──────────────────────────────────────────────────────────────────── */
const records = [];
for (const file of pageFiles) {
  const route = pageFileToRoute(file);
  // Skip route groups, error/loading, dynamic param leaves (we index parents)
  if (route.includes("[") || route.includes("]")) continue;
  if (/^\/_/.test(route)) continue;

  let src;
  try {
    src = readFileSync(file, "utf8");
  } catch {
    continue;
  }

  const title = extractTitle(src, route);
  const description = extractDescription(src);
  const headings = extractHeadings(src);
  const body = extractBodySample(src);
  const keywords = extractKeywords(src);
  const { cat, weight } = categorize(route);

  records.push({
    r: route,
    t: title.slice(0, 140),
    d: description,
    h: headings.slice(0, 6),
    b: body,
    k: keywords,
    c: cat,
    w: Number(weight.toFixed(2)),
  });
}

records.sort((a, b) => b.w - a.w || a.r.localeCompare(b.r));

const out = {
  v: 1,
  built: new Date().toISOString().slice(0, 10),
  count: records.length,
  records,
};

mkdirSync(join(ROOT, "public"), { recursive: true });
writeFileSync(OUT, JSON.stringify(out));

const fileSize = readFileSync(OUT, "utf8").length;
console.log(
  `[search-index] ${records.length} records · ${(fileSize / 1024).toFixed(1)} KB written to ${relative(ROOT, OUT)}`,
);
