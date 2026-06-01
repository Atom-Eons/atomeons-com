import Link from "next/link";
import { AtomMark } from "./AtomMark";
import { NavDropdown } from "./NavDropdown";
import { MobileNav } from "./MobileNav";

/**
 * Header — premium-restraint rebuild · 2026-05-31.
 *
 * Rebuilt from the AE3 Design workflow (wf_716a668b-ecf): cross-referenced
 * Apple, Anthropic, OpenAI, Stripe, Linear, Vercel, NVIDIA, DeepMind,
 * Figma, Cursor — the top-cap convergence on minimal, single-accent,
 * humanist-sans nav with 4-6 primary items.
 *
 * What the prior nav was doing wrong (per the audit):
 *  - 8+ items in primary row · premium cap is 4-6
 *  - Pulse chip / animated dot in marque · launch-week microsite tell
 *  - TWO competing accents (cyan + orange) in same row
 *  - Right-rail Æ badge duplicating the wordmark
 *  - Uppercase + monospace + 0.22em tracking · CTF-banner aesthetic
 *  - Æ-prefix on every product label · advertises specialness
 *  - "Home" link redundant with wordmark
 *
 * What this rebuild does:
 *  - 5 primary items: Learn · Products · Research · Founder's View · Press
 *  - One accent (cyan) reserved for active state + 1 right-rail CTA
 *  - Wordmark only · no right-rail mark · "Systems Laboratory" subtitle
 *    moves to footer where micro-meta belongs
 *  - Humanist sans · 500/600 weight · 14px · sentence-case · zero mono
 *  - Sentence-case dropdown hints with implicit gravity
 *  - Active state: 1px cyan underline · no background pill
 *  - Sticky · transparent at top of page · backdrop-blur on scroll
 */

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-[#1A2225]/60 bg-black/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-6 px-6">
        {/* Brand wordmark · the only mark on the bar */}
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          aria-label="AtomEons"
        >
          <AtomMark size={26} speed={999} />
          <span className="text-[15px] font-semibold tracking-[-0.01em] text-[#F2F4F5]">
            AtomEons
          </span>
        </Link>

        {/* Desktop nav · 5 primary items, sentence-case, humanist sans */}
        <nav className="hidden items-center gap-7 md:flex">
          <NavDropdown
            label="Learn"
            items={[
              {
                href: "/learn",
                label: "The curriculum",
                hint: "Forty-five lessons across five levels",
              },
              {
                href: "/learn/playbooks",
                label: "Playbooks by job",
                hint: "Eighteen job-by-job AI playbooks",
              },
              {
                href: "/learn/synthesis",
                label: "Synthesis",
                hint: "Ferriss-method minimum effective dose",
              },
              {
                href: "/learn/deep",
                label: "Deep · doctorate track",
                hint: "Self-directed AI PhD path",
              },
              {
                href: "/learn/videos",
                label: "Videos",
                hint: "Vetted AI videos · no hype",
              },
              {
                href: "/start",
                label: "Start · the 11-min on-ramp",
                hint: "Paced single-page intro",
              },
            ]}
          />

          <NavDropdown
            label="Products"
            items={[
              {
                href: "/orangebox",
                label: "Orangebox",
                hint: "Local-first AI cockpit",
              },
              {
                href: "/b00kmakor",
                label: "B00KMAKR",
                hint: "AI publishing cockpit",
              },
              {
                href: "/skilski",
                label: "skil.ski",
                hint: "Skill marketplace via MCP",
              },
            ]}
          />

          <NavDropdown
            label="Research"
            items={[
              {
                href: "/research/about",
                label: "About the lab",
                hint: "What ÆoNs Research is",
              },
              {
                href: "/research/papers",
                label: "Papers",
                hint: "Twelve manuscripts under CC-BY",
              },
              {
                href: "/research/lessons-from-sci-fi",
                label: "Lessons from sci-fi",
                hint: "Monograph on AI in film and television",
              },
              {
                href: "/intel/x-algorithm",
                label: "X algorithm alpha",
                hint: "Decoded May 2026 xAI leak",
              },
            ]}
          />

          <Link
            href="/founders-view"
            className="text-[14px] font-medium tracking-[0] text-[#E7EBED] transition-colors hover:text-white"
          >
            Founder&apos;s View
          </Link>

          <Link
            href="/press"
            className="text-[14px] font-medium tracking-[0] text-[#E7EBED] transition-colors hover:text-white"
          >
            Press
          </Link>
        </nav>

        {/* Right rail · single quiet CTA + account link */}
        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/account"
            className="text-[13px] font-medium text-[#9BA5A7] transition-colors hover:text-[#E7EBED]"
          >
            Account
          </Link>
          <Link
            href="/start"
            className="inline-flex items-center gap-1 rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-4 py-1.5 text-[13px] font-medium text-[#22F0D5] transition-colors hover:bg-[#22F0D5]/20 hover:text-white"
          >
            Start <span aria-hidden>→</span>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <MobileNav />
      </div>
    </header>
  );
}
