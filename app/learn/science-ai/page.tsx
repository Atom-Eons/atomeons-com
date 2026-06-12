import type { Metadata } from "next";
import { DomainSections, CrossLinks, Footer } from "../music-ai/page";

export const metadata: Metadata = {
  title: "Science AI · Domain Hub",
  description:
    "AI in scientific discovery 2026. AlphaFold 3 (Nobel 2024) · GNoME (Google materials) · GraphCast + GenCast (weather) · DeepMind FunSearch (math) · Recursion Phenomics · Profluent OpenCRISPR · ESM-3 · the AI-for-science wave. Tools · papers · what the lab thinks.",
  alternates: { canonical: "https://atomeons.com/learn/science-ai" },
  openGraph: {
    title: "Science AI · A primer from AtomEons",
    description:
      "AlphaFold lineage · scientific AI for materials, weather, math, biology. The discovery acceleration.",
    url: "https://atomeons.com/learn/science-ai",
    type: "article",
  },
};

const PLAYERS = [
  {
    name: "Google DeepMind",
    what:
      "The dominant player. AlphaFold 1 → 2 → 3 (protein + ligand + nucleic-acid structure, Nobel Chemistry 2024 for Hassabis + Jumper). GNoME (2.2M crystal structure predictions, Nature 2023). GraphCast + GenCast (medium-range weather, beat ECMWF). FunSearch (autonomous math discoveries). The most productive AI-for-science lab on Earth.",
    where: "London · Mountain View",
  },
  {
    name: "Isomorphic Labs",
    what:
      "DeepMind drug-discovery spinout · uses AlphaFold 3 + proprietary models. Partnerships with Eli Lilly and Novartis 2024 · clinical-stage assets expected late 2026.",
    where: "London · alphabet-owned",
  },
  {
    name: "EvolutionaryScale (Meta spinout)",
    what:
      "Built ESM-3 · 98B-parameter protein language model · generated a fluorescent protein 500M evolutionary years from any natural example. Open-released the smaller versions.",
    where: "NY · ex-Meta protein team",
  },
  {
    name: "Recursion Pharmaceuticals · Phenomics",
    what:
      "Public on NASDAQ. Combinatorial drug discovery at industrial scale · ~25M cellular images annotated by ML. Merged with Exscientia 2024.",
    where: "Salt Lake City",
  },
  {
    name: "Insilico Medicine · Generate:Biomedicines · Profluent",
    what:
      "Generative chemistry + protein engineering · Insilico's INS018_055 (Phase II IPF · first end-to-end AI-designed drug) · Profluent's OpenCRISPR-1 (April 2024 · first AI-designed gene editor that worked in human cells).",
    where: "Various",
  },
  {
    name: "Microsoft Research · BioGPT · MatterGen",
    what:
      "BioGPT (biomedical-domain LLM, deprecated 2024) · MatterGen (generative materials science · partnered with Pacific Northwest National Lab for novel battery materials). AI4Science division ongoing.",
    where: "Redmond · Cambridge UK",
  },
  {
    name: "Anthropic + OpenAI applied science lanes",
    what:
      "Anthropic published applied AI-for-medicine + AI-for-climate work via collaborations. OpenAI hired Karan Singhal 2024 to lead applied science · partnership with Los Alamos National Lab on fusion + nuclear-physics applications.",
    where: "SF",
  },
  {
    name: "Hugging Face + open-science lane",
    what:
      "Hosts ESMFold, RoseTTAFold, Boltz-1 (open AlphaFold 3 alternative · MIT-licensed Oct 2024), MoLeR, ChemBERTa. The open lane lets any researcher run frontier-class science models for free.",
    where: "Paris · NY · open-source first",
  },
];

