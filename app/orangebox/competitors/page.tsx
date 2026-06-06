import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ORANGEBOX vs Cursor · Cline · Claude Desktop · Continue · honest comparison",
  description:
    "Honest competitor comparison for ORANGEBOX. Where it wins, where it loses, where it's a different category. Named alternatives, real weaknesses, no LARP.",
  alternates: { canonical: "https://atomeons.com/orangebox/competitors" },
};

/**
 * /orangebox/competitors — honest comparison with named weaknesses.
 *
 * Operator's rule: never claim ORANGEBOX wins on every axis. Buyers
 * who feel they're being marketed-at don't buy. Buyers who feel the
 * comparison is honest do. This page names where ORANGEBOX loses
 * outright, and that's a feature.
 */

type Comparison = {
  competitor: string;
  url: string;
  category: string;
  pricing: string;
  orangeboxWins: string[];
  competitorWins: string[];
  takeaway: string;
};

const COMPARISONS: Comparison[] = [
  {
    competitor: "Cursor",
    url: "https://cursor.com",
    category: "AI-augmented code editor (IDE)",
    pricing: "$20/mo subscription",
    orangeboxWins: [
      "Local-first; ORANGEBOX runs offline-capable for memory + receipts even when API is down.",
      "Perpetual license; Cursor will charge you next year too.",
      "Memory across sessions out of the box (Cursor needs MCP servers to approximate).",
      "Receipts every action; Cursor has no audit ledger.",
      "Multi-model BYO-key (Claude / GPT / Gemini / Ollama / 5 more). Cursor is OpenAI-leaning.",
    ],
    competitorWins: [
      "Cursor IS the editor. ORANGEBOX is not. If you want one tool that edits files AND chats with AI, Cursor is the pick.",
      "Tab-completion / inline ghost text in editor. ORANGEBOX defers to your editor for code authoring.",
      "Larger community / extension ecosystem.",
      "Better marketing budget = more YouTube tutorials.",
    ],
    takeaway:
      "Different category. Cursor is the editor; ORANGEBOX is the cockpit FOR the operator running multiple tools. We complement, not replace.",
  },
  {
    competitor: "Cline (formerly Claude Dev)",
    url: "https://cline.bot",
    category: "VSCode extension for Claude agentic coding",
    pricing: "Free + you pay for API tokens",
    orangeboxWins: [
      "Multi-model. Cline is Claude-locked by design.",
      "Cross-session memory built in. Cline is per-task.",
      "14-department named routing (AE0-AE14). Cline has one agent role.",
      "Skill primer system. Cline doesn't formalize reusable workflows.",
      "Doesn't require VSCode. ORANGEBOX is editor-agnostic.",
    ],
    competitorWins: [
      "Cline is FREE. You pay only Anthropic for tokens.",
      "Lives inside VSCode UI; ORANGEBOX is a separate cockpit window.",
      "Faster onboarding for someone who already lives in VSCode.",
      "Open source.",
    ],
    takeaway:
      "If you're a single-Anthropic VSCode user with no budget, Cline is a strong free choice. If you need multi-model + memory + receipts, ORANGEBOX is the upgrade path.",
  },
  {
    competitor: "Claude Desktop (official Anthropic app)",
    url: "https://claude.ai/download",
    category: "Anthropic's own desktop client",
    pricing: "Free with Anthropic plan",
    orangeboxWins: [
      "Multi-LLM. Claude Desktop is Anthropic-only.",
      "Receipts, memory, skill primers — Anthropic Desktop has none of these as first-class features.",
      "Crystal Lattice Compression (10-80×) extends practical context way past the raw window.",
      "Local-first license, no subscription.",
    ],
    competitorWins: [
      "It's the official Anthropic surface. Tightest day-one integration with new Claude features.",
      "Free with your Claude subscription you probably already have.",
      "MCP support shipped first-party.",
    ],
    takeaway:
      "Anthropic Desktop is great if you live 100% in Claude and want zero setup. ORANGEBOX is for operators who run Claude AS A SUBSYSTEM in larger multi-tool workflows.",
  },
  {
    competitor: "Continue.dev",
    url: "https://continue.dev",
    category: "Open-source AI code assistant extension",
    pricing: "Free (BYO key)",
    orangeboxWins: [
      "Standalone cockpit; Continue lives inside the IDE.",
      "Crystal Lattice Compression. Continue does naive context.",
      "Skill primer / AECode contract first-class. Continue treats every session as fresh.",
      "Multi-machine workflow patterns. Continue is single-machine.",
    ],
    competitorWins: [
      "Open source — fully forkable.",
      "Inline-in-IDE workflow.",
      "Strong active maintainer community.",
      "Free.",
    ],
    takeaway:
      "Same answer as Cursor / Cline — different category. Continue is the editor's assistant; ORANGEBOX is the operator's cockpit.",
  },
  {
    competitor: "Aider",
    url: "https://aider.chat",
    category: "Terminal-based AI pair programmer",
    pricing: "Free (BYO key)",
    orangeboxWins: [
      "GUI cockpit; Aider is CLI-only.",
      "Memory + receipts; Aider is shell-history-based.",
      "Multi-skill chains. Aider is one-conversation-at-a-time.",
    ],
    competitorWins: [
      "Terminal-native operators will prefer Aider's footprint.",
      "Git-integration is industry-best for pair-programming patterns.",
      "Open source.",
      "Free.",
    ],
    takeaway:
      "Aider is the gold standard for terminal-native code pairing. ORANGEBOX is broader: code is one of N workflows the cockpit accelerates.",
  },
  {
    competitor: "MCP-only setups (Claude Code · Claude Desktop + MCP servers)",
    url: "https://modelcontextprotocol.io",
    category: "DIY: roll your own with raw MCP servers",
    pricing: "Free; you build it",
    orangeboxWins: [
      "Curated · integrated · supported. DIY MCP requires you to maintain a fleet of servers yourself.",
      "Tested skill primers vs you writing prompts from scratch.",
      "Single installer vs you stitching 8+ npm packages.",
      "Code-signed binary; DIY is unsigned scripts.",
    ],
    competitorWins: [
      "Free if you have time.",
      "Maximum customization; you build exactly what you want.",
      "Forces you to learn MCP deeply.",
    ],
    takeaway:
      "If you have the operator-hours to maintain your own MCP fleet, do that. ORANGEBOX is for operators who'd rather have one binary that ships green.",
  },
];

