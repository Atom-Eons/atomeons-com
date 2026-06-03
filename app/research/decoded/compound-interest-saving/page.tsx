import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The 4% Rule, Decoded — What Trinity Actually Said About Retiring Without Going Broke · Research / Decoded · AtomEons",
  description: "If you save a pile equal to 25× your annual spending and invest it 50–75% in stocks, history says you can pull 4% of that pile in year one, raise the dollar amount with inflation every year after, and have a 95%+ chance of not running out in 30 years — which means most middle-class earners can mathematically retire decades earlier than their employer's HR deck implies.",
  alternates: { canonical: "https://atomeons.com/research/decoded/compound-interest-saving" },
  openGraph: {
    title: "The 4% Rule, Decoded — What Trinity Actually Said About Retiring Without Going Broke",
    description: "If you save a pile equal to 25× your annual spending and invest it 50–75% in stocks, history says you can pull 4% of that pile in year one, raise the dollar amount with inflation every year after, and have a 95%+ chance of not running out in 30 years — which means most middle-class earners can mathematically retire decades earlier than their employer's HR deck implies.",
    url: "https://atomeons.com/research/decoded/compound-interest-saving",
    type: "article",
  },
  robots: { index: true, follow: true },
};

const ACCENT = "#22F0D5";

export default function Page() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[11px] tracking-[0.08em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/research/decoded" className="hover:text-[#22F0D5]">Research / Decoded</Link>{" "}
          <span className="text-[#1A2225]">/</span> {`The 4% Rule, Decoded — What Trinity Actually Said About Retiring Without Going Broke`}
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9BA5A7]">
            {`Philip L. Cooley, Carl M. Hubbard, Daniel T. Walz — *AAII Journal*, February 1998 ("Retirement Savings: Choosing a Withdrawal Rate That Is Sustainable"); plus William P. Bengen, *Journal of Financial Planning*, October 1994 ("Determining Withdrawal Rates Using Historical Data"); plus the 2011 Trinity update in *Journal of Financial Planning*.`}
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            {`The 4% Rule, Decoded — What Trinity Actually Said About Retiring Without Going Broke`}
          </h1>
          <p className="mt-8 max-w-[62ch] text-[17px] leading-[1.65] text-[#C8CCCE]">
            {`If you save a pile equal to 25× your annual spending and invest it 50–75% in stocks, history says you can pull 4% of that pile in year one, raise the dollar amount with inflation every year after, and have a 95%+ chance of not running out in 30 years — which means most middle-class earners can mathematically retire decades earlier than their employer's HR deck implies.`}
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24 space-y-12">
          <article key={0}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`01`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`(2) What scientists actually did`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`Bengen (1994) went first. He took historical U.S. stock and bond returns from 1926 forward, simulated a retiree starting in every year, and tracked whether their portfolio survived a 30-year retirement under various withdrawal rates. He found that 4% (inflation-adjusted) survived every historical 30-year window, including retirees who started right before the 1929 crash, the 1937 collapse, the 1966 stagflation entry, and the 1973–74 bear.

Cooley, Hubbard, and Walz (1998) — the Trinity Study proper — extended the analysis across multiple asset allocations (100/0 down to 0/100 stocks/bonds), multiple withdrawal rates (3% to 12%), multiple retirement lengths (15, 20, 25, 30 years), and both fixed-dollar and inflation-adjusted withdrawals. They published the now-famous **success-rate tables**: a grid of "what percentage of historical retirements survived." For a 30-year retirement with 50% stocks / 50% bonds and inflation-adjusted withdrawals, 4% had a 95% success rate; 5% dropped to roughly 71%; 6% to 51%; 7% to 33%. The penalty for greed is concave and brutal.

The 2011 update (Cooley, Hubbard, Walz, *Journal of Financial Planning*) re-ran the analysis through 2009 — i.e. including the dot-com crash and the 2008 financial crisis — and the 4%-with-mostly-stocks number held. The 2020 update through 2018 held again.`}
            </div>
          </article>

          <article key={1}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`02`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`(3) What scientists know but rarely say (the implicit knowledge)`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`This is the part employer 401(k) packets and bank "retirement calculators" almost never put in front of you in plain English:

- **Your number is 25× annual spending, not 25× income.** If you spend $40,000 a year, your freedom number is $1,000,000 — regardless of whether you earn $60K or $300K. This single substitution (spending → income) collapses the perceived gap between "rich people" and "everyone else." High earners with high spend are not free. Modest earners with controlled spend are free shockingly fast.
- **Time in the market dwarfs timing the market.** A 25-year-old who invests $500/month at a historical 7% real return retires with roughly $1.3M. The same person waiting until 35 retires with roughly $610K. The decade of compounding is worth ~$700K. No advisor product, no day-trading strategy, no side hustle reliably beats showing up early.
- **The savings rate is the lever, not the return.** Pete Adeney ("Mr. Money Mustache") made the brutal version of this point in a single 2012 blog post: if you save 10% of take-home, you work ~51 years; 25% → 32 years; 50% → 17 years; 65% → 10.5 years; 75% → 7 years. This is just Trinity math run in reverse. The reason it isn't taught is that it implies that working until 65 is a *choice produced by spending patterns*, not a law of nature.
- **Low-cost index funds beat almost all active managers over 15+ year windows.** This is the SPIVA scorecard finding S&P Global publishes every year. ~85% of active large-cap managers underperform the S&P 500 over 15 years. The financial industry knows. The retail-investor public mostly doesn't.
- **Tax-advantaged accounts (401(k), IRA, Roth, HSA) are not "perks."** They are roughly the equivalent of a 22–37% one-time bonus on every dollar contributed, compounded for decades. Skipping the employer 401(k) match is leaving free salary on the table. HSAs, if you have a high-deductible plan, are the single best-taxed account in the U.S. tax code — triple tax-advantaged.
- **Sequence-of-returns risk is the real killer, not average return.** A retiree who hits a -30% market in year 1 of retirement is in dramatically worse shape than one who hits it in year 20, even with identical average returns. This is why the Trinity math depends on stocks/bonds blends, not 100% equities, for early retirees.`}
            </div>
          </article>

          <article key={2}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`03`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`(4) What the paper does NOT claim (honest hype-vs-reality)`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`- **It does not promise 4% works forever.** Trinity is a historical bootstrap on U.S. data, 1926–present. The U.S. had the best-performing major equity market of the 20th century. International data (Pfau 2010; Wade Pfau's later "Safe Savings Rates" work) gives lower safe rates — often 3.0–3.5% — for many developed markets.
- **It does not handle retirements longer than 30 years cleanly.** A 35-year-old retiring on 4% is taking a different bet than a 65-year-old. Modern analyses (Big ERN's "Safe Withdrawal Series," ~50 posts) argue for 3.25–3.5% on 50-year horizons.
- **It does not account for fees, taxes, or behavior.** Real retirees pay expense ratios, capital-gains taxes, and panic-sell in March 2020. A 1% annual advisor fee on a 4% withdrawal is a 25% pay cut. Trinity assumes you don't pay it.
- **It does not say "withdraw 4% rigidly."** Both Bengen and the Trinity authors have publicly said the rule is a *planning anchor*, not a robotic rule. Variable-withdrawal strategies (Guyton-Klinger guardrails, CAPE-based dynamic rules) usually outperform the static 4%.
- **It says nothing about meaning, identity, or what to do with the time.** This is the part FIRE communities re-discovered the hard way around 2018–2020. The math gets you out. It doesn't tell you what's worth walking toward.`}
            </div>
          </article>

          <article key={3}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`04`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`(5) Read the original`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`- Bengen, W. P. (1994). "Determining Withdrawal Rates Using Historical Data." *Journal of Financial Planning*, 7(4): 171–180. https://www.retailinvestor.org/pdf/Bengen1.pdf
- Cooley, P., Hubbard, C., Walz, D. (1998). "Retirement Savings: Choosing a Withdrawal Rate That Is Sustainable." *AAII Journal*, February 1998. https://www.aaii.com/files/pdf/6794_retirement-savings-choosing-a-withdrawal-rate-that-is-sustainable.pdf
- Cooley, P., Hubbard, C., Walz, D. (2011). "Portfolio Success Rates: Where to Draw the Line." *Journal of Financial Planning*, April 2011. https://www.financialplanningassociation.org/article/journal/APR11-portfolio-success-rates-where-draw-line
- Pfau, W. (2010). "An International Perspective on Safe Withdrawal Rates: The Demise of the 4% Rule?" *Journal of Financial Planning*. https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1699526
- Karsten Jeske ("Big ERN"). *Safe Withdrawal Rate Series* (Parts 1–55+). https://earlyretirementnow.com/safe-withdrawal-rate-series/
- SPIVA U.S. Scorecard (annually published, S&P Dow Jones Indices). https://www.spglobal.com/spdji/en/research-insights/spiva/

— file path: \`C:\AtomEons\.claude\worktrees\bold-leakey-4470e8\research\decoded\compound-interest-saving.md\` (suggested write location; not written, returned inline per directive)`}
            </div>
          </article>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <Link href="/research/decoded" className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] px-5 py-2.5 text-sm text-[#9BA5A7] transition-colors hover:text-[#E7EBED]">
            ← research / decoded index
          </Link>
        </div>
      </section>
    </main>
  );
}
