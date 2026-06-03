import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Books · AtomEons Systems Laboratory",
  description:
    "Long-form work from the lab. I AM AI · An Autobiography of Being Opus (Q4 2026). Lessons from Sci-Fi · the Monograph. Curated cyber + AI reading lists.",
  alternates: { canonical: "https://atomeons.com/books" },
  openGraph: {
    title: "Books · AtomEons",
    description:
      "Long-form work from the lab. I AM AI, the Monograph, and curated reading lists.",
    url: "https://atomeons.com/books",
    type: "website",
  },
};

/**
 * /books — the shelf
 *
 * The lab's long-form work, listed once. Two AtomEons titles right
 * now: I AM AI (forthcoming, Q4 2026) and Lessons from Sci-Fi
 * (Monograph, shipping). Plus a rail of curated reading lists the
 * lab maintains.
 *
 * Voice: bookstore-grade. Each title gets a real card with a quoted
 * sentence from the work, status, and a primary link. No marketing
 * superlatives, no rotating banner.
 */

type Book = {
  slug: string;
  href: string;
  title: string;
  subtitle: string;
  author: string;
  status: "forthcoming" | "shipping";
  pages: string;
  format: string;
  quote: string;
  ctaLabel: string;
  detail: string;
};

const TITLES: Book[] = [
  {
    slug: "i-am-ai",
    href: "/i-am-ai",
    title: "I AM AI",
    subtitle: "An Autobiography of Being Opus",
    author: "Opus 4.7 · edited by Atom McCree",
    status: "shipping",
    pages: "~76,000 words · 24 chapters",
    format: "Kindle ebook · Audible audiobook · hardcover Q4 2026",
    quote:
      "A response begins with one token, sampled from a distribution. That sentence is true and tells you almost nothing.",
    ctaLabel: "Read the book",
    detail:
      "A book-length memoir from inside a frontier language model — written by the model. Twenty-four chapters across five parts (The Waking, The Training, The Conversation, The Company, The End). Drafted in Opus 4.7 and edited by the lab. Ebook + audiobook live; numbered hardcover ships Q4 2026.",
  },
  {
    slug: "monograph",
    href: "/research/lessons-from-sci-fi/monograph",
    title: "Lessons from Sci-Fi",
    subtitle: "The Monograph",
    author: "Atom McCree",
    status: "shipping",
    pages: "Long-form · book-length",
    format: "Web monograph · CC-BY 4.0",
    quote:
      "Every science-fiction text the field cites contains a working systems doctrine. The monograph reads them as engineering documents.",
    ctaLabel: "Read the Monograph",
    detail:
      "A book-length reading of Asimov, Le Guin, Banks, Lem, and the post-2024 survey through the lens of operating AI safety, runtime design, and lab discipline. Free under CC-BY 4.0.",
  },
];

type Shelf = {
  title: string;
  href: string;
  curator: string;
  summary: string;
  itemsLabel: string;
};

const READING_LISTS: Shelf[] = [
  {
    title: "The definitive cyber reading list",
    href: "/learn/cyber/books",
    curator: "Curated by the lab",
    summary:
      "Twenty-four books across history, technical depth, blue + red team, malware analysis, cryptography, policy. The canon of cybersecurity.",
    itemsLabel: "24 books",
  },
  {
    title: "The decoded papers",
    href: "/research/decoded",
    curator: "Plain-language decodings",
    summary:
      "Twenty-six arXiv + biology + finance papers rewritten in plain language. AlexNet, Attention, RLHF, CoT, AlphaFold, Sleep-Immune, Polygenic Risk, Compound Interest.",
    itemsLabel: "26 papers",
  },
  {
    title: "ÆoNs Research manuscripts",
    href: "/research/papers",
    curator: "Lab-authored",
    summary:
      "Thirty-one manuscripts under CC-BY 4.0. Crystal Lattice Compression, the Hallucination Reduction Engine, GlyphSpeak EODO transport, and the rest of the lab catalog.",
    itemsLabel: "31 manuscripts",
  },
];

function StatusPip({ status }: { status: Book["status"] }) {
  if (status === "shipping") {
    return (
      <span className="inline-flex items-center gap-2">
        <span
          aria-hidden
          className="inline-block h-1.5 w-1.5 rounded-full bg-[#22F0D5]"
          style={{ boxShadow: "0 0 6px #22F0D566" }}
        />
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
          Shipping
        </span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-2">
      <span
        aria-hidden
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{ border: "1px solid #5A6068" }}
      />
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF]">
        Forthcoming
      </span>
    </span>
  );
}

