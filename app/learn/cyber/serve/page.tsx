import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Serving · military + federal cyber paths · /learn/cyber · AtomEons",
  description:
    "US Cyber Command structure (public). Air Force 17X, Army Cyber 17C/17A, Navy CTN, Marines 17XX, Coast Guard Cyber, Space Force 5C0. CISA, NSA, FBI Cyber, CIA Directorate of Digital Innovation hiring. Federal clearance path. Public info only. CC-BY 4.0.",
  alternates: { canonical: "https://atomeons.com/learn/cyber/serve" },
};

const MILITARY = [
  {
    branch: "US Air Force",
    code: "17S / 17X officer · 1B4 enlisted Cyber Warfare Operations · 1D7 Cyber Defense Operations",
    body: "The most-developed cyber branch by official structure. 17S is the cyber operations officer career field. Air Force Reserve and Guard also accept cyber specialties, often with shorter commitments and equivalent training. Enlisted 1B4 (Cyber Warfare Operations) is the technical operator code · 1D7 is the defensive cyber career field.",
    entry: "ROTC, USAFA, Officer Training School (OTS) for officer. Enlistment for 1B4 / 1D7 — talk to a recruiter and request the cyber career field explicitly, with a written guarantee in your enlistment contract. The Tech School (training pipeline) is at Keesler AFB.",
    publicLink: "https://www.airforce.com/careers/specialty-careers/cyber",
  },
  {
    branch: "US Army",
    code: "17A Cyber Operations officer · 17C Cyber Operations Specialist (enlisted) · 17B / 17E variants",
    body: "Army Cyber Command (ARCYBER) is headquartered at Fort Eisenhower (formerly Fort Gordon), Georgia. Active branch since 2014. Pipeline includes joint training with the other services at the Joint Cyber Center of Excellence.",
    entry: "ROTC, West Point, OCS for officer. For enlisted 17C, the Army accepts direct enlistment with an MOS guarantee · the qualifying ASVAB scores and GT requirement is high. Cyber Direct Commissioning Program (CDCP) brings industry-experienced civilians in as captains.",
    publicLink: "https://www.goarmy.com/careers-and-jobs/specialty-careers/army-cyber.html",
  },
  {
    branch: "US Navy",
    code: "CTN Cryptologic Technician Networks (enlisted) · 1810 Information Warfare Officer · 1820 Information Professional",
    body: "Naval Information Warfare. CTN is the technical operator rating (cyber-focused signals work). 1810 is the cyber/IW officer designator. Fleet Cyber Command / Tenth Fleet handles operational cyber. Substantial cryptography + signals intelligence training in the pipeline.",
    entry: "Enlistment for CTN with rating guarantee. ROTC, USNA, OCS for officer. Naval Cryptologic Technician school at Pensacola.",
    publicLink: "https://www.navy.com/careers-benefits/careers/information-technology-cryptology",
  },
  {
    branch: "US Marine Corps",
    code: "1721 / 17XX Cyberspace Warfare Operations · 1711 Cyberspace Officer",
    body: "Smallest of the cyber branches by headcount but joint-deployable with the other services. Marine Forces Cyberspace Command (MARFORCYBER) supports US Cyber Command directly.",
    entry: "Enlistment with cyber MOS guarantee · officer commissioning through the standard pipelines. Marines typically expect the recruit to qualify in a primary combat-arms MOS first; cyber is a follow-on.",
    publicLink: "https://www.marines.com/about-the-marine-corps/who-are-the-marines.html",
  },
  {
    branch: "US Space Force",
    code: "5C0 Cyber Operations · 17S officer (shared with Air Force)",
    body: "Newest service, established 2019. Inherited substantial cyber organizational structure from the Air Force. Heavy focus on space-system cybersecurity · satellite ground systems, launch infrastructure, space-based comms.",
    entry: "Standard officer commissioning pipelines · the Space Force has been actively recruiting transfers from other services and direct commissioning of industry technical talent.",
    publicLink: "https://www.spaceforce.mil/Careers/",
  },
  {
    branch: "US Coast Guard",
    code: "Cyber Mission Specialist · IT Cyber rating",
    body: "Coast Guard Cyber Command (CGCYBER), headquartered in Washington DC. Substantial focus on Marine Transportation System cybersecurity (ports, ships, maritime infrastructure).",
    entry: "Coast Guard enlistment + rating selection. Smaller service so the path is more individualized · recruiters can speak to specific cyber-coded billets.",
    publicLink: "https://www.gocoastguard.com/careers/enlisted-opportunities/cyber-mission-specialist",
  },
];

