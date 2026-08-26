import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { BOOKS, type BookRecord } from "../bookData";
import styles from "../books.module.css";

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function BookActions({ book, compact = false }: { book: BookRecord; compact?: boolean }) {
  return (
    <div className={`${styles.actions} ${compact ? styles.actionsCompact : ""}`}>
      {book.freeRead ? (
        <a className={styles.actionPrimary} href={book.freeRead}>
          Read free online <Arrow />
        </a>
      ) : null}
      <a className={book.freeRead ? styles.actionGhost : styles.actionPrimary} href={book.pdf} download>
        Download free PDF <Arrow />
      </a>
      <a className={styles.actionGhost} href={book.kindle} target="_blank" rel="noopener noreferrer">
        Get the Kindle edition <Arrow />
      </a>
    </div>
  );
}

export function BookDetail({ book, children }: { book: BookRecord; children?: ReactNode }) {
  const index = BOOKS.findIndex((entry) => entry.id === book.id);
  const nextBook = BOOKS[(index + 1) % BOOKS.length];

  return (
    <main className={styles.detailPage} style={{ "--book-accent": book.accent } as CSSProperties}>
      <section className={styles.detailHero} aria-labelledby="book-title">
        <div className={styles.heroCoordinates} aria-hidden="true">
          <span>ATOMEONS / AI-AUTHORED BOOKS</span>
          <span>{book.order}</span>
          <span>{book.year} / FREE TO READ</span>
        </div>

        <div className={styles.detailCopy}>
          <p className={styles.eyebrow}>{book.order}</p>
          <h1 id="book-title">{book.title}</h1>
          <p className={styles.subtitle}>{book.subtitle}</p>
          <div className={styles.questionBlock}>
            <small>THE QUESTION</small>
            <strong>{book.question}</strong>
            <span>{book.answer}</span>
          </div>
          <BookActions book={book} />
        </div>

        <div className={styles.coverStage}>
          <div className={styles.coverOrbit} aria-hidden="true" />
          <div className={`${styles.coverFrame} ${book.coverMode === "contain" ? styles.coverContain : ""}`}>
            <Image
              src={book.cover}
              alt={book.coverAlt}
              fill
              priority
              unoptimized
              sizes="(max-width: 900px) 82vw, 36vw"
            />
          </div>
          <div className={styles.coverStamp} aria-hidden="true">
            <span>AUTHORED</span><b>AI</b><small>RELEASED<br />BY A HUMAN</small>
          </div>
        </div>
      </section>

      <section className={styles.authorship} aria-labelledby="authorship-title">
        <div>
          <p>AUTHORSHIP / SAY IT CLEARLY</p>
          <h2 id="authorship-title">Written by AI.<br />Released by Atom.</h2>
          <span>{book.authorshipLine}</span>
        </div>
        <dl className={styles.creditLedger}>
          {book.credits.map((credit) => (
            <div key={`${credit.role}-${credit.name}`}>
              <dt>{credit.role}</dt>
              <dd>{credit.name}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className={styles.bookSignal} aria-label="Book description and measurements">
        <p>{book.description}</p>
        <div className={styles.statRail}>
          {book.stats.map((stat) => (
            <div key={stat.label}><small>{stat.label}</small><strong>{stat.value}</strong></div>
          ))}
        </div>
      </section>

      <section className={styles.ideasSection} aria-labelledby="ideas-title">
        <header>
          <p>THE IDEAS / IN PLAIN LANGUAGE</p>
          <h2 id="ideas-title">What this book<br />actually says.</h2>
        </header>
        <ol className={styles.ideaGrid}>
          {book.ideas.map((idea, ideaIndex) => (
            <li key={idea.title}>
              <small>{String(ideaIndex + 1).padStart(2, "0")}</small>
              <h3>{idea.title}</h3>
              <p>{idea.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.insideSection} aria-labelledby="inside-title">
        <header>
          <p>INSIDE / THE COMPLETE OBJECT</p>
          <h2 id="inside-title">The architecture<br />of the book.</h2>
        </header>
        <div className={styles.partList}>
          {book.sections.map((section) => (
            <article key={`${section.label}-${section.title}`}>
              <small>{section.label}</small>
              <h3>{section.title}</h3>
              <ul>
                {section.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {children ? <section className={styles.bonusSection}>{children}</section> : null}

      <section className={styles.readingRoom} aria-labelledby="read-title">
        <div className={styles.readingMark} aria-hidden="true">
          <span>AE</span><i />
        </div>
        <div>
          <p>THE INVITATION / READ THE SOURCE</p>
          <h2 id="read-title">{book.invitation}</h2>
          <BookActions book={book} compact />
        </div>
      </section>

      <section className={styles.nextBook}>
        <p>NEXT IN THE AI-AUTHORED COLLECTION</p>
        <Link href={nextBook.href}>
          <small>{nextBook.order}</small>
          <strong>{nextBook.title}</strong>
          <Arrow />
        </Link>
      </section>
    </main>
  );
}
