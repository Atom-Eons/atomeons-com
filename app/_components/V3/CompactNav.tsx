"use client";

/**
 * CompactNav — Wave 79 · 2026-06-12 · operator: "DROPDOWN NAV SUCKS.
 *  I LIKE DROPDOWNS, FIXED SEARCH, SWITCHES, AND INFOTIPS BUT COOL
 *  LOOKING NOT STANDARD. 10X BETTER IN UX."
 *
 * One 48px strip + 32px infotip strip = 80px total chrome (was 105+).
 *
 * Layout:
 *   [Æ ATOMEONS]   [Lab] [Learn] [Cyber] [Create] [Products]
 *                                                  [⌕] [≈ FX] [◐ Theme] [Ask the lab →]
 *
 *   ▸ infotip strip (transparent, 32px) — swaps copy on nav-hover.
 *
 * Five top-level items. Each opens a 380px single-column popover
 * (NOT full-width mega · no feature image). Cysec is a singleton
 * click-through to /cysec, no popover.
 *
 * Pure CSS for the scan-line active underline + FX sine-wave breathing.
 * No WebGL, no canvas, no third-party UI lib.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SearchPalette } from "./SearchPalette";
import { SiloSwitcher } from "./SiloSwitcher";

// ─────────────────────────────────────────────────────────────────────
// Palette · noir base · cyan signal · cream paper
// ─────────────────────────────────────────────────────────────────────
const C = {
  ink: "#08090B",
  panel: "#0F1114",
  hair: "rgba(255,255,255,0.06)",
  paper: "#F4F4F2",
  paperDim: "rgba(244,244,242,0.7)",
  mid: "#6B6F72",
  dim: "rgba(34,240,213,0.6)",
  signal: "#22F0D5",
  amber: "#FF7733",
};

// ─────────────────────────────────────────────────────────────────────
// 5 top-level groups
// ─────────────────────────────────────────────────────────────────────
type NavItem = { label: string; href: string; desc: string };
type NavGroup = {
  key: string;
  label: string;
  href: string;
  hint: string;
  items?: NavItem[];
};

const GROUPS: NavGroup[] = [
  {
    key: "lab",
    label: "Lab",
    href: "/about",
    hint: "what the lab is · who runs it · what it ships",
    items: [
      { label: "About", href: "/about", desc: "one operator · one organism" },
      { label: "Research", href: "/research", desc: "primary source · decoded into plain language" },
      { label: "Press", href: "/press", desc: "press kit · embargo policy" },
      { label: "Founder's View", href: "/founders-view", desc: "operator's running log · indexed by date" },
      { label: "Paths", href: "/paths", desc: "AI Pilot · Cyber Pro learning tracks" },
      { label: "Innovations", href: "/innovations", desc: "inventions + discoveries log" },
    ],
  },
  {
    key: "learn",
    label: "Learn",
    href: "/learn",
    hint: "free curriculum · books · cheat sheets · skills",
    items: [
      { label: "Curriculum", href: "/learn", desc: "free 68-lesson AI track" },
      { label: "Books", href: "/books", desc: "all titles · cinema home" },
      { label: "AI Ware", href: "/aiware", desc: "the product line manual" },
      { label: "Best Practices", href: "/best-practices", desc: "cheat sheets · models · tools" },
      { label: "Skills", href: "/skills", desc: "reusable skill primers" },
      { label: "SoulKey", href: "/soulkey", desc: "your identity as a machine-readable asset" },
    ],
  },
  {
    key: "cyber",
    label: "Cyber",
    href: "/learn/cyber",
    hint: "cybersecurity primer · mythos · industry models",
    // No popover · Cyber is a singleton click-through to honor the gate.
  },
  {
    key: "create",
    label: "Create",
    href: "/art",
    hint: "art · sound · meditation · studio surfaces",
    items: [
      { label: "Art", href: "/art", desc: "368 procedural pieces · CC-BY" },
      { label: "Mindrest", href: "/mindrest", desc: "audiovisual entrainment · lofi rooms · meditation" },
      { label: "Tools", href: "/tools", desc: "lab utilities + integrations" },
      { label: "Studio", href: "/lab", desc: "experimentation surface" },
    ],
  },
  {
    key: "products",
    label: "Products",
    href: "/orangebox",
    hint: "Orange³ · AI Bookmaker · I Am AI · all free",
    items: [
      { label: "Orange³", href: "/orangebox", desc: "sovereign agentic OS · free always" },
      { label: "AI Bookmaker", href: "/b00kmakor", desc: "publishing cockpit · free" },
      { label: "I Am AI", href: "/i-am-ai", desc: "the book · free PDF + audiobook" },
      { label: "skil.ski", href: "/skilski", desc: "universal MCP skill registry" },
      { label: "Discord", href: "/discord", desc: "the workshop · invite live" },
    ],
  },
];

const IDLE_HINT = "ATOMEONS SYSTEMS LAB · MARCO ISLAND · OPEN · LAUNCH DAY 2026-06-12";

// ─────────────────────────────────────────────────────────────────────
// Active-route detection
// ─────────────────────────────────────────────────────────────────────
function isActive(pathname: string, group: NavGroup): boolean {
  if (pathname === group.href) return true;
  if (group.items?.some((it) => pathname === it.href || pathname.startsWith(it.href + "/"))) return true;
  return false;
}

// ─────────────────────────────────────────────────────────────────────
// Theme cycle · noir → white → warez → noir
// ─────────────────────────────────────────────────────────────────────
type Theme = "noir" | "white" | "warez";
const THEMES: Theme[] = ["noir", "white", "warez"];
const THEME_LABEL: Record<Theme, string> = {
  noir: "NOIR",
  white: "WHITE",
  warez: "WAREZ",
};

function applyTheme(t: Theme) {
  if (typeof document === "undefined") return;
  const html = document.documentElement;
  THEMES.forEach((k) => html.classList.remove(`theme-${k}`));
  if (t !== "noir") html.classList.add(`theme-${t}`);
  try { localStorage.setItem("aeTheme", t); } catch {}
}

function loadTheme(): Theme {
  if (typeof window === "undefined") return "noir";
  try {
    const stored = localStorage.getItem("aeTheme");
    if (stored && (THEMES as string[]).includes(stored)) return stored as Theme;
  } catch {}
  return "noir";
}

// ─────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────
export function CompactNav() {
  const pathname = usePathname() || "/";
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [hint, setHint] = useState<string>(IDLE_HINT);
  const [searchOpen, setSearchOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("noir");
  const [fxOn, setFxOn] = useState(true);
  const closeTimer = useRef<number | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [searchQ, setSearchQ] = useState("");

  // Load theme + fx from localStorage on mount
  useEffect(() => {
    const t = loadTheme();
    setTheme(t);
    applyTheme(t);
    try {
      const fx = localStorage.getItem("aeFx");
      if (fx === "0") {
        setFxOn(false);
        document.documentElement.classList.add("fx-off");
      }
    } catch {}
  }, []);

  const cycleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = THEMES[(THEMES.indexOf(prev) + 1) % THEMES.length];
      applyTheme(next);
      return next;
    });
  }, []);

  const toggleFx = useCallback(() => {
    setFxOn((prev) => {
      const next = !prev;
      try { localStorage.setItem("aeFx", next ? "1" : "0"); } catch {}
      if (next) document.documentElement.classList.remove("fx-off");
      else document.documentElement.classList.add("fx-off");
      return next;
    });
  }, []);

  // Popover open/close · 80ms enter delay · 120ms leave linger
  const clearTimer = useCallback(() => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const open = useCallback((key: string, h: string) => {
    clearTimer();
    setOpenKey(key);
    setHint(h);
  }, [clearTimer]);

  const scheduleClose = useCallback(() => {
    clearTimer();
    closeTimer.current = window.setTimeout(() => {
      setOpenKey(null);
      setHint(IDLE_HINT);
    }, 140);
  }, [clearTimer]);

  // Close on route change
  useEffect(() => {
    setOpenKey(null);
    setHint(IDLE_HINT);
    setSearchOpen(false);
  }, [pathname]);

  // Escape closes
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenKey(null);
        setSearchOpen(false);
      }
      // ⌘K opens search
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
        setTimeout(() => searchInputRef.current?.focus(), 30);
      }
    };
    document.addEventListener("keydown", k);
    return () => document.removeEventListener("keydown", k);
  }, []);

  // Click outside closes popover
  useEffect(() => {
    const c = (e: MouseEvent) => {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target as Node)) {
        setOpenKey(null);
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", c);
    return () => document.removeEventListener("mousedown", c);
  }, []);

  // Search submit · routes to /ask?q= or /q/<slug>
  const onSearchSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQ.trim();
    if (!q) return;
    window.location.href = `/ask?q=${encodeURIComponent(q)}`;
  }, [searchQ]);

  return (
    <>
      <SearchPalette />
      <SiloSwitcher />

      <header
        ref={navRef}
        className="fixed left-0 right-0 top-0 z-40 w-full"
        onMouseLeave={scheduleClose}
        style={{
          background: C.ink,
          borderBottom: `1px solid ${C.hair}`,
        }}
      >
        {/* ─── 48px nav row ────────────────────────────────────────── */}
        <div className="mx-auto flex h-12 w-full max-w-[1480px] items-center justify-between gap-4 px-4 md:px-6">
          {/* Brand */}
          <Link
            href="/"
            aria-label="AtomEons home"
            className="group flex items-baseline gap-2 outline-none focus-visible:opacity-80"
            onMouseEnter={() => setHint(IDLE_HINT)}
          >
            <span
              aria-hidden
              style={{
                color: C.paper, fontFamily: "ui-monospace, SFMono-Regular, monospace",
                fontSize: 18, lineHeight: 1, letterSpacing: "-0.02em", fontWeight: 600,
              }}
            >Æ</span>
            <span
              aria-hidden
              className="hidden sm:block"
              style={{
                color: C.paper, fontFamily: "ui-monospace, SFMono-Regular, monospace",
                fontSize: 12, lineHeight: 1, letterSpacing: "0.18em", textTransform: "uppercase",
                opacity: 0.85,
              }}
            >ATOMEONS</span>
          </Link>

          {/* Primary nav · 5 items */}
          <nav aria-label="Primary" className="hidden lg:flex items-stretch gap-0">
            {GROUPS.map((g) => {
              const active = isActive(pathname, g);
              const isOpenItem = openKey === g.key;
              const hasPopover = !!g.items?.length;

              return (
                <div
                  key={g.key}
                  className="relative flex items-stretch"
                  onMouseEnter={() => hasPopover ? open(g.key, g.hint) : setHint(g.hint)}
                >
                  <Link
                    href={g.href}
                    aria-current={active ? "page" : undefined}
                    className="relative inline-flex items-center px-3 py-2 outline-none transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22F0D5]"
                    style={{
                      color: active || isOpenItem ? C.paper : C.paperDim,
                      fontFamily: "ui-monospace, SFMono-Regular, monospace",
                      fontSize: 13, letterSpacing: "0.02em",
                    }}
                  >
                    {g.label}
                    {/* Active scanning underline · cool not standard */}
                    {active ? (
                      <span
                        aria-hidden
                        className="absolute left-3 right-3 -bottom-[10px] h-px overflow-hidden"
                        style={{ background: `${C.signal}33` }}
                      >
                        <span
                          aria-hidden
                          className="block h-px"
                          style={{
                            width: "30%",
                            background: `linear-gradient(90deg, transparent, ${C.signal}, transparent)`,
                            animation: "ae-scan 3s linear infinite",
                          }}
                        />
                      </span>
                    ) : null}
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* Right utility cluster · [Search] [FX] [Theme] [Ask] */}
          <div className="flex items-center gap-1.5">
            {/* SEARCH · click expands inline input · ⌘K shortcut */}
            <div className="relative flex items-center">
              {searchOpen ? (
                <form onSubmit={onSearchSubmit} className="flex items-center">
                  <input
                    ref={searchInputRef}
                    value={searchQ}
                    onChange={(e) => setSearchQ(e.target.value)}
                    placeholder="search the lab · ⌘K"
                    autoFocus
                    aria-label="Search the lab"
                    className="h-7 w-[min(260px,calc(100vw-160px))] rounded-sm border bg-transparent px-3 outline-none transition-colors"
                    style={{
                      borderColor: C.signal,
                      color: C.paper,
                      fontFamily: "ui-monospace, SFMono-Regular, monospace",
                      fontSize: 12,
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => { setSearchOpen(false); setSearchQ(""); }}
                    aria-label="close search"
                    className="ml-1 inline-flex h-7 w-7 items-center justify-center"
                    style={{ color: C.mid }}
                  >×</button>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => { setSearchOpen(true); setTimeout(() => searchInputRef.current?.focus(), 30); }}
                  onMouseEnter={() => setHint("search the lab · 340+ pages · ⌘K from anywhere")}
                  aria-label="open search"
                  className="inline-flex h-9 w-9 items-center justify-center outline-none transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22F0D5]"
                  style={{ color: C.paper, opacity: 0.85 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                    <circle cx="11" cy="11" r="7" />
                    <path d="M20 20l-3-3" />
                  </svg>
                </button>
              )}
            </div>

            {/* FX MASTER · sine-wave glyph · breathes when on */}
            <button
              type="button"
              onClick={toggleFx}
              onMouseEnter={() => setHint(fxOn ? "FX on · ambient effects live · click to disable" : "FX off · click to re-enable ambient effects")}
              aria-label={fxOn ? "Disable visual effects" : "Enable visual effects"}
              aria-pressed={fxOn}
              className="inline-flex h-9 w-9 items-center justify-center outline-none transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22F0D5]"
              style={{
                color: fxOn ? C.signal : "#3A3A3A",
                filter: fxOn ? `drop-shadow(0 0 4px ${C.signal})` : "none",
              }}
            >
              <svg
                width="22" height="14" viewBox="0 0 22 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"
                aria-hidden
                className={fxOn ? "ae-fx-breathe" : ""}
              >
                <path d="M1 7 Q 5 1, 9 7 T 17 7 T 21 7" />
              </svg>
            </button>

            {/* THEME CYCLE · circle with sector fill */}
            <button
              type="button"
              onClick={cycleTheme}
              onMouseEnter={() => setHint(`theme: ${THEME_LABEL[theme]} · click to cycle (noir → white → warez)`)}
              aria-label={`Theme: ${THEME_LABEL[theme]} — click to cycle`}
              className="inline-flex h-9 w-9 items-center justify-center outline-none transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22F0D5]"
              style={{ color: C.paper, opacity: 0.85 }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden style={{ transform: "rotate(-90deg)" }}>
                <circle cx="7" cy="7" r="6" fill="none" stroke="currentColor" strokeWidth="1.2" />
                {theme === "noir" && (
                  <path d="M7,7 L7,1 A6,6 0 0,1 12.196,4 Z" fill="currentColor" />
                )}
                {theme === "white" && (
                  <path d="M7,7 L7,1 A6,6 0 0,1 12.196,10 Z" fill="currentColor" />
                )}
                {theme === "warez" && (
                  <circle cx="7" cy="7" r="6" fill="currentColor" />
                )}
              </svg>
            </button>

            {/* ASK THE LAB · primary CTA */}
            <Link
              href="/ask"
              onMouseEnter={() => setHint("ask the lab · AI-powered answers from the corpus")}
              className="ml-1 hidden md:inline-flex h-8 items-center gap-1.5 px-3 outline-none transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22F0D5]"
              style={{
                background: C.signal,
                color: C.ink,
                fontFamily: "ui-monospace, SFMono-Regular, monospace",
                fontSize: 12, letterSpacing: "0.04em",
              }}
            >
              Ask the lab
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        {/* ─── 32px infotip strip ───────────────────────────────────── */}
        <div
          aria-hidden
          className="h-8 w-full overflow-hidden border-t"
          style={{ borderTopColor: C.hair, background: "transparent" }}
        >
          <div className="mx-auto flex h-8 w-full max-w-[1480px] items-center px-4 md:px-6">
            <p
              key={hint}
              className="ae-hint-fade"
              style={{
                color: C.signal,
                opacity: hint === IDLE_HINT ? 0.45 : 0.9,
                fontFamily: "ui-monospace, SFMono-Regular, monospace",
                fontSize: 10.5, letterSpacing: "0.18em", textTransform: "uppercase",
                margin: 0,
              }}
            >
              {hint}
            </p>
          </div>
        </div>

        {/* ─── Compact popover · 380px · single column ─────────────── */}
        {openKey ? (
          <div
            className="absolute hidden lg:block"
            onMouseEnter={clearTimer}
            onMouseLeave={scheduleClose}
            style={{
              top: 80,
              left: "50%",
              transform: "translateX(-50%)",
              width: 380,
              // Wave 82 perf · was rgba+backdrop-blur(12px) · GPU compositor
              // thrash on every hover · near-black background gives identical
              // optical result without per-hover filter context creation
              background: "#0A0B0E",
              border: `1px solid rgba(34,240,213,0.18)`,
              borderRadius: 8,
              boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
              animation: "ae-pop 140ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {GROUPS.filter((g) => g.key === openKey).map((g) => (
              <div key={g.key} className="px-4 py-4">
                {g.items?.slice(0, 6).map((it) => (
                  <Link
                    key={it.href}
                    href={it.href}
                    className="block px-2 py-2.5 outline-none transition-colors hover:bg-white/[0.03] focus-visible:bg-white/[0.05]"
                  >
                    <p
                      style={{
                        color: C.paper,
                        fontFamily: "ui-monospace, SFMono-Regular, monospace",
                        fontSize: 13, lineHeight: 1.2, letterSpacing: "0.02em",
                      }}
                    >
                      {it.label}
                    </p>
                    <p
                      style={{
                        color: C.mid,
                        fontFamily: "Newsreader, Georgia, serif",
                        fontSize: 12, lineHeight: 1.35, marginTop: 2,
                      }}
                    >
                      {it.desc}
                    </p>
                  </Link>
                ))}
                <div className="mt-2 border-t pt-2" style={{ borderColor: C.hair }}>
                  <Link
                    href={g.href}
                    className="block px-2 py-2 outline-none transition-colors hover:bg-white/[0.03]"
                    style={{
                      color: C.signal,
                      fontFamily: "ui-monospace, SFMono-Regular, monospace",
                      fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase",
                    }}
                  >
                    open {g.label.toLowerCase()} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {/* ─── Mobile · hamburger drawer ───────────────────────────── */}
        <details className="lg:hidden">
          <summary
            className="absolute right-4 top-2 inline-flex h-8 w-8 cursor-pointer list-none items-center justify-center outline-none"
            style={{ color: C.paper }}
            aria-label="Open menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
              <path d="M3 6h14M3 10h14M3 14h14" />
            </svg>
          </summary>
          <div
            className="absolute left-0 right-0 top-12 z-30 max-h-[80vh] overflow-y-auto px-4 py-4"
            style={{ background: C.ink, borderBottom: `1px solid ${C.hair}` }}
          >
            {GROUPS.map((g) => (
              <div key={g.key} className="border-b py-2" style={{ borderColor: C.hair }}>
                <Link
                  href={g.href}
                  className="block py-1"
                  style={{
                    color: C.paper,
                    fontFamily: "ui-monospace, SFMono-Regular, monospace",
                    fontSize: 14, letterSpacing: "0.04em",
                  }}
                >
                  {g.label}
                </Link>
                {g.items?.map((it) => (
                  <Link
                    key={it.href}
                    href={it.href}
                    className="block py-1 pl-3"
                    style={{
                      color: C.paperDim,
                      fontFamily: "Newsreader, Georgia, serif",
                      fontSize: 13,
                    }}
                  >
                    {it.label}
                  </Link>
                ))}
              </div>
            ))}
            <div className="mt-3 flex items-center gap-2">
              <button onClick={toggleFx} className="px-3 py-2 text-[12px] font-mono" style={{ color: fxOn ? C.signal : C.mid }}>
                FX {fxOn ? "ON" : "OFF"}
              </button>
              <button onClick={cycleTheme} className="px-3 py-2 text-[12px] font-mono" style={{ color: C.paper }}>
                {THEME_LABEL[theme]}
              </button>
              <Link href="/ask" className="ml-auto inline-flex items-center gap-1.5 px-3 py-2 text-[12px] font-mono" style={{ background: C.signal, color: C.ink }}>
                Ask the lab →
              </Link>
            </div>
          </div>
        </details>
      </header>

      {/* Inline keyframes · scoped to nav · no global CSS bloat */}
      <style jsx global>{`
        @keyframes ae-scan {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        @keyframes ae-pop {
          from { opacity: 0; transform: translate(-50%, -4px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }
        @keyframes ae-hint {
          from { opacity: 0; }
          to   { opacity: 0.9; }
        }
        @keyframes ae-fx-breathe {
          0%, 100% { opacity: 0.8; }
          50%      { opacity: 1; }
        }
        .ae-fx-breathe { animation: ae-fx-breathe 2400ms ease-in-out infinite; }
        .ae-hint-fade  { animation: ae-hint 120ms ease-out; }
        html.fx-off .ae-fx-breathe,
        html.fx-off [data-component="sacred-svg"],
        html.fx-off [data-component="sacred-canvas"],
        html.fx-off [data-component="living-cursor"] {
          animation: none !important;
          display: none !important;
        }
        /* Wave 82 a11y · prefers-reduced-motion guards
           (WCAG 2.3.3 Animation from Interactions · 2.3.1 Three Flashes) */
        @media (prefers-reduced-motion: reduce) {
          .ae-fx-breathe { animation: none; opacity: 1; }
          .ae-hint-fade  { animation: none; }
          .ae-scan-line  { animation: none; }
        }
      `}</style>
    </>
  );
}
