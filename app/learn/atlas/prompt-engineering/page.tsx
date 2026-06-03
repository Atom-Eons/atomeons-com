import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Prompt Engineering · Atlas · AtomEons",
  description: "The empirical art of asking models for what you want. Half craft, half cargo cult, mostly obsoleted by the next model.",
  alternates: { canonical: "https://atomeons.com/learn/atlas/prompt-engineering" },
  openGraph: {
    title: "Prompt Engineering",
    description: "What actually works when you talk to a 2026-era language model",
    url: "https://atomeons.com/learn/atlas/prompt-engineering",
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
          <span className="text-[#1A2225]">/</span> {`Prompt Engineering`}
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            {`What actually works when you talk to a 2026-era language model`}
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            {`Prompt Engineering`}
          </h1>
          <p className="mt-8 max-w-[62ch] text-[17px] leading-[1.65] text-[#C8CCCE]">
            {`The empirical art of asking models for what you want. Half craft, half cargo cult, mostly obsoleted by the next model.`}
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
              {`Chain-of-thought and its variants`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`The single most important prompting discovery was chain-of-thought, introduced by Jason Wei and collaborators at Google in 2022. The trick: instead of asking a model for an answer, ask it to "think step by step" first. Reasoning performance jumped sharply on math and logic benchmarks. This was the seed of everything that came after.

Variants proliferated. Zero-shot CoT (Kojima et al., "Let's think step by step") showed the magic phrase worked without any examples. Self-consistency (Wang et al. at Google) sampled multiple reasoning paths and took the majority vote — a cheap accuracy boost. Tree-of-thought (Yao et al. at Princeton and Google DeepMind, 2023) let the model branch, evaluate, and backtrack across reasoning paths. Graph-of-thought generalized the structure further. Least-to-most prompting decomposed a hard problem into easier subproblems first.

By 2026 most of this is obsolete at the prompt layer. Modern reasoning models — OpenAI's o-series, Anthropic's extended-thinking Claudes, DeepSeek-R1, Google's Gemini thinking modes — bake chain-of-thought into the model itself via reinforcement learning. You no longer write "think step by step." The model decides when and how much to think. Prompt-level CoT still helps weaker or non-reasoning models, but the frontier has eaten it.`}
            </div>
          </article>

          <article key={1}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`02`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`Few-shot vs zero-shot`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`Few-shot prompting — giving the model a handful of input-output examples before the real query — was the original superpower of GPT-3 in the 2020 paper that launched the whole field ("Language Models are Few-Shot Learners," Brown et al.). For years it was the default trick: show three to five examples, then ask.

In 2026 the picture inverted. Frontier models are so strong at zero-shot instruction-following that few-shot examples often hurt more than they help. Examples can over-constrain the format, leak biases, or distract from the real task. The exception is when you need exact structural mimicry — a very specific JSON shape, a particular tone, an unusual edge case. There a single tight example still earns its keep.`}
            </div>
          </article>

          <article key={2}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`03`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`Self-consistency, ensembling, and best-of-N`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`Self-consistency was the first real ensembling trick — sample the model multiple times at non-zero temperature, then take the majority answer. It still works. Modern variants include best-of-N (sample N completions, score them with a reward model or verifier, keep the best) and majority-vote across diverse reasoning paths. These are now usually applied inside the model's training loop rather than at prompt time, but for stubborn tasks they remain a cheap accuracy boost.`}
            </div>
          </article>

          <article key={3}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`04`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`Structured outputs`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`Getting models to emit clean JSON used to require begging, schema-pasting, and post-hoc regex repair. OpenAI's "structured outputs" feature (2024) and Anthropic's tool-use schemas changed that — constrained decoding now guarantees the model can only emit tokens consistent with a given JSON schema. The model is literally prevented from typing invalid syntax. This is a hard win. If your downstream consumer needs structured data, use the API's structured output mode rather than prompting tricks.

The remaining art is in schema design. Loose schemas give the model room to be useful but produce messy data. Tight schemas force discipline but sometimes make the task impossible. Good schemas use enums for known categories, optional fields generously, and explicit reasoning fields when you want the model to think before it commits.`}
            </div>
          </article>

          <article key={4}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`05`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`System vs user prompts`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`The system prompt sets persona, rules, and persistent constraints. The user prompt is the per-turn request. Most labs train models to weight system prompts heavily — they are the operator's voice. Anthropic publishes its production Claude system prompts; OpenAI does not. Atom's view, shared by most builders by 2026: keep system prompts short, declarative, and durable. Put examples and dynamic context in the user turn or as separate messages. Long mushy system prompts that try to encode everything are usually worse than terse ones.`}
            </div>
          </article>

          <article key={5}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`06`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`Tool-use prompting`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`When a model can call tools — search, code execution, a database, an MCP server — the prompting problem shifts. You are no longer asking for an answer; you are asking for a sequence of tool calls that lead to an answer. The patterns that work: name tools clearly, describe what each is for in one sentence, give parameter schemas, and trust the model to decide when to call them. ReAct (Yao et al., 2022) was the original "reason + act" loop and is still the conceptual base. Modern agent frameworks — Claude's tool-use, OpenAI's function calling, LangGraph, AutoGen, CrewAI — are all elaborations.`}
            </div>
          </article>

          <article key={6}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`07`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`DSPy and the programmatic turn`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`DSPy, from Omar Khattab and the Stanford NLP group, is the most serious attempt to kill prompt engineering as a discipline. Instead of writing prompts by hand, you write Python programs that declare the input-output signature, then DSPy's compiler automatically generates and optimizes the prompt for you using techniques like bootstrapped few-shot examples and MIPRO instruction optimization. The pitch: treat prompts as compiled artifacts, not source code.

It works. For pipelines with measurable end-to-end accuracy, DSPy beats human-written prompts often enough to matter. The limitation is that you need a metric — a way to score outputs — which not every task offers. Related tools include TextGrad, which back-propagates natural-language feedback through prompt chains.`}
            </div>
          </article>

          <article key={7}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`08`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`The honest take`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`Most prompt-engineering tricks have a half-life of six to twelve months. Magic phrases that lifted GPT-3.5 are no-ops on Claude 4 and GPT-5. Elaborate prompt templates from 2023 read like astrology in 2026. The techniques that survive are the structural ones: structured outputs, tool schemas, clear system roles, and programmatic optimization frameworks like DSPy. The ones that fade are the incantations.

The deeper truth is that prompt engineering is a UI problem dressed in NLP clothes. Good prompts have the same properties as good function signatures: unambiguous input, explicit output shape, named edge cases, no hidden state. Treat the model as a service with a flaky contract, write the contract carefully, test it with real examples, and accept that the next model will rewrite half your work.`}
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
