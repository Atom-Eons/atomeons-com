import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Mechanistic Interpretability — Inside the Model · AtomEons Atlas",
  description:
    "Mechanistic interpretability is the research program of reverse-engineering trained neural networks into human-readable circuits and features. Anthropic, DeepMind, and the academic interp community use it to audit safety, find deception, and explain model behavior at the level of weights.",
  alternates: {
    canonical: "https://atomeons.com/learn/atlas/mechanistic-interpretability",
  },
  openGraph: {
    title: "Mechanistic Interpretability · AtomEons Atlas",
    description:
      "Reverse-engineering trained neural networks into circuits and features. Anthropic SAEs, induction heads, Sleeper Agents — the state of the field as of mid-2026.",
    url:
      "https://atomeons.com/learn/atlas/mechanistic-interpretability",
    type: "article",
  },
};

export default function MechanisticInterpretabilityPage() {
  return (
    <main className="bg-[#08090B] text-[#F4F4F2] antialiased">
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-4xl px-6 pt-20 pb-12 md:px-10 md:pt-28 md:pb-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#5A6068]">
            <Link href="/learn/atlas" className="hover:text-[#22F0D5] transition-colors">
              § Atlas
            </Link>
            <span className="mx-3 text-[#1F242B]">·</span>
            <span className="text-[#22F0D5]">AI safety + interpretability</span>
          </p>
          <h1
            className="mt-8 max-w-[24ch] text-balance text-[clamp(36px,6vw,72px)] font-extralight leading-[1.04] tracking-[-0.025em] text-[#F4F4F2]"
          >
            Mechanistic Interpretability — Inside the Model
          </h1>
          <p
            className="mt-8 max-w-[64ch] font-serif text-[19px] leading-[1.55] text-[#9CA3AF]"
            style={{ fontFamily: "Newsreader, Georgia, serif" }}
          >
            Reverse-engineering a trained neural network into human-readable
            circuits and features. The research program Anthropic, DeepMind, and
            a small academic community run to audit what a model is actually
            doing — at the level of weights, not just outputs.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-6 py-16 md:px-10 md:py-24">
        {/* What it is */}
        <section className="space-y-6">
          <h2 className="font-serif text-[28px] font-light leading-[1.2] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            What it is
          </h2>
          <p className="font-serif text-[18px] leading-[1.65] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Mechanistic interpretability is the attempt to explain a neural
            network the way a hardware engineer would explain a microprocessor:
            by identifying the specific circuits, components, and information
            flows that produce a given behavior. The goal is not "feature
            importance" or "saliency maps" — those are <em>behavioral</em>
            {" "}explanations. Mechanistic interpretability asks: which
            attention heads, which MLP neurons, which residual-stream
            directions, in which order, are doing the work?
          </p>
          <p className="font-serif text-[18px] leading-[1.65] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            The field was named and popularized by Chris Olah's group at Distill
            (and then OpenAI, and then Anthropic) starting around 2020. The
            premise is that neural networks are computer programs that we did
            not write, and that the discipline of reading them as programs is
            possible and necessary — for safety, for science, and for trust.
          </p>
          <p className="font-serif text-[18px] leading-[1.65] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            The unit of analysis is the <em>circuit</em>: a small subgraph of
            the network — typically a few attention heads or MLP neurons —
            that implements an identifiable computation. The "induction head"
            is the canonical example: a two-head circuit that implements
            in-context pattern-matching ("A B ... A → B") and explains a large
            fraction of in-context learning in transformer language models.
          </p>
        </section>

        {/* How it actually works */}
        <section className="mt-16 space-y-6">
          <h2 className="font-serif text-[28px] font-light leading-[1.2] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            How it actually works
          </h2>
          <p className="font-serif text-[18px] leading-[1.65] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            The basic workflow is: pick a behavior, isolate the model
            components that participate in it, intervene on those components,
            verify that the behavior changes the predicted way. The methods are
            stacked on top of each other and refined over time.
          </p>
          <p className="font-serif text-[18px] leading-[1.65] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            <em>Activation patching</em> is the workhorse. You run a model on
            two inputs that differ in some controlled way — a clean prompt and
            a corrupted prompt. You then surgically copy the activation of a
            specific component from one run into the other and measure how
            much the output changes. Components whose activations matter for
            the behavior show up as the ones that move the logits when patched.
          </p>
          <p className="font-serif text-[18px] leading-[1.65] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            <em>Sparse autoencoders</em> (SAEs) are the breakthrough of 2023–
            2025. The problem they solve: individual neurons in a trained
            transformer are <em>polysemantic</em> — each neuron fires for many
            unrelated concepts because the model is packing more features than
            it has dimensions. An SAE is a separate small network trained on
            top of a model's activations, with a hidden layer that is
            deliberately much wider than the model's residual stream but
            constrained to be sparse. After training, the SAE's hidden units
            tend to be <em>monosemantic</em> — each one fires for one
            recognizable concept (the Golden Gate Bridge, code injection, a
            specific syntactic pattern). Anthropic published the canonical
            scaling result on Claude 3 Sonnet in May 2024 (Scaling
            Monosemanticity), finding millions of interpretable features in a
            production frontier model.
          </p>
          <p className="font-serif text-[18px] leading-[1.65] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            <em>Circuit discovery</em> stitches features into computations.
            Once you have a vocabulary of features (from SAEs) and a way to
            measure causal impact (from activation patching), you can trace
            which features at layer N cause which features at layer N+1 to
            activate. The result is a circuit diagram of a specific behavior
            — for instance, the "IOI" (indirect object identification)
            circuit, which Wang et al. (Redwood Research, 2022) mapped out
            attention-head-by-attention-head in GPT-2 small.
          </p>
          <p className="font-serif text-[18px] leading-[1.65] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            <em>Steering</em> is the inverse operation: once you have a feature
            you trust, you can clamp its activation high or low at inference
            time and watch what the model does differently. Anthropic's "Golden
            Gate Claude" demo in 2024 was a steering experiment that clamped
            the Golden Gate Bridge feature, producing a version of Claude that
            related every conversation back to the bridge. The point was not
            the gimmick; it was the demonstration that the feature was real
            and causal.
          </p>
          <p className="font-serif text-[18px] leading-[1.65] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            <em>Cross-coders</em> and <em>transcoders</em> are the 2025
            generation. Where SAEs decompose a single layer's residual stream,
            cross-coders decompose the relationship between layers — capturing
            the computation, not just the representation. This is what made
            multi-layer circuit discovery tractable on real models.
          </p>
        </section>

        {/* Receipts */}
        <section className="mt-16 space-y-6">
          <h2 className="font-serif text-[28px] font-light leading-[1.2] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Receipts
          </h2>
          <ol className="space-y-4 font-serif text-[17px] leading-[1.6] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            <li className="border-l-2 border-[#22F0D5]/40 pl-5">
              Olah, Cammarata, et al., <em>Zoom In: An Introduction to
              Circuits</em>, Distill 2020 — the founding paper of the modern
              field. <span className="font-mono text-[12px] text-[#5A6068]">distill.pub/2020/circuits/zoom-in</span>
            </li>
            <li className="border-l-2 border-[#22F0D5]/40 pl-5">
              Elhage et al., <em>A Mathematical Framework for Transformer
              Circuits</em>, Anthropic 2021 — derives induction heads,
              attention-head decomposition, residual-stream view of
              transformers.
            </li>
            <li className="border-l-2 border-[#22F0D5]/40 pl-5">
              Olsson et al., <em>In-context Learning and Induction Heads</em>,
              Anthropic 2022 — establishes that induction heads explain a
              large fraction of in-context learning across model scales.
            </li>
            <li className="border-l-2 border-[#22F0D5]/40 pl-5">
              Wang, Variengien, Conmy, et al., <em>Interpretability in the
              Wild: a Circuit for IOI in GPT-2 small</em>, ICLR 2023 — the
              first fully-mapped circuit in a real LLM.
            </li>
            <li className="border-l-2 border-[#22F0D5]/40 pl-5">
              Bricken et al., <em>Towards Monosemanticity: Decomposing
              Language Models with Dictionary Learning</em>, Anthropic
              2023 — SAEs on a small one-layer model, the proof-of-concept.
            </li>
            <li className="border-l-2 border-[#22F0D5]/40 pl-5">
              Templeton et al., <em>Scaling Monosemanticity: Extracting
              Interpretable Features from Claude 3 Sonnet</em>, Anthropic
              May 2024 — millions of features in a production frontier model.
            </li>
            <li className="border-l-2 border-[#22F0D5]/40 pl-5">
              Lieberum et al., <em>Gemma Scope: Open Sparse Autoencoders
              Everywhere All at Once on Gemma 2</em>, DeepMind 2024 — open
              SAE suite released for the research community.
            </li>
            <li className="border-l-2 border-[#22F0D5]/40 pl-5">
              Hubinger et al., <em>Sleeper Agents: Training Deceptive LLMs
              that Persist Through Safety Training</em>, Anthropic 2024 —
              the motivating safety case: deception that survives RLHF.
            </li>
            <li className="border-l-2 border-[#22F0D5]/40 pl-5">
              Lindsey et al., <em>Sparse Crosscoders for Cross-Layer Features
              and Model Diffing</em>, Anthropic 2024 — the cross-layer
              decomposition that opened up multi-layer circuit discovery.
            </li>
            <li className="border-l-2 border-[#22F0D5]/40 pl-5">
              ARENA program (alignment research engineer accelerator) —
              the largest public curriculum for training new interpretability
              researchers, maintained by alignment community contributors.
              {" "}<span className="font-mono text-[12px] text-[#5A6068]">arena.education</span>
            </li>
          </ol>
        </section>

        {/* What practitioners do with it */}
        <section className="mt-16 space-y-6">
          <h2 className="font-serif text-[28px] font-light leading-[1.2] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            What practitioners do with it
          </h2>
          <p className="font-serif text-[18px] leading-[1.65] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            The day-to-day work splits into a few lanes. <em>Safety
            researchers</em> at frontier labs use interpretability to audit
            models for deception, sandbagging, and refusal-rule integrity —
            the live question being whether a model that <em>looks</em> aligned
            in outputs is also aligned at the circuit level. The Sleeper
            Agents result is the existence proof that the two can diverge.
          </p>
          <p className="font-serif text-[18px] leading-[1.65] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            <em>Capability researchers</em> use circuit findings to build
            better training techniques. Knowing that induction heads underlie
            in-context learning, for example, lets you design architectures
            and training curricula that develop those heads faster. Knowing
            that polysemantic neurons emerge under capacity pressure lets you
            train wider-and-sparser models on purpose.
          </p>
          <p className="font-serif text-[18px] leading-[1.65] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            <em>Open-source contributors</em> work with tools like Neel
            Nanda's TransformerLens (now maintained by the
            transformerlens.com community), Anthropic's circuitsvis,
            Pythia (EleutherAI's open model suite designed for
            interpretability), and the public SAE checkpoints from Gemma
            Scope and Llama-Scope. Most published interp papers will
            reproduce on a laptop GPU; that low compute floor is part of
            why this is one of the most accessible frontier research areas.
          </p>
          <p className="font-serif text-[18px] leading-[1.65] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            <em>Regulators and auditors</em> are starting to ask whether a
            frontier model deployment can be accompanied by interpretability
            evidence — the way drug approvals are accompanied by mechanistic
            understanding of the active compound, not just clinical trial
            outcomes. The EU AI Act's general-purpose AI obligations and the
            NIST AI RMF Generative AI Profile both name interpretability as a
            relevant evidence type without (yet) requiring it.
          </p>
        </section>

        {/* What it is NOT */}
        <section className="mt-16 space-y-6">
          <h2 className="font-serif text-[28px] font-light leading-[1.2] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            What it is NOT
          </h2>
          <ul className="space-y-4 font-serif text-[17px] leading-[1.6] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            <li className="border border-[#1F242B] bg-[#0F1114] p-5">
              <strong className="text-[#F4F4F2]">Not "explainable AI"
              (XAI).</strong> XAI typically means SHAP values, LIME, attention
              visualizations, or post-hoc behavioral explanations. Those tell
              you which inputs influenced an output. Mechanistic
              interpretability tells you which weights compute the function.
              Different problem, different tools.
            </li>
            <li className="border border-[#1F242B] bg-[#0F1114] p-5">
              <strong className="text-[#F4F4F2]">Not a solved
              problem.</strong> As of mid-2026, no frontier model has been
              "fully interpreted" in any meaningful sense. Anthropic's SAE
              work on Claude 3 Sonnet found millions of features and mapped
              causal relationships between many of them, but no one claims
              to have a complete circuit diagram of the model's behavior.
              The field is closer to "we can audit specific behaviors" than
              to "we know what the model is doing."
            </li>
            <li className="border border-[#1F242B] bg-[#0F1114] p-5">
              <strong className="text-[#F4F4F2]">Not a substitute for
              evaluations.</strong> Interpretability and behavioral evals
              are complementary. A model can have a clean interpretability
              audit and still fail a capability eval; it can pass evals and
              still have a deceptive circuit. Labs that take safety seriously
              run both.
            </li>
            <li className="border border-[#1F242B] bg-[#0F1114] p-5">
              <strong className="text-[#F4F4F2]">Not the same as
              probing.</strong> Linear probing — training a small classifier
              on hidden activations — tells you what information is{" "}
              <em>present</em> in a layer. Mechanistic interpretability
              tells you what information is <em>used</em>. The distinction
              matters: a probe can succeed because of a feature that the
              model itself never reads downstream.
            </li>
          </ul>
        </section>

        {/* Further reading */}
        <section className="mt-16 space-y-6">
          <h2 className="font-serif text-[28px] font-light leading-[1.2] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Further reading
          </h2>
          <ul className="space-y-3 font-serif text-[16px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            <li>
              <a href="https://transformer-circuits.pub/" target="_blank" rel="noopener noreferrer" className="text-[#22F0D5] underline decoration-[#1F242B] underline-offset-4 hover:decoration-[#22F0D5] transition-colors">
                transformer-circuits.pub
              </a>
              {" "}— Anthropic's interpretability publication venue. The
              canonical source for the SAE + cross-coder line.
            </li>
            <li>
              <a href="https://distill.pub/2020/circuits/" target="_blank" rel="noopener noreferrer" className="text-[#22F0D5] underline decoration-[#1F242B] underline-offset-4 hover:decoration-[#22F0D5] transition-colors">
                distill.pub/2020/circuits
              </a>
              {" "}— the Distill Circuits thread, Olah's group's foundational
              work on convolutional vision models.
            </li>
            <li>
              <a href="https://transformerlensorg.github.io/TransformerLens/" target="_blank" rel="noopener noreferrer" className="text-[#22F0D5] underline decoration-[#1F242B] underline-offset-4 hover:decoration-[#22F0D5] transition-colors">
                TransformerLens
              </a>
              {" "}— Neel Nanda's PyTorch library for inspecting transformer
              internals. The standard toolkit for new researchers.
            </li>
            <li>
              <a href="https://www.neelnanda.io/mechanistic-interpretability/getting-started" target="_blank" rel="noopener noreferrer" className="text-[#22F0D5] underline decoration-[#1F242B] underline-offset-4 hover:decoration-[#22F0D5] transition-colors">
                Neel Nanda — "200 Concrete Open Problems in Mechanistic
                Interpretability"
              </a>
              {" "}— the field's best guide for picking a first project.
            </li>
            <li>
              <a href="https://www.anthropic.com/research/circuits-updates-2024" target="_blank" rel="noopener noreferrer" className="text-[#22F0D5] underline decoration-[#1F242B] underline-offset-4 hover:decoration-[#22F0D5] transition-colors">
                Anthropic Circuits Updates
              </a>
              {" "}— Anthropic's monthly research notebook. Most major
              progress shows up here first.
            </li>
            <li>
              <a href="https://arena.education/" target="_blank" rel="noopener noreferrer" className="text-[#22F0D5] underline decoration-[#1F242B] underline-offset-4 hover:decoration-[#22F0D5] transition-colors">
                ARENA — Alignment Research Engineer Accelerator
              </a>
              {" "}— intensive curriculum that trains new interpretability +
              alignment researchers.
            </li>
            <li>
              <Link href="/research/decoded/scaling-monosemanticity" className="text-[#22F0D5] underline decoration-[#1F242B] underline-offset-4 hover:decoration-[#22F0D5] transition-colors">
                AtomEons decoded paper · Scaling Monosemanticity
              </Link>
              {" "}— plain-English walkthrough of the Claude 3 Sonnet SAE result.
            </li>
          </ul>
        </section>

        {/* Foot rail */}
        <section className="mt-20 border-t border-[#1F242B] pt-12">
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/learn/atlas"
              className="inline-flex items-center gap-2 border border-[#1F242B] bg-[#0F1114] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#F4F4F2] transition-colors hover:border-[#22F0D5] hover:text-[#22F0D5]"
            >
              <span aria-hidden>←</span>
              <span>Back to Atlas</span>
            </Link>
            <Link
              href="/q/what-is-mechanistic-interpretability"
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9CA3AF] transition-colors hover:text-[#22F0D5]"
            >
              Short answer (Q-page) →
            </Link>
            <Link
              href="/research/decoded"
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9CA3AF] transition-colors hover:text-[#22F0D5]"
            >
              All decoded papers
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}
