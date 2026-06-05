import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Flamingo: a frozen vision encoder, a frozen LLM, and a thin bridge — Decoded | AtomEons Research",
  description:
    "A senior practitioner's plain-English decode of Alayrac et al's Flamingo (NeurIPS 2022). What the paper actually shows, why it matters, what it does not claim.",
  openGraph: {
    title:
      "Flamingo: A Visual Language Model for Few-Shot Learning — Decoded",
    description:
      "AtomEons Research decodes the 2022 Flamingo paper that defined how modern visual language models bolt vision encoders to large language models.",
    type: "article",
  },
};

const palette = {
  bg: "#08090B",
  cream: "#F4F4F2",
  graphite: "#9CA3AF",
  hair: "#1F242B",
  cyan: "#22F0D5",
} as const;

const bodyFont =
  '"Newsreader", "Source Serif 4", "Iowan Old Style", Georgia, serif';

export default function FlamingoDecodedPage() {
  return (
    <main
      style={{
        background: palette.bg,
        color: palette.cream,
        fontFamily: bodyFont,
        minHeight: "100vh",
        padding: "96px 24px 160px",
      }}
    >
      <article
        style={{
          maxWidth: 720,
          margin: "0 auto",
          fontSize: "18px",
          lineHeight: 1.7,
          letterSpacing: "0.005em",
        }}
      >
        <nav
          style={{
            color: palette.graphite,
            fontSize: "13px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 48,
          }}
        >
          <a
            href="/research/decoded"
            style={{ color: palette.graphite, textDecoration: "none" }}
          >
            AtomEons Research / Decoded
          </a>
        </nav>

        <header style={{ marginBottom: 64 }}>
          <div
            style={{
              color: palette.cyan,
              fontSize: "12px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            Decoded paper · Vision-language models
          </div>
          <h1
            style={{
              fontSize: "42px",
              lineHeight: 1.18,
              fontWeight: 400,
              margin: "0 0 28px",
              letterSpacing: "-0.01em",
            }}
          >
            A frozen vision encoder, a frozen language model, and a thin
            bridge between them — enough to learn new visual tasks from a
            handful of examples.
          </h1>
          <p
            style={{
              color: palette.graphite,
              fontSize: "16px",
              lineHeight: 1.6,
              margin: "0 0 32px",
            }}
          >
            Alayrac, Donahue, Luc, Miech, Barr, Hasson, Lenc, Mensch,
            Millican, Reynolds, Ring, Rutherford, Cabi, Han, Gong,
            Samangooei, Monteiro, Menick, Borgeaud, Brock, Nematzadeh,
            Sharifzadeh, Binkowski, Barreira, Vinyals, Zisserman, Simonyan
            — NeurIPS 2022 · arXiv:2204.14198
          </p>
          <div
            style={{
              borderTop: `1px solid ${palette.hair}`,
              borderBottom: `1px solid ${palette.hair}`,
              padding: "20px 0",
              fontStyle: "italic",
              color: palette.cream,
            }}
          >
            Flamingo connects a frozen pretrained vision encoder to a
            frozen pretrained language model through small trainable
            cross-attention layers, and the resulting system can perform
            new image and video tasks from only a few in-context examples
            — often beating systems fine-tuned on thousands of examples.
          </div>
        </header>

        <Section title="What the paper actually shows">
          <p>
            The paper introduces Flamingo, a family of visual language
            models built by bolting two pretrained giants together. The
            vision side is a Normalizer-Free ResNet trained with
            contrastive learning. The language side is a Chinchilla
            language model — 1.4B, 7B, or 70B parameters. Both are
            frozen. Between them, the authors insert two small trainable
            modules: a Perceiver Resampler that turns a variable number
            of image or video features into a fixed-size set of visual
            tokens, and gated cross-attention-dense layers interleaved
            through the language model that let it attend to those
            visual tokens. Roughly 80% of the parameters stay frozen
            during training. Only the bridge is learned.
          </p>
          <p>
            The model is trained on three web-scraped data sources:
            image-text pairs, video-text pairs, and a large corpus
            called M3W of pages where images and text are interleaved in
            their natural reading order. The interleaving is what
            enables few-shot prompting at inference time. You can show
            the model two or four examples of a task — image, then
            caption, then image, then caption — and then a fifth image,
            and the model writes a caption that follows the implied
            pattern.
          </p>
          <p>
            The headline result is on sixteen benchmarks spanning visual
            question answering, captioning, video understanding, and a
            multimodal dialogue setting. Flamingo-80B sets a new
            few-shot state of the art on all sixteen. On six of them,
            the few-shot performance with 32 examples exceeds the
            published best fine-tuned numbers — even though the
            fine-tuned systems were trained on thousands or tens of
            thousands of task-specific examples. The cost is real: 80B
            parameters, a custom training stack, and a curated mixture
            of three datasets totaling more than 2.3 billion image-text
            pairs. But the demonstration is clean. A single model, no
            task-specific fine-tuning, learning from a prompt.
          </p>
        </Section>

        <Section title="Why it matters">
          <p>
            Before Flamingo, the dominant pattern in
            vision-and-language was task-specific. You wanted a system
            that answered questions about medical images, you collected
            medical question-answer pairs and you fine-tuned. You
            wanted a system that captioned product photos, you
            collected product captions and you fine-tuned. The system
            that resulted was usually good at exactly that task and
            stiff everywhere else. Each new task meant another labeling
            project, another training run, another model artifact to
            maintain.
          </p>
          <p>
            Flamingo argues this is not the only path. If you have a
            strong enough language model and a strong enough vision
            encoder, and you train a small adapter to translate between
            them on naturally interleaved web data, the resulting
            system inherits the language model's habit of learning from
            context. Show it the task, do not retrain it. This is the
            same shift that happened in pure text with GPT-3 —
            fine-tuning gave way to prompting — extended into images
            and video.
          </p>
          <p>
            The practical consequence is that one model can serve many
            narrow needs without a fleet of fine-tuned variants. A
            radiologist who wants the model to flag a specific finding
            can write three examples in a prompt. A wildlife biologist
            tagging camera-trap footage can do the same. Neither needs
            an ML team. Whether the few-shot accuracy is good enough
            for the task at hand is a question Flamingo does not and
            cannot answer in general. But the architecture and training
            recipe became the template for nearly every open-source
            visual language model that followed — LLaVA, MiniGPT-4,
            IDEFICS, Otter, the Qwen-VL family. The frozen-encoder
            plus frozen-LLM plus learned-bridge pattern is now
            ordinary. In 2022 it was the demonstration.
          </p>
        </Section>

        <Section title="What the scientists did">
          <p>
            Start with two pretrained models that already work. For
            vision they use a Normalizer-Free ResNet (NFNet-F6) trained
            from scratch with a contrastive image-text objective on a
            large web dataset. For language they use Chinchilla, a
            decoder-only transformer DeepMind had already trained on
            text. Freeze both. Their weights do not change for the rest
            of the project.
          </p>
          <p>
            The first bridge is the Perceiver Resampler. An image, or a
            sequence of video frames, gets pushed through the vision
            encoder and produces a variable-length grid of features.
            The Resampler is a small transformer with a fixed number of
            learned query tokens — sixty-four, in the paper. The
            queries attend to the visual features and produce
            sixty-four output tokens regardless of input size. This
            turns the messy variable-length output of the vision
            encoder into a tidy fixed-size visual representation that
            the language model can consume.
          </p>
          <p>
            The second bridge is gated cross-attention-dense layers.
            These are inserted between the existing self-attention
            blocks of the frozen language model. At each insertion
            point the language tokens cross-attend to the visual
            tokens from the Resampler. The gate is a learned scalar,
            initialized so the layer starts as an identity function —
            meaning at the start of training the language model
            behaves exactly as it did before, and the cross-attention
            contributions ease in as training progresses. This is the
            trick that lets you add capability without destabilizing a
            frozen language model that already works.
          </p>
          <p>
            For training data they assemble three sources. The first
            is M3W, MultiModal MassiveWeb, a corpus of about
            forty-three million web pages where images and surrounding
            text are kept in their natural interleaved order. The
            second is a collection of image-text pairs scraped from
            the web at the scale of about 1.8 billion images. The
            third is video-text pairs from VTP. They train with a
            per-image-conditioned language modeling loss, mixing the
            three datasets with carefully tuned weights.
          </p>
          <p>
            At inference, evaluation is structured as prompts. For a
            few-shot task they place k support examples in the context
            — each one is an image followed by the expected text —
            followed by the query image. The model generates the
            answer. No gradients flow. The authors evaluate on sixteen
            benchmarks at zero, four, eight, sixteen, and thirty-two
            shots, comparing against published state-of-the-art
            numbers for both zero-shot baselines and fully fine-tuned
            systems.
          </p>
        </Section>

        <Section title="What this paper does NOT claim">
          <p>
            It does not claim Flamingo understands images. The model
            produces text conditioned on pixels. It does not show that
            the model represents three-dimensional structure, intention,
            causality, or any of the things humans mean when they say
            they understand a scene. The benchmarks measure correlation
            between visual inputs and textual outputs, not comprehension.
          </p>
          <p>
            It does not claim few-shot beats fine-tuning everywhere. The
            headline that few-shot exceeds fine-tuned state of the art
            holds on six of sixteen benchmarks, not all of them. On the
            other ten, fine-tuned task-specific systems still win,
            sometimes by large margins. The honest reading is that
            few-shot is now competitive on a meaningful subset of
            vision-language tasks, not that fine-tuning is obsolete.
          </p>
          <p>
            It does not claim the model is safe to deploy. The paper
            has a substantial section acknowledging that Flamingo
            inherits the biases of its training data — gender
            stereotypes, racial stereotypes, toxicity, hallucination.
            The authors run targeted evaluations and report real
            failure modes. They do not release the weights.
          </p>
          <p>
            It does not claim novelty in the components. The vision
            encoder is a known architecture. Chinchilla is from prior
            DeepMind work. Perceiver and cross-attention are
            pre-existing ideas. The contribution is the assembly —
            which interfaces between which frozen models, which gating
            scheme, which data mixture — not the invention of any
            individual piece.
          </p>
          <p>
            It does not claim the model is small or accessible.
            Flamingo-80B requires training infrastructure most labs do
            not have. The paper is a demonstration of what is possible
            at scale by a well-resourced industrial lab, not a recipe
            an individual researcher can replicate cheaply.
          </p>
        </Section>

        <Section title="What the field knows but rarely says">
          <p>
            Flamingo's weights were never released. The model exists in
            a paper, in DeepMind's internal stacks, and in the
            open-source replicas that came after — OpenFlamingo from
            LAION, IDEFICS from Hugging Face. Replication is partial.
            The open variants demonstrate the architecture works, but
            they cannot reproduce the exact training data, the exact
            compute budget, or the exact engineering decisions that
            went into the original.
          </p>
          <p>
            The training data is the part most outsiders underestimate.
            M3W is a custom scrape. The 1.8B image-text pairs include
            licensed sources. The video corpus is internal. The model's
            behavior is shaped at least as much by these data choices
            as by the architecture, and the data is not public. When
            researchers compare against Flamingo, they are comparing
            against a system whose training distribution they cannot
            inspect.
          </p>
          <p>
            The evaluation conventions in this corner of the field are
            still loose. Few-shot numbers depend heavily on which
            examples you pick for the prompt and in what order.
            Authors usually report averages over several random seeds,
            but the variance is real and not always reported alongside
            the headline number. The gap between "Flamingo with 32
            carefully chosen shots" and "Flamingo with 32 arbitrarily
            chosen shots" can be larger than the gap between two
            competing systems.
          </p>
          <p>
            The authors are at DeepMind, which is owned by Alphabet,
            which has a commercial interest in multimodal AI products.
            The paper is honest and well-written, the evaluation is
            broad, and the limitations section is unusually candid.
            But the institutional context is what it is. Independent
            reproduction at the same scale is rare. The current open
            ecosystem is built on faith that the original recipe
            generalizes, and so far it has, in smaller forms.
          </p>
        </Section>

        <Section title="Where to read the original">
          <ul style={{ paddingLeft: 20, margin: 0 }}>
            <li style={{ marginBottom: 8 }}>
              arXiv:{" "}
              <a
                href="https://arxiv.org/abs/2204.14198"
                style={{ color: palette.cyan }}
              >
                arxiv.org/abs/2204.14198
              </a>
            </li>
            <li style={{ marginBottom: 8 }}>
              NeurIPS 2022 proceedings:{" "}
              <a
                href="https://papers.nips.cc/paper_files/paper/2022/hash/960a172bc7fbf0177ccccbb411a7d800-Abstract-Conference.html"
                style={{ color: palette.cyan }}
              >
                papers.nips.cc
              </a>
            </li>
            <li>
              DeepMind blog (overview):{" "}
              <a
                href="https://www.deepmind.com/blog/tackling-multiple-tasks-with-a-single-visual-language-model"
                style={{ color: palette.cyan }}
              >
                deepmind.com
              </a>
            </li>
          </ul>
          <p style={{ marginTop: 24, color: palette.graphite }}>
            The full PDF is freely available on arXiv at the link above.
          </p>
        </Section>

        <footer
          style={{
            marginTop: 96,
            paddingTop: 32,
            borderTop: `1px solid ${palette.hair}`,
            color: palette.graphite,
            fontSize: "13px",
            letterSpacing: "0.04em",
          }}
        >
          AtomEons Research · Decoded series. Every claim sourced to
          the paper. No hype. No PR talk.{" "}
          <a href="/research/decoded" style={{ color: palette.cyan }}>
            Back to the library
          </a>
          .
        </footer>
      </article>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginBottom: 56 }}>
      <h2
        style={{
          fontSize: "26px",
          fontWeight: 400,
          letterSpacing: "-0.005em",
          margin: "0 0 24px",
          color: palette.cream,
          borderLeft: `2px solid ${palette.cyan}`,
          paddingLeft: 16,
        }}
      >
        {title}
      </h2>
      <div style={{ color: palette.cream }}>{children}</div>
    </section>
  );
}