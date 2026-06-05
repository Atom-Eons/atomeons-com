import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What Is Mechanistic Interpretability?",
  description:
    "Mechanistic interpretability reverse-engineers the internal circuits of neural networks — neurons, attention heads, and features — so that model behavior can be explained at the level of algorithms, not just inputs and outputs.",
  alternates: {
    canonical: "https://atomeons.com/q/what-is-mechanistic-interpretability",
  },
  openGraph: {
    title: "What Is Mechanistic Interpretability?",
    description:
      "Reverse-engineering the internal computations of neural networks: circuits, superposition, sparse autoencoders, and activation patching.",
    url: "https://atomeons.com/q/what-is-mechanistic-interpretability",
    type: "article",
  },
};

const SHORT_ANSWER =
  "Mechanistic interpretability is a subfield of AI safety research that tries to reverse-engineer the internal computations of neural networks — identifying the specific weights, neurons, attention heads, and circuits that implement a model's behavior — so that what a model does can be explained at the level of algorithms, not just inputs and outputs. The term was popularized by Chris Olah and collaborators at Anthropic and OpenAI through the 'Circuits' research program, and the dominant modern toolkit centers on sparse autoencoders (SAEs), activation patching, and circuit tracing.";

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is mechanistic interpretability?",
      acceptedAnswer: {
        "@type": "Answer",
        text: SHORT_ANSWER,
      },
    },
  ],
};

