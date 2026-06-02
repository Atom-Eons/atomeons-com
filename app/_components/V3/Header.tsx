"use client";

/**
 * Header.tsx — V3 / noir-cinema · 2026-06-02
 * Disclosure: ATOM-V3-HEADER-2026-0602
 *
 * Top navigation for the noir-cinema redesign. This is the persistent
 * companion to the hero's signature move (variable-weight reveal +
 * live signal panel). The header is a hairline — it does not compete
 * with the hero, it frames it.
 *
 * Doctrine (from winning direction `noir-cinema`):
 *  - Three identities at once: cybersecurity gravitas, AI college depth,
 *    design-inspiration crown. The header has to register all three on
 *    the first 200ms a CISO, a student, and a designer each look at it.
 *  - Bio-cyan (#22F0D5) is the SINGLE live-signal accent. Used here only
 *    for the pulsing dot in the right-rail live panel. Not for hover,
 *    not for active state. Active state is paper-white on near-black
 *    with a 1px hairline underline — silent authority.
 *  - Red (#FF4D4D) is a second live-signal accent — used here for the
 *    1.2s pulsing dot per the direction's signature move spec.
 *  - No drop shadows, no gradients, no rounded soft chrome. Hairlines
 *    only (1px #1F242B). Stripe / Anduril / Linear restraint.
 *  - Mono eyebrow (Berkeley Mono → JetBrains Mono fallback) for the
 *    lab callsign and the live commit hash. Display sans (Inter Variable)
 *    for nav labels at 13/20 weight 450.
 *  - 5 primary nav items, single primary CTA. Mobile-collapse < md.
 *
 * 5 nav items (mapped to existing routes; preserves 200-page surface):
 *   1. Research        → /research/papers   (the AI-college credibility)
 *   2. Cyber           → /learn/cyber       (the cybersecurity surface)
 *   3. Learn           → /learn             (the curriculum index)
 *   4. Build           → /orangebox         (the revenue product)
 *   5. Founder's View  → /founders-view     (the lab-state broadcast)
 *
 * Single CTA: "Enter the lab" → /start. Hairline ghost variant. The hero
 * carries the loud move; the header carries the quiet move.
 *
 * usePathname-driven active state with prefix matching so child routes
 * (e.g. /research/papers/atom-clc-2026-0331) light their parent nav.
 *
 * Live-signal micro-panel (right rail, desktop only): a single pulsing
 * #FF4D4D 6px dot + the last 7 chars of the commit SHA in mono. Reads
 * "the lab is operating right now" without surrendering noir restraint.
 * Commit SHA is read from `NEXT_PUBLIC_COMMIT_SHA` at build (Vercel sets
 * this automatically) and falls back to a frozen sentinel if missing —
 * never a placeholder string that lies about being live.
 *
 * Mobile: hairline hamburger → slide-down panel with the same 5 items
 * stacked, same CTA at the bottom. No accordion drawers. No icons.
 * Sentence-case labels. Closes on route change (Next 16 App Router fires
 * pathname change immediately, useEffect cleans the open state).
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/* ───────────────────────────────────────────────────────────────────
 * Palette + type tokens — local to this file so the header is portable
 * if it gets lifted into a different layout shell. Names match the
 * winning direction's paletteHex string exactly.
 * ─────────────────────────────────────────────────────────────────── */
const C = {
  ink: "#08090B", // hero / page base
  panel: "#0F1114", // header surface
  paper: "#F4F4F2", // active / hover text
  mid: "#9CA3AF", // idle nav label
  muted: "#5A6068", // mono eyebrow + meta
  hair: "#1F242B", // 1px hairlines
  signal: "#22F0D5", // bio-cyan — preserved as live-signal accent
  pulse: "#FF4D4D", // red — 1.2s pulsing dot only
} as const;

/** Mono stack — Berkeley Mono if licensed, JetBrains Mono Variable as
 *  fallback, then system mono. Receipts deserve a typeface. */
const MONO =
  '"Berkeley Mono", "JetBrains Mono", ui-monospace, SFMono-Regular, ' +
  '"SF Mono", Menlo, Consolas, monospace';

/* ───────────────────────────────────────────────────────────────────
 * Nav model — 5 items, prefix-driven active state. The `prefix` lets
 * /research/papers/anything-deeper still light the Research tab.
 * ─────────────────────────────────────────────────────────────────── */
type NavItem = {
  label: string;
  href: string;
  prefix: string;
  /** sub-eyebrow shown beneath label in the mobile drawer only */
  hint: string;
};

const NAV: readonly NavItem[] = [
  {
    label: "Research",
    href: "/research/papers",
    prefix: "/research",
    hint: "Twelve manuscripts, CC-BY 4.0",
  },
  {
    label: "Cyber",
    href: "/learn/cyber",
    prefix: "/learn/cyber",
    hint: "Masters-grade · ethical, public-info only",
  },
  {
    label: "Learn",
    href: "/learn",
    // exact-prefix /learn but NOT /learn/cyber (Cyber owns its own tab)
    prefix: "/learn",
    hint: "Forty-five lessons across five levels",
  },
  {
    label: "Build",
    href: "/orangebox",
    prefix: "/orangebox",
    hint: "Orangebox · B00KMAKR · skil.ski",
  },
  {
    label: "Founder's View",
    href: "/founders-view",
    prefix: "/founders-view",
    hint: "Nightly lab-state broadcast",
  },
] as const;

