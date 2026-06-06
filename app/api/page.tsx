import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "API · atomeons.com developer docs · /ask · /search · /embed · /md",
  description:
    "Public API documentation for atomeons.com. /api/ask semantic Q&A, /api/search fuzzy keyword index, /api/embed Gemini vectors, /api/md per-page markdown export. CORS open, CC-BY 4.0.",
  alternates: { canonical: "https://atomeons.com/api" },
};

type Endpoint = {
  method: "GET" | "POST";
  path: string;
  summary: string;
  example: string;
  response: string;
  notes?: string;
};

const ENDPOINTS: Endpoint[] = [
  {
    method: "POST",
    path: "/api/ask",
    summary: "Semantic Q&A over atomeons.com's 256 routes. Returns a 2-5 sentence answer with route-level citations.",
    example: `curl -X POST https://atomeons.com/api/ask \\
  -H 'content-type: application/json' \\
  -d '{"query":"what is prompt injection","k":5}'`,
    response: `{
  "ok": true,
  "mode": "fuzzy",
  "query": "what is prompt injection",
  "answer": "Prompt injection is ... (atomeons.com/q/what-is-prompt-injection)",
  "sources": [
    { "route": "/q/what-is-prompt-injection", "title": "What Is Prompt Injection?",
      "section": "main", "similarity": 0.53 },
    ...
  ],
  "index_built": "2026-06-05",
  "index_count": 247
}`,
    notes: "Layer A is fuzzy keyword retrieval; Layer B (vector retrieval, gemini-embedding-001 768-dim) auto-promotes once /public/vector-index.json lands. Synthesis uses gemini-2.5-flash. Query max 600 chars · k range 1-10.",
  },
  {
    method: "GET",
    path: "/api/ask",
    summary: "Health check + index state.",
    example: "curl https://atomeons.com/api/ask",
    response: `{
  "ok": true,
  "mode": "fuzzy",
  "fuzzy_index": { "count": 247, "built": "2026-06-05" },
  "vector_index": null,
  "generate_model": "gemini-2.5-flash"
}`,
  },
  {
    method: "GET",
    path: "/api/search?q=…&k=10",
    summary: "Fuzzy keyword search · returns matching routes WITHOUT synthesis.",
    example: "curl 'https://atomeons.com/api/search?q=prompt+injection&k=5'",
    response: `{
  "ok": true,
  "query": "prompt injection",
  "count": 5,
  "results": [
    {
      "route": "/q/what-is-prompt-injection",
      "title": "What Is Prompt Injection?",
      "description": "...",
      "score": 23,
      "headings": ["The short answer", "The longer answer"],
      "snippet": "..."
    },
    ...
  ]
}`,
    notes: "CORS open · k range 1-50 · cached 60s edge.",
  },
  {
    method: "POST",
    path: "/api/embed",
    summary: "Gemini-embedding-001 vectors at 768 dimensions (Matryoshka). Single text or batch up to 32.",
    example: `curl -X POST https://atomeons.com/api/embed \\
  -H 'content-type: application/json' \\
  -d '{"text":"hello world"}'`,
    response: `{
  "ok": true,
  "model": "gemini-embedding-001",
  "dim": 768,
  "embedding": [0.0123, -0.0456, ...]
}`,
    notes: "Rate-limited upstream by Gemini free tier (5 RPM). Each text max 8000 chars. Batch endpoint accepts {texts: [...]} up to 32 items. taskType options: RETRIEVAL_DOCUMENT (default) · RETRIEVAL_QUERY · SEMANTIC_SIMILARITY · CLASSIFICATION.",
  },
  {
    method: "GET",
    path: "/api/md?route=/orangebox",
    summary: "Per-page markdown export of any indexed route. Cleaner for LLM ingestion than rendered HTML.",
    example: "curl 'https://atomeons.com/api/md?route=/orangebox'",
    response: "# ORANGEBOX Version 1\\n\\n**Route:** `atomeons.com/orangebox`\\n**License:** CC-BY 4.0\\n\\n## Description\\n...\\n\\n## Body\\n...",
    notes: "404 returns close-route suggestions in markdown.",
  },
  {
    method: "GET",
    path: "/api/sales-count",
    summary: "Live sales counter + revenue + current dynamic price.",
    example: "curl https://atomeons.com/api/sales-count",
    response: `{
  "ok": true,
  "ts": "2026-06-05T23:00:00Z",
  "total_sales": 0,
  "total_revenue_usd": 0,
  "net_buyers": 0,
  "current_price_usd": 1,
  ...
}`,
  },
];

