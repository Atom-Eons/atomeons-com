import type { Metadata } from "next";
import Link from "next/link";
import { BrainwaveBandsDiagram } from "../_components/V3/TeachableGraphics";

/**
 * /mindrest · LEGAL cognitive + body optimization · adaptogens-first.
 *
 * Wave 44 · 2026-06-06 · operator brief: "remove illegal shit, I'm on
 * probation from the drugs section, build out NAD+ and ginseng and
 * lion's mane, turkey tail etc · all the adaptogens and little-known
 * superpower supplements · senolytic Einstein cycles, etc · optimize
 * people too."
 *
 * REMOVED THIS WAVE: cannabis · kratom · amanita · salvia · nitrous ·
 * kava (liver risk) · nicotine. The state-dependent + gray-area
 * pharmacology section is GONE.
 *
 * ADDED THIS WAVE:
 *   - NAD+ precursors (NMN, NR) + sirtuin-activating compounds
 *   - 10 adaptogens (lion's mane · turkey tail · ginseng · reishi ·
 *     cordyceps · chaga · ashwagandha · rhodiola · holy basil · maca)
 *   - Senolytic protocols (fisetin · quercetin · spermidine)
 *   - Einstein cycles (intermittent fasting + metabolic flexibility)
 *   - Sleep + light + cold + sauna optimization stack
 *
 * Mom's Law: every entry sourced or qualified · "not medical advice"
 * stamp · linked to PubMed where reasonable.
 */

export const metadata: Metadata = {
  title: "Mindrest · Brainwave entrainment + adaptogens + optimization",
  description:
    "Mindrest · the lab's cognitive + body optimization surface. 8-mode audiovisual entrainment (binaural beats + ocean swell + breath guide · in-browser). Plus the adaptogen + nootropic + senolytic playbook · NAD+ · lion's mane · turkey tail · ginseng · reishi · cordyceps · ashwagandha · rhodiola · fisetin · Einstein cycles. Legal · sourced · honest.",
  alternates: { canonical: "https://atomeons.com/mindrest" },
  openGraph: {
    title: "Mindrest · brainwaves + adaptogens + optimization",
    description:
      "Free in-browser entrainment session · 8 modes · plus the legal cognitive + body optimization stack the lab actually uses.",
    url: "https://atomeons.com/mindrest",
    type: "article",
  },
};

const SENSORY = [
  {
    name: "Audiovisual entrainment (AVE)",
    detail:
      "Binaural beats + slow-pulse light at target brainwave frequencies. EEG evidence for measurable alpha + theta amplitude shifts. The lab built a free 8-mode in-browser session at /mindrest/experience.",
    products: [
      "Mindplace Limina · Roxiva · DAVID Delight Pro (consumer AVE machines · $200-1500)",
      "Brain.fm · Endel (functional-music apps with entrainment claims)",
      "Lucia N°03 Light (high-end hypnagogic clinical setup)",
    ],
  },
  {
    name: "Breathwork",
    detail:
      "Cheapest legal way to alter brain state · documented EEG/HRV effects. Wim Hof, holotropic, 4-7-8, box breathing — all real protocols with research.",
    products: [
      "Wim Hof Method app · Othership · Open · Pranayama by Saagara",
      "In-person: certified holotropic facilitators",
      "Free: every protocol is documented on YouTube",
    ],
  },
  {
    name: "Meditation",
    detail:
      "Vipassana, Zen, TM, Loving-kindness · 10-20 min/day for 30 days produces measurable default-mode-network changes (fMRI evidence).",
    products: [
      "Waking Up (Sam Harris) · the most rigorous app",
      "Insight Timer · free · 100K+ guided sessions",
      "Plum Village (Thích Nhất Hạnh tradition · free)",
    ],
  },
  {
    name: "Float tanks",
    detail:
      "90 min in 1000 lbs of Epsom salt at body temperature in darkness. Sensory deprivation triggers theta-state + deep relaxation. ~$50-90/float.",
    products: ["True REST · Float Conference operators · I-sopod equipment"],
  },
  {
    name: "Cold + heat protocols",
    detail:
      "Cold plunge releases noradrenaline 2.5× baseline (Søberg et al, Cell Reports Medicine 2021). Sauna releases endorphins + triggers heat-shock proteins. Contrast therapy compounds both.",
    products: [
      "Plunge ($5K) · Ice Barrel ($1500) · chest freezer + dechlorinator (cheapest)",
      "Traditional or infrared sauna · most gym memberships include access",
    ],
  },
  {
    name: "Light therapy",
    detail:
      "Morning sunlight + red-light photobiomodulation (660-850nm) for circadian + mitochondrial function. Documented effects on sleep, mood, skin, recovery.",
    products: [
      "Joovv · Mito Red Light (consumer panels $200-2000)",
      "Free: 10 minutes of direct morning sunlight",
    ],
  },
  {
    name: "Movement-induced flow",
    detail:
      "Running, long zone-2 cycling, ecstatic dance, ashtanga yoga · documented endocannabinoid elevation + flow-state EEG signature. Free, repeatable, zero risk.",
    products: ["The activity itself"],
  },
];

