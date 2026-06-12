import type { Metadata } from "next";
import { DomainSections, CrossLinks, Footer } from "../music-ai/page";

export const metadata: Metadata = {
  title: "Policy + AI Law · Domain Hub",
  description:
    "AI policy + regulation in 2026. EU AI Act (Reg 2024/1689) · US Executive Order 14110 · NIST AI RMF 1.0 · California SB 1047 · UK AI Safety Institute · Bletchley + Seoul + Paris Summits. The rules · the cases · the regulators · what the lab thinks.",
  alternates: { canonical: "https://atomeons.com/learn/policy-ai" },
  openGraph: {
    title: "Policy + AI Law · A primer from AtomEons",
    description:
      "AI regulation in 2026 · EU AI Act · NIST RMF · executive orders · state bills · the global regulatory map.",
    url: "https://atomeons.com/learn/policy-ai",
    type: "article",
  },
};

const PLAYERS = [
  {
    name: "European Union · AI Act (Reg 2024/1689)",
    what:
      "World's first comprehensive AI regulation · adopted May 2024 · effective in phases through 2027. Tiered risk approach: prohibited · high-risk · limited-risk · minimal-risk. Article 50 mandates AI-generated content disclosure. Article 5 outright bans social scoring + manipulative systems. GPAI providers face transparency + copyright obligations starting August 2025.",
    where: "Brussels · enforced by national authorities + AI Office",
  },
  {
    name: "US Executive Order 14110 · Safe, Secure, and Trustworthy AI",
    what:
      "Biden EO from October 2023 · directed NIST to publish AI risk framework, required reporting from frontier-model developers (10^26 FLOPs threshold), and tasked agencies with sectoral guidance. Trump administration revoked elements 2025 · key parts (NIST AI RMF, frontier reporting requirements) survive.",
    where: "Washington · OSTP + NIST + 30+ agencies",
  },
  {
    name: "NIST AI Risk Management Framework 1.0",
    what:
      "Voluntary but de-facto standard · GOVERN · MAP · MEASURE · MANAGE function. Adopted by most US federal agencies and a growing number of state contracts. Generative AI Profile (NIST AI 600-1) extends it specifically for LLMs and image/audio/video generators.",
    where: "NIST · Gaithersburg MD",
  },
  {
    name: "California SB 1047 (vetoed) + the state lane",
    what:
      "Wiener bill · would have imposed pre-deployment safety testing on frontier models · vetoed by Newsom Sept 2024 (preferred federal action). California instead pursuing narrower bills (AB 2013 training data disclosure, SB 942 watermarking, AB 1008 personal info). Expect 2026 cycle to revisit.",
    where: "Sacramento",
  },
  {
    name: "UK AI Safety Institute (AISI) + the Bletchley lineage",
    what:
      "Established Nov 2023 at Bletchley Park summit. Pre-deployment frontier-model evaluations partnership with OpenAI, Anthropic, DeepMind. Hosted Seoul Summit May 2024 + Paris AI Action Summit Feb 2025. The de-facto international evaluations body.",
    where: "London · part of DSIT",
  },
  {
    name: "US AI Safety Institute (US AISI)",
    what:
      "Sibling to UK AISI · housed within NIST. Hosted by Elizabeth Kelly initially. Conducts pre-deployment evaluations of frontier models · publishes evaluation reports. Funding politically contested 2025-2026.",
    where: "NIST · Gaithersburg",
  },
  {
    name: "China Cyberspace Administration + the parallel regulatory track",
    what:
      "China was first to publish operational generative-AI rules (August 2023). Algorithm registration, content-labeling requirements, safety assessment before public deployment. Stricter on content alignment with 'socialist core values' than Western frameworks.",
    where: "Beijing · CAC + MIIT",
  },
  {
    name: "FTC + DOJ · enforcement lanes",
    what:
      "FTC's 'Operation AI Comply' (Sept 2024) brought five enforcement actions against deceptive AI claims. DOJ antitrust eyeing AI compute concentration. Both watch training-data IP cases (NYT v. OpenAI, RIAA v. Suno) closely.",
    where: "Washington",
  },
];

