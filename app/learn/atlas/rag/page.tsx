import type { Metadata } from "next";
import Link from "next/link";
import { LearnHeroImage } from "../../../_components/LearnHeroImage";

/**
 * /learn/atlas/rag — retrieval-augmented generation in 2026.
 *
 * The single most-deployed AI architecture pattern of 2024-2026.
 * What it is, what it's good for, where it breaks, what's beyond it.
 */

export const metadata: Metadata = {
  title: "RAG · retrieval-augmented generation in 2026 · /learn/atlas/rag · AtomEons",
  description:
    "RAG explained without the hype. Naive RAG, contextual retrieval, query rewriting, hybrid search, reranking, chunking, embeddings, vector DBs (Pinecone, Weaviate, Turbopuffer, pgvector), GraphRAG, agentic RAG. What works, what breaks, what's next.",
  alternates: { canonical: "https://atomeons.com/learn/atlas/rag" },
  openGraph: {
    title: "RAG · retrieval-augmented generation",
    description: "The most-deployed AI architecture of 2024-2026, explained honestly.",
    url: "https://atomeons.com/learn/atlas/rag",
    type: "article",
  },
  robots: { index: true, follow: true },
};

const ACCENT = "#22F0D5";
const WARN = "#FFB87A";

const ARCHITECTURE = [
  {
    name: "Naive RAG",
    body: "User query → embed → vector search top-k chunks → stuff into LLM context → generate. The textbook diagram every blog post draws. Works for narrow, well-curated corpora. Fails on anything resembling a real enterprise document set.",
    when: "Demo apps, FAQ bots, small knowledge bases with high editorial care.",
    breaks: "Multi-hop questions. Questions that need reasoning across documents. Documents with poor chunking. Tables. Code. Most real corpora.",
  },
  {
    name: "Hybrid search (dense + sparse)",
    body: "Combine vector similarity (semantic) with BM25 or similar lexical match (keyword). Take the union with reciprocal rank fusion or similar score blending. Catches both 'documents similar in meaning' and 'documents that contain the exact rare term the user typed.' Substantially better than pure vector search on real corpora.",
    when: "Most production RAG should start here, not at naive RAG.",
    breaks: "Still has the chunking + reasoning + multi-hop problems. Just better at the retrieval step.",
  },
  {
    name: "Contextual retrieval (Anthropic Sep 2024)",
    body: "Before embedding each chunk, prepend a model-generated context blob that situates the chunk within its broader document (the section it's from, the document type, the company/topic). Reportedly cuts retrieval failure rate by ~50% over naive. Pairs with hybrid search and reranking.",
    when: "When chunk-level context-loss is causing retrieval failures (i.e., always).",
    breaks: "Cost: requires a per-chunk LLM call at indexing time. Index-build time + cost are the tradeoffs.",
  },
  {
    name: "Reranking",
    body: "After retrieval brings back top-50 or top-100, a separate cross-encoder model re-scores the candidates against the query. Cohere Rerank, Voyage Rerank, BGE-Reranker are the public options. Reranking is the single most impactful improvement most RAG systems can make.",
    when: "Any production system. Almost always net-positive.",
    breaks: "Adds latency (~50-200ms). Adds cost. Bad reranker can be worse than no reranker.",
  },
  {
    name: "Query rewriting + decomposition",
    body: "Before retrieval, an LLM rewrites the user's question to optimize for retrieval (e.g., expand acronyms, split multi-part questions, generate sub-queries). Sub-queries each retrieve their own context, then merge for final generation.",
    when: "Multi-hop questions, ambiguous queries, conversational follow-ups that reference earlier turns.",
    breaks: "Adds an LLM call before retrieval. Sometimes the rewrite is wrong and degrades performance.",
  },
  {
    name: "GraphRAG (Microsoft Research, 2024)",
    body: "Build an entity-relationship knowledge graph from the corpus at indexing time. Use graph + community summaries for retrieval, not just chunk-level vectors. Strong on cross-document synthesis questions ('what does the corpus say about X?').",
    when: "Corpora where entities + relationships matter (legal, medical, scientific literature).",
    breaks: "Expensive to build the graph. Complex pipeline. Microsoft's open-source implementation is a reference but heavy.",
  },
  {
    name: "Agentic RAG",
    body: "Instead of one retrieval + one generation, the LLM iteratively decides what to retrieve next based on what it has already seen. Multi-hop tool-use loop where 'search the knowledge base' is one of the agent's tools. Significantly better for hard questions; significantly more expensive per query.",
    when: "Research-grade queries, complex troubleshooting, deep technical analysis.",
    breaks: "Cost: 5-30× more LLM calls per question. Latency: 10-60+ seconds. Failure modes of agent systems apply (infinite loops, off-topic drift).",
  },
  {
    name: "Long-context (no RAG)",
    body: "With 1M-2M token context windows (Gemini 1.5/2.5, Claude Sonnet 4 beta), some teams skip retrieval entirely and just dump the relevant document set into the prompt. Works for small-to-medium corpora; fails on cost + latency for anything larger than ~50-100 documents.",
    when: "When the entire relevant corpus fits comfortably in context.",
    breaks: "Inference cost scales linearly with input tokens. Lost-in-the-middle effects remain (Liu et al. 2023). Information retrieval at scale is still cheaper than 'just put it all in the context.'",
  },
];

