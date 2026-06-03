import type { Metadata } from "next";
import Link from "next/link";
import { CyberHeroImage } from "../_components/CyberHeroImage";

/**
 * /learn/cyber/breaches — fifteen breaches that defined modern cybersecurity.
 *
 * Operator directive 2026-05-31: "tell the truth but only public info."
 * Each breach below is sourced from one or more of: company 8-K SEC filings,
 * DOJ indictments, CISA advisories, FBI press releases, reputable journalism
 * (NYT, WaPo, WSJ, Reuters, AP, FT, Wired, Bloomberg, Krebs on Security).
 *
 * Post-disclosure case studies only — no live or recently-disclosed events
 * without a clear public source. Defensive lessons emphasized over attacker
 * tradecraft. Voice: lab-grade, anti-hype, factual.
 */

export const metadata: Metadata = {
  title: "Fifteen breaches that defined modern cybersecurity · /learn/cyber/breaches · AtomEons",
  description:
    "Stuxnet, Target 2013, Sony 2014, OPM 2015, Equifax 2017, NotPetya 2017, SolarWinds 2020, Microsoft Exchange ProxyLogon 2021, Colonial Pipeline 2021, Kaseya 2021, MOVEit 2023, Change Healthcare 2024, Volt Typhoon, Salt Typhoon, and the AT&T 2024 telco compromise. Public sources only.",
  alternates: { canonical: "https://atomeons.com/learn/cyber/breaches" },
  openGraph: {
    title: "Fifteen breaches that defined modern cybersecurity",
    description: "Public-info case studies of the breaches every cyber professional should know cold.",
    url: "https://atomeons.com/learn/cyber/breaches",
    type: "article",
  },
  robots: { index: true, follow: true },
};

const ACCENT = "#22F0D5";
const WARN = "#FFB87A";

