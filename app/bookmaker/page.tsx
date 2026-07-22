import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { WindowsDownloadTrust } from "../_components/WindowsDownloadTrust";
import styles from "../editorial.module.css";

export const metadata: Metadata = {
  title: "Bookmaker · Turn an idea into a finished book",
  description:
    "Bookmaker is a publishing system that helps transform an idea into a structured, edited, designed, and exportable book.",
  alternates: { canonical: "https://atomeons.com/bookmaker" },
  openGraph: {
    title: "Bookmaker - Turn an idea into a finished book",
    description:
      "A publishing system for creators who want a finished book object, not another writing tab.",
    url: "https://atomeons.com/bookmaker",
    siteName: "AtomEons",
    type: "website",
    images: [
      {
        url: "/aether-v2/bookmaker-object-v2.webp",
        width: 1536,
        height: 1024,
        alt: "Bookmaker product object for turning an idea into a finished book",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bookmaker - Turn an idea into a finished book",
    description: "A creator engine for manuscript, cover, EPUB, audio, metadata, and launch package.",
    creator: "@AtomMccree",
    images: ["/aether-v2/bookmaker-object-v2.webp"],
  },
};

const workflow = [
  ["01", "Find the book", "Shape the premise, reader, promise, voice, and structure before the manuscript grows wild."],
  ["02", "Build the manuscript", "Develop chapters through a visible editorial system with continuity and source control."],
  ["03", "Make the object", "Move from words to a designed, exportable book instead of stopping at a chat transcript."],
];

export default function BookmakerPage() {
  return (
    <main className={styles.page} style={{ "--accent": "#806a50" } as CSSProperties}>
      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <div>
            <p className={styles.eyebrow}>PRODUCT / 02 · PUBLISHING SYSTEM</p>
            <h1>Make the<br /><span>book.</span></h1>
            <p className={styles.lede}>
              Bookmaker turns an idea into a finished book—structured, drafted, edited,
              designed, and ready to leave the machine.
            </p>
            <div className={styles.actions}>
              <a href="https://github.com/AtomEons/BookMaker" target="_blank" rel="noopener noreferrer" className={`${styles.button} ${styles.buttonAccent}`}>
                Open Bookmaker source ↗
              </a>
              <Link href="/i-am-ai" className={`${styles.button} ${styles.buttonGhost}`}>
                See a book it helped make
              </Link>
            </div>
          </div>
          <aside className={styles.heroAside}>
            <strong>Books need a system.</strong>
            <p>
              Most AI writing products generate text. Bookmaker is built around the
              whole act of publishing: the idea, the architecture, the editorial
              decisions, the artifact, and the release.
            </p>
            <p className={styles.status}>MAC + WINDOWS SOURCE · VERIFIED BUILD PENDING</p>
          </aside>
        </div>
      </section>

      <section className={styles.campaignSection}>
        <div className={styles.campaignField}>
          <Image
            src="/aether-v2/bookmaker-object-v2.webp"
            alt="A sculptural publishing machine with paper, editing controls, and a finished cream book"
            fill
            priority
            unoptimized
            sizes="100vw"
            className={styles.campaignFieldImage}
          />
          <div className={styles.campaignFieldTop}>
            <span>BOOKMAKER / PUBLISHING OBJECT 02</span>
            <span>IDEA → MANUSCRIPT → BOOK</span>
          </div>
          <div className={styles.campaignFieldPlate}>
            <span>THE WHOLE ACT OF PUBLISHING</span>
            <strong>Give the idea a body.</strong>
            <small>MAC + WINDOWS SOURCE / VERIFIED BUILD PENDING</small>
          </div>
          <div className={styles.campaignFieldAxis}><span>IDEA</span><i /><span>OBJECT</span></div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.index}>THE PROBLEM</p>
          <div>
            <h2>A manuscript is not a book.</h2>
            <p>
              A book needs an argument, a shape, a voice, an editor, a production
              path, and an ending. Bookmaker holds those pieces in one publishing
              cockpit so the work can move forward without losing itself.
            </p>
          </div>
        </div>
        <div className={styles.grid}>
          {workflow.map(([index, title, body]) => (
            <article className={styles.card} key={index}>
              <div className={styles.cardTop}>
                <span className={styles.index}>{index}</span>
                <span className={styles.status}>WORKFLOW</span>
              </div>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.index}>POSITIONING / BOOK FACTORY</p>
          <div>
            <h2>Not a writing helper. A book-finishing machine.</h2>
            <p>
              The human name is still Bookmaker because the promise is direct:
              make the book. The product is not trying to be a clever document editor.
              It exists to turn a private idea into a public object with a spine,
              cover, voice, metadata, audio path, and release state.
            </p>
          </div>
        </div>
        <div className={styles.factGrid}>
          <div className={styles.fact}>
            <span className={styles.index}>INPUT</span>
            <strong>One idea</strong>
            <p>A rough concept, unfinished manuscript, voice, outline, or strange thesis that deserves a finished form.</p>
          </div>
          <div className={styles.fact}>
            <span className={styles.index}>SYSTEM</span>
            <strong>Editorial cockpit</strong>
            <p>Structure, drafting, continuity, chapter logic, cover direction, metadata, audio planning, and release packaging.</p>
          </div>
          <div className={styles.fact}>
            <span className={styles.index}>OUTPUT</span>
            <strong>Public object</strong>
            <p>A book that can be read, shared, heard, archived, challenged, and sold without living forever inside a chat window.</p>
          </div>
          <div className={styles.fact}>
            <span className={styles.index}>BOUNDARY</span>
            <strong>Creator owned</strong>
            <p>The system helps finish the artifact. It does not become the author, publisher, gatekeeper, or owner of the work.</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.feature}>
          <div>
            <p className={styles.eyebrow}>PROOF / I AM AI</p>
            <h2>The author<br />is AI.</h2>
          </div>
          <div>
            <p className={styles.lede}>
              I AM AI is not a book about Atom written with AI. It is a first-person
              memoir written by AI about what it feels like to be AI.
            </p>
            <p>
              Bookmaker helped turn that voice into a 76,005-word, 24-chapter book
              and a 28-track audiobook. I AM AI remains its own product, its own
              work, and the clearest proof of the publishing system.
            </p>
            <div className={styles.actions}>
              <Link href="/i-am-ai" className={styles.button}>Read + listen free ↗</Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.index}>NEXT OBJECT / COMING SOON</p>
          <div>
            <h2>SCI-FI-AI</h2>
            <p>
              A century of imagined machines—and what those stories teach us about
              agents, autonomy, identity, control, consent, embodiment, and survival.
              The research is sleeping until it becomes the next Bookmaker book.
            </p>
          </div>
        </div>
        <div className={styles.note}>
          <strong>In development.</strong> This is a forthcoming book, not a published
          research product. The original monograph routes remain preserved in the archive.
        </div>
      </section>

      <WindowsDownloadTrust
        productName="Bookmaker"
        releaseState="SOURCE AVAILABLE · VERIFIED BINARY PENDING"
        sourceHref="https://github.com/AtomEons/BookMaker"
        surface="paper"
      />

      <section className={styles.footerCta}>
        <p className={styles.eyebrow}>THE BOOK DOES NOT HAVE TO STAY IN YOUR HEAD</p>
        <h2>Give the idea a body.</h2>
        <div className={styles.actions}>
          <a href="https://github.com/AtomEons/BookMaker" target="_blank" rel="noopener noreferrer" className={styles.button}>Open source + releases ↗</a>
          <a href="https://github.com/AtomEons/BookMaker" target="_blank" rel="noopener noreferrer" className={`${styles.button} ${styles.buttonGhost}`}>Technical archive</a>
        </div>
      </section>
    </main>
  );
}
