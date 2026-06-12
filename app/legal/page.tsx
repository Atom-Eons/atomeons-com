import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Legal · AtomEons Systems Laboratory",
  description:
    "Terms, privacy, refunds, pricing law, and the §4A no-SaaS covenant. The whole legal pack in one place.",
  alternates: { canonical: "https://atomeons.com/legal" },
  openGraph: {
    title: "Legal · AtomEons",
    description: "Terms, privacy, refunds, pricing law. The legal pack.",
    url: "https://atomeons.com/legal",
    type: "website",
  },
};

/**
 * /legal — index of every legal surface in the lab
 *
 * Replaces a 404 that was reached from /legal/pricing's parent link.
 * Lists every legal page in the repo with a one-line summary of what
 * each covers. Voice is plain, anti-lawyerese, but precise.
 */

type LegalDoc = {
  href: string;
  title: string;
  summary: string;
  lastReview: string;
};

const DOCS: LegalDoc[] = [
  {
    href: "/legal/terms",
    title: "Terms of use",
    summary:
      "What you may do with the site, the products, the source, and the writings. Includes §4A no-SaaS covenant on Orangebox and B00KMAKR — one purchase, forever, no subscription.",
    lastReview: "2026-05",
  },
  {
    href: "/legal/privacy",
    title: "Privacy",
    summary:
      "What we collect (almost nothing), how it is stored (Supabase service-role only, SHA-256 hashed IPs), what we do not do (no third-party analytics, no cookies on the lab home).",
    lastReview: "2026-05",
  },
  {
    href: "/legal/refund",
    title: "Refunds",
    summary:
      "How returns work on a perpetual-license product. Material-Failure guarantee. 30-day window. No questions if the install does not run.",
    lastReview: "2026-05",
  },
  {
    href: "/legal/pricing",
    title: "Pricing law",
    summary:
      "The dynamic-world pricing rules — how a $99 perpetual product can change price at random, when grandfathering applies, why the launch window is honored.",
    lastReview: "2026-05",
  },
];

export default function LegalIndexPage() {
  return (
    <main className="bg-[#08090B] text-[#F4F4F2]">
      <section className="mx-auto max-w-5xl px-6 pt-24 pb-12 md:px-10 md:pt-32">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#7a818a]">
          <span className="text-[#9CA3AF]">§ Legal pack</span>
        </p>
        <h1 className="mt-8 max-w-[20ch] text-balance text-[clamp(40px,6vw,80px)] font-extralight leading-[1.05] tracking-[-0.03em] text-[#F4F4F2]">
          The whole legal pack, plain.
        </h1>
        <p className="mt-10 max-w-[60ch] font-serif text-[19px] leading-[1.55] text-[#9CA3AF]">
          Four short documents. No multi-page disclaimers. If anything
          here is unclear, write to{" "}
          <a
            href="mailto:a.mccree@gmail.com"
            className="underline decoration-[#22F0D5] decoration-2 underline-offset-[6px]"
          >
            a.mccree@gmail.com
          </a>{" "}
          and the operator will reply within one business day.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24 md:px-10 md:pb-32">
        <ul className="border-t border-[#1F242B]">
          {DOCS.map((doc) => (
            <li key={doc.href} className="border-b border-[#1F242B]">
              <Link
                href={doc.href}
                className="group flex flex-col gap-4 py-10 transition-colors hover:bg-[#0F1114]/60 md:flex-row md:items-baseline md:justify-between md:gap-12 md:py-12"
              >
                <header className="md:basis-1/3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
                    {doc.href}
                  </p>
                  <h2 className="mt-3 font-serif text-[28px] leading-[1.15] tracking-[-0.005em] text-[#F4F4F2] transition-colors group-hover:text-[#22F0D5] md:text-[32px]">
                    {doc.title}
                  </h2>
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#7a818a]">
                    Last reviewed · {doc.lastReview}
                  </p>
                </header>
                <p className="font-serif text-[18px] leading-[1.55] text-[#9CA3AF] md:basis-2/3">
                  {doc.summary}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-16 flex flex-wrap items-center gap-4 border-t border-[#1F242B] pt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-[#1F242B] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#F4F4F2] transition-colors hover:border-[#22F0D5] hover:text-[#22F0D5]"
          >
            <span aria-hidden>←</span>
            <span>Lab home</span>
          </Link>
          <Link
            href="/receipts"
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9CA3AF] transition-colors hover:text-[#22F0D5]"
          >
            Receipts
          </Link>
          <Link
            href="/press"
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9CA3AF] transition-colors hover:text-[#22F0D5]"
          >
            Press kit
          </Link>
        </p>
      </section>
    </main>
  );
}
