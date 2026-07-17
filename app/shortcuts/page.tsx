import type { Metadata } from "next";
import Link from "next/link";

/**
 * /shortcuts · Wave 145i · 2026-07-02
 *
 * Keyboard shortcuts manual. Every site has them, few sites document
 * them. This route is the single reference an accessibility auditor,
 * a power user, or a new visitor can hit to understand every non-
 * click surface the site exposes.
 *
 * Mirrors the same elevation pattern as /handbook and /doctrine.
 */

export const metadata: Metadata = {
  title: "Keyboard shortcuts · AtomEons Systems Laboratory",
  description:
    "Every keyboard shortcut the atomeons.com site exposes. Search palette, silo switching, TOC jumps, theme toggle, motion controls, discovery. Documented for power users, accessibility auditors, and screen reader users.",
  alternates: { canonical: "https://atomeons.com/shortcuts" },
  openGraph: {
    title: "Keyboard shortcuts · AtomEons",
    description: "Every shortcut · one page · one sitting.",
    url: "https://atomeons.com/shortcuts",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "atomeons.com keyboard shortcuts",
    description: "Every shortcut, documented.",
    creator: "@AtomMccree",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "AtomEons", item: "https://atomeons.com" },
    { "@type": "ListItem", position: 2, name: "Shortcuts", item: "https://atomeons.com/shortcuts" },
  ],
};

type Shortcut = { keys: string[]; description: string; note?: string };
type Section = { title: string; slug: string; items: Shortcut[] };

const SECTIONS: Section[] = [
  {
    title: "Search + discovery",
    slug: "search",
    items: [
      { keys: ["/"], description: "Focus the inline search bar in the top nav" },
      { keys: ["⌘", "K"], description: "Focus the inline search bar (macOS convention)" },
      { keys: ["Ctrl", "K"], description: "Focus the inline search bar (Windows/Linux)" },
      { keys: ["Esc"], description: "Clear + blur the search bar", note: "Also closes any open dropdown" },
      { keys: ["↑", "↓"], description: "Navigate search suggestions when open" },
      { keys: ["Enter"], description: "Open highlighted search result in the current tab" },
      { keys: ["⌘", "Enter"], description: "Open highlighted search result in a new tab (macOS)" },
      { keys: ["Ctrl", "Enter"], description: "Open highlighted search result in a new tab (Windows/Linux)" },
    ],
  },
  {
    title: "Silo navigation",
    slug: "silos",
    items: [
      { keys: ["Tab"], description: "Move focus through interactive elements in reading order" },
      { keys: ["Shift", "Tab"], description: "Move focus backwards" },
      { keys: ["Enter"], description: "Activate focused link, button, or silo tile" },
      { keys: ["Alt", "←"], description: "Browser back — restores exact scroll position on same-origin" },
      { keys: ["Alt", "→"], description: "Browser forward" },
    ],
  },
  {
    title: "Reading",
    slug: "reading",
    items: [
      { keys: ["Space"], description: "Page down (browser default)" },
      { keys: ["Shift", "Space"], description: "Page up" },
      { keys: ["Home"], description: "Jump to top of page" },
      { keys: ["End"], description: "Jump to bottom of page" },
      { keys: ["g", "g"], description: "Vim-style top-of-page (Chromium reader mode)", note: "Two quick presses" },
      { keys: ["⌘", "F"], description: "In-page text find (macOS)" },
      { keys: ["Ctrl", "F"], description: "In-page text find (Windows/Linux)" },
    ],
  },
  {
    title: "Motion + theme",
    slug: "motion",
    items: [
      {
        keys: ["System"],
        description: "prefers-reduced-motion",
        note: "OS-level setting. When enabled, atomeons.com disables all reveal animations, matrix rain, ambient effects, and glitches. Force-shows all opacity:0 elements. No JS toggle needed.",
      },
      {
        keys: ["System"],
        description: "prefers-color-scheme",
        note: "OS-level. Site is dark-native but theme-color meta pairs adapt Android/Safari OS chrome to match your system preference.",
      },
    ],
  },
  {
    title: "Anchor navigation",
    slug: "anchors",
    items: [
      { keys: ["Click TOC entry"], description: "Jumps to section with 5rem offset so header isn't hidden by sticky nav (Wave 145h)" },
      { keys: ["Skip to content"], description: "First tab-focus target on every page · lands past the nav" },
      { keys: ["#hash URL"], description: "Direct-load a page to a specific section with the same 5rem offset" },
    ],
  },
  {
    title: "Discovery",
    slug: "discovery",
    items: [
      { keys: ["Visit /random"], description: "307-redirect to a random public page — good for exploration" },
      { keys: ["Visit /random?in=/founders-view"], description: "Random Founder's View letter" },
      { keys: ["Visit /handbook"], description: "One-document lab reference" },
      { keys: ["Visit /doctrine"], description: "Operator + agent internal manual" },
      { keys: ["Visit /org-chart"], description: "Formal AtomEons structure" },
    ],
  },
  {
    title: "Developer surface",
    slug: "dev",
    items: [
      { keys: ["curl /api/live"], description: "JSON heartbeat · operator + location + wave + counts" },
      { keys: ["curl /api/badge/wave.svg"], description: "Live SVG badge (Chromium ~85%)" },
      { keys: ["curl /api/stars"], description: "Aggregate GitHub star count across 11 public repos" },
      { keys: ["curl /feed.xml"], description: "Site-wide RSS aggregate" },
      { keys: ["curl /founders-view/rss"], description: "Letters-only RSS" },
      { keys: ["curl /api/agent-gateway"], description: "LLM onboarding manifest (markdown / JSON / plain via content negotiation)" },
      { keys: ["curl /api/mcp"], description: "Model Context Protocol server endpoint" },
      { keys: ["curl /llms.txt"], description: "LLM-bootstrap manual" },
      { keys: ["curl /sitemap.xml"], description: "All 319 routes for crawlers" },
    ],
  },
];

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-block rounded border border-[#22F0D5]/30 bg-[#0F1417] px-2 py-0.5 font-mono text-[12px] leading-tight text-[#F4F4F2] shadow-[inset_0_-1px_0_rgba(34,240,213,0.15)]">
      {children}
    </kbd>
  );
}

