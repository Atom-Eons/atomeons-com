import type { Metadata } from "next";
import Link from "next/link";
import { CyberHeroImage } from "../_components/CyberHeroImage";

export const metadata: Metadata = {
  title: "Federal cyber programs · Cyber Mission Force, Replicator, JADC2, CMMC, CDM · /learn/cyber/programs · AtomEons",
  description:
    "The named federal cyber programs every industry pro recognizes. Cyber Mission Force structure, Replicator initiative, JADC2 + Mission Partner Environment, CMMC, CDM, Project Maven Smart System. Public sources + structural framing.",
  alternates: { canonical: "https://atomeons.com/learn/cyber/programs" },
  robots: { index: true, follow: true },
};

const ACCENT = "#22F0D5";
const WARN = "#FFB87A";

const PROGRAMS = [
  {
    name: "Cyber Mission Force (CMF)",
    framing: "USCYBERCOM's operational arm. ~133 teams across offensive (Combat Mission Teams), defensive (Cyber Protection Teams), and support (Cyber Support Teams, National Mission Teams) missions. Built incrementally since 2013, declared at initial operating capability in 2018. Public expansion to ~158 teams announced 2023 under President Biden's NSM-13 cyber operations policy.",
    keyFacts: [
      "Operating under USCYBERCOM headquarters at Fort Meade",
      "Service-component cyber forces (Army Cyber, Navy Fleet Cyber, AF 16th Air Force, Marine Forces Cyberspace Command) source personnel",
      "Distinguished offensive Title 50 (intelligence) vs Title 10 (military operations) authority",
      "Public expansion to 158 teams announced 2023 — net +25 teams over Phase 1",
    ],
    where: "cybercom.mil · DoD press releases · GAO reports on CMF (multiple, 2019-2024)",
  },
  {
    name: "Replicator Initiative",
    framing: "Announced August 2023 by Deputy SecDef Kathleen Hicks. Goal: field thousands of attritable autonomous systems across air/land/sea/space within 18-24 months. Designed to counter Chinese mass-production advantages in low-end systems. Replicator-1 named programs include Switchblade 600, Saronic Spyglass, Anduril ALTIUS + Bolt, AeroVironment products. Replicator-2 (2024) expanded to counter-drone capabilities.",
    keyFacts: [
      "$1B+ in announced FY24-25 funding",
      "Hicks-driven structural reform within DoD acquisitions",
      "Focuses on 'all-domain attritable autonomous' systems",
      "Replicator-2 added counter-drone systems including Anduril Roadrunner + Pulsar",
    ],
    where: "defense.gov press releases · DoD CDAO + Defense Innovation Unit announcements",
  },
  {
    name: "JADC2 · Joint All-Domain Command and Control",
    framing: "DoD's effort to network sensors and shooters across all warfighting domains (land, sea, air, space, cyber). Each service has its own JADC2 implementation: Army's Project Convergence, Air Force's Advanced Battle Management System (ABMS), Navy's Project Overmatch. JADC2's data-sharing layer is the connective tissue where cyber + AI + warfighting integration happens.",
    keyFacts: [
      "Mission Partner Environment (MPE) layer enables data-sharing with allies",
      "Heavy software-defined-networking focus — much of the budget is software contracts",
      "Project Convergence (Army) annual exercises demonstrate cross-service integration",
      "JADC2 implementation has cyber + AI + data-engineering job concentration",
    ],
    where: "defense.gov JADC2 implementation plan · service-component pages",
  },
  {
    name: "Maven Smart System",
    framing: "DoD program of record for computer vision + AI applied to full-motion video and intelligence data. Originally Project Maven (2017) — sparked Google employee protests that led to Google's defense-work withdrawal. Has continued and grown under different prime contractors. Palantir won the Maven Smart System prime contractor role in 2024 (~$153M initial, expanded substantially through 2024-2025). The operational backbone for AI-assisted target identification.",
    keyFacts: [
      "Originally launched April 2017 as Algorithmic Warfare Cross-Functional Team",
      "Palantir prime contractor since May 2024",
      "Operational at USCENTCOM, USAFRICOM, USINDOPACOM, USEUCOM commands",
      "Public reporting on Maven Smart System use in Ukraine support",
    ],
    where: "DoD press releases · NYT + WaPo Maven reporting 2018-2024 · Palantir investor materials",
  },
  {
    name: "CMMC · Cybersecurity Maturity Model Certification",
    framing: "DoD cybersecurity certification requirement for ~300,000 defense industrial base companies. Three levels (Level 1 self-assessment, Level 2 third-party assessment for sensitive contracts, Level 3 government-led for the most sensitive). CMMC 2.0 rule finalized in 2024 — phased implementation through 2026-2028. Will be a hiring driver across the entire defense contracting ecosystem.",
    keyFacts: [
      "Built on NIST SP 800-171 + 800-172 baseline standards",
      "Phased rollout: rule effective December 2024, contract requirements phased in 2025-2028",
      "Third-party assessors (C3PAOs) certified by Cyber-AB",
      "Compliance is a substantial hiring + cyber-consulting growth driver",
    ],
    where: "dod.mil/cmmc · cyber-ab.org · NIST SP 800-171 and 800-172",
  },
  {
    name: "CDM · Continuous Diagnostics and Mitigation",
    framing: "CISA-managed program providing cybersecurity capabilities and tools to federal civilian agencies. Three phases: asset management, identity + access management, network security management. Operational since 2013 with continuous expansion. The federal civilian cyber baseline — most non-DoD agencies use CDM dashboards + tools as their primary cybersecurity infrastructure.",
    keyFacts: [
      "Managed by CISA (transferred from GSA)",
      "Funded ~$2B+ across multi-year contracts",
      "CDM Dashboard provides cross-agency visibility for CISA",
      "Booz Allen, Northrop, ManTech, ECS major prime contractors at various phases",
    ],
    where: "cisa.gov/cdm · CISA + Booz Allen + Northrop press releases on CDM contracts",
  },
  {
    name: "Cyber Mission Partner Environment (Mission Partner Environment)",
    framing: "DoD information-sharing network with allies and coalition partners. Combines NATO, Five Eyes, and bilateral information environments. Substantial cyber + data-engineering work to build secure cross-domain solutions enabling US + ally collaboration without compromising classified information. Mission Partner Environment is where ally-coalition cyber work concentrates.",
    keyFacts: [
      "Successor framework to legacy classified network infrastructure",
      "Heavy cross-domain solutions (CDS) engineering work",
      "Implementation across all DoD combatant commands",
      "Substantial cleared contractor staffing requirement",
    ],
    where: "defense.gov + DISA press releases · NATO public technology materials",
  },
];