const NAD_STACK = [
  {
    name: "NMN (Nicotinamide Mononucleotide)",
    dose: "500-1000 mg/day · oral",
    detail:
      "Direct precursor to NAD+, the cellular energy + DNA-repair cofactor that declines ~50% from age 40 to 60. Sinclair lab protocol. Mostly safe profile but research is still maturing.",
    note: "Bioavailability via stomach is debated · sublingual or liposomal preferred. Take morning, not evening.",
  },
  {
    name: "NR (Nicotinamide Riboside)",
    dose: "300-600 mg/day",
    detail:
      "Alternative NAD+ precursor with better-established human pharmacokinetics. Chromadex Niagen is the canonical brand. Same goal as NMN, different path.",
    note: "Cheaper than NMN currently. Either NMN or NR · not usually both.",
  },
  {
    name: "Resveratrol",
    dose: "500-1000 mg/day · with fat for absorption",
    detail:
      "Polyphenol that activates SIRT1 sirtuin pathway. Sinclair pairs it with NMN/NR. Best absorption with avocado/yogurt/olive oil.",
    note: "Trans-resveratrol form only · regular resveratrol has poor bioavailability.",
  },
  {
    name: "Pterostilbene",
    dose: "100-200 mg/day",
    detail:
      "Resveratrol analog with much better oral bioavailability · same sirtuin activation. Less popular but arguably better than resveratrol.",
    note: "Found naturally in blueberries.",
  },
];