/* ───────────────────────────────────────────────────────────────────
 * Active-state hook — pathname-prefix match with one specificity rule:
 * /learn/cyber wins over /learn so the Cyber tab activates on its own
 * subtree without also lighting Learn. Implemented by checking the
 * most-specific match first.
 * ─────────────────────────────────────────────────────────────────── */
function useActiveLabel(): string | null {
  const pathname = usePathname() || "/";
  // sort prefixes by length desc — most-specific match wins
  const sorted = [...NAV].sort((a, b) => b.prefix.length - a.prefix.length);
  for (const item of sorted) {
    if (pathname === item.prefix || pathname.startsWith(item.prefix + "/")) {
      return item.label;
    }
  }
  return null;
}

/* ───────────────────────────────────────────────────────────────────
 * Commit SHA — Vercel injects NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA
 * automatically on every deploy. We fall back to a frozen sentinel
 * rather than a fake string so the panel is either real or absent.
 * Sentinel is the cut-date (truthful: "this is the local-dev shell").
 * ─────────────────────────────────────────────────────────────────── */
function commitShort(): string {
  const sha =
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ||
    process.env.NEXT_PUBLIC_COMMIT_SHA ||
    "";
  if (!sha) return "local-dev";
  return sha.slice(0, 7);
}

/* ═══════════════════════════════════════════════════════════════════
 * Header — the component
 * ═════════════════════════════════════════════════════════════════ */
