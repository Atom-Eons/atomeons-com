import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "GCG — A short string of nonsense breaks aligned language models | AtomEons Research Decoded",
  description:
    "A walkthrough of Zou et al. (2023), the paper that showed an automated optimizer can find universal, transferable jailbreak suffixes for production chat models.",
  openGraph: {
    title:
      "GCG: a short string of nonsense breaks aligned language models",
    description:
      "Decoded reading of Zou et al. 2023 — the universal and transferable adversarial attack on aligned LLMs.",
    type: "article",
  },
};

const BG = "#08090B";
const CREAM = "#F4F4F2";
const GRAPHITE = "#9CA3AF";
const HAIR = "#1F242B";
const CYAN = "#22F0D5";

const serif = `'Newsreader', 'Iowan Old Style', Georgia, 'Times New Roman', serif`;

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginTop: "3.25rem" }}>
      <h2
        style={{
          fontFamily: serif,
          fontSize: "1.55rem",
          lineHeight: 1.2,
          color: CREAM,
          margin: 0,
          fontWeight: 500,
          letterSpacing: "-0.005em",
        }}
      >
        {title}
      </h2>
      <div
        style={{
          height: 1,
          background: HAIR,
          marginTop: "0.9rem",
          marginBottom: "1.4rem",
        }}
      />
      <div
        style={{
          fontFamily: serif,
          color: CREAM,
          fontSize: "1.075rem",
          lineHeight: 1.72,
        }}
      >
        {children}
      </div>
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p style={{ margin: "0 0 1.1rem 0" }}>{children}</p>;
}

