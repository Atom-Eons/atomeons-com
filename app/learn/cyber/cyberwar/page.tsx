import type { Metadata } from "next";
import Link from "next/link";

const INCIDENTS = [
  {
    name: "Stuxnet",
    year: "Discovered 2010",
    body: "Computer worm that targeted industrial control systems at Iran's Natanz uranium-enrichment facility. Designed to physically degrade gas centrifuges by manipulating PLC code while reporting normal operation to monitoring systems. The first publicly-documented case of a cyber weapon causing physical destruction of industrial equipment. Widely attributed in declassified reporting (Sanger NYT 2012, Kim Zetter's book Countdown to Zero Day) to US + Israeli cooperation under the Olympic Games program. Has not been officially claimed.",
  },
  {
    name: "Sony Pictures hack",
    year: "2014",
    body: "Sony Pictures Entertainment compromised by attackers who released ~100 TB of internal data, including unreleased films, executive emails, and employee personal information. Tied by US government attribution to North Korea / DPRK in response to The Interview film. Treasury Department sanctions followed. One of the first major public examples of state-actor reprisal against a US private company over content.",
  },
  {
    name: "NotPetya",
    year: "June 2017",
    body: "Destructive malware initially disguised as ransomware. Spread via compromised Ukrainian tax-accounting software (M.E.Doc). Caused estimated $10B+ in global damages across Maersk, Merck, FedEx TNT, Mondelez, Reckitt, others. Attributed by US, UK, and other governments to Russia / GRU. The largest documented cyber-attack economic impact to date in public reporting.",
  },
  {
    name: "SolarWinds Orion compromise",
    year: "Discovered Dec 2020",
    body: "Software supply-chain attack inserting malicious code into the Orion network-monitoring product. Backdoored updates pushed to ~18K SolarWinds customers including US federal agencies (Treasury, Commerce, State, DHS, Energy, parts of DoD). Attributed to Russia / SVR. Triggered the Biden administration's 2021 Executive Order 14028 on Improving the Nation's Cybersecurity.",
  },
  {
    name: "Microsoft Exchange ProxyLogon",
    year: "March 2021",
    body: "Four zero-day vulnerabilities in on-premises Microsoft Exchange Server exploited at scale by Chinese state-sponsored actors (Microsoft attribution to HAFNIUM). Estimated tens of thousands of organizations compromised before patches were available. FBI subsequently used court order to remove malicious web shells from victim systems in unprecedented active cyber operation on US private infrastructure.",
  },
  {
    name: "Colonial Pipeline",
    year: "May 2021",
    body: "Ransomware attack on the operator of the largest US fuel pipeline. Pipeline shut down for 6 days, causing fuel shortages across the southeastern US. Attributed to DarkSide ransomware group (Russia-based). Colonial paid ~$4.4M ransom; FBI later recovered ~$2.3M of the cryptocurrency. The incident pushed pipeline cybersecurity into federal Transportation Security Administration mandatory directives.",
  },
  {
    name: "Volt Typhoon",
    year: "Public disclosure May 2023",
    body: "Joint CISA / NSA / FBI / Five Eyes advisory disclosing a China-state-sponsored campaign of pre-positioning in US critical infrastructure (telecommunications, transportation, water, energy) for potential disruptive operations in a future crisis. Subsequent disclosures through 2024-2025 expanded the scope. Different from typical espionage — the publicly stated assessment is that Volt Typhoon is positioning for sabotage, not collection.",
  },
  {
    name: "Salt Typhoon",
    year: "Public disclosure 2024",
    body: "China-state-sponsored compromise of US telecommunications carriers (AT&T, Verizon, Lumen confirmed publicly) gaining access to lawful-intercept systems · the same systems used by US law enforcement for court-authorized wiretaps. Considered one of the most consequential US telecommunications intrusions in public reporting. Disclosed by FBI / CISA late 2024.",
  },
  {
    name: "Change Healthcare ransomware",
    year: "February 2024",
    body: "ALPHV/BlackCat ransomware attack on Change Healthcare, a subsidiary of UnitedHealth Group processing roughly one-third of US healthcare claims. Disrupted billing across thousands of providers. UnitedHealth confirmed payment of $22M ransom. Notification of affected individuals continued through 2024-2025 with estimates exceeding 100M people. The largest US healthcare data breach by individuals affected to date.",
  },
];