const breadcrumbLd = {
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
      name: "What is mechanistic interpretability?",
      item: "https://atomeons.com/q/what-is-mechanistic-interpretability",
    },
  ],
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-neutral-100 antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <nav className="mb-8 text-xs uppercase tracking-[0.18em] text-neutral-500">
          <a href="/" className="hover:text-cyan-300">AtomEons</a>
          <span className="mx-2 text-neutral-700">/</span>
          <a href="/q" className="hover:text-cyan-300">Questions</a>
        </nav>

        <h1 className="text-3xl md:text-5xl font-semibold leading-tight tracking-tight text-white">
          What is mechanistic interpretability?
        </h1>

        <p className="mt-3 text-sm text-neutral-500">
          Plain-English answer with citations. AtomEons Research, last reviewed June 2026.
        </p>

        <section className="mt-10 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-6 md:p-8">
          <h2 className="text-sm uppercase tracking-[0.18em] text-cyan-300">
            The short answer
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-neutral-100">
            {SHORT_ANSWER}
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold text-white">The longer answer</h2>
          <div className="mt-5 space-y-5 text-[15px] leading-7 text-neutral-300">
            <p>
              Mechanistic interpretability ("mech interp" in the field) treats a
              trained neural network the way a reverse engineer treats a compiled binary:
              as an artifact whose internal logic was not designed but can in principle be
              recovered. Instead of asking "what does this model output?" it asks
              "what algorithm is the model running, expressed in terms of its own
              parameters?"
            </p>
            <p>
              The research lineage runs through Chris Olah's Distill "Zoom In"
              essay (2020), the OpenAI/Anthropic "Circuits" thread, and Anthropic's
              "A Mathematical Framework for Transformer Circuits" (Elhage et al.,
              2021), which formalized how attention heads compose to implement small
              algorithms inside transformer models. Neel Nanda's "Progress Measures
              for Grokking via Mechanistic Interpretability" (Nanda et al., 2023,
              arXiv:2301.05217) demonstrated that a small transformer trained on modular
              addition implements a discrete Fourier-transform-plus-trig-identities
              algorithm — recovered weight-by-weight, not inferred from behavior.
            </p>
            <p>
              Three technical primitives dominate current practice. First,{" "}
              <em className="text-neutral-100">superposition</em>: Anthropic's "Toy
              Models of Superposition" (Elhage et al., 2022) showed networks pack
              more features than they have neurons by representing features as
              non-orthogonal directions in activation space. Second,{" "}
              <em className="text-neutral-100">sparse autoencoders (SAEs)</em>:
              "Towards Monosemanticity" (Bricken et al., 2023) and the
              follow-up "Scaling Monosemanticity" (Templeton et al., 2024)
              used SAEs trained on the residual stream of Claude 3 Sonnet to extract
              roughly 34 million interpretable features, including the now-famous
              "Golden Gate Bridge" feature whose clamping made the model
              obsessed with the bridge. Third,{" "}
              <em className="text-neutral-100">activation patching / path patching</em>{" "}
              (Meng et al., "Locating and Editing Factual Associations in GPT,"
              arXiv:2202.05262), which causally localizes where in the network a
              behavior is computed by swapping activations between forward passes.
            </p>
            <p>
              The field's most-cited circuit-level result is the{" "}
              <strong className="text-white">
                Indirect Object Identification (IOI) circuit
              </strong>{" "}
              in GPT-2 Small (Wang et al., "Interpretability in the Wild,"
              arXiv:2211.00593), which identified 26 attention heads across the network
              that together implement the algorithm for completing sentences like
              "When John and Mary went to the store, John gave a drink to ___"
              with "Mary." More recent work — Anthropic's "Circuit
              Tracing" (Lindsey et al., 2025) and "On the Biology of a Large
              Language Model" — extended this from toy models to production-scale
              Claude, tracing multi-step reasoning, planning, and refusal behaviors.
            </p>
            <p>
              Mech interp matters because behavioral safety evaluations cannot rule out
              deceptive or sandbagged behavior; only knowing what the model is actually
              computing can. The UK AI Safety Institute (AISI), the US AI Safety Institute
              (NIST), and the EU AI Office have all cited interpretability as a research
              priority. NIST AI 600-1 (Generative AI Profile, July 2024) names
              interpretability as a measurement-and-mitigation pillar for foundation
              models.
            </p>
            <p>
              Open problems remain large. SAEs find features but do not yet give complete
              circuits at scale. Superposition makes feature decomposition non-unique.
              Faithfulness — whether the recovered "circuit" actually causes the
              behavior versus correlates with it — requires careful causal interventions.
              And the compute cost of training SAEs on frontier models is significant;
              Anthropic reported training SAEs with up to 34M features on Claude 3 Sonnet
              residual streams.
            </p>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold text-white">Key facts</h2>
          <ul className="mt-5 space-y-3 text-[15px] leading-7 text-neutral-300">
            <li>
              The "Circuits" research program at Distill (2020-2021) established
              the modern framing; Chris Olah's "Zoom In: An Introduction to
              Circuits" (Distill, March 2020, doi:10.23915/distill.00024.001) is the
              canonical starting reference.
            </li>
            <li>
              "A Mathematical Framework for Transformer Circuits" (Elhage et al.,
              Anthropic, December 2021) formalized attention heads as composable
              read/write operations on a residual stream.
            </li>
            <li>
              "Toy Models of Superposition" (Elhage et al., 2022,
              arXiv:2209.10652) demonstrated that networks represent more features than
              they have dimensions by using non-orthogonal directions.
            </li>
            <li>
              "Towards Monosemanticity" (Bricken et al., Anthropic, October 2023)
              showed sparse autoencoders extract interpretable monosemantic features from
              a 1-layer transformer.
            </li>
            <li>
              "Scaling Monosemanticity" (Templeton et al., Anthropic, May 2024)
              scaled SAEs to Claude 3 Sonnet, extracting ~34M features including the
              "Golden Gate Bridge" feature.
            </li>
            <li>
              "Interpretability in the Wild" (Wang et al., 2022,
              arXiv:2211.00593) reverse-engineered the 26-attention-head Indirect Object
              Identification circuit in GPT-2 Small.
            </li>
            <li>
              "Locating and Editing Factual Associations in GPT" (Meng et al.,
              2022, arXiv:2202.05262) introduced causal tracing / ROME for localizing
              factual recall in MLP layers.
            </li>
            <li>
              "Progress Measures for Grokking via Mechanistic Interpretability"
              (Nanda et al., 2023, arXiv:2301.05217) recovered the modular-addition
              algorithm a transformer learns during grokking.
            </li>
            <li>
              NIST AI 600-1 (Generative AI Profile, July 2024) lists interpretability
              among recommended mitigations for generative-AI risk.
            </li>
            <li>
              The TransformerLens library (Neel Nanda, 2022) is the de facto open-source
              toolkit for activation patching and circuit analysis in transformer models.
            </li>
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold text-white">Related questions</h2>
          <ul className="mt-5 space-y-3 text-[15px] leading-7">
            <li>
              <a
                href="/q/what-is-a-sparse-autoencoder"
                className="text-cyan-300 hover:text-cyan-200 hover:underline"
              >
                What is a sparse autoencoder?
              </a>
            </li>
            <li>
              <a
                href="/q/what-is-superposition-in-neural-networks"
                className="text-cyan-300 hover:text-cyan-200 hover:underline"
              >
                What is superposition in neural networks?
              </a>
            </li>
            <li>
              <a
                href="/q/what-is-activation-patching"
                className="text-cyan-300 hover:text-cyan-200 hover:underline"
              >
                What is activation patching?
              </a>
            </li>
            <li>
              <a
                href="/q/interpretability-vs-explainability"
                className="text-cyan-300 hover:text-cyan-200 hover:underline"
              >
                What is the difference between interpretability and explainability?
              </a>
            </li>
            <li>
              <a
                href="/q/what-is-ai-alignment"
                className="text-cyan-300 hover:text-cyan-200 hover:underline"
              >
                What is AI alignment?
              </a>
            </li>
          </ul>
        </section>

        <section className="mt-14 border-t border-neutral-800 pt-10">
          <h2 className="text-2xl font-semibold text-white">Sources</h2>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-neutral-400">
            <li>
              Olah et al., "Zoom In: An Introduction to Circuits," Distill, 2020.{" "}
              <a
                href="https://distill.pub/2020/circuits/zoom-in/"
                className="text-cyan-300 hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                distill.pub/2020/circuits/zoom-in
              </a>
            </li>
            <li>
              Elhage et al., "A Mathematical Framework for Transformer Circuits,"
              Anthropic, 2021.{" "}
              <a
                href="https://transformer-circuits.pub/2021/framework/index.html"
                className="text-cyan-300 hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                transformer-circuits.pub/2021/framework
              </a>
            </li>
            <li>
              Elhage et al., "Toy Models of Superposition," arXiv:2209.10652,
              2022.{" "}
              <a
                href="https://arxiv.org/abs/2209.10652"
                className="text-cyan-300 hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                arxiv.org/abs/2209.10652
              </a>
            </li>
            <li>
              Bricken et al., "Towards Monosemanticity," Anthropic, 2023.{" "}
              <a
                href="https://transformer-circuits.pub/2023/monosemantic-features/"
                className="text-cyan-300 hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                transformer-circuits.pub/2023/monosemantic-features
              </a>
            </li>
            <li>
              Templeton et al., "Scaling Monosemanticity," Anthropic, 2024.{" "}
              <a
                href="https://transformer-circuits.pub/2024/scaling-monosemanticity/"
                className="text-cyan-300 hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                transformer-circuits.pub/2024/scaling-monosemanticity
              </a>
            </li>
            <li>
              Wang et al., "Interpretability in the Wild: A Circuit for Indirect
              Object Identification in GPT-2 Small," arXiv:2211.00593, 2022.{" "}
              <a
                href="https://arxiv.org/abs/2211.00593"
                className="text-cyan-300 hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                arxiv.org/abs/2211.00593
              </a>
            </li>
            <li>
              Meng et al., "Locating and Editing Factual Associations in GPT,"
              arXiv:2202.05262, 2022.{" "}
              <a
                href="https://arxiv.org/abs/2202.05262"
                className="text-cyan-300 hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                arxiv.org/abs/2202.05262
              </a>
            </li>
            <li>
              NIST AI 600-1, "Artificial Intelligence Risk Management Framework:
              Generative AI Profile," July 2024.{" "}
              <a
                href="https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf"
                className="text-cyan-300 hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf
              </a>
            </li>
          </ul>
        </section>

        <footer className="mt-16 border-t border-neutral-800 pt-8 text-xs text-neutral-500">
          <p>
            AtomEons Research Laboratory · Marco Island, FL · No invented citations.
            Last reviewed June 2026.
          </p>
        </footer>
      </article>
    </main>
  );
}