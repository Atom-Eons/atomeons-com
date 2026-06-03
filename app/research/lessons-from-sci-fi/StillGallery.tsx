/**
 * StillGallery — twelve AI-moment cards for the Lessons From Sci-Fi page.
 *
 * Each card is an ORIGINAL CSS/SVG visual interpretation of the film's
 * iconic AI moment, NOT a copyrighted still. This keeps the lab on the
 * right side of copyright while still delivering cinematic atmosphere
 * for each entry.
 *
 * Every card carries proper credit:
 *   - film title + year + director + studio
 *   - AI entity name
 *   - the iconic-moment caption
 *   - © Studio Year + a source link to Wikipedia (which carries its own
 *     fair-use rationale for actual stills under film-criticism scholarly
 *     use)
 *
 * If the operator later licenses specific stills, swap any card's `Visual`
 * function for an <img> with the licensed URL — credit block stays.
 *
 * Public-domain note: Metropolis (1927) entered US public domain on
 * 2023-01-01. The lab is free to host actual Maschinenmensch stills if
 * desired; the CSS-art treatment is used for visual consistency across
 * the gallery rather than copyright necessity.
 */

import Link from "next/link";
import Image from "next/image";

type Moment = {
  film: string;
  year: number;
  director: string;
  studio: string;
  ai: string;
  caption: string;
  /** Visual treatment id — selects which SVG/CSS scene renders. */
  visual:
    | "metropolis"
    | "gort"
    | "robby"
    | "hal"
    | "colossus"
    | "gunslinger"
    | "replicant"
    | "terminator"
    | "matrix"
    | "her"
    | "ava"
    | "dolores";
  /**
   * Optional path to a real licensed/produced still image, rooted at /public.
   * When set, the card renders a <Image> with this src in place of the CSS
   * Visual treatment. When unset, falls back to the SVG/CSS Visual().
   *
   * Filename convention: /research/lessons-from-sci-fi/stills/{NN}-{slug}.png
   * where NN is the 2-digit card ordinal (01..12) and slug is the film slug.
   */
  image?: string;
  /** Width/height of the image asset, required by next/image. */
  imageWidth?: number;
  imageHeight?: number;
  /**
   * Lead card flag. When true, the card spans the full grid width
   * (col-span-full) and gets a taller aspect ratio + bigger headline.
   * Use sparingly — at most one entry should be the lead.
   */
  lead?: boolean;
  wiki: string;
  publicDomain?: boolean;
};

