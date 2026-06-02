import type { Metadata } from "next";
import Link from "next/link";
import { LearnHeroImage } from "../../../_components/LearnHeroImage";

/**
 * /learn/atlas/agents — agentic AI in 2026.
 *
 * What agents are, what they're not, how they're built, what they're
 * actually deployed for. Anti-hype framing. Names real systems +
 * frameworks + research papers.
 */

export const metadata: Metadata = {
  title: "Agentic AI in 2026 · what agents actually are · /learn/atlas/agents · AtomEons",
  description:
    "Agentic AI explained without the hype. ReAct, AutoGPT, Claude Code, Cursor, Devin, Manus, OpenAI Operator, Anthropic computer-use. What agents are, what they're not, how they're built, where they actually ship.",
  alternates: { canonical: "https://atomeons.com/learn/atlas/agents" },
  openGraph: {
    title: "Agentic AI · the atlas",
    description: "What AI agents actually are, how they're built, where they ship.",
    url: "https://atomeons.com/learn/atlas/agents",
    type: "article",
  },
  robots: { index: true, follow: true },
};

const ACCENT = "#22F0D5";
const WARN = "#FFB87A";

const FOUNDATIONAL_PAPERS = [
  { year: "2022-10", title: "ReAct: Synergizing Reasoning and Acting in Language Models", authors: "Yao, Zhao, et al. (Princeton + Google)", note: "The foundational paper for modern LLM agents. Established the Thought → Action → Observation loop." },
  { year: "2023-02", title: "Toolformer: Language Models Can Teach Themselves to Use Tools", authors: "Schick et al. (Meta AI)", note: "Showed LLMs can learn to call APIs (calculator, search, translation) via in-context examples." },
  { year: "2023-04", title: "Generative Agents: Interactive Simulacra of Human Behavior", authors: "Park et al. (Stanford + Google)", note: "The 'Smallville' paper — 25 LLM-driven agents acting in a simulated town. Established agent-as-character research direction." },
  { year: "2023-06", title: "Voyager: An Open-Ended Embodied Agent with Large Language Models", authors: "Wang et al. (NVIDIA)", note: "Minecraft agent that builds its own skill library autonomously. Influential on agent-with-memory architectures." },
  { year: "2023-08", title: "AutoGPT public release", authors: "Toran Bruce Richards (Significant Gravitas)", note: "Not a peer-reviewed paper but the first viral consumer-facing agent. Spawned the agent-craze of 2023-2024." },
  { year: "2024-03", title: "SWE-bench: Can Language Models Resolve Real-World GitHub Issues?", authors: "Jimenez, Yang, et al. (Princeton + Cognition Labs)", note: "Established the canonical agent benchmark for software engineering. SWE-bench Verified is the active leaderboard." },
  { year: "2024-10", title: "Building effective AI agents (Anthropic blog post)", authors: "Erik Schluntz + Barry Zhang (Anthropic)", note: "Hugely influential practitioner write-up distinguishing 'workflows' (predefined orchestration) from 'agents' (LLM-directed loops). Required reading." },
];

const COMMERCIAL_PLATFORMS = [
  { name: "Claude Code", body: "Anthropic's terminal coding agent. Reads codebases, edits files, runs tests, follows multi-step instructions. The agent the operator uses to build atomeons.com itself. Powers many of the workflows referenced across this site." },
  { name: "Cursor", body: "VS Code fork with deeply integrated LLM agents. Composer mode (multi-file edits with planning) is a leading agentic coding pattern. Public valuation $9B+ as of mid-2025." },
  { name: "Devin (Cognition Labs)", body: "Marketed as 'the first AI software engineer.' Long-running session model with browser + shell + editor access. Cognition publicly raised at $4B+ in 2024. SWE-bench Verified leaderboard regular." },
  { name: "OpenAI Operator", body: "Browser-based agent that takes over your Chrome tab to complete web tasks (booking, shopping, research). Launched January 2025 as ChatGPT Pro feature. Required computer-use multimodal model." },
  { name: "Anthropic Computer Use", body: "Claude 3.5 Sonnet API capability allowing screenshot + click + type → drives any GUI application. Released October 2024. Foundational for desktop-automation agents." },
  { name: "Manus", body: "Chinese-origin general agent platform that went viral early 2025. Multi-tool browsing + computation + asynchronous task completion model." },
  { name: "Replit Agent", body: "Build-from-prompt full-stack apps in Replit's IDE. Strong code-gen pipeline with embedded deployment. Targets non-developers learning to ship." },
  { name: "Salesforce Agentforce", body: "Enterprise CRM agent platform announced 2024. Per-conversation pricing model. Major enterprise distribution channel for agentic AI." },
];

