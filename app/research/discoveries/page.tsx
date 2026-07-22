import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { DISCOVERIES } from "../../_data/discoveries";
import styles from "../../editorial.module.css";

export const metadata: Metadata = {
  title: "Discoveries · Experimental Research",
  description: "Working inventions and frontier systems from AtomEons: AEyes, AtomSmasher, AEMemory, and what comes next.",
  alternates: { canonical: "https://atomeons.com/research/discoveries" },
};

export default function DiscoveriesPage() {
  return (
    <main className={styles.page} style={{ "--accent": "#2558dc" } as CSSProperties}>
      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <div>
            <p className={styles.eyebrow}>RESEARCH / DISCOVERIES</p>
            <h1>New things.<br /><span>Measured.</span></h1>
            <p className={styles.lede}>
              Not “skills.” Discoveries: systems, methods, and working hypotheses
              found while building at the edge of AI.
            </p>
          </div>
          <aside className={styles.heroAside}>
            <strong>Independent does not mean imaginary.</strong>
            <p>
              Every discovery names what exists, what has been measured, what failed,
              and what still has to be proven. Ambition and honesty belong on the same page.
            </p>
          </aside>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.list}>
          {DISCOVERIES.map((discovery, index) => (
            <Link
              href={`/research/discoveries/${discovery.slug}`}
              className={styles.listItem}
              key={discovery.slug}
              style={{ "--accent": discovery.accent } as CSSProperties}
            >
              <span className={styles.index}>0{index + 1}</span>
              <h3>{discovery.displayName}</h3>
              <p>{discovery.proposition}</p>
              <span>↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.footerCta}>
        <p className={styles.eyebrow}>THE COLLECTION EXPANDS WITH THE WORK</p>
        <h2>Find it. Test it. Name it.</h2>
        <div className={styles.actions}>
          <Link href="/research/papers" className={styles.button}>Read the papers ↗</Link>
        </div>
      </section>
    </main>
  );
}