const TOOLS = [
  {
    name: "EU AI Act full text (consolidated)",
    url: "https://artificialintelligenceact.eu",
    detail:
      "Civil-society maintained reference site. Article-by-article with annotations + timeline. Most accessible source for the regulation's full text and obligations map.",
  },
  {
    name: "NIST AI RMF Playbook",
    url: "https://airc.nist.gov/AI_RMF_Knowledge_Base/Playbook",
    detail:
      "Practical implementation guidance for the RMF · maps GOVERN/MAP/MEASURE/MANAGE functions to actionable controls. Free.",
  },
  {
    name: "Stanford AI Index 2025",
    url: "https://aiindex.stanford.edu",
    detail:
      "Annual flagship · 400+ pages · the canonical reference for measuring AI progress, deployment, and policy. Free PDF.",
  },
  {
    name: "OECD AI Policy Observatory",
    url: "https://oecd.ai",
    detail:
      "Live tracker of national AI strategies + regulations + incidents across 70+ jurisdictions. Free.",
  },
  {
    name: "GovAI · Centre for the Governance of AI",
    url: "https://www.governance.ai",
    detail:
      "Oxford-affiliated · the leading academic policy shop on existential and societal AI risk. Reports + working papers free.",
  },
  {
    name: "AI Incident Database",
    url: "https://incidentdatabase.ai",
    detail:
      "Partnership on AI's running catalog of real-world AI harms · 800+ documented incidents. Useful for policymaking + journalism.",
  },
];

const PAPERS = [
  {
    title: "EU AI Act · Regulation (EU) 2024/1689",
    authors: "European Parliament + Council",
    journal: "Official Journal of the EU · L series · 12 July 2024",
    why: "The first comprehensive horizontal AI law. Every other jurisdiction is benchmarking against this. Read the recitals, not just the articles.",
  },
  {
    title: "NIST AI Risk Management Framework 1.0 + Generative AI Profile",
    authors: "NIST · with industry + civil society",
    journal: "NIST AI 100-1 · January 2023 + NIST AI 600-1 · July 2024",
    why: "The default risk framework for US federal procurement + many enterprise contracts. GAI Profile is the concrete LLM-specific addendum.",
  },
  {
    title: "Bletchley Declaration · Seoul Frontier AI Safety Commitments",
    authors: "28 countries + EU",
    journal: "Bletchley Park Nov 2023 + Seoul May 2024",
    why: "First multilateral framework for frontier-model safety. Voluntary · signed by all major US, EU, UK, China governments + 10 frontier labs.",
  },
  {
    title: "Anthropic Responsible Scaling Policy v2.2",
    authors: "Anthropic",
    journal: "Public commitment · October 2024",
    why: "Most-cited frontier-lab self-regulation document · AI Safety Levels (ASL) tied to specific evaluation thresholds. Used as template by other labs.",
  },
  {
    title: "NYT v. OpenAI · Authors Guild v. OpenAI · RIAA v. Suno · Getty v. Stability",
    authors: "Various plaintiffs · S.D.N.Y. and other courts",
    journal: "2023-2026 ongoing",
    why: "Training-data lawsuits that will define what 'fair use' means for AI training. Outcomes (settlement or precedent) reshape the entire economic model.",
  },
];

const PEOPLE = [
  "Margrethe Vestager · EU Commission VP · architect of AI Act enforcement posture (through 2024)",
  "Lina Khan · FTC chair · the deceptive-AI-claims enforcement lane",
  "Elizabeth Kelly · founding director US AI Safety Institute",
  "Ian Hogarth · chair UK AI Safety Institute",
  "Dario Amodei · Anthropic CEO · most-cited frontier-lab voice on government engagement",
  "Sam Altman · OpenAI CEO · regulatory presence Washington + Brussels",
  "Helen Toner · ex-OpenAI board · CSET researcher · safety + policy voice",
  "Senator Schumer · convened first US AI Insight Forum series",
  "Tino Cuéllar · Carnegie Endowment · former CA Supreme Court · policy interface to AI Act",
];

