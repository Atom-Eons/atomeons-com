import Link from "next/link";
import { notFound } from "next/navigation";
import { AeMark } from "../../../_components/AeMark";
import { CiteAs } from "../../../_components/research/CiteAs";
import { PAPERS, getPaper } from "../../../_data/research-papers";
import { ScrollProgress } from "../../../_components/v2/ScrollProgress";

export async function generateStaticParams() {
  return PAPERS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const paper = getPaper(slug);
  if (!paper) return { title: "Paper not found — Æ Research" };
  const canonical = `https://atomeons.com/research/papers/${paper.slug}`;
  const ogImageUrl = `${canonical}/opengraph-image`;
  return {
    title: `${paper.title} — Æ Research`,
    description: paper.kid_summary,
    alternates: { canonical },
    openGraph: {
      title: paper.title,
      description: paper.kid_summary,
      url: canonical,
      siteName: "AtomEons · ÆoNs Research",
      type: "article",
      publishedTime: paper.date,
      authors: paper.authors.split(",").map((a) => a.trim()),
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${paper.title} — ÆoNs Research`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: paper.title,
      description: paper.kid_summary,
      images: [ogImageUrl],
      creator: "@AtomMccree",
      site: "@AtomMccree",
    },
  };
}

/**
 * Derive cluster label from slug keywords.
 * Does not modify source data.
 */
function deriveCluster(slug: string): string {
  if (/code|moon|mislabel|sun|coconut/.test(slug)) return "Light Code";
  if (/defect|smds|topological|beyond/.test(slug)) return "Topology";
  if (/spiral|sine/.test(slug)) return "Cognitive";
  return "ÆoNs Research";
}

/**
 * Build a bibtex cite string from paper metadata.
 * The cite key is mccree2026 + slug (hyphens stripped).
 */
function buildBibtex(paper: ReturnType<typeof getPaper>): string {
  if (!paper) return "";
  const key = `mccree2026${paper.slug.replace(/-/g, "")}`;
  return `@article{${key},
  title        = {${paper.title}},
  author       = {${paper.authors}},
  year         = {2026},
  howpublished = {\\AEoNs Research Laboratory, CC-BY 4.0},
  url          = {https://atomeons.com/research/papers/${paper.slug}}
}`;
}

/**
 * Author parsing helpers.
 * Atom McCree → expanded block with AeMark + /research/about link.
 * Claude / GPT / Gemini → compact mono badge.
 * Other humans → compact mono badge.
 */
function AuthorBlock({ authors }: { authors: string }) {
  const names = authors.split(",").map((n) => n.trim());

  return (
    <div className="flex flex-wrap items-center gap-3">
      {names.map((name) => {
        const isAtom = name.toLowerCase().includes("atom mccree");
        const isModel =
          /claude|gpt|gemini|chatgpt/i.test(name);

        if (isAtom) {
          return (
            <Link
              key={name}
              href="/research/about"
              className="group inline-flex items-center gap-2 rounded-xl border border-[#22F0D5]/30 bg-[#08090B] px-4 py-2 transition-colors hover:border-[#22F0D5]/70"
            >
              <AeMark size={16} glow />
              <span className="text-sm font-medium text-[#F2F4F5] group-hover:text-[#22F0D5]">
                {name}
              </span>
            </Link>
          );
        }

        if (isModel) {
          return (
            <span
              key={name}
              className="inline-block rounded border border-[#1A2225] bg-[#0A0F11] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#22F0D5]"
            >
              {name}
            </span>
          );
        }

        return (
          <span
            key={name}
            className="inline-block rounded border border-[#1A2225] bg-[#0A0F11] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]"
          >
            {name}
          </span>
        );
      })}
    </div>
  );
}

export default async function PaperPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const paper = getPaper(slug);
  if (!paper) notFound();

  const idx = PAPERS.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? PAPERS[idx - 1] : null;
  const next = idx < PAPERS.length - 1 ? PAPERS[idx + 1] : null;

  const cluster = deriveCluster(slug);
  const bibtex = buildBibtex(paper);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "AtomEons", item: "https://atomeons.com" },
      { "@type": "ListItem", position: 2, name: "Æ Research", item: "https://atomeons.com/research/about" },
      { "@type": "ListItem", position: 3, name: "Papers", item: "https://atomeons.com/research/papers" },
      {
        "@type": "ListItem",
        position: 4,
        name: paper.title,
        item: `https://atomeons.com/research/papers/${paper.slug}`,
      },
    ],
  };

  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <ScrollProgress accent="#22F0D5" accentSecondary="#FFB87A" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* breadcrumb — enhanced with cluster label */}
      <div className="mx-auto w-full max-w-4xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">
            AtomEons
          </Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/research/papers" className="hover:text-[#22F0D5]">
            Æ Research
          </Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <span className="text-[#22F0D5]">{cluster}</span>{" "}
          <span className="text-[#1A2225]">/</span> {paper.slug}
        </p>
      </div>

      <article className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
        <p className="mb-4 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          <AeMark size={20} glow />
          ::ÆoNs Research · {paper.date}
        </p>
        <h1 className="text-balance text-3xl font-medium leading-tight tracking-[-0.015em] text-[#F2F4F5] md:text-5xl">
          {paper.title}
        </h1>

        {/* author block */}
        <div className="mt-5">
          <AuthorBlock authors={paper.authors} />
        </div>

        {/* meta */}
        <div className="mt-8 grid gap-3 rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-5 font-mono text-[11px] uppercase tracking-[0.18em] text-[#6B7779] md:grid-cols-4">
          <div>
            <p className="text-[9px]">format</p>
            <p className="text-[#F2F4F5]">PDF</p>
          </div>
          <div>
            <p className="text-[9px]">size</p>
            <p className="text-[#F2F4F5]">{(paper.bytes / 1024).toFixed(1)} KB</p>
          </div>
          <div>
            <p className="text-[9px]">status</p>
            <p
              className={
                paper.status === "summarized"
                  ? "text-[#22F0D5]"
                  : "text-[#22F0D5]"
              }
            >
              {paper.status}
            </p>
          </div>
          <div>
            <p className="text-[9px]">license</p>
            <p className="text-[#F2F4F5]">CC-BY 4.0</p>
          </div>
        </div>

        {/* KID SUMMARY */}
        <section className="mt-12 rounded-2xl border border-[#22F0D5]/30 bg-gradient-to-br from-[#08090B] to-[#0A0F11] p-7 md:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
            ::for a six-year-old (or grandma)
          </p>
          <p className="mt-4 text-lg leading-relaxed text-[#F2F4F5] md:text-xl">
            {paper.kid_summary}
          </p>
        </section>

        {/* ACADEMIC SUMMARY */}
        <section className="mt-10 rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-7 md:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
            ::academic abstract
          </p>
          <p className="mt-4 text-base leading-relaxed text-[#9BA5A7] md:text-lg">
            {paper.academic_summary}
          </p>
        </section>

        {/* KEYWORDS */}
        <section className="mt-10">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#6B7779]">
            ::keywords
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {paper.keywords.map((k) => (
              <span
                key={k}
                className="rounded border border-[#1A2225] bg-[#0A0F11] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#22F0D5]"
              >
                {k}
              </span>
            ))}
          </div>
        </section>

        {/* CITE AS */}
        <section className="mt-10">
          <CiteAs bibtex={bibtex} />
        </section>

        {/* CTA — READ THE PDF */}
        <section className="mt-10 rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-7 md:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
            ::full pdf
          </p>
          <p className="mt-3 text-sm text-[#9BA5A7]">
            The complete manuscript with derivations, figures, and references
            lives on Google Drive. Open it in a new tab.
          </p>
          <a
            href={paper.drive_url}
            target="_blank"
            rel="noopener"
            className="mt-5 inline-flex items-center gap-2 rounded-lg border-2 border-[#22F0D5] bg-[#22F0D5] px-6 py-3 text-base font-bold uppercase tracking-wide text-black shadow-[0_0_30px_rgba(34,240,213,0.45)] transition-colors hover:bg-[#5FF7E1]"
          >
            ↗ Open the full PDF
          </a>
        </section>

        {/* PREV / NEXT NAV */}
        <nav className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/research/papers/${prev.slug}`}
              className="group flex flex-col gap-1 rounded-xl border border-[#1A2225] bg-[#0A0F11] p-5 transition-colors hover:border-[#22F0D5]/40 hover:bg-[#0D1518]"
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#6B7779] transition-colors group-hover:text-[#22F0D5]">
                ← previous paper
              </span>
              <span className="mt-1 text-sm font-medium text-[#F2F4F5] leading-snug line-clamp-2">
                {prev.title}
              </span>
            </Link>
          ) : (
            /* placeholder so next stays right-aligned */
            <div />
          )}

          {next ? (
            <Link
              href={`/research/papers/${next.slug}`}
              className="group flex flex-col items-end gap-1 rounded-xl border border-[#1A2225] bg-[#0A0F11] p-5 text-right transition-colors hover:border-[#22F0D5]/40 hover:bg-[#0D1518]"
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#6B7779] transition-colors group-hover:text-[#22F0D5]">
                next paper →
              </span>
              <span className="mt-1 text-sm font-medium text-[#F2F4F5] leading-snug line-clamp-2">
                {next.title}
              </span>
            </Link>
          ) : null}
        </nav>

        {/* back to catalog */}
        <p className="mt-8 text-xs text-[#6B7779]">
          <Link
            href="/research/papers"
            className="text-[#22F0D5] hover:text-[#FFA45A]"
          >
            ← back to all papers
          </Link>
        </p>

        {/* ScholarlyArticle JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ScholarlyArticle",
              headline: paper.title,
              name: paper.title,
              author: paper.authors.split(",").map((a) => ({
                "@type": "Person",
                name: a.trim(),
              })),
              datePublished: paper.date,
              keywords: paper.keywords.join(", "),
              abstract: paper.academic_summary,
              description: paper.kid_summary,
              url: `https://atomeons.com/research/papers/${paper.slug}`,
              sameAs: paper.drive_url,
              license: "https://creativecommons.org/licenses/by/4.0/",
              isAccessibleForFree: true,
              publisher: {
                "@type": "Organization",
                name: "ÆoNs Research Laboratory · AtomEons Systems Laboratory",
                url: "https://atomeons.com/research/about",
                location: {
                  "@type": "Place",
                  name: "Marco Island, FL, USA",
                },
              },
              encoding: {
                "@type": "MediaObject",
                contentUrl: paper.drive_url,
                encodingFormat: "application/pdf",
                contentSize: `${paper.bytes} bytes`,
              },
            }),
          }}
        />
      </article>
    </main>
  );
}
