"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AeMark } from "./AeMark";

/**
 * Mobile nav with collapsible sections (Products, Æ Research).
 * Mirrors desktop dropdowns but renders inline + expandable in the drawer.
 */
const PRIMARY: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/learn", label: "Learn AI · the curriculum" },
];

const LEARN = [
  { href: "/learn", label: "/learn · curriculum", hint: "27 lessons · L0 gateway · diagnostic · ~8h" },
  { href: "/start", label: "/start · 11-min on-ramp", hint: "paced single-page · for first-timers" },
  { href: "/ai", label: "AI Guide · reference", hint: "44M reference · 51 FAQs · 28 tools · 20 paths" },
  { href: "/faq", label: "FAQ", hint: "AI 101 + ORANGEBOX · FAQPage schema" },
];

const PRODUCTS = [
  { href: "/orangebox", label: "Æ ORANGEBOX", hint: "Local-first AI cockpit · FREE launch week · then $49" },
  { href: "/skilski", label: "Æ skil.ski", hint: "skill marketplace via MCP" },
  { href: "/b00kmakor", label: "Æ B00KMakor", hint: "AI publishing house — coming" },
];

const RESEARCH = [
  { href: "/research/about", label: "About the lab", hint: "what ÆoNs Research is" },
  { href: "/research/papers", label: "Research Papers", hint: "12 manuscripts · CC-BY 4.0" },
  { href: "/research/lessons-from-sci-fi", label: "Lessons From Sci-Fi", hint: "century-long monograph · 10 clips" },
  { href: "/intel/x-algorithm", label: "X Algorithm Alpha", hint: "May 2026 xAI leak · operator extensions" },
];

const TAIL: { href: string; label: string }[] = [
  { href: "/founders-view", label: "The Founder's View" },
  { href: "/press", label: "Press" },
  { href: "/account", label: "Account" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  // Sections default CLOSED so the most direct links (Founder's View, Press,
  // Account) are visible without scroll on a 390px phone. Tap to expand.
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
        className="flex h-11 w-11 items-center justify-center rounded-md border border-[#1A2225] bg-black/60 text-[#22F0D5] hover:bg-[#0A0F11] md:hidden"
      >
        <span className="font-mono text-lg leading-none">{open ? "✕" : "☰"}</span>
      </button>

      {open ? (
        <div
          className="fixed inset-x-0 top-[60px] z-40 max-h-[calc(100vh-60px)] overflow-y-auto border-b border-[#1A2225] bg-black/95 backdrop-blur-md md:hidden"
          role="dialog"
          aria-label="Mobile navigation"
        >
          <nav className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-5 py-4">
            {/* Top row: Æ + LIVE badge */}
            <div className="mb-3 flex items-center justify-between">
              <span className="inline-flex items-center gap-2 rounded-md border border-[#22F0D5]/50 bg-black px-2 py-1">
                <AeMark size={20} glow />
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
                  ÆoNs · Research
                </span>
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
                Marco Island · FL
              </span>
            </div>

            {PRIMARY.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2.5 text-base ${
                  isActive(item.href)
                    ? "border-l-2 border-[#22F0D5] bg-[#0A0F11] text-[#F2F4F5]"
                    : "text-[#9BA5A7] hover:bg-[#0A0F11] hover:text-[#22F0D5]"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Learn section — sits ABOVE Products so the on-ramp surfaces
                surface first on the small viewport. */}
            <button
              type="button"
              onClick={() => setLearnOpen((v) => !v)}
              className="mt-1 flex items-center justify-between rounded-md border border-[#22F0D5]/30 bg-[#0A1518]/40 px-3 py-2.5 text-base text-[#22F0D5]"
              aria-expanded={learnOpen}
            >
              <span className="font-semibold uppercase tracking-wide">Learn</span>
              <span className="font-mono text-xs">{learnOpen ? "▴" : "▾"}</span>
            </button>
            {learnOpen ? (
              <div className="ml-2 flex flex-col gap-1 border-l border-[#1A2225] pl-3">
                {LEARN.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`rounded-md px-3 py-2 text-sm ${
                      isActive(l.href)
                        ? "bg-[#0A0F11] text-[#F2F4F5]"
                        : "text-[#9BA5A7] hover:bg-[#0A0F11] hover:text-[#22F0D5]"
                    }`}
                  >
                    <span className="block font-medium text-[#F2F4F5]">
                      {l.label}
                    </span>
                    <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]">
                      {l.hint}
                    </span>
                  </Link>
                ))}
              </div>
            ) : null}

            {/* Products section */}
            <button
              type="button"
              onClick={() => setProductsOpen((v) => !v)}
              className="mt-1 flex items-center justify-between rounded-md border border-[#FF7A1A]/30 bg-[#1A0F08]/40 px-3 py-2.5 text-base text-[#FF7A1A]"
              aria-expanded={productsOpen}
            >
              <span className="font-semibold uppercase tracking-wide">Products</span>
              <span className="font-mono text-xs">{productsOpen ? "▴" : "▾"}</span>
            </button>
            {productsOpen ? (
              <div className="ml-2 flex flex-col gap-1 border-l border-[#1A2225] pl-3">
                {PRODUCTS.map((p) => (
                  <Link
                    key={p.href}
                    href={p.href}
                    className={`rounded-md px-3 py-2 text-sm ${
                      isActive(p.href)
                        ? "bg-[#0A0F11] text-[#F2F4F5]"
                        : "text-[#9BA5A7] hover:bg-[#0A0F11] hover:text-[#22F0D5]"
                    }`}
                  >
                    <span className="block font-medium text-[#F2F4F5]">
                      {p.label}
                    </span>
                    <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]">
                      {p.hint}
                    </span>
                  </Link>
                ))}
              </div>
            ) : null}

            {/* Æ Research section */}
            <button
              type="button"
              onClick={() => setResearchOpen((v) => !v)}
              className="mt-1 flex items-center justify-between rounded-md border border-[#22F0D5]/30 bg-[#08151A]/40 px-3 py-2.5 text-base text-[#22F0D5]"
              aria-expanded={researchOpen}
            >
              <span className="font-semibold tracking-wide">Æ Research</span>
              <span className="font-mono text-xs">{researchOpen ? "▴" : "▾"}</span>
            </button>
            {researchOpen ? (
              <div className="ml-2 flex flex-col gap-1 border-l border-[#1A2225] pl-3">
                {RESEARCH.map((r) => (
                  <Link
                    key={r.href}
                    href={r.href}
                    className={`rounded-md px-3 py-2 text-sm ${
                      isActive(r.href)
                        ? "bg-[#0A0F11] text-[#F2F4F5]"
                        : "text-[#9BA5A7] hover:bg-[#0A0F11] hover:text-[#22F0D5]"
                    }`}
                  >
                    <span className="block font-medium text-[#F2F4F5]">
                      {r.label}
                    </span>
                    <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]">
                      {r.hint}
                    </span>
                  </Link>
                ))}
              </div>
            ) : null}

            {TAIL.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`mt-1 rounded-md px-3 py-2.5 text-base ${
                  isActive(item.href)
                    ? "border-l-2 border-[#22F0D5] bg-[#0A0F11] text-[#F2F4F5]"
                    : "text-[#9BA5A7] hover:bg-[#0A0F11] hover:text-[#22F0D5]"
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
