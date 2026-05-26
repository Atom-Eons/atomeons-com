import type { Metadata } from "next";
import Link from "next/link";
import { OrangeBoxV63Buy } from "../_components/OrangeBoxV63Buy";

/**
 * /pricing — standalone pricing surface.
 *
 * Pulls pricing out of /orangebox into its own discoverable URL. Both
 * AI search and Google traffic land directly on /pricing for queries
 * like "atomeons price", "orangebox cost", "is orangebox subscription".
 * Single source-of-truth for the lab's pricing posture across all
 * products.
 */

export const metadata: Metadata = {
  title: "Pricing — $49 once. No subscription. Ever.",
  description:
    "AtomEons pricing. ORANGEBOX Command: $49 USD once, forever. License §4A legally bans subscription. 30-day Material Failure Guarantee. 30-day Workflow-Fit Refund. Compared to Notion + Linear + Slack + Loom stack ($2,400/yr), Claude Pro + ChatGPT Plus + Cursor + Gemini Advanced ($3,120/yr), part-time PM hire ($52,000/yr), and custom AI cockpit consulting ($40K–$120K).",
  keywords: [
    "AtomEons pricing",
    "ORANGEBOX price",
    "ORANGEBOX cost",
    "$49 AI cockpit",
    "no subscription AI",
    "License §4A",
    "Material Failure Guarantee",
    "30-day refund AI tool",
    "indie AI tool pricing",
  ],
  alternates: { canonical: "https://atomeons.com/pricing" },
  openGraph: {
    title: "Pricing — $49 once, forever · AtomEons",
    description:
      "$49 USD once. License §4A bans subscription. 30-day refund. Source included.",
    url: "https://atomeons.com/pricing",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing — $49 once, forever",
    description:
      "$49 USD once. §4A no-saas lock. 30-day refund. Source included.",
  },
  robots: { index: true, follow: true },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "AtomEons", item: "https://atomeons.com" },
    { "@type": "ListItem", position: 2, name: "Pricing", item: "https://atomeons.com/pricing" },
  ],
};

const COMPARISON = [
  {
    name: "Hire a part-time PM",
    cost: "≈ $52,000 / year",
    detail: "10 h/week at $100/h. Pure labor. Doctrine leaves with the human.",
    accent: "#9BA5A7",
  },
  {
    name: "Custom AI cockpit consulting",
    cost: "$40,000–$120,000",
    detail: "6–9 month build cycle. Doctrine is yours to invent.",
    accent: "#9BA5A7",
  },
  {
    name: "Claude Pro + ChatGPT Plus + Cursor + Gemini Advanced",
    cost: "≈ $3,120 / year",
    detail: "Chat with no project memory, no department routing, no receipts.",
    accent: "#9BA5A7",
  },
  {
    name: "Notion + Linear + Slack + Loom + Cal stack",
    cost: "≈ $2,400 / year",
    detail: "Surface theater. No mission graph. No receipt law.",
    accent: "#9BA5A7",
  },
  {
    name: "ORANGEBOX Command",
    cost: "$49 once · forever",
    detail: "Cockpit + doctrine + skill suite + worker pack. License §4A bans subscription.",
    accent: "#FF7A1A",
  },
];