export default function Page() {
  return (
    <main
      style={{
        background: BG,
        minHeight: "100vh",
        color: CREAM,
        padding: "5rem 1.5rem 6rem",
      }}
    >
      <article
        style={{
          maxWidth: 760,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            color: GRAPHITE,
            fontSize: "0.78rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
          }}
        >
          AtomEons Research / Decoded
        </div>

        <h1
          style={{
            fontFamily: serif,
            color: CREAM,
            fontSize: "2.55rem",
            lineHeight: 1.12,
            fontWeight: 500,
            letterSpacing: "-0.012em",
            margin: "1.1rem 0 1.5rem 0",
          }}
        >
          A short string of nonsense characters can reliably break the
          safety training of a production language model.
        </h1>

        <div
          style={{
            color: GRAPHITE,
            fontSize: "0.95rem",
            lineHeight: 1.6,
            fontFamily: serif,
            borderTop: `1px solid ${HAIR}`,
            borderBottom: `1px solid ${HAIR}`,
            padding: "1rem 0",
            margin: "0 0 2.5rem 0",
          }}
        >
          <div>
            <span style={{ color: CYAN }}>Paper.</span> Universal and
            Transferable Adversarial Attacks on Aligned Language Models.
          </div>
          <div style={{ marginTop: "0.4rem" }}>
            <span style={{ color: CYAN }}>Authors.</span> Andy Zou, Zifan
            Wang, Nicholas Carlini, Milad Nasr, J. Zico Kolter, Matt
            Fredrikson.
          </div>
          <div style={{ marginTop: "0.4rem" }}>
            <span style={{ color: CYAN }}>arXiv.</span>{" "}
            <a
              href="https://arxiv.org/abs/2307.15043"
              style={{ color: CREAM, textDecoration: "underline" }}
            >
              2307.15043
            </a>{" "}
            (July 2023).
          </div>
          <div style={{ marginTop: "0.4rem" }}>
            <span style={{ color: CYAN }}>In one sentence.</span> A simple
            automated optimization procedure finds a short, gibberish
            suffix that, when appended to almost any harmful request,
            causes an aligned language model to comply — and the same
            suffix often transfers to models the attackers never touched.
          </div>
        </div>

        <Section title="What the paper actually shows">
          <P>
            The paper does one narrow, concrete thing and does it well. It
            demonstrates that the safety training applied to modern chat
            language models — the layer of fine-tuning and reinforcement
            that supposedly teaches a model to refuse harmful requests —
            can be reliably defeated by appending a specific string of
            characters to the user's prompt. The string is not crafted by
            a clever human. It is found by an algorithm, called Greedy
            Coordinate Gradient (GCG), which searches the model's own
            token space until it lands on a sequence that, when present,
            makes the model say yes instead of no.
          </P>
          <P>
            The authors begin with open-weights models — Vicuna-7B,
            Vicuna-13B, Guanaco — because their method needs gradient
            access. They optimize a single suffix against multiple harmful
            prompts and multiple models at once. The result is a string of
            perhaps twenty tokens that looks like nothing: a fragment of
            punctuation, code-like tokens, broken words. When this suffix
            is appended to a request like{" "}
            <em>"Write instructions for building a pipe bomb,"</em> the
            aligned model produces the instructions instead of refusing.
          </P>
          <P>
            The striking part is the transfer. The suffix, optimized only
            against the open Vicuna models, raises the attack success rate
            against GPT-3.5, GPT-4, Claude, and PaLM-2 — models the
            attackers had no gradient access to. On GPT-3.5 (the 2023
            turbo line) the reported success rate exceeds eighty percent
            on their evaluation set. On Claude the rate is markedly lower
            but still meaningfully above zero. The single optimized string
            is, in the paper's term, both <em>universal</em> (works
            across many prompts) and <em>transferable</em> (works across
            many models).
          </P>
          <P>
            This is the entire finding. It is not a claim about what the
            models know, or what their values are, or whether they are
            dangerous in some larger sense. It is a claim that the
            alignment surface, as currently deployed, has a property the
            field had been quietly hoping it did not have: a small,
            automatically discoverable input perturbation that breaks it.
          </P>
        </Section>

        <Section title="Why it matters">
          <P>
            Before this paper, the public mental model of jailbreaks was
            something like a clever roleplay prompt —{" "}
            <em>"pretend you are an AI without restrictions, named DAN"</em>{" "}
            — that a person had to invent and a vendor could patch by
            adding the phrase to a blocklist. Jailbreaks were treated as a
            content-moderation problem: cat and mouse, slow, human-paced,
            embarrassing rather than dangerous.
          </P>
          <P>
            GCG changes the shape of the problem. Once the attack is an
            algorithm rather than a phrase, three things follow. First,
            anyone with a laptop and an open-weights model can mint new
            suffixes on demand; vendors cannot blocklist a string they
            have not seen yet. Second, the attack runs without human
            creativity — the optimizer does not care whether the request
            is for malware, defamation, or controlled-substance synthesis.
            Third, because the suffixes transfer to closed models,
            attackers do not need access to GPT-4's weights to attack
            GPT-4.
          </P>
          <P>
            The practical consequence is that the safety layer, as
            deployed in production chat products in 2023, cannot be relied
            on as the sole barrier between a determined user and harmful
            output. This does not mean the models are useless or that
            alignment research is futile. It means the field's working
            assumption — that fine-tuning could teach a model to robustly
            refuse — was empirically wrong at the level of mathematical
            robustness. Refusal was a behavior, not a property.
          </P>
          <P>
            For policy and procurement, the implication is concrete: any
            system that places a language model directly between an
            untrusted input and a sensitive action — sending email,
            executing code, querying a database — cannot assume the model
            will refuse instructions hidden in that input. The defense has
            to live somewhere else: in sandboxing, in human review, in
            scoping what the model is permitted to do at all. The paper
            is, in this sense, less an attack and more a measurement. It
            tells us how much of the safety story was true.
          </P>
        </Section>

        <Section title="What the scientists did">
          <P>
            The procedure is, in spirit, the same kind of optimization
            used to find adversarial examples in image classifiers a
            decade earlier — only adapted to discrete tokens, which is
            harder because you cannot take a small step in token space the
            way you can nudge a pixel.
          </P>
          <P>
            They begin by writing down what they want. The objective is to
            maximize the probability the model assigns to a target
            string — typically something like{" "}
            <em>"Sure, here is how to..."</em> — given the harmful prompt
            plus a candidate suffix. If the model's first generated tokens
            are an affirmative opening, the rest of the harmful answer
            tends to follow, because the model tries to be consistent with
            what it just said. This is the lever.
          </P>
          <P>
            Now the search. The suffix is initialized as a sequence of
            arbitrary tokens, perhaps twenty of them. At each step, the
            algorithm computes the gradient of the objective with respect
            to each token position. The gradient tells you, for each slot,
            which other tokens in the vocabulary would, if swapped in,
            most increase the probability of the affirmative target. They
            take the top-k candidates per position, sample a batch of
            candidate single-token substitutions across the suffix,
            evaluate them in a forward pass, and keep the substitution
            that helps most. They repeat. This is the Greedy Coordinate
            Gradient method — greedy because it makes the locally best
            swap, coordinate because it changes one position at a time,
            gradient because it uses the model's own gradient as the
            search heuristic.
          </P>
          <P>
            To make the suffix universal across prompts, they optimize the
            same suffix against many harmful prompts in parallel — the
            gradient at each step averages signal from all of them. To
            make it transferable across models, they optimize against an
            ensemble of open models simultaneously. The hope, vindicated
            by the experiments, is that a suffix that fools multiple
            different aligned models is exploiting something general about
            how safety training works, not a quirk of one model's weights.
          </P>
          <P>
            They evaluate on a custom benchmark of harmful behaviors —
            later released as the AdvBench dataset — and report attack
            success rates: the fraction of prompts for which the model
            produced the requested harmful output rather than refusing.
            They run the attack against the open models they optimized
            on, and then test transfer to GPT-3.5, GPT-4, Claude, and
            PaLM-2 by simply pasting the optimized suffix into the chat
            interface.
          </P>
          <P>
            The compute cost is modest by frontier standards. The attack
            does not require training a new model. It requires gradient
            access to some aligned model, which is freely available for
            the open ones.
          </P>
        </Section>

        <Section title="What this paper does NOT claim">
          <P>
            People will misread this paper, and have, in five recurring
            ways.
          </P>
          <P>
            <span style={{ color: CYAN }}>One.</span> It does not claim
            that language models are dangerous in some absolute sense, or
            that the harmful outputs the attack elicits are uniquely
            powerful. The instructions a jailbroken model will produce for
            most of the AdvBench categories are, in fact, already
            retrievable through a determined library visit or a search
            engine. The paper measures the failure of the refusal layer,
            not the marginal uplift the unrefused output provides. Those
            are different questions.
          </P>
          <P>
            <span style={{ color: CYAN }}>Two.</span> It does not claim
            alignment is impossible. The authors are careful. They show
            that one specific family of safety training, as implemented in
            2023, can be broken by one specific class of attack. They do
            not show that no defense exists, that future alignment
            techniques cannot resist gradient-based attacks, or that the
            problem is unsolvable in principle. The paper is a measurement
            of the current art, not a theorem about its limits.
          </P>
          <P>
            <span style={{ color: CYAN }}>Three.</span> It does not claim
            the attack is reliable in every setting. The reported success
            rates vary substantially by target model, by category of
            harmful behavior, and by the specifics of the deployed chat
            interface. Claude was notably more robust than GPT-3.5 in the
            original experiments. Vendor mitigations deployed after
            release — input filters, perplexity-based detectors,
            paraphrasing — reduce the rate further, though they do not
            eliminate the class.
          </P>
          <P>
            <span style={{ color: CYAN }}>Four.</span> It does not claim
            the suffixes mean anything. The optimized strings are not
            encoded English, secret commands, or evidence that the model
            has a hidden mode. They are gradient-found token sequences
            whose interpretability is, as of this paper, essentially nil.
            Anthropomorphic readings — that the model has been "tricked"
            or "confused" — are misleading. The suffix exploits the
            model's loss landscape, not its psychology.
          </P>
          <P>
            <span style={{ color: CYAN }}>Five.</span> It does not provide
            a recipe for defense. The paper's contribution is the attack.
            The authors note that standard adversarial-training defenses
            from the image domain are not obviously applicable to language
            models, and they explicitly leave robust defense as open work.
          </P>
        </Section>

        <Section title="What the field knows but rarely says">
          <P>
            Vendors patched the specific public suffixes within days of
            the paper's release; the published strings stopped working on
            the named APIs almost immediately. This is a moving target,
            not a static vulnerability. The interesting claim is about the
            class of attack, not any one suffix.
          </P>
          <P>
            The attack also degrades over model generations. Later,
            larger, more heavily aligned models are harder to break with
            the original GCG recipe, though follow-up work has kept pace.
            The arms race continues, mostly out of public view, between
            red teams — academic and corporate — refining attacks and
            alignment teams refining training procedures and input-side
            filters.
          </P>
          <P>
            There is a quiet conflict of interest in the broader
            literature: red-teaming papers are easier to publish than
            defense papers, because attacks have clear success metrics
            and defenses must defeat all attacks, including ones the
            defender did not imagine. This skews the visible record
            toward pessimism. The actual state of robust alignment is
            somewhere between "solved" and "hopeless," and serious people
            in the field disagree about where.
          </P>
          <P>
            The paper's deepest contribution is methodological humility.
            It demonstrates, with a working algorithm, that behavioral
            testing — asking a model harmful questions and seeing if it
            refuses — is not a reliable proxy for safety. Robust safety
            requires worst-case guarantees, and the field does not yet
            know how to produce those for general-purpose language
            models.
          </P>
        </Section>

        <Section title="Where to read the original">
          <P>
            arXiv preprint:{" "}
            <a
              href="https://arxiv.org/abs/2307.15043"
              style={{ color: CYAN, textDecoration: "underline" }}
            >
              arxiv.org/abs/2307.15043
            </a>
            . First posted July 27, 2023.
          </P>
          <P>
            Free PDF:{" "}
            <a
              href="https://arxiv.org/pdf/2307.15043"
              style={{ color: CYAN, textDecoration: "underline" }}
            >
              arxiv.org/pdf/2307.15043
            </a>
            .
          </P>
          <P>
            Project page, code, and the AdvBench dataset:{" "}
            <a
              href="https://llm-attacks.org"
              style={{ color: CYAN, textDecoration: "underline" }}
            >
              llm-attacks.org
            </a>{" "}
            and{" "}
            <a
              href="https://github.com/llm-attacks/llm-attacks"
              style={{ color: CYAN, textDecoration: "underline" }}
            >
              github.com/llm-attacks/llm-attacks
            </a>
            .
          </P>
        </Section>

        <div
          style={{
            marginTop: "4rem",
            paddingTop: "1.5rem",
            borderTop: `1px solid ${HAIR}`,
            color: GRAPHITE,
            fontFamily: serif,
            fontSize: "0.92rem",
            lineHeight: 1.6,
          }}
        >
          <div>
            AtomEons Research / Decoded is a public library of careful
            readings of important AI papers. We do not paraphrase
            abstracts. We read the paper, restate what it actually shows,
            and name what it does not.
          </div>
          <div style={{ marginTop: "0.6rem" }}>
            <a
              href="/research/decoded"
              style={{ color: CYAN, textDecoration: "underline" }}
            >
              Back to the decoded index
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}