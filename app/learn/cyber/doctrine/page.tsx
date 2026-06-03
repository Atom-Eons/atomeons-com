import type { Metadata } from "next";
import Link from "next/link";
import { CyberHeroImage } from "../_components/CyberHeroImage";

/**
 * /learn/cyber/doctrine — public defense-tech worldviews you should know.
 *
 * Operator directive 2026-06-02: "read all their blogs for data and alpha.
 * we want to be trained like an industry aware pro, not a rookie."
 *
 * Synthesis of public-intellectual frames from named defense-tech leaders:
 * Karp (Palantir), Luckey (Anduril), plus Schmidt + Khosla on AI policy,
 * and the institutional doctrine documents that shaped the 2023-2026 cyber
 * + defense policy environment.
 *
 * Sourcing: published books, public speeches, congressional testimony,
 * named investor materials. Sparing direct quotes (under 15 words each
 * per copyright doctrine), heavy paraphrase + attribution.
 */

export const metadata: Metadata = {
  title: "Defense-tech doctrine · Karp + Luckey + the public frames · /learn/cyber/doctrine · AtomEons",
  description:
    "Alex Karp's Technological Republic. Palmer Luckey's product-first defense model. Eric Schmidt's AI-defense advocacy. The 2023 US National Cybersecurity Strategy. The doctrines shaping defense tech in 2026 — sourced + paraphrased.",
  alternates: { canonical: "https://atomeons.com/learn/cyber/doctrine" },
  openGraph: {
    title: "Defense-tech doctrine you need to know",
    description: "Karp · Luckey · Schmidt · the public frames in defense tech.",
    url: "https://atomeons.com/learn/cyber/doctrine",
    type: "article",
  },
  robots: { index: true, follow: true },
};

const ACCENT = "#22F0D5";
const WARN = "#FFB87A";

const VOICES = [
  {
    name: "Alex Karp · Palantir CEO",
    book: "The Technological Republic — with Nicholas Zamiska (2024)",
    thesis:
      "Karp's public posture frames Silicon Valley's drift away from defense + national-purpose work as a cultural failure. The book and his public speeches at CNAS, Hudson Institute, and elsewhere argue that the West's technological lead is downstream of an alliance between technology and the state — and that alliance had quietly dissolved in the 2010s. Palantir's mission, per Karp, is to rebuild it.",
    keyMoves: [
      "Explicit refusal of certain commercial work. Palantir has publicly turned away projects Karp judges to conflict with the company's national-security posture.",
      "Public defense of contracts that Silicon Valley peers found controversial (ICE, Israeli MoD work). Karp's argument: the alternative is ceding the technical layer to actors with worse values.",
      "Critique of the academy + tech industry's drift into ideology divorced from outcomes. The Technological Republic is mostly a cultural argument, not a software argument.",
      "Long-form public speeches as a public-intellectual posture — most defense-tech CEOs avoid this. Karp leans into it.",
    ],
    citeWhereToRead: "'The Technological Republic' (Crown, 2024) · Palantir quarterly earnings calls (Karp's letter-to-shareholders is unusually substantive) · Karp speeches at CNAS / Hudson / Reagan Defense Forum (publicly available video)",
  },
  {
    name: "Palmer Luckey · Anduril founder",
    book: "No book. Public posture via Anduril mission page + extended-form interviews (Hard Fork, Lex Fridman, Forbes, WIRED, Bari Weiss's The Free Press)",
    thesis:
      "Luckey argues the US defense industrial base lost its ability to ship competitive products at competitive prices because the cost-plus contract model rewards delivery delays + technology stagnation. Anduril's product-first model — fixed-price productized hardware with refresh cycles like consumer tech — is positioned as the structural fix. The company is itself the argument.",
    keyMoves: [
      "Build first, sell second. Anduril self-funds R&D and brings finished products to DoD, inverting the traditional defense procurement model.",
      "Unapologetically political. Luckey speaks openly about West-vs-authoritarian framings. After his Facebook departure over political-donation controversy (2017), he became one of the most public Silicon Valley figures explicitly aligning with defense work.",
      "Vertical integration as a moat. Anduril builds the software (Lattice OS), the hardware (drones + vehicles), and increasingly the manufacturing. Most competitors are software-only or hardware-only.",
      "Cultural critique of Silicon Valley's defense aversion as morally backwards — that refusing to defend democracies is not neutral, it's a choice.",
    ],
    citeWhereToRead: "Anduril mission + product pages · Palmer Luckey on Lex Fridman Podcast #386 (2023) · Bari Weiss / Free Press extended interview · Forbes 2017 + 2020 + 2024 Luckey profiles · Anduril press releases on CCA + Replicator contracts",
  },
  {
    name: "Eric Schmidt · former Google CEO · former NSCAI Chair",
    book: "Genesis (with Henry Kissinger + Craig Mundie, 2024) · The Age of AI (with Kissinger + Daniel Huttenlocher, 2021)",
    thesis:
      "Schmidt has used his post-Google decades to argue that AI is the central great-power-competition variable of the 21st century, and that US policy should treat AI compute, talent, and chip supply chains as national-security infrastructure. As Chair of the National Security Commission on AI (NSCAI, 2018-2021), he co-authored the most influential public-document framing of the AI + national-security relationship.",
    keyMoves: [
      "NSCAI Final Report (March 2021) — most-cited US public document on AI + national security. Shaped subsequent Executive Orders + the CHIPS Act framing.",
      "Special Competitive Studies Project (SCSP) — Schmidt's post-NSCAI think tank publishing follow-on work on AI + defense + tech competition with China.",
      "Public advocacy for export controls on advanced AI chips + manufacturing equipment to China — became 2022+ US policy.",
      "Investment activity through Schmidt Futures + Innovation Endeavors, often crossing the AI-defense seam.",
    ],
    citeWhereToRead: "NSCAI Final Report (2021, free PDF) · 'The Age of AI' (Little Brown, 2021) · 'Genesis' (Little Brown, 2024) · SCSP publications (scsp.ai) · Schmidt congressional testimony multiple sessions 2020-2024",
  },
  {
    name: "Vinod Khosla · Khosla Ventures",
    book: "No definitive book on this thesis · public posture via Twitter/X + Khosla Ventures blog + LP letters",
    thesis:
      "Khosla has been one of the most explicit Silicon Valley voices arguing that AI safety + national-security frames are compatible with aggressive deployment. Against both AI-doomers and AI-accelerationists, his public posture is: ship aggressively, watch threat surface, fund both offensive and defensive sides of dual-use AI.",
    keyMoves: [
      "Substantial investments across the defense-AI ecosystem (multiple Anduril rounds, OpenAI early backer).",
      "Explicit defense of US-China AI decoupling as both economic + national-security necessity.",
      "Public Twitter/X arguments with both AI-safety advocates + e/acc accelerationists — Khosla holds a third position.",
    ],
    citeWhereToRead: "Khosla Ventures blog (khoslaventures.com) · Khosla's Twitter/X (@vkhosla) · multiple Stanford GSB + Wharton talks on AI + venture",
  },
];

