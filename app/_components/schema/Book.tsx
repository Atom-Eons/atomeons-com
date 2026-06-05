type PersonOrOrg = {
  name: string;
  url?: string;
  sameAs?: string[];
};

type Publisher = {
  name: string;
  url?: string;
  logo?: string;
  sameAs?: string[];
};

type Offer = {
  price: number;
  priceCurrency: string;
  url: string;
  availability?:
    | "InStock"
    | "OutOfStock"
    | "PreOrder"
    | "Discontinued"
    | "LimitedAvailability";
  priceValidUntil?: string;
  seller?: { name: string; url?: string };
};

type BookFormat = "Hardcover" | "Paperback" | "EBook" | "AudiobookFormat";

type Props = {
  /** Book title */
  name: string;
  /** Primary author (or first author) */
  author: PersonOrOrg;
  /** Publisher of the edition */
  publisher: Publisher;
  /** Total page count for the edition */
  numberOfPages: number;
  /** ISO 8601 publication date (YYYY-MM-DD) */
  datePublished: string;
  /** schema.org BookFormatType — Hardcover | Paperback | EBook | AudiobookFormat */
  bookFormat: BookFormat;
  /** BCP-47 language tag, e.g. "en", "en-US" */
  inLanguage: string;
  /** Long description / blurb */
  description: string;
  /** Absolute URL to cover image */
  image: string;
  /** Purchase offers across vendors */
  offers: Offer[];
  /** ISBN-13 (preferred) or ISBN-10 */
  isbn?: string;
  /** ISO 8601 last-revised date */
  dateModified?: string;
  /** Canonical URL for the book's landing page */
  url?: string;
  /** External authoritative references (Wikipedia, Wikidata, Goodreads, etc.) */
  sameAs?: string[];
  /** Aggregate rating block (optional) */
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
    bestRating?: number;
    worstRating?: number;
  };
};

/**
 * Emits schema.org/Book JSON-LD for the Google Rich Results Test.
 * Use one per book edition. Required fields match Google's structured-data
 * guidance; `bookFormat` uses the full schema.org URI form for validator strictness.
 */
export function Book({
  name,
  author,
  publisher,
  numberOfPages,
  datePublished,
  bookFormat,
  inLanguage,
  description,
  image,
  offers,
  isbn,
  dateModified,
  url,
  sameAs,
  aggregateRating,
}: Props) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Book",
    name,
    author: {
      "@type": "Person",
      name: author.name,
      ...(author.url ? { url: author.url } : {}),
      ...(author.sameAs ? { sameAs: author.sameAs } : {}),
    },
    publisher: {
      "@type": "Organization",
      name: publisher.name,
      ...(publisher.url ? { url: publisher.url } : {}),
      ...(publisher.logo
        ? { logo: { "@type": "ImageObject", url: publisher.logo } }
        : {}),
      ...(publisher.sameAs ? { sameAs: publisher.sameAs } : {}),
    },
    numberOfPages,
    datePublished,
    bookFormat: `https://schema.org/${bookFormat}`,
    inLanguage,
    description,
    image,
    ...(isbn ? { isbn } : {}),
    ...(url ? { url } : {}),
    ...(dateModified ? { dateModified } : {}),
    ...(sameAs && sameAs.length > 0 ? { sameAs } : {}),
    offers: offers.map((o) => ({
      "@type": "Offer",
      price: o.price,
      priceCurrency: o.priceCurrency,
      url: o.url,
      availability: `https://schema.org/${o.availability ?? "InStock"}`,
      ...(o.priceValidUntil ? { priceValidUntil: o.priceValidUntil } : {}),
      ...(o.seller
        ? {
            seller: {
              "@type": "Organization",
              name: o.seller.name,
              ...(o.seller.url ? { url: o.seller.url } : {}),
            },
          }
        : {}),
    })),
    ...(aggregateRating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: aggregateRating.ratingValue,
            reviewCount: aggregateRating.reviewCount,
            bestRating: aggregateRating.bestRating ?? 5,
            worstRating: aggregateRating.worstRating ?? 1,
          },
        }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}