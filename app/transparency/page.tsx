import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Transparency · what AtomEons costs to run · monthly ledger",
  description:
    "Honest monthly cost-to-run for AtomEons. Hosting, AI APIs, code-signing, domain, email, every subscription named with the dollar amount. What gets paid, what doesn't, where the money comes from.",
  alternates: { canonical: "https://atomeons.com/transparency" },
};

/**
 * /transparency — actual monthly financial transparency.
 *
 * Operator-stated rule: "no VC money" should be backed up by an actual
 * ledger of what the lab costs to operate. This page is the public copy
 * of that ledger. Updated monthly with the /receipts row that anchors
 * the figure.
 *
 * Numbers below are 2026-06 figures as published. They will update
 * each first-of-month from operator's monthly financial close.
 */

const COSTS = [
  { what: "Vercel · production hosting + edge + CI", monthly: 20, category: "hosting" },
  { what: "Domain · atomeons.com · Cloudflare Registrar", monthly: 1.10, category: "hosting" },
  { what: "Domain · skil.ski · Namecheap", monthly: 1.50, category: "hosting" },
  { what: "Supabase · DB + storage (free tier today)", monthly: 0, category: "hosting" },
  { what: "Anthropic Claude API · operator dev work", monthly: 200, category: "AI" },
  { what: "Gemini API · free tier (limit: 0 on images)", monthly: 0, category: "AI" },
  { what: "OpenAI · disabled (operator does not use)", monthly: 0, category: "AI" },
  { what: "ElevenLabs · audiobook narration credits", monthly: 22, category: "AI" },
  { what: "Loops.so · transactional + marketing email", monthly: 49, category: "email" },
  { what: "Google Workspace · operator email", monthly: 6, category: "email" },
  { what: "Azure Trusted Signing · code-signing for Orange³ installer", monthly: 9.99, category: "trust" },
  { what: "Stripe · payment processing (2.9% + 30¢ per txn)", monthly: 0, category: "payments", note: "variable per sale" },
  { what: "X / Twitter API · automation tier", monthly: 100, category: "social" },
  { what: "GitHub · Pro account", monthly: 4, category: "code" },
  { what: "Vercel · Speed Insights + Analytics", monthly: 0, category: "hosting", note: "free tier" },
  { what: "Hardware depreciation · amortized over 36 months", monthly: 55, category: "hardware" },
  { what: "Insurance · operator personal", monthly: 0, category: "ops", note: "personal, not lab expense" },
];

const REVENUE_RULES = [
  "Orange³ is free always. License §4A bars any future subscription conversion.",
  "AI Bookmaker Mac + Windows is free always.",
  "skil.ski marketplace takes 0% rake during launch year; future rake transparent and capped.",
  "I AM AI free PDF + free audiobook on /i-am-ai · numbered hardcover $39.",
  "All other content (256 routes on atomeons.com) is free, CC-BY 4.0, no signup wall, no email gate.",
  "Zero ad revenue. Zero affiliate links. Zero sponsorship payments. Zero data resale.",
  "Zero VC investment. Founder-funded from operator's prior consulting work + product revenue.",
];

const TOTAL = COSTS.reduce((s, c) => s + c.monthly, 0);

