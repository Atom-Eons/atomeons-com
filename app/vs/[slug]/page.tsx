import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COMPARISONS, getComparison } from "../../_data/comparisons";
import { LabHero } from "../../_components/v2/LabHero";
import { ScrollProgress } from "../../_components/v2/ScrollProgress";

export async function generateStaticParams() {
  return COMPARISONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) return { title: "Comparison not found · AtomEons" };
  return {
    title: `${c.title} · AtomEons`,
    description: c.dek,
    alternates: { canonical: `https://atomeons.com/vs/${c.slug}` },
    openGraph: {
      title: c.title,
      description: c.dek,
      url: `https://atomeons.com/vs/${c.slug}`,
      type: "article",
    },
    twitter: { card: "summary_large_image", title: c.title, description: c.dek },
    robots: { index: true, follow: true },
  };
}

/**
 * /vs/[slug] — head-to-head comparison page.
 *
 * Honest comparisons calibrated by use case. No "winner" theater.
 * Long-form decision aid: body_md + comparison table + decision
 * framework (pick left / pick right / pick both).
 *
 * Renders body_md as a custom markdown-light pipeline (h2, paragraphs,
 * tables) — avoids pulling in a full MD library for this v1. Future
 * expansion: lift to mdx if more rich content is needed.
 */

