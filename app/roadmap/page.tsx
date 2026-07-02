import type { Metadata } from "next";
import Link from "next/link";

/**
 * /roadmap · Wave 145o · 2026-07-02
 *
 * Public roadmap. Solo labs rarely publish these because "roadmap"
 * implies commitments a solo can't guarantee. This page is honest
 * about that: what's stable, what's rolling, what might never ship.
 * Complements /timeline (past) with /roadmap (future) + /now (present).
 */

export const metadata: Metadata = {
  title: "Roadmap · what's shipping, what's rolling, what's uncertain",
  description:
    "Public roadmap for AtomEons Systems Laboratory. Solo lab · no commitments a solo can't keep. Divided into: STABLE (shipped, live now), ROLLING (this quarter, high confidence), UNCERTAIN (someday, no promise), and WON'T DO (out of scope, on principle).",
  alternates: { canonical: "https://atomeons.com/roadmap" },
  openGraph: {
    title: "AtomEons roadmap · solo lab · honest confidence tiers",
    description: "Stable · Rolling · Uncertain · Won't do.",
    url: "https://atomeons.com/roadmap",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "AtomEons roadmap",
    description: "What's shipping, what's rolling, what's uncertain.",
    creator: "@AtomMccree",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "AtomEons", item: "https://atomeons.com" },
    { "@type": "ListItem", position: 2, name: "Roadmap", item: "https://atomeons.com/roadmap" },
  ],
};

type Item = { name: string; detail?: string; link?: { href: string; label: string } };
type Tier = {
  key: string;
  eyebrow: string;
  title: string;
  color: string;
  intro: string;
  items: Item[];
};