const FEDERAL = [
  {
    agency: "Cybersecurity and Infrastructure Security Agency (CISA)",
    body: "DHS sub-agency, the lead civilian cybersecurity agency. Defends federal civilian networks, supports critical-infrastructure cyber defense, runs the .gov vulnerability disclosure platform. Hires across the federal pay scale (GS-9 entry through SES leadership). Generally lower clearance bar than NSA · many roles need Secret, fewer require TS/SCI.",
    hiring: "USAJOBS.gov · search 'CISA' · 'Cybersecurity Specialist' GS-12 to GS-15 is the IC sweet spot. CyberCorps Scholarship for Service program funds undergrad/grad in exchange for federal service commitment.",
    url: "https://www.cisa.gov/careers",
  },
  {
    agency: "National Security Agency (NSA)",
    body: "Signals intelligence + cyber. Mission largely classified. Hires cyber operators, vulnerability researchers, cryptographers, reverse engineers, ML researchers. Fort Meade, Maryland (HQ). All roles require TS/SCI clearance + polygraph; processing takes 9-18 months. NSA actively recruits from CTF placement, top university programs, and military transitions.",
    hiring: "intelligencecareers.gov/NSA · the Development Programs (3-year rotational programs for new grads) are the canonical entry. NSA also runs the Codebreaker Challenge (free public reverse-engineering puzzle competition) which functions as a recruiting funnel.",
    url: "https://www.intelligencecareers.gov/nsa",
  },
  {
    agency: "Federal Bureau of Investigation · Cyber Division",
    body: "Investigates cybercrime + nation-state cyber threats targeting US interests. Special Agents with a Cyber specialty (a primary path) plus Intelligence Analysts and Computer Scientists (technical non-agent path). Field offices in every major city, headquartered at FBI HQ in DC.",
    hiring: "fbijobs.gov · Special Agent path requires the Cyber Action Team or Cyber Squad assignment after Quantico. The non-agent Computer Scientist GS-13/14 path is more direct technical entry. TS clearance required.",
    url: "https://fbijobs.gov",
  },
  {
    agency: "Central Intelligence Agency · Directorate of Digital Innovation",
    body: "CIA's technology directorate. Cyber operations, open-source intelligence (OSINT), data science. Highly competitive entry. Substantial overseas postings possible. TS/SCI + polygraph standard.",
    hiring: "cia.gov/careers · the technology positions are listed under the Directorate of Digital Innovation. Roles include Cyber Operations Officer, Cyber Threat Analyst, Computer Scientist.",
    url: "https://www.cia.gov/careers",
  },
  {
    agency: "US Cyber Command (USCYBERCOM)",
    body: "Unified combatant command at Fort Meade, co-located with NSA. Operates the Cyber Mission Force (~133 teams across offensive, defensive, and combat-support missions). Joint command across all service branches. Civilian and military positions both.",
    hiring: "Mostly fills from active-duty assignments across the services. Civilian positions on USAJOBS. The 'Cyber Direct Commissioning' programs across services feed directly here.",
    url: "https://www.cybercom.mil",
  },
  {
    agency: "Department of Defense Cyber Crime Center (DC3)",
    body: "Lakehurst NJ. Digital forensics + cyber investigation + cyber training. Operates the DoD Vulnerability Disclosure Program. Hosts the annual DoD Cyber Crime Conference.",
    hiring: "USAJOBS · search DC3. Mix of military, federal civilian, and contractor roles.",
    url: "https://www.dc3.mil",
  },
  {
    agency: "Department of Energy · National Labs",
    body: "Pacific Northwest National Lab (PNNL), Sandia, Oak Ridge, Lawrence Livermore, Idaho National Lab — all run cyber research programs for energy-sector and weapons-program security. Different hiring agreements but generally less polygraph-heavy than IC agencies.",
    hiring: "Each lab posts independently. Sandia & PNNL have active cyber research divisions worth following.",
    url: "https://energy.gov/national-laboratories",
  },
  {
    agency: "Department of State · Diplomatic Security · Cyber and Technology Security",
    body: "Defends embassy networks and diplomatic communications. Substantial overseas posting opportunities. Federal civilian + Foreign Service Specialist paths.",
    hiring: "careers.state.gov · the Foreign Service Specialist roles include Information Management Specialist (IMS) and Information Management Technical Specialist (IMTS) which carry cyber responsibilities.",
    url: "https://careers.state.gov",
  },
];

