import type { Metadata } from "next";
import Link from "next/link";
import { CyberHeroImage } from "../_components/CyberHeroImage";

/**
 * /learn/cyber/threat-actors — encyclopedia of named threat groups.
 *
 * Public attribution only. Every entry sourced from US government
 * indictments / advisories / sanctions, Mandiant attribution reports,
 * Microsoft Threat Intelligence, CrowdStrike Falcon Adversary reports,
 * Recorded Future Insikt Group, and reputable journalism.
 *
 * No operational tradecraft. Defensive education frame: knowing who
 * the named groups are, what they target, and what their public
 * tradecraft signatures look like is foundational SOC/CTI knowledge.
 */

export const metadata: Metadata = {
  title: "Threat actor encyclopedia · the named groups you need to know · /learn/cyber/threat-actors · AtomEons",
  description:
    "APT28, APT29, Sandworm, Lazarus, Volt Typhoon, Salt Typhoon, FIN7, Cl0p, REvil, LockBit, ALPHV, MUDDYWATER, Charming Kitten, Equation Group — twenty named threat groups every cyber professional should recognize. Public attribution only.",
  alternates: { canonical: "https://atomeons.com/learn/cyber/threat-actors" },
  openGraph: {
    title: "Threat actor encyclopedia · the named groups you need to know",
    description: "Public attribution only. State actors + criminal crews + their tradecraft.",
    url: "https://atomeons.com/learn/cyber/threat-actors",
    type: "article",
  },
  robots: { index: true, follow: true },
};

const ACCENT = "#22F0D5";
const WARN = "#FFB87A";

