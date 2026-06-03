import type { Metadata } from "next";
import Link from "next/link";
import { LearnHeroImage } from "../../../_components/LearnHeroImage";

/**
 * /learn/atlas/inference — what actually happens when you call a model.
 *
 * Tokenization, KV cache, prefill vs decode, batching, speculative
 * decoding, paged attention, FlashAttention, and the economics of
 * inference at scale.
 */

export const metadata: Metadata = {
  title: "Inference · what happens when you call a model · /learn/atlas/inference · AtomEons",
  description:
    "Tokenization, prefill vs decode, KV cache, paged attention (vLLM), FlashAttention, speculative decoding, continuous batching, Medusa, EAGLE. Why inference costs what it costs in 2026 and what's actually slow.",
  alternates: { canonical: "https://atomeons.com/learn/atlas/inference" },
  openGraph: {
    title: "Inference · the atlas",
    description: "What actually happens when you call a model. Tokenization, KV cache, batching, speculative decoding.",
    url: "https://atomeons.com/learn/atlas/inference",
    type: "article",
  },
  robots: { index: true, follow: true },
};

const ACCENT = "#22F0D5";

const PIPELINE = [
  {
    name: "Tokenization",
    body: "Input text is split into tokens (sub-word pieces). Models use either BPE (Byte-Pair Encoding — Llama, GPT, Mistral) or SentencePiece (Gemini, T5). A single token is ~3-4 characters of English on average. The tokenizer is part of the model contract — using the wrong tokenizer corrupts everything downstream.",
    matters: "Tokenization is the input-cost denominator. 1M tokens of input means whatever the model's tokenizer thinks 1M tokens means — and different models tokenize the same text differently.",
  },
  {
    name: "Prefill",
    body: "First inference pass: the input tokens are processed in parallel through the model. The model computes attention scores for every input token, produces hidden states, and writes them into the KV cache. Prefill is compute-bound (the GPU does parallel matrix math on N tokens at once). On a frontier-tier model, prefill is ~10-100ms per 1k tokens of input.",
    matters: "Prefill cost scales with input length. Long-context prompts cost more in prefill — and prefill cost is paid before the first token of output is generated.",
  },
  {
    name: "Decode",
    body: "Each subsequent token is generated one at a time. The model reads the KV cache, computes attention against it, samples the next token, and updates the cache. Decode is memory-bandwidth-bound (the GPU has to stream the KV cache through HBM on every step). Decode latency is the bottleneck on tokens-per-second throughput.",
    matters: "Decode is what users feel as 'how fast is the model.' A 100-token completion takes 100 decode steps. Per-step latency × 100 = the wait you see.",
  },
  {
    name: "KV cache",
    body: "Stored attention keys + values for every previous token in the current sequence. Memory cost grows linearly with sequence length, model size, and batch. A 70B model with 32k context = ~80GB+ of KV cache per sequence. KV cache management is the dominant memory pressure at serving time.",
    matters: "KV cache is why GPU memory pressure scales with context length. Long-context inference is more expensive than parameter-count alone implies.",
  },
];

const OPTIMIZATIONS = [
  {
    name: "FlashAttention (Dao et al. 2022 + FA2 2023 + FA3 2024)",
    body: "Reformulates the attention computation to avoid materializing the full attention matrix in slow GPU memory. Tile the computation, keep intermediates in fast SRAM. Massive speedup at long context. FA3 is the H100-optimized version. Effectively all 2024+ inference engines use FlashAttention.",
  },
  {
    name: "Paged Attention (vLLM, 2023)",
    body: "Treats the KV cache like virtual memory in an OS: pages are allocated dynamically across sequences instead of pre-allocated worst-case per request. Allows much higher batch utilization. Implemented in vLLM and propagated to most modern inference engines (TGI, TensorRT-LLM, llama.cpp).",
  },
  {
    name: "Continuous batching",
    body: "Process multiple requests in the same forward pass, with new requests joining the batch as old ones finish (instead of waiting for a uniform batch). Massively improves GPU utilization on multi-tenant inference servers. The base inference-serving pattern in 2024-2026.",
  },
  {
    name: "Speculative decoding",
    body: "Use a small draft model to generate several candidate tokens, then verify them in parallel with the large target model. If the target accepts, you got those tokens at draft-model latency. Standard practice on frontier inference systems. Tokens-per-second gains of 2-3× are typical.",
  },
  {
    name: "Medusa + EAGLE (multi-head speculation)",
    body: "Variants of speculative decoding where the speculation heads are trained into the same model (no separate draft model required). EAGLE-2/3 (2024) achieves ~3-5× speedup on some workloads. Active research area; production support is uneven.",
  },
  {
    name: "Prefix caching",
    body: "If many requests share a common prompt prefix (system prompt, conversation history, RAG corpus), cache the prefill work for that prefix once and reuse it across requests. The OpenAI Batch API and Anthropic prompt-caching feature both expose this. Massive cost reduction on multi-tenant + agentic workloads.",
  },
  {
    name: "Grouped-Query Attention (GQA)",
    body: "Reduces the number of attention heads that have separate K and V projections. Llama 2 70B used GQA-8 instead of MHA. Cuts KV cache size by 4-8× with minimal quality loss. Standard in 2023+ frontier models.",
  },
  {
    name: "MQA → GQA → MLA progression",
    body: "Multi-Query Attention (one KV head) was the aggressive original. Grouped-Query Attention is the compromise. Multi-head Latent Attention (MLA, DeepSeek 2024) compresses KV via low-rank factorization for further savings. Each step traded modest quality for major KV-cache savings.",
  },
];

