"use client";

/**
 * Header.tsx — V3 / noir-cinema · 2026-06-03
 * Disclosure: ATOM-V3-HEADER-2026-0603
 *
 * Six-item top nav with two dropdowns. Replaces the prior five-item shape.
 * Order: Research · Cyber · Learn▾ · Products▾ · Founder's View · Start (CTA).
 *
 * Doctrine (operator-stated 2026-06-03):
 *  - Cyber is PROMOTED to top-level direct link (was buried under /learn).
 *  - Products dropdown lists Orangebox, B00KMAKR, I AM AI (the book · forthcoming).
 *    Each row carries a status pip: cyan filled = shipping, dim hollow = in-production.
 *  - Learn dropdown lists Atlas, Career, Trust, Decode, Calc, Decoded papers.
 *  - Active-label resolver scans EACH item's child hrefs so deep routes light their
 *    parent dropdown (e.g. /orangebox lights Products, /learn/atlas lights Learn).
 *  - Desktop dropdowns: hover-open with 280ms close delay (clearTimeout pattern),
 *    Tab opens via focus-within, ESC closes, outside-click closes.
 *  - Mobile drawer: nested accordion — parent label tappable for index route + chevron
 *    expands children inline.
 *  - Bio-cyan (#22F0D5) only for live signals + active states. Red (#FF4D4D) only for
 *    the 1.2s live-dot pulse. No drop shadows, no gradients, ≤2px radius, 1px hairlines.
 *  - Brand mark "Æ ATOMEONS" top-left, Æ at wght 720, ATOMEONS at wght 540.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { SearchPalette, SearchTrigger } from "./SearchPalette";
import { RouteSigil } from "./RouteSigil";

const C = {
  ink: "#08090B",
  panel: "#0F1114",
  paper: "#F4F4F2",
  mid: "#9CA3AF",
  muted: "#5A6068",
  dim: "#5A6068",
  hair: "#1F242B",
  signal: "#22F0D5",
  pulse: "#FF4D4D",
} as const;

const MONO =
  '"Berkeley Mono", "JetBrains Mono", ui-monospace, SFMono-Regular, ' +
  '"SF Mono", Menlo, Consolas, monospace';
const SANS = "var(--font-inter), Inter, system-ui, sans-serif";

/* ───────────────────────────────────────────────────────────────────
 * Nav model
 * ─────────────────────────────────────────────────────────────────── */

type Status = "shipping" | "in-production";

type Child = {
  label: string;
  href: string;
  hint?: string;
  status?: Status;
};

type NavItem =
  | {
      kind: "link";
      label: string;
      href: string;
      childHrefs?: readonly string[];
    }
  | {
      kind: "menu";
      label: string;
      indexHref: string;
      childHrefs: readonly string[];
      children: readonly Child[];
    }
  | {
      kind: "cta";
      label: string;
      href: string;
    };

const NAV: readonly NavItem[] = [
  {
    kind: "link",
    label: "Research",
    href: "/research/papers",
    childHrefs: ["/research"],
  },
  {
    kind: "link",
    label: "Supermodels",
    href: "/supermodels",
    childHrefs: ["/supermodels"],
  },
  {
    kind: "link",
    label: "Cyber",
    href: "/learn/cyber",
    childHrefs: ["/learn/cyber"],
  },
  {
    kind: "menu",
    label: "Learn",
    indexHref: "/learn",
    childHrefs: [
      "/learn",
      "/learn/atlas",
      "/learn/career",
      "/learn/trust",
      "/learn/decode",
      "/learn/calc",
      "/learn/decoded-papers",
      "/learn/vertical",
      "/books",
      "/research/lessons-from-sci-fi/monograph",
    ],
    children: [
      { label: "Curriculum", href: "/learn", hint: "Forty-five lessons, five levels" },
      { label: "Atlas", href: "/learn/atlas", hint: "Field map of the discipline" },
      { label: "Verticals", href: "/learn/vertical", hint: "AI in 20 industries · applied" },
      { label: "Career", href: "/learn/career", hint: "Routes after the curriculum" },
      { label: "Trust", href: "/learn/trust", hint: "Verifiable receipts, no theater" },
      { label: "Decode", href: "/learn/decode", hint: "Plain-language teardowns" },
      { label: "Calc", href: "/learn/calc", hint: "Operator-grade calculators" },
      { label: "Decoded papers", href: "/learn/decoded-papers", hint: "Twelve manuscripts, explained" },
      { label: "Q · AI search", href: "/q", hint: "Twenty answered common questions" },
      { label: "Books", href: "/books", hint: "I AM AI, the Monograph, reading lists" },
      { label: "Monograph", href: "/research/lessons-from-sci-fi/monograph", hint: "Lessons from Sci-Fi, book-length" },
    ],
  },
  {
    kind: "menu",
    label: "Products",
    indexHref: "/orangebox",
    childHrefs: ["/orangebox", "/orangebox-primer", "/b00kmakor", "/i-am-ai"],
    children: [
      {
        label: "ORANGEBOX",
        href: "/orangebox",
        hint: "$99 one-time · §4A no-SaaS perpetual",
        status: "shipping",
      },
      {
        label: "B00KMAKR",
        href: "/b00kmakor",
        hint: "$99 dynamically priced · Mac + Windows",
        status: "shipping",
      },
      {
        label: "I AM AI",
        href: "/i-am-ai",
        hint: "$39 hardcover · pre-order · Opus 4.7",
        status: "in-production",
      },
    ],
  },
  {
    kind: "link",
    label: "Founder's View",
    href: "/founders-view",
    childHrefs: ["/founders-view"],
  },
  {
    kind: "cta",
    label: "Start",
    href: "/start",
  },
];

