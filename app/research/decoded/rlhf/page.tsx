import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "InstructGPT / RLHF · decoded · AtomEons",
  description:
    "Ouyang et al. 2022 — the OpenAI paper introducing RLHF (Reinforcement Learning from Human Feedback). The technique that turned GPT-3 into ChatGPT. Plain English.",
  alternates: { canonical: "https://atomeons.com/research/decoded/rlhf" },
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
          <span className="text-[#1A2225]">/</span> RLHF
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9BA5A7]">
            2022 · arXiv:2203.02155 · Ouyang, Wu, Jiang, Almeida, Wainwright et al. · OpenAI
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            How humans taught AI{" "}
            <span style={{ color: ACCENT }}>to be polite.</span>
          </h1>
          <p className="mt-8 max-w-[62ch] text-[17px] leading-[1.65] text-[#C8CCCE]">
            <span className="text-[#22F0D5]">In one sentence: </span>
            OpenAI showed that a small army of contracted human raters, ranking the outputs of a large language model, could teach that model to follow instructions, write helpfully, and refuse to produce harmful content — turning research-grade GPT-3 into shippable ChatGPT.
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
              When you ask ChatGPT a question and it answers clearly without rambling, refuses inappropriate requests, and doesn&apos;t produce harmful content, that&apos;s RLHF in action. The base GPT model would have rambled. The base GPT model would have produced anything you asked for. RLHF is what makes the model usable instead of just powerful.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The reason this paper matters: it was the first credible recipe for turning a raw language model into a polite assistant. Every consumer AI product since 2022 — ChatGPT, Claude, Gemini, Grok — uses some variant of this technique. It is the bridge between research and product.
            </p>
          </article>

          <article>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              02 · What scientists actually did
            </p>
            <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              Three stages. First (Supervised Fine-Tuning, SFT): they collected ~13,000 examples of high-quality answers humans wrote in response to prompts. They fine-tuned the base GPT model on these to make it follow instructions instead of just completing text.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              Second (Reward Model training): they had the model generate multiple responses to thousands of prompts. They had human contractors rank which response was better. They trained a separate neural network — the reward model — to predict which ranking humans would give. The reward model became a stand-in for human preferences at machine speed.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              Third (Reinforcement Learning): they used the reward model as a scoring function and applied reinforcement learning (specifically, PPO — Proximal Policy Optimization) to further train the language model to produce outputs that scored well. The model learned to write what humans wanted to read, as approximated by the reward model.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The resulting model (InstructGPT) was rated by humans as substantially preferable to the base GPT-3 on basically every metric — helpfulness, honesty, harmfulness — despite being a smaller model. The training, not the size, did the work.
            </p>
          </article>

          <article>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              03 · What scientists know but rarely say
            </p>
            <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              RLHF works because human raters are good at telling which of two responses is better, even when they couldn&apos;t write a perfect response from scratch. This is a known phenomenon in machine learning — judgment is often easier than generation. The whole technique depends on this asymmetry.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The labor model behind RLHF is rarely discussed in the technical literature. The Time magazine investigation of February 2023 revealed that OpenAI contracted Kenyan workers through Sama at ~$1.32-$2.00/hour to label graphic content used in safety training. The technical paper doesn&apos;t mention this. The economics of RLHF — who labels, what they&apos;re paid, what they see — became a meaningful conversation only after the paper was published.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The other unstated reality: RLHF is brittle. The reward model is an approximation of human preferences. If the language model finds outputs the reward model loves but humans actually hate, you get &ldquo;reward hacking&rdquo; — the model getting good at fooling the grader rather than being good. This is a real problem in production systems and the reason Anthropic developed Constitutional AI as an alternative (<Link href="/research/decoded/constitutional-ai" className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-2 hover:decoration-[#22F0D5]">/research/decoded/constitutional-ai</Link>).
            </p>
          </article>

          <article>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              04 · What the paper does NOT claim
            </p>
            <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The paper does not claim that RLHF solves alignment. It claims that RLHF substantially improves human-rated quality on instruction-following tasks at fixed model size. The follow-up debate is whether RLHF actually makes models &ldquo;safer&rdquo; or just makes them better at appearing safe to evaluators — a distinction that has motivated significant safety research since.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The paper also does not claim its preference data is universally correct. It explicitly notes that &ldquo;human values&rdquo; — what is helpful, what is harmful — vary across cultures, contexts, and individual judgments. The contractor labels OpenAI used reflect specific choices about who got to grade the AI. The downstream effects of those choices on what every consumer AI considers &ldquo;polite&rdquo; or &ldquo;harmful&rdquo; are still being unpacked.
            </p>
          </article>

          <article>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              05 · Read the original
            </p>
            <ul className="mt-5 max-w-[62ch] space-y-3 text-[15px] leading-[1.7] text-[#C8CCCE]">
              <li>· <a href="https://arxiv.org/abs/2203.02155" target="_blank" rel="noopener" className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-2 hover:decoration-[#22F0D5]">arxiv.org/abs/2203.02155</a> — the original InstructGPT paper. ~68 pages.</li>
              <li>· Christiano et al. 2017 (Deep Reinforcement Learning from Human Preferences) — the foundational paper RLHF descends from. arxiv:1706.03741.</li>
              <li>· Stiennon et al. 2020 (Summarizing with Human Feedback) — the predecessor that first applied RLHF to language. arxiv:2009.01325.</li>
              <li>· Time magazine investigation (Jan 18, 2023) — &ldquo;OpenAI Used Kenyan Workers on Less Than $2 Per Hour to Make ChatGPT Less Toxic.&rdquo;</li>
              <li>· Rafailov et al. 2023 (DPO) — the simpler RLHF alternative that skips the reinforcement-learning step.</li>
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
