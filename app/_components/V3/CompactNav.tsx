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

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { SearchPalette, rankRecord, type SearchIndexFile, type Scored } from "./SearchPalette";
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
  const router = useRouter();
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [hint, setHint] = useState<string>(IDLE_HINT);
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("noir");
  const [fxOn, setFxOn] = useState(true);
  const closeTimer = useRef<number | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [searchQ, setSearchQ] = useState("");
  // Live suggestions · operator 2026-06-18 "looks cooler · keep going"
  const indexRef = useRef<SearchIndexFile | null>(null);
  const [indexReady, setIndexReady] = useState(false);
  const [suggestionIdx, setSuggestionIdx] = useState(-1);

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
    setMobileOpen(false);
  }, [pathname]);

  // Escape closes · ⌘K + / focus inline search (GitHub pattern)
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenKey(null);
        setMobileOpen(false);
        searchInputRef.current?.blur();
        return;
      }
      const tag = (document.activeElement?.tagName ?? "").toUpperCase();
      const inField = tag === "INPUT" || tag === "TEXTAREA" || (document.activeElement as HTMLElement)?.isContentEditable;
      const cmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      const slash = e.key === "/" && !inField;
      if (cmdK || slash) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", k);
    return () => document.removeEventListener("keydown", k);
  }, []);

  // Click outside closes popover + mobile drawer
  useEffect(() => {
    const c = (e: MouseEvent) => {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target as Node)) {
        setOpenKey(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", c);
    return () => document.removeEventListener("mousedown", c);
  }, []);

  // Lazy-load the search index on first focus · 140KB, cached in ref
  const ensureIndex = useCallback(async () => {
    if (indexRef.current) return;
    try {
      const r = await fetch("/search-index.json", { cache: "force-cache" });
      if (!r.ok) return;
      const data = (await r.json()) as SearchIndexFile;
      indexRef.current = data;
      setIndexReady(true);
    } catch {
      // Network failure: input still works as plain /ask?q= submit
    }
  }, []);

  // Live suggestions · top 6 ranked by SearchPalette.rankRecord
  const suggestions = useMemo<Scored[]>(() => {
    const q = searchQ.trim();
    if (!q || !indexRef.current) return [];
    const out: Scored[] = [];
    for (const rec of indexRef.current.records) {
      const s = rankRecord(q, rec);
      if (s) out.push(s);
    }
    out.sort((a, b) => b.score - a.score);
    return out.slice(0, 6);
  }, [searchQ, indexReady]);

  // Reset suggestion focus when query changes
  useEffect(() => { setSuggestionIdx(-1); }, [searchQ]);

  // Search submit · selected suggestion wins · else /ask?q=
  const onSearchSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (suggestionIdx >= 0 && suggestions[suggestionIdx]) {
      router.push(suggestions[suggestionIdx].r);
      setSearchQ("");
      searchInputRef.current?.blur();
      return;
    }
    const q = searchQ.trim();
    if (!q) return;
    window.location.href = `/ask?q=${encodeURIComponent(q)}`;
  }, [searchQ, suggestionIdx, suggestions, router]);

  // Keyboard nav inside the input · ↑↓ navigate · Enter submit (handled by form)
  const onSearchKey = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSuggestionIdx((i) => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSuggestionIdx((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    }
  }, [suggestions]);

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

          {/* Primary nav · 5 items · operator 2026-06-19: "tight a bit" → gap-1 + px-3.5 */}
          <nav aria-label="Primary" className="hidden lg:flex items-stretch gap-1">
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
                    className="relative inline-flex items-center px-3.5 py-2 outline-none transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22F0D5]"
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

          {/* Right utility cluster · [Search inline-always] [FX] [Theme] [Ask] [Hamburger mobile] */}
          <div className="flex items-center gap-1.5">
            {/* SEARCH · always-on inline input · operator 2026-06-19: "search at top always on home and mobile" */}
            <form
              onSubmit={onSearchSubmit}
              onMouseEnter={() => setHint("search the lab · 340+ pages · ⌘K or /")}
              role="search"
              className="relative flex items-center"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute left-2 inline-flex"
                style={{ color: searchFocused ? C.signal : C.mid, transition: "color 140ms" }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-3-3" />
                </svg>
              </span>
              <input
                ref={searchInputRef}
                value={searchQ}
                onChange={(e) => setSearchQ(e.target.value)}
                onFocus={() => { setSearchFocused(true); ensureIndex(); }}
                onBlur={() => setSearchFocused(false)}
                onKeyDown={onSearchKey}
                placeholder="search · ⌘K"
                aria-label="Search the lab"
                aria-autocomplete="list"
                aria-controls="nav-search-suggestions"
                aria-expanded={searchFocused && suggestions.length > 0}
                aria-activedescendant={suggestionIdx >= 0 ? `nav-sugg-${suggestionIdx}` : undefined}
                role="combobox"
                className="h-7 w-[120px] sm:w-[180px] lg:w-[220px] rounded-sm border bg-transparent pl-7 pr-2 outline-none transition-all"
                style={{
                  borderColor: searchFocused ? C.signal : "rgba(255,255,255,0.08)",
                  color: C.paper,
                  fontFamily: "ui-monospace, SFMono-Regular, monospace",
                  fontSize: 12,
                  boxShadow: searchFocused
                    ? `0 0 0 2px ${C.signal}22, 0 0 18px ${C.signal}33`
                    : "none",
                }}
              />
              {/* Live suggestions dropdown · top 6 · ↑↓ navigate · Enter selects */}
              {searchFocused && suggestions.length > 0 ? (
                <ul
                  id="nav-search-suggestions"
                  role="listbox"
                  className="absolute right-0 top-9 z-50 w-[min(360px,calc(100vw-32px))] overflow-hidden rounded-md border"
                  style={{
                    background: "#0A0B0E",
                    borderColor: "rgba(34,240,213,0.18)",
                    boxShadow: "0 12px 36px rgba(0,0,0,0.65)",
                    animation: "ae-pop-inline 140ms cubic-bezier(0.16,1,0.3,1)",
                  }}
                >
                  {suggestions.map((s, i) => (
                    <li
                      key={s.r}
                      id={`nav-sugg-${i}`}
                      role="option"
                      aria-selected={i === suggestionIdx}
                    >
                      <Link
                        href={s.r}
                        onMouseEnter={() => setSuggestionIdx(i)}
                        onMouseDown={(e) => {
                          // mousedown beats blur · suggestion routes before input loses focus
                          e.preventDefault();
                          router.push(s.r);
                          setSearchQ("");
                          searchInputRef.current?.blur();
                        }}
                        className="flex flex-col gap-0.5 border-l-2 px-3 py-2 transition-colors"
                        style={{
                          borderLeftColor: i === suggestionIdx ? C.signal : "transparent",
                          background: i === suggestionIdx ? "rgba(34,240,213,0.06)" : "transparent",
                        }}
                      >
                        <span
                          style={{
                            color: C.paper,
                            fontFamily: "ui-monospace, SFMono-Regular, monospace",
                            fontSize: 12, lineHeight: 1.25,
                          }}
                        >
                          {s.t.length > 70 ? s.t.slice(0, 68) + "…" : s.t}
                        </span>
                        <span
                          style={{
                            color: C.mid,
                            fontFamily: "ui-monospace, SFMono-Regular, monospace",
                            fontSize: 10, letterSpacing: "0.04em",
                          }}
                        >
                          {s.r}
                        </span>
                      </Link>
                    </li>
                  ))}
                  <li
                    className="border-t px-3 py-1.5"
                    style={{ borderTopColor: C.hair }}
                  >
                    <Link
                      href={`/ask?q=${encodeURIComponent(searchQ.trim())}`}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        window.location.href = `/ask?q=${encodeURIComponent(searchQ.trim())}`;
                      }}
                      style={{
                        color: C.signal,
                        fontFamily: "ui-monospace, SFMono-Regular, monospace",
                        fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase",
                      }}
                    >
                      ask the lab about &quot;{searchQ.trim().slice(0, 30)}&quot; →
                    </Link>
                  </li>
                </ul>
              ) : null}
            </form>

            {/* FX MASTER · sine-wave glyph · breathes when on · lg+ only */}
            <button
              type="button"
              onClick={toggleFx}
              onMouseEnter={() => setHint(fxOn ? "FX on · ambient effects live · click to disable" : "FX off · click to re-enable ambient effects")}
              aria-label={fxOn ? "Disable visual effects" : "Enable visual effects"}
              aria-pressed={fxOn}
              className="hidden lg:inline-flex h-9 w-9 items-center justify-center outline-none transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22F0D5]"
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

            {/* THEME CYCLE · circle with sector fill · lg+ only */}
            <button
              type="button"
              onClick={cycleTheme}
              onMouseEnter={() => setHint(`theme: ${THEME_LABEL[theme]} · click to cycle (noir → white → warez)`)}
              aria-label={`Theme: ${THEME_LABEL[theme]} — click to cycle`}
              className="hidden lg:inline-flex h-9 w-9 items-center justify-center outline-none transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22F0D5]"
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

            {/* ASK THE LAB · primary CTA · lg+ only · drawer has its own copy */}
            <Link
              href="/ask"
              onMouseEnter={() => setHint("ask the lab · AI-powered answers from the corpus")}
              className="ml-1 hidden lg:inline-flex h-8 items-center gap-1.5 px-3 outline-none transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22F0D5]"
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

            {/* HAMBURGER · mobile only · controlled drawer · no more absolute hack */}
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-drawer"
              className="lg:hidden inline-flex h-9 w-9 items-center justify-center outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22F0D5]"
              style={{ color: C.paper }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                {mobileOpen ? (
                  <path d="M5 5l10 10M15 5l-10 10" />
                ) : (
                  <path d="M3 6h14M3 10h14M3 14h14" />
                )}
              </svg>
            </button>
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

        {/* ─── Mobile · controlled drawer · operator 2026-06-19 hamburger in flex row */}
        {mobileOpen ? (
          <>
            {/* Backdrop · dim the page behind the drawer · tap to close */}
            <div
              aria-hidden
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 top-20 z-20 lg:hidden"
              style={{
                background: "rgba(0,0,0,0.55)",
                backdropFilter: "blur(2px)",
                WebkitBackdropFilter: "blur(2px)",
              }}
            />
          <div
            id="mobile-nav-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="absolute left-0 right-0 top-20 z-30 max-h-[80vh] overflow-y-auto px-4 py-4 lg:hidden"
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
          </>
        ) : null}
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
        @keyframes ae-pop-inline {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
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
