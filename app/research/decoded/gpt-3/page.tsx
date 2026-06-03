import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Language Models are Few-Shot Learners (GPT-3) · decoded · AtomEons",
  description:
    "Brown et al. 2020 — the OpenAI paper introducing GPT-3 and the discovery that very large language models can learn new tasks from a handful of examples without retraining. Plain English. The moment AI started 'talking.'",
  alternates: { canonical: "https://atomeons.com/research/decoded/gpt-3" },
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
          <span className="text-[#1A2225]">/</span> GPT-3
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9BA5A7]">
            2020 · arXiv:2005.14165 · Brown, Mann, Ryder, Subbiah, Kaplan, Dhariwal et al. · OpenAI
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            The moment AI started{" "}
            <span style={{ color: ACCENT }}>talking back.</span>
          </h1>
          <p className="mt-8 max-w-[62ch] text-[17px] leading-[1.65] text-[#C8CCCE]">
            <span className="text-[#22F0D5]">In one sentence: </span>
            OpenAI trained a 175-billion-parameter language model and discovered that — at sufficient scale — it could learn new tasks from a handful of examples in the prompt, without any retraining at all.
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
              ChatGPT launched in November 2022 and changed the world. Behind ChatGPT was GPT-3.5, a refinement of GPT-3. Behind GPT-3 was this paper. The thing the paper announced — that a sufficiently large model could be talked to in plain English and would respond intelligently — is the foundation of the entire 2022-2026 generative AI boom.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              Before GPT-3, talking to an AI meant building an app, training a model on a specific task, and shipping a narrow product. After GPT-3, anyone could prompt a single general-purpose model in English and have it write code, draft emails, summarize papers, translate text, plan vacations — all from the same model. The era of specialty AI gave way to general AI.
            </p>
          </article>

          <article>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              02 · What scientists actually did
            </p>
            <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              They built a 175-billion-parameter transformer language model. That was about 100× larger than the previous GPT-2 (1.5 billion). Training it cost roughly $4-12 million on cloud GPUs, depending on which estimate you trust. The model trained for several weeks on a substantial fraction of the public internet plus high-quality book corpora.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The paper&apos;s key experiment was &ldquo;in-context learning&rdquo; — could the model learn a new task simply from a few examples shown in the prompt, without any actual weight updates? The answer was yes for an astonishing range of tasks. Translation, arithmetic, news article generation, SAT-style analogies, code completion. Each task previously required a specialty model. GPT-3 did them all from prompting.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The phenomenon they named: &ldquo;few-shot learning&rdquo; (the model figures out the task from a few examples), &ldquo;one-shot learning&rdquo; (from one example), and &ldquo;zero-shot learning&rdquo; (from just an instruction in English). All three modes worked at GPT-3 scale. None had worked reliably at GPT-2 scale.
            </p>
          </article>

          <article>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              03 · What scientists know but rarely say
            </p>
            <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The honest truth is that nobody fully knew GPT-3 was going to be useful until they trained it and started playing with it. The Scaling Laws paper had predicted that bigger would be better at next-word-prediction. Nobody had predicted that bigger would unlock conversational generality. The capability emerged from the scale; it was not designed in.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The unstated cultural shift: GPT-3 broke the assumption that AI capabilities had to be designed. Previous AI eras assumed that to make an AI good at a task, you had to design a system for that task — features, architectures, training data, the works. GPT-3 demonstrated that for a large enough general model, capabilities at specific tasks appear as side effects of being good at language. This generalization-from-scale shifted billions of dollars of research funding within a year.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The most consequential implication that did not make it into the paper: this was the model that turned OpenAI from a research lab into a commercial enterprise. The GPT-3 API launched in June 2020 as the first major API of its kind. The decision to commercialize was controversial within OpenAI and contributed to several senior departures. Two years later that API was a $1B+ business. Five years later it underwrites the AI industry&apos;s economic gravity.
            </p>
          </article>

          <article>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              04 · What the paper does NOT claim
            </p>
            <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The paper is honest about limitations. GPT-3 made arithmetic errors. It was prone to repeating itself in long generations. It confidently fabricated facts when asked about specifics (the hallucination problem, which remains real in 2026). It exhibited biases visible in its training data. It could not learn from its conversations — every prompt started fresh. The paper acknowledges all of these.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The paper does not claim GPT-3 understands language the way humans do. It claims that at this scale, useful behavior emerges from a model trained only to predict the next word in text. Whether that constitutes &ldquo;understanding&rdquo; is left as a philosophical question the authors decline to resolve. Five years later that question is still open.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              GPT-3 was also not aligned for safety — it would produce harmful content if asked. The InstructGPT paper (Ouyang 2022, arxiv:2203.02155) was the follow-up that made GPT-3 polite enough to put behind ChatGPT. The combination of base capability (GPT-3) and aligned behavior (InstructGPT/RLHF) was the actual shippable product.
            </p>
          </article>

          <article>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              05 · Read the original
            </p>
            <ul className="mt-5 max-w-[62ch] space-y-3 text-[15px] leading-[1.7] text-[#C8CCCE]">
              <li>· <a href="https://arxiv.org/abs/2005.14165" target="_blank" rel="noopener" className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-2 hover:decoration-[#22F0D5]">arxiv.org/abs/2005.14165</a> — the original. 75 pages. Skim the appendix tables; they tell most of the story.</li>
              <li>· <a href="https://openai.com/research/language-unsupervised" target="_blank" rel="noopener" className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-2 hover:decoration-[#22F0D5]">OpenAI&apos;s GPT-1, GPT-2 blog posts</a> — the lineage. Each one improved on the prior by ~10× scale.</li>
              <li>· Ouyang et al. 2022 (InstructGPT) — the alignment follow-up. arxiv:2203.02155.</li>
              <li>· Then read <Link href="/research/decoded/chain-of-thought" className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-2 hover:decoration-[#22F0D5]">chain-of-thought</Link> — the unlock that made GPT-class models good at reasoning.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <Link href="/research/decoded" className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] px-5 py-2.5 text-sm text-[#9BA5A7] transition-colors hover:text-[#E7EBED]">
            ← decoded index
          </Link>
        </div>
      </section>
    </main>
  );
}