export default function CyberServePage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn/cyber" className="hover:text-[#22F0D5]">Cyber</Link>{" "}
          <span className="text-[#1A2225]">/</span> Serve
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-14 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::serving · military + federal cyber paths · public info only
          </p>
          <h1 className="mt-6 text-balance text-4xl font-medium leading-[1] tracking-tight md:text-6xl">
            Fight cyber war{" "}
            <span className="text-[#22F0D5]">ethically. For your country.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-base leading-[1.75] text-[#C8CCCE] md:text-[17px]">
            The US military and federal civilian government employ tens of thousands of cyber
            operators. The career paths are real, public, well-defined, and well-compensated
            relative to the cost of entry. Many of them give 18-22 year olds technical training
            worth six figures on the open market.
          </p>
          <p className="mt-5 max-w-3xl text-base leading-[1.75] text-[#C8CCCE]">
            Every program described below is publicly posted on .mil and .gov career pages. Every
            link is to an official source. This page does not describe operational tradecraft,
            classified material, or anything beyond the publicly recruited career posture.
          </p>
        </div>
      </section>

      <section className="border-b border-[#1A2225] bg-[#0e2520]/15">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::military · 6 services · 5 with established cyber career fields
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            Military cyber career fields.
          </h2>
          <div className="mt-8 space-y-5">
            {MILITARY.map((m) => (
              <article key={m.branch} className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 md:p-7" style={{ borderLeft: "4px solid #22F0D5" }}>
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="text-2xl font-semibold tracking-tight text-[#F2F4F5]">{m.branch}</h3>
                  <a href={m.publicLink} target="_blank" rel="noopener" className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5] hover:text-white">
                    official ↗
                  </a>
                </div>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7]">{m.code}</p>
                <p className="mt-4 text-[15px] leading-[1.7] text-[#C8CCCE]">{m.body}</p>
                <p className="mt-3 text-[15px] leading-[1.7] text-[#9BA5A7]"><span className="text-[#22F0D5]">::entry →</span> {m.entry}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::federal civilian · 8 agencies with public cyber hiring
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            Federal civilian cyber agencies.
          </h2>
          <div className="mt-8 space-y-5">
            {FEDERAL.map((f) => (
              <article key={f.agency} className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 md:p-7" style={{ borderLeft: "4px solid #22F0D5" }}>
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="text-2xl font-semibold tracking-tight text-[#F2F4F5]">{f.agency}</h3>
                  <a href={f.url} target="_blank" rel="noopener" className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5] hover:text-white">
                    visit ↗
                  </a>
                </div>
                <p className="mt-4 text-[15px] leading-[1.7] text-[#C8CCCE]">{f.body}</p>
                <p className="mt-3 text-[15px] leading-[1.7] text-[#9BA5A7]"><span className="text-[#22F0D5]">::hiring →</span> {f.hiring}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1A2225] bg-[#0e2520]/15">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20">
          <h2 className="text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            What military + federal service is actually like
          </h2>
          <div className="mt-7 space-y-5 text-base leading-[1.75] text-[#C8CCCE]">
            <p>
              <strong className="text-[#F2F4F5]">Clearances take time.</strong> A
              Secret-level investigation runs 3-9 months. Top Secret + SCI + polygraph runs
              12-24 months and clears 2-4% of applicants. Hiring offices know this and try to
              fund initial onboarding during the wait, but the clearance is the gate.
            </p>
            <p>
              <strong className="text-[#F2F4F5]">Pay is below private sector during your
              early career, then catches up.</strong> A GS-12 cyber specialist makes ~$98K base
              in 2026 depending on locality. A senior NSA cyber researcher (GS-14/15) makes
              $135-$200K. SES (executive) makes $200-$250K. Private sector pays more at every
              equivalent grade · but the experience, training, mission, and post-service
              transition value are not zero. Many federal/military cyber pros move to
              high-paying private sector roles after 5-15 years of service.
            </p>
            <p>
              <strong className="text-[#F2F4F5]">The technical training is real.</strong> NSA
              School, Air Force Tech School (Keesler), Naval Cryptologic Technician school,
              Army Cyber Center of Excellence — all run multi-month rigorous technical
              curricula. The training value alone is six figures of equivalent
              private-instruction cost, and the certification credit follows you out.
            </p>
            <p>
              <strong className="text-[#F2F4F5]">The mission matters.</strong> If you want to
              defend US critical infrastructure, US elections, military networks, or US
              citizens from foreign cyber threats — these are the jobs where that work happens.
              No private-sector company has the legal authority to do what USCYBERCOM does.
              That asymmetry is the actual reason these jobs exist and the reason they&apos;re
              hard to walk away from once you start.
            </p>
            <p>
              <strong className="text-[#F2F4F5]">Service obligation is real.</strong> Military
              enlistment is typically 4-6 years active + 2-4 years reserve. Officer
              commissioning is similar. CyberCorps Scholarship for Service requires one year
              of federal service per year of scholarship. Read the contract before you sign.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/learn/cyber/cyberwar" className="rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] hover:bg-[#22F0D5]/20">
              the cyberwar context →
            </Link>
            <Link href="/learn/cyber/certs" className="rounded-full border border-[#1A2225] bg-[#0A0F11] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#C8CCCE] hover:border-[#22F0D5]/40 hover:text-[#22F0D5]">
              certifications →
            </Link>
            <Link href="/learn/cyber" className="rounded-full border border-[#1A2225] bg-[#0A0F11] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#C8CCCE] hover:border-[#22F0D5]/40 hover:text-[#22F0D5]">
              ← cyber index
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
