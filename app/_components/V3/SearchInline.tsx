"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  rankRecord,
  type SearchIndexFile,
  type Scored,
} from "./SearchPalette";

/**
 * SearchInline — persistent full-width search bar under the fixed Header.
 *
 * Operator brief 2026-06-05: a second full bar for typing the length of
 * the window under the top nav. Cmd-K palette stays as the keyboard-
 * primary entry point; this is the visible always-typeable surface.
 *
 * Design contract:
 *   - Sticky directly below the Header (Header is fixed top-0 h-16,
 *     so this sits at top-16 with z-30 — below Header z-40, above
 *     content).
 *   - Loads /public/search-index.json on first focus and caches.
 *   - Type to filter. Results dropdown opens BELOW the bar on focus.
 *   - Same engine as <SearchPalette /> — re-exports its scorer.
 *   - Sub-15ms keystroke-to-render (no debounce, no Worker, no API).
 *   - ↑↓ arrows navigate, Enter follows, ESC blurs and clears.
 *   - Click-outside closes the dropdown but preserves the query so a
 *     re-focus brings it back.
 *
 * Hidden routes:
 *   - On /admin/* and /api/* don't render (already are server-only
 *     surfaces, no value showing a search bar there).
 *   - Honors prefers-reduced-motion via Tailwind motion-safe utilities
 *     (no transform animations to disable here).
 */

const HIDDEN_PREFIXES = ["/admin", "/api", "/auth"];

export function SearchInline() {
  const pathname = usePathname() ?? "/";
  const router = useRouter();

  const [index, setIndex] = useState<SearchIndexFile | null>(null);
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // Don't render on admin / api / auth surfaces
  const hidden = HIDDEN_PREFIXES.some((p) => pathname.startsWith(p));

  // Lazy-load index on first focus (or first non-empty query)
  useEffect(() => {
    if (index || loading) return;
    if (!focused && !query) return;
    setLoading(true);
    fetch("/search-index.json", { cache: "force-cache" })
      .then((r) => r.json())
      .then((data: SearchIndexFile) => setIndex(data))
      .catch(() =>
        setIndex({ v: 1, built: "", count: 0, records: [] }),
      )
      .finally(() => setLoading(false));
  }, [focused, query, index, loading]);

  // Click outside the wrapper → blur the dropdown (keep the query)
  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    }
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, []);

  // Results
  const results = useMemo<Scored[]>(() => {
    if (!index) return [];
    const q = query.trim();
    if (!q) return [];
    const scored: Scored[] = [];
    for (const r of index.records) {
      const s = rankRecord(q, r);
      if (s) scored.push(s);
    }
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 8);
  }, [query, index]);

  useEffect(() => {
    setActiveIdx(0);
  }, [query]);

  function go(route: string) {
    setFocused(false);
    setQuery("");
    inputRef.current?.blur();
    router.push(route);
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, Math.max(results.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const hit = results[activeIdx];
      if (hit) go(hit.r);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setQuery("");
      setFocused(false);
      inputRef.current?.blur();
    }
  }

  if (hidden) return null;

  const showDropdown = focused && query.trim().length > 0;

  return (
    <div
      ref={wrapRef}
      className="sticky top-16 z-30 w-full border-b border-[#1F242B] bg-[#08090B]/95 backdrop-blur-md"
      data-component="search-inline"
    >
      <div className="mx-auto flex w-full max-w-[1600px] items-stretch gap-3 px-6 md:px-10 lg:px-14">
        {/* Eyebrow label */}
        <span
          aria-hidden
          className="hidden shrink-0 items-center font-mono text-[10px] uppercase tracking-[0.28em] text-[#5A6068] md:flex"
        >
          ::search
        </span>

        {/* Search icon */}
        <span aria-hidden className="flex shrink-0 items-center text-[#5A6068]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
        </span>

        {/* The input */}
        <input
          ref={inputRef}
          type="search"
          inputMode="search"
          autoComplete="off"
          spellCheck={false}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onKeyDown={onKey}
          placeholder="Search 340+ pages — papers, lessons, products, cheat sheets, supermodels…"
          aria-label="Search atomeons.com"
          className="flex-1 bg-transparent py-3 font-sans text-[15px] text-[#F4F4F2] placeholder:text-[#5A6068] focus:outline-none"
        />

        {/* Keyboard hint */}
        <span className="hidden shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068] sm:flex">
          <kbd className="border border-[#1F242B] px-1.5 py-0.5">⌘K</kbd>
          <span className="text-[#1F242B]">·</span>
          <kbd className="border border-[#1F242B] px-1.5 py-0.5">/</kbd>
          <span>palette</span>
        </span>
      </div>

      {/* Dropdown results */}
      {showDropdown ? (
        <div
          role="listbox"
          aria-label="Search results"
          className="absolute inset-x-0 top-full max-h-[60vh] overflow-y-auto border-b border-[#1F242B] bg-[#0F1114] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]"
        >
          <ul role="list" className="mx-auto w-full max-w-[1600px] divide-y divide-[#1F242B] px-6 md:px-10 lg:px-14">
            {results.length === 0 ? (
              <li className="py-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#5A6068]">
                  No matches for &quot;{query}&quot;
                </p>
                <p
                  className="mt-2 font-serif text-[15px] italic leading-[1.5] text-[#9CA3AF]"
                  style={{ fontFamily: "Newsreader, Georgia, serif" }}
                >
                  Try a different word, or open the full palette with{" "}
                  <kbd className="mx-1 border border-[#1F242B] px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em]">⌘K</kbd>.
                </p>
              </li>
            ) : (
              results.map((r, i) => {
                const active = i === activeIdx;
                return (
                  <li key={r.r} role="option" aria-selected={active}>
                    <Link
                      href={r.r}
                      onMouseDown={(e) => {
                        // mousedown fires before blur so we can navigate
                        // before the click-outside listener kills the
                        // dropdown.
                        e.preventDefault();
                        go(r.r);
                      }}
                      className={`flex items-center justify-between gap-6 py-3 ${
                        active ? "bg-[#08090B]" : ""
                      } transition-colors hover:bg-[#08090B]`}
                    >
                      <div className="flex flex-col gap-1">
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
                          {r.c}
                          <span className="mx-2 text-[#1F242B]">·</span>
                          <span className="text-[#5A6068]">via {r.matchedField}</span>
                        </p>
                        <p className="font-serif text-[17px] leading-[1.3] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                          {r.t}
                        </p>
                      </div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF]">
                        {r.r}
                      </p>
                    </Link>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
