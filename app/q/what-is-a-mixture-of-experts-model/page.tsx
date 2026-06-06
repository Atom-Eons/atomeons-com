import type { Metadata } from "next";
import { SpeakableJsonLd } from "@/app/_components/schema/SpeakableJsonLd";

const QUESTION = "What is a mixture-of-experts model?";
const SHORT_ANSWER =
  "A mixture-of-experts (MoE) model is a neural network that routes each input token to a small subset of specialized sub-networks called \"experts,\" instead of running every parameter for every token. This lets models like Mixtral 8x7B and DeepSeek-V3 hold hundreds of billions of total parameters while only activating a fraction per forward pass, cutting compute cost without shrinking capacity.";
const CANONICAL = "https://atomeons.com/q/what-is-a-mixture-of-experts-model";

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
    <main className="min-h-screen bg-[#0a0a0a] text-[#e8e8e6]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(qaPageJsonLd) }}
      />
      <SpeakableJsonLd
        url="https://atomeons.com/q/what"
        name="What is What?"
        description="Voice-readable short answer plus technical context."
        cssSelectors={[".speakable-answer"]}
      />

      <article className="mx-auto max-w-3xl px-6 py-16">
        <nav className="mb-10 text-xs uppercase tracking-[0.2em] text-[#8a8a86]">
          <a href="/q" className="hover:text-[#e8e8e6]">
            /q
          </a>
          <span className="mx-2 text-[#3a3a36]">/</span>
          <span className="text-[#c0c0bc]">mixture-of-experts</span>
        </nav>

        <h1 className="mb-8 text-4xl font-semibold leading-tight tracking-tight text-[#f4f4f2] md:text-5xl">
          {QUESTION}
        </h1>

        <section className="mb-12 border-l-2 border-[#ff6a00] pl-6">
          <h2 className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[#ff6a00]">
            The short answer
          </h2>
          <p className="speakable-answer text-lg leading-relaxed text-[#e8e8e6]">
            A mixture-of-experts (MoE) model is a neural network that routes
            each input token to a small subset of specialized sub-networks
            called &ldquo;experts,&rdquo; instead of running every parameter for
            every token. This lets models like{" "}
            <strong className="text-[#f4f4f2]">Mixtral 8x7B</strong> and{" "}
            <strong className="text-[#f4f4f2]">DeepSeek-V3</strong> hold
            hundreds of billions of total parameters while only activating a
            fraction per forward pass, cutting compute cost without shrinking
            capacity.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-[#f4f4f2]">
            The longer answer
          </h2>
          <div className="space-y-5 text-base leading-relaxed text-[#d4d4d0]">
            <p>
              A mixture-of-experts (MoE) model is a conditional-computation
              architecture in which a learned <strong>gating network</strong>{" "}
              decides, per input, which of several parallel{" "}
              <strong>expert</strong> sub-networks should process that input.
              The idea predates deep learning — Jacobs, Jordan, Nowlan,
              and Hinton introduced &ldquo;Adaptive Mixtures of Local
              Experts&rdquo; in <em>Neural Computation</em> in 1991 — but
              it became the dominant scaling strategy for large language models
              after Shazeer et al.&rsquo;s &ldquo;Outrageously Large Neural
              Networks: The Sparsely-Gated Mixture-of-Experts Layer&rdquo;
              (arXiv:1701.06538, 2017), which showed an LSTM with 137 billion
              parameters could be trained on TPU clusters by activating only
              ~2 of 2048 experts per token.
            </p>
            <p>
              The mechanism is simple. A standard Transformer feed-forward layer
              is replaced by N independent feed-forward &ldquo;experts,&rdquo;
              typically 8 to 256 of them. A small gating function (usually a
              learned linear projection followed by softmax) scores the experts
              for each token, and a <strong>top-k router</strong> selects the k
              highest-scoring experts (commonly k=1 or k=2). Only those k
              experts run; their outputs are weighted by the gate scores and
              summed. Because k is much smaller than N, the{" "}
              <strong>active parameter count</strong> per token is far below
              the <strong>total parameter count</strong>. Mistral AI&rsquo;s{" "}
              <strong>Mixtral 8x7B</strong> (arXiv:2401.04088, January 2024),
              for example, has 46.7B total parameters but only 12.9B active per
              token because k=2 of 8 experts fire per layer.
            </p>
            <p>
              This sparsity is the entire point. Dense models pay for every
              parameter on every token; MoE models pay only for the experts the
              router picks, so they trade some routing overhead and memory
              footprint for a dramatically lower FLOPs-per-token cost.
              Google&rsquo;s <strong>GShard</strong> (arXiv:2006.16668, 2020)
              scaled this to a 600B-parameter translation model, and{" "}
              <strong>Switch Transformer</strong> (arXiv:2101.03961, 2021)
              showed that even k=1 routing — the simplest possible MoE
              — could pretrain 7x faster than a dense T5 baseline at
              matched compute.
            </p>
            <p>
              The hard problems in MoE are <strong>load balancing</strong> and{" "}
              <strong>routing instability</strong>. If the gate sends most
              tokens to a handful of popular experts, the others starve and
              never learn; if the routing decision is too noisy, training
              diverges. Switch Transformer introduced an{" "}
              <strong>auxiliary load-balancing loss</strong> that penalizes
              uneven expert utilization. <strong>Expert Choice Routing</strong>{" "}
              (arXiv:2202.09368, 2022) inverted the formulation — experts
              pick tokens rather than tokens picking experts — which
              guarantees balance by construction.{" "}
              <strong>DeepSeek-V3</strong> (arXiv:2412.19437, December 2024)
              pushed this further with an auxiliary-loss-free balancing scheme
              and 671B total / 37B active parameters across 256 routed experts
              plus 1 shared expert per layer.
            </p>
            <p>
              MoE has costs too. Total parameter count drives{" "}
              <strong>memory and inter-GPU communication</strong>, not just
              compute, so MoE models need high-bandwidth interconnects (NVLink,
              InfiniBand) and <strong>expert parallelism</strong> —
              sharding experts across devices — to train and serve
              efficiently. Mixtral 8x7B requires roughly 90GB of VRAM in bf16
              despite its 13B active footprint. The router is also a single
              point of failure: a poorly trained gate produces &ldquo;dead
              experts&rdquo; that never fire, wasting capacity.
            </p>
            <p>
              As of 2025–2026, MoE is the default for frontier open-weight
              models. <strong>Mixtral 8x22B</strong>,{" "}
              <strong>DeepSeek-V3</strong>, <strong>Qwen3-235B-A22B</strong>,{" "}
              <strong>Llama 4 Maverick</strong> (17B active / 400B total, 128
              experts), and <strong>Grok-1</strong> (314B total, 2 of 8 experts
              per token) are all sparse MoE Transformers. Closed models are
              widely reported to use MoE as well — GPT-4 was described as
              a 16-expert MoE in multiple credible analyses, though OpenAI has
              not officially confirmed the architecture.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-[#f4f4f2]">
            Key facts
          </h2>
          <ul className="space-y-3 text-[#d4d4d0]">
            {[
              "The original MoE formulation appeared in Jacobs, Jordan, Nowlan, and Hinton, \"Adaptive Mixtures of Local Experts,\" Neural Computation 3(1):79\u201387, 1991.",
              "The sparsely-gated MoE layer that enabled modern LLM scaling is Shazeer et al., 2017 (arXiv:1701.06538).",
              "Mixtral 8x7B has 46.7B total parameters and 12.9B active parameters per token via top-2 routing over 8 experts (arXiv:2401.04088).",
              "Switch Transformer uses top-1 routing and achieved 7x pretraining speedup over T5-Base at matched FLOPs (arXiv:2101.03961).",
              "GShard scaled MoE to 600B parameters across 2048 TPU cores for multilingual translation (arXiv:2006.16668).",
              "DeepSeek-V3 is a 671B-parameter MoE with 37B active per token, 256 routed experts, and an auxiliary-loss-free load balancing strategy (arXiv:2412.19437).",
              "The auxiliary load-balancing loss that prevents expert starvation was formalized in Switch Transformer (Fedus, Zoph, Shazeer, JMLR 2022).",
              "Expert Choice Routing inverts the gating direction so experts select tokens, guaranteeing balanced utilization (Zhou et al., arXiv:2202.09368).",
              "Llama 4 Maverick is a 400B-total / 17B-active MoE with 128 experts plus a shared expert, released April 2025 (Meta AI model card).",
              "MoE serving requires expert parallelism because total parameter count, not active count, determines memory footprint \u2014 Mixtral 8x7B needs ~90GB VRAM in bf16 (Mistral AI release notes, December 2023).",
            ].map((fact, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-[#ff6a00]" />
                <span className="text-sm leading-relaxed">{fact}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-[#f4f4f2]">
            Related questions
          </h2>
          <ul className="space-y-2">
            {[
              {
                q: "What is a transformer model?",
                href: "/q/what-is-a-transformer-model",
              },
              {
                q: "What is the difference between dense and sparse neural networks?",
                href: "/q/dense-vs-sparse-neural-networks",
              },
              {
                q: "What is top-k routing in MoE?",
                href: "/q/what-is-top-k-routing",
              },
              {
                q: "How does Mixtral 8x7B work?",
                href: "/q/how-does-mixtral-8x7b-work",
              },
              {
                q: "What are the trade-offs of MoE vs dense LLMs?",
                href: "/research/moe-vs-dense-tradeoffs",
              },
            ].map((r) => (
              <li key={r.href}>
                <a
                  href={r.href}
                  className="text-[#d4d4d0] underline decoration-[#3a3a36] underline-offset-4 transition hover:text-[#ff6a00] hover:decoration-[#ff6a00]"
                >
                  {r.q}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-[#f4f4f2]">
            Sources
          </h2>
          <ul className="space-y-2 text-sm text-[#a8a8a4]">
            {[
              {
                label:
                  "Shazeer et al., \"Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer,\" arXiv:1701.06538",
                href: "https://arxiv.org/abs/1701.06538",
              },
              {
                label:
                  "Fedus, Zoph, Shazeer, \"Switch Transformers,\" arXiv:2101.03961",
                href: "https://arxiv.org/abs/2101.03961",
              },
              {
                label:
                  "Lepikhin et al., \"GShard,\" arXiv:2006.16668",
                href: "https://arxiv.org/abs/2006.16668",
              },
              {
                label: "Jiang et al., \"Mixtral of Experts,\" arXiv:2401.04088",
                href: "https://arxiv.org/abs/2401.04088",
              },
              {
                label:
                  "DeepSeek-AI, \"DeepSeek-V3 Technical Report,\" arXiv:2412.19437",
                href: "https://arxiv.org/abs/2412.19437",
              },
              {
                label:
                  "Zhou et al., \"Mixture-of-Experts with Expert Choice Routing,\" arXiv:2202.09368",
                href: "https://arxiv.org/abs/2202.09368",
              },
              {
                label:
                  "Jacobs, Jordan, Nowlan, Hinton, \"Adaptive Mixtures of Local Experts,\" Neural Computation 3(1):79\u201387, 1991",
                href: "https://direct.mit.edu/neco/article/3/1/79/5560",
              },
              {
                label: "Mistral AI, \"Mixtral of experts\" release post",
                href: "https://mistral.ai/news/mixtral-of-experts/",
              },
            ].map((s) => (
              <li key={s.href} className="flex gap-2">
                <span className="text-[#3a3a36]">·</span>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all underline decoration-[#3a3a36] underline-offset-4 transition hover:text-[#ff6a00] hover:decoration-[#ff6a00]"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <footer className="mt-16 border-t border-[#1f1f1d] pt-6 text-xs text-[#6a6a66]">
          <p>
            atomeons.com ·{" "}
            <a href="/q" className="hover:text-[#e8e8e6]">
              browse all questions
            </a>
          </p>
        </footer>
      </article>
    </main>
  );
}