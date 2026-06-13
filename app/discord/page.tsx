import type { Metadata } from "next";
import Link from "next/link";

/**
 * /discord · the hardcore-user community funnel · Wave 70 · 2026-06-12
 *
 * Operator: "we have a discord. we want to onboard hardcore users."
 * Not surfaced on the broad-entry pages (/kids, /plain, /launcher).
 * Surfaced on power-user surfaces: /paths/ai-pilot, /paths/cyber-pro,
 * /innovations, /soulkey, /best-practices, /lab, /research/decoded.
 *
 * Single source of truth · operator can update messaging here without
 * changing the invite URL anywhere else on the site.
 */

const INVITE = "https://discord.gg/4wx3AGga";

export const metadata: Metadata = {
  title: "Discord · for hardcore users · join the lab",
  description:
    "The AtomEons Discord · invitation for hardcore users · path graduates · cheat-sheet readers · the people doing the work. Receipts not vibes. Build · publish · prove. Direct invite at discord.gg/4wx3AGga.",
  alternates: { canonical: "https://atomeons.com/discord" },
  openGraph: {
    title: "AtomEons Discord · for hardcore users",
    description:
      "Join the people who actually finish the work. Receipts not vibes. Direct invite at discord.gg/4wx3AGga.",
    url: "https://atomeons.com/discord",
    type: "article",
  },
};

const WHO_FOR = [
  "Path graduates · AI Pilot + Cyber Pro completed",
  "Cheat-sheet readers who use Claude / Codex / Cursor / Aider daily",
  "ORANGEBOX / B00KMakor / skil.ski operators",
  "Researchers reading the decoded papers in full",
  "SOULKEY architects · DID + VC + selective sovereignty",
  "Founders shipping AI-native products solo",
  "Cyber pros tracking the AI-security frontier",
  "Operators who run their own lab and want a peer group",
];

const WHO_NOT_FOR = [
  "Brand-new readers · /kids and /plain serve you better first",
  "Drive-by askers · /ask handles one-off questions, no signup needed",
  "Marketers looking for a list · this isn't that",
  "Recruiters cold-outreaching · use /press or operator email",
];

const HOUSE_RULES = [
  "Receipts > vibes. Cite when you claim. Show work when you share.",
  "Build · publish · prove. The doctrine of /trust applies inside too.",
  "Public-info only on Cysec talk · same rule as /learn/cyber.",
  "No spam · no airdrops · no NFT pitches · no get-rich-quick.",
  "Respect operator scope · this is one operator's community, not a startup employee lounge.",
  "Be kind. The internet has enough cruelty. Don't add to it here.",
  "When in doubt, ask. Most rules here are conversation-starters, not trip-wires.",
];

const WHAT_INSIDE = [
  { name: "#welcome · arrivals + introductions", detail: "Say hi · one line · who you are · what you're building." },
  { name: "#ship-log · what shipped today", detail: "Post one thing you shipped or learned. Pure receipts." },
  { name: "#cheat-sheets · tool talk", detail: "Claude · Codex · Cursor · Copilot · Aider · MCP discussion." },
  { name: "#soulkey · sovereign identity", detail: "DID · VC · wallet sign-in · proof resume design." },
  { name: "#orangebox · the cockpit", detail: "ORANGEBOX users · skill primer questions · v6 native talk." },
  { name: "#cysec · public-info only", detail: "Threat models · frameworks · NIST + MITRE + Zero Trust · no exploits." },
  { name: "#research · papers + decoded", detail: "ÆoNs papers + the 35 decoded primary sources · reading group." },
  { name: "#operator-corner · solo founder talk", detail: "Solo builders shipping AI-native products. The peer group." },
  { name: "#meta · feedback + roadmap", detail: "Tell the operator what's missing. Tell what's working." },
];

