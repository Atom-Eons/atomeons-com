type FAQItem = {
  question: string;
  answer: string;
};

type Props = {
  items: FAQItem[];
  inLanguage?: string;
  datePublished?: string;
  dateModified?: string;
  about?: string;
  sameAs?: string[];
};

/**
 * FAQPage emits a schema.org FAQPage JSON-LD block with a mainEntity[] of
 * Question / Answer pairs. Drop into /faq, /press, product pages, or any
 * route that surfaces canonical Q&A. Matches Google Rich Results Test
 * expectations: each Question carries a name, each acceptedAnswer is a
 * single Answer with text. Pass datePublished + dateModified (ISO 8601)
 * to qualify for fresh-content signals; pass sameAs[] to link the page
 * to authoritative external references (Wikipedia, docs, social).
 */
export function FAQPage({
  items,
  inLanguage,
  datePublished,
  dateModified,
  about,
  sameAs,
}: Props) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  if (inLanguage) {
    data.inLanguage = inLanguage;
  }
  if (datePublished) {
    data.datePublished = datePublished;
  }
  if (dateModified) {
    data.dateModified = dateModified;
  }
  if (about) {
    data.about = {
      "@type": "Thing",
      name: about,
    };
  }
  if (sameAs && sameAs.length > 0) {
    data.sameAs = sameAs;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}