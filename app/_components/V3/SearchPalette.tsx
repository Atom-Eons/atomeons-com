"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

/**
 * SearchPalette — Cmd-K / Ctrl-K · "/" instant search.
 *
 * Design rules — operator brief 2026-06-04 "better than modern search
 * engines":
 *   - Sub-50ms response. No server roundtrip. Static index loaded on
 *     first open, cached in memory for the session.
 *   - Sublime-style subsequence fuzzy matching — "orgbx" → "orangebox".
 *   - Ranks by: exact title prefix > title substring > heading hit >
 *     body hit, weighted by route priority.
 *   - Keyboard-first: Cmd/Ctrl-K opens, "/" opens (unless typing),
 *     ESC closes, ↑↓ navigate, Enter follows, Tab closes-and-restores.
 *   - Visual: noir palette, the lab's signal cyan for active row,
 *     thin gold rule under the input — feels lab-grade, not Algolia.
 *
 * The index lives at /public/search-index.json. Generator script:
 *   .scripts/build-search-index.mjs (run pre-build).
 */

export type SearchRecord = {
  r: string; // route
  t: string; // title
  d: string; // description
  h: string[]; // headings
  b: string; // body sample
  k: string[]; // keywords
  c: string; // category
  w: number; // priority weight 0..1
};

export type SearchIndexFile = {
  v: number;
  built: string;
  count: number;
  records: SearchRecord[];
};

export type Scored = SearchRecord & { score: number; matchedField: string };

// Internal type-alias so the rest of this file keeps its existing names.
type Record = SearchRecord;
type IndexFile = SearchIndexFile;

/* ────────────────────────────────────────────────────────────────────
 * Sublime-style subsequence match — returns score 0..1 (0 = no match)
 * Higher score = matched closer to start + tighter span.
 * ──────────────────────────────────────────────────────────────────── */
function fuzzyScore(needle: string, hay: string): number {
  if (!needle) return 0;
  if (!hay) return 0;
  const n = needle.toLowerCase();
  const h = hay.toLowerCase();

  // Exact prefix wins big
  if (h.startsWith(n)) return 1 + (n.length / h.length);
  // Substring still good
  const sub = h.indexOf(n);
  if (sub !== -1) return 0.85 + (1 - sub / h.length) * 0.1 + n.length / h.length * 0.05;

  // Subsequence: walk through hay, match letters in order
  let ni = 0;
  let firstMatch = -1;
  let lastMatch = -1;
  let consec = 0;
  let bestConsec = 0;
  let prevMatched = false;
  for (let hi = 0; hi < h.length && ni < n.length; hi++) {
    if (h[hi] === n[ni]) {
      if (firstMatch === -1) firstMatch = hi;
      lastMatch = hi;
      if (prevMatched) consec++;
      else consec = 1;
      bestConsec = Math.max(bestConsec, consec);
      prevMatched = true;
      ni++;
    } else {
      prevMatched = false;
    }
  }
  if (ni < n.length) return 0;
  const span = lastMatch - firstMatch + 1;
  const tightness = n.length / span;
  const startBonus = 1 - firstMatch / h.length;
  return 0.35 * tightness + 0.25 * startBonus + 0.4 * (bestConsec / n.length);
}

