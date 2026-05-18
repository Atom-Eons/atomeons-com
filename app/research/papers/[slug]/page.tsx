import Link from "next/link";
import { notFound } from "next/navigation";
import { AeMark } from "../../../_components/AeMark";
import { PAPERS, getPaper } from "../../../_data/research-papers";

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

export default async function PaperPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const paper = getPaper(slug);
  if (!paper) notFound();

  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <div className="mx-auto w-full max-w-4xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">
            AtomEons
          </Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/research/papers" className="hover:text-[#22F0D5]">
            Æ Research
          </Link>{" "}
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
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-[#6B7779]">
          {paper.authors}
        </p>

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
                  : "text-[#FF7A1A]"
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
        <section className="mt-12 rounded-2xl border border-[#22F0D5]/30 bg-gradient-to-br from-[#04100d] to-[#0A0F11] p-7 md:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
            ::for a six-year-old (or grandma)
          </p>
          <p className="mt-4 text-lg leading-relaxed text-[#F2F4F5] md:text-xl">
            {paper.kid_summary}
          </p>
        </section>

        {/* ACADEMIC SUMMARY */}
        <section className="mt-10 rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-7 md:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#FF7A1A]">
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

        {/* CTA — READ THE PDF */}
        <section className="mt-12 rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-7 md:p-10">
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

        <p className="mt-10 text-xs text-[#6B7779]">
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
