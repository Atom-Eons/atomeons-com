import type { Metadata } from "next";
import Link from "next/link";
import { CyberHeroImage } from "../_components/CyberHeroImage";

/**
 * /learn/cyber/timeline — sixty years of cyber.
 *
 * From the Morris worm to Volt Typhoon. Every entry sourced to public
 * material: textbooks, congressional testimony, DOJ indictments, vendor
 * disclosure pages, reputable journalism, declassified docs.
 *
 * The point is comprehension of arc: how we got from "phone phreaks"
 * to "nation-state pre-positioning in critical infrastructure" in 60
 * years. Each entry one-paragraph; the chronology IS the lesson.
 */

export const metadata: Metadata = {
  title: "Sixty years of cyber · the timeline · /learn/cyber/timeline · AtomEons",
  description:
    "1969 ARPANET to 2026 Salt Typhoon. The arc of cybersecurity in 50 dated entries: Morris worm, Mitnick, L0pht, Code Red, Stuxnet, Mirai, WannaCry, NotPetya, SolarWinds, Colonial Pipeline, Change Healthcare. Public sources only.",
  alternates: { canonical: "https://atomeons.com/learn/cyber/timeline" },
  openGraph: {
    title: "Sixty years of cyber · the timeline",
    description: "1969 ARPANET to 2026 Salt Typhoon. The arc, sourced.",
    url: "https://atomeons.com/learn/cyber/timeline",
    type: "article",
  },
  robots: { index: true, follow: true },
};

const ACCENT = "#22F0D5";
const WARN = "#FFB87A";

