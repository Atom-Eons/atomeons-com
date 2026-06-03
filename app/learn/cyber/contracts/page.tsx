import type { Metadata } from "next";
import Link from "next/link";
import { CyberHeroImage } from "../_components/CyberHeroImage";

export const metadata: Metadata = {
  title: "Federal cyber contracting · GSA + CIO-SP4 + OASIS+ + SEWP · /learn/cyber/contracts · AtomEons",
  description:
    "GSA Schedule + CIO-SP4 + OASIS+ + SEWP + Alliant 2 + Chess + the vehicles federal cyber contracts actually flow through. What each is, who holds prime contracts on it, how to apply, what cyber pros need to know to navigate it.",
  alternates: { canonical: "https://atomeons.com/learn/cyber/contracts" },
  robots: { index: true, follow: true },
};

const ACCENT = "#22F0D5";

const VEHICLES = [
  {
    name: "GSA Multiple Award Schedule (MAS)",
    aka: "GSA Schedule, Schedule 70 (legacy name)",
    framing: "The granddaddy. Federal agencies use the GSA Schedule to buy IT services and cyber expertise from pre-qualified contractors without running a full procurement. ~$50B+ annual federal spend. Booz Allen, Lockheed, Northrop, Raytheon, SAIC, Leidos all have schedule contracts. Schedule 70 was the IT-specific schedule, now folded into the consolidated MAS.",
    where: "gsa.gov/buy-through-us/contracting-vehicles",
  },
  {
    name: "CIO-SP4",
    aka: "Chief Information Officer — Solutions and Partners 4 · NIH NITAAC",
    framing: "$50B+ ceiling. The follow-on to CIO-SP3 — the dominant IT services contracting vehicle for federal IT and cyber. Run by NIH's NITAAC (National Institutes of Health IT Acquisition + Assessment Center). Multi-award. Prime holders are roughly the same names as the GSA Schedule. CIO-SP4 awards completed 2024.",
    where: "nitaac.nih.gov · cio-sp4 contract holders list",
  },
  {
    name: "OASIS+",
    aka: "One Acquisition Solution for Integrated Services Plus",
    framing: "$60B+ ceiling. GSA's successor to OASIS. Covers professional services including cyber engineering, intel analysis, program management. Eight pools by service area. OASIS+ awards staged through 2024-2025. The default vehicle for federal cyber services work that doesn't fit cleanly into IT.",
    where: "gsa.gov/oasisplus",
  },
  {
    name: "SEWP VI",
    aka: "Solutions for Enterprise-Wide Procurement · NASA",
    framing: "$20B+ ceiling. NASA-managed but used government-wide. Focused on IT products + product-adjacent services. Strong for hardware + software procurement including cyber tools. SEWP V ran 2015-2025, SEWP VI awards 2024+.",
    where: "sewp.nasa.gov",
  },
  {
    name: "Alliant 2",
    aka: "Alliant 2 GWAC · GSA",
    framing: "$50B+ ceiling. GSA Government-Wide Acquisition Contract for IT solutions. Used heavily for cybersecurity professional services + IT modernization. Prime holders include most named federal IT contractors. Alliant 3 in pre-award as of mid-2026.",
    where: "gsa.gov/alliant2",
  },
  {
    name: "CHESS / DoD ITES",
    aka: "Army CHESS · DoD IT Enterprise Solutions",
    framing: "Army's CHESS program (Computer Hardware, Enterprise Software and Solutions) is the canonical Army IT vehicle. DoD has parallel ITES-3H, ITES-3S contracts. Used for cyber product purchases + IT services across the Army enterprise. Strong vehicle for cyber product vendors to sell into Army.",
    where: "chess.army.mil · gsa.gov/dod-ites",
  },
  {
    name: "MAC contracts (agency-specific)",
    aka: "Multiple Award Contracts · per-agency",
    framing: "Most federal agencies maintain their own MAC vehicles for cyber + IT services. DHS EAGLE II, DoD ENCORE III, Treasury TIPSS-4, VA T4NG, etc. These are agency-specific but often serve as the operational vehicle for cyber service delivery once a contractor wins a task order.",
    where: "Per-agency contracting websites · sam.gov contract searches",
  },
  {
    name: "OTAs · Other Transaction Authorities",
    aka: "Other Transaction Agreements",
    framing: "Non-FAR contracting authority that DoD has expanded heavily since 2016. Allows DoD to bypass standard Federal Acquisition Regulation processes for prototyping + production with non-traditional contractors. Anduril, Palantir, SpaceX all entered DoD primarily via OTAs. Substantial cyber OTA use through AFWERX, DIU, Army Futures Command, NavalX.",
    where: "diu.mil · afwerx.com · sam.gov OTA listings",
  },
  {
    name: "SBIR · STTR",
    aka: "Small Business Innovation Research · Small Business Technology Transfer",
    framing: "$3B+ annual federal R&D contracts going to small businesses. DoD SBIR runs three phases (feasibility study → R&D → commercialization). Cyber + AI are top SBIR topic areas every year. Many defense-tech startups (Anduril, Shield AI, Saronic) used SBIR as early-stage federal funding before scaling to OTA + program-of-record work.",
    where: "sbir.gov · doddtic.dtic.mil/contract-vehicles",
  },
];

