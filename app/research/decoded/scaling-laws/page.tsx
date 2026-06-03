import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Scaling Laws for Neural Language Models · decoded · AtomEons",
  description:
    "Kaplan et al. 2020 — the OpenAI paper that proved AI keeps getting better the bigger you make it, in predictable mathematical ways. Plain English explanation of why the industry has spent $500B on GPUs.",
  alternates: { canonical: "https://atomeons.com/research/decoded/scaling-laws" },
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
          <Link href="/research" className="hover:text-[#22F0D5]">Research</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/research/decoded" className="hover:text-[#22F0D5]">Decoded</Link>{" "}
          <span className="text-[#1A2225]">/</span> Scaling Laws
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9BA5A7]">
            2020 · arXiv:2001.08361 · Kaplan, McCandlish, Henighan, Brown, Chess, Child, Gray, Radford, Wu, Amodei
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            Bigger AI{" "}
            <span style={{ color: ACCENT }}>keeps getting smarter.</span>
          </h1>
          <p className="mt-8 max-w-[62ch] text-[17px] leading-[1.65] text-[#C8CCCE]">
            <span className="text-[#22F0D5]">In one sentence: </span>
            OpenAI ran the experiment of making language models progressively larger and discovered that performance improves in a predictable, mathematical way — and that nothing in the data suggested where it stopped.
          </p>
        </div>
      </section>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24 space-y-12">
          <article>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              01 · Why this matters to your life
            </p>
            <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              This is the paper that justified the past five years of trillion-dollar AI investment. Before this paper, building bigger AI was a guess. After this paper, building bigger AI was a forecastable engineering problem — you could plot the curve and know how much smarter you would get from how much money.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              That forecast is why Microsoft put $13B into OpenAI. Why Google built TPU farms the size of small cities. Why Nvidia is one of the most valuable companies on earth. Why the entire AI industry spent ~$500B in five years on more GPUs. This 2020 paper made the bet calculable. The bet keeps paying.
            </p>
          </article>

          <article>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              02 · What scientists actually did
            </p>
            <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              They trained language models at many different sizes — from tiny (a few thousand parameters) to gigantic (1.5 billion parameters, large for 2020). For each size, they measured how well the model predicted the next word in text it had not seen before — the standard test of language understanding.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              When they plotted the results, the improvement followed a power law — a specific mathematical shape that says &ldquo;every doubling of size produces the same percentage improvement.&rdquo; The curve was smooth, predictable, and showed no sign of bending toward an upper limit within the range they could test.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              They also discovered which input matters most. There are three things you can scale: model size (more parameters), data size (more training text), and compute (more GPU-hours). The paper found that all three matter together, but model size is the dominant driver if the others are kept in proper proportion. The 2022 follow-up paper from DeepMind (Chinchilla) refined the ratios, but the core finding held.
            </p>
          </article>

          <article>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              03 · What scientists know but rarely say
            </p>
            <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The power law is empirical, not theoretical. Nobody knows why the curve has this shape. Nobody knows where it bends. Nobody can prove from physics or information theory that the trend continues. We have extrapolated a graph for five years and the graph has not broken. That is all.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The most consequential unstated implication: if this trend continues for another decade, the resulting AI systems are likely to be qualitatively different from anything we have today. The lead authors of this paper believed that in 2020 and based subsequent careers on it. Sam Altman has been forecasting from this paper for five years. Dario Amodei left OpenAI to found Anthropic specifically because he took this paper seriously. The trillion-dollar valuations of frontier AI labs are extrapolations of this single curve.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The other unstated truth: scaling laws say nothing about safety, alignment, or what the model will choose to do. They guarantee performance improvements. They do not guarantee good behavior. This is why every frontier lab now has a safety team — performance scales with capital, behavior does not.
            </p>
          </article>

          <article>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              04 · What the paper does NOT claim
            </p>
            <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The paper does not claim the trend will continue forever. It does not claim infinite intelligence is reachable by infinite spend. It does not claim AGI. It claims that within the range tested (millions to billions of parameters), the improvement is a clean power law — and that the extrapolation is &ldquo;suggestive&rdquo;, not proven.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The 2024-2026 industry consensus is that the simple scaling-only era is reaching practical limits — training a model 100× larger than GPT-4 would cost more than any company has, and the marginal returns may not justify the spend. So the field has pivoted to scaling inference-time reasoning (o1, o3, Claude Extended Thinking) and post-training quality (RLHF, Constitutional AI) instead of just scaling the base model. The original paper does not anticipate this — it is the next chapter of the story.
            </p>
          </article>

          <article>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              05 · Read the original
            </p>
            <ul className="mt-5 max-w-[62ch] space-y-3 text-[15px] leading-[1.7] text-[#C8CCCE]">
              <li>· <a href="https://arxiv.org/abs/2001.08361" target="_blank" rel="noopener" className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-2 hover:decoration-[#22F0D5]">arxiv.org/abs/2001.08361</a> — the original. ~30 pages but the figures tell the whole story.</li>
              <li>· Hoffmann et al. 2022 (Chinchilla) — DeepMind&apos;s follow-up that revised the optimal compute-vs-data ratio. arXiv:2203.15556.</li>
              <li>· Henighan et al. 2020 — same OpenAI group&apos;s follow-up showing scaling laws hold for images + audio too. arXiv:2010.14701.</li>
              <li>· Then read <Link href="/research/decoded/chain-of-thought" className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-2 hover:decoration-[#22F0D5]">chain-of-thought</Link> for what happened when scaling alone stopped being enough.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/research/decoded/chain-of-thought" className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 px-5 py-2.5 text-sm font-medium text-[#22F0D5] transition-colors hover:bg-[#22F0D5]/10">
              Reasoning unlocked →
            </Link>
            <Link href="/research/decoded" className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] px-5 py-2.5 text-sm text-[#9BA5A7] transition-colors hover:text-[#E7EBED]">
              ← decoded index
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
