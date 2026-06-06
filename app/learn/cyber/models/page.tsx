import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cyber models · Kill Chain · ATT&CK · NIST CSF · Diamond · STRIDE · PASTA · FAIR · CIS · ISO · CMMC · SOC 2 · how to use each properly",
  description:
    "Every major industry cybersecurity model · what it is · who built it · when to use · when NOT to use · common mistakes. The honest comparison.",
  alternates: { canonical: "https://atomeons.com/learn/cyber/models" },
  openGraph: {
    title: "Cyber models · the industry reference",
    description:
      "20+ industry cybersecurity models compared. When to use each, when not to, common mistakes.",
    url: "https://atomeons.com/learn/cyber/models",
    type: "article",
  },
};

type Model = {
  name: string;
  abbr?: string;
  builder: string;
  year: string;
  oneliner: string;
  use_when: string[];
  avoid_when: string[];
  mistakes: string[];
  family: "threat" | "framework" | "risk" | "compliance" | "architecture" | "appsec" | "process";
  link?: string;
};

const FAMILY_COLOR: Record<Model["family"], string> = {
  threat: "#FF4D4D",
  framework: "#22F0D5",
  risk: "#C9A55C",
  compliance: "#9CA3AF",
  architecture: "#22F0D5",
  appsec: "#22F0D5",
  process: "#9CA3AF",
};

const FAMILY_LABEL: Record<Model["family"], string> = {
  threat: "THREAT",
  framework: "FRAMEWORK",
  risk: "RISK",
  compliance: "COMPLIANCE",
  architecture: "ARCHITECTURE",
  appsec: "APPSEC",
  process: "PROCESS",
};