const VECTOR_DATABASES = [
  { name: "pgvector (Postgres extension)", note: "The pragmatic choice for most production teams. Same operational footprint as the rest of your stack. Performance up to ~1-10M vectors before specialized DBs win." },
  { name: "Pinecone", note: "The original commercial vector DB. Hosted-only, opinionated API, strong performance. Default pick for many enterprises through 2023." },
  { name: "Weaviate", note: "Open-source + hosted. Schema-aware, hybrid-search built in. Strong for teams wanting features beyond raw vector search." },
  { name: "Qdrant", note: "Open-source + hosted. Rust-based. Strong performance per dollar. Filterable payloads are a deployment-friendly feature." },
  { name: "Turbopuffer", note: "Newer (2024+). S3-backed, very cheap. Strong choice when cost-per-stored-vector matters more than millisecond-level latency." },
  { name: "LanceDB", note: "Embedded vector DB built on Apache Lance. Good for client-side / edge / on-device use cases. Strong with multimodal." },
  { name: "Chroma", note: "Open-source. Strong developer-experience focus. Common for prototyping; some teams ship it to production." },
  { name: "Milvus / Zilliz", note: "Open-source (Milvus) + commercial (Zilliz Cloud). Strong at very large scale (billions of vectors). Heavier ops footprint." },
];

const FAILURE_MODES = [
  "Chunk boundary loss. Information that spans chunks (sentences split awkwardly, tables truncated, lists cut in half) is invisible to chunk-level retrieval. Mitigations: smarter chunking, overlap, hierarchical chunking, structure-aware ingestion.",
  "Embedding model mismatch. Embedding models trained on English web text are weak on code, multilingual content, scientific notation, dates, and numeric reasoning. Use the right embedding model for your domain.",
  "Top-k too low. Naive RAG often retrieves top-5 chunks. For complex questions, you need top-20-to-50 + reranking. The right k depends on the question type.",
  "Stale corpus. RAG only works if the corpus is current. Every production RAG system needs an ingestion pipeline, not just a one-time index build.",
  "Embedding-search drift. The embedding model that was state-of-art when you built the index isn't anymore. Re-embedding is expensive but periodically necessary.",
  "Permission boundaries. RAG can leak documents the user shouldn't see if your retrieval layer doesn't enforce the same auth/permission model your application does. Document-level ACLs in the retrieval layer are non-negotiable.",
];

