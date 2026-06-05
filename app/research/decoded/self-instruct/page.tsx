import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Self-Instruct, decoded — AtomEons Research",
  description:
    "A language model can write its own instruction-tuning data, and most of it is usable. Wang et al, 2022. Decoded for senior practitioners and intelligent non-experts.",
  openGraph: {
    title: "Self-Instruct, decoded",
    description:
      "Bootstrapping a language model's instruction-following ability from 175 human-written seeds. The paper that made Alpaca possible.",
    type: "article",
  },
};

const colors = {
  bg: "#08090B",
  cream: "#F4F4F2",
  graphite: "#9CA3AF",
  hair: "#1F242B",
  cyan: "#22F0D5",
};

export default function SelfInstructDecodedPage() {
  return (
    <main
      style={{
        backgroundColor: colors.bg,
        color: colors.cream,
        minHeight: "100vh",
        fontFamily: "'Newsreader', Georgia, 'Times New Roman', serif",
        fontWeight: 400,
        lineHeight: 1.7,
        padding: "0",
      }}
    >
      <article
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          padding: "96px 24px 160px",
        }}
      >
        <nav
          style={{
            fontSize: "13px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: colors.graphite,
            marginBottom: "48px",
            fontFamily:
              "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
          }}
        >
          <a
            href="/research"
            style={{ color: colors.graphite, textDecoration: "none" }}
          >
            Research
          </a>
          <span style={{ margin: "0 8px", color: colors.hair }}>/</span>
          <a
            href="/research/decoded"
            style={{ color: colors.graphite, textDecoration: "none" }}
          >
            Decoded
          </a>
          <span style={{ margin: "0 8px", color: colors.hair }}>/</span>
          <span style={{ color: colors.cyan }}>Self-Instruct</span>
        </nav>

        <header style={{ marginBottom: "64px" }}>
          <div
            style={{
              fontSize: "12px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: colors.cyan,
              marginBottom: "20px",
              fontFamily:
                "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
            }}
          >
            Paper decoded &middot; arXiv 2212.10560
          </div>
          <h1
            style={{
              fontSize: "44px",
              lineHeight: 1.15,
              fontWeight: 500,
              letterSpacing: "-0.015em",
              margin: "0 0 28px",
              color: colors.cream,
            }}
          >
            A language model can write its own instruction-tuning data, and
            most of it is usable.
          </h1>
          <div
            style={{
              fontSize: "15px",
              color: colors.graphite,
              borderTop: `1px solid ${colors.hair}`,
              borderBottom: `1px solid ${colors.hair}`,
              padding: "20px 0",
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              columnGap: "20px",
              rowGap: "8px",
              fontFamily:
                "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
            }}
          >
            <span style={{ color: colors.graphite }}>Paper</span>
            <span style={{ color: colors.cream }}>
              Self-Instruct: Aligning Language Models with Self-Generated
              Instructions
            </span>
            <span style={{ color: colors.graphite }}>Authors</span>
            <span style={{ color: colors.cream }}>
              Yizhong Wang, Yeganeh Kordi, Swaroop Mishra, Alisa Liu, Noah A.
              Smith, Daniel Khashabi, Hannaneh Hajishirzi
            </span>
            <span style={{ color: colors.graphite }}>Venue</span>
            <span style={{ color: colors.cream }}>ACL 2023 (long paper)</span>
            <span style={{ color: colors.graphite }}>One sentence</span>
            <span style={{ color: colors.cream }}>
              Starting from 175 human-written seed tasks, the authors prompted
              GPT-3 to generate 52,000 new instructions with paired inputs and
              outputs, filtered the obvious garbage, fine-tuned the same base
              model on the result, and recovered most of the gap between
              vanilla GPT-3 and human-tuned InstructGPT-001.
            </span>
          </div>
        </header>

        <Section title="What the paper actually shows">
          <p>
            The paper demonstrates a single, narrow, surprisingly durable
            fact: a base language model that has never been instruction-tuned
            can be coaxed, with a small handful of human-authored examples
            and a careful prompting loop, into generating its own
            instruction-tuning dataset &mdash; and fine-tuning that same base
            model on its own synthesized data closes most of the behavioral
            gap with a model that was tuned on expensive human labels.
          </p>
          <p>
            Concretely, the authors started with 175 seed tasks written by
            the paper&rsquo;s own authors. They then ran a bootstrapping loop
            against GPT-3 (the <Code>davinci</Code> base, not the instruct
            variant) that generated new task instructions, classified each
            task as classification or non-classification, generated
            input-output pairs for each instruction, and ran a deduplication
            and filtering pass keyed on ROUGE-L overlap against the existing
            pool. The loop ran until they had roughly 52,000 instructions
            paired with about 82,000 instances. They fine-tuned the same{" "}
            <Code>davinci</Code> checkpoint on this self-generated corpus,
            called the result <Code>GPT3-Self-Instruct</Code>, and evaluated
            it against several baselines on SUPERNATURAL-INSTRUCTIONS &mdash;
            a held-out benchmark of 119 tasks &mdash; and a small new
            evaluation set of 252 user-oriented prompts authored for the
            paper.
          </p>
          <p>
            The result the paper actually claims:{" "}
            <Code>GPT3-Self-Instruct</Code> improves over the vanilla{" "}
            <Code>davinci</Code> base by approximately 33 absolute points on
            SUPERNATURAL-INSTRUCTIONS, and lands within about 5 absolute
            points of InstructGPT-001 &mdash; the model OpenAI built using
            human labelers. On the 252-task user-facing evaluation, judged by
            human raters, the gap was likewise small.
          </p>
          <p>
            That is the entire empirical contribution. It is not that
            synthetic data equals human data. It is that, in late 2022, for
            a 175B-parameter base model, four out of five generated
            instructions were rated as &ldquo;valid task&rdquo; by human
            evaluators on a 200-sample audit, the input-output pairs were
            correct slightly more than half the time, and the residual signal
            was strong enough to substantially close one specific gap on one
            specific evaluation suite.
          </p>
        </Section>

        <Section title="Why it matters">
          <p>
            Before this paper, the prevailing assumption inside large labs
            was that instruction-following behavior in a language model
            required a meaningful human workforce &mdash; annotators sitting
            in front of screens, writing prompts and demonstrations, paid by
            the hour, governed by labeling guidelines. InstructGPT, which
            OpenAI shipped in early 2022, was built that way. The cost is
            not exotic but it is real: tens of thousands of human-hours, and
            a labeling pipeline that has to be designed, audited, and
            corrected.
          </p>
          <p>
            Self-Instruct changed the cost structure of one specific step in
            that pipeline. The paper showed that the supervised-fine-tuning
            portion of the recipe &mdash; the SFT step, before any reward
            modeling or RLHF &mdash; could be substantially automated by
            asking the base model to produce its own training set. That is
            not the whole pipeline, and the paper is careful not to claim it
            is. But it is the step that, until that moment, had been
            considered the labor-intensive bottleneck.
          </p>
          <p>
            The consequence in the year that followed was visible to anyone
            watching the open weights ecosystem. Stanford&rsquo;s Alpaca took
            the Self-Instruct procedure, swapped GPT-3 for the newer{" "}
            <Code>text-davinci-003</Code>, generated a similar 52K dataset,
            and used it to fine-tune Meta&rsquo;s LLaMA &mdash; producing in
            a few hundred dollars of compute a model that hobbyists could
            run on a single workstation and that behaved, conversationally,
            far more like ChatGPT than like a base model. Vicuna, Dolly,
            WizardLM, and the dozen instruction-tuned LLaMA derivatives that
            flooded GitHub through 2023 all inherited some version of this
            method.
          </p>
          <p>
            So the paper matters for two reasons that are easy to confuse
            but separate. First, it is a piece of evidence about what a base
            model already knows about how to follow instructions &mdash;
            quite a lot, apparently, if you know how to ask. Second, and
            downstream, it is the technical scaffolding that made the open
            instruction-tuned model wave of 2023 economically viable.
            Without Self-Instruct, the rest of that year looks different.
          </p>
        </Section>

        <Section title="What the scientists did">
          <p>
            The method is best described as a four-stage pipeline run in a
            loop. The starting condition is a pool of 175 seed tasks, each
            one written by hand by the authors, each containing an
            instruction and at least one input-output instance. That is the
            entire human-authored input. Everything that follows is
            generated by the model.
          </p>
          <p>
            <strong style={{ color: colors.cream }}>
              Stage one is instruction generation.
            </strong>{" "}
            The authors sampled eight tasks from the current pool &mdash;
            six from the human seeds, two from earlier model-generated
            batches &mdash; formatted them as a numbered list, and asked
            GPT-3 to continue the list with new task instructions. They
            generated in batches and stopped each batch when the model
            produced a stop token, an empty line, or hit the length limit.
            Newly generated instructions were filtered: discarded if they
            were too short or too long, if they contained keywords
            associated with image, graph, or file inputs that the model
            could not actually process, or if their ROUGE-L similarity to
            any existing instruction in the pool exceeded 0.7.
          </p>
          <p>
            <strong style={{ color: colors.cream }}>
              Stage two is task type classification.
            </strong>{" "}
            Some instructions are classification tasks &mdash; &ldquo;is
            this sentence positive or negative&rdquo; &mdash; and need
            different treatment than open-ended tasks. The authors used a
            few-shot prompt of 12 classification examples and 19
            non-classification examples to ask GPT-3 to label each newly
            generated instruction.
          </p>
          <p>
            <strong style={{ color: colors.cream }}>
              Stage three is instance generation.
            </strong>{" "}
            For non-classification tasks, the authors used what they call an{" "}
            <em>input-first</em> approach: prompt the model with the
            instruction, ask it to generate a plausible input, then ask it
            to generate the corresponding output. For classification tasks,
            they reversed it &mdash; <em>output-first</em> &mdash;
            generating the label first and then conditioning the input
            generation on that label, to avoid skewing toward whichever
            class the model defaulted to. They generated multiple instances
            per instruction.
          </p>
          <p>
            <strong style={{ color: colors.cream }}>
              Stage four is filtering.
            </strong>{" "}
            Exact-duplicate instances were dropped. Instances where the
            input equaled the output were dropped. Instances containing
            certain heuristic markers of degeneracy &mdash; repeated
            phrases, certain stop tokens &mdash; were dropped.
          </p>
          <p>
            The four stages ran iteratively. Each iteration&rsquo;s
            surviving instructions were added back into the seed pool from
            which the next iteration sampled. They ran until the pool
            reached 52K instructions, then stopped.
          </p>
          <p>
            Fine-tuning followed: take the original <Code>davinci</Code>{" "}
            checkpoint, format each instance as instruction-input-output,
            fine-tune with standard supervised learning. Evaluation
            followed: run the resulting model against
            SUPERNATURAL-INSTRUCTIONS, against the 252-task user-oriented
            set the authors wrote, against InstructGPT-001 and the original
            base model, and report.
          </p>
        </Section>

        <Section title="What this paper does NOT claim">
          <p>
            <strong style={{ color: colors.cream }}>First,</strong> the
            paper does not claim that synthetic data is as good as human
            data. It claims a specific gap closure on a specific benchmark,
            with a specific base model, at a specific moment. The remaining
            gap to InstructGPT-001 was small but it was not zero, and the
            comparison was against InstructGPT-001 &mdash; not against the
            later, RLHF-tuned models that became ChatGPT. The paper predates
            ChatGPT.
          </p>
          <p>
            <strong style={{ color: colors.cream }}>Second,</strong> the
            paper does not claim that the generated dataset is correct. The
            authors ran their own audit on 200 randomly sampled generated
            instructions and report that 92% were valid tasks, 80% had
            correct inputs, and 58% had correct outputs. That last number is
            the one that surprises people. A nontrivial fraction of the
            training set was wrong, and fine-tuning still worked. The paper
            does not explain why, beyond noting the obvious:
            instruction-following is a behavior, not a fact, and the model
            can learn the behavior from noisy demonstrations.
          </p>
          <p>
            <strong style={{ color: colors.cream }}>Third,</strong> the
            paper does not claim safety, alignment, or harmlessness. There
            is no reward model in this paper. There is no RLHF. There is no
            preference data. There is no red-team evaluation. The model
            produced is more instructable than its base &mdash; it is not
            safer, and the authors do not say it is.
          </p>
          <p>
            <strong style={{ color: colors.cream }}>Fourth,</strong> the
            paper does not claim this works at every model scale. The
            experiments are on <Code>davinci</Code>, a 175B-parameter base.
            The authors note in passing that smaller models produced
            worse-quality bootstrapped data, but they do not characterize
            the scaling curve. Later work &mdash; Alpaca, Vicuna &mdash;
            used a stronger teacher model (<Code>text-davinci-003</Code>) to
            generate data for a smaller student (LLaMA-7B), which is a
            different setup and arguably a different paper.
          </p>
          <p>
            <strong style={{ color: colors.cream }}>Fifth,</strong> the
            paper does not claim that the 52K number is optimal. It is the
            number they stopped at. There is no ablation showing diminishing
            returns at 52K versus 100K versus 25K.
          </p>
        </Section>

        <Section title="What the field knows but rarely says">
          <p>
            The 58% output-correctness number is the open secret of this
            paper. If you generated training data for a vision model where
            42% of the labels were wrong, no one would fine-tune on it. The
            fact that language models tolerate this level of label noise on
            instruction-following tasks is itself a finding, and it is
            undertheorized. Most practitioners treat it as a folk fact
            rather than something to study.
          </p>
          <p>
            The second open secret is selection bias in the seed set. The
            175 hand-written seed tasks were authored by the paper&rsquo;s
            authors. They are NLP researchers. The task distribution that
            resulted &mdash; and propagated through every Alpaca-style
            descendant &mdash; is shaped by what NLP researchers thought to
            write down on a particular afternoon in 2022. A great deal of
            &ldquo;general-purpose instruction-following&rdquo; in the open
            ecosystem is, downstream, a reflection of that afternoon.
          </p>
          <p>
            The third is the teacher-student question. Self-Instruct, as
            written, has the model bootstrap itself &mdash;{" "}
            <Code>davinci</Code> teaches <Code>davinci</Code>. Alpaca and
            most descendants used a stronger model to teach a weaker one,
            which is distillation, not self-instruction. The OpenAI terms of
            service for <Code>text-davinci-003</Code> prohibited using its
            outputs to train a competing model. Much of the open
            instruction-tuning corpus from 2023 sits in a gray legal zone
            the field is quiet about.
          </p>
          <p>
            The fourth is that the evaluation set the authors wrote for
            themselves &mdash; the 252 user-oriented tasks &mdash; was
            scored by the authors and by crowd workers, with the standard
            issues. Evaluation of instruction-following remains, four years
            later, the unsolved part.
          </p>
        </Section>

        <Section title="Where to read the original">
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              fontFamily:
                "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
              fontSize: "15px",
            }}
          >
            <SourceLink
              label="arXiv abstract"
              href="https://arxiv.org/abs/2212.10560"
            />
            <SourceLink
              label="PDF (free)"
              href="https://arxiv.org/pdf/2212.10560"
            />
            <SourceLink
              label="ACL Anthology"
              href="https://aclanthology.org/2023.acl-long.754/"
            />
            <SourceLink
              label="Code and dataset"
              href="https://github.com/yizhongw/self-instruct"
            />
            <li style={{ color: colors.graphite, marginTop: "12px" }}>
              Venue: ACL 2023, long paper.
            </li>
          </ul>
        </Section>

        <footer
          style={{
            marginTop: "96px",
            paddingTop: "32px",
            borderTop: `1px solid ${colors.hair}`,
            fontSize: "13px",
            color: colors.graphite,
            fontFamily:
              "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
            letterSpacing: "0.04em",
          }}
        >
          AtomEons Research &middot; Decoded papers are written for senior
          practitioners and intelligent non-experts. Every claim is sourced
          to the paper itself. We do not paraphrase abstracts; we read the
          method section.
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
    <section style={{ marginBottom: "64px" }}>
      <h2
        style={{
          fontSize: "13px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: colors.cyan,
          fontWeight: 500,
          margin: "0 0 24px",
          paddingBottom: "12px",
          borderBottom: `1px solid ${colors.hair}`,
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        {title}
      </h2>
      <div
        style={{
          fontSize: "18px",
          color: colors.cream,
          lineHeight: 1.75,
        }}
      >
        {children}
      </div>
    </section>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code
      style={{
        fontFamily:
          "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace",
        fontSize: "0.88em",
        color: colors.cyan,
        backgroundColor: "rgba(34, 240, 213, 0.06)",
        padding: "1px 6px",
        borderRadius: "3px",
        border: `1px solid ${colors.hair}`,
      }}
    >
      {children}
    </code>
  );
}

function SourceLink({ label, href }: { label: string; href: string }) {
  return (
    <li style={{ marginBottom: "10px" }}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: colors.cream,
          textDecoration: "none",
          borderBottom: `1px solid ${colors.cyan}`,
          paddingBottom: "1px",
        }}
      >
        {label}
      </a>
      <span
        style={{
          color: colors.graphite,
          marginLeft: "10px",
          fontSize: "13px",
        }}
      >
        {href.replace(/^https?:\/\//, "")}
      </span>
    </li>
  );
}