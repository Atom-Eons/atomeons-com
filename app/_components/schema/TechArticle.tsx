type Person = {
  name: string;
  url?: string;
  sameAs?: string[];
};

type Organization = {
  name: string;
  url?: string;
  logo: {
    url: string;
    width?: number;
    height?: number;
  };
  sameAs?: string[];
};

type Props = {
  /** Article title — shown in Google Rich Results. */
  headline: string;
  /** Author of the deep-dive (person or organization). */
  author: Person;
  /** Publishing entity (AtomEons, ÆoNs Research, etc.) with logo per Google spec. */
  publisher: Organization;
  /** ISO 8601 publish date (YYYY-MM-DD or full ISO with timezone). */
  datePublished: string;
  /** Target reader skill level — Beginner | Intermediate | Expert (schema.org standard values). */
  proficiencyLevel: "Beginner" | "Intermediate" | "Expert";
  /** Section/category of the article, e.g. "Atlas", "Cyber", "Pathwaves". */
  articleSection: string;
  /** Plain-text summary (150–160 chars works best for search snippets). */
  description: string;
  /** Prerequisite knowledge or tools required to follow the article. */
  dependencies?: string;
  /** Hero image URL — required for Rich Results eligibility when supplied. */
  image?: string | string[];
  /** ISO 8601 last-modified date — Google strongly prefers this when content evolves. */
  dateModified?: string;
  /** Canonical URL of the article. */
  url?: string;
  /** External authoritative references (Wikipedia, papers, RFCs). */
  sameAs?: string[];
};

/**
 * Emits a schema.org `TechArticle` JSON-LD block for technical deep-dives
 * under /learn/atlas and /learn/cyber. Tuned to Google's Rich Results Test
 * expectations: includes headline, author, publisher (with logo), datePublished,
 * dateModified, proficiencyLevel, articleSection, dependencies, and optional
 * sameAs[] for external authoritative references.
 *
 * Render once per article page inside the page's `<head>` or top of the body —
 * Next.js App Router will hoist `<script>` correctly from a Server Component.
 */
export function TechArticle({
  headline,
  author,
  publisher,
  datePublished,
  proficiencyLevel,
  articleSection,
  description,
  dependencies,
  image,
  dateModified,
  url,
  sameAs,
}: Props) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline,
    description,
    datePublished,
    dateModified: dateModified ?? datePublished,
    articleSection,
    proficiencyLevel,
    author: {
      "@type": "Person",
      name: author.name,
      ...(author.url ? { url: author.url } : {}),
      ...(author.sameAs && author.sameAs.length > 0
        ? { sameAs: author.sameAs }
        : {}),
    },
    publisher: {
      "@type": "Organization",
      name: publisher.name,
      ...(publisher.url ? { url: publisher.url } : {}),
      logo: {
        "@type": "ImageObject",
        url: publisher.logo.url,
        ...(publisher.logo.width ? { width: publisher.logo.width } : {}),
        ...(publisher.logo.height ? { height: publisher.logo.height } : {}),
      },
      ...(publisher.sameAs && publisher.sameAs.length > 0
        ? { sameAs: publisher.sameAs }
        : {}),
    },
    ...(dependencies ? { dependencies } : {}),
    ...(image ? { image } : {}),
    ...(url
      ? {
          url,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": url,
          },
        }
      : {}),
    ...(sameAs && sameAs.length > 0 ? { sameAs } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}