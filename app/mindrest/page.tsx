import type { Metadata } from "next";
import Link from "next/link";
import { BrainwaveBandsDiagram } from "../_components/V3/TeachableGraphics";

/**
 * /mindrest · the calm-brand landing for legal mood enhancement +
 * audiovisual entrainment. Renamed from /trip on 2026-06-06 to
 * shed the drug-coded framing. The sensory toolbox is real · the
 * pharmacological inventory is honest · the experience is the ocean.
 *
 * Inbound /trip /meditate /meditation /entrainment /ocean /calm /rest
 * are 301-redirected here by proxy.ts.
 *
 * — Wave 31b · 2026-06-06
 */

export const metadata: Metadata = {
  title: "Mindrest · Tune your brainwaves to the ocean",
  description:
    "Mindrest · the lab's legal mood-enhancement surface. Audiovisual entrainment session (binaural beats + synthesized ocean swell + breathing guide · 5 modes · in-browser) plus a public-information inventory of legal mood-shifting tools. Sensory first. Pharmacological options with risk profiles named. Not medical advice.",
  alternates: { canonical: "https://atomeons.com/mindrest" },
  openGraph: {
    title: "Mindrest · Tune your brainwaves to the ocean",
    description:
      "A free in-browser audiovisual entrainment session · ocean swell · binaural beats · meditation mode · plus the honest inventory of legal mood-shifting tools in 2026.",
    url: "https://atomeons.com/mindrest",
    type: "article",
  },
};

const SENSORY = [
  {
    name: "Audiovisual entrainment (AVE)",
    detail:
      "Binaural beats + slow-pulse light at target brainwave frequencies. EEG evidence for measurable shifts in alpha and theta amplitude. We built a free in-browser version at /mindrest/experience.",
    products: [
      "Mindplace Limina · Roxiva · DAVID Delight Pro (consumer AVE machines · $200-1500)",
      "Brain.fm · Endel · ÆOH (functional-music apps with entrainment claims · $50-100/yr)",
      "Lucia N°03 Light (high-end hypnagogic light · $1000+/session at clinics)",
    ],
  },
  {
    name: "Breathwork",
    detail:
      "Hyperventilation, controlled hold, slow paced breathing. The cheapest legal way to alter consciousness · documented EEG/HRV effects. Wim Hof, holotropic (Stan Grof), 4-7-8 (Andrew Weil), and box breathing (Navy SEALs) are all real protocols with research behind them.",
    products: [
      "Wim Hof Method app · Othership · Open · Pranayama by Saagara",
      "In-person: holotropic breathwork facilitators (find a certified one)",
      "Free: YouTube has every protocol unlocked",
    ],
  },
  {
    name: "Meditation",
    detail:
      "The oldest tool. Vipassana, Zen, Transcendental Meditation, Loving-kindness · each has a different mechanism and a different feel. 10-20 minutes a day for 30 days produces measurable changes in default-mode network activity (fMRI evidence).",
    products: [
      "Waking Up (Sam Harris) · the most rigorous app · $100/yr",
      "Insight Timer · free · 100K+ guided sessions",
      "10% Happier · TM (paid course) · Plum Village (free · Thích Nhất Hạnh tradition)",
    ],
  },
  {
    name: "Float tanks",
    detail:
      "90 minutes in 1000 lbs of Epsom salt at body temperature in total darkness. Sensory deprivation triggers theta-state, deep relaxation, often vivid mental imagery. ~$50-90 per float, available in most US cities.",
    products: ["Float Conference network · True REST · I-sopod operators"],
  },
  {
    name: "VR meditation",
    detail:
      "Immersive guided sessions. Tripp is the canonical 'psychedelic-adjacent' product (won an Apple App of the Year). Maloka and Healium add biofeedback. Quest 3 or Vision Pro for the best experience.",
    products: [
      "Tripp ($10/mo · the closest legal thing to a guided trip)",
      "Maloka, Healium, Liminal, Guided Meditation VR",
    ],
  },
  {
    name: "Wearables",
    detail:
      "Apollo Neuro uses sub-perceptual vibration to modulate the autonomic nervous system. Muse is an EEG headband that gamifies meditation. Pulsetto stimulates the vagus nerve directly. NuCalm uses biosignal processing.",
    products: [
      "Apollo Neuro ($349) · Muse 2 / Muse S ($250-400) · Pulsetto ($269) · NuCalm (subscription)",
    ],
  },
  {
    name: "Sound healing & ambient music",
    detail:
      "Gong baths, singing bowls, isochronic-tone albums. For ambient/drone music with documented relaxation effects: Stars of the Lid, William Basinski, Steve Roach, Brian Eno's 'Ambient 1: Music for Airports.'",
    products: [
      "Local sound-bath events · Insight Timer (free)",
      "Albums: Eno · Roach · Stars of the Lid · Basinski (Spotify, Apple Music, Bandcamp)",
    ],
  },
  {
    name: "Stroboscopic / hypnagogic light",
    detail:
      "Eyes-closed strobe at 8-12 Hz triggers closed-eye visual imagery via the optic-nerve response. Brion Gysin's Dreamachine (1959) is the canonical DIY version. Modern Lucia N°03 light is the high-end clinical version. WARNING: photosensitive epilepsy contraindication.",
    products: [
      "Dreamachine DIY plans (free · Brion Gysin estate)",
      "Lucia N°03 Light (~$10K · or pay-per-session at participating clinics)",
    ],
  },
  {
    name: "Cold + heat",
    detail:
      "Cold plunge releases noradrenaline (2.5x baseline) for hours. Sauna releases endorphins and triggers heat-shock proteins. Both produce a measurable, sustainable mood elevation. Contrast therapy (alternating) compounds both.",
    products: [
      "Plunge ($5K) · Ice Barrel ($1500) · or any chest freezer + dechlorinator",
      "Sauna: traditional or infrared · gym memberships often include access",
    ],
  },
  {
    name: "Movement-induced flow",
    detail:
      "Running 'high', long zone-2 cycling, ecstatic dance, ashtanga yoga · all produce documented endocannabinoid elevation + flow-state EEG signature. Free, repeatable, no risk profile.",
    products: ["The activity itself is the tool"],
  },
];