const ECONOMICS = [
  "Input tokens cost much less than output tokens. Typical ratio is 4-10× (e.g., Claude 3.5 Sonnet is $3/M input vs $15/M output). Reason: prefill is parallel (fast); decode is sequential (slow + memory-bound).",
  "Long input is cheap relative to short input plus long output. RAG over a 32k-token corpus is much cheaper than asking the model to generate 32k tokens of analysis.",
  "Prompt caching cuts cost by 5-10× when used. Anthropic's prompt-caching feature charges 25% of input price for cached prefix tokens. OpenAI's similar feature does the same.",
  "Speculative decoding doesn't change the price you pay (you pay for the same model) but does cut your latency. Different from cost-optimization.",
  "Batched inference is cheaper per request when you can wait. OpenAI Batch API + Anthropic Batch API offer 50% price discounts for 24h-asynchronous workloads.",
  "Inference compute can dominate training compute. A model trained once for $100M can spend $10M+ per year on inference at scale. This is why labs increasingly target inference-economically-optimal architectures (smaller models, more tokens, GQA, MQA, MLA).",
];

export default function AtlasInferencePage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <LearnHeroImage slug="tracker-inference-providers" alt="A matte-black aluminum heatsink with a single bio-cyan LED — where inference actually runs." />
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[11px] tracking-[0.08em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn/atlas" className="hover:text-[#22F0D5]">Atlas</Link>{" "}
          <span className="text-[#1A2225]">/</span> Inference
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            Inference · the atlas
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            What actually happens{" "}
            <span style={{ color: ACCENT }}>when you call a model.</span>
          </h1>
          <p className="mt-8 max-w-[62ch] text-base leading-[1.7] text-[#C8CCCE] md:text-[17px]">
            Inference is the slow-and-expensive half of AI in 2026. Training is one-time; inference is forever. This page is the bottom-up walk: tokenization, prefill, decode, KV cache, then the optimizations that make modern serving possible — FlashAttention, paged attention, continuous batching, speculative decoding, prompt caching.
          </p>
        </div>
      </section>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            The pipeline
          </p>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            Four stages, one model call.
          </h2>
          <div className="mt-10 space-y-10">
            {PIPELINE.map((p, i) => (
              <article key={p.name} className="border-l-2 pl-6" style={{ borderColor: ACCENT + "30" }}>
                <div className="flex flex-wrap items-baseline gap-4">
                  <p className="font-mono text-[14px] tabular-nums" style={{ color: ACCENT }}>
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-xl font-medium tracking-tight text-[#F2F4F5] md:text-2xl">{p.name}</h3>
                </div>
                <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">{p.body}</p>
                <p className="mt-3 max-w-[62ch] rounded-lg border border-[#22F0D5]/20 bg-[#08090B]/30 p-4 text-[14px] leading-[1.65] text-[#C8CCCE]">
                  <span className="font-medium text-[#22F0D5]">Why it matters: </span>{p.matters}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1A2225] bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            The optimizations
          </p>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            Eight techniques modern inference depends on.
          </h2>
          <div className="mt-10 space-y-8">
            {OPTIMIZATIONS.map((o) => (
              <article key={o.name}>
                <h3 className="text-xl font-medium tracking-tight text-[#F2F4F5]">{o.name}</h3>
                <p className="mt-3 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">{o.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            Inference economics
          </p>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            Six facts about cost.
          </h2>
          <ul className="mt-10 space-y-4">
            {ECONOMICS.map((e, i) => (
              <li key={i} className="grid grid-cols-[2.5rem_1fr] gap-4">
                <span className="font-mono text-xl font-bold tabular-nums" style={{ color: ACCENT }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-base leading-[1.7] text-[#C8CCCE]">{e}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/learn/atlas/scaling-laws" className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 px-5 py-2.5 text-sm font-medium text-[#22F0D5] transition-colors hover:bg-[#22F0D5]/10">
              Scaling laws (training side) →
            </Link>
            <Link href="/learn/atlas/quantization" className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] px-5 py-2.5 text-sm text-[#C8CCCE] transition-colors hover:border-[#22F0D5]/40 hover:text-[#22F0D5]">
              Quantization →
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
