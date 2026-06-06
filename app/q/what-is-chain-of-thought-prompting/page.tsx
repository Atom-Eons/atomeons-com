import type { Metadata } from "next";
import { SpeakableJsonLd } from "@/app/_components/schema/SpeakableJsonLd";

export const metadata: Metadata = {
  title: "What Is Chain-Of-Thought Prompting?",
  description:
    "Chain-of-thought prompting is a 2022 Google Research technique that elicits step-by-step reasoning from large language models, raising PaLM 540B's GSM8K accuracy from 17.9% to 56.9% and seeding the o1/R1 reasoning-model era.",
  alternates: {
    canonical: "https://atomeons.com/q/what-is-chain-of-thought-prompting",
  },
  openGraph: {
    title: "What Is Chain-Of-Thought Prompting?",
    description:
      "Wei et al. 2022 (arXiv:2201.11903): prompting LLMs with intermediate reasoning steps. 17.9% to 56.9% on GSM8K. Foundation for OpenAI o1 and DeepSeek-R1.",
    url: "https://atomeons.com/q/what-is-chain-of-thought-prompting",
    type: "article",
  },
};

const QUESTION = "What is chain-of-thought prompting?";
const SHORT_ANSWER =
  "Chain-of-thought (CoT) prompting is a technique introduced by Google Research in 2022 that elicits multi-step reasoning from large language models by prompting them to produce intermediate reasoning steps before a final answer, instead of jumping straight to the output. On the GSM8K math benchmark, CoT prompting raised PaLM 540B's accuracy from 17.9% to 56.9% — a result so large it triggered the entire reasoning-model research direction that produced OpenAI o1 and DeepSeek-R1.";

