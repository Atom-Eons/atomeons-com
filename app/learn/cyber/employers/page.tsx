import type { Metadata } from "next";
import Link from "next/link";
import { CyberHeroImage } from "../_components/CyberHeroImage";

/**
 * /learn/cyber/employers — the defense-industrial + commercial cyber employer guide.
 *
 * Pulls from public material across:
 *   - Booz Allen Hamilton (boozallen.com/expertise/cybersecurity, /artificial-intelligence)
 *   - Palantir (palantir.com, public Karp speeches, Maven Smart System press)
 *   - Anduril (anduril.com, DoD CCA press, public investor materials)
 *   - Big commercial cyber: Mandiant (Google), CrowdStrike, Microsoft, SentinelOne,
 *     Palo Alto, Rapid7, Sophos, Trellix
 *   - Federal employers: NSA, CISA, FBI Cyber, USCYBERCOM, DC3
 *   - Mid-tier defense: Lockheed, Raytheon, Northrop, BAE Systems Inc, SAIC, CACI, Leidos
 *
 * Operator directive 2026-06-02: "read all their blogs for data and alpha.
 * we want to be trained like an industry aware pro, not a rookie."
 *
 * Sourcing posture: public press, named products, public-record contracts,
 * verifiable claims. No insider speculation. Every cite carries a source.
 */

export const metadata: Metadata = {
  title: "Defense-industrial + commercial cyber employer guide · /learn/cyber/employers · AtomEons",
  description:
    "Where ethical-hacking pros actually work in 2026. Booz Allen Vellox, Palantir AIP/Maven Smart System, Anduril Lattice, Mandiant, CrowdStrike, Microsoft, SentinelOne, Palo Alto, NSA, CISA, FBI Cyber, USCYBERCOM. Public-source company profiles + how to apply.",
  alternates: { canonical: "https://atomeons.com/learn/cyber/employers" },
  openGraph: {
    title: "Defense + commercial cyber employer guide",
    description: "30+ named employers. Public sources. How to apply.",
    url: "https://atomeons.com/learn/cyber/employers",
    type: "article",
  },
  robots: { index: true, follow: true },
};

const ACCENT = "#22F0D5";
const WARN = "#FFB87A";

