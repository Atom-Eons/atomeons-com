import Link from "next/link";

export const metadata = {
  title: "Changelog — atomeons.com",
  description:
    "Version history of atomeons.com. Five versions in one session, all proof-tracked through ORANGEBOX.",
};

type Release = {
  v: string;
  date: string;
  headline: string;
  bullets: string[];
};

const RELEASES: Release[] = [
  {
    v: "v7",
    date: "2026-05-14",
    headline: "Checkmate + design panel approval pass",
    bullets: [
      "Stylized-spelling redirects: /orangeb0x, /blueb0x, /bluebox → /orangebox via middleware (308 permanent)",
      "Mirrors fix: SystemLog header strip explicitly labeled ::sample (was reading as live system status)",
      "Mirrors fix: /success removed false 'single-purchase' claim, changed 'Sent to' → 'Confirmed for', added explicit 'this is the only place this link appears' microcopy",
      "Mirrors fix: 'instant download' copy changed to 'download on payment confirmed' across home + /orangebox",
      "UX fix: home hero card primary CTA changed from BuyButton to 'See ORANGEBOX →' so cold visitors qualify before purchasing",
      "UX polish: removed dead isMft branch in SystemLog (no MFT frames remain post-v6)",
      "UX polish: cleaned dangerouslySetInnerHTML on changelog bullets (use plain text)",
    ],
  },
  {
    v: "v6",
    date: "2026-05-14",
    headline: "Comprehensive upgrade pass",
    bullets: [
      "Custom 404 page (route-not-on-the-DAG)",
      "Dynamic favicon + apple-touch-icon (spinning atom mark)",
      "Web manifest, sitemap.xml, robots.txt for crawlers + PWA",
      "Sharper /success and /cancel pages matching brand tone",
      "/changelog page (this one)",
      "Sticky buy bar on /orangebox after scroll past hero",
      "Is-this-for-you qualification block reduces wrong-fit support burden",
      "JSON-LD structured data for richer search appearance",
      "Removed manifesto layer from public site (preserved internally for the lab)",
    ],
  },
  {
    v: "v5",
    date: "2026-05-14",
    headline: "Privacy scrub",
    bullets: [
      "Removed all operator-specific IDs, hashes, paths, session names from public site",
      "Replaced real party-line snapshot with honest sample receipts (project:myproject)",
      "BuildReceipts header reframed as samples, not customer telemetry",
      "Zero leaks across all 4 main routes (verified by live grep)",
      "Store flow unchanged",
    ],
  },
  {
    v: "v4",
    date: "2026-05-14",
    headline: "Linear + Vercel + Anthropic Artifacts paradigms",
    bullets: [
      "BuildReceipts component renders cockpit-format party-line cards",
      "InstallCommand: one-click copyable three-line install (Vercel/Railway pattern)",
      "ScrollReveal: intersection-observer fade-in, motion-safe",
      "Mesh-gradient hero (Stripe DNA), vercel-glow hover halo (Vercel DNA)",
      "Dropped: ⌘K command palette (UX checkmate killed it — no discovery lift)",
      "Mirrors honesty fixes: MadeWith strip + CockpitTicker explicitly labeled sample",
    ],
  },
  {
    v: "v3",
    date: "2026-05-13",
    headline: "Hacker aesthetic layer",
    bullets: [
      "SystemLog header strip rotating cockpit-status frames",
      "CRT scanlines, screen-flicker, RGB-split glitch on H1 + AtomMark hover",
      "Boot-bar one-shot loading gradient on first paint",
      "Outlaw pills (Not a startup / No team / No roadmap / One operator)",
      "ASCII section dividers across pages",
      "Terminal-prompt headlines and monospace tracking-wide microcopy",
    ],
  },
  {
    v: "v2",
    date: "2026-05-13",
    headline: "Multi-team design uplift (ux + lips + orange + mirrors)",
    bullets: [
      "AtomMark animated SVG: 3 elliptical orbits + glowing nucleus",
      "CockpitTicker rotating cockpit telemetry frames",
      "Open Graph image route (was missing → blank cards on share)",
      "Pulse-ring animation on BuyButton",
      "Mirrors prereqs disclosure block on /orangebox (Claude/GPT API + Ollama + Codexa + Tauri)",
      "Cut: doctrine repeat on home, in-progress card, standalone Requires box",
      "5 LIPS copy swaps: tighter, more specific, more confident",
      "Founder voice sentence on /about",
    ],
  },
  {
    v: "v1",
    date: "2026-05-13",
    headline: "Storefront + brand site shipped, store live",
    bullets: [
      "Next.js 16 + React 19 + Tailwind v4 + Stripe SDK",
      "12 routes: brand pages + ORANGEBOX product page + legal + store flow",
      "Stripe live checkout: real cs_live_ session URLs",
      "HMAC-signed download tokens, 30-day TTL",
      "Vercel Blob storage + signed redirect for product file delivery",
      "/success page does server-side Stripe lookup → mints token → shows download link inline (no email dependency)",
    ],
  },
];

export default function Changelog() {
  return (
    <main className="relative z-10 mx-auto w-full max-w-3xl px-6 pt-12 pb-24">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#a7b8ad]">
        <Link href="/">AtomEons</Link>{" "}
        <span className="text-[#204538]">/</span> changelog
      </p>

      <pre className="mt-6 select-none overflow-hidden font-mono text-[11px] tracking-tight text-[#1b8b75]">
{`──────────────────────────────────────────────────────
[ atomeons.com · changelog ]    one session.    six versions.
──────────────────────────────────────────────────────`}
      </pre>

      <h1 className="mt-8 text-balance text-4xl font-black leading-[1.05] tracking-tight md:text-5xl">
        Six versions, <span className="text-[#ff7a18]">one operator</span>,
        one session.
      </h1>

      <p className="mt-6 max-w-xl text-pretty text-[#a7b8ad]">
        Every version below was shipped through the ORANGEBOX cockpit —
        compiled, smoked, deployed, party-line-receipted, and committed
        to a single branch. Same operator. Same lab. Same week.
      </p>

      <ol className="mt-12 space-y-12">
        {RELEASES.map((r) => (
          <li
            key={r.v}
            className="border-l-2 border-[#204538] pl-6 transition-colors hover:border-[#ff7a18]/60"
          >
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="font-mono text-2xl font-black text-[#ff7a18]">
                {r.v}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#a7b8ad]">
                {r.date}
              </span>
            </div>
            <h2 className="mt-2 text-xl font-bold tracking-tight text-[#f7f0e4] md:text-2xl">
              {r.headline}
            </h2>
            <ul className="mt-4 space-y-1.5 text-sm text-[#a7b8ad]">
              {r.bullets.map((b, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-[#ff7a18]">·</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <pre className="mt-16 select-none overflow-hidden font-mono text-[11px] tracking-tight text-[#1b8b75]">
{`──────────────────────────────────────────────────────
[ EOF ]    next version when next request lands.
──────────────────────────────────────────────────────`}
      </pre>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/orangebox"
          className="rounded-md border border-[#ff7a18] bg-[#ff7a18] px-4 py-2 text-sm font-semibold text-[#06110e] transition-colors hover:bg-[#ffc46b]"
        >
          See the cockpit · $49 →
        </Link>
        <Link
          href="/about"
          className="rounded-md border border-[#204538] bg-[#071915] px-4 py-2 text-sm text-[#f7f0e4]"
        >
          About the lab
        </Link>
      </div>
    </main>
  );
}