const RESOURCES = [
  { url: "https://atomeons.com/openapi.json", what: "OpenAPI 3.1 spec · machine-readable" },
  { url: "https://atomeons.com/.well-known/agent.json", what: "Agent discovery manifest · endpoints + resources" },
  { url: "https://atomeons.com/.well-known/mcp.json", what: "Model Context Protocol manifest · ask_atomeons tool" },
  { url: "https://atomeons.com/.well-known/ai-plugin.json", what: "Legacy ChatGPT plugin manifest" },
  { url: "https://atomeons.com/llms.txt", what: "Lab-content overview for LLM ingestion" },
  { url: "https://atomeons.com/llms.md", what: "Same content, .md extension" },
  { url: "https://atomeons.com/llms-full.txt", what: "Full corpus dump · regenerated per request · 15-min edge cache" },
  { url: "https://atomeons.com/search-index.json", what: "Fuzzy search index · 247 routes · same data /api/search returns" },
  { url: "https://atomeons.com/llm-routes.json", what: "Top 31 routes with JSON-LD + OG metadata" },
  { url: "https://atomeons.com/sitemap.xml", what: "Global sitemap · every route" },
  { url: "https://atomeons.com/sitemap-ai.xml", what: "AI-priority sitemap · 55 routes ranked" },
  { url: "https://atomeons.com/sitemap-news.xml", what: "Founder's View nightly broadcast news sitemap" },
  { url: "https://atomeons.com/robots.txt", what: "Crawler hints · 30+ AI bots explicitly allowed" },
];

export default function ApiDocsPage() {
  return (
    <main className="min-h-screen text-[#F4F4F2]">
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF]">§ developer API · public · CORS open</p>
          <h1 className="mt-6 font-serif text-[44px] font-light leading-[1.04] tracking-[-0.025em] md:text-[64px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Build on atomeons.com.
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-[18px] leading-[1.55] text-[#9CA3AF] md:text-[20px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Six public endpoints. Semantic Q&A, fuzzy search, embeddings,
            markdown export, sales counters. CORS open. CC-BY 4.0. No
            auth, no quotas, no API key, no signup.
          </p>
        </div>
      </section>

      {ENDPOINTS.map((e) => (
        <section key={e.path + e.method} className="border-b border-[#1F242B]">
          <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
            <div className="flex flex-wrap items-baseline gap-4">
              <p
                className="font-mono text-[12px] font-medium uppercase tracking-[0.22em]"
                style={{ color: e.method === "POST" ? "#C9A55C" : "#22F0D5" }}
              >
                {e.method}
              </p>
              <h2 className="font-mono text-[20px] text-[#F4F4F2]">{e.path}</h2>
            </div>
            <p className="mt-3 max-w-2xl font-serif text-[16px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{e.summary}</p>

            <div className="mt-6 border-l-2 border-[#22F0D5] pl-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">example</p>
              <pre className="mt-3 overflow-x-auto border border-[#1F242B] bg-[#08090B] p-4 font-mono text-[12px] text-[#F4F4F2]">{e.example}</pre>
            </div>

            <div className="mt-6 border-l-2 border-[#1F242B] pl-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF]">response · sample</p>
              <pre className="mt-3 overflow-x-auto border border-[#1F242B] bg-[#08090B] p-4 font-mono text-[11px] leading-[1.6] text-[#9CA3AF]">{e.response}</pre>
            </div>

            {e.notes ? (
              <div className="mt-6 border-l-2 border-[#5A6068] pl-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068]">notes</p>
                <p className="mt-3 font-serif text-[14px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{e.notes}</p>
              </div>
            ) : null}
          </div>
        </section>
      ))}

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ machine-readable resources</p>
          <ul className="mt-8 divide-y divide-[#1F242B]">
            {RESOURCES.map((r) => (
              <li key={r.url} className="grid gap-3 py-3 md:grid-cols-[1fr_300px]">
                <a href={r.url} target="_blank" rel="noopener noreferrer" className="font-mono text-[13px] text-[#22F0D5] hover:underline">{r.url}</a>
                <p className="font-serif text-[14px] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{r.what}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <div className="border-l-2 border-[#22F0D5] bg-[#0B0C0F] p-6 md:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ if you build something with these</p>
            <p className="mt-3 font-serif text-[16px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
              Email atom@atomeons.com. I want to see it. If it's interesting,
              I'll feature it in /now and probably write about it in
              Founder's View. CC-BY 4.0 means attribution preserved — that's
              the only ask.
            </p>
          </div>
          <div className="mt-12 grid gap-3 md:grid-cols-3">
            {[
              { href: "/ask", label: "Try /ask in the UI" },
              { href: "/openapi.json", label: "OpenAPI spec" },
              { href: "/.well-known/agent.json", label: "Agent discovery" },
            ].map((l) => (
              <a key={l.href} href={l.href} className="group border border-[#1F242B] bg-[#0F1114] p-4 transition-colors hover:border-[#22F0D5]">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068] transition-colors group-hover:text-[#22F0D5]">atomeons.com{l.href}</p>
                <p className="mt-2 font-serif text-[17px] font-medium" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{l.label}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
