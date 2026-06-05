type Organization = {
  /** Legal or display name of the organization (e.g. "AtomEons Systems Laboratory"). */
  name: string;
  /** Canonical homepage URL of the organization. */
  url?: string;
};

type Props = {
  /** Full name of the person (e.g. "Atom McCree"). */
  name: string;
  /** Canonical profile URL for this person (e.g. "https://atomeons.com/about"). */
  url: string;
  /**
   * Authoritative external profiles that disambiguate identity for Google's
   * Knowledge Graph (Wikipedia, X/Twitter, GitHub, LinkedIn, ORCID, etc.).
   * At least one entry is strongly recommended for Rich Results parsing.
   */
  sameAs: string[];
  /** Primary role title (e.g. "Founder", "Independent Researcher"). */
  jobTitle: string;
  /** Employing or affiliated organization. */
  worksFor: Organization;
  /** Optional list of schools or programs the person graduated from. */
  alumniOf?: Organization[];
  /** Absolute URL to a representative headshot or portrait. */
  image?: string;
};

/**
 * Emits a schema.org Person JSON-LD block for the site operator.
 *
 * Targets Google's Rich Results Test expectations: required `name` and `url`,
 * a `sameAs[]` array of authoritative cross-references, and an `affiliation`
 * graph via `worksFor`. Use one instance per page, typically in the root
 * layout or on the about/profile route.
 */
export function Person({
  name,
  url,
  sameAs,
  jobTitle,
  worksFor,
  alumniOf,
  image,
}: Props) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    url,
    jobTitle,
    sameAs,
    worksFor: {
      "@type": "Organization",
      name: worksFor.name,
      ...(worksFor.url ? { url: worksFor.url } : {}),
    },
  };

  if (alumniOf && alumniOf.length > 0) {
    data.alumniOf = alumniOf.map((org) => ({
      "@type": "EducationalOrganization",
      name: org.name,
      ...(org.url ? { url: org.url } : {}),
    }));
  }

  if (image) {
    data.image = image;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}