const MODELS: Model[] = [
  {
    name: "Cyber Kill Chain",
    builder: "Lockheed Martin",
    year: "2011",
    family: "threat",
    oneliner:
      "Seven-stage model of how a sophisticated adversary moves from initial reconnaissance to final action (recon → weaponize → deliver → exploit → install → C2 → action).",
    use_when: [
      "Briefing a non-technical executive on how an APT operation unfolds.",
      "Designing detection layers · each stage gets a detection rule.",
      "Post-incident retrospectives · map what stage you caught it at.",
    ],
    avoid_when: [
      "Modeling commodity criminal threats (ransomware affiliates don't follow this linearity).",
      "Modeling insider threats (no recon stage; the insider IS already inside).",
      "Modern multi-vector attacks · they're parallel + recursive, not linear.",
    ],
    mistakes: [
      "Treating it as a complete model · MITRE ATT&CK is a strict superset for analysts.",
      "Believing every stage must be present · sophisticated adversaries skip stages.",
      "Using it as the SOLE detection framework · pair it with ATT&CK for technique-level coverage.",
    ],
    link: "/learn/cyber/cyber-kill-chain",
  },
  {
    name: "MITRE ATT&CK",
    abbr: "ATT&CK",
    builder: "MITRE Corporation",
    year: "2013",
    family: "threat",
    oneliner:
      "Tactic-and-technique matrix · 14 tactics × ~200 techniques × thousands of sub-techniques · the canonical adversary-behavior taxonomy.",
    use_when: [
      "Building a SOC playbook · every detection rule maps to a technique.",
      "Threat-hunting · search for technique-level signatures in your telemetry.",
      "Vendor evaluation · ask 'what ATT&CK techniques does your product detect?'",
      "Tabletop exercises · run an APT group's known TTPs against your defenses.",
    ],
    avoid_when: [
      "Briefing a C-suite that needs a 7-bullet story · use Kill Chain for that.",
      "Risk quantification · ATT&CK is qualitative; pair with FAIR for $ numbers.",
    ],
    mistakes: [
      "Trying to detect every technique · 200+ is impossible · prioritize by APT-group prevalence.",
      "Treating ATT&CK Navigator as a strategy · it's a coverage map, not a defense plan.",
      "Ignoring sub-techniques · the granularity is where modern detection lives.",
      "Missing ATT&CK for ICS, Mobile, Cloud · each has its own matrix.",
    ],
    link: "/learn/cyber/mitre-attack",
  },
  {
    name: "Diamond Model of Intrusion Analysis",
    abbr: "Diamond",
    builder: "Caltagirone · Pendergast · Betz · published via DoD",
    year: "2013",
    family: "threat",
    oneliner:
      "Four vertices · adversary, capability, infrastructure, victim · plus meta-features (timestamp, phase, result, direction). Models a single intrusion event.",
    use_when: [
      "Incident response · build a Diamond per intrusion · pivot across vertices to find connected campaigns.",
      "Attribution analysis · which adversary uses which capability against which victim?",
      "Sharing intel with partners · the Diamond format is structured + composable.",
    ],
    avoid_when: [
      "Modeling defensive controls · Diamond is descriptive, not prescriptive.",
      "Communicating to executives · too analyst-grade · use ATT&CK summaries instead.",
    ],
    mistakes: [
      "Filling in adversary too early · pivot on infrastructure + capability before attributing.",
      "Ignoring the social-political meta-feature · geopolitical context shapes attribution probability.",
      "Treating each Diamond as standalone · campaigns are sequences of Diamonds.",
    ],
  },
  {
    name: "NIST Cybersecurity Framework",
    abbr: "NIST CSF 2.0",
    builder: "US National Institute of Standards and Technology",
    year: "2014 · 2.0 in 2024",
    family: "framework",
    oneliner:
      "Six functions · Govern, Identify, Protect, Detect, Respond, Recover. Each function decomposes to categories and subcategories. The federal-grade enterprise security framework.",
    use_when: [
      "Establishing a baseline security program from scratch · NIST CSF gives the structure.",
      "Compliance reporting · most regulators recognize NIST CSF coverage.",
      "Board-level security communication · the 6 functions map cleanly to risk language.",
      "Aligning with sector-specific guidance (HIPAA · GLBA · ISO via crosswalks).",
    ],
    avoid_when: [
      "Daily tactical work · NIST CSF is strategic, not operational.",
      "Software development security · use OWASP + STRIDE there instead.",
    ],
    mistakes: [
      "Stopping at the Functions level · the value is in the Subcategories (~106 controls).",
      "Ignoring the Govern function (new in 2.0) · the 6th function on supply chain + leadership is now mandatory.",
      "Using NIST CSF as a compliance checklist instead of a risk-management framework.",
    ],
    link: "/learn/cyber/nist-csf",
  },
  {
    name: "FAIR Risk Model",
    abbr: "FAIR",
    builder: "Jack Jones · The Open Group · 2005",
    year: "2005",
    family: "risk",
    oneliner:
      "Factor Analysis of Information Risk · quantitative model that decomposes risk into Loss Event Frequency × Loss Magnitude, with sub-factors that produce probability distributions in dollars.",
    use_when: [
      "Justifying security budget to a CFO · 'a $1.2M investment reduces annualized loss exposure by $4.8M ± $1.6M.'",
      "Comparing risks across heterogeneous threats · ransomware vs insider vs DDoS in same units.",
      "Insurance procurement · FAIR aligns to cyber-insurance underwriting math.",
    ],
    avoid_when: [
      "Tabletop exercises · FAIR is too quantitative for fast scenario play.",
      "Modeling low-frequency / high-magnitude tail risks · the variance crushes the mean.",
      "Cultures that demand 'low/medium/high' heat maps · don't fight the org chart.",
    ],
    mistakes: [
      "Pretending the input estimates have more precision than they do · use ranges + Monte Carlo.",
      "Skipping the Calibrated Estimation Training · garbage-in math is still garbage.",
      "Not using FAIR-U + the OpenFAIR ontology · they prevent term drift.",
    ],
  },
  {
    name: "Zero Trust Architecture",
    abbr: "ZTA",
    builder: "John Kindervag (Forrester · 2010) · NIST SP 800-207 (2020)",
    year: "2010 · NIST formalization 2020",
    family: "architecture",
    oneliner:
      "'Never trust, always verify.' Every request authenticated + authorized at the resource, regardless of network location. No implicit trust from being 'inside the perimeter.'",
    use_when: [
      "Modernizing a legacy network · ZTA is the path off perimeter-only defense.",
      "Multi-cloud + remote-work environments · the perimeter doesn't exist anymore.",
      "DoD + federal · OMB M-22-09 mandates ZTA for federal agencies by 2027.",
    ],
    avoid_when: [
      "Treating it as a product · 'we bought Zero Trust' is the most common error.",
      "Legacy industrial control systems where the air-gap still works.",
    ],
    mistakes: [
      "Confusing ZTA with ZTNA · ZTNA is one ZTA pillar, not the whole architecture.",
      "Implementing it as 'MFA everywhere' · ZTA also requires device + workload identity + microsegmentation.",
      "Stopping at user-to-app · service-to-service trust is the harder problem.",
    ],
    link: "/learn/cyber/zero-trust",
  },
  {
    name: "CIS Controls",
    abbr: "CIS v8.1",
    builder: "Center for Internet Security",
    year: "Originally SANS Top 20 · CIS v8 in 2021 · v8.1 in 2024",
    family: "framework",
    oneliner:
      "18 prioritized control families · ordered by 'do this first' impact. Each control has Implementation Groups (IG1/IG2/IG3) tiered by org maturity.",
    use_when: [
      "Small / medium orgs with one CISO and no compliance team · CIS gives prioritized 'do these 6 first.'",
      "Cyber insurance · most underwriters explicitly reference CIS IG1 as a baseline.",
      "Operational checklist · CIS is more actionable than NIST CSF at the control level.",
    ],
    avoid_when: [
      "Strategic / board communication · NIST CSF's 6 Functions read cleaner to non-technical leadership.",
      "Sectoral compliance (HIPAA · PCI) · use the relevant standard's controls, then crosswalk to CIS.",
    ],
    mistakes: [
      "Skipping the IG tier discipline · doing IG2 controls before IG1 is wasted effort.",
      "Treating CIS as static · v8.1 added cloud + remote work categories that v7 didn't have.",
    ],
  },
  {
    name: "ISO/IEC 27001",
    abbr: "ISO 27001",
    builder: "International Organization for Standardization · IEC",
    year: "2005 · 2013 · 2022 revision",
    family: "compliance",
    oneliner:
      "International standard for an ISMS (information security management system). Cert-driven · audited annually · de-facto requirement for selling B2B internationally.",
    use_when: [
      "Selling enterprise B2B globally · EU + UK + Asia procurement teams ask for ISO 27001 certification.",
      "Building an auditable program · ISO 27001 gives the structure auditors expect.",
      "Demonstrating maturity to investors · ISO certification signals you took security seriously enough to pass an audit.",
    ],
    avoid_when: [
      "Startups under 50 people · the audit cost ($30-80K initial · annual) usually outweighs ROI vs SOC 2 Type II.",
      "US-only B2B · SOC 2 carries more weight stateside.",
    ],
    mistakes: [
      "Confusing ISO 27001 (ISMS standard) with ISO 27002 (control catalog) · 27002 is the reference, 27001 is the cert.",
      "Treating Annex A controls as mandatory · they're a menu · you select based on the SoA (Statement of Applicability).",
      "Letting the certification expire · re-cert audit annual · suspension can leak to RFP responses.",
    ],
  },
  {
    name: "SOC 2",
    builder: "AICPA · American Institute of CPAs",
    year: "2010s mainstream adoption",
    family: "compliance",
    oneliner:
      "Service Organization Control 2 · attestation report covering 5 trust service criteria (Security mandatory, Availability, Processing Integrity, Confidentiality, Privacy optional). Type I = point-in-time · Type II = 6-12 month observation.",
    use_when: [
      "US B2B SaaS sales · SOC 2 Type II is the standard procurement ask.",
      "Cloud platform offering · customers will not buy without it once you're past ~50 employees.",
    ],
    avoid_when: [
      "International procurement · ISO 27001 carries more weight in EU + Asia.",
      "Pre-PMF startups · the $20-50K audit + $40K+/year compliance staff burns runway · wait for first 5 enterprise prospects.",
    ],
    mistakes: [
      "Choosing Type I when prospects need Type II · most enterprise procurement explicitly requires Type II.",
      "Using a low-quality auditor · audit quality varies wildly · the report is only as credible as the firm.",
      "Treating SOC 2 as continuous · the report describes the observation period · you can fail the next one.",
    ],
  },
  {
    name: "CMMC 2.0",
    builder: "US Department of Defense",
    year: "2020 · v2.0 in 2021 · v2.1 final rule 2024",
    family: "compliance",
    oneliner:
      "Cybersecurity Maturity Model Certification · three levels (Foundational 17 practices · Advanced 110 practices ~ NIST 800-171 · Expert 110+ ~ NIST 800-172). Required for DoD primes + subs handling CUI.",
    use_when: [
      "Selling to DoD as prime or sub · CMMC is becoming contract-mandatory by ~2025-2026.",
      "DIB (defense industrial base) suppliers handling Controlled Unclassified Information (CUI).",
    ],
    avoid_when: [
      "No DoD touch · skip CMMC, do NIST CSF + ISO + SOC 2.",
    ],
    mistakes: [
      "Confusing CMMC 1.0 (5 levels) with 2.0 (3 levels) · v1.0 is dead.",
      "Believing self-attestation suffices for Level 2 · only Level 1 allows self-attestation; Level 2 requires C3PAO audit.",
      "Starting CMMC prep before mapping your existing NIST 800-171 controls · the gap analysis IS the prep.",
    ],
  },
  {
    name: "STRIDE",
    builder: "Microsoft · Loren Kohnfelder + Praerit Garg",
    year: "1999",
    family: "appsec",
    oneliner:
      "Six threat categories · Spoofing · Tampering · Repudiation · Information Disclosure · Denial of Service · Elevation of Privilege. Applied per data-flow component during design review.",
    use_when: [
      "Design-phase threat modeling · architect-engineer review before code is written.",
      "Microservices threat modeling · run STRIDE per service boundary.",
      "Teaching new engineers to think about threats systematically.",
    ],
    avoid_when: [
      "Post-incident analysis · use Kill Chain or Diamond.",
      "Operations-focused environments · STRIDE is too design-time.",
    ],
    mistakes: [
      "Treating it as a checklist · STRIDE is a heuristic prompt, not a coverage matrix.",
      "Skipping data-flow diagrams · STRIDE without DFDs is just a brainstorming session.",
      "Stopping at design · the threats STRIDE surfaces still need verification at runtime.",
    ],
  },
  {
    name: "PASTA",
    builder: "Tony UcedaVélez · Marco Morana · OWASP-affiliated",
    year: "2012",
    family: "process",
    oneliner:
      "Process for Attack Simulation and Threat Analysis · 7-stage risk-centric methodology blending business-objective analysis with technical attack modeling.",
    use_when: [
      "Risk-driven threat modeling at large enterprises · ties technical threats to business objectives.",
      "When STRIDE produces too many unprioritized threats · PASTA forces business-impact ranking.",
      "Regulated industries (finance · health) where regulators expect business-context analysis.",
    ],
    avoid_when: [
      "Small teams · the 7-stage process is heavy for sub-10-engineer products.",
      "Greenfield design · simpler STRIDE workshops produce results faster.",
    ],
    mistakes: [
      "Skipping the Business Objective stage · the entire point is to anchor risk to business impact.",
      "Treating PASTA as STRIDE-with-paperwork · the attack-simulation stage is genuinely different.",
    ],
  },
  {
    name: "DREAD",
    builder: "Microsoft (deprecated internally)",
    year: "Late 1990s · deprecated by Microsoft ~2008",
    family: "risk",
    oneliner:
      "5-axis scoring: Damage · Reproducibility · Exploitability · Affected users · Discoverability. Score 0-10 each · sum / average for severity.",
    use_when: [
      "Rough scoring during pen-test reports when no formal risk model is in play.",
      "Teaching threat severity to junior engineers · the axes are intuitive.",
    ],
    avoid_when: [
      "Production risk decisions · DREAD is notoriously subjective + inter-rater unreliable.",
      "Formal risk programs · use FAIR or CVSS instead.",
    ],
    mistakes: [
      "Treating the score as quantitative · it's a heuristic rank, not a probability.",
      "Believing the 'Discoverability' axis · attackers find everything eventually.",
    ],
  },
  {
    name: "OCTAVE / OCTAVE Allegro",
    builder: "CERT/SEI at Carnegie Mellon",
    year: "1999 · Allegro 2007",
    family: "risk",
    oneliner:
      "Organizationally-driven risk assessment · workshops with business + IT stakeholders to identify information assets, threats, and impacts.",
    use_when: [
      "Bottom-up risk discovery in orgs without a formal risk model.",
      "Federal + healthcare contexts where CERT/SEI methods are explicitly preferred.",
    ],
    avoid_when: [
      "Speed-sensitive engagements · OCTAVE Allegro is 8 workshops minimum.",
      "Tech-savvy orgs that already have FAIR or NIST CSF in production.",
    ],
    mistakes: [
      "Confusing OCTAVE-S (small/medium org) with OCTAVE Allegro · they're different methodologies.",
      "Skipping the worksheets · the structure IS the value.",
    ],
  },
  {
    name: "OWASP Top 10 (Web)",
    builder: "OWASP Foundation",
    year: "2003 · most recent 2021 · 2025 in draft",
    family: "appsec",
    oneliner:
      "The 10 most critical web-application security risks · evidence-based · republished every ~3 years. Most recent: Broken Access Control · Cryptographic Failures · Injection · Insecure Design · Security Misconfig · Vulnerable Components · ID/Auth Failures · SW/Data Integrity · Logging/Monitoring · SSRF.",
    use_when: [
      "Baseline web app security training · every developer should know the Top 10.",
      "Pen-test scope definition · auditors test against OWASP Top 10 by default.",
    ],
    avoid_when: [
      "API-only systems · use OWASP API Top 10 instead.",
      "LLM applications · use OWASP LLM Top 10 instead.",
    ],
    mistakes: [
      "Treating the Top 10 as a complete vulnerability list · it's the 10 highest-impact, not the only 10.",
      "Using the 2017 version · 2021 is current · 2025 is in draft.",
    ],
  },
  {
    name: "OWASP API Security Top 10",
    builder: "OWASP Foundation",
    year: "2019 · 2023 revision",
    family: "appsec",
    oneliner:
      "API-specific Top 10 · the 2023 list is dominated by access-control failures (BOLA · BFLA) + lack of rate limiting + improper inventory management.",
    use_when: [
      "API-first products · skip the web Top 10 and use this.",
      "Microservices security review · per-service access control is the #1 issue.",
    ],
    avoid_when: ["UI-heavy products with thin APIs · web Top 10 still primary."],
    mistakes: [
      "Conflating BOLA + BFLA · BOLA = Broken Object Level (record-level) · BFLA = Broken Function Level (operation-level).",
      "Skipping API4 'Unrestricted Resource Consumption' · rate-limit failures cost more than data-leak vulnerabilities at scale.",
    ],
  },
  {
    name: "OWASP LLM Top 10",
    builder: "OWASP Foundation · LLM Security Working Group",
    year: "First published 2023 · LLM Top 10 for 2025 published 2024",
    family: "appsec",
    oneliner:
      "The 10 most critical LLM-application risks · Prompt Injection #1 · Sensitive Information Disclosure · Supply Chain · Data and Model Poisoning · Improper Output Handling · Excessive Agency · System Prompt Leakage · Vector and Embedding Weaknesses · Misinformation · Unbounded Consumption.",
    use_when: [
      "Any product wrapping an LLM API · this IS the baseline.",
      "RAG pipeline review · LLM06 (Excessive Agency) + LLM08 (Vector Weaknesses) are the dominant issues.",
    ],
    avoid_when: ["You're not building LLM applications · use Web or API Top 10 instead."],
    mistakes: [
      "Treating prompt-injection defense as solvable with prompts · prompt-injection is a class of attack, not a prompt-engineering problem.",
      "Skipping LLM07 (System Prompt Leakage) · your system prompt WILL leak; design as if it's public.",
    ],
    link: "/q/what-is-prompt-injection",
  },
  {
    name: "OWASP Mobile Top 10",
    builder: "OWASP Foundation",
    year: "2016 · 2024 revision",
    family: "appsec",
    oneliner:
      "Mobile-app-specific Top 10 · improper credential usage, inadequate supply-chain security, insecure auth/auth, insufficient I/O validation, insecure communication, etc.",
    use_when: ["iOS + Android app security baseline."],
    avoid_when: ["Server-side only · use Web/API Top 10."],
    mistakes: ["Confusing M5 (insecure communication) with TLS-only thinking · the cert pinning + transport+app-layer crypto is broader than HTTPS."],
  },
  {
    name: "PCI DSS",
    abbr: "PCI DSS v4.0",
    builder: "PCI Security Standards Council",
    year: "2004 · v4.0 in 2022 · v4.0.1 in 2024",
    family: "compliance",
    oneliner:
      "Payment Card Industry Data Security Standard · 12 requirements grouped in 6 control objectives · mandatory for any merchant handling cardholder data.",
    use_when: ["You process / store / transmit cardholder data · period."],
    avoid_when: [
      "You can outsource card handling to Stripe / Adyen / Braintree · SAQ-A (~80% reduction in scope) becomes viable.",
    ],
    mistakes: [
      "Believing tokenization removes scope · tokenization REDUCES scope; doesn't eliminate it.",
      "Choosing the wrong SAQ · the 9 self-assessment variants differ wildly in burden.",
    ],
  },
  {
    name: "HIPAA Security Rule",
    builder: "US HHS · Office for Civil Rights",
    year: "2003 · ongoing updates",
    family: "compliance",
    oneliner:
      "Administrative · Physical · Technical safeguards for Protected Health Information (PHI). Risk-analysis based · scales to organization size.",
    use_when: ["You touch PHI in the US · period."],
    avoid_when: ["No PHI · skip · don't conflate HIPAA with broader privacy."],
    mistakes: [
      "Treating HIPAA as a checklist · it's risk-based · your risk analysis is the centerpiece.",
      "Believing BAAs handle everything · they're a starting point, not a substitute for due diligence.",
    ],
  },
  {
    name: "SABSA",
    builder: "John Sherwood · Andrew Clark · David Lynas",
    year: "1995",
    family: "architecture",
    oneliner:
      "Sherwood Applied Business Security Architecture · enterprise security architecture method · 6 layers × 6 questions matrix · contextual / conceptual / logical / physical / component / operational.",
    use_when: [
      "Building a security architecture practice at large enterprises (50K+ employees).",
      "Tying security to business attributes (the SABSA Attribute Profile is the value).",
    ],
    avoid_when: [
      "Small / mid-size orgs · SABSA is heavyweight overkill below ~5,000 employees.",
      "Tactical engagements · SABSA is strategic.",
    ],
    mistakes: [
      "Trying to implement all 6 layers at once · build context + conceptual first, defer the rest.",
      "Confusing SABSA with TOGAF · TOGAF is enterprise architecture broad · SABSA is security-specific.",
    ],
  },
  {
    name: "CVSS",
    abbr: "CVSS v4.0",
    builder: "FIRST.org",
    year: "v2 in 2007 · v3 in 2015 · v4.0 in 2023",
    family: "risk",
    oneliner:
      "Common Vulnerability Scoring System · vendor-neutral vulnerability severity scoring · Base + Temporal + Environmental metrics → 0.0-10.0 score.",
    use_when: [
      "Triaging vulnerability disclosures · CVSS is the universal severity language.",
      "Patch prioritization at scale · sort by CVSS, then by your environmental modifier.",
    ],
    avoid_when: [
      "Risk quantification in $ · use FAIR · CVSS is severity, not risk.",
      "Internal-only threats not in CVE databases · CVSS still works but the temporal metrics are noise.",
    ],
    mistakes: [
      "Using base score only · always compute environmental score for YOUR org.",
      "Believing high CVSS = high risk · a 9.8 in a system no one uses is lower business risk than a 6.2 in your billing pipeline.",
      "Skipping the CVSS v4.0 supplemental metrics (Safety · Recovery · etc) · they're optional but informative.",
    ],
  },
  {
    name: "FIRST EPSS",
    abbr: "EPSS",
    builder: "FIRST.org",
    year: "2019 · v3 in 2023",
    family: "risk",
    oneliner:
      "Exploit Prediction Scoring System · probability (0-1) that a CVE will be exploited in the wild in the next 30 days. Trained on real-world exploit telemetry.",
    use_when: [
      "Patch prioritization beyond CVSS · 'high CVSS + high EPSS' = the actual immediate worklist.",
      "Cyber insurance + risk reporting · EPSS-weighted exposure is the modern KPI.",
    ],
    avoid_when: [
      "Zero-days · EPSS only models published CVEs.",
      "Internal vulnerabilities · EPSS doesn't have telemetry on private exploits.",
    ],
    mistakes: [
      "Using EPSS to ignore high-CVSS-low-EPSS vulns · they're still pre-exploitation worth fixing.",
    ],
  },
];