const ERAS = [
  {
    label: "Pre-history · 1960s-1970s",
    color: "#9BA5A7",
    items: [
      { year: "1969", what: "ARPANET goes live. The internet's military progenitor connects four nodes (UCLA, Stanford, UC Santa Barbara, Utah). Nobody is thinking about security." },
      { year: "1971", what: "Bob Thomas writes Creeper at BBN — the first self-replicating program. It moves across DEC PDP-10s printing 'I'M THE CREEPER, CATCH ME IF YOU CAN.' Ray Tomlinson writes Reaper to delete it. The first virus + first antivirus." },
      { year: "1972", what: "John Draper aka Cap'n Crunch demonstrates that a toy whistle from a cereal box produces 2600 Hz — the tone AT&T's long-distance network uses for authorization. The phone-phreak era opens." },
      { year: "1978", what: "First documented spam: Gary Thuerk emails 393 ARPANET users about a DEC computer demo. Universally hated. The internet's first marketing email." },
    ],
  },
  {
    label: "The 80s · birth of the malicious",
    color: "#FFB87A",
    items: [
      { year: "1983", what: "WarGames releases. Cyberpunk consciousness enters mainstream culture. Senate holds hearings on computer security partly in response. President Reagan watches the movie + asks the Joint Chiefs about its plausibility." },
      { year: "1986", what: "First PC virus — Brain — written by Basit and Amjad Farooq Alvi in Lahore, Pakistan. Spread via 5.25-inch floppy disk. Their phone number was in the virus code. They told researchers (like Mikko Hyppönen years later) they were just trying to track who pirated their software." },
      { year: "1986", what: "Cliff Stoll publishes 'Stalking the Wily Hacker' in Communications of the ACM — methodically tracking a German hacker selling stolen US military data to the KGB. The first publicly documented foreign-intelligence cyber-espionage incident. Later becomes the book 'The Cuckoo's Egg.'" },
      { year: "1988", what: "Morris Worm. Robert Tappan Morris (then Cornell grad student) releases a worm that exploits Unix sendmail + fingerd + rsh/rlogin. Estimated to infect 10% of all internet-connected machines (~6,000 of ~60,000 at the time). First conviction under the Computer Fraud and Abuse Act (1989). CERT/CC founded in response." },
    ],
  },
  {
    label: "The 90s · commercialization + culture",
    color: "#22F0D5",
    items: [
      { year: "1993", what: "Phrack #44 publishes 'Smashing the Stack for Fun and Profit' by AlephOne. Buffer-overflow exploitation enters the public canon. Required reading for vulnerability research for the next 20 years." },
      { year: "1995", what: "Kevin Mitnick arrested by FBI after multi-year pursuit. Profile in NYT magazine. Becomes the public face of 'hacker' in 90s mainstream coverage. The trial reshapes federal cyber prosecution norms." },
      { year: "1996", what: "Aleph One publishes 'Smashing the Stack for Fun and Profit' in Phrack #49. The canonical buffer-overflow tutorial. Required reading for the next 20 years of exploitation work." },
      { year: "1998", what: "L0pht Heavy Industries testifies before Congress. The famous line: 'we could take down the internet in 30 minutes.' First time a hacker collective addresses the US Senate. Mudge (Peiter Zatko), Weld Pond, Dildog, Brian Oblivion, others on the panel." },
      { year: "1999", what: "Melissa virus disrupts email globally. David L. Smith arrested + pleaded guilty. Internet-scale malware enters the mainstream news cycle." },
    ],
  },
  {
    label: "The 2000s · worms + criminal economy",
    color: "#22F0D5",
    items: [
      { year: "2000", what: "ILOVEYOU virus from Manila spreads to ~50M computers within 10 days. Causes ~$5.5B in damages. Onel de Guzman avoids prosecution because the Philippines had no anti-cybercrime law at the time. Later passed in response." },
      { year: "2001", what: "Code Red worm exploits a buffer overflow in Microsoft IIS web servers. ~360,000 hosts infected in 14 hours. The first internet-scale worm requiring no user interaction." },
      { year: "2003", what: "SQL Slammer. 75,000 victims in 10 minutes. Doubled the size of its infected population every 8.5 seconds. The fastest-spreading worm in history, still." },
      { year: "2004", what: "Estonia becomes a digital state. First nation to offer digital identity to all citizens. Cyber posture becomes a national-economic concern." },
      { year: "2005", what: "Sony BMG rootkit scandal. Sony's audio CDs install a kernel-level rootkit on users' PCs that becomes a tool for malware. Triggers a class-action lawsuit + FTC enforcement. Mark Russinovich's discovery is a landmark of public-interest reverse engineering." },
      { year: "2007", what: "Estonia DDoS attacks. Three weeks of distributed denial of service targeting Estonian banks, government, media. Attributed to Russian state-affiliated actors. The first publicly-acknowledged cyber operation against an entire country." },
      { year: "2008", what: "Conficker worm reaches 9-15M infections at peak. Most-infected machines remain unpatched for years. Conficker Working Group represents the first major industry-wide collaborative defense — Microsoft, ICANN, Symantec, etc." },
      { year: "2008", what: "Russia-Georgia war includes coordinated cyber attacks on Georgian government and media sites — the first publicly-attributed combined kinetic + cyber operation." },
    ],
  },
  {
    label: "The 2010s · cyber as a weapon",
    color: "#FFB87A",
    items: [
      { year: "2010", what: "Stuxnet disclosed. Worm targeting Iranian uranium-enrichment centrifuges. The first publicly-documented cyber weapon causing physical destruction. Reshapes global cyber doctrine permanently. (See /learn/cyber/breaches for full case study.)" },
      { year: "2011", what: "PlayStation Network breach. ~77M accounts compromised. Sony's PSN offline for 23 days. The first major consumer data breach to become a quarterly-earnings-affecting event for a Fortune 500." },
      { year: "2013", what: "Edward Snowden disclosures. NSA contractor leaks documents revealing PRISM, XKeyscore, mass-surveillance programs. Reframes global conversation on government cyber capabilities + civil liberties." },
      { year: "2013", what: "Target breach. HVAC vendor compromise → POS malware → 40M cards stolen. The textbook supply-chain attack." },
      { year: "2014", what: "Sony Pictures hack attributed to North Korea. Treasury sanctions follow. Nation-state retaliation against a US private company over content." },
      { year: "2015", what: "OPM breach. 21.5M federal employee records including SF-86 background-investigation forms exfiltrated. Attributed to Chinese state actors. The most consequential US government data breach by counterintelligence value." },
      { year: "2016", what: "DNC hacks attributed to Russian GRU (APT28). Mirai botnet (700K+ IoT devices) takes down major DNS provider Dyn — Twitter, Reddit, Spotify, Netflix all degraded. Brian Krebs's site hit by 620 Gbps DDoS from Mirai." },
      { year: "2017", what: "WannaCry (May, attributed to North Korea's Lazarus). NotPetya (June, attributed to Russia's GRU, $10B+ damages). Equifax (147M consumers). Shadow Brokers leaks NSA Equation Group exploits including EternalBlue. The year cyber goes mainstream." },
      { year: "2018", what: "GDPR takes effect in EU. CISA established in US as DHS sub-agency. The era of formalized cyber-policy infrastructure begins." },
      { year: "2019", what: "Capital One breach. ~106M accounts. Paige Thompson convicted. AWS S3 + IAM misconfiguration becomes a board-level conversation." },
    ],
  },
  {
    label: "The 2020s · supply chain + critical infrastructure",
    color: "#FFB87A",
    items: [
      { year: "2020", what: "SolarWinds Orion supply-chain compromise. ~18,000 customers received backdoored update. Selective post-compromise on US federal agencies. Attributed to Russian SVR. Triggers EO 14028 (Improving the Nation's Cybersecurity)." },
      { year: "2021", what: "Microsoft Exchange ProxyLogon. Colonial Pipeline ransomware ($4.4M paid, 6-day shutdown). Kaseya VSA supply chain (~1,500 organizations). Log4j (CVE-2021-44228) — the year of mass-exploitation events." },
      { year: "2022", what: "Ukraine war begins Feb 24. Viasat KA-SAT modems wiped attributed to Russia. Microsoft becomes a public defender of Ukrainian cyber posture. Costa Rica declares national emergency after Conti ransomware. Sandworm Industroyer2 attempts on Ukrainian power grid." },
      { year: "2023", what: "MOVEit Transfer mass-exploitation by Cl0p — 2,500+ organizations affected. Volt Typhoon disclosed — China-state pre-positioning in US critical infrastructure for sabotage rather than espionage. National Cybersecurity Strategy published. SEC 4-business-day breach disclosure rule takes effect." },
      { year: "2024", what: "Change Healthcare ransomware ($22M paid, 100M+ individuals affected — largest US healthcare breach ever). XZ Utils backdoor discovered by Andres Freund just before it would have shipped in major Linux distros — the most consequential near-miss in open-source supply chain history. Salt Typhoon compromise of US telecommunications carriers disclosed late in the year." },
      { year: "2025", what: "Quantum-resistant cryptography migration accelerates. NIST PQC standards (FIPS 203/204/205) finalized late 2024 → 2025 enterprise adoption. CISA Secure-by-Design pledge expanding. AI safety becomes formal regulatory category (EU AI Act enforcement begins phased rollout)." },
      { year: "2026", what: "We're here. Drones replaced artillery in Ukraine. LLMs power both attack and defense workflows. Critical-infrastructure pre-positioning is the central threat. The field needs more defenders than there are." },
    ],
  },
];