export default function CyberProgramsPage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <CyberHeroImage slug="serve" alt="Silhouette of a dark concrete federal-style building at blue hour, single small bio-cyan-tinted window light." />
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[11px] tracking-[0.08em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn/cyber" className="hover:text-[#22F0D5]">Cyber</Link>{" "}
          <span className="text-[#1A2225]">/</span> Programs
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            Federal cyber programs · the named ones
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            Seven programs every industry pro{" "}
            <span style={{ color: ACCENT }}>knows on sight.</span>
          </h1>
          <p className="mt-8 max-w-[62ch] text-base leading-[1.7] text-[#C8CCCE] md:text-[17px]">
            Cyber Mission Force, Replicator, JADC2, Maven Smart System, CMMC, CDM, Mission Partner Environment. The seven federal programs that appear in every cyber + defense conference talk, every job description for cleared work, every conversation about where the field is going. Public sources + structural framing.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24 space-y-14">
          {PROGRAMS.map((p, i) => (
            <article key={p.name} className="border-l-2 pl-6" style={{ borderColor: ACCENT + "30" }}>
              <div className="flex flex-wrap items-baseline gap-4">
                <p className="font-mono text-[14px] tabular-nums" style={{ color: ACCENT }}>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
                  {p.name}
                </h2>
              </div>
              <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">{p.framing}</p>
              <div className="mt-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>::key facts</p>
                <ul className="mt-2 space-y-1.5 text-[14px] leading-[1.65] text-[#C8CCCE]">
                  {p.keyFacts.map((f, j) => (
                    <li key={j}>· {f}</li>
                  ))}
                </ul>
              </div>
              <p className="mt-5 max-w-[62ch] font-mono text-[11px] text-[#9BA5A7]">
                Where to read: {p.where}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-[#1A2225] bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 text-center">
          <h2 className="text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
            Seven names. Two days of reading.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-[1.65] text-[#C8CCCE]">
            Each program above has a press-release archive, a GAO oversight report, and a contract trail on sam.gov. Two days reading primary sources gets you industry-pro fluency on the federal cyber program landscape. Plus the institutional documents in <Link href="/learn/cyber/doctrine" className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-2 hover:decoration-[#22F0D5]">/learn/cyber/doctrine</Link> for the policy context.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href="/learn/cyber/contracts" className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 px-5 py-2.5 text-sm font-medium text-[#22F0D5] transition-colors hover:bg-[#22F0D5]/10">
              ← Contracting vehicles
            </Link>
            <Link href="/learn/cyber/employers" className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] px-5 py-2.5 text-sm text-[#C8CCCE] transition-colors hover:border-[#22F0D5]/40 hover:text-[#22F0D5]">
              Where to apply →
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
