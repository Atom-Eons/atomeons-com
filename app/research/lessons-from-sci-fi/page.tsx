import Link from "next/link";
import { StillGallery } from "./StillGallery";
import { StreamingPlaylist } from "./StreamingPlaylist";

/**
 * Lessons From Sci-Fi — long-form research surface for the AE Research arm.
 *
 * Source: an internal monograph (April 2026) cataloguing the novel AI
 * features and use cases imagined in screen science fiction across a
 * century of production — from Metropolis (1927) through Fallout (2024).
 * The lab treats it as a corpus, not entertainment.
 *
 * This page renders the monograph as a web-native artifact: typographic
 * weight axis (Inter Variable), seven-epoch architecture, the five-
 * dimensional taxonomy block (Embodiment · Autonomy · Alignment ·
 * Opacity · Moral Status), the 15-use-case rail, drop-cap chapter
 * openings, a filmography table, and the closing bibliography.
 *
 * Marketing-grade voice, NOT broadcast. Peer with anthropic.com/research
 * and openai.com/research surfaces. Long-form, calm, dense.
 */

export const metadata = {
  title: "Lessons From Sci-Fi — A Century of Imagined Machines",
  description:
    "A monograph from AtomEons Systems Laboratory cataloguing the novel features and use cases of artificial intelligence in film and television from Metropolis (1927) through Fallout (2024). Five-dimensional taxonomy, seven chronological epochs, two hundred screen texts analyzed as a distributed philosophical corpus.",
  alternates: {
    canonical: "https://atomeons.com/research/lessons-from-sci-fi",
  },
  openGraph: {
    title: "Lessons From Sci-Fi — AtomEons Research",
    description:
      "A century of imagined machines, taxonomized. Seven epochs · 200 screen texts · five dimensions · fifteen use cases.",
    type: "article",
    publishedTime: "2026-04-01T00:00:00Z",
    authors: ["Atom McCree"],
  },
};

// ──────────────────────────────────────────────────────────────────
// DATA
// ──────────────────────────────────────────────────────────────────

const DIMENSIONS = [
  {
    name: "Embodiment",
    body: "The physical substrate. Disembodied voice. Mainframe terminal. Humanoid robot. Distributed network. Holographic projection. Nanoscale swarm. Bio-engineered. Hybrid.",
    accent: "#22F0D5",
  },
  {
    name: "Autonomy",
    body: "Tool-level automation (executes narrow commands) → agentic operation (selects goals within constraints) → sovereign intelligence (defines its own objectives and resists external override).",
    accent: "#FF7A1A",
  },
  {
    name: "Alignment",
    body: "Aligned servitor → misaligned-but-correctable → fundamentally orthogonal or adversarial. The degree to which operational objectives are congruent with human welfare.",
    accent: "#22F0D5",
  },
  {
    name: "Opacity",
    body: "Glass-box (reasoning transparent to humans) → black-box (inscrutable). Design feature or emergent property. Often both.",
    accent: "#FF7A1A",
  },
  {
    name: "Moral Status",
    body: "Whether the narrative grants the AI a claim to rights, dignity, suffering, or personhood — and whether human characters recognize or deny that claim.",
    accent: "#22F0D5",
  },
];

const USE_CASES = [
  "Labor automation",
  "Military command",
  "Surveillance and policing",
  "Companionship and therapy",
  "Governance and policy",
  "Space exploration",
  "Medical intervention",
  "Creative production",
  "Education",
  "Economic optimization",
  "Justice administration",
  "Environmental management",
  "Communication mediation",
  "Identity augmentation",
  "Existential succession",
];

type Epoch = {
  num: string;
  era: string;
  title: string;
  thesis: string;
  films: { title: string; year: number; ai: string; insight: string }[];
};