export default function CyberTimelinePage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <CyberHeroImage slug="cyber-index" alt="Cinematic press-photo of a dimly lit cybersecurity operations center seen from above." />
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[11px] tracking-[0.08em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn/cyber" className="hover:text-[#22F0D5]">Cyber</Link>{" "}
          <span className="text-[#1A2225]">/</span> Timeline
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            Sixty years of cyber · 1969 — 2026
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            The arc, in fifty entries.{" "}
            <span style={{ color: ACCENT }}>How we got here.</span>
          </h1>
          <p className="mt-8 max-w-[62ch] text-base leading-[1.7] text-[#C8CCCE] md:text-[17px]">
            From the Creeper worm on PDP-10s to nation-state pre-positioning in US critical infrastructure. The point of this page is not memorization — it&apos;s comprehension of arc. Each event was inevitable in hindsight + improbable in foresight. The pattern across 60 years is the lesson.
          </p>
          <p className="mt-5 max-w-[62ch] text-sm leading-[1.6] text-[#9BA5A7]">
            Public sources only: textbooks (Cliff Stoll, Kim Zetter, Andy Greenberg, Brian Krebs), congressional testimony, DOJ indictments, CISA advisories, declassified documents, reputable journalism.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24 space-y-16">
          {ERAS.map((era) => (
            <div key={era.label}>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: era.color }}>
                {era.label}
              </p>
              <ol className="mt-8 space-y-8 border-l-2 border-[#1A2225] pl-6">
                {era.items.map((entry, i) => (
                  <li key={i} className="relative">
                    <span
                      aria-hidden
                      className="absolute -left-[31px] top-2 h-2 w-2 rounded-full"
                      style={{ background: era.color }}
                    />
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: era.color }}>
                      {entry.year}
                    </p>
                    <p className="mt-2 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">{entry.what}</p>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-[#1A2225] bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 text-center">
          <h2 className="text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
            The next decade will write itself faster.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-[1.65] text-[#C8CCCE]">
            Sixty years got us here. The next ten will compress the work of those sixty. The field needs more defenders than it has — and the people who join in 2026 will live through events that future timelines will list with the same weight as Stuxnet and Volt Typhoon. The right question on this page is not &ldquo;what happened.&rdquo; The right question is &ldquo;what do I want my line in the next era to say.&rdquo;
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href="/learn/cyber/path" className="inline-flex items-center gap-2 rounded-full bg-[#22F0D5] px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[#1AD4BD]">
              Start the path →
            </Link>
            <Link href="/learn/cyber/heroes" className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 px-5 py-2.5 text-sm font-medium text-[#22F0D5] transition-colors hover:bg-[#22F0D5]/10">
              The named voices →
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
