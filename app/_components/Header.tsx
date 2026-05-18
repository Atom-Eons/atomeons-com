import Link from "next/link";
import { AtomMark } from "./AtomMark";
import { AeMark } from "./AeMark";
import { NavLink } from "./NavLink";
import { NavDropdown } from "./NavDropdown";
import { MobileNav } from "./MobileNav";

/**
 * Header v6.0 — Æ doctrine.
 *
 * - Brand wordmark left: orbital AtomMark + Æ glyph + "AtomEons".
 * - Top-right: standalone Æ badge (operator decree — "Æ top right of sight").
 * - Nav: Home · Products ▾ · Æ Research ▾ · The Founder's View · Press · Account.
 * - Orange survives ONLY on the Æ glyph, the v6.0.0 LIVE badge, and the
 *   Products + Æ Research dropdown accents.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-[#1A2225] bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-3">
        {/* Brand wordmark */}
        <Link href="/" className="group flex items-center gap-3">
          <span className="glitch-hover">
            <AtomMark size={32} speed={9} />
          </span>
          <div className="flex flex-col leading-none">
            <span className="flex items-baseline gap-1.5">
              <AeMark size={20} glow />
              <span className="text-sm font-semibold tracking-tight text-[#F2F4F5]">
                AtomEons
              </span>
            </span>
            <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.22em] text-[#22F0D5]">
              the cockpit you own
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex md:gap-2 lg:gap-3">
          <NavLink href="/">Home</NavLink>

          <NavDropdown
            label="Products"
            accent="orange"
            items={[
              {
                href: "/orangebox",
                label: "Æ ORANGEBOX",
                hint: "v6.0.0 · native cockpit · $1",
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
                hint: "12 manuscripts · 2026",
              },
              {
                href: "/intel/x-algorithm",
                label: "X Algorithm Alpha",
                hint: "the May 15 2026 xAI leak · operator extensions",
              },
            ]}
          />

          <NavLink href="/founders-view">The Founder&apos;s View</NavLink>
          <NavLink href="/press">Press</NavLink>
          <NavLink href="/account">Account</NavLink>
        </nav>

        {/* Right rail: top-right Æ badge + LIVE chip */}
        <div className="hidden items-center gap-2 md:flex">
          <span className="inline-flex items-center gap-1.5 rounded-md border border-[#FF7A1A]/60 bg-black px-2 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF7A1A]">
            <span className="inline-block size-1.5 animate-pulse rounded-full bg-[#FF7A1A] shadow-[0_0_8px_#FF7A1A]" />
            v6.0.0 LIVE
          </span>
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
