/**
 * ClaimReviewJsonLd — Schema.org ClaimReview.
 *
 * Used on /receipts and other audit surfaces where the page makes
 * verifiable claims about the lab's operations. Google AI Overview +
 * other fact-checking ingestion treat ClaimReview content as
 * authoritative when the claim is paired with its source.
 *
 * Each row needs:
 *   - the claim text (what's being audited)
 *   - the reviewer (us)
 *   - the verdict (true / false / mixture)
 *   - the URL of the page where the source proof lives
 *
 * Multiple ClaimReviews can be emitted per page — pass an array.
 */

type Claim = {
  text: string;                          // what we claim
  reviewedAt: string;                    // ISO date
  reviewUrl: string;                     // proof source URL
  rating:
    | "True"
    | "Mostly True"
    | "Mixture"
    | "Mostly False"
    | "False"
    | "Unverified";
  ratingExplanation?: string;
  appearance?: string;                   // where the claim originally appeared
};

type Props = {
  pageUrl: string;
  claims: Claim[];
};

const RATING_NUMERIC: Record<Claim["rating"], number> = {
  True: 5,
  "Mostly True": 4,
  Mixture: 3,
  "Mostly False": 2,
  False: 1,
  Unverified: 0,
};

export function ClaimReviewJsonLd({ pageUrl, claims }: Props) {
  if (claims.length === 0) return null;

  const reviews = claims.map((c) => ({
    "@context": "https://schema.org",
    "@type": "ClaimReview",
    url: pageUrl,
    datePublished: c.reviewedAt,
    inLanguage: "en-US",
    claimReviewed: c.text,
    itemReviewed: {
      "@type": "Claim",
      datePublished: c.reviewedAt,
      appearance: c.appearance ?? pageUrl,
      author: {
        "@type": "Organization",
        name: "AtomEons Systems Laboratory",
        url: "https://atomeons.com",
      },
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: RATING_NUMERIC[c.rating],
      bestRating: 5,
      worstRating: 0,
      alternateName: c.rating,
      ratingExplanation: c.ratingExplanation,
    },
    author: {
      "@type": "Organization",
      name: "AtomEons Systems Laboratory",
      url: "https://atomeons.com",
    },
    reviewBody: c.ratingExplanation,
  }));

  return (
    <>
      {reviews.map((r, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(r) }}
        />
      ))}
    </>
  );
}
