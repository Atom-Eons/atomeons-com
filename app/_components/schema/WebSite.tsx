/**
 * WebSite schema.org JSON-LD emitter.
 *
 * Emits a <script type="application/ld+json"> tag describing the site as a
 * schema.org/WebSite. The primary purpose is to expose a SearchAction
 * (potentialAction) so Google can render a Sitelinks Search Box in SERPs.
 *
 * Reference: https://schema.org/WebSite
 * Sitelinks Search Box: https://developers.google.com/search/docs/appearance/sitelinks-search-box
 *
 * The `target` template MUST contain exactly one `{search_term_string}`
 * placeholder, e.g. "https://example.com/search?q={search_term_string}".
 */

type SearchActionTarget = {
  /**
   * URL template containing `{search_term_string}` placeholder.
   * Example: "https://atomeons.com/search?q={search_term_string}"
   */
  urlTemplate: string;
};

type PotentialAction = {
  /** Target URL template (string shorthand or EntryPoint object). */
  target: string | SearchActionTarget;
  /**
   * Query input variable name. Google requires the literal string:
   * "required name=search_term_string".
   */
  queryInput?: string;
};

type Props = {
  /** Canonical URL of the site (homepage). e.g. "https://atomeons.com". */
  url: string;
  /** Site name. e.g. "AtomEons". */
  name: string;
  /** SearchAction config — the whole point of emitting WebSite for SEO. */
  potentialAction: PotentialAction;
  /** Alternate / informal name(s). e.g. "AtomEons Systems Laboratory". */
  alternateName?: string | string[];
  /** Short site description for richer panels. */
  description?: string;
  /** Publisher/owner URLs (Wikipedia, social, Crunchbase, etc.). */
  sameAs?: string[];
  /** Primary site language as a BCP-47 tag. e.g. "en-US". */
  inLanguage?: string;
  /** Site launch date (ISO 8601). */
  datePublished?: string;
  /** Last meaningful update date (ISO 8601). */
  dateModified?: string;
  /** Publisher @id reference if a separate Organization node exists on the page. */
  publisherId?: string;
};

/**
 * Renders a schema.org/WebSite JSON-LD block including a SearchAction
 * potentialAction so Google can surface the Sitelinks Search Box.
 *
 * Place once in the root layout (<head> or top of <body>) — not per page.
 */
export function WebSite({
  url,
  name,
  potentialAction,
  alternateName,
  description,
  sameAs,
  inLanguage,
  datePublished,
  dateModified,
  publisherId,
}: Props) {
  const targetTemplate =
    typeof potentialAction.target === "string"
      ? potentialAction.target
      : potentialAction.target.urlTemplate;

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url,
    name,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: targetTemplate,
      },
      // Google requires this exact "required name=" prefix on the query input.
      "query-input":
        potentialAction.queryInput ?? "required name=search_term_string",
    },
  };

  if (alternateName !== undefined) data.alternateName = alternateName;
  if (description !== undefined) data.description = description;
  if (sameAs !== undefined && sameAs.length > 0) data.sameAs = sameAs;
  if (inLanguage !== undefined) data.inLanguage = inLanguage;
  if (datePublished !== undefined) data.datePublished = datePublished;
  if (dateModified !== undefined) data.dateModified = dateModified;
  if (publisherId !== undefined) data.publisher = { "@id": publisherId };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}