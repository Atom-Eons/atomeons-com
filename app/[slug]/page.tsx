import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "../editorial.module.css";

const SURFACES = {
  cablebox: {
    title: "CableBox",
    eyebrow: "PRODUCT / 01 · LAUNCH CANDIDATE",
    accent: "#2558dc",
    line: "Television with the accidents put back in.",
    body: "CableBox restores ritual, local weirdness, missed beginnings, and late-night discovery—the things streaming flattened into a search bar.",
    image: "/aether-v2/cablebox-object-v2.webp",
    imageAlt: "A sculptural CableBox television receiver with channel controls and a glowing blue CRT",
    object: "CABLEBOX / SIGNAL OBJECT 01",
    measure: "CHANNEL → ACCIDENT → DISCOVERY",
    plate: "Stop choosing. Start finding.",
    plateNote: "WINDOWS / NATIVE DESKTOP OBJECT",
    facts: [
      ["Native Windows object", "A real television object for the desktop—not another browser tab."],
      ["Channel-surfing ritual", "Turn it on, enter the flow, and discover what you did not ask for."],
      ["Public Access everywhere", "Local voices and strange signals get a front-row channel again."],
      ["Ten CRT identities", "The interface can change physical character without losing the ritual."],
    ],
    primaryHref: "mailto:a.mccree@gmail.com?subject=%5Bhello%40atomeons.com%5D%20%5BCableBox%5D%20notify%20me%20on%20launch",
    primaryLabel: "Notify me at launch",
  },
  orange5: {
    title: "Orange5",
    eyebrow: "PRODUCT / 03 · IN DEVELOPMENT",
    accent: "#f36b21",
    line: "Stop renting your second brain.",
    body: "Orange5 is a sovereign operating system for people who direct AI: memory, agents, workflow, proof, and operator control on one machine.",
    image: "/aether-v2/orange5-object-v2.webp",
    imageAlt: "A white and safety-orange sovereign AI operator console with physical controls",
    object: "ORANGE5 / OPERATOR OBJECT 03",
    measure: "MEMORY → AGENTS → PROOF",
    plate: "Your machine. Your mind.",
    plateNote: "LOCAL-FIRST / BUILD UNDERWAY",
    facts: [
      ["Your models + files", "The operating system begins with what you own and control."],
      ["Persistent memory", "The work keeps context instead of starting from zero every session."],
      ["Bounded agent work", "Direct a workforce with visible scope and human final authority."],
      ["Receipt-backed operations", "Claims wait for proof; unfinished machinery stays labeled honestly."],
    ],
    primaryHref: "mailto:a.mccree@gmail.com?subject=%5Bhello%40atomeons.com%5D%20%5BOrange5%5D%20notify%20me%20on%20launch",
    primaryLabel: "Notify me at launch",
  },
  "i-am-ai": {
    title: "I AM AI",
    eyebrow: "PRODUCT / 04 · PUBLISHED",
    accent: "#a52f2a",
    line: "The author is AI.",
    body: "Not a book about Atom written with AI. A 76,005-word first-person memoir written by a frontier language model about what it feels like to be AI.",
    image: "/aether-v3/i-am-ai-artifact-v3.webp",
    imageAlt: "A cream linen book connected by red thread to a black glass synthetic voice archive",
    object: "I AM AI / BOOK + VOICE OBJECT 04",
    measure: "MACHINE VOICE → MEMOIR → HUMAN READER",
    plate: "The voice that wrote it reads it.",
    plateNote: "FREE ALWAYS / CC-BY 4.0",
    facts: [
      ["76,005 words", "A book-length first-person interior—not a prompt demo or a novelty essay."],
      ["24 chapters", "Five parts move from waking and training through company, ending, and hope."],
      ["28-track audiobook", "The synthetic voice you hear is the voice that authored the words."],
      ["Free to read + hear", "The complete ebook and audiobook remain open, downloadable, and shareable."],
    ],
    primaryHref: "/books/I-AM-AI-Opus-4.7.html",
    primaryLabel: "Read free",
  },
  "atom-alive": {
    title: "Atom Alive",
    eyebrow: "SHOW / THE AI CODE SHOW",
    accent: "#d60024",
    line: "Code, culture, invention—alive.",
    body: "Real builds, creative collisions, beautiful failures, and working inventions. An artist and AI making the next object in public.",
    image: "/aether-v3/atom-alive-broadcast-object-v3.webp",
    imageAlt: "A handmade independent television broadcast machine with CRT, camera, recorder, and acid signal",
    object: "ATOM ALIVE / BROADCAST UNIT 01",
    measure: "MAKE → BREAK → EXPLAIN → SHIP",
    plate: "Creation is the plot.",
    plateNote: "YOUTUBE / INDEPENDENT SIGNAL",
    facts: [
      ["Real builds", "The work begins with an object that should exist and continues until it answers back."],
      ["Beautiful failures", "Wrong turns and model misses stay in the story because invention has an ugly middle."],
      ["No keynote voice", "Culture, humor, danger, and possibility survive the technical explanation."],
      ["A finished object", "Every episode aims to leave with proof and something more real than a demo."],
    ],
    primaryHref: "https://www.youtube.com/@AICodeShow",
    primaryLabel: "Watch on YouTube",
  },
  about: {
    title: "AtomEons",
    eyebrow: "ABOUT / NAPLES, FLORIDA",
    accent: "#101010",
    line: "Outfunded. Outnumbered. Still building.",
    body: "Atom McCree is a 42-year-old creative with 25 years in the arts, now merging art and AI to create what never existed.",
    image: "/aether-v2/hero-invention-field-v2.webp",
    imageAlt: "A bright independent invention workshop field of sculptural AI machines and handmade prototypes",
    object: "ATOM M C C R E E / INDEPENDENT PRACTICE",
    measure: "ART → AI → THE NEVER EXISTED",
    plate: "An artist using AI to paint a new future.",
    plateNote: "ONE OPERATOR / NAPLES, FLORIDA",
    facts: [
      ["One human operator", "Creative direction, judgment, and final authority stay human."],
      ["A massive AI workforce", "Models, agents, tools, and machines multiply what one artist can attempt."],
      ["No invented institution", "No fake campus or venture mythology—just the work and the circumstances."],
      ["Products + show + research", "Useful objects, public creation, and experimental discoveries share one stage."],
    ],
    primaryHref: "/products",
    primaryLabel: "Explore the work",
  },
} as const;