const ADAPTOGENS = [
  {
    name: "Lion's Mane (Hericium erinaceus)",
    dose: "1-3 g/day extract · standardized to ≥30% polysaccharides",
    detail:
      "Stimulates Nerve Growth Factor (NGF) in vitro. Human trials suggest cognitive benefit in mild cognitive impairment (Mori et al, Phytother Res 2009). The lab's most-recommended cognitive mushroom.",
    risk: "Generally well-tolerated · rare dermatitis reports.",
  },
  {
    name: "Turkey Tail (Trametes versicolor)",
    dose: "1-3 g/day",
    detail:
      "PSK (polysaccharide-K) and PSP polysaccharides are FDA-approved adjunct cancer therapeutics in Japan. Immune-modulating · gut microbiome support · prebiotic.",
    risk: "Very safe · sometimes mild GI adjustment in first week.",
  },
  {
    name: "Reishi (Ganoderma lucidum)",
    dose: "1-2 g/day extract",
    detail:
      "The 'mushroom of immortality' in TCM. Best studied for sleep quality + immune modulation + cortisol regulation. Take in evening.",
    risk: "Mild blood-thinning effect · pause before surgery.",
  },
  {
    name: "Cordyceps (militaris)",
    dose: "500 mg-3 g/day",
    detail:
      "Increases ATP production + oxygen utilization. Studied in athletes for VO2-max improvements. Cordyceps militaris (cultured) is preferred over wild sinensis for sustainability + standardization.",
    risk: "Very safe · take in morning for stimulating effect.",
  },
  {
    name: "Chaga (Inonotus obliquus)",
    dose: "1-2 g/day",
    detail:
      "Birch-tree fungus · among the highest natural antioxidant scores (ORAC). Traditional Russian tea. Studied for immune support.",
    risk: "Contains oxalates · caution with kidney issues.",
  },
  {
    name: "Ginseng · Panax (Asian) + American",
    dose: "200-400 mg/day standardized extract",
    detail:
      "The classic adaptogen. Panax improves cognitive performance (Reay et al · Hum Psychopharmacol 2005). American ginseng is gentler · less stimulating.",
    risk: "Mild stimulant · don't take late · interacts with anticoagulants.",
  },
  {
    name: "Ashwagandha (Withania somnifera)",
    dose: "500-600 mg/day KSM-66 standardized",
    detail:
      "Most replicated adaptogen for cortisol reduction + sleep + anxiety. Effect compounds over 4-8 weeks. KSM-66 is the most-studied extract.",
    risk: "Rare liver injury · pregnancy contraindication · cycle 6 weeks on, 2 off.",
  },
  {
    name: "Rhodiola (Rhodiola rosea)",
    dose: "200-600 mg/day standardized to ≥3% rosavins",
    detail:
      "Scandinavian + Russian adaptogen. Strong evidence for fatigue resistance + cognitive endurance under stress.",
    risk: "Can cause irritability or insomnia at high doses · take morning.",
  },
  {
    name: "Holy Basil · Tulsi (Ocimum sanctum)",
    dose: "300-600 mg/day extract · or fresh tea",
    detail:
      "Indian adaptogen · stress reduction + blood sugar modulation + anti-inflammatory. Available as a daily tea or capsule.",
    risk: "May enhance anti-coagulant effects · check with pharmacist.",
  },
  {
    name: "Maca (Lepidium meyenii)",
    dose: "1.5-3 g/day powder",
    detail:
      "Peruvian root traditionally used for energy + libido + endurance. Adaptogenic effect on HPA axis. Best taken in morning.",
    risk: "Generally very safe · gelatinized maca is gentler on digestion.",
  },
  {
    name: "Eleuthero (Siberian Ginseng)",
    dose: "300-600 mg/day",
    detail:
      "Cousin of Panax · adaptogenic + immune support · classic Soviet-era sports performance research.",
    risk: "Avoid if hypertensive · mild stimulant.",
  },
  {
    name: "Schisandra (Schisandra chinensis)",
    dose: "1-3 g/day berry extract",
    detail:
      "Five-flavored berry of TCM · adaptogenic + liver-protective + cognitive-supportive (Panossian et al · J Ethnopharmacol).",
    risk: "Can affect liver enzymes · check with clinician if on prescription meds.",
  },
];

const SENOLYTICS = [
  {
    name: "Fisetin",
    dose: "Cyclic protocol · 1500-2000 mg/day × 2 consecutive days · monthly",
    detail:
      "Flavonoid found in strawberries. Currently the most-studied senolytic for clearing senescent cells. Mayo Clinic ongoing human trials (NCT03675724).",
    cite: "Yousefzadeh et al · EBioMedicine 2018",
  },
  {
    name: "Quercetin",
    dose: "Cyclic · 500-1000 mg/day × 2-3 days · monthly · with fat",
    detail:
      "Polyphenol senolytic · often paired with dasatinib in research protocols (clinician-supervised only). Standalone quercetin is over-the-counter.",
    cite: "Zhu et al · Aging Cell 2015",
  },
  {
    name: "Spermidine",
    dose: "1-6 mg/day",
    detail:
      "Polyamine that triggers autophagy + extends lifespan in model organisms. Wheat-germ extract is the standard source. Strong sleep-quality signal in human trials.",
    cite: "Kiechl et al · Am J Clin Nutr 2018",
  },
  {
    name: "Apigenin",
    dose: "50-100 mg/day · or via parsley/celery",
    detail:
      "Flavonoid · CD38 inhibitor (raises NAD+) + mild senolytic. Found in parsley, celery, chamomile tea. Often paired with NMN.",
    cite: "Escande et al · Diabetes 2013",
  },
];

const EINSTEIN_CYCLES = [
  {
    name: "16/8 daily intermittent fasting",
    detail:
      "Eat in an 8-hour window, fast 16 hours. Triggers autophagy by hour ~14. Most-replicated metabolic flexibility protocol. Easiest entry: skip breakfast, eat noon-8pm.",
  },
  {
    name: "24-hour fast · weekly or biweekly",
    detail:
      "Deeper autophagy. Drives ketone production. Improves insulin sensitivity. Start with one per month and graduate.",
  },
  {
    name: "Prolonged fast · 72 hours · 2-4× per year",
    detail:
      "Stem-cell-based immune system regeneration (Cheng et al · Cell Stem Cell 2014). Significant metabolic recalibration. Requires preparation + electrolytes (sodium · potassium · magnesium).",
  },
  {
    name: "ProLon Fasting Mimicking Diet · 5 days · quarterly",
    detail:
      "Valter Longo's protocol · 800-1100 cal/day from specific foods for 5 days mimics fasting metabolically without total abstinence. Clinically studied product · ~$200 per cycle.",
  },
  {
    name: "Time-restricted carb cycling",
    detail:
      "Save high-glycemic carbs for the 4-hour window before / during your hardest workout. Stay carb-light otherwise. Improves metabolic flexibility + body composition.",
  },
];