export default function OrangeboxCompetitorsPage() {
  return (
    <main className="min-h-screen bg-[#1A1410] text-[#F4F4F2]">
      <section className="border-b border-[#3D2F22]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF8B3D]">
            § ORANGEBOX vs alternatives · honest comparison
          </p>
          <h1 className="mt-6 font-serif text-[44px] font-light leading-[1.04] tracking-[-0.025em] md:text-[64px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Where we lose. Where we win.
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-[18px] leading-[1.55] text-[#C9B19A] md:text-[20px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Buyers who feel marketed-at don't buy. Each row names where
            the competitor beats ORANGEBOX outright. If the comparison
            still favors us for your workflow, your $99 is well spent.
            If not, point your dollars at the better tool for you.
          </p>
        </div>
      </section>

      {COMPARISONS.map((c) => (
        <section key={c.competitor} className="border-b border-[#3D2F22]">
          <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="font-serif text-[32px] font-light leading-[1.1] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                ORANGEBOX vs <a href={c.url} target="_blank" rel="noopener noreferrer" className="text-[#FF8B3D] hover:underline">{c.competitor}</a>
              </h2>
              <div className="text-right">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF8B3D]">{c.category}</p>
                <p className="mt-1 font-mono text-[11px] tabular-nums text-[#C9B19A]">{c.pricing}</p>
              </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="border-l-2 border-[#22F0D5] pl-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">where ORANGEBOX wins</p>
                <ul className="mt-4 space-y-2">
                  {c.orangeboxWins.map((w, i) => (
                    <li key={i} className="font-serif text-[14px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>+ {w}</li>
                  ))}
                </ul>
              </div>
              <div className="border-l-2 border-[#FF4D4D] pl-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF4D4D]">where {c.competitor} wins</p>
                <ul className="mt-4 space-y-2">
                  {c.competitorWins.map((w, i) => (
                    <li key={i} className="font-serif text-[14px] leading-[1.55] text-[#C9B19A]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>− {w}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 border-l-2 border-[#FF8B3D] bg-[#221A14] p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF8B3D]">§ takeaway</p>
              <p className="mt-3 font-serif text-[16px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                {c.takeaway}
              </p>
            </div>
          </div>
        </section>
      ))}

      <section>
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <div className="grid gap-3 md:grid-cols-3">
            {[
              { href: "/orangebox", label: "Back to ORANGEBOX" },
              { href: "/orangebox/roadmap", label: "Roadmap + anti-roadmap" },
              { href: "/orangebox/changelog", label: "Version history" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="group border border-[#3D2F22] bg-[#221A14] p-4 transition-colors hover:border-[#FF8B3D]">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7A5C42] transition-colors group-hover:text-[#FF8B3D]">
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