const TIERS: Tier[] = [
  {
    key: "stable",
    eyebrow: "SHIPPED · LIVE",
    title: "Stable — running in production right now",
    color: "#22F0D5",
    intro:
      "Every item here is on atomeons.com or on the public GitHub org today. Verified live, with a canonical URL. No promise about the future, just observable-now.",
    items: [
      { name: "atomeons.com", detail: "319 public routes · Next.js 16 · deployed on Vercel", link: { href: "/", label: "home" } },
      { name: "Orange³ · sovereign agentic OS", detail: "§4A no-SaaS · free always · persistent memory · 10-80× compression", link: { href: "/orangebox", label: "/orangebox" } },
      { name: "AI Bookmaker · publishing cockpit", detail: "The tool that built I Am AI · EPUB + KDP + ACX pipeline · free", link: { href: "/b00kmakor", label: "/b00kmakor" } },
      { name: "I Am AI · the book", detail: "24 chapters by Claude Opus 4.7 + Atom McCree · CC-BY 4.0", link: { href: "/i-am-ai", label: "/i-am-ai" } },
      { name: "I Am AI audiobook", detail: "28 tracks · Eleven Labs voice-clone of Opus 4.7", link: { href: "https://github.com/AtomEons/i-am-ai-audiobook", label: "GitHub" } },
      { name: "Founder's View nightly letters", detail: "Daily 8pm ET · via Anthropic cron · CC-BY 4.0", link: { href: "/founders-view", label: "/founders-view" } },
      { name: "GitHub org homepages", detail: "AtomEons + Atom-Eons with SVG cyberdeck hero + LIVE-stats cron", link: { href: "https://github.com/AtomEons", label: "@AtomEons" } },
      { name: "5 manuals", detail: "handbook · doctrine · org-chart · manual · trust · shortcuts", link: { href: "/handbook", label: "/handbook" } },
      { name: "Developer surface", detail: "/api/live · /api/stars · /api/badge/wave.svg · /feed.xml · /random", link: { href: "/handbook#dev", label: "developer surface" } },
      { name: "3-layer backup posture", detail: "Vercel · GitHub · D-drive snapshots with MANIFEST + RESTORE", link: { href: "/trust", label: "/trust" } },
    ],
  },
  {
    key: "rolling",
    eyebrow: "ROLLING · Q3 2026",
    title: "Rolling — actively working, this quarter",
    color: "#FFB87A",
    intro:
      "High confidence these ship in the next 90 days. Not a promise — just where the actual work is happening now.",
    items: [
      { name: "Wave 80 · intro cinematic", detail: "30s scroll-driven or WebGL intro on /welcome with a grandma-friendly skip button. Pending since Wave 79." },
      { name: "AI concierge on /ask", detail: "Claude-API powered chat on /ask. Needs env vars set on Vercel. Grounded in the lab's own doctrine + product pages." },
      { name: "Voice narration on Founder's View letters", detail: "Extend the audiobook infra to letters — 'listen to this letter' button. Reuses Eleven Labs voice clone." },
      { name: "Complete view-transition-name morph nav", detail: "Wave 144b started tile-side. Adding matching name on 9 silo destinations completes the origin→destination morph." },
      { name: "Wiki-format Orange³ documentation", detail: "Deep reference docs in the Orange3 GitHub Wiki + mirror to atomeons.com/orangebox/docs." },
    ],
  },
  {
    key: "uncertain",
    eyebrow: "UNCERTAIN · SOMEDAY",
    title: "Uncertain — I want to, no timeline",
    color: "#B5BBC0",
    intro:
      "These are honest maybes. The operator's interest is real; the calendar is not. If any of these ship, it's because the moment lined up.",
    items: [
      { name: "Sci-fi novel via AI Bookmaker", detail: "A second book, this time fiction. Would validate that the Bookmaker pipeline works for genre content, not just memoir." },
      { name: "Spiral Reasoning Manuscript v3 staged at /research/spiral-reasoning", detail: "Atom's April 2026 paper on iterative reasoning. Currently on hard drive; someday on the site." },
      { name: "Mamba / Double Mamba research surfacing", detail: "Research from arc3 on the Double Mamba Helix Brain + new Life Spark. Whenever it's ready to stand up to reader scrutiny." },
      { name: "Public API for site content", detail: "Currently: /api/live, /api/agent-gateway, /api/mcp. Could grow into a richer read-only API for third-party integrations." },
      { name: "Sponsors / support page", detail: "Not a subscription (§4A). Maybe a one-time thanks + Discord role recognition. Genuinely uncertain — the lab is designed to be sustainable without support." },
    ],
  },
  {
    key: "wont",
    eyebrow: "WON'T DO · ON PRINCIPLE",
    title: "Won't do — off-mission by design",
    color: "#FF6B6B",
    intro:
      "These are settled no. Naming them saves everyone time. If your ask lives here, we're not the right lab.",
    items: [
      { name: "A SaaS", detail: "The §4A covenant. Products run local, forever." },
      { name: "Subscription tiers on existing free products", detail: "Free stays free. Adding a 'pro' tier to Orange³ or AI Bookmaker would break the covenant." },
      { name: "Accept VC", detail: "Not scaling to a headcount is a deliberate defense against every failure mode that killed similar labs." },
      { name: "Sell user data", detail: "We don't collect it in the first place. Zero telemetry." },
      { name: "Publish jailbreak / prompt-injection tradecraft", detail: "Off-mission and unsafe." },
      { name: "Publish offensive cyber operational tradecraft", detail: "Public-info only on cyber pages." },
      { name: "Add analytics that phone home", detail: "Vercel first-party analytics only. No third-party trackers, no fingerprinting, no session replay." },
      { name: "Compete with SaaS incumbents on the SaaS grid", detail: "The whole point is to build outside that grid, not join it." },
    ],
  },
];

