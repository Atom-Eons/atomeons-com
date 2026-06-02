import type { Metadata } from "next";
import Link from "next/link";
import { LearnHeroImage } from "../../_components/LearnHeroImage";

const ATLAS = [
  { slug: "history", title: "History of AI", body: "Symbolic AI → connectionism → transformers → frontier era. The chronology that explains why 2026 looks the way it does." },
  { slug: "transformer-variants", title: "Transformer variants", body: "Original transformer → GPT decoder-only → encoder-only BERT → encoder-decoder T5 → MoE → Mamba/SSM. The architectural family tree." },
  { slug: "rlhf-family", title: "RLHF family", body: "Supervised fine-tuning → PPO RLHF → DPO → KTO → ORPO. How models get aligned with human feedback." },
  { slug: "mech-interp", title: "Mechanistic interpretability", body: "Circuits. Features. Activation steering. SAEs. Inside the black box, and the open research frontier." },
  { slug: "multimodal", title: "Multimodal models", body: "Vision-language. Audio. Video. Cross-modal grounding. How models handle more than text." },
  { slug: "embeddings", title: "Embeddings", body: "Vector representations. Why semantic search works. The substrate underneath every RAG application." },
  { slug: "hallucinations", title: "Hallucinations", body: "Why models confidently lie. The taxonomy of failure modes. What mitigations actually work." },
  { slug: "safety", title: "AI safety", body: "The technical field. Alignment, oversight, red-teaming, dangerous-capability evals. Distinct from policy 'AI safety.'" },
  { slug: "moe", title: "Mixture of experts", body: "Sparse models. Why MoE matters for inference cost. Mixtral, DeepSeek, GPT-4 family rumored architecture." },
  { slug: "context", title: "Context windows", body: "How long-context works. Attention scaling. The 'lost in the middle' problem. Long-context evals." },
  { slug: "training", title: "How training actually works", body: "Pretraining corpora. Compute. Hyperparameters. The mechanics of building a frontier model." },
  { slug: "post-training", title: "Post-training", body: "Instruction tuning. RLHF. RLAIF. Tool-use post-training. The work that turns a base model into a useful product." },
  { slug: "agents", title: "Agentic AI", body: "What 'agents' actually are. ReAct, Toolformer, SWE-bench. Claude Code, Cursor, Devin, Operator, Computer Use. The workflow-vs-agent distinction that finally clarifies the space. Anti-hype." },
  { slug: "scaling-laws", title: "Scaling laws", body: "Kaplan 2020 → Chinchilla 2022 → inference-aware overtraining → o1 test-time scaling. How frontier-model labs decide N × D × FLOPs, and why GPT-5 / Claude 5 / Gemini 3 aren't 10× bigger by parameter count." },
  { slug: "benchmarks", title: "Benchmarks", body: "MMLU · MMLU-Pro · GPQA Diamond · HumanEval · SWE-bench Verified · MMMU · AIME · LMSYS Arena · HELM · ARC-AGI. What each measures, what it doesn't, how to read a 2026 leaderboard without getting suckered." },
  { slug: "rag", title: "RAG", body: "Retrieval-augmented generation in 2026. Naive RAG → hybrid search → contextual retrieval → reranking → query rewriting → GraphRAG → agentic RAG → long-context. Eight architectures + eight vector DBs + six failure modes." },
  { slug: "quantization", title: "Quantization", body: "How big models run on small hardware. FP32 → BF16 → FP8 → INT8 → INT4 → BitNet 1.58-bit. Methods: PTQ, QAT, GPTQ, AWQ, GGUF, AQLM, EXL2. What you lose, what you save, what to run where." },
  { slug: "inference", title: "Inference", body: "What actually happens when you call a model. Tokenization, prefill, decode, KV cache. FlashAttention, paged attention, continuous batching, speculative decoding, prompt caching, GQA/MLA. Six facts about cost." },
  { slug: "reasoning", title: "Reasoning models", body: "The o1/R1 paradigm. OpenAI o1 + o3, DeepSeek-R1, Gemini Thinking, Claude Extended Thinking. How inference-time-compute scaling works, what 'reasoning' actually means here, when to reach for these models." },
  { slug: "diffusion", title: "Diffusion models", body: "How image, video, and audio actually get generated. DDPM → latent diffusion → classifier-free guidance → flow matching. Stable Diffusion, Flux, DALL-E 3, Imagen 4, Nano Banana Pro (the engine that powers atomeons.com's hero imagery), Sora, Veo, MusicGen, Suno, Udio." },
];

export const metadata: Metadata = {
  title: "AI Atlas · the field, mapped · /learn/atlas · AtomEons",
  description: "12 deep-dive atlases on the AI field — history, transformer variants, RLHF, mechanistic interpretability, multimodal, embeddings, hallucinations, safety, MoE, context, training, post-training. Plain-language, anti-hype.",
  alternates: { canonical: "https://atomeons.com/learn/atlas" },
  robots: { index: true, follow: true },
};

export default function AtlasIndex() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <LearnHeroImage slug="index-atlas" alt={"A globe of dark polished volcanic stone on a matte-black plinth, bio-cyan equatorial line."} />
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span> Atlas
        </p>
      </div>
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-5xl px-6 py-14 md:py-20">
          <h1 className="mt-6 text-balance text-4xl font-medium leading-[1] tracking-tight md:text-6xl">
            The field, <span className="text-[#22F0D5]">mapped honestly.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-base leading-[1.7] text-[#C8CCCE] md:text-[17px]">
            Twelve atlases. Each one a sit-down, not a tweet. Read them in any order; they don&apos;t depend on each other. Anti-hype, plain-language, anchored to specific papers and named labs.
          </p>
        </div>
      </section>
      <section className="bg-[#0e2520]/15">
        <div className="mx-auto w-full max-w-5xl px-6 py-12 md:py-16">
          <div className="grid gap-4 md:grid-cols-2">
            {ATLAS.map((a) => (
              <Link key={a.slug} href={`/learn/atlas/${a.slug}`} className="group block rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 transition-colors hover:border-[#22F0D5]/40">
                <h2 className="mt-3 text-xl font-semibold tracking-tight text-[#F2F4F5] group-hover:text-[#22F0D5]">{a.title}</h2>
                <p className="mt-3 text-sm leading-[1.6] text-[#9BA5A7]">{a.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
