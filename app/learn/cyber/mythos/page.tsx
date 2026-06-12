import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mythos · the defense-tech doctrine · Palantir · Anduril · the new primes",
  description:
    "How the Western defense industrial base got rebuilt by Silicon Valley intensity. Palantir's Gotham + Foundry + AIP. Anduril's Lattice + Sentry + Ghost + Bolt + Roadrunner. The Karp doctrine. The Luckey doctrine. How to actually use these cyber + data + autonomy models. Public-info only.",
  alternates: { canonical: "https://atomeons.com/learn/cyber/mythos" },
  openGraph: {
    title: "Mythos · the defense-tech doctrine",
    description:
      "Palantir + Anduril + the new defense primes · cyber + data + autonomy models · how to use them properly.",
    url: "https://atomeons.com/learn/cyber/mythos",
    type: "article",
  },
};

/**
 * /learn/cyber/mythos — the defense-tech mythos.
 *
 * Per operator brief 2026-06-06: a whole page on "mythos" covering
 * Palantir + Anduril + the new defense primes + the doctrine that
 * unites them. Public-info only (no tradecraft, no classified, no
 * model assignments). Designed to be the operator-grade primer on
 * the cyber + data + autonomy stack that's rebuilding the Western
 * defense base.
 */

const PALANTIR_PRODUCTS = [
  { name: "Gotham", year: "2008", what: "Government intelligence + national-security data integration platform. Originally built for the CIA via In-Q-Tel funding. Operates across classification levels with cross-domain solutions. Used by US DoD, intelligence community, NATO partners, Ukraine, Israel.", how_used: "Analyst-grade fusion of disparate intel sources · entity-resolution graph · forward-deployed engineers (FDEs) embed with the customer's mission team for months." },
  { name: "Foundry", year: "2016", what: "Commercial-grade data operating system. Same engine core as Gotham, deployed for Fortune 500s and healthcare systems. Ontology-driven · low-code/no-code analyst tools layered on a granular access control kernel.", how_used: "Customer migrates their data + business logic into Foundry · uses Pipeline Builder + Object Explorer + Quiver for analytics · enterprise users get a unified ontology view across all data sources." },
  { name: "Apollo", year: "2019", what: "Continuous-deployment platform that ships Gotham + Foundry into classified + commercial environments simultaneously. Single binary across air-gapped clouds, SCIFs, US commercial cloud, allied government clouds.", how_used: "Solves the multi-environment delivery problem that destroys most enterprise software vendors at the government scale. Same code, same release, every environment, daily." },
  { name: "AIP (Artificial Intelligence Platform)", year: "2023", what: "LLM orchestration layer over Foundry's ontology. Lets analysts use natural language to query the ontology + invoke actions on real-world objects. Anthropic Claude, OpenAI GPT, Llama, Mistral all wireable.", how_used: "AIP Logic for prompt chains · AIP Threads for chat · AIP Bootcamps (5-day intensives with FDEs) for customer onboarding. The flagship Palantir 2023+ go-to-market motion." },
  { name: "MetaConstellation", year: "2022", what: "Real-time satellite tasking + earth-observation analytics layer. Lets commanders task imaging satellites + run change-detection AI on the results in the same workflow.", how_used: "First publicly shown during Russia's invasion of Ukraine. Ukrainian commanders use it for ISR · target queue management · damage assessment." },
];

