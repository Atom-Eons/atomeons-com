import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Five Minutes a Day Buys You Three Extra Years (And Why the Gym Industry Will Never Say It Out Loud) · Research / Decoded · AtomEons",
  description: "Running as little as 5–10 minutes per day, at slow speeds under 6 mph, cuts your risk of dying from any cause by about 30% and adds roughly 3 years to your life — and running more than that adds almost nothing on top.",
  alternates: { canonical: "https://atomeons.com/research/decoded/exercise-mortality" },
  openGraph: {
    title: "Five Minutes a Day Buys You Three Extra Years (And Why the Gym Industry Will Never Say It Out Loud)",
    description: "Running as little as 5–10 minutes per day, at slow speeds under 6 mph, cuts your risk of dying from any cause by about 30% and adds roughly 3 years to your life — and running more than that adds almost nothing on top.",
    url: "https://atomeons.com/research/decoded/exercise-mortality",
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
          <span className="text-[#1A2225]">/</span> {`Five Minutes a Day Buys You Three Extra Years (And Why the Gym Industry Will Never Say It Out Loud)`}
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9BA5A7]">
            {`Duck-chul Lee, Russell R. Pate, Carl J. Lavie, Xuemei Sun, Timothy S. Church, Steven N. Blair — *Journal of the American College of Cardiology* (JACC), Vol. 64, No. 5, 2014. Aerobics Center Longitudinal Study cohort, 55,137 adults followed for a mean of 15 years.`}
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            {`Five Minutes a Day Buys You Three Extra Years (And Why the Gym Industry Will Never Say It Out Loud)`}
          </h1>
          <p className="mt-8 max-w-[62ch] text-[17px] leading-[1.65] text-[#C8CCCE]">
            {`Running as little as 5–10 minutes per day, at slow speeds under 6 mph, cuts your risk of dying from any cause by about 30% and adds roughly 3 years to your life — and running more than that adds almost nothing on top.`}
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
              {`2. What the scientists actually did`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`The Aerobics Center Longitudinal Study (ACLS) is one of the few cohorts in the world large enough, long enough, and clinically annotated enough to answer dose-response questions about exercise without drowning in confounders. Participants came to the Cooper Clinic in Dallas for a baseline medical exam between 1974 and 2002. They filled out detailed activity questionnaires, got a maximal treadmill test, and then were followed for mortality outcomes via the National Death Index.

Lee's team isolated runners (n = 13,016) from non-runners (n = 42,121). They sliced the runners five ways by dose:
- weekly running time (<51, 51–149, 150+ min/wk)
- weekly mileage (<6, 6–12, 12+ mi/wk)
- frequency (1–2, 3–5, 6+ days/wk)
- speed (<6, 6–7, 7+ mph)
- total MET-min/week

Then they ran Cox proportional-hazards models, adjusting for age, sex, smoking, alcohol, BMI, family history of cardiovascular disease, and other lifestyle activity. They also ran sensitivity analyses excluding deaths in the first 5 years (to control for reverse causation — sick people exercise less, not the other way around) and persistent-runner analyses (people who reported running at two clinic visits years apart).

**The dose-response curve was strikingly flat.** A person running less than 51 min/week had a hazard ratio for all-cause mortality of 0.71 vs non-runners. A person running 176+ min/week had a hazard ratio of 0.73. The two are statistically indistinguishable. The benefit appears almost immediately and then plateaus.

Persistent runners — people who kept running across visits — gained an estimated 3.0 years of life expectancy compared with persistent non-runners.`}
            </div>
          </article>

          <article key={1}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`02`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`3. What scientists know but rarely say`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`This is where the implicit knowledge lives.

**The 150-min/week guideline is a political number, not a biological one.** It was set by the WHO and reaffirmed by the U.S. Department of Health and Human Services as a round, defensible, easy-to-communicate target. The underlying epidemiology — Lee 2014, Wen et al. 2011 *Lancet* (15 min/day Taiwan cohort, 416,175 people), Arem et al. 2015 *JAMA Internal Medicine* — has shown for over a decade that the curve elbows hard at the low end. Public-health officials know this. They keep the higher number because they worry that if they tell people 5 minutes is enough, people will hear "exercise doesn't matter." The number is paternalistic.

**The fitness industry has the opposite incentive.** Gyms, peloton classes, marathon training plans, supplement brands, and athleisure all need you to believe that more is better. Volume is the product. If 10 minutes captured most of the benefit, the entire industry's pricing model collapses. So the public messaging gets pulled in two directions — government underselling the low-dose, industry overselling the high-dose — and the citizen in the middle hears noise.

**Intensity beats duration for the first few minutes.** The benefit of running 5 minutes at a jogging pace exceeds the benefit of walking 30 minutes. The biological mechanism is that running pushes heart rate above the threshold where vascular endothelium remodels, autonomic tone resets, and skeletal muscle expresses irisin and other myokines. Slow walking does not cross that threshold reliably. This is why "10,000 steps" is much weaker advice than "5 minutes of anything that makes you breathe hard."

**The curve is U-shaped at the very top.** Extreme endurance athletes (>4 hr/week of high-intensity running for years) show *some* attenuation of benefit and elevated risk of atrial fibrillation, coronary calcification, and right-ventricular damage. The penalty is small — these athletes still outlive non-runners — but the "more is always better" framing is empirically false.

**You can't out-exercise a bad diet, but you can out-exercise being sedentary very cheaply.** The first 5 minutes a day matter more than the next 50. After that the marginal return is mostly aesthetic, athletic, or psychological — not life-extending.`}
            </div>
          </article>

          <article key={2}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`03`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`4. What the paper does NOT claim`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`- It does not claim 5 minutes/day will make you fit, lean, or athletic. It claims it cuts your mortality risk. Those are different outcomes.
- It does not claim running is uniquely magical. Comparable cohorts (Wen 2011, Arem 2015) show similar curves for brisk walking, cycling, and other moderate-to-vigorous activity. Running was the variable Lee's cohort recorded most cleanly.
- It does not establish causation. It is observational. People who run may differ systematically from people who don't in ways the adjustment didn't catch. The persistent-runner and lag-time sensitivity analyses make confounding less likely, but a randomized 15-year trial of running vs not-running is not ethically or logistically possible.
- It does not say more is harmful. It says more produces diminishing returns for mortality. The high-end U-shape comes from other studies.
- It does not address strength training, mobility, or musculoskeletal aging. Resistance training has its own dose-response curve (also front-loaded — see Momma et al. 2022 *Br J Sports Med*) and protects against different outcomes.
- It does not apply to people with active cardiac disease without clearance. Sudden cardiac events during exercise are rare but elevated in undiagnosed coronary disease.`}
            </div>
          </article>

          <article key={3}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`04`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`5. Read the original`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`1. **Lee DC, Pate RR, Lavie CJ, Sun X, Church TS, Blair SN.** "Leisure-Time Running Reduces All-Cause and Cardiovascular Mortality Risk." *J Am Coll Cardiol* 2014;64(5):472–481. https://www.jacc.org/doi/10.1016/j.jacc.2014.04.058

2. **Wen CP, Wai JPM, Tsai MK, et al.** "Minimum amount of physical activity for reduced mortality and extended life expectancy: a prospective cohort study." *Lancet* 2011;378(9798):1244–1253. The Taiwanese 416,175-person cohort showing 15 min/day → 3-year life extension. https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(11)60749-6/fulltext

3. **Arem H, Moore SC, Patel A, et al.** "Leisure Time Physical Activity and Mortality: A Detailed Pooled Analysis of the Dose-Response Relationship." *JAMA Intern Med* 2015;175(6):959–967. The pooled-cohort analysis showing the curve plateaus around 3–5× the minimum guideline. https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/2212267

4. **Momma H, Kawakami R, Honda T, Sawada SS.** "Muscle-strengthening activities are associated with lower risk and mortality in major non-communicable diseases: a systematic review and meta-analysis of cohort studies." *Br J Sports Med* 2022;56(13):755–763. The companion finding for strength training — also front-loaded, also plateaus fast. https://bjsm.bmj.com/content/56/13/755

5. **Physical Activity Guidelines Advisory Committee.** *2018 Physical Activity Guidelines Advisory Committee Scientific Report.* U.S. Department of Health and Human Services. The official source where the 150-min/week target lives, with the underlying evidence tables that show the curve plateau the guideline number obscures. https://health.gov/our-work/nutrition-physical-activity/physical-activity-guidelines/current-guidelines/scientific-report`}
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
