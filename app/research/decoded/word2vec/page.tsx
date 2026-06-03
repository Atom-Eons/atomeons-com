import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Efficient Estimation of Word Representations in Vector Space · Research / Decoded · AtomEons",
  description: "Mikolov and colleagues at Google showed that if you train a very simple neural network to predict words from their neighbors in billions of sentences, the side effect is a map where words become points in space, and the directions between those points encode meaning — including the famous result that the vector for \"king\" minus \"man\" plus \"woman\" lands near \"queen.\"",
  alternates: { canonical: "https://atomeons.com/research/decoded/word2vec" },
  openGraph: {
    title: "Efficient Estimation of Word Representations in Vector Space",
    description: "Mikolov and colleagues at Google showed that if you train a very simple neural network to predict words from their neighbors in billions of sentences, the side effect is a map where words become points in space, and the directions between those points encode meaning — including the famous result that the vector for \"king\" minus \"man\" plus \"woman\" lands near \"queen.\"",
    url: "https://atomeons.com/research/decoded/word2vec",
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
          <span className="text-[#1A2225]">/</span> {`Efficient Estimation of Word Representations in Vector Space`}
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9BA5A7]">
            {`Tomas Mikolov, Kai Chen, Greg Corrado, Jeffrey Dean (Google, 2013) · arXiv:1301.3781`}
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            {`Efficient Estimation of Word Representations in Vector Space`}
          </h1>
          <p className="mt-8 max-w-[62ch] text-[17px] leading-[1.65] text-[#C8CCCE]">
            {`Mikolov and colleagues at Google showed that if you train a very simple neural network to predict words from their neighbors in billions of sentences, the side effect is a map where words become points in space, and the directions between those points encode meaning — including the famous result that the vector for "king" minus "man" plus "woman" lands near "queen."`}
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
              {`Mikolov's team built two extremely lightweight neural network architectures, both designed to be trainable on billions of words on hardware available in 2013.

**CBOW (Continuous Bag-of-Words).** Take a sentence. Hide one word. Show the network the surrounding words (say, 4 before and 4 after) and ask it to predict the hidden word. The network has no recurrence, no deep stack — just an input layer, a single hidden projection layer, and an output. After enough training, the hidden layer's weights for each word become that word's vector.

**Skip-gram.** Run CBOW backwards. Show the network one word and ask it to predict the surrounding words. Skip-gram is slower to train but produces better representations of rare words.

Both models share one mechanical trick. The network is forced through a low-dimensional bottleneck — typically 100 to 1000 dimensions. To do its prediction job well, the network must compress every word into a position in this bottleneck space in a way that captures its statistical neighbors. Words that appear in similar sentences ("doctor," "physician," "nurse") get pushed close together because they help predict the same surroundings.

They trained on a Google internal news corpus of roughly 6 billion words. They evaluated the vectors on an analogy task they constructed — 19,544 questions of the form "A is to B as C is to ?" — covering grammatical patterns (run/running, big/biggest) and semantic patterns (Athens/Greece, copper/Cu, Einstein/scientist).

The headline result: Skip-gram with 300 dimensions hit roughly 53.3% accuracy on the full analogy benchmark and roughly 65% on semantic analogies. Previous methods sat in the teens to twenties. They had crushed the state of the art with a model an order of magnitude faster to train.

A second paper that same year (Mikolov, Sutskever et al., NeurIPS 2013) added the implementation tricks — negative sampling, subsampling of frequent words — that made Skip-gram practical at scale and that most "Word2Vec" implementations actually use.`}
            </div>
          </article>

          <article key={1}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`02`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`3. What scientists know but rarely say`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`The "king − man + woman = queen" demo is real but oversold. The relation holds on a curated subset. On open-ended analogies pulled from the wild, the nearest vector is often the input word itself, and standard evaluation code silently excludes the input words from the answer set. Strip that exclusion and the magic deflates noticeably. The geometry encodes something — but it is messier than the marketing.

Word2Vec vectors have one fixed meaning per word. "Bank" the river edge and "bank" the financial institution collapse into a single point — a blurry average. This is the fundamental ceiling that contextual embeddings (ELMo, BERT, every transformer since) were invented to break.

The vectors absorb whatever biases live in the training corpus. Bolukbasi et al. (2016) showed that the same arithmetic that gives you "king − man + woman ≈ queen" also gives you "programmer − man + woman ≈ homemaker." The geometry is a mirror of the text it was trained on, not a window into objective meaning.

The architecture is barely a "deep" neural network. There is one hidden layer and no nonlinearity worth mentioning. Levy and Goldberg (2014) later proved that Skip-gram with negative sampling is mathematically equivalent to factoring a shifted pointwise-mutual-information matrix — the same kind of statistics-of-co-occurrence approach that had existed in computational linguistics for decades. Word2Vec's novelty was less the math and more the scale, the speed, and the demonstration that it worked.

Word2Vec is also dead as a production tool in 2026. Nobody trains new Word2Vec models for serious systems. Modern contextual embeddings (from BERT, GPT, sentence-transformers) outperform it on almost every downstream task. Word2Vec lives on as the conceptual ancestor and as a teaching tool — not as deployed infrastructure.`}
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
              {`The paper does not claim the model "understands" language. It claims the model captures statistical regularities of word co-occurrence that happen to align with human intuitions about similarity and analogy on a curated benchmark.

It does not claim the analogy arithmetic works for arbitrary analogies. The evaluation set was specifically constructed and the model was tuned against it.

It does not claim to have solved word sense disambiguation. The single-vector-per-word limitation is acknowledged in follow-up work, not in this paper.

It does not claim novel mathematics. The training objectives are simple log-linear classifiers. The paper's contribution is engineering — making these objectives fast enough to train on billions of words.

It does not claim the vectors are interpretable dimension-by-dimension. Individual dimensions of the 300-dimensional space do not correspond to human-named concepts. The geometry is meaningful in aggregate, not coordinate-by-coordinate.`}
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
              {`- Mikolov, Chen, Corrado, Dean (2013). *Efficient Estimation of Word Representations in Vector Space.* arXiv:1301.3781. https://arxiv.org/abs/1301.3781
- Mikolov, Sutskever, Chen, Corrado, Dean (2013). *Distributed Representations of Words and Phrases and their Compositionality.* NeurIPS 2013 / arXiv:1310.4546. The companion paper with negative sampling and subsampling. https://arxiv.org/abs/1310.4546
- Levy, Goldberg (2014). *Neural Word Embedding as Implicit Matrix Factorization.* NeurIPS 2014. The paper proving Skip-gram is matrix factorization in disguise. https://papers.nips.cc/paper/2014/hash/feab05aa91085b7a8012516bc3533958-Abstract.html
- Bolukbasi, Chang, Zou, Saligrama, Kalai (2016). *Man is to Computer Programmer as Woman is to Homemaker? Debiasing Word Embeddings.* NeurIPS 2016 / arXiv:1607.06520. The bias-in-the-geometry paper. https://arxiv.org/abs/1607.06520
- Pennington, Socher, Manning (2014). *GloVe: Global Vectors for Word Representation.* EMNLP 2014. Stanford's contemporary alternative; useful to read alongside. https://nlp.stanford.edu/projects/glove/`}
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