export function rankRecord(query: string, r: Record): Scored | null {
  const titleScore = fuzzyScore(query, r.t);
  const catScore = fuzzyScore(query, r.c) * 0.6;
  const routeScore = fuzzyScore(query, r.r.replace(/^\//, "").replace(/-/g, " ")) * 0.9;
  let headingBest = 0;
  for (const h of r.h) headingBest = Math.max(headingBest, fuzzyScore(query, h));
  headingBest *= 0.7;
  let kwBest = 0;
  for (const k of r.k) kwBest = Math.max(kwBest, fuzzyScore(query, k));
  kwBest *= 0.65;
  const descScore = fuzzyScore(query, r.d) * 0.5;
  const bodyScore = fuzzyScore(query, r.b) * 0.35;

  const best = Math.max(titleScore, catScore, routeScore, headingBest, kwBest, descScore, bodyScore);
  if (best < 0.18) return null;

  let matchedField = "title";
  if (best === catScore) matchedField = "category";
  else if (best === routeScore) matchedField = "route";
  else if (best === headingBest) matchedField = "heading";
  else if (best === kwBest) matchedField = "tag";
  else if (best === descScore) matchedField = "description";
  else if (best === bodyScore) matchedField = "body";

  const final = best * (0.5 + 0.5 * r.w);
  return { ...r, score: final, matchedField };
}

/* ────────────────────────────────────────────────────────────────────
 * Component
 * ──────────────────────────────────────────────────────────────────── */
export function SearchPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const [index, setIndex] = useState<IndexFile | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  // Open on Cmd-K / Ctrl-K, or "/" (when not typing into another input)
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      const typing =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.getAttribute("contenteditable") === "true");

      const cmd = e.metaKey || e.ctrlKey;
      if (cmd && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (!typing && !cmd && e.key === "/" && !open) {
        e.preventDefault();
        setOpen(true);
        return;
      }
      if (open && e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Lazy-load index on first open
  useEffect(() => {
    if (!open || index || loading) return;
    setLoading(true);
    fetch("/search-index.json", { cache: "force-cache" })
      .then((r) => r.json())
      .then((data: IndexFile) => setIndex(data))
      .catch(() => setIndex({ v: 1, built: "", count: 0, records: [] }))
      .finally(() => setLoading(false));
  }, [open, index, loading]);

  // Focus input on open
  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 30);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  // Compute results
  const results = useMemo<Scored[]>(() => {
    if (!index) return [];
    const q = query.trim();
    if (!q) {
      // Empty query: surface high-priority routes
      return index.records.slice(0, 14).map((r) => ({
        ...r,
        score: r.w,
        matchedField: "default",
      }));
    }
    const scored: Scored[] = [];
    for (const r of index.records) {
      const s = rankRecord(q, r);
      if (s) scored.push(s);
    }
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 14);
  }, [query, index]);

  // Reset activeIdx when results change
  useEffect(() => {
    setActiveIdx(0);
  }, [query]);

  function go(route: string) {
    setOpen(false);
    setQuery("");
    router.push(route);
  }

  function onInputKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const r = results[activeIdx];
      if (r) go(r.r);
    } else if (e.key === "Tab") {
      e.preventDefault();
      setOpen(false);
    }
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-label="Search atomeons.com"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[max(80px,8vh)]"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
      style={{
        background: "rgba(8,9,11,0.78)",
        backdropFilter: "blur(8px) saturate(140%)",
        WebkitBackdropFilter: "blur(8px) saturate(140%)",
      }}
    >
      <div
        className="relative flex w-full max-w-[680px] flex-col overflow-hidden border border-[#1F242B] bg-[#0F1114] shadow-[0_50px_120px_-30px_rgba(0,0,0,0.8)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* INPUT */}
        <div className="relative flex items-center gap-3 border-b border-[#1F242B] px-5">
          <svg
            aria-hidden
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#5A6068"
            strokeWidth="2"
            className="flex-shrink-0"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKey}
            placeholder="Type to search the lab. orangebox · papers · cyber · supermodels · ↵ to open"
            className="h-14 w-full bg-transparent text-[15px] text-[#F4F4F2] placeholder:text-[#5A6068] focus:outline-none"
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            aria-label="Search query"
            aria-controls="search-results"
            aria-activedescendant={
              results[activeIdx] ? `result-${activeIdx}` : undefined
            }
          />
          <kbd className="hidden flex-shrink-0 border border-[#1F242B] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#9CA3AF] sm:inline-block">
            ESC
          </kbd>
        </div>
        {/* gold rule */}
        <div
          aria-hidden
          style={{
            height: 1,
            background:
              "linear-gradient(90deg, transparent 0%, #C9A55C 18%, #C9A55C 82%, transparent 100%)",
            opacity: 0.4,
          }}
        />

        {/* RESULTS */}
        <ul
          id="search-results"
          role="listbox"
          className="max-h-[60vh] overflow-y-auto"
        >
          {loading && !index ? (
            <li className="px-5 py-8 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-[#5A6068]">
              Loading index…
            </li>
          ) : results.length === 0 ? (
            <li className="px-5 py-8 text-center">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9CA3AF]">
                No results for &quot;{query}&quot;
              </p>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068]">
                Try: orangebox · cyber · papers · supermodels · I AM AI · monograph
              </p>
            </li>
          ) : (
            results.map((r, i) => {
              const active = i === activeIdx;
              return (
                <li key={r.r} id={`result-${i}`} role="option" aria-selected={active}>
                  <Link
                    href={r.r}
                    onClick={(e) => {
                      e.preventDefault();
                      go(r.r);
                    }}
                    onMouseEnter={() => setActiveIdx(i)}
                    className={`flex items-start gap-4 border-b border-[#1F242B] px-5 py-3 transition-colors ${
                      active ? "bg-[#22F0D5]/8" : "hover:bg-[#0B0C0F]"
                    }`}
                  >
                    <span
                      className="mt-1 flex-shrink-0 border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.22em]"
                      style={
                        active
                          ? {
                              borderColor: "#22F0D5",
                              color: "#22F0D5",
                              background: "rgba(34,240,213,0.08)",
                            }
                          : {
                              borderColor: "#1F242B",
                              color: "#9CA3AF",
                            }
                      }
                    >
                      {r.c}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p
                        className={`truncate text-[14px] leading-[1.3] ${
                          active ? "text-[#22F0D5]" : "text-[#F4F4F2]"
                        }`}
                      >
                        {r.t || r.r}
                      </p>
                      <p className="mt-0.5 truncate font-mono text-[10px] uppercase tracking-[0.16em] text-[#5A6068]">
                        atomeons.com{r.r}
                        {r.matchedField !== "title" &&
                        r.matchedField !== "default" ? (
                          <span className="ml-2 text-[#9CA3AF]">
                            · matched {r.matchedField}
                          </span>
                        ) : null}
                      </p>
                    </div>
                    <span
                      className={`ml-2 flex-shrink-0 self-center font-mono text-[16px] ${
                        active ? "text-[#22F0D5]" : "text-[#1F242B]"
                      }`}
                      aria-hidden
                    >
                      ↵
                    </span>
                  </Link>
                </li>
              );
            })
          )}
        </ul>

        {/* FOOTER */}
        <div className="flex items-center justify-between gap-4 border-t border-[#1F242B] px-5 py-2.5">
          <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068]">
            <span className="flex items-center gap-1.5">
              <kbd className="border border-[#1F242B] px-1.5 py-0.5 text-[#9CA3AF]">↑</kbd>
              <kbd className="border border-[#1F242B] px-1.5 py-0.5 text-[#9CA3AF]">↓</kbd>
              navigate
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="border border-[#1F242B] px-1.5 py-0.5 text-[#9CA3AF]">↵</kbd>
              open
            </span>
            <span className="hidden items-center gap-1.5 sm:flex">
              <kbd className="border border-[#1F242B] px-1.5 py-0.5 text-[#9CA3AF]">esc</kbd>
              close
            </span>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068]">
            {index ? `${index.count} pages indexed` : "loading…"}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────
 * SearchTrigger — the visible button in the Header that opens the
 * palette. Looks like a search bar; behaves like a Cmd-K.
 * ──────────────────────────────────────────────────────────────────── */
