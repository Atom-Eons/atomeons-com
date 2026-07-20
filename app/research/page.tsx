import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DISCOVERIES } from "../_data/discoveries";
import { PAPERS } from "../_data/research-papers";
import styles from "../editorial.module.css";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Independent frontier research from AtomEons: discoveries, working systems, speculative papers, and locally hosted open PDFs.",
  alternates: { canonical: "https://atomeons.com/research" },
  openGraph: {
    title: "Experimental Research · AtomEons",
    description:
      "Independent research into machine perception, memory, compression, collective intelligence, and the systems hiding between fields.",
    images: [
      {
        url: "/aether-v2/research-radiance-field-v2.webp",
        width: 1536,
        height: 1024,
        alt: "Radiance-Luminance Theory and Alpha Wolf Eyes",
      },
    ],
  },
};

const featuredPapers = PAPERS.slice(0, 4);

export default function ResearchPage() {
  return (
    <main className={styles.page} style={{ "--accent": "#2558dc" } as CSSProperties}>
      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <div>
            <p className={styles.eyebrow}>ATOMEONS / RESEARCH</p>
            <h1>Follow the<br /><span>strange idea.</span></h1>
            <p className={styles.lede}>
              Independent research into machine perception, memory, compression,
              collective intelligence, biology, and the systems hiding between fields.
            </p>
            <div className={styles.actions}>
              <Link href="/research/discoveries" className={`${styles.button} ${styles.buttonAccent}`}>
                Enter discoveries ↗
              </Link>
              <Link href="/research/papers" className={`${styles.button} ${styles.buttonGhost}`}>
                Read {PAPERS.length} papers
              </Link>
            </div>
          </div>
          <aside className={styles.heroAside}>
            <strong>No imaginary institution.</strong>
            <p>
              AtomEons Research is the independent work of Atom McCree with AI systems
              in Naples, Florida. There is no funded physical lab behind the language.
              The work is presented as prototypes, architectures, working papers, and
              hypotheses—with status and limits visible.
            </p>
          </aside>
        </div>
        <Link
          href="/research/papers/radiance-luminance-alpha-wolf-eyes"
          className={styles.researchField}
          aria-label="Open Radiance-Luminance Theory and Alpha Wolf Eyes"
        >
          <Image
            className={styles.researchFieldImage}
            src="/aether-v2/research-radiance-field-v2.webp"
            alt="Two experimental photonic eye instruments exchanging red and blue light paths on a white optical bench"
            fill
            priority
            unoptimized
            sizes="100vw"
          />
          <div className={styles.researchFieldTop}>
            <span>FEATURED PAPER / 01</span>
            <span>VISION WITHOUT LEARNED FILTER WEIGHTS</span>
          </div>
          <div className={styles.researchFieldPlate}>
            <span>RLT / AWE-3</span>
            <strong>What if vision<br />begins with light?</strong>
            <small>RADIANCE-LUMINANCE THEORY<br />AND ALPHA WOLF EYES</small>
          </div>
          <div className={styles.researchFieldAxis} aria-hidden>
            <span>RADIANCE</span>
            <i />
            <span>LUMINANCE</span>
          </div>
          <span className={styles.researchFieldArrow}>Open paper ↗</span>
        </Link>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.index}>RESEARCH MAP / SECOND FRONT DOOR</p>
          <div>
            <h2>Not academia. Not fantasy. A public experiment table.</h2>
            <p>
              The research side of AtomEons gives unusual ideas a clean stage:
              what exists, what is measured, what is only a hypothesis, and what
              needs the next test.
            </p>
          </div>
        </div>
        <div className={styles.factGrid}>
          <div className={styles.fact}>
            <span className={styles.index}>01</span>
            <strong>Discoveries</strong>
            <p>Named systems like AEyes, AtomSmasher, and AEMemory with propositions, evidence, and limits.</p>
          </div>
          <div className={styles.fact}>
            <span className={styles.index}>02</span>
            <strong>Working papers</strong>
            <p>{PAPERS.length} public research objects with summaries, technical abstracts, and locally hosted PDFs.</p>
          </div>
          <div className={styles.fact}>
            <span className={styles.index}>03</span>
            <strong>Prototype truth</strong>
            <p>Implemented pieces are named as implemented. Unproven claims stay labeled as architecture, hypothesis, or future test.</p>
          </div>
          <div className={styles.fact}>
            <span className={styles.index}>04</span>
            <strong>Open challenge</strong>
            <p>The goal is not academic polish. The goal is to make the strange claim inspectable enough to attack, improve, or replicate.</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.index}>PAPER RUNWAY / HIGH-SIGNAL OBJECTS</p>
          <div>
            <h2>The papers should feel like products.</h2>
            <p>
              Each research object gets a public doorway with plain-language stakes,
              technical framing, status, and a hosted PDF path when available. The
              point is not academic costume. The point is making the claim inspectable.
            </p>
          </div>
        </div>
        <div className={styles.paperRunway}>
          {featuredPapers.map((paper, index) => (
            <Link href={`/research/papers/${paper.slug}`} className={styles.paperRunwayCard} key={paper.slug}>
              <div className={styles.paperRunwayTop}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{paper.status}</span>
              </div>
              <h3>{paper.title}</h3>
              <p>{paper.kid_summary}</p>
              <div className={styles.paperRunwayMeta}>
                <span>{paper.date}</span>
                <span>{paper.keywords.slice(0, 2).join(" / ")}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.index}>DISCOVERIES / 001—003</p>
          <div>
            <h2>Things found by building.</h2>
            <p>
              Research here begins as an object: code, an architecture, a measurement,
              or a system that behaves differently enough to deserve its own name.
            </p>
          </div>
        </div>
        <div className={styles.grid}>
          {DISCOVERIES.map((discovery, index) => (
            <Link
              href={`/research/discoveries/${discovery.slug}`}
              className={styles.card}
              key={discovery.slug}
              style={{ "--accent": discovery.accent } as CSSProperties}
            >
              <div className={styles.cardTop}>
                <span className={styles.index}>0{index + 1}</span>
                <span className={styles.status}>{discovery.status}</span>
              </div>
              <h3>{discovery.displayName}</h3>
              <p>{discovery.oneLine}</p>
              <span className={styles.cardArrow}>↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.feature}>
          <div>
            <p className={styles.eyebrow}>OPEN PAPER LIBRARY / {PAPERS.length} OBJECTS</p>
            <h2>Ideas with<br />edges.</h2>
          </div>
          <div>
            <p className={styles.lede}>
              Cross-disciplinary papers on bioelectric systems, intelligence,
              topology, cognition, and machine language.
            </p>
            <p>
              Some are formal working papers. Some are speculative. None are presented
              as peer-reviewed unless that status can be proved. Every paper gets its
              own page, a plain-language summary, a technical abstract, and a direct PDF.
            </p>
            <div className={styles.actions}>
              <Link href="/research/papers" className={styles.button}>Open paper library ↗</Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.index}>METHOD / PUBLIC STATUS</p>
          <div>
            <h2>Wonder first. Receipts immediately after.</h2>
            <p>
              Fringe questions are welcome. Fake certainty is not. The public record
              separates implemented systems, measured results, architectural work,
              hypotheses, and future tests.
            </p>
          </div>
        </div>
        <div className={styles.factGrid}>
          <div className={styles.fact}><span className={styles.index}>01</span><strong>Name the proposition</strong><p>Say what the idea changes and why it matters.</p></div>
          <div className={styles.fact}><span className={styles.index}>02</span><strong>Build an object</strong><p>Code, a protocol, a model, a paper, or an experiment.</p></div>
          <div className={styles.fact}><span className={styles.index}>03</span><strong>Record the evidence</strong><p>Keep measurements, failures, versions, and receipts visible.</p></div>
          <div className={styles.fact}><span className={styles.index}>04</span><strong>Name the limits</strong><p>Make the next test obvious and the current claim exact.</p></div>
        </div>
      </section>

      <section className={styles.footerCta}>
        <p className={styles.eyebrow}>A SECOND FRONT DOOR INTO ATOMEONS</p>
        <h2>Products prove the future can be built. Research asks what else is possible.</h2>
        <div className={styles.actions}>
          <Link href="/research/discoveries" className={styles.button}>Explore discoveries</Link>
          <Link href="/research/papers" className={`${styles.button} ${styles.buttonGhost}`}>Download the papers</Link>
        </div>
      </section>
    </main>
  );
}
