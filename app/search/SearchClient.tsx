"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { DISCOVERIES } from "../_data/discoveries";
import { PAPERS } from "../_data/research-papers";
import { SITE_INDEX } from "../_data/site-index";
import styles from "./search.module.css";

type SearchEntry = {
  title: string;
  href: string;
  description: string;
  category: string;
  keywords: string[];
  kind: "route" | "paper" | "discovery";
};

const searchEntries: SearchEntry[] = [
  ...SITE_INDEX.map((entry) => ({ ...entry, kind: "route" as const })),
  ...DISCOVERIES.map((discovery) => ({
    title: discovery.displayName,
    href: `/research/discoveries/${discovery.slug}`,
    description: discovery.oneLine,
    category: "Discoveries",
    keywords: [
      discovery.name,
      discovery.category,
      discovery.status,
      discovery.proposition,
      ...discovery.principles.flatMap((principle) => [principle.label, principle.value]),
    ],
    kind: "discovery" as const,
  })),
  ...PAPERS.map((paper) => ({
    title: paper.title,
    href: `/research/papers/${paper.slug}`,
    description: paper.kid_summary,
    category: "Papers",
    keywords: [paper.authors, paper.status, paper.date, ...paper.keywords],
    kind: "paper" as const,
  })),
];

const categories = ["All", "Products", "Show", "Research", "Papers", "Discoveries", "Creations", "Company", "Machine"] as const;
const queryChips = ["CableBox", "I AM AI", "radiance", "memory", "compression", "AI Code Show"] as const;

function scoreEntry(entry: SearchEntry, terms: string[]) {
  if (!terms.length) {
    if (entry.category === "Products") return 120;
    if (entry.title === "Atom Alive") return 110;
    if (entry.category === "Research") return 100;
    return 40;
  }

  const title = entry.title.toLowerCase();
  const description = entry.description.toLowerCase();
  const category = entry.category.toLowerCase();
  const keywords = entry.keywords.join(" ").toLowerCase();

  return terms.reduce((score, term) => {
    if (title === term) return score + 160;
    if (title.includes(term)) score += 80;
    if (category.includes(term)) score += 42;
    if (keywords.includes(term)) score += 34;
    if (description.includes(term)) score += 24;
    return score;
  }, 0);
}

export function SearchClient() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("All");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get("q") ?? "");
  }, []);

  const results = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);

    return searchEntries
      .map((entry) => ({ entry, score: scoreEntry(entry, terms) }))
      .filter(({ entry, score }) => {
        const categoryMatch = category === "All" || entry.category === category;
        return categoryMatch && score > 0;
      })
      .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title))
      .map(({ entry }) => entry);
  }, [category, query]);

  return (
    <div>
      <div className={styles.searchBox}>
        <label htmlFor="site-search">Search products, papers, discoveries, creations, and proof.</label>
        <input
          id="site-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try CableBox, memory, books, radiance..."
          type="search"
          autoFocus
        />
        <span>{results.length} result{results.length === 1 ? "" : "s"}</span>
      </div>
      <div className={styles.discoveryPanel} aria-label="Search assists">
        <div>
          <span>FILTER</span>
          <div className={styles.filterRow}>
            {categories.map((item) => (
              <button
                type="button"
                key={item}
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div>
          <span>TRY</span>
          <div className={styles.chipRow}>
            {queryChips.map((chip) => (
              <button type="button" key={chip} onClick={() => setQuery(chip)}>
                {chip}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.results} aria-live="polite">
        {results.map((entry, index) => (
          <Link href={entry.href} key={entry.href}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <small>{entry.category} / {entry.kind}</small>
              <h2>{entry.title}</h2>
              <p>{entry.description}</p>
            </div>
            <b aria-hidden>&rarr;</b>
          </Link>
        ))}
        {!results.length ? (
          <p className={styles.empty}>
            Nothing matched that phrase. Try a product name, a research topic, or
            a broad word such as books, art, or machine.
          </p>
        ) : null}
      </div>
    </div>
  );
}
