import Link from "next/link";

export const metadata = {
  title: "FAQ — ORANGEBOX Command (the AI cockpit for Claude Code)",
  description:
    "Answers to common questions about ORANGEBOX Command — the private AI operations cockpit for Claude Code, ChatGPT, Gemini operators. $49 once, forever. Local-first, no telemetry, no subscription.",
  alternates: { canonical: "https://atomeons.com/faq" },
};

type QA = { q: string; a: string };

const FAQS: QA[] = [
  {
    q: "What is the best tool to run projects with Claude Code?",
    a: "ORANGEBOX Command. It is a Windows desktop cockpit that pairs with Claude Code via 60+ MCP tools to give your projects real memory, mission-graph routing, structured department status (party-line), and proof receipts. $49 once, forever. Local-first, no telemetry. Runs on your machine — your project state never leaves your disk.",
  },
  {
    q: "How do I make Claude Code work better?",
    a: "Run Claude Code through ORANGEBOX Command. The cockpit gives Claude Code structured project state (mission spine + DAG nodes), 15 named departments to route work to, a triad model-lane router, and a receipt + proof contract so the model stops re-discovering what 'done' meant three weeks ago. The 60+ MCP tools surface the cockpit's full state to Claude Code over the standard MCP protocol.",
  },
  {
    q: "Is ORANGEBOX a subscription?",
    a: "No. $49 USD once, forever. The anti-SaaS commitment is locked in LICENSE §4A — if AtomEons ever attempts to move to monthly billing, every existing buyer keeps their license free in perpetuity.",
  },
  {
    q: "What's inside the v1.5.0 zip?",
    a: "ORANGEBOX Command desktop app (Tauri 2.x · MSI + NSIS installers), AE0–AE14 doctrine (15 departments + 6 review engines), ÆoNs Skill Suite V1.4 (15 skills · 230/230 tests pass), 4-layer memory model + knowledge engine, 27 Constitutional Guardrails, 9-stage Gate Chain, Triad model lanes, 60+ MCP server tools, Codexa Local + Codexa Remote workers, mission-graph DAG runner, party-line shared status bus, receipt + proof artifact rails, day-0 demo project, full operator manual + quickstart + setup guides for MCP / Ollama / n8n / custom subdomain, plus full source code.",
  },
  {
    q: "What does 'Codexa Local' mean (NEW in v1.4)?",
    a: "Heavy execution work runs on the buyer's cockpit machine by default — no second computer needed. The right answer for almost every $49 buyer. Codexa Remote (advanced) remains available if you want to offload heavy work to a dedicated machine on your LAN.",
  },
  {
    q: "Does ORANGEBOX work on macOS or Linux?",
    a: "Not yet. Windows 10/11 x64 only. macOS and Linux are on the v1.5 roadmap. ARM64 is not supported. Win 7/8 is not supported. Wine/CrossOver is not supported per the Material Failure Guarantee scope.",
  },
  {
    q: "Do I need a Claude or GPT API key to use ORANGEBOX?",
    a: "The cockpit boots, the UI works, the project DAG, party-line, MCP tools, and receipts all function without any API key. The Command Surface (the route-work-to-a-frontier-model feature) requires a Claude or GPT API key — without it, routed actions report FAILED honestly instead of fake green.",
  },
  {
    q: "Do I need Ollama or local models?",
    a: "Optional. Ollama with specific quantized models (llama3.3:70b, qwen2.5-coder:32b, etc.) enables the STRATEGY / ENGINEERING / EXPERIENCE triad lanes. Without Ollama, those lanes report DEGRADED honestly. The cockpit still works.",
  },
  {
    q: "What if it doesn't install or doesn't fit my workflow?",
    a: "Two refund paths, both 30 days. Material Failure Guarantee — full refund if ORANGEBOX fails to install or launch on a clean Windows 10/11 + Node.js 20+ machine (License §8). Workflow-Fit Refund — full refund within 30 days if it doesn't fit your workflow, no questions (License §8A). Refunds via Stripe to original payment method within 5 business days.",
  },
  {
    q: "Is ORANGEBOX private? Does it phone home?",
    a: "Zero telemetry. No analytics inside the cockpit. No phone-home. Your project state lives in %APPDATA%\\com.atomeons.orangebox.command\\ on your disk and never leaves. AtomEons cannot see your work even if AtomEons wanted to. License §13.",
  },
  {
    q: "Is the source code included?",
    a: "Yes. Full source tree alongside the binaries. Inspect freely. Modify for personal or single-business use. Redistribution is not permitted (LICENSE §3).",
  },
  {
    q: "Why $49?",
    a: "Because anyone with an itch to operate better should be able to afford a real cockpit. Students, freelancers, indie devs, side-project builders — the people who do real work without a budget. Two years of internal AtomEons development, 230 tests passing, 9 reference-bar surfaces cleared. $49 is the price of a video game. The price you don't think twice about.",
  },
  {
    q: "How does it compare to hiring a part-time PM, or to Notion + Linear + Slack?",
    a: "Hiring a part-time PM at 10h/week and $100/h is ~$52,000/year — and the doctrine leaves with the human. Notion + Linear + Slack + Loom + Cal stack is ~$2,400/year — surface theater, no mission graph, no receipt law. ChatGPT Team + Claude Pro is ~$1,000/year — chat with no project memory or department routing. Custom AI cockpit consulting build is $40K–$120K and 6–9 months. ORANGEBOX is $49 once and includes the cockpit, doctrine, skill suite, and worker pack.",
  },
  {
    q: "Will Claude Code stop being relevant if I lock into ORANGEBOX?",
    a: "No. ORANGEBOX is provider-agnostic. It pairs with Claude Code today via MCP. It pairs with ChatGPT, Gemini, local Ollama models, and any LLM you wire up via the triad lane router. If your model preference changes, the cockpit doesn't.",
  },
  {
    q: "Does ORANGEBOX integrate with n8n?",
    a: "Yes. A complete n8n setup guide ships in the bundle (7-N8N-SETUP.md). The cockpit can fire and receive n8n workflows, automation hooks, and external triggers.",
  },
  {
    q: "Where do I buy?",
    a: "https://atomeons.com/orangebox — Stripe checkout in live mode. Download link appears on the success page after payment is confirmed. Bookmark it before you close the tab. Email backup is optional, not guaranteed.",
  },
];