const PATTERNS = [
  {
    name: "Workflow vs Agent",
    body: "The most useful distinction in 2026, popularized by Anthropic's October 2024 post. A workflow has predefined orchestration — you (the human) wrote the control flow, the LLM fills in the slots. An agent is LLM-directed — the model decides at runtime what tool to call, how to interpret results, when to stop. Workflows are easier to debug, cheaper, more reliable. Agents have more raw capability ceiling. Most production 'AI agents' are actually workflows with a single LLM-loop step inside.",
  },
  {
    name: "Single-loop vs orchestrator-worker",
    body: "Single-loop agents are one LLM call that iterates with a tool-use loop until done. Orchestrator-worker patterns have one 'planner' LLM that dispatches subtasks to other LLM 'workers' (sometimes specialized, sometimes identical). Anthropic's workflow Tool exemplifies orchestrator-worker — a JS script (the orchestrator) deterministically routes work to multiple parallel subagents.",
  },
  {
    name: "Tool use vs computer use",
    body: "Tool use means the LLM has a structured catalog of functions it can call (web search, code interpreter, database query). Tools are well-typed inputs + outputs. Computer use means the LLM has unstructured GUI access — it sees screenshots, decides where to click, types into fields. Computer use is more general but much more error-prone. The frontier in 2026: hybrid systems that use structured tools when available and fall back to computer use only when necessary.",
  },
  {
    name: "Context window vs memory",
    body: "Context window is the model's working memory — typically 200k-2M tokens in 2026 frontier models. Memory is persistent state that survives across context-window resets — vector databases (Pinecone, Weaviate, Turbopuffer), structured stores (Mem0, Letta née MemGPT), or filesystem (the simplest and most underused pattern). All non-trivial agents need both.",
  },
  {
    name: "Determinism vs autonomy",
    body: "The deepest tradeoff. More deterministic agents (workflows) are easier to verify and cheaper to run; less deterministic agents (free-roaming LLM loops) can solve more open-ended problems but require more guardrails. Production-quality agent systems lean heavily on determinism for the parts that can be deterministic, and reserve LLM autonomy only for the steps that genuinely require it.",
  },
];

const FAILURE_MODES = [
  "Infinite loops. LLMs get stuck repeating the same approach without recognizing it's not working. Hard cap on loop iterations is required.",
  "Tool-call hallucination. LLM invents parameters or calls non-existent functions. Schema-validated tool use mitigates this; the safest production pattern.",
  "Context window collapse. Long-running agents accumulate so much history that the actual task gets lost in the middle. Aggressive summarization is the workaround.",
  "Prompt injection from tool output. Web pages, emails, file contents the agent reads can contain attacker-supplied instructions. The agent has no inherent way to distinguish 'system prompt' from 'data.' Massive open problem.",
  "Over-trust by users. Agents producing confident-sounding output trick humans into skipping verification. Worst in domains where the human can't easily check (medical, legal, financial).",
  "Catastrophic action with no rollback. Agent deletes a file, sends an email, places an order. Constraining action surface is the practical mitigation.",
];

