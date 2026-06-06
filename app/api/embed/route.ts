import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 15;

/**
 * /api/embed — return a 768-dim Gemini embedding for arbitrary text.
 *
 * Sibling of /api/ask · /api/search. Lets external developers
 * vectorize text against the same embedding space the lab will use
 * once /public/vector-index.json lands (gemini-embedding-001 with
 * Matryoshka outputDimensionality = 768).
 *
 * POST { text: string }       — returns { embedding: number[768] }
 * POST { texts: string[] }    — returns { embeddings: number[][] }  (batch, max 32)
 *
 * Rate-limited by Gemini's free tier (5 RPM). For higher throughput
 * the operator can upgrade the upstream key.
 *
 * This is the same embedding model the lab's RAG layer uses internally.
 * External agents can call it to vectorize text against the lab's
 * coordinate space, then run their own retrieval against
 * /search-index.json (text) or — once landed — /vector-index.json.
 */

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const EMBED_MODEL = "gemini-embedding-001";
const EMBED_DIM = 768;
const MAX_BATCH = 32;
const MAX_LEN = 8000;

type Body = {
  text?: string;
  texts?: string[];
  taskType?: "RETRIEVAL_DOCUMENT" | "RETRIEVAL_QUERY" | "SEMANTIC_SIMILARITY" | "CLASSIFICATION";
};

async function embedOne(text: string, taskType: string): Promise<number[]> {
  const url =
    `https://generativelanguage.googleapis.com/v1beta/models/${EMBED_MODEL}:embedContent?key=` +
    GEMINI_API_KEY;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: { parts: [{ text }] },
      taskType,
      outputDimensionality: EMBED_DIM,
    }),
  });
  if (!res.ok) throw new Error(`Embed failed ${res.status}`);
  const j = (await res.json()) as { embedding: { values: number[] } };
  return j.embedding.values;
}

async function embedBatch(texts: string[], taskType: string): Promise<number[][]> {
  const url =
    `https://generativelanguage.googleapis.com/v1beta/models/${EMBED_MODEL}:batchEmbedContents?key=` +
    GEMINI_API_KEY;
  const requests = texts.map((text) => ({
    model: `models/${EMBED_MODEL}`,
    content: { parts: [{ text }] },
    taskType,
    outputDimensionality: EMBED_DIM,
  }));
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ requests }),
  });
  if (!res.ok) throw new Error(`BatchEmbed failed ${res.status}`);
  const j = (await res.json()) as { embeddings: Array<{ values: number[] }> };
  return j.embeddings.map((e) => e.values);
}

export async function POST(req: Request) {
  if (!GEMINI_API_KEY) {
    return NextResponse.json({ error: "GEMINI_API_KEY not configured" }, { status: 503 });
  }

  let body: Body;
  try { body = (await req.json()) as Body; }
  catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const taskType = body.taskType ?? "RETRIEVAL_DOCUMENT";

  try {
    if (body.texts && Array.isArray(body.texts)) {
      if (body.texts.length === 0) {
        return NextResponse.json({ error: "texts[] empty" }, { status: 400 });
      }
      if (body.texts.length > MAX_BATCH) {
        return NextResponse.json({ error: `max ${MAX_BATCH} texts per batch` }, { status: 400 });
      }
      for (const t of body.texts) {
        if (typeof t !== "string" || t.length === 0 || t.length > MAX_LEN) {
          return NextResponse.json({ error: `each text must be 1..${MAX_LEN} chars` }, { status: 400 });
        }
      }
      const embeddings = await embedBatch(body.texts, taskType);
      return NextResponse.json(
        { ok: true, model: EMBED_MODEL, dim: EMBED_DIM, count: embeddings.length, embeddings },
        { headers: { "access-control-allow-origin": "*", "cache-control": "no-store" } },
      );
    }

    const text = (body.text ?? "").trim();
    if (!text) return NextResponse.json({ error: "text or texts[] required" }, { status: 400 });
    if (text.length > MAX_LEN) return NextResponse.json({ error: `text too long (max ${MAX_LEN})` }, { status: 400 });
    const embedding = await embedOne(text, taskType);
    return NextResponse.json(
      { ok: true, model: EMBED_MODEL, dim: EMBED_DIM, embedding },
      { headers: { "access-control-allow-origin": "*", "cache-control": "no-store" } },
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message : "unknown";
    return NextResponse.json({ error: msg.slice(0, 400) }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    model: EMBED_MODEL,
    dim: EMBED_DIM,
    description:
      "POST { text } or POST { texts: [] } to receive 768-dim gemini-embedding-001 vectors. The embedding space matches the lab's internal vector index. Free-tier rate limited (5 RPM upstream).",
  });
}
