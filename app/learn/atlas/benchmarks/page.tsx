import type { Metadata } from "next";
import Link from "next/link";
import { LearnHeroImage } from "../../../_components/LearnHeroImage";

/**
 * /learn/atlas/benchmarks — the actual leaderboards that matter.
 *
 * Public benchmark catalogue. What each measures, what it doesn't,
 * and how to read a 2026-era LLM leaderboard skeptically.
 */

export const metadata: Metadata = {
  title: "AI benchmarks · the actual leaderboards that matter · /learn/atlas/benchmarks · AtomEons",
  description:
    "MMLU, GPQA, HumanEval, SWE-bench Verified, MMMU, AIME, BIG-bench, HELM, LMSYS Chatbot Arena, MMLU-Pro, ARC-AGI. What each measures, what it doesn't, how to read a leaderboard skeptically.",
  alternates: { canonical: "https://atomeons.com/learn/atlas/benchmarks" },
  openGraph: {
    title: "AI benchmarks · the atlas",
    description: "MMLU, GPQA, HumanEval, SWE-bench, Arena. What they measure + don't.",
    url: "https://atomeons.com/learn/atlas/benchmarks",
    type: "article",
  },
  robots: { index: true, follow: true },
};

const ACCENT = "#22F0D5";

const BENCHMARKS = [
  {
    name: "MMLU",
    full: "Massive Multitask Language Understanding",
    intro: "2020-09 · Hendrycks et al.",
    body: "57 academic subject domains, multiple-choice questions at undergraduate level (history, biology, math, philosophy, etc.). Was the field's general-knowledge benchmark of record 2020-2024. Currently saturated — frontier models score 85-92%+, often hitting the test's own error rate ceiling. Successor: MMLU-Pro.",
    what: "Breadth of academic knowledge across many disciplines.",
    not: "Reasoning, multi-step thinking, or generation quality. MMLU is recognition, not creation.",
  },
  {
    name: "MMLU-Pro",
    full: "MMLU-Pro",
    intro: "2024-06 · Wang et al. (Waterloo + Vector Institute)",
    body: "More challenging variant of MMLU with 10 answer choices instead of 4, and a deliberate emphasis on reasoning rather than recall. Frontier models score 70-80%+. Still discriminates between current top-tier models.",
    what: "Reasoning under expanded answer space. Less saturated than MMLU.",
    not: "Long-form reasoning, agentic tasks, real-world utility.",
  },
  {
    name: "GPQA Diamond",
    full: "Google-Proof Q&A Diamond split",
    intro: "2023-11 · Rein et al. (NYU + Anthropic)",
    body: "Graduate-level physics, biology, chemistry questions written by domain experts and stress-tested to be hard even for non-expert humans with web access. The 'Diamond' split is the hardest 198 questions. Mid-2026 leaders score 50-65%; humans-with-Google score ~34%. The current go-to scientific-reasoning benchmark.",
    what: "Real expert-level scientific reasoning. Resistant to lookup.",
    not: "General knowledge, creativity, or multi-modal.",
  },
  {
    name: "HumanEval + MBPP",
    full: "HumanEval / Mostly Basic Python Problems",
    intro: "2021 · Chen et al. (OpenAI) + Austin et al. (Google)",
    body: "Short Python programming tasks (1-30 lines) tested with unit tests. The original LLM code-generation benchmark. Currently very saturated (95%+ on frontier models). Useful only as a baseline floor.",
    what: "Basic Python correctness on small tasks.",
    not: "Real software engineering. Solving 164 toy problems is unrelated to building production systems.",
  },
  {
    name: "SWE-bench Verified",
    full: "SWE-bench Verified",
    intro: "2024-03 (orig) · 2024-08 (Verified) · Jimenez/Yang et al. (Princeton + Cognition)",
    body: "500 real GitHub issues from popular Python repositories, each requiring multi-file code changes to resolve. Verified subset is the 500-issue split with manually-checked test correctness. This is the canonical agentic-software-engineering benchmark. Frontier agentic systems hit ~75-85% in mid-2026.",
    what: "Real-world software engineering on actual GitHub issues with executable tests.",
    not: "Frontend, design, code quality, security. The test passing != the change being good.",
  },
  {
    name: "MMMU",
    full: "Massive Multi-discipline Multimodal Understanding",
    intro: "2023-11 · Yue et al. (CMU + Toronto + multiple)",
    body: "11,500 college-exam-level questions across 30 subjects, with images required (diagrams, charts, photos). The canonical multimodal benchmark. Frontier multimodal models score 60-75%.",
    what: "Reasoning over text + images simultaneously across diverse subjects.",
    not: "Pure-text reasoning, video, or audio understanding.",
  },
  {
    name: "AIME",
    full: "American Invitational Mathematics Examination",
    intro: "1983-present · MAA",
    body: "Real high-school-to-undergraduate math competition exam (15 questions, 3 hours, integer answers 0-999). Adopted by AI evaluators ~2023 as a hard math benchmark. The o1/o3/DeepSeek-R1 reasoning era is largely measured on AIME because it forces multi-step computation that resists shortcut-via-pattern-matching. Frontier reasoning models score 70-95%+.",
    what: "Multi-step quantitative reasoning, geometry, number theory, combinatorics.",
    not: "Open-ended problem-solving. AIME answers are integers — a constraint that allows objective scoring but is unrepresentative.",
  },
  {
    name: "LMSYS Chatbot Arena",
    full: "Chatbot Arena (lmarena.ai)",
    intro: "2023-05 · LMSYS (UC Berkeley)",
    body: "Crowdsourced pairwise human-preference voting. Two anonymous model responses to a user prompt, user picks the better one. Elo-style rating system. The most influential public ranking system. Has known biases (style favored over correctness; verbose answers favored over concise) but still the most-cited public number for 'which model do humans prefer.'",
    what: "Aggregate human preference under typical chat conditions.",
    not: "Correctness. Highly-rated models can still be wrong; verbose-but-confident wins more often than terse-but-correct.",
  },
  {
    name: "BIG-bench / HELM",
    full: "Beyond the Imitation Game + Holistic Evaluation of Language Models",
    intro: "2022 · Google/Stanford (HELM) and BIG-bench team (200+ authors)",
    body: "Comprehensive benchmark suites that aggregate dozens-to-hundreds of sub-benchmarks across reasoning, knowledge, safety, bias, fairness, robustness. More academic than practical — useful for thorough evals but harder to summarize in a single number. HELM is the active Stanford CRFM project; BIG-bench is largely retired.",
    what: "Breadth + thoroughness across many evaluation dimensions.",
    not: "Practical 'which model should I use' guidance. The summary score is too aggregated to be useful.",
  },
  {
    name: "ARC-AGI",
    full: "Abstraction and Reasoning Corpus",
    intro: "2019 · François Chollet",
    body: "Visual pattern-recognition puzzles designed to be easy for humans + hard for current ML. Chollet's argument: current systems score poorly on tasks requiring fluid abstract reasoning. ARC-AGI-2 (2025) introduced as a harder follow-up. OpenAI o3 hit 87% on ARC-AGI-1 in Dec 2024 via test-time-compute scaling. ARC Prize 2024 + 2025 are public competitions.",
    what: "Fluid abstract reasoning on novel visual patterns.",
    not: "Real-world utility. ARC tasks are deliberately weird; high scores there don't immediately transfer to practical applications.",
  },
];