const TOOLS = [
  {
    name: "AlphaFold Server",
    url: "https://alphafoldserver.com",
    detail:
      "Free non-commercial access to AlphaFold 3. Run a protein-ligand structure prediction · get the PDB in minutes. Has accelerated 100K+ research labs.",
  },
  {
    name: "Boltz-1 (open AlphaFold 3 alternative)",
    url: "https://github.com/jwohlwend/boltz",
    detail:
      "MIT-licensed open implementation of AlphaFold 3 at ~94% recovery · published October 2024. Runs locally with a decent GPU. Commercial use ok.",
  },
  {
    name: "ESM Atlas + ESMFold",
    url: "https://esmatlas.com",
    detail:
      "Meta's pre-computed structures for 670M+ metagenomic proteins · free. ESMFold model also runs locally.",
  },
  {
    name: "MatterGen (Microsoft)",
    url: "https://github.com/microsoft/mattergen",
    detail:
      "Generative model for novel inorganic materials. Open-source · uses denoising diffusion on crystal structures · published in Nature 2025.",
  },
  {
    name: "Materials Project",
    url: "https://next-gen.materialsproject.org",
    detail:
      "Free database of ~150K computed materials properties · DOE-funded · powers most ML-for-materials research. Integrates GNoME entries since 2024.",
  },
  {
    name: "WeatherBench · ECMWF + AI weather model APIs",
    url: "https://www.ecmwf.int/en/about/media-centre/aifs-blog",
    detail:
      "ECMWF runs both classical NWP and AI-driven forecasts in production since 2024. GraphCast and AIFS forecasts available via free API for research.",
  },
];

const PAPERS = [
  {
    title: "Accurate structure prediction of biomolecular interactions · AlphaFold 3",
    authors: "Abramson et al · Google DeepMind / Isomorphic",
    journal: "Nature · May 2024",
    why: "Extended AlphaFold 2 to ligands, nucleic acids, ions, covalent modifications. The biological universe is no longer just proteins.",
  },
  {
    title: "Scaling deep learning for materials discovery · GNoME",
    authors: "Merchant et al · Google DeepMind",
    journal: "Nature · 2023",
    why: "Predicted 2.2M stable crystal structures · 380K new stable materials. 50× more than the previous decade of human discovery combined.",
  },
  {
    title: "Learning skillful medium-range global weather forecasting · GraphCast",
    authors: "Lam et al · Google DeepMind",
    journal: "Science · 2023",
    why: "First AI weather model to beat ECMWF on most variables at 10-day horizon. Trained on ERA5 reanalysis · 10-minute inference vs hours for HRES.",
  },
  {
    title: "Mathematical discoveries from program search with large language models · FunSearch",
    authors: "Romera-Paredes et al · Google DeepMind",
    journal: "Nature · 2023",
    why: "First demonstration of LLMs autonomously discovering new mathematical truths · cap set problem improvements + bin-packing heuristics.",
  },
  {
    title: "ESM-3 · Simulating 500 million years of evolution with a language model",
    authors: "Hayes et al · EvolutionaryScale",
    journal: "Preprint · June 2024",
    why: "98B-parameter protein language model that generated a fluorescent protein 500M evolutionary years from any known example. New form of biological design.",
  },
  {
    title: "Nobel Prize in Chemistry 2024 · Hassabis + Jumper + Baker",
    authors: "Royal Swedish Academy of Sciences",
    journal: "Nobel Foundation · October 2024",
    why: "First Nobel Prize where the breakthrough was the AI model itself (AlphaFold + David Baker's Rosetta lineage). Symbolic + scientific watershed.",
  },
];

const PEOPLE = [
  "Demis Hassabis · DeepMind CEO · Nobel Chemistry 2024",
  "John Jumper · AlphaFold lead · Nobel Chemistry 2024",
  "David Baker · University of Washington · Rosetta + AI design · Nobel Chemistry 2024",
  "Daphne Koller · Insitro founder · ML-first drug discovery",
  "Stanley Kim · Stanford · founder of MATTER + open-source materials AI",
  "Anima Anandkumar · Caltech + NVIDIA · scientific ML director",
  "Pushmeet Kohli · DeepMind · responsible for AlphaFold ship",
  "Yoshua Bengio · Mila · MLE for materials + biology applied",
  "Andrew White · Rochester · chemistry × LLM frontier",
];