export default function TransparencyPage() {
  return (
    <main className="min-h-screen text-[#F4F4F2]">
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5]">
            ::financial transparency · the monthly ledger
          </p>
          <h1
            className="mt-6 max-w-[24ch] text-balance text-[clamp(48px,7vw,96px)] font-light leading-[1.02] tracking-[-0.025em] text-[#F4F4F2]"
            style={{ fontFamily: "Newsreader, Georgia, serif" }}
          >
            What the lab costs to run.
          </h1>
          <div
            role="list"
            aria-label="Ledger signals"
            className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.22em]"
          >
            <span role="listitem" className="inline-flex items-center gap-2">
              <span aria-hidden className="inline-block size-1.5 animate-pulse rounded-full bg-[#22F0D5] shadow-[0_0_8px_#22F0D5]" />
              <span className="text-[#22F0D5]">LIVE</span>
            </span>
            <span role="listitem" className="text-[#B5BBC0]">{COSTS.length} <span className="text-[#8E969D]">line items</span></span>
            <span role="listitem" className="text-[#B5BBC0]">${TOTAL.toFixed(2)} <span className="text-[#8E969D]">monthly total</span></span>
            <span role="listitem" className="text-[#B5BBC0]">0 <span className="text-[#8E969D]">VC dollars</span></span>
            <span role="listitem" className="text-[#8E969D]">cutoff 2026-06-01 · USD</span>
          </div>
          <p className="mt-8 max-w-[68ch] font-serif text-[19px] leading-[1.6] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Every recurring line item. Every dollar. &quot;No VC money&quot; is a
            claim that deserves a number. Here is the number.
          </p>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[#1F242B] pb-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ recurring monthly costs</p>
            <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-[#8E969D]">cutoff 2026-06-01 · USD</p>
          </div>
          <ul className="ae-stagger mt-8 divide-y divide-[#1F242B]" style={{ ["--stagger-step" as string]: "40ms" }}>
            {COSTS.map((c, i) => (
              <li key={i} className="ae-reveal-up flex items-baseline justify-between gap-6 py-3.5" style={{ ["--stagger-index" as string]: i }}>
                <div className="flex-1">
                  <p className="font-serif text-[16px] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                    {c.what}
                  </p>
                  {c.note ? (
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#8E969D]">{c.note}</p>
                  ) : null}
                </div>
                <p
                  className={
                    c.monthly === 0
                      ? "font-mono text-[14px] uppercase tracking-[0.12em] text-[#8E969D]"
                      : "font-mono text-[16px] tabular-nums text-[#F4F4F2]"
                  }
                >
                  {c.monthly === 0 ? "—" : `$${c.monthly.toFixed(2)}`}
                </p>
              </li>
            ))}
            <li className="flex items-baseline justify-between gap-6 border-t-2 border-[#22F0D5] pt-5">
              <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-[#22F0D5]">monthly recurring total</p>
              <p className="font-mono text-[20px] font-semibold tabular-nums text-[#22F0D5]">${TOTAL.toFixed(2)}</p>
            </li>
          </ul>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-[#8E969D]">
            does NOT include · Stripe transaction fees (variable, ~3% per sale) · payroll (zero · no employees) · office rent (operator works from home) · insurance · taxes · accountant
          </p>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ revenue rules</p>
          <ol className="ae-stagger mt-8 space-y-4" style={{ ["--stagger-step" as string]: "60ms" }}>
            {REVENUE_RULES.map((r, i) => (
              <li key={i} className="ae-reveal-up flex items-baseline gap-4 border-b border-[#1F242B] pb-3.5" style={{ ["--stagger-index" as string]: i }}>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#8E969D]">{String(i + 1).padStart(2, "0")}</span>
                <p className="font-serif text-[16px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                  {r}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <div className="border-l-2 border-[#22F0D5] bg-[#0B0C0F] p-6 md:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ why publish this</p>
            <p className="mt-4 font-serif text-[18px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
              Most "no-VC" claims live in a press kit and stop there. This page is
              the audit trail. If the recurring cost of the lab moves up or down,
              this page moves with it. The line items are individually verifiable
              against the providers' billing portals. If a buyer wants to know
              exactly how free products are funded, this is the page.
            </p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-[#8E969D]">
              Operator-funded · founder-bootstrapped · zero equity sold
            </p>
          </div>

          <div className="ae-stagger mt-10 grid gap-3 md:grid-cols-3" style={{ ["--stagger-step" as string]: "80ms" }}>
            {[
              { href: "/trust", label: "Trust posture" },
              { href: "/receipts", label: "Receipts ledger" },
              { href: "/manifesto", label: "Operating manifesto" },
            ].map((l, i) => (
              <Link key={l.href} href={l.href} className="ae-reveal-up group border border-[#1F242B] bg-[#0F1114] p-4 transition-colors hover:border-[#22F0D5]" style={{ ["--stagger-index" as string]: i }}>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#8E969D] transition-colors group-hover:text-[#22F0D5]">
                  atomeons.com{l.href}
                </p>
                <p className="mt-2 font-serif text-[17px] font-medium" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{l.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
