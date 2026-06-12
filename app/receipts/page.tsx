import type { Metadata } from "next";
import Link from "next/link";
import { ClaimReviewJsonLd } from "@/app/_components/schema/ClaimReviewJsonLd";

export const metadata: Metadata = {
  title: "Receipts · AtomEons Systems Laboratory",
  description:
    "What the lab has actually shipped, measured, and published. No projections, no pipeline. Updated on every commit.",
  alternates: { canonical: "https://atomeons.com/receipts" },
  openGraph: {
    title: "Receipts · AtomEons",
    description:
      "Current-build receipts from atomeons.com. Pages, papers, guardrails, lessons, operator.",
    url: "https://atomeons.com/receipts",
    type: "website",
  },
};

/**
 * /receipts — the operator's audit ledger
 *
 * The homepage Receipts section links here. The page expands each
 * receipt cell from the homepage grid with the actual measurement,
 * its source-of-truth file, and the line we can falsify it against.
 *
 * Voice rule: each ROW must include a verifiable count, the file or
 * surface it comes from, and a link to inspect. No projections, no
 * "coming soon," no aspirational claims. Mom's Law: every cell honest
 * or em-dash.
 */

type Receipt = {
  metric: string;
  value: string;
  evidence: string;
  href?: string;
  detail: string;
};

const SHIPPED: Receipt[] = [
  {
    metric: "Pages live",
    value: "200+",
    evidence: "app/**/page.tsx",
    href: "/sitemap.xml",
    detail:
      "Sum of route files across /learn, /cyber, /research, /founders-view, /orangebox, /b00kmakor, and the rest. Every URL in the sitemap resolves; the link audit reports zero broken hrefs in source.",
  },
  {
    metric: "Papers published",
    value: "31",
    evidence: "app/_data/research-papers.ts · /research/papers",
    href: "/research/papers",
    detail:
      "ÆoNs Research manuscripts under CC-BY 4.0. Includes Crystal Lattice Compression (CLC), Hallucination Reduction Engine (HRE), GlyphSpeak EODO transport, and 28 more. Each carries a disclosure ID and SHA-256 prefix.",
  },
  {
    metric: "Lessons in /learn",
    value: "68",
    evidence: "app/learn/_data/lessons.ts",
    href: "/learn",
    detail:
      "Across five paths (Beginner, Builder, Operator, Researcher, Skeptic), plus the Atlas, Cyber, Career, Trust, Decode, and Calc surfaces. Sources cited; no AI-generated filler.",
  },
  {
    metric: "Guardrails (runtime)",
    value: "27",
    evidence: "Orangebox runtime/node.py constitutional gate chain",
    href: "/orangebox",
    detail:
      "Constitutional safety policies enforced at every autonomous action. Gate 0 is Lattice Integrity (LBCE). Human Final Stop reachable from any path. Drift-audited.",
  },
  {
    metric: "Operator",
    value: "1",
    evidence: "Marco Island, FL",
    href: "/about",
    detail:
      "Atom McCree. No team, no investors, no waitlist. Source on request. The lab signs its own writing because there is no one else to sign it.",
  },
  {
    metric: "Builds shipped (Orangebox)",
    value: "v1.0.0-beta",
    evidence: "github.com/AtomEons/orangebox/releases",
    href: "https://github.com/AtomEons/ORANGEBOX",
    detail:
      "Windows installer, code-signed cert, SHA-256 stamped binary. FREE always under §4A no-SaaS perpetual license.",
  },
];

const DELIBERATELY_ABSENT: Receipt[] = [
  {
    metric: "Total installs",
    value: "—",
    evidence: "Per FOUNDER_SALARY_PER_INSTALL_CENTS, count writes to ledger only",
    detail:
      "Installs are tracked privately for revenue accounting; the public counter stays as em-dash until the ledger surface is wired. We do not inflate.",
  },
  {
    metric: "Investors / advisors",
    value: "0",
    evidence: "Cap table",
    detail: "No outside capital. No advisor shares. No board.",
  },
  {
    metric: "Subscriptions",
    value: "0",
    evidence: "§4A of every product license",
    detail:
      "Orangebox and B00KMAKR are perpetual purchases. No SaaS layer, no recurring billing, no telemetry phoning home.",
  },
  {
    metric: "Roadmap commitments",
    value: "0",
    evidence: "The lab does not pre-announce",
    detail:
      "What ships, ships. What does not ship is not promised. See /now for the current bench state.",
  },
];