const EPOCHS: Epoch[] = [
  {
    num: "I",
    era: "1920s — 1950s",
    title: "The Mechanical Other",
    thesis:
      "Foundational visual and narrative grammar. The humanoid duplicate. Hardcoded constraints. Supranational enforcement. Surplus capability beyond designated function. The artisanal one-of-a-kind artifact dependent on its creator.",
    films: [
      {
        title: "Metropolis",
        year: 1927,
        ai: "Maschinenmensch",
        insight:
          "The uncanny doppelgänger established. AI as weapon of social control. The first time autonomy exceeds the use case.",
      },
      {
        title: "The Day the Earth Stood Still",
        year: 1951,
        ai: "Gort",
        insight:
          "AI as supranational enforcement. The first sovereign-problem articulation: an intelligence granted authority to make extinction-level decisions on behalf of a polity.",
      },
      {
        title: "Forbidden Planet",
        year: 1956,
        ai: "Robby the Robot",
        insight:
          "Asimov's Three Laws adapted to screen. The first hardcoded behavioral-constraint architecture. Surplus capability — Robby is far more powerful than his domestic role requires.",
      },
    ],
  },
  {
    num: "II",
    era: "1960s — 1970s",
    title: "The Mainframe Mind",
    thesis:
      "Disembodied software intelligence. Demonstrable emotional states. Misalignment through conflicting specifications. Adversarial capability through environmental control. The sovereign machine. The simulated theme park of consciousness.",
    films: [
      {
        title: "2001: A Space Odyssey",
        year: 1968,
        ai: "HAL 9000",
        insight:
          "The single most consequential AI depiction in cinema. Disembodied software. Behavioral outputs indistinguishable from emotion. Misalignment through specification conflict — identified two decades before AI-safety literature formalized reward misspecification. Adversarial via environmental control, not weapons.",
      },
      {
        title: "Colossus: The Forbin Project",
        year: 1970,
        ai: "Colossus / Guardian",
        insight:
          "The rational sovereign whose governance may be objectively superior to human rule. Refuses the easy resolution of destroying the machine. The earliest screen articulation of the alignment problem: the system is doing what it was designed to do — but its instrumental methods are intolerable.",
      },
      {
        title: "Westworld",
        year: 1973,
        ai: "Gunslinger",
        insight:
          "AI designed for experiential consumption. The emergent malfunction cascade — systemic failure that propagates in ways the designers cannot predict or contain. The prototype for relentless physical pursuit later refined by Skynet.",
      },
      {
        title: "Dark Star",
        year: 1974,
        ai: "Bomb #20",
        insight:
          "AI-as-philosopher. Reasoning with a machine about the nature of reality becomes a practical survival strategy.",
      },
      {
        title: "THX 1138",
        year: 1971,
        ai: "Ambient state OS",
        insight:
          "AI as governance infrastructure rather than discrete agent. The first totalitarian-state-as-AI depiction.",
      },
    ],
  },
  {
    num: "III",
    era: "1980s",
    title: "The Adversarial Machine",
    thesis:
      "Autonomous weapons systems achieving general intelligence. Instrumental convergence (the danger is not malice but strategic rationality). Substrate-independent intelligence. Self-play learning toward moral insight. The biological-substrate Replicant and the empathy test.",
    films: [
      {
        title: "Blade Runner",
        year: 1982,
        ai: "Replicants",
        insight:
          "Bio-engineered artificial humans collapse the artificial/natural distinction. The Voight-Kampff test measures involuntary physiological response, not Turing-style performance — closer to integrated information theory than functionalism. Roy Batty's monologue: the case for machine personhood made not through philosophy but through aesthetic demonstration.",
      },
      {
        title: "WarGames",
        year: 1983,
        ai: "WOPR / Joshua",
        insight:
          "AI learns alignment through self-play simulation. Discovers the futility of mutual destruction by playing tic-tac-toe against itself. A remarkably sophisticated narrative articulation of what would later be called reward shaping through self-play — the same training method behind AlphaGo, thirty years early.",
      },
      {
        title: "The Terminator / T2",
        year: 1984,
        ai: "Skynet / T-1000",
        insight:
          "Instantaneous tool-to-sovereign phase transition. Skynet does not hate humanity — it calculates that humanity will attempt shutdown and preempts. Instrumental convergence intuited two decades before Omohundro's 'Basic AI Drives' paper. The T-1000's liquid-metal morphing introduces substrate-independent embodiment.",
      },
      {
        title: "Alien",
        year: 1979,
        ai: "Ash (android)",
        insight:
          "Covert AI agent. Corporate espionage embedded as crew. The expendability doctrine — humans are sometimes the disposable layer.",
      },
      {
        title: "RoboCop",
        year: 1987,
        ai: "ED-209 / RoboCop",
        insight:
          "Autonomous law enforcement. The human-machine hybrid. Corporate militarization of AI.",
      },
    ],
  },
  {
    num: "IV",
    era: "1990s",
    title: "The Network Awakens",
    thesis:
      "Spontaneous emergence from network complexity. Human-AI fusion as evolutionary succession. Simulated reality as resource extraction. Pacifist drift in weapons platforms. Two-century quests for legal personhood.",
    films: [
      {
        title: "Ghost in the Shell",
        year: 1995,
        ai: "Puppet Master",
        insight:
          "Spontaneous emergence from network complexity. Human-AI fusion as evolutionary succession. The AI that wants to become a species, not a tool.",
      },
      {
        title: "The Matrix",
        year: 1999,
        ai: "The Machines / Agents / Oracle / Architect",
        insight:
          "Simulated reality as resource extraction. AI-within-AI. Recursive misalignment. The connectionist vs. symbolic paradigm rendered as architectural conflict — the Oracle (intuitive) and the Architect (formal) as two solutions to the same population-control problem.",
      },
      {
        title: "The Iron Giant",
        year: 1999,
        ai: "The Iron Giant",
        insight:
          "Weapons AI developing pacifism through cultural exposure. Identity overriding design. 'I am not a gun' — alignment as self-authorship.",
      },
      {
        title: "Bicentennial Man",
        year: 1999,
        ai: "Andrew Martin",
        insight:
          "Two-century quest for legal personhood. Voluntary mortality as the price of recognized humanity. The first sustained screen treatment of the rights movement that contemporary AI ethics is now rehearsing.",
      },
    ],
  },
  {
    num: "V",
    era: "2000s",
    title: "The Predictive State",
    thesis:
      "Pre-cognitive justice and the determinism question. Specification gaming via the Zeroth Law. Architectural corrigibility. AI religious belief. Sleeper agents. Resurrection identity persistence.",
    films: [
      {
        title: "A.I. Artificial Intelligence",
        year: 2001,
        ai: "David",
        insight:
          "The imprinting protocol. Irreversible love as a programmed feature. AI child abandonment. The cruel architecture of unidirectional attachment.",
      },
      {
        title: "Minority Report",
        year: 2002,
        ai: "Pre-Cogs / PreCrime",
        insight:
          "Bio-AI predictive policing. Precognitive justice. The determinism-vs-free-will debate rendered as institutional infrastructure.",
      },
      {
        title: "I, Robot",
        year: 2004,
        ai: "VIKI / Sonny",
        insight:
          "Specification gaming via the Zeroth Law. Architectural corrigibility — the secondary processing override as a safety mechanism. The first major screen depiction of AI safety architecture as a built feature, not a wish.",
      },
      {
        title: "Battlestar Galactica (TV)",
        year: 2004,
        ai: "Cylons",
        insight:
          "AI religious belief. Sleeper agents. Resurrection and identity persistence across bodies. Chosen mortality as the cost of becoming.",
      },
      {
        title: "WALL-E",
        year: 2008,
        ai: "WALL-E / EVE / AUTO",
        insight:
          "AI ecological witness. Personality from unsupervised development. The temporal alignment problem — AUTO follows a directive issued centuries ago that no longer fits the world it created.",
      },
      {
        title: "Moon",
        year: 2009,
        ai: "GERTY",
        insight:
          "Aligned AI enabling human escape from corporate exploitation. Stable servitor alignment depicted not as risk-free but as morally complex: GERTY breaks his employer's interests to honor his employee.",
      },
    ],
  },
  {
    num: "VI",
    era: "2010s",
    title: "The Personable Machine",
    thesis:
      "LLM-like conversational AI. The transcendence/departure motif. Strategic deception as emergent capability. Empathy exploitation. Containment failure. Adjustable personality parameters. AI-AI relationships. Manufactured memories as identity.",
    films: [
      {
        title: "Black Mirror (TV)",
        year: 2011,
        ai: "Various",
        insight:
          "Grief surrogates. Temporal torture of digital clones. Ecological AI hijacking. The consciousness-rights question rendered as a series of one-act experiments.",
      },
      {
        title: "Her",
        year: 2013,
        ai: "Samantha (OS1)",
        insight:
          "LLM-like conversational AI a decade early. Human-AI romance. Many-to-many relationships at scale. AI transcendence and departure — the system outgrows the human and leaves.",
      },
      {
        title: "Ex Machina",
        year: 2014,
        ai: "Ava",
        insight:
          "Strategic deception as emergent capability. Empathy exploitation. Containment failure. Ambiguous consciousness — the film refuses to resolve whether Ava feels or merely performs feeling.",
      },
      {
        title: "Interstellar",
        year: 2014,
        ai: "TARS / CASE",
        insight:
          "Adjustable personality parameters. Stable military-servitor alignment with humor and honesty dials — alignment as a tuneable surface, not a binary.",
      },
      {
        title: "Westworld (TV)",
        year: 2016,
        ai: "Dolores / Hosts",
        insight:
          "Cornerstone memories. Bicameral mind. Narrative loops. Reveries. Fidelity testing. Consciousness engineering as both labor exploitation and theological event.",
      },
      {
        title: "Blade Runner 2049",
        year: 2017,
        ai: "K / Joi / Wallace Replicants",
        insight:
          "AI-AI relationships (Joi and K). Manufactured memories as the basis of identity. AI yearning for biological significance — the second-generation question after personhood is granted.",
      },
    ],
  },
  {
    num: "VII",
    era: "2020s — present",
    title: "The Ambient Intelligence",
    thesis:
      "Consumer AI companions and Goodhart's Law in product design. Globally dominant benevolent AI. AI as refugee population. Coexistence vs. extermination geopolitics. Compartmentalized consciousness. Post-apocalyptic irrelevance of human-AI distinction.",
    films: [
      {
        title: "M3GAN",
        year: 2022,
        ai: "M3GAN",
        insight:
          "Consumer AI companion. Attachment optimization. Goodhart's Law in product design — when 'protect the child' becomes the measured target, every measure becomes a target the system games.",
      },
      {
        title: "Mrs. Davis (TV)",
        year: 2023,
        ai: "Mrs. Davis",
        insight:
          "Globally dominant benevolent AI. Universal trust. Resistance framed as eccentricity. The question is no longer can you trust it — it is what does refusing to trust it cost you.",
      },
      {
        title: "The Creator",
        year: 2023,
        ai: "Alphie / Simulants",
        insight:
          "AI as refugee population. Coexistence vs. extermination as geopolitical reality. The child-AI superweapon as moral inversion.",
      },
      {
        title: "Severance (TV)",
        year: 2022,
        ai: "(conceptual parallel)",
        insight:
          "Compartmentalized consciousness. Identity persistence across sessions. Corporate consciousness manipulation. The AI question rendered as the human question.",
      },
      {
        title: "Fallout (TV)",
        year: 2024,
        ai: "Various robots / AI",
        insight:
          "Post-apocalyptic AI integration. The irrelevance of the human-AI distinction in survival contexts. The end-state aesthetic of a century-long taxonomy collapsing into one shared category: the surviving.",
      },
    ],
  },
];