const STATE_ACTORS = [
  {
    handle: "APT28 / Fancy Bear / Sofacy",
    sponsor: "Russia · GRU Unit 26165",
    aliases: "FANCY BEAR, STRONTIUM, PAWN STORM, Sednit",
    targets: "Defense, government, political organizations · Western Europe + US",
    signature: "Spear-phishing with X-Tunnel and X-Agent malware. Targeted the DNC in 2016 (DOJ indictment July 13, 2018). Olympic Games hack (2018). Bundestag (2015).",
    sources: "DOJ indictment July 13, 2018 · Mueller Report · US Treasury sanctions",
  },
  {
    handle: "APT29 / Cozy Bear / NobleBaron",
    sponsor: "Russia · SVR Foreign Intelligence Service",
    aliases: "COZY BEAR, THE DUKES, MIDNIGHT BLIZZARD, IRON HEMLOCK",
    targets: "Government, think tanks, healthcare, energy · long-term espionage focus",
    signature: "SolarWinds Orion compromise (SUNBURST backdoor, 2020). Microsoft Exchange supply chain attacks. State Department + DNC (2015-2016). Highly disciplined operational security.",
    sources: "Joint statement from FBI/CISA/ODNI/NSA Jan 5, 2021 · UK NCSC attribution",
  },
  {
    handle: "Sandworm / VOODOO BEAR / IRIDIUM",
    sponsor: "Russia · GRU Unit 74455",
    aliases: "VOODOO BEAR, TELEBOTS, BLACKENERGY group",
    targets: "Ukraine + critical infrastructure globally · destructive operations",
    signature: "Ukrainian power-grid attacks 2015-2016 (BlackEnergy, Industroyer). NotPetya 2017 ($10B+ damage). Olympic Destroyer 2018. Industroyer2 (April 2022 attempt on Ukraine power). Six GRU officers indicted by DOJ October 19, 2020.",
    sources: "DOJ indictment Oct 19, 2020 · CISA advisories · UK NCSC attribution",
  },
  {
    handle: "Volt Typhoon",
    sponsor: "China · MSS-attributable per US joint advisory",
    aliases: "VANGUARD PANDA, BRONZE SILHOUETTE",
    targets: "US critical infrastructure pre-positioning · telecommunications, transportation, water, energy",
    signature: "Living-off-the-land techniques (LOLBins, legitimate admin tools). Sustained presence rather than data exfiltration. Publicly assessed as positioning for sabotage rather than espionage. Disclosed by joint CISA/NSA/FBI advisory May 24, 2023.",
    sources: "CISA Advisory AA23-144A May 24, 2023 · Microsoft Threat Intelligence May 24, 2023 · FBI Director Wray testimony Jan 31, 2024",
  },
  {
    handle: "Salt Typhoon",
    sponsor: "China · MSS-attributable per US reporting",
    aliases: "EARTH ESTRIES, GhostEmperor",
    targets: "US telecommunications carriers · lawful-intercept systems",
    signature: "Long-running compromise of major US telcos (AT&T, Verizon, Lumen confirmed publicly). Accessed lawful-intercept infrastructure used for court-authorized wiretaps. Government communications affected including phones of senior officials per public reporting.",
    sources: "Joint FBI + CISA statement late 2024 · WSJ + WaPo investigative reporting 2024",
  },
  {
    handle: "APT41 / BARIUM / WICKED PANDA",
    sponsor: "China · MSS contractor with criminal moonlighting",
    aliases: "BARIUM, BRONZE ATLAS, WICKED PANDA",
    targets: "Healthcare, telecommunications, technology, gaming · espionage + financial crime hybrid",
    signature: "Unique dual-use group. State-sponsored espionage by day, criminal financial operations by night. Five Chinese nationals indicted by DOJ September 16, 2020. SolarWinds-adjacent activity. Targets gaming platforms for virtual currency theft.",
    sources: "DOJ indictment Sep 16, 2020 · Mandiant APT41 reports · CrowdStrike WICKED PANDA reports",
  },
  {
    handle: "Lazarus Group / HIDDEN COBRA",
    sponsor: "North Korea · Reconnaissance General Bureau",
    aliases: "HIDDEN COBRA, ZINC, LABYRINTH CHOLLIMA, APT38 (financial sub-group)",
    targets: "Banks (especially SWIFT), cryptocurrency exchanges, entertainment industry · revenue generation for DPRK",
    signature: "Bangladesh Bank heist 2016 ($81M via SWIFT). WannaCry 2017. Sony Pictures 2014. Multiple $100M+ cryptocurrency heists (Axie Infinity $620M in March 2022). Treasury OFAC sanctioned.",
    sources: "DOJ indictment Park Jin Hyok Sep 6, 2018 · DOJ indictment three DPRK nationals Feb 17, 2021 · Treasury OFAC designations",
  },
  {
    handle: "APT34 / OilRig / Helix Kitten",
    sponsor: "Iran · MOIS Ministry of Intelligence",
    aliases: "OILRIG, HELIX KITTEN, CRAMBUS",
    targets: "Middle East government + financial + energy · gradual expansion to Western targets",
    signature: "DNS-based command-and-control. Custom backdoors (Helminth, Quadagent). Long-term reconnaissance focus. Aramco-related activity (2017). Active 2014-present.",
    sources: "FireEye/Mandiant APT34 reports · Microsoft Threat Intelligence",
  },
  {
    handle: "APT33 / Elfin / Refined Kitten",
    sponsor: "Iran · IRGC-attributable per multiple sources",
    aliases: "ELFIN, REFINED KITTEN, MAGNALLIUM",
    targets: "Saudi aerospace + petrochemicals + Western energy",
    signature: "Spear-phishing with malicious Excel attachments. Destructive Shamoon and StoneDrill malware history (with related/overlapping groups). Industrial control systems targeting.",
    sources: "FireEye APT33 reports · Symantec Elfin reports · CISA advisories",
  },
  {
    handle: "Equation Group",
    sponsor: "US-attributable per public researcher consensus and Shadow Brokers leak",
    aliases: "(no public alternate handles)",
    targets: "Foreign intelligence + counterintelligence operations",
    signature: "Most technically sophisticated public threat actor. Pre-Stuxnet ancestor of Olympic Games. EternalBlue exploit (later leaked by Shadow Brokers and weaponized into WannaCry / NotPetya). Firmware-level persistence on hard drives. Identified by Kaspersky research 2015.",
    sources: "Kaspersky Equation Group reports 2015 · Shadow Brokers leaks 2016-2017 · Snowden NSA documents",
  },
];