/* ───────────────────────────────────────────────────────────────────
 * Active-label resolver — scans every item's child href list and
 * picks the most-specific match so deep routes light the right parent.
 * ─────────────────────────────────────────────────────────────────── */
function resolveActive(pathname: string): string | null {
  let best: { label: string; specificity: number } | null = null;
  for (const item of NAV) {
    if (item.kind === "cta") continue;
    const hrefs =
      item.kind === "link"
        ? [item.href, ...(item.childHrefs ?? [])]
        : [item.indexHref, ...item.childHrefs];
    for (const href of hrefs) {
      const matches = pathname === href || pathname.startsWith(href + "/");
      if (matches && (!best || href.length > best.specificity)) {
        best = { label: item.label, specificity: href.length };
      }
    }
  }
  return best?.label ?? null;
}

/* ───────────────────────────────────────────────────────────────────
 * Build SHA — Vercel injects NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA.
 * Falls back to honest sentinel rather than fabricated string.
 * ─────────────────────────────────────────────────────────────────── */
function commitShort(): string {
  const sha =
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ||
    process.env.NEXT_PUBLIC_COMMIT_SHA ||
    "";
  if (!sha) return "local-dev";
  return sha.slice(0, 7);
}

/* ───────────────────────────────────────────────────────────────────
 * Status pip — cyan filled (shipping) or dim hollow (in-production)
 * ─────────────────────────────────────────────────────────────────── */
