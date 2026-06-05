import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "State Space Models — S4, S5, and the Selective Scan of Mamba | AtomEons Atlas",
  description:
    "Long-sequence linear-time models replacing softmax attention on certain workloads. S4, S5, Mamba, Mamba-2, and the operational tradeoffs.",
};

const palette = {
  ink: "#08090B",
  panel: "#0F1114",
  paper: "#F4F4F2",
  muted: "#9CA3AF",
  dim: "#5A6068",
  rule: "#1F242B",
  accent: "#22F0D5",
};

export default function StateSpaceModelsPage() {
  return (
    <main
      style={{
        backgroundColor: palette.ink,
        color: palette.paper,
        minHeight: "100vh",
        fontFamily:
          "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        lineHeight: 1.65,
      }}
    >
      <div
        style={{
          maxWidth: "780px",
          margin: "0 auto",
          padding: "80px 24px 120px",
        }}
      >
        <nav
          style={{
            fontSize: "13px",
            color: palette.dim,
            marginBottom: "48px",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          <Link
            href="/learn"
            style={{ color: palette.dim, textDecoration: "none" }}
          >
            Learn
          </Link>
          <span style={{ margin: "0 8px" }}>/</span>
          <Link
            href="/learn/atlas"
            style={{ color: palette.dim, textDecoration: "none" }}
          >
            Atlas
          </Link>
          <span style={{ margin: "0 8px" }}>/</span>
          <span style={{ color: palette.muted }}>State Space Models</span>
        </nav>

        <header style={{ marginBottom: "64px" }}>
          <div
            style={{
              fontSize: "11px",
              color: palette.accent,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: "20px",
              fontWeight: 600,
            }}
          >
            Atlas · Architectures
          </div>
          <h1
            style={{
              fontSize: "44px",
              lineHeight: 1.15,
              fontWeight: 600,
              margin: "0 0 20px 0",
              letterSpacing: "-0.02em",
              color: palette.paper,
            }}
          >
            State Space Models — S4, S5, and the Selective Scan of Mamba
          </h1>
          <p
            style={{
              fontSize: "19px",
              lineHeight: 1.5,
              color: palette.muted,
              margin: 0,
              fontWeight: 400,
            }}
          >
            Long-sequence linear-time models replacing softmax attention on
            certain workloads.
          </p>
        </header>

        <section
          style={{
            backgroundColor: palette.panel,
            border: `1px solid ${palette.rule}`,
            borderRadius: "4px",
            padding: "28px 32px",
            marginBottom: "56px",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              color: palette.dim,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              marginBottom: "12px",
              fontWeight: 600,
            }}
          >
            Summary
          </div>
          <p
            style={{
              fontSize: "15px",
              color: palette.paper,
              margin: 0,
              lineHeight: 1.7,
            }}
          >
            State space models (SSMs) are a family of sequence architectures
            derived from continuous-time linear dynamical systems, discretized
            for use in neural networks. The Structured State Space Sequence
            model (S4) introduced in 2021 demonstrated that a properly
            initialized SSM can match or exceed Transformer performance on
            long-range benchmarks while scaling linearly in sequence length. S5
            simplified the parallel scan formulation. Mamba (2023) introduced
            input-dependent selectivity, allowing the system matrices to vary
            with the input token, recovering content-based reasoning while
            preserving the O(L) cost. This page covers the mechanism, the
            receipts, the operational tradeoffs, and the specific claims that
            are and are not supported.
          </p>
        </section>

        <section style={{ marginBottom: "56px" }}>
          <p
            style={{
              fontSize: "17px",
              lineHeight: 1.7,
              color: palette.paper,
              margin: 0,
              fontStyle: "italic",
              borderLeft: `2px solid ${palette.accent}`,
              paddingLeft: "20px",
            }}
          >
            Attention is quadratic in sequence length. For a decade, the field
            worked around this with sparse approximations, kernelized softmax,
            and chunked attention. State space models took a different route:
            discretize a linear ODE, parameterize it for stability and long
            memory, and run it with a parallel scan. On the Long Range Arena,
            S4 beat every attention variant tested at the time. Mamba pushed
            the result into language.
          </p>
        </section>

        <Section title="What it is">
          <P>
            A state space model is a sequence-to-sequence map defined by a
            continuous-time linear system
          </P>
          <Code>
            {`x'(t) = A x(t) + B u(t)
y(t)  = C x(t) + D u(t)`}
          </Code>
          <P>
            where u(t) is the input signal, x(t) is a latent hidden state of
            dimension N, and y(t) is the output. A, B, C, D are learned
            matrices. To use this in a neural network operating on discrete
            tokens, the system is discretized — typically with a zero-order
            hold or bilinear transform — into a recurrence
          </P>
          <Code>
            {`x_k = A_bar x_{k-1} + B_bar u_k
y_k = C x_k`}
          </Code>
          <P>
            The recurrence form has O(L) cost in sequence length L. The same
            operation can be unrolled into a convolution
          </P>
          <Code>{`y = K * u,    K = (C B_bar, C A_bar B_bar, C A_bar^2 B_bar, ...)`}</Code>
          <P>
            and evaluated with an FFT in O(L log L) during training. The
            discrete-time matrices A_bar, B_bar depend on a learned step size
            Δ.
          </P>
          <P>
            Three properties make this useful as a neural network primitive.
            First, the recurrent form costs O(1) memory and O(N) compute per
            step at inference, which is asymptotically better than attention's
            O(L). Second, careful initialization of A — specifically the HiPPO
            matrix introduced by Gu, Dao, Ermon, and Ré (2020) — gives the
            system the capacity to remember inputs over very long horizons.
            Third, the convolutional form makes training parallelizable on
            accelerators.
          </P>
          <P>
            S4 (Gu, Goel, Ré, 2021) was the first SSM to match Transformer
            accuracy on standard benchmarks while clearing the Long Range
            Arena at sequence lengths up to 16,384. S5 (Smith, Warrington,
            Linderman, 2022) replaced the single-input-single-output
            formulation with a multi-input-multi-output diagonal SSM,
            simplifying the implementation and exposing a clean parallel-scan
            formulation. Mamba (Gu and Dao, 2023) made A, B, C functions of
            the input — selective SSM — and showed competitive scaling on
            language modeling against Transformer baselines up to roughly 3B
            parameters.
          </P>
          <P>
            The category is sometimes called "linear RNNs," "structured state
            space sequence models," or "selective state spaces." All are SSMs.
          </P>
        </Section>

        <Section title="How it actually works">
          <P>The S4 layer is built around three computational tricks.</P>
          <P>
            The first is HiPPO initialization. The matrix A is initialized to
            the HiPPO-LegS matrix, a specific N×N matrix derived from the
            theory of approximating a continuous-time signal with Legendre
            polynomials with exponentially decayed weighting. Gu et al. (2020,
            arXiv:2008.07669) showed that this matrix is the unique solution
            to the problem of compressing an input signal into a
            fixed-dimensional state while preserving optimal reconstruction.
            Without HiPPO initialization, deep SSMs train poorly and forget
            the input within a few hundred tokens.
          </P>
          <P>
            The second is the diagonal-plus-low-rank (DPLR) decomposition. The
            HiPPO-LegS matrix is dense. Computing the convolution kernel K
            naively requires repeated matrix-vector products with A_bar, which
            is O(N^2 L). S4 (Gu, Goel, Ré, 2021, arXiv:2111.00396) showed that
            the HiPPO matrix can be written as a normal matrix plus a low-rank
            correction, and that this structure permits computing K via a
            Cauchy kernel in O(N + L) operations. The result is that training
            is O(L log L) end to end with a small constant.
          </P>
          <P>
            S5 (Smith, Warrington, Linderman, 2022, arXiv:2208.04933)
            simplified this. Instead of DPLR, S5 uses a complex-valued
            diagonal A. The MIMO structure replaces the bank of independent
            SISO SSMs in S4 with a single SSM with vector inputs. The
            recurrence x_k = A_bar x_{`{k-1}`} + B_bar u_k with diagonal A_bar
            is associative under the binary operator (a1, b1) ⊕ (a2, b2) =
            (a1 a2, a2 b1 + b2). This means the sequence of recurrence steps
            can be evaluated by the parallel scan of Blelloch (1990) in O(log
            L) depth and O(L) work on a parallel machine.
          </P>
          <P>
            Mamba (Gu and Dao, 2023, arXiv:2312.00752) introduced selectivity.
            In S4 and S5, A_bar, B_bar, C are fixed across the sequence — the
            system is linear time-invariant (LTI). Mamba makes B, C, and Δ
            functions of the input u_k, computed by small linear projections.
            A remains structured (diagonal) and shared. The forward pass is
            therefore a time-varying linear recurrence
          </P>
          <Code>{`x_k = A_bar(u_k) x_{k-1} + B_bar(u_k) u_k`}</Code>
          <P>
            The selective system is no longer LTI, so the convolutional form
            is gone. The recurrence is still associative under the right
            operator and runs with a parallel scan, but the scan is now custom
            CUDA — Dao's implementation fuses the discretization, scan, and
            output projection into a single kernel that keeps the hidden state
            in SRAM. The Mamba paper reports the selective scan running at
            roughly 3x the throughput of an equally-parameterized
            FlashAttention-2 Transformer on long sequences during inference.
          </P>
          <P>
            A Mamba block stacks: linear projection up, 1D depthwise
            convolution (short, local mixing), SiLU activation, selective SSM,
            gated multiplicative branch, linear projection down. The
            convolution acts as a local mixer because the diagonal SSM alone
            has no cross-channel mixing. The gate is a multiplicative branch
            that the paper describes as analogous to the gated linear unit.
            The full architecture is a stack of Mamba blocks with LayerNorm
            and residual connections.
          </P>
          <P>
            Mamba-2 (Dao and Gu, 2024, arXiv:2405.21060) reformulates the
            selective SSM as a structured masked attention with a specific
            1-semiseparable mask, unifying SSMs and attention under the State
            Space Duality framework. The reformulation makes the selective
            operation expressible as a sequence of matrix multiplications,
            allowing it to use the same tensor-core code paths that make
            attention fast on H100s.
          </P>
        </Section>

        <Section title="Receipts">
          <Bullets
            items={[
              <>
                <strong>HiPPO theory:</strong> Gu, Dao, Ermon, Ré, "HiPPO:
                Recurrent Memory with Optimal Polynomial Projections,"
                NeurIPS 2020, arXiv:2008.07669. Establishes the
                optimal-projection foundation for the A matrix initialization
                used in all subsequent SSMs.
              </>,
              <>
                <strong>S4 paper:</strong> Gu, Goel, Ré, "Efficiently Modeling
                Long Sequences with Structured State Spaces," ICLR 2022,
                arXiv:2111.00396. Introduces the DPLR parameterization.
                Reports 86.09% average on Long Range Arena versus 59.37% for
                the best Transformer variant tested.
              </>,
              <>
                <strong>S5 paper:</strong> Smith, Warrington, Linderman,
                "Simplified State Space Layers for Sequence Modeling," ICLR
                2023, arXiv:2208.04933. Replaces DPLR with diagonal MIMO and
                the parallel scan.
              </>,
              <>
                <strong>Mamba paper:</strong> Gu, Dao, "Mamba: Linear-Time
                Sequence Modeling with Selective State Spaces," 2023,
                arXiv:2312.00752. Introduces input-dependent A, B, C, Δ.
                Reports matching or exceeding Transformer scaling laws up to
                1.4B parameters trained on the Pile.
              </>,
              <>
                <strong>Mamba-2:</strong> Dao, Gu, "Transformers are SSMs:
                Generalized Models and Efficient Algorithms Through Structured
                State Space Duality," ICML 2024, arXiv:2405.21060.
                Establishes the SSD framework connecting attention and
                selective SSMs.
              </>,
              <>
                <strong>Parallel scan:</strong> Blelloch, "Prefix Sums and
                Their Applications," Technical Report CMU-CS-90-190, Carnegie
                Mellon University, November 1990. The associative scan
                algorithm underlying parallel SSM evaluation.
              </>,
              <>
                <strong>Vision adaptation:</strong> Zhu, Liao, Zhang, Wang,
                Liu, Wang, "Vision Mamba: Efficient Visual Representation
                Learning with Bidirectional State Space Model," ICML 2024,
                arXiv:2401.09417. Bidirectional Mamba for image
                classification.
              </>,
              <>
                <strong>Long Range Arena benchmark:</strong> Tay, Dehghani,
                Abnar, Shen, Bahri, Pham, Rao, Yang, Ruder, Metzler, "Long
                Range Arena: A Benchmark for Efficient Transformers," ICLR
                2021, arXiv:2011.04006. The benchmark on which S4 first
                established the SSM advantage at long sequence lengths.
              </>,
            ]}
          />
        </Section>

        <Section title="What practitioners do with it">
          <P>Production use of SSMs falls into a small number of patterns.</P>
          <P>
            <strong>Long-context language modeling at limited GPU budget.</strong>{" "}
            The Mamba codebase at github.com/state-spaces/mamba ships
            pretrained checkpoints up to 2.8B parameters. Teams running
            inference on long documents — legal contracts, codebases, genomic
            sequences — use Mamba to avoid the KV cache that grows linearly
            with context in a Transformer. For a 100K-token context, Mamba's
            hidden state is fixed at N × D (around 16 × 2560 for the 2.8B
            model). The equivalent KV cache in a Transformer of comparable
            parameter count is roughly two orders of magnitude larger. The
            practical move is to fine-tune Mamba-2.8B on domain data and serve
            with the official CUDA selective scan.
          </P>
          <P>
            <strong>Hybrid stacks.</strong> Pure SSMs underperform attention
            on tasks requiring exact copy or in-context lookup over the full
            sequence — the selective scan compresses to a finite state, and
            that state is lossy. The dominant production pattern is hybrid:
            most layers are Mamba, a small fraction are attention. Jamba (AI21
            Labs, 2024, arXiv:2403.19887) interleaves Mamba and attention
            layers at a 7:1 ratio in a Mixture-of-Experts backbone and
            reports competitive results at 256K context. Zamba (Zyphra) and
            Samba (Microsoft, arXiv:2406.07522) follow similar hybrid
            recipes. The standard advice from the Jamba paper is to put
            attention layers roughly every 8 layers and leave the rest as
            SSM.
          </P>
          <P>
            <strong>Biological sequence modeling.</strong> The HyenaDNA work
            (Nguyen, Poli, Faltings, Massaroli, Birch-Sykes, Ermon, Ré,
            Baccus, 2023, arXiv:2306.15794) used a related long-convolution
            architecture to process genomic sequences of up to 1M base pairs
            at single-nucleotide resolution. The Caduceus model (Schiff, Kao,
            Gokaslan, Tang, Cancer, Cao, Chen, Kuleshov, 2024,
            arXiv:2403.03234) brought Mamba into the genomic setting with a
            bidirectional and reverse-complement-equivariant variant.
            Production runs in computational biology use these because
            attention is intractable at megabase scale.
          </P>
          <P>
            <strong>Vision and audio.</strong> Vision Mamba and VMamba
            (arXiv:2401.10166) replace ViT attention with bidirectional or
            2D-scanned SSMs. The bidirectional move is necessary because
            images have no causal structure. For audio, the SaShiMi paper
            (Goel, Gu, Donahue, Ré, 2022, arXiv:2202.09729) used S4 for raw
            audio waveform generation at sequence lengths in the hundreds of
            thousands of samples.
          </P>
          <P>
            <strong>Tooling.</strong> The reference implementations live at
            github.com/state-spaces/s4 (S4, S5) and
            github.com/state-spaces/mamba (Mamba, Mamba-2). Both depend on Tri
            Dao's CUDA kernels. The mamba-ssm pip package wraps these and
            integrates with the Hugging Face transformers library. For
            training, the official recipe uses bf16 with the selective scan
            kept in fp32 — the recurrence is numerically sensitive to the
            discretization step.
          </P>
          <P>
            Operationally: the recurrent form is the right path for streaming
            inference. The convolutional / scan form is the right path for
            batched training. A single SSM layer can serve in either mode
            without retraining.
          </P>
        </Section>

        <Section title="What it is NOT">
          <P>
            <strong>SSMs are not a replacement for attention.</strong> The
            benchmarks that favor SSMs are long-range integration tasks where
            compressing into a fixed state is acceptable. The benchmarks where
            SSMs underperform Transformers are in-context recall tasks — find
            the value associated with a specific key earlier in the sequence.
            The MQAR benchmark (Arora, Eyuboglu, Timalsina, Johnson, Poli,
            Zou, Rudra, Ré, 2024, arXiv:2312.04927) makes this gap explicit.
            Practitioners use hybrid stacks for exactly this reason.
          </P>
          <P>
            <strong>
              SSMs are not recurrent neural networks in the LSTM / GRU sense.
            </strong>{" "}
            Vanilla RNNs use a nonlinear recurrence x_k = tanh(W x_{`{k-1}`} +
            V u_k), which is not parallelizable across the sequence dimension
            because the nonlinearity breaks the associativity needed for a
            scan. SSMs are linear recurrences with structured A — the
            linearity is precisely what makes the scan work. Calling Mamba
            "just an RNN" obscures the part that matters.
          </P>
          <P>
            <strong>SSMs are not the same as linear attention.</strong> Linear
            attention (Katharopoulos, Vyas, Pappas, Fleuret, 2020,
            arXiv:2006.16236) and its descendants (Performer, Linear
            Transformer, RWKV) approximate softmax attention with a kernel
            feature map, giving O(L) complexity. The mechanism is different
            from SSMs — there is no underlying continuous-time dynamical
            system, no HiPPO initialization, no diagonal structure on A. The
            SSD framework of Mamba-2 shows that selective SSMs and a
            restricted form of linear attention are dual under a specific
            structured mask, but the two families have distinct origins and
            different inductive biases.
          </P>
          <P>
            <strong>SSMs are not infinite-memory architectures.</strong> The
            hidden state is finite-dimensional. Compression is lossy. The
            reason S4 with HiPPO initialization recalls inputs over 16K
            tokens on Long Range Arena is that the LegS matrix encodes a
            specific exponentially-weighted Legendre projection, which
            preserves information about the recent past at high fidelity and
            the distant past at progressively lower fidelity. There is no
            theorem that says SSMs can losslessly recall arbitrary
            information from arbitrarily far back.
          </P>
          <P>
            <strong>
              Mamba is not a general drop-in for any Transformer workload.
            </strong>{" "}
            The published comparisons hold at the scales reported in the
            paper, on the tasks reported in the paper. As of mid-2024, the
            largest pure-SSM language model in open release was around 3B
            parameters. Scaling claims beyond that range are extrapolations
            and should be treated as such until pretrained checkpoints exist.
          </P>
        </Section>

        <Section title="Further reading">
          <Bullets
            items={[
              <>
                Gu, Goel, Ré, "Efficiently Modeling Long Sequences with
                Structured State Spaces," ICLR 2022, arXiv:2111.00396.
              </>,
              <>
                Gu, Dao, "Mamba: Linear-Time Sequence Modeling with Selective
                State Spaces," 2023, arXiv:2312.00752.
              </>,
              <>
                Dao, Gu, "Transformers are SSMs: Generalized Models and
                Efficient Algorithms Through Structured State Space Duality,"
                ICML 2024, arXiv:2405.21060.
              </>,
              <>
                Smith, Warrington, Linderman, "Simplified State Space Layers
                for Sequence Modeling," ICLR 2023, arXiv:2208.04933.
              </>,
              <>
                Gu, Dao, Ermon, Ré, "HiPPO: Recurrent Memory with Optimal
                Polynomial Projections," NeurIPS 2020, arXiv:2008.07669.
              </>,
              <>
                Arora, Eyuboglu, Timalsina, et al., "Zoology: Measuring and
                Improving Recall in Efficient Language Models," ICLR 2024,
                arXiv:2312.04927.
              </>,
              <>
                AI21 Labs, "Jamba: A Hybrid Transformer-Mamba Language Model,"
                2024, arXiv:2403.19887.
              </>,
              <>
                Reference implementations: github.com/state-spaces/s4 and
                github.com/state-spaces/mamba.
              </>,
            ]}
          />
        </Section>

        <footer
          style={{
            marginTop: "96px",
            paddingTop: "32px",
            borderTop: `1px solid ${palette.rule}`,
            fontSize: "13px",
            color: palette.dim,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link
            href="/learn/atlas"
            style={{
              color: palette.muted,
              textDecoration: "none",
              letterSpacing: "0.04em",
            }}
          >
            ← Atlas index
          </Link>
          <span style={{ color: palette.dim }}>AtomEons · Atlas</span>
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
    <section style={{ marginBottom: "56px" }}>
      <h2
        style={{
          fontSize: "13px",
          fontWeight: 600,
          color: "#22F0D5",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          margin: "0 0 24px 0",
          paddingBottom: "12px",
          borderBottom: "1px solid #1F242B",
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: "16px",
        lineHeight: 1.75,
        color: "#F4F4F2",
        margin: "0 0 20px 0",
      }}
    >
      {children}
    </p>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <pre
      style={{
        backgroundColor: "#0F1114",
        border: "1px solid #1F242B",
        borderRadius: "4px",
        padding: "16px 20px",
        margin: "0 0 24px 0",
        fontSize: "13px",
        lineHeight: 1.6,
        color: "#22F0D5",
        fontFamily:
          "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace",
        overflowX: "auto",
      }}
    >
      <code>{children}</code>
    </pre>
  );
}

function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        margin: 0,
      }}
    >
      {items.map((item, i) => (
        <li
          key={i}
          style={{
            fontSize: "15px",
            lineHeight: 1.7,
            color: "#F4F4F2",
            margin: "0 0 16px 0",
            paddingLeft: "20px",
            position: "relative",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: 0,
              top: "0.1em",
              color: "#22F0D5",
              fontWeight: 600,
            }}
          >
            ·
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}