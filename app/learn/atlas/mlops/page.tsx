import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MLOps: How models actually live in production · Atlas · AtomEons",
  description: "Training a model is the easy part. Keeping it serving millions of users without melting GPUs or hallucinating into a lawsuit is MLOps.",
  alternates: { canonical: "https://atomeons.com/learn/atlas/mlops" },
  openGraph: {
    title: "MLOps: How models actually live in production",
    description: "From laptop notebook to global inference: the boring infrastructure that makes AI real",
    url: "https://atomeons.com/learn/atlas/mlops",
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
          <span className="text-[#1A2225]">/</span> {`MLOps: How models actually live in production`}
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            {`From laptop notebook to global inference: the boring infrastructure that makes AI real`}
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            {`MLOps: How models actually live in production`}
          </h1>
          <p className="mt-8 max-w-[62ch] text-[17px] leading-[1.65] text-[#C8CCCE]">
            {`Training a model is the easy part. Keeping it serving millions of users without melting GPUs or hallucinating into a lawsuit is MLOps.`}
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
              {`The lifecycle, in plain English`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`A model's life has roughly five stages, and MLOps tooling exists for each one.

**Experimentation.** Someone trains a model on a laptop or a small cluster, tries different hyperparameters, and tracks what works. Weights & Biases (universally called "wandb") and MLflow are the dominant tools here. They log every training run — loss curves, GPU utilization, sample outputs, the exact git commit, the random seed — so that six months later when someone asks "why does the v3 model behave differently than v2," you can answer. Without this, ML teams drown in unreproducibility.

**Model registry.** Once a model works, it gets versioned and stored somewhere durable with metadata: what data trained it, what evaluation scores it has, who approved it, what its known failure modes are. Hugging Face Hub is the closest thing to a public registry. Internal registries usually live in wandb, MLflow, or Vertex AI's model registry. The point is that "the model" stops being a file on someone's disk and becomes an artifact with a lineage.

**Serving.** This is where the rubber meets the GPU. You need to take that registered model and expose it as an API that handles concurrent requests, batches them efficiently, manages memory across requests, and doesn't crash when traffic spikes.

**Monitoring.** Once live, the model needs eyes on it constantly. Latency, throughput, error rates, cost per request, but also ML-specific metrics: are inputs starting to look different from training data? Are outputs starting to drift in unexpected ways?

**Retraining and rollback.** Every model eventually goes stale. You retrain on fresh data, A/B test the new version against the old, and either promote it or roll back.`}
            </div>
          </article>

          <article key={1}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`02`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`Inference serving — the hot center of modern MLOps`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`For large language models specifically, three open-source inference engines dominate.

**vLLM** came out of Berkeley in 2023 and introduced "PagedAttention," a technique that manages the KV cache (the memory storing intermediate attention state during generation) the way operating systems manage virtual memory — in pages that can be reused, swapped, and shared across requests. The result was a dramatic throughput improvement, often 5-10x over naive implementations. vLLM is now the default inference engine for most self-hosted LLM deployments.

**TGI** (Text Generation Inference) is Hugging Face's serving stack. It supports continuous batching, quantization, and streaming, and integrates tightly with the Hugging Face model ecosystem.

**llama.cpp** is the lightweight champion, written in C++ with minimal dependencies, designed to run quantized LLMs on consumer hardware including Apple Silicon. It's why someone with a MacBook Pro can run a 70B parameter model at home. The GGUF file format that llama.cpp uses has become a de facto standard for quantized model distribution.

For closed-source production deployments, the big cloud providers offer managed inference (Amazon Bedrock, Google Vertex AI, Azure OpenAI Service), but a new class of specialist inference platforms has emerged.`}
            </div>
          </article>

          <article key={2}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`03`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`The new inference stack: Modal, Replicate, Anyscale, Together`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`These companies exist because rolling your own GPU infrastructure is genuinely hard, but the big-three clouds are clunky for ML workloads.

**Modal** lets you write a Python function, decorate it with GPU requirements, and have it autoscale across a fleet of GPUs with cold-start times measured in seconds rather than minutes. It's particularly popular for batch inference and irregular workloads.

**Replicate** focuses on running pre-trained models as APIs with a per-second billing model. They popularized the "cog" container format for packaging ML models reproducibly.

**Anyscale** is the commercial home of Ray, the distributed computing framework that underpins much of OpenAI's training infrastructure. Their Anyscale Endpoints product offers managed vLLM-style serving.

**Together AI** specializes in fast, cheap inference for popular open models, often beating the model creators on price by aggressively optimizing the serving stack.

**Weights & Biases** sits above all of these as the experiment-tracking and model-registry layer that most serious teams use regardless of where the model actually runs.`}
            </div>
          </article>

          <article key={3}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`04`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`Drift, the silent killer`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`The most distinctive MLOps problem is drift. A search ranking model trained on 2024 query patterns will silently degrade as user behavior shifts in 2025. The model still returns answers. Latency still looks fine. But the answers slowly get worse, and by the time anyone notices, business metrics are already bleeding.

Two flavors. **Data drift** is when the inputs change distribution — new slang, new product categories, new languages your training set didn't cover. **Concept drift** is when the relationship between inputs and correct outputs changes — what counted as spam in 2020 is not what counts as spam now.

Detection tools like Evidently, Arize, and Fiddler watch distributions of inputs and outputs over time and alert when they shift outside thresholds. For LLMs specifically, the harder problem is detecting quality drift in generated text — there is no clean numerical "is this response good" signal, so teams resort to LLM-as-judge evaluation, human review samples, and proxy metrics like user thumbs-down rates.`}
            </div>
          </article>

          <article key={4}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`05`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`A/B testing and progressive rollout`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`You never just replace a model. You deploy the new version alongside the old, route some percentage of traffic to it (usually starting at 1%), watch the metrics, and ramp up only if everything stays green. If anything regresses — quality, latency, cost, error rate — you roll back instantly. Feature-flag systems like LaunchDarkly and Statsig got pulled into ML workflows for exactly this reason.`}
            </div>
          </article>

          <article key={5}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`06`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`The honest summary`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`MLOps is the part of AI that doesn't get written up in research papers. It's deployment scripts, Kubernetes manifests, Grafana dashboards, on-call rotations at 3am when inference latency spikes, and the slow grind of keeping a model honest as the world around it changes. The labs that ship reliable AI products — OpenAI, Anthropic, Google DeepMind — spend more engineering time on this than on the modeling itself. The models are the engine. MLOps is everything else that lets the car drive.`}
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
