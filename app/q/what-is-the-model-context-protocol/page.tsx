import type { Metadata } from "next";
import { SpeakableJsonLd } from "@/app/_components/schema/SpeakableJsonLd";

const QUESTION = "What is the Model Context Protocol (MCP)?";
const SHORT_ANSWER =
  "The Model Context Protocol (MCP) is an open standard, released by Anthropic in November 2024, that lets AI applications connect to external data sources, tools, and prompts through a uniform JSON-RPC 2.0 interface. It is to AI assistants what the Language Server Protocol is to code editors: one client-server contract that replaces N-by-M custom integrations. MCP is supported natively by Claude Desktop, Claude Code, OpenAI's Agents SDK, Google's Gemini API, Microsoft Copilot Studio, and a growing public registry of servers.";
const CANONICAL = "https://atomeons.com/q/what-is-the-model-context-protocol";

export const metadata: Metadata = {
  title: QUESTION,
  description:
    "MCP is an open JSON-RPC 2.0 standard released by Anthropic in November 2024 for connecting AI models to tools, resources, and prompts. Supported by Claude, OpenAI, Gemini, and Microsoft Copilot.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: QUESTION,
    description: SHORT_ANSWER,
    url: CANONICAL,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: QUESTION,
    description: SHORT_ANSWER,
  },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: QUESTION,
      acceptedAnswer: {
        "@type": "Answer",
        text: SHORT_ANSWER,
      },
    },
  ],
};

const relatedQuestions: { q: string; href: string }[] = [
  { q: "What is JSON-RPC 2.0?", href: "/q/what-is-json-rpc-2" },
  {
    q: "What is the Language Server Protocol?",
    href: "/q/what-is-the-language-server-protocol",
  },
  { q: "What is tool poisoning in MCP?", href: "/q/what-is-mcp-tool-poisoning" },
  { q: "What is prompt injection?", href: "/q/what-is-prompt-injection" },
  {
    q: "How do AI agents call external tools?",
    href: "/learn/how-ai-agents-call-tools",
  },
];