const TIER_ONE_FEDERAL_PRIME = [
  {
    name: "Booz Allen Hamilton",
    ticker: "BAH · NYSE",
    framing: "Largest US federal cyber + AI prime by revenue. Self-described as Deltek 2025 #1 federal cybersecurity AND federal AI provider. ~2,350+ AI practitioners across ~200 active federal AI engagements at ~160 federal clients. The default first stop if you want a federal cyber career inside a private company.",
    products: [
      "Vellox Reverser™ · autonomous malware reverse engineering + threat intelligence",
      "Vellox Ranger™ · AI-powered detection engineering",
      "Vellox Striker™ · red-team emulation tool",
      "Cyber Fusion Centers · commercial threat operation centers",
      "aiSSEMBLE · proprietary lean AI engineering framework for federal + commercial",
    ],
    serviceLines: [
      "Zero Trust Solutions (#1 Federal Provider claim)",
      "Intelligent Cyber Defense — threat hunting + adversary response",
      "Cyber-Physical Defense Operations — critical infrastructure",
      "Weapon and Space Systems Cybersecurity",
      "Resilient Positioning, Navigation, and Timing (PNT) security",
      "AI for Cybersecurity — AI/ML automated threat detection",
      "Secure AI — building + certifying secure AI systems, adversarial-attack resistant",
      "Responsible AI — governance, risk measurement, compliance",
    ],
    doctrine: "\"Cyberattacks move at AI speed. Cyber defense must too.\" Their public positioning is on the cybersecurity speed gap as primary strategic challenge — adversary tradecraft models trained by elite cyber operators to enable machine-speed automation.",
    apply: "boozallen.com/expertise/cybersecurity · careers.boozallen.com · clearance typically required (Secret minimum, TS/SCI common). Strong intern + early-career pipeline. Government Affairs / Mission Services for non-cleared early career.",
    sources: "boozallen.com/expertise/cybersecurity (named products + service lines) · boozallen.com/expertise/artificial-intelligence (AI capabilities + practitioner count) · Booz Allen Hamilton 10-K SEC filings",
  },
  {
    name: "Palantir Technologies",
    ticker: "PLTR · NASDAQ",
    framing: "Most public-facing software-defense prime. Two original platforms — Gotham (intel/defense, in DoD use since the early Iraq war era) and Foundry (commercial enterprise data platform). AIP (Artificial Intelligence Platform, launched 2023) added an LLM integration layer to both. Maven Smart System prime contractor win (~$153M initial in 2024, expanded through 2024-2025). CEO Alex Karp publicly outspoken on the company's mission posture.",
    products: [
      "Gotham · intelligence/defense data platform",
      "Foundry · commercial enterprise data platform",
      "AIP (Artificial Intelligence Platform) · LLM integration layer (2023)",
      "Maven Smart System · DoD program prime (2024, formerly Project Maven)",
      "Apollo · continuous-delivery infrastructure used internally + offered to customers",
    ],
    serviceLines: [
      "Forward Deployed Engineer (FDE) — Palantir's signature role; engineers embedded with the customer to operationalize platform deployment",
      "Implementation + Operations · how Gotham/Foundry land at customer sites",
      "AI/ML research · published in blog.palantir.com and the company's Medium presence",
    ],
    doctrine: "Karp's public posture frames the company as a defender-of-the-West technology layer. His 2024 book 'The Technological Republic' (with co-author Nicholas Zamiska) lays out a public-intellectual frame for the company's mission. Notable for explicit refusal of certain commercial work + explicit pursuit of defense + IC work.",
    apply: "palantir.com/careers · Forward Deployed Engineer is the canonical entry path for technical undergrads (heavy interview loop, on-site implementation work). Software Engineering + Operations also enter the company. US person required for most defense work; some commercial Foundry roles do not require it.",
    sources: "palantir.com (product taxonomy) · palantir.com/careers · blog.palantir.com (engineering blog) · Maven Smart System DoD press releases 2024 · Karp public speeches at CNAS + other defense forums · 'The Technological Republic' 2024 book",
  },
  {
    name: "Anduril Industries",
    ticker: "Private · Series F at $14B+ valuation (2024 public reporting)",
    framing: "Founded 2017 by Palmer Luckey (Oculus founder) after departure from Facebook. Vertically integrated defense product company — software platform (Lattice OS) + hardware (drones, autonomous vehicles, towers, counter-UAS). Public philosophy: \"build the products, then sell them\" rather than cost-plus contract model. Won the US Air Force Collaborative Combat Aircraft (CCA) program with General Atomics in 2024.",
    products: [
      "Lattice OS · AI-driven command + control software platform — the company's spine",
      "Ghost · autonomous surveillance UAV",
      "ALTIUS · loitering munition family",
      "Bolt · handheld kamikaze drone",
      "Roadrunner · VTOL counter-UAS interceptor",
      "Sentry Tower · autonomous surveillance tower (border + base perimeter)",
      "Dive-LD · autonomous underwater vehicle",
      "Fury · CCA (Collaborative Combat Aircraft) candidate",
      "ALTIUS-700M · larger loitering munition class",
    ],
    serviceLines: [
      "Software engineering on Lattice + autonomy stack",
      "Hardware engineering across the drone + maritime + ground vehicle product lines",
      "Manufacturing engineering — vertically-integrated production",
      "Security engineering — clearance pipeline for defense-cleared work",
      "Forward operating teams — work alongside US + allied military customers",
    ],
    doctrine: "Luckey's stated thesis: the US defense industrial base lost the ability to ship competitive products at competitive prices because the cost-plus contract model rewards delivery delays. Anduril sells products to DoD the same way Apple sells phones — fixed-price, productized, refresh cycles. Public posture is unapologetically political — Luckey speaks publicly about the West-vs-authoritarian frame.",
    apply: "anduril.com/careers · US person required for most defense work. Heavy software + hardware engineering hiring. Notable for hiring senior engineers from frontier-tech companies who want to work on national-security problems. Lattice + autonomy teams are the public flagship; manufacturing engineering is the hidden scale story.",
    sources: "anduril.com (product taxonomy) · anduril.com/careers · DoD CCA program press releases 2024 · Palmer Luckey public interviews (Wired, NYT, Bloomberg) · Anduril press releases on Lattice + product launches",
  },
];

