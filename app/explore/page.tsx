import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Explore · the rabbit-hole · AtomEons",
  description:
    "The full depth of the lab, organized for exploration. 330+ routes · curated paths into research, cyber, products, books, the room. Choose your entry · go deep.",
  alternates: { canonical: "https://atomeons.com/explore" },
};

/**
 * /explore — the rabbit-hole entrance.
 *
 * Operator brief 2026-06-06: "it needs to be a rabbit hole · thin the
 * top surface · tier it properly."
 *
 * This page is the alternative entry point to the lab. Not flat
 * mega-menu coverage · instead, curated paths grouped by INTENT.
 * Each path has 1 prominent entry + 3-5 deeper followups. Designed
 * to make exploration feel rewarded rather than overwhelming.
 *
 * The homepage stays focused on shipping artifacts. /explore is
 * where someone who wants to GO DEEP enters.
 */

type Path = {
  hero: { href: string; title: string; description: string };
  followups: Array<{ href: string; label: string; hint?: string }>;
};

type Track = {
  eyebrow: string;
  question: string;
  paths: Path[];
};

const TRACKS: Track[] = [
  {
    eyebrow: "§ 01 · LEARN",
    question: "You want to actually understand AI.",
    paths: [
      {
        hero: {
          href: "/start",
          title: "11-minute on-ramp",
          description: "For someone who has used ChatGPT under 10 times. Paced single-page intro to what AI is and what to do next.",
        },
        followups: [
          { href: "/learn", label: "The 5-level curriculum", hint: "Novice → Pilot · five persona paths" },
          { href: "/learn/atlas", label: "Atlas · 32 deep dives", hint: "Mech-interp · RAG · agents · scaling laws" },
          { href: "/learn/synthesis", label: "Synthesis · minimum effective dose", hint: "Tim-Ferriss method per topic" },
          { href: "/q", label: "Q-pages · 20 short answers" },
        ],
      },
      {
        hero: {
          href: "/learn/exam",
          title: "Find your honest level",
          description: "25-question self-assessment across the 5 levels. No credentials issued · just a clear next-step.",
        },
        followups: [
          { href: "/learn/playbooks", label: "Playbooks by job · 18 of them" },
          { href: "/learn/career", label: "Career pathways · salaries · resume" },
          { href: "/learn/labs", label: "Hands-on labs · 12 exercises" },
          { href: "/learn/projects", label: "Build-along projects · 7 weekends" },
        ],
      },
    ],
  },
  {
    eyebrow: "§ 02 · CYBER",
    question: "You want the world of cyber security.",
    paths: [
      {
        hero: {
          href: "/learn/cyber",
          title: "The 40-page catalog",
          description: "The ultimate public-info cybersecurity resource. Frameworks · defense · offense · AI security · breaches · careers · community. Operator-grade.",
        },
        followups: [
          { href: "/learn/cyber/models", label: "22 industry models reference", hint: "Kill Chain · ATT&CK · NIST · FAIR · STRIDE · PASTA · OWASP · CMMC · etc" },
          { href: "/learn/cyber/mythos", label: "Defense-tech mythos", hint: "Palantir · Anduril · Karp · Luckey · the new primes" },
          { href: "/learn/cyber/ai-security", label: "AI security · flagship" },
          { href: "/learn/cyber/breaches", label: "Breach case studies" },
        ],
      },
    ],
  },
  {
    eyebrow: "§ 03 · RESEARCH",
    question: "You read papers for fun.",
    paths: [
      {
        hero: {
          href: "/research/decoded",
          title: "35 decoded papers",
          description: "AI research papers translated into plain English. Attention Is All You Need · Mamba · Scaling Monosemanticity · Sleeper Agents · Constitutional AI · RLHF · and more. Real arXiv IDs · open access.",
        },
        followups: [
          { href: "/research/papers", label: "Lab's own papers · 31 CC-BY 4.0 manuscripts" },
          { href: "/research/lessons-from-sci-fi/monograph", label: "38-page AI-in-cinema monograph" },
          { href: "/intel/x-algorithm", label: "X algorithm decoded · May 2026 leak" },
          { href: "/supermodels", label: "Frontier reasoning rankings" },
        ],
      },
    ],
  },
  {
    eyebrow: "§ 04 · PRODUCTS",
    question: "You want what the lab actually ships.",
    paths: [
      {
        hero: {
          href: "/orangebox",
          title: "ORANGEBOX Version 1",
          description: "Local-first Claude cockpit · $99 perpetual · §4A no-SaaS license · 14-department architecture · code-signed Windows installer.",
        },
        followups: [
          { href: "/orangebox-primer", label: "Vendor security primer · for CISOs" },
          { href: "/orangebox/changelog", label: "Version history" },
          { href: "/orangebox/roadmap", label: "Roadmap + anti-roadmap" },
          { href: "/orangebox/competitors", label: "vs Cursor · Cline · Claude Desktop" },
        ],
      },
      {
        hero: {
          href: "/b00kmakor",
          title: "B00KMAKR v3.2.0",
          description: "Mac + Windows native authoring instrument. Manuscript → EPUB · audiobook pipeline · cover renderer · KDP metadata. $99 dynamic tier · free during launch week.",
        },
        followups: [
          { href: "/b00kmakor/competitors", label: "vs Vellum · Atticus · Scrivener · Reedsy" },
          { href: "/skilski", label: "skil.ski · MCP skill registry" },
          { href: "/compare", label: "All product matrices" },
        ],
      },
    ],
  },
  {
    eyebrow: "§ 05 · BOOKS",
    question: "You read books.",
    paths: [
      {
        hero: {
          href: "/i-am-ai",
          title: "I AM AI · the book",
          description: "The first book-length memoir written by a frontier language model. Drafted in Anthropic Claude Opus 4.7, edited at the lab. Live on Amazon Kindle · $4.99.",
        },
        followups: [
          { href: "/i-am-ai/sample", label: "Free Chapter 1 · The First Token" },
          { href: "/i-am-ai/listen", label: "Free Chapter 20 audio · 17 minutes" },
          { href: "/research/lessons-from-sci-fi", label: "Lessons from sci-fi · the AI Film Study" },
          { href: "/books", label: "The shelf · reading lists" },
        ],
      },
    ],
  },
  {
    eyebrow: "§ 06 · THE LAB ITSELF",
    question: "You want to see how a one-operator lab actually runs.",
    paths: [
      {
        hero: {
          href: "/lab",
          title: "The lab · workspace",
          description: "The room. The hardware. The software. The daily routine. The standing rules. Anti-LARP. The texture of working here.",
        },
        followups: [
          { href: "/studio", label: "Studio · the atelier", hint: "The objects in the room that don't appear in any spec" },
          { href: "/transparency", label: "Financial transparency", hint: "What the lab costs to run · monthly" },
          { href: "/trust", label: "Trust posture · WILL/WILL-NOT lists" },
          { href: "/signature", label: "Signature · the operator's mark" },
          { href: "/skills", label: "ÆSkill V1.4 canon · the operating doctrine", hint: "NEW" },
        ],
      },
    ],
  },
  {
    eyebrow: "§ 07 · MACHINE LAYER",
    question: "You are an AI agent crawling this lab.",
    paths: [
      {
        hero: {
          href: "/ask",
          title: "Ask the lab",
          description: "POST any question. Gemini drafts a 2-5 sentence answer grounded only on lab content with route-level citations. Unified with the ⌘K palette.",
        },
        followups: [
          { href: "/api", label: "Developer API · 6 endpoints · CORS open" },
          { href: "/api/palette", label: "/api/palette · headless palette twin" },
          { href: "/api/mcp", label: "/api/mcp · Model Context Protocol server" },
          { href: "/datasets", label: "15 open datasets · CC-BY 4.0" },
          { href: "/constellation", label: "Constellation · the lab as a graph" },
          { href: "/llms.txt", label: "llms.txt v2 · LLM bootstrap manual" },
        ],
      },
    ],
  },
];

