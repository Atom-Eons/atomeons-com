import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

/**
 * /api/ask — semantic Q&A over atomeons.com content.
 *
 * Two-layer retrieval, transparent to the caller:
 *
 *  Layer A (always on)
 *    Fuzzy/keyword score over public/search-index.json:
 *      - title (×4)
 *      - headings (×2)
 *      - keywords (×3)
 *      - body excerpt (×1)
 *      - category (×1)
 *    Cheap, deterministic, zero-quota cost. Ships today.
 *
 *  Layer B (when vector-index.json exists)
 *    Cosine similarity over Gemini gemini-embedding-001 vectors (768-dim
 *    Matryoshka). Replaces Layer A automatically once the indexer
 *    finishes writing public/vector-index.json. Daily-quota friendly:
 *    only one embed call per query at runtime.
 *
 * Both layers feed the same Gemini 2.0 Flash synthesis pass with a
 * strict lab-voice "answer only from these passages" system prompt.
 *
 * The Gemini API key is server-side only (process.env.GEMINI_API_KEY).
 * The user's browser never sees it.
 */

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const EMBED_MODEL = "gemini-embedding-001";
const EMBED_DIM = 768;
const GENERATE_MODEL = "gemini-2.0-flash-exp";

// ────────────────────────────────────────────────────────────────────
// Layer A — fuzzy index (always available)
// ────────────────────────────────────────────────────────────────────
type FuzzyRecord = {
  r: string; // route
  t: string; // title
  d: string; // description
  h: string[]; // headings
  b: string; // body excerpt
  k: string[]; // keywords
  c: string; // category
  w: number; // weight
};

type FuzzyIndex = {
  v: number;
  built: string;
  count: number;
  records: FuzzyRecord[];
};

let FUZZY_CACHE: FuzzyIndex | null = null;

function loadFuzzyIndex(): FuzzyIndex {
  if (FUZZY_CACHE) return FUZZY_CACHE;
  const p = path.join(process.cwd(), "public", "search-index.json");
  const raw = fs.readFileSync(p, "utf8");
  FUZZY_CACHE = JSON.parse(raw) as FuzzyIndex;
  return FUZZY_CACHE;
}

// ────────────────────────────────────────────────────────────────────
// Layer B — vector index (loaded if present)
// ────────────────────────────────────────────────────────────────────
type VectorRecord = {
  id: number;
  r: string;
  t: string;
  s: string;
  b: string;
  e: number[];
  w: number;
};

type VectorIndex = {
  v: number;
  built: string;
  model: string;
  dim: number;
  count: number;
  records: VectorRecord[];
};

let VECTOR_CACHE: VectorIndex | null | "missing" = null;

function loadVectorIndex(): VectorIndex | null {
  if (VECTOR_CACHE === "missing") return null;
  if (VECTOR_CACHE) return VECTOR_CACHE;
  const p = path.join(process.cwd(), "public", "vector-index.json");
  try {
    const raw = fs.readFileSync(p, "utf8");
    VECTOR_CACHE = JSON.parse(raw) as VectorIndex;
    return VECTOR_CACHE;
  } catch {
    VECTOR_CACHE = "missing";
    return null;
  }
}

// ────────────────────────────────────────────────────────────────────
// Fuzzy scoring
// ────────────────────────────────────────────────────────────────────
function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .split(/\s+/)
    .filter((t) => t.length >= 2);
}

const STOP = new Set([
  "the","a","an","and","or","but","if","then","of","to","for","in","on","at","by",
  "is","are","was","were","be","been","being","have","has","had","do","does","did",
  "what","which","who","whom","how","why","where","when","this","that","these","those",
  "i","you","he","she","it","we","they","me","him","her","us","them","my","your","its",
  "as","with","from","about","into","over","under","than","then","so","just","not",
]);