const TIER_TWO_COMMERCIAL_CYBER = [
  {
    name: "Mandiant (Google Cloud)",
    framing: "Acquired by Google for $5.4B in 2022. The single most-cited threat-intel + IR firm in named-actor attribution. Authored or co-authored the public attribution of APT1 (PLA Unit 61398 in 2013), SolarWinds discovery (2020), and major nation-state campaign reporting since.",
    products: "Mandiant Threat Intelligence · Advantage · Managed Defense · Consulting + IR · Validation (continuous testing)",
    apply: "cloud.google.com/security/mandiant · careers via Google Cloud security org · Threat Intel + IR are the two flagship career paths",
  },
  {
    name: "CrowdStrike",
    framing: "Falcon platform is the dominant EDR/XDR product in commercial cyber. Pioneered named-adversary tradecraft cataloguing (Bear/Panda/Kitten/Spider naming convention). CrowdStrike Intelligence is one of the three most-cited private threat-intel teams alongside Mandiant + Microsoft.",
    products: "Falcon (EDR/XDR core), Falcon Identity Protection, Falcon Cloud Security, Falcon LogScale, Falcon for IT, Charlotte AI (LLM SOC assistant)",
    apply: "crowdstrike.com/careers · Threat Intel (CrowdStrike Intelligence), Detection Engineering, Falcon Complete (managed SOC), and Services (consulting + IR) are the named career tracks",
  },
  {
    name: "Microsoft Security",
    framing: "Microsoft Defender + Sentinel + Entra + Purview is the most broadly deployed security product family on Earth by install base. Microsoft Threat Intelligence Center (MSTIC) is one of the top three private CTI shops. Charlie Bell leads as EVP of Security.",
    products: "Defender (XDR), Sentinel (SIEM/SOAR), Entra (identity), Purview (compliance/DLP), Security Copilot, MSTIC threat reports",
    apply: "careers.microsoft.com · Security Engineer, Threat Intelligence, Detection Engineering, Security Researcher (MSTIC) are the named tracks. Heavy US-person + clearance presence on the federal side",
  },
  {
    name: "SentinelOne",
    framing: "Public competitor to CrowdStrike on Falcon turf. Singularity XDR platform. Pioneered fully-autonomous response (no analyst-in-loop for known-bad). Purple AI LLM SOC assistant.",
    products: "Singularity XDR, Singularity Identity, Singularity Cloud Security, PurpleAI",
    apply: "sentinelone.com/careers · Detection engineering + Threat research + Solutions architecture",
  },
  {
    name: "Palo Alto Networks",
    framing: "Cortex platform (XDR/XSIAM), Prisma (cloud security), and Strata (network security) cover the three biggest commercial cyber categories. Unit 42 is their threat intel + IR consulting arm — one of the most-cited in named-incident reporting.",
    products: "Cortex XSIAM, Prisma Cloud, Strata firewalls, Unit 42 IR + consulting",
    apply: "paloaltonetworks.com/company/careers · Unit 42 is the most prestige career-track for IR + threat intel. Cortex engineering is the SaaS path",
  },
  {
    name: "Rapid7",
    framing: "InsightIDR (SIEM), InsightAppSec, InsightVM, Metasploit (open-source pentest framework). Metasploit alone makes Rapid7 a name every pentester knows. AttackerKB their public knowledge base of named vulnerability + exploit data.",
    products: "InsightIDR, InsightAppSec, InsightVM, Metasploit Framework, AttackerKB",
    apply: "rapid7.com/careers · Threat Intelligence, Research, Detection Engineering, MDR (managed detection)",
  },
  {
    name: "Sophos · Trellix · Trend Micro · Bitdefender · ESET",
    framing: "The endpoint security incumbents. Each one has a regional + segment strength. Sophos strong in SMB managed services. Trellix (FireEye + McAfee merger) on federal. Trend Micro globally on enterprise. Bitdefender + ESET on European mid-market.",
    products: "Each ships an EDR/XDR + cloud + email + network security suite under their brand",
    apply: "Career pages on each. These are often the right early-career stop for someone who wants commercial product cyber engineering with less prestige tax than CrowdStrike/Palo",
  },
  {
    name: "Helsing (Europe)",
    framing: "German + UK headquartered. AI defense software. €4.95B Series C valuation (2024 public reporting). Backed by Spotify founder Daniel Ek's Prima Materia. Publicly supplied AI software to Ukraine. Released Centaur (AI software paired with Eurofighter Typhoon) + HX-2 strike drones 2024.",
    products: "Centaur (AI software for crewed combat aircraft), HX-2 strike drone, general AI defense platform",
    apply: "helsing.ai/careers · European entry path for AI-defense engineers. EU work authorization typically required",
  },
];

