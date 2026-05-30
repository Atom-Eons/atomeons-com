import type { Metadata } from "next";
import Link from "next/link";
import { GLOSSARY } from "../_data/glossary";
import { LabHero } from "../_components/v2/LabHero";
import { LabSection } from "../_components/v2/LabSection";

/**
 * /glossary — the plain-English AI vocabulary as a standalone surface.
 *
 * Promoted from inside /start so it's a discoverable, citable, AI-
 * search-indexable reference on its own.
 *
 * Voice: one-line definitions, no condescension, no jargon-on-jargon.
 * A 14-year-old understands every entry. A 60-year-old does not feel
 * talked down to.
 *
 * Structure:
 *   - LabHero — mission framing
 *   - Anchored alphabetical grid · click any term to scroll to its card
 *   - Each term: term (large), short (one phrase), body (one sentence),
 *     anchor link to copy a shareable url
 *   - DefinedTermSet JSON-LD for ingestion
 *
 * CC-BY 4.0. Quote any. Translate any. Adapt any.
 */

const TOTAL = GLOSSARY.length;

export const metadata: Metadata = {
  title: `Glossary · ${TOTAL} AI terms in plain English · AtomEons`,
  description: `Every word the AI industry uses, in one-sentence plain-English definitions. ${TOTAL} terms · LLM, prompt, hallucination, token, context window, agent, MCP, RAG, RLHF, embedding, chain-of-thought, few-shot, fine-tuning, multimodal, jailbreak, AGI, and the rest. No condescension, no hype. CC-BY 4.0.`,
  keywords: [
    "AI glossary",
    "AI terms plain English",
    "what is LLM",
    "what is prompt",
    "what is hallucination",
    "AI vocabulary",
    "AI dictionary",
    "AI definitions",
    "MCP definition",
    "RAG definition",
    "RLHF definition",
    "context window definition",
    "AGI definition",
    "AtomEons glossary",
  ],
  alternates: { canonical: "https://atomeons.com/glossary" },
  openGraph: {
    title: `AI Glossary · ${TOTAL} terms · plain English · AtomEons`,
    description: `One-sentence definitions for every word the AI industry uses. ${TOTAL} terms. CC-BY 4.0. No signup.`,
    url: "https://atomeons.com/glossary",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `AtomEons AI Glossary`,
    description: `${TOTAL} AI terms in plain English · CC-BY 4.0`,
  },
  robots: { index: true, follow: true },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "AtomEons",
      item: "https://atomeons.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Glossary",
      item: "https://atomeons.com/glossary",
    },
  ],
};

// DefinedTermSet — the canonical schema.org type for a glossary.
const definedTermSetJsonLd = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "AtomEons AI Glossary",
  url: "https://atomeons.com/glossary",
  description: `${TOTAL} AI terms in plain English. CC-BY 4.0.`,
  license: "https://creativecommons.org/licenses/by/4.0/",
  inDefinedTermSet: GLOSSARY.map((e) => ({
    "@type": "DefinedTerm",
    name: e.term,
    description: e.body,
    alternateName: e.short,
    url: `https://atomeons.com/glossary#${e.slug}`,
    inDefinedTermSet: "https://atomeons.com/glossary",
  })),
};

export default function GlossaryPage() {
  // Sort alphabetically by term for the index.
  const sorted = [...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term));

  // Build A–Z anchor index.
  const letterMap: Record<string, typeof GLOSSARY> = {};
  for (const e of sorted) {
    const letter = e.term[0]?.toUpperCase() ?? "#";
    if (!letterMap[letter]) letterMap[letter] = [];
    letterMap[letter].push(e);
  }
  const letters = Object.keys(letterMap).sort();

  return (
    <main className="relative z-10 text-[#F2F4F5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(definedTermSetJsonLd),
        }}
      />

      {/* breadcrumb */}
      <div className="mx-auto w-full max-w-5xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">
            AtomEons
          </Link>{" "}
          <span className="text-[#1A2225]">/</span> Glossary
        </p>
      </div>

      <LabHero
        eyebrow={`::glossary · ${TOTAL} terms · plain english · cc-by 4.0`}
        title="Every AI word,"
        titleAccent="in plain English."
        subtitle={
          <p>
            One sentence per term. No condescension. No jargon-on-jargon.
            Built so a 14-year-old understands every entry and a 60-year-old
            doesn&apos;t feel talked down to. Quote any of them — CC-BY 4.0.
          </p>
        }
        tone="cyan"
      >
        {/* A-Z index */}
        <div className="flex flex-wrap gap-2">
          {letters.map((L) => (
            <a
              key={L}
              href={`#letter-${L}`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#22F0D5]/30 bg-[#22F0D5]/05 font-mono text-sm font-semibold text-[#22F0D5] transition-all hover:border-[#22F0D5] hover:bg-[#22F0D5]/15"
            >
              {L}
            </a>
          ))}
        </div>
      </LabHero>

      {/* TERMS by letter */}
      {letters.map((L, li) => (
        <LabSection
          key={L}
          id={`letter-${L}`}
          eyebrow={`::${L.toLowerCase()} · ${letterMap[L].length} term${letterMap[L].length === 1 ? "" : "s"}`}
          variant={li % 2 === 0 ? "default" : "tint"}
          maxWidth="5xl"
        >
          <div className="grid gap-5 md:grid-cols-2">
            {letterMap[L].map((e) => (
              <article
                key={e.slug}
                id={e.slug}
                className="scroll-mt-24 rounded-3xl bg-gradient-to-br from-[#0A0F11] to-[#0E1418] p-7 md:p-8 transition-all hover:shadow-[0_0_60px_rgba(34,240,213,0.08)]"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="text-2xl font-semibold tracking-tight text-[#F2F4F5] md:text-3xl">
                    {e.term}
                  </h2>
                  <a
                    href={`#${e.slug}`}
                    className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779] transition-colors hover:text-[#22F0D5]"
                    aria-label={`Copy link to ${e.term}`}
                  >
                    #
                  </a>
                </div>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
                  {e.short}
                </p>
                <p className="mt-5 text-base leading-[1.65] text-[#C8CCCE] md:text-[17px]">
                  {e.body}
                </p>
              </article>
            ))}
          </div>
        </LabSection>
      ))}

      {/* CTA */}
      <LabSection
        variant="raised"
        eyebrow="::missed a term"
        title="Don't see a word you keep hearing?"
        subtitle={
          <p>
            Send the term and we&apos;ll add it. One human, ~2-hour reply
            in ET waking hours. The glossary grows from real questions,
            not from a Twitter trend list.
          </p>
        }
        align="center"
        maxWidth="4xl"
      >
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="mailto:a.mccree@gmail.com?subject=Glossary%20term%20to%20add&body=The%20term%20I%20keep%20hearing%20but%20do%20not%20see%20in%20the%20glossary%3A%20%5Bterm%5D%0A%0AContext%20I%20saw%20it%20in%3A%20%5Bcontext%5D"
            className="inline-flex items-center gap-2 rounded-full bg-[#22F0D5] px-7 py-3.5 font-mono text-[12px] font-semibold uppercase tracking-[0.28em] text-[#0B1014] shadow-[0_0_60px_rgba(34,240,213,0.30)] transition-all hover:bg-[#7DDBC8]"
          >
            send the term →
          </a>
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/30 bg-transparent px-6 py-3 font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] transition-all hover:border-[#22F0D5] hover:bg-[#22F0D5]/10"
          >
            the full curriculum · /learn →
          </Link>
        </div>
      </LabSection>
    </main>
  );
}