export default function RoadmapPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main className="min-h-screen bg-[#0A0F12] text-[#F4F4F2]">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
          <nav className="text-[11px] tracking-[0.16em] uppercase text-[#8E969D]">
            <Link href="/" className="hover:text-[#22F0D5] transition-colors">
              ::atomeons
            </Link>{" "}
            · <span className="text-[#B5BBC0]">roadmap</span>
          </nav>

          <p className="mt-16 text-[11px] tracking-[0.28em] uppercase text-[#22F0D5]">
            ::the roadmap · 4 confidence tiers · honest
          </p>

          <h1
            className="mt-4 max-w-[24ch] text-[clamp(48px,7vw,96px)] font-light leading-[1.02] tracking-[-0.025em] text-balance text-[#F4F4F2]"
            style={{ fontFamily: "Newsreader, Georgia, serif" }}
          >
            What&apos;s shipping. What&apos;s rolling. What&apos;s uncertain.
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.16em] text-[#B5BBC0]">
            <span className="inline-flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#22F0D5] animate-pulse" aria-hidden />
              LIVE
            </span>
            <span>· 4 tiers · Stable · Rolling · Uncertain · Won&apos;t do</span>
            <span>· solo lab · realistic promises only</span>
            <span>· Marco Island · FL</span>
          </div>

          <p
            className="mt-10 max-w-[68ch] text-[19px] leading-[1.6] text-[#B5BBC0]"
            style={{ fontFamily: "Newsreader, Georgia, serif" }}
          >
            Most solo labs skip roadmaps because "roadmap" implies commitments a solo can&apos;t enforce. This one is honest about the confidence gradient. Stable = live now. Rolling = actively working. Uncertain = I want to. Won&apos;t do = settled no. Naming all four saves everyone time.
          </p>

          <div
            className="ae-stagger mt-16 space-y-16"
            style={{ ["--stagger-step" as string]: "80ms" } as React.CSSProperties}
          >
            {TIERS.map((tier, i) => (
              <section
                key={tier.key}
                id={tier.key}
                className="ae-reveal-up"
                style={{ ["--stagger-index" as string]: i } as React.CSSProperties}
              >
                <p
                  className="font-mono text-[11px] tracking-[0.28em] uppercase"
                  style={{ color: tier.color }}
                >
                  ::{tier.eyebrow}
                </p>
                <h2
                  className="mt-3 text-[26px] font-medium leading-tight text-[#F4F4F2]"
                  style={{ fontFamily: "Newsreader, Georgia, serif" }}
                >
                  {tier.title}
                </h2>
                <p
                  className="mt-4 max-w-[68ch] text-[17px] leading-[1.6] text-[#B5BBC0]"
                  style={{ fontFamily: "Newsreader, Georgia, serif" }}
                >
                  {tier.intro}
                </p>
                <ul className="mt-6 max-w-[68ch] space-y-5">
                  {tier.items.map((item, j) => (
                    <li key={j} className="border-l-2 pl-4" style={{ borderColor: `${tier.color}33` }}>
                      <p className="text-[17px] font-medium text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                        {item.name}
                      </p>
                      {item.detail && (
                        <p className="mt-1 text-[15px] leading-[1.55] text-[#B5BBC0]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                          {item.detail}
                        </p>
                      )}
                      {item.link && (
                        <p className="mt-2 font-mono text-[12px]">
                          <Link href={item.link.href} className="text-[#22F0D5] hover:underline">
                            {item.link.label} →
                          </Link>
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <div className="mt-24 border-t border-[#22F0D5]/20 pt-10 text-[13px] text-[#8E969D]">
            <p>
              Want to see what already shipped? →{" "}
              <Link href="/timeline" className="text-[#22F0D5] hover:underline">
                /timeline
              </Link>
              . Want the doctrine behind these choices? →{" "}
              <Link href="/handbook" className="text-[#22F0D5] hover:underline">
                /handbook
              </Link>
              . Want to argue with a tier? →{" "}
              <a href="mailto:a.mccree@gmail.com?subject=%5Broadmap%5D" className="text-[#22F0D5] hover:underline">
                email
              </a>
              .
            </p>
            <p className="mt-2">
              <strong className="text-[#F4F4F2]">AtomEons Systems Laboratory</strong> · Marco Island · FL · 2026 · CC-BY 4.0
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