const INSTITUTIONAL_DOCS = [
  {
    name: "NSCAI Final Report (2021)",
    framing: "National Security Commission on AI, chaired by Eric Schmidt + Bob Work. ~750 pages. The single most-influential public US document on AI + national security. Established the public-policy framing for AI as a national-security category alongside semiconductors + critical minerals.",
    where: "Free PDF · nscai.gov (archived) · physical copy via US GPO",
  },
  {
    name: "US National Cybersecurity Strategy (March 2023)",
    framing: "Biden administration policy document. Five pillars: defend critical infrastructure, disrupt threat actors, shape market forces toward security, invest in resilience, forge international partnerships. Explicitly shifted cybersecurity responsibility from end users toward the largest, most-capable actors (software vendors, critical infrastructure operators, federal agencies) through both regulation and liability.",
    where: "whitehouse.gov · Implementation Plan published later 2023 with specific federal actions per pillar",
  },
  {
    name: "DoD Cyber Strategy (2023)",
    framing: "DoD's first publicly-released cyber strategy in five years. Centered on defending the homeland, defending US interests in cyberspace, defending DoD networks. Codified 'defend forward' as official doctrine — the public posture that DoD will operate against adversary infrastructure abroad.",
    where: "defense.gov · public press release + executive summary (full document classified)",
  },
  {
    name: "Executive Order 14028 — Improving the Nation's Cybersecurity (May 2021)",
    framing: "Biden-era EO triggered by the SolarWinds compromise. Required federal agencies to adopt zero-trust architectures, modernize cybersecurity, share threat information, and pushed software supply-chain security (SBOM requirements) into federal procurement.",
    where: "whitehouse.gov · subsequent OMB memos M-22-09 + M-22-18 implement the EO across federal agencies",
  },
  {
    name: "Replicator Initiative (announced August 2023)",
    framing: "DoD initiative to field thousands of attritable autonomous systems across air/land/sea/space within 18-24 months. Deputy Secretary of Defense Kathleen Hicks announced. Replicator-1 named systems include Switchblade 600, Saronic Spyglass, Anduril Altius + Bolt, AeroVironment products. Replicator-2 expanded to counter-drone in 2024.",
    where: "defense.gov press releases · Hicks speeches at NDIA + Reagan Defense Forum",
  },
  {
    name: "CISA Cybersecurity Performance Goals (CPGs, 2023+)",
    framing: "Voluntary baseline cybersecurity practices for critical-infrastructure sectors, published by CISA in 2023 and updated thereafter. Cross-sector goals plus sector-specific extensions. Used as the framing for the Sector Risk Management Agencies (SRMAs) to push baseline cyber posture across their regulated sectors.",
    where: "cisa.gov/cross-sector-cybersecurity-performance-goals · sector-specific CPGs published as those land",
  },
];

