import type { Metadata } from "next";
import Link from "next/link";
import { CyberHeroImage } from "../_components/CyberHeroImage";

const ACCENT = "#22F0D5";

const PLATFORMS = [
  {
    name: "Palantir",
    ticker: "PLTR · NASDAQ",
    founded: "2003",
    body: "Probably the single most-discussed software company in modern defense. Two original product lines: Gotham (intelligence/defense, used at IC and DoD scale since the early Iraq war era) and Foundry (commercial enterprise data platform). In 2023 Palantir launched AIP — the Artificial Intelligence Platform — which integrates LLMs into both Gotham and Foundry workflows. In May 2024 Palantir won the Maven Smart System (formerly Project Maven) prime contractor role from DoD ($153M+ in initial reporting, expanded substantially in 2024-2025 follow-on awards). The company also supplied software to Ukraine through the war. CEO Alex Karp has been publicly outspoken on the company's mission and political posture. Stock: PLTR on NASDAQ.",
    products: ["Gotham — intelligence/defense data platform", "Foundry — commercial enterprise data platform", "AIP — Artificial Intelligence Platform (LLM integration layer, 2023)", "Maven Smart System — DoD program prime contractor (2024)"],
    use: "US Army, US Air Force, US Navy, US Marine Corps, US Cyber Command, IC components, Ukraine MoD, commercial enterprises (Airbus, BP, Morgan Stanley, others publicly disclosed).",
    url: "https://www.palantir.com",
  },
  {
    name: "Anduril Industries",
    ticker: "Private (Series F, valued $14B+ as of 2024)",
    founded: "2017",
    body: "Founded by Palmer Luckey (Oculus founder) after his departure from Facebook in 2017. Vertically-integrated defense product company: software platform (Lattice OS) + hardware (drones, autonomous vehicles, towers, counter-UAS). The publicly stated philosophy is 'build the products, then sell them' rather than the cost-plus contract model. In 2024 Anduril and General Atomics won the US Air Force CCA (Collaborative Combat Aircraft) program contracts.",
    products: ["Lattice OS — AI-driven command & control software platform", "Ghost — autonomous surveillance UAV", "ALTIUS — loitering munition family", "Bolt — handheld kamikaze drone", "Roadrunner — VTOL counter-UAS interceptor", "Sentry Tower — autonomous surveillance tower", "Dive-LD — autonomous underwater vehicle", "Fury — CCA (Collaborative Combat Aircraft) candidate"],
    use: "US Customs and Border Protection, US Special Operations Command, US Air Force CCA program, UK Royal Navy (RWS contract), Australia (Ghost Shark autonomous submarine).",
    url: "https://www.anduril.com",
  },
  {
    name: "Shield AI",
    ticker: "Private (Series F, ~$5B valuation per 2024 public reporting)",
    founded: "2015",
    body: "Founder Brandon Tseng (Navy SEAL veteran) + Ryan Tseng. Core product: Hivemind — AI pilot software for autonomous flight without GPS or operator data link. Hardware: V-BAT VTOL UAV. Combat-deployed in Ukraine and Israel per public reporting. Recently won contracts for autonomous F-16 (in partnership with the Air Force VENOM program).",
    products: ["Hivemind — autonomous flight AI", "V-BAT — VTOL UAV platform", "MQ-35A V-BAT block 2 — DoD program-of-record variant"],
    use: "US Marine Corps (V-BAT), US Coast Guard, Israeli MoD, Ukrainian forces (per public reporting).",
    url: "https://shield.ai",
  },
  {
    name: "Saronic Technologies",
    ticker: "Private (Series B, $4B valuation per public reporting late 2024)",
    founded: "2022",
    body: "Maritime autonomous surface vessel (ASV) company. Three product lines as of mid-2026 public material: Spyglass (small, fast), Cutlass (medium), Corsair (larger). Named in DoD Replicator-1 initiative. Substantial growth from $0 to multibillion valuation in under 30 months reflects DoD's maritime autonomy procurement push (China pacing threat in the Indo-Pacific).",
    products: ["Spyglass — small autonomous surface vessel", "Cutlass — medium ASV", "Corsair — large ASV"],
    use: "US Navy, US Marine Corps, Replicator-1.",
    url: "https://www.saronic.com",
  },
  {
    name: "Helsing",
    ticker: "Private (Series C, €4.95B valuation per 2024 public reporting)",
    founded: "2021 (Germany)",
    body: "European AI defense software company. Backed by Spotify founder Daniel Ek's Prima Materia. Publicly supplied AI software to Ukraine. Released Centaur (AI software pairing with the Eurofighter Typhoon) and HX-2 strike drones in 2024. Substantial role in the post-2022 European defense rearmament narrative.",
    products: ["Helsing Centaur — AI software for crewed combat aircraft", "HX-2 — strike drone", "AI defense software platform (general)"],
    use: "Germany, UK, France, Ukraine, Estonia (publicly disclosed).",
    url: "https://helsing.ai",
  },
  {
    name: "Vannevar Labs",
    ticker: "Private (Series C 2024, growth round)",
    founded: "2019",
    body: "OSINT + signals intelligence software for national security customers. Named after Vannevar Bush (Director of US Office of Scientific Research and Development during WWII, foundational figure in postwar US science policy). Specializes in non-English OSINT and multilingual collection at scale.",
    products: ["Decrypt — OSINT collection platform", "platform suite for collection, processing, analysis"],
    use: "US IC, DoD components, allied IC partners.",
    url: "https://www.vannevarlabs.com",
  },
  {
    name: "Skydio",
    ticker: "Private (Series E, $2.2B valuation per 2024 reporting)",
    founded: "2014",
    body: "US-based autonomous drone manufacturer. After the 2020s elimination of DJI Mavic from many DoD programs, Skydio became the largest US-based drone supplier to US government customers. Skydio X10 is the current flagship.",
    products: ["X10 — flagship enterprise drone", "X2 — enterprise drone (legacy)", "Skydio Connect — fleet management"],
    use: "US Army, US Air Force, US Navy, hundreds of federal/state/local agencies.",
    url: "https://www.skydio.com",
  },
  {
    name: "Scale AI",
    ticker: "Private (Series F, $13.8B valuation 2024)",
    founded: "2016",
    body: "Started as data-labeling for ML training (commercial). Pivoted heavily into defense in 2022-2024 with Scale Defense and the Donovan platform — an LLM-powered analyst assistant for defense customers. In 2024 Scale won contracts with DoD's Chief Digital and AI Office (CDAO) and the Army for AI training data infrastructure.",
    products: ["Donovan — defense LLM platform", "Scale Defense — labeling + curation for defense ML", "Scale GenAI Platform — commercial RAG/LLM infrastructure"],
    use: "DoD CDAO, US Army, US Air Force, OpenAI/Anthropic/Meta (commercial labeling).",
    url: "https://scale.com",
  },
  {
    name: "AeroVironment",
    ticker: "AVAV · NASDAQ",
    founded: "1971",
    body: "Long-running US drone manufacturer. Switchblade 300 (anti-personnel loitering munition) and Switchblade 600 (anti-armor) are the canonical US loitering munitions used by US forces and supplied to Ukraine in large numbers since 2022. Acquired BlueHalo in 2025 (per public M&A reporting) substantially expanding the company's surface area.",
    products: ["Switchblade 300 — anti-personnel loitering munition", "Switchblade 600 — anti-armor loitering munition", "Puma — small tactical UAV", "Jump 20 — vertical-takeoff long-endurance UAV"],
    use: "US Army, US Marine Corps, Ukraine, allied militaries globally.",
    url: "https://www.avinc.com",
  },
  {
    name: "C3.ai",
    ticker: "AI · NYSE",
    founded: "2009 (originally C3 Energy)",
    body: "Enterprise AI software platform. Substantial defense vertical including C3 AI Defense and Intelligence suite. CEO Tom Siebel publicly active in DoD AI conversations. Customer disclosures include US Air Force, US Missile Defense Agency, US Department of Defense components.",
    products: ["C3 AI Platform — general enterprise AI platform", "C3 AI Defense and Intelligence — defense vertical"],
    use: "USAF, MDA, DoD, energy + manufacturing enterprises.",
    url: "https://c3.ai",
  },
];

