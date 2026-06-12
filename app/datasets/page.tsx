import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Datasets · public lab data · CC-BY 4.0 · AtomEons",
  description:
    "Every public dataset the lab serves. Search indices, route graph, LLM-ingestion manifests, fuzzy index, MCP server schemas. CC-BY 4.0. Fetchable now.",
  alternates: { canonical: "https://atomeons.com/datasets" },
};

/**
 * /datasets — discoverable index of public lab JSON / text / XML.
 *
 * Operator-stated rule: the lab is data-rich. Most surfaces here have
 * a machine-readable companion. This page collects every public
 * asset in one indexable surface so researchers, agent frameworks,
 * AI search engines, and curious developers can find them without
 * grepping the source.
 */

type Dataset = {
  name: string;
  url: string;
  mime: string;
  size: string;
  description: string;
  schema?: string;
  example?: string;
  use?: string;
};

const DATASETS: Dataset[] = [
  {
    name: "fuzzy_search_index",
    url: "/search-index.json",
    mime: "application/json",
    size: "108 KB",
    description: "Full keyword-search index of 247 routes. Each record has title (t), description (d), headings (h), body excerpt (b), keywords (k), category (c), weight (w).",
    schema: "{ v, built, count, records: [{ r, t, d, h[], b, k[], c, w }] }",
    use: "Power your own /search across atomeons.com · or train a downstream retrieval model.",
  },
  {
    name: "route_graph_index",
    url: "/graph-index.json",
    mime: "application/json",
    size: "62 KB",
    description: "Force-laid graph of 278 nodes and 648 edges representing every route and its cross-route links. Powers /constellation.",
    schema: "{ v, built, nodes: [{ r, t, c, w }], edges: [{ from, to }] }",
    use: "Build your own visualization · run graph analytics · find clusters in the lab's content.",
  },
  {
    name: "llm_routes_manifest",
    url: "/llm-routes.json",
    mime: "application/json",
    size: "~46 KB",
    description: "Top 31 most-important routes with full title, description, keywords array, OpenGraph metadata, and JSON-LD schema fragments per route.",
    schema: "{ v, built, count, records: [{ route, title, description, keywords[], openGraph, twitter }] }",
    use: "Ingest into AI search ranking pipelines · use as canonical metadata source.",
  },
  {
    name: "openapi_3_1_spec",
    url: "/openapi.json",
    mime: "application/json",
    size: "~5 KB",
    description: "OpenAPI 3.1 specification of the lab's public API · /api/ask · /api/search · /api/embed · /api/md · /api/sales-count · /api/heartbeat.",
    schema: "Standard OpenAPI 3.1 envelope",
    use: "Generate clients automatically (openapi-generator · oazapfts · etc).",
  },
  {
    name: "mcp_server_manifest",
    url: "/.well-known/mcp.json",
    mime: "application/json",
    size: "~2 KB",
    description: "Model Context Protocol server manifest. Declares the lab's HTTP-transport MCP server at /api/mcp + tool list + resource list.",
    use: "Auto-configure MCP clients (Claude Desktop · Claude Code · Cline · custom) to use atomeons.com as a remote MCP server.",
  },
  {
    name: "agent_self_description",
    url: "/.well-known/agent.json",
    mime: "application/json",
    size: "~2 KB",
    description: "Self-describing agent metadata · endpoints (ask · search · embed · md · openapi · mcp) · resources (indices · sitemaps · llms.txt) · training-data policy.",
    use: "Agent frameworks fetching this can auto-discover everything the lab exposes.",
  },
  {
    name: "ai_plugin_legacy",
    url: "/.well-known/ai-plugin.json",
    mime: "application/json",
    size: "~1 KB",
    description: "Legacy ChatGPT-plugin manifest. Perplexity and some custom GPTs still ingest this format.",
  },
  {
    name: "full_corpus_text",
    url: "/llms-full.txt",
    mime: "text/plain",
    size: "~120 KB",
    description: "Full lab content dump · every lesson drill prompt + glossary term + persona path + recent letters + trust posture. Regenerated per request · 15-min edge cache.",
    use: "Single fetch to ingest the lab into an AI training pipeline.",
  },
  {
    name: "llms_overview_text",
    url: "/llms.txt",
    mime: "text/plain",
    size: "~22 KB",
    description: "Anthropic-spec llms.txt convention. Concise overview of the lab plus canonical surface list.",
  },
  {
    name: "llms_overview_md",
    url: "/llms.md",
    mime: "text/markdown",
    size: "~22 KB",
    description: "Markdown-extension alias for /llms.txt. Same content, .md extension for LLMs that prefer it.",
  },
  {
    name: "sitemap_global",
    url: "/sitemap.xml",
    mime: "application/xml",
    size: "~25 KB",
    description: "Standard sitemap.xml. Every public route, with lastmod, changefreq, and priority.",
  },
  {
    name: "sitemap_ai_priority",
    url: "/sitemap-ai.xml",
    mime: "application/xml",
    size: "~6 KB",
    description: "AI-priority sitemap. 55 routes the lab most wants AI crawlers to ground answers in, ranked by priority.",
    use: "PerplexityBot · GPTBot · ClaudeBot · OAI-SearchBot read this preferentially.",
  },
  {
    name: "sitemap_news",
    url: "/sitemap-news.xml",
    mime: "application/xml",
    size: "~1 KB",
    description: "Google News sitemap. Founder's View nightly broadcasts published in the rolling 48-hour window.",
  },
  {
    name: "security_disclosure",
    url: "/.well-known/security.txt",
    mime: "text/plain",
    size: "~1.4 KB",
    description: "RFC 9116 vulnerability disclosure policy. 90-day remediation, free ORANGEBOX license for confirmed high-severity reports.",
  },
  {
    name: "ai_training_policy",
    url: "/.well-known/ai.txt",
    mime: "text/plain",
    size: "~1.3 KB",
    description: "Spawning AI v1 training-data manifest. Declares ALLOW posture for the lab's CC-BY 4.0 content.",
  },
];