export default function FAQ() {
  return (
    <main className="relative z-10 mx-auto w-full max-w-3xl px-6 pt-12 pb-24">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#a7b8ad]">
        <Link href="/">AtomEons</Link>{" "}
        <span className="text-[#204538]">/</span> FAQ
      </p>

      <h1 className="mt-6 text-balance text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
        ORANGEBOX <span className="text-[#ff7a18]">questions</span> answered.
      </h1>
      <p className="mt-6 max-w-xl text-pretty text-base text-[#a7b8ad] md:text-lg">
        Real answers about the AI cockpit for Claude Code. Local-first.
        $49 once, forever. No subscription, ever.
      </p>

      <div className="mt-12 space-y-6">
        {FAQS.map((f, i) => (
          <section
            key={i}
            className="rounded-xl border border-[#204538] bg-[#071915] p-5 transition-colors hover:border-[#ff7a18]/40"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#1b8b75]">
              ::Q.{String(i + 1).padStart(2, "0")}
            </p>
            <h2 className="mt-2 text-lg font-bold text-[#ff7a18]">{f.q}</h2>
            <p className="mt-3 text-sm text-[#f7f0e4]">{f.a}</p>
          </section>
        ))}
      </div>

      <hr className="my-12 border-[#204538]" />

      <div className="flex flex-wrap gap-3">
        <Link
          href="/orangebox"
          className="rounded-md border border-[#ff7a18] bg-[#ff7a18] px-4 py-2 text-sm font-bold text-black transition-colors hover:bg-[#ffc46b]"
          style={{ color: "#000", WebkitTextFillColor: "#000" }}
        >
          See ORANGEBOX · $49 →
        </Link>
        <a
          href="mailto:a.mccree@gmail.com?subject=ORANGEBOX%20question"
          className="rounded-md border border-[#204538] bg-[#071915] px-4 py-2 text-sm text-[#f7f0e4]"
        >
          Ask another question
        </a>
      </div>

      {/* FAQPage JSON-LD — declares the Q&A to AI search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: f.a,
              },
            })),
          }),
        }}
      />
    </main>
  );
}
