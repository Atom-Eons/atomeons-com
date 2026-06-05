import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PaLM 2 Decoded — AtomEons Research",
  description:
    "A senior practitioner's plain-English decode of the PaLM 2 Technical Report (Google, 2023): what changed from PaLM 1, what the paper actually claims, and what it does not.",
  openGraph: {
    title: "PaLM 2 Decoded",
    description:
      "What the PaLM 2 Technical Report actually says — and what people misread it as saying.",
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
  '"Newsreader", "Source Serif Pro", "Iowan Old Style", Georgia, "Times New Roman", serif';
const mono =
  '"JetBrains Mono", "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

export default function PaLM2DecodedPage() {
  return (
    <main
      style={{
        backgroundColor: palette.bg,
        color: palette.cream,
        minHeight: "100vh",
        fontFamily: serif,
        lineHeight: 1.7,
      }}
    >
      <div
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          padding: "96px 24px 160px",
        }}
      >
        <nav
          style={{
            fontFamily: mono,
            fontSize: "12px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: palette.graphite,
            marginBottom: "48px",
          }}
        >
          <a href="/research" style={{ color: palette.graphite, textDecoration: "none" }}>
            Research
          </a>
          <span style={{ margin: "0 8px" }}>/</span>
          <a
            href="/research/decoded"
            style={{ color: palette.graphite, textDecoration: "none" }}
          >
            Decoded
          </a>
          <span style={{ margin: "0 8px" }}>/</span>
          <span style={{ color: palette.cream }}>palm-2</span>
        </nav>

        <header style={{ marginBottom: "64px" }}>
          <div
            style={{
              fontFamily: mono,
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: palette.cyan,
              marginBottom: "20px",
            }}
          >
            Decoded Paper · arXiv:2305.10403
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
            PaLM 2 — A Smaller, More Multilingual Model Trained on More
            Carefully Mixed Data
          </h1>
          <p
            style={{
              fontSize: "20px",
              color: palette.graphite,
              fontStyle: "italic",
              margin: "0 0 32px 0",
            }}
          >
            PaLM 2 is a Google language model that beats its
            540-billion-parameter predecessor with substantially fewer
            parameters by training on more multilingual data with a
            better-tuned compute-to-data ratio, while staying quiet about its
            exact size.
          </p>
          <div
            style={{
              fontFamily: mono,
              fontSize: "12px",
              color: palette.graphite,
              borderTop: `1px solid ${palette.hair}`,
              borderBottom: `1px solid ${palette.hair}`,
              padding: "16px 0",
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              rowGap: "8px",
              columnGap: "24px",
            }}
          >
            <span style={{ color: palette.cream }}>Authors</span>
            <span>
              Rohan Anil, Andrew M. Dai, Orhan Firat, Melvin Johnson, Dmitry
              Lepikhin, Alexandre Passos, Slav Petrov, Yonghui Wu, et al.
              (Google, ~120 authors)
            </span>
            <span style={{ color: palette.cream }}>Venue</span>
            <span>Google Technical Report, May 2023</span>
            <span style={{ color: palette.cream }}>arXiv</span>
            <span>2305.10403</span>
          </div>
        </header>

        <Section title="What the paper actually shows">
          <p>
            The PaLM 2 Technical Report describes a successor to Google's 2022
            PaLM model. The headline finding is unusual for the era it was
            written in: bigger was not the goal. The authors report that PaLM
            2 matches or surpasses the original 540-billion-parameter PaLM
            across reasoning, multilingual, and coding benchmarks while using
            "significantly" fewer parameters. The paper never specifies the
            parameter count of the production model.
          </p>
          <p>
            Three deliberate changes drive the gains. First, the training
            mixture is more multilingual and contains a higher proportion of
            non-English text than PaLM 1, with corpus-quality filtering and
            de-duplication explicitly described as priorities. Second, the
            model is trained with an objective the authors call UL2-style — a
            mixture of denoising objectives blended with the standard causal
            language-modeling loss, rather than pure left-to-right next-token
            prediction. Third, and most consequential, the compute-to-data
            ratio is rebalanced in line with the Chinchilla finding (Hoffmann
            et al., 2022) that prior frontier models were undertrained —
            meaning more tokens per parameter and a smaller, denser model
            trained for longer.
          </p>
          <p>
            The report presents results on a wide spread of evaluations:
            BIG-bench, MMLU, reasoning suites such as GSM8K and MATH,
            translation benchmarks across more than 100 languages, the
            WinoGrande and TriviaQA standards, and a battery of coding tasks.
            PaLM 2 reports improvements over PaLM 1 in nearly every category,
            with the largest deltas in multilingual translation, low-resource
            language understanding, and chain-of-thought reasoning. The paper
            also documents a family of model sizes — Gecko, Otter, Bison, and
            Unicorn, from smallest to largest — without naming exact
            parameter counts, intended for a range of inference budgets.
          </p>
          <p>
            The report includes a Responsible AI section covering
            memorization, toxicity, and bias evaluations, plus a section on
            capability evaluations specific to particular languages. The
            numbers in this section are not always favorable to PaLM 2, and
            the authors do not hide that.
          </p>
        </Section>

        <Section title="Why it matters">
          <p>
            For most of 2020 through 2022, the story of large language models
            was a straight line: more parameters, more compute, more
            capability. PaLM 1 at 540 billion parameters was the visible peak
            of that approach inside Google. PaLM 2 is the moment the line
            bends.
          </p>
          <p>
            The practical lesson is this: a smaller model trained on more
            carefully chosen tokens, with a better-tuned objective, can
            outperform a larger model trained on less. That changes the
            economics of deploying these systems. Smaller models are cheaper
            to serve, faster to respond, easier to run on constrained
            hardware, and easier to fine-tune. The paper is the public
            artifact of a strategic shift — Google deciding it would rather
            have a family of efficient models than a single giant one.
          </p>
          <p>
            The multilingual emphasis matters separately. PaLM 1, like most
            frontier models of its era, was heavily English-weighted. PaLM
            2's training mixture includes substantially more non-English
            data, and the paper reports gains across languages that earlier
            models handled poorly. For users outside the English-speaking
            world, this is the difference between a model that hallucinates
            in your language and one that does not.
          </p>
          <p>
            The reticence about parameter count also matters. From PaLM 2
            onward, frontier labs largely stopped publishing parameter
            counts. GPT-4's technical report, released a month before PaLM
            2's, did the same. The era of openly reported model sizes
            effectively ended here. Readers and journalists trying to compare
            models by "size" lost their primary handle, replaced by benchmark
            scores and qualitative behavior — which lab marketing
            departments can shape more easily than they can shape a number.
          </p>
          <p>
            Finally, PaLM 2 became the engine behind Bard and the foundation
            for Gemini's early lineage at Google. Understanding what changed
            from PaLM 1 to PaLM 2 is understanding the inflection point where
            Google's public-facing AI products became viable.
          </p>
        </Section>

        <Section title="What the scientists did">
          <p>
            Start with the recipe at the highest level, then zoom in.
          </p>
          <p>
            The team trained a Transformer-decoder language model — the same
            broad architecture as PaLM 1 and most frontier LLMs of the time
            — but adjusted three knobs together.
          </p>
          <p>
            <em>Knob one: the training corpus.</em> PaLM 1's training data
            was approximately three-quarters English. PaLM 2's mixture
            deliberately upweights non-English content, multilingual parallel
            data, and source code. The authors describe a multi-stage
            filtering pipeline that removes duplicates, low-quality content,
            and known evaluation contamination. They do not publish the
            corpus, but they describe its shape — a meaningful jump in
            linguistic and topical diversity over the PaLM 1 mix.
          </p>
          <p>
            <em>Knob two: the training objective.</em> PaLM 1 used standard
            causal language modeling — predict the next token given
            everything before it. PaLM 2 mixes in UL2-style objectives,
            drawing from Tay et al.'s 2022 unifying framework. In practice,
            this means the model trains on a blend of tasks: predicting the
            next token, filling in missing spans of varying lengths, and
            reconstructing corrupted sequences. The intuition is that
            exposing the model to multiple framings of the same data
            produces richer representations and better downstream behavior,
            particularly on reasoning tasks.
          </p>
          <p>
            <em>Knob three: the compute-to-data ratio.</em> Following
            Hoffmann et al.'s Chinchilla paper (2022), the team trained
            smaller models on substantially more tokens than the PaLM 1
            generation. The Chinchilla scaling laws suggest roughly twenty
            tokens of training data per parameter, against the Kaplan et al.
            (2020) regime which had implied larger models on relatively less
            data. PaLM 2 aligns with the Chinchilla view.
          </p>
          <p>
            The training infrastructure runs on TPU v4 pods. The paper
            describes data-parallel and model-parallel sharding strategies
            and the JAX/Pathways stack but does not publish detailed step
            counts or hardware-hour numbers.
          </p>
          <p>
            After pretraining, the team produces a family of model scales —
            Gecko, Otter, Bison, Unicorn — designed for different deployment
            tiers. They evaluate each on standard public benchmarks: MMLU
            for general knowledge, BIG-bench for diverse capability probes,
            GSM8K and MATH for math reasoning, WMT translation tasks for
            multilingual quality, HumanEval and MBPP for code generation,
            and several toxicity, bias, and memorization batteries for
            responsible-AI claims.
          </p>
          <p>
            For each benchmark, they compare PaLM 2 variants against PaLM
            1-540B, GPT-4 where comparable numbers exist, and prior
            published baselines. They report few-shot and chain-of-thought
            results where appropriate. They release no model weights with
            this paper — PaLM 2 was made available through Google's API and
            consumer products, not as an open release.
          </p>
        </Section>

        <Section title="What this paper does NOT claim">
          <p>
            The paper is widely misread. Several things are worth pinning
            down.
          </p>
          <p>
            <strong style={{ color: palette.cyan }}>
              It does not claim PaLM 2 is smaller than every PaLM 1 variant.
            </strong>{" "}
            It claims the production PaLM 2 used in Bard and the Vertex API
            outperforms PaLM 1-540B with substantially fewer parameters.
            PaLM 1 also had smaller sizes; the comparison is to the 540B
            flagship.
          </p>
          <p>
            <strong style={{ color: palette.cyan }}>
              It does not publish parameter counts.
            </strong>{" "}
            Many secondary sources cite specific numbers — 340 billion is a
            common figure that circulated. None of those numbers appear in
            the paper. The paper deliberately withholds them. Anyone quoting
            an exact PaLM 2 size is quoting a leak, a guess, or an
            extrapolation, not the report.
          </p>
          <p>
            <strong style={{ color: palette.cyan }}>
              It does not claim PaLM 2 is safer than PaLM 1 in every
              dimension.
            </strong>{" "}
            The Responsible AI section reports a mixed picture. On some
            toxicity benchmarks the model improves; on others it does not.
            Memorization rates and bias measurements vary by language and by
            evaluation. The honest reading is that capability improved, and
            safety properties improved on some axes and not on others.
          </p>
          <p>
            <strong style={{ color: palette.cyan }}>
              It does not claim parity with GPT-4 across the board.
            </strong>{" "}
            On several benchmarks GPT-4 — released a month earlier — scores
            higher. The paper reports PaLM 2's numbers honestly against
            published GPT-4 results and does not declare a winner.
          </p>
          <p>
            <strong style={{ color: palette.cyan }}>
              It does not establish a new training paradigm.
            </strong>{" "}
            The pieces — Chinchilla scaling, UL2 objectives, multilingual
            mixtures — were all published before this paper. PaLM 2's
            contribution is the integration at frontier scale and the
            documentation of what happened when they were combined. It is
            engineering excellence, not a theoretical breakthrough.
          </p>
        </Section>

        <Section title="What the field knows but rarely says">
          <p>
            Three things experts mention in private that the report does
            not.
          </p>
          <p>
            <em>First:</em> the paper is a technical report from a company
            shipping a commercial product. The authors are Google employees.
            The benchmarks are public, but the corpus is not, and there is
            no independent way to reproduce the result. Take it as a
            credible vendor account, not a peer-reviewed scientific claim.
            The community's standard for frontier-lab technical reports
            drifted in this direction throughout 2023 and 2024.
          </p>
          <p>
            <em>Second:</em> parameter-count opacity is now industry
            standard. PaLM 2, GPT-4, Claude, and most subsequent frontier
            models do not publish sizes. The reasons are partly competitive,
            partly safety-framed, and partly because exact parameter count
            became a less meaningful comparison once mixture-of-experts and
            other architectural choices made the number ambiguous. The cost
            is that external researchers cannot do clean scaling-law
            analysis on these models.
          </p>
          <p>
            <em>Third:</em> the gains attributed to "more data," "better
            mixture," and "UL2 objectives" cannot be cleanly disentangled in
            this paper. The ablations are limited. We do not know how much
            of PaLM 2's improvement comes from each lever. Subsequent
            independent work has suggested that data quality and quantity
            dominate, but the PaLM 2 report itself does not settle the
            question. Anyone telling you they know exactly why PaLM 2 worked
            better than PaLM 1 is overclaiming.
          </p>
        </Section>

        <Section title="Where to read the original">
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              fontFamily: mono,
              fontSize: "14px",
              lineHeight: 1.9,
            }}
          >
            <li>
              arXiv:{" "}
              <a
                href="https://arxiv.org/abs/2305.10403"
                style={{ color: palette.cyan, textDecoration: "underline" }}
              >
                arxiv.org/abs/2305.10403
              </a>
            </li>
            <li>
              PDF:{" "}
              <a
                href="https://arxiv.org/pdf/2305.10403"
                style={{ color: palette.cyan, textDecoration: "underline" }}
              >
                arxiv.org/pdf/2305.10403
              </a>
            </li>
            <li>
              Google AI announcement:{" "}
              <a
                href="https://blog.google/technology/ai/google-palm-2-ai-large-language-model/"
                style={{ color: palette.cyan, textDecoration: "underline" }}
              >
                blog.google/technology/ai/google-palm-2-ai-large-language-model
              </a>
            </li>
            <li style={{ color: palette.graphite, marginTop: "12px" }}>
              Venue: Google Technical Report, May 2023. Not peer-reviewed;
              cite as a technical report.
            </li>
          </ul>
        </Section>

        <footer
          style={{
            marginTop: "96px",
            paddingTop: "32px",
            borderTop: `1px solid ${palette.hair}`,
            fontFamily: mono,
            fontSize: "12px",
            color: palette.graphite,
            letterSpacing: "0.05em",
          }}
        >
          <p style={{ margin: 0 }}>
            Decoded by AtomEons Research · No paywall · No PR · Sources
            verified
          </p>
          <p style={{ margin: "8px 0 0 0" }}>
            <a
              href="/research/decoded"
              style={{ color: palette.cyan, textDecoration: "none" }}
            >
              ← Back to the decoded library
            </a>
          </p>
        </footer>
      </div>
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
    <section style={{ marginBottom: "64px" }}>
      <h2
        style={{
          fontSize: "13px",
          fontFamily: mono,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: palette.cyan,
          fontWeight: 500,
          margin: "0 0 24px 0",
          paddingBottom: "12px",
          borderBottom: `1px solid ${palette.hair}`,
        }}
      >
        {title}
      </h2>
      <div style={{ fontSize: "18px", color: palette.cream }}>{children}</div>
    </section>
  );
}