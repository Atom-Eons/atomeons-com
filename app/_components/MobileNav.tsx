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
];

const PRODUCTS = [
  { href: "/orangebox", label: "Æ ORANGEBOX", hint: "v6.0.0 native · $1" },
  { href: "/skilski", label: "Æ skil.ski", hint: "skill marketplace via MCP" },
  { href: "/b00kmakor", label: "Æ B00KMakor", hint: "AI publishing house" },
];

const RESEARCH = [
  { href: "/research/about", label: "About the lab", hint: "what ÆoNs Research is" },
  { href: "/research/papers", label: "Research Papers", hint: "12 manuscripts · 2026" },
  { href: "/intel/x-algorithm", label: "X Algorithm Alpha", hint: "the May 15 2026 leak · operator extensions" },
];

const TAIL: { href: string; label: string }[] = [
  { href: "/founders-view", label: "The Founder's View" },
  { href: "/press", label: "Press" },
  { href: "/account", label: "Account" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(true);
  const [researchOpen, setResearchOpen] = useState(true);
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
              <span className="inline-flex items-center gap-1.5 rounded-md border border-[#FF7A1A]/60 bg-black px-2 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF7A1A]">
                <span className="inline-block size-1.5 animate-pulse rounded-full bg-[#FF7A1A] shadow-[0_0_8px_#FF7A1A]" />
                v6.0.0 LIVE
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