const RISKS = [
  "Regulatory fragmentation · 50 US states writing different AI laws (CA · NY · TX · CO each different on biometrics, content, hiring AI). Compliance map gets ugly fast.",
  "Capability-vs-rules mismatch · the EU AI Act was drafted around 2021-2022 transformer assumptions · 2026 frontier capabilities (agents, multimodal video, embodied AI) stretch the categories.",
  "Enforcement asymmetry · the EU AI Act has teeth (4% of global revenue fines) · most US laws don't · compliance burden falls hardest on companies operating in EU.",
  "Open-source carve-outs · the AI Act exempts most open-weights GPAI models from full obligations · Anthropic + OpenAI argue this advantages Meta + Mistral + DeepSeek. Fight ongoing.",
  "Training-data lawsuit outcomes could force retroactive licensing of model weights · existential question for OpenAI, Anthropic, Stability, Suno valuations.",
  "National security carve-outs increasingly broad · US + China + EU all expanding what counts as 'AI for national security' · oversight thin.",
];

const SELF_USE = [
  "If you ship an AI feature in the EU: read Articles 50 (transparency) and 52 (transparency duties on GPAI) at minimum. AI-generated content needs labeling.",
  "If you ship in the US federal space: NIST AI RMF compliance is increasingly a procurement requirement. Adopt the GOVERN function first.",
  "If you're a developer training on data: read the Authors Guild and NYT complaints. They show what training pipelines look like in court.",
  "If you're a policymaker or journalist: the AI Incident Database is the most-cited registry. Quote from there before quoting press.",
  "If you operate a startup using GPT/Claude APIs: re-read the provider's usage policy quarterly · they update faster than law.",
  "If you want to follow the global regulatory map: OECD.ai's regulation tracker + Stanford AI Index annual report cover 90% of what matters.",
];

export default function PolicyAiPage() {
  return (
    <main className="mx-auto max-w-[1100px] px-6 py-20 text-[#F4F4F2] md:px-10 md:py-24">
      <header className="border-b border-[#1F242B] pb-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#7a818a]">
          DOMAIN HUB · POLICY + AI LAW · 2026
        </p>
        <h1
          className="mt-6 text-balance text-[clamp(48px,8vw,96px)] font-light leading-[0.92]"
          style={{ fontFamily: "Newsreader, Georgia, serif", fontWeight: 300 }}
        >
          AI policy + law.
        </h1>
        <p className="mt-6 max-w-[64ch] text-[18px] leading-[1.55] text-[#9CA3AF]">
          EU AI Act · NIST AI RMF · US Executive Order 14110 · the safety
          institutes · the state bills · the training-data lawsuits · the
          regulators worth knowing. The rules of the road · the cases that
          set the precedent · what the lab thinks.
        </p>
      </header>
      <DomainSections
        players={PLAYERS}
        tools={TOOLS}
        papers={PAPERS}
        people={PEOPLE}
        risks={RISKS}
        selfUse={SELF_USE}
        thinks={`AI law in 2026 is in its 'GDPR moment' · a sprawl of bespoke regional rules will harden into a tractable compliance regime over 2-3 years, and then become a moat. The EU AI Act is the de-facto global ceiling · everyone serious operates to it. NIST AI RMF is the de-facto enterprise floor. The two missing pieces (settled training-data law + a working international evaluations regime) get filled in 2026-2028 · expect at least one Supreme Court case on fair-use-for-training. The lab's bet: by 2028, every serious AI product ships with C2PA provenance baked in, every EU-exposed company has a designated AI compliance lead, and the training-data licensing market is a $5B+ standalone industry.`}
      />
      <CrossLinks current="policy-ai" />
      <Footer route="/learn/policy-ai" />
    </main>
  );
}
