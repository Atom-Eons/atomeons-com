import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LIMA decoded — a thousand examples, one model, a hole in the recipe | AtomEons Research",
  description:
    "A plain-language decoding of Zhou et al. 2023 (LIMA). What the 1,000-example fine-tune actually showed, what it did not show, and what the field rarely says about it.",
  openGraph: {
    title: "LIMA decoded — Less Is More for Alignment",
    description:
      "A senior practitioner's reading of the 2023 LIMA paper: 1,000 curated examples, one 65B base model, a hole in the assumed alignment recipe.",
    type: "article",
  },
};

const bg = "#08090B";
const cream = "#F4F4F2";
const graphite = "#9CA3AF";
const hair = "#1F242B";
const cyan = "#22F0D5";

export default function LimaDecodedPage() {
  return (
    <main
      style={{
        backgroundColor: bg,
        color: cream,
        minHeight: "100vh",
        fontFamily:
          "'Newsreader', 'Source Serif Pro', Georgia, 'Times New Roman', serif",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <article
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          padding: "96px 24px 160px 24px",
          lineHeight: 1.7,
          fontSize: "18px",
        }}
      >
        <div
          style={{
            fontFamily:
              "ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, monospace",
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: cyan,
            marginBottom: "32px",
          }}
        >
          AtomEons Research / Decoded / LIMA
        </div>

        <h1
          style={{
            fontSize: "44px",
            lineHeight: 1.15,
            fontWeight: 500,
            margin: "0 0 24px 0",
            letterSpacing: "-0.01em",
          }}
        >
          A small, carefully curated set of examples is enough to teach a large
          pretrained model to follow instructions.
        </h1>

        <p
          style={{
            color: graphite,
            fontStyle: "italic",
            fontSize: "20px",
            margin: "0 0 48px 0",
            lineHeight: 1.5,
          }}
        >
          Zhou, Liu, Xu, Iyer, Sun, Mao, Ma, Efrat, Yu, Yu, Zhang, Ghosh, Lewis,
          Zettlemoyer, Levy. arXiv:2305.11206. NeurIPS 2023.
        </p>

        <hr
          style={{
            border: "none",
            borderTop: `1px solid ${hair}`,
            margin: "0 0 48px 0",
          }}
        />

        <p
          style={{
            fontSize: "21px",
            lineHeight: 1.6,
            margin: "0 0 48px 0",
          }}
        >
          A 65-billion-parameter LLaMA model fine-tuned on only 1,000 carefully
          curated prompt-response pairs produces outputs that human raters
          prefer to, or judge equivalent to, those of much more heavily aligned
          systems on 43 to 58 percent of test prompts.
        </p>

        <Section heading="What the paper actually shows">
          <p>
            The authors fine-tune Meta's LLaMA 65B language model on exactly
            1,000 prompt-response pairs. They call the result LIMA, which stands
            for Less Is More for Alignment. No reinforcement learning from human
            feedback. No reward model. No tens of thousands of crowd-sourced
            demonstrations. One pass of standard supervised fine-tuning on a
            thousand examples, hand-picked for stylistic consistency and answer
            quality.
          </p>
          <p>
            They then run a head-to-head human preference study against five
            other systems: Alpaca 65B, DaVinci-003 (an early RLHF model from
            OpenAI), Bard (Google, March 2023 snapshot), Claude (Anthropic,
            April 2023 snapshot), and GPT-4 (March 2023 snapshot). Annotators
            see two responses to the same prompt and choose which they prefer,
            or call it a tie.
          </p>
          <p>
            The headline number is this. Against Alpaca 65B, which used 52 times
            more fine-tuning data, LIMA's responses are preferred or tied 58
            percent of the time. Against DaVinci-003, LIMA wins or ties 65
            percent of the time. Against Bard, 42 percent. Against Claude, 36
            percent. Against GPT-4, 19 percent. In an absolute judgment study,
            50 percent of LIMA's responses are rated "excellent."
          </p>
          <p>
            The authors propose a framing they call the Superficial Alignment
            Hypothesis. A model's knowledge and capability are almost entirely
            learned during pretraining. Alignment fine-tuning, on this view,
            mostly teaches the model which format and tone to use when it
            responds. If that is true, a small stylistically consistent set of
            examples should be sufficient. The experiments are presented as
            evidence consistent with that hypothesis. The paper does not claim
            to have proved it.
          </p>
          <p>
            There is also a 30-example multi-turn dialogue extension. Adding
            those thirty conversations measurably improves the model's ability
            to carry on a coherent back-and-forth, suggesting the same
            data-efficiency principle holds in the conversational setting.
          </p>
        </Section>

        <Section heading="Why it matters">
          <p>
            For most of 2022 and early 2023, the assumed recipe for a usable
            conversational language model went like this. Pretrain on the open
            internet. Then run a large supervised fine-tuning stage with tens of
            thousands of human-written demonstrations. Then train a reward model
            on human preference comparisons. Then run reinforcement learning
            against that reward model. The whole pipeline was assumed to be
            load-bearing.
          </p>
          <p>
            LIMA pokes a hole in that assumption. If your pretraining was good,
            you may not need most of that scaffolding to get a model that feels
            usable. A small curated set of high-quality examples can carry you
            most of the way to something a human will sit and talk to.
          </p>
          <p>
            The practical consequence is straightforward. A research group, a
            startup, a hospital lab, a national language consortium that cannot
            afford a hundred-person crowd-sourcing operation can still produce a
            coherent assistant on top of a strong pretrained base. The
            bottleneck moves from headcount and budget to taste. Whoever can
            write or curate a thousand good examples can ship.
          </p>
          <p>
            There is a second consequence, less often stated. If alignment is
            mostly surface, then the safety properties people associate with
            RLHF — refusing dangerous instructions, declining impersonation,
            refusing medical diagnoses — may not be coming from the alignment
            stage at all. They may be coming from what the model absorbed during
            pretraining, or from the format the demonstrations happened to use.
            That has real implications for how seriously we should take "this
            model is aligned" as a claim. A thousand examples is a thin layer of
            paint.
          </p>
        </Section>

        <Section heading="What the scientists did">
          <p>
            Start with LLaMA 65B, Meta's pretrained model from February 2023. It
            has seen roughly 1.4 trillion tokens of text during pretraining. It
            is not yet an assistant. Ask it a question and it will continue the
            question, or wander.
          </p>
          <p>
            The authors assemble 1,000 prompt-response pairs. The composition
            matters. Seven hundred fifty come from community question-and-answer
            forums: Stack Exchange across multiple sub-sites, wikiHow, and
            Reddit. The Reddit subset is drawn from r/WritingPrompts and
            r/AskReddit, chosen for the quality of the top-voted answers. Two
            hundred fifty are written by hand by the paper's authors. Of those,
            fifty are designed to test the model's natural language abilities
            across a broad range of formats. Two hundred are written by the
            authors themselves to demonstrate the kind of response they want:
            helpful, direct, complete, written in a consistent voice.
          </p>
          <p>
            Curation criteria are explicit. Quality, diversity, and a single
            coherent response style. The hand-written examples enforce that
            style. The forum examples are filtered: top answers, edited for
            length and tone, stripped of meta-discussion. No automatic
            generation. No GPT-4 distillation.
          </p>
          <p>
            They then run standard supervised fine-tuning. Fifteen epochs over
            the thousand examples. AdamW optimizer. Linear learning rate decay
            from 1e-5. Batch size 32. Sequence length 2,048. Dropout is applied
            to certain layers. Validation is done by checking generations on a
            held-out set of 50 prompts.
          </p>
          <p>
            The held-out evaluation uses 300 test prompts. Two hundred come from
            the same distribution as the training data. One hundred come from
            the open-source Open Assistant dataset to test out-of-distribution
            generalization. Each test prompt is fed to LIMA and to a comparison
            model. Outputs are randomized in order, then shown to human
            annotators and to GPT-4 used as a judge. Annotators choose left,
            right, or tie.
          </p>
          <p>
            For the dialogue extension, they collect 30 multi-turn
            conversations. Ten are pulled from existing dialogue data. Twenty
            are written by the authors. They fine-tune again with these added
            and run a separate evaluation on dialogue prompts.
          </p>
        </Section>

        <Section heading="What this paper does NOT claim">
          <p>
            <em>First.</em> The paper does not claim that 1,000 examples is
            enough to match GPT-4. Against GPT-4, LIMA is preferred or tied only
            19 percent of the time. The paper is explicit that strong RLHF
            models from well-resourced labs remain ahead. The finding is that
            you can get surprisingly close, not that the gap is closed.
          </p>
          <p>
            <em>Second.</em> The paper does not claim that RLHF is unnecessary.
            It claims that for the specific axis of producing usable
            assistant-style responses on the prompts they tested, a small
            SFT-only recipe goes further than the field assumed. RLHF may still
            be doing important work on safety, factuality, refusal behavior,
            instruction-following under adversarial pressure, and long-horizon
            tasks. LIMA does not stress those axes hard.
          </p>
          <p>
            <em>Third.</em> The paper does not claim pretraining contains all
            the knowledge an assistant needs. The Superficial Alignment
            Hypothesis is stated as a hypothesis. The 1,000-example result is
            consistent with it but does not prove it.
          </p>
          <p>
            <em>Fourth.</em> The paper does not claim that any thousand examples
            will work. The 1,000 examples were chosen with care: explicit
            attention to stylistic uniformity, response quality, and topical
            diversity. A random thousand pulled from the internet will not
            reproduce these results. The recipe is small data, not lazy data.
          </p>
          <p>
            <em>Fifth.</em> The paper does not claim LIMA is safe to deploy as a
            product. There is no safety evaluation in the paper. No
            red-teaming. No measurement of refusal behavior on adversarial
            prompts. No evaluation on truthfulness benchmarks. The paper is a
            scientific claim about alignment data efficiency. It is not a
            product release.
          </p>
        </Section>

        <Section heading="What the field knows but rarely says">
          <p>
            The evaluation rests heavily on human preference on 300 prompts,
            with each comparison rated by a small number of annotators. The
            confidence intervals on the win-rate numbers are wider than the
            headline percentages suggest. A 58 percent preference against Alpaca
            looks decisive in a press release. In a careful read, it is a
            result that holds across the sample but should be replicated.
          </p>
          <p>
            The choice of comparison snapshots matters. Bard, Claude, and GPT-4
            in April 2023 are not the same systems six months later. Models
            behind APIs change. Some of the 2023 comparisons in this paper are
            not reproducible today because the compared systems no longer exist
            in that form. Anyone re-running this study now is comparing a frozen
            open-weights model to a moving target.
          </p>
          <p>
            The authors are at Meta AI, the same organization that released
            LLaMA. There is no claim of independence between the base model and
            the fine-tuning recipe. That does not make the result wrong. It
            does mean the question "would this work on a different pretrained
            base" is open. Subsequent work has explored this with mixed results.
          </p>
          <p>
            A fourth thing, quieter. The Superficial Alignment Hypothesis, taken
            seriously, says that most of what we call alignment is style
            transfer on top of a model that already knows what it knows. That
            is a humbling claim. It implies safety properties are largely
            inherited from pretraining data, not instilled by the alignment
            stage. The field has not fully metabolized that implication.
          </p>
        </Section>

        <Section heading="Where to read the original">
          <ul style={{ paddingLeft: "20px", margin: 0 }}>
            <li style={{ marginBottom: "8px" }}>
              arXiv:{" "}
              <a
                href="https://arxiv.org/abs/2305.11206"
                style={{ color: cyan, textDecoration: "none" }}
              >
                arxiv.org/abs/2305.11206
              </a>
            </li>
            <li style={{ marginBottom: "8px" }}>
              Free PDF:{" "}
              <a
                href="https://arxiv.org/pdf/2305.11206"
                style={{ color: cyan, textDecoration: "none" }}
              >
                arxiv.org/pdf/2305.11206
              </a>
            </li>
            <li style={{ marginBottom: "8px" }}>
              Venue: NeurIPS 2023 (Thirty-seventh Conference on Neural
              Information Processing Systems)
            </li>
            <li>
              Authors' affiliations: Meta AI, Carnegie Mellon University,
              University of Southern California, Tel Aviv University
            </li>
          </ul>
        </Section>

        <hr
          style={{
            border: "none",
            borderTop: `1px solid ${hair}`,
            margin: "80px 0 32px 0",
          }}
        />

        <p
          style={{
            fontFamily:
              "ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, monospace",
            fontSize: "11px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: graphite,
            margin: 0,
          }}
        >
          Decoded by AtomEons Research. Plain-language summaries of papers that
          matter, written for intelligent non-experts. Every claim sourced to
          the paper.
        </p>
      </article>
    </main>
  );
}

function Section({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginBottom: "56px" }}>
      <h2
        style={{
          fontSize: "13px",
          fontFamily:
            "ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, monospace",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: cyan,
          margin: "0 0 24px 0",
          fontWeight: 500,
        }}
      >
        {heading}
      </h2>
      <div
        style={{
          fontSize: "18px",
          lineHeight: 1.75,
          color: cream,
        }}
      >
        {children}
      </div>
    </section>
  );
}