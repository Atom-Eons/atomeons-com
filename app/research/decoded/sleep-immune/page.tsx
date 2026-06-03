import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sleeping Less Than Six Hours Makes You Four Times More Likely to Catch a Cold — Decoded · Research / Decoded · AtomEons",
  description: "When researchers locked 164 healthy adults in a hotel and dripped cold virus into their noses, the people who'd been sleeping under six hours a night got sick 4.2 times more often than those sleeping seven-plus — and the mechanism (suppressed T-cells, inflamed cytokine signaling, broken antibody response) is the same one that drives long-term cardiovascular and metabolic disease.",
  alternates: { canonical: "https://atomeons.com/research/decoded/sleep-immune" },
  openGraph: {
    title: "Sleeping Less Than Six Hours Makes You Four Times More Likely to Catch a Cold — Decoded",
    description: "When researchers locked 164 healthy adults in a hotel and dripped cold virus into their noses, the people who'd been sleeping under six hours a night got sick 4.2 times more often than those sleeping seven-plus — and the mechanism (suppressed T-cells, inflamed cytokine signaling, broken antibody response) is the same one that drives long-term cardiovascular and metabolic disease.",
    url: "https://atomeons.com/research/decoded/sleep-immune",
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
          <span className="text-[#1A2225]">/</span> {`Sleeping Less Than Six Hours Makes You Four Times More Likely to Catch a Cold — Decoded`}
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9BA5A7]">
            {`Prather, Janicki-Deverts, Hall, & Cohen (Sleep, 2015) + Irwin & Opp (Neuropsychopharmacology, 2017 review)`}
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            {`Sleeping Less Than Six Hours Makes You Four Times More Likely to Catch a Cold — Decoded`}
          </h1>
          <p className="mt-8 max-w-[62ch] text-[17px] leading-[1.65] text-[#C8CCCE]">
            {`When researchers locked 164 healthy adults in a hotel and dripped cold virus into their noses, the people who'd been sleeping under six hours a night got sick 4.2 times more often than those sleeping seven-plus — and the mechanism (suppressed T-cells, inflamed cytokine signaling, broken antibody response) is the same one that drives long-term cardiovascular and metabolic disease.`}
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
              {`2. What scientists actually did`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`**Prather 2015 (the cold-challenge study):**
- Recruited 164 healthy adults aged 18-55. No current illness, no smokers, normal BMI.
- For 7 consecutive days before exposure, every participant wore an actigraphy wrist monitor (Motionlogger Octagonal) and kept a sleep diary. This is critical: they measured *actual sleep*, not self-reported sleep, which is typically inflated by 30-60 minutes.
- Quarantined participants in a hotel for 5 days. Dripped rhinovirus-39 directly into both nostrils.
- Measured infection two ways: (a) viral shedding via daily nasal washes cultured in lab, (b) clinical cold via daily mucus weight + symptom scoring. Both had to hit thresholds to count as a "cold."
- Result: Adjusted for age, BMI, race, education, income, season, pre-challenge antibody levels, and psychological stress, people sleeping <5 hours had a 4.50x higher odds ratio of clinical cold vs. 7+ hours. 5-6 hours: 4.24x. 6-7 hours: 1.66x (not significant). Sleep efficiency (% of time in bed actually asleep) also predicted infection independently.

**Irwin & Opp 2017 (the mechanistic review):**
- Synthesized roughly 200 studies across humans, rodents, and cell culture.
- Documented that even one night of 4-hour sleep drops natural killer cell cytotoxicity by 70% the next day.
- Showed sleep deprivation blunts the antibody response to flu, hepatitis A, hepatitis B, and H1N1 vaccines by 50% — and the deficit persists for up to a year.
- Tracked the cytokine cascade: short sleep elevates IL-6, TNF-α, and CRP (chronic inflammation markers) while suppressing the Th1 cellular immunity that fights viruses.`}
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
              {`This is where the public-facing translation usually stops short.

**Self-reported sleep is wrong by ~45 minutes on average, always in the optimistic direction.** Every "I sleep 7 hours" claim, when actually measured with actigraphy, comes in around 6:15-6:30. If you *think* you're getting 7, you're probably in the 6-6.5 range, which is already in the elevated-infection zone.

**"Catching up on weekends" doesn't repair the damage.** Van Dongen 2003 (often cited alongside these two) showed that two recovery nights after a week of restricted sleep don't restore cognitive performance to baseline, and Irwin's data shows the same for immune function — inflammatory markers stay elevated.

**The 13% all-cause mortality elevation in habitual short-sleepers (<6h) is on par with light smoking.** This is from meta-analyses that the cold studies sit inside. Cappuccio 2010, pooling 1.3 million people, found <6h sleep associated with 12% increased mortality risk. Sleep researchers know this. Cardiologists rarely mention it during checkups.

**"I do fine on 5-6 hours" is a known cognitive blind spot.** Van Dongen showed people restricted to 6 hours for two weeks performed as badly on attention tasks as people pulling all-nighters — but they *subjectively* felt only mildly impaired. The brain stops registering its own deficit. The people most confident in their tolerance for short sleep are the ones most impaired by it.

**Vaccine timing matters and almost no one tells you.** If you got a flu or COVID shot after a week of 5-hour nights, your antibody response is roughly half what it would have been with adequate sleep. The shot's not broken — your immune system is. Sleep the week *before* a vaccine, not just after.

**The "8 hours" number is an average, not a law.** Adult sleep need is normally distributed with a mean around 7.5-8 hours. About 5% of adults genuinely need 6 hours; about 5% need 9+. The genetic short-sleepers (carrying mutations in *DEC2* or *ADRB1*) exist but are rare — vanishingly rare compared to the number of people who *claim* to be one.`}
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
              {`- Not "sleep more, never get sick." Sleep is one variable among many — viral load, age, baseline immunity, stress, and genetics all matter. The effect size is large but not deterministic.
- Not "9 hours is better than 8." Both Prather and the meta-analyses show a U-shaped curve: long sleepers (>9h habitually) also have elevated mortality, though the mechanism is less clear (likely reverse causation — underlying illness causes long sleep, not the reverse).
- Not "naps fix everything." Naps help acute deficit but don't fully restore the immune signaling damaged by chronic restriction.
- Not "if you have insomnia it's your fault." Clinical insomnia has measurable neurobiological substrate; willpower doesn't fix it. CBT-I (cognitive behavioral therapy for insomnia) is the evidence-based intervention, not sleep hygiene tips.
- Not "everyone needs exactly 8 hours." The need is individual, but the floor below which immune function reliably degrades is around 7 hours of *actual* sleep for the median adult.`}
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
              {`1. Prather, A. A., Janicki-Deverts, D., Hall, M. H., & Cohen, S. (2015). *Behaviorally Assessed Sleep and Susceptibility to the Common Cold.* Sleep, 38(9), 1353-1359. https://doi.org/10.5665/sleep.4968 — the cold-challenge study itself, freely available via PMC: https://pmc.ncbi.nlm.nih.gov/articles/PMC4531403/

2. Irwin, M. R., & Opp, M. R. (2017). *Sleep Health: Reciprocal Regulation of Sleep and Innate Immunity.* Neuropsychopharmacology, 42, 129-155. https://doi.org/10.1038/npp.2016.148 — the comprehensive mechanistic review covering NK cells, cytokines, vaccine response.

3. Cappuccio, F. P., D'Elia, L., Strazzullo, P., & Miller, M. A. (2010). *Sleep duration and all-cause mortality: a systematic review and meta-analysis of prospective studies.* Sleep, 33(5), 585-592. https://doi.org/10.1093/sleep/33.5.585 — the 1.3-million-person mortality data.

4. Van Dongen, H. P. A., Maislin, G., Mullington, J. M., & Dinges, D. F. (2003). *The Cumulative Cost of Additional Wakefulness.* Sleep, 26(2), 117-126. https://doi.org/10.1093/sleep/26.2.117 — the cognitive blind-spot study showing chronic short sleepers don't know they're impaired.

5. Prather, A. A., et al. (2012). *Sleep and Antibody Response to Hepatitis B Vaccination.* Sleep, 35(8), 1063-1069. https://doi.org/10.5665/sleep.1990 — the vaccine response data showing sleep the week before matters.

File written: C:\AtomEons\.claude\worktrees\bold-leakey-4470e8\research\decoded\sleep-immune.md (returned inline above for direct paste)`}
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
