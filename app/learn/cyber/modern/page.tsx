import type { Metadata } from "next";
import Link from "next/link";
import { CyberHeroImage } from "../_components/CyberHeroImage";

/**
 * /learn/cyber/modern — what modern cyberwar actually looks like in 2026.
 *
 * Operator directive 2026-06-01: "drones, how modern cyber warfare works,
 * how llms will fight, scope it out a bit for them. they dont understand
 * what is active today...we must teach real time high level info to
 * people not this stale edu video class that is already replaced.
 * realtime intelligence"
 *
 * Posture: public information only. We cite public reporting (CSIS,
 * Reuters, AP, FT, NYT, WaPo, Wired, public DoD press releases, CISA
 * advisories) and we do not describe operational tradecraft. The point
 * is comprehension, not capability transfer.
 */

const ACCENT = "#22F0D5";
const WARN = "#FFB87A";

const DRONE_REALITY = [
  {
    title: "FPV drones replaced artillery as the main precision weapon in Ukraine",
    body: "First-person-view racing drones rigged with ~1kg of explosives are the dominant precision-fires platform on the Russia-Ukraine front as of public reporting through 2025-2026. Unit cost: $400-$1,000. Effective range: 5-20km. Both sides are producing hundreds of thousands per month. The economic asymmetry — a $500 drone disabling a $4M tank — has rewritten what 'attritable' means in warfare. Public reporting: Reuters, FT, AP throughout 2024-2025.",
  },
  {
    title: "Loitering munitions are everywhere",
    body: "AeroVironment Switchblade 300/600 (US, Ukraine), ZALA Lancet (Russia), HESA Shahed-136 (Iran/Russia), IAI Harop (Israel), Aerovironment Altius and Anduril Bolt (US). The loitering munition category — a drone that flies to an area, identifies a target, and dives into it — is now production-line standard across all major militaries.",
  },
  {
    title: "Anti-drone has become its own discipline",
    body: "EW (electronic warfare) jamming, RF-detection grids, directed-energy systems (lasers, microwaves), kinetic counter-drone (anti-air guns, interceptor drones), and AI-driven detect-and-classify systems. US DoD's Replicator initiative announced in 2023 explicitly targets thousands of low-cost autonomous systems alongside counter-drone capability. Anduril Roadrunner is one publicly fielded counter-UAS interceptor.",
  },
  {
    title: "Swarm autonomy is past prototype",
    body: "Public demonstrations from 2023-2025: Shield AI Hivemind (multi-UAV autonomous teaming), Anduril Lattice (swarm control software), DARPA's OFFSET program. Coordinated multi-vehicle autonomy is no longer research — it's procurement.",
  },
  {
    title: "The Replicator initiative is reshaping US procurement",
    body: "DoD's Replicator initiative, announced August 2023, aims to field thousands of attritable autonomous systems across air/land/sea/space domains within 18-24 months. Replicator-1 publicly named systems include Switchblade 600 (loitering munition), Saronic Spyglass (autonomous surface vessel), Anduril Altius and Bolt, AeroVironment products. Replicator-2 expanded to counter-drone in 2024. Source: DoD public press releases, Deputy Secretary of Defense statements.",
  },
];

const CYBER_KINETIC = [
  {
    title: "Cyber is now joint with kinetic operations",
    body: "The 2008 Russia-Georgia war was the first publicly-attributed combined kinetic-cyber operation. Since 2014 in Ukraine, cyber operations against power grids, government services, satellite comms (Viasat KA-SAT incident attributed to Russia at the outset of the 2022 invasion), and military comms have moved from supporting to integrated. The 'cyber war' is no longer separate from 'war.'",
  },
  {
    title: "Critical infrastructure is on the line",
    body: "Public CISA advisories through 2023-2025 disclosed Volt Typhoon (China-attributed pre-positioning in US critical infrastructure for potential disruptive operations) and Salt Typhoon (China-attributed compromise of US telecommunications carriers). These are not espionage in the traditional sense — public attribution describes positioning for sabotage. The 2023 US National Cybersecurity Strategy named this as the central US cyber concern.",
  },
  {
    title: "Software supply chain is the new contested terrain",
    body: "SolarWinds (2020, Russia-attributed), MOVEit (2023, ransomware crew, downstream effects across 2000+ organizations), 3CX (2023, DPRK-attributed) — software supply-chain compromises are now the highest-leverage attack pattern. One compromised vendor cascades across thousands of downstream targets. The federal response (Executive Order 14028, the 2023 cyber strategy) treats this as a category one threat.",
  },
];