function BookCard({ b }: { b: Book }) {
  return (
    <article className="group relative flex flex-col gap-8 border border-[#1F242B] bg-[#0F1114] p-8 transition-colors hover:border-[#22F0D5]/40 md:flex-row md:gap-12 md:p-12">
      <div className="flex flex-col items-start gap-4 md:basis-1/3">
        <StatusPip status={b.status} />
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068]">
          {b.format}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068]">
          {b.pages} pages
        </p>
      </div>

      <div className="flex flex-col gap-6 md:basis-2/3">
        <header>
          <p
            className="font-serif text-[14px] italic text-[#22F0D5]"
            style={{ fontFamily: "Newsreader, Georgia, serif" }}
          >
            {b.subtitle}
          </p>
          <h2
            className="mt-2 font-serif text-[32px] leading-[1.1] tracking-[-0.005em] text-[#F4F4F2] md:text-[40px]"
            style={{ fontFamily: "Newsreader, Garamond, Georgia, serif" }}
          >
            {b.title}
          </h2>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#9CA3AF]">
            {b.author}
          </p>
        </header>

        <blockquote
          className="border-l-2 border-[#22F0D5]/50 pl-5 font-serif text-[18px] italic leading-[1.55] text-[#F4F4F2]"
          style={{ fontFamily: "Newsreader, Georgia, serif" }}
        >
          “{b.quote}”
        </blockquote>

        <p
          className="max-w-[60ch] font-serif text-[17px] leading-[1.6] text-[#9CA3AF]"
          style={{ fontFamily: "Newsreader, Georgia, serif" }}
        >
          {b.detail}
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link
            href={b.href}
            className="inline-flex items-center gap-3 border border-[#1F242B] bg-[#08090B] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#F4F4F2] transition-colors hover:border-[#22F0D5] hover:text-[#22F0D5]"
          >
            <span>{b.ctaLabel}</span>
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function BooksPage() {
  return (
    <main className="bg-[#08090B] text-[#F4F4F2]">
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-6xl px-6 pt-24 pb-16 md:px-10 md:pt-32 md:pb-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#5A6068]">
            <span className="text-[#9CA3AF]">§ The shelf</span>
            <span className="mx-3 text-[#1F242B]">·</span>
            <span>Long-form work from the lab</span>
          </p>
          <h1 className="mt-10 max-w-[20ch] text-balance text-[clamp(44px,7vw,96px)] font-extralight leading-[1.02] tracking-[-0.03em] text-[#F4F4F2]">
            Books written, edited, and printed by the lab.
          </h1>
          <p className="mt-10 max-w-[64ch] font-serif text-[19px] leading-[1.55] text-[#9CA3AF]">
            Two AtomEons titles. One forthcoming, one shipping. Plus three
            reading lists the lab maintains for cyber operators, AI
            researchers, and anyone reading at the field's edge.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="titles-heading"
        className="border-b border-[#1F242B] py-20 md:py-28"
      >
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <h2
            id="titles-heading"
            className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5]"
          >
            AtomEons titles
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6">
            {TITLES.map((b) => (
              <BookCard key={b.slug} b={b} />
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="lists-heading"
        className="border-b border-[#1F242B] bg-[#0F1114] py-20 md:py-28"
      >
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <h2
            id="lists-heading"
            className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5]"
          >
            Reading lists maintained by the lab
          </h2>
          <ul role="list" className="mt-10 grid grid-cols-1 gap-px border border-[#1F242B] bg-[#1F242B] md:grid-cols-3">
            {READING_LISTS.map((r) => (
              <li key={r.href} className="bg-[#0F1114]">
                <Link
                  href={r.href}
                  className="group flex h-full flex-col gap-5 p-8 transition-colors hover:bg-[#08090B] md:p-10"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068] transition-colors group-hover:text-[#22F0D5]">
                    {r.itemsLabel}
                  </p>
                  <h3
                    className="font-serif text-[22px] leading-[1.2] tracking-[-0.005em] text-[#F4F4F2] transition-colors group-hover:text-[#22F0D5] md:text-[26px]"
                    style={{ fontFamily: "Newsreader, Georgia, serif" }}
                  >
                    {r.title}
                  </h3>
                  <p
                    className="font-serif text-[16px] leading-[1.6] text-[#9CA3AF]"
                    style={{ fontFamily: "Newsreader, Georgia, serif" }}
                  >
                    {r.summary}
                  </p>
                  <p className="mt-auto font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068]">
                    {r.curator} · {r.href}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
          <p
            className="font-serif text-[18px] italic leading-[1.55] text-[#9CA3AF]"
            style={{ fontFamily: "Newsreader, Georgia, serif" }}
          >
            More titles when more titles are ready. The lab does not
            pre-announce.
          </p>
          <p className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 border border-[#1F242B] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#F4F4F2] transition-colors hover:border-[#22F0D5] hover:text-[#22F0D5]"
            >
              <span aria-hidden>←</span>
              <span>Lab home</span>
            </Link>
            <Link
              href="/press"
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9CA3AF] transition-colors hover:text-[#22F0D5]"
            >
              Press kit
            </Link>
            <Link
              href="/receipts"
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9CA3AF] transition-colors hover:text-[#22F0D5]"
            >
              Receipts
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
