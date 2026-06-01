"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AtomMark } from "./AtomMark";
import { NavDropdown } from "./NavDropdown";
import { MobileNav } from "./MobileNav";

/**
 * Header — premium-restraint rebuild · 2026-05-31 · active state added 2026-06-01.
 *
 * Doctrine (preserved from prior rebuild):
 *  - 5 primary items: Learn · Products · Research · Founder's View · Press
 *  - One accent (cyan) reserved for active state + 1 right-rail CTA
 *  - Wordmark only · no right-rail mark
 *  - Humanist sans · 500/600 weight · 14px · sentence-case · zero mono
 *  - Sentence-case dropdown hints with implicit gravity
 *
 * Added this pass:
 *  - Active nav state: 1px cyan underline on the matching top-level item
 *    (works for both Link and NavDropdown — NavDropdown trigger reads
 *    `data-active` from the matched dropdown root)
 *  - aria-current="page" propagation
 *  - Right-rail CTA differentiated: ONE solid cyan pill site-wide
 *    (Stripe pattern · in-flow page primaries demote to ghost variant)
 */

function useActive() {
  const pathname = usePathname() || "/";
  return (prefix: string) => {
    if (prefix === "/") return pathname === "/";
    return pathname === prefix || pathname.startsWith(prefix + "/");
  };
}

function NavLink({
  href,
  children,
  prefix,
}: {
  href: string;
  children: React.ReactNode;
  prefix?: string;
}) {
  const isActive = useActive();
  const active = isActive(prefix || href);
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`relative text-[14px] font-medium tracking-[0] transition-colors ${
        active
          ? "text-white after:absolute after:left-0 after:right-0 after:-bottom-[22px] after:h-px after:bg-[#22F0D5]"
          : "text-[#E7EBED] hover:text-white"
      }`}
    >
      {children}
    </Link>
  );
}

export function Header() {
  const isActive = useActive();

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
          <div
            data-active={isActive("/learn") || undefined}
            className={`relative ${
              isActive("/learn")
                ? "after:absolute after:left-0 after:right-0 after:-bottom-[22px] after:h-px after:bg-[#22F0D5]"
                : ""
            }`}
          >
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
                  href: "/learn/cyber",
                  label: "Cyber · ethical hacking",
                  hint: "Masters-grade · AI security · public-info only",
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
          </div>

          <div
            data-active={
              isActive("/orangebox") || isActive("/b00kmakor") || isActive("/skilski") || undefined
            }
            className={`relative ${
              isActive("/orangebox") || isActive("/b00kmakor") || isActive("/skilski")
                ? "after:absolute after:left-0 after:right-0 after:-bottom-[22px] after:h-px after:bg-[#22F0D5]"
                : ""
            }`}
          >
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
          </div>

          <div
            data-active={isActive("/research") || isActive("/intel") || undefined}
            className={`relative ${
              isActive("/research") || isActive("/intel")
                ? "after:absolute after:left-0 after:right-0 after:-bottom-[22px] after:h-px after:bg-[#22F0D5]"
                : ""
            }`}
          >
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
          </div>

          <NavLink href="/founders-view">Founder&apos;s View</NavLink>
          <NavLink href="/press">Press</NavLink>
        </nav>

        {/* Right rail · single solid CTA · ONE per site */}
        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/account"
            className="text-[13px] font-medium text-[#9BA5A7] transition-colors hover:text-[#E7EBED]"
          >
            Account
          </Link>
          <Link
            href="/start"
            className="inline-flex items-center gap-1 rounded-full bg-[#22F0D5] px-4 py-1.5 text-[13px] font-medium text-black transition-colors hover:bg-[#1AD4BD]"
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