const PUBLIC_DOCTRINE = [
  { name: "2023 US National Cybersecurity Strategy", url: "https://www.whitehouse.gov/wp-content/uploads/2023/03/National-Cybersecurity-Strategy-2023.pdf" },
  { name: "DoD Replicator initiative public briefings", url: "https://www.defense.gov/News/Releases/Release/Article/3507156" },
  { name: "Joint Doctrine Note on Cyberspace Operations (JP 3-12, public)", url: "https://www.jcs.mil/Portals/36/Documents/Doctrine/pubs/jp3_12.pdf" },
  { name: "CISA Volt Typhoon advisory", url: "https://www.cisa.gov/news-events/cybersecurity-advisories/aa23-144a" },
  { name: "CISA Salt Typhoon advisory + joint statement", url: "https://www.cisa.gov/news-events/news/joint-statement-fbi-and-cisa-peoples-republic-china-targeting-commercial-telecommunications-infrastructure" },
  { name: "DARPA OFFSET (swarm autonomy program, public)", url: "https://www.darpa.mil/program/offensive-swarm-enabled-tactics" },
  { name: "CSIS Aerospace Security Project drone/UAS publications", url: "https://aerospace.csis.org" },
];

export const metadata: Metadata = {
  title: "What modern cyberwar actually looks like in 2026 · /learn/cyber/modern · AtomEons",
  description:
    "Drones replacing artillery. Cyber + kinetic convergence. Volt Typhoon. Salt Typhoon. Replicator. Loitering munitions. EW. Swarm autonomy. The actual high-level reality of modern cyber warfare as of mid-2026 — public info only, cited sources. Read by gamers, indexed by Google and AI search.",
  keywords: [
    "modern cyber warfare 2026",
    "drone warfare",
    "FPV drones",
    "loitering munitions",
    "Switchblade 600",
    "Anduril Bolt",
    "Shield AI Hivemind",
    "Replicator initiative",
    "Volt Typhoon",
    "Salt Typhoon",
    "cyber kinetic convergence",
    "Viasat KA-SAT",
    "EW electronic warfare",
    "Helsing AI defense",
  ],
  alternates: { canonical: "https://atomeons.com/learn/cyber/modern" },
  openGraph: {
    title: "What modern cyberwar actually looks like in 2026",
    description: "Drones replacing artillery · cyber + kinetic convergence · Volt + Salt Typhoon · Replicator · public info only.",
    url: "https://atomeons.com/learn/cyber/modern",
    type: "article",
  },
  robots: { index: true, follow: true },
};