const RISKS = [
  "Dual-use of protein-design models · ESM-3 + AlphaFold 3 + Profluent's tools can in principle design novel toxins. Major labs have responsible-release policies; smaller actors don't.",
  "Reproducibility crisis in AI-for-science · many high-profile claims fail when reproduced without the original team's tacit knowledge. AI papers are not exempt.",
  "Concentration of compute · only ~10 labs in the world have the compute to train a frontier-class scientific AI · slows democratization of discovery.",
  "Closed-weight models for science · DeepMind keeps AlphaFold 3 weights private. Boltz-1 + open alternatives are critical for reproducibility but lag in capability.",
  "Hallucinations in scientific summarization · LLMs invent plausible-sounding citations and findings. Don't trust an LLM-written literature review without primary-source verification.",
  "Misaligned hype cycles · 'AI will cure cancer next year' headlines undermine credibility when timelines slip. The actual trajectory is slower but more durable.",
];

const SELF_USE = [
  "If you're a researcher: AlphaFold Server is free. Run your structure. Spend the saved time on the experiment, not the structure prediction.",
  "If you're a chemist: ChemCrow, ChemReasoner, and the open-weights chemistry LLMs are catching up fast. Use them for synthesis route brainstorming, not final decisions.",
  "If you're a clinician interested in AI: read the Nature Medicine + JAMA AI sections monthly. Don't trust press releases.",
  "If you're a student: contribute to open-source scientific AI · Boltz-1, MatterGen, ESMFold all welcome contributions. Real research credentials.",
  "If you're a journalist: prefer Nature + Science press releases over Twitter threads. AI-for-science is genuinely advancing · the noise-to-signal ratio is just hard.",
  "If you're a citizen: trust the consensus across multiple labs more than any single dramatic claim. The Nobel went to AlphaFold not because of one paper but because of years of independent reproduction.",
];

export default function ScienceAiPage() {
  return (
    <main className="mx-auto max-w-[1100px] px-6 py-20 text-[#F4F4F2] md:px-10 md:py-24">
      <header className="border-b border-[#1F242B] pb-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#7a818a]">
          DOMAIN HUB · SCIENCE · AI · 2026
        </p>
        <h1
          className="mt-6 text-balance text-[clamp(48px,8vw,96px)] font-light leading-[0.92]"
          style={{ fontFamily: "Newsreader, Georgia, serif", fontWeight: 300 }}
        >
          AI in science.
        </h1>
        <p className="mt-6 max-w-[64ch] text-[18px] leading-[1.55] text-[#9CA3AF]">
          AlphaFold 3 (Nobel 2024) · GNoME materials · GraphCast weather ·
          FunSearch mathematics · ESM-3 proteins · OpenCRISPR gene editing.
          The discovery-acceleration moment. The labs · the tools · the
          papers · the people · what the lab thinks.
        </p>
      </header>
      <DomainSections
        players={PLAYERS}
        tools={TOOLS}
        papers={PAPERS}
        people={PEOPLE}
        risks={RISKS}
        selfUse={SELF_USE}
        thinks={`The 2024 Nobel Chemistry — to Hassabis, Jumper, and Baker — was the moment AI-for-science became real to the public. It had been real to labs since AlphaFold 2 in 2020. The lab's bet: the next decade compresses discovery cycles that historically took 20-30 years into 3-5. Materials science is two years behind biology, weather forecasting is already at parity with classical numerical methods, mathematics is starting to fall. The bottleneck shifts from 'can the model find it' to 'can the wet lab synthesize and verify it.' Compute-to-experiment integration is the new constraint · the labs that win this decade are the ones with their compute and their bench tightly coupled.`}
      />
      <CrossLinks current="science-ai" />
      <Footer route="/learn/science-ai" />
    </main>
  );
}