const LEGAL_PHARM = [
  {
    name: "Caffeine + L-theanine stack",
    dose: "100-200 mg caffeine + 100-200 mg L-theanine",
    detail:
      "The most-studied legal cognitive stack. Theanine smooths the caffeine jitter. Take morning · cut by 2pm.",
  },
  {
    name: "Creatine monohydrate",
    dose: "5 g/day",
    detail:
      "Strongest evidence for cognitive support in vegetarians + sleep-deprived populations. Body-comp side benefit. Cheap. Decades of safety data.",
  },
  {
    name: "Omega-3 (EPA + DHA)",
    dose: "2-3 g/day EPA+DHA combined",
    detail:
      "Fish oil or algae oil. Anti-inflammatory + cognitive maintenance. Check for IFOS-certified purity to avoid heavy metals.",
  },
  {
    name: "Vitamin D3 + K2",
    dose: "D3: 2000-5000 IU · K2 MK-7: 100-200 mcg · daily with fat",
    detail:
      "K2 routes calcium to bones not arteries. Most US adults are D-deficient. Test serum 25(OH)D and titrate to 50-70 ng/mL.",
  },
  {
    name: "Magnesium glycinate",
    dose: "200-400 mg elemental magnesium · evening",
    detail:
      "Most-bioavailable form. Sleep + cardiovascular + nervous system. Most Americans are deficient.",
  },
  {
    name: "CBD (cannabidiol)",
    dose: "25-50 mg sublingual for anxiety · 50-100 mg for sleep",
    detail:
      "Federally legal hemp-derived CBD (<0.3% THC under 2018 Farm Bill). Documented anxiolytic + sleep effects in placebo-controlled trials.",
    note: "Interacts with cytochrome P450 · grapefruit-juice level interaction · check with pharmacist if on prescription meds.",
  },
];

const RESOURCES = [
  {
    name: "David Sinclair · Lifespan + the Lifespan Podcast",
    url: "https://www.amazon.com/dp/1501191977",
    detail:
      "Harvard Medical School professor · longevity research lead. The pop-science introduction to NAD+, sirtuins, resveratrol, fasting.",
  },
  {
    name: "Andrew Huberman · Huberman Lab Podcast",
    url: "https://hubermanlab.com",
    detail:
      "Stanford neuroscientist. Long-form interviews on sleep, light, dopamine, supplements. Mostly evidence-grounded · some claims still developing.",
  },
  {
    name: "Peter Attia · Outlive + The Drive Podcast",
    url: "https://peterattiamd.com",
    detail:
      "Longevity-focused physician. Outlive (2023) is the most-comprehensive popular treatment of healthspan. Rigorous on supplements.",
  },
  {
    name: "Examine.com",
    url: "https://examine.com",
    detail:
      "Independent evidence database · every supplement scored against actual human studies. The honest counter to influencer noise.",
  },
  {
    name: "Rhonda Patrick · FoundMyFitness",
    url: "https://www.foundmyfitness.com",
    detail:
      "Aging researcher. Best on sulforaphane, micronutrients, omega-3 indexing. Free educational content.",
  },
  {
    name: "Valter Longo · The Longevity Diet",
    url: "https://www.amazon.com/dp/0525534083",
    detail:
      "USC researcher · originator of the Fasting Mimicking Diet. The science behind 'Einstein cycles'-style metabolic protocols.",
  },
];