const ANDURIL_PRODUCTS = [
  { name: "Lattice OS", year: "2017", what: "Sensor-fusion + autonomy software stack. Ingests data from radars · cameras · drones · towers · subs · third-party feeds · presents one common operating picture. The Anduril central nervous system; every other product extends Lattice.", how_used: "Subscription per-seat · per-sensor · integrates customer-owned Lockheed/Raytheon/Northrop systems via open APIs · Foundryverse + Lattice integration announced 2024 for joint Palantir-Anduril deployments." },
  { name: "Sentry Tower", year: "2018", what: "Solar-powered autonomous surveillance tower · multi-camera + radar + ML detection · deployed on US southern border + DoD perimeter defense + Defense forces.", how_used: "Replaces 24/7 human-in-tower watch · ML classifier reduces false positives · operator monitors the alert queue not the raw feeds." },
  { name: "Ghost", year: "2019", what: "Vertical-takeoff autonomous aircraft for short-range ISR + payload delivery · electric · stealth profile · ~24-hour endurance variant.", how_used: "Marine + Army drone squadrons · counter-UAS · search & rescue · target acquisition for indirect fires." },
  { name: "ALTIUS", year: "2020", what: "Air-launched effects (ALE) family · small drones launched from aircraft, helicopters, or vehicles for swarm reconnaissance + decoy + light-strike missions.", how_used: "Army FLRAA + FARA programs · launched mid-flight from a host aircraft · operates in formation via Lattice." },
  { name: "Roadrunner", year: "2024", what: "Reusable autonomous counter-UAS munition. Launches like a missile, intercepts threats with onboard AI, returns to base if no target found. Solves the cost-asymmetry of using $500K Patriots against $500 drones.", how_used: "Co-located with critical infrastructure / FOBs · automatic engagement via Lattice's threat triage · per-engagement cost ~5% of legacy interceptors." },
  { name: "Bolt-M", year: "2025", what: "Munition variant · loitering attack drone · adapted for Army low-altitude attack · electric · backpack-portable.", how_used: "Army's Project Replicator-funded autonomous attritable systems · operator picks the target via tablet · onboard ML handles the terminal phase." },
];

const KARP_DOCTRINE = [
  "Software companies should embed with mission teams, not sell licenses to procurement. Palantir's FDE (forward-deployed engineer) model embeds Stanford/MIT engineers in customer offices for 6-12 months.",
  "Defense work is morally serious, not morally fraught. Karp's 2024 book The Technological Republic argues Western tech companies betrayed the social contract by refusing DoD work.",
  "Speed matters more than feature parity. Palantir ships against legacy primes by being 18 months faster, not 18 months better-spec'd.",
  "The 'ontology' is the moat. Once a customer migrates their entire data model into Foundry, switching cost grows quarterly. Karp calls this 'data gravity.'",
  "Anti-LLM-substitution stance: AIP makes Palantir more sticky, not more replaceable. The LLM is a UI layer over the ontology; the ontology is the value.",
  "Per Karp 2024 earnings calls: 'We are at a place in our history where the United States needs a technological renaissance, and we are part of leading it.'",
];

const LUCKEY_DOCTRINE = [
  "Defense should be hardware-first, software-second. Most of the new defense base is software companies (Palantir, Shield AI). Anduril built the hardware factory deliberately to differentiate.",
  "Build the factory before the customer. Anduril's Mississippi factory + Costa Mesa HQ scaled before contracts — inverting the legacy prime cost-plus model.",
  "Compete on price + speed, not just spec. Roadrunner ships against Patriot at ~5% the per-engagement cost. The asymmetry IS the strategy.",
  "Vertical integration. Anduril does its own propulsion, batteries, computers, AI models, and manufacturing. Not because outsourcing is wrong but because the supply chain IS the bottleneck.",
  "Don't romanticize defense culture. Luckey hires Oculus + Skunk Works alumni · pays Silicon Valley rates · works absurd hours · ships software-company style.",
  "Per Luckey: 'I want to give the US military the kind of capabilities that you'd only see in a science fiction movie. And then I want to do it at a price point that's affordable.'",
];

const PARTNERSHIP = [
  "2024 · Palantir + Anduril announce strategic partnership · Foundry + Lattice federation · joint deployments to allied governments.",
  "Foundryverse = Palantir's ontology layer; Latticeverse = Anduril's sensor + autonomy layer. Customers can subscribe to both, with one identity model + shared classification controls.",
  "Joint Replicator program proposals · DoD's 2027 autonomous-systems initiative · both companies + Shield AI + Skydio + others form 'New Defense' coalition.",
  "Cultural overlap: both companies hire heavily from each other's alumni network. Stanford / MIT / Oculus / SpaceX / late-Google engineers cycle through both.",
  "Strategic tension: Anduril makes hardware Palantir would prefer to commoditize; Palantir builds AIP atop Lattice data without controlling the sensors. The federation is uneasy but mutually accretive.",
];