const FRAMEWORK = [
  { title: "Department of Defense", body: "United States Cyber Command (USCYBERCOM) is the unified combatant command for cyber operations. Co-located with NSA at Fort Meade. Operates the Cyber Mission Force (~133 teams across offensive, defensive, and combat-support missions). The Cyber National Mission Force is the offensive arm." },
  { title: "Cybersecurity and Infrastructure Security Agency", body: "DHS sub-agency. Lead civilian cybersecurity agency. Operates the .gov network protection, critical-infrastructure coordination, and the Joint Cyber Defense Collaborative (JCDC). Publishes the most-cited public threat advisories (cisa.gov/alerts)." },
  { title: "National Security Agency", body: "Signals intelligence + cybersecurity. Co-located with USCYBERCOM. Defends National Security Systems · advises industry through the NSA Cybersecurity Collaboration Center. Issues joint advisories with CISA, FBI, and Five Eyes partners." },
  { title: "Federal Bureau of Investigation Cyber Division", body: "Federal law enforcement lead on cyber threats targeting US interests. Investigates, attributes, indicts. Recent indictments of named state-actor units (PLA Unit 61398, GRU 26165, MSS APT actors, DPRK Lazarus Group) are the public record of attribution work." },
  { title: "Five Eyes partnership", body: "United States, United Kingdom, Canada, Australia, New Zealand intelligence-sharing partnership. Issues joint cyber advisories (most CISA advisories now have Five Eyes co-signatories). Most consequential public attribution work happens in this multilateral context." },
];

export const metadata: Metadata = {
  title: "Cyberwar · the public framework · /learn/cyber · AtomEons",
  description:
    "The publicly-documented framework of nation-state cybersecurity. Stuxnet, NotPetya, SolarWinds, Colonial Pipeline, Volt Typhoon, Salt Typhoon, Change Healthcare. US Cyber Command, CISA, NSA, FBI Cyber. Why ethical cyber career matters in 2026. Public info only. CC-BY 4.0.",
  alternates: { canonical: "https://atomeons.com/learn/cyber/cyberwar" },
};

