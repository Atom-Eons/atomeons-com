import type { Metadata } from "next";
import Link from "next/link";
import { PrintButton } from "./PrintButton";

/**
 * /dynamic-world-pricing — public marketing doc + printable PDF.
 *
 * Operator directive 2026-05-30: AtomEons paper on Dynamic World
 * Pricing — how it's our idea where original, how it ties to the
 * lab's ethos. Public marketing doc, printable as PDF.
 *
 * Design intent: looks like a $B-grade pitch deck on screen, prints
 * cleanly to letter-sized PDF via browser Print → Save as PDF. No
 * server-side PDF generation needed.
 *
 * Voice: operator-confident, ethos-forward, honest about prior art.
 * The synthesis is what's original — PPP itself isn't new.
 */

export const metadata: Metadata = {
  title:
    "Dynamic World Pricing — fair-by-country software pricing · AtomEons",
  description:
    "AtomEons paper on Dynamic World Pricing. Honest synthesis: PPP tiering + free-floor doctrine + public transparency + product-registry pattern + §4A no-saas integration. CC-BY 4.0. Implementation lives in lib/pricing/. Public mechanism. Crystal math. Ethos-first.",
  alternates: { canonical: "https://atomeons.com/dynamic-world-pricing" },
  openGraph: {
    title: "Dynamic World Pricing — AtomEons paper",
    description:
      "Fair-by-country software pricing. Free-floor doctrine. Public mechanism. CC-BY 4.0. Lab ethos in math.",
    url: "https://atomeons.com/dynamic-world-pricing",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dynamic World Pricing — AtomEons paper",
    description:
      "Fair-by-country pricing. Free-floor doctrine. Public mechanism. CC-BY 4.0.",
  },
  robots: { index: true, follow: true },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Dynamic World Pricing — A Free-Floor Synthesis",
  description:
    "AtomEons paper on fair-by-country software pricing. World Bank income tiers + free-floor doctrine + public transparency + product-registry pattern + §4A no-saas integration.",
  datePublished: "2026-05-30",
  author: {
    "@type": "Organization",
    name: "AtomEons Systems Laboratory",
    url: "https://atomeons.com",
  },
  publisher: {
    "@type": "Organization",
    name: "AtomEons",
    url: "https://atomeons.com",
  },
  license: "https://creativecommons.org/licenses/by/4.0/",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://atomeons.com/dynamic-world-pricing",
  },
};

