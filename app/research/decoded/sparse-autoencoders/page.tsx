import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sparse Autoencoders · decoded · AtomEons",
  description:
    "Cunningham, Ewart, Riggs, Huben, Sharkey 2023 — the paper that started the work of looking inside an AI model's brain and pulling out the specific concepts it has learned. Plain English. The X-ray for language models.",
  alternates: { canonical: "https://atomeons.com/research/decoded/sparse-autoencoders" },
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
          <span className="text-[#1A2225]">/</span> Sparse Autoencoders
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9BA5A7]">
            2023 · arXiv:2309.08600 · Cunningham, Ewart, Riggs, Huben, Sharkey · EleutherAI + Anthropic
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            An X-ray for the{" "}
            <span style={{ color: ACCENT }}>AI brain.</span>
          </h1>
          <p className="mt-8 max-w-[62ch] text-[17px] leading-[1.65] text-[#C8CCCE]">
            <span className="text-[#22F0D5]">In one sentence: </span>
            A mathematical technique for taking a fully-trained language model and revealing the specific human-interpretable concepts it has learned — like turning a black box into something with labels on the inside.
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
              For years AIs were called &ldquo;black boxes.&rdquo; You gave one an input. You got an output. What happened in between was hundreds of billions of numbers nobody could read. If the AI made a mistake, no one could trace why. If it was biased, no one could find the bias. If it learned dangerous knowledge, no one could verify it.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              This paper began the work of changing that. By 2024 Anthropic had identified roughly 34 million distinct concepts inside Claude — labeled, browsable, editable. They could find the &ldquo;Golden Gate Bridge&rdquo; concept and turn it up. They could find the &ldquo;sycophancy&rdquo; circuit and turn it down. The implications for AI safety, debugging, regulation, and trust are enormous.
            </p>
          </article>

          <article>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              02 · What scientists actually did
            </p>
            <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The technical problem they solved is called &ldquo;superposition.&rdquo; Inside a neural network, individual neurons don&apos;t cleanly represent individual concepts. Instead, each neuron represents many concepts at once, and each concept is spread across many neurons. This is efficient for the AI — it lets it fit more knowledge into limited space — but it makes the network impossible to read by hand.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The trick: they trained a second, smaller neural network whose only job is to take the messy, overlapping signals from the original network and re-encode them into a much larger but sparser representation — where each &ldquo;feature&rdquo; in the new representation activates only on one specific concept at a time. The math is called a sparse autoencoder. The result is a translation layer between &ldquo;messy AI internal&rdquo; and &ldquo;clean human-readable.&rdquo;
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              They then went through the discovered features one by one and labeled them. Some features fire on the word &ldquo;cat.&rdquo; Some fire on the concept of sarcasm. Some fire on Python code. Some fire on harmful intent. The features are weirdly granular — for instance, Anthropic later found one specific feature that fires on the concept of &ldquo;being in a bind / having to compromise on values.&rdquo;
            </p>
          </article>

          <article>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              03 · What scientists know but rarely say
            </p>
            <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The honest framing: this is still incomplete. We can identify millions of features inside a model. We cannot yet identify all of them. The features we have found are interpretable, but we don&apos;t know what fraction of the model&apos;s reasoning they capture. The black box has become a partially-labeled-grey box.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The other unstated reality: feature labeling is hard scaling work. Each feature has to be identified, characterized, and (ideally) named by an AI or a human. Anthropic publishes interactive feature explorers (transformer-circuits.pub) where you can browse some of them. The scale required for full interpretability is still beyond what any team has fully delivered, but progress through 2024-2026 has been faster than skeptics predicted.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              Most consequential implication: if interpretability matures, AI auditing becomes possible the way financial auditing is possible. You could in principle verify that a model does not contain dangerous capabilities, certify that it lacks specific biases, or trace why it gave a wrong answer. AI regulation discussions through 2025-2026 increasingly assume this capability exists or will exist soon. The Anthropic interpretability team is essentially trying to make the regulators&apos; assumptions true.
            </p>
          </article>

          <article>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              04 · What the paper does NOT claim
            </p>
            <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The 2023 paper does not claim to fully interpret any model. It claims that sparse autoencoders find &ldquo;highly interpretable&rdquo; features in language models — a substantial step beyond previous work. The number of identified features in the original paper was a few thousand. The 34M number quoted above is the scaled-up version Anthropic published in their 2024 follow-ups (Scaling Monosemanticity, May 2024).
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The paper does not claim that finding features means understanding the model. It does not claim that all features are clean — some are still polysemantic (multiple concepts mixed). It does not claim to know the &ldquo;goals&rdquo; or &ldquo;intentions&rdquo; of the model. Interpretability is a step toward all of these — not yet a delivery.
            </p>
          </article>

          <article>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              05 · Read the original
            </p>
            <ul className="mt-5 max-w-[62ch] space-y-3 text-[15px] leading-[1.7] text-[#C8CCCE]">
              <li>· <a href="https://arxiv.org/abs/2309.08600" target="_blank" rel="noopener" className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-2 hover:decoration-[#22F0D5]">arxiv.org/abs/2309.08600</a> — the original 2023 paper.</li>
              <li>· transformer-circuits.pub (Anthropic Interpretability Team) — the entire interpretability research thread, with interactive feature explorers. Best browsing on the internet for &ldquo;what&apos;s inside an AI.&rdquo;</li>
              <li>· Templeton et al. 2024 (&ldquo;Scaling Monosemanticity&rdquo;) — Anthropic&apos;s follow-up scaling SAEs to production-scale Claude. transformer-circuits.pub/2024/scaling-monosemanticity.</li>
              <li>· &ldquo;Golden Gate Claude&rdquo; (May 2024) — Anthropic&apos;s public demonstration of feature steering, where they cranked up the Golden Gate Bridge feature inside Claude and the model started talking about itself as the bridge. Strange and instructive.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/research/decoded" className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 px-5 py-2.5 text-sm font-medium text-[#22F0D5] transition-colors hover:bg-[#22F0D5]/10">
              ← decoded index · more papers
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
