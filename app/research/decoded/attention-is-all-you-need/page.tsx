import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Attention Is All You Need · decoded · /research/decoded/attention-is-all-you-need · AtomEons",
  description:
    "The 2017 paper by Vaswani et al. that introduced the transformer architecture. Plain English. Why it created every AI you've heard of in 2026.",
  alternates: { canonical: "https://atomeons.com/research/decoded/attention-is-all-you-need" },
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
          <span className="text-[#1A2225]">/</span> Attention Is All You Need
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9BA5A7]">
            2017 · arXiv:1706.03762 · Vaswani, Shazeer, Parmar, Uszkoreit, Jones, Gomez, Kaiser, Polosukhin
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            Attention Is All You{" "}
            <span style={{ color: ACCENT }}>Need.</span>
          </h1>
          <p className="mt-8 max-w-[62ch] text-[17px] leading-[1.65] text-[#C8CCCE]">
            <span className="text-[#22F0D5]">In one sentence: </span>
            Eight Google engineers found a new way for computers to read sentences that does not require reading them in order — and that change created every modern AI you have heard of.
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
              ChatGPT. Claude. Gemini. Grok. The autocomplete on your phone. The translation in your browser. The voice in your earbuds. Every one of them is a transformer. Every transformer descends from this one paper. Eight engineers wrote it over a weekend at Google in 2017 — they did not expect what came next.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              When you talk to an AI today and it understands what you said, that understanding is built from the architecture this paper invented. The technology behind your conversation is eight years old. Everything that has happened since is the same paper at larger scale.
            </p>
          </article>

          <article>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              02 · What scientists actually did
            </p>
            <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              Before 2017, AI read sentences left to right, one word at a time, like a slow reader. To understand the word &ldquo;it&rdquo; in a sentence, the AI had to remember everything that came before. Long sentences broke its memory.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The transformer let the AI look at every word in the sentence at the same time, then decide which other words matter most for understanding each word. This is what &ldquo;attention&rdquo; means here — the AI learns which words to pay attention to when interpreting any given word. The word &ldquo;bank&rdquo; in &ldquo;river bank&rdquo; pays attention to &ldquo;river.&rdquo; The word &ldquo;bank&rdquo; in &ldquo;bank robber&rdquo; pays attention to &ldquo;robber.&rdquo; Same word, different attention, different meaning.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The architectural trick that made this work is called multi-head self-attention — multiple parallel attention systems running at once on the same sentence, each learning to focus on different relationships. The paper&apos;s title comes from the discovery that the old left-to-right machinery could be deleted entirely. Attention was the only thing they needed.
            </p>
          </article>

          <article>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              03 · What scientists know but rarely say
            </p>
            <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The paper was filed under &ldquo;machine translation&rdquo; — the authors thought they had built a better French-to-English translator. None of them publicly predicted ChatGPT. Most of them left Google soon after for AI startups. Of the eight authors, four founded billion-dollar companies, two became chief scientists at frontier labs, and one (Ashish Vaswani) co-founded Adept AI. The paper was the highest-leverage weekend of work in modern computer science.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The unstated truth: the breakthrough is largely empirical. The math works because the experiments said it did, not because anyone proved from first principles that attention beats recurrence. To this day no one has a complete theoretical explanation of why transformers work as well as they do at scale. We discovered them more than we designed them.
            </p>
          </article>

          <article>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              04 · What the paper does NOT claim
            </p>
            <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The paper does not claim transformers understand language the way humans do. It does not claim consciousness. It does not claim general intelligence. It claims one thing — that attention alone, without recurrence, produces better translation. The leap from that to ChatGPT was made by a thousand other papers building on this one, plus five years of scale-up.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The paper&apos;s benchmark in 2017 was the WMT English-to-German translation task. It beat the previous best score by ~2 BLEU points. By the standards of 2017 that was excellent. By the standards of 2026 it is a footnote. The architecture is what survived; the original use case was rounding error.
            </p>
          </article>

          <article>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              05 · Read the original
            </p>
            <ul className="mt-5 max-w-[62ch] space-y-3 text-[15px] leading-[1.7] text-[#C8CCCE]">
              <li>
                · <a href="https://arxiv.org/abs/1706.03762" target="_blank" rel="noopener" className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-2 hover:decoration-[#22F0D5]">arxiv.org/abs/1706.03762</a> — the official 11-page paper. Skip the math if it scares you; the diagrams alone tell most of the story.
              </li>
              <li>· The Annotated Transformer (Harvard NLP) — paper with code interleaved line-by-line, free, the canonical companion read.</li>
              <li>· 3Blue1Brown YouTube series on transformers (2024) — the best visual explanation of attention available, 30 minutes total.</li>
              <li>· Then read <Link href="/research/decoded/scaling-laws" className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-2 hover:decoration-[#22F0D5]">scaling laws</Link> for what happened when this architecture was made bigger.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/research/decoded/scaling-laws" className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 px-5 py-2.5 text-sm font-medium text-[#22F0D5] transition-colors hover:bg-[#22F0D5]/10">
              What happened when they made it bigger →
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