const RUNNERS_UP = [
  { name: "Primer AI", body: "Defense + IC NLP platform; long-standing IC customer base." },
  { name: "ECS Federal / Govini / RAFT", body: "Defense procurement and contracting analytics layer." },
  { name: "True Anomaly", body: "Space domain awareness software + spacecraft; younger entrant." },
  { name: "Epirus", body: "Counter-electronics directed-energy systems (Leonidas high-power microwave)." },
  { name: "Hadrian Automation", body: "Robotic precision-machining for defense supply chain." },
  { name: "Fortem Technologies", body: "Counter-UAS radar + interceptor systems." },
  { name: "Rebellion Defense", body: "ML for defense workflows; UK + US." },
  { name: "Hawkeye 360", body: "RF geolocation from satellites — commercial SIGINT." },
];

export const metadata: Metadata = {
  title: "Palantir, Anduril, Shield AI · the platforms running modern defense · /learn/cyber/platforms · AtomEons",
  description:
    "Palantir Gotham / Foundry / AIP / Maven Smart System. Anduril Lattice / ALTIUS / Bolt / Roadrunner / Fury. Shield AI Hivemind / V-BAT. Saronic, Helsing, Vannevar Labs, Skydio, Scale AI Donovan, AeroVironment Switchblade, C3.ai. What's deployed, who uses it, what stock ticker, what each one is for. Public info only. CC-BY 4.0.",
  keywords: [
    "Palantir Gotham",
    "Palantir Foundry",
    "Palantir AIP",
    "Maven Smart System",
    "Anduril Lattice",
    "Anduril Roadrunner",
    "Anduril Bolt",
    "Shield AI Hivemind",
    "V-BAT",
    "Saronic Spyglass",
    "Helsing Centaur",
    "Switchblade 600",
    "Scale AI Donovan",
    "Skydio X10",
    "Vannevar Labs Decrypt",
  ],
  alternates: { canonical: "https://atomeons.com/learn/cyber/platforms" },
  robots: { index: true, follow: true },
};

