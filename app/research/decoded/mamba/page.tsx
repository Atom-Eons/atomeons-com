import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mamba — Linear-Time Sequence Modeling with Selective State Spaces · Research / Decoded · AtomEons",
  description: "A neural network architecture called Mamba processes long sequences of text in time that grows linearly with the length, rather than quadratically like transformers, while matching their accuracy on many benchmarks — making it the most credible structural challenger to the transformer in years.",
  alternates: { canonical: "https://atomeons.com/research/decoded/mamba" },
  openGraph: {
    title: "Mamba — Linear-Time Sequence Modeling with Selective State Spaces",
    description: "A neural network architecture called Mamba processes long sequences of text in time that grows linearly with the length, rather than quadratically like transformers, while matching their accuracy on many benchmarks — making it the most credible structural challenger to the transformer in years.",
    url: "https://atomeons.com/research/decoded/mamba",
    type: "article",
  },
  robots: { index: true, follow: true },
};

const ACCENT = "#22F0D5";

export default function Page() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[11px] tracking-[0.08em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/research/decoded" className="hover:text-[#22F0D5]">Research / Decoded</Link>{" "}
          <span className="text-[#1A2225]">/</span> {`Mamba — Linear-Time Sequence Modeling with Selective State Spaces`}
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9BA5A7]">
            {`Albert Gu (Carnegie Mellon) and Tri Dao (Princeton), December 2023 · arXiv:2312.00752`}
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            {`Mamba — Linear-Time Sequence Modeling with Selective State Spaces`}
          </h1>
          <p className="mt-8 max-w-[62ch] text-[17px] leading-[1.65] text-[#C8CCCE]">
            {`A neural network architecture called Mamba processes long sequences of text in time that grows linearly with the length, rather than quadratically like transformers, while matching their accuracy on many benchmarks — making it the most credible structural challenger to the transformer in years.`}
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24 space-y-12">
          <article key={0}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`01`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`2. What the scientists actually did`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`The authors built on a line of work called **structured state space models** (S4, H3, etc.) that had been showing promise on long-sequence benchmarks but had a fatal weakness: they were *time-invariant*. They processed every token with the same recipe, which made them bad at things transformers were good at, like noticing that the word "it" refers to a specific earlier noun.

Mamba's core contribution is making the state space model **selective** — letting the recipe change based on the input token. Concretely:

- The parameters that control how the model updates its internal "running summary" become **functions of the current input**, not fixed numbers. The model can decide, on the fly, what to remember and what to forget.
- This selectivity broke the previous fast-computation tricks used for S4. The authors invented a new **hardware-aware parallel scan** algorithm that keeps the model fast on modern GPUs by carefully managing what data sits in fast on-chip memory (SRAM) versus slow off-chip memory (HBM).
- They simplified the overall block structure. Mamba interleaves selective SSM layers with standard gating and normalization, in a single homogeneous block — no separate "attention" and "MLP" layers like transformers have.

They then trained Mamba models from 130 million up to 2.8 billion parameters and compared them against same-size transformers (specifically GPT-Neo and Pythia) on language modeling, DNA sequences, and audio. At those sizes, Mamba matched or exceeded transformer perplexity while running roughly five times faster at inference on long contexts.`}
            </div>
          </article>

          <article key={1}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`02`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`3. What scientists know but rarely say`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`- **The benchmarks were on small models.** The largest Mamba in the paper is 2.8B parameters. The frontier in 2026 is hundreds of billions. Scaling laws for selective SSMs are not yet as well-understood as for transformers, and follow-up work has found that pure Mamba can underperform transformers on tasks requiring precise long-range copy or recall of specific facts buried deep in context.
- **The "linear vs quadratic" framing oversells.** Yes, Mamba is linear in sequence length. But transformers have been getting better at long context via tricks like FlashAttention, sliding windows, and grouped-query attention. The practical gap on most workloads is narrower than the headline number suggests.
- **Selective SSMs and attention may be doing similar work.** A growing body of theoretical research (e.g. mechanistic interpretability papers in 2024-2025) argues that Mamba's selectivity is mathematically a constrained form of attention, not a fundamentally different mechanism. The architectural debate is more nuanced than "two rival species."
- **Hybrids beat purists in production.** The actual deployed descendants — Jamba (AI21), Zamba (Zyphra), Samba (Microsoft), and several proprietary models — combine Mamba-style layers with a small number of attention layers. Pure Mamba models large enough to matter are rare.
- **Hardware bias.** Mamba was co-designed with NVIDIA GPUs in mind. On other accelerators (TPUs, AMD, custom silicon) the speedups are less consistent.`}
            </div>
          </article>

          <article key={2}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`03`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`4. What the paper does NOT claim`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`- It does not claim Mamba beats transformers at every task. The authors explicitly show transformers still lead on certain in-context learning tasks involving precise lookup.
- It does not claim Mamba scales to GPT-4-class sizes. The paper stops at 2.8B parameters; behavior at 70B+ is extrapolation.
- It does not claim Mamba is more interpretable or safer than transformers. Those are separate research questions.
- It does not claim the death of attention. The authors are explicit that hybrid architectures are a reasonable path.
- It does not claim selective SSMs are biologically realistic or "more like the brain." Marketing language to that effect did not come from the paper.`}
            </div>
          </article>

          <article key={3}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`04`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`5. Read the original`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`- **Primary paper** — Gu, A. and Dao, T. "Mamba: Linear-Time Sequence Modeling with Selective State Spaces." arXiv:2312.00752, December 2023. https://arxiv.org/abs/2312.00752
- **Reference implementation** — Official Mamba code repository on GitHub: https://github.com/state-spaces/mamba (contains the CUDA kernels and pretrained model weights).
- **Predecessor work (S4)** — Gu, A., Goel, K., Re, C. "Efficiently Modeling Long Sequences with Structured State Spaces." arXiv:2111.00396, October 2021. The foundation Mamba builds on.
- **Mamba-2 follow-up** — Dao, T. and Gu, A. "Transformers are SSMs: Generalized Models and Efficient Algorithms Through Structured State Space Duality." arXiv:2405.21060, May 2024. The authors' own argument that attention and SSMs are two sides of one mathematical object — important context for understanding what Mamba actually is.
- **Hybrid production model** — Lieber, O. et al. "Jamba: A Hybrid Transformer-Mamba Language Model." arXiv:2403.19887, March 2024. The first widely-released production model using Mamba layers, showing what the architecture looks like at deployable scale.`}
            </div>
          </article>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <Link href="/research/decoded" className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] px-5 py-2.5 text-sm text-[#9BA5A7] transition-colors hover:text-[#E7EBED]">
            ← research / decoded index
          </Link>
        </div>
      </section>
    </main>
  );
}
