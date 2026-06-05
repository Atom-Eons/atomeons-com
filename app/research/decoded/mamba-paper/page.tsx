import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Decoded: Mamba — A sequence model that decides what to remember | AtomEons Research",
  description:
    "A plain-English decoding of Gu and Dao's 2023 paper on selective state-space models. What Mamba actually shows, why it matters, and what it does not claim.",
  openGraph: {
    title: "Decoded: Mamba — Selective State Spaces",
    description:
      "A plain-English decoding of Gu and Dao's 2023 paper on selective state-space models.",
    type: "article",
  },
};

const PALETTE = {
  bg: "#08090B",
  cream: "#F4F4F2",
  graphite: "#9CA3AF",
  hair: "#1F242B",
  cyan: "#22F0D5",
} as const;

export default function MambaDecodedPage() {
  return (
    <main
      style={{
        backgroundColor: PALETTE.bg,
        color: PALETTE.cream,
        fontFamily: "Newsreader, 'Times New Roman', Georgia, serif",
        minHeight: "100vh",
        padding: "4rem 1.5rem 6rem",
      }}
    >
      <article
        style={{
          maxWidth: "44rem",
          margin: "0 auto",
          fontSize: "1.0625rem",
          lineHeight: 1.72,
        }}
      >
        <header style={{ marginBottom: "3rem", borderBottom: `1px solid ${PALETTE.hair}`, paddingBottom: "2rem" }}>
          <p
            style={{
              color: PALETTE.cyan,
              fontSize: "0.75rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              margin: 0,
              fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace",
            }}
          >
            AtomEons Research / Decoded
          </p>
          <h1
            style={{
              fontSize: "2.5rem",
              lineHeight: 1.15,
              fontWeight: 500,
              margin: "1rem 0 1.25rem",
              color: PALETTE.cream,
              letterSpacing: "-0.01em",
            }}
          >
            A sequence model that decides what to remember, in linear time
          </h1>
          <p style={{ color: PALETTE.graphite, fontSize: "0.95rem", margin: 0, fontStyle: "italic" }}>
            Mamba: Linear-Time Sequence Modeling with Selective State Spaces
          </p>
          <p style={{ color: PALETTE.graphite, fontSize: "0.875rem", margin: "0.5rem 0 0" }}>
            Albert Gu, Tri Dao &middot; arXiv:2312.00752 &middot; COLM 2024
          </p>
          <p
            style={{
              color: PALETTE.cream,
              fontSize: "1.0625rem",
              marginTop: "1.75rem",
              fontStyle: "italic",
              borderLeft: `2px solid ${PALETTE.cyan}`,
              paddingLeft: "1rem",
            }}
          >
            Gu and Dao show that a state-space model whose internal dynamics depend on the input
            itself can match Transformer quality on language while running in linear time and
            unbounded context length.
          </p>
        </header>

        <Section title="What the paper actually shows">
          <p>
            The dominant architecture for sequence modeling — the Transformer — has a known and
            unpleasant property. Its self-attention mechanism compares every token to every other
            token, which means cost grows with the square of the sequence length. Feed it a long
            document, and the machine grinds. Researchers have spent the better part of a decade
            trying to escape this, mostly by approximating attention or by reviving recurrent
            networks in some new disguise. Most attempts traded quality for speed.
          </p>
          <p>
            Mamba is a different attempt. Gu and Dao build on a line of work called structured
            state-space models, or S4, which represent a sequence as a continuous-time linear
            dynamical system discretized for use on a computer. These models are linear in sequence
            length and very fast at inference, but earlier versions had a fatal weakness: their
            internal dynamics were fixed, the same for every input. They could not selectively
            attend to what mattered. They were efficient but content-blind.
          </p>
          <p>
            The paper's central move is to make the state-space parameters — specifically the
            discretization step size and two of the projection matrices — functions of the input
            itself. The model now reads a token and decides, on the fly, how much of its hidden
            state to overwrite and how much to keep. This is what the authors call selectivity. It
            restores the content-aware behavior that made attention powerful, but inside a
            recurrence that still runs in linear time.
          </p>
          <p>
            The cost of making these parameters input-dependent is that the convolutional shortcut
            earlier state-space models relied on for fast training no longer applies. Gu and Dao
            recover the speed with a hardware-aware parallel scan implementation that keeps the
            model's state in the GPU's fast on-chip memory and avoids materializing intermediate
            tensors in slow high-bandwidth memory. The result is a model that trains at speeds
            comparable to a well-tuned Transformer, runs inference roughly five times faster, and
            on the authors' benchmarks matches or exceeds Transformer quality at sizes up to 3
            billion parameters across language, DNA, and audio tasks.
          </p>
        </Section>

        <Section title="Why it matters">
          <p>
            If you have used a chatbot and watched it slow down as the conversation grew longer,
            you have felt the quadratic cost of attention with your own patience. Doubling the
            length of a conversation quadruples the work. This is the wall behind every &ldquo;context
            limit&rdquo; you have ever bumped into, every truncation warning, every &ldquo;I can&rsquo;t see
            the earlier part of our chat.&rdquo; It is the reason long documents must be chunked, the
            reason video models struggle with full films, the reason genomic sequence models have
            to cheat with windowing.
          </p>
          <p>
            Mamba is interesting because it suggests this wall is not a law of nature. A model can
            read in a straight line, one token at a time, carrying forward a compressed memory of
            what it has seen, and still perform competitively on the tasks Transformers were
            supposed to own. The implications, if the result holds at larger scales and across
            more domains, are practical and large. Long-context retrieval becomes cheaper.
            Inference on commodity hardware becomes more plausible. Domains with inherently long
            sequences — biology, audio, time series, robotics — become tractable in ways they were
            not.
          </p>
          <p>
            It would be premature to celebrate. The paper&rsquo;s experiments cap out at 3 billion
            parameters, which is small by the standards of the frontier labs. The world has not
            yet seen what selectivity looks like at 70 billion or 400 billion parameters trained
            on the multi-trillion-token corpora the big Transformers eat. There is no guarantee
            that the same advantages persist. There is, however, a credible and well-engineered
            alternative to attention, and the field had been waiting for one for a long time. That
            alone changes the conversation.
          </p>
        </Section>

        <Section title="What the scientists did">
          <p>
            Begin with a state-space model, an idea borrowed from control theory and signal
            processing. Imagine a hidden vector that evolves over time according to a linear
            equation: the next state is a matrix times the current state, plus another matrix
            times the current input. Read out the output as a third matrix times the state. This
            is the same shape of system used to model spring-mass dampers, electrical circuits,
            and aircraft dynamics. Discretize it — turn the continuous-time equations into
            something a computer can step through — and you have a recurrent network with very
            particular structure.
          </p>
          <p>
            Previous work in this line, especially the S4 model from one of the same authors,
            showed that with careful initialization (the so-called HiPPO parameterization, which
            biases the state toward remembering a smoothly-decayed history) these models can be
            trained as a convolution over the input sequence, which makes them fast on GPUs, and
            run as a recurrence at inference, which makes them fast on a phone. They were elegant.
            They were also, on language, not quite as good as Transformers.
          </p>
          <p>
            Gu and Dao diagnose the gap. They run two synthetic tasks — selective copying, where
            the model must reproduce a specific subset of input tokens, and induction heads, where
            it must recognize a pattern and complete it — and observe that S4 fails because its
            dynamics are time-invariant. The same update rule applies whether the current token is
            a comma or the answer the model has been waiting twelve sentences for. They modify S4
            so that the time-step parameter, and the input-to-state and state-to-output projection
            matrices, are produced by small linear layers reading the current token. The model can
            now expand or contract its memory horizon based on what it just saw. They call this
            S6.
          </p>
          <p>
            The price of input-dependent dynamics is that the trick of computing the whole
            sequence as a fixed convolution no longer works. They replace it with a parallel scan,
            an algorithm that computes a chain of dependent operations across a sequence in
            logarithmic depth on parallel hardware. They write this scan as a fused CUDA kernel
            that keeps the state in the GPU&rsquo;s shared memory and never spills the full
            intermediate tensor to global memory. This is the engineering load-bearing step of
            the paper. Without it, the model would be theoretically interesting and practically
            dead.
          </p>
          <p>
            They then wrap the S6 block in a simple architecture — a gated unit similar to those
            used in modern Transformer variants, with a small expansion factor and a depthwise
            convolution — and stack it into a homogeneous network with no attention layers
            anywhere. They train models from 125 million to 2.8 billion parameters on the Pile,
            on DNA sequences from the HG38 human genome, and on speech from LibriLight. They
            report perplexity, downstream benchmarks, inference throughput, and ablations on every
            design decision.
          </p>
        </Section>

        <Section title="What this paper does NOT claim">
          <p>
            First, the paper does not claim that Mamba beats Transformers at every scale. The
            experiments stop at 2.8 billion parameters. The authors are careful about this. They
            show competitive or favorable scaling laws within their range, but they do not
            extrapolate to the sizes where frontier models live, and they should not be read as
            having done so.
          </p>
          <p>
            Second, the paper does not claim that attention is obsolete. Several follow-up works,
            including from Dao himself, have explored hybrid architectures that mix Mamba blocks
            with attention blocks and found the combination outperforms either alone on certain
            tasks. The paper&rsquo;s framing is that selectivity is a missing capability in
            state-space models, not that attention is now wrong.
          </p>
          <p>
            Third, the paper does not claim infinite context for free. The model&rsquo;s hidden
            state is a fixed-size compressed summary. It can attend to arbitrarily long sequences
            in the sense that it processes them in linear time, but information far in the past is
            genuinely compressed, not stored verbatim. On tasks that require exact recall of a
            specific token from far away — the classic needle-in-a-haystack benchmark — pure Mamba
            can underperform attention-based models, and subsequent literature has documented this.
          </p>
          <p>
            Fourth, the paper does not claim Mamba is easier to train. The authors are explicit
            that achieving the reported speeds requires the custom CUDA kernel, careful numerical
            handling of the input-dependent recurrence, and a specific parameterization of the
            time-step that took experimentation to land. The recipe is not a free lunch.
          </p>
          <p>
            Fifth, the paper does not claim selectivity is a new idea in absolute terms.
            Input-dependent recurrence is the defining feature of LSTMs and GRUs from the 1990s
            and 2010s. The contribution is specifically the combination of selectivity with the
            structured state-space formulation and the hardware-aware implementation, not the
            abstract concept of gating.
          </p>
        </Section>

        <Section title="What the field knows but rarely says">
          <p>
            The Mamba result was reproduced quickly by independent groups, and the architecture is
            now well-studied. Two pieces of context worth knowing are usually left out of the
            public narrative.
          </p>
          <p>
            The first is that Mamba&rsquo;s most prominent reported quality wins are at the
            smaller end of the scale range. As models grow, the gap to a well-tuned Transformer
            narrows, and on some benchmarks the comparison becomes ambiguous depending on the
            exact training recipe. This is not a flaw of the paper, which reports honestly. It is
            a flaw in how the result gets summarized in social-media posts, where &ldquo;matches
            Transformers&rdquo; tends to lose its caveats.
          </p>
          <p>
            The second is the hardware story. Mamba&rsquo;s inference speed advantage is real, but
            it depends on a specific kernel that has been refined over time. Naive implementations
            are slower. The advantage on long sequences, where it should be largest, also depends
            on whether the comparison Transformer is using one of the recent attention
            optimizations — FlashAttention, paged attention, sliding-window patterns — that have
            closed some of the cost gap in practice. The comparison is fair, but it is a
            comparison of carefully optimized systems against each other, not a comparison of
            theoretical complexity classes.
          </p>
          <p>
            The follow-up paper, Mamba-2, recasts the same ideas in a framework called state-space
            duality and connects selectivity more explicitly to linear attention. The field has,
            in other words, kept moving. Mamba is best read not as a final answer but as the paper
            that made the next several years of architectural research possible.
          </p>
        </Section>

        <Section title="Where to read the original">
          <ul style={{ paddingLeft: "1.25rem", margin: 0 }}>
            <li style={{ marginBottom: "0.5rem" }}>
              arXiv:{" "}
              <a
                href="https://arxiv.org/abs/2312.00752"
                style={{ color: PALETTE.cyan, textDecoration: "underline" }}
              >
                arxiv.org/abs/2312.00752
              </a>
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              Free PDF:{" "}
              <a
                href="https://arxiv.org/pdf/2312.00752"
                style={{ color: PALETTE.cyan, textDecoration: "underline" }}
              >
                arxiv.org/pdf/2312.00752
              </a>
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              Reference code:{" "}
              <a
                href="https://github.com/state-spaces/mamba"
                style={{ color: PALETTE.cyan, textDecoration: "underline" }}
              >
                github.com/state-spaces/mamba
              </a>
            </li>
            <li>Venue: Conference on Language Modeling (COLM) 2024</li>
          </ul>
        </Section>

        <footer
          style={{
            marginTop: "4rem",
            paddingTop: "2rem",
            borderTop: `1px solid ${PALETTE.hair}`,
            color: PALETTE.graphite,
            fontSize: "0.8125rem",
            fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace",
          }}
        >
          <p style={{ margin: 0 }}>
            AtomEons Research / Decoded series. Every claim sourced to the paper. No PR talk.
          </p>
        </footer>
      </article>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: "3rem" }}>
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: 500,
          color: PALETTE.cream,
          margin: "0 0 1.25rem",
          letterSpacing: "-0.005em",
          borderBottom: `1px solid ${PALETTE.hair}`,
          paddingBottom: "0.5rem",
        }}
      >
        {title}
      </h2>
      <div style={{ color: PALETTE.cream }}>{children}</div>
    </section>
  );
}