const CYBER_MODELS_USED = [
  { what: "Multi-domain ontology", who: "Palantir Foundry", how: "All organization data flows into one entity-relationship graph; downstream analytics + AI all consume the ontology rather than raw tables." },
  { what: "Forward-deployed engineering", who: "Palantir", how: "FDEs (forward-deployed engineers) embed with customer for 6-18 months · build the initial ontology + train customer team · then hand off." },
  { what: "Sensor fusion + edge AI", who: "Anduril Lattice", how: "Ingest disparate sensors at the edge · run ML classification on-device or on-near-edge nodes · only push high-confidence events to the central operating picture." },
  { what: "Air-gapped continuous delivery", who: "Palantir Apollo", how: "Single deployment pipeline ships into SCIFs + commercial cloud + air-gapped customer infrastructure simultaneously. Same release on the same day everywhere." },
  { what: "Common Operating Picture (COP)", who: "Both", how: "Doctrinal target: one screen, one entity graph, one threat queue. Replaces the legacy 'one tab per system' analyst workflow." },
  { what: "Federated identity + classification", who: "Both via partnership", how: "Identity + role + classification level enforced in the data layer · not in the UI · so a junior analyst literally cannot see classified objects even if they request them via API." },
  { what: "Attritable autonomy", who: "Anduril Roadrunner + Bolt-M + ALTIUS", how: "Design assumption: drones will be lost. Build cheap, deploy in swarms, engagement-cost-per-target drops by 95%." },
];

const COMPETITORS_LEGACY = [
  { name: "Lockheed Martin", role: "Largest US prime · F-35 · Aegis · classical aerospace + defense + space.", model: "Cost-plus contracts · 10-30 year programs · pre-1990s industrial model · acquires startups instead of building." },
  { name: "Raytheon (now RTX)", role: "Missile systems · sensors · cyber (Forcepoint until spin-off).", model: "Same cost-plus model · acquires Pratt & Whitney + Collins · cyber arm now standalone." },
  { name: "Northrop Grumman", role: "Space + autonomous systems · B-21 Raider · Triton drone.", model: "Cost-plus · long programs · acquired Orbital Sciences." },
  { name: "General Dynamics", role: "Mission systems + IT services + ship/sub builds.", model: "GDIT cyber + IT services arm · CSRA acquisition." },
  { name: "L3Harris", role: "Communications + EW + space.", model: "Heritage of multiple mergers · niche-leadership-by-acquisition strategy." },
  { name: "Booz Allen Hamilton", role: "Cyber + intel consulting · ~80% federal revenue.", model: "Bodies-against-contracts · staff augmentation · acquires AI startups (TraceLink etc) but commercial integration is patchy." },
];

const COMPETITORS_NEW = [
  { name: "Shield AI", role: "Autonomous flight stack · Hivemind · counter-CCP narrative.", model: "Software-first autonomy · partners with airframe builders · founded 2015 by Brandon Tseng + Brandon Tseng." },
  { name: "Skydio", role: "Enterprise drones · DoD Blue UAS approved.", model: "Originally consumer drones · pivoted to enterprise + defense after DJI national-security concerns." },
  { name: "Saronic", role: "Autonomous surface vessels (USVs).", model: "Maritime equivalent of Anduril · Texas-based · raised on Replicator demand." },
  { name: "Vannevar Labs", role: "Foreign-language NLP + open-source intelligence.", model: "Anti-China linguistic intel · founded by former CIA analysts." },
  { name: "Helsing", role: "European-defense AI + Lithuania + Germany + UK.", model: "Munich-based · works the European defense ministries · roughly the Palantir of EU." },
  { name: "Scale AI", role: "Data labeling + AI infrastructure for defense + commercial.", model: "Defense Llama + Defense GPT contracts · sells data ops as a service to Anduril + Palantir + DoD direct." },
];

