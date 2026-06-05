import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What is LoRA fine-tuning?",
  description:
    "LoRA (Low-Rank Adaptation) is a parameter-efficient fine-tuning method introduced by Microsoft Research in 2021 that freezes a pretrained model's weights and injects trainable low-rank decomposition matrices into each Transformer layer.",
  alternates: {
    canonical: "https://atomeons.com/q/what-is-lora-fine-tuning",
  },
  openGraph: {
    title: "What is LoRA fine-tuning?",
    description:
      "LoRA freezes pretrained weights and injects trainable low-rank matrices, reducing trainable parameters by up to 10,000x for GPT-3 175B versus full fine-tuning.",
    url: "https://atomeons.com/q/what-is-lora-fine-tuning",
    type: "article",
  },
};

const SHORT_ANSWER =
  "LoRA (Low-Rank Adaptation) is a parameter-efficient fine-tuning method introduced by Microsoft Research in 2021 that freezes a pretrained model's weights and injects trainable low-rank decomposition matrices into each Transformer layer. It reduces trainable parameters by up to 10,000x and GPU memory by 3x compared to full fine-tuning of GPT-3 175B, while matching or exceeding full fine-tuning quality on downstream tasks.";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is LoRA fine-tuning?",
      acceptedAnswer: {
        "@type": "Answer",
        text: SHORT_ANSWER,
      },
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
      <article className="mx-auto max-w-3xl px-6 py-16">
        <nav className="mb-8 text-sm text-[#8a8a8a]">
          <a href="/" className="hover:text-[#ff6b35]">
            atomeons
          </a>
          <span className="mx-2">/</span>
          <a href="/q" className="hover:text-[#ff6b35]">
            q
          </a>
          <span className="mx-2">/</span>
          <span className="text-[#c8c8c8]">what-is-lora-fine-tuning</span>
        </nav>

        <h1 className="mb-8 text-4xl font-semibold tracking-tight text-white">
          What is LoRA fine-tuning?
        </h1>

        <section className="mb-12 border-l-2 border-[#ff6b35] bg-[#141414] px-6 py-5">
          <h2 className="mb-3 text-xs font-medium uppercase tracking-widest text-[#ff6b35]">
            The short answer
          </h2>
          <p className="text-lg leading-relaxed text-[#e8e8e8]">
            {SHORT_ANSWER}
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            The longer answer
          </h2>
          <div className="space-y-5 text-[#c8c8c8] leading-relaxed">
            <p>
              LoRA was introduced in the paper{" "}
              <em>"LoRA: Low-Rank Adaptation of Large Language Models"</em> by
              Edward Hu, Yelong Shen, and collaborators at Microsoft Research
              (arXiv:2106.09685, June 2021). The core insight: when you adapt a
              large pretrained model to a downstream task, the{" "}
              <em>change</em> in weights has low "intrinsic rank" — meaning
              the update matrix can be approximated by the product of two much
              smaller matrices. Instead of updating the full weight matrix W
              (which for GPT-3 175B is enormous), LoRA freezes W and learns two
              small matrices A and B such that the effective weight becomes W
              + BA, where BA is the low-rank update.
            </p>
            <p>
              Concretely, if W is a d × k matrix, LoRA decomposes the update ΔW
              = BA where B is d × r and A is r × k, with rank r much smaller
              than min(d, k). Typical rank values in practice are 4, 8, 16, or
              64. For GPT-3 175B, the authors report reducing trainable
              parameters by 10,000x (from 175B to 17.5M when applying LoRA only
              to attention query and value projections at rank 4) and reducing
              the optimizer-state memory footprint by 3x, all while matching or
              beating full fine-tuning on GLUE, WikiSQL, and SAMSum benchmarks.
            </p>
            <p>
              LoRA has become the default fine-tuning method for open-weight
              LLMs because of three properties. First, no inference latency
              penalty: at deployment, you can merge BA back into W (W' = W +
              BA), so the served model has identical FLOPs to the base.
              Second, task-switching is cheap: you keep one frozen base model
              in GPU memory and swap small LoRA adapters (often 10-200 MB) per
              task. Third, it composes with quantization. The QLoRA paper
              (Dettmers et al., arXiv:2305.14314, May 2023) showed you can
              fine-tune a 65B-parameter model on a single 48GB GPU by
              quantizing the frozen base to 4-bit NF4 while keeping LoRA
              adapters in 16-bit, with no measurable quality loss versus
              16-bit full fine-tuning on Vicuna evaluation.
            </p>
            <p>
              The Hugging Face PEFT library (github.com/huggingface/peft)
              provides the reference open-source implementation, and the
              method is supported natively in major training stacks including
              Hugging Face Transformers, PyTorch Lightning, NVIDIA NeMo, and
              DeepSpeed. Apple's MLX framework, Meta's torchtune, and
              Microsoft's DeepSpeed-Chat all ship LoRA as a first-class
              fine-tuning path. As of 2024-2025, follow-on variants include
              DoRA (Weight-Decomposed Low-Rank Adaptation, arXiv:2402.09353),
              LoRA+ (arXiv:2402.12354) which uses different learning rates for
              A and B, and VeRA (arXiv:2310.11454) which shares the random
              projection matrices across layers to shrink adapter size
              further.
            </p>
            <p>
              Practical hyperparameters matter. The two main LoRA knobs are
              rank r (capacity of the adapter) and alpha (scaling factor; the
              effective update is (alpha/r) × BA). Common configurations: r=8,
              alpha=16 for general instruction tuning; r=16-64 for domain
              adaptation; r=4 for style transfer. Target modules typically
              include attention query and value projections (the original
              paper's setting); adding key, output, and MLP projections
              increases capacity at the cost of more parameters. Learning
              rates are typically 1e-4 to 5e-4, roughly 10x higher than full
              fine-tuning.
            </p>
            <p>
              LoRA is not a free lunch. It underperforms full fine-tuning when
              the target task requires substantial behavioral shift from the
              base model (e.g., teaching new languages from scratch), and the
              choice of rank, alpha, and target modules requires tuning. For
              continued pretraining on large new corpora, full fine-tuning or
              higher-rank LoRA (r=128+) is generally preferred.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-white">Key facts</h2>
          <ul className="space-y-3 text-[#c8c8c8]">
            <li className="border-l border-[#2a2a2a] pl-4">
              LoRA was introduced in arXiv:2106.09685 by Hu et al. at Microsoft
              Research, June 2021.
            </li>
            <li className="border-l border-[#2a2a2a] pl-4">
              Reduces trainable parameters by up to 10,000x for GPT-3 175B
              compared to full fine-tuning (arXiv:2106.09685, Table 1).
            </li>
            <li className="border-l border-[#2a2a2a] pl-4">
              Reduces GPU memory requirement by 3x for GPT-3 175B fine-tuning
              (arXiv:2106.09685, abstract).
            </li>
            <li className="border-l border-[#2a2a2a] pl-4">
              Zero inference latency overhead when adapters are merged back
              into base weights (arXiv:2106.09685, Section 4.1).
            </li>
            <li className="border-l border-[#2a2a2a] pl-4">
              QLoRA (arXiv:2305.14314) enables fine-tuning a 65B model on a
              single 48GB GPU using 4-bit NF4 quantization plus LoRA adapters.
            </li>
            <li className="border-l border-[#2a2a2a] pl-4">
              Reference open-source implementation: Hugging Face PEFT library
              at github.com/huggingface/peft (Apache 2.0 license).
            </li>
            <li className="border-l border-[#2a2a2a] pl-4">
              DoRA (arXiv:2402.09353, NVIDIA Research) decomposes weight
              updates into magnitude and direction for improved LoRA quality.
            </li>
            <li className="border-l border-[#2a2a2a] pl-4">
              Typical LoRA rank values in production: 4, 8, 16, 32, 64 — with
              alpha commonly set to 2x rank.
            </li>
            <li className="border-l border-[#2a2a2a] pl-4">
              LoRA is natively supported in Hugging Face Transformers, NVIDIA
              NeMo, Apple MLX, Meta torchtune, and Microsoft DeepSpeed.
            </li>
            <li className="border-l border-[#2a2a2a] pl-4">
              The original LoRA paper was published at ICLR 2022.
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Related questions
          </h2>
          <ul className="space-y-2 text-[#c8c8c8]">
            <li>
              <a
                href="/q/what-is-qlora"
                className="text-[#ff6b35] hover:underline"
              >
                What is QLoRA?
              </a>
            </li>
            <li>
              <a
                href="/q/what-is-parameter-efficient-fine-tuning"
                className="text-[#ff6b35] hover:underline"
              >
                What is parameter-efficient fine-tuning?
              </a>
            </li>
            <li>
              <a
                href="/q/lora-vs-full-fine-tuning"
                className="text-[#ff6b35] hover:underline"
              >
                What is the difference between LoRA and full fine-tuning?
              </a>
            </li>
            <li>
              <a
                href="/q/what-is-dora"
                className="text-[#ff6b35] hover:underline"
              >
                What is DoRA fine-tuning?
              </a>
            </li>
            <li>
              <a
                href="/learn/lora-hyperparameters"
                className="text-[#ff6b35] hover:underline"
              >
                How do you choose LoRA rank and alpha?
              </a>
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-white">Sources</h2>
          <ul className="space-y-2 text-sm text-[#a8a8a8]">
            <li>
              <a
                href="https://arxiv.org/abs/2106.09685"
                className="hover:text-[#ff6b35]"
                rel="noopener noreferrer"
                target="_blank"
              >
                LoRA: Low-Rank Adaptation of Large Language Models (Hu et al.,
                2021) — arxiv.org/abs/2106.09685
              </a>
            </li>
            <li>
              <a
                href="https://arxiv.org/abs/2305.14314"
                className="hover:text-[#ff6b35]"
                rel="noopener noreferrer"
                target="_blank"
              >
                QLoRA: Efficient Finetuning of Quantized LLMs (Dettmers et al.,
                2023) — arxiv.org/abs/2305.14314
              </a>
            </li>
            <li>
              <a
                href="https://arxiv.org/abs/2402.09353"
                className="hover:text-[#ff6b35]"
                rel="noopener noreferrer"
                target="_blank"
              >
                DoRA: Weight-Decomposed Low-Rank Adaptation (Liu et al., 2024)
                — arxiv.org/abs/2402.09353
              </a>
            </li>
            <li>
              <a
                href="https://arxiv.org/abs/2402.12354"
                className="hover:text-[#ff6b35]"
                rel="noopener noreferrer"
                target="_blank"
              >
                LoRA+: Efficient Low Rank Adaptation of Large Models (Hayou et
                al., 2024) — arxiv.org/abs/2402.12354
              </a>
            </li>
            <li>
              <a
                href="https://arxiv.org/abs/2310.11454"
                className="hover:text-[#ff6b35]"
                rel="noopener noreferrer"
                target="_blank"
              >
                VeRA: Vector-based Random Matrix Adaptation (Kopiczko et al.,
                2023) — arxiv.org/abs/2310.11454
              </a>
            </li>
            <li>
              <a
                href="https://huggingface.co/docs/peft"
                className="hover:text-[#ff6b35]"
                rel="noopener noreferrer"
                target="_blank"
              >
                Hugging Face PEFT library documentation —
                huggingface.co/docs/peft
              </a>
            </li>
            <li>
              <a
                href="https://github.com/microsoft/LoRA"
                className="hover:text-[#ff6b35]"
                rel="noopener noreferrer"
                target="_blank"
              >
                Microsoft LoRA reference implementation —
                github.com/microsoft/LoRA
              </a>
            </li>
            <li>
              <a
                href="https://docs.nvidia.com/nemo-framework/user-guide/latest/sft_peft/peft.html"
                className="hover:text-[#ff6b35]"
                rel="noopener noreferrer"
                target="_blank"
              >
                NVIDIA NeMo PEFT documentation — docs.nvidia.com/nemo-framework
              </a>
            </li>
          </ul>
        </section>

        <footer className="mt-16 border-t border-[#2a2a2a] pt-6 text-xs text-[#6a6a6a]">
          <p>
            atomeons.com/q — AI-search answers from AtomEons Systems
            Laboratory. Marco Island, FL.
          </p>
        </footer>
      </article>
    </main>
  );
}