const PHARM_FEDERAL = [
  {
    name: "Caffeine",
    status: "Legal · OTC · the world's most-used psychoactive",
    detail:
      "200-400mg is the well-established sweet spot for cognitive enhancement. Above 600mg or with poor sleep, returns are negative. Half-life is ~5 hours · cut off by 2pm if you sleep at 10pm.",
    risk: "Dependence within ~2 weeks · withdrawal headaches · cardiac risk at high doses · sleep quality erosion if dosed late.",
  },
  {
    name: "L-theanine",
    status: "Legal · OTC supplement",
    detail:
      "Amino acid found in green tea. Pairs with caffeine to smooth the jitter while keeping the focus. 100-200mg with 100-200mg caffeine is the canonical 'calm focus' stack.",
    risk: "Very safe profile · mild lower-blood-pressure effect.",
  },
  {
    name: "Lion's Mane (Hericium erinaceus)",
    status: "Legal · OTC supplement",
    detail:
      "Mushroom extract · contains hericenones + erinacines · in vitro evidence for nerve growth factor stimulation. Human trials are mixed but the few well-designed ones suggest cognitive benefit at 1-3g/day.",
    risk: "Generally well-tolerated · rare reports of dermatitis · don't combine with anticoagulants without clinician input.",
  },
  {
    name: "Ashwagandha (Withania somnifera)",
    status: "Legal · OTC adaptogen",
    detail:
      "Indian adaptogen · 500-600mg KSM-66 daily has the most replication for cortisol reduction + sleep + anxiety. Effect compounds over weeks.",
    risk:
      "Liver injury reported in rare cases · don't combine with thyroid medication · pregnancy contraindication · cycle off periodically.",
  },
  {
    name: "Rhodiola (Rhodiola rosea)",
    status: "Legal · OTC adaptogen",
    detail:
      "Russian/Scandinavian adaptogen · evidence for fatigue resistance + cognitive endurance under stress. 200-600mg standardized extract.",
    risk: "Generally safe · can cause irritability or insomnia at high doses or late dosing.",
  },
  {
    name: "CBD (cannabidiol)",
    status: "Legal federally under 2018 Farm Bill (hemp-derived · <0.3% THC)",
    detail:
      "Non-intoxicating cannabinoid · anxiolytic + sleep effects documented in placebo-controlled trials. 25-50mg sublingual is the sweet spot for anxiety; 50-100mg for sleep.",
    risk:
      "Interacts with cytochrome P450 (warfarin, statins, antiepileptics) · grapefruit-juice-level interaction · check with pharmacist if you take prescription drugs.",
  },
  {
    name: "Kava (Piper methysticum)",
    status: "Legal federally · OTC · GABA-ergic relaxant",
    detail:
      "Polynesian root used ceremonially · produces a unique calm-but-alert sociability. Effective at ~200mg kavalactones · feels nothing like alcohol despite the comparison.",
    risk:
      "LIVER INJURY documented in some users with chronic high use · use noble-cultivar kava only · don't use daily long-term · don't combine with alcohol or hepatotoxic meds.",
  },
  {
    name: "Nicotine (lozenge / patch / gum)",
    status: "Legal · OTC",
    detail:
      "Real cognitive stimulant · improves attention and working memory in controlled studies. 2-4mg lozenge is enough for the effect.",
    risk:
      "ADDICTIVE · physical dependence forms quickly · cardiovascular risk · not recommended for non-users.",
  },
];

