"use client";

import { useEffect, useState, useDeferredValue } from "react";

/**
 * SearchFilter — client-side directory filter.
 *
 * Upgrades /search from a static directory (which only filtered via
 * URL query param on form submit) into a live-typing filter that runs
 * locally with no network round-trip.
 *
 * How it works:
 *   - Reads the directory items embedded in the page (data-search-item
 *     attribute) and their searchable text (data-search-text).
 *   - On every keystroke, hides items whose text doesn't include the
 *     query (case-insensitive). Shows count above the grid.
 *   - Pressing Enter still works for the URL-driven flow (?q=…) for
 *     deep-linking and back-button preservation.
 *   - Empty query restores the full directory.
 *
 * No backend. No tracking. Pure client.
 */
export function SearchFilter({
  initialQuery,
  totalCount,
}: {
  initialQuery?: string;
  totalCount: number;
}) {
  const [raw, setRaw] = useState(initialQuery ?? "");
  const query = useDeferredValue(raw.toLowerCase().trim());
  const [visibleCount, setVisibleCount] = useState(totalCount);

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>(
      "[data-search-item]",
    );
    if (!query) {
      items.forEach((el) => {
        el.style.removeProperty("display");
      });
      setVisibleCount(items.length);
      return;
    }
    let shown = 0;
    items.forEach((el) => {
      const text = (el.dataset.searchText ?? "").toLowerCase();
      const match = text.includes(query);
      el.style.display = match ? "" : "none";
      if (match) shown++;
    });
    setVisibleCount(shown);

    // Also hide empty group sections (where all items are hidden)
    const groups = document.querySelectorAll<HTMLElement>(
      "[data-search-group]",
    );
    groups.forEach((g) => {
      const visibleItems = g.querySelectorAll<HTMLElement>(
        "[data-search-item]",
      );
      const hasVisible = Array.from(visibleItems).some(
        (el) => el.style.display !== "none",
      );
      g.style.display = hasVisible ? "" : "none";
    });
  }, [query]);

  return (
    <div className="relative">
      <label className="block">
        <span className="sr-only">Filter the directory</span>
        <input
          type="search"
          name="q"
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          autoComplete="off"
          spellCheck="false"
          placeholder="filter live · type any term, name, route…"
          className="w-full rounded-full border border-[#1A2225] bg-[#0A0F11] px-6 py-3.5 pr-32 text-base text-[#F2F4F5] outline-none transition-all placeholder:text-[#6B7779] focus:border-[#22F0D5] focus:shadow-[0_0_30px_rgba(34,240,213,0.20)]"
          aria-label="Filter directory"
        />
      </label>
      <div
        className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#9BA5A7]"
        aria-live="polite"
      >
        {raw ? `${visibleCount} / ${totalCount}` : `${totalCount} surfaces`}
      </div>
    </div>
  );
}
