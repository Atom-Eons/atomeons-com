/**
 * ProductJsonLd — Schema.org Product + Offer + AggregateRating + Brand
 * for the lab's three sellable products. AI search engines (Google AI
 * Overviews · Perplexity Shopping · ChatGPT product search) render
 * price + rating + availability badges when this JSON-LD is well-formed.
 *
 * The AggregateRating is conservative-honest:
 *   - ratingValue is operator-stated, NOT review-aggregate
 *   - reviewCount uses real /receipts-anchored counters or 0 if not yet
 *   - if reviewCount=0 we OMIT AggregateRating entirely (no fake rating)
 *
 * Usage on a product page:
 *   <ProductJsonLd
 *     name="ORANGEBOX Version 1"
 *     description="Local-first Windows AI cockpit..."
 *     image="https://atomeons.com/orangebox/opengraph-image"
 *     priceUSD={99}
 *     ratingValue={5}
 *     reviewCount={0}
 *   />
 */

type Props = {
  name: string;
  description: string;
  image: string;
  url: string;
  priceUSD: number;
  priceCurrency?: string;
  availability?: "InStock" | "PreOrder" | "OutOfStock";
  brand?: string;
  category?: string;
  ratingValue?: number;
  reviewCount?: number;
  sku?: string;
  identifier?: string;
};

export function ProductJsonLd({
  name,
  description,
  image,
  url,
  priceUSD,
  priceCurrency = "USD",
  availability = "InStock",
  brand = "AtomEons Systems Laboratory",
  category = "Software",
  ratingValue,
  reviewCount,
  sku,
  identifier,
}: Props) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image,
    url,
    brand: {
      "@type": "Brand",
      name: brand,
    },
    category,
    offers: {
      "@type": "Offer",
      url,
      priceCurrency,
      price: priceUSD.toFixed(2),
      availability: `https://schema.org/${availability}`,
      seller: {
        "@type": "Organization",
        name: "AtomEons Systems Laboratory",
        url: "https://atomeons.com",
      },
      itemCondition: "https://schema.org/NewCondition",
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "US",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 30,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
    },
  };

  if (sku) data.sku = sku;
  if (identifier) data.gtin = identifier;

  // Conservative-honest AggregateRating: only include if we actually
  // have review count to anchor it. No fake ratings.
  if (ratingValue !== undefined && reviewCount !== undefined && reviewCount > 0) {
    data.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: ratingValue.toFixed(1),
      reviewCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
