import type { Metadata } from "next";
import { SpeakableJsonLd } from "@/app/_components/schema/SpeakableJsonLd";

export const metadata: Metadata = {
  title: "What Is Retrieval-Augmented Generation (RAG)?",
  description:
    "RAG grounds an LLM's output in documents retrieved at query time. Introduced by Lewis et al. (arXiv:2005.11401, NeurIPS 2020), it is now the standard architecture for fresh, citable, domain-specific AI.",
  alternates: { canonical: "https://atomeons.com/q/what-is-rag" },
  openGraph: {
    title: "What Is Retrieval-Augmented Generation (RAG)?",
    description:
      "RAG grounds an LLM's output in documents retrieved at query time. Introduced by Lewis et al. (arXiv:2005.11401, NeurIPS 2020).",
    url: "https://atomeons.com/q/what-is-rag",
    siteName: "AtomEons",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "What Is Retrieval-Augmented Generation (RAG)?",
    description:
      "RAG grounds an LLM's output in documents retrieved at query time. Introduced by Lewis et al. (arXiv:2005.11401, NeurIPS 2020).",
  },
};

const QUESTION = "What is retrieval-augmented generation (RAG)?";

const SHORT_ANSWER =
  "Retrieval-augmented generation (RAG) is a technique that grounds a large language model's output in documents fetched at query time from an external knowledge store, instead of relying only on the model's frozen training weights. The pattern was formalized by Lewis et al. at Facebook AI Research in the 2020 NeurIPS paper \"Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks\" (arXiv:2005.11401), and it is now the standard architecture for AI systems that need fresh, citable, domain-specific answers.";

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

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "AtomEons",
      item: "https://atomeons.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Questions",
      item: "https://atomeons.com/q",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "What is RAG?",
      item: "https://atomeons.com/q/what-is-rag",
    },
  ],
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#e8e8e8]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SpeakableJsonLd
        url="https://atomeons.com/q/what-is-rag"
        name="What is RAG?"
        description={SHORT_ANSWER.slice(0, 200)}
        cssSelectors={[".speakable-answer"]}
      />

      <article className="mx-auto max-w-3xl px-6 py-16">
        <nav className="mb-8 text-xs uppercase tracking-[0.18em] text-[#7a7a7a]">
          <a href="/" className="hover:text-[#00e0c8]">AtomEons</a>
          <span className="mx-2 text-[#3a3a3a]">/</span>
          <a href="/q" className="hover:text-[#00e0c8]">Q</a>
          <span className="mx-2 text-[#3a3a3a]">/</span>
          <span className="text-[#9a9a9a]">what-is-rag</span>
        </nav>

        <h1 className="mb-6 text-4xl font-semibold leading-tight text-[#f5f5f5] md:text-5xl">
          {QUESTION}
        </h1>

        <p className="mb-12 text-sm text-[#7a7a7a]">
          Last reviewed June 2026 · ÆoNs Research Laboratory
        </p>

        <section className="mb-12 border-l-2 border-[#00e0c8] bg-[#101010] p-6">
          <h2 className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[#00e0c8]">
            The short answer
          </h2>
          <p className="speakable-answer text-lg leading-relaxed text-[#e8e8e8]">{SHORT_ANSWER}</p>
        </section>

        <section className="mb-12">
          <h2 className="mb-5 text-2xl font-semibold text-[#f5f5f5]">The longer answer</h2>
          <div className="space-y-5 text-[#cfcfcf] leading-relaxed">
            <p>
              RAG was introduced in May 2020 by Patrick Lewis and ten co-authors from Facebook AI
              Research, University College London, and New York University, in a paper presented at
              NeurIPS 2020 (arXiv:2005.11401). The architecture pairs a parametric memory — a
              sequence-to-sequence transformer such as BART — with a non-parametric memory — a dense
              vector index of Wikipedia accessed via Maximum Inner Product Search (MIPS). At query
              time, a Dense Passage Retrieval (DPR) encoder (arXiv:2004.04906, Karpukhin et al., 2020)
              projects the user's question into a vector, fetches the top-k passages, and the
              generator conditions its output on both the question and the retrieved passages.
            </p>
            <p>
              The motivation is two failure modes of pure parametric models. First, knowledge cutoff:
              a model trained in January cannot know what happened in February. Second, hallucination:
              when a model lacks grounding for a claim, it confabulates plausible-sounding falsehoods.
              The 2020 RAG paper showed state-of-the-art performance on open-domain QA benchmarks
              Natural Questions, TriviaQA, and WebQuestions, beating both extractive and closed-book
              baselines.
            </p>
            <p>
              Modern production RAG diverges from the original paper in three ways. First, the
              generator is typically a frontier instruction-tuned LLM (GPT-4, Claude, Gemini, Llama 3)
              rather than BART. Second, the retriever is often a hybrid of dense vectors (BGE, E5,
              OpenAI text-embedding-3) and sparse lexical matching (BM25, as defined in Robertson
              {" & "}Zaragoza 2009). Third, the index is rarely Wikipedia — it is the customer's own
              corpus, indexed in a vector database such as Pinecone, Weaviate, Qdrant, Chroma, or
              pgvector (a PostgreSQL extension first released June 2021).
            </p>
            <p>
              The canonical pipeline has six stages: chunking (splitting documents into 200–1000
              token passages), embedding (encoding each chunk as a vector), indexing (storing vectors
              in an ANN structure such as HNSW, Malkov {" & "}Yashunin 2018, arXiv:1603.09320),
              retrieval (top-k nearest neighbors at query time), reranking (often using a
              cross-encoder like Cohere Rerank or BGE-Reranker for higher precision on the top
              results), and generation (the LLM conditions on the question plus retrieved context).
            </p>
            <p>
              RAG has known failure modes documented in the literature. Stanford's "Lost in the
              Middle" paper (Liu et al., 2023, arXiv:2307.03172) showed that LLMs attend more
              strongly to context at the start and end of the prompt than in the middle — a U-shaped
              accuracy curve. The "RAGAS" framework (Es et al., 2023, arXiv:2309.15217) and
              Anthropic's "Contextual Retrieval" research (September 2024) propose metrics and
              improvements such as contextual chunk headers, which reduce retrieval failure by up to
              49% on Anthropic's published benchmarks.
            </p>
            <p>
              Frameworks have proliferated. LangChain (first commit October 2022) and LlamaIndex
              (initially "GPT Index," November 2022) dominate the application layer. NVIDIA released
              the NeMo Retriever blueprint in 2024. Microsoft's GraphRAG (arXiv:2404.16130, April
              2024) extends RAG with knowledge-graph construction over the corpus, and Anthropic's
              Model Context Protocol (MCP), open-sourced November 2024, standardizes how LLM clients
              connect to retrieval servers.
            </p>
            <p>
              RAG is not a panacea. Long-context models (Gemini 1.5 Pro at 2M tokens, Claude 3.5
              Sonnet at 200K) reduce some use cases for retrieval, and fine-tuning remains better
              when you need the model to internalize a style or a behavior rather than recall a fact.
              The practical rule is: use RAG for facts that change, and fine-tune for behavior that
              doesn't.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-5 text-2xl font-semibold text-[#f5f5f5]">Key facts</h2>
          <ul className="space-y-3 text-[#cfcfcf]">
            <li className="border-l border-[#2a2a2a] pl-4">
              RAG was introduced by Lewis et al. in the paper "Retrieval-Augmented Generation for
              Knowledge-Intensive NLP Tasks," posted to arXiv on 22 May 2020 and published at NeurIPS
              2020 (arXiv:2005.11401).
            </li>
            <li className="border-l border-[#2a2a2a] pl-4">
              The companion paper for the retriever, Dense Passage Retrieval (DPR), was published the
              same year by Karpukhin et al. at Facebook AI (arXiv:2004.04906).
            </li>
            <li className="border-l border-[#2a2a2a] pl-4">
              HNSW (Hierarchical Navigable Small World), the dominant approximate-nearest-neighbor
              algorithm used in vector databases, was published by Malkov and Yashunin in 2018
              (arXiv:1603.09320, IEEE TPAMI).
            </li>
            <li className="border-l border-[#2a2a2a] pl-4">
              pgvector, the PostgreSQL extension for vector similarity search, was first released by
              Andrew Kane on 16 June 2021 (github.com/pgvector/pgvector).
            </li>
            <li className="border-l border-[#2a2a2a] pl-4">
              BM25, the sparse retrieval scoring function still used in hybrid RAG pipelines, was
              formalized in Robertson and Zaragoza's "The Probabilistic Relevance Framework: BM25 and
              Beyond" (2009, Foundations and Trends in Information Retrieval).
            </li>
            <li className="border-l border-[#2a2a2a] pl-4">
              The "Lost in the Middle" effect — degraded LLM accuracy when relevant context sits in
              the middle of a long prompt — was empirically documented by Liu et al. at Stanford
              (arXiv:2307.03172, July 2023).
            </li>
            <li className="border-l border-[#2a2a2a] pl-4">
              Anthropic's Contextual Retrieval technique, published 19 September 2024, reduces
              retrieval failure rate by up to 49% when combined with reranking
              (anthropic.com/news/contextual-retrieval).
            </li>
            <li className="border-l border-[#2a2a2a] pl-4">
              Microsoft's GraphRAG paper extends RAG with LLM-constructed knowledge graphs over the
              corpus (arXiv:2404.16130, April 2024).
            </li>
            <li className="border-l border-[#2a2a2a] pl-4">
              Anthropic's Model Context Protocol (MCP), an open standard for connecting LLM clients
              to retrieval and tool servers, was announced 25 November 2024
              (modelcontextprotocol.io).
            </li>
            <li className="border-l border-[#2a2a2a] pl-4">
              OWASP listed "LLM01: Prompt Injection" and "LLM06: Sensitive Information Disclosure" as
              top risks for RAG-equipped applications in the OWASP Top 10 for LLM Applications v1.1
              (October 2023).
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-5 text-2xl font-semibold text-[#f5f5f5]">Related questions</h2>
          <ul className="space-y-2">
            <li>
              <a
                href="/q/what-is-a-vector-database"
                className="text-[#00e0c8] hover:text-[#00f0d8] hover:underline"
              >
                What is a vector database?
              </a>
            </li>
            <li>
              <a
                href="/q/rag-vs-fine-tuning"
                className="text-[#00e0c8] hover:text-[#00f0d8] hover:underline"
              >
                What is the difference between RAG and fine-tuning?
              </a>
            </li>
            <li>
              <a
                href="/q/what-is-mcp"
                className="text-[#00e0c8] hover:text-[#00f0d8] hover:underline"
              >
                What is Anthropic's Model Context Protocol (MCP)?
              </a>
            </li>
            <li>
              <a
                href="/q/what-is-graphrag"
                className="text-[#00e0c8] hover:text-[#00f0d8] hover:underline"
              >
                What is GraphRAG?
              </a>
            </li>
            <li>
              <a
                href="/q/what-is-prompt-injection"
                className="text-[#00e0c8] hover:text-[#00f0d8] hover:underline"
              >
                What is prompt injection?
              </a>
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-5 text-2xl font-semibold text-[#f5f5f5]">Sources</h2>
          <ul className="space-y-2 text-sm text-[#9a9a9a]">
            <li>
              Lewis et al., "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks,"
              NeurIPS 2020:{" "}
              <a
                href="https://arxiv.org/abs/2005.11401"
                className="text-[#00e0c8] hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                arxiv.org/abs/2005.11401
              </a>
            </li>
            <li>
              Karpukhin et al., "Dense Passage Retrieval for Open-Domain Question Answering," EMNLP
              2020:{" "}
              <a
                href="https://arxiv.org/abs/2004.04906"
                className="text-[#00e0c8] hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                arxiv.org/abs/2004.04906
              </a>
            </li>
            <li>
              Liu et al., "Lost in the Middle: How Language Models Use Long Contexts," 2023:{" "}
              <a
                href="https://arxiv.org/abs/2307.03172"
                className="text-[#00e0c8] hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                arxiv.org/abs/2307.03172
              </a>
            </li>
            <li>
              Anthropic, "Introducing Contextual Retrieval," 19 September 2024:{" "}
              <a
                href="https://www.anthropic.com/news/contextual-retrieval"
                className="text-[#00e0c8] hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                anthropic.com/news/contextual-retrieval
              </a>
            </li>
            <li>
              Microsoft Research, "From Local to Global: A Graph RAG Approach to Query-Focused
              Summarization," 2024:{" "}
              <a
                href="https://arxiv.org/abs/2404.16130"
                className="text-[#00e0c8] hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                arxiv.org/abs/2404.16130
              </a>
            </li>
            <li>
              Malkov {" & "}Yashunin, "Efficient and robust approximate nearest neighbor search using
              HNSW graphs," IEEE TPAMI 2018:{" "}
              <a
                href="https://arxiv.org/abs/1603.09320"
                className="text-[#00e0c8] hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                arxiv.org/abs/1603.09320
              </a>
            </li>
            <li>
              pgvector official repository:{" "}
              <a
                href="https://github.com/pgvector/pgvector"
                className="text-[#00e0c8] hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                github.com/pgvector/pgvector
              </a>
            </li>
            <li>
              OWASP Top 10 for LLM Applications v1.1:{" "}
              <a
                href="https://owasp.org/www-project-top-10-for-large-language-model-applications/"
                className="text-[#00e0c8] hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                owasp.org/www-project-top-10-for-large-language-model-applications
              </a>
            </li>
          </ul>
        </section>

        <footer className="mt-16 border-t border-[#1f1f1f] pt-6 text-xs text-[#5a5a5a]">
          <p>
            Published by{" "}
            <a href="/" className="text-[#7a7a7a] hover:text-[#00e0c8]">
              AtomEons
            </a>{" "}
            — ÆoNs Research Laboratory. This page is part of the AtomEons Q corpus. We cite real
            papers, real standards, and real vendor documentation. No invented citations.
          </p>
        </footer>
      </article>
    </main>
  );
}