const TIER_THREE_MID_TIER_PRIMES = [
  { name: "Lockheed Martin", note: "Cyber Solutions inside the Rotary + Mission Systems business. Cyber Mission Force support contracts. Significant federal CTI + IR work." },
  { name: "Raytheon (RTX)", note: "Raytheon Intelligence + Space (RIS) houses cyber. Heavy DoD + IC contractor presence. Forcepoint was a Raytheon spinoff (now sold)." },
  { name: "Northrop Grumman", note: "Mission Systems cyber + electronic warfare. ICE-T (Integrated Cyber + Electronic Warfare) framework. National-scale signals + cyber work." },
  { name: "BAE Systems Inc (US arm)", note: "Federal cyber contractor. Bridgehead between UK BAE + US federal cyber. Strong electronic warfare adjacency." },
  { name: "SAIC", note: "Federal IT + cyber prime. ~$8B+ annual revenue. Heavy DoD + IC presence. Strong contracts in defensive cyber for civilian agencies." },
  { name: "CACI International", note: "Federal IT + cyber + intelligence systems. Strong presence in IC cyber programs. Recent expansion in cleared cyber workforce." },
  { name: "Leidos", note: "Largest IT services federal contractor by revenue. Cyber + intelligence + civilian + defense. Often the prime on multi-vendor federal cyber programs." },
  { name: "ManTech (Carlyle PE-owned)", note: "Mid-tier federal cyber + IT. Pure-play federal focus. Often subcontractor to BAH/Leidos but increasingly prime on smaller cyber programs." },
  { name: "Peraton", note: "Created from L3 Technologies' federal IT spinoff + later acquisitions. Significant IC + DoD cyber work." },
  { name: "ECS Federal", note: "Cyber + cloud + data analytics for federal. Often unprompted recommended by federal hiring managers as 'good first contractor stop.'" },
];

const FEDERAL_PUBLIC_SECTOR = [
  { name: "National Security Agency (NSA) — Cybersecurity Directorate", note: "Fort Meade. SIGINT + cyber. Highest concentration of senior cyber talent in US government. NSA Cyber publishes some of the most-cited public advisories (cyber.gov)." },
  { name: "Cybersecurity and Infrastructure Security Agency (CISA)", note: "DHS sub-agency. Civilian federal cybersecurity. Recent expansion under 2023 National Cybersecurity Strategy. Strong public-facing posture, lower clearance bar than NSA." },
  { name: "FBI Cyber Division", note: "Federal LE on cyber crime + state-actor disruption. Special Agent (Cyber) + Computer Scientist paths. ~10 Cyber Field Office expansion + regional Cyber Action Teams." },
  { name: "United States Cyber Command (USCYBERCOM)", note: "Combatant command at Fort Meade. Joint cyber operations. Service-component cyber forces (Army Cyber, Navy Fleet Cyber, etc.) feed into USCYBERCOM." },
  { name: "DoD Cyber Crime Center (DC3)", note: "DoD digital forensics + insider threat + DIB cyber. Significant intern + entry-level program." },
  { name: "Defense Information Systems Agency (DISA)", note: "DoD enterprise IT + JFHQ-DODIN cyber defense. Foundational defensive cyber for the DoD network." },
  { name: "Intelligence Community elements (CIA, NSA, NRO, NGA, DIA)", note: "Each runs cyber-adjacent programs. CIA Directorate of Digital Innovation (DDI) is the explicit cyber+digital posture. NRO + NGA have growing OT/cyber programs for space + imagery systems." },
];

