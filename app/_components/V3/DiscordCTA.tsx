/**
 * DiscordCTA · the hardcore-user community card · Wave 70 · 2026-06-12
 *
 * Drop-in component for the END of power-user surfaces. Not for the
 * broad-entry pages (/kids, /plain, /launcher) · only for visitors
 * who've already read deep content.
 *
 * Usage:
 *   <DiscordCTA context="path-graduate" />
 *
 * Each context picks slightly different framing for the same invite.
 */

import Link from "next/link";

const INVITE = "https://discord.gg/4wx3AGga";

type Context =
  | "path-graduate"
  | "cheat-sheet-reader"
  | "research-reader"
  | "innovations-reader"
  | "soulkey-reader"
  | "general";

const FRAMING: Record<Context, { kicker: string; line: string }> = {
  "path-graduate": {
    kicker: "§ For path graduates · the next room",
    line: "Finished a track? Come to the Discord where the rest of the alumni hang out.",
  },
  "cheat-sheet-reader": {
    kicker: "§ For cheat-sheet readers · go deeper",
    line: "Using these tools daily? Discord channel #cheat-sheets has people doing the same.",
  },
  "research-reader": {
    kicker: "§ For research readers · join the group",
    line: "If you read decoded papers end-to-end · #research on Discord is your room.",
  },
  "innovations-reader": {
    kicker: "§ Join the people who built these",
    line: "If the innovations page resonated · come where the operator + early users actually talk.",
  },
  "soulkey-reader": {
    kicker: "§ SOULKEY architects · #soulkey channel",
    line: "DID + VC + sovereign-identity design discussion happens in the lab's Discord.",
  },
  general: {
    kicker: "§ For hardcore users · come to the Discord",
    line: "The community for people doing the work · path graduates · cheat-sheet readers · solo founders.",
  },
};

export function DiscordCTA({ context = "general" }: { context?: Context }) {
  const f = FRAMING[context];
  return (
    <section
      className="mt-16 border-l-4 border-[#5865F2] bg-[#0F1114] p-6 md:p-7"
      aria-label="Join the AtomEons Discord"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#5865F2]">
        {f.kicker}
      </p>
      <p
        className="mt-3 text-[20px] leading-[1.45] text-[#F4F4F2]"
        style={{ fontFamily: "Newsreader, Georgia, serif" }}
      >
        {f.line}
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <a
          href={INVITE}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border-2 border-[#5865F2] bg-[#5865F2]/10 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#5865F2] transition hover:bg-[#5865F2]/20"
        >
          <svg aria-hidden width="14" height="11" viewBox="0 0 24 18" fill="currentColor">
            <path d="M20.317 1.49a19.79 19.79 0 0 0-4.885-1.49.075.075 0 0 0-.079.037c-.211.375-.444.864-.608 1.249a18.298 18.298 0 0 0-5.487 0 12.65 12.65 0 0 0-.617-1.249.077.077 0 0 0-.079-.036A19.736 19.736 0 0 0 3.677 1.49a.07.07 0 0 0-.032.027C.533 6.04-.32 10.475.099 14.86a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.127c-.598.349-1.22.645-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.094-.838-9.493-3.548-13.343a.061.061 0 0 0-.031-.029ZM8.02 12.187c-1.182 0-2.157-1.085-2.157-2.418C5.863 8.436 6.819 7.35 8.02 7.35c1.21 0 2.176 1.095 2.157 2.418 0 1.334-.956 2.418-2.157 2.418Zm7.974 0c-1.183 0-2.157-1.085-2.157-2.418 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.095 2.157 2.418 0 1.334-.946 2.418-2.157 2.418Z" />
          </svg>
          Join the Discord
        </a>
        <Link
          href="/discord"
          className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#7a818a] transition hover:text-[#F4F4F2]"
        >
          Read the full invite →
        </Link>
      </div>
    </section>
  );
}
