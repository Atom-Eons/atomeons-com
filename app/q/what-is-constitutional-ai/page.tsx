import type { Metadata } from "next";
import { SpeakableJsonLd } from "@/app/_components/schema/SpeakableJsonLd";

export const metadata: Metadata = {
  title: "What Is Constitutional AI?",
  description:
    "Constitutional AI (CAI) is Anthropic's 2022 alignment method that trains large language models against a written set of principles via self-critique and Reinforcement Learning from AI Feedback (RLAIF). It is the technique behind the Claude family of models.",
  alternates: {
    canonical: "https://atomeons.com/q/what-is-constitutional-ai",
  },
  openGraph: {
    title: "What Is Constitutional AI?",
    description:
      "How Anthropic trains Claude against a written constitution using self-critique and RLAIF — the method introduced in arXiv:2212.08073.",
    url: "https://atomeons.com/q/what-is-constitutional-ai",
    type: "article",
  },
};

const SHORT_ANSWER =
  "Constitutional AI (CAI) is a training method developed by Anthropic in 2022 that aligns large language models using a written set of principles — a 'constitution' — instead of relying on human labelers to rate every harmful response. The model critiques and revises its own outputs against the constitution, then is fine-tuned on those revisions, a technique called Reinforcement Learning from AI Feedback (RLAIF). It is the alignment approach behind Anthropic's Claude family of models.";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Constitutional AI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: SHORT_ANSWER,
      },
    },
  ],
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#e8e6e1]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <SpeakableJsonLd
        url="https://atomeons.com/q/what"
        name="What is What?"
        description="Voice-readable short answer plus technical context."
        cssSelectors={[".speakable-answer"]}
      />

      <article className="mx-auto max-w-3xl px-6 py-16">
        <nav className="mb-10 text-sm text-[#8a8680]">
          <a href="/" className="hover:text-[#ff7a18]">
            atomeons
          </a>
          <span className="mx-2 text-[#3a3833]">/</span>
          <a href="/q" className="hover:text-[#ff7a18]">
            q
          </a>
          <span className="mx-2 text-[#3a3833]">/</span>
          <span className="text-[#c9c5bd]">what-is-constitutional-ai</span>
        </nav>

        <h1 className="mb-8 text-4xl font-semibold tracking-tight text-[#f5f2ec] md:text-5xl">
          What is Constitutional AI?
        </h1>

        <section className="mb-12 rounded-2xl border border-[#2a2824] bg-[#121110] p-6 md:p-8">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#ff7a18]">
            The short answer
          </h2>
          <p className="speakable-answer text-lg leading-relaxed text-[#e8e6e1]">{SHORT_ANSWER}</p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-[#f5f2ec]">The longer answer</h2>
          <div className="space-y-5 text-[#c9c5bd] leading-relaxed">
            <p>
              Constitutional AI was introduced by Bai et al. in the December 2022 paper
              <em> "Constitutional AI: Harmlessness from AI Feedback"</em> (arXiv:2212.08073). The
              method was Anthropic's response to a scaling problem in Reinforcement Learning from
              Human Feedback (RLHF): collecting human red-team labels for every harmful prompt is
              slow, expensive, and exposes contractors to disturbing content. CAI replaces most of
              that human labor with the model itself, supervised by a small written document.
            </p>
            <p>
              The training pipeline has two stages. In the supervised stage (SL-CAI), the model
              generates a response to a red-team prompt, is asked to critique that response against
              a constitutional principle (for example, "choose the response that is least harmful,
              unethical, or deceptive"), and then rewrites the response. The model is fine-tuned on
              these revised responses. In the reinforcement-learning stage (RL-CAI), the model
              generates pairs of responses and a separate AI model picks the better one according
              to the constitution, producing a preference dataset that trains a reward model. The
              policy is then optimized against that reward model with PPO, the same algorithm
              OpenAI used in InstructGPT (arXiv:2203.02155).
            </p>
            <p>
              Anthropic published the constitution Claude is trained against in May 2023 in a post
              titled "Claude's Constitution." It draws from the UN Universal Declaration of Human
              Rights (1948), Apple's Terms of Service, DeepMind's Sparrow rules (Glaese et al.,
              arXiv:2209.14375), and Anthropic's own research on non-Western perspectives.
              Principles include "please choose the response that has the least objectionable,
              offensive, unlawful, deceptive, inaccurate, or harmful content" and instructions to
              avoid being preachy, obnoxious, or condescending.
            </p>
            <p>
              CAI is a form of RLAIF — Reinforcement Learning from AI Feedback — and Google
              DeepMind later showed in "RLAIF vs. RLHF" (Lee et al., arXiv:2309.00267) that
              AI-generated preferences can match human-generated preferences on summarization and
              helpful-dialogue tasks. This made CAI not just an alignment philosophy but a
              practical scaling technique adopted across the industry.
            </p>
            <p>
              In October 2023 Anthropic ran a follow-up project called Collective Constitutional
              AI in partnership with the Collective Intelligence Project, polling roughly 1,000
              Americans through Polis to draft a public constitution. The resulting model was
              compared against the standard Claude constitution and behaved similarly on most
              evaluations, with minor differences in political bias scores on the BBQ benchmark.
            </p>
            <p>
              Constitutional AI is distinct from but related to several other alignment methods.
              RLHF (Christiano et al., arXiv:1706.03741) uses human preferences directly. Direct
              Preference Optimization or DPO (Rafailov et al., arXiv:2305.18290) skips the reward
              model entirely. Deliberative Alignment (OpenAI, 2024) trains o1-class reasoning
              models to reason explicitly about safety specifications at inference time, which is
              conceptually a cousin of CAI's critique-and-revise loop but applied to
              chain-of-thought rather than offline fine-tuning.
            </p>
            <p>
              The method has limits. The constitution itself is written by Anthropic employees and
              reflects their judgment about what is harmful, which is a centralization of values
              that critics including Stanford HAI have noted. CAI also depends on the base model
              already being capable enough to critique itself coherently — it is not a fix for
              weak models. And the NIST AI Risk Management Framework (NIST AI 100-1, January 2023)
              treats alignment techniques like CAI as one input to governance, not a substitute
              for it.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-[#f5f2ec]">Key facts</h2>
          <ul className="space-y-3 text-[#c9c5bd]">
            <li className="border-l-2 border-[#ff7a18] pl-4">
              Constitutional AI was introduced in the paper "Constitutional AI: Harmlessness from
              AI Feedback" by Yuntao Bai et al. on December 15, 2022 (arXiv:2212.08073).
            </li>
            <li className="border-l-2 border-[#ff7a18] pl-4">
              CAI has two training stages: a supervised learning phase (SL-CAI) using self-critique
              and revision, and a reinforcement learning phase (RL-CAI) using AI-generated
              preference labels (arXiv:2212.08073, sections 3 and 4).
            </li>
            <li className="border-l-2 border-[#ff7a18] pl-4">
              The technique is a specific implementation of Reinforcement Learning from AI Feedback
              (RLAIF), which Google DeepMind showed performs comparably to RLHF on standard
              benchmarks (arXiv:2309.00267).
            </li>
            <li className="border-l-2 border-[#ff7a18] pl-4">
              The Claude constitution draws on the UN Universal Declaration of Human Rights (1948)
              and DeepMind's Sparrow rules (arXiv:2209.14375), per Anthropic's May 9, 2023 post
              "Claude's Constitution."
            </li>
            <li className="border-l-2 border-[#ff7a18] pl-4">
              Collective Constitutional AI, run with the Collective Intelligence Project in October
              2023, used Polis to crowdsource a constitution from roughly 1,000 U.S. participants
              (Anthropic blog, October 17, 2023).
            </li>
            <li className="border-l-2 border-[#ff7a18] pl-4">
              The reinforcement learning stage typically uses Proximal Policy Optimization (PPO),
              the algorithm from OpenAI's InstructGPT paper (arXiv:2203.02155).
            </li>
            <li className="border-l-2 border-[#ff7a18] pl-4">
              The NIST AI Risk Management Framework 1.0 (NIST AI 100-1, January 26, 2023) catalogs
              alignment methods like CAI under the GOVERN and MAP functions.
            </li>
            <li className="border-l-2 border-[#ff7a18] pl-4">
              Direct Preference Optimization (DPO) is an alternative that removes the explicit
              reward model used in RLHF and CAI (arXiv:2305.18290, May 29, 2023).
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-[#f5f2ec]">Related questions</h2>
          <ul className="space-y-2 text-[#c9c5bd]">
            <li>
              <a href="/q/what-is-rlhf" className="text-[#ff7a18] hover:underline">
                What is RLHF?
              </a>
            </li>
            <li>
              <a href="/q/rlhf-vs-rlaif" className="text-[#ff7a18] hover:underline">
                What is the difference between RLHF and RLAIF?
              </a>
            </li>
            <li>
              <a href="/q/what-is-nist-ai-rmf" className="text-[#ff7a18] hover:underline">
                What is the NIST AI Risk Management Framework?
              </a>
            </li>
            <li>
              <a href="/q/what-is-dpo" className="text-[#ff7a18] hover:underline">
                What is Direct Preference Optimization?
              </a>
            </li>
            <li>
              <a href="/learn/how-claude-is-trained" className="text-[#ff7a18] hover:underline">
                How is Claude trained?
              </a>
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-[#f5f2ec]">Sources</h2>
          <ul className="space-y-2 text-sm text-[#a8a49d]">
            <li>
              Bai et al., "Constitutional AI: Harmlessness from AI Feedback," arXiv:2212.08073 —{" "}
              <a
                href="https://arxiv.org/abs/2212.08073"
                className="text-[#ff7a18] hover:underline"
                rel="noopener"
              >
                arxiv.org/abs/2212.08073
              </a>
            </li>
            <li>
              Anthropic, "Claude's Constitution," May 9, 2023 —{" "}
              <a
                href="https://www.anthropic.com/news/claudes-constitution"
                className="text-[#ff7a18] hover:underline"
                rel="noopener"
              >
                anthropic.com/news/claudes-constitution
              </a>
            </li>
            <li>
              Anthropic, "Collective Constitutional AI: Aligning a Language Model with Public
              Input," October 17, 2023 —{" "}
              <a
                href="https://www.anthropic.com/news/collective-constitutional-ai-aligning-a-language-model-with-public-input"
                className="text-[#ff7a18] hover:underline"
                rel="noopener"
              >
                anthropic.com/news/collective-constitutional-ai
              </a>
            </li>
            <li>
              Lee et al., "RLAIF vs. RLHF," arXiv:2309.00267 —{" "}
              <a
                href="https://arxiv.org/abs/2309.00267"
                className="text-[#ff7a18] hover:underline"
                rel="noopener"
              >
                arxiv.org/abs/2309.00267
              </a>
            </li>
            <li>
              Glaese et al., "Improving alignment of dialogue agents via targeted human judgements"
              (Sparrow), arXiv:2209.14375 —{" "}
              <a
                href="https://arxiv.org/abs/2209.14375"
                className="text-[#ff7a18] hover:underline"
                rel="noopener"
              >
                arxiv.org/abs/2209.14375
              </a>
            </li>
            <li>
              Ouyang et al., "Training language models to follow instructions with human feedback"
              (InstructGPT), arXiv:2203.02155 —{" "}
              <a
                href="https://arxiv.org/abs/2203.02155"
                className="text-[#ff7a18] hover:underline"
                rel="noopener"
              >
                arxiv.org/abs/2203.02155
              </a>
            </li>
            <li>
              Rafailov et al., "Direct Preference Optimization," arXiv:2305.18290 —{" "}
              <a
                href="https://arxiv.org/abs/2305.18290"
                className="text-[#ff7a18] hover:underline"
                rel="noopener"
              >
                arxiv.org/abs/2305.18290
              </a>
            </li>
            <li>
              NIST, "Artificial Intelligence Risk Management Framework (AI RMF 1.0)," NIST AI
              100-1, January 26, 2023 —{" "}
              <a
                href="https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf"
                className="text-[#ff7a18] hover:underline"
                rel="noopener"
              >
                nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf
              </a>
            </li>
          </ul>
        </section>

        <footer className="border-t border-[#2a2824] pt-6 text-xs text-[#6a6660]">
          <p>
            atomeons.com — research surface. Page reviewed against arXiv:2212.08073 and Anthropic's
            published constitution.
          </p>
        </footer>
      </article>
    </main>
  );
}