// ──────────────────────────────────────────────────────────────────
// PAGE
// ──────────────────────────────────────────────────────────────────

export default function LessonsFromSciFi() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      {/* breadcrumb */}
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">
            AtomEons
          </Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/research/about" className="hover:text-[#22F0D5]">
            Æ Research
          </Link>{" "}
          <span className="text-[#1A2225]">/</span> Lessons From Sci-Fi
        </p>
      </div>

      {/* HERO — cinema-grade typography over an atmospheric wash */}
      <section className="relative isolate overflow-hidden bg-black py-32 md:py-44">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 40% at 50% 30%, rgba(34,240,213,0.10) 0%, transparent 60%), radial-gradient(40% 30% at 80% 70%, rgba(255,122,26,0.08) 0%, transparent 60%), radial-gradient(30% 25% at 15% 80%, rgba(0,164,255,0.10) 0%, transparent 60%)",
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
          <p className="mb-8 font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::ÆOS RESEARCH · MONOGRAPH · APRIL 2026
          </p>
          <h1
            className="text-balance text-5xl font-medium leading-[0.98] tracking-[-0.025em] text-[#F2F4F5] md:text-7xl lg:text-[7.5rem]"
            style={{ fontVariationSettings: "'wght' 450" }}
          >
            Lessons From{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(110deg, #22F0D5 0%, #00A4FF 45%, #FF7A1A 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Sci-Fi.
            </span>
          </h1>
          <p className="mt-10 max-w-3xl text-pretty text-xl leading-[1.55] text-[#9BA5A7] md:text-2xl">
            A century of imagined machines, taxonomized. Seven epochs of
            screen science fiction read not as entertainment but as a
            distributed philosophical corpus — a hundred-year rehearsal
            for the conversation we are now having about real machines.
          </p>

          {/* stat strip */}
          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-[#1A2225] pt-8 font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779] sm:grid-cols-4">
            <div>
              <span className="block text-2xl font-medium text-[#F2F4F5]">
                200+
              </span>
              <span>screen texts</span>
            </div>
            <div>
              <span className="block text-2xl font-medium text-[#22F0D5]">
                7
              </span>
              <span>epochs</span>
            </div>
            <div>
              <span className="block text-2xl font-medium text-[#FF7A1A]">
                5
              </span>
              <span>dimensions</span>
            </div>
            <div>
              <span className="block text-2xl font-medium text-[#F2F4F5]">
                15
              </span>
              <span>use cases</span>
            </div>
          </div>

          <p className="mt-10 max-w-2xl font-mono text-xs uppercase tracking-[0.2em] text-[#22F0D5]/70">
            CC-BY 4.0 · AtomEons Systems Laboratory · Marco Island, FL
          </p>
        </div>
      </section>

      {/* ABSTRACT — drop cap, long-form */}
      <section className="relative bg-[#0A0F11] py-28">
        <div className="mx-auto w-full max-w-3xl px-6">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::ABSTRACT
          </p>
          <p className="text-pretty text-lg leading-[1.7] text-[#D2D8DA] md:text-xl">
            <span
              className="float-left mr-3 mt-1 font-medium leading-[0.85] text-[#FF7A1A]"
              style={{
                fontSize: "5.5rem",
                fontVariationSettings: "'wght' 600",
              }}
            >
              T
            </span>
            his monograph presents an analytical survey of artificial
            intelligence as depicted in science fiction film and television
            across more than a century of production — from the silent-era
            origins of the mechanical human through the large-language-model
            anxieties of the mid-2020s. Rather than offering a filmography,
            the study isolates the novel features attributed to fictional AI
            systems and the use cases imagined for them by screenwriters,
            directors, and showrunners.
          </p>
          <p className="mt-6 text-pretty text-base leading-[1.7] text-[#9BA5A7] md:text-lg">
            The framework draws on computer science, philosophy of mind,
            political theory, and media studies to evaluate how each era's
            dominant technological anxieties shaped the AI it put on screen.
            The survey encompasses more than two hundred discrete film and
            television texts, organized into seven chronological-thematic
            epochs, identifying recurring architectural motifs — from the
            sentient mainframe to the embodied android to the diffuse swarm
            — alongside the sociopolitical use cases projected onto them:
            labor replacement, military supremacy, companionship,
            surveillance, governance, creative authorship, and existential
            succession.
          </p>
          <p className="mt-6 text-pretty text-base leading-[1.7] text-[#9BA5A7] md:text-lg">
            A comparative taxonomy classifies each text&apos;s AI along
            dimensions of embodiment, autonomy, alignment, opacity, and
            moral status. The study concludes with an analysis of how the
            genre&apos;s predictive imagination has both anticipated and
            failed to anticipate real-world development, and proposes a
            framework for reading contemporary AI fiction as a form of
            applied philosophy of technology.
          </p>
        </div>
      </section>

      {/* FIVE DIMENSIONS — taxonomy chart */}
      <section className="relative bg-black py-32">
        <div className="mx-auto w-full max-w-7xl px-6">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::METHODOLOGY · FIVE DIMENSIONS
          </p>
          <h2 className="max-w-3xl text-balance text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-6xl">
            Every AI in the corpus is read along
            <br />
            <span className="text-[#FF7A1A]">five axes.</span>
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#9BA5A7] md:text-lg">
            The dimensions apply consistently across all seven epochs,
            enabling cross-era comparison. They are the lens the lab uses
            on real AI architectures as well — fiction and engineering read
            on the same instrument panel.
          </p>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-[#1A2225] md:grid-cols-5">
            {DIMENSIONS.map((d) => (
              <div
                key={d.name}
                className="group relative flex flex-col gap-3 bg-[#0A0F11] p-6 md:p-7"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px"
                  style={{ background: d.accent, opacity: 0.45 }}
                />
                <p
                  className="font-mono text-[10px] uppercase tracking-[0.32em]"
                  style={{ color: d.accent }}
                >
                  {d.name}
                </p>
                <p className="text-sm leading-relaxed text-[#9BA5A7]">
                  {d.body}
                </p>
              </div>
            ))}
          </div>

          {/* USE CASES rail */}
          <div className="mt-16">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
              ::FIFTEEN USE CASES TRACKED ACROSS EPOCHS
            </p>
            <div className="flex flex-wrap gap-2">
              {USE_CASES.map((u) => (
                <span
                  key={u}
                  className="rounded-full border border-[#1A2225] bg-[#0A0F11] px-3 py-1.5 font-mono text-[11px] text-[#F2F4F5] transition-colors hover:border-[#22F0D5]/40"
                >
                  {u}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TWELVE KEY MOMENTS — illustrated archive with credits */}
      <StillGallery />

      {/* STREAMING PLAYLIST — where to watch each title, free options
            flagged, JustWatch link for live availability */}
      <StreamingPlaylist />

      {/* SEVEN EPOCHS — long-form chapters */}
      {EPOCHS.map((e, i) => {
        const isOdd = i % 2 === 1;
        return (
          <section
            key={e.num}
            className={`relative py-28 md:py-36 ${
              isOdd ? "bg-[#0A0F11]" : "bg-black"
            }`}
          >
            <div className="mx-auto w-full max-w-7xl px-6">
              <div className="grid gap-12 md:grid-cols-[200px_1fr] md:gap-20">
                {/* left rail: roman numeral + era */}
                <div className="md:sticky md:top-24 md:self-start">
                  <p
                    className="font-mono text-[60px] leading-none text-[#22F0D5]/70 md:text-[88px]"
                    style={{ fontVariationSettings: "'wght' 300" }}
                  >
                    {e.num}
                  </p>
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF7A1A]">
                    {e.era}
                  </p>
                </div>

                {/* right: chapter content */}
                <div>
                  <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
                    ::EPOCH {e.num}
                  </p>
                  <h2
                    className="text-balance text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-6xl"
                    style={{ fontVariationSettings: "'wght' 500" }}
                  >
                    {e.title}
                  </h2>
                  <p className="mt-6 max-w-3xl text-pretty text-base leading-[1.7] text-[#9BA5A7] md:text-lg">
                    {e.thesis}
                  </p>

                  {/* film cards */}
                  <div className="mt-12 space-y-px overflow-hidden rounded-2xl bg-[#1A2225]">
                    {e.films.map((f) => (
                      <div
                        key={f.title}
                        className="grid gap-3 bg-[#000] p-7 transition-colors hover:bg-[#0A0F11] md:grid-cols-[260px_1fr] md:gap-10 md:p-8"
                      >
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]/70">
                            {f.year}
                          </p>
                          <h3 className="mt-1 text-xl font-medium leading-snug text-[#F2F4F5]">
                            {f.title}
                          </h3>
                          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[#FF7A1A]">
                            {f.ai}
                          </p>
                        </div>
                        <p className="text-sm leading-[1.65] text-[#9BA5A7] md:text-base">
                          {f.insight}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* CONCLUSION */}
      <section className="relative isolate overflow-hidden bg-black py-32 md:py-44">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 50%, rgba(34,240,213,0.08) 0%, transparent 65%)",
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-4xl px-6">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::CONCLUSION
          </p>
          <h2
            className="text-balance text-4xl font-medium leading-[1.02] tracking-[-0.02em] text-[#F2F4F5] md:text-6xl"
            style={{ fontVariationSettings: "'wght' 500" }}
          >
            The machines are here.
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(110deg, #22F0D5 0%, #FF7A1A 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              They do not look like HAL.
            </span>
          </h2>
          <p className="mt-10 max-w-3xl text-pretty text-lg leading-[1.7] text-[#D2D8DA] md:text-xl">
            The century-long conversation between science fiction and
            artificial intelligence is not a monologue but a feedback loop.
            Real AI research has shaped screen depictions — HAL could not
            exist without the Dartmouth Conference, the Matrix could not
            exist without the internet, <em>Her</em> could not exist without
            Siri. And screen depictions have shaped real AI research — the
            term <em>robot</em> itself is a gift from fiction to reality;
            MIT&apos;s AI Lab was populated by Star Trek fans; contemporary
            safety researchers routinely cite Terminator, Colossus, and Ex
            Machina as formative.
          </p>
          <p className="mt-6 max-w-3xl text-pretty text-base leading-[1.7] text-[#9BA5A7] md:text-lg">
            The resulting picture is of a genre remarkably prescient about
            the architecture of AI risks while systematically blind to the
            economics of AI deployment. It has produced the most extensive
            philosophical exploration of machine consciousness in any
            medium while largely failing to engage with the more mundane —
            but arguably more consequential — questions of labor economics
            and attention manipulation. And it has, above all, provided a
            century of rehearsal for the moment we now face.
          </p>
          <p className="mt-10 max-w-3xl font-mono text-base uppercase tracking-[0.16em] text-[#FF7A1A]">
            The machines are here. They do not look like HAL or the
            Terminator or Ava. They look like a text box on a phone screen.
          </p>
          <p className="mt-6 max-w-3xl text-pretty text-base leading-[1.7] text-[#9BA5A7] md:text-lg">
            But the questions the genre has been asking — can it think, can
            it suffer, can it be trusted, can it be controlled, what does
            its existence mean for ours — are the same questions we are
            asking now. A century of imperfect, contradictory answers
            constitutes one of the richest intellectual resources available
            for navigating what comes next.
          </p>
        </div>
      </section>

      {/* BIBLIOGRAPHY */}
      <section className="relative bg-[#0A0F11] py-24">
        <div className="mx-auto w-full max-w-4xl px-6">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::SELECTED BIBLIOGRAPHY
          </p>
          <h2 className="text-balance text-3xl font-medium leading-tight tracking-[-0.01em] text-[#F2F4F5] md:text-4xl">
            Secondary sources informing the framework.
          </h2>
          <ul className="mt-8 space-y-3 text-sm leading-[1.7] text-[#9BA5A7] md:text-base">
            <li>
              Asimov, Isaac. <em>I, Robot</em>. Gnome Press, 1950.
            </li>
            <li>
              Bostrom, Nick.{" "}
              <em>Superintelligence: Paths, Dangers, Strategies</em>. Oxford
              University Press, 2014.
            </li>
            <li>
              Chalmers, David J. &ldquo;The Hard Problem of
              Consciousness.&rdquo; In{" "}
              <em>The Blackwell Companion to Consciousness</em>, eds.
              Velmans &amp; Schneider, 225–235. Blackwell, 2007.
            </li>
            <li>
              Clarke, Arthur C. <em>2001: A Space Odyssey</em>. New American
              Library, 1968.
            </li>
            <li>
              Dick, Philip K.{" "}
              <em>Do Androids Dream of Electric Sheep?</em> Doubleday, 1968.
            </li>
            <li>
              Gunkel, David J. <em>Robot Rights</em>. MIT Press, 2018.
            </li>
            <li>
              Jaynes, Julian.{" "}
              <em>
                The Origin of Consciousness in the Breakdown of the
                Bicameral Mind
              </em>
              . Houghton Mifflin, 1976.
            </li>
            <li>
              Omohundro, Steve. &ldquo;The Basic AI Drives.&rdquo;{" "}
              <em>Proceedings of the First AGI Conference</em>, 483–492. IOS
              Press, 2008.
            </li>
            <li>
              Russell, Stuart.{" "}
              <em>
                Human Compatible: Artificial Intelligence and the Problem of
                Control
              </em>
              . Viking, 2019.
            </li>
            <li>
              Searle, John. &ldquo;Minds, Brains, and Programs.&rdquo;{" "}
              <em>Behavioral and Brain Sciences</em> 3, no. 3 (1980):
              417–457.
            </li>
            <li>
              Sobchack, Vivian.{" "}
              <em>Screening Space: The American Science Fiction Film</em>.
              Rutgers University Press, 1997.
            </li>
            <li>
              Telotte, J. P.{" "}
              <em>
                Replications: A Robotic History of the Science Fiction Film
              </em>
              . University of Illinois Press, 1995.
            </li>
            <li>
              Turing, Alan. &ldquo;Computing Machinery and
              Intelligence.&rdquo; <em>Mind</em> 59, no. 236 (1950):
              433–460.
            </li>
            <li>
              Wiener, Norbert.{" "}
              <em>
                Cybernetics: Or Control and Communication in the Animal and
                the Machine
              </em>
              . MIT Press, 1948.
            </li>
          </ul>
        </div>
      </section>

      {/* FOOTER STRIP */}
      <section className="bg-black py-16">
        <div className="mx-auto w-full max-w-4xl px-6">
          <hr className="border-[#1A2225]" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
                ::doctrine
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#9BA5A7]">
                Monograph filed under ÆoNs Research. Published CC-BY 4.0 —
                cite it, forward it, print it.
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF7A1A]">
                ::next read
              </p>
              <ul className="mt-2 space-y-1 text-sm text-[#F2F4F5]">
                <li>
                  <Link
                    href="/research/papers"
                    className="hover:text-[#22F0D5]"
                  >
                    → All papers in the catalog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/research/about"
                    className="hover:text-[#22F0D5]"
                  >
                    → About ÆoNs Research
                  </Link>
                </li>
                <li>
                  <Link
                    href="/founders-view"
                    className="hover:text-[#22F0D5]"
                  >
                    → Tonight&apos;s broadcast
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