const FAMILIES_ORDER: Model["family"][] = ["threat", "framework", "risk", "architecture", "appsec", "compliance", "process"];

const HOW_TO_PICK = [
  "If you're a CISO building a program from scratch · NIST CSF 2.0 + CIS Controls + FAIR + ISO 27001 (or SOC 2) · in that order.",
  "If you're a SOC analyst · MITRE ATT&CK + Diamond Model + the company's chosen detection rule format.",
  "If you're a software engineer doing threat modeling · STRIDE for design, OWASP Top 10 (Web/API/LLM/Mobile) for code review, PASTA when business risk needs ranking.",
  "If you're a DoD prime / sub · CMMC 2.0 + NIST 800-171 + the relevant DFARS clauses.",
  "If you're selling enterprise B2B · SOC 2 (US) or ISO 27001 (global) · in that order of urgency.",
  "If you process payment cards · PCI DSS · no shortcuts · choose SAQ based on real card-handling scope.",
  "If you're a security architect at a large enterprise · SABSA + TOGAF + Zero Trust + your domain frameworks.",
  "If you're communicating with a CFO · FAIR + CVSS/EPSS · everyone else's models don't speak the CFO's language.",
  "If you're testing AI / LLM systems · OWASP LLM Top 10 + AI-specific threat modeling (see /q/what-is-prompt-injection and /learn/cyber/ai-security).",
];

