import type { Metadata } from "next";
import Link from "next/link";
import {
  AbstractGlyph,
  MandalaGlyph,
  NetworkGlyph,
  SpiralGlyph,
  ChevronGlyph,
  PrismGlyph,
  LatticeGlyph,
} from "../_components/V3/Illustrations";
import {
  FlowerOfLife,
  WaveInterference,
} from "../_components/V3/Illustrations2";
import { SILOS, type Silo } from "../_lib/silos";
import { ContinueCard } from "../_components/V3/ContinueCard";

/**
 * /launcher · the home reframe · the lab as software.
 *
 * Wave 47 · 2026-06-07 · operator: "home is the launcher · then the
 * manual · then the cyber loads and you have that fully · its so big
 * it needs to run like software almost."
 *
 * Steam-library / Apple-TV-home pattern · 9 silo tiles · each is a
 * launchable "application" · plus System tile for manual / version /
 * audit-log. "Continue last session" reads localStorage to deep-link
 * returning visitors to where they were.
 *
 * Mounted at /launcher AND at / (replacing the cinematic home, which
 * moves to /cinema for preservation).
 */

export const metadata: Metadata = {
  title: "AtomEons · the launcher",
  description:
    "AtomEons Systems Laboratory · the launcher. Pick a silo · enter a self-contained world. Learn · Cysec · Research · Books · Tools · AI Ware · Mindstate · Art · About. Plus the System tile · manual · version · audit log.",
  alternates: { canonical: "https://atomeons.com/" },
  openGraph: {
    title: "AtomEons · the launcher",
    description:
      "9 silos · each a fully immersive section · pick where to begin. Library of Alexandria as an application.",
    url: "https://atomeons.com/",
    type: "website",
  },
};

const GLYPH_MAP: Record<string, React.ComponentType<{ seed: number; hue: number; size: number }>> = {
  abstract: AbstractGlyph,
  mandala: MandalaGlyph,
  network: NetworkGlyph,
  spiral: SpiralGlyph,
  chevron: ChevronGlyph,
  prism: PrismGlyph,
  lattice: LatticeGlyph,
  "flower-of-life": FlowerOfLife,
  "wave-interference": WaveInterference,
};

function SiloTile({ silo }: { silo: Silo }) {
  const Glyph = GLYPH_MAP[silo.glyph] ?? AbstractGlyph;
  // Hash silo key for a stable hue
  let h = 0;
  for (let i = 0; i < silo.key.length; i++) h = (h * 31 + silo.key.charCodeAt(i)) | 0;
  const seed = Math.abs(h) % 12;
  return (
    <Link
      href={silo.home}
      className="group relative block overflow-hidden border bg-[#0B0C0F] p-6 transition-all hover:border-opacity-100 hover:translate-y-[-2px]"
      style={{
        borderColor: "#1F242B",
        background: `linear-gradient(180deg, ${silo.bgTint} 0%, rgba(11, 12, 15, 0.96) 60%)`,
      }}
    >
      {/* Background glyph · low opacity · decoration */}
      <div
        className="pointer-events-none absolute right-[-30px] top-[-30px] opacity-30 transition-opacity group-hover:opacity-70"
        aria-hidden
      >
        <Glyph seed={seed} hue={hashHue(silo.key)} size={220} />
      </div>

      {/* Foreground content */}
      <div className="relative z-10">
        <div className="flex items-baseline justify-between gap-3">
          <p
            className="font-mono text-[10px] uppercase tracking-[0.32em]"
            style={{ color: silo.accent }}
          >
            § {silo.name}
          </p>
          <span
            className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-50 transition-opacity group-hover:opacity-100"
            style={{ color: silo.accent }}
          >
            launch →
          </span>
        </div>
        <h3
          className="mt-4 text-[28px] font-light leading-tight text-[#F4F4F2] md:text-[32px]"
          style={{ fontFamily: "Newsreader, Georgia, serif" }}
        >
          {silo.tagline}
        </h3>
        <p className="mt-3 max-w-[36ch] text-[14px] leading-[1.55] text-[#9CA3AF]">
          {silo.description}
        </p>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a]">
          inside · {silo.inventory.slice(0, 80)}…
        </p>
      </div>
    </Link>
  );
}