const BREACHES = [
  {
    year: "2010",
    name: "Stuxnet",
    target: "Iranian uranium-enrichment program (Natanz)",
    cost: "Estimated 1,000+ IR-1 centrifuges damaged",
    summary:
      "Computer worm targeting industrial control systems via Windows + Siemens Step7 software. The first publicly-documented case of a cyber weapon causing physical destruction of industrial equipment. Manipulated PLC code to degrade centrifuges while reporting normal operation to monitoring systems. Discovered when the worm escaped Iran and infected systems globally. Widely attributed in declassified reporting to a joint US-Israeli operation under the codename Olympic Games. Never officially claimed.",
    sources: [
      "Kim Zetter · Countdown to Zero Day · 2014",
      "David Sanger · NYT 'Obama Order Sped Up Wave of Cyberattacks Against Iran' · June 1, 2012",
    ],
    impact: "Established cyber as a weapon capable of kinetic effects. Reshaped doctrine globally. Every offensive cyber program post-2010 cites Stuxnet as ancestor.",
  },
  {
    year: "2013",
    name: "Target",
    target: "Target Corporation retail point-of-sale systems",
    cost: "~40M credit/debit cards + 70M PII records · $292M+ in direct breach costs",
    summary:
      "Attackers obtained credentials through Target's HVAC vendor (Fazio Mechanical), pivoted through Target's network, deployed memory-scraping malware on POS terminals. Card data exfiltrated over 19 days during peak holiday shopping. Established supply-chain attacks as a top-tier vector and remains the textbook case for vendor risk management.",
    sources: [
      "Brian Krebs · 'Target Hackers Broke in Via HVAC Company' · Feb 5, 2014",
      "Target SEC 10-K 2014 filing",
    ],
    impact: "Pushed PCI-DSS toward chip-and-PIN. CISO role became board-level conversation. Established third-party vendor as the dominant breach origin.",
  },
  {
    year: "2014",
    name: "Sony Pictures",
    target: "Sony Pictures Entertainment",
    cost: "~100 TB exfiltrated · 4 unreleased films leaked · multiple lawsuits",
    summary:
      "Attackers released internal emails, executive personal information, salary data, and unreleased films. Followed The Interview release controversy. Treasury Department sanctioned North Korea in January 2015 based on attribution. One of the first major public examples of state-actor reprisal against a US private company over content.",
    sources: [
      "FBI press release · 'Update on Sony Investigation' · Dec 19, 2014",
      "Treasury Department · sanctions order · Jan 2, 2015",
    ],
    impact: "Established that nation-states will retaliate against private companies over content. Self-censorship discussions across Hollywood.",
  },
  {
    year: "2015",
    name: "OPM",
    target: "US Office of Personnel Management",
    cost: "21.5M federal employee records · including SF-86 background investigation forms with fingerprints",
    summary:
      "Sustained intrusion exfiltrating personnel records of essentially every federal employee plus contractors plus family members on background investigations. SF-86 forms include foreign contacts, financial records, mental health history. Attributed by US government to Chinese state actors. The single most consequential US government data breach by counterintelligence value.",
    sources: [
      "DNI Clapper · Senate testimony · Sep 10, 2015",
      "OPM Office of the Inspector General · audit reports 2015-2017",
    ],
    impact: "Reformed federal cybersecurity governance. Created the Cybersecurity and Infrastructure Security Agency (CISA, 2018). Years of counterintelligence damage estimated.",
  },
  {
    year: "2017",
    name: "Equifax",
    target: "Equifax credit reporting agency",
    cost: "147M US consumers' PII · $1.4B+ in fines and settlements",
    summary:
      "Attackers exploited an unpatched Apache Struts vulnerability (CVE-2017-5638) disclosed two months prior. Maintained access for 76 days. Exfiltrated names, SSNs, DOBs, addresses, driver's license numbers, credit card numbers. Four PLA officers indicted by DOJ in February 2020.",
    sources: [
      "Equifax · 8-K SEC filing · Sep 7, 2017",
      "DOJ indictment of four PLA officers · Feb 10, 2020",
    ],
    impact: "Patch management failures became board-level liability. State data-breach notification laws expanded. SEC began requiring material breach disclosure within 4 business days (effective 2023).",
  },
  {
    year: "2017",
    name: "NotPetya",
    target: "Initially Ukraine via M.E.Doc tax software; cascaded globally",
    cost: "Estimated $10B+ in damages · Maersk: $300M · Merck: $870M · FedEx TNT: $400M",
    summary:
      "Destructive malware disguised as ransomware (encryption was irrecoverable). Spread via compromised Ukrainian tax-accounting software M.E.Doc. Attributed by US, UK, Canadian, Australian, and Five Eyes governments to Russian GRU. The largest documented cyber-attack economic impact in public reporting. Demonstrated that even non-Ukrainian businesses with any tangential Ukrainian exposure could become collateral.",
    sources: [
      "White House statement · attribution to GRU · Feb 15, 2018",
      "UK NCSC + US CISA · joint advisory · multiple dates",
    ],
    impact: "Cyber-insurance war-exclusion clauses began excluding nation-state attacks (Mondelez v. Zurich, 2018, settled 2022). Supply-chain risk in upstream software became board-level.",
  },
  {
    year: "2020",
    name: "SolarWinds Orion",
    target: "SolarWinds + ~18,000 downstream customers including US federal agencies",
    cost: "Estimated $100B+ in remediation costs across affected organizations",
    summary:
      "Software supply-chain compromise: attackers inserted SUNBURST backdoor into SolarWinds Orion network-monitoring product updates. ~18,000 customers received the backdoored update. Selective post-compromise activity targeted US Treasury, Commerce, State, DHS, Energy, parts of DoD, Microsoft, FireEye (which discovered the compromise), and others. Attributed by US government to Russian SVR. Triggered the Biden administration's Executive Order 14028 on Improving the Nation's Cybersecurity.",
    sources: [
      "FireEye · 'Highly Evasive Attacker Leverages SolarWinds Supply Chain' · Dec 13, 2020",
      "Joint statement from FBI, CISA, ODNI, NSA · attribution to SVR · Jan 5, 2021",
    ],
    impact: "Software supply-chain became a category-one threat in federal doctrine. SBOM (Software Bill of Materials) requirements expanded. The 2023 National Cybersecurity Strategy explicitly addresses this lineage.",
  },
  {
    year: "2021",
    name: "Microsoft Exchange ProxyLogon",
    target: "On-premises Microsoft Exchange Server worldwide",
    cost: "Tens of thousands of organizations compromised before patches available",
    summary:
      "Four zero-day vulnerabilities (CVE-2021-26855, -26857, -26858, -27065) exploited by Chinese state-sponsored actors Microsoft attributes to HAFNIUM. Initial exploitation began in early January 2021; Microsoft patched March 2; mass-exploitation by multiple groups followed. FBI subsequently used court order to remove malicious web shells from victim systems — an unprecedented active cyber operation on US private infrastructure.",
    sources: [
      "Microsoft Threat Intelligence Center · HAFNIUM attribution · Mar 2, 2021",
      "DOJ press release · 'Justice Department Announces Court-Authorized Effort to Disrupt Exploitation of Microsoft Exchange Server Vulnerabilities' · Apr 13, 2021",
    ],
    impact: "Patch-availability gaps in critical infrastructure became central concern. Federal authority for active defense expanded by precedent.",
  },
  {
    year: "2021",
    name: "Colonial Pipeline",
    target: "Largest fuel pipeline operator in the eastern US",
    cost: "$4.4M ransom paid · 6-day pipeline shutdown · fuel shortages across SE US",
    summary:
      "Ransomware attack via compromised single-factor VPN credentials. Pipeline operator shut down operations as a precaution after IT systems were encrypted (not OT systems directly). Attributed to DarkSide (Russia-based criminal group). FBI recovered ~$2.3M of the ransom from a tracked Bitcoin address. Pushed TSA toward mandatory cybersecurity directives for pipeline operators.",
    sources: [
      "Colonial Pipeline statement · multiple, May 7-13, 2021",
      "FBI press release · ransom recovery · Jun 7, 2021",
      "TSA Security Directive Pipeline-2021-01",
    ],
    impact: "Federal cybersecurity directives expanded to critical infrastructure outside of traditional regulation. MFA on remote access became a baseline for critical infrastructure.",
  },
  {
    year: "2021",
    name: "Kaseya VSA",
    target: "Kaseya MSP software + ~1,500 downstream organizations",
    cost: "~$70M in ransoms demanded · Sweden's Coop grocery closed 800 stores",
    summary:
      "REvil ransomware group exploited a zero-day in Kaseya's VSA remote-management software, used by managed service providers (MSPs) to administer client networks. Compromised one MSP, distributed ransomware to that MSP's customers. Cascaded across ~1,500 organizations. FBI obtained the decryptor and shared it with victims; Russian authorities later arrested REvil members (Jan 2022, later proceedings unclear).",
    sources: [
      "Kaseya security advisory · multiple, July 2-13, 2021",
      "CISA + FBI · joint advisory · July 4, 2021",
    ],
    impact: "MSP-as-vector category solidified as top threat. Federal scrutiny on the MSP industry's own security posture intensified.",
  },
  {
    year: "2023",
    name: "MOVEit Transfer",
    target: "Progress Software MOVEit · downstream effects across 2,500+ organizations",
    cost: "~95M records affected · 2,500+ organizations confirmed compromised",
    summary:
      "Cl0p ransomware group exploited a zero-day SQL injection in MOVEit Transfer (CVE-2023-34362). Mass-exploitation between May 27 and June 1, 2023. Affected organizations included British Airways, BBC, Boots, US Department of Energy, NY Department of Motor Vehicles, university systems, and many more. Single largest breach by organizational count in the modern era.",
    sources: [
      "Progress Software security advisory · May 31, 2023",
      "CISA #StopRansomware advisory · June 7, 2023",
    ],
    impact: "Re-centered focus on file-transfer software as a high-value target category. Vendor security testing requirements expanded.",
  },
  {
    year: "2023",
    name: "Volt Typhoon (disclosure)",
    target: "US critical infrastructure (telecom, transportation, water, energy)",
    cost: "Pre-positioning detected before disruptive action",
    summary:
      "Joint CISA/NSA/FBI/Five Eyes advisory disclosing China-state-sponsored campaign of pre-positioning in US critical infrastructure for potential disruptive operations in a future crisis. Living-off-the-land techniques (no malware, just legitimate-tools-used-malicious) made detection difficult. Subsequent disclosures through 2024-2025 expanded the scope. The publicly stated assessment is that Volt Typhoon is positioning for sabotage, not espionage collection.",
    sources: [
      "CISA #StopRansomware advisory AA23-144A · May 24, 2023",
      "Microsoft Threat Intelligence · Volt Typhoon reporting · May 24, 2023",
      "FBI Director Christopher Wray testimony to House Select Committee on CCP · Jan 31, 2024",
    ],
    impact: "Reframed China cyber threat from espionage to pre-position-for-sabotage. Critical-infrastructure threat hunting became federal priority.",
  },
  {
    year: "2024",
    name: "Change Healthcare",
    target: "UnitedHealth Group subsidiary processing ~1/3 of US healthcare claims",
    cost: "$22M ransom confirmed paid · estimated 100M+ individuals affected · ~$2.5B+ in total response costs",
    summary:
      "ALPHV/BlackCat ransomware attack disrupted billing across thousands of providers. UnitedHealth confirmed payment of $22M ransom in subsequent congressional testimony. Notification of affected individuals continued through 2024-2025 with estimates exceeding 100M people. The largest US healthcare data breach by individuals affected.",
    sources: [
      "UnitedHealth Group · 8-K filings · multiple, 2024",
      "House Energy and Commerce subcommittee testimony · Apr 16, 2024",
      "Senate Finance Committee testimony · May 1, 2024",
    ],
    impact: "Healthcare third-party-risk regulation accelerated. Industry-concentration risk in healthcare claims processing became national-security framing.",
  },
  {
    year: "2024",
    name: "Salt Typhoon",
    target: "US telecommunications carriers (AT&T, Verizon, Lumen confirmed)",
    cost: "Compromise of lawful-intercept systems · scope of intelligence loss still being assessed",
    summary:
      "China-state-sponsored compromise of US telecommunications carriers including access to lawful-intercept systems — the same systems used by US law enforcement for court-authorized wiretaps. Considered one of the most consequential US telecommunications intrusions in public reporting. Government communications including phones of senior officials reportedly affected. Disclosed by FBI/CISA late 2024.",
    sources: [
      "Joint FBI + CISA statement · 'PRC targeting commercial telecommunications infrastructure' · late 2024",
      "WSJ + WaPo investigative reporting · multiple, Oct-Dec 2024",
    ],
    impact: "Telecommunications-sector security regulation accelerating in 2025. End-to-end encryption advocacy strengthened in policy circles.",
  },
  {
    year: "2024",
    name: "Snowflake (cascading customer breaches)",
    target: "Snowflake customer accounts (AT&T, Ticketmaster/Live Nation, Santander, others)",
    cost: "AT&T: ~110M customer records · Ticketmaster: ~560M · Santander: 30M",
    summary:
      "Credential-stuffing attacks against Snowflake customer accounts that lacked MFA. Stolen credentials sourced from prior infostealer-malware infections. Multiple high-profile customer data breaches resulted. UNC5537 (Mandiant attribution) was the primary actor. Pushed Snowflake to require MFA for all customer accounts by default.",
    sources: [
      "Mandiant · UNC5537 reporting · Jun 10, 2024",
      "AT&T 8-K SEC filing · Jul 12, 2024",
    ],
    impact: "Cloud-tenant MFA defaults became table-stakes. Infostealer-malware market and credential broker economy got renewed federal attention.",
  },
];

