import type { Metadata } from "next";

const QUESTION = "What is an AI evaluation benchmark?";
const SHORT_ANSWER =
  "An AI evaluation benchmark is a standardized dataset plus a scoring protocol used to measure and compare the capabilities of machine learning models on a fixed task, such as MMLU for general knowledge, HumanEval for code generation, or GPQA for graduate-level science questions. Benchmarks fix the inputs, the expected outputs, and the metric (accuracy, pass@1, ELO, F1), so that different models from different labs are scored on the same yardstick. They are the primary public mechanism by which frontier labs like OpenAI, Anthropic, Google DeepMind, and Meta substantiate capability claims.";
const CANONICAL = "https://atomeons.com/q/what-is-an-evaluation-benchmark";

export const metadata: Metadata = {
  title: QUESTION,
  description:
    "An AI evaluation benchmark is a standardized dataset plus scoring protocol — MMLU, HumanEval, GPQA, SWE-bench, Chatbot Arena — used to compare model capabilities on a fixed task.",
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

const qaJsonLd = {
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
    <main className="min-h-screen bg-[#0a0a0a] text-[#e8e8e8] font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(qaJsonLd) }}
      />

      <article className="mx-auto max-w-3xl px-6 py-16">
        <nav className="mb-8 text-xs uppercase tracking-[0.18em] text-[#7a7a7a]">
          <a href="/q" className="hover:text-[#00e5ff]">
            atomeons / q
          </a>{" "}
          <span className="text-[#3a3a3a]">/</span>{" "}
          <span className="text-[#9a9a9a]">what is an evaluation benchmark</span>
        </nav>

        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
          {QUESTION}
        </h1>

        <div className="mt-10 rounded-lg border border-[#1f1f1f] bg-[#0f0f0f] p-6">
          <div className="text-[10px] uppercase tracking-[0.22em] text-[#00e5ff] mb-3">
            The short answer
          </div>
          <p className="text-lg leading-relaxed text-[#e8e8e8]">{SHORT_ANSWER}</p>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-white">The longer answer</h2>
          <div className="mt-4 space-y-5 text-[15px] leading-7 text-[#cfcfcf]">
            <p>
              An evaluation benchmark in AI is the combination of three things: a
              curated set of inputs (the test set), a set of correct or preferred
              outputs (ground truth or judge protocol), and a scoring function that
              maps model behavior to a comparable number. The pattern is older
              than deep learning — MNIST (LeCun, Cortes, Burges, 1998) and
              ImageNet (Deng et al., CVPR 2009) established the modern competitive
              form — but the term now most often refers to the LLM-era benchmarks
              that gate frontier model releases.
            </p>
            <p>
              For language models, the canonical suite includes MMLU (Hendrycks et
              al., arXiv:2009.03300), which tests 57 subjects from elementary
              mathematics to professional law; HumanEval (Chen et al.,
              arXiv:2107.03374), 164 hand-written Python problems scored by
              pass@k; GSM8K (Cobbe et al., arXiv:2110.14168), 8,500 grade-school
              math word problems; GPQA Diamond (Rein et al., arXiv:2311.12022),
              198 PhD-level science questions written to be Google-proof;
              SWE-bench (Jimenez et al., arXiv:2310.06770), real GitHub issues
              from 12 popular Python repositories; and BIG-Bench (Srivastava et
              al., arXiv:2206.04615), a collaborative 204-task suite. Multimodal
              models add MMMU (Yue et al., arXiv:2311.16502) and chart/document
              tasks like ChartQA (Masry et al., arXiv:2203.10244).
            </p>
            <p>
              Benchmarks come in two scoring regimes. Closed-form benchmarks
              (MMLU, GPQA) use exact-match against a ground-truth answer; pass@k
              benchmarks (HumanEval, SWE-bench) execute generated code against
              unit tests. A third regime — preference benchmarks — pits model
              outputs against each other and uses human or LLM judges; Chatbot
              Arena (Chiang et al., arXiv:2403.04132) uses pairwise human votes
              to compute Bradley-Terry ELO scores across more than two million
              collected comparisons.
            </p>
            <p>
              The standards layer matters. The U.S. NIST AI Risk Management
              Framework (NIST AI 100-1, January 2023) treats evaluation as a core
              function under &ldquo;Measure,&rdquo; and NIST has stood up the AI
              Safety Institute Consortium and the ARIA program (Assessing Risks
              and Impacts of AI, NIST AI 800-1) specifically to formalize
              benchmarks for safety and security properties beyond raw
              capability. The EU AI Act (Regulation 2024/1689, in force August
              2024) explicitly references model evaluation and adversarial
              testing as obligations for general-purpose AI models with systemic
              risk in Article 55.
            </p>
            <p>
              Benchmarks have known failure modes. Contamination — test items
              leaking into pretraining corpora — is the dominant one; the GPQA
              authors built the &ldquo;Diamond&rdquo; subset specifically to
              resist web-scrape contamination, and the MATH benchmark (Hendrycks
              et al., arXiv:2103.03874) has been documented as partially
              contaminated in major web crawls. Saturation is the second failure
              mode: MMLU is now above 90% for frontier models, which compresses
              the discriminating signal. The third is construct validity — Raji
              et al. (FAccT 2021, &ldquo;AI and the Everything in the Whole Wide
              World Benchmark&rdquo;) argue that a high score on a narrow test
              set is regularly over-generalized to broad capability claims it
              does not support.
            </p>
            <p>
              In practice, a modern frontier release ships with a benchmark grid
              that typically includes MMLU-Pro, GPQA Diamond, HumanEval, MATH,
              SWE-bench Verified, and a multimodal entry like MMMU, plus an Arena
              ELO. The grid is the empirical layer that buyers, regulators, and
              researchers use to triangulate whether vendor capability claims are
              real.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-white">Key facts</h2>
          <ul className="mt-4 space-y-3 text-[15px] leading-7 text-[#cfcfcf]">
            <li>
              <span className="text-[#00e5ff]">▸</span> MMLU has 15,908
              multiple-choice questions across 57 subjects, introduced by
              Hendrycks et al. in 2020 (arXiv:2009.03300).
            </li>
            <li>
              <span className="text-[#00e5ff]">▸</span> HumanEval contains 164
              hand-written Python programming problems and is scored by pass@k
              (Chen et al., arXiv:2107.03374).
            </li>
            <li>
              <span className="text-[#00e5ff]">▸</span> GSM8K has 8,500
              grade-school math word problems (7,500 train / 1,000 test) (Cobbe
              et al., arXiv:2110.14168).
            </li>
            <li>
              <span className="text-[#00e5ff]">▸</span> GPQA Diamond contains 198
              graduate-level science questions designed to be Google-proof (Rein
              et al., arXiv:2311.12022).
            </li>
            <li>
              <span className="text-[#00e5ff]">▸</span> SWE-bench draws real
              GitHub issues from 12 popular Python repositories and scores by
              unit-test pass rate (Jimenez et al., arXiv:2310.06770).
            </li>
            <li>
              <span className="text-[#00e5ff]">▸</span> Chatbot Arena has
              collected more than 2,000,000 pairwise human preference votes for
              Bradley-Terry ELO (Chiang et al., arXiv:2403.04132).
            </li>
            <li>
              <span className="text-[#00e5ff]">▸</span> The NIST AI Risk
              Management Framework (NIST AI 100-1, January 2023) treats
              evaluation under the &ldquo;Measure&rdquo; core function.
            </li>
            <li>
              <span className="text-[#00e5ff]">▸</span> The EU AI Act (Regulation
              2024/1689) requires model evaluation and adversarial testing for
              general-purpose AI with systemic risk under Article 55.
            </li>
            <li>
              <span className="text-[#00e5ff]">▸</span> ImageNet contains over
              14,000,000 hand-annotated images across more than 20,000 categories
              (Deng et al., CVPR 2009).
            </li>
            <li>
              <span className="text-[#00e5ff]">▸</span> BIG-Bench is a
              collaborative 204-task benchmark from 444 authors across 132
              institutions (Srivastava et al., arXiv:2206.04615).
            </li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-white">Related questions</h2>
          <ul className="mt-4 space-y-2 text-[15px] text-[#cfcfcf]">
            <li>
              <a
                href="/q/what-is-mmlu"
                className="text-[#00e5ff] hover:underline underline-offset-4"
              >
                What is MMLU?
              </a>
            </li>
            <li>
              <a
                href="/q/what-is-humaneval"
                className="text-[#00e5ff] hover:underline underline-offset-4"
              >
                What is HumanEval?
              </a>
            </li>
            <li>
              <a
                href="/q/what-is-benchmark-contamination"
                className="text-[#00e5ff] hover:underline underline-offset-4"
              >
                What is benchmark contamination in LLMs?
              </a>
            </li>
            <li>
              <a
                href="/q/what-is-nist-ai-rmf"
                className="text-[#00e5ff] hover:underline underline-offset-4"
              >
                What is the NIST AI Risk Management Framework?
              </a>
            </li>
            <li>
              <a
                href="/q/what-is-chatbot-arena-elo"
                className="text-[#00e5ff] hover:underline underline-offset-4"
              >
                What is Chatbot Arena ELO?
              </a>
            </li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-white">Sources</h2>
          <ul className="mt-4 space-y-2 text-[14px] text-[#a8a8a8]">
            <li>
              <a
                href="https://arxiv.org/abs/2009.03300"
                className="hover:text-[#00e5ff]"
                rel="noopener noreferrer"
              >
                MMLU paper — arxiv.org/abs/2009.03300
              </a>
            </li>
            <li>
              <a
                href="https://arxiv.org/abs/2107.03374"
                className="hover:text-[#00e5ff]"
                rel="noopener noreferrer"
              >
                HumanEval / Codex paper — arxiv.org/abs/2107.03374
              </a>
            </li>
            <li>
              <a
                href="https://arxiv.org/abs/2311.12022"
                className="hover:text-[#00e5ff]"
                rel="noopener noreferrer"
              >
                GPQA paper — arxiv.org/abs/2311.12022
              </a>
            </li>
            <li>
              <a
                href="https://arxiv.org/abs/2310.06770"
                className="hover:text-[#00e5ff]"
                rel="noopener noreferrer"
              >
                SWE-bench paper — arxiv.org/abs/2310.06770
              </a>
            </li>
            <li>
              <a
                href="https://arxiv.org/abs/2403.04132"
                className="hover:text-[#00e5ff]"
                rel="noopener noreferrer"
              >
                Chatbot Arena paper — arxiv.org/abs/2403.04132
              </a>
            </li>
            <li>
              <a
                href="https://www.nist.gov/itl/ai-risk-management-framework"
                className="hover:text-[#00e5ff]"
                rel="noopener noreferrer"
              >
                NIST AI RMF 1.0 — nist.gov/itl/ai-risk-management-framework
              </a>
            </li>
            <li>
              <a
                href="https://eur-lex.europa.eu/eli/reg/2024/1689/oj"
                className="hover:text-[#00e5ff]"
                rel="noopener noreferrer"
              >
                EU AI Act (Regulation 2024/1689) — eur-lex.europa.eu
              </a>
            </li>
            <li>
              <a
                href="https://arxiv.org/abs/2111.15366"
                className="hover:text-[#00e5ff]"
                rel="noopener noreferrer"
              >
                Raji et al., &ldquo;AI and the Everything in the Whole Wide World
                Benchmark&rdquo; — arxiv.org/abs/2111.15366
              </a>
            </li>
          </ul>
        </section>

        <footer className="mt-16 border-t border-[#1f1f1f] pt-6 text-xs text-[#6a6a6a]">
          <p>
            atomeons.com / q / what-is-an-evaluation-benchmark — part of the
            AtomEons AI research index.
          </p>
        </footer>
      </article>
    </main>
  );
}