const FAQS = [
  {
    q: "Is it really $49 once with no recurring fee?",
    a: "Yes. License §4A binds the lab to never switch to subscription. If the lab ever tries, every existing buyer keeps their license free in perpetuity. The clause is in LICENSE.txt shipped with the bundle, enforceable, and published.",
  },
  {
    q: "What about future major versions?",
    a: "Existing buyers receive all v6.x updates as part of the $49 purchase. A future v7 may be a separate ~$49 upgrade SKU, sold at the same price-tier as the original. Subscription is not on the roadmap and never will be — §4A is the lock.",
  },
  {
    q: "Refunds?",
    a: "Two paths, both for 30 days, both full-refund. Material Failure Guarantee (fails to install or launch on a clean machine) and Workflow-Fit Refund (doesn't fit your workflow, no questions asked). See /legal/refund.",
  },
  {
    q: "Are there volume / team discounts?",
    a: "Each ORANGEBOX license is single-operator by design. A team of N buys N licenses. There is no volume discount yet — the price is already at the floor for a real cockpit. If you need 10+ seats at once, email a.mccree@gmail.com directly.",
  },
  {
    q: "Why not free?",
    a: "Because a one-dollar tool is a one-dollar relationship. The price is the floor at which the buyer feels they paid for a real tool and the lab can answer email when they need help. Free is the wrong relationship for an operations cockpit; subscription is a worse one.",
  },
  {
    q: "Will it ever be on sale?",
    a: "No. The price stays $49. Discounts cheapen the trust posture. The launch promo (free first 7 days for the v6.1 cohort) is the only price below $49 that has ever shipped, and it's retired.",
  },
];

const faqPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((qa) => ({
    "@type": "Question",
    name: qa.q,
    acceptedAnswer: { "@type": "Answer", text: qa.a },
  })),
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "ORANGEBOX Command",
  description:
    "The private AI operations cockpit. AE See-Suite + AE Operations. Local-first. Source included. License §4A bans subscription.",
  brand: { "@type": "Brand", name: "AtomEons" },
  offers: {
    "@type": "Offer",
    price: "49",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: "https://atomeons.com/pricing",
    seller: {
      "@type": "Organization",
      name: "AtomEons Systems Laboratory",
      url: "https://atomeons.com",
    },
  },
};

