import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "What Fasting Actually Does to Your Cells (Ohsumi's Nobel Work + Longo/Mattson's Clinical Evidence) · Research / Decoded · AtomEons",
  description: "Skipping meals for 12–24 hours triggers a real, Nobel-Prize-validated cellular cleanup process called autophagy — but most of the dramatic numbers you've seen online come from yeast and mice, not the human you're trying to fix.",
  alternates: { canonical: "https://atomeons.com/research/decoded/fasting-autophagy" },
  openGraph: {
    title: "What Fasting Actually Does to Your Cells (Ohsumi's Nobel Work + Longo/Mattson's Clinical Evidence)",
    description: "Skipping meals for 12–24 hours triggers a real, Nobel-Prize-validated cellular cleanup process called autophagy — but most of the dramatic numbers you've seen online come from yeast and mice, not the human you're trying to fix.",
    url: "https://atomeons.com/research/decoded/fasting-autophagy",
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
          <span className="text-[#1A2225]">/</span> {`What Fasting Actually Does to Your Cells (Ohsumi's Nobel Work + Longo/Mattson's Clinical Evidence)`}
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9BA5A7]">
            {`Yoshinori Ohsumi (Nobel Lecture, *Genes to Cells*, 2017) + Rafael de Cabo & Mark P. Mattson (*New England Journal of Medicine*, 2019) + Valter Longo et al. (*Cell Metabolism*, 2014, 2017)`}
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            {`What Fasting Actually Does to Your Cells (Ohsumi's Nobel Work + Longo/Mattson's Clinical Evidence)`}
          </h1>
          <p className="mt-8 max-w-[62ch] text-[17px] leading-[1.65] text-[#C8CCCE]">
            {`Skipping meals for 12–24 hours triggers a real, Nobel-Prize-validated cellular cleanup process called autophagy — but most of the dramatic numbers you've seen online come from yeast and mice, not the human you're trying to fix.`}
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
              {`**Ohsumi's experiments (1988–2016):** Ohsumi worked with baker's yeast (*Saccharomyces cerevisiae*) — the same yeast that makes bread rise. He starved the yeast of nitrogen, then watched its vacuole (the yeast equivalent of a lysosome) under a microscope. He saw small bubbles — *autophagosomes* — accumulating. He then ran a genetic screen and found 15 *ATG* genes (autophagy-related genes) required for the process. Most of these genes have direct human equivalents. This is what won the Nobel: he gave the field a map.

**Longo's lab (USC):** Ran a 2014 *Cell Metabolism* study and a 2017 *Science Translational Medicine* trial on the "Fasting-Mimicking Diet" — 5 days of ~750–1100 kcal/day, once a month, for 3 months. Measured IGF-1, fasting glucose, CRP, and abdominal fat in 100 adults. Saw modest but statistically significant improvements.

**De Cabo & Mattson 2019 *NEJM* review:** Synthesized roughly 85 human and animal trials on time-restricted feeding (TRF), alternate-day fasting (ADF), and 5:2. The mechanism story they tell is: during a fast of ~12+ hours, the liver runs out of stored glycogen, switches to burning fat, produces ketone bodies (especially β-hydroxybutyrate), and β-hydroxybutyrate then acts as a signaling molecule — not just fuel — turning on stress-resistance genes like FOXO3 and SIRT3.`}
            </div>
          </article>

          <article key={1}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`02`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`(3) What scientists know but rarely say (the implicit stuff)`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`This is the part the wellness internet skips.

- **Autophagy in humans has almost never been directly measured.** You cannot biopsy a living person's liver every 6 hours to count autophagosomes. Most claims about "autophagy starts at 16 hours" or "peaks at 72 hours" are extrapolated from yeast, mice, or LC3-II Western blots in cell culture. The exact human timing is genuinely unknown. Anyone giving you a precise hour-count is guessing in a confident voice.
- **The dose-response curve is not linear.** Going from 0 fasting days to 1 day a week produces most of the metabolic benefit. Going from 1 to 7 produces less marginal benefit and more downside risk (muscle loss, gallstones, refeeding issues).
- **"Autophagy" is a category, not a single dial.** There are at least three forms (macroautophagy, microautophagy, chaperone-mediated autophagy). Selective subtypes (mitophagy, lipophagy, xenophagy) target specific cargo. "Boost autophagy" without specifying which one is like saying "boost transportation."
- **mTOR inhibition is the actual mechanism most fasting protocols hit.** When you eat protein (especially leucine), mTORC1 turns on and autophagy turns off. When mTORC1 is suppressed, autophagy turns on. This is why protein timing matters more than calorie timing for the autophagy story specifically.
- **Coffee with cream probably breaks the fast for autophagy purposes, but black coffee probably doesn't.** This is rarely stated cleanly. The threshold is: anything that spikes insulin or activates mTOR ends the fasted state at the cellular level. Black coffee, plain tea, and water do not. A splash of milk technically does.
- **The strongest human evidence is for metabolic markers, not lifespan.** No randomized controlled trial has shown intermittent fasting extends human lifespan. The lifespan claims come from mice and worms. The human studies show better insulin sensitivity, lower blood pressure, and modest weight loss — not extra decades.
- **Women's hormonal response differs.** Multiple small studies suggest pre-menopausal women may experience cycle disruption with aggressive fasting protocols (ADF, 24-hour fasts). This is barely covered in the popular literature.
- **Refeeding is when most of the regeneration happens.** Stem-cell activation in Longo's mouse studies happened on the refeeding day, not the fasting days. Fasting is the stress; refeeding is the rebuild.`}
            </div>
          </article>

          <article key={2}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {`03`}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`(4) What the paper does NOT claim`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`- It does **not** claim fasting cures cancer. Longo has shown fasting may sensitize tumor cells to chemotherapy in mice and a small human trial. That is a long way from "cures."
- It does **not** claim a specific hour-count triggers autophagy in humans. Mattson explicitly hedges this in the *NEJM* paper.
- It does **not** claim intermittent fasting is superior to plain caloric restriction. Most head-to-head trials show equivalent weight loss when calories are matched.
- It does **not** claim fasting is safe for everyone. Type 1 diabetics, pregnant women, people with eating-disorder histories, and people on certain medications are explicitly excluded from most trial protocols.
- It does **not** claim "longer is always better." Fasts beyond ~5 days have diminishing returns and increasing risk in clinical settings.
- It does **not** validate 72-hour or 7-day "autophagy fasts" as having proven added benefit over a regular 14:10 or 16:8 schedule for general health.`}
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
              {`- **Ohsumi, Y. (2017).** *Yoshinori Ohsumi: Autophagy from beginnings to Nobel Prize.* Nobel Lecture / *Genes to Cells.* → [https://www.nobelprize.org/prizes/medicine/2016/ohsumi/lecture/](https://www.nobelprize.org/prizes/medicine/2016/ohsumi/lecture/)
- **de Cabo, R., & Mattson, M. P. (2019).** *Effects of Intermittent Fasting on Health, Aging, and Disease.* *NEJM* 381:2541–2551. → [https://www.nejm.org/doi/full/10.1056/NEJMra1905136](https://www.nejm.org/doi/full/10.1056/NEJMra1905136)
- **Longo, V. D., & Mattson, M. P. (2014).** *Fasting: Molecular Mechanisms and Clinical Applications.* *Cell Metabolism* 19(2):181–192. → [https://www.cell.com/cell-metabolism/fulltext/S1550-4131(13)00503-2](https://www.cell.com/cell-metabolism/fulltext/S1550-4131(13)00503-2)
- **Wei, M., Brandhorst, S., Longo, V. D., et al. (2017).** *Fasting-mimicking diet and markers/risk factors for aging, diabetes, cancer, and cardiovascular disease.* *Science Translational Medicine* 9(377):eaai8700. → [https://www.science.org/doi/10.1126/scitranslmed.aai8700](https://www.science.org/doi/10.1126/scitranslmed.aai8700)
- **Mizushima, N., & Komatsu, M. (2011).** *Autophagy: Renovation of Cells and Tissues.* *Cell* 147(4):728–741. (The standard mechanistic reference.) → [https://www.cell.com/cell/fulltext/S0092-8674(11)01276-1](https://www.cell.com/cell/fulltext/S0092-8674(11)01276-1)`}
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
