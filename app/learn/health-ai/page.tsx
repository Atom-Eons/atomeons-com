import type { Metadata } from "next";
import Link from "next/link";

/**
 * /learn/health-ai · domain hub.
 *
 * One of the 7 domain verticals shipped in JUNE ROCKET. Public-info
 * only. No personalized medical advice. Cite frameworks · cite results
 * · never personify a real doctor. HRE: nothing here is a substitute
 * for a licensed practitioner.
 *
 * — 2026-06-06
 */

export const metadata: Metadata = {
  title: "Health AI · Domain Hub",
  description:
    "AI in medicine, longevity, biotech, mental health. Players (DeepMind Isomorphic, Tempus, Cradle, Insilico, Recursion, OpenAI Health · CHAI Discovery · Atomic AI) · tools you can use today (Open Evidence · K Health · Woebot · Wysa · Eko) · key papers (AlphaFold 3 · ESM-3 · Med-PaLM 2 · Articulate Medical Intelligence) · open problems · risks · what the lab thinks. Public-information primer · no medical advice.",
  alternates: { canonical: "https://atomeons.com/learn/health-ai" },
  openGraph: {
    title: "Health AI · A primer from AtomEons",
    description:
      "AI in medicine, longevity, biotech, mental health · who's building · what works · what to watch · public-info only.",
    url: "https://atomeons.com/learn/health-ai",
    type: "article",
  },
};

const PLAYERS = [
  {
    name: "DeepMind Isomorphic Labs",
    what:
      "Drug discovery spinout. Behind AlphaFold 3 (May 2024) which extended protein-structure prediction to nucleic acids, ligands, ions. Partnered with Eli Lilly and Novartis 2024.",
    where: "London · alphabet-funded",
  },
  {
    name: "Anthropic / OpenAI Health",
    what:
      "Frontier-lab applied teams. Anthropic published Med-Palantir-style applied work. OpenAI hired Karan Singhal (Med-PaLM lead) 2024 to run an internal health division.",
    where: "SF · frontier-lab applied",
  },
  {
    name: "Tempus AI",
    what:
      "Public on NASDAQ (TEM, IPO June 2024). Multimodal clinical + molecular dataset · AI-assisted oncology + cardiology decisions for the bedside.",
    where: "Chicago · NASDAQ-listed",
  },
  {
    name: "Recursion Pharmaceuticals",
    what:
      "Combinatorial drug discovery at industrial scale · phenomics + ML. Merged with Exscientia 2024. ~$3B market cap.",
    where: "Salt Lake City",
  },
  {
    name: "Insilico Medicine",
    what:
      "Generative chemistry pipeline · drugs designed end-to-end by AI · first AI-designed drug INS018_055 entered Phase II for idiopathic pulmonary fibrosis 2024.",
    where: "Hong Kong / NYC",
  },
  {
    name: "Cradle Bio",
    what:
      "Protein-engineering toolkit · diffusion + generative models for designed enzymes. Used by Novozymes and J&J.",
    where: "Amsterdam · seed-stage breakout",
  },
  {
    name: "Atomic AI",
    what:
      "RNA structure + small-molecule binding prediction. The 'AlphaFold for RNA' lane. $35M Series A in 2024.",
    where: "SF",
  },
  {
    name: "Profluent · Generate:Biomedicines · Evozyne",
    what:
      "Protein language model labs. Profluent's OpenCRISPR-1 (April 2024) was the first AI-designed gene editor that worked in human cells.",
    where: "Various · all hot",
  },
];

const TOOLS = [
  {
    name: "OpenEvidence",
    url: "https://openevidence.com",
    detail:
      "Free for verified clinicians · evidence-grounded clinical-question answering · cites every primary source. Now used by &gt; 250K US clinicians.",
  },
  {
    name: "K Health",
    url: "https://khealth.com",
    detail:
      "Consumer-facing AI primary-care app · symptom checker + telehealth. Integrated into Cedars-Sinai and Mayo Clinic outpatient.",
  },
  {
    name: "Woebot · Wysa",
    url: "https://woebothealth.com",
    detail:
      "Mental-health chatbots with CBT protocols. Woebot received an FDA Breakthrough Device designation 2021. Wysa is used by the UK NHS.",
  },
  {
    name: "Eko (CORE)",
    url: "https://www.ekohealth.com",
    detail:
      "AI-powered stethoscope · detects murmurs and atrial-fibrillation at point-of-care. FDA-cleared 2023.",
  },
  {
    name: "Aidoc",
    url: "https://www.aidoc.com",
    detail:
      "Radiology triage · flagging life-critical findings (intracranial hemorrhage, pulmonary embolism, c-spine fractures) for the radiologist's first read.",
  },
  {
    name: "AlphaFold Server",
    url: "https://alphafoldserver.com",
    detail:
      "Free access to AlphaFold 3 for non-commercial research. Run a structure prediction · get the PDB file in minutes · for free.",
  },
];

