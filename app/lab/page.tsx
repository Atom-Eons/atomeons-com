import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The lab · physical workspace · daily routine",
  description:
    "Where the work actually happens. The desk, the machines, the routine. One operator, one room, Marco Island Florida. No team, no investors, no co-working space. Just receipts.",
  alternates: { canonical: "https://atomeons.com/lab" },
};

/**
 * /lab — anti-LARP credibility surface.
 *
 * Most one-operator labs hide the workshop because the LARP requires
 * "we" pronouns and stock photos of crowded coworking spaces. This
 * page is the opposite. The physical room, the machines on the desk,
 * the daily working pattern, all named. The point is that an operator
 * with nothing to hide can document it.
 *
 * Numbers verifiable against /transparency. Hardware list anchored
 * against /colophon.
 */

const HARDWARE = [
  { what: "Apple Mac mini M2 Pro · 16 GB · 512 GB", role: "primary build machine · Next.js dev, Vercel deploys, all repos" },
  { what: "Custom Windows 11 desktop · Ryzen 9 7950X · 64 GB · RTX 4090 24 GB", role: "ORANGEBOX dev target · local LLM testing · UE5 game build" },
  { what: "13-inch MacBook Pro · M3 Pro · 18 GB", role: "travel / coffee-shop writing rig" },
  { what: "Studio Display · 27-inch 5K", role: "main monitor · color-accurate for V3 noir QA" },
  { what: "Wacom Intuos Medium", role: "for press kit composition and direct-to-canvas work" },
  { what: "RØDE NT-USB Mini + Beyerdynamic DT 770 Pro 80Ω", role: "audiobook narration QA · podcast appearances" },
  { what: "Anker 60% mechanical keyboard · MX brown", role: "primary input. silent rubber rings for after-midnight passes" },
];

const SOFTWARE_DAILY = [
  "Claude Code (Sonnet / Opus tiers, MCP servers wired)",
  "Cursor IDE",
  "VS Code (for Next.js work specifically)",
  "iTerm2 + Warp",
  "Git via gh CLI",
  "Vercel CLI",
  "Supabase CLI",
  "Stripe CLI",
  "Loops dashboard",
  "Linear (lightweight todo)",
  "Obsidian (lab-private notes, never published)",
  "Tailscale (operator-only mesh)",
  "1Password",
];

const ROUTINE = [
  { time: "06:30", what: "Wake. No phone for 30 minutes. Coffee, water, journal." },
  { time: "07:00", what: "Walk the seawall. 25 minutes. Marco Island, Florida — operator's only meeting room with the Gulf." },
  { time: "08:00", what: "Sit. Read overnight events: arXiv firehose, Anthropic + OpenAI + Google releases, Hacker News top 30. Notes go into Obsidian, not published." },
  { time: "09:00", what: "Single biggest leverage move of the day. Usually a long-form artifact: research paper draft, lesson sequence, new product surface. No meetings exist." },
  { time: "12:30", what: "Lunch + 45-minute deliberate offline window. No phone." },
  { time: "13:30", what: "Build session 2. Ship work: code, deploy, content shipping into /now." },
  { time: "16:30", what: "Inbox sweep. Reply to every direct buyer email. Reply to every press inquiry." },
  { time: "17:30", what: "Family / errands / non-lab life." },
  { time: "19:30", what: "Founder's View nightly broadcast prep. 8:00pm ET publish." },
  { time: "21:00", what: "Optional second shift: research reading, game project work, frontier explorations." },
  { time: "23:00", what: "Phone off. Read on paper. Sleep." },
];

const RULES = [
  "No meetings unless they end in a shipped artifact.",
  "No video calls before 14:00 local.",
  "No social media before 12:00 local (anti-context-trash rule).",
  "Every email I send leaves the inbox empty for that sender.",
  "If a session does not produce a receipt, the session does not count.",
  "Saturdays are for the body. Sundays are for the mind. Nothing ships.",
];

