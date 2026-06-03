import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks · Research / Decoded · AtomEons",
  description: "A language model that, before it answers your question, first searches a separate library of documents and reads the relevant ones — instead of trying to remember everything from training.",
  alternates: { canonical: "https://atomeons.com/research/decoded/rag" },
  openGraph: {
    title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
    description: "A language model that, before it answers your question, first searches a separate library of documents and reads the relevant ones — instead of trying to remember everything from training.",
    url: "https://atomeons.com/research/decoded/rag",
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
          <span className="text-[#1A2225]">/</span> {`Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks`}
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9BA5A7]">
            {`Patrick Lewis, Ethan Perez, Aleksandra Piktus, Fabio Petroni, Vladimir Karpukhin, Naman Goyal, Heinrich Küttler, Mike Lewis, Wen-tau Yih, Tim Rocktäschel, Sebastian Riedel, Douwe Kiela — Facebook AI Research / University College London / New York University · 2020 · arXiv:2005.11401 (NeurIPS 2020)`}
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            {`Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks`}
          </h1>
          <p className="mt-8 max-w-[62ch] text-[17px] leading-[1.65] text-[#C8CCCE]">
            {`A language model that, before it answers your question, first searches a separate library of documents and reads the relevant ones — instead of trying to remember everything from training.`}
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
              {`What scientists actually did`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`Lewis et al. combined two existing components into one trainable system.

The retriever was Dense Passage Retrieval (DPR), a separate Facebook AI result from earlier in 2020. DPR turns documents and questions into dense numerical vectors using BERT-based encoders, so "find the most relevant passage" becomes a fast nearest-neighbor lookup in a vector index. The document collection they used was a December 2018 Wikipedia dump chunked into ~21 million 100-word passages.

The generator was BART, a sequence-to-sequence transformer pretrained on text reconstruction. BART receives the question concatenated with retrieved passages and produces the answer token by token.

The novel contribution was training them together. The retriever and generator were jointly fine-tuned so the retriever learned to pull passages the generator could actually use, and the generator learned to lean on retrieved evidence rather than hallucinate from its parameters. They proposed two variants — RAG-Sequence (one set of retrieved documents per full answer) and RAG-Token (the model can attend to different documents for different tokens in the answer).

They tested it on four knowledge-intensive benchmarks: open-domain question answering (Natural Questions, TriviaQA, WebQuestions, CuratedTrec), abstractive question answering (MS MARCO), Jeopardy question generation, and FEVER fact verification. RAG hit state-of-the-art on three of the four open-domain QA datasets at the time. On Jeopardy question generation, human evaluators rated RAG-generated questions as more factual and more specific than BART-only generations.`}
            </div>
          </article>

          <article key={1}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`02`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`What scientists know but rarely say`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`A few things the paper is honest about that often get lost when people sell RAG as magic.

RAG is bounded by the quality of its retriever. If the retriever pulls the wrong passages, the generator confidently writes nonsense grounded in irrelevant text. The paper explicitly shows retrieval failure modes. In production, retrieval failure is the single most common reason a RAG system gives a wrong answer — not generator weakness.

The paper used a fixed Wikipedia index and was honest that re-indexing is required when the underlying document collection changes. "Hot-swappable knowledge" doesn't mean free — every change to the document store means re-embedding and re-indexing the affected passages.

RAG reduced hallucinations versus pure parametric generation in their tests, but did not eliminate them. The generator still has its own pretrained beliefs and will sometimes prefer them over the retrieved evidence, especially when the retrieved passages are short, contradictory, or off-topic. Modern follow-up work has spent five years trying to make generators more faithful to retrieved evidence — that problem is not solved.

The 100-word chunk size was a practical choice, not an optimal one. Chunk strategy (size, overlap, semantic boundaries, document structure) turns out to matter enormously for downstream answer quality, and the paper doesn't claim otherwise.

The retriever and generator can be trained jointly, but in most production RAG systems today they are not. People take an off-the-shelf embedding model, an off-the-shelf LLM, and bolt them together. That's cheaper but throws away part of what made the original paper's results strong.`}
            </div>
          </article>

          <article key={2}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`03`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`What the paper does NOT claim`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`RAG does not give a language model the ability to "reason over" documents. It gives the generator more relevant context tokens. Whether the generator does anything intelligent with those tokens is still bounded by the generator.

RAG does not make a model truthful. It makes the model more likely to ground its answer in retrieved text. If the retrieved text is wrong, the answer is wrong with a citation.

RAG does not eliminate the need for fine-tuning. The paper's results came from joint fine-tuning on supervised QA datasets. Bolting a retriever onto a frozen general-purpose LLM gives weaker results than what the paper reported.

RAG was not proposed as a replacement for larger models. The paper frames retrieval as a complement to parametric memory, not a substitute. Both matter. A bigger model with retrieval still outperforms a smaller model with retrieval on most tasks.

The paper made no claim about long documents, multi-hop reasoning across many sources, structured data, agentic tool use, or any of the things people now ask RAG systems to do. Those use cases got bolted on later by the field, often with worse-than-advertised results.`}
            </div>
          </article>

          <article key={3}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`04`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`Read the original`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`1. Lewis et al. 2020 — "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks" — arXiv:2005.11401 — https://arxiv.org/abs/2005.11401
2. Karpukhin et al. 2020 — "Dense Passage Retrieval for Open-Domain Question Answering" (the DPR retriever RAG uses) — arXiv:2004.04906 — https://arxiv.org/abs/2004.04906
3. Lewis et al. 2019 — "BART: Denoising Sequence-to-Sequence Pre-training" (the generator RAG uses) — arXiv:1910.13461 — https://arxiv.org/abs/1910.13461
4. Guu et al. 2020 — "REALM: Retrieval-Augmented Language Model Pre-Training" (Google's parallel work the same year) — arXiv:2002.08909 — https://arxiv.org/abs/2002.08909
5. Gao et al. 2023 — "Retrieval-Augmented Generation for Large Language Models: A Survey" (what the field figured out in the three years after) — arXiv:2312.10997 — https://arxiv.org/abs/2312.10997`}
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
