import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { PAPERS } from "../../_data/research-papers";
import styles from "../../editorial.module.css";

export const metadata: Metadata = {
  title: "Papers · AtomEons Experimental Research",
  description:
    `${PAPERS.length} independent experimental research papers with plain-language summaries and direct PDF downloads.`,
  alternates: { canonical: "https://atomeons.com/research/papers" },
};

export default function ResearchPapersPage() {
  return (
    <main className={styles.page} style={{ "--accent": "#2558dc" } as CSSProperties}>
      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <div>
            <p className={styles.eyebrow}>EXPERIMENTAL RESEARCH / OPEN PAPER LIBRARY</p>
            <h1>{PAPERS.length} ideas.<br /><span>No gatekeeper.</span></h1>
            <p className={styles.lede}>
              Biology, cognition, topology, machine language, and theories that cross
              lines academic departments usually keep separate.
            </p>
          </div>
          <aside className={styles.heroAside}>
            <strong>Read the idea. Judge the evidence.</strong>
            <p>
              These are independent working papers, not a claim to academic rank.
              Some are rigorous frameworks; some are speculative propositions.
              Each page tells you what the paper argues and gives you the source PDF.
            </p>
            <p className={styles.status}>OPEN ACCESS · LOCALLY HOSTED · CC-BY 4.0 WHERE NOTED</p>
          </aside>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.list}>
          {PAPERS.map((paper, index) => (
            <Link href={`/research/papers/${paper.slug}`} className={styles.listItem} key={paper.slug}>
              <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
              <h3>{paper.title}</h3>
              <p>{paper.kid_summary}</p>
              <span>↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.footerCta}>
        <p className={styles.eyebrow}>NO SIGN-IN · NO RESEARCH PLATFORM REQUIRED</p>
        <h2>The papers live here.</h2>
        <div className={styles.actions}>
          <Link href="/research" className={styles.button}>Research home</Link>
          <Link href="/research/discoveries" className={`${styles.button} ${styles.buttonGhost}`}>Working discoveries ↗</Link>
        </div>
      </section>
    </main>
  );
}