const PHARM_STATE = [
  {
    name: "Cannabis (THC)",
    status:
      "Recreationally legal in 24 US states + DC as of 2026 · medical in 38 · federally illegal",
    detail:
      "The dominant psychedelic-adjacent legal option in legal-state US. Edibles, vapes, flower all available at dispensaries with state-issued ID. Effects depend heavily on dose, strain, and route.",
    risk:
      "Drug-test detectable for 30+ days · driving impairment · psychosis risk in adolescents and those with predisposition · cognitive blunting with daily heavy use · withdrawal exists.",
  },
  {
    name: "Kratom (Mitragyna speciosa)",
    status:
      "Legal federally (DEA tried to schedule it 2016, withdrew) · banned in AL, AR, IN, RI, VT, WI",
    detail:
      "Southeast Asian tree leaf with partial mu-opioid agonist action. Stimulating at low doses (1-3g), sedating + analgesic at high doses (5-8g). Sold as powder, capsules, extracts.",
    risk:
      "PHYSICAL DEPENDENCE forms within weeks of daily use · genuine opioid-style withdrawal · adulterated products are common · driving impairment · respiratory depression possible at high doses with potentiators.",
  },
  {
    name: "Amanita muscaria",
    status: "Legal federally · banned in LA",
    detail:
      "Iconic red-and-white fairy-tale mushroom · contains muscimol (GABAergic) not psilocybin. Effects are deliriant + dissociative · NOT classical psychedelic. Often sold as gummies in head shops.",
    risk:
      "Genuinely unpredictable · contains ibotenic acid (neurotoxic) before proper conversion to muscimol · serious risk if eaten raw or under-processed · don't use this casually.",
  },
  {
    name: "Salvia divinorum",
    status: "Legal in some US states · banned in CA, DE, FL, IA, IL, KS, LA, MN, MS, ND, OK, TN, VA, plus others",
    detail:
      "Kappa-opioid agonist plant. Effects are short (5-30 minutes) but intense and often dysphoric or terrifying. Not recreational in the conventional sense.",
    risk:
      "Profound dissociation · loss of motor control · genuinely dangerous if used without a sober sitter · not recommended.",
  },
  {
    name: "Nitrous oxide (whippets)",
    status: "Legal as N2O cartridges for whipped cream · misuse is gray area",
    detail:
      "Inhaled gas · 30-90 second dissociative high. Iconic for ravers and dental patients alike.",
    risk:
      "B12 depletion causes neurological damage with chronic use (numb hands, weakness, spinal-cord lesions) · 5-MTHF + B12 supplementation if you must · falling-injury risk · genuine addiction reports.",
  },
];

