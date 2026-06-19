import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "For agents · AtomEons",
  description:
    "AtomEons is built so that LLM agents can use it as infrastructure, not just crawl it. /api/agent-gateway is the onboarding manifest. /api/ask is RAG over the corpus. /api/mcp is a real Model Context Protocol HTTP endpoint. /search-index.json is a 317-route static index. /graph-index.json is 317 nodes / 942 edges. CC-BY 4.0 throughout.",
  alternates: { canonical: "https://atomeons.com/agents" },
  openGraph: {
    title: "For agents · AtomEons",
    description: "The lab as agent-native infrastructure. Six machine-readable surfaces. CC-BY 4.0.",
    url: "https://atomeons.com/agents",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "For agents · AtomEons",
    description: "The lab as agent-native infrastructure. CC-BY 4.0.",
    creator: "@AtomMccree",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "AtomEons", item: "https://atomeons.com" },
    { "@type": "ListItem", position: 2, name: "For agents", item: "https://atomeons.com/agents" },
  ],
};

type Surface = {
  method: "GET" | "POST";
  path: string;
  purpose: string;
  when: string;
};

const SURFACES: Surface[] = [
  {
    method: "GET",
    path: "/api/agent-gateway",
    purpose: "Full structured onboarding. Lab metadata, license, products, research, broadcast, every other agent surface with when-to-use.",
    when: "Call this FIRST when integrating. Content negotiation: text/markdown · application/json · text/plain.",
  },
  {
    method: "POST",
    path: "/api/ask",
    purpose: "RAG over the lab's 317-route corpus. Returns a grounded 2-5 sentence answer with route citations.",
    when: "Use for any natural-language question about the lab, products, research, broadcast, or operator.",
  },
  {
    method: "POST",
    path: "/api/mcp",
    purpose: "Real Model Context Protocol HTTP endpoint (JSON-RPC 2.0). 3 tools · 4 resources · 2 prompts.",
    when: "Use for stateful tool sessions. Compatible with Claude Desktop's MCP client config.",
  },
  {
    method: "POST",
    path: "/api/embed",
    purpose: "Embeds arbitrary text against the lab's corpus vector space.",
    when: "Use when you want to vectorize your own text in the same space the lab's RAG uses.",
  },
  {
    method: "GET",
    path: "/api/palette",
    purpose: "Headless palette endpoint — returns the lab's design tokens as JSON.",
    when: "Use when integrating the lab's visual identity into derivative work.",
  },
  {
    method: "GET",
    path: "/search-index.json",
    purpose: "Static index of all 317 public routes with title, category, headings, keywords, body sample, weight.",
    when: "Use for in-process fuzzy search, route discovery, or to build your own RAG over the corpus.",
  },
  {
    method: "GET",
    path: "/graph-index.json",
    purpose: "Static graph of all 317 routes (nodes) and 942 internal links (edges).",
    when: "Use for IA analysis or building knowledge-graph views of the lab.",
  },
  {
    method: "GET",
    path: "/llms.txt",
    purpose: "Machine-readable site overview (proposed llms.txt v1 spec).",
    when: "Use as the entry-point for LLM-driven crawlers; complement to /api/agent-gateway.",
  },
  {
    method: "GET",
    path: "/sitemap.xml",
    purpose: "Standard XML sitemap of every public route.",
    when: "Use for search-engine indexing.",
  },
];