export default function CyberModelsPage() {
  const byFamily = (f: Model["family"]) => MODELS.filter((m) => m.family === f);
  return (
    <main className="min-h-screen text-[#F4F4F2]">
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF]">§ cyber · industry models reference</p>
          <h1 className="mt-6 font-serif text-[44px] font-light leading-[1.04] tracking-[-0.025em] md:text-[64px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Every model. When to use each.
          </h1>
          <p className="speakable-answer mt-6 max-w-3xl font-serif text-[18px] leading-[1.55] text-[#9CA3AF] md:text-[20px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            22 industry cybersecurity models · what each is · who built
            it · when to use it · when NOT to use it · and the common
            mistakes the lab has watched practitioners make. Use this
            page as the operator-grade picker before adopting any
            framework. CC-BY 4.0.
          </p>
        </div>
      </section>

      {FAMILIES_ORDER.filter((f) => byFamily(f).length > 0).map((family) => (
        <section key={family} className="border-b border-[#1F242B]">
          <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: FAMILY_COLOR[family] }}>
              § {family.toUpperCase()} family · {byFamily(family).length} model{byFamily(family).length > 1 ? "s" : ""}
            </p>
            <ol className="mt-10 space-y-10">
              {byFamily(family).map((m) => (
                <li key={m.name} className="border-l-2 border-[#1F242B] pl-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <div className="flex items-baseline gap-3">
                      <h2 className="font-serif text-[26px] font-light text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{m.name}</h2>
                      {m.abbr ? <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#5A6068]">[{m.abbr}]</span> : null}
                    </div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: FAMILY_COLOR[m.family] }}>
                      {FAMILY_LABEL[m.family]} · {m.year}
                    </p>
                  </div>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#5A6068]">by · {m.builder}</p>
                  <p className="mt-4 font-serif text-[16px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{m.oneliner}</p>

                  <div className="mt-6 grid gap-6 md:grid-cols-3">
                    <div className="border-l-2 border-[#22F0D5] pl-4">
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">Use when</p>
                      <ul className="mt-3 space-y-2">
                        {m.use_when.map((u, i) => (
                          <li key={i} className="font-serif text-[13px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>+ {u}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="border-l-2 border-[#FF4D4D] pl-4">
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF4D4D]">Avoid when</p>
                      <ul className="mt-3 space-y-2">
                        {m.avoid_when.map((u, i) => (
                          <li key={i} className="font-serif text-[13px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>− {u}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="border-l-2 border-[#C9A55C] pl-4">
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C9A55C]">Common mistakes</p>
                      <ul className="mt-3 space-y-2">
                        {m.mistakes.map((u, i) => (
                          <li key={i} className="font-serif text-[13px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>! {u}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {m.link ? (
                    <Link href={m.link} className="mt-5 inline-block font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5] underline decoration-[#1F242B] underline-offset-4 hover:decoration-[#22F0D5]">
                      → deeper lab page · {m.link}
                    </Link>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </section>
      ))}

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ how to pick · by role</p>
          <ol className="mt-10 space-y-5">
            {HOW_TO_PICK.map((h, i) => (
              <li key={i} className="flex items-baseline gap-4 border-b border-[#1F242B] pb-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">{String(i + 1).padStart(2, "0")}</span>
                <p className="font-serif text-[16px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{h}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <div className="grid gap-3 md:grid-cols-4">
            {[
              { href: "/learn/cyber/mythos", label: "Mythos · defense-tech doctrine" },
              { href: "/learn/cyber", label: "Cyber index · 40 pages" },
              { href: "/learn/cyber/ai-security", label: "AI security · flagship" },
              { href: "/learn/cyber/mitre-attack", label: "MITRE ATT&CK · deeper" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="group border border-[#1F242B] bg-[#0F1114] p-4 transition-colors hover:border-[#22F0D5]">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068] transition-colors group-hover:text-[#22F0D5]">atomeons.com{l.href}</p>
                <p className="mt-2 font-serif text-[15px] font-medium" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{l.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
