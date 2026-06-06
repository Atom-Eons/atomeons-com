/**
 * HowToJsonLd — Schema.org HowTo.
 *
 * Used on /learn lessons that have explicit numbered steps. Google AI
 * Overview renders HowTo schemas as step-by-step cards in answer
 * boxes, with the steps inline. Higher click-through than plain
 * Article when the user query is procedural.
 *
 * Each step needs name + text. Optional position auto-derived from
 * array index. Optional total time + supply/tool can be passed.
 */

type Step = {
  name: string;
  text: string;
  url?: string;
};

type Props = {
  url: string;
  name: string;
  description: string;
  steps: Step[];
  totalTime?: string;     // ISO 8601 duration, e.g. "PT15M"
  supply?: string[];
  tool?: string[];
  image?: string;
  yield?: string;
};

export function HowToJsonLd({
  url,
  name,
  description,
  steps,
  totalTime,
  supply,
  tool,
  image,
  yield: yieldStr,
}: Props) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": url,
    url,
    name,
    description,
    inLanguage: "en-US",
    license: "https://creativecommons.org/licenses/by/4.0/",
    step: steps.map((s, i) => {
      const step: Record<string, unknown> = {
        "@type": "HowToStep",
        position: i + 1,
        name: s.name,
        text: s.text,
      };
      if (s.url) step.url = s.url;
      return step;
    }),
    author: {
      "@type": "Person",
      name: "Atom McCree",
      url: "https://atomeons.com/about",
    },
    publisher: {
      "@type": "Organization",
      name: "AtomEons Systems Laboratory",
      url: "https://atomeons.com",
    },
  };
  if (totalTime) data.totalTime = totalTime;
  if (supply && supply.length > 0)
    data.supply = supply.map((s) => ({ "@type": "HowToSupply", name: s }));
  if (tool && tool.length > 0)
    data.tool = tool.map((t) => ({ "@type": "HowToTool", name: t }));
  if (image) data.image = image;
  if (yieldStr) data.yield = yieldStr;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