const HOW_TO_USE_THEM = [
  "If you're a customer · don't sign a multi-year master service agreement with a legacy prime when a 6-month FDE engagement with Palantir or Anduril delivers shipped software in the same timeframe.",
  "If you're a student · the new defense base hires from CS + ML + systems engineering · not from defense industry. Apply to Palantir FDE program or Anduril engineering directly out of school.",
  "If you're a builder · the gap is in the layer ABOVE Lattice + Foundry · not parallel to them. Build domain-specific apps that consume Lattice events or Foundry ontologies via their public APIs.",
  "If you're a competitor · don't try to out-spec the new primes on features. Match their speed-to-deploy first. Speed-to-deploy is the moat, not the feature list.",
  "If you're a journalist · the heroic narrative is genuine + earned + dangerous. Don't lazily reduce the new primes to either 'savior of America' or 'authoritarian surveillance pipeline.' Both narratives are too tidy.",
  "If you're a CISO at a non-defense company · Foundry-class ontology platforms are now in your reach via Foundry commercial tier OR open-source alternatives (Apache Iceberg + DBT + custom RBAC). The capability is no longer defense-exclusive.",
];

export default function MythosPage() {
  return (
    <main className="min-h-screen text-[#F4F4F2]">
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF]">§ cyber · mythos · defense-tech doctrine</p>
          <h1 className="mt-6 font-serif text-[44px] font-light leading-[1.04] tracking-[-0.025em] md:text-[64px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            The defense-tech mythos.
          </h1>
          <p className="speakable-answer mt-6 max-w-3xl font-serif text-[18px] leading-[1.55] text-[#9CA3AF] md:text-[20px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Two companies — Palantir and Anduril — rebuilt the Western
            defense industrial base in software-company time. This page
            collects what they actually ship, what their leaders
            actually say, and how their cyber + data + autonomy models
            work in practice. Public information only. No tradecraft.
            No model assignments. No classified detail.
          </p>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ Palantir Technologies · founded 2003</p>
          <p className="mt-6 max-w-3xl font-serif text-[16px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Co-founders: Peter Thiel · Alex Karp · Joe Lonsdale · Stephen
            Cohen · Nathan Gettings. CEO: Alex Karp. Headquarters: Denver
            (since 2020 move from Palo Alto). ~$2.4B revenue (2024). Five
            core products:
          </p>
          <ol className="mt-10 space-y-8">
            {PALANTIR_PRODUCTS.map((p) => (
              <li key={p.name} className="border-l-2 border-[#1F242B] pl-6">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h2 className="font-serif text-[26px] font-light text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{p.name}</h2>
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5]">launched {p.year}</p>
                </div>
                <p className="mt-3 font-serif text-[15px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{p.what}</p>
                <p className="mt-3 font-serif text-[14px] italic leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>How customers use it · {p.how_used}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ The Karp doctrine</p>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[#7a818a]">Six operating principles from public statements + the 2024 book "The Technological Republic"</p>
          <ol className="mt-10 space-y-5">
            {KARP_DOCTRINE.map((k, i) => (
              <li key={i} className="flex items-baseline gap-4 border-b border-[#1F242B] pb-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a]">{String(i + 1).padStart(2, "0")}</span>
                <p className="font-serif text-[16px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{k}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ Anduril Industries · founded 2017</p>
          <p className="mt-6 max-w-3xl font-serif text-[16px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Founder + CEO: Palmer Luckey (post-Oculus exit). Co-founders:
            Trae Stephens · Matt Grimm · Brian Schimpf · Joe Chen.
            Headquarters: Costa Mesa, CA. Manufacturing: Mississippi
            (Arsenal-1, opening 2026). Backed by Founders Fund + Andreessen
            Horowitz + General Catalyst. ~$1B+ revenue (2024). Six
            product lines:
          </p>
          <ol className="mt-10 space-y-8">
            {ANDURIL_PRODUCTS.map((p) => (
              <li key={p.name} className="border-l-2 border-[#1F242B] pl-6">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h2 className="font-serif text-[26px] font-light text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{p.name}</h2>
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5]">launched {p.year}</p>
                </div>
                <p className="mt-3 font-serif text-[15px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{p.what}</p>
                <p className="mt-3 font-serif text-[14px] italic leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>How customers use it · {p.how_used}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ The Luckey doctrine</p>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[#7a818a]">Six operating principles from public talks + Anduril company posts</p>
          <ol className="mt-10 space-y-5">
            {LUCKEY_DOCTRINE.map((k, i) => (
              <li key={i} className="flex items-baseline gap-4 border-b border-[#1F242B] pb-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a]">{String(i + 1).padStart(2, "0")}</span>
                <p className="font-serif text-[16px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{k}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C9A55C]">§ The Foundryverse / Latticeverse partnership</p>
          <ol className="mt-10 space-y-5">
            {PARTNERSHIP.map((p, i) => (
              <li key={i} className="flex items-baseline gap-4 border-b border-[#1F242B] pb-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C9A55C]">{String(i + 1).padStart(2, "0")}</span>
                <p className="font-serif text-[16px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ The cyber + data + autonomy models they pioneered</p>
          <ul className="mt-10 divide-y divide-[#1F242B]">
            {CYBER_MODELS_USED.map((m, i) => (
              <li key={i} className="grid gap-2 py-5 md:grid-cols-[260px_180px_1fr]">
                <p className="font-serif text-[18px] font-medium text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{m.what}</p>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5]">{m.who}</p>
                <p className="font-serif text-[14px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{m.how}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF4D4D]">§ The legacy primes they compete against</p>
          <p className="mt-4 max-w-3xl font-serif text-[15px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Six legacy defense primes · still the largest contractors by
            revenue · running cost-plus contract models from the 1980s.
          </p>
          <ul className="mt-10 divide-y divide-[#1F242B]">
            {COMPETITORS_LEGACY.map((c, i) => (
              <li key={i} className="grid gap-3 py-5 md:grid-cols-[200px_1fr_1.2fr]">
                <p className="font-serif text-[18px] font-medium text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{c.name}</p>
                <p className="font-serif text-[14px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{c.role}</p>
                <p className="font-serif text-[13px] italic leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>Model · {c.model}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ The other new primes in the coalition</p>
          <ul className="mt-10 divide-y divide-[#1F242B]">
            {COMPETITORS_NEW.map((c, i) => (
              <li key={i} className="grid gap-3 py-5 md:grid-cols-[200px_1fr_1.2fr]">
                <p className="font-serif text-[18px] font-medium text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{c.name}</p>
                <p className="font-serif text-[14px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{c.role}</p>
                <p className="font-serif text-[13px] italic leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>Model · {c.model}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ How to actually use these models</p>
          <ol className="mt-10 space-y-5">
            {HOW_TO_USE_THEM.map((h, i) => (
              <li key={i} className="flex items-baseline gap-4 border-b border-[#1F242B] pb-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">{String(i + 1).padStart(2, "0")}</span>
                <p className="font-serif text-[16px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{h}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <div className="border-l-2 border-[#C9A55C] bg-[#0B0C0F] p-6 md:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C9A55C]">§ public-info covenant</p>
            <p className="mt-4 font-serif text-[15px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
              Every claim on this page is sourced from publicly available
              filings (10-K, S-1, S-4), public talks (TED · Doha Forum ·
              Reagan Defense Forum), company blog posts, named-source
              press reports (WSJ · NYT · Bloomberg · Forbes · Wired), or
              public earnings calls. No classified information. No model
              assignments. No specific deployment locations beyond what
              the companies themselves have published. If a fact on this
              page is in error, email atom@atomeons.com.
            </p>
          </div>

          <div className="mt-12 grid gap-3 md:grid-cols-4">
            {[
              { href: "/learn/cyber/models", label: "Industry cyber models" },
              { href: "/learn/cyber/karp", label: "Karp profile" },
              { href: "/learn/cyber/luckey", label: "Luckey profile" },
              { href: "/learn/cyber", label: "Cyber index" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="group border border-[#1F242B] bg-[#0F1114] p-4 transition-colors hover:border-[#22F0D5]">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a] transition-colors group-hover:text-[#22F0D5]">atomeons.com{l.href}</p>
                <p className="mt-2 font-serif text-[15px] font-medium" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{l.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
