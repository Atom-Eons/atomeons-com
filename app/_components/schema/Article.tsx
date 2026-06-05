type ImageObject = {
  url: string;
  width?: number;
  height?: number;
  caption?: string;
};

type Person = {
  name: string;
  url?: string;
  image?: string;
  jobTitle?: string;
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
  /** Article headline. Google requires <= 110 chars for Rich Results. */
  headline: string;
  /** Article author. Person or list of Persons. */
  author: Person | Person[];
  /** Publisher Organization. Logo is required by Google Rich Results. */
  publisher: Organization;
  /** ISO 8601 date the article was first published. */
  datePublished: string;
  /** Canonical URL of the article. Used for mainEntityOfPage @id. */
  mainEntityOfPage: string;
  /** Short article description / dek. */
  description: string;
  /** ISO 8601 date the article was last modified. */
  dateModified?: string;
  /** One or more representative images. Google prefers 16x9, 4x3, 1x1 variants. */
  image?: string | string[] | ImageObject | ImageObject[];
  /** Full article body text (optional; usually omit for long articles). */
  articleBody?: string;
  /** Section / category of the article (e.g. "Technology", "Opinion"). */
  articleSection?: string;
};

/**
 * Article — emits schema.org/Article JSON-LD.
 *
 * Targets Google's Rich Results "Article" type. Includes headline, author,
 * publisher (with logo), datePublished, and mainEntityOfPage @id — the
 * minimum set Google validates against. Supports single or multiple
 * authors, single or multiple images, and Person.sameAs for author
 * disambiguation (Wikipedia, social, ORCID, etc.).
 */
export function Article({
  headline,
  author,
  publisher,
  datePublished,
  mainEntityOfPage,
  description,
  dateModified,
  image,
  articleBody,
  articleSection,
}: Props) {
  const formatPerson = (p: Person) => ({
    "@type": "Person",
    name: p.name,
    ...(p.url && { url: p.url }),
    ...(p.image && { image: p.image }),
    ...(p.jobTitle && { jobTitle: p.jobTitle }),
    ...(p.sameAs && p.sameAs.length > 0 && { sameAs: p.sameAs }),
  });

  const formatImage = (i: string | ImageObject) =>
    typeof i === "string"
      ? i
      : {
          "@type": "ImageObject",
          url: i.url,
          ...(i.width && { width: i.width }),
          ...(i.height && { height: i.height }),
          ...(i.caption && { caption: i.caption }),
        };

  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    datePublished,
    ...(dateModified && { dateModified }),
    author: Array.isArray(author)
      ? author.map(formatPerson)
      : formatPerson(author),
    publisher: {
      "@type": "Organization",
      name: publisher.name,
      ...(publisher.url && { url: publisher.url }),
      logo: {
        "@type": "ImageObject",
        url: publisher.logo.url,
        ...(publisher.logo.width && { width: publisher.logo.width }),
        ...(publisher.logo.height && { height: publisher.logo.height }),
      },
      ...(publisher.sameAs &&
        publisher.sameAs.length > 0 && { sameAs: publisher.sameAs }),
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": mainEntityOfPage,
    },
    ...(image && {
      image: Array.isArray(image)
        ? (image as (string | ImageObject)[]).map(formatImage)
        : formatImage(image as string | ImageObject),
    }),
    ...(articleSection && { articleSection }),
    ...(articleBody && { articleBody }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}