const RESOURCES = [
  {
    name: "Michael Pollan · How to Change Your Mind",
    url: "https://www.amazon.com/dp/0735224153",
    detail:
      "The popular primer that put modern psychedelic research back into public conversation. Covers both legal (cannabis, ketamine via clinic) and illegal (psilocybin, LSD) substances · informational, not encouragement.",
  },
  {
    name: "Wim Hof · The Wim Hof Method",
    url: "https://www.wimhofmethod.com",
    detail:
      "The breath + cold protocol. Free Stage 1 on YouTube. The book is the deeper systematic version.",
  },
  {
    name: "Sam Harris · Waking Up",
    url: "https://www.wakingup.com",
    detail:
      "The most rigorous meditation app · taught by a neuroscientist who actually practices. The 28-day intro alone is worth the year subscription.",
  },
  {
    name: "Mihaly Csikszentmihalyi · Flow",
    url: "https://www.amazon.com/dp/0061339202",
    detail:
      "The original 1990 monograph on the flow state. Read this before you spend money on entrainment hardware.",
  },
  {
    name: "Brain.fm research page",
    url: "https://www.brain.fm/science",
    detail:
      "Vendor-published but lists their peer-reviewed studies on functional-music entrainment. Worth reading critically.",
  },
  {
    name: "MAPS · Multidisciplinary Association for Psychedelic Studies",
    url: "https://maps.org",
    detail:
      "Nonprofit funding the legal-pathway research (MDMA for PTSD, psilocybin for depression). Closest thing to a legitimate scientific home for this space.",
  },
];

