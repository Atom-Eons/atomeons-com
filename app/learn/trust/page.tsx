import type { Metadata } from "next";
import Link from "next/link";

const TRUST = [
  { slug: "threat-model", title: "AI threat model", body: "What can go wrong in an AI application — prompt injection, data leakage, model theft, supply-chain compromise. The structured way to think about it." },
  { slug: "prompt-injection", title: "Prompt injection", body: "Direct + indirect. Why it's unsolved. What mitigations actually work in 2026 (spoiler: defense in depth, not 'a better system prompt')." },
  { slug: "data-residency", title: "Data residency", body: "Where your data goes when you call an API. EU vs US data flows. AWS Bedrock vs Azure OpenAI vs direct provider. What you can legally promise customers." },
  { slug: "compliance", title: "AI compliance", body: "EU AI Act timelines. US Executive Orders. SOC 2, ISO 27001, HIPAA, FedRAMP intersections with AI systems. The compliance reality for 2026 builders." },
];

export const metadata: Metadata = {
  title: "AI trust & compliance · /learn/trust · AtomEons",
  description: "AI threat model. Prompt injection mitigation. Data residency. EU AI Act. SOC2/ISO/HIPAA/FedRAMP intersection with AI. Plain-language compliance for 2026 builders.",
  alternates: { canonical: "https://atomeons.com/learn/trust" },
  robots: { index: true, follow: true },
};

export default function TrustIndex() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span> Trust
        </p>
      </div>
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-5xl px-6 py-14 md:py-20">
          <h1 className="mt-6 text-balance text-4xl font-medium leading-[1] tracking-tight md:text-6xl">
            What enterprises <span className="text-[#22F0D5]">actually ask you to prove.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-base leading-[1.7] text-[#C8CCCE] md:text-[17px]">
            Four guides on the security + compliance layer of AI applications. The threat model, the unsolved prompt-injection problem, where your data actually goes, what the EU AI Act / SOC2 / HIPAA / FedRAMP intersection looks like in 2026.
          </p>
        </div>
      </section>
      <section className="bg-[#0e2520]/15">
        <div className="mx-auto w-full max-w-5xl px-6 py-12 md:py-16">
          <div className="grid gap-4 md:grid-cols-2">
            {TRUST.map((t) => (
              <Link key={t.slug} href={`/learn/trust/${t.slug}`} className="group block rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 transition-colors hover:border-[#22F0D5]/40">
                <h2 className="mt-3 text-xl font-semibold tracking-tight text-[#F2F4F5] group-hover:text-[#22F0D5]">{t.title}</h2>
                <p className="mt-3 text-sm leading-[1.6] text-[#9BA5A7]">{t.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
