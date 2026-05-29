import Link from "next/link";
import { AtomMark } from "./AtomMark";
import { AeMark } from "./AeMark";
import { NavLink } from "./NavLink";
import { NavDropdown } from "./NavDropdown";
import { MobileNav } from "./MobileNav";

/**
 * Header — lab-grade nav, 2026-05-23 rebuild.
 *
 * Restructured information architecture:
 *  - Brand wordmark left (orbital AtomMark + Æ glyph + AtomEons +
 *    Systems Laboratory subtitle).
 *  - ONE pulse chip: /start (novice entry). The previous duplicate
 *    /ai pulse chip was collapsed into the new Learn dropdown so the
 *    two bright surfaces stop competing.
 *  - Learn ▾ (NEW) — /ai (the comprehensive gateway) + /faq (every
 *    question, FAQPage schema). The two "anyone-can-learn" surfaces.
 *  - Products ▾ — /orangebox (now v6.3 inquire-to-ship · $49),
 *    /skilski, /b00kmakor. Hints updated to match the v6.3 live page.
 *  - Æ Research ▾ — /research/about, /research/papers,
 *    /research/lessons-from-sci-fi (was missing — restored),
 *    /intel/x-algorithm.
 *  - Founder's View, Press, Account on the tail.
 *
 * Reference framing: Anthropic, OpenAI, xAI, Microsoft all carry just
 * the wordmark + minimal nav. The header reads as a peer of those
 * surfaces, not a product launch page.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-[#1A2225] bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-3">
        {/* Brand wordmark */}
        <Link href="/" className="group flex items-center gap-3">
          <span className="glitch-hover">
            <AtomMark size={32} speed={999} />
          </span>
          <div className="flex flex-col leading-none">
            <span className="flex items-baseline gap-1.5">
              <AeMark size={20} glow />
              <span className="text-sm font-semibold tracking-tight text-[#F2F4F5]">
                AtomEons
              </span>
            </span>
            <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.22em] text-[#22F0D5]">
              Systems Laboratory
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex md:gap-2 lg:gap-3">
          <NavLink href="/">Home</NavLink>

          {/* Single pulse chip — /learn. The 12-lesson AI literacy
              curriculum. The bigger, deeper version of the on-ramp;
              /start is the 11-min appetizer and lives inside Learn
              below. Operator mission 2026-05-26: onboard humanity to AI
              through this site. */}
          <Link
            href="/learn"
            className="group ml-1 inline-flex items-center gap-1.5 rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5] transition-all hover:border-[#22F0D5] hover:bg-[#22F0D5]/20"
          >
            <span className="size-1.5 rounded-full bg-[#22F0D5] shadow-[0_0_8px_rgba(34,240,213,0.8)]" />
            learn AI · the curriculum
          </Link>

          <NavDropdown
            label="Learn"
            items={[
              {
                href: "/learn",
                label: "/learn · curriculum",
                hint: "18 lessons · 5 levels · 5 paths · ~5h total",
              },
              {
                href: "/start",
                label: "/start · 11-min on-ramp",
                hint: "paced single-page intro · for first-timers",
              },
              {
                href: "/ai",
                label: "AI Guide · reference",
                hint: "44M reference · 51 FAQs · 28 tools · 20 paths",
              },
              {
                href: "/faq",
                label: "FAQ",
                hint: "AI 101 + ORANGEBOX · FAQPage schema live",
              },
            ]}
          />

          <NavDropdown
            label="Products"
            accent="orange"
            items={[
              {
                href: "/orangebox",
                label: "Æ ORANGEBOX",
                hint: "v6.3 · AE See-Suite + AE Ops · $49 inquire",
              },
              {
                href: "/skilski",
                label: "Æ skil.ski",
                hint: "skill marketplace via MCP",
              },
              {
                href: "/b00kmakor",
                label: "Æ B00KMakor",
                hint: "AI publishing house — coming",
              },
            ]}
          />

          <NavDropdown
            label="Æ Research"
            items={[
              {
                href: "/research/about",
                label: "About the lab",
                hint: "what ÆoNs Research is",
              },
              {
                href: "/research/papers",
                label: "Research Papers",
                hint: "12 manuscripts · CC-BY 4.0",
              },
              {
                href: "/research/lessons-from-sci-fi",
                label: "Lessons From Sci-Fi",
                hint: "century-long monograph · 10 cinema clips",
              },
              {
                href: "/intel/x-algorithm",
                label: "X Algorithm Alpha",
                hint: "May 2026 xAI leak · operator extensions",
              },
            ]}
          />

          <NavLink href="/founders-view">The Founder&apos;s View</NavLink>
          <NavLink href="/press">Press</NavLink>
          <NavLink href="/account">Account</NavLink>
        </nav>

        {/* Right rail: Æ badge only. */}
        <div className="hidden items-center gap-2 md:flex">
          <span
            aria-label="ÆoNs mark"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#22F0D5]/50 bg-black/70 shadow-[0_0_18px_rgba(34,240,213,0.35)]"
          >
            <AeMark size={22} glow />
          </span>
        </div>

        {/* Mobile hamburger */}
        <MobileNav />
      </div>
    </header>
  );
}