const TAKEAWAYS = [
  "Supply chain is the dominant vector. Target (HVAC vendor), SolarWinds (software vendor), Kaseya (MSP), MOVEit (file-transfer software) — four of the most consequential post-2013 breaches. If your security plan doesn't extensively address upstream vendor risk, your security plan is incomplete.",
  "Patch management failures cost billions. Equifax was a two-month-old Apache Struts vuln. ProxyLogon Exchange was a two-week patch gap. The Verizon DBIR has reported every year that exploitation of known vulnerabilities is the most common initial-access vector.",
  "Ransomware became geopolitics. NotPetya redefined cyber-insurance. Colonial Pipeline pulled TSA into cyber. Kaseya, MOVEit, Change Healthcare each forced policy responses. The criminal-ransomware vs nation-state line is blurry by design.",
  "Critical-infrastructure pre-positioning is the 2026 threat. Volt Typhoon and Salt Typhoon reframed the conversation from 'espionage' to 'sabotage preparation.' This is the cyberwar context any defender needs to understand cold.",
  "Federal disclosure regimes are now structural. SEC 4-business-day rule (2023), state breach notification laws, CISA's CIRCIA reporting requirements. Pretending a breach didn't happen is no longer an option for public companies in regulated sectors.",
];

export default function CyberBreachesPage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <CyberHeroImage slug="cyberwar" alt="Black undersea fiber-optic cable rising from dark water with droplets catching a thin cyan rim light." />
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[11px] tracking-[0.08em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn/cyber" className="hover:text-[#22F0D5]">Cyber</Link>{" "}
          <span className="text-[#1A2225]">/</span> Breaches
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            Fifteen breaches every cyber professional should know cold
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            The history of cybersecurity is{" "}
            <span style={{ color: ACCENT }}>the history of breaches.</span>
          </h1>
          <p className="mt-8 max-w-[62ch] text-base leading-[1.7] text-[#C8CCCE] md:text-[17px]">
            Each row below is a case study taught in every serious cybersecurity program. The pattern across all fifteen is more important than any one: supply chains are the vector, patches are late, ransomware blurred geopolitics, and pre-positioning is the 2026 threat.
          </p>
          <p className="mt-5 max-w-[62ch] text-sm leading-[1.6] text-[#FFB87A]">
            Public sources only. SEC filings, DOJ indictments, CISA advisories, FBI press releases, reputable journalism. Defensive lessons emphasized. No operational tradecraft.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24 space-y-10">
          {BREACHES.map((b, i) => (
            <article key={b.name} className="border-l-2 pl-6" style={{ borderColor: ACCENT + "30" }}>
              <div className="flex flex-wrap items-baseline gap-4">
                <p className="font-mono text-[14px] tabular-nums" style={{ color: ACCENT }}>
                  {String(i + 1).padStart(2, "0")} · {b.year}
                </p>
                <h2 className="text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
                  {b.name}
                </h2>
              </div>
              <p className="mt-2 text-sm text-[#9BA5A7]">
                <span className="text-[#FFB87A]">Target:</span> {b.target}
              </p>
              <p className="mt-1 text-sm text-[#9BA5A7]">
                <span className="text-[#FFB87A]">Cost:</span> {b.cost}
              </p>
              <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">{b.summary}</p>
              <div className="mt-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">::sources</p>
                <ul className="mt-2 space-y-1 text-[13px] text-[#9BA5A7]">
                  {b.sources.map((s) => (
                    <li key={s}>· {s}</li>
                  ))}
                </ul>
              </div>
              <p className="mt-5 max-w-[62ch] rounded-lg border border-[#22F0D5]/20 bg-[#08090B]/30 p-4 text-[14px] leading-[1.65] text-[#C8CCCE]">
                <span className="font-medium text-[#22F0D5]">Impact: </span>{b.impact}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-[#1A2225] bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            What the fifteen teach
          </p>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            Five patterns, one field.
          </h2>
          <ol className="mt-10 space-y-6">
            {TAKEAWAYS.map((t, i) => (
              <li key={i} className="grid grid-cols-[2.5rem_1fr] gap-4">
                <span className="font-mono text-2xl font-bold tabular-nums" style={{ color: ACCENT }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-base leading-[1.7] text-[#C8CCCE]">{t}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/learn/cyber/cyberwar" className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 px-5 py-2.5 text-sm font-medium text-[#22F0D5] transition-colors hover:bg-[#22F0D5]/10">
              State-actor framework →
            </Link>
            <Link href="/learn/cyber/legal" className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] px-5 py-2.5 text-sm text-[#C8CCCE] transition-colors hover:border-[#FFB87A]/40 hover:text-[#FFB87A]">
              CFAA · stay legal →
            </Link>
            <Link href="/learn/cyber" className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] px-5 py-2.5 text-sm text-[#9BA5A7] transition-colors hover:text-[#E7EBED]">
              ← cyber index
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