export default function LabPage() {
  return (
    <main className="min-h-screen text-[#F4F4F2]">
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF]">
            § the lab · Marco Island, FL · trust + workshop
          </p>
          <h1 className="mt-6 font-serif text-[44px] font-light leading-[1.04] tracking-[-0.025em] md:text-[64px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            One room. One operator.
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-[18px] leading-[1.55] text-[#9CA3AF] md:text-[20px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Most one-operator labs hide the workshop because the LARP
            requires "we" pronouns and stock photos of co-working space.
            This page does the opposite. The desk, the machines, the
            daily working pattern, named.
          </p>
        </div>
      </section>

      {/* Wave 33 · trust + transparency + audit-log + timeline absorbed
          into /lab per orange-judge consolidation verdict. Each is its
          own page · this section is the canonical entry. */}
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
            § the trust hub · four facets of the same thing
          </p>
          <p className="mt-4 max-w-2xl font-serif text-[18px] leading-[1.55] text-[#9CA3AF] md:text-[19px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Who built this. What it ships on. What gets disclosed. What got
            committed when. The four canonical surfaces below.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Link
              href="/trust"
              className="block border border-[#1F242B] p-6 transition hover:border-[#22F0D5]"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
                /trust · trust posture
              </p>
              <p className="mt-3 font-serif text-[18px] leading-[1.5] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                Licenses, security policy, who has access to what, the threat
                model the lab takes seriously.
              </p>
            </Link>
            <Link
              href="/transparency"
              className="block border border-[#1F242B] p-6 transition hover:border-[#22F0D5]"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
                /transparency · financial
              </p>
              <p className="mt-3 font-serif text-[18px] leading-[1.5] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                Revenue · cost · margin · runway · investor count (zero) ·
                published in the open since day one.
              </p>
            </Link>
            <Link
              href="/audit-log"
              className="block border border-[#1F242B] p-6 transition hover:border-[#22F0D5]"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
                /audit-log · every commit
              </p>
              <p className="mt-3 font-serif text-[18px] leading-[1.5] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                Last 250 commits with SHA links to github.com. The shipping
                record nobody can fake.
              </p>
            </Link>
            <Link
              href="/timeline"
              className="block border border-[#1F242B] p-6 transition hover:border-[#22F0D5]"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
                /timeline · ship log
              </p>
              <p className="mt-3 font-serif text-[18px] leading-[1.5] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                Curated chronology of major artifacts shipped since the lab
                opened in 2024.
              </p>
            </Link>
            <Link
              href="/receipts"
              className="block border border-[#1F242B] p-6 transition hover:border-[#22F0D5]"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
                /receipts · ledger
              </p>
              <p className="mt-3 font-serif text-[18px] leading-[1.5] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                Per-artifact receipts: zip SHA-256, present_files manifest,
                ledger row. The B_build chain's tail.
              </p>
            </Link>
            <Link
              href="/manifesto"
              className="block border border-[#1F242B] p-6 transition hover:border-[#22F0D5]"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
                /manifesto · 14 clauses
              </p>
              <p className="mt-3 font-serif text-[18px] leading-[1.5] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                The lab doctrine. What we will + will not do. License §4A
                no-SaaS perpetual. Read it before buying anything.
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ hardware on the desk</p>
          <ul className="mt-8 divide-y divide-[#1F242B]">
            {HARDWARE.map((h, i) => (
              <li key={i} className="grid gap-2 py-4 md:grid-cols-[1fr_2fr]">
                <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-[#F4F4F2]">
                  {h.what}
                </p>
                <p className="font-serif text-[15px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                  {h.role}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ software open all day</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {SOFTWARE_DAILY.map((s) => (
              <p key={s} className="border border-[#1F242B] bg-[#0F1114] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[#9CA3AF]">
                {s}
              </p>
            ))}
          </div>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a]">
            full dependency tree at /colophon
          </p>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ a normal weekday</p>
          <ol className="mt-8 space-y-3">
            {ROUTINE.map((r, i) => (
              <li key={i} className="grid grid-cols-[80px_1fr] items-baseline gap-6 border-b border-[#1F242B] pb-3">
                <p className="font-mono text-[14px] tabular-nums tracking-[0.05em] text-[#22F0D5]">{r.time}</p>
                <p className="font-serif text-[15px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{r.what}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ standing rules of the room</p>
          <ul className="mt-8 space-y-4">
            {RULES.map((r, i) => (
              <li key={i} className="flex items-baseline gap-4 border-b border-[#1F242B] pb-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a]">{String(i + 1).padStart(2, "0")}</span>
                <p className="font-serif text-[17px] leading-[1.5] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{r}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <div className="grid gap-3 md:grid-cols-4">
            {[
              { href: "/about", label: "About the operator" },
              { href: "/transparency", label: "What it all costs" },
              { href: "/colophon", label: "Tech stack inventory" },
              { href: "/now", label: "Today's ship log" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="group border border-[#1F242B] bg-[#0F1114] p-4 transition-colors hover:border-[#22F0D5]">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a] transition-colors group-hover:text-[#22F0D5]">
                  atomeons.com{l.href}
                </p>
                <p className="mt-2 font-serif text-[17px] font-medium" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{l.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
