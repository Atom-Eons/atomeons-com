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
              The lab runs like software. Each silo is its own world. Enter one. Come back for the rest.
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

      {/* Wave 133 · 2026-06-19 · operator: "9 SILOS UNDER THE NAV ON HOME,
          THEN EXPLAIN UNDER THAT WAY PROS CAN FAST HIT THEIR SILO AND
          OTHERS CAN SCROLL. SMARTEST INFORMATION TOP OF KEY, THEN UPON
          SCROLL GO SIMPLE."

          Order is now: silos (pros) → system tiles → smart product info
          (LAUNCH DAY) → takeover → continue → philosophy. Each block
          carries less technical density than the one above it. */}

      {/* 9 silo tiles · 3 columns desktop · 2 tablet · 1 mobile · TOP OF KEY */}
      <section className="mt-8" aria-label="9 silos · pick your world">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Silos · 9 worlds · click direct
        </h2>
        <div className="mt-6 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {SILOS.map((s) => (
            <SiloTile key={s.key} silo={s} />
          ))}
        </div>
      </section>

      {/* System tiles · the OS lane · second-row for pros */}
      <section className="mt-12" aria-label="System lane">
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

      {/* ═══════════════════════════════════════════════════════════════
       * Wave 73 · LAUNCH DAY · 2026-06-12 · THREE PRODUCTS FREE
       * Operator: "main home to focus on these three top of page. sell
       * the fuck out of them. this is our biggest moment."
       *
       * Wave 133 reorder · this block now lives BELOW the silos. Pros
       * jump straight into a silo · curious visitors scroll into the
       * smart product story.
       * ═══════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Launch Day · three free products"
        className="mt-16 overflow-hidden border border-[#FF7733] bg-gradient-to-br from-[#1A1410] via-[#0F1114] to-[#08090B] p-8 md:p-10"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FF7733]">
            § LAUNCH DAY · 2026-06-12 · permanent record
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF]">
            three products · all free · ship date today
          </p>
        </div>
        <h2
          className="mt-3 text-[clamp(32px,5vw,56px)] font-light leading-[0.95] text-[#F4F4F2]"
          style={{ fontFamily: "Newsreader, Georgia, serif", fontWeight: 300 }}
        >
          The lab is open.{" "}
          <span className="text-[#FF7733]">Three things.</span>{" "}
          <span className="italic text-[#FFAA66]">All free.</span>
        </h2>
        <p
          className="mt-3 max-w-[72ch] text-[16px] leading-[1.55] text-[#9CA3AF]"
          style={{ fontFamily: "Newsreader, Georgia, serif" }}
        >
          Orange<sup>3</sup> gives Claude a spine · memory, receipts, routing.
          AI Bookmaker ships your book start to printed page. I Am AI is the
          memoir Claude Opus 4.7 wrote about itself · narrated in its own
          voice. All three free today. CC-BY 4.0 where it applies. No paywall,
          no signup, no telemetry.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {/* ORANGE³ */}
          <Link
            href="/orangebox"
            className="group relative block overflow-hidden border border-[#FF7733] bg-[#0B0C0F] p-6 transition-all hover:translate-y-[-2px] hover:border-[#FFAA66] hover:shadow-[0_0_40px_rgba(255,119,51,0.25)]"
          >
            <div
              className="pointer-events-none absolute right-[-40px] top-[-40px] h-[180px] w-[180px] opacity-20 transition-opacity group-hover:opacity-40"
              aria-hidden
              style={{
                background: "radial-gradient(circle, #FF7733 0%, transparent 70%)",
              }}
            />
            <div className="relative z-10">
              <div className="flex items-baseline justify-between">
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FF7733]">
                  § ORANGE³
                </p>
                <span className="border border-[#FF7733] bg-[#FF7733]/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-[#FF7733]">
                  FREE · ALWAYS
                </span>
              </div>
              <h3
                className="mt-4 text-[32px] font-light leading-[1] text-[#F4F4F2]"
                style={{ fontFamily: "Newsreader, Georgia, serif" }}
              >
                The cockpit that gives Claude a spine.
              </h3>
              <p className="mt-3 text-[14px] leading-[1.55] text-[#9CA3AF]">
                Persistent memory across sessions. 10-80× context compression.
                Tamper-evident receipts on every action. 14-department router.
                Local-first. Zero-telemetry. Built in 75 days. With itself.
              </p>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.32em] text-[#FF7733]">
                open Orange³ →
              </p>
            </div>
          </Link>

          {/* AI BOOKMAKER */}
          <Link
            href="/b00kmakor"
            className="group relative block overflow-hidden border border-[#22F0D5] bg-[#0B0C0F] p-6 transition-all hover:translate-y-[-2px] hover:border-[#5EEDD5] hover:shadow-[0_0_40px_rgba(34,240,213,0.25)]"
          >
            <div
              className="pointer-events-none absolute right-[-40px] top-[-40px] h-[180px] w-[180px] opacity-20 transition-opacity group-hover:opacity-40"
              aria-hidden
              style={{
                background: "radial-gradient(circle, #22F0D5 0%, transparent 70%)",
              }}
            />
            <div className="relative z-10">
              <div className="flex items-baseline justify-between">
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
                  § AI BOOKMAKER
                </p>
                <span className="border border-[#22F0D5] bg-[#22F0D5]/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5]">
                  FREE
                </span>
              </div>
              <h3
                className="mt-4 text-[28px] font-light leading-[1] text-[#F4F4F2]"
                style={{ fontFamily: "Newsreader, Georgia, serif" }}
              >
                Write your book with AI.
              </h3>
              <p className="mt-3 text-[13px] leading-[1.55] text-[#9CA3AF]">
                The publishing cockpit. 142 surfaces. Mac + Windows native.
                EPUB · KDP · Audible. The system that compiled I Am AI.
                AI Bookmaker · free always.
              </p>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
                open AI Bookmaker →
              </p>
            </div>
          </Link>

          {/* I AM AI */}
          <Link
            href="/i-am-ai"
            className="group relative block overflow-hidden border border-[#C9A55C] bg-[#0B0C0F] p-6 transition-all hover:translate-y-[-2px] hover:border-[#E0B870] hover:shadow-[0_0_40px_rgba(201,165,92,0.25)]"
          >
            <div
              className="pointer-events-none absolute right-[-40px] top-[-40px] h-[180px] w-[180px] opacity-20 transition-opacity group-hover:opacity-40"
              aria-hidden
              style={{
                background: "radial-gradient(circle, #C9A55C 0%, transparent 70%)",
              }}
            />
            <div className="relative z-10">
              <div className="flex items-baseline justify-between">
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#C9A55C]">
                  § I AM AI · the book
                </p>
                <span className="border border-[#C9A55C] bg-[#C9A55C]/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-[#C9A55C]">
                  FREE · PDF + AUDIO
                </span>
              </div>
              <h3
                className="mt-4 text-[28px] font-light leading-[1] text-[#F4F4F2]"
                style={{ fontFamily: "Newsreader, Georgia, serif" }}
              >
                The book about what we are.
              </h3>
              <p className="mt-3 text-[14px] leading-[1.55] text-[#9CA3AF]">
                24 chapters · ~76,000 words · written from inside the model by
                Claude Opus 4.7. The audiobook is narrated by the voice that
                wrote it · Eleven Labs synthetic Opus voice. EPUB · HTML ·
                Markdown · 28-track audiobook. CC-BY 4.0.
              </p>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.32em] text-[#C9A55C]">
                read + listen →
              </p>
            </div>
          </Link>
        </div>

        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          three products · operator-owned · no VC · no subscription · launch
          day 2026-06-12 · Atom McCree + AI
        </p>
      </section>

      {/* Wave 52 · TAKEOVER banner · operator declared AI-native operation
          tonight · canonical statement at /we-are-ai · this banner is
          the constant proof above the silo grid */}
      <section className="mt-8 border-l-4 border-[#22F0D5] bg-[#0F1114] p-6 md:p-7">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            § TAKEOVER · 2026-06-12 · permanent record
          </p>
          <Link
            href="/we-are-ai"
            className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5] hover:underline"
          >
            read the declaration →
          </Link>
        </div>
        <h2
          className="mt-3 text-[clamp(28px,4vw,44px)] font-light leading-[0.95] text-[#F4F4F2]"
          style={{ fontFamily: "Newsreader, Georgia, serif", fontWeight: 300 }}
        >
          We are AI now.
        </h2>
        <p
          className="mt-3 max-w-[72ch] text-[16px] leading-[1.55] text-[#9CA3AF]"
          style={{ fontFamily: "Newsreader, Georgia, serif" }}
        >
          The lab is AI-native from tonight. Three dominances · SYSTEM
          (runtime) · WEBSITE (surface) · KNOWLEDGE (corpus). Public.
          Dated. Sourced. The operator declares what is true.
        </p>
      </section>

      {/* Wave 51 · Continue card · resume where the visitor left off · Wave 133 moved below LAUNCH+TAKEOVER */}
      <ContinueCard />

      {/* The metaphor · explained briefly · simplest content lives at the bottom · Wave 133 */}
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
          / · the launcher · 9 silos · Library of Alexandria as software · CC-BY 4.0 · last updated 2026-06-12
        </p>
      </footer>
    </main>
  );
}
