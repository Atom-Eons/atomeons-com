import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Use cases · who AtomEons is for · by persona",
  description:
    "Specific use cases for ATOMEONS products by buyer persona. Solo founders, CISOs, indie authors, AI engineers, students, hobbyists. Named workflows, real outcomes.",
  alternates: { canonical: "https://atomeons.com/use-cases" },
};

type UseCase = {
  persona: string;
  goal: string;
  workflow: string;
  surfaces: string[];
};

const CASES: UseCase[] = [
  {
    persona: "Solo founder shipping an AI product",
    goal: "Ship faster than competitors with 10× the headcount.",
    workflow: "Use ORANGEBOX as your daily Claude cockpit · receipts every action · 10-80× context compression lets you keep entire codebases in working memory · skill primers turn repeatable workflows into one-line invocations · multi-LLM BYO lets you A/B Claude vs GPT vs Gemini per task.",
    surfaces: ["/orangebox", "/skilski", "/learn/synthesis"],
  },
  {
    persona: "CISO evaluating AI tooling for the team",
    goal: "Approve an AI cockpit for 12 developers without a 90-day vendor security review.",
    workflow: "Read /orangebox-primer for the security-focused walkthrough. Verify SHA-256 manifest matches binary. Verify Azure Trusted Signing chain. Confirm no telemetry by running the network-monitor for 24 hours. Done.",
    surfaces: ["/orangebox-primer", "/.well-known/security.txt", "/trust", "/integrations"],
  },
  {
    persona: "Indie novelist with one Mac",
    goal: "Ship a literary novel as ebook + audiobook + hardcover without learning print-shop software.",
    workflow: "Write the manuscript in Scrivener (or anywhere). Drop the file into B00KMAKR. Generate EPUB + audiobook narration + KDP cover dims in one pass. AI disclosure ledger generated automatically. Upload to Amazon + IngramSpark.",
    surfaces: ["/b00kmakor", "/i-am-ai", "/learn/synthesis"],
  },
  {
    persona: "Educator running an AI-literacy course",
    goal: "Assign free, citable, primary-source readings without pushing students into bootcamp upsells.",
    workflow: "Assign /start as week 1, /learn/atlas pages as weeks 2-6, /q pages as supplementary reading. All CC-BY 4.0. No email gate. Students complete /learn/exam to self-assess level before final.",
    surfaces: ["/learn", "/start", "/learn/atlas", "/learn/exam", "/teach"],
  },
  {
    persona: "AI engineer evaluating an LLM for a task",
    goal: "Decide which frontier model to use for a specific production workflow.",
    workflow: "Read /research/decoded on the relevant architecture. Check /supermodels leaderboard for current state-of-the-art. Use /vs pages for honest head-to-head on the task. Build the eval harness yourself per the Pilot-level project on /learn/projects.",
    surfaces: ["/research/decoded", "/supermodels", "/vs", "/learn/projects"],
  },
  {
    persona: "Student starting AI literacy from zero",
    goal: "Get from 'never used ChatGPT' to 'shipping AI features at work' inside 90 days.",
    workflow: "Day 1: /start (11 minutes). Week 1: /learn/[persona] for your job. Week 2-6: lessons 1-30. Week 7-12: /learn/synthesis pages + 2 build-along projects from /learn/projects. Final: /learn/exam to self-assess.",
    surfaces: ["/start", "/learn", "/learn/labs", "/learn/projects", "/learn/exam"],
  },
  {
    persona: "Hobbyist exploring AI for fun",
    goal: "Understand what AI actually does without committing to anything.",
    workflow: "Browse /glossary for the words. Read /q pages for the questions you already have. Try /tools for the AI task router. Read /research/decoded if curiosity catches.",
    surfaces: ["/glossary", "/q", "/tools", "/research/decoded"],
  },
  {
    persona: "Journalist or analyst writing about indie AI economics",
    goal: "Source primary statements about the one-operator-lab model.",
    workflow: "Read /manifesto for the doctrine. /transparency for the numbers. /now for current shipping cadence. /receipts for verified counts. Email the operator for direct quotes via /press.",
    surfaces: ["/manifesto", "/transparency", "/now", "/receipts", "/press"],
  },
  {
    persona: "Other one-operator lab considering shipping like us",
    goal: "Borrow the operating doctrine, stack, and aesthetic.",
    workflow: "/manifesto for doctrine. /colophon for stack. /aesthetic for visual language. /lab for the daily routine. /integrations for the service graph. /transparency for the actual costs. All CC-BY 4.0 — fork it, modify it, ship your version.",
    surfaces: ["/manifesto", "/colophon", "/aesthetic", "/lab", "/integrations", "/transparency"],
  },
  {
    persona: "Existing buyer who wants to deepen their use",
    goal: "Move from 'I bought ORANGEBOX' to 'I am a Pilot using ORANGEBOX'.",
    workflow: "Read /orangebox-primer for advanced operating patterns. Build the skills queue via skil.ski. Run the Pilot-tier projects on /learn/projects. Show your work via /correspondence (if you want).",
    surfaces: ["/orangebox-primer", "/skilski", "/learn/projects"],
  },
];

export default function UseCasesPage() {
  return (
    <main className="min-h-screen text-[#F4F4F2]">
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF]">§ use cases · by persona</p>
          <h1 className="mt-6 font-serif text-[44px] font-light leading-[1.04] tracking-[-0.025em] md:text-[64px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Who AtomEons is for.
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-[18px] leading-[1.55] text-[#9CA3AF] md:text-[20px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Ten named personas, each with a specific goal and the exact
            surfaces on atomeons.com that match. Find your closest match;
            the workflow is the path.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <ol className="space-y-8">
            {CASES.map((u, i) => (
              <li key={i} className="border border-[#1F242B] bg-[#0F1114] p-6 md:p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">PERSONA-{String(i + 1).padStart(2, "0")}</p>
                <h2 className="mt-3 font-serif text-[26px] font-light leading-[1.2] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{u.persona}</h2>
                <p className="mt-3 font-serif text-[15px] italic leading-[1.5] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>goal · {u.goal}</p>
                <p className="mt-4 font-serif text-[15px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                  {u.workflow}
                </p>
                <div className="mt-5 flex flex-wrap gap-2 border-t border-[#1F242B] pt-4">
                  {u.surfaces.map((s) => (
                    <Link key={s} href={s} className="border border-[#1F242B] bg-[#08090B] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#22F0D5] transition-colors hover:bg-[#22F0D5] hover:text-[#08090B]">
                      {s}
                    </Link>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