export default function CyberModernPage() {
  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "What modern cyberwar actually looks like in 2026",
    "description": "Public-info-only briefing on the convergence of drone, EW, and cyber warfare in 2026 — Replicator, Volt Typhoon, Salt Typhoon, loitering munitions.",
    "datePublished": "2026-06-01",
    "author": { "@type": "Organization", "name": "AtomEons Systems Laboratory" },
    "publisher": { "@type": "Organization", "name": "AtomEons", "url": "https://atomeons.com" },
    "license": "https://creativecommons.org/licenses/by/4.0/",
    "isAccessibleForFree": true,
  };

  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <CyberHeroImage slug="modern" alt={"Top-down photograph of a single small black drone loitering above fog at dawn, distant industrial silhouettes below."} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }} />

      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn/cyber" className="hover:text-[#22F0D5]">Cyber</Link>{" "}
          <span className="text-[#1A2225]">/</span> Modern
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="text-[12px] font-medium tracking-tight" style={{ color: ACCENT }}>
            Realtime intel · public-info · best-effort · mid-2026
          </p>
          <h1 className="mt-6 text-balance text-4xl font-medium leading-[1.05] tracking-tight sm:leading-[1.02] md:text-6xl md:leading-[1]">
            What &ldquo;cyber war&rdquo;{" "}
            <span style={{ color: ACCENT }}>looks like right now.</span>
          </h1>
          <p className="mt-8 max-w-[58ch] text-[17px] leading-[1.6] text-[#C8CCCE]">
            Drones replaced artillery. Volt Typhoon pre-positioned in US infrastructure. Palantir won Maven. The textbooks are years behind the field. This is the floor.
          </p>
        </div>
      </section>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <h2 className="text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            Drones are the air force you actually have.
          </h2>
          <p className="mt-4 max-w-[62ch] text-base leading-[1.7] text-[#9BA5A7]">
            Five facts to update your mental model.
          </p>
          <div className="mt-8 space-y-5">
            {DRONE_REALITY.map((d) => (
              <article key={d.title} className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 md:p-7">
                <h3 className="text-xl font-semibold tracking-tight text-[#F2F4F5]">{d.title}</h3>
                <p className="mt-4 text-[15px] leading-[1.7] text-[#C8CCCE]">{d.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20">
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            Cyber stopped being a separate war.
          </h2>
          <div className="mt-8 space-y-5">
            {CYBER_KINETIC.map((c) => (
              <article key={c.title} className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 md:p-7">
                <h3 className="text-xl font-semibold tracking-tight text-[#F2F4F5]">{c.title}</h3>
                <p className="mt-4 text-[15px] leading-[1.7] text-[#C8CCCE]">{c.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1A2225] bg-[#08090B]/15">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20">
          <h2 className="text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            What this means for an ethical cyber career
          </h2>
          <div className="mt-7 space-y-5 text-base leading-[1.75] text-[#C8CCCE]">
            <p>
              <strong className="text-[#F2F4F5]">Defending US critical infrastructure is the
              biggest hiring signal in cyber.</strong> Volt Typhoon and Salt Typhoon revelations
              moved budget and headcount from &ldquo;routine cybersecurity&rdquo; into &ldquo;defend
              the homeland&rdquo; line items at CISA, NSA Cybersecurity Directorate, the National
              Labs, and at the major MSSPs (Mandiant, CrowdStrike, Palo Alto Unit 42, Microsoft
              Defender, SentinelOne).
            </p>
            <p>
              <strong className="text-[#F2F4F5]">The defense-industrial base is hiring software
              engineers as cyber operators.</strong> Anduril, Shield AI, Saronic, Helsing, Skydio,
              Vannevar Labs, Scale AI — these are software companies first. They hire from the
              same talent pool as Big Tech. The salary delta has narrowed dramatically since
              2022. The work satisfaction delta (mission, novelty, agency) has widened.
            </p>
            <p>
              <strong className="text-[#F2F4F5]">Pure software bug-hunting and AppSec roles
              still exist and pay well</strong> — see <Link href="/learn/cyber/hackerone" className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5]">/learn/cyber/hackerone</Link>. The
              point isn&apos;t that everyone needs to go to a defense contractor. The point is that
              the field is much wider than &ldquo;web pentest&rdquo; in 2026.
            </p>
            <p>
              <strong className="text-[#F2F4F5]">The legal posture for civilians remains
              tight.</strong> None of the above changes the rules in{" "}
              <Link href="/learn/cyber/legal" className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5]">/learn/cyber/legal</Link>. A
              US civilian still cannot legally launch offensive cyber actions against any target.
              The expanded landscape is for legitimate jobs · the laws haven&apos;t bent.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20">
          <h2 className="text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            Public sources to read directly
          </h2>
          <p className="mt-5 text-base leading-[1.7] text-[#C8CCCE]">
            Every claim above traces back to a public document. Skip the secondary commentary and
            read the primary material.
          </p>
          <ul className="mt-7 space-y-3">
            {PUBLIC_DOCTRINE.map((s) => (
              <li key={s.name} className="rounded-xl border border-[#1A2225] bg-[#0A0F11] p-4">
                <a href={s.url} target="_blank" rel="noopener" className="block">
                  <p className="mt-1 text-base text-[#F2F4F5] underline decoration-[#22F0D5]/30 underline-offset-4 hover:decoration-[#22F0D5]">{s.name}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/learn/cyber/llm-warfare" className="rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] hover:bg-[#22F0D5]/20">
              how LLMs fight →
            </Link>
            <Link href="/learn/cyber/platforms" className="rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] hover:bg-[#22F0D5]/20">
              the platforms →
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