export default function CyberWarPage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn/cyber" className="hover:text-[#22F0D5]">Cyber</Link>{" "}
          <span className="text-[#1A2225]">/</span> Cyberwar
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-14 md:py-20">
          <h1 className="mt-6 text-balance text-4xl font-medium leading-[1] tracking-tight md:text-6xl">
            What &ldquo;cyber war&rdquo;{" "}
            <span className="text-[#FFB87A]">actually means in 2026.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-base leading-[1.75] text-[#C8CCCE] md:text-[17px]">
            The phrase gets used loosely. In the publicly documented record, &ldquo;cyber war&rdquo;
            refers to a set of specific things: nation-state-attributable operations targeting
            another nation&apos;s critical infrastructure, government networks, military
            systems, or private companies operating as proxies for national power.
          </p>
          <p className="mt-5 max-w-3xl text-base leading-[1.7] text-[#C8CCCE]">
            This page describes that framework using only public information: declassified
            documents, US government attribution statements, federal indictments, CISA
            advisories, FBI press releases, Five Eyes joint advisories, and reputable
            journalism (NYT, WaPo, WSJ, Reuters, AP, Wired, Kim Zetter&apos;s reporting).
            Nothing classified. No operational tradecraft.
          </p>
          <p className="mt-5 max-w-3xl text-base leading-[1.7] text-[#C8CCCE]">
            The reason this matters for someone considering an ethical-hacking career is
            simple: the demand for technical defenders in 2026 is structural, well-funded by
            public budgets, and tied to incidents that the public can see. Working on the
            defensive side of these incidents is a real job done by real people in real
            agencies whose hiring is public.
          </p>
        </div>
      </section>

      <section className="border-b border-[#1A2225] bg-[#0e2520]/15">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20">
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            Nine incidents that defined the field.
          </h2>
          <div className="mt-8 space-y-5">
            {INCIDENTS.map((inc) => (
              <article key={inc.name} className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 md:p-7">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-2xl font-semibold tracking-tight text-[#F2F4F5]">{inc.name}</h3>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FFB87A]">{inc.year}</p>
                </div>
                <p className="mt-4 text-[15px] leading-[1.7] text-[#C8CCCE]">{inc.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20">
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            How America is publicly organized to defend.
          </h2>
          <div className="mt-8 space-y-4">
            {FRAMEWORK.map((f) => (
              <div key={f.title} className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6">
                <h3 className="text-lg font-semibold text-[#22F0D5]">{f.title}</h3>
                <p className="mt-3 text-base leading-[1.7] text-[#C8CCCE]">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1A2225] bg-[#0e2520]/15">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20">
          <h2 className="text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            The 2023 National Cybersecurity Strategy
          </h2>
          <p className="mt-5 text-base leading-[1.75] text-[#C8CCCE] md:text-[17px]">
            The Biden administration published the{" "}
            <a href="https://www.whitehouse.gov/wp-content/uploads/2023/03/National-Cybersecurity-Strategy-2023.pdf" target="_blank" rel="noopener" className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5]">
              2023 National Cybersecurity Strategy
            </a>
            {" "}in March 2023. Five pillars: defend critical infrastructure, disrupt threat
            actors, shape market forces, invest in resilience, forge international partnerships.
            The implementation plan published later in 2023 details specific federal actions
            across agencies.
          </p>
          <p className="mt-5 text-base leading-[1.7] text-[#C8CCCE]">
            The strategy explicitly shifts cybersecurity responsibility from end users toward
            the largest, most-capable actors (software vendors, critical infrastructure
            operators, federal agencies) through both regulation and liability. The legal +
            policy environment around cyber is changing meaningfully through 2024-2026.
          </p>
          <p className="mt-5 text-base leading-[1.7] text-[#C8CCCE]">
            Subsequent strategy documents from the second Trump administration (publicly
            announced 2025) maintain the offensive-cyber posture and the focus on China as the
            pacing threat, with reshaping of the federal cyber workforce structure and
            adjustments to the regulatory framework. Read the published documents directly if
            you want to follow this; the policy environment moves faster than any third-party
            summary.
          </p>
        </div>
      </section>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20">
          <h2 className="text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            What this means for an ethical career
          </h2>
          <div className="mt-7 space-y-5 text-base leading-[1.75] text-[#C8CCCE]">
            <p>
              <strong className="text-[#F2F4F5]">Defense is hiring at scale.</strong> CISA, NSA
              Cybersecurity Directorate, FBI Cyber, US Cyber Command, every service branch,
              every National Lab, every major civilian agency cyber team — all are recruiting
              continuously. Salary is below private sector, mission value is high, training
              value is six-figure equivalent.
            </p>
            <p>
              <strong className="text-[#F2F4F5]">Private sector defense is funded.</strong>{" "}
              Mandiant (Google Cloud), CrowdStrike, Palo Alto, Microsoft Defender, SentinelOne,
              ReliaQuest, the major MSSPs · all are growing teams and paying premium. The
              demand signal from Volt Typhoon, Salt Typhoon, and the Change Healthcare
              incident is reflected in headcount growth across these firms in 2024-2026.
            </p>
            <p>
              <strong className="text-[#F2F4F5]">Critical infrastructure operators need
              defenders too.</strong> Energy utilities, water utilities, hospital systems,
              ports, telecommunications carriers, payment processors. Less glamorous than the
              IC and less paid than the frontier-tech defense firms, but more important to
              everyday American life than either, and often closer to where you actually live.
            </p>
            <p>
              <strong className="text-[#F2F4F5]">The legal posture for &ldquo;offensive&rdquo;
              work is narrow and tightly bounded.</strong> Authority to conduct offensive cyber
              operations against foreign targets is held by USCYBERCOM under specific
              authorities (Title 10 / Title 50 / the 2018 NDAA Section 1642 authorities). No
              private US person or company has legal authority to conduct offensive cyber
              operations against foreign actors. &ldquo;Hack back&rdquo; remains illegal under
              the CFAA. The ethical path involves either becoming a federal cyber operator
              (military or civilian) or working in defensive private-sector roles. Anything
              else is freelancing into a Federal Computer Fraud and Abuse Act prosecution.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/learn/cyber/serve" className="rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] hover:bg-[#22F0D5]/20">
              military + federal paths →
            </Link>
            <Link href="/learn/cyber/path" className="rounded-full border border-[#1A2225] bg-[#0A0F11] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#C8CCCE] hover:border-[#22F0D5]/40 hover:text-[#22F0D5]">
              the career path →
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