function scoreRecord(query: string, r: FuzzyRecord): number {
  const qTokens = tokenize(query).filter((t) => !STOP.has(t));
  if (qTokens.length === 0) return 0;

  // build searchable text per field for token-presence scoring
  const fields = {
    t: tokenize(r.t).join(" "),
    h: tokenize((r.h || []).join(" ")).join(" "),
    k: tokenize((r.k || []).join(" ")).join(" "),
    d: tokenize(r.d || "").join(" "),
    b: tokenize(r.b || "").join(" "),
    c: tokenize(r.c || "").join(" "),
    rt: tokenize(r.r.replace(/[-/]/g, " ")).join(" "),
  };

  let score = 0;
  for (const tok of qTokens) {
    if (fields.t.includes(tok)) score += 4;
    if (fields.k.includes(tok)) score += 3;
    if (fields.h.includes(tok)) score += 2;
    if (fields.d.includes(tok)) score += 1;
    if (fields.b.includes(tok)) score += 1;
    if (fields.c.includes(tok)) score += 1;
    if (fields.rt.includes(tok)) score += 1; // bonus for slug match
  }
  // multi-token phrase bonus
  if (qTokens.length >= 2) {
    const phrase = qTokens.join(" ");
    const haystack = `${fields.t} ${fields.h} ${fields.d} ${fields.b}`;
    if (haystack.includes(phrase)) score += 6;
  }
  return score;
}

type ScoredFuzzy = FuzzyRecord & { _score: number };

function topKFuzzy(query: string, idx: FuzzyIndex, k: number): ScoredFuzzy[] {
  const scored: ScoredFuzzy[] = idx.records.map((r) => ({ ...r, _score: scoreRecord(query, r) }));
  scored.sort((a, b) => b._score - a._score);
  return scored.filter((s) => s._score > 0).slice(0, k);
}

// ────────────────────────────────────────────────────────────────────
// Vector scoring (Layer B, when index exists)
// ────────────────────────────────────────────────────────────────────
function cosine(a: number[], b: number[]): number {
  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

async function embedQuery(q: string): Promise<number[]> {
  const url =
    `https://generativelanguage.googleapis.com/v1beta/models/${EMBED_MODEL}:embedContent?key=` +
    GEMINI_API_KEY;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: { parts: [{ text: q }] },
      taskType: "RETRIEVAL_QUERY",
      outputDimensionality: EMBED_DIM,
    }),
  });
  if (!res.ok) throw new Error(`Embed failed ${res.status}`);
  const j = (await res.json()) as { embedding: { values: number[] } };
  return j.embedding.values;
}

type ScoredVector = VectorRecord & { _score: number };

function topKVector(qEmb: number[], idx: VectorIndex, k: number): ScoredVector[] {
  const scored: ScoredVector[] = new Array(idx.records.length);
  for (let i = 0; i < idx.records.length; i++) {
    const r = idx.records[i];
    scored[i] = { ...r, _score: cosine(qEmb, r.e) };
  }
  scored.sort((a, b) => b._score - a._score);
  // dedup by route
  const seen = new Set<string>();
  const out: ScoredVector[] = [];
  for (const s of scored) {
    if (!seen.has(s.r)) {
      seen.add(s.r);
      out.push(s);
    }
    if (out.length === k) break;
  }
  return out;
}

