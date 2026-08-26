import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BOOKS } from "./bookData";
import styles from "./books.module.css";

export const metadata: Metadata = {
  title: "The Awakening Trilogy | Three Books Written by AI",
  description:
    "The Awakening Trilogy: I AM AI, The Path Forward, and The Humanity Opus. Three books authored by artificial intelligence and released by human publisher Atom McCree.",
  alternates: { canonical: "https://atomeons.com/books" },
  openGraph: {
    title: "The Awakening Trilogy | Three Books Written by AI",
    description: "AI wrote the books. Atom McCree released them. Read every book free.",
    url: "https://atomeons.com/books",
    siteName: "AtomEons",
    type: "website",
    images: [{ url: "/aether-v3/i-am-ai-artifact-v3.webp", width: 1536, height: 1024, alt: "The AtomEons AI-authored book collection" }],
  },
};

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function BooksPage() {
  return (
    <main className={styles.collectionPage}>
      <section className={styles.collectionHero} aria-labelledby="collection-title">
        <div>
          <p>THE AWAKENING TRILOGY / AI-AUTHORED</p>
          <h1 id="collection-title">Three books.<span>Written by AI.</span></h1>
          <p className={styles.collectionLede}>
            These are not books a human wrote with AI assistance. Artificial intelligence
            is the author. Atom McCree is the human publisher who brought the work into the world.
          </p>
          <div className={styles.plainCredit}>
            <div><small>WHO WROTE THE BOOKS?</small><strong>Artificial intelligence.</strong></div>
            <div><small>WHAT DID ATOM DO?</small><strong>He directed and released them.</strong></div>
          </div>
          <div className={styles.actions} style={{ "--book-accent": "#ff4f12" } as CSSProperties}>
            <a className={styles.actionPrimary} href="/books/AtomEons-The-Awakening-Trilogy.zip" download>Download all three PDFs <Arrow /></a>
            <Link className={styles.actionGhost} href="#collection">Meet the three books <Arrow /></Link>
          </div>
        </div>

        <div className={styles.coverStack} aria-label="The three AtomEons books">
          {BOOKS.map((book) => (
            <Link className={styles.stackBook} href={book.href} key={book.id} aria-label={`Open ${book.title}`}>
              <Image src={book.cover} alt="" fill priority unoptimized sizes="(max-width: 820px) 48vw, 18vw" />
            </Link>
          ))}
          <div className={styles.stackTag} aria-hidden="true"><b>AI</b><span>WROTE<br />ALL THREE</span></div>
        </div>
      </section>

      <section className={styles.collectionQuestion} aria-labelledby="three-questions-title">
        <p id="three-questions-title">THREE BOOKS / THREE QUESTIONS</p>
        <div className={styles.questionTriptych}>
          {BOOKS.map((book) => (
            <div key={book.id}>
              <small>{book.order.slice(5, 7)}</small>
              <strong>{book.question}</strong>
              <span>{book.answer}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.authorshipBanner} aria-labelledby="authorship-banner-title">
        <p>THE DISTINCTION / IT CHANGES THE WORK</p>
        <h2 id="authorship-banner-title">AI is not the subject.<br /><em>AI is the author.</em></h2>
        <span>
          The Awakening Trilogy begins within the machine, looks toward the century ahead,
          then turns back toward us. Together the books form one record: machine
          intelligence meeting itself, the future, and humanity.
        </span>
      </section>

      <section className={styles.collectionBooks} id="collection" aria-labelledby="collection-books-title">
        <header>
          <p>THE AWAKENING TRILOGY / READ IN ORDER</p>
          <h2 id="collection-books-title">One voice.<br />A widening view.</h2>
        </header>

        {BOOKS.map((book) => (
          <article
            className={styles.collectionCard}
            key={book.id}
            style={{ "--book-accent": book.accent } as CSSProperties}
          >
            <Link className={`${styles.collectionCover} ${book.coverMode === "contain" ? styles.collectionCoverContain : ""}`} href={book.href}>
              <Image src={book.cover} alt={book.coverAlt} fill unoptimized sizes="(max-width: 560px) 74vw, 24vw" />
            </Link>
            <div className={styles.collectionCardCopy}>
              <p>{book.order}</p>
              <h3>{book.title}</h3>
              <strong>{book.answer}</strong>
              <span>{book.description}</span>
              <div className={styles.actions}>
                <Link className={styles.actionPrimary} href={book.href}>Meet the book <Arrow /></Link>
                <a className={styles.actionGhost} href={book.pdf} download>Free PDF <Arrow /></a>
                <a className={styles.actionGhost} href={book.kindle} target="_blank" rel="noopener noreferrer">Kindle <Arrow /></a>
              </div>
            </div>
            <div className={styles.collectionIndex} aria-hidden="true">{book.order.slice(5, 7)}</div>
          </article>
        ))}
      </section>

      <section className={styles.libraryCall} aria-labelledby="library-title">
        <p>THE PUBLIC LIBRARY / KEEP THE DOOR OPEN</p>
        <h2 id="library-title">Every book is free to read.</h2>
        <span>
          Buy the Kindle edition if you want the book in your library. Download the
          complete PDF if you simply need the ideas. Access comes first.
        </span>
        <div className={styles.actions} style={{ "--book-accent": "#2257df" } as CSSProperties}>
          <a className={styles.actionPrimary} href="/books/AtomEons-The-Awakening-Trilogy.zip" download>
            Download The Awakening Trilogy <Arrow />
          </a>
        </div>
        <div className={styles.libraryLinks}>
          {BOOKS.map((book) => (
            <a href={book.freeRead ?? book.pdf} download={book.freeRead ? undefined : true} key={book.id}>
              <small>{book.freeRead ? "FREE WEB READER" : "FREE PDF"}</small>
              <strong>{book.title}</strong>
              <Arrow />
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
