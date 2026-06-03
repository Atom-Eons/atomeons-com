import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "BERT — the language model that reads both directions at once · Research / Decoded · AtomEons",
  description: "BERT showed that a transformer trained to fill in missing words by looking at context on BOTH sides of the gap — instead of left-to-right like GPT — learns a much deeper understanding of language, and that single model can be fine-tuned to dominate a dozen unrelated language tasks.",
  alternates: { canonical: "https://atomeons.com/research/decoded/bert" },
  openGraph: {
    title: "BERT — the language model that reads both directions at once",
    description: "BERT showed that a transformer trained to fill in missing words by looking at context on BOTH sides of the gap — instead of left-to-right like GPT — learns a much deeper understanding of language, and that single model can be fine-tuned to dominate a dozen unrelated language tasks.",
    url: "https://atomeons.com/research/decoded/bert",
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
          <span className="text-[#1A2225]">/</span> {`BERT — the language model that reads both directions at once`}
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9BA5A7]">
            {`Jacob Devlin, Ming-Wei Chang, Kenton Lee, Kristina Toutanova (Google AI Language), 2018 · 1810.04805`}
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            {`BERT — the language model that reads both directions at once`}
          </h1>
          <p className="mt-8 max-w-[62ch] text-[17px] leading-[1.65] text-[#C8CCCE]">
            {`BERT showed that a transformer trained to fill in missing words by looking at context on BOTH sides of the gap — instead of left-to-right like GPT — learns a much deeper understanding of language, and that single model can be fine-tuned to dominate a dozen unrelated language tasks.`}
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
              {`They took the transformer architecture from "Attention Is All You Need" (2017) and threw away the decoder half. What was left was an encoder stack — 12 layers for BERT-Base, 24 layers for BERT-Large. They then pre-trained it on 3.3 billion words of English text (Wikipedia plus the BookCorpus) using two objectives at the same time:

**Masked Language Modeling (MLM).** Take a sentence. Randomly hide 15% of the words. Make the model guess what was hidden, using the words on both sides of the gap as clues. This is the trick. Earlier models had to predict word N using only words 1 through N-1. BERT gets to use words 1 through N-1 AND words N+1 through end. That bidirectional context is where the gains come from.

**Next Sentence Prediction (NSP).** Show the model two sentences. Half the time they are actually consecutive in the source text; half the time the second sentence is random. Make the model say which. This was supposed to help with tasks involving sentence pairs (question answering, entailment). Later research showed NSP did not help much and may have hurt; RoBERTa (2019) dropped it and did better. But it was in the original paper.

After pre-training (which cost them four days on 16 TPU chips for BERT-Base, longer for Large), they "fine-tuned" the same model on 11 different specific tasks — sentiment classification, question answering, named entity recognition, paraphrase detection, natural language inference. Fine-tuning means: take the pre-trained model, slap a tiny task-specific layer on top, train the whole thing for a few more epochs on the labeled data for that task.

The result: BERT set new state-of-the-art on all 11 tasks. The GLUE benchmark — a basket of 9 language understanding tasks — jumped 7.7 absolute points. SQuAD question-answering pushed past human-level on the exact-match metric.`}
            </div>
          </article>

          <article key={1}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`02`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`3. What the scientists know but rarely say out loud`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`A few inconvenient truths the paper soft-pedals or that the field figured out after:

- **NSP was a dud.** RoBERTa (Liu et al. 2019) and ALBERT (Lan et al. 2019) showed that removing Next Sentence Prediction and just doing more masked-language-modeling on more data was strictly better. The two-objective story in the original paper was overengineered.

- **BERT-Base is the workhorse, not BERT-Large.** BERT-Large gets the headline numbers, but most production systems run a distilled, smaller version (DistilBERT, MiniLM, TinyBERT) because Large is too slow and expensive for real traffic. The paper does not dwell on this.

- **The model memorizes more than you would like.** Carlini et al. (2020) and follow-ups showed pre-trained language models can be coaxed into reciting personal data from their training corpus. Wikipedia and BookCorpus are public, so the BERT-specific risk is lower than for models trained on web scrapes — but the failure mode exists.

- **"Bidirectional" is a marketing word.** What BERT actually does is process all tokens in parallel with self-attention that can look in any direction. The contrast is with strict left-to-right autoregression. Calling it "deeply bidirectional" makes it sound like the model walks the sentence twice. It does not. It looks at everything at once.

- **The fine-tuning gains depend on labeled data you may not have.** BERT made benchmarks jump because researchers had clean labeled datasets ready. For a random business with messy unlabeled data, BERT alone is not a magic wand — you still need somebody to label examples.`}
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
              {`- BERT does not generate fluent paragraphs. It is not a chatbot. It can fill in a blank, but the architecture is wrong for free-form generation. Anyone selling you a "BERT-powered writing assistant" in 2026 is either confused or laundering the word.
- BERT does not "understand" language in any human sense. It learned statistical patterns over 3.3B words that correlate with surface features of meaning. It still fails on negation, counterfactuals, and simple arithmetic.
- BERT does not generalize across languages out of the box. The original was English-only. Multilingual BERT (mBERT) and XLM-R came later and have their own limits.
- BERT does not "solve" question answering. SQuAD exact-match exceeding humans means BERT beat humans on a specific benchmark of Wikipedia passage QA. It did not pass the bar exam, did not become a paralegal, did not reason.
- BERT does not run cheaply. The 24-layer BERT-Large has 340M parameters and is genuinely slow at inference. Most "BERT in production" is a distilled child of BERT, not BERT itself.`}
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
              {`1. **Devlin et al. 2018, "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding"** — arXiv:1810.04805. The actual paper. About 16 pages. Readable.
2. **Liu et al. 2019, "RoBERTa: A Robustly Optimized BERT Pretraining Approach"** — arXiv:1907.11692. The follow-up that showed BERT was undertrained and NSP was unnecessary. Reading both back-to-back is the honest education.
3. **Rogers, Kovaleva, Rumshisky 2020, "A Primer in BERTology: What We Know About How BERT Works"** — arXiv:2002.12327. Survey of what the field actually figured out about why BERT works after two years of probing.
4. **Google AI Blog, "Open Sourcing BERT" (Nov 2018)** — the official release announcement; useful for the engineering context and the original code release on GitHub (\`google-research/bert\`).
5. **Jay Alammar, "The Illustrated BERT, ELMo, and co."** (jalammar.github.io, 2018) — the canonical visual explainer if the original paper's notation is rough. Free, illustrated, accurate.`}
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
