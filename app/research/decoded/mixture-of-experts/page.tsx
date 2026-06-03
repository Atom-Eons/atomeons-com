import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mixture of Experts — How a 1.5 Trillion Parameter Model Runs on the Same Hardware as a 70 Billion Parameter Model · Research / Decoded · AtomEons",
  description: "Instead of every neuron in the network firing on every input, a small \"router\" picks 1-2 specialist sub-networks per token, so a model can have a trillion parameters in storage but only spend the compute of a 70-billion-parameter model when you ask it a question.",
  alternates: { canonical: "https://atomeons.com/research/decoded/mixture-of-experts" },
  openGraph: {
    title: "Mixture of Experts — How a 1.5 Trillion Parameter Model Runs on the Same Hardware as a 70 Billion Parameter Model",
    description: "Instead of every neuron in the network firing on every input, a small \"router\" picks 1-2 specialist sub-networks per token, so a model can have a trillion parameters in storage but only spend the compute of a 70-billion-parameter model when you ask it a question.",
    url: "https://atomeons.com/research/decoded/mixture-of-experts",
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
          <span className="text-[#1A2225]">/</span> {`Mixture of Experts — How a 1.5 Trillion Parameter Model Runs on the Same Hardware as a 70 Billion Parameter Model`}
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9BA5A7]">
            {`Noam Shazeer, Azalia Mirhoseini, Krzysztof Maziarz, Andy Davis, Quoc Le, Geoffrey Hinton, Jeff Dean (Google Brain / Google Research, 2017) · William Fedus, Barret Zoph, Noam Shazeer (Google, 2021) · arXiv:1701.06538 (Shazeer et al. "Outrageously Large Neural Networks", ICLR 2017) · arXiv:2101.03961 (Fedus et al. "Switch Transformer", JMLR 2022)`}
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            {`Mixture of Experts — How a 1.5 Trillion Parameter Model Runs on the Same Hardware as a 70 Billion Parameter Model`}
          </h1>
          <p className="mt-8 max-w-[62ch] text-[17px] leading-[1.65] text-[#C8CCCE]">
            {`Instead of every neuron in the network firing on every input, a small "router" picks 1-2 specialist sub-networks per token, so a model can have a trillion parameters in storage but only spend the compute of a 70-billion-parameter model when you ask it a question.`}
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
              {`2. What scientists actually did`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`**The 2017 paper (Shazeer et al.) — proof of concept on language models.** They took an LSTM language model and inserted a Sparsely-Gated MoE layer between LSTM layers. The MoE layer had up to 131,072 experts (each a small feed-forward network). A trainable gating network produced a score for each expert; only the top-k experts (typically k=2 or k=4) ran on each token, weighted by the gate's softmax probability. They trained the model on a 100-billion-word corpus. Result: 137 billion parameters total, perplexity beating the dense baselines, with computational cost comparable to much smaller dense models.

The hard part was not the routing idea — that goes back to Jacobs, Jordan, Nowlan, Hinton 1991 ("Adaptive Mixtures of Local Experts"). The hard part was three engineering problems:

- **Load balancing.** If the router falls in love with three favorite experts, the other 130,000 sit idle and never learn. They added an auxiliary loss term that punishes the model when expert usage is too lopsided.
- **Batch shape.** Different experts get different numbers of tokens per batch, which breaks GPU efficiency. They handled this with capacity factors (each expert accepts at most N tokens; overflow gets dropped or routed elsewhere).
- **Communication cost across devices.** Experts live on different machines. They engineered the dispatch as an all-to-all communication pattern.

**The 2021 paper (Switch Transformer) — simplification at Transformer scale.** Fedus, Zoph, and Shazeer took MoE into the Transformer era and simplified the routing from top-k to top-1. Every token goes to exactly one expert. This sounds worse but it cut routing overhead and stabilized training. They scaled to 1.6 trillion total parameters. The Switch-C variant beat T5-XXL (an 11-billion dense baseline) at 4-7x less compute. They also showed how to distill the MoE back into a smaller dense model for inference, recovering most of the quality.

**What came after.** GShard (Google, 2020) made MoE work cleanly across thousands of TPUs. GLaM (Google, 2022) hit 1.2T parameters with 64 experts and matched GPT-3 quality at one-third the energy. Mixtral 8x7B (Mistral, 2023) made open-weights MoE mainstream — 47B total parameters, 13B active per token, runs on consumer hardware. DeepSeek-V3 (2024) scaled to 671B total / 37B active and trained for a fraction of GPT-4's reported budget. The architectural lineage is unbroken.`}
            </div>
          </article>

          <article key={1}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`02`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`3. What scientists know but rarely say in marketing copy`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`- **The 1.5T number and the 70B number describe the same model.** The 1.5T is what is in storage. The 70B is what runs per token. Marketing prefers the big number. Engineers prefer the small one. Both are honest; neither alone tells the story.
- **MoE is harder to train than dense.** Routing instability, expert collapse (some experts die during training), load imbalance, and communication overhead are all live problems. Most teams that tried MoE before Switch Transformer struggled to make it train smoothly.
- **MoE benefits memory bandwidth more than FLOPs.** The win is that you do not have to move 1.5T parameters through the GPU on every token. The active expert weights still get loaded. This is why MoE is friendly to hardware where memory bandwidth is the bottleneck, which is most modern accelerators.
- **The "experts" are not interpretable specialists.** Despite the name, the experts do not cleanly correspond to "the math expert" or "the French expert." Routing patterns are statistical and noisy. Researchers have published interpretability work showing some weak specialization, but if you open up an MoE you do not find tidy departments.
- **Inference serving is genuinely harder.** A request whose tokens hit 40 different experts means 40 sets of weights have to be reachable on whatever machine is serving you. Production MoE systems use sophisticated batching and expert placement strategies that dense models do not need.`}
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
              {`- It does not claim MoE makes models smarter per parameter. It claims MoE makes more parameters affordable. Two different things.
- It does not claim experts learn human-interpretable specialties.
- It does not claim MoE is always better than dense. At small scales (under ~1B parameters) dense models often win on quality-per-compute.
- It does not claim a 1.5T MoE matches a hypothetical 1.5T dense model. A dense 1.5T would, if trainable, likely be stronger. MoE is the engineering compromise that makes 1.5T reachable at all.
- It does not promise stable training out of the box. Switch Transformer explicitly documents the regularization and precision tricks (selective bfloat16, expert dropout, auxiliary load-balancing loss) required to keep training from diverging.`}
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
              {`- Shazeer et al. 2017, "Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer." arXiv:1701.06538.
- Fedus, Zoph, Shazeer 2021, "Switch Transformer: Scaling to Trillion Parameter Models with Simple and Efficient Sparsity." arXiv:2101.03961.
- Jacobs, Jordan, Nowlan, Hinton 1991, "Adaptive Mixtures of Local Experts." Neural Computation 3(1):79-87. The original MoE paper, 26 years before it became a frontier-model technique.
- Lepikhin et al. 2020, "GShard: Scaling Giant Models with Conditional Computation and Automatic Sharding." arXiv:2006.16668. The system-level paper that made MoE work across thousands of accelerators.
- Jiang et al. 2024, "Mixtral of Experts." arXiv:2401.04088. The open-weights MoE that put this architecture in millions of hands.`}
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
