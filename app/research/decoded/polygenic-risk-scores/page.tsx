import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Polygenic Risk Scores: The Genetic Report Your Doctor Could Order But Won't · Research / Decoded · AtomEons",
  description: "Researchers showed that adding up the effects of millions of tiny genetic variants — variants any consumer DNA test can already see — can identify people whose lifetime risk for heart attack, breast cancer, type 2 diabetes, or atrial fibrillation rivals the risk of carrying a single \"bad gene,\" yet U.S. medicine has not adopted the test because nobody owns the workflow, no insurer pays for it, and no professional society has stamped a guideline.",
  alternates: { canonical: "https://atomeons.com/research/decoded/polygenic-risk-scores" },
  openGraph: {
    title: "Polygenic Risk Scores: The Genetic Report Your Doctor Could Order But Won't",
    description: "Researchers showed that adding up the effects of millions of tiny genetic variants — variants any consumer DNA test can already see — can identify people whose lifetime risk for heart attack, breast cancer, type 2 diabetes, or atrial fibrillation rivals the risk of carrying a single \"bad gene,\" yet U.S. medicine has not adopted the test because nobody owns the workflow, no insurer pays for it, and no professional society has stamped a guideline.",
    url: "https://atomeons.com/research/decoded/polygenic-risk-scores",
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
          <span className="text-[#1A2225]">/</span> {`Polygenic Risk Scores: The Genetic Report Your Doctor Could Order But Won't`}
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9BA5A7]">
            {`Khera, Chaffin, Aragam, Haas, Roselli, Choi, Natarajan, Lander, Lubitz, Ellinor, Kathiresan — *Nature Genetics* (2018); plus the broader PRS literature 2018-2024`}
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            {`Polygenic Risk Scores: The Genetic Report Your Doctor Could Order But Won't`}
          </h1>
          <p className="mt-8 max-w-[62ch] text-[17px] leading-[1.65] text-[#C8CCCE]">
            {`Researchers showed that adding up the effects of millions of tiny genetic variants — variants any consumer DNA test can already see — can identify people whose lifetime risk for heart attack, breast cancer, type 2 diabetes, or atrial fibrillation rivals the risk of carrying a single "bad gene," yet U.S. medicine has not adopted the test because nobody owns the workflow, no insurer pays for it, and no professional society has stamped a guideline.`}
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
              {`Khera and colleagues pulled together genome-wide association studies (GWAS) — the giant studies where researchers genotype hundreds of thousands of people and find the millions of common variants statistically linked to a disease.

They built PRS for five conditions: coronary artery disease, atrial fibrillation, type 2 diabetes, inflammatory bowel disease, and breast cancer.

The method, mechanically:
- Take ~6.6 million common variants across the genome.
- For each variant, attach the "effect size" from a published GWAS — how much that variant nudges risk up or down.
- For a given person, multiply each variant's effect by 0, 1, or 2 (how many copies that person carries).
- Sum across all 6.6 million variants. That number is the PRS.

They then tested the PRS on ~290,000 UK Biobank participants. The headline result: the top 8% of the distribution had ≥3-fold elevated risk for coronary artery disease versus the rest of the population. The top 0.5% had ~5-fold risk. For breast cancer, top 1.5% had ≥3-fold risk. Similar patterns for diabetes, atrial fib, IBD.

For comparison: carrying a single *BRCA1* variant gives ~6-fold elevated breast cancer risk, and that *is* something insurance pays to screen for and that triggers prophylactic mastectomy conversations. The PRS top tier is in the same ballpark, but triggers nothing.`}
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
              {`This is the layer the textbooks won't print.

**A. The infrastructure is the bottleneck, not the science.** Every credentialed cardiogeneticist will quietly agree that PRS for CAD is ready for clinic. They will not write a letter to JAMA saying so. The reason is that no CPT billing code exists, no major guideline (ACC, AHA, USPSTF) has endorsed it, and the legal/insurance plumbing for "your DNA says you're high-risk but your cholesterol panel is normal" doesn't exist. Doctors who order tests with no guideline backing get reimbursement denials.

**B. Ancestry bias is real, often overstated, and shrinking.** The original Khera 2018 score was trained on European-ancestry samples. Performance drops in African, East Asian, South Asian populations — typically by 30-50%. The fix (multi-ancestry GWAS) is rolling out and largely solved by 2024 for the big-five diseases. The PRS critique "it only works for white people" was true in 2018 and is now used as an excuse to not deploy at all, even for populations where it does work.

**C. The clinical action is usually unglamorous.** A high CAD PRS doesn't unlock a magic drug. It unlocks: a statin at 35 instead of 55, a low-dose aspirin conversation, aggressive blood pressure target, lifestyle counseling that the patient actually takes seriously *because the number is on a piece of paper*. The behavioral effect is half the value. Doctors trained in evidence-based medicine are squeamish about "tests whose main effect is behavioral change," even when the change is the change we want.

**D. 23andMe / Ancestry data is good enough.** Direct-to-consumer arrays cover the SNPs PRS scores use. The companies don't surface PRS because of FDA constraints — they are allowed to report on a small, FDA-cleared list of variants. They are *not* allowed to tell you your CAD polygenic score. The data is in your account. The interpretation is regulated away.

**E. The "20% of people are high-risk" framing means most people get reassurance.** This is rarely advertised. If PRS were deployed at scale, ~80% of patients would learn they are average or below-average risk — which is itself clinically useful (avoid overtreatment, avoid anxiety, justify less aggressive screening).`}
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
              {`- **Not deterministic.** A high PRS is a probability shift, not a diagnosis. Many top-decile people never have a heart attack. Many bottom-decile people do. PRS adds to, doesn't replace, conventional risk factors.
- **Not a replacement for cholesterol panels, blood pressure, smoking history, family history.** It complements them. The best models stack PRS *with* clinical risk factors.
- **Not validated for individual life-or-death decisions in 2018.** The paper proposed clinical utility; it did not prove that PRS-guided intervention improves mortality in a randomized trial. As of 2024, randomized trials are underway (e.g., GENESIS, eMERGE) but the definitive RCT showing "PRS-guided statin initiation reduces mortality" doesn't exist yet.
- **Not universal across diseases.** PRS works well for CAD, breast cancer, type 2 diabetes, atrial fib, prostate cancer, glaucoma. It works poorly for most psychiatric conditions (schizophrenia, depression PRS has predictive power but small effect sizes), and almost not at all for rare or strongly environmental diseases.
- **Not a privacy-free instrument.** A polygenic score is functionally a genetic fingerprint. Insurance discrimination is illegal in U.S. health insurance under GINA (2008) but NOT illegal in life insurance, long-term care insurance, or disability insurance. This is a real reason patients hesitate.`}
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
              {`- **Khera et al. (2018), "Genome-wide polygenic scores for common diseases identify individuals with risk equivalent to monogenic mutations"** — *Nature Genetics* 50, 1219–1224. The paper. https://www.nature.com/articles/s41588-018-0183-z
- **Torkamani, Wineinger, Topol (2018), "The personal and clinical utility of polygenic risk scores"** — *Nature Reviews Genetics*. The clinical-translation companion that maps out what's needed for deployment. https://www.nature.com/articles/s41576-018-0018-x
- **Martin et al. (2019), "Clinical use of current polygenic risk scores may exacerbate health disparities"** — *Nature Genetics* 51, 584–591. The ancestry-bias paper. Important counterweight. https://www.nature.com/articles/s41588-019-0379-x
- **Lewis & Vassos (2020), "Polygenic risk scores: from research tools to clinical instruments"** — *Genome Medicine* 12, 44. Plain-English translation pitched at physicians. https://genomemedicine.biomedcentral.com/articles/10.1186/s13073-020-00742-5
- **UK NHS Genomic Medicine Service (2023-2024) — pilot deployment of PRS for CAD, breast cancer in select primary-care cohorts.** The first national health system to operationalize it. https://www.england.nhs.uk/genomics/

Your 23andMe raw data export is at: \`Account → Settings → Browse raw data → Download\`. The file is yours. The interpretation is, currently, a research-grade computation that U.S. clinical medicine has declined to perform on your behalf.`}
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
