import type { Metadata } from "next";
import Link from "next/link";
import { LearnHeroImage } from "../../../_components/LearnHeroImage";

/**
 * /learn/atlas/quantization — how big models run on small hardware.
 *
 * What quantization is, the formats (FP16, BF16, FP8, INT8, INT4),
 * the methods (PTQ, QAT, GPTQ, AWQ, GGUF, AQLM, EXL2), the actual
 * quality tradeoffs, and what to run where.
 */

export const metadata: Metadata = {
  title: "Quantization · how big models run on small hardware · /learn/atlas/quantization · AtomEons",
  description:
    "FP16, BF16, FP8, INT8, INT4. GPTQ, AWQ, GGUF, AQLM, EXL2. Quantization-aware training. What you lose, what you save, and what to actually run on what hardware in 2026.",
  alternates: { canonical: "https://atomeons.com/learn/atlas/quantization" },
  openGraph: {
    title: "Quantization · the atlas",
    description: "How big models run on small hardware. Formats, methods, quality tradeoffs.",
    url: "https://atomeons.com/learn/atlas/quantization",
    type: "article",
  },
  robots: { index: true, follow: true },
};

const ACCENT = "#22F0D5";
const WARN = "#FFB87A";

const FORMATS = [
  { name: "FP32", bits: "32", note: "Full single-precision floating point. The training format until BF16/FP16 mixed-precision took over ~2018. Almost nobody uses FP32 for inference in 2026." },
  { name: "FP16 / BF16", bits: "16", note: "Half-precision. BF16 (Google's brain-float-16) has wider dynamic range than FP16 and is the dominant training format in 2026. Inference at FP16/BF16 is the 'no compromise' baseline." },
  { name: "FP8", bits: "8", note: "Newer (H100 + Blackwell hardware support). Two variants: E4M3 (4-bit exponent, 3-bit mantissa) for forward pass, E5M2 (5-bit exponent, 2-bit mantissa) for backward. Frontier-lab training increasingly uses FP8." },
  { name: "INT8", bits: "8", note: "8-bit integer quantization. The classic 'cuts model size in half from FP16' format. Good support across hardware. Acceptable quality on most models." },
  { name: "INT4", bits: "4", note: "4-bit integer. The aggressive quantization point. Modern methods (GPTQ, AWQ, AQLM) recover most quality from FP16 → INT4 conversion. Standard for consumer-hardware inference." },
  { name: "INT2 / ternary / 1-bit", bits: "1-2", note: "Extreme quantization. BitNet (Microsoft, 2024) demonstrated 1.58-bit ternary training preserves most quality. Active research area. Not yet standard for inference." },
];

const METHODS = [
  {
    name: "Post-Training Quantization (PTQ)",
    body: "Take an already-trained FP16 model and apply quantization at inference time. No retraining required. Fast to deploy. Some quality loss, especially at INT4 and below without sophisticated methods.",
    when: "Default for consumer + edge inference. The path most open-weight models take to your GPU.",
  },
  {
    name: "Quantization-Aware Training (QAT)",
    body: "Train the model while simulating quantization in the forward pass. The model learns to compensate for quantization noise during training. Preserves more quality than PTQ at the same bit-width, but requires the full training pipeline.",
    when: "Frontier labs producing their own quantized variants. Out of reach for most teams without training infrastructure.",
  },
  {
    name: "GPTQ",
    body: "(Frantar et al. 2022) One-shot post-training quantization that uses approximate second-order information to minimize per-layer quantization error. Standard 4-bit method for many open-weight models. Used by Hugging Face's transformers + AutoGPTQ.",
    when: "When you want 4-bit inference + your model has GPTQ-quantized variants on the Hub.",
  },
  {
    name: "AWQ",
    body: "(Lin et al. 2023) Activation-aware Weight Quantization. Observes that not all weights are equal — some channels carry more signal than others. Preserves the salient channels at higher precision while aggressively quantizing the rest. Often produces better quality than GPTQ at INT4.",
    when: "AWQ-quantized variants on Hugging Face are a strong default for INT4 inference." ,
  },
  {
    name: "GGUF (llama.cpp ecosystem)",
    body: "File format for the llama.cpp inference engine. Supports multiple quantization levels: Q4_K_M, Q5_K_M, Q6_K, Q8_0, etc. Per-block quantization with optional importance-weighting. The de facto consumer-laptop and Apple Silicon inference format.",
    when: "Running models on Macs, on CPUs, on low-VRAM consumer GPUs, on Raspberry Pis. The Ollama + LM Studio + Jan apps all use GGUF.",
  },
  {
    name: "EXL2 (ExLlamaV2)",
    body: "Mixed-precision quantization where different layers are quantized to different bit-widths based on measured importance. Can achieve effective bit-widths like 4.65 bits per weight while preserving quality better than uniform 4-bit. Strong for high-end consumer GPUs.",
    when: "Single-GPU enthusiast inference. 24GB+ VRAM target audiences." ,
  },
  {
    name: "AQLM",
    body: "(Egiazarian et al. 2024) Additive Quantization for Language Models. Uses lookup-codebook-based quantization to push effective bit-widths to 2-3 bits per weight while preserving most quality. Hugging Face has AQLM variants of many open-weight models.",
    when: "When you need extreme size compression and your hardware/runtime supports it." ,
  },
  {
    name: "BitNet b1.58 (Microsoft 2024)",
    body: "Ternary quantization at training time. Each weight is -1, 0, or +1 (1.58 bits effective). Microsoft demonstrated this preserves quality at scale up to 70B parameters. Implies a future where inference compute drops dramatically. Not yet a deployment standard but an important research direction.",
    when: "Watch this space. Not a 'use today' option but a 'this might reshape inference economics in 18-24 months' bet.",
  },
];

