import type { Metadata } from "next";
import Link from "next/link";

/**
 * /best-practices · hub for the three AI coding-tool cheat sheets.
 *
 * Operator brief 2026-06-06: "endless alpha but it's overloading. Like a
 * keyboard shortcut but just facts on optimizing the systems. One for
 * Claude Desktop, Codex, and Antigravity apps."
 *
 * Each child page is a dense scannable cheat-sheet built from official
 * docs (Anthropic · OpenAI · Google) and verified-this-week with the
 * source URLs cited inline. Updated continuously on every wave that
 * touches these pages. Last-verified stamp on each.
 *
 * — Wave 34 · 2026-06-06
 */

export const metadata: Metadata = {
  title: "Best Practices · AI coding tool cheat sheets",
  description:
    "Lab-curated cheat sheets for Claude (Desktop + Code), OpenAI Codex CLI, and Google Antigravity. Keyboard shortcuts · slash commands · config files · hooks · subagents · optimization tips · common mistakes · source links. Dense like a shortcut reference · facts not opinions.",
  alternates: { canonical: "https://atomeons.com/best-practices" },
  openGraph: {
    title: "Best Practices · AI coding tool cheat sheets",
    description:
      "Cheat sheets for Claude, Codex, Antigravity. Endless alpha condensed to facts.",
    url: "https://atomeons.com/best-practices",
    type: "article",
  },
};

const APPS = [
  {
    slug: "claude",
    name: "Claude · Desktop + Code",
    vendor: "Anthropic",
    blurb:
      "The Claude.ai desktop app + Claude Code CLI. MCP servers · Projects · Artifacts · subagents · hooks · skills · CLAUDE.md · slash commands · the full Anthropic engineering stack.",
    accent: "#22F0D5",
    docs: "https://docs.claude.com/en/docs/claude-code/overview",
  },
  {
    slug: "codex",
    name: "Codex · CLI + IDE",
    vendor: "OpenAI",
    blurb:
      "OpenAI Codex CLI + Codex in your IDE. Approval modes · AGENTS.md · gpt-5 tiers · web-search · image input · slash commands · the OpenAI agentic-coding stack.",
    accent: "#C9A55C",
    docs: "https://platform.openai.com/docs/codex",
  },
  {
    slug: "antigravity",
    name: "Antigravity · agent IDE",
    vendor: "Google",
    blurb:
      "Google's agent-based IDE (launched Nov 2025). Plans · tasks · artifacts · parallel agent windows · built-in browser automation · Gemini 3 powered.",
    accent: "#FF4D4D",
    docs: "https://antigravity.google",
  },
];

export default function BestPracticesPage() {
  return (
    <main className="mx-auto max-w-[1100px] px-6 py-20 text-[#F4F4F2] md:px-10 md:py-24">
      <header className="border-b border-[#1F242B] pb-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#5A6068]">
          BEST PRACTICES · CHEAT SHEETS · 2026
        </p>
        <h1
          className="mt-6 text-balance text-[clamp(48px,8vw,96px)] font-light leading-[0.92]"
          style={{ fontFamily: "Newsreader, Georgia, serif", fontWeight: 300 }}
        >
          Endless alpha. Just the facts.
        </h1>
        <p className="mt-6 max-w-[64ch] text-[18px] leading-[1.55] text-[#9CA3AF]">
          Every dev influencer has a different ten-tip thread. The lab has
          three cheat sheets · Claude · Codex · Antigravity · all built from
          the official docs · sourced inline · dense like a keyboard-shortcut
          reference · scannable in under two minutes.
        </p>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5]">
          Last verified · 2026-06-06 · cite source before claim · update cadence weekly
        </p>
      </header>

      <section className="mt-16 grid gap-6 md:grid-cols-1">
        {APPS.map((a) => (
          <Link
            key={a.slug}
            href={`/best-practices/${a.slug}`}
            className="block border p-8 transition hover:border-[#22F0D5]"
            style={{ borderColor: "#1F242B" }}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2
                className="text-[32px] font-light leading-tight text-[#F4F4F2]"
                style={{ fontFamily: "Newsreader, Georgia, serif" }}
              >
                {a.name}
              </h2>
              <p
                className="font-mono text-[10px] uppercase tracking-[0.32em]"
                style={{ color: a.accent }}
              >
                {a.vendor}
              </p>
            </div>
            <p className="mt-4 max-w-[80ch] text-[15px] leading-[1.65] text-[#9CA3AF]">
              {a.blurb}
            </p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5]">
              Open the cheat sheet →
            </p>
          </Link>
        ))}
      </section>

      <section className="mt-20 border-l-4 border-[#22F0D5] bg-[#0F1114] p-8">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#22F0D5]">
          § Why three sheets · not one
        </h2>
        <p
          className="mt-4 text-[18px] leading-[1.55] text-[#F4F4F2]"
          style={{ fontFamily: "Newsreader, Georgia, serif" }}
        >
          Each tool has its own keyboard language, its own slash-command set,
          its own config-file convention, its own optimization tricks. They
          don&apos;t share much. The lab refuses to flatten them into a
          generic &ldquo;ten tips for AI coding&rdquo; thread. The three
          sheets each stand on their own and cite their own source docs.
        </p>
      </section>

      <section className="mt-20 border-t border-[#1F242B] pt-12">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Update policy
        </h2>
        <ul className="mt-6 space-y-3 text-[15px] leading-[1.65] text-[#9CA3AF]">
          <li className="flex gap-3">
            <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#22F0D5]" />
            <span>
              Every sheet carries a <strong className="text-[#F4F4F2]">last-verified date</strong> at the top. If you&apos;re reading more than 30 days after that date, click through to the official docs first.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#22F0D5]" />
            <span>
              Every entry that&apos;s easy to verify wrong (a keyboard shortcut, a slash command, a config field) has a <strong className="text-[#F4F4F2]">source link</strong> beside it.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#22F0D5]" />
            <span>
              Spotted something stale? <Link href="/founders-view" className="underline decoration-[#1F242B] hover:decoration-[#22F0D5]">Tell the operator</Link> via the direct line · the sheet is patched within a day.
            </span>
          </li>
        </ul>
      </section>

      <footer className="mt-20 border-t border-[#1F242B] pt-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#5A6068]">
          /best-practices · curated by AtomEons Systems Laboratory · CC-BY 4.0
        </p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#5A6068]">
          Sources: docs.claude.com · platform.openai.com · antigravity.google
        </p>
      </footer>
    </main>
  );
}