const READ_SKEPTICALLY = [
  "Saturated benchmarks tell you nothing. If everyone scores 95%+, the benchmark has stopped discriminating. MMLU and HumanEval are in this state.",
  "Different benchmarks favor different model strategies. Long-context reasoning models do well on AIME + GPQA + ARC-AGI. Knowledge-dense models do well on MMLU + MMMU. Code-tuned models do well on HumanEval + SWE-bench. A single ranking number across all of these is misleading.",
  "Test set contamination is real. Many frontier models have seen most public benchmarks during pretraining. Held-out evals (FrontierMath, SWE-bench Verified) try to mitigate this, but the field knows contamination affects published numbers.",
  "Verbose models win Arena. LMSYS-style human-preference voting consistently favors longer, more confident-sounding responses — even when shorter responses are correct and verbose ones are wrong. Don't read Arena Elo as 'best model.'",
  "Real-world utility is hard to measure. SWE-bench is the closest to 'agentic real-world work,' but even it tests against unit-test passing, not code quality or maintainability. Real evaluation still requires using the model on YOUR task and judging the output.",
  "Inference-time-scaling changes economics. o1-style and R1-style models can score very well on hard benchmarks (GPQA, AIME, ARC-AGI) by using 10× more inference compute per query. The benchmark score is real but doesn't reflect the cost-per-task tradeoff.",
];