const HOW_TO_NAVIGATE = [
  "Read sam.gov early and often. Every federal contract over $25K is required to be posted on sam.gov. Search by NAICS code (541512 IT services, 541513 facilities management, 541519 other IT, 541330 engineering services). The opportunity feed is the source-of-truth on what's actually being bought.",
  "Set NAICS code alerts. SAM.gov alerts on your NAICS codes mean you see new opportunities before they're widely known. Industry pros run alerts on 3-5 NAICS codes that match their service offerings.",
  "Pre-qualify before you bid. Federal agencies will only buy from contractors on the right vehicle. If you want to sell to DoD, you need to be on Alliant 2 or CIO-SP4 or OASIS+ or have an OTA agreement in place. Pre-qualification is months of paperwork — start it before you have the customer.",
  "Cyber + intel work concentrates in specific NAICS. The IT/cyber NAICS codes (541512, 541513, 541519) capture most of it, but cyber-adjacent professional services often code 541330 (engineering) or 541611 (administrative management consulting). Senior practitioners track all five.",
  "Know your prime / sub posture. Most small companies enter federal cyber as subs to large primes. Booz Allen, Leidos, SAIC all have substantial subcontractor programs. Subcontracting in for 2-3 years on a real contract builds the past-performance record you need to bid prime later.",
];

export default function CyberContractsPage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <CyberHeroImage slug="legal" alt="Symmetrical photograph of a dark brutalist courthouse facade at dusk, faint cyan reflection in tall narrow windows." />
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[11px] tracking-[0.08em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn/cyber" className="hover:text-[#22F0D5]">Cyber</Link>{" "}
          <span className="text-[#1A2225]">/</span> Contracts
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            Federal cyber contracting · the vehicles
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            Where federal cyber money{" "}
            <span style={{ color: ACCENT }}>actually flows.</span>
          </h1>
          <p className="mt-8 max-w-[62ch] text-base leading-[1.7] text-[#C8CCCE] md:text-[17px]">
            Federal cyber + IT contracts don&apos;t flow through one vehicle — they flow through nine major ones. Every cyber professional working federal (or wanting to) needs to know what GSA Schedule, CIO-SP4, OASIS+, SEWP VI, Alliant 2, CHESS, OTAs, and SBIR actually are. This page is the recognition layer + how-to-navigate framework.
          </p>
        </div>
      </section>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            Nine vehicles
          </p>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            $200B+ ceiling across the named ones.
          </h2>
          <div className="mt-12 space-y-12">
            {VEHICLES.map((v, i) => (
              <article key={v.name} className="border-l-2 pl-6" style={{ borderColor: ACCENT + "30" }}>
                <div className="flex flex-wrap items-baseline gap-4">
                  <p className="font-mono text-[14px] tabular-nums" style={{ color: ACCENT }}>
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-xl font-medium tracking-tight text-[#F2F4F5] md:text-2xl">
                    {v.name}
                  </h3>
                </div>
                <p className="mt-2 text-sm text-[#FFB87A]">aka {v.aka}</p>
                <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">{v.framing}</p>
                <p className="mt-4 max-w-[62ch] font-mono text-[11px] text-[#9BA5A7]">
                  Where: {v.where}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1A2225] bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            How to navigate
          </p>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            Five operating rules.
          </h2>
          <ol className="mt-10 space-y-6">
            {HOW_TO_NAVIGATE.map((t, i) => (
              <li key={i} className="grid grid-cols-[2.5rem_1fr] gap-4">
                <span className="font-mono text-2xl font-bold tabular-nums" style={{ color: ACCENT }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="max-w-[62ch] text-base leading-[1.7] text-[#C8CCCE]">{t}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/learn/cyber/programs" className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 px-5 py-2.5 text-sm font-medium text-[#22F0D5] transition-colors hover:bg-[#22F0D5]/10">
              Federal cyber programs →
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