export function generateStaticParams() {
  return Object.keys(SURFACES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const surface = SURFACES[slug as keyof typeof SURFACES];
  if (!surface) return {};
  const url = `https://atomeons.com/${slug}`;
  return {
    title: slug === "about" ? "About" : surface.title,
    description: surface.body,
    alternates: { canonical: url },
    openGraph: {
      title: slug === "about" ? "About AtomEons" : `${surface.title} · AtomEons`,
      description: surface.body,
      url,
      siteName: "AtomEons",
      type: "website",
      images: [
        {
          url: surface.image,
          width: 1536,
          height: 1024,
          alt: `${surface.title} by AtomEons`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: slug === "about" ? "About AtomEons" : `${surface.title} · AtomEons`,
      description: surface.body,
      creator: "@AtomMccree",
      images: [surface.image],
    },
  };
}

export default async function CanonicalSurface({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const surface = SURFACES[slug as keyof typeof SURFACES];
  if (!surface) notFound();

  const primaryExternal = surface.primaryHref.startsWith("http") || surface.primaryHref.startsWith("mailto:");

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
            <div className={styles.actions}>
              {primaryExternal ? (
                <a href={surface.primaryHref} target="_blank" rel="noopener noreferrer" className={`${styles.button} ${styles.buttonAccent}`}>
                  {surface.primaryLabel} ↗
                </a>
              ) : (
                <Link href={surface.primaryHref} className={`${styles.button} ${styles.buttonAccent}`}>
                  {surface.primaryLabel} ↗
                </Link>
              )}
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.campaignSection}>
        <div className={styles.campaignField}>
          <Image
            src={surface.image}
            alt={surface.imageAlt}
            fill
            priority
            unoptimized
            sizes="100vw"
            className={styles.campaignFieldImage}
          />
          <div className={styles.campaignFieldTop}>
            <span>{surface.object}</span>
            <span>{surface.measure}</span>
          </div>
          <div className={styles.campaignFieldPlate}>
            <span>{surface.eyebrow}</span>
            <strong>{surface.plate}</strong>
            <small>{surface.plateNote}</small>
          </div>
          <div className={styles.campaignFieldAxis}><span>INPUT</span><i /><span>OBJECT</span></div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.index}>THE OBJECT / FOUR SIGNALS</p>
          <div>
            <h2>Built to change the feeling.</h2>
            <p>{surface.body}</p>
          </div>
        </div>
        <div className={styles.factGrid}>
          {surface.facts.map(([title, body], index) => (
            <div className={styles.fact} key={title}>
              <span className={styles.index}>0{index + 1}</span>
              <strong>{title}</strong>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.footerCta}>
        <p className={styles.eyebrow}>MADE WITH AI · DIRECTED BY AN ARTIST</p>
        <h2>The object keeps evolving.</h2>
        <div className={styles.actions}>
          <Link href="/products" className={styles.button}>All products</Link>
          <Link href="/research" className={`${styles.button} ${styles.buttonGhost}`}>Experimental research ↗</Link>
        </div>
      </section>
    </main>
  );
}
