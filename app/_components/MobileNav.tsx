"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Mobile nav · premium-restraint rebuild · 2026-05-31.
 * Mirrors the new Header.tsx: 5 primary items · single accent · sentence-case
 * · no LIVE chips · no mono · no Æ-prefix. One accordion per dropdown,
 * default-collapsed. CTA at the top of the drawer.
 */

const LEARN = [
  { href: "/learn", label: "The curriculum", hint: "Forty-five lessons across five levels" },
  { href: "/learn/playbooks", label: "Playbooks by job", hint: "Eighteen job-by-job AI playbooks" },
  { href: "/learn/synthesis", label: "Synthesis", hint: "Ferriss-method minimum effective dose" },
  { href: "/learn/deep", label: "Deep · doctorate track", hint: "Self-directed AI PhD path" },
  { href: "/learn/videos", label: "Videos", hint: "Vetted AI videos · no hype" },
  { href: "/start", label: "Start · the 11-min on-ramp", hint: "Paced single-page intro" },
];

const PRODUCTS = [
  { href: "/orangebox", label: "Orangebox", hint: "Local-first AI cockpit" },
  { href: "/b00kmakor", label: "B00KMAKR", hint: "AI publishing cockpit" },
  { href: "/skilski", label: "skil.ski", hint: "Skill marketplace via MCP" },
];

const RESEARCH = [
  { href: "/research/about", label: "About the lab", hint: "What ÆoNs Research is" },
  { href: "/research/papers", label: "Papers", hint: "Twelve manuscripts under CC-BY" },
  { href: "/research/lessons-from-sci-fi", label: "Lessons from sci-fi", hint: "Monograph on AI in film and television" },
  { href: "/intel/x-algorithm", label: "X algorithm alpha", hint: "Decoded May 2026 xAI leak" },
];

const TAIL: { href: string; label: string }[] = [
  { href: "/founders-view", label: "Founder's View" },
  { href: "/press", label: "Press" },
  { href: "/account", label: "Account" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [learnOpen, setLearnOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [researchOpen, setResearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 items-center justify-center rounded-md text-[#E7EBED] hover:bg-[#0A0F11] md:hidden"
      >
        <span className="text-xl leading-none">{open ? "✕" : "☰"}</span>
      </button>

      {open ? (
        <div
          className="fixed inset-x-0 top-16 z-40 max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-[#1A2225]/60 bg-black/95 backdrop-blur-md md:hidden"
          role="dialog"
          aria-label="Mobile navigation"
        >
          <nav className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-5 py-5">
            {/* Top CTA */}
            <Link
              href="/start"
              className="mb-4 flex w-full items-center justify-center rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-4 py-3 text-sm font-medium text-[#22F0D5] hover:bg-[#22F0D5]/20"
            >
              Start →
            </Link>

            {/* Learn accordion */}
            <button
              type="button"
              onClick={() => setLearnOpen((v) => !v)}
              className="flex items-center justify-between rounded-md px-3 py-3 text-[15px] font-medium text-[#E7EBED] hover:bg-[#0A0F11]"
              aria-expanded={learnOpen}
            >
              <span>Learn</span>
              <span className="text-xs text-[#9BA5A7]">{learnOpen ? "−" : "+"}</span>
            </button>
            {learnOpen ? (
              <div className="ml-2 mb-2 flex flex-col gap-1 border-l border-[#1A2225]/60 pl-3">
                {LEARN.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`rounded-md px-3 py-2 text-sm ${
                      isActive(l.href)
                        ? "bg-[#0A0F11] text-white"
                        : "text-[#9BA5A7] hover:bg-[#0A0F11] hover:text-[#E7EBED]"
                    }`}
                  >
                    <span className="block font-medium text-[#E7EBED]">{l.label}</span>
                    <span className="mt-0.5 block text-[12px] text-[#6B7779]">{l.hint}</span>
                  </Link>
                ))}
              </div>
            ) : null}

            {/* Products accordion */}
            <button
              type="button"
              onClick={() => setProductsOpen((v) => !v)}
              className="flex items-center justify-between rounded-md px-3 py-3 text-[15px] font-medium text-[#E7EBED] hover:bg-[#0A0F11]"
              aria-expanded={productsOpen}
            >
              <span>Products</span>
              <span className="text-xs text-[#9BA5A7]">{productsOpen ? "−" : "+"}</span>
            </button>
            {productsOpen ? (
              <div className="ml-2 mb-2 flex flex-col gap-1 border-l border-[#1A2225]/60 pl-3">
                {PRODUCTS.map((p) => (
                  <Link
                    key={p.href}
                    href={p.href}
                    className={`rounded-md px-3 py-2 text-sm ${
                      isActive(p.href)
                        ? "bg-[#0A0F11] text-white"
                        : "text-[#9BA5A7] hover:bg-[#0A0F11] hover:text-[#E7EBED]"
                    }`}
                  >
                    <span className="block font-medium text-[#E7EBED]">{p.label}</span>
                    <span className="mt-0.5 block text-[12px] text-[#6B7779]">{p.hint}</span>
                  </Link>
                ))}
              </div>
            ) : null}

            {/* Research accordion */}
            <button
              type="button"
              onClick={() => setResearchOpen((v) => !v)}
              className="flex items-center justify-between rounded-md px-3 py-3 text-[15px] font-medium text-[#E7EBED] hover:bg-[#0A0F11]"
              aria-expanded={researchOpen}
            >
              <span>Research</span>
              <span className="text-xs text-[#9BA5A7]">{researchOpen ? "−" : "+"}</span>
            </button>
            {researchOpen ? (
              <div className="ml-2 mb-2 flex flex-col gap-1 border-l border-[#1A2225]/60 pl-3">
                {RESEARCH.map((r) => (
                  <Link
                    key={r.href}
                    href={r.href}
                    className={`rounded-md px-3 py-2 text-sm ${
                      isActive(r.href)
                        ? "bg-[#0A0F11] text-white"
                        : "text-[#9BA5A7] hover:bg-[#0A0F11] hover:text-[#E7EBED]"
                    }`}
                  >
                    <span className="block font-medium text-[#E7EBED]">{r.label}</span>
                    <span className="mt-0.5 block text-[12px] text-[#6B7779]">{r.hint}</span>
                  </Link>
                ))}
              </div>
            ) : null}

            {TAIL.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-3 text-[15px] font-medium ${
                  isActive(item.href)
                    ? "bg-[#0A0F11] text-white"
                    : "text-[#E7EBED] hover:bg-[#0A0F11]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </>
  );
}
