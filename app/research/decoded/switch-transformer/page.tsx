import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Switch Transformer, decoded — sparse mixture-of-experts at a trillion parameters | AtomEons",
  description:
    "A careful, plain-English decode of Fedus, Zoph, and Shazeer's 2021 Switch Transformer paper: what it actually shows, what it does not claim, and what the field knows but rarely says.",
  openGraph: {
    title:
      "Switch Transformer, decoded — sparse mixture-of-experts at a trillion parameters",
    description:
      "Werner-Herzog-in-a-research-library decode of the original Switch Transformer paper. Every claim sourced.",
    type: "article",
  },
};

const BG = "#08090B";
const CREAM = "#F4F4F2";
const GRAPHITE = "#9CA3AF";
const HAIR = "#1F242B";
const CYAN = "#22F0D5";

const serif =
  'Newsreader, "Newsreader Variable", Charter, "Iowan Old Style", "Source Serif Pro", Georgia, serif';

export default function Page() {
  return (
    <main
      style={{
        background: BG,
        color: CREAM,
        fontFamily: serif,
        minHeight: "100vh",
        padding: "72px 24px 160px",
      }}
    >
      <article
        style={{
          maxWidth: 760,
          margin: "0 auto",
          fontSize: 19,
          lineHeight: 1.62,
        }}
      >
        <nav
          style={{
            fontSize: 13,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: GRAPHITE,
            fontFamily:
              'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
            marginBottom: 36,
          }}
        >
          <a href="/research" style={{ color: GRAPHITE, textDecoration: "none" }}>
            Research
          </a>
          <span style={{ margin: "0 10px", color: HAIR }}>/</span>
          <a
            href="/research/decoded"
            style={{ color: GRAPHITE, textDecoration: "none" }}
          >
            Decoded
          </a>
          <span style={{ margin: "0 10px", color: HAIR }}>/</span>
          <span style={{ color: CYAN }}>Switch Transformer</span>
        </nav>

        <header style={{ borderBottom: `1px solid ${HAIR}`, paddingBottom: 28, marginBottom: 36 }}>
          <div
            style={{
              fontSize: 12,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: CYAN,
              fontFamily:
                'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
              marginBottom: 18,
            }}
          >
            Paper decoded · 2021
          </div>
          <h1
            style={{
              fontSize: 40,
              lineHeight: 1.12,
              fontWeight: 500,
              letterSpacing: "-0.01em",
              margin: "0 0 22px",
            }}
          >
            Sparse Mixture-of-Experts at Trillion Parameters: One Expert Per Token Is
            Enough
          </h1>
          <p
            style={{
              fontSize: 17,
              color: GRAPHITE,
              margin: "0 0 14px",
              fontStyle: "italic",
            }}
          >
            By routing each token to exactly one expert instead of two or more, Google
            researchers trained language models with up to 1.6 trillion parameters at
            the same compute cost as a much smaller dense model, and got a 7x
            pre-training speedup.
          </p>
          <dl
            style={{
              display: "grid",
              gridTemplateColumns: "120px 1fr",
              rowGap: 6,
              columnGap: 14,
              fontSize: 14,
              color: GRAPHITE,
              fontFamily:
                'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
              margin: 0,
            }}
          >
            <dt style={{ textTransform: "uppercase", letterSpacing: "0.12em" }}>
              Authors
            </dt>
            <dd style={{ margin: 0, color: CREAM }}>
              William Fedus, Barret Zoph, Noam Shazeer
            </dd>
            <dt style={{ textTransform: "uppercase", letterSpacing: "0.12em" }}>
              arXiv
            </dt>
            <dd style={{ margin: 0, color: CREAM }}>
              <a
                href="https://arxiv.org/abs/2101.03961"
                style={{ color: CYAN, textDecoration: "none" }}
              >
                2101.03961
              </a>
            </dd>
            <dt style={{ textTransform: "uppercase", letterSpacing: "0.12em" }}>
              Venue
            </dt>
            <dd style={{ margin: 0, color: CREAM }}>JMLR 23 (2022); arXiv 2021</dd>
          </dl>
        </header>

        <Section title="What the paper actually shows">
          <P>
            The Switch Transformer is a language model that pretends to be enormous
            while behaving, computationally, like something small. The trick is
            sparsity. A standard Transformer applies the same feed-forward network to
            every token that passes through a layer. The Switch Transformer replaces
            that single feed-forward network with a pool of many — the paper tests up
            to 2,048 of them — and routes each token to exactly one. The other 2,047
            experts sit idle for that token. The parameter count balloons; the
            floating-point operations per token barely move.
          </P>
          <P>
            The headline result is that this works, and it works at scale. The authors
            report a 7x improvement in pre-training sample efficiency over a strong
            T5-Base baseline at matched compute, and similar gains over T5-Large. They
            successfully train a 1.6-trillion-parameter model — the Switch-C — that,
            at the time of publication in early 2021, was among the largest neural
            networks ever trained. They also show the technique transfers: their
            sparse models, once distilled back into dense ones, retain about 30
            percent of the quality gain while shedding 99 percent of the parameters.
          </P>
          <P>
            The crucial methodological claim is that single-expert routing — "top-1"
            — is enough. Earlier mixture-of-experts work, including Shazeer's own
            2017 paper, had assumed you needed to route each token to at least two
            experts to get a useful gradient signal. The authors show this is not
            true. Top-1 routing is simpler, has lower communication cost across
            devices, and matches or beats top-2 in their setting. They pair it with a
            load-balancing auxiliary loss that gently penalizes the router for
            sending too many tokens to the same expert, and with selective precision
            casting — bfloat16 for most of the model, float32 only inside the router
            — to keep training stable. The result is a recipe that runs on TPU pods,
            scales cleanly, and produces a model with capacity far in excess of what
            its compute budget would normally allow.
          </P>
        </Section>

        <Section title="Why it matters">
          <P>
            For a long time the easiest way to make a language model better was to
            make it bigger. More parameters, more data, more compute, in roughly that
            order. This worked, and it kept working past the point where most people
            thought it would. But it had a problem hiding in plain sight: every
            parameter you added had to be touched, every time, by every token.
            Doubling the model doubled the cost of every forward pass and every
            backward pass. The bill grew linearly with the brain.
          </P>
          <P>
            The Switch Transformer is the paper that made the bill stop growing
            linearly. It separated two things that had been welded together — how
            much a model knows, and how much work it has to do to use what it knows.
            By letting different tokens use different parts of the network, it became
            possible to build a model with a trillion parameters that costs roughly
            the same to run as a model with a hundred billion. Capacity became cheap.
            Compute stayed expensive.
          </P>
          <P>
            This matters because almost every frontier model that has shipped since
            2023 — Mixtral, DeepSeek-V2 and V3, GPT-4 (widely reported as MoE),
            Gemini 1.5 — uses some descendant of this idea. The specifics differ.
            Most modern systems route to two experts rather than one, walking back
            the paper's most aggressive claim. Routing algorithms have changed,
            expert granularity has changed, the load-balancing tricks have
            multiplied. But the basic shape — many experts, sparse routing, an
            auxiliary loss to keep things balanced — is the shape Fedus, Zoph, and
            Shazeer drew. When a model card says "sparse mixture of experts," it is
            pointing back, knowingly or not, at this paper. It also matters as a
            piece of engineering literature. The paper is unusually frank about what
            broke during training, what failed to scale, and what the authors had to
            do to keep large sparse models from diverging. That candor is rare.
          </P>
        </Section>

        <Section title="What the scientists did">
          <P>
            Start with T5, the encoder-decoder Transformer from Google that had been
            the workhorse text model for a couple of years. Inside each Transformer
            block there is a feed-forward network — two linear layers with a
            nonlinearity between them. Take that single feed-forward network and
            replace it with N copies. The paper experiments with N from 2 up to
            2,048.
          </P>
          <P>
            Now you need a way to decide which copy — which expert — each token
            should visit. The authors add a small learned linear layer, the router.
            The router looks at the token's representation, produces a score for
            each expert, and picks the one with the highest score. That is "top-1
            routing," and it is the paper's signature choice. The token's
            representation gets passed through that one expert, multiplied by the
            router's confidence in its choice, and sent on to the next layer.
          </P>
          <P>
            Two things can go wrong, and the paper addresses both. First, the router
            might learn to send every token to the same favorite expert, leaving the
            others to atrophy. To prevent this, the authors add a load-balancing
            auxiliary loss — a small additional term in the training objective that
            increases whenever the router's choices are skewed away from a uniform
            distribution across experts. The loss is gentle: it nudges, it does not
            coerce.
          </P>
          <P>
            Second, each expert has a fixed capacity. In a batch of T tokens spread
            across N experts, each expert is allotted roughly T/N slots, scaled by a
            capacity factor (typically 1.0 to 1.25). If too many tokens want the same
            expert, the overflow tokens are dropped — they skip the expert entirely
            and flow through a residual connection to the next layer. This is a real
            loss of information, and the authors track it. They find that a small
            drop rate is the price of avoiding catastrophic load imbalance.
          </P>
          <P>
            For training stability, they cast the model to bfloat16 — Google's
            preferred low-precision format — but keep the router's computations in
            float32. Mixed-precision routers had been a known failure mode in earlier
            MoE work; selective precision fixes it cheaply. They also use a smaller
            initialization scale than standard T5 and add expert dropout during
            fine-tuning to prevent the experts from overfitting on small downstream
            datasets.
          </P>
          <P>
            Training runs on TPU pods with thousands of cores. Each expert lives on
            its own device, and tokens are physically shipped across the network to
            reach their assigned expert — an all-to-all communication pattern that
            becomes the dominant cost at scale. The largest model, Switch-C at 1.6T
            parameters with 2,048 experts, is trained on a corpus of roughly 180
            billion tokens drawn from C4, a cleaned web crawl.
          </P>
        </Section>

        <Section title="What this paper does NOT claim">
          <P>
            It does not claim that a 1.6T sparse model is better, parameter for
            parameter, than a 1.6T dense model. The comparison the paper actually
            makes is at matched FLOPs, not matched parameters. A dense model with the
            same FLOP budget as Switch-C would have far fewer parameters; that is the
            comparison the 7x speedup is measured against. There is no claim that
            sparse models reach the same quality as dense models of equal parameter
            count. They do not.
          </P>
          <P>
            It does not claim that top-1 routing is universally better than top-2.
            The paper makes the narrower claim that top-1 works in its setting and is
            cheaper. Subsequent work — Mixtral, GLaM, most modern MoEs — has largely
            settled on top-2, suggesting the original claim was true under the
            authors' configuration but did not generalize as the recipe matured.
          </P>
          <P>
            It does not claim a free lunch on memory or deployment. The 1.6T
            parameters still have to live somewhere. Switch-C requires sharding
            across the entire TPU pod. The paper's distillation section addresses
            this honestly: distilling a sparse model into a dense one recovers only a
            portion of the quality gain. Deployment of MoE models remains, five years
            later, a real engineering problem.
          </P>
          <P>
            It does not claim improved reasoning or emergent capability. The metrics
            are pre-training perplexity and standard fine-tuning benchmarks — GLUE,
            SuperGLUE, SQuAD, summarization. There is no claim about anything
            resembling reasoning, planning, or the kinds of qualitative behaviors
            that later became the centerpiece of language model discourse.
          </P>
          <P>
            It does not claim the load balancing problem is solved. The auxiliary
            loss helps. Token dropping happens anyway. The paper reports drop rates
            and treats them as a tolerable cost, not as a phenomenon that has been
            eliminated.
          </P>
        </Section>

        <Section title="What the field knows but rarely says">
          <P>
            The Switch Transformer's gains are measured against T5 baselines and on
            T5's pre-training distribution. The 7x sample efficiency number traveled
            widely; the asterisks did not. At very large scales, with very long
            training runs, the gap between sparse and dense narrows. The honest
            position is that sparsity buys you a lot early in training, less later,
            and the crossover point depends heavily on dataset and compute budget.
          </P>
          <P>
            The TPU advantage is real and frequently uncited. Switch
            Transformer-style models are designed around fast all-to-all collectives
            on a homogeneous accelerator pod. The same architecture on commodity GPU
            clusters, with their slower inter-node bandwidth, performs noticeably
            worse. Replicating the paper's wall-clock numbers outside Google's
            infrastructure has been hard for everyone who has tried.
          </P>
          <P>
            Top-1 routing was walked back almost immediately by the rest of the
            field. GShard, GLaM, Mixtral, DeepSeek — none of the successful
            descendants kept it. This is rarely treated as a refutation, but it is
            one. The simplification the paper made famous was, in practice, too
            aggressive.
          </P>
          <P>
            All three authors were at Google Brain at the time of publication. The
            paper is not peer-reviewed in the conference sense — it appeared on
            arXiv and later in JMLR. Code and a partial set of trained checkpoints
            were released, but the largest model and its training pipeline were not.
            Reproduction at full scale is essentially impossible outside a small
            number of well-funded labs.
          </P>
          <P>
            Finally: the term "trillion parameters" did real damage to public
            discourse about model size. Switch-C's 1.6T parameters are not
            comparable, in any meaningful sense, to 1.6T dense parameters. The
            number got quoted; the qualifier got dropped. Practitioners know this.
            Press releases tend not to.
          </P>
        </Section>

        <Section title="Where to read the original">
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "8px 0 0",
              fontSize: 16,
            }}
          >
            <Link
              href="https://arxiv.org/abs/2101.03961"
              label="arXiv (preprint, 2021)"
              detail="arxiv.org/abs/2101.03961"
            />
            <Link
              href="https://jmlr.org/papers/v23/21-0998.html"
              label="JMLR (peer-reviewed, 2022)"
              detail="Journal of Machine Learning Research, Volume 23"
            />
            <Link
              href="https://arxiv.org/pdf/2101.03961"
              label="Free PDF"
              detail="arxiv.org/pdf/2101.03961"
            />
            <Link
              href="https://github.com/google-research/t5x"
              label="Reference code (T5X)"
              detail="github.com/google-research/t5x"
            />
          </ul>
        </Section>

        <footer
          style={{
            marginTop: 80,
            paddingTop: 28,
            borderTop: `1px solid ${HAIR}`,
            fontSize: 13,
            color: GRAPHITE,
            fontFamily:
              'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
            letterSpacing: "0.06em",
          }}
        >
          <div>
            Part of <a href="/research/decoded" style={{ color: CYAN, textDecoration: "none" }}>Decoded</a>
            {" — "}AtomEons reads the papers so the rest of us know what was actually shown.
          </div>
          <div style={{ marginTop: 8 }}>
            No PR. No hype. Every claim sourced.
          </div>
        </footer>
      </article>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: 56 }}>
      <h2
        style={{
          fontSize: 13,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: CYAN,
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
          margin: "0 0 22px",
          fontWeight: 600,
        }}
      >
        {title}
      </h2>
      <div>{children}</div>
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ margin: "0 0 20px", color: CREAM, fontSize: 19, lineHeight: 1.62 }}>
      {children}
    </p>
  );
}

function Link({
  href,
  label,
  detail,
}: {
  href: string;
  label: string;
  detail: string;
}) {
  return (
    <li
      style={{
        padding: "14px 0",
        borderBottom: `1px solid ${HAIR}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        gap: 16,
      }}
    >
      <a
        href={href}
        style={{
          color: CYAN,
          textDecoration: "none",
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
          fontSize: 15,
        }}
      >
        {label}
      </a>
      <span
        style={{
          color: GRAPHITE,
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
          fontSize: 13,
          letterSpacing: "0.04em",
        }}
      >
        {detail}
      </span>
    </li>
  );
}