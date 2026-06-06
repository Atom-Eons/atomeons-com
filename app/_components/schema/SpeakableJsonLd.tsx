/**
 * SpeakableJsonLd — tells voice assistants (Google Assistant, Alexa,
 * Siri Read-Aloud) which CSS selectors are meant to be read aloud.
 *
 * Schema.org SpeakableSpecification spec:
 *   https://schema.org/SpeakableSpecification
 *
 * Pattern: wrap the page's short-answer paragraph in a class like
 *   <p className="speakable-answer">…</p>
 * Then drop <SpeakableJsonLd /> at the top of the page. The selector
 * defaults to ".speakable-answer" which matches the convention.
 *
 * Voice search ingestion (Google AI Overview voice mode in particular)
 * preferentially reads SpeakableSpecification-tagged content.
 */

type Props = {
  url: string;
  name: string;
  cssSelectors?: string[];
  description?: string;
};

export function SpeakableJsonLd({
  url,
  name,
  cssSelectors = [".speakable-answer"],
  description,
}: Props) {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    name,
    url,
    description,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: cssSelectors,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