const PAPERS = [
  {
    title: "Accurate structure prediction of biomolecular interactions with AlphaFold 3",
    authors: "Abramson et al · Google DeepMind / Isomorphic",
    journal: "Nature · May 2024",
    why: "Extended AlphaFold 2 to ligands, nucleic acids, ions. The biological universe is no longer just proteins.",
  },
  {
    title: "ESM-3: Simulating 500 million years of evolution with a language model",
    authors: "Hayes et al · EvolutionaryScale (Meta spinout)",
    journal: "Preprint · June 2024",
    why: "Trillion-parameter protein language model that generated a fluorescent protein 500M evolutionary years from any natural example.",
  },
  {
    title: "Articulate Medical Intelligence Explorer (AMIE)",
    authors: "Tu et al · Google Research",
    journal: "Preprint · January 2024",
    why: "Diagnostic dialogue agent that matched or outperformed primary-care physicians in a controlled study across 20+ specialties.",
  },
  {
    title: "Med-PaLM 2 · Towards Expert-Level Medical Question Answering",
    authors: "Singhal et al · Google Research",
    journal: "Nature Medicine · 2023",
    why: "First LLM to exceed the USMLE passing threshold by a substantial margin · the benchmark moment for medical LLMs.",
  },
  {
    title: "Foundation Models for Cardiovascular Disease Detection · ECG-FM",
    authors: "Various · 2024",
    journal: "Preprint",
    why: "Foundation models trained on 10M+ ECG strips now exceed cardiologist concordance on 5 of 12 standard arrhythmia tasks.",
  },
  {
    title: "Levanter · The first AI-only Phase I trial",
    authors: "Insilico Medicine + collaborators",
    journal: "Industry report 2023",
    why: "INS018_055 · idiopathic pulmonary fibrosis · first molecule with both target + structure discovered by AI now in human trials.",
  },
];

const PEOPLE = [
  "Eric Topol · Scripps · cardiologist · author of Deep Medicine · 100K daily readers of his Substack",
  "Demis Hassabis · DeepMind · Nobel chemistry winner 2024",
  "Karan Singhal · OpenAI Health · led Med-PaLM",
  "Vivek Murthy · former US Surgeon General · public-health voice on AI",
  "Pushmeet Kohli · DeepMind · AlphaFold lead",
  "Pranav Rajpurkar · Harvard · AI for chest x-rays · founder of AISC",
  "Eric Horvitz · Microsoft · public-health AI applied",
  "Daphne Koller · Insitro · ML-first drug discovery",
];

const RISKS = [
  "Hallucination on differential diagnosis · LLMs confidently invent plausible-sounding conditions. Use OpenEvidence-class grounded tools, not chat-only.",
  "Bias on training data · cardiology + dermatology datasets are dominated by light-skinned patients. AI for darker-skin dermatology lags 10-15 percentage points in accuracy.",
  "Replacing the doctor's clinical reasoning · use AI to broaden the differential, never to skip the physical exam.",
  "Privacy of training data · most consumer-facing health AI uses your data to improve the model unless explicitly opted out. Read the data policy.",
  "FDA regulatory ambiguity on generative AI · the agency has approved 950+ AI devices but generative AI is still mostly off-label.",
  "Liability when AI is wrong · case law is still being written. The physician remains legally responsible for the decision.",
];

const SELF_USE = [
  "If you have a confusing symptom: try OpenEvidence (if you're a clinician) or K Health (if not). Cross-check with PubMed. Then see a real human.",
  "If you're managing a chronic condition: Glooko, Tidepool (diabetes), AliveCor (cardiac) all provide AI-augmented self-tracking.",
  "If you want to read papers: Consensus, Elicit, Scholarcy. These pull citations · they don't make up sources.",
  "If you're mental-health curious: Wysa is free · used by NHS · CBT-protocol grounded. Not a replacement for a therapist.",
  "If you're a researcher: AlphaFold Server, ESMFold (Meta), ChemCrow agents for chemistry. All free for non-commercial.",
  "If you want to understand a diagnosis you just received: ChatGPT or Claude can explain the term · then ask for primary sources · then read them.",
];