export default function MindrestPage() {
  return (
    <main className="mx-auto max-w-[1100px] px-6 py-20 text-[#F4F4F2] md:px-10 md:py-24">
      <header className="border-b border-[#1F242B] pb-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#5A6068]">
          MINDREST · ÆONS · 2026
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
          Tune your brainwaves to the ocean.
        </p>
        <p className="mt-8 max-w-[64ch] text-[18px] leading-[1.55] text-[#9CA3AF]">
          A free in-browser audiovisual entrainment session · binaural beats
          + synthesized ocean swell + breathing guide · eight modes including
          a pure-meditation lane with no binaural. Plus the honest inventory
          of legal mood-shifting tools in 2026 · sensory first, pharmacology
          listed with risks named in the open.
        </p>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.28em] text-[#FF4D4D]">
          NOT MEDICAL ADVICE · For anxiety, depression, PTSD, ADHD, trauma · see a licensed clinician · this is public information only
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
          Binaural-beat audio + synthesized ocean swell + breathing mandala
          · eight modes (alpha · theta · beta · delta · meditation · schumann · wim hof · sleep) ·
          headphones recommended · safety-gated · auto-stops at 20 minutes
          · text-only fallback for photosensitive users.
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

      {/* Wave 36 · teachable brainwave bands diagram */}
      <BrainwaveBandsDiagram />

      {/* Sensory + experiential */}
      <section className="mt-16">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Sensory + experiential · the lab&apos;s primary recommendation
        </h2>
        <p className="mt-4 max-w-[72ch] text-[15px] leading-[1.65] text-[#9CA3AF]">
          These shift your state without any chemistry. The effect is real,
          measurable, repeatable, and has no withdrawal or dependence profile.
          Most are free or near-free. Start here.
        </p>
        <ul className="mt-10 space-y-8">
          {SENSORY.map((s) => (
            <li key={s.name} className="border-l-2 border-[#22F0D5]/40 pl-6">
              <h3 className="text-[20px] font-light text-[#F4F4F2]">{s.name}</h3>
              <p className="mt-2 text-[15px] leading-[1.65] text-[#9CA3AF]">
                {s.detail}
              </p>
              <ul className="mt-3 space-y-1.5 text-[14px] leading-[1.55] text-[#9CA3AF]">
                {s.products.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-[#22F0D5]" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      {/* Pharm federal */}
      <section className="mt-20">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Pharmacological · legal federally in the US
        </h2>
        <p className="mt-4 max-w-[72ch] text-[15px] leading-[1.65] text-[#9CA3AF]">
          Listed for completeness. Every entry names regulatory status and risk
          profile. The lab does not recommend these · we list them because
          knowledge of what&apos;s actually legal is itself a public-information
          service.
        </p>
        <ul className="mt-10 space-y-8">
          {PHARM_FEDERAL.map((p) => (
            <li key={p.name} className="border-l-2 border-[#C9A55C]/40 pl-6">
              <h3 className="text-[20px] font-light text-[#F4F4F2]">{p.name}</h3>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.22em] text-[#C9A55C]">
                {p.status}
              </p>
              <p className="mt-3 text-[15px] leading-[1.65] text-[#9CA3AF]">
                {p.detail}
              </p>
              <p className="mt-3 text-[14px] leading-[1.55]">
                <span className="font-mono uppercase tracking-[0.22em] text-[#FF4D4D]">
                  Risk ·
                </span>{" "}
                <span className="text-[#9CA3AF]">{p.risk}</span>
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Pharm state */}
      <section className="mt-20">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Pharmacological · state-dependent or gray-area
        </h2>
        <p className="mt-4 max-w-[72ch] text-[15px] leading-[1.65] text-[#9CA3AF]">
          Verify your state&apos;s law before any of these. The regulatory map
          has shifted multiple times since 2020 · the next federal ruling could
          reshape several overnight. We list them with risk profiles · we do
          not promote use.
        </p>
        <ul className="mt-10 space-y-8">
          {PHARM_STATE.map((p) => (
            <li key={p.name} className="border-l-2 border-[#FF4D4D]/40 pl-6">
              <h3 className="text-[20px] font-light text-[#F4F4F2]">{p.name}</h3>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.22em] text-[#FF4D4D]">
                {p.status}
              </p>
              <p className="mt-3 text-[15px] leading-[1.65] text-[#9CA3AF]">
                {p.detail}
              </p>
              <p className="mt-3 text-[14px] leading-[1.55]">
                <span className="font-mono uppercase tracking-[0.22em] text-[#FF4D4D]">
                  Risk ·
                </span>{" "}
                <span className="text-[#9CA3AF]">{p.risk}</span>
              </p>
            </li>
          ))}
        </ul>
      </section>

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

      {/* What the lab thinks */}
      <section className="mt-20 border-l-4 border-[#22F0D5] bg-[#0F1114] p-8">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#22F0D5]">
          § What the lab thinks
        </h2>
        <p
          className="mt-4 text-[20px] leading-[1.55] text-[#F4F4F2]"
          style={{ fontFamily: "Newsreader, Georgia, serif" }}
        >
          Most people reach for chemistry because nobody taught them that
          breath, cold, motion, sound, and light can do most of the work for
          free. Start at the top of this page. Breathwork costs nothing.
          Audiovisual entrainment costs nothing. A cold shower costs nothing.
          Meditation costs nothing. Run, dance, sit in a sauna · these are
          the legal, durable, no-dependency tools. Reach for chemistry only
          when the sensory toolbox is exhausted and you&apos;ve named a
          specific need. And see a real clinician for anything that
          resembles a real problem · this page is a map, not a treatment plan.
        </p>
      </section>

      {/* Cross-links */}
      <section className="mt-20 border-t border-[#1F242B] pt-12">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Related on AtomEons
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Link
            href="/mindrest/experience"
            className="block border border-[#22F0D5]/40 bg-[#22F0D5]/5 p-5 transition hover:border-[#22F0D5]"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
              Experience · LIVE
            </p>
            <p className="mt-2 text-[14px] text-[#F4F4F2]">
              Open the in-browser ocean session now.
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
              AI in medicine, mental health, drug discovery.
            </p>
          </Link>
          <Link
            href="/research/lessons-from-sci-fi"
            className="block border border-[#1F242B] p-5 transition hover:border-[#22F0D5]"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
              Lessons from Sci-Fi
            </p>
            <p className="mt-2 text-[14px] text-[#F4F4F2]">
              Where film imagined the chemistry of consciousness.
            </p>
          </Link>
          <Link
            href="/ask?q=what+is+audiovisual+entrainment"
            className="block border border-[#1F242B] p-5 transition hover:border-[#22F0D5]"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
              Ask the lab
            </p>
            <p className="mt-2 text-[14px] text-[#F4F4F2]">
              Free grounded answers with citations.
            </p>
          </Link>
        </div>
      </section>

      <footer className="mt-20 border-t border-[#1F242B] pt-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#5A6068]">
          /mindrest · public information only · not medical advice · updated 2026-06-06
        </p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#5A6068]">
          Sources: vendor literature · peer-reviewed studies · DEA scheduling · state cannabis registries · FDA OTC guidance
        </p>
      </footer>
    </main>
  );
}