export function Header() {
  const active = useActiveLabel();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close mobile drawer on route change (App Router updates pathname
  // immediately; this fires before paint of the new route).
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while drawer is open (mobile UX standard).
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
      {/* ─── Sticky bar ────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-40 w-full"
        style={{
          backgroundColor: `${C.panel}E6`, // E6 ≈ 90% alpha
          backdropFilter: "saturate(140%) blur(14px)",
          WebkitBackdropFilter: "saturate(140%) blur(14px)",
          borderBottom: `1px solid ${C.hair}`,
        }}
      >
        <div className="mx-auto flex h-[68px] w-full max-w-[1400px] items-center justify-between gap-8 px-6 md:px-10">
          {/* ─── Brand ─────────────────────────────────────────────── */}
          <Link
            href="/"
            aria-label="AtomEons — return to home"
            className="group flex items-baseline gap-3 outline-none focus-visible:opacity-80"
          >
            <span
              aria-hidden
              className="block transition-[font-variation-settings] duration-500"
              style={{
                color: C.paper,
                fontFamily: "var(--font-inter), Inter, system-ui, sans-serif",
                fontSize: 20,
                lineHeight: 1,
                letterSpacing: "-0.035em",
                fontVariationSettings: "'wght' 720, 'opsz' 24",
              }}
            >
              ÆONS
            </span>
            <span
              aria-hidden
              className="hidden md:inline"
              style={{
                color: C.muted,
                fontFamily: MONO,
                fontSize: 10,
                lineHeight: 1,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                transform: "translateY(-1px)",
              }}
            >
              Research · Marco Island
            </span>
          </Link>

          {/* ─── Desktop nav (5 items) ─────────────────────────────── */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-9 md:flex"
          >
            {NAV.map((item) => {
              const isActive = active === item.label;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  data-active={isActive || undefined}
                  className="group relative outline-none"
                  style={{
                    fontFamily:
                      "var(--font-inter), Inter, system-ui, sans-serif",
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
                  <span className="block py-6 group-hover:text-[--paper]">
                    {item.label}
                  </span>
                  {/* hairline active underline — paper-white, 1px, no glow */}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 -bottom-[1px] h-px transition-opacity duration-200"
                    style={{
                      backgroundColor: C.paper,
                      opacity: isActive ? 1 : 0,
                    }}
                  />
                  {/* idle hover hairline — muted, 1px, appears on hover */}
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
            })}
          </nav>

          {/* ─── Right rail · desktop ─────────────────────────────── */}
          <div className="hidden items-center gap-6 lg:flex">
            {/* live-signal micro-panel — the trust vector for cyber buyers */}
            <div
              className="flex items-center gap-2 px-3 py-1.5"
              style={{
                border: `1px solid ${C.hair}`,
                borderRadius: 2,
              }}
              aria-label={`Build ${commitShort()} — lab operating`}
              role="status"
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
                  fontSize: 10,
                  color: C.muted,
                  letterSpacing: "0.06em",
                }}
              >
                build
              </span>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  color: C.signal,
                  letterSpacing: "0.02em",
                }}
              >
                {commitShort()}
              </span>
            </div>

            {/* Account — quiet text link */}
            <Link
              href="/account"
              style={{
                fontFamily:
                  "var(--font-inter), Inter, system-ui, sans-serif",
                fontSize: 13,
                color: C.mid,
                letterSpacing: "0",
              }}
              className="transition-colors hover:text-[#F4F4F2]"
            >
              Account
            </Link>

            {/* Single primary CTA — hairline ghost pill, NOT a solid blob.
                Noir-cinema demands restraint; the hero carries the loud move. */}
            <Link
              href="/start"
              className="group inline-flex items-center gap-2 px-5 py-2 outline-none transition-colors"
              style={{
                fontFamily:
                  "var(--font-inter), Inter, system-ui, sans-serif",
                fontSize: 13,
                color: C.paper,
                border: `1px solid ${C.hair}`,
                borderRadius: 2,
                fontVariationSettings: "'wght' 520",
                letterSpacing: "0",
                backgroundColor: "transparent",
              }}
            >
              <span className="transition-colors group-hover:text-[#08090B]">
                Enter the lab
              </span>
              <span
                aria-hidden
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  color: C.muted,
                  transition: "transform 200ms ease, color 200ms ease",
                }}
                className="translate-x-0 group-hover:translate-x-0.5 group-hover:text-[#08090B]"
              >
                →
              </span>
              {/* CTA fill on hover — paper inversion (white-on-black flip,
                  the same move as the colophon footer in § 07) */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                style={{
                  backgroundColor: C.paper,
                  borderRadius: 2,
                }}
              />
            </Link>
          </div>

          {/* ─── Right rail · tablet (between md and lg) ──────────── */}
          <div className="hidden items-center gap-5 md:flex lg:hidden">
            <Link
              href="/start"
              style={{
                fontFamily:
                  "var(--font-inter), Inter, system-ui, sans-serif",
                fontSize: 13,
                color: C.paper,
                border: `1px solid ${C.hair}`,
                borderRadius: 2,
                fontVariationSettings: "'wght' 520",
              }}
              className="inline-flex items-center gap-2 px-4 py-1.5 transition-colors hover:bg-[#1F242B]"
            >
              Enter the lab
            </Link>
          </div>

          {/* ─── Mobile hamburger ──────────────────────────────────── */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="v3-mobile-drawer"
            onClick={() => setOpen((v) => !v)}
            className="relative flex h-10 w-10 items-center justify-center md:hidden"
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
      </header>

      {/* ─── Mobile drawer ──────────────────────────────────────────── */}
      <div
        id="v3-mobile-drawer"
        aria-hidden={!open}
        className={`fixed inset-x-0 top-[68px] z-30 md:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{
          height: "calc(100vh - 68px)",
          backgroundColor: C.ink,
          borderTop: `1px solid ${C.hair}`,
          transition: "opacity 220ms ease, transform 260ms ease",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(-8px)",
        }}
      >
        <div className="flex h-full flex-col px-6 pt-8 pb-10">
          {/* mono eyebrow inside the drawer */}
          <div
            style={{
              fontFamily: MONO,
              fontSize: 10,
              color: C.muted,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Navigation · {NAV.length} sections
          </div>

          <nav aria-label="Mobile primary" className="mt-8 flex flex-col">
            {NAV.map((item) => {
              const isActive = active === item.label;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className="group flex items-baseline justify-between py-5"
                  style={{
                    borderTop: `1px solid ${C.hair}`,
                  }}
                >
                  <span className="flex flex-col gap-1.5">
                    <span
                      style={{
                        fontFamily:
                          "var(--font-inter), Inter, system-ui, sans-serif",
                        fontSize: 22,
                        lineHeight: 1,
                        letterSpacing: "-0.02em",
                        color: isActive ? C.paper : C.paper,
                        fontVariationSettings: isActive
                          ? "'wght' 620"
                          : "'wght' 480",
                      }}
                    >
                      {item.label}
                    </span>
                    <span
                      style={{
                        fontFamily: MONO,
                        fontSize: 11,
                        color: C.muted,
                        letterSpacing: "0.02em",
                      }}
                    >
                      {item.hint}
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
            })}
            <div style={{ borderTop: `1px solid ${C.hair}` }} />
          </nav>

          {/* drawer footer — CTA + live signal repeated for trust */}
          <div className="mt-auto flex flex-col gap-5">
            <Link
              href="/start"
              className="inline-flex w-full items-center justify-between px-5 py-4"
              style={{
                fontFamily:
                  "var(--font-inter), Inter, system-ui, sans-serif",
                fontSize: 15,
                color: C.ink,
                backgroundColor: C.paper,
                borderRadius: 2,
                fontVariationSettings: "'wght' 580",
              }}
            >
              <span>Enter the lab</span>
              <span aria-hidden style={{ fontFamily: MONO, fontSize: 13 }}>
                →
              </span>
            </Link>

            <div className="flex items-center justify-between">
              <Link
                href="/account"
                style={{
                  fontFamily:
                    "var(--font-inter), Inter, system-ui, sans-serif",
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

      {/* ─── Keyframes ──────────────────────────────────────────────
          Scoped to this file via a styled-jsx tag. The pulse is the
          1.2s easing rhythm specified in the signature-move brief. */}
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