const CRIMINAL_CREWS = [
  {
    handle: "LockBit",
    type: "Ransomware-as-a-Service · primary operator and affiliate network",
    targets: "Manufacturing, healthcare, government, professional services · global",
    signature: "Most prolific ransomware operation 2022-2024. RaaS model with disciplined affiliate program. Operation Cronos (international LE takedown Feb 2024) seized infrastructure but operations continued. Russian-language ecosystem.",
    sources: "UK NCA Operation Cronos Feb 20, 2024 · DOJ indictments Dmitry Khoroshev May 7, 2024 · CISA #StopRansomware advisories",
  },
  {
    handle: "ALPHV / BlackCat",
    type: "Ransomware-as-a-Service · Rust-based ransomware",
    targets: "Healthcare (Change Healthcare 2024 was their work), critical infrastructure, energy",
    signature: "First major Rust-language ransomware. Change Healthcare attack ($22M ransom confirmed paid). Vanished March 2024 in apparent exit scam after Change Healthcare payment. Members may have re-emerged in other RaaS operations.",
    sources: "FBI/CISA #StopRansomware ALPHV advisory · UnitedHealth congressional testimony 2024",
  },
  {
    handle: "Cl0p / TA505",
    type: "Ransomware + data-extortion · zero-day exploitation specialty",
    targets: "Mass-exploitation of file-transfer software vulnerabilities · global",
    signature: "MOVEit Transfer mass-exploitation 2023 (~2,500 organizations). GoAnywhere MFT 2023. Accellion FTA 2020. Strategy is zero-day on widely-used software, then mass-data-extraction-and-extortion (sometimes without encryption).",
    sources: "CISA #StopRansomware Cl0p advisory June 7, 2023 · Mandiant FIN11 reports · DOJ indictments",
  },
  {
    handle: "REvil / Sodinokibi",
    type: "Ransomware-as-a-Service · disrupted but ancestor of multiple successors",
    targets: "Managed service providers (MSPs), large enterprises · Kaseya VSA July 2021",
    signature: "Kaseya VSA supply-chain ransomware July 2021 affecting 1,500+ downstream organizations. JBS Foods ransom $11M paid June 2021. Russian authorities announced arrests of REvil members January 2022 (subsequent proceedings unclear).",
    sources: "FBI Kaseya advisory · DOJ press release ransom recovery · Russian FSB statement Jan 14, 2022",
  },
  {
    handle: "FIN7 / Carbanak Group",
    type: "Financial cybercrime · POS targeting · ransomware pivot",
    targets: "Hospitality, retail, restaurants · POS systems and payment data",
    signature: "Sophisticated multi-year fraud operation. Operated front company Combi Security as fake penetration-testing firm to recruit unwitting attackers. Multiple convictions 2018-2022. Pivoted to ransomware affiliates including (allegedly) DarkSide/BlackMatter.",
    sources: "DOJ indictments and convictions multiple, 2018-2022 · FBI press releases · Mandiant FIN7 reports",
  },
  {
    handle: "Scattered Spider / UNC3944 / Octo Tempest",
    type: "Social engineering + ransomware · English-speaking · younger operator profile",
    targets: "Las Vegas casinos (Caesars, MGM, Sep 2023), telecommunications, BPO services",
    signature: "Sophisticated social engineering of IT help desks. SIM-swapping. Native English speakers — significant departure from Russian-language ecosystem norm. MGM Resorts 2023 ($100M cost). Caesars 2023 ($15M ransom paid).",
    sources: "Microsoft Threat Intelligence Octo Tempest reports · FBI press releases · Mandiant UNC3944 reports",
  },
];