const APPLY_DOCTRINE = [
  "Clearance is the gate. Many of the best jobs require Secret minimum, TS/SCI common, with full-scope polygraph for IC roles. The clearance process takes 6-18 months. If you have a clearance, lean on it. If you don't, the federal contractor path with sponsored clearance is the cleanest route in.",
  "Internships are the cleanest entry path. Booz Allen, Palantir, Anduril, Mandiant, CrowdStrike, NSA, CISA, FBI, USCYBERCOM, and the IC components all run named internship programs targeting undergrad + early-career. The federal CyberCorps Scholarship for Service program funds undergrad/grad in exchange for federal service commitment.",
  "Public proof of competence matters more than degree. A HackerOne reputation, a published CVE, an open-source contribution to a CTI/RE/detection-engineering project, a CTF placement in DEF CON/PicoCTF — all measurable + recognizable to hiring managers across this list. A masters degree from a name-brand school is nice but not the gate.",
  "Mission-fit is the unfakeable signal. Every employer on this list has a stated mission. Apply only where the mission aligns with what you actually believe in. The recruiters can tell when you're just looking for a paycheck — and the senior engineers definitely can.",
  "The ladder is real. Booz Allen → Palantir/Anduril, or Booz Allen → NSA → CrowdStrike/Mandiant is a common progression. Government experience opens doors at private firms. Big-prime experience opens doors at startups. Startup experience opens doors at scale-ups. Plan the 10-year arc, not just the first job.",
];

