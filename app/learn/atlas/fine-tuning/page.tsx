import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Fine-Tuning · Atlas · AtomEons",
  description: "SFT, LoRA, QLoRA, PEFT — the actual menu for specializing GPT-class models, and the brutal rule about when to skip the whole thing.",
  alternates: { canonical: "https://atomeons.com/learn/atlas/fine-tuning" },
  openGraph: {
    title: "Fine-Tuning",
    description: "How to bend a frontier model into a specialist without breaking it",
    url: "https://atomeons.com/learn/atlas/fine-tuning",
    type: "article",
  },
  robots: { index: true, follow: true },
};

const ACCENT = "#22F0D5";

export default function Page() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[11px] tracking-[0.08em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn/atlas" className="hover:text-[#22F0D5]">Atlas</Link>{" "}
          <span className="text-[#1A2225]">/</span> {`Fine-Tuning`}
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            {`How to bend a frontier model into a specialist without breaking it`}
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            {`Fine-Tuning`}
          </h1>
          <p className="mt-8 max-w-[62ch] text-[17px] leading-[1.65] text-[#C8CCCE]">
            {`SFT, LoRA, QLoRA, PEFT — the actual menu for specializing GPT-class models, and the brutal rule about when to skip the whole thing.`}
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24 space-y-12">
          <article key={0}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`01`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`Supervised fine-tuning (SFT)`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`The simplest and oldest method. You assemble a dataset of (input, ideal output) pairs — typically 1,000 to 100,000 examples — and run gradient descent on the model's weights until its outputs match yours. Same loss function as pretraining (next-token prediction), just on hand-curated data.

SFT is what InstructGPT used in 2022 to turn raw GPT-3 into a model that would actually follow instructions instead of just continuing your sentence. It is the first stage of every modern post-training pipeline before RLHF or DPO gets layered on top.

The pain point: full SFT updates *every parameter* in the model. For a 70B-parameter Llama, that is 140 GB of weights in fp16, and you need optimizer state on top — Adam roughly triples memory. You are looking at 8x H100s minimum just to *hold* the training run. That is what killed full fine-tuning for almost everyone outside large labs around 2023.`}
            </div>
          </article>

          <article key={1}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`02`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`LoRA — the trick that changed everything`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`Microsoft Research published LoRA (Low-Rank Adaptation) in 2021, and it became the default by 2023. The insight is mathematical and clean: when you fine-tune a large weight matrix, the *change* you make to it (delta-W) tends to be low-rank. You do not need to store a full 4096-by-4096 delta. You can approximate it as the product of two skinny matrices — a 4096-by-8 and an 8-by-4096 — and lose almost nothing.

In practice this means you freeze the original 70B model entirely, and only train the small adapter matrices. The trainable parameter count drops by 100x to 10,000x. A LoRA adapter for a 70B model is often under 200 MB. You can train it on a single 24 GB consumer GPU. You can store hundreds of them and swap which one is "active" at inference time without reloading the base model.

This is why every Hugging Face model page in 2026 has fifty community LoRA adapters attached.`}
            </div>
          </article>

          <article key={2}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`03`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`QLoRA — fine-tune a 70B model on a gaming laptop`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`Tim Dettmers and the Hugging Face team published QLoRA in 2023. It combined three tricks: load the frozen base model in 4-bit quantization (NF4 format), keep the LoRA adapters in 16-bit, and use a paged optimizer that spills to CPU RAM when GPU memory runs out.

The result was startling: you could fine-tune a 65B-parameter model on a single 48 GB A6000, or a 33B model on a 24 GB 4090. The QLoRA paper showed the resulting models matched full 16-bit fine-tunes on the Vicuna benchmark. The "I need a datacenter to fine-tune" excuse died that summer.`}
            </div>
          </article>

          <article key={3}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`04`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`The PEFT family`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`LoRA and QLoRA live inside a larger category called PEFT — Parameter-Efficient Fine-Tuning. Other members include:

- **Prefix tuning** — train a small set of "virtual tokens" prepended to every input, leave the model frozen.
- **Prompt tuning** — similar, but only at the input embedding layer.
- **Adapter modules** (Houlsby et al., 2019) — insert small trainable bottleneck layers between transformer blocks.
- **IA³** — train tiny scaling vectors that modulate activations.
- **DoRA** (2024) — decomposes the weight delta into magnitude and direction, often beats vanilla LoRA on the same compute budget.

Hugging Face's \`peft\` library is the standard implementation. As of 2026 it supports about a dozen variants and integrates cleanly with \`transformers\` and \`trl\`.`}
            </div>
          </article>

          <article key={4}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`05`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`When fine-tuning beats prompting`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`Fine-tune when:

- You have a **consistent output format** the model must produce on every call — fixed JSON schema, fixed tone, fixed length. Prompting can do this but burns tokens forever; fine-tuning bakes it in.
- You have **proprietary style or knowledge** that does not live on the open internet — your company's voice, your firm's drafting conventions, your support team's empathy patterns.
- You need to **reduce latency and cost at inference**. A fine-tuned 7B model often beats a prompted 70B on narrow tasks, at one-tenth the cost.
- The prompt has ballooned past 4,000 tokens of instructions and few-shot examples. That is a smell — bake it in.`}
            </div>
          </article>

          <article key={5}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`06`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`When prompting beats fine-tuning`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`Prompt instead when:

- You have **fewer than 1,000 high-quality examples**. This is the hard rule. Below that you will overfit to noise and lose the base model's general capability.
- The task changes weekly. Fine-tunes are frozen artifacts; prompts are not.
- You need the model to do **reasoning** rather than format-matching. Fine-tuning a base model on reasoning traces often *hurts* reasoning unless you do it very carefully — it tends to memorize the surface pattern of chain-of-thought without inheriting the underlying capability.
- A frontier model with retrieval (RAG) already gets you to 95%. Then fine-tuning gives marginal lift and adds maintenance cost.`}
            </div>
          </article>

          <article key={6}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`07`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`Domain-specific fine-tunes — the lessons`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`**Med-PaLM 2** (Google, 2023) fine-tuned PaLM 2 on medical Q&A and reached expert-physician parity on US Medical Licensing Exam questions. The lesson: with a strong base model and a domain corpus of curated expert answers, you can match specialists on narrow evaluations.

**BloombergGPT** (Bloomberg, 2023) was a 50B model trained from scratch on financial text. It taught a different lesson: *training from scratch was the wrong call.* By 2024, fine-tuned Llama-2 variants were beating BloombergGPT on most financial benchmarks at a fraction of the cost. The industry pivoted hard away from "build a domain model from scratch" toward "fine-tune the best open base model you can get."

**Code Llama, StarCoder, DeepSeek-Coder** all started from general base models and got specialized via continued pretraining plus SFT. Same pattern: don't start over, specialize.`}
            </div>
          </article>

          <article key={7}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`08`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`The 1000-example rule`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`The folk wisdom that solidified around 2024: do not fine-tune unless you have at least 1,000 high-quality examples, ideally 10,000. Below 1,000, the loss landscape is too sparse — you will catastrophically forget general capability without learning the specialization well. OpenAI's own fine-tuning docs use 50-100 as a hard minimum and 500+ as the realistic floor for usable results. Anthropic, Cohere, and Google publish similar guidance.

Quality matters more than quantity past a threshold. A thousand perfect examples beat ten thousand sloppy ones every time. This is why fine-tuning is mostly a data-curation problem dressed up as an ML problem.`}
            </div>
          </article>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <Link href="/learn/atlas" className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] px-5 py-2.5 text-sm text-[#9BA5A7] transition-colors hover:text-[#E7EBED]">
            ← atlas index
          </Link>
        </div>
      </section>
    </main>
  );
}