export default function MindrestPage() {
  return (
    <main className="mx-auto max-w-[1100px] px-6 py-20 text-[#F4F4F2] md:px-10 md:py-24">
      <header className="border-b border-[#1F242B] pb-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#5A6068]">
          MINDREST · BRAINWAVES + ADAPTOGENS + OPTIMIZATION · 2026
        </p>
        <h1
          className="mt-6 text-balance text-[clamp(48px,8vw,96px)] font-light leading-[0.92]"
          style={{ fontFamily: "Newsreader, Georgia, serif", fontWeight: 300 }}
        >
          Mindrest.
        </h1>
        <p
          className="mt-4 text-[clamp(20px,2.4vw,28px)] font-light italic leading-[1.35] text-[#9CA3AF]"
          style={{ fontFamily: "Newsreader, Georgia, serif" }}
        >
          Tune your brainwaves. Build your adaptogen stack. Run Einstein cycles.
        </p>
        <p className="mt-8 max-w-[64ch] text-[18px] leading-[1.55] text-[#9CA3AF]">
          A free in-browser audiovisual entrainment session · eight modes
          including pure meditation. Plus the legal cognitive + body
          optimization stack the lab actually uses · adaptogens · senolytics ·
          metabolic cycles · light + cold + heat protocols. No drugs · no
          shortcuts · all sourced.
        </p>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.28em] text-[#FF4D4D]">
          NOT MEDICAL ADVICE · See a clinician for anxiety, depression, autoimmunity, longevity protocols
        </p>
      </header>

      {/* Live experience CTA */}
      <section className="mt-12 border-l-4 border-[#22F0D5] bg-[#0F1114] p-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
          § LIVE · in your browser · no signup · free
        </p>
        <h2
          className="mt-3 text-[32px] font-light leading-tight"
          style={{ fontFamily: "Newsreader, Georgia, serif" }}
        >
          Begin a session.
        </h2>
        <p className="mt-3 max-w-[64ch] text-[16px] leading-[1.6] text-[#9CA3AF]">
          Binaural audio + synthesized ocean swell + breathing mandala · eight
          modes (alpha · theta · beta · delta · meditation · schumann · wim hof
          · sleep) · headphones recommended · safety-gated · auto-stops at 20 min.
        </p>
        <Link
          href="/mindrest/experience"
          className="mt-6 inline-flex items-center gap-3 border-2 border-[#22F0D5] bg-[#22F0D5]/10 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5] transition hover:bg-[#22F0D5]/20"
        >
          <span aria-hidden>♪</span>
          <span>Enter the ocean</span>
          <span aria-hidden>→</span>
        </Link>
      </section>

      <BrainwaveBandsDiagram />

      <Section
        title="§ Sensory + experiential · start here · pay nothing"
        blurb="No chemistry. No supplements. No cost. These shift state via the body's own pathways · documented effects · zero withdrawal."
        items={SENSORY}
        accent="#22F0D5"
      />

      <SupplementSection
        title="§ NAD+ stack · the cellular energy lane"
        blurb="NAD+ declines ~50% from age 40 to 60. These precursors + cofactors aim to restore baseline cellular energy. Strongest emerging evidence in this category."
        items={NAD_STACK}
        accent="#9D7FFF"
      />

      <RiskSection
        title="§ Adaptogens · 12 mushrooms + roots · the lab's actual list"
        blurb="Adaptogens normalize stress response · the term comes from Soviet sports-science research. These are the 12 with the strongest evidence + safety profile."
        items={ADAPTOGENS}
        accent="#22F0D5"
      />

      <SenolyticSection
        title="§ Senolytics + Einstein cycles · clear senescent cells"
        blurb="Senescent cells accumulate with age + drive inflammation. Senolytics clear them in animal models · early human trials underway. 'Einstein cycles' is the lab's name for intermittent fasting + metabolic recalibration protocols."
        items={SENOLYTICS}
        cycles={EINSTEIN_CYCLES}
        accent="#C9A55C"
      />

      <SupplementSection
        title="§ Daily legal pharm · the foundation stack"
        blurb="Federally legal · over-the-counter · highest-evidence basics. Build this before reaching for anything exotic."
        items={LEGAL_PHARM}
        accent="#3FB950"
      />

      {/* Resources */}
      <section className="mt-20">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Resources worth reading
        </h2>
        <ul className="mt-8 space-y-6">
          {RESOURCES.map((r) => (
            <li key={r.name} className="border-l-2 border-[#22F0D5]/40 pl-6">
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[18px] font-light text-[#F4F4F2] hover:text-[#22F0D5]"
              >
                {r.name} ↗
              </a>
              <p className="mt-2 text-[14px] leading-[1.6] text-[#9CA3AF]">
                {r.detail}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20 border-l-4 border-[#22F0D5] bg-[#0F1114] p-8">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#22F0D5]">
          § What the lab thinks
        </h2>
        <p
          className="mt-4 text-[20px] leading-[1.55] text-[#F4F4F2]"
          style={{ fontFamily: "Newsreader, Georgia, serif" }}
        >
          Build the sensory foundation first · breathwork, sleep, light,
          cold, sauna, movement. They cost nothing and produce 80% of the
          effect. Layer the daily-pharm foundation second · creatine, omega-3,
          D3/K2, magnesium, caffeine + theanine. Then reach for the adaptogen
          tier when you have a specific lever to pull · lion&apos;s mane for
          cognitive maintenance, ashwagandha for cortisol, reishi for sleep.
          NAD+ precursors and senolytics are still emerging · use them as
          cycles, not constants. Run Einstein cycles 1-2× per quarter. And
          see a real clinician for anything that resembles a real problem ·
          this page is a map.
        </p>
      </section>

      <section className="mt-20 border-t border-[#1F242B] pt-12">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Related on AtomEons
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Link
            href="/mindrest/experience"
            className="block border border-[#22F0D5]/40 bg-[#22F0D5]/5 p-5 transition hover:border-[#22F0D5]"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
              Experience · LIVE
            </p>
            <p className="mt-2 text-[14px] text-[#F4F4F2]">
              Open the 8-mode entrainment session now.
            </p>
          </Link>
          <Link
            href="/learn/health-ai"
            className="block border border-[#1F242B] p-5 transition hover:border-[#22F0D5]"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
              Health AI hub
            </p>
            <p className="mt-2 text-[14px] text-[#F4F4F2]">
              AI in medicine · longevity · biotech · drug discovery.
            </p>
          </Link>
          <Link
            href="/lofi"
            className="block border border-[#1F242B] p-5 transition hover:border-[#22F0D5]"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
              Lofi room · NEW
            </p>
            <p className="mt-2 text-[14px] text-[#F4F4F2]">
              The lab study room · ambient lo-fi stream · for coding.
            </p>
          </Link>
        </div>
      </section>

      <footer className="mt-20 border-t border-[#1F242B] pt-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#5A6068]">
          /mindrest · public information only · not medical advice · updated 2026-06-06
        </p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#5A6068]">
          Sources cited inline · Examine.com for primary research · PubMed for trial detail
        </p>
      </footer>
    </main>
  );
}

// =============================================================================
// Section helper components
// =============================================================================

function Section({
  title,
  blurb,
  items,
  accent,
}: {
  title: string;
  blurb: string;
  items: { name: string; detail: string; products?: string[] }[];
  accent: string;
}) {
  return (
    <section className="mt-20">
      <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
        {title}
      </h2>
      <p className="mt-4 max-w-[72ch] text-[15px] leading-[1.65] text-[#9CA3AF]">
        {blurb}
      </p>
      <ul className="mt-10 space-y-8">
        {items.map((s) => (
          <li
            key={s.name}
            className="border-l-2 pl-6"
            style={{ borderColor: `${accent}66` }}
          >
            <h3 className="text-[20px] font-light text-[#F4F4F2]">{s.name}</h3>
            <p className="mt-2 text-[15px] leading-[1.65] text-[#9CA3AF]">
              {s.detail}
            </p>
            {s.products && (
              <ul className="mt-3 space-y-1.5 text-[14px] leading-[1.55] text-[#9CA3AF]">
                {s.products.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span
                      className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full"
                      style={{ background: accent }}
                    />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

function SupplementSection({
  title,
  blurb,
  items,
  accent,
}: {
  title: string;
  blurb: string;
  items: { name: string; dose: string; detail: string; note?: string }[];
  accent: string;
}) {
  return (
    <section className="mt-20">
      <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
        {title}
      </h2>
      <p className="mt-4 max-w-[72ch] text-[15px] leading-[1.65] text-[#9CA3AF]">
        {blurb}
      </p>
      <ul className="mt-10 space-y-8">
        {items.map((s) => (
          <li
            key={s.name}
            className="border-l-2 pl-6"
            style={{ borderColor: `${accent}66` }}
          >
            <h3 className="text-[20px] font-light text-[#F4F4F2]">{s.name}</h3>
            <p
              className="mt-1 font-mono text-[11px] uppercase tracking-[0.22em]"
              style={{ color: accent }}
            >
              Dose · {s.dose}
            </p>
            <p className="mt-3 text-[15px] leading-[1.65] text-[#9CA3AF]">
              {s.detail}
            </p>
            {s.note && (
              <p className="mt-2 text-[13px] leading-[1.55] text-[#C9A55C]">
                ⓘ {s.note}
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

function RiskSection({
  title,
  blurb,
  items,
  accent,
}: {
  title: string;
  blurb: string;
  items: { name: string; dose: string; detail: string; risk: string }[];
  accent: string;
}) {
  return (
    <section className="mt-20">
      <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
        {title}
      </h2>
      <p className="mt-4 max-w-[72ch] text-[15px] leading-[1.65] text-[#9CA3AF]">
        {blurb}
      </p>
      <ul className="mt-10 space-y-8">
        {items.map((s) => (
          <li
            key={s.name}
            className="border-l-2 pl-6"
            style={{ borderColor: `${accent}66` }}
          >
            <h3 className="text-[20px] font-light text-[#F4F4F2]">{s.name}</h3>
            <p
              className="mt-1 font-mono text-[11px] uppercase tracking-[0.22em]"
              style={{ color: accent }}
            >
              Dose · {s.dose}
            </p>
            <p className="mt-3 text-[15px] leading-[1.65] text-[#9CA3AF]">
              {s.detail}
            </p>
            <p className="mt-3 text-[13px] leading-[1.55]">
              <span className="font-mono uppercase tracking-[0.22em] text-[#FF4D4D]">
                Risk ·
              </span>{" "}
              <span className="text-[#9CA3AF]">{s.risk}</span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function SenolyticSection({
  title,
  blurb,
  items,
  cycles,
  accent,
}: {
  title: string;
  blurb: string;
  items: { name: string; dose: string; detail: string; cite: string }[];
  cycles: { name: string; detail: string }[];
  accent: string;
}) {
  return (
    <section className="mt-20">
      <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
        {title}
      </h2>
      <p className="mt-4 max-w-[72ch] text-[15px] leading-[1.65] text-[#9CA3AF]">
        {blurb}
      </p>
      <p className="mt-4 max-w-[72ch] text-[13px] leading-[1.6] text-[#C9A55C]">
        Senolytics are CYCLIC · pulse for 2-3 days then break for weeks ·
        not daily. Mostly safe in published protocols but human evidence
        is still maturing. Clinician supervision recommended above 50.
      </p>

      <h3 className="mt-10 font-mono text-[11px] uppercase tracking-[0.32em] text-[#22F0D5]">
        Senolytic compounds
      </h3>
      <ul className="mt-6 space-y-6">
        {items.map((s) => (
          <li
            key={s.name}
            className="border-l-2 pl-6"
            style={{ borderColor: `${accent}66` }}
          >
            <h4 className="text-[18px] font-light text-[#F4F4F2]">{s.name}</h4>
            <p
              className="mt-1 font-mono text-[11px] uppercase tracking-[0.22em]"
              style={{ color: accent }}
            >
              {s.dose}
            </p>
            <p className="mt-2 text-[14px] leading-[1.65] text-[#9CA3AF]">
              {s.detail}
            </p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#5A6068]">
              Cite · {s.cite}
            </p>
          </li>
        ))}
      </ul>

      <h3 className="mt-12 font-mono text-[11px] uppercase tracking-[0.32em] text-[#22F0D5]">
        Einstein cycles · metabolic recalibration protocols
      </h3>
      <p className="mt-4 max-w-[72ch] text-[13px] leading-[1.6] text-[#9CA3AF]">
        The lab&apos;s name for fasting + carb-cycling + metabolic-flexibility
        protocols. Run 1-2× per quarter for the deepest effect. Daily 16/8 as
        a baseline.
      </p>
      <ul className="mt-6 space-y-5">
        {cycles.map((c) => (
          <li key={c.name} className="border-l-2 border-[#C9A55C]/50 pl-6">
            <h4 className="text-[18px] font-light text-[#F4F4F2]">{c.name}</h4>
            <p className="mt-2 text-[14px] leading-[1.65] text-[#9CA3AF]">
              {c.detail}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
