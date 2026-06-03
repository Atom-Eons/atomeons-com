import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AlphaFold 2 · decoded · AtomEons",
  description:
    "Jumper et al. 2021 — the DeepMind paper that solved a 50-year-old grand challenge in biology by predicting the 3D structure of any protein from its amino acid sequence. Plain English. The biggest non-LLM AI breakthrough.",
  alternates: { canonical: "https://atomeons.com/research/decoded/alphafold" },
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
          <Link href="/research" className="hover:text-[#22F0D5]">Research</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/research/decoded" className="hover:text-[#22F0D5]">Decoded</Link>{" "}
          <span className="text-[#1A2225]">/</span> AlphaFold 2
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9BA5A7]">
            2021 · Nature 596 · Jumper, Evans, Pritzel, Green, Figurnov et al. · DeepMind · Won 2024 Nobel Prize in Chemistry
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            A fifty-year-old problem,{" "}
            <span style={{ color: ACCENT }}>solved.</span>
          </h1>
          <p className="mt-8 max-w-[62ch] text-[17px] leading-[1.65] text-[#C8CCCE]">
            <span className="text-[#22F0D5]">In one sentence: </span>
            DeepMind built an AI that takes a protein&apos;s linear amino acid sequence as input and predicts its three-dimensional folded structure with near-experimental accuracy — solving the protein-folding problem that biologists had grappled with since 1972.
          </p>
        </div>
      </section>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24 space-y-12">
          <article>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              01 · Why this matters to your life
            </p>
            <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              Proteins do the actual work in biology. Every drug works by affecting a protein. Every disease has protein dysfunction at its core. Understanding what a protein looks like in three dimensions is the foundation of modern medicine — but until 2021, figuring out the 3D shape of a single new protein could take years of expensive experimental work.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              AlphaFold 2 made the problem essentially free. The DeepMind team released structures for over 200 million proteins — nearly every known protein in nature — in 2022. The AlphaFold Protein Structure Database is now used by approximately 2 million researchers worldwide. Drug discovery, vaccine design, enzyme engineering, basic biology — every field touching proteins now starts with AlphaFold predictions and uses experimental verification only where it matters most.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              Demis Hassabis (CEO of DeepMind) and John Jumper (the paper&apos;s lead) shared the 2024 Nobel Prize in Chemistry for this work, alongside David Baker of UW (for protein design). It is the most consequential AI-for-science breakthrough to date.
            </p>
          </article>

          <article>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              02 · What scientists actually did
            </p>
            <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The protein-folding problem is this: a protein is a chain of amino acids. The chain folds into a specific 3D shape determined by the physics of how those amino acids interact. The shape determines the protein&apos;s function. Predicting the shape from the sequence is a quantum-mechanical problem of staggering complexity if you try to simulate it from physics directly.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              DeepMind&apos;s insight: don&apos;t simulate the physics. Train a neural network to predict the structure from evolutionary patterns. Every protein in nature has been refined by evolution, and proteins with similar sequences tend to fold into similar shapes. The model — a transformer-like architecture using multi-sequence alignments and learning structural geometric constraints — learned the pattern.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              At the 2020 CASP14 protein-folding competition (a biennial blind test for predictions against experimentally-determined structures), AlphaFold 2&apos;s predictions matched experimental data with accuracy approaching the experimental error itself. The competition organizer announced the protein-folding problem had been solved. That had never been said before.
            </p>
          </article>

          <article>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              03 · What scientists know but rarely say
            </p>
            <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              AlphaFold 2 works because evolution did the hard part. The model learned from ~170,000 experimentally-determined protein structures (the Protein Data Bank) plus the alignment patterns of related sequences from millions of evolved proteins. It generalizes to new sequences because evolution has constrained the space of possible structures enough for a neural network to learn the constraints. The model does not understand the physics — it has memorized the patterns physics produces.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The honest limitation: AlphaFold 2 predicts the most likely fold under physiological conditions. Many proteins do not have a single fold — they shift between conformations as part of their function, or only fold when bound to a partner, or remain partially disordered. The model says less about these cases. The 2024 AlphaFold 3 paper extended the technique to protein-DNA, protein-RNA, and protein-small-molecule complexes, but the limitation around dynamic / multi-state proteins is still partial.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The other unstated reality: this is not a closed problem. The shift from &ldquo;static structure prediction&rdquo; to &ldquo;protein dynamics + function prediction + drug design&rdquo; is the active research frontier. Companies like Isomorphic Labs (DeepMind&apos;s drug-discovery spinout) are building on AlphaFold to actually design new therapeutics. The breakthrough opened a new field; it did not finish it.
            </p>
          </article>

          <article>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              04 · What the paper does NOT claim
            </p>
            <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The paper does not claim AlphaFold designs new proteins. It predicts the structures of existing ones. Protein design — creating new sequences for new functions — is a related but distinct problem. David Baker&apos;s RoseTTAFold work and the related diffusion-protein-design papers (RFdiffusion, ProteinMPNN) address that. The 2024 Nobel went to both Hassabis/Jumper (prediction) and Baker (design) precisely because both are necessary.
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
              The paper also does not claim its predictions are perfect. It reports per-residue confidence scores. High-confidence predictions match experiment beautifully. Low-confidence predictions (often disordered or flexible regions) should not be trusted. Researchers using AlphaFold know to check the confidence scores; press coverage often does not.
            </p>
          </article>

          <article>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              05 · Read the original
            </p>
            <ul className="mt-5 max-w-[62ch] space-y-3 text-[15px] leading-[1.7] text-[#C8CCCE]">
              <li>· <a href="https://www.nature.com/articles/s41586-021-03819-2" target="_blank" rel="noopener" className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-2 hover:decoration-[#22F0D5]">Nature 596, 583–589 (2021)</a> — the original Nature paper. Published August 2021.</li>
              <li>· <a href="https://alphafold.ebi.ac.uk" target="_blank" rel="noopener" className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-2 hover:decoration-[#22F0D5]">alphafold.ebi.ac.uk</a> — the public database with 200M+ predicted structures. Free to use. Two million researchers and counting.</li>
              <li>· Abramson et al. 2024 (AlphaFold 3) — the extension to protein complexes with DNA, RNA, ligands. Nature 630.</li>
              <li>· <a href="https://www.nobelprize.org/prizes/chemistry/2024/" target="_blank" rel="noopener" className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-2 hover:decoration-[#22F0D5]">2024 Nobel Prize in Chemistry</a> announcement (Oct 9, 2024).</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <Link href="/research/decoded" className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] px-5 py-2.5 text-sm text-[#9BA5A7] transition-colors hover:text-[#E7EBED]">
            ← decoded index
          </Link>
        </div>
      </section>
    </main>
  );
}