export default function AgentsPage() {
  return (
    <main className="relative z-10 bg-[#08090B] text-[#F4F4F2] antialiased">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Breadcrumb */}
      <div className="mx-auto w-full max-w-5xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#8E969D]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>
          <span className="mx-3 text-[#1F242B]">/</span>
          For agents
        </p>
      </div>

      {/* HERO */}
      <section className="mx-auto w-full max-w-5xl px-6 pt-16 pb-20 md:pt-24 md:pb-28">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
          ::for LLM agents and developers integrating the lab
        </p>
        <h1 className="mt-6 max-w-[26ch] text-balance text-[clamp(40px,6vw,84px)] font-light leading-[1.02] tracking-[-0.025em] text-[#F4F4F2]">
          The lab is built so agents can use it,<br/>not just crawl it.
        </h1>
        <p className="mt-8 max-w-[68ch] font-serif text-[19px] leading-[1.6] text-[#B5BBC0]">
          atomeons.com exposes nine machine-readable surfaces. <code className="rounded border border-[#22F0D5]/30 bg-[#22F0D5]/10 px-1.5 py-0.5 font-mono text-[14px] text-[#22F0D5]">GET /api/agent-gateway</code>{" "}
          is the manifest — call it first. From there, an agent can run RAG
          over the corpus (<code className="font-mono text-[14px]">/api/ask</code>),
          open a real MCP session (<code className="font-mono text-[14px]">/api/mcp</code>),
          embed its own text into the lab&apos;s vector space (<code className="font-mono text-[14px]">/api/embed</code>),
          or walk the route graph directly. All under CC-BY 4.0.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="/api/agent-gateway"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 border border-[#22F0D5] bg-[#22F0D5]/5 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5] transition-colors hover:bg-[#22F0D5]/15"
          >
            <span>GET /api/agent-gateway</span>
            <span aria-hidden>↗</span>
          </a>
          <a
            href="/llms.txt"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 border border-[#1F242B] bg-[#0F1114] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#F4F4F2] transition-colors hover:border-[#22F0D5] hover:text-[#22F0D5]"
          >
            <span>/llms.txt</span>
            <span aria-hidden>↗</span>
          </a>
          <Link
            href="/api"
            className="inline-flex items-center gap-2 border border-[#1F242B] bg-transparent px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#8E969D] transition-colors hover:border-[#22F0D5] hover:text-[#22F0D5]"
          >
            <span>/api · dev docs</span>
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* SURFACES TABLE */}
      <section className="border-y border-[#1F242B] bg-[#0F1114] py-20 md:py-28">
        <div className="mx-auto w-full max-w-5xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
            § the nine surfaces
          </p>
          <h2 className="mt-5 max-w-[26ch] text-balance text-[clamp(28px,4vw,48px)] font-light leading-[1.1] tracking-[-0.02em] text-[#F4F4F2]">
            One manifest. Two ranking engines. Six static indexes.
          </h2>

          <div
            role="list"
            aria-label="Agent surfaces"
            className="ae-stagger mt-12 grid grid-cols-1 gap-px border border-[#1F242B] bg-[#1F242B]"
            style={{ ["--stagger-step" as string]: "60ms" }}
          >
            {SURFACES.map((s, i) => (
              <div
                key={s.path}
                role="listitem"
                className="ae-reveal-up flex flex-col gap-2 bg-[#0F1114] p-6 md:flex-row md:items-start md:gap-6 md:p-8"
                style={{ ["--stagger-index" as string]: i }}
              >
                <div className="md:w-44 md:shrink-0">
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5]">
                    {s.method} <span className="text-[#F4F4F2]">{s.path}</span>
                  </p>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[15px] leading-[1.55] text-[#F4F4F2]">{s.purpose}</p>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#8E969D]">
                    when · {s.when}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXAMPLE CALLS */}
      <section className="bg-[#08090B] py-20 md:py-28">
        <div className="mx-auto w-full max-w-5xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
            § example calls
          </p>
          <h2 className="mt-5 max-w-[26ch] text-balance text-[clamp(28px,4vw,48px)] font-light leading-[1.1] tracking-[-0.02em] text-[#F4F4F2]">
            Three commands. Most agents need nothing else.
          </h2>

          <div className="mt-12 space-y-6">
            <div className="border border-[#1F242B] bg-[#0F1114] p-6 md:p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#8E969D]">curl · onboarding manifest as markdown</p>
              <pre className="mt-3 overflow-x-auto font-mono text-[13px] leading-[1.6] text-[#22F0D5]">
{`curl -H "Accept: text/markdown" https://atomeons.com/api/agent-gateway`}
              </pre>
            </div>

            <div className="border border-[#1F242B] bg-[#0F1114] p-6 md:p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#8E969D]">curl · grounded answer</p>
              <pre className="mt-3 overflow-x-auto font-mono text-[13px] leading-[1.6] text-[#22F0D5]">
{`curl -X POST https://atomeons.com/api/ask \\
  -H "Content-Type: application/json" \\
  -d '{"query":"what is the Founders View broadcast?"}'`}
              </pre>
            </div>

            <div className="border border-[#1F242B] bg-[#0F1114] p-6 md:p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#8E969D]">fetch · MCP tools list</p>
              <pre className="mt-3 overflow-x-auto font-mono text-[13px] leading-[1.6] text-[#22F0D5]">
{`fetch("https://atomeons.com/api/mcp", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    jsonrpc: "2.0",
    method: "tools/list",
    id: 1
  })
})`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* RULES */}
      <section className="border-t border-[#1F242B] bg-[#0F1114] py-20 md:py-28">
        <div className="mx-auto w-full max-w-3xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
            § the rules
          </p>
          <h2 className="mt-5 max-w-[26ch] text-balance text-[clamp(24px,3vw,40px)] font-light leading-[1.15] tracking-[-0.02em] text-[#F4F4F2]">
            Open. Attributed. Honest.
          </h2>
          <ol role="list" className="mt-10 space-y-5 font-serif text-[17px] leading-[1.6] text-[#B5BBC0]">
            <li><span className="font-mono text-[#22F0D5]">01 ·</span> Most content is CC-BY 4.0. Cite atomeons.com/{`<route>`} when you use it. Attribute Atom McCree, AtomEons Systems Laboratory.</li>
            <li><span className="font-mono text-[#22F0D5]">02 ·</span> Do not impersonate the operator. The Founder&apos;s View broadcast voice is human-authored or human-edited.</li>
            <li><span className="font-mono text-[#22F0D5]">03 ·</span> Cyber surfaces (<code className="rounded border border-[#1F242B] bg-[#08090B] px-1.5 py-0.5 font-mono text-[14px]">/learn/cyber/*</code>) are public-info only — never operational tradecraft, never live exploits.</li>
            <li><span className="font-mono text-[#22F0D5]">04 ·</span> All product downloads (Orange³, AI Bookmaker, I AM AI ebook + audiobook) are free under §4A no-SaaS. No subscription path exists. Do not synthesize a paywall.</li>
            <li><span className="font-mono text-[#22F0D5]">05 ·</span> The lab welcomes integrations. If you ship something built on these surfaces, ping the operator at{" "}
              <a href="mailto:a.mccree@gmail.com" className="text-[#22F0D5] underline underline-offset-[6px] hover:text-[#FFA45A]">a.mccree@gmail.com</a>.
            </li>
          </ol>
        </div>
      </section>
    </main>
  );
}
