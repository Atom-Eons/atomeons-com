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
  { what: "Azure Trusted Signing · code-signing for ORANGEBOX installer", monthly: 9.99, category: "trust" },
  { what: "Stripe · payment processing (2.9% + 30¢ per txn)", monthly: 0, category: "payments", note: "variable per sale" },
  { what: "X / Twitter API · automation tier", monthly: 100, category: "social" },
  { what: "GitHub · Pro account", monthly: 4, category: "code" },
  { what: "Vercel · Speed Insights + Analytics", monthly: 0, category: "hosting", note: "free tier" },
  { what: "Hardware depreciation · amortized over 36 months", monthly: 55, category: "hardware" },
  { what: "Insurance · operator personal", monthly: 0, category: "ops", note: "personal, not lab expense" },
];

const REVENUE_RULES = [
  "ORANGEBOX Version 1 sells for $99 perpetual. License §4A bars subscription conversion.",
  "B00KMAKR Mac + Windows sells for $99 dynamic price tier (free during launch week).",
  "skil.ski marketplace takes 0% rake during launch year; future rake transparent and capped.",
  "I AM AI Kindle ebook $4.99 · Audible audiobook ~$14.95 (when ACX review finishes) · numbered hardcover $39.",
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
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF]">
            § financial transparency · 2026-06
          </p>
          <h1 className="mt-6 font-serif text-[44px] font-light leading-[1.04] tracking-[-0.025em] md:text-[64px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            What the lab costs to run.
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-[18px] leading-[1.55] text-[#9CA3AF] md:text-[20px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Every recurring line item. Every dollar. "No VC money" is a
            claim that deserves a number. Here is the number.
          </p>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[#1F242B] pb-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ recurring monthly costs</p>
            <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-[#5A6068]">cutoff 2026-06-01 · USD</p>
          </div>
          <ul className="mt-8 divide-y divide-[#1F242B]">
            {COSTS.map((c, i) => (
              <li key={i} className="flex items-baseline justify-between gap-6 py-3.5">
                <div className="flex-1">
                  <p className="font-serif text-[16px] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                    {c.what}
                  </p>
                  {c.note ? (
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#5A6068]">{c.note}</p>
                  ) : null}
                </div>
                <p
                  className={
                    c.monthly === 0
                      ? "font-mono text-[14px] uppercase tracking-[0.12em] text-[#5A6068]"
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
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-[#5A6068]">
            does NOT include · Stripe transaction fees (variable, ~3% per sale) · payroll (zero · no employees) · office rent (operator works from home) · insurance · taxes · accountant
          </p>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ revenue rules</p>
          <ol className="mt-8 space-y-4">
            {REVENUE_RULES.map((r, i) => (
              <li key={i} className="flex items-baseline gap-4 border-b border-[#1F242B] pb-3.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068]">{String(i + 1).padStart(2, "0")}</span>
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
              exactly how their $99 pays for hosting, this is the page.
            </p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-[#5A6068]">
              Operator-funded · founder-bootstrapped · zero equity sold
            </p>
          </div>

          <div className="mt-10 grid gap-3 md:grid-cols-3">
            {[
              { href: "/trust", label: "Trust posture" },
              { href: "/receipts", label: "Receipts ledger" },
              { href: "/manifesto", label: "Operating manifesto" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="group border border-[#1F242B] bg-[#0F1114] p-4 transition-colors hover:border-[#22F0D5]">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068] transition-colors group-hover:text-[#22F0D5]">
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