function hashHue(key: string): number {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) | 0;
  return Math.abs(h >> 8) % 360;
}

const SYSTEM_TILES = [
  {
    name: "Manual",
    href: "/manual",
    description: "17-section user manual · PDF-printable · every feature documented.",
    accent: "#7a818a",
  },
  {
    name: "Version",
    href: "/version",
    description: "JUNE ROCKET release manifest · what shipped · what's deferred.",
    accent: "#7a818a",
  },
  {
    name: "Audit log",
    href: "/audit-log",
    description: "Every commit · 250 deep · SHA-linked to github.",
    accent: "#7a818a",
  },
  {
    name: "Tour",
    href: "/welcome",
    description: "First time? 90-second six-scroll introduction.",
    accent: "#7a818a",
  },
];

export default function LauncherPage() {
  return (
    <main className="launcher-root mx-auto max-w-[1480px] px-6 py-16 text-[#F4F4F2] md:px-10 md:py-20">
      <header className="border-b border-[#1F242B] pb-10">
        <div className="flex flex-wrap items-baseline justify-between gap-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#7a818a]">
              ATOMEONS · LAUNCHER · 2026
            </p>
            <h1
              className="mt-5 text-balance text-[clamp(56px,10vw,140px)] font-light leading-[0.88]"
              style={{ fontFamily: "Newsreader, Georgia, serif", fontWeight: 300 }}
            >
              Pick a silo.
            </h1>
            <p
              className="mt-3 text-[clamp(18px,2vw,22px)] font-light italic leading-[1.35] text-[#9CA3AF]"
              style={{ fontFamily: "Newsreader, Georgia, serif" }}
            >
              The lab runs like software. Each section is its own world. Enter, return when ready.
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 text-right">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
              ⌘ Shift S · swap silo from anywhere
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#7a818a]">
              ⌘ K · search the corpus
            </p>
            <Link
              href="/cinema"
              className="mt-2 font-mono text-[10px] uppercase tracking-[0.32em] text-[#9CA3AF] transition hover:text-[#22F0D5]"
            >
              Or take the cinematic home ↗
            </Link>
          </div>
        </div>
      </header>

      {/* Wave 51 · Continue card · resume where the visitor left off */}
      <ContinueCard />

      {/* 9 silo tiles · 3 columns desktop · 2 tablet · 1 mobile */}
      <section className="mt-12">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Silos · 9 worlds
        </h2>
        <div className="mt-6 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {SILOS.map((s) => (
            <SiloTile key={s.key} silo={s} />
          ))}
        </div>
      </section>

      {/* System tiles · the OS lane */}
      <section className="mt-16">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § System · the OS lane
        </h2>
        <div className="mt-6 grid gap-3 grid-cols-2 md:grid-cols-4">
          {SYSTEM_TILES.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="block border border-[#1F242B] p-5 transition hover:border-[#9CA3AF]"
            >
              <p
                className="font-mono text-[10px] uppercase tracking-[0.32em]"
                style={{ color: t.accent }}
              >
                {t.name}
              </p>
              <p className="mt-3 text-[13px] leading-[1.55] text-[#9CA3AF]">
                {t.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* The metaphor · explained briefly */}
      <section className="mt-20 border-l-4 border-[#22F0D5] bg-[#0F1114] p-7">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#22F0D5]">
          § The launcher pattern
        </h2>
        <p
          className="mt-3 text-[18px] leading-[1.55] text-[#F4F4F2]"
          style={{ fontFamily: "Newsreader, Georgia, serif" }}
        >
          Steam library. Apple TV home. macOS Mission Control. The lab is
          too big to navigate as a flat website · so each silo runs like
          its own application. The home is the launcher. Inside a silo,
          the chrome shrinks · the silo&apos;s own sub-nav appears · and
          a Swap Silo button stays one tap away. Built to be navigated
          like software.
        </p>
      </section>

      <footer className="mt-20 border-t border-[#1F242B] pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#7a818a]">
          / · the launcher · 9 silos · Library of Alexandria as software · CC-BY 4.0 · last updated 2026-06-07
        </p>
      </footer>
    </main>
  );
}
