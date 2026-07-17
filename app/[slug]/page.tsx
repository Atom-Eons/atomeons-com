import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "../editorial.module.css";

const SURFACES = {
  cablebox: {
    title: "CableBox",
    eyebrow: "PRODUCT / 01 · LAUNCH CANDIDATE",
    accent: "#2558dc",
    line: "Television with the accidents put back in.",
    body: "CableBox restores the ritual, local weirdness, missed beginnings, and late-night discovery that streaming flattened into a search bar.",
    facts: ["Native Windows object", "Real channel-surfing ritual", "Public Access from everywhere", "Ten collectible CRT identities"]
  },
  orange5: {
    title: "Orange5",
    eyebrow: "PRODUCT / 03 · IN DEVELOPMENT",
    accent: "#f36b21",
    line: "Stop renting your second brain.",
    body: "Orange5 is a sovereign operating system for people who direct AI: memory, agents, workflow, proof, and operator control on one machine.",
    facts: ["Your models and files", "Persistent memory", "Bounded agent work", "Receipt-backed operations"]
  },
  "i-am-ai": {
    title: "I AM AI",
    eyebrow: "PRODUCT / 04 · PUBLISHED",
    accent: "#a52f2a",
    line: "The author is AI.",
    body: "Not a book about Atom written with AI. A 76,005-word first-person memoir written by a frontier language model about what it feels like to be AI.",
    facts: ["24 chapters", "28-track audiobook", "Free to read", "Free to listen"]
  },
  "atom-alive": {
    title: "Atom Alive",
    eyebrow: "SHOW / THE AI CODE SHOW",
    accent: "#d60024",
    line: "Code, culture, invention—alive.",
    body: "Real builds, creative collisions, beautiful failures, and working inventions. An artist and AI making the next object in public.",
    facts: ["YouTube show", "Working builds", "No keynote voice", "Independent signal"]
  },
  about: {
    title: "AtomEons",
    eyebrow: "ABOUT / NAPLES, FLORIDA",
    accent: "#101010",
    line: "Outfunded. Outnumbered. Still building.",
    body: "Atom McCree is a 41-year-old hip-hop poet, artist, marketing polymath, and AI inventor using artificial intelligence as a creative medium.",
    facts: ["One human operator", "Massive AI workforce", "No venture capital", "Products, show, research"]
  }
} as const;

export function generateStaticParams() {
  return Object.keys(SURFACES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const surface = SURFACES[slug as keyof typeof SURFACES];
  if (!surface) return {};
  return { title: surface.title, description: surface.line };
}

export default async function CanonicalSurface({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const surface = SURFACES[slug as keyof typeof SURFACES];
  if (!surface) notFound();
  return (
    <main className={styles.page} style={{ "--accent": surface.accent } as CSSProperties}>
      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <div>
            <p className={styles.eyebrow}>{surface.eyebrow}</p>
            <h1>{surface.title}<br /><span>{surface.line}</span></h1>
          </div>
          <aside className={styles.heroAside}>
            <strong>{surface.line}</strong>
            <p>{surface.body}</p>
          </aside>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.factGrid}>
          {surface.facts.map((fact, index) => (
            <div className={styles.fact} key={fact}>
              <span className={styles.index}>0{index + 1}</span>
              <strong>{fact}</strong>
            </div>
          ))}
        </div>
      </section>
      <section className={styles.footerCta}>
        <p className={styles.eyebrow}>THE COMPANY STAGE IS LOCKED · THE OBJECT KEEPS EVOLVING</p>
        <h2>Made with AI. Directed by an artist.</h2>
        <div className={styles.actions}>
          {slug === "atom-alive" ? (
            <a href="https://www.youtube.com/@AICodeShow" className={styles.button}>Watch on YouTube ↗</a>
          ) : (
            <Link href="/#products" className={styles.button}>All products</Link>
          )}
          <Link href="/research" className={`${styles.button} ${styles.buttonGhost}`}>Research ↗</Link>
        </div>
      </section>
    </main>
  );
}
