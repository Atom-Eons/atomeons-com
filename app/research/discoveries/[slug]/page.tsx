import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DISCOVERIES, getDiscovery } from "../../../_data/discoveries";
import styles from "../../../editorial.module.css";

export function generateStaticParams() {
  return DISCOVERIES.map((discovery) => ({ slug: discovery.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const discovery = getDiscovery(slug);
  if (!discovery) return { title: "Discovery not found" };
  return {
    title: `${discovery.displayName} · AtomEons Research`,
    description: discovery.proposition,
    alternates: { canonical: `https://atomeons.com/research/discoveries/${discovery.slug}` },
  };
}

export default async function DiscoveryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const discovery = getDiscovery(slug);
  if (!discovery) notFound();

  return (
    <main className={styles.page} style={{ "--accent": discovery.accent } as CSSProperties}>
      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <div>
            <p className={styles.eyebrow}>{discovery.category} · {discovery.status}</p>
            <h1>{discovery.name}<br /><span>{discovery.slug === "aeyes" ? "Photonic eyes." : discovery.slug === "atomsmasher" ? "Less. Better." : "Keep the truth."}</span></h1>
            <p className={styles.lede}>{discovery.oneLine}</p>
          </div>
          <aside className={styles.heroAside}>
            <strong>{discovery.proposition}</strong>
            <p>{discovery.description}</p>
          </aside>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.index}>SYSTEM / 01</p>
          <div><h2>What it is.</h2></div>
        </div>
        <div className={styles.factGrid}>
          {discovery.principles.map((principle) => (
            <div className={styles.fact} key={principle.label}>
              <span className={styles.index}>{principle.label}</span>
              <strong>{principle.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.twoCol}>
          <div>
            <p className={styles.eyebrow}>WHAT EXISTS</p>
            <h2>Evidence.</h2>
            <ul className={styles.bullets}>
              {discovery.evidence.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div>
            <p className={styles.eyebrow}>WHAT REMAINS</p>
            <h2>Limits.</h2>
            <ul className={styles.bullets}>
              {discovery.limits.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.footerCta}>
        <p className={styles.eyebrow}>INDEPENDENT FRONTIER RESEARCH · NAPLES, FLORIDA</p>
        <h2>The work can be strange. The claims stay precise.</h2>
        <div className={styles.actions}>
          <Link href="/research/discoveries" className={styles.button}>All discoveries</Link>
          <Link href="/research/papers" className={`${styles.button} ${styles.buttonGhost}`}>Research papers ↗</Link>
        </div>
      </section>
    </main>
  );
}