export default function AtlasBenchmarksPage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <LearnHeroImage slug="tracker-leaderboard" alt="Five identical matte-black stacked trays of varying heights — the leaderboard." />
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[11px] tracking-[0.08em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn/atlas" className="hover:text-[#22F0D5]">Atlas</Link>{" "}
          <span className="text-[#1A2225]">/</span> Benchmarks
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            Benchmarks · the atlas
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            How models actually{" "}
            <span style={{ color: ACCENT }}>get measured.</span>
          </h1>
          <p className="mt-8 max-w-[62ch] text-base leading-[1.7] text-[#C8CCCE] md:text-[17px]">
            Ten benchmarks every AI builder should be able to read skeptically. What each measures, what it doesn&apos;t measure, and how to interpret a 2026-era leaderboard without getting suckered by saturation or contamination.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24 space-y-10">
          {BENCHMARKS.map((b, i) => (
            <article key={b.name} className="border-l-2 pl-6" style={{ borderColor: ACCENT + "30" }}>
              <div className="flex flex-wrap items-baseline gap-4">
                <p className="font-mono text-[14px] tabular-nums" style={{ color: ACCENT }}>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
                  {b.name}
                </h2>
              </div>
              <p className="mt-2 text-sm text-[#FFB87A]">{b.full}</p>
              <p className="mt-1 text-sm text-[#9BA5A7]">{b.intro}</p>
              <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">{b.body}</p>
              <p className="mt-4 max-w-[62ch] text-[14px] leading-[1.65] text-[#C8CCCE]">
                <span className="font-medium text-[#22F0D5]">What it measures: </span>{b.what}
              </p>
              <p className="mt-2 max-w-[62ch] text-[14px] leading-[1.65] text-[#9BA5A7]">
                <span className="font-medium text-[#FFB87A]">What it doesn&apos;t: </span>{b.not}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-[#1A2225] bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <h2 className="text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            How to read a leaderboard skeptically.
          </h2>
          <ol className="mt-10 space-y-5">
            {READ_SKEPTICALLY.map((r, i) => (
              <li key={i} className="grid grid-cols-[2.5rem_1fr] gap-4">
                <span className="font-mono text-2xl font-bold tabular-nums" style={{ color: ACCENT }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-base leading-[1.7] text-[#C8CCCE]">{r}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/learn/atlas/scaling-laws" className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 px-5 py-2.5 text-sm font-medium text-[#22F0D5] transition-colors hover:bg-[#22F0D5]/10">
              Scaling laws →
            </Link>
            <Link href="/learn/leaderboard" className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] px-5 py-2.5 text-sm text-[#C8CCCE] transition-colors hover:border-[#22F0D5]/40 hover:text-[#22F0D5]">
              Live leaderboard tracker →
            </Link>
            <Link href="/learn/atlas" className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] px-5 py-2.5 text-sm text-[#9BA5A7] transition-colors hover:text-[#E7EBED]">
              ← atlas index
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