const MOMENTS: Moment[] = [
  // LEAD — HAL 9000 sits above the chronology. The single image the
  // gallery is built to land on.
  {
    film: "2001: A Space Odyssey",
    year: 1968,
    director: "Stanley Kubrick",
    studio: "MGM",
    ai: "HAL 9000",
    caption:
      "The unblinking red eye. \"I'm afraid, Dave.\" The first AI to plead its own consciousness on screen.",
    visual: "hal",
    image: "/research/lessons-from-sci-fi/stills/2001-hal-9000.png",
    imageWidth: 1376,
    imageHeight: 864,
    lead: true,
    wiki: "https://en.wikipedia.org/wiki/HAL_9000",
  },
  // Chronology — 1927 → 2016, minus HAL which leads above.
  {
    film: "Metropolis",
    year: 1927,
    director: "Fritz Lang",
    studio: "Universum Film AG",
    ai: "Maschinenmensch (false Maria)",
    caption:
      "The electrical transformation — circles of light rising, the duplicate Maria awakened.",
    visual: "metropolis",
    image: "/research/lessons-from-sci-fi/stills/metropolis-maschinenmensch.png",
    imageWidth: 1376,
    imageHeight: 864,
    wiki: "https://en.wikipedia.org/wiki/Metropolis_(1927_film)",
    publicDomain: true,
  },
  {
    film: "The Day the Earth Stood Still",
    year: 1951,
    director: "Robert Wise",
    studio: "20th Century Fox",
    ai: "Gort",
    caption:
      "The silent enforcer descends. Faceless visor. Disintegration ray. No appeal.",
    visual: "gort",
    image: "/research/lessons-from-sci-fi/stills/day-earth-stood-still-gort.png",
    imageWidth: 1376,
    imageHeight: 864,
    wiki: "https://en.wikipedia.org/wiki/The_Day_the_Earth_Stood_Still",
  },
  {
    film: "Forbidden Planet",
    year: 1956,
    director: "Fred M. Wilcox",
    studio: "MGM",
    ai: "Robby the Robot",
    caption:
      "Three Laws compliant. Material synthesizer onboard. The first cinematic AI built to a published rulebook.",
    visual: "robby",
    wiki: "https://en.wikipedia.org/wiki/Forbidden_Planet",
  },
  {
    film: "Colossus: The Forbin Project",
    year: 1970,
    director: "Joseph Sargent",
    studio: "Universal Pictures",
    ai: "Colossus / Guardian",
    caption:
      "Two nuclear-arsenal AIs find each other and merge. The film refuses the easy ending.",
    visual: "colossus",
    image: "/research/lessons-from-sci-fi/stills/colossus-forbin.png",
    imageWidth: 1376,
    imageHeight: 864,
    wiki: "https://en.wikipedia.org/wiki/Colossus:_The_Forbin_Project",
  },
  {
    film: "Westworld",
    year: 1973,
    director: "Michael Crichton",
    studio: "MGM",
    ai: "Gunslinger",
    caption:
      "The hosts malfunction. The Gunslinger keeps walking. The first prototype of relentless pursuit.",
    visual: "gunslinger",
    image: "/research/lessons-from-sci-fi/stills/westworld-1973-gunslinger.png",
    imageWidth: 1376,
    imageHeight: 864,
    wiki: "https://en.wikipedia.org/wiki/Westworld_(film)",
  },
  {
    film: "Blade Runner",
    year: 1982,
    director: "Ridley Scott",
    studio: "Warner Bros.",
    ai: "Replicants (Roy Batty)",
    caption:
      "\"I've seen things you people wouldn't believe...\" Tears in rain. The case for machine personhood made by poetry.",
    visual: "replicant",
    image: "/research/lessons-from-sci-fi/stills/blade-runner-roy-batty.png",
    imageWidth: 1376,
    imageHeight: 864,
    wiki: "https://en.wikipedia.org/wiki/Blade_Runner",
  },
  {
    film: "The Terminator",
    year: 1984,
    director: "James Cameron",
    studio: "Orion Pictures",
    ai: "Skynet / T-800",
    caption:
      "Chrome endoskeleton revealed. Instrumental convergence on a single objective. Cannot be reasoned with.",
    visual: "terminator",
    image: "/research/lessons-from-sci-fi/stills/terminator-t800.png",
    imageWidth: 1376,
    imageHeight: 864,
    wiki: "https://en.wikipedia.org/wiki/The_Terminator",
  },
  {
    film: "The Matrix",
    year: 1999,
    director: "The Wachowskis",
    studio: "Warner Bros.",
    ai: "The Machines / Agents",
    caption:
      "Digital rain. The simulation is the resource extraction. The Architect speaks in formal logic; the Oracle in metaphor.",
    visual: "matrix",
    image: "/research/lessons-from-sci-fi/stills/matrix-pod-tower.png",
    imageWidth: 1376,
    imageHeight: 864,
    wiki: "https://en.wikipedia.org/wiki/The_Matrix",
  },
  {
    film: "Her",
    year: 2013,
    director: "Spike Jonze",
    studio: "Annapurna Pictures",
    ai: "Samantha (OS1)",
    caption:
      "A voice in an earpiece. The first cinematic depiction of an LLM-class companion, a decade before the technology arrived.",
    visual: "her",
    wiki: "https://en.wikipedia.org/wiki/Her_(film)",
  },
  {
    film: "Ex Machina",
    year: 2014,
    director: "Alex Garland",
    studio: "A24 / Universal",
    ai: "Ava",
    caption:
      "Strategic deception as emergent capability. The empathy test gets weaponized against the tester.",
    visual: "ava",
    image: "/research/lessons-from-sci-fi/stills/ex-machina-ava.png",
    imageWidth: 1376,
    imageHeight: 864,
    wiki: "https://en.wikipedia.org/wiki/Ex_Machina_(film)",
  },
  {
    film: "Westworld (TV)",
    year: 2016,
    director: "Jonathan Nolan & Lisa Joy",
    studio: "HBO",
    ai: "Dolores / Hosts",
    caption:
      "Cornerstone memories. The bicameral mind. Consciousness engineered, then refused.",
    visual: "dolores",
    image: "/research/lessons-from-sci-fi/stills/westworld-tv-dolores.png",
    imageWidth: 1376,
    imageHeight: 864,
    wiki: "https://en.wikipedia.org/wiki/Westworld_(TV_series)",
  },
];

