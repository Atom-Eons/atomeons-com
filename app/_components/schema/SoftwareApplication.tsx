type Offer = {
  /** Price as a number (e.g., 99.00). Use 0 for free apps. */
  price: number;
  /** ISO 4217 currency code (e.g., "USD", "EUR"). */
  priceCurrency: string;
  /** Schema.org availability URL. Defaults to InStock. */
  availability?:
    | "https://schema.org/InStock"
    | "https://schema.org/OutOfStock"
    | "https://schema.org/PreOrder"
    | "https://schema.org/Discontinued";
  /** Optional offer URL (checkout / purchase page). */
  url?: string;
  /** ISO 8601 date the offer is valid until (e.g., "2026-12-31"). */
  priceValidUntil?: string;
};

type AggregateRating = {
  /** Average rating value (e.g., 4.8). */
  ratingValue: number;
  /** Total number of ratings counted. */
  ratingCount: number;
  /** Optional review count (distinct from ratingCount). */
  reviewCount?: number;
  /** Best possible rating on the scale. Defaults to 5. */
  bestRating?: number;
  /** Worst possible rating on the scale. Defaults to 1. */
  worstRating?: number;
};

type Props = {
  /** Product name (e.g., "ORANGEBOX", "B00KMAKR"). */
  name: string;
  /** Schema.org applicationCategory (e.g., "DeveloperApplication", "BusinessApplication"). */
  applicationCategory: string;
  /** Target OS (e.g., "Windows", "macOS", "Linux", or "Windows, macOS, Linux"). */
  operatingSystem: string;
  /** Pricing offer. Required for Google Rich Results eligibility. */
  offers: Offer;
  /** Direct download URL for the installer or zip. */
  downloadUrl: string;
  /** Current shipping version (e.g., "1.4.0"). */
  softwareVersion: string;
  /** Optional aggregate rating block. */
  aggregateRating?: AggregateRating;
  /** Optional installer file size (e.g., "82 MB"). */
  fileSize?: string;
  /** Optional product description. */
  description?: string;
  /** Optional canonical product URL. */
  url?: string;
  /** Optional product image URL(s). */
  image?: string | string[];
  /** Optional ISO 8601 publish date (e.g., "2026-01-15"). */
  datePublished?: string;
  /** Optional ISO 8601 last-modified date (e.g., "2026-06-05"). */
  dateModified?: string;
  /** Optional external reference URLs (Wikipedia, GitHub, social). */
  sameAs?: string[];
};

/**
 * Emits a schema.org SoftwareApplication JSON-LD script tag for products like
 * ORANGEBOX and B00KMAKR. Matches Google Rich Results Test expectations for
 * the Software App rich result, including offers, aggregateRating, and
 * operatingSystem fields.
 */
export function SoftwareApplication({
  name,
  applicationCategory,
  operatingSystem,
  offers,
  downloadUrl,
  softwareVersion,
  aggregateRating,
  fileSize,
  description,
  url,
  image,
  datePublished,
  dateModified,
  sameAs,
}: Props) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    applicationCategory,
    operatingSystem,
    softwareVersion,
    downloadUrl,
    offers: {
      "@type": "Offer",
      price: offers.price.toFixed(2),
      priceCurrency: offers.priceCurrency,
      availability: offers.availability ?? "https://schema.org/InStock",
      ...(offers.url ? { url: offers.url } : {}),
      ...(offers.priceValidUntil ? { priceValidUntil: offers.priceValidUntil } : {}),
    },
  };

  if (aggregateRating) {
    data.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: aggregateRating.ratingValue,
      ratingCount: aggregateRating.ratingCount,
      bestRating: aggregateRating.bestRating ?? 5,
      worstRating: aggregateRating.worstRating ?? 1,
      ...(aggregateRating.reviewCount ? { reviewCount: aggregateRating.reviewCount } : {}),
    };
  }

  if (fileSize) data.fileSize = fileSize;
  if (description) data.description = description;
  if (url) data.url = url;
  if (image) data.image = image;
  if (datePublished) data.datePublished = datePublished;
  if (dateModified) data.dateModified = dateModified;
  if (sameAs && sameAs.length > 0) data.sameAs = sameAs;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}