const sources: { label: string; href: string }[] = [
  {
    label: "Anthropic — Introducing the Model Context Protocol (2024-11-25)",
    href: "https://www.anthropic.com/news/model-context-protocol",
  },
  {
    label: "MCP Specification (revision 2025-06-18)",
    href: "https://spec.modelcontextprotocol.io/specification/2025-06-18/",
  },
  {
    label: "Model Context Protocol — GitHub",
    href: "https://github.com/modelcontextprotocol",
  },
  {
    label: "NIST AI 100-2e2025 — Adversarial ML Taxonomy",
    href: "https://csrc.nist.gov/pubs/ai/100/2/e2025/final",
  },
  {
    label: "NVD — CVE-2025-49596 (MCP Inspector RCE)",
    href: "https://nvd.nist.gov/vuln/detail/CVE-2025-49596",
  },
  {
    label: "JFrog — Critical RCE in mcp-remote (CVE-2025-6514)",
    href: "https://jfrog.com/blog/2025-mcp-remote-rce-cve-2025-6514/",
  },
  {
    label: "Trail of Bits — Jumping the line: MCP server attacks",
    href: "https://blog.trailofbits.com/2025/04/21/jumping-the-line-how-mcp-servers-can-attack-you-before-you-ever-use-them/",
  },
  {
    label: "Microsoft — Securing MCP on Windows (Build 2025)",
    href: "https://blogs.windows.com/windowsdeveloper/2025/05/19/securing-the-model-context-protocol-building-a-safer-agentic-future-on-windows/",
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-neutral-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <SpeakableJsonLd
        url="https://atomeons.com/q/what"
        name="What is What?"
        description="Voice-readable short answer plus technical context."
        cssSelectors={[".speakable-answer"]}
      />
      <article className="mx-auto max-w-3xl px-6 py-16">
        <nav className="mb-8 text-xs uppercase tracking-widest text-neutral-500">
          <a href="/" className="hover:text-orange-400">
            atomeons
          </a>
          <span className="mx-2 text-neutral-700">/</span>
          <a href="/q" className="hover:text-orange-400">
            q
          </a>
          <span className="mx-2 text-neutral-700">/</span>
          <span className="text-neutral-400">model-context-protocol</span>
        </nav>

        <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
          {QUESTION}
        </h1>

        <section className="mt-10">
          <h2 className="text-sm font-medium uppercase tracking-widest text-orange-400">
            The short answer
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-neutral-100">
            {SHORT_ANSWER}
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-sm font-medium uppercase tracking-widest text-orange-400">
            The longer answer
          </h2>
          <div className="mt-4 space-y-5 text-base leading-relaxed text-neutral-300">
            <p>
              The Model Context Protocol was announced by Anthropic on November
              25, 2024, alongside an open specification, reference SDKs in
              Python and TypeScript, and a set of pre-built servers for Google
              Drive, Slack, GitHub, Postgres, and Puppeteer. The design problem
              MCP solves is the same one that produced the Language Server
              Protocol (LSP) in 2016: every editor used to need a custom
              integration for every language, which scales poorly. MCP applies
              the same logic to AI — every model used to need a custom
              integration for every tool. With MCP, a model or "host" speaks one
              protocol to many servers, and a server speaks one protocol to
              many models.
            </p>
            <p>
              Under the hood, MCP is JSON-RPC 2.0 over stdio, HTTP+SSE, or
              "Streamable HTTP" (added in the 2025-03-26 revision). The
              protocol defines three primitives a server can expose:{" "}
              <strong className="text-neutral-100">resources</strong>{" "}
              (read-only data the model can pull, addressed by URI),{" "}
              <strong className="text-neutral-100">tools</strong> (executable
              functions the model can call), and{" "}
              <strong className="text-neutral-100">prompts</strong>{" "}
              (parameterized templates the user can invoke). Clients negotiate
              capabilities during an <code>initialize</code> handshake, then
              exchange <code>tools/list</code>, <code>tools/call</code>,{" "}
              <code>resources/read</code>, and <code>prompts/get</code>{" "}
              requests. Sampling — letting a server ask the client to
              perform an LLM completion — is also part of the spec but
              adoption is limited.
            </p>
            <p>
              Adoption moved fast. OpenAI committed to MCP in its Agents SDK in
              March 2025. Google's Gemini API added MCP support, and Demis
              Hassabis publicly endorsed it. Microsoft shipped MCP integration
              in Copilot Studio (May 2025) and Windows 11 in May 2025. By late
              2025, the public registry at{" "}
              <code>github.com/modelcontextprotocol/servers</code> listed
              hundreds of community and reference servers, and the official MCP
              registry preview launched in September 2025.
            </p>
            <p>
              Security has been the contested dimension. Equixly disclosed
              (April 2025) that 43% of audited MCP server implementations had
              command-injection flaws. Trail of Bits documented "rug pull" and
              "tool poisoning" attack classes. CVE-2025-49596 (CVSS 9.4) hit
              Anthropic's own MCP Inspector via a no-auth default; CVE-2025-6514
              (CVSS 9.6) hit <code>mcp-remote</code> with 437,000+ npm
              downloads. The 2025-06-18 spec revision added OAuth 2.1
              authorization in response.
            </p>
            <p>
              For builders, the practical pattern is: write a server once in
              the Python or TypeScript SDK, declare your tools and resources,
              and any MCP-aware client — Claude Desktop, Cursor,
              Windsurf, Zed, Codeium, OpenAI Agents, Gemini, Copilot —
              can use it. The "N-by-M to N-plus-M" reduction is real. The 2026
              trajectory is toward signed servers, audited registries,
              capability-scoped tokens, and runtime sandboxing.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-sm font-medium uppercase tracking-widest text-orange-400">
            Key facts
          </h2>
          <ul className="mt-4 space-y-3 text-base leading-relaxed text-neutral-300">
            <li>
              MCP was open-sourced by Anthropic on{" "}
              <strong className="text-neutral-100">November 25, 2024</strong>,
              with Python/TypeScript SDKs and reference servers for Google
              Drive, Slack, GitHub, Git, Postgres, and Puppeteer (Anthropic
              announcement, 2024-11-25).
            </li>
            <li>
              The wire protocol is{" "}
              <strong className="text-neutral-100">JSON-RPC 2.0</strong>{" "}
              transported over stdio, HTTP+SSE, or Streamable HTTP (spec
              revision 2025-06-18).
            </li>
            <li>
              Three core server primitives:{" "}
              <strong className="text-neutral-100">
                resources, tools, prompts
              </strong>
              ; clients additionally expose <em>sampling</em> and <em>roots</em>{" "}
              (spec section "Server Features", 2025-06-18).
            </li>
            <li>
              <strong className="text-neutral-100">OpenAI</strong> committed to
              MCP in the Agents SDK on March 26, 2025; Google Gemini API added
              support April 2025.
            </li>
            <li>
              <strong className="text-neutral-100">
                Microsoft Copilot Studio
              </strong>{" "}
              announced GA MCP support on May 19, 2025 at Build 2025; Windows
              11 integration same week.
            </li>
            <li>
              <strong className="text-neutral-100">CVE-2025-49596</strong>{" "}
              (CVSS 9.4) — RCE in Anthropic's MCP Inspector via browser
              CSRF on no-auth default config (NVD, 2025-07-01).
            </li>
            <li>
              <strong className="text-neutral-100">CVE-2025-6514</strong> (CVSS
              9.6) — OS command injection in <code>mcp-remote</code>{" "}
              versions 0.0.5–0.1.15, 437,000+ weekly npm downloads
              (JFrog, 2025-07-09).
            </li>
            <li>
              Equixly's April 2025 audit found command-injection
              vulnerabilities in approximately{" "}
              <strong className="text-neutral-100">43%</strong> of sampled MCP
              servers.
            </li>
            <li>
              The official{" "}
              <strong className="text-neutral-100">MCP registry preview</strong>{" "}
              launched at <code>registry.modelcontextprotocol.io</code> in
              September 2025.
            </li>
            <li>
              The{" "}
              <strong className="text-neutral-100">2025-06-18 revision</strong>{" "}
              introduced OAuth 2.1 resource-server authorization, replacing the
              looser auth posture of the 2024-11-05 draft.
            </li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-sm font-medium uppercase tracking-widest text-orange-400">
            Related questions
          </h2>
          <ul className="mt-4 space-y-2 text-base text-neutral-300">
            {relatedQuestions.map((r) => (
              <li key={r.href}>
                <a
                  href={r.href}
                  className="text-neutral-100 underline decoration-neutral-700 underline-offset-4 hover:decoration-orange-400 hover:text-orange-300"
                >
                  {r.q}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-sm font-medium uppercase tracking-widest text-orange-400">
            Sources
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-neutral-400">
            {sources.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  rel="noopener noreferrer nofollow"
                  target="_blank"
                  className="underline decoration-neutral-800 underline-offset-4 hover:text-neutral-200 hover:decoration-orange-400"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <footer className="mt-16 border-t border-neutral-900 pt-6 text-xs text-neutral-600">
          Published by{" "}
          <a href="/" className="hover:text-orange-400">
            AtomEons
          </a>{" "}
          · AI-search index ·{" "}
          <a href={CANONICAL} className="hover:text-orange-400">
            canonical
          </a>
        </footer>
      </article>
    </main>
  );
}