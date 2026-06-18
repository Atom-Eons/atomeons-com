import type { Metadata } from "next";
import Link from "next/link";
import { PRODUCTS, DEFAULT_TIER_MULTIPLIERS } from "@/lib/pricing/products";
import { TIER_COUNTS, countryNameFor } from "@/lib/pricing/countries";
import {
  USA_ADVANTAGE_CLAUSE,
  STRATEGIC_TIER_LIFT,
} from "@/lib/pricing/doctrines";

/**
 * /legal/pricing — public transparency on how prices are set.
 *
 * Operator doctrine: receipts over slogans. Most companies that do PPP
 * pricing hide the mechanism behind a vague "regional pricing" tooltip.
 * The lab puts the entire mechanism on a public page: tier thresholds,
 * default multipliers, per-product anchors, the two named country
 * doctrines (USA Advantage Clause + Strategic Tier Lift), and the
 * Stripe-minimum free-floor safeguard.
 *
 * If a buyer wants to know exactly why they got the price they got,
 * the answer is here, citable, no support ticket required.
 */

export const metadata: Metadata = {
  title: "Pricing transparency — fair pricing by country · AtomEons",
  description:
    "How AtomEons prices products by country. World Bank income tier mapping, default multipliers, per-product anchors, two named doctrines (USA Advantage Pricing Clause + Strategic Tier Lift), the Stripe-minimum free-floor safeguard. The full mechanism, public, citable.",
  alternates: { canonical: "https://atomeons.com/legal/pricing" },
  robots: { index: true, follow: true },
};

