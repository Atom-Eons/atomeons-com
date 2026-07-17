import type { Metadata } from "next";
import Link from "next/link";
import styles from "./atom-alive.module.css";

export const metadata: Metadata = {
  title: "Atom Alive · The AI Code Show",
  description:
    "Atom Alive is the AI Code Show from inside the AtomEons creation lab: real builds, creative collisions, beautiful failures, and working inventions.",
  alternates: { canonical: "https://atomeons.com/atom-alive" },
  openGraph: {
    title: "Atom Alive · The AI Code Show",
    description: "An outsider broadcast from inside a one-human, many-minds creation lab.",
    url: "https://atomeons.com/atom-alive",
    type: "website",
  },
};

const format = [
  ["01", "MAKE", "Start with an idea that should exist and build until the screen answers back."],
  ["02", "BREAK", "Show the wrong turns, model failures, ugly middles, and strange discoveries."],
  ["03", "EXPLAIN", "Translate the machinery without sanding off the culture, danger, or possibility."],
  ["04", "SHIP", "Leave with a real object, a real receipt, and a clearer view of what one creator can do now."],
] as const;

export default function AtomAlivePage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.utility}>
          <span>ATOM ALIVE / BROADCAST UNIT 01</span>
          <span>NAPLES · FL</span>
          <span className={styles.signal}><i /> SIGNAL ACTIVE</span>
        </div>

        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>THE AI CODE SHOW</p>
            <h1><span>Atom</span> Alive.</h1>
            <p className={styles.lede}>
              A show about what happens when an artist gets a massive AI workforce and decides the future needs better creative direction.
            </p>
            <div className={styles.actions}>
              <a href="https://www.youtube.com/@AICodeShow" target="_blank" rel="noopener noreferrer" className={styles.watchButton}>
                Watch on YouTube <span aria-hidden>↗</span>
              </a>
              <a href="#format" className={styles.textLink}>How the show works <span aria-hidden>↓</span></a>
            </div>
          </div>

          <div className={styles.broadcastRig} aria-hidden>
            <div className={styles.rigLabel}><b>AE-TV</b><span>MODEL / AA-01</span><i>● REC</i></div>
            <div className={styles.screen}>
              <span className={styles.screenCode}>AI / CODE / CULTURE</span>
              <strong>WE ARE<br />LIVE.</strong>
              <div className={styles.crosshair}>+</div>
              <div className={styles.scan} />
            </div>
            <div className={styles.controls}>
              <span>CH 01</span><b>MAKE</b><b>BREAK</b><b>SHIP</b><i /><em>POWER</em>
            </div>
          </div>
        </div>

        <div className={styles.ticker}>
          <span>ONE CREATOR</span><span>MANY MINDS</span><span>NO KEYNOTE VOICE</span><span>REAL SCREENS</span><span>REAL BUILDS</span><span>NO PERMISSION REQUIRED</span>
        </div>
      </section>

      <section className={styles.outsider}>
        <p className={styles.sectionLabel}>OUTSIDER BROADCAST / FIELD NOTE 001</p>
        <div>
          <h2>We were not invited into the future. So we started making our own.</h2>
          <p>
            Atom Alive is the view from outside the institution: independent, rogue, culturally awake, and relentless.
            Small forces can overwhelm giant systems when they move with purpose. We are hammering our way into AI,
            learning every mechanism, and turning the machinery toward creators who were never supposed to control it.
          </p>
        </div>
      </section>

      <section id="format" className={styles.formatSection}>
        <header>
          <p className={styles.sectionLabel}>SHOW FORMAT / NOT A TUTORIAL CHANNEL</p>
          <h2>Creation is the plot.</h2>
        </header>
        <div className={styles.formatGrid}>
          {format.map(([index, title, body]) => (
            <article key={title}>
              <span>{index}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.creatorSection}>
        <div className={styles.creatorPoster} aria-hidden>
          <span>ARTIST</span>
          <strong>ATOM<br />MCCREE</strong>
          <small>HUMAN / FINAL AUTHORITY</small>
        </div>
        <div className={styles.creatorCopy}>
          <p className={styles.sectionLabel}>THE CREATOR / THE WORKFORCE</p>
          <blockquote>“I am an artist using AI to paint a new future.”</blockquote>
          <p>
            Hip-hop poet. Artist. Marketing polymath. AI-lab inventor. Atom directs a growing workforce of models,
            agents, tools, and machines—then brings the experiments, decisions, failures, and finished creations on camera.
          </p>
          <Link href="/about">Read the full story <span aria-hidden>↗</span></Link>
        </div>
      </section>

      <section className={styles.finalSection}>
        <p>THE NEXT OBJECT IS ALREADY IN PROGRESS.</p>
        <h2>See what comes alive.</h2>
        <div>
          <a href="https://www.youtube.com/@AICodeShow" target="_blank" rel="noopener noreferrer" className={styles.watchButton}>Enter the channel <span aria-hidden>↗</span></a>
          <Link href="/#products" className={styles.textLink}>Explore the creations <span aria-hidden>↗</span></Link>
        </div>
      </section>
    </div>
  );
}
