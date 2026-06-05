import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "DPO, KTO, ORPO — Post-Training Without a Reward Model | AtomEons Atlas",
  description:
    "Three preference-optimization recipes that skip the reward model entirely. DPO (Rafailov et al, 2023), KTO (Ethayarajh et al, 2024), ORPO (Hong et al, 2024). When each replaces full RLHF.",
};

const NOIR = {
  bg: "#08090B",
  panel: "#0F1114",
  text: "#F4F4F2",
  muted: "#9CA3AF",
  dim: "#5A6068",
  border: "#1F242B",
  accent: "#22F0D5",
};

export default function Page() {
  return (
    <main
      style={{
        background: NOIR.bg,
        color: NOIR.text,
        minHeight: "100vh",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Helvetica, Arial, sans-serif',
        padding: "0",
      }}
    >
      <div
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          padding: "64px 24px 96px",
        }}
      >
        <nav
          style={{
            fontSize: "13px",
            color: NOIR.dim,
            marginBottom: "48px",
            letterSpacing: "0.02em",
          }}
        >
          <Link href="/learn" style={{ color: NOIR.muted, textDecoration: "none" }}>
            learn
          </Link>
          <span style={{ margin: "0 8px", color: NOIR.dim }}>/</span>
          <Link
            href="/learn/atlas"
            style={{ color: NOIR.muted, textDecoration: "none" }}
          >
            atlas
          </Link>
          <span style={{ margin: "0 8px", color: NOIR.dim }}>/</span>
          <span style={{ color: NOIR.text }}>dpo-kto-orpo</span>
        </nav>

        <header style={{ marginBottom: "56px" }}>
          <div
            style={{
              fontSize: "11px",
              color: NOIR.accent,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              marginBottom: "16px",
            }}
          >
            Atlas Entry
          </div>
          <h1
            style={{
              fontSize: "40px",
              lineHeight: "1.15",
              fontWeight: 600,
              margin: "0 0 16px 0",
              letterSpacing: "-0.015em",
            }}
          >
            DPO, KTO, ORPO — Post-Training Without a Reward Model
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: NOIR.muted,
              lineHeight: "1.5",
              margin: 0,
              fontWeight: 400,
            }}
          >
            Three preference-optimization recipes that skip the reward model entirely.
          </p>
        </header>

        <section
          style={{
            background: NOIR.panel,
            border: `1px solid ${NOIR.border}`,
            borderRadius: "4px",
            padding: "28px 32px",
            marginBottom: "48px",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              color: NOIR.dim,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              marginBottom: "12px",
            }}
          >
            Summary
          </div>
          <p
            style={{
              fontSize: "15px",
              lineHeight: "1.7",
              color: NOIR.text,
              margin: 0,
            }}
          >
            Reinforcement Learning from Human Feedback dominated post-training from
            2022 through 2023, but it required training a separate reward model and
            running PPO with all its instability. Direct Preference Optimization
            (Rafailov et al, 2023) collapsed that pipeline into a single supervised
            loss. Kahneman-Tversky Optimization (Ethayarajh et al, 2024) removed the
            requirement for paired preferences. Odds Ratio Preference Optimization
            (Hong et al, 2024) folded preference learning into the supervised
            finetuning step itself. This page covers what each method actually does,
            what they share, where they diverge, and when an operator chooses one
            over the others.
          </p>
        </section>

        <section style={{ marginBottom: "48px" }}>
          <p
            style={{
              fontSize: "17px",
              lineHeight: "1.7",
              color: NOIR.text,
              margin: 0,
              fontStyle: "italic",
              borderLeft: `2px solid ${NOIR.accent}`,
              paddingLeft: "20px",
            }}
          >
            RLHF taught the field that preference data is more useful than
            instruction data alone. It also taught the field that PPO is painful.
            DPO, KTO, and ORPO are the post-PPO consensus: three closed-form or
            near-closed-form alternatives that work on the same preference signal
            without ever instantiating a reward model. They are not equivalent.
            Knowing which fits your data is the operator question.
          </p>
        </section>

        <Section title="What it is">
          <P>
            DPO, KTO, and ORPO are loss functions for aligning a language model to
            human (or AI) preferences without training a separate reward model and
            without running on-policy reinforcement learning. They are alternatives
            to the classical three-stage RLHF pipeline (supervised finetune, reward
            model, PPO) that Ouyang et al introduced in InstructGPT
            (arXiv:2203.02155, 2022) and that Christiano et al originally formalized
            for deep RL in arXiv:1706.03741 (2017).
          </P>
          <P>
            Direct Preference Optimization, introduced by Rafailov et al in
            arXiv:2305.18290 (2023), starts from the same Bradley-Terry preference
            model that the RLHF reward model implicitly assumes. Rafailov's key
            derivation shows that the optimal policy under a KL-constrained RLHF
            objective can be expressed in closed form as a function of the reference
            policy and the implicit reward. Substituting that closed form back into
            the Bradley-Terry likelihood produces a supervised loss on the language
            model itself. There is no reward model. There is no PPO. There is one
            model, one reference, and one batch of preference pairs.
          </P>
          <P>
            Kahneman-Tversky Optimization, introduced by Ethayarajh, Xu, Muennighoff,
            Jurafsky, and Kiela in arXiv:2402.01306 (2024), drops the requirement
            that preference data come in pairs. KTO accepts single examples labeled
            good or bad, drawing the loss from prospect theory's value function —
            the same function that earned Kahneman the 2002 Nobel in Economics. This
            matters because real production data is rarely paired. Thumbs-up and
            thumbs-down arrive independently. KTO works directly on that signal.
          </P>
          <P>
            Odds Ratio Preference Optimization, introduced by Hong, Lee, and Thorne
            in arXiv:2403.07691 (2024), goes further: it eliminates the reference
            model. ORPO adds a small odds-ratio penalty to the standard
            cross-entropy supervised finetuning loss. The model learns preference
            signal during SFT itself, without a separate alignment stage. The
            compute cost is roughly the same as plain SFT.
          </P>
          <P>
            The scope of this page is the practical decision: given a preference
            dataset and a base model, which loss should you actually run. The
            methods are not interchangeable. Their data assumptions differ. Their
            compute profiles differ. Their failure modes differ.
          </P>
        </Section>

        <Section title="How it actually works">
          <P>
            <Strong>DPO.</Strong> Start with a supervised-finetuned base model. Call
            it the reference policy (pi_ref). You will train a copy (pi_theta)
            initialized from pi_ref. Your data is preference pairs: prompt x, chosen
            response y_w, rejected response y_l. The DPO loss for a single pair is
            the negative log sigmoid of beta times the difference of two log-ratios:
            log (pi_theta(y_w | x) / pi_ref(y_w | x)) minus log (pi_theta(y_l | x) /
            pi_ref(y_l | x)). Beta is a temperature controlling deviation from the
            reference (typically 0.1 to 0.5). The gradient pushes the chosen
            response's log-probability up and the rejected response's down,
            normalized against the reference to prevent collapse. No reward model is
            ever materialized. The implicit reward is r(x,y) = beta * log(pi_theta(y|x)
            / pi_ref(y|x)) plus a partition function that cancels in the pairwise
            comparison.
          </P>
          <P>
            <Strong>KTO.</Strong> Same base, same reference, different data shape.
            KTO accepts single examples (x, y, desirable) where desirable is a
            boolean. The loss is built from a Kahneman-Tversky value function: gains
            are concave, losses are convex and steeper, and there is a reference
            point. For a desirable example, the loss rewards pushing the implicit
            reward (the same beta * log-ratio) above the reference point z_0. For an
            undesirable example, it punishes the reward staying near or above z_0.
            The reference point z_0 is computed as the running KL between pi_theta
            and pi_ref on mismatched prompts in the batch. KTO does not require
            equal numbers of desirable and undesirable examples, but the paper
            recommends a desirable-to-undesirable weighting ratio between 1 and 4/3
            when the class imbalance is severe.
          </P>
          <P>
            <Strong>ORPO.</Strong> Different architecture. ORPO has no reference
            model. The total loss per example is the standard SFT cross-entropy on
            y_w (the chosen response) plus a lambda-weighted odds ratio term. The
            odds ratio term is the negative log sigmoid of the log odds ratio
            between chosen and rejected: log(odds(y_w | x) / odds(y_l | x)), where
            odds(y|x) = pi(y|x) / (1 - pi(y|x)). Lambda is small (the paper uses 0.1
            for most experiments). ORPO learns to generate the chosen response while
            simultaneously suppressing the rejected one, all in a single
            SFT-equivalent pass. Because there is no reference model held in GPU
            memory, ORPO's memory footprint is identical to SFT and roughly half of
            DPO's.
          </P>
          <P>
            <Strong>Pipeline differences.</Strong> DPO requires two model copies in
            memory (theta and ref), though the reference can be quantized or
            precomputed-logits. KTO has the same memory profile as DPO. ORPO has
            the same footprint as SFT. DPO and KTO are typically run after SFT as a
            separate stage. ORPO replaces SFT entirely — you train from the
            pretrained base directly on preference data.
          </P>
          <P>
            <Strong>Algorithmic lineage.</Strong> All three descend from the
            Bradley-Terry-Luce preference model (Bradley and Terry, 1952). DPO
            derives from the KL-constrained RL objective in Ouyang et al's
            InstructGPT (arXiv:2203.02155) and the related work in Stiennon et al's
            summarization RLHF (arXiv:2009.01325, 2020). KTO grounds its loss
            function in Kahneman and Tversky's 1979 Econometrica paper on prospect
            theory. ORPO's odds-ratio formulation is novel but cites Hsia et al's
            earlier work on alignment-during-SFT.
          </P>
          <P>
            <Strong>Implementations.</Strong> All three losses are implemented in
            Hugging Face's TRL library (DPOTrainer, KTOTrainer, ORPOTrainer).
            Axolotl exposes all three through YAML configs. Unsloth supports DPO and
            ORPO with 2-5x speedups on consumer GPUs. The reference implementations
            are public and cross-validated.
          </P>
        </Section>

        <Section title="Receipts">
          <ul style={{ paddingLeft: "20px", margin: 0 }}>
            <Bullet>
              DPO original paper: Rafailov, Sharma, Mitchell, Ermon, Manning, Finn.
              "Direct Preference Optimization: Your Language Model is Secretly a
              Reward Model." arXiv:2305.18290 (May 2023, revised through 2024).
              NeurIPS 2023 Outstanding Paper Award.
            </Bullet>
            <Bullet>
              KTO original paper: Ethayarajh, Xu, Muennighoff, Jurafsky, Kiela.
              "KTO: Model Alignment as Prospect Theoretic Optimization."
              arXiv:2402.01306 (February 2024). Published ICML 2024.
            </Bullet>
            <Bullet>
              ORPO original paper: Hong, Lee, Thorne. "ORPO: Monolithic Preference
              Optimization without Reference Model." arXiv:2403.07691 (March 2024).
              Published EMNLP 2024.
            </Bullet>
            <Bullet>
              RLHF baseline: Ouyang, Wu, Jiang, Almeida, Wainwright, Mishkin, Zhang,
              Agarwal, Slama, Ray, et al. "Training language models to follow
              instructions with human feedback." arXiv:2203.02155 (March 2022). The
              InstructGPT paper.
            </Bullet>
            <Bullet>
              PPO algorithm: Schulman, Wolski, Dhariwal, Radford, Klimov. "Proximal
              Policy Optimization Algorithms." arXiv:1707.06347 (July 2017).
            </Bullet>
            <Bullet>
              Bradley-Terry preference model: Bradley and Terry. "Rank Analysis of
              Incomplete Block Designs: I. The Method of Paired Comparisons."
              Biometrika 39(3/4), 1952.
            </Bullet>
            <Bullet>
              Prospect theory foundation: Kahneman and Tversky. "Prospect Theory:
              An Analysis of Decision under Risk." Econometrica 47(2), 1979.
            </Bullet>
            <Bullet>
              Hugging Face TRL library implementations: DPOTrainer, KTOTrainer,
              ORPOTrainer documented at https://huggingface.co/docs/trl (last
              accessed via official docs, 2025).
            </Bullet>
            <Bullet>
              Mistral-7B-Instruct DPO ablation: Tunstall et al. "Zephyr: Direct
              Distillation of LM Alignment." arXiv:2310.16944 (October 2023).
              Demonstrates DPO matching PPO-RLHF on MT-Bench at smaller scale.
            </Bullet>
            <Bullet>
              Llama 3 Instruct DPO disclosure: Meta. "The Llama 3 Herd of Models."
              arXiv:2407.21783 (July 2024). Meta explicitly states the post-training
              stack used DPO (and rejection sampling), not PPO.
            </Bullet>
          </ul>
        </Section>

        <Section title="What practitioners do with it">
          <P>
            The first question an operator answers is what their preference data
            actually looks like. If you have paired comparisons — chosen and
            rejected responses for the same prompt — DPO is the default starting
            point. If you have thumbs-up and thumbs-down telemetry from production
            with no pairing — KTO. If you have not yet done SFT and want to fold
            preference signal into the supervised stage to save a pass — ORPO.
          </P>
          <P>
            In practice, the Hugging Face Zephyr recipe (Tunstall et al,
            arXiv:2310.16944) made the DPO-after-SFT pipeline the default in
            open-weights post-training. The Zephyr-7B model is a Mistral-7B base,
            SFT-finetuned on UltraChat, then DPO-finetuned on UltraFeedback. That
            two-stage stack — SFT then DPO — runs on a single A100 node in a small
            number of hours and produces a model that benchmarks competitively with
            closed proprietary releases of its era. The reference implementation
            lives in Hugging Face's alignment-handbook repository on GitHub.
          </P>
          <P>
            For production teams running thumbs-up / thumbs-down telemetry at
            scale, KTO removes a real engineering tax. You no longer need to pair
            responses (which requires sampling two completions per prompt, ranking
            them, and storing the pair). You can feed independent signals as they
            arrive. ContextualAI, which employs Ethayarajh and Kiela, ships KTO as
            part of its product alignment stack. Argilla (recently acquired by
            Hugging Face) supports KTO-shaped data collection.
          </P>
          <P>
            Compute budget shapes the choice. DPO and KTO require holding two model
            copies in memory (the training policy and the reference). At 7B scale
            that fits on a single 80GB A100 with appropriate precision. At 70B
            scale it requires LoRA or DeepSpeed ZeRO-3. ORPO needs only one model,
            which makes it the cheapest of the three and the easiest to run on
            consumer hardware via Unsloth.
          </P>
          <P>
            Hyperparameters matter. DPO's beta controls how aggressively the policy
            can move from the reference. Too low (under 0.05) and the policy drifts
            and forgets instruction-following capabilities. Too high (over 0.5) and
            preference signal cannot overcome the reference's pull. The Rafailov
            paper uses 0.1 as default; the Zephyr recipe also uses 0.1. KTO has a
            similar beta and additionally exposes class weights for desirable and
            undesirable. ORPO's lambda is small — 0.1 in the paper — and the SFT
            portion of the loss dominates early training.
          </P>
          <P>
            Data quality matters more than method choice. Argilla's research and
            the UltraFeedback team's work show that filtering low-quality preference
            pairs (where chosen and rejected are essentially equivalent in quality,
            or where annotator disagreement is high) improves any of the three
            methods more than switching methods. The TRL documentation explicitly
            recommends preference-pair quality filtering before any post-training
            run.
          </P>
          <P>
            Meta's Llama 3 Herd of Models paper (arXiv:2407.21783) reports that
            their production post-training pipeline uses DPO and rejection
            sampling. They explicitly state they moved away from PPO. This is the
            strongest signal from a frontier lab that the DPO-family approach is no
            longer just the open-source default — it is the industrial default.
          </P>
        </Section>

        <Section title="What it is NOT">
          <P>
            DPO, KTO, and ORPO are not RLHF. They share the Bradley-Terry preference
            assumption with RLHF, and DPO is provably equivalent to an RLHF
            objective under specific conditions, but there is no reinforcement
            learning happening. There is no policy rollout, no on-policy sampling
            during training, no reward model. The training loop is supervised.
            Calling DPO "RLHF without PPO" is shorthand that survives because the
            field has not agreed on a better term; technically these methods are
            offline preference optimization on a fixed dataset.
          </P>
          <P>
            They are not equivalent to each other. The Rafailov paper proves DPO
            recovers the RLHF objective under specific assumptions about the
            Bradley-Terry model and the reference policy. KTO does not — its loss
            surface is shaped by prospect theory's asymmetric value function. ORPO
            does not — it has no reference model and its inductive bias differs.
            Empirical comparisons (the KTO and ORPO papers both include head-to-head
            ablations) show overlapping but not identical performance, with the
            winner depending on data shape and model scale.
          </P>
          <P>
            They are not a replacement for SFT in every case. ORPO can replace SFT
            for some workloads, but DPO and KTO assume an instruction-following
            base. Running DPO directly on a pretrained-only base model produces
            unstable training and poor instruction-following. The Zephyr recipe
            runs SFT first for a reason.
          </P>
          <P>
            They are not constitutional AI. Anthropic's Constitutional AI (Bai et
            al, arXiv:2212.08073, 2022) generates AI-feedback preference data via a
            constitution document and then runs RLAIF (RL from AI Feedback) using a
            reward model. You could feed CAI-generated preferences into DPO, KTO,
            or ORPO — and people do — but CAI is a method for generating preference
            data, not a preference-optimization loss. They are orthogonal.
          </P>
          <P>
            They are not a solution to alignment in the strong sense. They are
            tools for adjusting a model's outputs to match a labeled preference
            distribution. If the preference distribution is wrong, biased, or
            gameable, the resulting model inherits those properties. The methods
            are mechanical. They reflect their training data faithfully.
          </P>
        </Section>

        <Section title="Further reading">
          <ul style={{ paddingLeft: "20px", margin: 0 }}>
            <Bullet>
              Rafailov, Sharma, Mitchell, Ermon, Manning, Finn. "Direct Preference
              Optimization: Your Language Model is Secretly a Reward Model."
              arXiv:2305.18290.
            </Bullet>
            <Bullet>
              Ethayarajh, Xu, Muennighoff, Jurafsky, Kiela. "KTO: Model Alignment as
              Prospect Theoretic Optimization." arXiv:2402.01306.
            </Bullet>
            <Bullet>
              Hong, Lee, Thorne. "ORPO: Monolithic Preference Optimization without
              Reference Model." arXiv:2403.07691.
            </Bullet>
            <Bullet>
              Tunstall et al. "Zephyr: Direct Distillation of LM Alignment."
              arXiv:2310.16944. The reference recipe for open-weights DPO
              post-training.
            </Bullet>
            <Bullet>
              Ouyang et al. "Training language models to follow instructions with
              human feedback." arXiv:2203.02155. The InstructGPT paper that
              established the RLHF stack DPO replaces.
            </Bullet>
            <Bullet>
              Meta. "The Llama 3 Herd of Models." arXiv:2407.21783. Section on
              post-training documents the DPO + rejection sampling stack.
            </Bullet>
            <Bullet>
              Hugging Face TRL documentation: https://huggingface.co/docs/trl —
              DPOTrainer, KTOTrainer, ORPOTrainer reference implementations.
            </Bullet>
            <Bullet>
              Hugging Face alignment-handbook repository:
              https://github.com/huggingface/alignment-handbook — full Zephyr recipe
              and config files.
            </Bullet>
          </ul>
        </Section>

        <footer
          style={{
            marginTop: "72px",
            paddingTop: "32px",
            borderTop: `1px solid ${NOIR.border}`,
            fontSize: "13px",
            color: NOIR.dim,
            letterSpacing: "0.02em",
          }}
        >
          <div style={{ marginBottom: "8px" }}>
            Atlas entry. Last reviewed 2026-06-05.
          </div>
          <Link
            href="/learn/atlas"
            style={{
              color: NOIR.accent,
              textDecoration: "none",
              borderBottom: `1px solid ${NOIR.accent}`,
              paddingBottom: "1px",
            }}
          >
            Back to Atlas
          </Link>
        </footer>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: "48px" }}>
      <h2
        style={{
          fontSize: "22px",
          fontWeight: 600,
          margin: "0 0 20px 0",
          color: "#F4F4F2",
          letterSpacing: "-0.01em",
          paddingBottom: "8px",
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
        fontSize: "15px",
        lineHeight: "1.75",
        color: "#F4F4F2",
        margin: "0 0 18px 0",
      }}
    >
      {children}
    </p>
  );
}

function Strong({ children }: { children: React.ReactNode }) {
  return (
    <strong style={{ color: "#22F0D5", fontWeight: 600 }}>{children}</strong>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li
      style={{
        fontSize: "15px",
        lineHeight: "1.7",
        color: "#F4F4F2",
        marginBottom: "12px",
      }}
    >
      {children}
    </li>
  );
}