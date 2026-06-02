import type { Metadata } from "next";
import Link from "next/link";
import { LearnHeroImage } from "../../_components/LearnHeroImage";

const CALCS = [
  { slug: "tools/cost-calculator", title: "Cost calculator", body: "What an AI workload actually costs per month. Input tokens, output tokens, request volume, model choice — the math for real budgets." },
  { slug: "tools/token-counter", title: "Token counter", body: "How many tokens is your prompt? Estimate input + output for the major models. Plan context budgets." },
  { slug: "tools/model-comparator", title: "Model comparator", body: "Side-by-side cost + capability for Claude vs GPT vs Gemini vs open-weight options. Honest tradeoffs." },
  { slug: "tools/stack-recommender", title: "Stack recommender", body: "Given your use case + budget + latency requirement, what model + framework + hosting stack makes sense." },
  { slug: "tools/hardware-calculator", title: "Hardware calculator", body: "Self-hosting an open-weight model. GPU memory math. Quantization tradeoffs. What you actually need." },
  { slug: "tools/break-even", title: "Break-even calculator", body: "When does self-hosting beat API spending? The crossover analysis with honest assumptions." },
  { slug: "tools/prompt-diff", title: "Prompt diff", body: "Compare two prompts. Measure the change. Estimate the impact on cost and behavior." },
  { slug: "tools/roi", title: "ROI calculator", body: "What's the actual business case for AI in your workflow? Time saved, error rate, opportunity cost — the inputs to a real ROI number." },
  { slug: "tools/redact", title: "Redact estimator", body: "How much of your data needs to be redacted before going to a third-party API? PII rate × volume × cost." },
  { slug: "tools/jailbreak-checker", title: "Jailbreak checker", body: "Estimate how vulnerable your system prompt is to known jailbreak categories. Diagnostic, not exhaustive." },
  { slug: "tools/context-fit", title: "Context fit", body: "Will your RAG corpus + prompt + tool definitions fit in the model's context window with room for the answer?" },
  { slug: "tools/carbon", title: "Carbon calculator", body: "Estimate the energy + CO₂ of your AI workload. Inference-only; training emissions are separate." },
];

export const metadata: Metadata = {
  title: "12 AI calculators · cost, tokens, hardware, ROI, carbon · /learn/calc · AtomEons",
  description: "12 free AI builder calculators — cost, token counter, model comparison, stack recommender, hardware sizing, break-even, ROI, redact, jailbreak, context-fit, carbon. Real assumptions, honest math.",
  alternates: { canonical: "https://atomeons.com/learn/calc" },
  robots: { index: true, follow: true },
};

export default function CalcIndex() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <LearnHeroImage slug="index-calc" alt={"A matte-black slide rule on dark slate with bio-cyan rim light along its center groove."} />
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span> Calc
        </p>
      </div>
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-5xl px-6 py-14 md:py-20">
          <h1 className="mt-6 text-balance text-4xl font-medium leading-[1] tracking-tight md:text-6xl">
            Calculate the actual <span className="text-[#22F0D5]">cost, capacity, ROI.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-base leading-[1.7] text-[#C8CCCE] md:text-[17px]">
            Twelve calculators every AI builder reaches for. Inline math, real model prices, honest assumptions. Each calculator has worked examples you can load with one click.
          </p>
        </div>
      </section>
      <section className="bg-[#0e2520]/15">
        <div className="mx-auto w-full max-w-5xl px-6 py-12 md:py-16">
          <div className="grid gap-4 md:grid-cols-2">
            {CALCS.map((c) => (
              <Link key={c.slug} href={`/learn/calc/${c.slug}`} className="group block rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 transition-colors hover:border-[#22F0D5]/40">
                <h2 className="mt-3 text-xl font-semibold tracking-tight text-[#F2F4F5] group-hover:text-[#22F0D5]">{c.title}</h2>
                <p className="mt-3 text-sm leading-[1.6] text-[#9BA5A7]">{c.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
