import type { Metadata } from "next";
import Link from "next/link";
import { COMPARISONS } from "../_data/comparisons";
import { LabHero } from "../_components/v2/LabHero";

export const metadata: Metadata = {
  title: `Comparisons · ${COMPARISONS.length} honest AI head-to-heads · AtomEons`,
  description: `${COMPARISONS.length} long-form AI comparisons calibrated by use case — no leaderboard winner. Claude vs ChatGPT · Cloud vs Local · Subscription vs One-time license. Each page has the at-a-glance table, the 1500-word analysis, and the decision framework. CC-BY 4.0.`,
  alternates: { canonical: "https://atomeons.com/vs" },
  openGraph: {
    title: "AtomEons /vs — honest AI comparisons",
    description: `${COMPARISONS.length} long-form comparisons · no fake winner · CC-BY 4.0`,
    url: "https://atomeons.com/vs",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "AtomEons", item: "https://atomeons.com" },
    { "@type": "ListItem", position: 2, name: "Comparisons", item: "https://atomeons.com/vs" },
  ],
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "AtomEons /vs — honest AI comparisons",
  itemListOrder: "https://schema.org/ItemListOrderAscending",
  numberOfItems: COMPARISONS.length,
  itemListElement: COMPARISONS.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.title,
    url: `https://atomeons.com/vs/${c.slug}`,
  })),
};

export default function VsIndex() {
  return (
    <main className="relative z-10 text-[#F2F4F5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">
            AtomEons
          </Link>{" "}
          <span className="text-[#1A2225]">/</span> Comparisons
        </p>
      </div>

      <LabHero
        eyebrow={`::comparisons · ${COMPARISONS.length} honest head-to-heads · cc-by 4.0`}
        title="Calibrated by"
        titleAccent="the work."
        subtitle={
          <p>
            {COMPARISONS.length} long-form AI comparisons. No leaderboard
            winner theater. Each page carries the at-a-glance table, the
            1500-word analysis, and a 3-column decision framework
            (pick left · pick right · pick both). Skip the sponsored
            content. Pick by the work you actually do.
          </p>
        }
        primaryCta={{ label: "browse comparisons ↓", href: "#list" }}
        tone="cyan"
      />

      <section
        id="list"
        className="scroll-mt-24 border-b border-[#1A2225] py-20 md:py-28"
      >
        <div className="mx-auto w-full max-w-4xl px-6">
          <ul className="space-y-5">
            {COMPARISONS.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/vs/${c.slug}`}
                  className="group block rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 transition-colors hover:border-[#22F0D5]/40 md:p-7"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h2 className="text-xl font-semibold text-[#F2F4F5] group-hover:text-[#22F0D5] md:text-2xl">
                      {c.title}
                    </h2>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7]">
                      {c.leftLabel} vs {c.rightLabel}
                    </p>
                  </div>
                  <p className="mt-3 text-sm leading-[1.65] text-[#C8CCCE] md:text-base">
                    {c.dek}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
                    <span>{c.table.length} table rows</span>
                    <span>·</span>
                    <span>
                      decision framework: {c.decision_framework.pick_left_if.length + c.decision_framework.pick_right_if.length + c.decision_framework.pick_both_if.length} criteria
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-12 text-base leading-[1.7] text-[#9BA5A7] md:text-lg">
            More comparisons coming. If there&apos;s a head-to-head you
            want honest analysis on,{" "}
            <a
              href="mailto:a.mccree@gmail.com?subject=%2Fvs%20comparison%20request"
              className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5]"
            >
              send the question
            </a>
            . One operator. ~2-hour reply in ET waking hours.
          </p>
        </div>
      </section>
    </main>
  );
}