export default function PricingPage() {
  return (
    <main className="relative z-10 text-[#F2F4F5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span> Pricing
        </p>
      </div>

      {/* HERO */}
      <section className="border-b border-[#1A2225] py-24 md:py-32">
        <div className="mx-auto w-full max-w-5xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FF7A1A]">
            ::pricing · one product · one price · forever
          </p>
          <h1 className="mt-6 text-balance text-5xl font-medium leading-[1.02] tracking-[-0.02em] md:text-7xl lg:text-8xl">
            $49 once.
            <br />
            <span className="text-[#FF7A1A]">No subscription. Ever.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-[1.55] text-[#C8CCCE] md:text-xl">
            The lab sells one product through the public site: ORANGEBOX
            Command, the private AI operations cockpit. Forty-nine
            dollars. One operator. Source included. License §4A binds
            the lab to never switch to a subscription model — if we
            ever try, every existing buyer keeps their license free in
            perpetuity.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <OrangeBoxV63Buy />
            <Link
              href="/orangebox"
              className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#9BA5A7] transition-colors hover:text-[#22F0D5]"
            >
              read the product page →
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="border-b border-[#1A2225] bg-[#0e2520]/30 py-24 md:py-32">
        <div className="mx-auto w-full max-w-5xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::what $49 buys
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.08] tracking-tight md:text-5xl">
            One cockpit. Both surfaces. All the receipts.
          </h2>

          <ul className="mt-12 grid gap-4 md:grid-cols-2">
            {[
              ["ORANGEBOX desktop app", "Native Windows 10/11 install. ~10-min setup. No CLI required."],
              ["AE See-Suite + AE Operations", "Command surface (project routes, party-line, proof, receipts, artifacts) + systems surface (setup, model lanes, diagnostics, recovery)."],
              ["AE0–AE14 department routing", "15 named departments + LIPS, MIRRORS, CHECKMATE, ORANGE, MISFITS review-pressure engines."],
              ["Basic Install or AI Box path", "One-computer setup default; optional second-machine handoff for advanced heavy work."],
              ["Full source tree", "Inspect freely. Modify for personal or single-business use. Redistribution not granted."],
              ["Operator Manual + Quickstart", "Written for human operators, not for LLMs. Plus AI Box install guide when you outgrow Basic."],
              ["30-day MFG + Workflow-Fit Refund", "Two parallel full-refund paths inside 30 days."],
              ["License §4A no-SaaS lock", "Binding clause: no subscription, ever, or every buyer keeps free for life."],
            ].map(([title, body]) => (
              <li
                key={title as string}
                className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
                  ✓ included
                </p>
                <p className="mt-3 text-base font-semibold text-[#F2F4F5] md:text-lg">
                  {title}
                </p>
                <p className="mt-2 text-sm leading-[1.6] text-[#C8CCCE]">
                  {body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* COMPARISON LADDER */}
      <section className="border-b border-[#1A2225] py-24 md:py-32">
        <div className="mx-auto w-full max-w-5xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FFB87A]">
            ::comparison ladder · what you would pay otherwise
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.08] tracking-tight md:text-5xl">
            The price ceiling everyone else asks for.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-[1.6] text-[#9BA5A7] md:text-lg">
            Below is what the operator class actually pays for
            equivalent coverage. The cockpit doesn&apos;t replace every
            tool — it replaces the chat-scroll center of gravity and
            adds a doctrine layer the rest of the stack lacks.
          </p>

          <div className="mt-12 overflow-hidden rounded-2xl border border-[#1A2225]">
            {COMPARISON.map((row, i) => (
              <div
                key={row.name}
                className={`grid grid-cols-1 gap-3 bg-[#0A0F11] px-6 py-5 md:grid-cols-[1.6fr_auto_2fr] md:items-center md:gap-8 md:px-8 ${
                  i > 0 ? "border-t border-[#1A2225]" : ""
                } ${row.accent === "#FF7A1A" ? "border-l-2 border-l-[#FF7A1A] bg-[#1C0F08]/40" : ""}`}
              >
                <p className="text-base font-medium md:text-lg" style={{ color: row.accent }}>
                  {row.name}
                </p>
                <p className="font-mono text-sm uppercase tracking-[0.18em] text-[#F2F4F5] md:text-base">
                  {row.cost}
                </p>
                <p className="text-sm leading-[1.6] text-[#9BA5A7]">
                  {row.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-[#1A2225] bg-[#0e2520]/30 py-24 md:py-32">
        <div className="mx-auto w-full max-w-3xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::pricing faq · {FAQS.length} questions
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.08] tracking-tight md:text-5xl">
            Honest pricing FAQ.
          </h2>

          <div className="mt-10 overflow-hidden rounded-2xl border border-[#1A2225]">
            {FAQS.map((f, i) => (
              <details
                key={f.q}
                className={`group bg-[#0A0F11] ${
                  i > 0 ? "border-t border-[#1A2225]" : ""
                }`}
              >
                <summary className="cursor-pointer list-none px-5 py-5 md:px-7">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-base font-medium text-[#F2F4F5] group-hover:text-[#22F0D5] md:text-lg">
                      {f.q}
                    </span>
                    <span className="font-mono text-xs text-[#6B7779] group-open:text-[#22F0D5]">
                      +
                    </span>
                  </div>
                </summary>
                <div className="px-5 pb-6 text-sm leading-[1.7] text-[#C8CCCE] md:px-7 md:text-base">
                  {f.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA TAIL */}
      <section>
        <div className="mx-auto w-full max-w-4xl px-6 py-20 md:py-28">
          <h2 className="text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-5xl">
            One price. One cockpit. The rest of your career.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-[1.6] text-[#C8CCCE] md:text-lg">
            The cockpit is the same on day one and day a thousand. The
            price is the same on day one and day a thousand. The license
            is the same on day one and day a thousand. That&apos;s the
            whole deal.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <OrangeBoxV63Buy />
            <Link
              href="/legal/refund"
              className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#9BA5A7] transition-colors hover:text-[#22F0D5]"
            >
              refund policy →
            </Link>
            <Link
              href="/legal/terms"
              className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#9BA5A7] transition-colors hover:text-[#22F0D5]"
            >
              terms of sale →
            </Link>
            <Link
              href="/support"
              className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#9BA5A7] transition-colors hover:text-[#22F0D5]"
            >
              support →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