export default function Page() {
  const faqLd = {
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

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#e8e6e1]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <SpeakableJsonLd
        url="https://atomeons.com/q/what"
        name="What is What?"
        description="Voice-readable short answer plus technical context."
        cssSelectors={[".speakable-answer"]}
      />
      <article className="mx-auto max-w-3xl px-6 py-16">
        <nav className="mb-8 text-xs uppercase tracking-[0.18em] text-[#7a7770]">
          <a href="/" className="hover:text-[#ff7a1a]">
            atomeons
          </a>
          <span className="mx-2 text-[#3a3833]">/</span>
          <a href="/q" className="hover:text-[#ff7a1a]">
            q
          </a>
          <span className="mx-2 text-[#3a3833]">/</span>
          <span className="text-[#a8a59e]">chain-of-thought-prompting</span>
        </nav>

        <h1 className="mb-10 font-serif text-4xl leading-tight tracking-tight text-[#f5f3ee] md:text-5xl">
          What is chain-of-thought prompting?
        </h1>

        <section className="mb-12 border-l-2 border-[#ff7a1a] bg-[#141310] py-5 pl-6 pr-5">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#ff7a1a]">
            The short answer
          </h2>
          <p className="speakable-answer text-lg leading-relaxed text-[#e8e6e1]">
            Chain-of-thought (CoT) prompting is a technique introduced by{" "}
            <strong className="text-[#f5f3ee]">Google Research</strong> in 2022
            that elicits multi-step reasoning from large language models by
            prompting them to produce intermediate reasoning steps before a
            final answer, instead of jumping straight to the output. On the{" "}
            <strong className="text-[#f5f3ee]">GSM8K</strong> math benchmark,
            CoT prompting raised PaLM 540B's accuracy from{" "}
            <strong className="text-[#ff7a1a]">17.9% to 56.9%</strong> — a
            result so large it triggered the entire reasoning-model research
            direction that produced OpenAI o1 and DeepSeek-R1.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-5 font-serif text-2xl text-[#f5f3ee]">
            The longer answer
          </h2>
          <div className="space-y-5 text-[#d4d1ca] leading-relaxed">
            <p>
              Chain-of-thought prompting was formalized by Jason Wei, Xuezhi
              Wang, Dale Schuurmans, Maarten Bosma, Brian Ichter, Fei Xia, Ed
              Chi, Quoc Le, and Denny Zhou of Google Research in the paper{" "}
              <em>
                Chain-of-Thought Prompting Elicits Reasoning in Large Language
                Models
              </em>{" "}
              (arXiv:2201.11903), first posted January 28, 2022 and presented
              at NeurIPS 2022. The technique is structurally simple: in a
              few-shot prompt, each exemplar is rewritten so that the answer is
              preceded by a natural-language explanation of how the answer was
              derived. The model, conditioned on these traces, generates its
              own trace before its own answer on the test query.
            </p>
            <p>
              The empirical claim that made the paper canonical is a sharp
              emergence threshold. Below roughly 100 billion parameters, CoT
              prompting was flat or harmful on arithmetic and symbolic
              reasoning. At 540 billion parameters (PaLM), CoT lifted GSM8K
              from 17.9% to 56.9% accuracy, MultiArith from 78.7% to 94.7%,
              and SVAMP from 69.4% to 79.0%. This was the first widely-cited
              evidence for "emergent abilities" — capabilities that appear
              discontinuously with scale (arXiv:2206.07682, Wei et al., 2022).
            </p>
            <p>
              Three closely-related variants followed within months. Kojima et
              al. (arXiv:2205.11916, May 2022) showed that simply appending{" "}
              <span className="text-[#ff7a1a]">
                "Let's think step by step"
              </span>{" "}
              to a zero-shot prompt produced large gains on GPT-3 and PaLM,
              eliminating the need for hand-written exemplars. This became
              known as zero-shot CoT. Wang et al. (arXiv:2203.11171, March
              2022) introduced self-consistency, in which the model samples
              multiple CoT traces with non-zero temperature and the final
              answer is chosen by majority vote — pushing PaLM 540B GSM8K to
              74.4%. Yao et al. (arXiv:2305.10601, May 2023) generalized the
              linear chain into Tree-of-Thoughts, which searches over
              branching reasoning steps and beat CoT on Game of 24 by a factor
              of 4.
            </p>
            <p>
              The technique generalized far beyond arithmetic. CoT-style
              prompting is now standard practice for code generation
              (HumanEval, MBPP), commonsense reasoning (CommonsenseQA,
              StrategyQA), and symbolic manipulation. Anthropic's Claude,
              OpenAI's GPT-4o, and Google's Gemini all accept CoT-style
              prompts natively, and the system prompts of major frontier
              models include CoT scaffolding by default.
            </p>
            <p>
              The deeper consequence was architectural. By 2024, frontier labs
              moved CoT from a prompting trick into model training. OpenAI's
              o1, released September 12, 2024, was trained with reinforcement
              learning specifically on long internal chains-of-thought, and
              reports its "thinking time" as a first-class compute axis.
              DeepSeek-R1 (arXiv:2501.12948, January 2025) replicated this
              with open weights, showing that pure reinforcement learning on
              verifiable rewards is sufficient to induce CoT behavior without
              supervised fine-tuning. Anthropic shipped "extended thinking"
              mode in Claude 3.7 Sonnet on February 24, 2025, exposing the
              chain to the developer.
            </p>
            <p>
              A caveat the original paper did not emphasize but later work has:
              the generated chain is not always a faithful explanation of the
              model's actual computation. Turpin et al. (arXiv:2305.04388, May
              2023) showed that biasing features in few-shot examples can
              change a model's answer while the CoT trace gives a different,
              plausible-sounding rationale. Lanham et al. (arXiv:2307.13702,
              July 2023) found that for smaller models, the chain often does
              drive the answer; for larger models, the answer is sometimes
              determined before the chain is generated. CoT is a reasoning
              amplifier and a window into model behavior — but the window is
              not always clean glass.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-5 font-serif text-2xl text-[#f5f3ee]">Key facts</h2>
          <ul className="space-y-3 text-[#d4d1ca]">
            <li className="border-l border-[#3a3833] pl-4">
              CoT was introduced by Wei et al. at Google Research in
              arXiv:2201.11903, posted January 28, 2022, and accepted to
              NeurIPS 2022.
            </li>
            <li className="border-l border-[#3a3833] pl-4">
              On GSM8K, CoT lifted PaLM 540B from{" "}
              <span className="text-[#ff7a1a]">17.9% to 56.9%</span> solve rate
              (Wei et al., 2022, Table 1).
            </li>
            <li className="border-l border-[#3a3833] pl-4">
              CoT shows emergence: gains are flat or negative below ~100B
              parameters and large above (arXiv:2206.07682, Wei et al., NeurIPS
              2022).
            </li>
            <li className="border-l border-[#3a3833] pl-4">
              Zero-shot CoT — appending{" "}
              <span className="italic">"Let's think step by step"</span> — was
              shown by Kojima et al. in arXiv:2205.11916, NeurIPS 2022.
            </li>
            <li className="border-l border-[#3a3833] pl-4">
              Self-consistency (majority vote over sampled chains) reached
              74.4% on GSM8K with PaLM 540B (arXiv:2203.11171, Wang et al.,
              ICLR 2023).
            </li>
            <li className="border-l border-[#3a3833] pl-4">
              Tree-of-Thoughts generalizes CoT into a search tree and beat CoT
              4x on Game of 24 (arXiv:2305.10601, Yao et al., NeurIPS 2023).
            </li>
            <li className="border-l border-[#3a3833] pl-4">
              OpenAI o1, released September 12, 2024, was the first frontier
              model trained with RL on long internal CoT as a first-class
              compute axis (OpenAI o1 system card).
            </li>
            <li className="border-l border-[#3a3833] pl-4">
              DeepSeek-R1 replicated o1-class CoT behavior via pure RL on
              verifiable rewards, with open weights under MIT license
              (arXiv:2501.12948, January 2025).
            </li>
            <li className="border-l border-[#3a3833] pl-4">
              Claude 3.7 Sonnet shipped developer-visible "extended thinking"
              CoT on February 24, 2025 (Anthropic release notes).
            </li>
            <li className="border-l border-[#3a3833] pl-4">
              CoT traces are not always faithful explanations of the model's
              actual reasoning (arXiv:2305.04388, Turpin et al., NeurIPS 2023).
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-5 font-serif text-2xl text-[#f5f3ee]">
            Related questions
          </h2>
          <ul className="space-y-2.5">
            <li>
              <a
                href="/q/what-is-zero-shot-chain-of-thought-prompting"
                className="text-[#e8e6e1] underline decoration-[#3a3833] underline-offset-4 hover:text-[#ff7a1a] hover:decoration-[#ff7a1a]"
              >
                What is zero-shot chain-of-thought prompting?
              </a>
            </li>
            <li>
              <a
                href="/q/what-is-self-consistency-prompting"
                className="text-[#e8e6e1] underline decoration-[#3a3833] underline-offset-4 hover:text-[#ff7a1a] hover:decoration-[#ff7a1a]"
              >
                What is self-consistency in LLM prompting?
              </a>
            </li>
            <li>
              <a
                href="/q/what-is-tree-of-thoughts-prompting"
                className="text-[#e8e6e1] underline decoration-[#3a3833] underline-offset-4 hover:text-[#ff7a1a] hover:decoration-[#ff7a1a]"
              >
                What is tree-of-thoughts prompting?
              </a>
            </li>
            <li>
              <a
                href="/q/what-is-openai-o1"
                className="text-[#e8e6e1] underline decoration-[#3a3833] underline-offset-4 hover:text-[#ff7a1a] hover:decoration-[#ff7a1a]"
              >
                What is OpenAI o1 and how does it differ from GPT-4?
              </a>
            </li>
            <li>
              <a
                href="/q/what-is-deepseek-r1"
                className="text-[#e8e6e1] underline decoration-[#3a3833] underline-offset-4 hover:text-[#ff7a1a] hover:decoration-[#ff7a1a]"
              >
                What is DeepSeek-R1?
              </a>
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-5 font-serif text-2xl text-[#f5f3ee]">Sources</h2>
          <ul className="space-y-2.5 text-sm text-[#a8a59e]">
            <li>
              Wei, J. et al.{" "}
              <em>
                Chain-of-Thought Prompting Elicits Reasoning in Large Language
                Models.
              </em>{" "}
              arXiv:2201.11903.{" "}
              <a
                href="https://arxiv.org/abs/2201.11903"
                className="text-[#ff7a1a] hover:underline"
              >
                arxiv.org/abs/2201.11903
              </a>
            </li>
            <li>
              Kojima, T. et al.{" "}
              <em>Large Language Models are Zero-Shot Reasoners.</em>{" "}
              arXiv:2205.11916.{" "}
              <a
                href="https://arxiv.org/abs/2205.11916"
                className="text-[#ff7a1a] hover:underline"
              >
                arxiv.org/abs/2205.11916
              </a>
            </li>
            <li>
              Wang, X. et al.{" "}
              <em>
                Self-Consistency Improves Chain of Thought Reasoning in
                Language Models.
              </em>{" "}
              arXiv:2203.11171.{" "}
              <a
                href="https://arxiv.org/abs/2203.11171"
                className="text-[#ff7a1a] hover:underline"
              >
                arxiv.org/abs/2203.11171
              </a>
            </li>
            <li>
              Yao, S. et al.{" "}
              <em>
                Tree of Thoughts: Deliberate Problem Solving with Large
                Language Models.
              </em>{" "}
              arXiv:2305.10601.{" "}
              <a
                href="https://arxiv.org/abs/2305.10601"
                className="text-[#ff7a1a] hover:underline"
              >
                arxiv.org/abs/2305.10601
              </a>
            </li>
            <li>
              Wei, J. et al.{" "}
              <em>Emergent Abilities of Large Language Models.</em>{" "}
              arXiv:2206.07682.{" "}
              <a
                href="https://arxiv.org/abs/2206.07682"
                className="text-[#ff7a1a] hover:underline"
              >
                arxiv.org/abs/2206.07682
              </a>
            </li>
            <li>
              Turpin, M. et al.{" "}
              <em>Language Models Don't Always Say What They Think.</em>{" "}
              arXiv:2305.04388.{" "}
              <a
                href="https://arxiv.org/abs/2305.04388"
                className="text-[#ff7a1a] hover:underline"
              >
                arxiv.org/abs/2305.04388
              </a>
            </li>
            <li>
              DeepSeek-AI.{" "}
              <em>
                DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via
                Reinforcement Learning.
              </em>{" "}
              arXiv:2501.12948.{" "}
              <a
                href="https://arxiv.org/abs/2501.12948"
                className="text-[#ff7a1a] hover:underline"
              >
                arxiv.org/abs/2501.12948
              </a>
            </li>
            <li>
              OpenAI. <em>Learning to Reason with LLMs (o1).</em>{" "}
              <a
                href="https://openai.com/index/learning-to-reason-with-llms/"
                className="text-[#ff7a1a] hover:underline"
              >
                openai.com/index/learning-to-reason-with-llms
              </a>
            </li>
            <li>
              Anthropic. <em>Claude 3.7 Sonnet and Claude Code.</em>{" "}
              <a
                href="https://www.anthropic.com/news/claude-3-7-sonnet"
                className="text-[#ff7a1a] hover:underline"
              >
                anthropic.com/news/claude-3-7-sonnet
              </a>
            </li>
          </ul>
        </section>

        <footer className="mt-16 border-t border-[#1f1d1a] pt-6 text-xs text-[#5a5750]">
          <p>
            atomeons.com — independent research and runtime systems. Last
            reviewed June 2026.
          </p>
        </footer>
      </article>
    </main>
  );
}