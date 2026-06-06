#!/usr/bin/env node
/**
 * build-graph-index.mjs
 *
 * Walks app/ for every page.tsx file, extracts:
 *   - the route this file represents
 *   - every site-relative href referenced in the file (Link href, <a href, href: "/...")
 *
 * Writes public/graph-index.json with shape:
 *   {
 *     v: 1,
 *     built: "2026-06-05",
 *     nodes: [ { r: "/route", t: "title", w: weight, c: category } ],
 *     edges: [ { from: "/a", to: "/b" } ]
 *   }
 *
 * Consumed at runtime by app/_components/V3/ConstellationCanvas to
 * render a force-laid-out visualization of the lab's connectivity.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ROOT = "C:/AtomEons/github/atomeons-com";
const APP_DIR = join(ROOT, "app");
const SEARCH_INDEX = join(ROOT, "public/search-index.json");
const OUT = join(ROOT, "public/graph-index.json");

function walkPages(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith(".") || entry.startsWith("_") || entry === "node_modules") continue;
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) walkPages(full, out);
    else if (entry === "page.tsx") out.push(full);
  }
  return out;
}

function fileToRoute(file) {
  let rel = relative(APP_DIR, file).split(sep).slice(0, -1).join("/");
  rel = rel.replace(/\(([^)]+)\)\/?/g, "");
  rel = rel.replace(/\/+/g, "/");
  if (!rel.startsWith("/")) rel = "/" + rel;
  if (rel === "/") return "/";
  if (rel.includes("[")) return null;
  return rel.replace(/\/$/, "");
}

// Extract title from metadata.title literal
function extractTitle(src) {
  const m = src.match(/title:\s*["'`]([^"'`]{4,180})["'`]/);
  if (m) return m[1].trim().replace(/\s+/g, " ");
  return "";
}

// Extract every site-relative href referenced in the file
function extractRefs(src) {
  const refs = new Set();
  // Common patterns:
  //   href="/route"
  //   href={'/route'}
  //   href: "/route"
  //   to: "/route"
  //   "/route" (string literal that starts with / and is route-like)
  const patterns = [
    /href=["'`](\/[a-z0-9/_-][^"'`#?]*)["'`]/gi,
    /href=\{["'`](\/[a-z0-9/_-][^"'`#?]*)["'`]\}/gi,
    /(?:href|to|url|route)\s*:\s*["'`](\/[a-z0-9/_-][^"'`#?]*)["'`]/gi,
  ];
  for (const re of patterns) {
    let m;
    while ((m = re.exec(src)) !== null) {
      let r = m[1];
      // Strip trailing slash unless root
      if (r !== "/" && r.endsWith("/")) r = r.slice(0, -1);
      // Skip API routes for the graph
      if (r.startsWith("/api/")) continue;
      // Skip well-known dotfiles
      if (r.startsWith("/.well-known")) continue;
      // Skip if route includes a dynamic segment marker
      if (r.includes("[")) continue;
      // Skip anchors / queries (already stripped) / overly-deep noise
      if (r.length > 120) continue;
      refs.add(r);
    }
  }
  return [...refs];
}

// Derive a category from the route prefix
function categorize(route) {
  if (route === "/") return "home";
  const seg = route.slice(1).split("/")[0];
  return seg || "home";
}

// ────────────────────────────────────────────────────────────────────
const pageFiles = walkPages(APP_DIR);

const nodeMap = new Map();   // route -> node
const edges = [];

for (const file of pageFiles) {
  const route = fileToRoute(file);
  if (!route) continue;
  const src = readFileSync(file, "utf8");
  const title = extractTitle(src) || route;
  if (!nodeMap.has(route)) {
    nodeMap.set(route, {
      r: route,
      t: title,
      c: categorize(route),
      w: 0,
    });
  } else {
    // Some routes have multiple page.tsx (e.g. /page.tsx and /(group)/page.tsx)
    const n = nodeMap.get(route);
    if (!n.t || n.t === route) n.t = title;
  }
  const refs = extractRefs(src);
  for (const ref of refs) {
    if (ref === route) continue;  // skip self-loops
    edges.push({ from: route, to: ref });
  }
}

// Augment with search-index entries (some routes have static metadata)
try {
  const idx = JSON.parse(readFileSync(SEARCH_INDEX, "utf8"));
  for (const r of idx.records) {
    if (!nodeMap.has(r.r)) {
      nodeMap.set(r.r, { r: r.r, t: r.t || r.r, c: r.c || categorize(r.r), w: 0 });
    } else {
      const n = nodeMap.get(r.r);
      if (!n.t || n.t === r.r) n.t = r.t;
      if (!n.c) n.c = r.c;
    }
  }
} catch {
  // search-index.json may not exist on first run; ignore
}

// Compute weight = inbound edge count per node
const inDeg = new Map();
for (const e of edges) {
  inDeg.set(e.to, (inDeg.get(e.to) || 0) + 1);
}
for (const [r, n] of nodeMap) {
  n.w = inDeg.get(r) || 0;
}

// Dedup edges (same from→to pair appears once)
const seen = new Set();
const dedupedEdges = [];
for (const e of edges) {
  const key = `${e.from}->${e.to}`;
  if (seen.has(key)) continue;
  // Only keep edges whose target is also a node in the graph
  if (!nodeMap.has(e.to)) continue;
  seen.add(key);
  dedupedEdges.push(e);
}

const out = {
  v: 1,
  built: process.env.BUILT_DATE || "2026-06-05",
  nodes: [...nodeMap.values()].sort((a, b) => b.w - a.w),
  edges: dedupedEdges,
};

writeFileSync(OUT, JSON.stringify(out));
const bytes = readFileSync(OUT).length;
console.log(
  `Wrote ${OUT}\n  nodes : ${out.nodes.length}\n  edges : ${out.edges.length}\n  size  : ${(bytes / 1024).toFixed(1)} KB`,
);