export default function PricingTransparencyPage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <div className="mx-auto w-full max-w-4xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/legal" className="hover:text-[#22F0D5]">Legal</Link>{" "}
          <span className="text-[#1A2225]">/</span> Pricing transparency
        </p>
      </div>

      <section className="border-b border-[#1A2225] py-20 md:py-28">
        <div className="mx-auto w-full max-w-3xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::pricing transparency · how every price is set
          </p>
          <h1 className="mt-6 text-balance text-5xl font-medium leading-[1.02] tracking-[-0.02em] md:text-7xl">
            Fair{" "}
            <span className="text-[#22F0D5]">by design.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-[1.55] text-[#C8CCCE]">
            The lab&apos;s products are priced by country. A buyer in
            Mumbai does not pay the same number as a buyer in London,
            and a buyer in Mogadishu does not pay at all. The full
            mechanism is below — public, citable, identical for every
            product.
          </p>
        </div>
      </section>

      {/* WHY */}
      <section className="border-b border-[#1A2225] py-16 md:py-20">
        <div className="mx-auto w-full max-w-3xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::why
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.1] tracking-tight md:text-4xl">
            The 44-million-worker frame applies to the whole planet.
          </h2>
          <div className="mt-6 space-y-5 text-base leading-[1.75] text-[#C8CCCE] md:text-[17px]">
            <p>
              The lab&apos;s thesis is that AI literacy is a literacy
              question, not a luxury one. A flat global price would
              price out the buyers who most need the leverage —
              workers in lower-income economies whose AI on-ramp is
              the difference between staying employed and not. The
              same product, the same source code, the same updates,
              priced as a function of where the buyer lives.
            </p>
            <p>
              This is not a charity carve-out. The base price is set
              to a number high-income buyers will pay willingly for
              the value they receive. Buyers in lower-income tiers
              get the same product at a price that makes sense in
              their economy. The high-income margin cross-subsidizes
              the low-income access. The math works at the population
              level, not the per-buyer level.
            </p>
          </div>
        </div>
      </section>

      {/* HOW · TIERS */}
      <section className="border-b border-[#1A2225] bg-[#08090B]/30 py-16 md:py-20">
        <div className="mx-auto w-full max-w-3xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::how · step 1 · World Bank income tiers
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.1] tracking-tight md:text-4xl">
            Every country gets one of four tiers.
          </h2>
          <p className="mt-5 text-base leading-[1.65] text-[#C8CCCE] md:text-lg">
            Tier mapping is the World Bank&apos;s annual income
            classification (FY 2026 · based on 2024 GNI per capita ·{" "}
            <a
              href="https://datahelpdesk.worldbank.org/knowledgebase/articles/906519-world-bank-country-and-lending-groups"
              target="_blank"
              rel="noopener"
              className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5]"
            >
              data source
            </a>
            ). Updated every July when the World Bank revises.
          </p>
          <table className="mt-10 w-full border-collapse text-sm md:text-[15px]">
            <thead>
              <tr>
                <th className="border-b border-[#1A2225] py-3 text-left font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">Tier</th>
                <th className="border-b border-[#1A2225] py-3 text-left font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">Income classification</th>
                <th className="border-b border-[#1A2225] py-3 text-left font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">GNI/capita</th>
                <th className="border-b border-[#1A2225] py-3 text-left font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">Default multiplier</th>
              </tr>
            </thead>
            <tbody>
              {[
                { t: 1, label: "High-income", gni: "> $13,935", color: "#22F0D5" },
                { t: 2, label: "Upper-middle-income", gni: "$4,496 – $13,935", color: "#7DDBC8" },
                { t: 3, label: "Lower-middle-income", gni: "$1,136 – $4,495", color: "#FFB87A" },
                { t: 4, label: "Low-income", gni: "≤ $1,135", color: "#22F0D5" },
              ].map((row) => (
                <tr key={row.t}>
                  <td className="border-b border-[#1A2225] py-3 align-top" style={{ color: row.color }}>
                    Tier {row.t}
                  </td>
                  <td className="border-b border-[#1A2225] py-3 align-top text-[#F2F4F5]">
                    {row.label}
                  </td>
                  <td className="border-b border-[#1A2225] py-3 align-top text-[#C8CCCE] font-mono text-[13px]">
                    {row.gni}
                  </td>
                  <td className="border-b border-[#1A2225] py-3 align-top text-[#C8CCCE] font-mono text-[13px]">
                    {(DEFAULT_TIER_MULTIPLIERS[row.t as 1 | 2 | 3 | 4] * 100).toFixed(0)}% of base
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
            ::system recognizes {TIER_COUNTS.total} countries by ISO code · unknown countries default to Tier 1 base price
          </p>
        </div>
      </section>

      {/* HOW · NAMED DOCTRINES */}
      <section className="border-b border-[#1A2225] py-16 md:py-20">
        <div className="mx-auto w-full max-w-3xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::how · step 2 · named country doctrines
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.1] tracking-tight md:text-4xl">
            Two named clauses. Both public, both reasoned.
          </h2>
          <p className="mt-5 text-base leading-[1.7] text-[#C8CCCE] md:text-[17px]">
            The lab does not use opaque per-country overrides. Where
            specific countries get different pricing than their World
            Bank tier would produce, the decision lives as a NAMED
            DOCTRINE with a published reason. Two are currently active:
          </p>

          {/* USA Advantage Clause */}
          <div className="mt-8 rounded-2xl border border-[#22F0D5]/30 bg-[#0A0F11] p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
              ::doctrine 01 · USA Advantage Clause
            </p>
            <h3 className="mt-3 text-xl font-medium tracking-tight text-[#F2F4F5] md:text-2xl">
              US buyers pay 10% of the Tier 1 anchor.
            </h3>
            <p className="mt-4 text-[15px] leading-[1.7] text-[#C8CCCE]">
              Scope: <span className="font-mono text-[13px] text-[#22F0D5]">US</span>{" "}
              · Multiplier:{" "}
              <span className="font-mono text-[13px] text-[#22F0D5]">
                {USA_ADVANTAGE_CLAUSE.multiplier} (10%)
              </span>{" "}
              · A US buyer pays{" "}
              <span className="font-mono text-[13px] text-[#22F0D5]">$9.90</span> on a $99
              product.
            </p>
            <p className="mt-4 text-[15px] leading-[1.7] text-[#C8CCCE]">
              <span className="font-semibold text-[#F2F4F5]">Reasoning:</span>{" "}
              {USA_ADVANTAGE_CLAUSE.reasoning}
            </p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
              ::published in · {USA_ADVANTAGE_CLAUSE.published}
            </p>
          </div>

          {/* Strategic Tier Lift */}
          <div className="mt-6 rounded-2xl border border-[#22F0D5]/30 bg-[#0A0F11] p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
              ::doctrine 02 · Strategic Tier Lift
            </p>
            <h3 className="mt-3 text-xl font-medium tracking-tight text-[#F2F4F5] md:text-2xl">
              Specific countries lifted above their World Bank tier.
            </h3>
            <p className="mt-4 text-[15px] leading-[1.7] text-[#C8CCCE]">
              Active lifts:{" "}
              {Object.entries(STRATEGIC_TIER_LIFT.lifts)
                .map(
                  ([cc, tier]) =>
                    `${countryNameFor(cc)} (${cc}) · → Tier ${tier}`,
                )
                .join(" · ")}
              . A buyer in a lifted country pays the price of the
              tier they were lifted into, not the World Bank
              classification tier.
            </p>
            <p className="mt-4 text-[15px] leading-[1.7] text-[#C8CCCE]">
              <span className="font-semibold text-[#F2F4F5]">Reasoning:</span>{" "}
              {STRATEGIC_TIER_LIFT.reasoning}
            </p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
              ::published in · {STRATEGIC_TIER_LIFT.published}
            </p>
          </div>

          <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
            ::source · lib/pricing/doctrines.ts · adding a clause requires the same file + a /changelog entry
          </p>
        </div>
      </section>

      {/* HOW · BASE PRICE */}
      <section className="border-b border-[#1A2225] bg-[#08090B]/30 py-16 md:py-20">
        <div className="mx-auto w-full max-w-3xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::how · step 3 · per-product base price
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.1] tracking-tight md:text-4xl">
            Each product carries a Tier-1 anchor.
          </h2>
          <p className="mt-5 text-base leading-[1.7] text-[#C8CCCE] md:text-[17px]">
            The Tier-1 anchor is the price a high-income buyer pays.
            Lower tiers pay the anchor times the tier multiplier from
            step 1. The named doctrines from step 2 override the
            default for the specific countries they cover.
          </p>

          <table className="mt-10 w-full border-collapse text-sm md:text-[15px]">
            <thead>
              <tr>
                <th className="border-b border-[#1A2225] py-3 text-left font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">Product</th>
                <th className="border-b border-[#1A2225] py-3 text-left font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">Tier-1 anchor</th>
                <th className="border-b border-[#1A2225] py-3 text-left font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">Pricing path</th>
              </tr>
            </thead>
            <tbody>
              {PRODUCTS.map((p) => (
                <tr key={p.id}>
                  <td className="border-b border-[#1A2225] py-3 align-top text-[#F2F4F5]">
                    {p.name}
                  </td>
                  <td className="border-b border-[#1A2225] py-3 align-top text-[#C8CCCE] font-mono text-[13px]">
                    ${(p.baseUsdCents / 100).toFixed(p.baseUsdCents % 100 === 0 ? 0 : 2)}
                  </td>
                  <td className="border-b border-[#1A2225] py-3 align-top text-[#C8CCCE] font-mono text-[11px]">
                    pure tier-driven + named doctrines
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* HOW · FREE FLOOR */}
      <section className="border-b border-[#1A2225] py-16 md:py-20">
        <div className="mx-auto w-full max-w-3xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::how · step 4 · the Stripe minimum floor (free for the floor)
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.1] tracking-tight md:text-4xl">
            Below 50 cents, it&apos;s a gift.
          </h2>
          <p className="mt-6 text-base leading-[1.7] text-[#C8CCCE] md:text-[17px]">
            Stripe (the payment processor) has a minimum charge of
            $0.50 USD on most cards. The lab&apos;s policy is that if
            the fairness mechanism ever produces a price below that
            floor, the buyer gets the product FREE — not rounded up.
            Under current default multipliers (1.0x / 0.4x / 0.1x /
            0.02x) and a $99 base, no country falls below $0.50, so the
            doctrine sits as a published safeguard. It activates the
            moment a future product&apos;s multiplier curve or a lower
            base price produces a sub-floor result. The intent is
            unchanged: fairness, not extraction at the margin.
          </p>
        </div>
      </section>

      {/* HOW · DETECTION */}
      <section className="border-b border-[#1A2225] bg-[#08090B]/30 py-16 md:py-20">
        <div className="mx-auto w-full max-w-3xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::how · step 5 · country detection
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.1] tracking-tight md:text-4xl">
            IP geolocation, no fingerprinting.
          </h2>
          <div className="mt-6 space-y-4 text-base leading-[1.7] text-[#C8CCCE] md:text-[17px]">
            <p>
              Country is detected via your IP address (Vercel&apos;s
              edge geolocation, no third-party service). Nothing
              about you personally is stored. The IP is only used to
              produce a country code, which is then used to look up
              the tier and price. The IP itself is not logged by the
              pricing system.
            </p>
            <p>
              VPN users will see the price for the country their VPN
              egresses through. That is intentional — the system does
              not attempt VPN detection. If a high-income buyer wants
              to use a VPN to pay the Tier-4 price, they can. The
              lab&apos;s posture is that the fairness mechanism is for
              the population who genuinely lives in lower-income
              countries; modest abuse by edge-case VPN users is
              acceptable cost.
            </p>
            <p>
              At checkout, Stripe also verifies the card&apos;s
              country of issue. If the card country differs
              substantially from the IP country, Stripe&apos;s own
              fraud detection may decline the charge. That is
              Stripe&apos;s call, not the lab&apos;s.
            </p>
          </div>
        </div>
      </section>

      {/* AUDIT YOUR OWN PRICE */}
      <section className="border-b border-[#1A2225] py-16 md:py-20">
        <div className="mx-auto w-full max-w-3xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::audit · check your own price
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.1] tracking-tight md:text-4xl">
            Curl the API yourself.
          </h2>
          <p className="mt-6 text-base leading-[1.7] text-[#C8CCCE] md:text-[17px]">
            The pricing endpoint is public. Hit it from any terminal:
          </p>
          <pre className="mt-5 overflow-x-auto rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-5 font-mono text-[12px] leading-[1.6] text-[#22F0D5] md:text-[13px]">
{`# default — detected from your IP
curl https://atomeons.com/api/price/orangebox
# → { "price": 0, "tier": "free_always", "source": "wave73_free_always_lock", ... }

# every country returns the same answer now
curl https://atomeons.com/api/price/orangebox?cc=GB   # free_always
curl https://atomeons.com/api/price/orangebox?cc=US   # free_always
curl https://atomeons.com/api/price/orangebox?cc=CN   # free_always
curl https://atomeons.com/api/price/orangebox?cc=IN   # free_always
curl https://atomeons.com/api/price/orangebox?cc=SO   # free_always`}
          </pre>
          <p className="mt-6 text-base leading-[1.65] text-[#C8CCCE]">
            The JSON response includes the resolved price, the
            effective tier (after any Strategic Tier Lift), the
            multiplier applied, the source of the decision
            (<code className="font-mono text-[12px] text-[#22F0D5]">tier_default</code>{" "}
            ·{" "}
            <code className="font-mono text-[12px] text-[#22F0D5]">usa_advantage_clause</code>{" "}
            ·{" "}
            <code className="font-mono text-[12px] text-[#22F0D5]">strategic_tier_lift</code>{" "}
            ·{" "}
            <code className="font-mono text-[12px] text-[#22F0D5]">free_below_min</code>),
            and the base list price. Two boolean flags say plainly
            whether a named clause applied:{" "}
            <code className="font-mono text-[12px] text-[#22F0D5]">usaAdvantage</code>{" "}
            and{" "}
            <code className="font-mono text-[12px] text-[#22F0D5]">tierLifted</code>.
            If you ever think the price is wrong, the receipts are right
            there.
          </p>
        </div>
      </section>

      {/* LICENSE */}
      <section className="bg-black py-16 md:py-20">
        <div className="mx-auto w-full max-w-3xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::§4A · no-saas covenant compatibility
          </p>
          <p className="mt-5 text-base leading-[1.7] text-[#C8CCCE] md:text-[17px]">
            The lab&apos;s License §4A no-saas covenant binds the lab
            to never move any one-time-priced product to a
            subscription model. Per-country pricing is allowed (and
            intended) under §4A — the covenant is about pricing
            MODEL (one-time vs. recurring), not pricing AMOUNT (USD
            vs. INR vs. KES). A high-income buyer at $99 and a
            low-income buyer at $1.98 are both paying once, forever,
            for the same product, with the same source code, with
            the same update path. That&apos;s §4A.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/legal/terms"
              className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5] hover:bg-[#22F0D5]/20"
            >
              read §4A in full →
            </Link>
            <Link
              href="/manifesto"
              className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] bg-[#0A0F11] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7] hover:text-[#22F0D5]"
            >
              the lab manifesto →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
