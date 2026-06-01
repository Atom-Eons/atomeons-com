import type { Metadata } from "next";
import Link from "next/link";

const PAGES = [
  {
    "slug": "math-prerequisites",
    "title": "Mathematical Foundations for AI Research",
    "subtitle": "Linear algebra, probability, calculus, and optimization — the load-bearing math under every frontier paper"
  },
  {
    "slug": "foundational-ml",
    "title": "Foundational Machine Learning",
    "subtitle": "Supervised, unsupervised, and reinforcement learning fundamentals — the canon you need before deep learning"
  },
  {
    "slug": "deep-learning-fundamentals",
    "title": "Deep Learning Fundamentals",
    "subtitle": "From the perceptron to ResNets — the canon before transformers"
  },
  {
    "slug": "transformers-from-scratch",
    "title": "Transformers from Scratch",
    "subtitle": "Attention, the architecture, and the implementation that underlies every frontier model"
  },
  {
    "slug": "training-dynamics",
    "title": "Training Dynamics and Scaling",
    "subtitle": "Scaling laws, optimizers, mixed precision, gradient accumulation, and the practical art of training large models"
  },
  {
    "slug": "rlhf-and-alignment",
    "title": "RLHF and Alignment",
    "subtitle": "From InstructGPT to Constitutional AI — how raw language models become helpful, harmless, and honest assistants"
  },
  {
    "slug": "mechanistic-interpretability",
    "title": "Mechanistic Interpretability",
    "subtitle": "Reverse-engineering neural networks — circuits, features, and the path to understanding what models actually do"
  },
  {
    "slug": "multimodal-models",
    "title": "Multimodal Models",
    "subtitle": "Vision-language models, audio, video, and the architectures that bridge modalities"
  },
  {
    "slug": "agents-and-tool-use",
    "title": "Agents and Tool Use",
    "subtitle": "ReAct, Toolformer, MCP, and the architectures of language models that act in the world"
  },
  {
    "slug": "ai-safety-technical",
    "title": "AI Safety (Technical)",
    "subtitle": "From Concrete Problems to mesa-optimization and alignment faking — the technical research agenda for making AI go well"
  },
  {
    "slug": "capability-evaluation",
    "title": "Capability Evaluation",
    "subtitle": "Benchmarks, evals, and the science of measuring what frontier models can actually do"
  },
  {
    "slug": "frontier-research-patterns",
    "title": "Frontier Research Patterns",
    "subtitle": "Reading papers, replicating results, and developing the meta-skills of an AI researcher"
  }
] as const;

export const metadata: Metadata = {
  title: "Deep · self-directed AI doctorate path · /learn · AtomEons",
  description: `${PAGES.length} doctorate-grade deep-dive pages. Math prerequisites, foundational ML, transformers from scratch, RLHF & alignment, mechanistic interpretability, multimodal models, agents, AI safety, capability evals, frontier research patterns. CC-BY 4.0.`,
  alternates: { canonical: "https://atomeons.com/learn/deep" },
};

export default function DeepIndex() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span> Deep
        </p>
      </div>
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::doctorate-grade · self-directed · {PAGES.length} deep-dives
          </p>
          <h1 className="mt-6 text-balance text-5xl font-medium leading-[0.98] tracking-[-0.025em] md:text-7xl">
            A way to keep{" "}
            <span className="text-[#22F0D5]">learning more here.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-[1.65] text-[#C8CCCE] md:text-lg">
            A self-directed PhD-grade AI track that lives on this site
            forever. Real papers. Real textbooks. Real exercises with
            observable milestones. Free.
          </p>
        </div>
      </section>
      <section className="border-b border-[#1A2225] bg-[#0e2520]/20">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 space-y-3">
          {PAGES.map((p, i) => (
            <Link key={p.slug} href={`/learn/deep/${p.slug}`} className="group block rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 transition-colors hover:border-[#22F0D5]/40">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">::deep {String(i + 1).padStart(2, "0")}</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#F2F4F5] group-hover:text-[#22F0D5] md:text-3xl">{p.title}</h2>
              <p className="mt-2 text-base text-[#9BA5A7]">{p.subtitle}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <Link href="/learn" className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] hover:text-[#F2F4F5]">← back to /learn</Link>
        </div>
      </section>
    </main>
  );
}
