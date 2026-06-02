import type { Metadata } from "next";
import Link from "next/link";
import { LearnHeroImage } from "../../../_components/LearnHeroImage";

/**
 * /learn/atlas/reasoning — the o1 / R1 paradigm.
 *
 * Inference-time scaling, chain-of-thought, the test-time-compute era.
 * How o1, o3, DeepSeek-R1, Gemini Thinking, Claude Sonnet 4 Extended
 * Thinking work + what they're for.
 */

export const metadata: Metadata = {
  title: "Reasoning models · the o1/R1 paradigm · /learn/atlas/reasoning · AtomEons",
  description:
    "OpenAI o1/o3, DeepSeek-R1, Gemini Thinking, Claude Extended Thinking. How inference-time-compute scaling works, what 'reasoning' actually means here, when to use these models and when not to.",
  alternates: { canonical: "https://atomeons.com/learn/atlas/reasoning" },
  openGraph: {
    title: "Reasoning models · the atlas",
    description: "The o1/R1 paradigm. Inference-time scaling. How chain-of-thought training works.",
    url: "https://atomeons.com/learn/atlas/reasoning",
    type: "article",
  },
  robots: { index: true, follow: true },
};

const ACCENT = "#22F0D5";

const HISTORY = [
  {
    date: "2022-01",
    name: "Chain-of-thought prompting (Wei et al.)",
    body: "Showed that prompting LLMs with 'let's think step by step' substantially improves arithmetic + commonsense + symbolic reasoning. Established that the underlying capability was there in pretrained models — they just had to be coaxed to use it. Set the stage for everything that followed.",
  },
  {
    date: "2022-03",
    name: "Self-consistency (Wang et al.)",
    body: "Run chain-of-thought K times, take the most-frequent answer. Robust improvement over single-shot CoT. Introduced the 'sample many, aggregate' inference-time pattern that o1 would later industrialize.",
  },
  {
    date: "2023-05",
    name: "Tree-of-Thoughts (Yao et al.)",
    body: "Don't just sample many linear chains — search a tree of possible reasoning paths, backtrack from dead ends. Conceptual ancestor of o1's hidden reasoning trees.",
  },
  {
    date: "2024-09",
    name: "OpenAI o1 (preview + then GA)",
    body: "First publicly available production reasoning model. Spends significantly more compute at inference time generating long internal chains of thought before producing a final answer. AIME, GPQA, Codeforces scores jump substantially over GPT-4o. Reasoning chain is hidden from the user (OpenAI cites safety + competitive reasons).",
  },
  {
    date: "2024-12",
    name: "OpenAI o3 (preview)",
    body: "Follow-up to o1 with substantially better scores on hard benchmarks. ARC-AGI-1 87% (vs ~25% for GPT-4o). FrontierMath benchmark 25% (vs ~2% for previous models). Demonstrated that inference-time-compute scaling is a power-law axis like training compute.",
  },
  {
    date: "2025-01",
    name: "DeepSeek-R1",
    body: "Open-weights Chinese reasoning model that matched o1 performance on multiple public benchmarks. Critically: released the technical report describing the training method (R1-Zero pure-RL, then distillation), opening the recipe to the broader research community. Spawned a wave of open-weight reasoning models.",
  },
  {
    date: "2025-02",
    name: "Gemini 2.0 Flash Thinking + Gemini 2.5 Thinking",
    body: "Google's reasoning-mode variants. Like o1, generates internal chains of thought; unlike o1, reasoning traces are visible to the user. Strong on math + science benchmarks. Pairs with Google's substantial multimodal + long-context advantage.",
  },
  {
    date: "2025-05",
    name: "Claude Opus 4 + Sonnet 4 (Extended Thinking)",
    body: "Anthropic's reasoning-mode variants. User can choose 'extended thinking' on a per-query basis. Reasoning traces visible, similar to Gemini. Strong on coding + agentic benchmarks. The 'reasoning mode is a toggle, not a separate model' productization choice.",
  },
];

