import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Evals · Atlas · AtomEons",
  description: "MMLU, GPQA, SWE-bench, ARC-AGI. The benchmarks that decide which model wins the press cycle, and why most of them are already broken.",
  alternates: { canonical: "https://atomeons.com/learn/atlas/evals" },
  openGraph: {
    title: "Evals",
    description: "How frontier labs actually score the models they ship, and why every benchmark eventually breaks",
    url: "https://atomeons.com/learn/atlas/evals",
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
          <Link href="/learn/atlas" className="hover:text-[#22F0D5]">Atlas</Link>{" "}
          <span className="text-[#1A2225]">/</span> {`Evals`}
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            {`How frontier labs actually score the models they ship, and why every benchmark eventually breaks`}
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            {`Evals`}
          </h1>
          <p className="mt-8 max-w-[62ch] text-[17px] leading-[1.65] text-[#C8CCCE]">
            {`MMLU, GPQA, SWE-bench, ARC-AGI. The benchmarks that decide which model wins the press cycle, and why most of them are already broken.`}
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
              {`The famous benchmarks and what they actually measure`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`**MMLU** (Massive Multitask Language Understanding), released by Dan Hendrycks and collaborators at Berkeley in 2020, is the granddaddy. It is a multiple-choice exam — 57 subjects from US history to college physics to professional law — assembled from real textbooks and standardized tests. For five years it was the headline number on every model card. GPT-4 hit 86%. Claude 3.5 Sonnet hit 88%. By 2024 the top models were within a point of each other, all clustered near human-expert ceiling. The benchmark had saturated. There was nothing left to measure.

**GPQA-Diamond** (Graduate-level Physics, Chemistry, and Biology Questions), released by David Rein and the NYU team in 2023, was built specifically to be MMLU's replacement. The questions are written by PhDs, in their own field, designed to be unsearchable on Google. The "Diamond" subset is the questions that other domain PhDs *outside* the question's specialty cannot solve even with internet access. For about eighteen months this was the new frontier marker. It is now also saturating.

**HumanEval** and **MBPP** (Mostly Basic Python Problems) are coding benchmarks. HumanEval, released by OpenAI in 2021 alongside Codex, is 164 hand-written Python problems with unit tests. A model writes a function, the test suite runs, you count pass rate. It was useful for about two years and is now considered solved — and contaminated, since the problems have appeared in training data so many times that high scores no longer mean general programming ability.

**SWE-bench**, from Princeton's Carlos Jimenez and team in 2024, was the response. It scrapes real bug-fix pull requests from real GitHub repositories (Django, scikit-learn, sympy, others) and asks the model to produce a patch that passes the same test suite the human maintainer's patch passed. Anthropic's Claude lineage and OpenAI's o-series have driven SWE-bench Verified from under 5% to over 70% in roughly eighteen months. It is the benchmark most directly correlated with actual agentic coding utility — and the one most actively being gamed.

**BBH** (Big-Bench Hard) is a 23-task subset of the much larger BIG-bench (Beyond the Imitation Game) released by Google and 442 collaborators in 2022. BBH isolates the tasks where models still failed. Like the others, it has been mostly conquered.`}
            </div>
          </article>

          <article key={1}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`02`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`The eval frameworks: how the sausage is made`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`There are two infrastructures that almost every public eval in 2026 runs on.

**lm-evaluation-harness** is EleutherAI's open-source framework. If you read a model card from any open-weights lab — Meta's Llama team, Mistral, Qwen, DeepSeek — and you see MMLU or BBH scores, they were almost certainly generated by lm-eval-harness. EleutherAI maintains it as a public good and it has become the de facto standard for reproducibility.

**HELM** (Holistic Evaluation of Language Models), from Stanford's CRFM under Percy Liang, is the academic counterweight. HELM emphasizes evaluating across many axes simultaneously — accuracy, calibration, robustness, fairness, bias, toxicity, efficiency — rather than just headline accuracy. Frontier labs cite HELM when they want to look serious about safety. Critics note that HELM scores rarely move the press cycle.

**Inspect**, from the UK AI Safety Institute, is the newest of the three and has become the standard for evaluating frontier safety properties — autonomous replication, cyber capabilities, bioweapon uplift. The major US and UK labs all run Inspect evaluations as part of pre-deployment safety testing.`}
            </div>
          </article>

          <article key={2}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`03`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`Goodhart's law eats every benchmark`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`Charles Goodhart's 1975 dictum — "when a measure becomes a target, it ceases to be a good measure" — is the central law of AI evals. Every benchmark that becomes a headline number gets trained on, accidentally or deliberately. The mechanisms are several.

**Contamination** is the simplest. The internet contains the benchmark questions. Pre-training scrapes the internet. The model has now seen the answers. Anthropic and OpenAI publish contamination analyses with every model release, but no method catches everything — there is always the discussion-board post that paraphrases the question.

**Overfitting to the benchmark format** is subtler. If MMLU is your target, you can fine-tune on synthetic multiple-choice questions that look like MMLU without ever touching MMLU itself. The model gets better at the format, not at the underlying capability.

**Saturation** is the endgame. Once a benchmark has been the target for two years, the gap between the best model and human ceiling is smaller than the noise floor of the benchmark itself, and the score stops carrying information. This is where MMLU sits in 2026.`}
            </div>
          </article>

          <article key={3}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`04`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`The shift to held-out and adversarial evals`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`The serious labs have responded with three patterns.

**Held-out internal evals** — Anthropic, OpenAI, DeepMind, and xAI all maintain proprietary benchmarks that they do not publish and do not let the model train on. Anthropic's Frontier Red Team and OpenAI's preparedness framework each include held-out capability evals that determine deployment decisions. The numbers leak occasionally; the questions never do.

**Adversarial / human-in-the-loop evals** — instead of fixed questions, professional graders try to break the model. Scale AI, Surge, and Invisible Technologies run these at industrial scale for the frontier labs. The output is not a score against a question bank but a description of where the model failed against a human red-teamer.

**Agentic evals** — SWE-bench, WebArena, OSWorld, Cybench, GAIA. These score the model not on answering questions but on completing multi-step tasks in real environments. They are harder to contaminate because the environment changes.`}
            </div>
          </article>

          <article key={4}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`05`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`ARC-AGI: the one nobody beats`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`**ARC-AGI**, François Chollet's Abstraction and Reasoning Corpus, has been the canonical "we cannot beat this" benchmark since 2019. It is a set of visual puzzles where each puzzle has three or four training examples and the model has to infer the transformation rule and apply it to a held-out test grid. Humans score around 85%. For years frontier models scored under 10%.

OpenAI's o3 system claimed 87.5% on a subset in December 2024, but at compute costs reported around $3,400 per task and using the public training set — both criticized heavily by Chollet. ARC-AGI-2, released 2025, dropped frontier model scores back into the single digits. The Arc Prize Foundation now offers a million-dollar bounty for the first system that beats it under defined compute constraints.

ARC-AGI matters because it is one of the few benchmarks where the answer to "is this thing actually getting smarter?" is still genuinely open.`}
            </div>
          </article>

          <article key={5}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`06`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`What this means`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`Evals are not measurements. They are negotiations between the lab that built the model, the benchmark authors who designed the test, the press cycle that reports the number, and the buyers who are deciding whether to write a check. The numbers are real but their meaning is always provisional. The honest research community has moved toward held-out, adversarial, and agentic evaluation precisely because the headline benchmarks no longer separate the serious work from the spectacle.`}
            </div>
          </article>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <Link href="/learn/atlas" className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] px-5 py-2.5 text-sm text-[#9BA5A7] transition-colors hover:text-[#E7EBED]">
            ← atlas index
          </Link>
        </div>
      </section>
    </main>
  );
}