// ────────────────────────────────────────────────────────────────────
// Gemini synthesis
// ────────────────────────────────────────────────────────────────────
async function synthesize(systemPrompt: string, userPrompt: string): Promise<string> {
  const url =
    `https://generativelanguage.googleapis.com/v1beta/models/${GENERATE_MODEL}:generateContent?key=` +
    GEMINI_API_KEY;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: systemPrompt }] },
      contents: [{ role: "user", parts: [{ text: userPrompt }] }],
      generationConfig: {
        temperature: 0.2,
        topP: 0.95,
        maxOutputTokens: 600,
      },
    }),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Generate failed ${res.status}: ${t.slice(0, 300)}`);
  }
  const j = (await res.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };
  return j.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
}

// ────────────────────────────────────────────────────────────────────
// Handler
// ────────────────────────────────────────────────────────────────────
type SourceOut = {
  route: string;
  title: string;
  section: string;
  similarity: number;
};

export async function POST(req: Request) {
  if (!GEMINI_API_KEY) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY not configured" },
      { status: 503 },
    );
  }

  let body: { query?: string; k?: number };
  try {
    body = (await req.json()) as { query?: string; k?: number };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const query = (body.query ?? "").trim();
  if (!query) return NextResponse.json({ error: "query required" }, { status: 400 });
  if (query.length > 600) {
    return NextResponse.json({ error: "query too long (max 600 chars)" }, { status: 400 });
  }
  const k = Math.min(Math.max(body.k ?? 5, 1), 10);

  try {
    let mode: "vector" | "fuzzy" = "fuzzy";
    let sources: SourceOut[] = [];
    let contextBlock = "";
    let indexBuilt = "";
    let indexCount = 0;

    const vec = loadVectorIndex();
    if (vec && vec.records.length > 0) {
      // Layer B: vector retrieval
      const qEmb = await embedQuery(query);
      const top = topKVector(qEmb, vec, k);
      mode = "vector";
      indexBuilt = vec.built;
      indexCount = vec.count;
      sources = top.map((t) => ({
        route: t.r,
        title: t.t,
        section: t.s,
        similarity: Number(t._score.toFixed(4)),
      }));
      contextBlock = top
        .map((t, i) => `[${i + 1}] route=${t.r} · title=${t.t}\n${t.b}`)
        .join("\n\n---\n\n");
    } else {
      // Layer A: fuzzy retrieval (always-available fallback)
      const fuzzy = loadFuzzyIndex();
      const top = topKFuzzy(query, fuzzy, k);
      indexBuilt = fuzzy.built;
      indexCount = fuzzy.count;
      if (top.length === 0) {
        return NextResponse.json({
          ok: true,
          mode,
          query,
          answer:
            "No matching routes for that query. Try a different phrasing or browse atomeons.com/sitemap.xml for the full map.",
          sources: [],
          index_built: indexBuilt,
          index_count: indexCount,
        });
      }
      sources = top.map((t) => ({
        route: t.r,
        title: t.t,
        section: t.c || "main",
        // expose a normalized 0–1 "match strength" — score / theoretical max
        similarity: Number(Math.min(t._score / 30, 1).toFixed(4)),
      }));
      contextBlock = top
        .map((t, i) => {
          const headings = (t.h || []).slice(0, 4).join(" · ");
          return `[${i + 1}] route=${t.r} · title=${t.t}\n${t.d}\n${headings}\n${t.b}`;
        })
        .join("\n\n---\n\n");
    }

    const systemPrompt = [
      "You are the search-answer engine for AtomEons Systems Laboratory at atomeons.com.",
      "Answer the user's question based ONLY on the passages provided below.",
      "Voice: lab-grade, anti-hype, technical, calm, direct.",
      "If the passages do not contain the answer, say so plainly and suggest the closest available route.",
      "Cite the route(s) you drew from inline like (atomeons.com/route).",
      "Output 2–5 sentences. No more.",
      "No hedge words. No bullet lists. Just the answer.",
    ].join(" ");

    const userPrompt =
      `QUESTION: ${query}\n\nPASSAGES:\n\n${contextBlock}\n\nAnswer using only these passages.`;

    const answer = await synthesize(systemPrompt, userPrompt);

    return NextResponse.json(
      {
        ok: true,
        mode,
        query,
        answer: answer.trim(),
        sources,
        index_built: indexBuilt,
        index_count: indexCount,
      },
      { headers: { "cache-control": "no-store" } },
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message : "unknown";
    return NextResponse.json(
      { error: msg.slice(0, 500) },
      { status: 500 },
    );
  }
}

export async function GET() {
  const fuzzy = (() => {
    try { return loadFuzzyIndex(); } catch { return null; }
  })();
  const vec = loadVectorIndex();
  return NextResponse.json({
    ok: !!fuzzy,
    mode: vec ? "vector" : "fuzzy",
    fuzzy_index: fuzzy ? { count: fuzzy.count, built: fuzzy.built } : null,
    vector_index: vec ? { count: vec.count, built: vec.built, model: vec.model, dim: vec.dim } : null,
    generate_model: GENERATE_MODEL,
  });
}
