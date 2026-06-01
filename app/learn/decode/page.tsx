import type { Metadata } from "next";
import Link from "next/link";

const DECODE = [
  { slug: "acronyms", title: "Acronyms decoder", body: "RAG · LLM · MoE · CoT · DPO · SAE · MMLU · GPQA · the alphabet soup, defined in one sentence each." },
  { slug: "papers", title: "Papers decoder", body: "'Attention Is All You Need.' 'Chain-of-Thought.' 'Sparse Autoencoders.' The papers everyone cites, in plain English." },
  { slug: "people", title: "People decoder", body: "Hinton, LeCun, Bengio, Sutskever, Karpathy, Hassabis, Amodei, Altman, Musk-on-AI · the people whose names you'll hear, and what they're actually known for." },
  { slug: "jargon", title: "Jargon decoder", body: "'Scaling laws.' 'Distillation.' 'Inference.' 'Tokens.' 'Quantization.' The words the field uses, demystified." },
];

export const metadata: Metadata = {
  title: "AI decoder · jargon, papers, people, acronyms · /learn/decode · AtomEons",
  description: "Plain-language decoders for AI acronyms, papers, people, and jargon. RAG, LLM, MoE, Attention Is All You Need, Hinton/LeCun/Bengio, scaling laws — defined honestly in one sentence each.",
  alternates: { canonical: "https://atomeons.com/learn/decode" },
  robots: { index: true, follow: true },
};

export default function DecodeIndex() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span> Decode
        </p>
      </div>
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-5xl px-6 py-14 md:py-20">
          <h1 className="mt-6 text-balance text-4xl font-medium leading-[1] tracking-tight md:text-6xl">
            The field, <span className="text-[#22F0D5]">in plain English.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-base leading-[1.7] text-[#C8CCCE] md:text-[17px]">
            Four decoders for the AI field&apos;s vocabulary. Acronyms in one sentence. Famous papers without the math. People without the cult of personality. Jargon defined honestly.
          </p>
        </div>
      </section>
      <section className="bg-[#0e2520]/15">
        <div className="mx-auto w-full max-w-5xl px-6 py-12 md:py-16">
          <div className="grid gap-4 md:grid-cols-2">
            {DECODE.map((d) => (
              <Link key={d.slug} href={`/learn/decode/${d.slug}`} className="group block rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 transition-colors hover:border-[#22F0D5]/40">
                <h2 className="mt-3 text-xl font-semibold tracking-tight text-[#F2F4F5] group-hover:text-[#22F0D5]">{d.title}</h2>
                <p className="mt-3 text-sm leading-[1.6] text-[#9BA5A7]">{d.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