export default function CyberPlatformsPage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "The platforms running modern defense — Palantir, Anduril, Shield AI, more",
    "description": "Public-info catalog of the actual software + hardware platforms running modern US and allied defense operations as of mid-2026.",
    "datePublished": "2026-06-01",
    "author": { "@type": "Organization", "name": "AtomEons Systems Laboratory" },
    "publisher": { "@type": "Organization", "name": "AtomEons", "url": "https://atomeons.com" },
    "license": "https://creativecommons.org/licenses/by/4.0/",
    "isAccessibleForFree": true,
  };

  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <CyberHeroImage slug="platforms" alt={"Architectural shot of a dark glass-and-steel control-room wall with faint cyan reflected highlights."} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn/cyber" className="hover:text-[#22F0D5]">Cyber</Link>{" "}
          <span className="text-[#1A2225]">/</span> Platforms
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-14 md:py-20">
          <h1 className="mt-6 text-balance text-4xl font-medium leading-[1] tracking-tight md:text-6xl">
            Palantir.{" "}
            <span style={{ color: ACCENT }}>Anduril.</span>{" "}
            Shield AI.{" "}
            <span style={{ color: ACCENT }}>And the eight others you should know.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-base leading-[1.75] text-[#C8CCCE] md:text-[17px]">
            Most cybersecurity courses skip this entirely. They teach the certifications and the
            theoretical landscape · they don&apos;t name the actual companies whose software is
            running US and allied operations right now. That gap is fixable in 15 minutes of
            reading.
          </p>
          <p className="mt-5 max-w-3xl text-base leading-[1.7] text-[#C8CCCE]">
            What follows: ten companies that matter as of mid-2026. What they make. Who uses
            their stuff. What their stock ticker is if they&apos;re public. All sourced from
            public material (company press releases, DoD contract awards, public earnings
            transcripts, Reuters / FT / WSJ reporting). No insider claims, no speculation.
          </p>
        </div>
      </section>

      <section className="border-b border-[#1A2225] bg-[#08090B]/15">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20">
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            The platforms.
          </h2>
          <div className="mt-8 space-y-6">
            {PLATFORMS.map((p) => (
              <article key={p.name} className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-7 md:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="text-3xl font-semibold tracking-tight text-[#F2F4F5]">{p.name}</h3>
                  <a href={p.url} target="_blank" rel="noopener" className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
                    official ↗
                  </a>
                </div>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7]">{p.ticker} · founded {p.founded}</p>
                <p className="mt-5 text-[15px] leading-[1.7] text-[#C8CCCE]">{p.body}</p>

                <div className="mt-5">
                  <ul className="mt-2 space-y-1 text-[14px] leading-[1.6] text-[#C8CCCE]">
                    {p.products.map((prod, i) => (
                      <li key={i}>· {prod}</li>
                    ))}
                  </ul>
                </div>

                <p className="mt-5 text-[14px] leading-[1.6] text-[#9BA5A7]">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>::publicly disclosed customers · </span>
                  {p.use}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20">
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            The next layer down.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-[1.7] text-[#C8CCCE]">
            Smaller scale or narrower domain · still worth a name-recognition pass.
          </p>
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {RUNNERS_UP.map((r) => (
              <div key={r.name} className="rounded-xl border border-[#1A2225] bg-[#0A0F11] p-5">
                <p className="text-base font-semibold text-[#F2F4F5]">{r.name}</p>
                <p className="mt-2 text-sm leading-[1.65] text-[#9BA5A7]">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1A2225] bg-[#08090B]/15">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20">
          <h2 className="text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            How to actually break into one of these
          </h2>
          <ol className="mt-7 space-y-5 text-base leading-[1.75] text-[#C8CCCE]">
            <li className="flex gap-4">
              <span className="font-mono text-2xl font-bold" style={{ color: ACCENT }}>01</span>
              <span>
                <strong className="text-[#F2F4F5]">All of them have engineering careers pages.</strong>{" "}
                Anduril, Palantir, Shield AI, Saronic, Helsing, Scale, Skydio — every one of them
                lists open roles publicly. They are aggressively hiring software engineers,
                ML engineers, security engineers, cyber operators, hardware engineers.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="font-mono text-2xl font-bold" style={{ color: ACCENT }}>02</span>
              <span>
                <strong className="text-[#F2F4F5]">US person + clearable is the typical floor</strong>{" "}
                for the defense-facing roles. Some commercial-facing roles (Palantir Foundry
                commercial, Scale&apos;s commercial side) don&apos;t require it. Read the JD.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="font-mono text-2xl font-bold" style={{ color: ACCENT }}>03</span>
              <span>
                <strong className="text-[#F2F4F5]">The intern + new-grad pipelines are real.</strong>{" "}
                Anduril, Palantir, Scale, Shield AI all run formal university recruiting. If
                you&apos;re a college student interested in this, apply.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="font-mono text-2xl font-bold" style={{ color: ACCENT }}>04</span>
              <span>
                <strong className="text-[#F2F4F5]">Build a side project that demonstrates
                competence.</strong> A working OSINT tool · a published CVE · a contribution to
                an open-source ML defense project · a HackerOne reputation. The portfolio + the
                cover letter explaining why this mission and not another beats every &ldquo;college
                GPA + good interview&rdquo; combo without it.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="font-mono text-2xl font-bold" style={{ color: ACCENT }}>05</span>
              <span>
                <strong className="text-[#F2F4F5]">Decide your ethical bright lines before you
                apply.</strong> The work at these companies is meaningful and is sometimes hard.
                Knowing in advance what you will and will not do is the gift to your future self.
                Re-read{" "}
                <Link href="/learn/cyber/llm-warfare" className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5]">/learn/cyber/llm-warfare</Link>{" "}
                ethics section before you sign.
              </span>
            </li>
          </ol>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/learn/cyber/serve" className="rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] hover:bg-[#22F0D5]/20">
              military + federal paths →
            </Link>
            <Link href="/learn/cyber/llm-warfare" className="rounded-full border border-[#1A2225] bg-[#0A0F11] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#C8CCCE] hover:border-[#22F0D5]/40 hover:text-[#22F0D5]">
              how LLMs fight →
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