const QUALITY_LOSS = [
  "FP16/BF16 → INT8 is essentially lossless on most models. Measured perplexity delta is well under 1%. Default INT8 unless something specific blocks it.",
  "FP16 → INT4 with modern methods (AWQ, GPTQ, AQLM) typically costs 1-3% on benchmark scores. For most consumer + creative use cases, this is invisible.",
  "FP16 → INT4 on reasoning-heavy tasks (math, code, multi-step logic) can cost 5-10%. If you're using a model for AIME-level math, INT8 or FP16 is safer.",
  "Long-context performance degrades faster under quantization than short-context. A 4-bit model loses more than a 16-bit model when context fills past 64k tokens.",
  "Multilingual + low-resource-language performance is more sensitive to quantization than English. Test in your target languages before assuming quantization is free.",
  "Tool-use + function-calling reliability can degrade under aggressive quantization. If your application requires precise JSON output, validate at your target bit-width.",
];

const HARDWARE = [
  { hw: "Apple Silicon (M-series)", run: "GGUF Q4_K_M for 7B-13B models. Q5_K_M / Q6_K for 30B+. Use Ollama or LM Studio. M-Pro/Max with 32-64GB unified memory can comfortably run 70B at Q4." },
  { hw: "Consumer NVIDIA (24GB+ VRAM)", run: "EXL2 4.0-4.65 bpw for max quality at consumer scale. AWQ INT4 as a more portable alternative. 24GB fits Llama 3.3 70B at 4-bit comfortably." },
  { hw: "Consumer NVIDIA (8-16GB VRAM)", run: "Q4_K_M GGUF on llama.cpp or AWQ INT4 on transformers. 7B-13B models comfortable; 30B borderline." },
  { hw: "Datacenter (H100/H200/Blackwell)", run: "FP8 native for frontier-quality inference. BF16 for the no-compromise baseline. INT8/INT4 only when serving rate matters more than per-token quality." },
  { hw: "Edge / mobile (phones, Raspberry Pi)", run: "Q4 or Q3 GGUF on llama.cpp. 1-7B models only. iOS uses MLX via Apple's MLX framework or Llama.cpp." },
];

export default function AtlasQuantizationPage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <LearnHeroImage slug="atlas-moe" alt="Seven identical matte-black gears in a hexagonal cluster, one glowing cyan." />
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[11px] tracking-[0.08em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn/atlas" className="hover:text-[#22F0D5]">Atlas</Link>{" "}
          <span className="text-[#1A2225]">/</span> Quantization
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            Quantization · the atlas
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            How big models{" "}
            <span style={{ color: ACCENT }}>run on small hardware.</span>
          </h1>
          <p className="mt-8 max-w-[62ch] text-base leading-[1.7] text-[#C8CCCE] md:text-[17px]">
            Quantization is the reason a Llama 3.3 70B model fits on a $2,000 consumer GPU instead of a $30,000 datacenter card. It&apos;s also the reason your output sometimes quietly degrades. This page walks the formats, the methods, the real quality tradeoffs, and what to actually run on what hardware.
          </p>
        </div>
      </section>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            The number formats
          </p>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            Six precision levels.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {FORMATS.map((f) => (
              <article key={f.name} className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-xl font-medium tracking-tight text-[#F2F4F5]">{f.name}</h3>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#9BA5A7]">{f.bits} bits</p>
                </div>
                <p className="mt-3 text-[14px] leading-[1.65] text-[#C8CCCE]">{f.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1A2225] bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            The methods
          </p>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            Eight quantization techniques.
          </h2>
          <div className="mt-10 space-y-8">
            {METHODS.map((m, i) => (
              <article key={m.name} className="border-l-2 pl-6" style={{ borderColor: ACCENT + "30" }}>
                <div className="flex flex-wrap items-baseline gap-4">
                  <p className="font-mono text-[14px] tabular-nums" style={{ color: ACCENT }}>
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-xl font-medium tracking-tight text-[#F2F4F5]">{m.name}</h3>
                </div>
                <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">{m.body}</p>
                <p className="mt-3 max-w-[62ch] text-[14px] leading-[1.65] text-[#9BA5A7]">
                  <span className="text-[#22F0D5]">When: </span>{m.when}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: WARN }}>
            What you lose
          </p>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            Six honest quality observations.
          </h2>
          <ul className="mt-10 space-y-4">
            {QUALITY_LOSS.map((q, i) => (
              <li key={i} className="grid grid-cols-[2.5rem_1fr] gap-4">
                <span className="font-mono text-xl font-bold tabular-nums" style={{ color: WARN }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-base leading-[1.7] text-[#C8CCCE]">{q}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <h2 className="text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            What to run on what hardware.
          </h2>
          <div className="mt-10 space-y-6">
            {HARDWARE.map((h) => (
              <article key={h.hw} className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6">
                <h3 className="text-lg font-medium tracking-tight text-[#F2F4F5]">{h.hw}</h3>
                <p className="mt-3 text-[14px] leading-[1.65] text-[#C8CCCE]">{h.run}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href="/learn/atlas/moe" className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 px-5 py-2.5 text-sm font-medium text-[#22F0D5] transition-colors hover:bg-[#22F0D5]/10">
              Mixture of experts →
            </Link>
            <Link href="/learn/calc/tools/hardware-calculator" className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] px-5 py-2.5 text-sm text-[#C8CCCE] transition-colors hover:border-[#22F0D5]/40 hover:text-[#22F0D5]">
              Hardware calculator →
            </Link>
            <Link href="/learn/atlas" className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] px-5 py-2.5 text-sm text-[#9BA5A7] transition-colors hover:text-[#E7EBED]">
              ← atlas index
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