const HOW = [
  {
    name: "Long chain-of-thought generation",
    body: "The model generates much longer internal reasoning before producing a final answer — sometimes thousands of tokens of working-out for a single response. The reasoning resembles a person scratching out solutions, considering alternatives, backtracking, re-checking.",
  },
  {
    name: "RL on outcome rewards (DeepSeek-R1-Zero pattern)",
    body: "Reinforcement learning where the reward signal is the correctness of the final answer (not process — just outcome). Surprisingly, the model spontaneously learns to use longer chains of thought because doing so improves correctness. Demonstrated openly by DeepSeek R1-Zero before R1's full pipeline.",
  },
  {
    name: "Distillation from larger reasoning models",
    body: "Once you have a powerful reasoning model, you can generate training data for smaller models by having the big model solve problems and using its reasoning traces as training signal. DeepSeek R1 distilled into smaller models (1.5B, 7B, 32B Llama-based variants) achieved strong reasoning at much smaller scale.",
  },
  {
    name: "Process-reward models",
    body: "Optional addition: train a separate reward model that scores intermediate reasoning steps (not just final answers). Used by some labs to guide the chain-of-thought search. Process rewards are harder to define + train than outcome rewards but can produce more legible reasoning.",
  },
  {
    name: "Sampling + best-of-K + tree search at inference",
    body: "Most reasoning models support an option to sample N candidate reasoning chains and pick the best (by self-consistency, by reward model, by verifier). This is what makes inference-time-compute a power-law-scalable axis: spend more compute → see better answers.",
  },
];

const WHEN = [
  { what: "Use a reasoning model for", body: "Hard math problems (AIME-level and up). Competitive-programming problems. Multi-step logical proofs. Complex code synthesis where correctness matters more than speed. Scientific reasoning (GPQA-level). ARC-AGI-style abstract puzzles." },
  { what: "Don't use a reasoning model for", body: "Quick chat. Summarization. Translation. Style transfer. Most retrieval-augmented generation (the reasoning is wasted if the answer is already in the context). Real-time conversational use cases where latency matters." },
  { what: "Cost tradeoff", body: "Reasoning models use 5-20× more tokens per query than their non-reasoning siblings. If you're paying per token, expect bills to be 5-20× higher. If you're paying flat-rate (ChatGPT Plus, Claude Pro), you get rate-limited differently." },
  { what: "Latency tradeoff", body: "First-token latency on reasoning models is much longer — sometimes 10-60 seconds for hard queries vs sub-second for direct models. UX considerations matter: build for the wait." },
  { what: "What they don't fix", body: "Reasoning models hallucinate just as much as non-reasoning models when the answer requires factual recall they don't have. Reasoning is procedural improvement, not knowledge improvement. RAG still required for factual grounding." },
];

export default function AtlasReasoningPage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <LearnHeroImage slug="atlas-mech-interp" alt="Macro of an open mechanical watch movement showing gears and jewels — interpretability is looking inside." />
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[11px] tracking-[0.08em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn/atlas" className="hover:text-[#22F0D5]">Atlas</Link>{" "}
          <span className="text-[#1A2225]">/</span> Reasoning
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            Reasoning models · the atlas
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            The o1/R1 paradigm.{" "}
            <span style={{ color: ACCENT }}>What changed.</span>
          </h1>
          <p className="mt-8 max-w-[62ch] text-base leading-[1.7] text-[#C8CCCE] md:text-[17px]">
            September 2024 OpenAI shipped o1. The field has been catching up + diversifying since. This page is the honest walk: how reasoning models actually work, what they&apos;re for, what they don&apos;t fix, and which one to reach for when you have a hard problem.
          </p>
        </div>
      </section>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            History · how we got here
          </p>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            Eight milestones.
          </h2>
          <div className="mt-10 space-y-8">
            {HISTORY.map((h) => (
              <article key={h.name} className="border-l-2 pl-6" style={{ borderColor: ACCENT + "30" }}>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: ACCENT }}>{h.date}</p>
                <h3 className="mt-2 text-xl font-medium tracking-tight text-[#F2F4F5]">{h.name}</h3>
                <p className="mt-3 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">{h.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1A2225] bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            How they actually work
          </p>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            Five mechanisms.
          </h2>
          <div className="mt-10 space-y-8">
            {HOW.map((h) => (
              <article key={h.name}>
                <h3 className="text-xl font-medium tracking-tight text-[#F2F4F5]">{h.name}</h3>
                <p className="mt-3 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">{h.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            When to reach for one
          </p>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            Five honest tradeoffs.
          </h2>
          <div className="mt-10 space-y-8">
            {WHEN.map((w) => (
              <article key={w.what}>
                <h3 className="text-lg font-medium tracking-tight text-[#22F0D5]">{w.what}</h3>
                <p className="mt-3 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">{w.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/learn/atlas/scaling-laws" className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 px-5 py-2.5 text-sm font-medium text-[#22F0D5] transition-colors hover:bg-[#22F0D5]/10">
              Scaling laws · the second axis →
            </Link>
            <Link href="/learn/atlas/benchmarks" className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] px-5 py-2.5 text-sm text-[#C8CCCE] transition-colors hover:border-[#22F0D5]/40 hover:text-[#22F0D5]">
              How they get measured →
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