export default function HealthAiPage() {
  return (
    <main className="mx-auto max-w-[1100px] px-6 py-20 text-[#F4F4F2] md:px-10 md:py-24">
      <header className="border-b border-[#1F242B] pb-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#7a818a]">
          DOMAIN HUB · HEALTH · AI · 2026
        </p>
        <h1
          className="mt-6 text-balance text-[clamp(48px,8vw,96px)] font-light leading-[0.92]"
          style={{ fontFamily: "Newsreader, Georgia, serif", fontWeight: 300 }}
        >
          AI in medicine.
        </h1>
        <p className="mt-6 max-w-[64ch] text-[18px] leading-[1.55] text-[#9CA3AF]">
          Drug discovery · radiology triage · mental-health chatbots · protein
          and RNA structure · diagnostic dialogue. The companies and tools
          actually changing care · the papers that mattered · the people
          worth following · the risks the lab takes seriously.
        </p>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.28em] text-[#FF4D4D]">
          NOT MEDICAL ADVICE · This is a public-information primer · See a licensed clinician for diagnosis or treatment
        </p>
      </header>

      <section className="mt-16">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Key players
        </h2>
        <ul className="mt-8 space-y-6">
          {PLAYERS.map((p) => (
            <li key={p.name} className="border-l-2 border-[#22F0D5]/40 pl-6">
              <h3 className="text-[20px] font-light text-[#F4F4F2]">{p.name}</h3>
              <p className="mt-2 text-[15px] leading-[1.65] text-[#9CA3AF]">
                {p.what}
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a]">
                {p.where}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Tools you can use today
        </h2>
        <ul className="mt-8 space-y-6">
          {TOOLS.map((t) => (
            <li key={t.name} className="border-l-2 border-[#C9A55C]/40 pl-6">
              <a
                href={t.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[20px] font-light text-[#F4F4F2] hover:text-[#22F0D5]"
              >
                {t.name} ↗
              </a>
              <p
                className="mt-2 text-[15px] leading-[1.65] text-[#9CA3AF]"
                dangerouslySetInnerHTML={{ __html: t.detail }}
              />
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Papers that mattered
        </h2>
        <ul className="mt-8 space-y-6">
          {PAPERS.map((p) => (
            <li key={p.title} className="border-l-2 border-[#22F0D5]/40 pl-6">
              <h3 className="text-[18px] font-light leading-tight text-[#F4F4F2]">
                {p.title}
              </h3>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#9CA3AF]">
                {p.authors} · {p.journal}
              </p>
              <p className="mt-2 text-[15px] leading-[1.65] text-[#9CA3AF]">
                {p.why}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § People to follow
        </h2>
        <ul className="mt-6 list-disc space-y-2 pl-6 text-[15px] leading-[1.65] text-[#9CA3AF]">
          {PEOPLE.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </section>

      <section className="mt-20">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Risks the lab takes seriously
        </h2>
        <ul className="mt-6 space-y-3">
          {RISKS.map((r, i) => (
            <li key={i} className="flex gap-3 text-[15px] leading-[1.65] text-[#9CA3AF]">
              <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF4D4D]" />
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § How to use this for yourself
        </h2>
        <ol className="mt-6 list-decimal space-y-3 pl-6 text-[15px] leading-[1.65] text-[#9CA3AF]">
          {SELF_USE.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </section>

      <section className="mt-20 border-l-4 border-[#22F0D5] bg-[#0F1114] p-8">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#22F0D5]">
          § What the lab thinks
        </h2>
        <p
          className="mt-4 text-[20px] leading-[1.55] text-[#F4F4F2]"
          style={{ fontFamily: "Newsreader, Georgia, serif" }}
        >
          Health AI is the field where the gap between paper claim and bedside
          impact is largest. Med-PaLM 2 cleared USMLE in 2023 · most clinics
          still use 1990s decision-support. The bottleneck is not the model
          weight — it&apos;s integration, liability, and trust. The lab&apos;s
          bet: in five years, every primary-care visit will have an AI
          companion in the room. In ten, the differential diagnosis is
          generated by the AI before the patient walks in. The doctor&apos;s
          job becomes verification, empathy, and the physical exam.
        </p>
      </section>

      <section className="mt-20 border-t border-[#1F242B] pt-12">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Where to go deeper on AtomEons
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Link
            href="/research/decoded"
            className="block border border-[#1F242B] p-5 transition hover:border-[#22F0D5]"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
              Decoded papers
            </p>
            <p className="mt-2 text-[14px] text-[#F4F4F2]">
              ÆoNs primary-source readings of the key papers above.
            </p>
          </Link>
          <Link
            href="/learn/cyber/models"
            className="block border border-[#1F242B] p-5 transition hover:border-[#22F0D5]"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
              Cyber × Health
            </p>
            <p className="mt-2 text-[14px] text-[#F4F4F2]">
              Threat models for medical AI: HIPAA, model-stealing, training-data poisoning.
            </p>
          </Link>
          <Link
            href="/ask?q=which+health+AI+tool+should+I+use"
            className="block border border-[#1F242B] p-5 transition hover:border-[#22F0D5]"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
              Ask the lab
            </p>
            <p className="mt-2 text-[14px] text-[#F4F4F2]">
              Free grounded answers with citations to the corpus.
            </p>
          </Link>
          <Link
            href="/learn/money-ai"
            className="block border border-[#1F242B] p-5 transition hover:border-[#22F0D5]"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
              Money AI
            </p>
            <p className="mt-2 text-[14px] text-[#F4F4F2]">
              The next domain hub. Trading, fintech, fraud.
            </p>
          </Link>
        </div>
      </section>

      <footer className="mt-20 border-t border-[#1F242B] pt-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#7a818a]">
          Domain hub · /learn/health-ai · Public information only · Updated 2026-06-06
        </p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#7a818a]">
          Sources: papers cited above · company filings · clinical trial registries · public press
        </p>
      </footer>
    </main>
  );
}
