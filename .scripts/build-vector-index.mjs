#!/usr/bin/env node
/**
 * build-vector-index.mjs · BATCH version
 *
 * Walks app/** for page.tsx files, chunks each page's prose into
 * ~500-word windows, embeds each chunk via Google's gemini-embedding-001
 * using the BATCH endpoint (50 chunks per request, well under the
 * free-tier 100-RPM / 1000-RPD ceiling).
 *
 * Writes the result to public/vector-index.json — same shape the
 * existing /public/search-index.json uses, but the field `e` carries
 * 768-dim embedding vectors (Matryoshka-truncated from the model's
 * native 3072) instead of just keywords.
 *
 * At runtime /api/ask loads this file once on cold start, embeds the
 * user's question via the same Gemini API, computes cosine similarity
 * in memory, and bundles top-K passages into a Gemini 2.0 Flash
 * generative prompt for synthesis.
 *
 * Run locally:
 *   GEMINI_API_KEY=... node .scripts/build-vector-index.mjs
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ROOT = "C:/AtomEons/github/atomeons-com";
const APP_DIR = join(ROOT, "app");
const OUT = join(ROOT, "public/vector-index.json");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error("Missing GEMINI_API_KEY");
  process.exit(1);
}

const EMBED_MODEL = "gemini-embedding-001";
const EMBED_DIM = 768;
const BATCH_SIZE = 50; // 1 API request handles 50 chunks
const BATCH_DELAY_MS = 13_000; // ~4.6 RPM, comfortably under free-tier 5-RPM ceiling

// ────────────────────────────────────────────────────────────────────
// File walk + prose extraction
// ────────────────────────────────────────────────────────────────────
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

function pageFileToRoute(file) {
  let rel = relative(APP_DIR, file).split(sep).slice(0, -1).join("/");
  rel = rel.replace(/\(([^)]+)\)\/?/g, "");
  rel = rel.replace(/\/+/g, "/");
  if (!rel.startsWith("/")) rel = "/" + rel;
  if (rel === "/") return "/";
  if (rel.includes("[")) return null;
  return rel.replace(/\/$/, "");
}

function extractTitle(src) {
  const m1 = src.match(/title:\s*["'`]([^"'`]{4,180})["'`]/);
  if (m1) return m1[1].trim();
  return "";
}

function extractDescription(src) {
  const m = src.match(/description:\s*["'`]([^"'`]{20,400})["'`]/);
  return m ? m[1].trim() : "";
}

function extractProseBody(src) {
  let body = src;
  body = body.replace(/^import\s[\s\S]*?;$/gm, "");
  body = body.replace(/^export\s+const\s+metadata[\s\S]*?^};$/gm, "");
  body = body.replace(/^export\s+type[\s\S]*?;$/gm, "");
  body = body.replace(/\/\*[\s\S]*?\*\//g, "");
  body = body.replace(/^\s*\/\/.*$/gm, "");
  const matches = body.match(/(?:["'`])([A-Z][\s\S]{40,1200}?)(?:["'`])/g) || [];
  return matches
    .map((m) => m.slice(1, -1))
    .map((s) => s.replace(/\\n/g, " ").replace(/\\"/g, '"').replace(/\\'/g, "'"))
    .filter((s) => /^[A-Z]/.test(s) && s.split(/\s+/).length > 6)
    .join("\n\n");
}

function chunk(text, maxWords = 500) {
  const sentences = text.split(/(?<=[.!?])\s+(?=[A-Z])/);
  const chunks = [];
  let cur = "";
  let curWc = 0;
  for (const s of sentences) {
    const wc = s.split(/\s+/).length;
    if (curWc + wc > maxWords && cur) {
      chunks.push(cur.trim());
      cur = s + " ";
      curWc = wc;
    } else {
      cur += s + " ";
      curWc += wc;
    }
  }
  if (cur.trim()) chunks.push(cur.trim());
  return chunks;
}

// ────────────────────────────────────────────────────────────────────
// Gemini batch embedding
// ────────────────────────────────────────────────────────────────────
async function embedBatch(texts) {
  const url =
    `https://generativelanguage.googleapis.com/v1beta/models/${EMBED_MODEL}:batchEmbedContents?key=` +
    GEMINI_API_KEY;
  const requests = texts.map((text) => ({
    model: `models/${EMBED_MODEL}`,
    content: { parts: [{ text }] },
    taskType: "RETRIEVAL_DOCUMENT",
    outputDimensionality: EMBED_DIM,
  }));
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ requests }),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`BatchEmbed failed ${res.status}: ${errText.slice(0, 300)}`);
  }
  const j = await res.json();
  return j.embeddings.map((e) => e.values);
}

// ────────────────────────────────────────────────────────────────────
// Main
// ────────────────────────────────────────────────────────────────────
const pageFiles = walkPages(APP_DIR);
console.log(`Found ${pageFiles.length} page.tsx files`);

// 1) Build the flat work list (one row per chunk) BEFORE embedding,
//    so we can ship batches efficiently and recover cleanly on error.
const work = [];
let totalSkipped = 0;
for (const file of pageFiles) {
  const route = pageFileToRoute(file);
  if (!route) { totalSkipped++; continue; }
  const src = readFileSync(file, "utf8");
  const title = extractTitle(src);
  const description = extractDescription(src);
  const body = extractProseBody(src);
  const fullText = [title, description, body].filter(Boolean).join("\n\n").trim();
  if (fullText.length < 200) { totalSkipped++; continue; }
  const chunks = chunk(fullText);
  if (chunks.length === 0) { totalSkipped++; continue; }
  chunks.forEach((b, i) => {
    work.push({
      r: route,
      t: title || route,
      s: i === 0 ? "intro" : `chunk-${i}`,
      b,
      w: b.split(/\s+/).length,
    });
  });
}

console.log(`Work list: ${work.length} chunks across ${pageFiles.length - totalSkipped} routes`);
console.log(`Batches  : ${Math.ceil(work.length / BATCH_SIZE)} × ${BATCH_SIZE} chunks`);
console.log(`Est time : ~${Math.ceil((work.length / BATCH_SIZE) * (BATCH_DELAY_MS / 1000))}s\n`);

// 2) Embed in batches.
const records = [];
let totalFailed = 0;
for (let b = 0; b < work.length; b += BATCH_SIZE) {
  const batch = work.slice(b, b + BATCH_SIZE);
  try {
    const vectors = await embedBatch(batch.map((x) => x.b));
    for (let i = 0; i < batch.length; i++) {
      records.push({
        id: records.length,
        r: batch[i].r,
        t: batch[i].t,
        s: batch[i].s,
        b: batch[i].b,
        e: vectors[i],
        w: batch[i].w,
      });
    }
    const done = Math.min(b + BATCH_SIZE, work.length);
    console.log(`  batch ${(b / BATCH_SIZE) + 1}/${Math.ceil(work.length / BATCH_SIZE)} · ${done}/${work.length} chunks embedded`);
  } catch (e) {
    console.log(`  batch ${(b / BATCH_SIZE) + 1} — ERROR: ${e.message}`);
    totalFailed += batch.length;
    // On rate-limit error wait longer before next batch
    if (/429|quota|rate/i.test(e.message)) {
      console.log("  → cooling down 30s for rate-limit");
      await new Promise((r) => setTimeout(r, 30_000));
    }
  }
  await new Promise((r) => setTimeout(r, BATCH_DELAY_MS));
}

// 3) Write index file.
const index = {
  v: 1,
  built: process.env.INDEX_BUILT_DATE || "2026-06-05",
  model: EMBED_MODEL,
  dim: EMBED_DIM,
  count: records.length,
  records,
};

writeFileSync(OUT, JSON.stringify(index));
const sizeMb = (statSync(OUT).size / 1024 / 1024).toFixed(2);

console.log(
  `\nWrote ${OUT}\n  pages walked    : ${pageFiles.length}\n  pages skipped   : ${totalSkipped}\n  chunks embedded : ${records.length}\n  chunks failed   : ${totalFailed}\n  size            : ${sizeMb} MB`,
);
