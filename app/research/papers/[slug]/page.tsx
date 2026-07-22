import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PAPERS, getPaper } from "../../../_data/research-papers";
import styles from "../../../editorial.module.css";

function compactMetadataText(value: string, maxLength: number) {
  if (value.length <= maxLength) return value;
  const clipped = value.slice(0, maxLength - 1);
  const wordBoundary = clipped.lastIndexOf(" ");
  return `${clipped.slice(0, wordBoundary > maxLength * 0.65 ? wordBoundary : clipped.length).trim()}…`;
}

export function generateStaticParams() {
  return PAPERS.map((paper) => ({ slug: paper.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const paper = getPaper(slug);
  if (!paper) return { title: "Paper not found" };
  const url = `https://atomeons.com/research/papers/${paper.slug}`;
  const primaryTitle = paper.title.split(" — ")[0];
  const conciseTitle = compactMetadataText(
    paper.title.includes("Extended Working Draft")
      ? `${primaryTitle}: Extended Working Draft`
      : primaryTitle,
    58,
  );
  const conciseDescription = compactMetadataText(paper.kid_summary, 155);
  return {
    title: conciseTitle,
    description: conciseDescription,
    alternates: { canonical: url },
    openGraph: {
      title: `${conciseTitle} · AtomEons Research`,
      description: conciseDescription,
      url,
      siteName: "AtomEons",
      type: "article",
      images: [
        {
          url: "/aether-v2/research-radiance-field-v2.webp",
          width: 1536,
          height: 1024,
          alt: "AtomEons independent experimental research",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${conciseTitle} · AtomEons`,
      description: conciseDescription,
      creator: "@AtomMccree",
      images: ["/aether-v2/research-radiance-field-v2.webp"],
    },
  };
}

export default async function PaperPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const paper = getPaper(slug);
  if (!paper) notFound();

  const index = PAPERS.findIndex((item) => item.slug === slug);
  const next = PAPERS[(index + 1) % PAPERS.length];
  const pdfUrl = `/research/papers/${paper.slug}.pdf`;

  const scholarlyArticle = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: paper.title,
    author: paper.authors,
    datePublished: paper.date,
    abstract: paper.academic_summary,
    url: `https://atomeons.com/research/papers/${paper.slug}`,
    encoding: {
      "@type": "MediaObject",
      contentUrl: `https://atomeons.com${pdfUrl}`,
      encodingFormat: "application/pdf",
    },
    publisher: {
      "@type": "Organization",
      name: "AtomEons Independent Research",
      location: "Naples, Florida",
    },
  };

  return (
    <main className={styles.page} style={{ "--accent": "#2558dc" } as CSSProperties}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(scholarlyArticle) }}
      />
      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <div>
            <p className={styles.eyebrow}>PAPER / {String(index + 1).padStart(2, "0")} OF {PAPERS.length} · {paper.date}</p>
            <h1 style={{ fontSize: "clamp(46px, 7vw, 112px)", lineHeight: ".9" }}>{paper.title}</h1>
            <p className={styles.lede}>{paper.authors}</p>
            <div className={styles.actions}>
              <a href={pdfUrl} download className={`${styles.button} ${styles.buttonAccent}`}>
                Download PDF ↓
              </a>
              <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className={`${styles.button} ${styles.buttonGhost}`}>
                Read PDF ↗
              </a>
            </div>
          </div>
          <aside className={styles.heroAside}>
            <strong>Independent experimental research.</strong>
            <p>
              Status: {paper.status}. Read the complete paper before treating the
              summary as the claim. This page makes the argument accessible; the PDF
              contains the full reasoning and references.
            </p>
            <p className={styles.status}>PDF · {(paper.bytes / 1024).toFixed(1)} KB · DIRECT DOWNLOAD</p>
          </aside>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.twoCol}>
          <div>
            <p className={styles.eyebrow}>THE IDEA / PLAIN LANGUAGE</p>
            <h2>What it says.</h2>
            <p className={styles.lede}>{paper.kid_summary}</p>
          </div>
          <div>
            <p className={styles.eyebrow}>THE ARGUMENT / TECHNICAL</p>
            <h2>Abstract.</h2>
            <p className={styles.lede}>{paper.academic_summary}</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.index}>KEYWORDS / FIND THE THREAD</p>
          <div>
            <h2>{paper.keywords.join(" · ")}</h2>
          </div>
        </div>
        <div className={styles.note}>
          <strong>Experimental research means the question is alive.</strong> The page
          does not imply peer review, institutional affiliation, or scientific consensus.
          It gives the work a public home and makes the complete source easy to inspect.
        </div>
      </section>

      <section className={styles.footerCta}>
        <p className={styles.eyebrow}>NEXT PAPER / {String(((index + 1) % PAPERS.length) + 1).padStart(2, "0")}</p>
        <h2>{next.title}</h2>
        <div className={styles.actions}>
          <Link href={`/research/papers/${next.slug}`} className={styles.button}>Read next ↗</Link>
          <Link href="/research/papers" className={`${styles.button} ${styles.buttonGhost}`}>All papers</Link>
        </div>
      </section>
    </main>
  );
}