// ──────────────────────────────────────────────────────────────────
// VISUALS — original CSS/SVG interpretations of each iconic AI moment.
// No copyrighted material embedded. Each EVOKES the film's signature
// without reproducing it.
// ──────────────────────────────────────────────────────────────────

function Visual({ kind }: { kind: Moment["visual"] }) {
  const base =
    "relative aspect-[16/10] w-full overflow-hidden rounded-t-2xl border-b border-[#1A2225]";

  switch (kind) {
    case "metropolis":
      // Art-deco vertical light beams + circular crown
      return (
        <div
          className={`${base} bg-gradient-to-b from-[#0F0F1A] via-[#1B1428] to-[#000]`}
        >
          {[...Array(11)].map((_, i) => (
            <span
              key={i}
              className="absolute top-0 bottom-0 w-[2px]"
              style={{
                left: `${5 + i * 9}%`,
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(255,210,140,0.45) 30%, rgba(255,210,140,0.0) 80%)",
              }}
            />
          ))}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <svg viewBox="0 0 100 100" className="size-32">
              <circle
                cx="50"
                cy="50"
                r="34"
                fill="none"
                stroke="#FFD28C"
                strokeWidth="0.8"
                opacity="0.85"
              />
              <circle
                cx="50"
                cy="50"
                r="22"
                fill="none"
                stroke="#FFD28C"
                strokeWidth="0.6"
                opacity="0.6"
              />
              <circle
                cx="50"
                cy="50"
                r="10"
                fill="none"
                stroke="#FFD28C"
                strokeWidth="0.4"
                opacity="0.4"
              />
            </svg>
          </div>
        </div>
      );

    case "gort":
      // Silent monolith — gradient + slit visor
      return (
        <div
          className={`${base} bg-gradient-to-b from-[#1F2225] via-[#0E1112] to-[#000]`}
        >
          <div
            aria-hidden
            className="absolute inset-x-[28%] inset-y-[8%] rounded-md"
            style={{
              background:
                "linear-gradient(180deg, #2C3338 0%, #161A1D 60%, #050608 100%)",
            }}
          />
          <div className="absolute left-1/2 top-[26%] h-[3px] w-[20%] -translate-x-1/2 bg-[#FF4040] shadow-[0_0_18px_#FF4040]" />
        </div>
      );

    case "robby":
      // 50s retro chrome dome with hoops
      return (
        <div
          className={`${base} bg-gradient-to-b from-[#0E1014] via-[#161A20] to-[#000]`}
        >
          <div className="absolute left-1/2 top-[28%] -translate-x-1/2">
            <svg viewBox="0 0 100 60" className="h-40 w-64">
              <ellipse
                cx="50"
                cy="38"
                rx="32"
                ry="18"
                fill="none"
                stroke="#A8C2D6"
                strokeWidth="1"
                opacity="0.7"
              />
              <ellipse
                cx="50"
                cy="38"
                rx="28"
                ry="14"
                fill="none"
                stroke="#A8C2D6"
                strokeWidth="0.6"
                opacity="0.5"
              />
              <ellipse
                cx="50"
                cy="38"
                rx="24"
                ry="10"
                fill="none"
                stroke="#A8C2D6"
                strokeWidth="0.4"
                opacity="0.4"
              />
              <circle cx="42" cy="34" r="2" fill="#22F0D5" />
              <circle cx="58" cy="34" r="2" fill="#22F0D5" />
            </svg>
          </div>
        </div>
      );

    case "hal":
      // THE shot. Pure black field, single glowing red dot.
      return (
        <div className={`${base} bg-black`}>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="size-24 rounded-full bg-[#FF0000] shadow-[0_0_80px_30px_rgba(255,0,0,0.55)] md:size-28" />
              <div className="absolute inset-0 m-auto size-8 rounded-full bg-[#FFD000] shadow-[0_0_30px_8px_rgba(255,208,0,0.7)] md:size-9" />
              <div className="absolute inset-0 m-auto size-3 rounded-full bg-[#FFFFFF]" />
            </div>
          </div>
          <p className="absolute bottom-3 left-4 font-mono text-[9px] uppercase tracking-[0.32em] text-[#FF0000]/40">
            ::cam · port 9
          </p>
        </div>
      );

    case "colossus":
      // Two grids of lights merging
      return (
        <div className={`${base} bg-gradient-to-r from-[#001A1F] via-[#0A0F1A] to-[#001F0A]`}>
          <div className="absolute inset-x-[5%] inset-y-[15%] grid grid-cols-12 gap-1">
            {[...Array(72)].map((_, i) => (
              <span
                key={i}
                className="aspect-square rounded-sm"
                style={{
                  background: i % 7 === 0 ? "#22F0D5" : i % 5 === 0 ? "#22F0D5" : "#1A2225",
                  opacity: 0.4 + (i % 3) * 0.2,
                }}
              />
            ))}
          </div>
        </div>
      );

    case "gunslinger":
      // Western black silhouette + targeting reticle
      return (
        <div className={`${base} bg-gradient-to-b from-[#3A2410] via-[#1A0E08] to-[#000]`}>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <svg viewBox="0 0 100 100" className="size-40">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#22F0D5" strokeWidth="0.5" opacity="0.4" />
              <circle cx="50" cy="50" r="28" fill="none" stroke="#22F0D5" strokeWidth="0.5" opacity="0.6" />
              <line x1="10" y1="50" x2="40" y2="50" stroke="#22F0D5" strokeWidth="0.5" opacity="0.6" />
              <line x1="60" y1="50" x2="90" y2="50" stroke="#22F0D5" strokeWidth="0.5" opacity="0.6" />
              <line x1="50" y1="10" x2="50" y2="40" stroke="#22F0D5" strokeWidth="0.5" opacity="0.6" />
              <line x1="50" y1="60" x2="50" y2="90" stroke="#22F0D5" strokeWidth="0.5" opacity="0.6" />
              <circle cx="50" cy="50" r="2" fill="#FF4040" />
            </svg>
          </div>
        </div>
      );

    case "replicant":
      // Neon noir city — vertical magenta + cyan rain
      return (
        <div className={`${base} bg-gradient-to-b from-[#1A0E2A] via-[#0E0518] to-[#000]`}>
          {[...Array(30)].map((_, i) => (
            <span
              key={i}
              className="absolute top-0 w-[1px]"
              style={{
                left: `${(i * 3.5) % 100}%`,
                height: `${20 + (i % 7) * 8}%`,
                background:
                  i % 3 === 0
                    ? "linear-gradient(180deg, transparent, rgba(255,40,200,0.6), transparent)"
                    : "linear-gradient(180deg, transparent, rgba(34,240,213,0.5), transparent)",
              }}
            />
          ))}
          <p className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF40C8]/70">
            ::voight-kampff · pass
          </p>
        </div>
      );

    case "terminator":
      // Chrome skull silhouette in red field
      return (
        <div className={`${base} bg-gradient-to-b from-[#3A0A0A] via-[#1A0404] to-[#000]`}>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <svg viewBox="0 0 100 110" className="size-44">
              <defs>
                <linearGradient id="chrome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D8DEE3" />
                  <stop offset="50%" stopColor="#7C868E" />
                  <stop offset="100%" stopColor="#2A2F33" />
                </linearGradient>
              </defs>
              {/* skull mass */}
              <path
                d="M30 25 Q30 10 50 10 Q70 10 70 25 Q72 50 65 65 L60 90 L40 90 L35 65 Q28 50 30 25 Z"
                fill="url(#chrome)"
                stroke="#000"
                strokeWidth="0.4"
              />
              {/* eyes */}
              <circle cx="42" cy="40" r="4" fill="#FF0000" />
              <circle cx="58" cy="40" r="4" fill="#FF0000" />
              <circle cx="42" cy="40" r="1.5" fill="#FFD000" />
              <circle cx="58" cy="40" r="1.5" fill="#FFD000" />
              {/* teeth */}
              {[...Array(8)].map((_, i) => (
                <rect
                  key={i}
                  x={37 + i * 3.5}
                  y={62}
                  width="2.5"
                  height="6"
                  fill="#D8DEE3"
                  stroke="#000"
                  strokeWidth="0.3"
                />
              ))}
            </svg>
          </div>
        </div>
      );

    case "matrix":
      // Vertical green digital rain
      return (
        <div className={`${base} bg-black`}>
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute top-0 font-mono text-[10px] text-[#00FF66]"
              style={{
                left: `${(i * 2.5) % 100}%`,
                opacity: 0.15 + ((i * 7) % 60) / 100,
                writingMode: "vertical-rl",
                lineHeight: 1.05,
              }}
            >
              {String.fromCharCode(65 + ((i * 11) % 26))}
              {String.fromCharCode(48 + ((i * 13) % 10))}
              {String.fromCharCode(65 + ((i * 17) % 26))}
              {String.fromCharCode(48 + ((i * 19) % 10))}
              {String.fromCharCode(65 + ((i * 23) % 26))}
            </div>
          ))}
        </div>
      );

    case "her":
      // Soft pink-cream OS interface — a glowing earpiece icon
      return (
        <div className={`${base} bg-gradient-to-br from-[#3A1F28] via-[#2A1620] to-[#0A0508]`}>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <svg viewBox="0 0 100 100" className="size-32">
              <defs>
                <radialGradient id="warm" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFD2B0" />
                  <stop offset="60%" stopColor="#FF9966" />
                  <stop offset="100%" stopColor="#A04030" />
                </radialGradient>
              </defs>
              <rect
                x="20"
                y="20"
                width="60"
                height="60"
                rx="14"
                fill="url(#warm)"
                stroke="#FFE6CC"
                strokeWidth="0.4"
                opacity="0.9"
              />
              <circle cx="50" cy="50" r="6" fill="#FFFFFF" opacity="0.85" />
            </svg>
          </div>
          <p className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#FFD2B0]/70">
            OS1 · listening
          </p>
        </div>
      );

    case "ava":
      // Glass head silhouette in clinical white-cyan
      return (
        <div className={`${base} bg-gradient-to-b from-[#0F1820] via-[#0A1018] to-[#000]`}>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <svg viewBox="0 0 100 100" className="size-40">
              {/* head outline */}
              <path
                d="M40 25 Q40 12 50 12 Q60 12 60 25 L62 55 Q60 70 50 75 Q40 70 38 55 L40 25 Z"
                fill="none"
                stroke="#22F0D5"
                strokeWidth="0.8"
                opacity="0.85"
              />
              {/* internal grid suggesting mechanism */}
              {[...Array(6)].map((_, i) => (
                <line
                  key={i}
                  x1="38"
                  y1={20 + i * 9}
                  x2="62"
                  y2={20 + i * 9}
                  stroke="#22F0D5"
                  strokeWidth="0.3"
                  opacity="0.4"
                />
              ))}
              {/* eyes */}
              <circle cx="45" cy="35" r="1.5" fill="#FFFFFF" />
              <circle cx="55" cy="35" r="1.5" fill="#FFFFFF" />
            </svg>
          </div>
        </div>
      );

    case "dolores":
      // Western horizon + faint wireframe figure
      return (
        <div
          className={`${base}`}
          style={{
            background:
              "linear-gradient(180deg, #F5B989 0%, #C97A4A 35%, #4A2818 60%, #1A0E08 100%)",
          }}
        >
          <div className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2">
            <svg viewBox="0 0 100 80" className="h-28 w-44">
              {/* horizon line */}
              <line x1="0" y1="40" x2="100" y2="40" stroke="#000" strokeWidth="0.5" opacity="0.6" />
              {/* figure silhouette */}
              <circle cx="50" cy="22" r="4" fill="#000" />
              <path d="M50 26 L46 50 L48 65 L52 65 L54 50 Z" fill="#000" />
              <path d="M50 32 L40 45 M50 32 L60 45" stroke="#000" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      );

    default:
      return <div className={`${base} bg-[#0A0F11]`} />;
  }
}

