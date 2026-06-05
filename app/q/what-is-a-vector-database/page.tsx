import type { Metadata } from "next";

const QUESTION = "What is a vector database?";
const SHORT_ANSWER =
  "A vector database is a database that stores data as high-dimensional numerical vectors (embeddings) and retrieves them by mathematical similarity rather than exact key match. It powers semantic search, retrieval-augmented generation (RAG), and recommendation systems by running approximate nearest neighbor (ANN) search over millions to billions of embeddings produced by models like OpenAI text-embedding-3 or sentence-transformers. Leading systems include Pinecone, Weaviate, Milvus, Qdrant, Chroma, and pgvector (Postgres).";
const CANONICAL = "https://atomeons.com/q/what-is-a-vector-database";

export const metadata: Metadata = {
  title: QUESTION,
  description: SHORT_ANSWER,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: QUESTION,
    description: SHORT_ANSWER,
    url: CANONICAL,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: QUESTION,
    description: SHORT_ANSWER,
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: QUESTION,
      acceptedAnswer: {
        "@type": "Answer",
        text: SHORT_ANSWER,
      },
    },
  ],
};

const qaPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "QAPage",
  mainEntity: {
    "@type": "Question",
    name: QUESTION,
    text: QUESTION,
    answerCount: 1,
    acceptedAnswer: {
      "@type": "Answer",
      text: SHORT_ANSWER,
      url: CANONICAL,
    },
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#e8e8e8] antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(qaPageJsonLd) }}
      />

      <article className="mx-auto max-w-3xl px-6 py-16">
        <nav className="mb-8 text-xs uppercase tracking-[0.2em] text-[#7a7a7a]">
          <a href="/q" className="hover:text-[#ff7a1a]">
            atomeons / q
          </a>
        </nav>

        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          {QUESTION}
        </h1>

        <section className="mt-10 border-l-2 border-[#ff7a1a] pl-5">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff7a1a]">
            The short answer
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-[#e8e8e8]">
            {SHORT_ANSWER}
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7a7a7a]">
            The longer answer
          </h2>
          <div className="mt-4 space-y-5 text-[15px] leading-relaxed text-[#cfcfcf]">
            <p>
              A vector database stores objects as fixed-length arrays of
              floating-point numbers — typically 384, 768, 1024, 1536, or 3072
              dimensions — and indexes them so that the nearest neighbors of a
              query vector can be returned in milliseconds. The &ldquo;vector&rdquo;
              comes from an embedding model: a neural network that maps text,
              images, audio, or code into a point in a high-dimensional space
              where semantically similar inputs land near one another. OpenAI&rsquo;s
              <code className="mx-1 rounded bg-[#171717] px-1.5 py-0.5 text-[13px] text-[#ffb070]">
                text-embedding-3-large
              </code>
              outputs 3072-dimensional vectors; Cohere&rsquo;s
              <code className="mx-1 rounded bg-[#171717] px-1.5 py-0.5 text-[13px] text-[#ffb070]">
                embed-v3
              </code>
              outputs 1024; Google&rsquo;s
              <code className="mx-1 rounded bg-[#171717] px-1.5 py-0.5 text-[13px] text-[#ffb070]">
                text-embedding-004
              </code>
              outputs 768; the open-source
              <code className="mx-1 rounded bg-[#171717] px-1.5 py-0.5 text-[13px] text-[#ffb070]">
                all-MiniLM-L6-v2
              </code>
              (Reimers & Gurevych, &ldquo;Sentence-BERT,&rdquo; arXiv:1908.10084)
              outputs 384.
            </p>
            <p>
              The defining operation is approximate nearest neighbor (ANN)
              search. Exact nearest neighbor over a billion 768-dimensional
              vectors is computationally infeasible at query time, so vector
              databases use indexes that trade a small amount of recall for
              orders-of-magnitude faster lookup. The two dominant families are
              HNSW (Hierarchical Navigable Small World graphs, Malkov &
              Yashunin, arXiv:1603.09320, 2016) and IVF (inverted file with
              product quantization, Jégou et al., &ldquo;Product Quantization for
              Nearest Neighbor Search,&rdquo; IEEE TPAMI 2011). Facebook AI
              Research&rsquo;s FAISS library (Johnson, Douze & Jégou,
              arXiv:1702.08734) is the reference implementation that most
              vector databases either embed directly or borrow algorithms from.
            </p>
            <p>
              The current generation of vector databases emerged around
              2022–2023 with the rise of large language models. Pinecone
              (founded 2019) launched a fully managed serverless tier in 2024.
              Weaviate (open-source, Apache 2.0) added native hybrid search
              combining BM25 with vector similarity. Milvus (a CNCF graduated
              project as of June 2024) supports billions of vectors with
              GPU-accelerated indexing. Qdrant (written in Rust, Apache 2.0)
              emphasizes payload filtering. Chroma is the lightweight in-process
              choice favored by LangChain and LlamaIndex prototypes. pgvector
              (PostgreSQL extension, MIT license) reached version 0.7.0 in April
              2024 with HNSW support and is the path for teams that want vector
              search inside their existing Postgres without operating a second
              system.
            </p>
            <p>
              The dominant production use case is retrieval-augmented generation
              (RAG), introduced by Lewis et al.
              (&ldquo;Retrieval-Augmented Generation for Knowledge-Intensive NLP
              Tasks,&rdquo; arXiv:2005.11401, NeurIPS 2020). In RAG, a user query
              is embedded, the vector database returns the top-k most similar
              document chunks, and those chunks are passed as context to an
              LLM. This grounds the LLM&rsquo;s response in retrieved evidence
              and reduces hallucination on domain-specific or recent knowledge
              that the model was not trained on.
            </p>
            <p>
              Distance metrics matter and are not interchangeable. Cosine
              similarity is the standard for normalized text embeddings;
              Euclidean (L2) distance is common for image embeddings; dot
              product is used when embeddings are not normalized and magnitude
              carries signal. Using the wrong metric for the embedding model
              you&rsquo;re querying produces ranked results that look plausible
              but are subtly wrong — a class of bug that survived into
              production at multiple vendors before being caught.
            </p>
            <p>
              Vector databases are not a replacement for relational or document
              databases. They are a complement: the embedding is a
              pointer-by-meaning, while the source-of-truth row still lives in
              Postgres, S3, or a content store. Most production architectures
              store the canonical document in a primary store and the embedding
              plus a foreign-key payload in the vector index.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7a7a7a]">
            Key facts
          </h2>
          <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-[#cfcfcf]">
            <li className="border-l border-[#222] pl-4">
              HNSW indexes scale to billion-vector workloads with sub-100ms p95
              latency on commodity hardware (Malkov & Yashunin,
              arXiv:1603.09320).
            </li>
            <li className="border-l border-[#222] pl-4">
              OpenAI <code className="text-[#ffb070]">text-embedding-3-large</code>
              {" "}outputs 3072 dimensions and supports Matryoshka truncation down
              to 256 dimensions with controlled quality loss (OpenAI embeddings
              docs, January 2024 release).
            </li>
            <li className="border-l border-[#222] pl-4">
              FAISS, released by Meta AI in 2017, remains the most-cited ANN
              library and underlies indexes in many commercial vector databases
              (Johnson et al., arXiv:1702.08734).
            </li>
            <li className="border-l border-[#222] pl-4">
              Milvus graduated as a CNCF top-level project in June 2024, joining
              Kubernetes and Prometheus at that tier (CNCF announcement,
              2024-06-25).
            </li>
            <li className="border-l border-[#222] pl-4">
              pgvector 0.7.0 added HNSW support inside PostgreSQL and is the
              default vector backend for Supabase (pgvector GitHub release,
              April 2024).
            </li>
            <li className="border-l border-[#222] pl-4">
              The Massive Text Embedding Benchmark (MTEB, Muennighoff et al.,
              arXiv:2210.07316) is the standard leaderboard for ranking
              embedding models across 58 datasets and 8 task types.
            </li>
            <li className="border-l border-[#222] pl-4">
              Lewis et al. 2020 defined the retrieval-augmented generation (RAG)
              architecture that drives most current production vector-database
              deployments (arXiv:2005.11401).
            </li>
            <li className="border-l border-[#222] pl-4">
              Product quantization, which underpins IVF-PQ indexes, compresses
              each vector to roughly 8–32 bytes with minimal recall loss
              (Jégou et al., IEEE TPAMI 2011, DOI:10.1109/TPAMI.2010.57).
            </li>
            <li className="border-l border-[#222] pl-4">
              Cosine similarity, dot product, and L2 distance are the three
              standard metrics; using the wrong one for a given embedding model
              degrades recall silently rather than throwing an error.
            </li>
            <li className="border-l border-[#222] pl-4">
              ANN-Benchmarks (Aumüller, Bernhardsson & Faithfull,
              arXiv:1807.05614) is the canonical reproducible benchmark suite
              for comparing vector index implementations across recall/QPS
              curves.
            </li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7a7a7a]">
            Related questions
          </h2>
          <ul className="mt-4 space-y-2 text-[15px] text-[#cfcfcf]">
            <li>
              <a
                href="/q/what-is-retrieval-augmented-generation"
                className="text-[#ff7a1a] underline-offset-4 hover:underline"
              >
                What is retrieval-augmented generation (RAG)?
              </a>
            </li>
            <li>
              <a
                href="/q/what-is-an-embedding-model"
                className="text-[#ff7a1a] underline-offset-4 hover:underline"
              >
                What is an embedding model?
              </a>
            </li>
            <li>
              <a
                href="/q/what-is-hnsw"
                className="text-[#ff7a1a] underline-offset-4 hover:underline"
              >
                What is HNSW (Hierarchical Navigable Small World)?
              </a>
            </li>
            <li>
              <a
                href="/q/pinecone-vs-pgvector"
                className="text-[#ff7a1a] underline-offset-4 hover:underline"
              >
                What is the difference between Pinecone and pgvector?
              </a>
            </li>
            <li>
              <a
                href="/q/what-is-cosine-similarity"
                className="text-[#ff7a1a] underline-offset-4 hover:underline"
              >
                What is cosine similarity?
              </a>
            </li>
          </ul>
        </section>

        <section className="mt-12 mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7a7a7a]">
            Sources
          </h2>
          <ul className="mt-4 space-y-2 text-[14px] leading-relaxed text-[#9a9a9a]">
            <li>
              Malkov, Y. & Yashunin, D. &ldquo;Efficient and robust
              approximate nearest neighbor search using Hierarchical Navigable
              Small World graphs.&rdquo; arXiv:1603.09320.{" "}
              <a
                href="https://arxiv.org/abs/1603.09320"
                className="text-[#ff7a1a] underline-offset-4 hover:underline"
                rel="noopener noreferrer"
              >
                arxiv.org/abs/1603.09320
              </a>
            </li>
            <li>
              Johnson, J., Douze, M. & Jégou, H. &ldquo;Billion-scale
              similarity search with GPUs.&rdquo; arXiv:1702.08734 (FAISS).{" "}
              <a
                href="https://arxiv.org/abs/1702.08734"
                className="text-[#ff7a1a] underline-offset-4 hover:underline"
                rel="noopener noreferrer"
              >
                arxiv.org/abs/1702.08734
              </a>
            </li>
            <li>
              Lewis, P. et al. &ldquo;Retrieval-Augmented Generation for
              Knowledge-Intensive NLP Tasks.&rdquo; arXiv:2005.11401, NeurIPS
              2020.{" "}
              <a
                href="https://arxiv.org/abs/2005.11401"
                className="text-[#ff7a1a] underline-offset-4 hover:underline"
                rel="noopener noreferrer"
              >
                arxiv.org/abs/2005.11401
              </a>
            </li>
            <li>
              Jégou, H., Douze, M. & Schmid, C. &ldquo;Product Quantization
              for Nearest Neighbor Search.&rdquo; IEEE TPAMI 2011.{" "}
              <a
                href="https://doi.org/10.1109/TPAMI.2010.57"
                className="text-[#ff7a1a] underline-offset-4 hover:underline"
                rel="noopener noreferrer"
              >
                doi.org/10.1109/TPAMI.2010.57
              </a>
            </li>
            <li>
              Muennighoff, N. et al. &ldquo;MTEB: Massive Text Embedding
              Benchmark.&rdquo; arXiv:2210.07316.{" "}
              <a
                href="https://arxiv.org/abs/2210.07316"
                className="text-[#ff7a1a] underline-offset-4 hover:underline"
                rel="noopener noreferrer"
              >
                arxiv.org/abs/2210.07316
              </a>
            </li>
            <li>
              Aumüller, M., Bernhardsson, E. & Faithfull, A.
              &ldquo;ANN-Benchmarks: A Benchmarking Tool for Approximate Nearest
              Neighbor Algorithms.&rdquo; arXiv:1807.05614.{" "}
              <a
                href="https://arxiv.org/abs/1807.05614"
                className="text-[#ff7a1a] underline-offset-4 hover:underline"
                rel="noopener noreferrer"
              >
                arxiv.org/abs/1807.05614
              </a>
            </li>
            <li>
              pgvector GitHub.{" "}
              <a
                href="https://github.com/pgvector/pgvector"
                className="text-[#ff7a1a] underline-offset-4 hover:underline"
                rel="noopener noreferrer"
              >
                github.com/pgvector/pgvector
              </a>
            </li>
            <li>
              CNCF Milvus graduation announcement.{" "}
              <a
                href="https://www.cncf.io/announcements/2024/06/25/cloud-native-computing-foundation-announces-milvus-graduation/"
                className="text-[#ff7a1a] underline-offset-4 hover:underline"
                rel="noopener noreferrer"
              >
                cncf.io/announcements/2024/06/25
              </a>
            </li>
          </ul>
        </section>

        <footer className="border-t border-[#1a1a1a] pt-6 text-xs text-[#6a6a6a]">
          <p>
            Published by{" "}
            <a href="https://atomeons.com" className="hover:text-[#ff7a1a]">
              AtomEons
            </a>{" "}
            · ÆoNs Research Laboratory · Marco Island, FL
          </p>
        </footer>
      </article>
    </main>
  );
}