export default function DiscordPage() {
  return (
    <main className="mx-auto max-w-[920px] px-6 py-20 text-[#F4F4F2] md:px-10 md:py-24">
      <header className="border-b border-[#1F242B] pb-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#5865F2]">
          DISCORD · FOR HARDCORE USERS · 2026
        </p>
        <h1
          className="mt-6 text-balance text-[clamp(56px,9vw,108px)] font-light leading-[0.92]"
          style={{ fontFamily: "Newsreader, Georgia, serif", fontWeight: 300 }}
        >
          The Discord.
        </h1>
        <p
          className="mt-5 max-w-[60ch] text-[clamp(20px,2.4vw,28px)] font-light italic leading-[1.35] text-[#9CA3AF]"
          style={{ fontFamily: "Newsreader, Georgia, serif" }}
        >
          For path graduates, cheat-sheet readers, the people doing the work.
        </p>
        <p className="mt-6 max-w-[64ch] text-[17px] leading-[1.6] text-[#9CA3AF]">
          A small community of operators building AI-native work. Receipts
          not vibes. Build · publish · prove. This isn&apos;t a beginner
          server · the lab has /kids and /plain for that. This is for the
          people who already read the manuals.
        </p>

        {/* Primary CTA */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={INVITE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border-2 px-6 py-4 font-mono text-[12px] uppercase tracking-[0.22em] transition"
            style={{
              borderColor: "#5865F2",
              color: "#ffffff",
              background: "#5865F2",
            }}
          >
            <svg
              aria-hidden
              width="20"
              height="15"
              viewBox="0 0 24 18"
              fill="currentColor"
            >
              <path d="M20.317 1.49a19.79 19.79 0 0 0-4.885-1.49.075.075 0 0 0-.079.037c-.211.375-.444.864-.608 1.249a18.298 18.298 0 0 0-5.487 0 12.65 12.65 0 0 0-.617-1.249.077.077 0 0 0-.079-.036A19.736 19.736 0 0 0 3.677 1.49a.07.07 0 0 0-.032.027C.533 6.04-.32 10.475.099 14.86a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.127c-.598.349-1.22.645-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.094-.838-9.493-3.548-13.343a.061.061 0 0 0-.031-.029ZM8.02 12.187c-1.182 0-2.157-1.085-2.157-2.418C5.863 8.436 6.819 7.35 8.02 7.35c1.21 0 2.176 1.095 2.157 2.418 0 1.334-.956 2.418-2.157 2.418Zm7.974 0c-1.183 0-2.157-1.085-2.157-2.418 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.095 2.157 2.418 0 1.334-.946 2.418-2.157 2.418Z" />
            </svg>
            <span>Join the Discord</span>
            <span aria-hidden>→</span>
          </a>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#7a818a]">
            invite · discord.gg/4wx3AGga
          </p>
        </div>
      </header>

      {/* Who it's for */}
      <section className="mt-16">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#22F0D5]">
          § Who this is for
        </h2>
        <ul className="mt-6 space-y-2">
          {WHO_FOR.map((w) => (
            <li key={w} className="flex gap-3 text-[16px] leading-[1.55] text-[#F4F4F2]">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#22F0D5]" />
              <span>{w}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Who it's NOT for */}
      <section className="mt-12">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#FF4D4D]">
          § Who this is not for
        </h2>
        <p className="mt-3 max-w-[68ch] text-[14px] leading-[1.6] text-[#9CA3AF]">
          Not as a gatekeep · as a kindness. If you&apos;d be happier
          elsewhere on the lab, here&apos;s where:
        </p>
        <ul className="mt-5 space-y-2">
          {WHO_NOT_FOR.map((w) => (
            <li key={w} className="flex gap-3 text-[15px] leading-[1.55] text-[#9CA3AF]">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF4D4D]" />
              <span>{w}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* What's inside */}
      <section className="mt-16">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#22F0D5]">
          § What&apos;s inside · channel map
        </h2>
        <ul className="mt-8 space-y-5">
          {WHAT_INSIDE.map((c) => (
            <li key={c.name} className="border-l-2 border-[#5865F2]/50 pl-5">
              <p className="font-mono text-[13px] text-[#5865F2]">{c.name}</p>
              <p className="mt-1 text-[15px] leading-[1.6] text-[#9CA3AF]">
                {c.detail}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-[#7a818a]">
          Channels evolve as the community grows · this map updates with /audit-log
        </p>
      </section>

      {/* House rules */}
      <section className="mt-16">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#C9A55C]">
          § House rules · short
        </h2>
        <ol className="mt-6 list-decimal space-y-3 pl-6 marker:font-mono marker:text-[#C9A55C]">
          {HOUSE_RULES.map((r) => (
            <li key={r} className="text-[16px] leading-[1.6] text-[#F4F4F2] pl-2">
              {r}
            </li>
          ))}
        </ol>
      </section>

      {/* What the lab thinks */}
      <section className="mt-16 border-l-4 border-[#5865F2] bg-[#0F1114] p-8">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#5865F2]">
          § What the lab thinks
        </h2>
        <p
          className="mt-5 text-[20px] leading-[1.55] text-[#F4F4F2]"
          style={{ fontFamily: "Newsreader, Georgia, serif" }}
        >
          The website is the artifact. The Discord is the workshop.
          People are still doing the work alone in 2026. They don&apos;t
          have to be. If you finished the cheat sheets · if you graduated
          a path · if you read a decoded paper end to end · if you ship
          AI-native work and want a peer group · come over. The lab will
          be there.
        </p>
        <a
          href={INVITE}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex items-center gap-2 border-2 border-[#5865F2] bg-[#5865F2]/10 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#5865F2] transition hover:bg-[#5865F2]/20"
        >
          Join the Discord →
        </a>
      </section>

      {/* Related */}
      <section className="mt-16 border-t border-[#1F242B] pt-12">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Related on the lab
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Link href="/paths/ai-pilot" className="block border border-[#1F242B] p-5 transition hover:border-[#22F0D5]">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">AI Pilot path</p>
            <p className="mt-2 text-[14px] text-[#F4F4F2]">Graduation track · 4 legs · email-only · alumni list.</p>
          </Link>
          <Link href="/paths/cyber-pro" className="block border border-[#1F242B] p-5 transition hover:border-[#FF4D4D]">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#FF4D4D]">Cyber Pro path</p>
            <p className="mt-2 text-[14px] text-[#F4F4F2]">Public-info cyber track · 40-page catalog + 22 models.</p>
          </Link>
          <Link href="/founders-view" className="block border border-[#1F242B] p-5 transition hover:border-[#22F0D5]">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">Founder's View</p>
            <p className="mt-2 text-[14px] text-[#F4F4F2]">Nightly broadcast · 8pm ET · the operator&apos;s voice.</p>
          </Link>
        </div>
      </section>

      {/* Other lab presences · for hardcore users who already follow elsewhere */}
      <section className="mt-16 border-t border-[#1F242B] pt-12">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Lab presences elsewhere
        </h2>
        <ul className="mt-6 space-y-3 text-[15px] leading-[1.55]">
          <li>
            <a
              href="https://x.com/AtomMccree"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#22F0D5] hover:underline"
            >
              ↗ X / Twitter · @AtomMccree
            </a>{" "}
            <span className="text-[#9CA3AF]">· operator's primary public channel</span>
          </li>
          <li>
            <a
              href="https://www.instagram.com/atomeons/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#22F0D5] hover:underline"
            >
              ↗ Instagram · @atomeons
            </a>{" "}
            <span className="text-[#9CA3AF]">· visual + behind-the-scenes</span>
          </li>
          <li>
            <a
              href="https://www.twitch.tv/atomeons"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#22F0D5] hover:underline"
            >
              ↗ Twitch · /atomeons
            </a>{" "}
            <span className="text-[#9CA3AF]">· live coding sessions + build streams</span>
          </li>
          <li>
            <a
              href="https://github.com/Atom-Eons/atomeons-com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#22F0D5] hover:underline"
            >
              ↗ GitHub · Atom-Eons/atomeons-com
            </a>{" "}
            <span className="text-[#9CA3AF]">· the site source · every commit public</span>
          </li>
          <li>
            <Link href="/founders-view" className="text-[#22F0D5] hover:underline">
              ↗ Founder&apos;s View · nightly broadcast
            </Link>{" "}
            <span className="text-[#9CA3AF]">· 8pm ET · sealed · signed</span>
          </li>
        </ul>
        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a]">
          Discord is the workshop · X is the megaphone · Instagram is the
          window · Twitch is the live build · GitHub is the receipts ·
          Founder&apos;s View is the canon
        </p>
      </section>

      <footer className="mt-20 border-t border-[#1F242B] pt-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#7a818a]">
          /discord · the hardcore-user funnel · invite at{" "}
          <a
            href={INVITE}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#5865F2] hover:underline"
          >
            discord.gg/4wx3AGga
          </a>{" "}
          · last updated 2026-06-12
        </p>
      </footer>
    </main>
  );
}