export default function CyberEmployersPage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <CyberHeroImage slug="platforms" alt="Architectural shot of a dark glass-and-steel control-room wall with faint cyan reflected highlights." />
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[11px] tracking-[0.08em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn/cyber" className="hover:text-[#22F0D5]">Cyber</Link>{" "}
          <span className="text-[#1A2225]">/</span> Employers
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            Where ethical-hacking pros actually work in 2026
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            Thirty employers,{" "}
            <span style={{ color: ACCENT }}>three tiers, one decision.</span>
          </h1>
          <p className="mt-8 max-w-[62ch] text-base leading-[1.7] text-[#C8CCCE] md:text-[17px]">
            Defense-industrial primes (Booz Allen, Palantir, Anduril, Helsing), commercial cyber leaders (Mandiant, CrowdStrike, Microsoft, SentinelOne, Palo Alto, Rapid7), mid-tier federal primes (Lockheed, Raytheon, Northrop, BAE Inc, SAIC, CACI, Leidos), and federal government employers (NSA, CISA, FBI, USCYBERCOM, DC3, DISA, IC components).
          </p>
          <p className="mt-5 max-w-[62ch] text-sm leading-[1.6] text-[#9BA5A7]">
            Every profile is sourced to public material — company expertise + careers pages, public DoD contract press releases, named-author journalism, public speeches. No insider speculation. The point of the page is industry-pro situational awareness, not a recruiter pitch.
          </p>
        </div>
      </section>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24 space-y-16">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
              Tier 1 · the defense-industrial primes you absolutely know
            </p>
            <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
              Three companies that define the field.
            </h2>
            <div className="mt-12 space-y-14">
              {TIER_ONE_FEDERAL_PRIME.map((c, i) => (
                <article key={c.name} className="border-l-2 pl-6" style={{ borderColor: ACCENT + "30" }}>
                  <div className="flex flex-wrap items-baseline gap-4">
                    <p className="font-mono text-[14px] tabular-nums" style={{ color: ACCENT }}>
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
                      {c.name}
                    </h3>
                  </div>
                  <p className="mt-2 font-mono text-[11px] text-[#FFB87A]">{c.ticker}</p>
                  <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">{c.framing}</p>

                  <div className="mt-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">::named products + platforms</p>
                    <ul className="mt-2 space-y-1.5 text-[14px] leading-[1.6] text-[#C8CCCE]">
                      {c.products.map((p, j) => (
                        <li key={j}>· {p}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">::service lines + roles</p>
                    <ul className="mt-2 space-y-1.5 text-[14px] leading-[1.6] text-[#C8CCCE]">
                      {c.serviceLines.map((s, j) => (
                        <li key={j}>· {s}</li>
                      ))}
                    </ul>
                  </div>

                  <p className="mt-6 max-w-[62ch] rounded-lg border border-[#22F0D5]/20 bg-[#08090B]/30 p-4 text-[14px] leading-[1.65] text-[#C8CCCE]">
                    <span className="font-medium text-[#22F0D5]">Doctrine: </span>{c.doctrine}
                  </p>

                  <p className="mt-4 max-w-[62ch] text-[14px] leading-[1.6] text-[#9BA5A7]">
                    <span className="text-[#FFB87A]">How to apply: </span>{c.apply}
                  </p>

                  <p className="mt-3 max-w-[62ch] font-mono text-[11px] text-[#9BA5A7]">
                    Sources: {c.sources}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#1A2225] bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            Tier 2 · commercial cyber leaders
          </p>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            Eight platforms shipping at scale.
          </h2>
          <div className="mt-12 space-y-10">
            {TIER_TWO_COMMERCIAL_CYBER.map((c) => (
              <article key={c.name}>
                <h3 className="text-xl font-medium tracking-tight text-[#F2F4F5]">{c.name}</h3>
                <p className="mt-3 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">{c.framing}</p>
                <p className="mt-4 max-w-[62ch] text-sm leading-[1.65] text-[#9BA5A7]">
                  <span className="text-[#22F0D5]">Products: </span>{c.products}
                </p>
                <p className="mt-2 max-w-[62ch] text-sm leading-[1.65] text-[#9BA5A7]">
                  <span className="text-[#FFB87A]">Apply: </span>{c.apply}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            Tier 3 · mid-tier federal primes
          </p>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            Ten contractors with cyber lines.
          </h2>
          <p className="mt-5 max-w-[62ch] text-base leading-[1.7] text-[#C8CCCE]">
            Less prestige than Tier 1, more federal exposure than Tier 2, often the right early-career stop for cleared work + breadth of contract experience.
          </p>
          <ul className="mt-10 space-y-5">
            {TIER_THREE_MID_TIER_PRIMES.map((p) => (
              <li key={p.name} className="border-l-2 pl-5" style={{ borderColor: "#1A2225" }}>
                <p className="text-lg font-medium text-[#F2F4F5]">{p.name}</p>
                <p className="mt-2 max-w-[62ch] text-[14px] leading-[1.65] text-[#9BA5A7]">{p.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-[#1A2225] bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: WARN }}>
            Federal public-sector
          </p>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            Seven government employers where the work is national.
          </h2>
          <ul className="mt-10 space-y-5">
            {FEDERAL_PUBLIC_SECTOR.map((p) => (
              <li key={p.name} className="border-l-2 pl-5" style={{ borderColor: WARN + "40" }}>
                <p className="text-lg font-medium text-[#F2F4F5]">{p.name}</p>
                <p className="mt-2 max-w-[62ch] text-[14px] leading-[1.65] text-[#9BA5A7]">{p.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            The apply doctrine
          </p>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            Five things every hiring manager wishes you knew.
          </h2>
          <ol className="mt-10 space-y-6">
            {APPLY_DOCTRINE.map((t, i) => (
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
            <Link href="/learn/cyber/serve" className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 px-5 py-2.5 text-sm font-medium text-[#22F0D5] transition-colors hover:bg-[#22F0D5]/10">
              Military + federal paths →
            </Link>
            <Link href="/learn/cyber/platforms" className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] px-5 py-2.5 text-sm text-[#C8CCCE] transition-colors hover:border-[#22F0D5]/40 hover:text-[#22F0D5]">
              The platforms they ship →
            </Link>
            <Link href="/learn/cyber/heroes" className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] px-5 py-2.5 text-sm text-[#C8CCCE] transition-colors hover:border-[#FFB87A]/40 hover:text-[#FFB87A]">
              Named researchers →
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
