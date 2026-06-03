import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chain-of-Thought Prompting · decoded · AtomEons",
  description:
    "Wei et al. 2022 — the Google paper that proved asking AI to 'think step by step' unlocks reasoning. Why every reasoning model since (o1, o3, Claude Extended Thinking, Gemini Thinking) traces back to this trick.",
  alternates: { canonical: "https://atomeons.com/research/decoded/chain-of-thought" },
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
          <span className="text-[#1A2225]">/</span> Chain-of-Thought
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9BA5A7]">
            2022 · arXiv:2201.11903 · Wei, Wang, Schuurmans, Bosma, Ichter, Xia, Chi, Le, Zhou
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            &ldquo;Think step by step.&rdquo;{" "}
            <span style={{ color: ACCENT }}>That was the unlock.</span>
          </h1>
          <p className="mt-8 max-w-[62ch] text-[17px] leading-[1.65] text-[#C8CCCE]">
            <span className="text-[#22F0D5]">In one sentence: </span>
            Asking large language models to explain their reasoning out loud before giving an answer makes them dramatically better at math, logic, and multi-step problems — the model already could reason, but you had to ask the right way.
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
              Every &ldquo;reasoning model&rdquo; you have heard of in 2026 — OpenAI o1 and o3, DeepSeek-R1, Claude Extended Thinking, Gemini Thinking — descends from this paper. They are not new fundamental architectures. They are scaled, automated, refined versions of one prompting trick: get the model to think out loud first.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The practical takeaway you can use today: when you ask any AI a complicated question, add &ldquo;think through this step by step&rdquo; or &ldquo;explain your reasoning before answering.&rdquo; The output quality usually improves substantially. This works in 2026 for the same reason it worked in 2022. It is the cheapest performance upgrade in AI.
            </p>
          </article>

          <article>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              02 · What scientists actually did
            </p>
            <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              They took grade-school math word problems and tested whether large language models could solve them. The results were embarrassing — the AI got most of them wrong despite being able to write Shakespearean essays. The model knew math abstractly but kept stumbling on the multi-step arithmetic.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              Then they tried something different. Instead of showing the model a question and the answer, they showed it a question and a worked-out solution that walked through the reasoning. The accuracy improved dramatically — on one math benchmark, from 17.9% to 58.1%. Same model. Same question. Different prompting.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The insight is that the AI could not hold all the reasoning steps in its head and produce the right final answer in one shot. But if it could write the intermediate steps down, it could think across the steps the same way humans do — using its own previously-written words as scratch paper. The reasoning happens in the writing, not before it.
            </p>
          </article>

          <article>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              03 · What scientists know but rarely say
            </p>
            <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              Chain-of-thought reasoning works much better in big models than small ones. The 2022 paper showed it was essentially useless in models under ~10 billion parameters. This led to the concept of emergent capabilities — things that suddenly start working when the model crosses a size threshold. The follow-up debate is whether this emergence is real or an artifact of measurement; the field is still working it out.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The other unstated truth: chain-of-thought is brittle. It works best on problems the model has seen similar versions of during training. It fails on truly novel problems even when the steps look right. This is why the o1/o3-style models are trained specifically to produce good reasoning chains rather than just prompted to — automated chain-of-thought made consistent.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              Most consequential implication: this paper made &ldquo;reasoning&rdquo; legible. Before chain-of-thought, an AI gave you an answer and you had to trust it. After chain-of-thought, an AI gave you an answer plus its reasoning, and you could check the work. The interpretability tax was massively reduced. Modern medical, legal, and scientific AI applications all rely on this.
            </p>
          </article>

          <article>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              04 · What the paper does NOT claim
            </p>
            <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The paper does not claim the AI is actually reasoning the way humans do. It claims that something behaviorally similar to step-by-step reasoning emerges from the prompting pattern. Whether the model is genuinely thinking or pattern-matching against memorized reasoning chains is unresolved.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The paper also does not claim chain-of-thought is the only way to elicit reasoning. The technique has been augmented by self-consistency (Wang et al. 2022, asking the model multiple times and taking the majority answer), tree-of-thought (Yao et al. 2023, exploring multiple reasoning branches), and process-reward models (the technique behind OpenAI&apos;s o1). Each adds capability on top of the original chain-of-thought foundation.
            </p>
          </article>

          <article>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              05 · Read the original
            </p>
            <ul className="mt-5 max-w-[62ch] space-y-3 text-[15px] leading-[1.7] text-[#C8CCCE]">
              <li>· <a href="https://arxiv.org/abs/2201.11903" target="_blank" rel="noopener" className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-2 hover:decoration-[#22F0D5]">arxiv.org/abs/2201.11903</a> — the 43-page original, figures alone tell the story.</li>
              <li>· Kojima et al. 2022 (Zero-shot CoT) — discovered that just adding &ldquo;Let&apos;s think step by step&rdquo; produces most of the gain even without examples. arXiv:2205.11916.</li>
              <li>· Wang et al. 2022 (Self-Consistency) — the upgrade that asks the model many times and votes. arXiv:2203.11171.</li>
              <li>· OpenAI o1 system card (2024) — the production version of automated chain-of-thought trained directly into a model.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/research/decoded/constitutional-ai" className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 px-5 py-2.5 text-sm font-medium text-[#22F0D5] transition-colors hover:bg-[#22F0D5]/10">
              How AI gets safety guardrails →
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
