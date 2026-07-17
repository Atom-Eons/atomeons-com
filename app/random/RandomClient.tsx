"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE_INDEX } from "../_data/site-index";
import styles from "./random.module.css";

const RANDOM_POOL = SITE_INDEX.filter(
  (entry) =>
    !["/", "/random", "/search", "/legal/terms", "/legal/privacy"].includes(entry.href),
);

export function RandomClient() {
  const [entryIndex, setEntryIndex] = useState(7);
  const entry = RANDOM_POOL[entryIndex % RANDOM_POOL.length];

  return (
    <div className={styles.machine}>
      <p>{entry.category} / RANDOM SIGNAL</p>
      <h2>{entry.title}</h2>
      <span>{entry.description}</span>
      <div>
        <Link href={entry.href}>Enter this door &rarr;</Link>
        <button
          onClick={() => {
            const next = Math.floor(Math.random() * RANDOM_POOL.length);
            setEntryIndex(next === entryIndex ? (next + 1) % RANDOM_POOL.length : next);
          }}
        >
          Spin again
        </button>
      </div>
    </div>
  );
}