const PRINCIPLES = [
  "Every dataset is CC-BY 4.0 unless noted. Attribution preserved on use is the only ask.",
  "Every dataset is fetchable with one curl. No API key, no signup, no quota.",
  "Every dataset rebuilds on every deploy from the actual source tree. Schemas can't drift.",
  "If you build something with these, atom@atomeons.com — we want to feature it.",
];

export default function DatasetsPage() {
  return (
    <main className="min-h-screen text-[#F4F4F2]">
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF]">§ datasets · open · CC-BY 4.0</p>
          <h1 className="mt-6 font-serif text-[44px] font-light leading-[1.04] tracking-[-0.025em] md:text-[64px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Everything machine-readable.
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-[18px] leading-[1.55] text-[#9CA3AF] md:text-[20px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Fifteen public datasets the lab serves. Search indices,
            route graphs, manifests, schemas. CC-BY 4.0. Fetchable now,
            no auth.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <ol className="space-y-5">
            {DATASETS.map((d, i) => (
              <li key={d.url} className="border border-[#1F242B] bg-[#0F1114] p-6 md:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-[#1F242B] pb-3">
                  <div className="flex items-baseline gap-4">
                    <p className="font-mono text-[11px] tabular-nums text-[#7a818a]">DS-{String(i + 1).padStart(2, "0")}</p>
                    <h2 className="font-mono text-[18px] text-[#22F0D5]">{d.name}</h2>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a]">{d.mime}</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a]">{d.size}</p>
                  </div>
                </div>
                <p className="mt-4 font-serif text-[15px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{d.description}</p>
                {d.schema ? (
                  <pre className="mt-4 overflow-x-auto border border-[#1F242B] bg-[#08090B] p-3 font-mono text-[11px] text-[#9CA3AF]">{d.schema}</pre>
                ) : null}
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
                  curl https://atomeons.com{d.url}
                </p>
                {d.use ? (
                  <p className="mt-3 font-serif text-[13px] italic leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                    use → {d.use}
                  </p>
                ) : null}
                <a
                  href={d.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5] underline decoration-[#1F242B] underline-offset-4 transition-colors hover:decoration-[#22F0D5]"
                >
                  fetch the file →
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ usage rules</p>
          <ol className="mt-8 space-y-3">
            {PRINCIPLES.map((p, i) => (
              <li key={i} className="flex items-baseline gap-4 border-b border-[#1F242B] pb-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a]">{String(i + 1).padStart(2, "0")}</span>
                <p className="font-serif text-[16px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <div className="grid gap-3 md:grid-cols-3">
            {[
              { href: "/api", label: "Developer API docs" },
              { href: "/constellation", label: "See the graph rendered" },
              { href: "/ask", label: "Try /ask" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="group border border-[#1F242B] bg-[#0F1114] p-4 transition-colors hover:border-[#22F0D5]">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a] transition-colors group-hover:text-[#22F0D5]">atomeons.com{l.href}</p>
                <p className="mt-2 font-serif text-[17px] font-medium" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{l.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
