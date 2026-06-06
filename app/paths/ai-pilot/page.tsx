import type { Metadata } from "next";
import Link from "next/link";
import { EnrollForm } from "../../_components/V3/EnrollForm";
import { AutoGlyph } from "../../_components/V3/Illustrations";

/**
 * /paths/ai-pilot · the AI Pilot graduation track.
 * Wave 39 · 2026-06-06 · Library-of-Alexandria onboarding ramp.
 *
 * Operator brief: identify the best of the best. Email-only enrollment.
 * Four legs · finish all → added to AI Pilot list.
 */

export const metadata: Metadata = {
  title: "AI Pilot Track · email-only · free",
  description:
    "The AtomEons AI Pilot graduation track. Five levels · twelve atlas deep dives · seven tool cheat sheets · the self-assessment exam. Email-only enrollment. Free. Finish all four legs and the lab adds you to the AI Pilot list.",
  alternates: { canonical: "https://atomeons.com/paths/ai-pilot" },
  openGraph: {
    title: "AI Pilot Track · AtomEons Systems Laboratory",
    description:
      "Four legs to graduate. Email-only. Free. The lab is building its alumni list.",
    url: "https://atomeons.com/paths/ai-pilot",
    type: "article",
  },
};

const LEGS = [
  {
    name: "Leg 1 · The Five Levels",
    detail:
      "Novice → Learner → User → Operator → Pilot. Read each level's flagship lesson. About 60 minutes of reading.",
    flagship_route: "/learn",
    flagship_label: "Start the curriculum",
  },
  {
    name: "Leg 2 · Twelve Atlas Deep Dives",
    detail:
      "Pick any twelve of the 32 atlas pages and read them carefully. Topics include mech-interp, RAG, agents, scaling laws, long context, MoE, RLHF.",
    flagship_route: "/learn/atlas",
    flagship_label: "Atlas index",
  },
  {
    name: "Leg 3 · The Seven Tool Cheat Sheets",
    detail:
      "Claude · Codex · Antigravity · Cursor · Copilot · Aider · MCP. Read each cheat sheet · learn the keyboard shortcuts · know the config files.",
    flagship_route: "/best-practices",
    flagship_label: "Cheat sheets hub",
  },
  {
    name: "Leg 4 · The Self-Assessment Exam",
    detail:
      "Twenty-five questions. Honest self-grading. Submit your score with your enrolled email.",
    flagship_route: "/learn/exam",
    flagship_label: "Open the exam",
  },
];

export default function AiPilotTrackPage() {
  return (
    <main className="mx-auto max-w-[1100px] px-6 py-20 text-[#F4F4F2] md:px-10 md:py-24">
      <header className="border-b border-[#1F242B] pb-12">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
              GRADUATION TRACK · AI PILOT · 2026
            </p>
            <h1
              className="mt-6 text-balance text-[clamp(48px,9vw,108px)] font-light leading-[0.92]"
              style={{ fontFamily: "Newsreader, Georgia, serif", fontWeight: 300 }}
            >
              Become an AI Pilot.
            </h1>
            <p className="mt-6 max-w-[64ch] text-[18px] leading-[1.55] text-[#9CA3AF]">
              Four legs. Email-only enrollment. Free. The lab tracks
              progress · when you finish all four, the lab adds you to
              the AI Pilot alumni list. The list identifies the people
              who actually finished the work · not the loud, the
              completed.
            </p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5]">
              No password · no profile · just an email · alumni list curated by the operator
            </p>
          </div>
          <div className="hidden md:block" style={{ opacity: 0.6 }} aria-hidden>
            <AutoGlyph slug="/paths/ai-pilot" size={160} />
          </div>
        </div>
      </header>

      <section className="mt-12">
        <EnrollForm path="ai-pilot" />
      </section>

      <section className="mt-20">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § The four legs
        </h2>
        <ol className="mt-8 space-y-8 list-decimal pl-6 marker:text-[#22F0D5] marker:font-mono">
          {LEGS.map((leg) => (
            <li key={leg.name} className="pl-2">
              <h3
                className="text-[24px] font-light leading-tight text-[#F4F4F2]"
                style={{ fontFamily: "Newsreader, Georgia, serif" }}
              >
                {leg.name}
              </h3>
              <p className="mt-3 max-w-[80ch] text-[15px] leading-[1.65] text-[#9CA3AF]">
                {leg.detail}
              </p>
              <Link
                href={leg.flagship_route}
                className="mt-3 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5] hover:underline"
              >
                {leg.flagship_label} →
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20 border-l-4 border-[#22F0D5] bg-[#0F1114] p-8">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#22F0D5]">
          § What the AI Pilot list is for
        </h2>
        <p
          className="mt-4 text-[18px] leading-[1.55] text-[#F4F4F2]"
          style={{ fontFamily: "Newsreader, Georgia, serif" }}
        >
          The lab is building the Library of Alexandria for AI. The
          graduates of this track are the librarians. The list helps
          the lab know who actually did the work · so when a question
          comes in that needs a real pilot to answer, we know who to
          call. Alumni get first access to new lab releases · and a
          permanent name in the alumni registry.
        </p>
      </section>

      <section className="mt-20 border-t border-[#1F242B] pt-12">
        <div className="grid gap-4 md:grid-cols-2">
          <Link href="/paths/cyber-pro" className="block border border-[#1F242B] p-5 transition hover:border-[#22F0D5]">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">Sister track</p>
            <p className="mt-2 text-[14px] text-[#F4F4F2]">Cyber Pro · 40-page catalog · frameworks · breaches · careers.</p>
          </Link>
          <Link href="/welcome" className="block border border-[#1F242B] p-5 transition hover:border-[#22F0D5]">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">Tour first?</p>
            <p className="mt-2 text-[14px] text-[#F4F4F2]">90-second introduction to the lab. Six scrolls. Three doors.</p>
          </Link>
        </div>
      </section>

      <footer className="mt-20 border-t border-[#1F242B] pt-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#5A6068]">
          /paths/ai-pilot · email-only · free · Library of Alexandria · last updated 2026-06-06
        </p>
      </footer>
    </main>
  );
}