export default function ThreatActorsPage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <CyberHeroImage slug="modern" alt="Top-down photograph of a single small black drone loitering above fog at dawn." />
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[11px] tracking-[0.08em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn/cyber" className="hover:text-[#22F0D5]">Cyber</Link>{" "}
          <span className="text-[#1A2225]">/</span> Threat actors
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            The named threat groups
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            Sixteen names every cyber pro{" "}
            <span style={{ color: ACCENT }}>knows cold.</span>
          </h1>
          <p className="mt-8 max-w-[62ch] text-base leading-[1.7] text-[#C8CCCE] md:text-[17px]">
            Threat-intel reporting and SOC alerts use these handles. Knowing which group is which — what they target, what their tradecraft looks like, who their state sponsor is — is foundational CTI and SOC knowledge. Each entry is sourced from public US government attribution, DOJ indictments, vendor research, and reputable journalism.
          </p>
          <p className="mt-5 max-w-[62ch] text-sm leading-[1.6] text-[#FFB87A]">
            Public attribution only. Defensive education frame. No operational tradecraft.
          </p>
        </div>
      </section>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            State-sponsored APTs
          </p>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            Ten advanced-persistent-threat groups.
          </h2>
          <div className="mt-12 space-y-10">
            {STATE_ACTORS.map((a, i) => (
              <article key={a.handle} className="border-l-2 pl-6" style={{ borderColor: ACCENT + "30" }}>
                <div className="flex flex-wrap items-baseline gap-4">
                  <p className="font-mono text-[14px] tabular-nums" style={{ color: ACCENT }}>
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-2xl font-medium tracking-tight text-[#F2F4F5]">
                    {a.handle}
                  </h3>
                </div>
                <p className="mt-2 text-sm text-[#FFB87A]">{a.sponsor}</p>
                <p className="mt-1 text-sm text-[#9BA5A7]">
                  <span className="text-[#22F0D5]">Aliases: </span>{a.aliases}
                </p>
                <p className="mt-1 text-sm text-[#9BA5A7]">
                  <span className="text-[#22F0D5]">Targets: </span>{a.targets}
                </p>
                <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">{a.signature}</p>
                <p className="mt-3 max-w-[62ch] font-mono text-[11px] text-[#9BA5A7]">
                  Sources: {a.sources}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1A2225] bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: WARN }}>
            Criminal crews + ransomware operations
          </p>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            Six financially-motivated groups.
          </h2>
          <p className="mt-5 max-w-[62ch] text-base leading-[1.65] text-[#C8CCCE]">
            The criminal vs state-actor line is increasingly blurry — multiple ransomware crews have Russian state tolerance or implicit protection. Six groups every cyber professional should recognize.
          </p>
          <div className="mt-12 space-y-10">
            {CRIMINAL_CREWS.map((c, i) => (
              <article key={c.handle} className="border-l-2 pl-6" style={{ borderColor: WARN + "30" }}>
                <div className="flex flex-wrap items-baseline gap-4">
                  <p className="font-mono text-[14px] tabular-nums" style={{ color: WARN }}>
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-2xl font-medium tracking-tight text-[#F2F4F5]">
                    {c.handle}
                  </h3>
                </div>
                <p className="mt-2 text-sm text-[#9BA5A7]">{c.type}</p>
                <p className="mt-1 text-sm text-[#9BA5A7]">
                  <span className="text-[#FFB87A]">Targets: </span>{c.targets}
                </p>
                <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">{c.signature}</p>
                <p className="mt-3 max-w-[62ch] font-mono text-[11px] text-[#9BA5A7]">
                  Sources: {c.sources}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/learn/cyber/breaches" className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 px-5 py-2.5 text-sm font-medium text-[#22F0D5] transition-colors hover:bg-[#22F0D5]/10">
              Major breaches →
            </Link>
            <Link href="/learn/cyber/cyberwar" className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] px-5 py-2.5 text-sm text-[#C8CCCE] transition-colors hover:border-[#FFB87A]/40 hover:text-[#FFB87A]">
              Public cyberwar framework →
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
