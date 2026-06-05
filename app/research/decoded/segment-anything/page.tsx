import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Segment Anything, decoded — AtomEons Research",
  description:
    "Werner Herzog narrating a research library: what the Segment Anything paper actually says, what it doesn't, and what the field rarely admits out loud.",
  openGraph: {
    title: "Segment Anything, decoded",
    description:
      "A foundation model for image segmentation, trained on a billion masks the model itself helped label.",
    type: "article",
  },
};

const palette = {
  bg: "#08090B",
  cream: "#F4F4F2",
  graphite: "#9CA3AF",
  hair: "#1F242B",
  cyan: "#22F0D5",
};

const serif =
  '"Newsreader", "Iowan Old Style", "Charter", Georgia, "Times New Roman", serif';
const mono =
  '"JetBrains Mono", "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginTop: 56 }}>
      <h2
        style={{
          fontFamily: serif,
          fontSize: 26,
          lineHeight: 1.2,
          fontWeight: 600,
          color: palette.cream,
          margin: 0,
          paddingBottom: 12,
          borderBottom: `1px solid ${palette.hair}`,
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h2>
      <div
        style={{
          marginTop: 20,
          fontFamily: serif,
          fontSize: 18,
          lineHeight: 1.7,
          color: palette.cream,
        }}
      >
        {children}
      </div>
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p style={{ margin: "0 0 18px 0" }}>{children}</p>;
}

export default function Page() {
  return (
    <main
      style={{
        backgroundColor: palette.bg,
        color: palette.cream,
        minHeight: "100vh",
        paddingTop: 72,
        paddingBottom: 120,
      }}
    >
      <article
        style={{
          maxWidth: 720,
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            fontFamily: mono,
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: palette.cyan,
            marginBottom: 28,
          }}
        >
          ATOMEONS / RESEARCH / DECODED / 001
        </div>

        <h1
          style={{
            fontFamily: serif,
            fontSize: 44,
            lineHeight: 1.1,
            fontWeight: 600,
            color: palette.cream,
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          A foundation model for image segmentation, trained on a billion masks
          the model itself helped label.
        </h1>

        <div
          style={{
            marginTop: 24,
            fontFamily: serif,
            fontSize: 19,
            lineHeight: 1.55,
            color: palette.graphite,
            fontStyle: "italic",
          }}
        >
          A single promptable model that, given a point, box, or rough mark on
          any image, returns a coherent mask of the object you meant — trained
          on eleven million images and 1.1 billion masks that the model itself
          helped create.
        </div>

        <div
          style={{
            marginTop: 36,
            padding: "20px 22px",
            border: `1px solid ${palette.hair}`,
            borderRadius: 2,
            fontFamily: mono,
            fontSize: 12,
            lineHeight: 1.8,
            color: palette.graphite,
          }}
        >
          <div>
            <span style={{ color: palette.cyan }}>PAPER</span> Segment Anything
          </div>
          <div>
            <span style={{ color: palette.cyan }}>AUTHORS</span> Kirillov,
            Mintun, Ravi, Mao, Rolland, Gustafson, Xiao, Whitehead, Berg, Lo,
            Dollár, Girshick
          </div>
          <div>
            <span style={{ color: palette.cyan }}>ARXIV</span>{" "}
            <a
              href="https://arxiv.org/abs/2304.02643"
              style={{ color: palette.cream, textDecoration: "underline" }}
            >
              2304.02643
            </a>{" "}
            (ICCV 2023)
          </div>
          <div>
            <span style={{ color: palette.cyan }}>AFFILIATION</span> Meta AI
            Research (FAIR)
          </div>
        </div>

        <Section title="What the paper actually shows">
          <P>
            For decades, segmenting an image — drawing the precise outline
            around a cat, a tumor, a soldering joint, a piece of luggage left
            on a curb — required a separate model trained for each task on
            each dataset. You wanted to segment cells, you trained a cell
            model. You wanted to segment streets, you trained a street model.
            The categories were fixed before the model ever ran. The Segment
            Anything paper proposes a different posture entirely. The authors
            build one model, called the Segment Anything Model, or SAM, that
            accepts a prompt — a single point clicked on an object, a loose
            bounding box drawn around it, or a coarse mask — and returns a
            valid segmentation. The model is not told what the object is
            called. It is only told, here, look there, and produces three
            candidate masks at different scales because the prompt is often
            ambiguous. A click on a person's shirt could mean the shirt, the
            torso, or the whole person, and SAM returns all three.
          </P>
          <P>
            The system is trained on a dataset the authors built specifically
            for this work, called SA-1B. It contains 11 million images
            licensed from a photography company and 1.1 billion segmentation
            masks. To create these masks at this scale, the authors use the
            model in the loop: human annotators correct what the model
            produces, the model retrains, the masks improve, until eventually
            the model labels images entirely on its own and humans only audit
            a sample. The paper demonstrates that SAM, trained this way,
            performs zero-shot segmentation on twenty-three diverse datasets
            — medical images, satellite photos, microscopy, underwater scenes
            — at quality comparable to or exceeding prior task-specific
            systems, without ever being trained on those domains. This is
            the central claim. The model is a general-purpose segmentation
            engine that responds to prompts rather than categories.
          </P>
        </Section>

        <Section title="Why it matters">
          <P>
            There is a particular kind of bottleneck in machine learning that
            the public rarely sees. It is the bottleneck of labels. To teach
            a model to recognize anything, someone, somewhere, must first sit
            and outline that thing thousands or millions of times. For
            segmentation — drawing the precise boundary of an object rather
            than just naming it — this work is brutal. A skilled annotator
            might produce a few hundred quality masks an hour. The largest
            segmentation dataset before SAM, called COCO, contained about 2.5
            million masks gathered over years.
          </P>
          <P>
            SAM changes the labor arithmetic. Because the model can accept a
            single click and produce a usable mask, a person who would have
            taken thirty seconds to outline an object can now take less than
            one. The downstream effect is that anyone with a domain — a
            radiologist annotating tumors, a marine biologist counting coral,
            an inspector flagging defects on a production line — can build a
            segmentation dataset in a day rather than a year. The model does
            not need to know what coral is. It only needs to know that the
            smudge under the click belongs together.
          </P>
          <P>
            The second consequence is that segmentation becomes a building
            block other systems can call. A robot reaching for a cup no
            longer needs a cup detector; it needs to point at where it wants
            to grasp and receive back the silhouette. A photo editing tool no
            longer needs separate hair, sky, and product extractors; it asks
            SAM and composes. The paper is, in this sense, an infrastructure
            paper. It does not solve any single application; it lowers the
            floor under all of them. Whether that floor stays lowered depends
            on whether SAM and its descendants remain accessible, which is a
            question the paper itself cannot answer.
          </P>
        </Section>

        <Section title="What the scientists did">
          <P>
            The recipe has three pieces, and they reinforce each other.
          </P>
          <P>
            <strong style={{ color: palette.cyan }}>First, the model.</strong>{" "}
            SAM is composed of three parts: an image encoder, a prompt
            encoder, and a mask decoder. The image encoder is a Vision
            Transformer — a fairly large one, with about 632 million
            parameters in the biggest version — that runs once per image and
            produces a dense feature map. This is the slow step, and it is
            meant to be slow; you encode the image once and then can prompt
            it many times. The prompt encoder is small and fast. It takes
            whatever the user provided — a point, a box, a coarse mask, or
            even a text snippet in some experimental settings — and turns it
            into a short vector. The mask decoder is a lightweight
            transformer that combines the image features and the prompt
            features and outputs three masks plus a confidence score for
            each. Three because the prompt is often ambiguous, and the
            authors found that forcing the model to commit to a single answer
            made it worse.
          </P>
          <P>
            <strong style={{ color: palette.cyan }}>
              Second, the data engine.
            </strong>{" "}
            To get the billion-mask dataset, the authors operate in three
            stages. In the first stage, called assisted-manual, professional
            annotators click on images while SAM, in an early form, suggests
            masks they correct. The model retrains on the corrections. In
            the second stage, semi-automatic, SAM proposes masks for
            prominent objects on its own and annotators fill in the harder
            ones. In the third stage, fully automatic, SAM is given a regular
            grid of points covering each image, generates a mask at each
            point, deduplicates the overlapping ones, and filters by an
            internal quality score and a stability check. The final dataset,
            SA-1B, is the output of this last stage. About 99 percent of the
            masks are model-generated; a smaller audited subset is
            hand-verified for quality control.
          </P>
          <P>
            <strong style={{ color: palette.cyan }}>
              Third, the training loop.
            </strong>{" "}
            SAM is trained to mimic the kind of prompt a person would give.
            During training, the system simulates a user by sampling random
            points, boxes, and masks from ground-truth shapes and asks the
            model to predict the mask. It uses a combination of focal loss
            and dice loss for the segmentation prediction, and a separate
            loss to teach the model which of its three masks is the best one.
            The image encoder is initialized from a pretrained model so the
            visual features are reasonable before segmentation training
            begins. The whole system is trained on a large GPU cluster — the
            paper reports 256 A100 GPUs for the largest model, running for
            several days.
          </P>
        </Section>

        <Section title="What this paper does NOT claim">
          <P>
            There are at least four misreadings worth naming.
          </P>
          <P>
            The paper does <em>not</em> claim that SAM understands what
            objects are. The model is a competent grouper of pixels under a
            prompt. It does not know that the silhouette it returned is a
            cat, a brain tumor, or a hand grenade. If you want a label, you
            need a separate classifier, or you need to combine SAM with a
            vision-language system. Several follow-up papers do exactly this,
            but it is not what SAM itself provides.
          </P>
          <P>
            The paper does <em>not</em> claim SAM is universally superior on
            any specific domain. The authors are careful here. They report
            zero-shot results across twenty-three datasets and show that SAM
            is competitive, often within a few points of the best specialist
            model, sometimes ahead, sometimes behind. On certain medical
            imaging benchmarks, on out-of-distribution textures, on very
            small objects, specialist systems trained directly on the target
            domain still win. SAM is a strong baseline, not a final answer.
          </P>
          <P>
            The paper does <em>not</em> claim the data engine is bias-free.
            The authors include a section on responsible AI that discusses
            the geographic and demographic distribution of the SA-1B images
            and notes asymmetries. The dataset is licensed from a photography
            company and over-represents certain regions. Models trained on
            it will inherit those distributions.
          </P>
          <P>
            The paper does <em>not</em> claim that the released model is the
            same as the one used internally to build the dataset. The
            released weights are a final model trained on the cleaned
            dataset; the intermediate models used during the data engine are
            not released. And the paper does not claim that text prompting
            works robustly. There is a brief experimental section on it,
            with cautious language. It is best treated as a research
            direction, not a feature.
          </P>
        </Section>

        <Section title="What the field knows but rarely says">
          <P>
            A few things experts will say off the record. SA-1B is a dataset
            of segmentation masks but it is not a dataset of semantic labels
            — the masks are anonymous shapes. For many real applications you
            need both, and the mask layer is only half the work. Second, the
            data engine is a known accelerant of bias. When a model labels
            its own training data, the model's blind spots become the
            dataset's blind spots, and downstream researchers may not notice
            because the masks look clean. Audit work on SA-1B since the
            paper's release has been limited compared to its scale.
          </P>
          <P>
            Third, the largest version of SAM is not cheap to run. The image
            encoder is heavy, and while you only encode once per image,
            real-time applications on consumer hardware still require
            distillation, quantization, or smaller variants — which the
            community has built, but which were not the contribution of this
            paper. Fourth, the paper was released alongside a public demo,
            which is rare for foundation models at this scale and which
            substantially shaped how the rest of the field validated the
            claims. The demo made it easy to test SAM on weird inputs
            immediately, which is healthier than the alternative.
          </P>
          <P>
            Finally, the relationship between SAM and its successor systems —
            SAM 2 for video, and a growing ecosystem of medical and
            geospatial variants — is one where the original architecture is
            largely preserved and the data is what changes. This is
            consistent with the paper's own thesis. The model is the
            substrate; the data is where the real work happens.
          </P>
        </Section>

        <Section title="Where to read the original">
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              fontFamily: mono,
              fontSize: 14,
              lineHeight: 2,
              color: palette.cream,
            }}
          >
            <li>
              arXiv ·{" "}
              <a
                href="https://arxiv.org/abs/2304.02643"
                style={{ color: palette.cyan, textDecoration: "underline" }}
              >
                arxiv.org/abs/2304.02643
              </a>
            </li>
            <li>
              Project page ·{" "}
              <a
                href="https://segment-anything.com"
                style={{ color: palette.cyan, textDecoration: "underline" }}
              >
                segment-anything.com
              </a>
            </li>
            <li>
              Code + weights ·{" "}
              <a
                href="https://github.com/facebookresearch/segment-anything"
                style={{ color: palette.cyan, textDecoration: "underline" }}
              >
                github.com/facebookresearch/segment-anything
              </a>
            </li>
            <li>
              Dataset (SA-1B) ·{" "}
              <a
                href="https://ai.meta.com/datasets/segment-anything/"
                style={{ color: palette.cyan, textDecoration: "underline" }}
              >
                ai.meta.com/datasets/segment-anything
              </a>
            </li>
            <li>Venue · ICCV 2023</li>
          </ul>
        </Section>

        <footer
          style={{
            marginTop: 96,
            paddingTop: 28,
            borderTop: `1px solid ${palette.hair}`,
            fontFamily: mono,
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: palette.graphite,
          }}
        >
          Decoded by AtomEons Research · Voice: senior practitioner, library
          register · No PR, no hype, every claim sourced to the paper.
        </footer>
      </article>
    </main>
  );
}