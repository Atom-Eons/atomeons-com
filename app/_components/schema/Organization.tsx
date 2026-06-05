type ContactPoint = {
  /** Telephone number in E.164 format, e.g. "+1-555-555-5555". */
  telephone?: string;
  /** Email address for this contact point. */
  email?: string;
  /**
   * Contact role per schema.org ContactType vocabulary.
   * Common values: "customer support", "sales", "technical support", "press inquiries".
   */
  contactType: string;
  /** ISO 639-1 language codes this contact point supports, e.g. ["en", "es"]. */
  availableLanguage?: string[];
  /** Geographic area served, e.g. ["US", "CA"] or "Worldwide". */
  areaServed?: string | string[];
  /** Optional URL for the contact form or support page. */
  url?: string;
};

type Founder = {
  /** Full name of the founder. */
  name: string;
  /** Canonical URL for the founder (personal site, Wikipedia, etc.). */
  url?: string;
  /** Job title at founding, e.g. "Founder & Principal Researcher". */
  jobTitle?: string;
  /** sameAs URLs for the founder (Wikipedia, LinkedIn, ORCID, etc.). */
  sameAs?: string[];
};

type Props = {
  /** Legal or trading name of the organization. */
  name: string;
  /** Canonical homepage URL (absolute, https). */
  url: string;
  /** Absolute URL to a square logo image (PNG/SVG, min 112x112 per Google). */
  logo: string;
  /** Authoritative external profiles: Wikipedia, X, LinkedIn, GitHub, Crunchbase, etc. */
  sameAs?: string[];
  /** One or more contact points exposed to search engines. */
  contactPoint?: ContactPoint | ContactPoint[];
  /** Primary founder. Use `founders` for multiple. */
  founder?: Founder;
  /** Multiple founders, if applicable. Overrides `founder` when provided. */
  founders?: Founder[];
  /** ISO 8601 date the organization was founded, e.g. "2024-01-15". */
  foundingDate?: string;
  /** Short one-line description for knowledge-panel use. */
  description?: string;
  /** Slogan or tagline. */
  slogan?: string;
  /** Legal name if different from `name`. */
  legalName?: string;
  /** Alternate name / DBA. */
  alternateName?: string;
  /** Email for general inquiries (mirrors a contactPoint but accepted at root by Google). */
  email?: string;
  /** Telephone for general inquiries in E.164. */
  telephone?: string;
};

/**
 * Emits a schema.org Organization JSON-LD <script> tag.
 *
 * Use once per site (typically in the root layout) to declare the publishing
 * organization. Google's Rich Results Test treats `name`, `url`, `logo`,
 * and `sameAs[]` as the primary signals for knowledge-panel eligibility.
 */
export function Organization({
  name,
  url,
  logo,
  sameAs,
  contactPoint,
  founder,
  founders,
  foundingDate,
  description,
  slogan,
  legalName,
  alternateName,
  email,
  telephone,
}: Props) {
  const serializeFounder = (f: Founder) => ({
    "@type": "Person",
    name: f.name,
    ...(f.url && { url: f.url }),
    ...(f.jobTitle && { jobTitle: f.jobTitle }),
    ...(f.sameAs && f.sameAs.length > 0 && { sameAs: f.sameAs }),
  });

  const serializeContactPoint = (cp: ContactPoint) => ({
    "@type": "ContactPoint",
    contactType: cp.contactType,
    ...(cp.telephone && { telephone: cp.telephone }),
    ...(cp.email && { email: cp.email }),
    ...(cp.url && { url: cp.url }),
    ...(cp.availableLanguage && { availableLanguage: cp.availableLanguage }),
    ...(cp.areaServed && { areaServed: cp.areaServed }),
  });

  const resolvedFounders = founders ?? (founder ? [founder] : undefined);

  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo: {
      "@type": "ImageObject",
      url: logo,
    },
    ...(legalName && { legalName }),
    ...(alternateName && { alternateName }),
    ...(description && { description }),
    ...(slogan && { slogan }),
    ...(foundingDate && { foundingDate }),
    ...(email && { email }),
    ...(telephone && { telephone }),
    ...(sameAs && sameAs.length > 0 && { sameAs }),
    ...(contactPoint && {
      contactPoint: Array.isArray(contactPoint)
        ? contactPoint.map(serializeContactPoint)
        : serializeContactPoint(contactPoint),
    }),
    ...(resolvedFounders && resolvedFounders.length > 0 && {
      founder:
        resolvedFounders.length === 1
          ? serializeFounder(resolvedFounders[0])
          : resolvedFounders.map(serializeFounder),
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}