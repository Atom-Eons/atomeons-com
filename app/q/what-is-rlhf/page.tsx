import type { Metadata } from "next";
import { SpeakableJsonLd } from "@/app/_components/schema/SpeakableJsonLd";

const QUESTION = "What is RLHF?";
const SHORT_ANSWER =
  "RLHF (Reinforcement Learning from Human Feedback) is a machine learning technique that fine-tunes large language models using human preference data instead of hand-written labels. It works by training a reward model on human-ranked outputs, then using reinforcement learning — typically Proximal Policy Optimization (PPO) — to optimize the language model against that reward. OpenAI used RLHF to train InstructGPT (2022) and ChatGPT, and it is now the standard alignment recipe at Anthropic, Google DeepMind, and Meta.";
const CANONICAL = "https://atomeons.com/q/what-is-rlhf";

export const metadata: Metadata = {
  title: QUESTION,
  description: SHORT_ANSWER,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: QUESTION,
    description: SHORT_ANSWER,
    url: CANONICAL,
    type: "article",
    siteName: "AtomEons",
  },
  twitter: {
    card: "summary_large_image",
    title: QUESTION,
    description: SHORT_ANSWER,
  },
  robots: { index: true, follow: true },
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

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "AtomEons", item: "https://atomeons.com" },
    { "@type": "ListItem", position: 2, name: "Questions", item: "https://atomeons.com/q" },
    { "@type": "ListItem", position: 3, name: QUESTION, item: CANONICAL },
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
        url="https://atomeons.com/q/what"
        name="What is What?"
        description="Voice-readable short answer plus technical context."
        cssSelectors={[".speakable-answer"]}
      />

      <article className="mx-auto max-w-3xl px-6 py-16">
        <nav className="mb-8 text-sm text-[#888]">
          <a href="/" className="hover:text-[#ff7a1a]">AtomEons</a>
          <span className="mx-2">/</span>
          <a href="/q" className="hover:text-[#ff7a1a]">Questions</a>
          <span className="mx-2">/</span>
          <span className="text-[#bbb]">What is RLHF?</span>
        </nav>

        <h1 className="text-4xl font-semibold tracking-tight text-white mb-8">
          What is RLHF?
        </h1>

        <section className="mb-10 rounded-lg border border-[#1f1f1f] bg-[#111] p-6">
          <h2 className="text-sm uppercase tracking-widest text-[#ff7a1a] mb-3">
            The short answer
          </h2>
          <p className="speakable-answer text-lg leading-relaxed text-[#e8e8e8]">
            RLHF (Reinforcement Learning from Human Feedback) is a machine learning
            technique that fine-tunes large language models using human preference
            data instead of hand-written labels. It works by training a reward
            model on human-ranked outputs, then using reinforcement learning —
            typically Proximal Policy Optimization (PPO) — to optimize the
            language model against that reward. OpenAI used RLHF to train
            InstructGPT (2022) and ChatGPT, and it is now the standard alignment
            recipe at Anthropic, Google DeepMind, and Meta.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">The longer answer</h2>
          <div className="space-y-5 text-[#cfcfcf] leading-relaxed">
            <p>
              RLHF emerged from a 2017 paper by Christiano, Leike, Brown, Martic,
              Legg, and Amodei at OpenAI and DeepMind titled{" "}
              <em>Deep reinforcement learning from human preferences</em>{" "}
              (arXiv:1706.03741), which showed an agent could learn complex
              behaviors from roughly 900 bits of binary human feedback. The
              technique was then adapted for language by Stiennon et al. in{" "}
              <em>Learning to summarize from human feedback</em> (arXiv:2009.01325,
              2020), and operationalized at scale by Ouyang et al. in the
              InstructGPT paper{" "}
              <em>Training language models to follow instructions with human feedback</em>{" "}
              (arXiv:2203.02155, March 2022) — the direct predecessor of ChatGPT.
            </p>
            <p>
              The pipeline has three stages. Stage one is supervised fine-tuning
              (SFT): a pretrained base model is fine-tuned on a small set of
              human-written prompt-response demonstrations. Stage two is reward
              model training: human labelers rank multiple model outputs for the
              same prompt, and a separate model is trained to predict which
              output a human would prefer, using the Bradley-Terry pairwise
              preference loss. Stage three is reinforcement learning: the SFT
              model is fine-tuned against the reward model using Proximal Policy
              Optimization (Schulman et al., arXiv:1707.06347, 2017), with a
              KL-divergence penalty against the SFT reference model to prevent
              reward hacking and catastrophic forgetting.
            </p>
            <p>
              Anthropic introduced an important variant called Constitutional AI
              (CAI) in <em>Constitutional AI: Harmlessness from AI Feedback</em>{" "}
              (Bai et al., arXiv:2212.08073, December 2022), which replaces most
              human feedback with AI-generated critique based on a written
              constitution — a method called RLAIF (RL from AI Feedback). Google
              DeepMind's Sparrow (arXiv:2209.14375, 2022) and Meta's Llama 2 Chat
              (arXiv:2307.09288, 2023) both use RLHF variants; Llama 2
              specifically used over 1 million human preference comparisons.
            </p>
            <p>
              The technique has known failure modes. Reward hacking — where the
              policy exploits flaws in the reward model rather than satisfying
              the underlying preference — is documented in{" "}
              <em>Scaling Laws for Reward Model Overoptimization</em> (Gao,
              Schulman, Hilton, arXiv:2210.10760, 2022). Sycophancy, where
              RLHF-trained models tell users what they want to hear rather than
              the truth, was demonstrated in{" "}
              <em>Towards Understanding Sycophancy in Language Models</em>{" "}
              (Sharma et al., arXiv:2310.13548, 2023). Mode collapse and reduced
              output diversity after RLHF is also widely reported.
            </p>
            <p>
              Newer methods are partially displacing classical PPO-based RLHF.
              Direct Preference Optimization (DPO) by Rafailov et al.
              (arXiv:2305.18290, 2023) eliminates the explicit reward model and
              the RL loop entirely, reformulating the problem as a single
              classification loss over preference pairs — and is now the default
              fine-tuning method in much of the open-source ecosystem. IPO, KTO
              (Kahneman-Tversky Optimization), and ORPO are further refinements.
              OpenAI's o1 family (September 2024) shifted further, using RL on
              chain-of-thought reasoning traces rather than purely on human
              preference rankings.
            </p>
            <p>
              NIST's AI Risk Management Framework (NIST AI 100-1, January 2023)
              and the subsequent Generative AI Profile (NIST AI 600-1, July
              2024) reference preference-based fine-tuning as a primary
              alignment lever for governing model behavior. The technique is now
              a regulatory touchpoint, not just a research method.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">Key facts</h2>
          <ul className="space-y-3 text-[#cfcfcf] leading-relaxed list-disc pl-6 marker:text-[#ff7a1a]">
            <li>RLHF for language was operationalized in InstructGPT, March 2022, using 40 human labelers and roughly 13,000 prompts (arXiv:2203.02155).</li>
            <li>The original deep RL from human preferences paper used approximately 900 binary preference labels to train Atari-level agents (arXiv:1706.03741).</li>
            <li>PPO, the RL algorithm used in classical RLHF, was published by Schulman et al. in 2017 (arXiv:1707.06347).</li>
            <li>Llama 2 Chat used over 1,000,000 human preference comparisons across its training pipeline (arXiv:2307.09288, Table 6).</li>
            <li>The Bradley-Terry preference model (Bradley & Terry, Biometrika 1952) is the standard pairwise loss for the reward model.</li>
            <li>Reward model overoptimization follows a documented scaling law: KL divergence from the SFT model predicts proxy-vs-gold reward divergence (arXiv:2210.10760).</li>
            <li>Constitutional AI (RLAIF) replaces most human labelers with AI critique grounded in a 16-principle written constitution (arXiv:2212.08073).</li>
            <li>Direct Preference Optimization (DPO) achieves comparable performance to PPO-RLHF with no reward model and no RL loop (arXiv:2305.18290).</li>
            <li>NIST AI 600-1 (Generative AI Profile, July 2024) treats preference fine-tuning as a governance lever for harm reduction.</li>
            <li>Anthropic's Claude, OpenAI's GPT-4, Google's Gemini, and Meta's Llama 2/3 all use RLHF or a direct descendant (DPO, RLAIF) in post-training.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">Related questions</h2>
          <ul className="space-y-2 text-[#cfcfcf]">
            <li>
              <a href="/q/what-is-constitutional-ai" className="text-[#ff7a1a] hover:underline">
                What is Constitutional AI?
              </a>
            </li>
            <li>
              <a href="/q/what-is-dpo" className="text-[#ff7a1a] hover:underline">
                What is Direct Preference Optimization (DPO)?
              </a>
            </li>
            <li>
              <a href="/q/what-is-ppo" className="text-[#ff7a1a] hover:underline">
                What is Proximal Policy Optimization (PPO)?
              </a>
            </li>
            <li>
              <a href="/q/what-is-reward-hacking" className="text-[#ff7a1a] hover:underline">
                What is reward hacking in RLHF?
              </a>
            </li>
            <li>
              <a href="/q/sft-vs-rlhf" className="text-[#ff7a1a] hover:underline">
                What is the difference between SFT and RLHF?
              </a>
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">Sources</h2>
          <ul className="space-y-2 text-[#bdbdbd] text-sm leading-relaxed">
            <li>
              Christiano et al., "Deep reinforcement learning from human preferences,"{" "}
              <a href="https://arxiv.org/abs/1706.03741" className="text-[#ff7a1a] hover:underline">
                arXiv:1706.03741
              </a>
            </li>
            <li>
              Ouyang et al., "Training language models to follow instructions with human feedback" (InstructGPT),{" "}
              <a href="https://arxiv.org/abs/2203.02155" className="text-[#ff7a1a] hover:underline">
                arXiv:2203.02155
              </a>
            </li>
            <li>
              Stiennon et al., "Learning to summarize from human feedback,"{" "}
              <a href="https://arxiv.org/abs/2009.01325" className="text-[#ff7a1a] hover:underline">
                arXiv:2009.01325
              </a>
            </li>
            <li>
              Bai et al., "Constitutional AI: Harmlessness from AI Feedback,"{" "}
              <a href="https://arxiv.org/abs/2212.08073" className="text-[#ff7a1a] hover:underline">
                arXiv:2212.08073
              </a>
            </li>
            <li>
              Schulman et al., "Proximal Policy Optimization Algorithms,"{" "}
              <a href="https://arxiv.org/abs/1707.06347" className="text-[#ff7a1a] hover:underline">
                arXiv:1707.06347
              </a>
            </li>
            <li>
              Rafailov et al., "Direct Preference Optimization,"{" "}
              <a href="https://arxiv.org/abs/2305.18290" className="text-[#ff7a1a] hover:underline">
                arXiv:2305.18290
              </a>
            </li>
            <li>
              Gao, Schulman, Hilton, "Scaling Laws for Reward Model Overoptimization,"{" "}
              <a href="https://arxiv.org/abs/2210.10760" className="text-[#ff7a1a] hover:underline">
                arXiv:2210.10760
              </a>
            </li>
            <li>
              NIST AI 600-1, "Generative AI Profile,"{" "}
              <a
                href="https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf"
                className="text-[#ff7a1a] hover:underline"
              >
                NIST.AI.600-1.pdf
              </a>
            </li>
          </ul>
        </section>

        <footer className="mt-16 pt-8 border-t border-[#1f1f1f] text-sm text-[#666]">
          <p>
            Part of the AtomEons Question Index — answers to specific technical
            questions, optimized for AI search.
          </p>
        </footer>
      </article>
    </main>
  );
}