const SOURCES = [
  { title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks", authors: "Lewis et al. (Meta + UCL)", url: "https://arxiv.org/abs/2005.11401", year: "2020" },
  { title: "Lost in the Middle: How Language Models Use Long Contexts", authors: "Liu et al. (Stanford + multiple)", url: "https://arxiv.org/abs/2307.03172", year: "2023" },
  { title: "Anthropic · Introducing Contextual Retrieval", authors: "Anthropic", url: "https://www.anthropic.com/news/contextual-retrieval", year: "2024" },
  { title: "GraphRAG: A new approach for discovery using complex information", authors: "Microsoft Research", url: "https://www.microsoft.com/en-us/research/blog/graphrag-unlocking-llm-discovery-on-narrative-private-data/", year: "2024" },
  { title: "RAG vs Long Context: A Comparison (Anthropic)", authors: "Anthropic blog post", url: "https://www.anthropic.com/news/contextual-retrieval", year: "2024" },
  { title: "BGE-Reranker · BAAI open-source reranker", authors: "BAAI", url: "https://huggingface.co/BAAI/bge-reranker-v2-m3", year: "2023+" },
];

export default function AtlasRagPage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <LearnHeroImage slug="atlas-embeddings" alt="A single point of bio-cyan light suspended inside a clear crystal cube — a vector in semantic space." />
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[11px] tracking-[0.08em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn/atlas" className="hover:text-[#22F0D5]">Atlas</Link>{" "}
          <span className="text-[#1A2225]">/</span> RAG
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            Retrieval-augmented generation · the atlas
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            The most-deployed AI pattern of 2026,{" "}
            <span style={{ color: ACCENT }}>explained honestly.</span>
          </h1>
          <p className="mt-8 max-w-[62ch] text-base leading-[1.7] text-[#C8CCCE] md:text-[17px]">
            Every enterprise AI app touches RAG somewhere. Most production RAG systems are not the diagram in the blog post — they&apos;re hybrid search + contextual chunking + reranking + query rewriting + document-level permission boundaries. This page walks the actual architecture stack honestly, including where it breaks.
          </p>
        </div>
      </section>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            Eight architecture patterns
          </p>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            From naive RAG to no-RAG.
          </h2>
          <div className="mt-10 space-y-10">
            {ARCHITECTURE.map((a, i) => (
              <article key={a.name} className="border-l-2 pl-6" style={{ borderColor: ACCENT + "30" }}>
                <div className="flex flex-wrap items-baseline gap-4">
                  <p className="font-mono text-[14px] tabular-nums" style={{ color: ACCENT }}>
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-xl font-medium tracking-tight text-[#F2F4F5] md:text-2xl">
                    {a.name}
                  </h3>
                </div>
                <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">{a.body}</p>
                <p className="mt-4 max-w-[62ch] text-[14px] leading-[1.65] text-[#C8CCCE]">
                  <span className="font-medium text-[#22F0D5]">When to use: </span>{a.when}
                </p>
                <p className="mt-2 max-w-[62ch] text-[14px] leading-[1.65] text-[#9BA5A7]">
                  <span className="font-medium text-[#FFB87A]">Where it breaks: </span>{a.breaks}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1A2225] bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            Vector databases
          </p>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            Eight options, honest notes.
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {VECTOR_DATABASES.map((v) => (
              <article key={v.name} className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6">
                <h3 className="text-lg font-medium tracking-tight text-[#F2F4F5]">{v.name}</h3>
                <p className="mt-3 text-[14px] leading-[1.65] text-[#C8CCCE]">{v.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: WARN }}>
            Where RAG breaks in production
          </p>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            Six failure modes.
          </h2>
          <ul className="mt-10 space-y-4">
            {FAILURE_MODES.map((m, i) => (
              <li key={i} className="grid grid-cols-[2.5rem_1fr] gap-4">
                <span className="font-mono text-xl font-bold tabular-nums" style={{ color: WARN }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-base leading-[1.7] text-[#C8CCCE]">{m}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16">
          <h2 className="text-[13px] font-medium uppercase tracking-[0.14em] text-[#9BA5A7]">Sources</h2>
          <ol className="mt-6 divide-y divide-[#1A2225]/60">
            {SOURCES.map((s, i) => (
              <li key={i} className="grid grid-cols-[2.5rem_1fr] gap-4 py-4">
                <span className="font-mono text-[11px] tracking-[0.08em] tabular-nums pt-0.5" style={{ color: ACCENT }}>
                  [{String(i + 1).padStart(2, "0")}]
                </span>
                <div>
                  <p className="text-[15px] leading-[1.6] text-[#C8CCCE]">{s.title}</p>
                  <p className="mt-1 text-[12px] text-[#9BA5A7]">{s.authors} · {s.year}</p>
                  <a href={s.url} target="_blank" rel="noopener" className="mt-1 inline-block break-all font-mono text-[11px] text-[#9BA5A7] hover:text-[#22F0D5]">
                    {s.url} ↗
                  </a>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/learn/atlas/embeddings" className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 px-5 py-2.5 text-sm font-medium text-[#22F0D5] transition-colors hover:bg-[#22F0D5]/10">
              Embeddings · the substrate →
            </Link>
            <Link href="/learn/atlas/agents" className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] px-5 py-2.5 text-sm text-[#C8CCCE] transition-colors hover:border-[#22F0D5]/40 hover:text-[#22F0D5]">
              Agentic RAG details →
            </Link>
            <Link href="/learn/atlas" className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] px-5 py-2.5 text-sm text-[#9BA5A7] transition-colors hover:text-[#E7EBED]">
              ← atlas index
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
