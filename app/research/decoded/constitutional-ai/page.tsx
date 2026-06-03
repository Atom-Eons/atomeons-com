import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Constitutional AI · decoded · AtomEons",
  description:
    "Bai et al. 2022 — the Anthropic paper that introduced training AI to behave well using a second AI as the grader instead of thousands of human labelers. Plain English. The technique behind Claude.",
  alternates: { canonical: "https://atomeons.com/research/decoded/constitutional-ai" },
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
          <span className="text-[#1A2225]">/</span> Constitutional AI
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9BA5A7]">
            2022 · arXiv:2212.08073 · Bai, Kadavath, Kundu, Askell, Kernion, Jones, et al. · Anthropic
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            AI grading{" "}
            <span style={{ color: ACCENT }}>its own homework.</span>
          </h1>
          <p className="mt-8 max-w-[62ch] text-[17px] leading-[1.65] text-[#C8CCCE]">
            <span className="text-[#22F0D5]">In one sentence: </span>
            Anthropic taught Claude to behave well by having a second AI grade Claude&apos;s responses against a written constitution — replacing thousands of human labelers with a feedback loop that AI scales with itself.
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
              When Claude refuses to help you make a weapon, or declines to spread misinformation, or pushes back politely on a request that would harm someone — that&apos;s constitutional AI in action. The behavior is not a hardcoded rule list. It is a trained tendency, learned by Claude grading thousands of its own draft responses against a written set of principles.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The reason this matters beyond Anthropic: it was the first plausible recipe for scaling AI safety past the human bottleneck. Before this paper, every meaningful improvement in AI behavior required armies of humans labeling AI outputs — slow, expensive, hard to keep consistent. After this paper, the loop could run at machine speed. Every frontier lab now uses some version of the technique.
            </p>
          </article>

          <article>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              02 · What scientists actually did
            </p>
            <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              They wrote a short list of principles — the &ldquo;constitution&rdquo; — describing how an AI assistant should behave. The original constitution was a few dozen lines drawing from sources like the UN Declaration of Human Rights, Apple&apos;s Terms of Service style guides, and Anthropic&apos;s own values. Things like &ldquo;choose the response that is most helpful, harmless, and honest.&rdquo;
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              Then they ran a two-stage training process. In stage one, they had the AI itself look at its own draft response, critique it against the constitution, and rewrite it to better match the principles. The model learned to self-improve its outputs. In stage two, they had the AI generate pairs of responses and label which was better according to the constitution — producing training data for a separate preference model. That preference model then steered future training.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The net effect: instead of needing thousands of humans to rank thousands of AI outputs, you need one constitution and a model that knows how to apply it. The AI labels its own data at machine speed. The recipe is called RLAIF — Reinforcement Learning from AI Feedback — and it sits next to its predecessor RLHF (Reinforcement Learning from Human Feedback).
            </p>
          </article>

          <article>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              03 · What scientists know but rarely say
            </p>
            <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The constitution is short. The full text Anthropic published is roughly two pages. The reason every behavior of every Claude conversation traces back to those two pages is that the model generalizes wildly from them — it extrapolates from the written principles to situations the principles never explicitly mention. Whether the extrapolation is correct, and how it handles edge cases the constitution didn&apos;t anticipate, is the open problem.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The unstated tradeoff: RLAIF is cheaper than RLHF but no one fully understands what it amplifies. If the labeling model has subtle biases, those biases get baked into the trained model at scale. The field calls this &ldquo;reward hacking&rdquo; — the trained model learning to look good to the grader rather than actually be good. Anthropic, OpenAI, DeepMind all have safety researchers working on this problem in 2026.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The most consequential implication: this paper is the technique that lets frontier labs scale safety as fast as they scale capability. If safety stayed human-bottlenecked, we&apos;d ship capable models with thin guardrails. The fact that the guardrails can scale with the capability is what makes Claude shippable to consumers and enterprises.
            </p>
          </article>

          <article>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              04 · What the paper does NOT claim
            </p>
            <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The paper does not claim Constitutional AI solves alignment. It claims it&apos;s a scalable safety training recipe — a useful tool, not a final answer. Anthropic&apos;s own subsequent research (including the Sparse Autoencoders work in <Link href="/research/decoded/sparse-autoencoders" className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-2 hover:decoration-[#22F0D5]">/research/decoded/sparse-autoencoders</Link>) is explicitly about closing the remaining gap.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The paper also does not claim the AI &ldquo;understands ethics.&rdquo; What it has is statistical compliance with the written principles — usually robust, occasionally jailbreakable. Every modern frontier lab acknowledges this. The honest framing is that Constitutional AI is engineering safety, not philosophical safety. The model behaves better; whether it understands why is unresolved.
            </p>
          </article>

          <article>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              05 · Read the original
            </p>
            <ul className="mt-5 max-w-[62ch] space-y-3 text-[15px] leading-[1.7] text-[#C8CCCE]">
              <li>· <a href="https://arxiv.org/abs/2212.08073" target="_blank" rel="noopener" className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-2 hover:decoration-[#22F0D5]">arxiv.org/abs/2212.08073</a> — the original. ~60 pages but the early sections give you most of it.</li>
              <li>· Anthropic&apos;s Claude&apos;s Constitution post (anthropic.com/news/claudes-constitution) — the actual text the model is trained against.</li>
              <li>· Ouyang et al. 2022 (InstructGPT) — the OpenAI paper introducing RLHF, the predecessor to RLAIF. arXiv:2203.02155.</li>
              <li>· Lee et al. 2023 (RLAIF detailed comparison) — Google&apos;s study comparing RLHF vs RLAIF head-to-head. arXiv:2309.00267.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/research/decoded/sparse-autoencoders" className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 px-5 py-2.5 text-sm font-medium text-[#22F0D5] transition-colors hover:bg-[#22F0D5]/10">
              Looking inside the AI brain →
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
