import type { Metadata } from "next";
import Link from "next/link";
import { LearnHeroImage } from "../../_components/LearnHeroImage";

const CAREER = [
  { slug: "pathways", title: "Career pathways", body: "Research engineer · ML engineer · MLOps · AI product · prompt engineer · applied AI · the actual job ladders and how they branch." },
  { slug: "skill-tree", title: "Skill tree", body: "The dependency graph of skills. What to learn first, what's optional, what hiring managers actually test for." },
  { slug: "salaries", title: "Real salary ranges", body: "Frontier labs (Anthropic / OpenAI / DeepMind / Meta / xAI) · public-company AI roles · startup ranges · government roles. Bands by level + total comp breakdown." },
  { slug: "resume", title: "AI resume", body: "How to show competence on paper for AI roles in 2026. The specific projects that get interviews. The fluff that gets discarded." },
  { slug: "interviews", title: "Interview prep", body: "What ML/AI interviews actually test. System design for ML systems. ML-specific behavioral questions. The frontier-lab loop." },
  { slug: "non-technical", title: "Non-technical AI roles", body: "Product management, policy, communications, legal, operations, sales, design — the AI jobs that aren't writing code." },
  { slug: "negotiation", title: "Offer negotiation", body: "What's negotiable in 2026 AI offers. Equity vs cash. The specific data points that move the number." },
  { slug: "independent", title: "Independent path", body: "Open-source contributions, paid research, consulting, building a company. The non-W2 routes that actually work in AI." },
];

export const metadata: Metadata = {
  title: "AI careers · 8 honest paths · /learn/career · AtomEons",
  description: "8 deep-dive guides on AI careers — pathways, skill tree, salaries, resume, interviews, non-technical roles, negotiation, the independent path. Real bands, real interview formats, real comp data.",
  alternates: { canonical: "https://atomeons.com/learn/career" },
  robots: { index: true, follow: true },
};

export default function CareerIndex() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <LearnHeroImage slug="index-career" alt={"A dark concrete stairway from the bottom looking up to a single point of bio-cyan light."} />
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span> Career
        </p>
      </div>
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-5xl px-6 py-14 md:py-20">
          <h1 className="mt-6 text-balance text-4xl font-medium leading-[1] tracking-tight md:text-6xl">
            Working in AI, <span className="text-[#22F0D5]">no theater.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-base leading-[1.7] text-[#C8CCCE] md:text-[17px]">
            Eight guides on AI work — what the roles are, what they pay, what the interviews look like, what the resume needs to say, what to negotiate. Public data, current pay bands, no influencer hype.
          </p>
        </div>
      </section>
      <section className="bg-[#08090B]/15">
        <div className="mx-auto w-full max-w-5xl px-6 py-12 md:py-16">
          <div className="grid gap-4 md:grid-cols-2">
            {CAREER.map((c) => (
              <Link key={c.slug} href={`/learn/career/${c.slug}`} className="group block rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 transition-colors hover:border-[#22F0D5]/40">
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
