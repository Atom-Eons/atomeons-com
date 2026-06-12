import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Teach · how AtomEons teaches AI · the lab's methodology",
  description:
    "How the lab teaches. Five-level ladder (Novice → Pilot), Tim Ferriss minimum-effective-dose framing, Andrej Karpathy's 'teach by building' principle, no-AI-slop drill prompts. The internal methodology explained.",
  alternates: { canonical: "https://atomeons.com/teach" },
};

/**
 * /teach — the lab's teaching methodology, explained.
 *
 * /learn is the curriculum. /teach is HOW we made it. This page is
 * the doctrine page for educators who want to understand or replicate
 * the lab's approach.
 */

const PRINCIPLES = [
  { title: "Teach by building.", body: "Borrowed from Andrej Karpathy. Every concept the curriculum teaches, the lab also rebuilds in the smallest working form. RAG is explained AND demonstrated via /api/ask. Prompt injection is explained AND defended against on /q/what-is-prompt-injection. Theory without artifact is rejected." },
  { title: "Minimum effective dose.", body: "Borrowed from Tim Ferriss. Each lesson asks: what's the smallest amount the learner can absorb today that moves them up a level. /learn/synthesis pages are explicit applications: 'tokens and API costs · minimum effective dose,' 'prompt engineering · the 80/20.'" },
  { title: "Calibrate to honest skill levels.", body: "The five-level ladder (Novice → Learner → User → Operator → Pilot) is in every lesson's metadata. A drill targets exactly one level. A 'getting started' lesson at the Novice level is not the same artifact as a 'getting started' lesson at the Operator level, and we don't conflate them." },
  { title: "Drill prompts must be copy-pasteable.", body: "Every lesson with an exercise includes the exact prompt the learner pastes into Claude / ChatGPT / Gemini / Perplexity. No 'something like…' / 'consider asking…' templating. The prompt is the artifact, and we ship the artifact." },
  { title: "Show failure modes by name.", body: "Hallucinations, jailbreaks, prompt injection, context overflow, tool misuse — each named in /learn/failures with a documented case and the lesson that prevents recurrence. Skipping the failure mode is the failure mode." },
  { title: "Honest limits are a feature.", body: "If a model can't do X, say so on the lesson. /vs pages are explicit head-to-heads: 'Claude is better at writing prose; ChatGPT is better at structured output; Gemini has 2M context.' No 'Claude beats GPT' as a marketing claim — the actual comparison axis matters." },
  { title: "Reduce dependency, increase capability.", body: "Every lesson should leave the learner LESS dependent on the lab, not more. The /learn/decision-tree exists so a learner doesn't need to read the whole site; the /glossary exists so a confused learner doesn't have to ask. We are not a teacher's union." },
  { title: "Receipt every claim.", body: "If the curriculum says 'most LLMs hallucinate when context length exceeds X,' the lesson cites which study at which date. If it says 'prompt injection is the #1 OWASP LLM threat,' the lesson links to OWASP LLM Top 10. Mom's-Law-grade · every claim openable." },
];

const FORMATS = [
  { name: "/learn/lesson/*", role: "Single-concept lesson · 600-1200 words · one drill prompt · LearningResource JSON-LD" },
  { name: "/learn/synthesis/*", role: "Tim-Ferriss-method MED page · the 20% of a topic that delivers 80% of the value · ~1500 words" },
  { name: "/learn/atlas/*", role: "Topic deep-dive · 2000-3500 words · multi-section · with real arXiv citations · TechArticle JSON-LD" },
  { name: "/learn/cyber/*", role: "Public-info security catalog · MITRE / NIST / CVE-anchored · 1500-2500 words per topic" },
  { name: "/learn/career/*", role: "Job-anchored applied AI playbooks · resume, salaries, interviews, pathways" },
  { name: "/learn/calc/tools/*", role: "Interactive calculators · ROI, cost, hardware, model-comparator · client-rendered" },
  { name: "/learn/cheatsheet/[lang]", role: "Multi-language quick-reference · Spanish, French, Portuguese, Japanese, Mandarin, Hindi" },
  { name: "/learn/decision-tree", role: "If-this-then-that flowchart for picking the right lesson by goal" },
  { name: "/q/*", role: "AI-search-optimized Q-pages · short-answer-first then longer-answer · 20 covering most-asked LLM questions" },
];

const REFUSALS = [
  "We do not run paid courses. The /learn curriculum is free, CC-BY 4.0, with no email gate.",
  "We do not award certificates. /learn/exam is a self-assessment surface, not credentialing.",
  "We do not partner with bootcamps for affiliate revenue.",
  "We do not promote 'AI breakthrough' marketing campaigns from vendors.",
  "We do not teach 'just trust me' shortcuts. Every move has a why anchored in a paper or production receipt.",
  "We do not target beginners with high-priced upsells. The 11-min /start on-ramp is FREE forever.",
];

export default function TeachPage() {
  return (
    <main className="min-h-screen text-[#F4F4F2]">
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF]">§ teach · the lab's methodology</p>
          <h1 className="mt-6 font-serif text-[44px] font-light leading-[1.04] tracking-[-0.025em] md:text-[64px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            How we made the curriculum.
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-[18px] leading-[1.55] text-[#9CA3AF] md:text-[20px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            /learn is the curriculum. This page is the methodology that
            produced it. If you're an educator, technical writer, or
            indie teacher, the principles below are CC-BY 4.0 — take
            them, modify them, ship your own version.
          </p>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ the eight principles</p>
          <ol className="mt-10 space-y-6">
            {PRINCIPLES.map((p, i) => (
              <li key={i} className="border-l-2 border-[#1F242B] pl-6">
                <div className="flex items-baseline gap-4">
                  <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-[#22F0D5]">{String(i + 1).padStart(2, "0")}</p>
                  <h2 className="font-serif text-[24px] font-light leading-[1.2] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{p.title}</h2>
                </div>
                <p className="mt-3 font-serif text-[16px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ the formats we use</p>
          <ul className="mt-8 divide-y divide-[#1F242B]">
            {FORMATS.map((f) => (
              <li key={f.name} className="grid gap-4 py-4 md:grid-cols-[260px_1fr]">
                <p className="font-mono text-[13px] text-[#F4F4F2]">{f.name}</p>
                <p className="font-serif text-[14px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{f.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF4D4D]">§ what we refuse to do</p>
          <ul className="mt-8 space-y-3">
            {REFUSALS.map((r, i) => (
              <li key={i} className="flex items-baseline gap-4 border-b border-[#1F242B] pb-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a]">×</span>
                <p className="font-serif text-[16px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{r}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ go to the curriculum</p>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {[
              { href: "/learn", label: "The 5-level curriculum" },
              { href: "/start", label: "11-minute novice on-ramp" },
              { href: "/learn/synthesis", label: "Minimum effective dose pages" },
              { href: "/learn/labs", label: "Hands-on labs" },
              { href: "/learn/projects", label: "Build-along projects" },
              { href: "/learn/exam", label: "Self-assessment" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="group border border-[#1F242B] bg-[#0F1114] p-4 transition-colors hover:border-[#22F0D5]">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a] transition-colors group-hover:text-[#22F0D5]">atomeons.com{l.href}</p>
                <p className="mt-2 font-serif text-[17px] font-medium" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{l.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
