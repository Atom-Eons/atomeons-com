"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { SITE_INDEX } from "../_data/site-index";
import styles from "./search.module.css";

export function SearchClient() {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get("q") ?? "");
  }, []);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return SITE_INDEX;
    return SITE_INDEX.filter((entry) =>
      [entry.title, entry.description, entry.category, ...entry.keywords]
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    );
  }, [query]);

  return (
    <div>
      <div className={styles.searchBox}>
        <label htmlFor="site-search">Search products, papers, creations, and proof.</label>
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
      <div className={styles.results} aria-live="polite">
        {results.map((entry, index) => (
          <Link href={entry.href} key={entry.href}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <small>{entry.category}</small>
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
