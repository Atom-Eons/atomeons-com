"use client";

/**
 * NotFoundSuggestions · Wave 121 · 2026-06-18
 *
 * Typo-tolerant URL suggestions on /404. Reads the current pathname,
 * splits it into fragments, runs each fragment against the lab's
 * search index using the same fuzzy-score algorithm that powers
 * SearchPalette, and surfaces the top 3 routes that most likely
 * match what the visitor was looking for.
 *
 * Examples:
 *   /learn/curriculm    → /learn (typo on curriculum)
 *   /constelaton        → /constellation
 *   /orangbox           → /orangebox
 *   /reaserch/papers    → /research/papers
 *   /press-kit          → /press
 *
 * Renders nothing if:
 *   - search index hasn't loaded
 *   - no path fragments (root 404)
 *   - no candidates score above the fuzzy-match floor (0.35)
 *
 * a11y: aria-label on the section, h3 for the heading,
 * semantic <ul>/<li> for the list.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { rankRecord, type SearchIndexFile, type Scored } from "./SearchPalette";

export function NotFoundSuggestions() {
  const [candidates, setCandidates] = useState<Scored[]>([]);
  const [originalPath, setOriginalPath] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const path = window.location.pathname;
    setOriginalPath(path);

    // Extract meaningful fragments from the bad URL. Each fragment is
    // a search query candidate (the visitor may have typoed any one).
    const fragments = path
      .split("/")
      .filter(Boolean)
      .filter((f) => f.length >= 2);

    if (fragments.length === 0) return;

    (async () => {
      try {
        const response = await fetch("/search-index.json", { cache: "force-cache" });
        if (!response.ok) return;
        const index = (await response.json()) as SearchIndexFile;

        // Combine fragment scores: a record is more likely the target
        // if it matches MULTIPLE fragments well. Sum the per-fragment
        // scores and de-dupe by route.
        const scoreByRoute = new Map<string, { rec: Scored; total: number }>();
        for (const frag of fragments) {
          for (const rec of index.records) {
            const s = rankRecord(frag, rec);
            if (!s) continue;
            const existing = scoreByRoute.get(rec.r);
            if (existing) {
              existing.total += s.score;
            } else {
              scoreByRoute.set(rec.r, { rec: s, total: s.score });
            }
          }
        }

        const ranked = Array.from(scoreByRoute.values())
          .sort((a, b) => b.total - a.total)
          .slice(0, 3)
          .map((x) => x.rec);

        setCandidates(ranked);
      } catch {
        // Network failure — silent. The static 6-destination grid below
        // still helps the user.
      }
    })();
  }, []);

  if (candidates.length === 0) return null;

  return (
    <section
      aria-label="Did you mean — typo-tolerant suggestions"
      className="border-b border-[#1F242B] bg-[#0A0B0E]"
    >
      <div className="mx-auto w-full max-w-4xl px-6 py-12 md:px-10 md:py-16">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#7a818a]">
          <span className="text-[#22F0D5]">::did you mean?</span>
          <span className="mx-3 text-[#1F242B]">·</span>
          <span>matched against the lab&apos;s 317-route index from</span>{" "}
          <span className="text-[#B5BBC0]">{originalPath || "the URL"}</span>
        </p>
        <ul role="list" className="mt-7 grid grid-cols-1 gap-px border border-[#1F242B] bg-[#1F242B]">
          {candidates.map((c, i) => (
            <li key={c.r} className="bg-[#0F1114]">
              <Link
                href={c.r}
                className="group flex flex-col gap-1 p-5 transition-colors hover:bg-[#08090B] md:flex-row md:items-center md:gap-6 md:p-6"
              >
                <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5] md:w-10">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <div className="min-w-0 flex-1">
                  <p
                    className="text-[18px] leading-[1.3] text-[#F4F4F2] transition-colors group-hover:text-[#22F0D5] md:text-[20px]"
                  >
                    {c.t.length > 80 ? c.t.slice(0, 78) + "…" : c.t}
                  </p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[#8E969D]">
                    atomeons.com{c.r}
                  </p>
                </div>
                <span aria-hidden className="shrink-0 font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a] group-hover:text-[#22F0D5]">
                  go →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