export function SearchTrigger({ compact = false }: { compact?: boolean }) {
  const [isMac, setIsMac] = useState(true);
  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad|iPod/.test(navigator.platform));
  }, []);

  function open() {
    // Dispatch a synthetic Cmd-K so the global listener picks it up,
    // without coupling this to the SearchPalette's React state directly.
    const evt = new KeyboardEvent("keydown", {
      key: "k",
      metaKey: true,
      ctrlKey: !isMac,
      bubbles: true,
    });
    window.dispatchEvent(evt);
  }

  if (compact) {
    return (
      <button
        type="button"
        onClick={open}
        aria-label="Open search"
        className="flex h-9 w-9 items-center justify-center border border-[#1F242B] text-[#9CA3AF] transition-colors hover:border-[#22F0D5] hover:text-[#22F0D5]"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={open}
      aria-label="Search the lab — Cmd-K or slash"
      className="group flex h-9 min-w-[200px] items-center justify-between gap-4 border border-[#1F242B] bg-[#08090B] px-3 text-left transition-colors hover:border-[#22F0D5]/40"
    >
      <span className="flex items-center gap-2.5">
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#5A6068"
          strokeWidth="2"
          className="flex-shrink-0 transition-colors group-hover:stroke-[#22F0D5]"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#9CA3AF] transition-colors group-hover:text-[#F4F4F2]">
          Search the lab
        </span>
      </span>
      <kbd className="hidden flex-shrink-0 border border-[#1F242B] px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-[#5A6068] transition-colors group-hover:border-[#22F0D5]/40 group-hover:text-[#9CA3AF] sm:inline-block">
        {isMac ? "⌘K" : "Ctrl-K"}
      </kbd>
    </button>
  );
}