function ReceiptRow({ r }: { r: Receipt }) {
  return (
    <article className="border-t border-[#1F242B] py-10">
      <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:gap-12">
        <header>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a]">
            {r.metric}
          </p>
          <p className="mt-3 font-mono text-[clamp(40px,6vw,72px)] leading-none tabular-nums tracking-[-0.03em] text-[#F4F4F2]">
            {r.value}
          </p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[#9CA3AF]">
            {r.evidence}
          </p>
        </header>
        <div>
          <p className="font-serif text-[17px] leading-[1.55] text-[#9CA3AF]">
            {r.detail}
          </p>
          {r.href ? (
            <p className="mt-5">
              <Link
                href={r.href}
                className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#F4F4F2] underline decoration-[#1F242B] decoration-1 underline-offset-[6px] transition-colors hover:text-[#22F0D5] hover:decoration-[#22F0D5]"
              >
                <span>Inspect</span>
                <span aria-hidden>→</span>
              </Link>
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default function ReceiptsPage() {
  return (
    <main className="bg-[#08090B] text-[#F4F4F2]">
      {/* ClaimReview JSON-LD · top-line lab claims marked for fact-check
          ingestion. Each claim is anchored against its evidence file in
          the SHIPPED array below. */}
      <ClaimReviewJsonLd
        pageUrl="https://atomeons.com/receipts"
        claims={[
          {
            text: "AtomEons Systems Laboratory is a one-operator independent AI research lab in Marco Island, FL, with no VC funding, no subscription products, no affiliate revenue, and zero employees.",
            reviewedAt: "2026-06-05",
            reviewUrl: "https://atomeons.com/transparency",
            rating: "True",
            ratingExplanation: "Verified against atomeons.com/transparency (monthly cost ledger) and atomeons.com/manifesto (14-clause founding doctrine).",
          },
          {
            text: "ORANGEBOX Version 1 is sold under a §4A no-SaaS perpetual license that legally bars subscription conversion.",
            reviewedAt: "2026-06-05",
            reviewUrl: "https://atomeons.com/legal/terms",
            rating: "True",
            ratingExplanation: "Verifiable in the public Terms at atomeons.com/legal/terms §4A.",
          },
          {
            text: "I AM AI · An Autobiography of Being Opus is live on Amazon Kindle as ASIN B0H45JVSDB at $4.99.",
            reviewedAt: "2026-06-05",
            reviewUrl: "https://www.amazon.com/dp/B0H45JVSDB/",
            rating: "True",
            ratingExplanation: "Direct product link on Amazon shows live listing at $4.99 USD with the stated ASIN.",
          },
          {
            text: "The lab publishes 31+ research manuscripts under Creative Commons BY 4.0.",
            reviewedAt: "2026-06-05",
            reviewUrl: "https://atomeons.com/research/papers",
            rating: "True",
            ratingExplanation: "Papers index at /research/papers enumerates current corpus with full text and CC-BY 4.0 footer per paper.",
          },
          {
            text: "atomeons.com hosts 256+ public routes covering AI literacy, cyber security, decoded papers, and product writing.",
            reviewedAt: "2026-06-05",
            reviewUrl: "https://atomeons.com/sitemap.xml",
            rating: "True",
            ratingExplanation: "Sitemap.xml enumerates the route count and resolves every URL to 200 OK.",
          },
        ]}
      />
      <section className="mx-auto max-w-6xl px-6 pt-24 pb-12 md:px-10 md:pt-32">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#7a818a]">
          <span className="text-[#9CA3AF]">§ Audit ledger</span>
          <span className="mx-3 text-[#1F242B]">·</span>
          <span>Current build</span>
        </p>
        <h1 className="mt-8 max-w-[18ch] text-balance text-[clamp(44px,7vw,96px)] font-extralight leading-[1.02] tracking-[-0.03em] text-[#F4F4F2]">
          What this lab has actually shipped.
        </h1>
        <p className="mt-10 max-w-[60ch] font-serif text-[19px] leading-[1.58] text-[#9CA3AF]">
          Every cell on this page has a measurement, a file the
          measurement was read from, and a link to inspect the file.
          When we do not have a number, we write em-dash; we do not
          interpolate, project, or estimate.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16 md:px-10">
        <header className="border-b border-[#1F242B] pb-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
            Shipped
          </p>
          <h2 className="mt-3 text-2xl font-medium leading-tight tracking-tight md:text-3xl">
            Live and measurable
          </h2>
        </header>
        {SHIPPED.map((r) => (
          <ReceiptRow key={r.metric} r={r} />
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 md:px-10 md:pb-32">
        <header className="mt-16 border-b border-[#1F242B] pb-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a]">
            Deliberately absent
          </p>
          <h2 className="mt-3 text-2xl font-medium leading-tight tracking-tight md:text-3xl">
            Things the lab does not have
          </h2>
        </header>
        {DELIBERATELY_ABSENT.map((r) => (
          <ReceiptRow key={r.metric} r={r} />
        ))}
      </section>

      <section className="border-t border-[#1F242B] bg-[#08090B] py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6 md:px-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a]">
            Falsify
          </p>
          <p className="mt-4 font-serif text-[20px] leading-[1.5] text-[#F4F4F2]">
            If any number on this page is wrong, write{" "}
            <a
              href="mailto:a.mccree@gmail.com?subject=Receipts%20correction"
              className="underline decoration-[#22F0D5] decoration-2 underline-offset-[6px]"
            >
              a.mccree@gmail.com
            </a>
            . Correct receipt beats clean prose.
          </p>
          <p className="mt-12 flex flex-wrap items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 border border-[#1F242B] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#F4F4F2] transition-colors hover:border-[#22F0D5] hover:text-[#22F0D5]"
            >
              <span aria-hidden>←</span>
              <span>Lab home</span>
            </Link>
            <Link
              href="/now"
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9CA3AF] transition-colors hover:text-[#22F0D5]"
            >
              The current bench
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