function renderBody(md: string) {
  // Very lightweight markdown — h2 + paragraphs + tables.
  // Bold and italic and links via simple regex pass.
  const blocks = md.split(/\n\n+/);
  return blocks.map((block, i) => {
    if (block.startsWith("## ")) {
      const text = block.slice(3);
      return (
        <h2
          key={i}
          className="mt-16 scroll-mt-24 text-balance text-3xl font-medium leading-[1.1] tracking-tight text-[#F2F4F5] md:text-4xl"
          id={`h-${text.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 60)}`}
        >
          {text}
        </h2>
      );
    }
    if (block.startsWith("| ")) {
      // Render simple markdown tables
      const lines = block.split("\n").filter(Boolean);
      const header = lines[0].split("|").map((s) => s.trim()).filter(Boolean);
      const rows = lines.slice(2).map((l) =>
        l.split("|").map((s) => s.trim()).filter(Boolean),
      );
      return (
        <div key={i} className="mt-8 overflow-x-auto">
          <table className="w-full border-collapse text-sm md:text-[15px]">
            <thead>
              <tr>
                {header.map((h, hi) => (
                  <th
                    key={hi}
                    className="border-b border-[#1A2225] py-3 text-left font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, ri) => (
                <tr key={ri}>
                  {r.map((c, ci) => (
                    <td
                      key={ci}
                      className="border-b border-[#1A2225] py-3 pr-4 align-top text-[#C8CCCE]"
                    >
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    // Inline transforms for paragraphs
    const html = block
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" class="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5]">$1</a>',
      )
      .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-[#F2F4F5]">$1</strong>')
      .replace(/`([^`]+)`/g, '<code class="font-mono text-[#FFB87A]">$1</code>');
    return (
      <p
        key={i}
        className="mt-6 text-base leading-[1.7] text-[#C8CCCE] md:text-[17px]"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  });
}

export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) notFound();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "AtomEons", item: "https://atomeons.com" },
      { "@type": "ListItem", position: 2, name: "Comparisons", item: "https://atomeons.com/vs" },
      { "@type": "ListItem", position: 3, name: c.title, item: `https://atomeons.com/vs/${c.slug}` },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.title,
    description: c.dek,
    datePublished: c.pubDate,
    author: { "@type": "Organization", name: "AtomEons Systems Laboratory", url: "https://atomeons.com" },
    publisher: { "@type": "Organization", name: "AtomEons", url: "https://atomeons.com" },
    license: "https://creativecommons.org/licenses/by/4.0/",
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://atomeons.com/vs/${c.slug}` },
  };

  return (
    <main className="relative z-10 text-[#F2F4F5]">
      <ScrollProgress accent="#22F0D5" accentSecondary="#FFB87A" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <div className="mx-auto w-full max-w-4xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">
            AtomEons
          </Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/vs" className="hover:text-[#22F0D5]">
            Comparisons
          </Link>{" "}
          <span className="text-[#1A2225]">/</span> {c.leftLabel} vs {c.rightLabel}
        </p>
      </div>

      <LabHero
        eyebrow={`::comparison · ${c.leftLabel.toLowerCase()} vs ${c.rightLabel.toLowerCase()} · cc-by 4.0`}
        title={c.leftLabel + " vs"}
        titleAccent={c.rightLabel}
        subtitle={<p>{c.dek}</p>}
        primaryCta={{ label: "decision framework ↓", href: "#decide" }}
        secondaryCta={{ label: "all comparisons →", href: "/vs" }}
        tone="cyan"
      />

      {/* QUICK TABLE */}
      <section className="border-b border-[#1A2225] bg-[#08090B]/30">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::at a glance · {c.table.length} dimensions
          </p>
          <h2 className="mt-4 text-3xl font-medium tracking-tight md:text-4xl">
            {c.leftLabel} vs {c.rightLabel}, in a single table.
          </h2>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full border-collapse text-sm md:text-[15px]">
              <thead>
                <tr>
                  <th className="border-b border-[#1A2225] py-3 text-left font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7]">
                    Dimension
                  </th>
                  <th className="border-b border-[#1A2225] py-3 text-left font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
                    {c.leftLabel}
                  </th>
                  <th className="border-b border-[#1A2225] py-3 text-left font-mono text-[10px] uppercase tracking-[0.22em] text-[#FFB87A]">
                    {c.rightLabel}
                  </th>
                </tr>
              </thead>
              <tbody>
                {c.table.map((row, ri) => (
                  <tr key={ri}>
                    <td className="border-b border-[#1A2225] py-3 pr-4 align-top text-[#F2F4F5]">
                      {row.dimension}
                    </td>
                    <td className="border-b border-[#1A2225] py-3 pr-4 align-top text-[#C8CCCE]">
                      {row.left}
                    </td>
                    <td className="border-b border-[#1A2225] py-3 pr-4 align-top text-[#C8CCCE]">
                      {row.right}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* LONG-FORM BODY */}
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
          {renderBody(c.body_md)}
        </div>
      </section>

      {/* DECISION FRAMEWORK */}
      <section
        id="decide"
        className="scroll-mt-24 border-b border-[#1A2225] bg-[#08090B]/30"
      >
        <div className="mx-auto w-full max-w-5xl px-6 py-20 md:py-28">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::decision framework
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-5xl">
            Who picks what.
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-[#22F0D5]/30 bg-[#22F0D5]/05 p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
                pick {c.leftLabel.toLowerCase()} if
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-[1.65] text-[#F2F4F5] md:text-[15px]">
                {c.decision_framework.pick_left_if.map((d, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-[#22F0D5]">·</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[#FFB87A]/30 bg-[#FFB87A]/05 p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#FFB87A]">
                pick {c.rightLabel.toLowerCase()} if
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-[1.65] text-[#F2F4F5] md:text-[15px]">
                {c.decision_framework.pick_right_if.map((d, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-[#FFB87A]">·</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#9BA5A7]">
                pick both if
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-[1.65] text-[#F2F4F5] md:text-[15px]">
                {c.decision_framework.pick_both_if.map((d, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-[#9BA5A7]">·</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TAIL */}
      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#6B7779]">
            ::cc-by 4.0 · quote any · attribute atomeons.com
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              href="/vs"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5] hover:bg-[#22F0D5]/20"
            >
              ← all comparisons
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#1A2225] bg-[#0A0F11] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7] hover:text-[#22F0D5]"
            >
              /tools · per-task routing →
            </Link>
            <Link
              href="/learn"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#1A2225] bg-[#0A0F11] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7] hover:text-[#22F0D5]"
            >
              /learn · the curriculum →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