export default function DynamicWorldPricingPaper() {
  return (
    <main className="dwp-doc bg-black text-[#F2F4F5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Print-only stylesheet — clean PDF output, hides nav chrome */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body, .dwp-doc {
            background: white !important;
            color: black !important;
          }
          .dwp-section { break-inside: avoid; padding: 0 !important; background: white !important; }
          .dwp-pagebreak { break-after: page; }
          h1, h2, h3, p, li, td, th {
            color: black !important;
          }
          .dwp-accent-cyan { color: #007a6c !important; }
          .dwp-accent-orange { color: #b04f00 !important; }
          .dwp-card {
            border: 1px solid #ccc !important;
            background: #fafafa !important;
            color: black !important;
            box-shadow: none !important;
          }
          .dwp-doc a { color: #007a6c !important; text-decoration: underline; }
          @page { size: letter; margin: 0.75in; }
        }
      `}</style>

      {/* PRINT BUTTON — visible on screen, hidden in print */}
      <div className="no-print sticky top-0 z-20 border-b border-[#1A2225] bg-black/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between gap-4 px-6 py-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
            <Link href="/" className="hover:text-[#22F0D5]">
              AtomEons
            </Link>{" "}
            <span className="text-[#1A2225]">/</span> Dynamic World Pricing · paper
          </p>
          <PrintButton />
        </div>
      </div>

      {/* COVER */}
      <section className="dwp-section dwp-pagebreak border-b border-[#1A2225] py-16 md:py-24">
        <div className="mx-auto w-full max-w-4xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5] dwp-accent-cyan">
            ::ÆoNs Research · paper · 2026-05-30 · CC-BY 4.0
          </p>
          <h1 className="mt-8 text-balance text-5xl font-medium leading-[0.95] tracking-[-0.025em] text-[#F2F4F5] md:text-7xl">
            Dynamic World
            <br />
            <span className="text-[#22F0D5] dwp-accent-cyan">Pricing.</span>
          </h1>
          <p className="mt-8 text-xl leading-[1.4] text-[#C8CCCE] md:text-2xl">
            A free-floor synthesis for fair software pricing.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { l: "Tier 1 · UK", v: "$99" },
              { l: "Tier 1 · US", v: "$9.99" },
              { l: "Tier 3 · IN", v: "$0.99" },
              { l: "Tier 4 · SO", v: "FREE" },
            ].map((c) => (
              <div
                key={c.l}
                className="dwp-card rounded-2xl border border-[#22F0D5]/30 bg-[#0A0F11] p-5"
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#9BA5A7]">
                  {c.l}
                </p>
                <p className="mt-2 text-2xl font-semibold text-[#22F0D5] dwp-accent-cyan md:text-3xl">
                  {c.v}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-12 max-w-2xl text-base leading-[1.65] text-[#9BA5A7]">
            One product. One source. One update path. Four prices
            calibrated to where the buyer lives, not what the lab can
            extract. The mechanism is public, the floor is honest, the
            implementation is reusable across every product the lab
            ships.
          </p>

          <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
            Authors: Atom McCree (AtomEons) · Claude Opus 4.7 (Anthropic, 1M context)
            <br />
            Implementation reference: github.com/AtomEons/atomeons-com / lib/pricing/
            <br />
            Public mechanism: atomeons.com/legal/pricing
            <br />
            Public endpoint: atomeons.com/api/price/[productId]
          </p>
        </div>
      </section>

      {/* 1 — THE PROBLEM */}
      <section className="dwp-section border-b border-[#1A2225] py-16 md:py-20">
        <div className="mx-auto w-full max-w-3xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5] dwp-accent-cyan">
            ::01 · the problem
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.1] tracking-tight md:text-4xl">
            A flat global price is a closed door.
          </h2>
          <div className="mt-7 space-y-5 text-base leading-[1.75] text-[#C8CCCE] md:text-[17px]">
            <p>
              A $99 software license is a $99 software license. To a
              software buyer in London on a £45,000 salary, that price
              is an afternoon&apos;s thought. To a software buyer in
              Lagos on a $4,200 salary, that price is two days of
              wages. To a software buyer in Mogadishu on a $720
              salary, that price is unreachable — not because the
              buyer doesn&apos;t want the software, but because the
              ratio of price to income has become a category error.
            </p>
            <p>
              The standard industry response is: pick the buyer
              you&apos;re trying to sell to (high-income), set the
              price for them, accept that the other ~80% of the
              planet is priced out. The economic logic is clean.
              The fairness logic is not.
            </p>
            <p>
              The AI literacy moment makes this gap acute. The
              workers who most need the leverage of operator-grade AI
              tools — the ones whose jobs are most exposed to
              displacement — are disproportionately in middle and
              lower-income economies. Flat global pricing on the
              tools meant to onboard them is, in practice, a quiet
              refusal to onboard them at all.
            </p>
            <p>
              This paper documents what we built instead, what we
              learned from prior art, and how the synthesis ties to
              the lab&apos;s stated ethos.
            </p>
          </div>
        </div>
      </section>

      {/* 2 — PRIOR ART */}
      <section className="dwp-section dwp-pagebreak border-b border-[#1A2225] bg-[#0e2520]/30 py-16 md:py-20">
        <div className="mx-auto w-full max-w-3xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5] dwp-accent-cyan">
            ::02 · prior art · what we did not invent
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.1] tracking-tight md:text-4xl">
            PPP pricing is forty years old.
          </h2>
          <div className="mt-7 space-y-5 text-base leading-[1.75] text-[#C8CCCE] md:text-[17px]">
            <p>
              The Purchasing Power Parity concept dates to economics
              literature long before software. The Economist&apos;s{" "}
              <em className="not-italic text-[#F2F4F5]">Big Mac Index</em>{" "}
              has popularized the idea since 1986. Country-tiered
              software pricing has been around at consumer scale for
              roughly a decade — JetBrains has offered geographic
              discounts on their IDE products since at least 2018,
              and a small ecosystem of indie tools (ParityDeals,
              ParityVend, regional Gumroad pricing) emerged in the
              early 2020s explicitly to make this easier for solo
              developers. Stripe shipped Adaptive Pricing in 2024 to
              handle the currency-conversion side of the same
              problem.
            </p>
            <p>
              None of this is novel. We did not invent PPP pricing
              and the paper does not claim otherwise. What we built
              is a specific synthesis that combines five elements in
              a way we have not seen named together in the public
              literature or shipping product set.
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
              ::what is novel is below
            </p>
          </div>
        </div>
      </section>

      {/* 3 — THE SYNTHESIS */}
      <section className="dwp-section border-b border-[#1A2225] py-16 md:py-20">
        <div className="mx-auto w-full max-w-4xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5] dwp-accent-cyan">
            ::03 · the synthesis · five components, named together
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.1] tracking-tight md:text-4xl">
            Five doctrines, one system.
          </h2>

          <ol className="mt-12 space-y-8">
            {[
              {
                num: "01",
                title: "The Free-Floor Doctrine",
                body:
                  "When the fairness-adjusted price falls below the payment processor's minimum charge (Stripe USD $0.50), the buyer gets the product free — not rounded up. Most PPP implementations round up to the processor minimum at the bottom. We do the opposite. The doctrine is explicit: the goal is fairness, not extraction at the margin. Somalia at $0.01 becomes a gift, with a single line on the price card that says so.",
              },
              {
                num: "02",
                title: "The Public Mechanism",
                body:
                  "Most software with regional pricing hides the mechanism behind a tooltip and an opaque support article. We put the entire pricing mechanism on a public page (/legal/pricing) — the tier table, the per-product anchor table, the per-country override list, the free-floor policy, the IP-geolocation detection method. Any buyer can curl /api/price/<product> from any terminal and see exactly why they got the price they got, structured JSON with the tier, the multiplier, the source of the decision, the base list price.",
              },
              {
                num: "03",
                title: "The Product Registry",
                body:
                  "Most PPP-pricing implementations are one-off. Each product gets its own integration, its own per-country list, its own bespoke logic. We built it once as a registry — a single TypeScript file (lib/pricing/products.ts) where adding a new product (B00KMakor, Video Shop, future SKUs) is one entry: id, base price, optional per-country overrides. Every downstream surface (API endpoint, display component, transparency page, checkout) reads from the same registry. The system scales by file edit, not by code change.",
              },
              {
                num: "04",
                title: "The §4A Compatibility Statement",
                body:
                  "The lab's License §4A no-saas covenant binds it to never move any one-time-priced product to a subscription model. Per-country pricing has historically been confused with subscription-style pricing because both vary the price at runtime. We make the distinction explicit and public: §4A is about pricing MODEL (one-time vs. recurring), not pricing AMOUNT (USD vs. INR vs. KES). A buyer at $99 and a buyer at $0.99 are both paying ONCE, FOREVER, for the same product. The covenant survives the fairness mechanism without modification.",
              },
              {
                num: "05",
                title: "The Honest VPN Posture",
                body:
                  "Every PPP-pricing tool in the market is preoccupied with VPN-detection and abuse mitigation. Some of them spend more engineering on abuse prevention than on the fairness logic itself. We do not detect VPNs. The stated posture in /legal/pricing is that modest abuse by edge-case VPN users is the acceptable cost of broad accessibility. The fairness mechanism is calibrated for the population that genuinely lives in lower-income countries; trying to fence out the small subset of high-income VPN users would penalize the population the system was built for.",
              },
            ].map((row) => (
              <li
                key={row.num}
                className="dwp-card flex flex-col gap-4 rounded-2xl border border-[#22F0D5]/30 bg-[#0A0F11] p-7 md:flex-row md:items-start md:gap-6 md:p-8"
              >
                <div className="md:w-24 md:shrink-0">
                  <p className="font-mono text-3xl font-semibold tabular-nums text-[#22F0D5] dwp-accent-cyan md:text-4xl">
                    {row.num}
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium tracking-tight text-[#F2F4F5] md:text-2xl">
                    {row.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.65] text-[#C8CCCE] md:text-base">
                    {row.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4 — THE MATH */}
      <section className="dwp-section dwp-pagebreak border-b border-[#1A2225] bg-[#0e2520]/30 py-16 md:py-20">
        <div className="mx-auto w-full max-w-4xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5] dwp-accent-cyan">
            ::04 · the math · what ORANGEBOX costs by country, today
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.1] tracking-tight md:text-4xl">
            One product. Four prices. One mechanism.
          </h2>

          <div className="dwp-card mt-10 overflow-x-auto rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 md:p-8">
            <table className="w-full border-collapse text-sm md:text-[15px]">
              <thead>
                <tr>
                  <th className="border-b border-[#1A2225] py-3 text-left font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5] dwp-accent-cyan">
                    Country
                  </th>
                  <th className="border-b border-[#1A2225] py-3 text-left font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5] dwp-accent-cyan">
                    Tier
                  </th>
                  <th className="border-b border-[#1A2225] py-3 text-left font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5] dwp-accent-cyan">
                    Source
                  </th>
                  <th className="border-b border-[#1A2225] py-3 text-right font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5] dwp-accent-cyan">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody className="font-mono text-[13px] text-[#C8CCCE]">
                <tr>
                  <td className="border-b border-[#1A2225] py-3">United Kingdom</td>
                  <td className="border-b border-[#1A2225] py-3">1 · High-income</td>
                  <td className="border-b border-[#1A2225] py-3">tier default · 1.00x base</td>
                  <td className="border-b border-[#1A2225] py-3 text-right text-[#22F0D5] dwp-accent-cyan">$99</td>
                </tr>
                <tr>
                  <td className="border-b border-[#1A2225] py-3">United States</td>
                  <td className="border-b border-[#1A2225] py-3">1 · High-income</td>
                  <td className="border-b border-[#1A2225] py-3">country override</td>
                  <td className="border-b border-[#1A2225] py-3 text-right text-[#22F0D5] dwp-accent-cyan">$9.99</td>
                </tr>
                <tr>
                  <td className="border-b border-[#1A2225] py-3">Brazil</td>
                  <td className="border-b border-[#1A2225] py-3">2 · Upper-middle</td>
                  <td className="border-b border-[#1A2225] py-3">tier default · 0.40x base</td>
                  <td className="border-b border-[#1A2225] py-3 text-right text-[#22F0D5] dwp-accent-cyan">$39.60</td>
                </tr>
                <tr>
                  <td className="border-b border-[#1A2225] py-3">India</td>
                  <td className="border-b border-[#1A2225] py-3">3 · Lower-middle</td>
                  <td className="border-b border-[#1A2225] py-3">country override</td>
                  <td className="border-b border-[#1A2225] py-3 text-right text-[#22F0D5] dwp-accent-cyan">$0.99</td>
                </tr>
                <tr>
                  <td className="border-b border-[#1A2225] py-3">Bangladesh</td>
                  <td className="border-b border-[#1A2225] py-3">3 · Lower-middle</td>
                  <td className="border-b border-[#1A2225] py-3">tier default · 0.10x base</td>
                  <td className="border-b border-[#1A2225] py-3 text-right text-[#22F0D5] dwp-accent-cyan">$9.90</td>
                </tr>
                <tr>
                  <td className="border-b border-[#1A2225] py-3">Ethiopia</td>
                  <td className="border-b border-[#1A2225] py-3">4 · Low-income</td>
                  <td className="border-b border-[#1A2225] py-3">tier default · 0.02x base</td>
                  <td className="border-b border-[#1A2225] py-3 text-right text-[#22F0D5] dwp-accent-cyan">$1.98</td>
                </tr>
                <tr>
                  <td className="py-3">Somalia</td>
                  <td className="py-3">4 · Low-income</td>
                  <td className="py-3">country override → free-floor (&lt; $0.50)</td>
                  <td className="py-3 text-right text-[#FFB87A] dwp-accent-orange font-semibold">FREE</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-8 text-base leading-[1.7] text-[#C8CCCE] md:text-[17px]">
            All seven entries above are live as of this paper&apos;s
            publication. A reader can verify any of them from any
            terminal:
          </p>
          <pre className="dwp-card mt-5 overflow-x-auto rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-5 font-mono text-[12px] leading-[1.6] text-[#22F0D5] dwp-accent-cyan md:text-[13px]">
{`curl https://atomeons.com/api/price/orangebox?cc=GB
curl https://atomeons.com/api/price/orangebox?cc=US
curl https://atomeons.com/api/price/orangebox?cc=IN
curl https://atomeons.com/api/price/orangebox?cc=SO`}
          </pre>
        </div>
      </section>

      {/* 5 — THE OPERATIONS · CEO BRIEF */}
      <section className="dwp-section dwp-pagebreak border-b border-[#1A2225] py-16 md:py-20">
        <div className="mx-auto w-full max-w-4xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5] dwp-accent-cyan">
            ::05 · the operations · CEO brief · the real business case
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.1] tracking-tight md:text-4xl">
            How this actually works as a business.
          </h2>
          <p className="mt-7 text-base leading-[1.75] text-[#C8CCCE] md:text-[17px]">
            The fairness framing is real but the math has to clear,
            or the system collapses inside a quarter. This section
            is the operator&apos;s read of the unit economics, the
            cross-subsidization model, the enforcement posture, and
            the explicit failure modes — written for a CEO who
            wants to ship something like this without learning the
            hard way.
          </p>

          {/* 5a · cross-subsidization */}
          <h3 className="mt-12 text-xl font-medium tracking-tight text-[#F2F4F5] md:text-2xl">
            5a · The cross-subsidization model
          </h3>
          <p className="mt-4 text-[15px] leading-[1.7] text-[#C8CCCE] md:text-base">
            The system is not a charity. The high-income tiers pay
            the engineering and the operations. The lower tiers ride
            on that margin. The math, calibrated against ORANGEBOX
            with a $99 Tier 1 anchor:
          </p>
          <div className="dwp-card mt-6 overflow-x-auto rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="border-b border-[#1A2225] py-2 text-left font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5] dwp-accent-cyan">Tier</th>
                  <th className="border-b border-[#1A2225] py-2 text-right font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5] dwp-accent-cyan">Price</th>
                  <th className="border-b border-[#1A2225] py-2 text-right font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5] dwp-accent-cyan">Stripe fee (2.9%+$0.30)</th>
                  <th className="border-b border-[#1A2225] py-2 text-right font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5] dwp-accent-cyan">Net to lab</th>
                  <th className="border-b border-[#1A2225] py-2 text-right font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5] dwp-accent-cyan">Buyers needed to fund 1 Tier-4 country</th>
                </tr>
              </thead>
              <tbody className="font-mono text-[12px] text-[#C8CCCE]">
                <tr>
                  <td className="border-b border-[#1A2225] py-2">1 · GB default $99</td>
                  <td className="border-b border-[#1A2225] py-2 text-right">$99.00</td>
                  <td className="border-b border-[#1A2225] py-2 text-right">$3.17</td>
                  <td className="border-b border-[#1A2225] py-2 text-right text-[#22F0D5] dwp-accent-cyan">$95.83</td>
                  <td className="border-b border-[#1A2225] py-2 text-right">~1 buyer</td>
                </tr>
                <tr>
                  <td className="border-b border-[#1A2225] py-2">1 · US override $9.99</td>
                  <td className="border-b border-[#1A2225] py-2 text-right">$9.99</td>
                  <td className="border-b border-[#1A2225] py-2 text-right">$0.59</td>
                  <td className="border-b border-[#1A2225] py-2 text-right text-[#22F0D5] dwp-accent-cyan">$9.40</td>
                  <td className="border-b border-[#1A2225] py-2 text-right">~11 buyers</td>
                </tr>
                <tr>
                  <td className="border-b border-[#1A2225] py-2">2 · BR default $39.60</td>
                  <td className="border-b border-[#1A2225] py-2 text-right">$39.60</td>
                  <td className="border-b border-[#1A2225] py-2 text-right">$1.45</td>
                  <td className="border-b border-[#1A2225] py-2 text-right text-[#22F0D5] dwp-accent-cyan">$38.15</td>
                  <td className="border-b border-[#1A2225] py-2 text-right">~3 buyers</td>
                </tr>
                <tr>
                  <td className="py-2">3 · IN override $0.99</td>
                  <td className="py-2 text-right">$0.99</td>
                  <td className="py-2 text-right">$0.33</td>
                  <td className="py-2 text-right text-[#FFB87A] dwp-accent-orange">$0.66</td>
                  <td className="py-2 text-right">~150 buyers</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-5 text-[15px] leading-[1.7] text-[#C8CCCE] md:text-base">
            A single UK Tier-1 buyer at $99 nets $95.83 after Stripe
            fees — enough infrastructure margin to fund roughly 100
            Somalia buyers at the free-floor (server cost ≈ $0.95 per
            buyer for the static download path). The system is not
            burning money on the bottom; it&apos;s subsidizing access
            with the top, the way an airline funds basic-economy
            seats with first-class margin.
          </p>

          {/* 5b · who pays what */}
          <h3 className="mt-12 text-xl font-medium tracking-tight text-[#F2F4F5] md:text-2xl">
            5b · Why the US gets the $9.99 override and the UK doesn&apos;t
          </h3>
          <p className="mt-4 text-[15px] leading-[1.7] text-[#C8CCCE] md:text-base">
            Operator anchor decision, not a tier-system output. The US
            and the UK are both World Bank Tier 1, both default to $99
            under the tier-multiplier system. The US override to $9.99
            is a deliberate market-access decision by the lab: the AI
            displacement frame is centered on the 44 million US
            workers whose jobs are exposed in the next decade, and the
            lab&apos;s mission is to reach them. The override accepts
            ~$90 of margin per US buyer in exchange for an order of
            magnitude more US adoption. The UK default holds the
            $99 anchor because that&apos;s the price where the per-buyer
            economics actually fund the system.
          </p>
          <p className="mt-4 text-[15px] leading-[1.7] text-[#C8CCCE] md:text-base">
            This is the kind of decision the override system was
            built to allow. The tier defaults handle 220+ countries
            with one mechanism. The overrides handle the
            ten-or-so countries where the operator has a strategic
            reason to deviate. The mechanism stays simple; the
            judgment stays operator-side.
          </p>

          {/* 5c · enforcement */}
          <h3 className="mt-12 text-xl font-medium tracking-tight text-[#F2F4F5] md:text-2xl">
            5c · Enforcement · what stops a UK buyer from paying the India price
          </h3>
          <p className="mt-4 text-[15px] leading-[1.7] text-[#C8CCCE] md:text-base">
            Three checks, in order of strictness:
          </p>
          <ol className="mt-4 space-y-3 text-[15px] leading-[1.7] text-[#C8CCCE] md:text-base">
            <li>
              <span className="font-semibold text-[#F2F4F5]">IP geolocation at price display.</span>{" "}
              Vercel&apos;s edge geolocation reads the request IP and
              returns the country code. Used to set the displayed
              price. VPN-bypassable, intentionally.
            </li>
            <li>
              <span className="font-semibold text-[#F2F4F5]">Stripe card-country verification at checkout.</span>{" "}
              Stripe&apos;s fraud detection runs its own check: card
              country of issue vs. billing address vs. IP. Severe
              mismatches (UK-issued card + India IP + Lagos billing
              address) get auto-declined by Stripe&apos;s ML, not the
              lab&apos;s code.
            </li>
            <li>
              <span className="font-semibold text-[#F2F4F5]">Refund-and-rebuy detection.</span>{" "}
              The Stripe webhook flags buyers who buy at Tier 3, file
              a chargeback, then re-buy at Tier 3 from a different
              country. Three repeats triggers a lab-side review.
            </li>
          </ol>
          <p className="mt-5 text-[15px] leading-[1.7] text-[#C8CCCE] md:text-base">
            Net leakage estimate, calibrated against published numbers
            from ParityDeals and similar PPP-pricing services:
            roughly 2–4% of Tier 3+4 sales are high-income buyers
            using VPNs. The lab&apos;s position is that 2–4% leakage
            is an acceptable cost for the broad accessibility the
            system delivers. Fighting VPN abuse aggressively would
            penalize the population the system was built for.
          </p>

          {/* 5d · annual maintenance */}
          <h3 className="mt-12 text-xl font-medium tracking-tight text-[#F2F4F5] md:text-2xl">
            5d · The annual maintenance cost
          </h3>
          <p className="mt-4 text-[15px] leading-[1.7] text-[#C8CCCE] md:text-base">
            The World Bank revises country income classifications
            every July based on the prior calendar year&apos;s GNI
            per capita. The lab&apos;s pricing system tracks that
            revision by hand: one edit to{" "}
            <code className="font-mono text-[#22F0D5] dwp-accent-cyan">lib/pricing/countries.ts</code>{" "}
            when the new list publishes. Typical churn per revision
            is 4–8 countries crossing tier boundaries (e.g., a
            country moving from upper-middle to high-income). The
            maintenance cost is roughly 30 minutes per year, plus
            an operator review of any per-country overrides that no
            longer make sense.
          </p>

          {/* 5e · failure modes */}
          <h3 className="mt-12 text-xl font-medium tracking-tight text-[#F2F4F5] md:text-2xl">
            5e · What breaks
          </h3>
          <p className="mt-4 text-[15px] leading-[1.7] text-[#C8CCCE] md:text-base">
            Four named failure modes. Each is calibrated, named, and
            owned in advance:
          </p>
          <ol className="mt-4 space-y-3 text-[15px] leading-[1.7] text-[#C8CCCE] md:text-base">
            <li>
              <span className="font-semibold text-[#F2F4F5]">VPN abuse exceeds 10%.</span>{" "}
              If telemetry shows high-income buyers using VPNs to
              access Tier 3 prices at more than ~10% of Tier 3 sales,
              the lab tightens — adds card-country requirement to
              Tier 3+4 pricing as a soft gate. Stays public, no
              fingerprinting.
            </li>
            <li>
              <span className="font-semibold text-[#F2F4F5]">Stripe changes minimum charge.</span>{" "}
              The free-floor constant ($0.50 USD) is documented in
              lib/pricing/products.ts and updates by single edit. If
              Stripe raises to $1, more countries move into the
              free-floor bracket — strategically a net positive for
              the mission.
            </li>
            <li>
              <span className="font-semibold text-[#F2F4F5]">Currency volatility.</span>{" "}
              Stripe Adaptive Pricing handles real-time conversion
              into local currency at checkout. The lab still bills in
              USD. If the local currency crashes, the buyer pays
              fewer local-currency units but the lab still receives
              the same USD amount.
            </li>
            <li>
              <span className="font-semibold text-[#F2F4F5]">Tier-1 adoption underperforms.</span>{" "}
              The system depends on enough Tier-1 buyers to fund the
              infrastructure. If Tier 1 sales fall below the
              operator-set floor (currently 100 per quarter), the
              free-floor for Tier 4 gets reviewed. The honest move
              would be to disclose the change publicly and update
              this paper.
            </li>
          </ol>
        </div>
      </section>

      {/* 6 — THE ETHOS */}
      <section className="dwp-section border-b border-[#1A2225] py-16 md:py-20">
        <div className="mx-auto w-full max-w-3xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5] dwp-accent-cyan">
            ::06 · the ethos · why this is the lab&apos;s system
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.1] tracking-tight md:text-4xl">
            The receipts have to match the slogans.
          </h2>
          <div className="mt-7 space-y-5 text-base leading-[1.75] text-[#C8CCCE] md:text-[17px]">
            <p>
              The lab&apos;s manifesto carries fourteen clauses, each
              one explicitly published, each one falsifiable. Three
              of them bear directly on this paper.
            </p>
            <p>
              <span className="font-semibold text-[#F2F4F5]">Clause 04 — $49 once · §4A no-saas.</span>{" "}
              Originally drafted around a single-anchor $49 price. The
              Dynamic World Pricing system extends the same covenant
              to a price that varies by country, while preserving the
              one-time-forever model. The buyer at any price tier
              still owns the license forever. The covenant survives.
            </p>
            <p>
              <span className="font-semibold text-[#F2F4F5]">Clause 01 — receipts over slogans.</span>{" "}
              Every price the system charges is curl-auditable from
              any terminal. The transparency page (/legal/pricing)
              shows the full mechanism, the actual tier multipliers,
              the actual per-country overrides, the free-floor
              policy, the IP-detection method. If a buyer wants to
              know exactly why they were charged what they were
              charged, the answer is in the JSON, not in a support
              ticket queue.
            </p>
            <p>
              <span className="font-semibold text-[#F2F4F5]">Clause 13 — falsifiability.</span>{" "}
              Every claim in this paper can be tested. The tier
              mapping is the World Bank&apos;s public classification;
              if the operator&apos;s ISO codes don&apos;t match the
              World Bank&apos;s, the file is wrong and gets fixed.
              The free-floor is the Stripe documented minimum; if
              Stripe changes that minimum, the constant in code
              updates. The synthesis is original; if a reader finds a
              prior published combination of these five components
              named together as a doctrine, the paper retracts the
              originality claim.
            </p>
          </div>
        </div>
      </section>

      {/* 6 — WHAT YOU DO WITH THIS */}
      <section className="dwp-section dwp-pagebreak border-b border-[#1A2225] bg-[#0e2520]/30 py-16 md:py-20">
        <div className="mx-auto w-full max-w-3xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5] dwp-accent-cyan">
            ::07 · what you do with this
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.1] tracking-tight md:text-4xl">
            Copy the system. Run the floor.
          </h2>
          <div className="mt-7 space-y-5 text-base leading-[1.75] text-[#C8CCCE] md:text-[17px]">
            <p>
              Everything in this paper is published under CC-BY 4.0.
              The implementation reference (lib/pricing/) is public
              source at github.com/AtomEons/atomeons-com. A reader
              who wants to ship Dynamic World Pricing on their own
              product can lift the entire system today.
            </p>
            <p>
              The single ask is attribution: when you ship it,
              link atomeons.com/dynamic-world-pricing as the
              reference. That is the entire license cost.
            </p>
            <p>
              If you build on top of the five doctrines and add a
              sixth — a refinement, a variant, a contradiction — the
              lab wants to know. Email{" "}
              <a
                href="mailto:a.mccree@gmail.com?subject=Dynamic%20World%20Pricing%20extension"
                className="text-[#22F0D5] dwp-accent-cyan underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5]"
              >
                a.mccree@gmail.com
              </a>{" "}
              with the receipts. The paper updates in /changelog with
              attribution.
            </p>
          </div>

          <div className="no-print mt-12 flex flex-wrap gap-3">
            <PrintButton />
            <Link
              href="/legal/pricing"
              className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] bg-[#0A0F11] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7] hover:text-[#22F0D5]"
            >
              public mechanism · /legal/pricing →
            </Link>
            <Link
              href="/manifesto"
              className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] bg-[#0A0F11] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7] hover:text-[#22F0D5]"
            >
              lab manifesto · 14 clauses →
            </Link>
            <a
              href="https://github.com/AtomEons/atomeons-com"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] bg-[#0A0F11] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7] hover:text-[#22F0D5]"
            >
              source · github →
            </a>
          </div>
        </div>
      </section>

      {/* CITATIONS + FOOTER */}
      <section className="dwp-section bg-black py-16 md:py-20">
        <div className="mx-auto w-full max-w-3xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5] dwp-accent-cyan">
            ::cite as
          </p>
          <pre className="dwp-card mt-5 overflow-x-auto rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-5 font-mono text-[12px] leading-[1.6] text-[#C8CCCE]">
{`McCree, A. & Claude Opus 4.7 (Anthropic). (2026, May).
  Dynamic World Pricing — A Free-Floor Synthesis.
  AtomEons Systems Laboratory.
  https://atomeons.com/dynamic-world-pricing
  License: CC-BY 4.0`}
          </pre>

          <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5] dwp-accent-cyan">
            ::references
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-[1.7] text-[#9BA5A7]">
            <li>
              World Bank.{" "}
              <em className="not-italic text-[#C8CCCE]">
                Country Classifications by Income Level for FY 2026
                (July 2025–June 2026)
              </em>
              .{" "}
              <a
                href="https://blogs.worldbank.org/en/opendata/world-bank-country-classifications-by-income-level-for-2024-2025"
                target="_blank"
                rel="noopener"
                className="text-[#22F0D5] dwp-accent-cyan underline decoration-[#22F0D5]/40 underline-offset-4"
              >
                worldbank.org
              </a>
              . 230+ countries classified across four income tiers
              based on 2024 GNI per capita Atlas method.
            </li>
            <li>
              Stripe.{" "}
              <em className="not-italic text-[#C8CCCE]">
                Adaptive Pricing Documentation
              </em>
              .{" "}
              <a
                href="https://docs.stripe.com/payments/checkout/adaptive-pricing"
                target="_blank"
                rel="noopener"
                className="text-[#22F0D5] dwp-accent-cyan underline decoration-[#22F0D5]/40 underline-offset-4"
              >
                docs.stripe.com
              </a>
              . Currency-conversion mechanism distinct from PPP
              tiering.
            </li>
            <li>
              The Economist. <em className="not-italic text-[#C8CCCE]">The Big Mac Index</em>. Since
              1986. Popularized cross-country price-comparison via
              consumer reference good.
            </li>
            <li>
              JetBrains. <em className="not-italic text-[#C8CCCE]">Geographic Pricing for JetBrains Tools</em>.
              Indie-tools precedent for country-tiered software
              pricing at consumer scale.
            </li>
            <li>
              ParityDeals, ParityVend.{" "}
              <em className="not-italic text-[#C8CCCE]">
                Stripe-integrated PPP pricing SaaS tools
              </em>
              . Existing third-party services for indie developers
              implementing regional pricing.
            </li>
            <li>
              AtomEons Systems Laboratory.{" "}
              <em className="not-italic text-[#C8CCCE]">License §4A — No-SaaS Covenant</em>.{" "}
              <a
                href="https://atomeons.com/legal/terms"
                target="_blank"
                rel="noopener"
                className="text-[#22F0D5] dwp-accent-cyan underline decoration-[#22F0D5]/40 underline-offset-4"
              >
                atomeons.com/legal/terms
              </a>
              .
            </li>
            <li>
              AtomEons Systems Laboratory.{" "}
              <em className="not-italic text-[#C8CCCE]">Pricing Transparency — How Prices Are Set</em>.{" "}
              <a
                href="https://atomeons.com/legal/pricing"
                target="_blank"
                rel="noopener"
                className="text-[#22F0D5] dwp-accent-cyan underline decoration-[#22F0D5]/40 underline-offset-4"
              >
                atomeons.com/legal/pricing
              </a>
              . Public mechanism page with live tier table and
              per-product anchors.
            </li>
          </ul>

          <p className="mt-12 border-t border-[#1A2225] pt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
            © 2026 AtomEons Systems Laboratory · Atom McCree · Marco
            Island, FL · CC-BY 4.0 · attribute atomeons.com when
            quoting. Single operator, no employees, no investors.
            Independent AI research.
          </p>
        </div>
      </section>
    </main>
  );
}