function StatusPip({ status }: { status: Status }) {
  if (status === "shipping") {
    return (
      <span
        aria-label="shipping"
        className="inline-block h-1.5 w-1.5"
        style={{
          backgroundColor: C.signal,
          borderRadius: 999,
          boxShadow: `0 0 6px ${C.signal}66`,
        }}
      />
    );
  }
  return (
    <span
      aria-label="in production"
      className="inline-block h-1.5 w-1.5"
      style={{
        backgroundColor: "transparent",
        border: `1px solid ${C.dim}`,
        borderRadius: 999,
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════════
 * DesktopDropdown — hover + focus + ESC + outside-click
 * ═════════════════════════════════════════════════════════════════ */
function DesktopDropdown({
  label,
  indexHref,
  children,
  isActive,
}: {
  label: string;
  indexHref: string;
  children: readonly Child[];
  isActive: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const clearClose = useCallback(() => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    clearClose();
    closeTimer.current = window.setTimeout(() => setOpen(false), 280);
  }, [clearClose]);

  const openNow = useCallback(() => {
    clearClose();
    setOpen(true);
  }, [clearClose]);

  // ESC closes
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Outside-click closes
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [open]);

  // Unmount cleanup
  useEffect(() => {
    return () => clearClose();
  }, [clearClose]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={scheduleClose}
      onFocus={openNow}
      onBlur={(e) => {
        // close only if focus left the container entirely
        if (
          containerRef.current &&
          !containerRef.current.contains(e.relatedTarget as Node)
        ) {
          scheduleClose();
        }
      }}
    >
      <Link
        href={indexHref}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-current={isActive ? "page" : undefined}
        data-active={isActive || undefined}
        className="group relative inline-flex items-center gap-1.5 outline-none"
        style={{
          fontFamily: SANS,
          fontSize: 13,
          lineHeight: 1,
          letterSpacing: "0",
          fontVariationSettings: isActive ? "'wght' 560" : "'wght' 440",
          color: isActive ? C.paper : C.mid,
          transition:
            "color 220ms ease, font-variation-settings 220ms ease",
        }}
      >
        <span className="block py-6 group-hover:text-[#F4F4F2]">{label}</span>
        <ChevronDown
          aria-hidden
          size={12}
          strokeWidth={1.5}
          style={{
            color: isActive ? C.paper : C.muted,
            transform: open ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 220ms ease, color 220ms ease",
          }}
        />
        <span
          aria-hidden
          className="absolute inset-x-0 -bottom-[1px] h-px transition-opacity duration-200"
          style={{
            backgroundColor: isActive ? C.signal : C.muted,
            opacity: isActive ? 1 : 0,
          }}
        />
      </Link>

      {/* Panel */}
      <div
        role="menu"
        aria-label={`${label} menu`}
        aria-hidden={!open}
        className="absolute left-0 top-full z-50"
        style={{
          minWidth: 320,
          marginTop: 0,
          pointerEvents: open ? "auto" : "none",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(-4px)",
          transition: "opacity 200ms ease, transform 220ms ease",
        }}
      >
        <div
          style={{
            backgroundColor: C.panel,
            border: `1px solid ${C.hair}`,
            borderRadius: 2,
            padding: "8px 0",
          }}
        >
          {children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              role="menuitem"
              className="group flex items-center justify-between gap-6 px-5 py-3 outline-none transition-colors"
              style={{
                fontFamily: SANS,
              }}
            >
              <span className="flex flex-col gap-1">
                <span
                  className="transition-colors group-hover:text-[#F4F4F2]"
                  style={{
                    fontSize: 13,
                    lineHeight: 1,
                    color: C.paper,
                    letterSpacing: "0",
                    fontVariationSettings: "'wght' 520",
                  }}
                >
                  {child.label}
                </span>
                {child.hint ? (
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: 10,
                      color: C.muted,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {child.hint}
                  </span>
                ) : null}
              </span>
              {child.status ? <StatusPip status={child.status} /> : null}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
 * MobileAccordion — parent tappable + chevron expands children inline
 * ═════════════════════════════════════════════════════════════════ */
function MobileAccordion({
  label,
  indexHref,
  children,
  isActive,
  onNavigate,
}: {
  label: string;
  indexHref: string;
  children: readonly Child[];
  isActive: boolean;
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(isActive);

  return (
    <div style={{ borderTop: `1px solid ${C.hair}` }}>
      <div className="flex items-stretch justify-between">
        <Link
          href={indexHref}
          onClick={onNavigate}
          aria-current={isActive ? "page" : undefined}
          className="flex-1 py-5"
        >
          <span className="flex flex-col gap-1.5">
            <span
              style={{
                fontFamily: SANS,
                fontSize: 22,
                lineHeight: 1,
                letterSpacing: "-0.02em",
                color: C.paper,
                fontVariationSettings: isActive ? "'wght' 620" : "'wght' 480",
              }}
            >
              {label}
            </span>
            <span
              style={{
                fontFamily: MONO,
                fontSize: 11,
                color: C.muted,
                letterSpacing: "0.02em",
              }}
            >
              {children.length} sections
            </span>
          </span>
        </Link>
        <button
          type="button"
          aria-label={`${expanded ? "Collapse" : "Expand"} ${label}`}
          aria-expanded={expanded}
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center justify-center px-3"
          style={{ color: C.mid }}
        >
          <ChevronDown
            size={20}
            strokeWidth={1.5}
            style={{
              transform: expanded ? "rotate(180deg)" : "rotate(0)",
              transition: "transform 220ms ease",
            }}
          />
        </button>
      </div>
      {expanded ? (
        <div className="flex flex-col pb-3">
          {children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={onNavigate}
              className="flex items-center justify-between gap-4 py-3 pl-4 pr-2"
            >
              <span className="flex flex-col gap-1">
                <span
                  style={{
                    fontFamily: SANS,
                    fontSize: 15,
                    lineHeight: 1.1,
                    color: C.paper,
                    fontVariationSettings: "'wght' 500",
                  }}
                >
                  {child.label}
                </span>
                {child.hint ? (
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: 10,
                      color: C.muted,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {child.hint}
                  </span>
                ) : null}
              </span>
              {child.status ? <StatusPip status={child.status} /> : null}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
 * Header
 * ═════════════════════════════════════════════════════════════════ */
export function Header() {
  const pathname = usePathname() || "/";
  const active = resolveActive(pathname);
  const [open, setOpen] = useState(false);

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : prev || "";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <header
        className="fixed left-0 right-0 top-0 z-40 w-full"
        style={{
          backgroundColor: `${C.panel}F2`,
          backdropFilter: "saturate(140%) blur(16px)",
          WebkitBackdropFilter: "saturate(140%) blur(16px)",
          borderBottom: `1px solid ${C.hair}`,
        }}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between gap-8 px-6 md:px-10">
          {/* ─── Brand · Æ wordmark + per-route procedural sigil ──────── */}
          <Link
            href="/"
            aria-label="AtomEons — return to home"
            className="group flex items-baseline gap-2 outline-none focus-visible:opacity-80"
          >
            {/* Unique sigil per route · deterministic from pathname ·
                ~600 bytes inline SVG · zero JS · zero network cost.
                Sits to the left of the wordmark as a heraldic mark. */}
            <span aria-hidden className="flex items-baseline self-center pr-0.5">
              <RouteSigil slug={pathname || "/"} size={22} accent="#22F0D5" />
            </span>
            <span
              aria-hidden
              className="block transition-[font-variation-settings] duration-500"
              style={{
                color: C.paper,
                fontFamily: SANS,
                fontSize: 22,
                lineHeight: 1,
                letterSpacing: "-0.04em",
                fontVariationSettings: "'wght' 720, 'opsz' 24",
              }}
            >
              Æ
            </span>
            <span
              aria-hidden
              className="block transition-[font-variation-settings] duration-500"
              style={{
                color: C.paper,
                fontFamily: SANS,
                fontSize: 14,
                lineHeight: 1,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontVariationSettings: "'wght' 540",
                transform: "translateY(-1px)",
              }}
            >
              ATOMEONS
            </span>
          </Link>

          {/* ─── Desktop nav ─────────────────────────────────────────── */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-8 md:flex"
          >
            {NAV.map((item) => {
              if (item.kind === "link") {
                const isActive = active === item.label;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    data-active={isActive || undefined}
                    className="group relative outline-none"
                    style={{
                      fontFamily: SANS,
                      fontSize: 13,
                      lineHeight: 1,
                      letterSpacing: "0",
                      fontVariationSettings: isActive
                        ? "'wght' 560"
                        : "'wght' 440",
                      color: isActive ? C.paper : C.mid,
                      transition:
                        "color 220ms ease, font-variation-settings 220ms ease",
                    }}
                  >
                    <span className="block py-6 group-hover:text-[#F4F4F2]">
                      {item.label}
                    </span>
                    <span
                      aria-hidden
                      className="absolute inset-x-0 -bottom-[1px] h-px transition-opacity duration-200"
                      style={{
                        backgroundColor: C.signal,
                        opacity: isActive ? 1 : 0,
                      }}
                    />
                    <span
                      aria-hidden
                      className="absolute inset-x-0 -bottom-[1px] h-px opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                      style={{
                        backgroundColor: C.muted,
                        opacity: isActive ? 0 : undefined,
                      }}
                    />
                  </Link>
                );
              }

              if (item.kind === "menu") {
                return (
                  <DesktopDropdown
                    key={item.label}
                    label={item.label}
                    indexHref={item.indexHref}
                    children={item.children}
                    isActive={active === item.label}
                  />
                );
              }

              // cta
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="inline-flex items-center gap-2 px-5 py-2 outline-none transition-colors"
                  style={{
                    fontFamily: SANS,
                    fontSize: 13,
                    color: C.ink,
                    backgroundColor: C.signal,
                    border: `1px solid ${C.signal}`,
                    borderRadius: 999,
                    fontVariationSettings: "'wght' 580",
                    letterSpacing: "0",
                  }}
                >
                  <span>{item.label}</span>
                  <span
                    aria-hidden
                    style={{
                      fontFamily: MONO,
                      fontSize: 11,
                      color: C.ink,
                    }}
                  >
                    →
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* ─── Search trigger (desktop) ──────────────────────────── */}
          <div className="hidden md:block">
            <SearchTrigger />
          </div>

          {/* ─── Mobile rail: search icon + hamburger ─────────────── */}
          <div className="flex items-center gap-2 md:hidden">
            <SearchTrigger compact />
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="v3-mobile-drawer"
              onClick={() => setOpen((v) => !v)}
              className="relative flex h-10 w-10 items-center justify-center"
              style={{ color: C.paper }}
            >
            <span
              aria-hidden
              className="absolute block h-px w-5 transition-transform duration-200"
              style={{
                backgroundColor: C.paper,
                transform: open
                  ? "translateY(0) rotate(45deg)"
                  : "translateY(-4px) rotate(0)",
              }}
            />
            <span
              aria-hidden
              className="absolute block h-px w-5 transition-opacity duration-200"
              style={{
                backgroundColor: C.paper,
                opacity: open ? 0 : 1,
              }}
            />
            <span
              aria-hidden
              className="absolute block h-px w-5 transition-transform duration-200"
              style={{
                backgroundColor: C.paper,
                transform: open
                  ? "translateY(0) rotate(-45deg)"
                  : "translateY(4px) rotate(0)",
              }}
            />
            </button>
          </div>
        </div>
      </header>

      {/* ─── Mobile drawer ──────────────────────────────────────────── */}
      <div
        id="v3-mobile-drawer"
        aria-hidden={!open}
        className={`fixed inset-x-0 top-16 z-30 md:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{
          height: "calc(100vh - 64px)",
          backgroundColor: C.ink,
          borderTop: `1px solid ${C.hair}`,
          transition: "opacity 220ms ease, transform 260ms ease",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(-8px)",
          overflowY: "auto",
        }}
      >
        <div className="flex min-h-full flex-col px-6 pt-6 pb-10">
          <div
            style={{
              fontFamily: MONO,
              fontSize: 10,
              color: C.muted,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Navigation
          </div>

          <nav aria-label="Mobile primary" className="mt-6 flex flex-col">
            {NAV.map((item) => {
              if (item.kind === "link") {
                const isActive = active === item.label;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className="group flex items-baseline justify-between py-5"
                    style={{
                      borderTop: `1px solid ${C.hair}`,
                    }}
                  >
                    <span className="flex flex-col gap-1.5">
                      <span
                        style={{
                          fontFamily: SANS,
                          fontSize: 22,
                          lineHeight: 1,
                          letterSpacing: "-0.02em",
                          color: C.paper,
                          fontVariationSettings: isActive
                            ? "'wght' 620"
                            : "'wght' 480",
                        }}
                      >
                        {item.label}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      style={{
                        fontFamily: MONO,
                        fontSize: 12,
                        color: isActive ? C.signal : C.muted,
                      }}
                    >
                      {isActive ? "● now" : "→"}
                    </span>
                  </Link>
                );
              }

              if (item.kind === "menu") {
                return (
                  <MobileAccordion
                    key={item.label}
                    label={item.label}
                    indexHref={item.indexHref}
                    children={item.children}
                    isActive={active === item.label}
                    onNavigate={() => setOpen(false)}
                  />
                );
              }

              // cta
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="mt-6 inline-flex w-full items-center justify-between px-5 py-4"
                  style={{
                    fontFamily: SANS,
                    fontSize: 15,
                    color: C.ink,
                    backgroundColor: C.signal,
                    borderRadius: 999,
                    fontVariationSettings: "'wght' 580",
                  }}
                >
                  <span>{item.label}</span>
                  <span aria-hidden style={{ fontFamily: MONO, fontSize: 13 }}>
                    →
                  </span>
                </Link>
              );
            })}
            <div style={{ borderTop: `1px solid ${C.hair}` }} />
          </nav>

          <div className="mt-auto pt-8">
            <div className="flex items-center justify-between">
              <Link
                href="/account"
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: SANS,
                  fontSize: 13,
                  color: C.mid,
                }}
              >
                Account
              </Link>
              <div
                className="flex items-center gap-2"
                aria-label={`Build ${commitShort()}`}
              >
                <span
                  aria-hidden
                  className="inline-block h-1.5 w-1.5"
                  style={{
                    backgroundColor: C.pulse,
                    borderRadius: 999,
                    animation: "ae-v3-pulse 1.2s ease-in-out infinite",
                    boxShadow: `0 0 6px ${C.pulse}80`,
                  }}
                />
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 11,
                    color: C.signal,
                    letterSpacing: "0.02em",
                  }}
                >
                  build {commitShort()}
                </span>
              </div>
            </div>

            <p
              className="mt-4"
              style={{
                fontFamily: MONO,
                fontSize: 10,
                color: C.muted,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
              }}
            >
              ÆoNs Research Laboratory · Marco Island, FL · 25°56′N 81°43′W
            </p>
          </div>
        </div>
      </div>

      {/* Global Cmd-K / Ctrl-K / "/" search palette — lives next to the
          Header so the trigger button can dispatch to its keydown
          listener and the palette renders above all content. */}
      <SearchPalette />

      <style jsx global>{`
        @keyframes ae-v3-pulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.45;
            transform: scale(0.85);
          }
        }
      `}</style>
    </>
  );
}

export default Header;