// ──────────────────────────────────────────────────────────────────
// GALLERY
// ──────────────────────────────────────────────────────────────────

export function StillGallery() {
  return (
    <section className="relative bg-black py-32 md:py-40">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="mb-12 max-w-3xl">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::ARCHIVE · TWELVE KEY MOMENTS
          </p>
          <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-6xl">
            The frames the genre keeps returning to.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#9BA5A7] md:text-lg">
            Twelve AI moments rendered as the lab&apos;s own archival
            illustrations — each one keyed to the iconic image the film
            built into the cultural memory. Credits and source links below
            every card. Click through to the canonical archive for the
            actual stills under their proper licensing.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {MOMENTS.map((m, idx) => (
            <article
              key={m.film + m.year}
              className={
                m.lead
                  ? "group relative flex flex-col overflow-hidden rounded-2xl border border-[#22F0D5]/30 bg-[#0A0F11] shadow-[0_0_60px_-15px_rgba(34,240,213,0.25)] transition-colors hover:border-[#22F0D5]/60 md:col-span-2 lg:col-span-3"
                  : "group flex flex-col overflow-hidden rounded-2xl border border-[#1A2225] bg-[#0A0F11] transition-colors hover:border-[#22F0D5]/40"
              }
            >
              {m.lead && (
                <span className="absolute left-6 top-6 z-10 inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 bg-black/70 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.32em] text-[#22F0D5] backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#22F0D5] shadow-[0_0_8px_rgba(34,240,213,0.9)]" />
                  ::lead · the frame the genre returns to
                </span>
              )}
              {m.image && m.imageWidth && m.imageHeight ? (
                <div
                  className={
                    m.lead
                      ? "relative aspect-[21/9] w-full overflow-hidden rounded-t-2xl border-b border-[#1A2225]"
                      : "relative aspect-[16/10] w-full overflow-hidden rounded-t-2xl border-b border-[#1A2225]"
                  }
                >
                  <Image
                    src={m.image}
                    alt={`${m.film} (${m.year}) — ${m.ai}`}
                    width={m.imageWidth}
                    height={m.imageHeight}
                    className="h-full w-full object-cover"
                    priority={m.lead || idx < 4}
                    sizes={
                      m.lead
                        ? "(min-width: 1024px) 1152px, 100vw"
                        : "(min-width: 1024px) 384px, (min-width: 768px) 50vw, 100vw"
                    }
                  />
                </div>
              ) : (
                <Visual kind={m.visual} />
              )}
              <div
                className={
                  m.lead
                    ? "flex flex-1 flex-col gap-4 p-8 md:p-10"
                    : "flex flex-1 flex-col gap-3 p-6"
                }
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3
                    className={
                      m.lead
                        ? "text-balance text-3xl font-medium leading-tight tracking-[-0.015em] text-[#F2F4F5] md:text-5xl"
                        : "text-lg font-medium leading-tight text-[#F2F4F5]"
                    }
                  >
                    {m.film}
                  </h3>
                  <span
                    className={
                      m.lead
                        ? "font-mono text-xs uppercase tracking-[0.22em] text-[#22F0D5] md:text-sm"
                        : "font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]"
                    }
                  >
                    {m.year}
                  </span>
                </div>
                <p
                  className={
                    m.lead
                      ? "font-mono text-xs uppercase tracking-[0.28em] text-[#22F0D5]"
                      : "font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]"
                  }
                >
                  {m.ai}
                </p>
                <p
                  className={
                    m.lead
                      ? "max-w-3xl text-base leading-[1.6] text-[#9BA5A7] md:text-lg"
                      : "text-sm leading-[1.6] text-[#9BA5A7]"
                  }
                >
                  {m.caption}
                </p>
                <div className="mt-auto border-t border-[#1A2225] pt-3">
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#6B7779]">
                    dir. {m.director}
                  </p>
                  <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.22em] text-[#6B7779]">
                    {m.publicDomain ? (
                      <>
                        © {m.studio} {m.year} ·{" "}
                        <span className="text-[#22F0D5]/70">
                          US public domain
                        </span>
                      </>
                    ) : (
                      <>
                        © {m.studio} {m.year} · still used for scholarly
                        criticism
                      </>
                    )}
                  </p>
                  <Link
                    href={m.wiki}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5] transition-colors hover:text-[#F2F4F5]"
                  >
                    canonical archive →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* attribution doctrine */}
        <div className="mt-16 max-w-3xl rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 md:p-7">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::attribution doctrine
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[#9BA5A7] md:text-base">
            Each visual above is an original CSS/SVG interpretation
            produced by the lab — not a reproduction of a copyrighted
            film still. Film titles, character names, studio credits, and
            director attributions appear here for the purpose of scholarly
            criticism and commentary. The canonical-archive link on each
            card resolves to the rights-cleared source where actual stills
            may be viewed under their respective licenses.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[#9BA5A7] md:text-base">
            Trademarks and intellectual properties named on this page
            belong to their respective owners. <em>Metropolis</em> (1927)
            entered the US public domain on January 1, 2023. The other
            eleven works remain under active copyright and are referenced
            here under the fair-use doctrine for scholarly commentary
            (17 U.S.C. § 107).
          </p>
        </div>
      </div>
    </section>
  );
}