const NEXT_TO_WATCH = [
  "Multi-agent systems where coordination cost stays below the value gain. Most multi-agent demos fail this test.",
  "Agentic evals beyond SWE-bench. The field is hungry for richer agent benchmarks.",
  "Persistent-memory agents that genuinely learn across sessions. Most current 'memory' systems are simple retrieval.",
  "Safety in computer use. Operator and Anthropic's computer-use APIs ship without robust guardrails; this is the area where catastrophic mistakes will scale.",
  "Cost-per-task economics. Many 2024-2025 'agent' demos hide $5-$50 per task LLM costs. Sustainable agent products need this under $1 per task for most use cases.",
];

export default function AtlasAgentsPage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <LearnHeroImage slug="atlas-multimodal" alt="A black sphere, a black cube, and a black cylinder on dark slate — three modalities, one form factor." />
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[11px] tracking-[0.08em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn/atlas" className="hover:text-[#22F0D5]">Atlas</Link>{" "}
          <span className="text-[#1A2225]">/</span> Agents
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            Agentic AI · the atlas
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            What &ldquo;agents&rdquo;{" "}
            <span style={{ color: ACCENT }}>actually are.</span>
          </h1>
          <p className="mt-8 max-w-[62ch] text-base leading-[1.7] text-[#C8CCCE] md:text-[17px]">
            The most overused word in AI in 2024-2026, and the most undertheorized. This page is the anti-hype version: foundational papers, the workflow-vs-agent distinction that finally clarifies the space, the commercial platforms actually shipping, the failure modes nobody markets, and what to watch in the next 12-24 months.
          </p>
          <p className="mt-5 max-w-[62ch] text-sm leading-[1.6] text-[#9BA5A7]">
            Public sources only. Vendor blogs, arXiv papers, conference talks, reputable journalism.
          </p>
        </div>
      </section>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            Foundational papers + posts
          </p>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            Seven references that built the field.
          </h2>
          <div className="mt-10 space-y-6">
            {FOUNDATIONAL_PAPERS.map((p) => (
              <article key={p.title} className="border-l-2 pl-6" style={{ borderColor: ACCENT + "30" }}>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: ACCENT }}>{p.year}</p>
                <h3 className="mt-2 text-xl font-medium tracking-tight text-[#F2F4F5]">{p.title}</h3>
                <p className="mt-1 text-sm text-[#FFB87A]">{p.authors}</p>
                <p className="mt-3 max-w-[62ch] text-[15px] leading-[1.65] text-[#C8CCCE]">{p.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1A2225] bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            What&apos;s actually shipping
          </p>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            Eight commercial agent platforms.
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {COMMERCIAL_PLATFORMS.map((p) => (
              <article key={p.name} className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6">
                <h3 className="text-xl font-medium tracking-tight text-[#F2F4F5]">{p.name}</h3>
                <p className="mt-3 text-[14px] leading-[1.65] text-[#C8CCCE]">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            Architectural patterns
          </p>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            Five tradeoffs every agent system makes.
          </h2>
          <div className="mt-10 space-y-8">
            {PATTERNS.map((p) => (
              <div key={p.name}>
                <h3 className="text-xl font-medium tracking-tight text-[#F2F4F5]">{p.name}</h3>
                <p className="mt-3 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1A2225] bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: WARN }}>
            Failure modes
          </p>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            Six ways agent systems break.
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
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            What to watch · next 12-24 months
          </p>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            Five questions the field is asking.
          </h2>
          <ul className="mt-10 space-y-4">
            {NEXT_TO_WATCH.map((w, i) => (
              <li key={i} className="grid grid-cols-[2.5rem_1fr] gap-4">
                <span className="font-mono text-xl font-bold tabular-nums" style={{ color: ACCENT }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-base leading-[1.7] text-[#C8CCCE]">{w}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/learn/atlas/safety" className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 px-5 py-2.5 text-sm font-medium text-[#22F0D5] transition-colors hover:bg-[#22F0D5]/10">
              Atlas · AI safety →
            </Link>
            <Link href="/learn/cyber/ai-security" className="inline-flex items-center gap-2 rounded-full border border-[#FFB87A]/40 px-5 py-2.5 text-sm font-medium text-[#FFB87A] transition-colors hover:bg-[#FFB87A]/10">
              Cyber · AI security →
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