const RECURRING_THEMES = [
  "Speed gap as primary problem. Booz Allen's 'cyberattacks move at AI speed, cyber defense must too' is the loudest version. Mandiant + CrowdStrike + Microsoft all publish on detection latency as the central metric. The doctrine convergence point of the 2020s.",
  "Supply chain as the new vector. SolarWinds + Kaseya + MOVEit + XZ Utils each forced the doctrine forward. Software Bill of Materials (SBOM) requirements + Secure-by-Design pledge are the institutional response.",
  "Pre-positioning vs collection. Volt Typhoon + Salt Typhoon disclosures reframed the China-cyber conversation from 'espionage' to 'positioning for sabotage in a future crisis.' The 2023 NCS + 2023 DoD Cyber Strategy both reflect this.",
  "AI-enabled defense + AI-enabled offense as parallel arms races. The Microsoft+OpenAI February 2024 threat-actor disclosure showed adversaries using LLMs for code generation + spear-phishing. The corresponding defensive wave (Security Copilot, Charlotte AI, etc.) is the response.",
  "Industrial base reform as cyber issue. Anduril's product-first model + Replicator initiative + CHIPS Act + recent DoD acquisitions reform all share the underlying conviction that the US can't defend itself with a 1990s industrial base.",
];

export default function CyberDoctrinePage() {
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
          <span className="text-[#1A2225]">/</span> Doctrine
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            Defense-tech doctrine you need to know
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            Four voices,{" "}
            <span style={{ color: ACCENT }}>six institutional documents,</span>{" "}
            one field.
          </h1>
          <p className="mt-8 max-w-[62ch] text-base leading-[1.7] text-[#C8CCCE] md:text-[17px]">
            Karp at Palantir, Luckey at Anduril, Schmidt post-Google, Khosla as venture investor — the named voices shaping defense-tech's public posture in 2026. Plus the six institutional documents (NSCAI Final Report, 2023 National Cybersecurity Strategy, DoD Cyber Strategy, EO 14028, Replicator, CISA CPGs) that codify the policy environment.
          </p>
          <p className="mt-5 max-w-[62ch] text-sm leading-[1.6] text-[#9BA5A7]">
            This page exists so a cyber pro entering the field walks into interviews with the same public-intellectual context as senior practitioners. Read these voices + documents in primary source — the paraphrases below are pointers, not replacements.
          </p>
        </div>
      </section>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            The four voices
          </p>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            Four public-intellectual frames.
          </h2>
          <div className="mt-14 space-y-16">
            {VOICES.map((v, i) => (
              <article key={v.name} className="border-l-2 pl-6" style={{ borderColor: ACCENT + "30" }}>
                <div className="flex flex-wrap items-baseline gap-4">
                  <p className="font-mono text-[14px] tabular-nums" style={{ color: ACCENT }}>
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
                    {v.name}
                  </h3>
                </div>
                <p className="mt-3 text-sm text-[#FFB87A]">{v.book}</p>
                <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">{v.thesis}</p>
                <div className="mt-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">::key moves</p>
                  <ul className="mt-2 space-y-2 text-[14px] leading-[1.7] text-[#C8CCCE]">
                    {v.keyMoves.map((m, j) => (
                      <li key={j} className="flex gap-3">
                        <span className="text-[#9BA5A7]">·</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="mt-5 max-w-[62ch] font-mono text-[11px] text-[#9BA5A7]">
                  Read directly: {v.citeWhereToRead}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1A2225] bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: WARN }}>
            Six institutional documents
          </p>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            The policy frame that everything sits inside.
          </h2>
          <div className="mt-12 space-y-10">
            {INSTITUTIONAL_DOCS.map((d) => (
              <article key={d.name} className="border-l-2 pl-6" style={{ borderColor: WARN + "30" }}>
                <h3 className="text-xl font-medium tracking-tight text-[#F2F4F5]">{d.name}</h3>
                <p className="mt-3 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">{d.framing}</p>
                <p className="mt-4 max-w-[62ch] font-mono text-[11px] text-[#9BA5A7]">
                  Where to read: {d.where}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            The recurring themes
          </p>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            Five threads that show up across all of them.
          </h2>
          <p className="mt-5 max-w-[62ch] text-base leading-[1.7] text-[#C8CCCE]">
            If you read every book, speech, and document above and abstract over them, these are the threads. Industry pros recognize all five on the first phone call; rookies recognize none.
          </p>
          <ol className="mt-10 space-y-6">
            {RECURRING_THEMES.map((t, i) => (
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

      <section className="border-t border-[#1A2225] bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 text-center">
          <h2 className="text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
            You can read all of this in a weekend.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-[1.65] text-[#C8CCCE]">
            One book (Technological Republic or Age of AI), one report (NSCAI Final Report), one strategy doc (2023 NCS), three podcasts (Karp at CNAS, Luckey on Fridman, Schmidt anywhere). Forty hours total. After that, you can hold your own in any cyber + AI + defense conversation the rest of your career.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href="/learn/cyber/employers" className="inline-flex items-center gap-2 rounded-full bg-[#22F0D5] px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[#1AD4BD]">
              Where you actually work →
            </Link>
            <Link href="/learn/cyber/books" className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 px-5 py-2.5 text-sm font-medium text-[#22F0D5] transition-colors hover:bg-[#22F0D5]/10">
              The 24-book reading list →
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