export default function ShortcutsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main className="min-h-screen bg-[#0A0F12] text-[#F4F4F2]">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
          <nav className="text-[11px] tracking-[0.16em] text-[#8E969D] uppercase">
            <Link href="/" className="hover:text-[#22F0D5] transition-colors">::atomeons</Link>
            {" · "}
            <span className="text-[#B5BBC0]">shortcuts</span>
          </nav>

          <p className="mt-16 text-[11px] tracking-[0.28em] uppercase text-[#22F0D5]">
            ::keyboard shortcuts · 7 sections · one sitting
          </p>

          <h1
            className="mt-4 max-w-[24ch] text-[clamp(48px,7vw,96px)] font-light leading-[1.02] tracking-[-0.025em] text-balance text-[#F4F4F2]"
            style={{ fontFamily: "Newsreader, Georgia, serif" }}
          >
            Every key the site listens to.
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.16em] text-[#B5BBC0]">
            <span className="inline-flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#22F0D5] animate-pulse" aria-hidden />
              LIVE
            </span>
            <span>· 7 sections · ~40 shortcuts</span>
            <span>· documented so screen readers + power users don&apos;t have to guess</span>
            <span>· Naples · FL</span>
          </div>

          <p
            className="mt-10 max-w-[68ch] text-[19px] leading-[1.6] text-[#B5BBC0]"
            style={{ fontFamily: "Newsreader, Georgia, serif" }}
          >
            Every non-click way to move around atomeons.com. Most sites hide this. Documented once so accessibility auditors, screen reader users, journalists checking claims, and keyboard-forward developers have one place to look.
          </p>

          <div
            className="ae-stagger mt-16 space-y-14"
            style={{ ["--stagger-step" as string]: "80ms" } as React.CSSProperties}
          >
            {SECTIONS.map((section, i) => (
              <section
                key={section.slug}
                id={section.slug}
                className="ae-reveal-up"
                style={{ ["--stagger-index" as string]: i } as React.CSSProperties}
              >
                <h2
                  className="text-[24px] font-medium leading-tight text-[#F4F4F2]"
                  style={{ fontFamily: "Newsreader, Georgia, serif" }}
                >
                  {section.title}
                </h2>
                <ul className="mt-4 max-w-[68ch] space-y-3">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex flex-wrap items-baseline gap-x-4 gap-y-2 text-[16px] leading-[1.55] text-[#B5BBC0]">
                      <span className="inline-flex items-center gap-1.5 shrink-0">
                        {item.keys.map((k, kk) => (
                          <span key={kk} className="inline-flex items-center gap-1">
                            <Kbd>{k}</Kbd>
                            {kk < item.keys.length - 1 && (
                              <span className="text-[10px] text-[#6B6F72]">+</span>
                            )}
                          </span>
                        ))}
                      </span>
                      <span>
                        {item.description}
                        {item.note && (
                          <span className="mt-1 block text-[13px] text-[#8E969D]">{item.note}</span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <div className="mt-24 border-t border-[#22F0D5]/20 pt-10 text-[13px] text-[#8E969D]">
            <p>
              Missing a shortcut you'd expect to work? Open an issue at{" "}
              <Link
                href="https://github.com/Atom-Eons/atomeons-com/issues"
                className="text-[#22F0D5] hover:underline"
              >
                Atom-Eons/atomeons-com/issues
              </Link>
              .
            </p>
            <p className="mt-2">
              <strong className="text-[#F4F4F2]">AtomEons Systems Laboratory</strong> · Naples · FL · 2026 · CC-BY 4.0
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