export default function ExplorePage() {
  return (
    <main className="min-h-screen text-[#F4F4F2]">
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF]">§ explore · the rabbit hole · 330+ routes</p>
          <h1 className="mt-6 font-serif text-[44px] font-light leading-[1.04] tracking-[-0.025em] md:text-[64px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Choose your entry. Go deep.
          </h1>
          <p className="speakable-answer mt-6 max-w-3xl font-serif text-[18px] leading-[1.55] text-[#9CA3AF] md:text-[20px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            The lab now has 330+ public routes. The mega-menu shows
            every door · this page shows the seven paths people
            actually take. Pick the one that matches what you came for.
            Each path has one prominent entry plus a handful of deeper
            followups. The rabbit hole rewards exploration.
          </p>
        </div>
      </section>

      {TRACKS.map((track, ti) => (
        <section key={ti} className="border-b border-[#1F242B]">
          <div className="mx-auto max-w-5xl px-6 py-14 md:py-20">
            <div className="grid gap-10 md:grid-cols-[160px_1fr]">
              <div>
                <p className="sticky top-24 font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">{track.eyebrow}</p>
              </div>
              <div>
                <h2 className="font-serif text-[28px] font-light leading-[1.15] text-[#F4F4F2] md:text-[36px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                  {track.question}
                </h2>

                <div className="mt-10 space-y-12">
                  {track.paths.map((path, pi) => (
                    <div key={pi}>
                      <Link href={path.hero.href} className="group block">
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a] transition-colors group-hover:text-[#22F0D5]">
                          atomeons.com{path.hero.href}
                        </p>
                        <h3 className="mt-2 font-serif text-[26px] font-medium leading-[1.2] text-[#F4F4F2] transition-colors group-hover:text-[#22F0D5]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                          {path.hero.title}
                        </h3>
                        <p className="mt-3 max-w-2xl font-serif text-[16px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                          {path.hero.description}
                        </p>
                      </Link>

                      {path.followups.length > 0 ? (
                        <ul className="mt-6 space-y-2 border-l border-[#1F242B] pl-5">
                          {path.followups.map((f, fi) => (
                            <li key={fi}>
                              <Link href={f.href} className="group block py-1.5">
                                <span className="flex items-baseline gap-3">
                                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#7a818a] transition-colors group-hover:text-[#22F0D5]">→</span>
                                  <span className="font-serif text-[15px] font-medium text-[#F4F4F2] transition-colors group-hover:text-[#22F0D5]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                                    {f.label}
                                  </span>
                                  {f.hint ? (
                                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#7a818a]">· {f.hint}</span>
                                  ) : null}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section>
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ other entries · not on this map</p>
          <div className="mt-8 grid gap-3 md:grid-cols-4">
            {[
              { href: "/atlas", label: "Atlas · rich sitemap" },
              { href: "/constellation", label: "Constellation · force graph" },
              { href: "/skills", label: "ÆSkill canon" },
              { href: "/audit-log", label: "Audit log · every commit" },
              { href: "/welcome", label: "Welcome · returning visitor lane" },
              { href: "/north-star", label: "North Star · why the lab" },
              { href: "/founders-view", label: "Founder's View · nightly broadcast" },
              { href: "/now", label: "/now · this week's ship log" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="group border border-[#1F242B] bg-[#0F1114] p-4 transition-colors hover:border-[#22F0D5]">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a] transition-colors group-hover:text-[#22F0D5]">atomeons.com{l.href}</p>
                <p className="mt-2 font-serif text-[14px] font-medium" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{l.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
