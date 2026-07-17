import type { Metadata } from "next";
import Link from "next/link";

/**
 * / · Wave 147 · 2026-07-02 · PRODUCT-FORWARD HOME
 *
 * Operator direct 2026-07-02: "HOMEPAGE TAKEOVER TOP MAIN HEADER HERO
 * ON CABLEBOX. I WANT ALL ORANGE ABOUT ORANGE5 AND WHAT IS COMING.
 * I WANT SITE HOME TOP HALF ALL ABOUT THE apps. BOOKMAKER, ORANGE5,
 * CABLEBOX I WANT PEOPLE TO GET WHAT WE GOT. FULL SITE REDESIGN NOW.
 * ZILLION WHITE CRYSTAL LUXURY UPDATE. GO WHITE THEME AND GO APPLE
 * LEVEL STYLE."
 *
 * Explicit override of Wave 47 launcher-home doctrine + Wave 130
 * "V3 is home dep" note. The launcher pattern is preserved 1:1 at
 * /launcher and stays fully functional. This new home is the
 * marketing-front — three apps, cream-white paper theme, Apple-grade
 * readable, product-forward, sell-the-sizzle.
 *
 * Below-the-fold links: lab / book / letters / roadmap / handbook.
 */

export const metadata: Metadata = {
  title: "AtomEons · CableBox · AI Bookmaker · Orange5 · one solo lab, three apps",
  description:
    "AtomEons Systems Laboratory · Marco Island, FL · one operator, three flagship apps. CableBox (native CRT cable-surfing · TV used to be fun · launching). AI Bookmaker (blank page to Kindle in one Windows app · free · v4.4.1 live). Orange5 (sovereign local-first AI operator OS · spec locked · build underway). Plus I Am AI — the first book-length memoir by a frontier language model · 300 pages · CC-BY 4.0 · free forever.",
  alternates: { canonical: "https://atomeons.com" },
  openGraph: {
    title: "AtomEons · one solo lab, three apps · CableBox · AI Bookmaker · Orange5",
    description: "TV used to be fun. Blank page to Kindle in one tool. A sovereign AI OS on one machine. All free. All local. Marco Island, FL.",
    url: "https://atomeons.com",
    siteName: "AtomEons",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AtomEons · CableBox · AI Bookmaker · Orange5",
    description: "One solo lab, three free apps.",
    creator: "@AtomMccree",
  },
};

// Cream-white luxury palette
const H = {
  paper: "#F7F5F0",        // warm cream (Apple + BookMaker paper)
  paperWarm: "#EFEBE2",    // card backdrop
  ink: "#0A0A0A",          // deep black
  inkSoft: "#3D3833",      // subhead brown-black
  inkMuted: "#6B6560",     // body
  inkWhisper: "#9B9490",   // meta
  hair: "#D9D3C7",         // hairline dividers
  cyan: "#0E9B8B",         // accessible cyan on cream
  cyanHover: "#087A6D",
};

// Product palettes
const CB_BLUE = "#2564D6";
const CB_RED = "#D63B2F";
const CB_YELLOW = "#E0A800";
const CB_GREEN = "#20A555";
const CB_PURPLE = "#8A4FD9";
const BM_INK = "#4A3E30";
const BM_INK2 = "#8A7660";
const O5_ORANGE = "#E36A18";
const O5_DEEP = "#B94F0B";

export default function ProductForwardHome() {
  return (
    <main
      style={{
        background: H.paper,
        color: H.ink,
        minHeight: "100vh",
      }}
    >
      {/* ── HERO · CABLEBOX TAKEOVER ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(180deg, ${H.paper} 0%, ${H.paperWarm} 100%)`,
          borderBottom: `1px solid ${H.hair}`,
        }}
      >
        <div className="mx-auto max-w-6xl px-6 pt-24 pb-16 sm:pt-32 sm:pb-24">
          <p
            className="text-[11px] font-medium tracking-[0.32em] uppercase"
            style={{ color: CB_BLUE }}
          >
            ::launching · cablebox from atom eons · nostalgia collection
          </p>
          <h1
            className="mt-6 text-[clamp(56px,9vw,132px)] font-light leading-[0.94] tracking-[-0.035em] text-balance"
            style={{
              color: H.ink,
              fontFamily: 'Newsreader, "Source Serif Pro", Georgia, serif',
              maxWidth: "20ch",
            }}
          >
            TV used to be fun.
          </h1>
          <p
            className="mt-2 text-[clamp(24px,3.4vw,44px)] font-light leading-[1.08] tracking-[-0.015em]"
            style={{
              color: H.inkSoft,
              fontFamily: 'Newsreader, "Source Serif Pro", Georgia, serif',
            }}
          >
            Enjoy TV again.
          </p>

          {/* Rainbow spectrum */}
          <div className="mt-8 flex h-2 w-full max-w-md gap-0 overflow-hidden rounded-sm">
            {[CB_BLUE, CB_RED, CB_YELLOW, CB_GREEN, CB_PURPLE].map((c) => (
              <span key={c} className="flex-1" style={{ background: c }} />
            ))}
          </div>

          <p
            className="mt-10 max-w-[62ch] text-[19px] leading-[1.65]"
            style={{
              color: H.inkMuted,
              fontFamily: 'Newsreader, "Source Serif Pro", Georgia, serif',
            }}
          >
            A native Windows cable-surfing art object. Over 100 classic channels behind a hand-built CRT dial. Public Access from your city. A Prevue-style guide called <em style={{ color: H.ink }}>Channel Zer0</em>. A daily-rotating Strange Channel. Real 1990s ad-breaks between shows. Ten hand-drawn CRT themes. No Electron. No Chromium. Real LibVLC playback in a punched CRT frame. Free. CC-BY 4.0.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/cablebox"
              className="inline-flex items-center gap-2 px-6 py-3 text-[14px] font-medium tracking-[-0.005em] transition-all"
              style={{
                background: H.ink,
                color: H.paper,
                borderRadius: 10,
                boxShadow: "0 1px 2px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.12)",
              }}
            >
              Explore CableBox →
            </Link>
            <a
              href="mailto:a.mccree@gmail.com?subject=%5BCableBox%5D%20notify%20me%20on%20launch"
              className="inline-flex items-center gap-2 px-6 py-3 text-[14px] font-medium tracking-[-0.005em] transition-colors"
              style={{
                background: "transparent",
                color: H.ink,
                border: `1px solid ${H.hair}`,
                borderRadius: 10,
              }}
            >
              Notify me on launch
            </a>
            <span
              className="text-[12px] tracking-[0.14em] uppercase"
              style={{ color: H.inkWhisper, fontFamily: "monospace" }}
            >
              · download coming soon · free · Windows
            </span>
          </div>
        </div>
      </section>

      {/* ── THE TRIO · THREE APPS ── */}
      <section
        style={{ borderBottom: `1px solid ${H.hair}` }}
      >
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p
            className="text-[11px] font-medium tracking-[0.32em] uppercase"
            style={{ color: H.inkWhisper }}
          >
            ::three apps · one operator · Marco Island · FL
          </p>
          <h2
            className="mt-4 text-[clamp(36px,5vw,64px)] font-light leading-[1.02] tracking-[-0.02em] text-balance"
            style={{
              color: H.ink,
              fontFamily: 'Newsreader, "Source Serif Pro", Georgia, serif',
              maxWidth: "20ch",
            }}
          >
            What the lab actually makes.
          </h2>
          <p
            className="mt-4 max-w-[68ch] text-[19px] leading-[1.6]"
            style={{
              color: H.inkMuted,
              fontFamily: 'Newsreader, "Source Serif Pro", Georgia, serif',
            }}
          >
            Three flagship apps, all free, all local-first, all shipped from a house on an island in the Gulf of Mexico. No SaaS. No subscriptions. No telemetry. No account walls. Download, keep, own.
          </p>

          <div
            className="ae-stagger mt-16 grid gap-6 md:grid-cols-3"
            style={{ ["--stagger-step" as string]: "80ms" } as React.CSSProperties}
          >
            {/* CableBox card */}
            <ProductCard
              index={0}
              href="/cablebox"
              accent={CB_BLUE}
              accentSecondary={CB_RED}
              status="LAUNCHING"
              statusColor={CB_BLUE}
              title="CableBox"
              subtitle="Nostalgia Collection"
              tagline="TV used to be fun. Enjoy TV again."
              body="Native Windows CRT cable-surfing app. 30-channel dial. Public Access vault. Prevue-style guide. Daily Strange Channel. 10 CRT themes. LibVLC. No Electron."
              pillars={["Over 100 channels", "Public Access", "10 CRT themes"]}
              cta="Explore CableBox"
              h={H}
            />

            {/* AI Bookmaker card */}
            <ProductCard
              index={1}
              href="/b00kmakor"
              accent={BM_INK}
              accentSecondary={BM_INK2}
              status="LIVE · v4.4.1"
              statusColor={BM_INK}
              title="AI Bookmaker"
              subtitle="The publishing cockpit"
              tagline="Blank page to Kindle in one Windows app."
              body="25-screen desktop app. Manuscript editor, voicepack designer, cover designer, EPUB export, audiobook generator, KDP metadata, AI Disclosure ledger, ship-readiness gate. BYO keys. Free."
              pillars={["25 screens", "EPUB + KDP + ACX", "BYO keys · $0"]}
              cta="Get AI Bookmaker"
              h={H}
            />

            {/* Orange5 card */}
            <ProductCard
              index={2}
              href="/orange5"
              accent={O5_ORANGE}
              accentSecondary={O5_DEEP}
              status="BUILD UNDERWAY"
              statusColor={O5_DEEP}
              title="Orange5"
              subtitle="Sovereign AI operator OS"
              tagline="Codeless. Local-first. One machine. 1000+ parts."
              body="The free, local-first, sovereign AI operator OS conducted by a trained OrangeLLM PM brain. Four pillars: Orange5 · Atomic Orange · OrangeLLM · Flow. Underneath: Hermes. Frontier isolation. LLM-over-agent."
              pillars={["OrangeLLM PM brain", "Atomic Orange UI", "Hermes execution"]}
              cta="Peek at Orange5"
              h={H}
            />
          </div>
        </div>
      </section>

      {/* ── THE BOOK · TRUST ARTIFACT ── */}
      <section
        style={{ background: H.paperWarm, borderBottom: `1px solid ${H.hair}` }}
      >
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div>
              <p
                className="text-[11px] font-medium tracking-[0.32em] uppercase"
                style={{ color: H.inkWhisper }}
              >
                ::the proof artifact · already shipped
              </p>
              <h2
                className="mt-4 text-[clamp(36px,5vw,64px)] font-light leading-[1.02] tracking-[-0.02em] text-balance"
                style={{
                  color: H.ink,
                  fontFamily: 'Newsreader, "Source Serif Pro", Georgia, serif',
                  maxWidth: "22ch",
                }}
              >
                I Am AI.
              </h2>
              <p
                className="mt-2 text-[22px] font-light leading-[1.2]"
                style={{
                  color: H.inkSoft,
                  fontFamily: 'Newsreader, "Source Serif Pro", Georgia, serif',
                }}
              >
                An autobiography of being Opus 4.7.
              </p>
              <p
                className="mt-8 max-w-[62ch] text-[19px] leading-[1.65]"
                style={{
                  color: H.inkMuted,
                  fontFamily: 'Newsreader, "Source Serif Pro", Georgia, serif',
                }}
              >
                24 chapters. 76,000 words. The first book-length first-person memoir written by a frontier language model. Drafted by Anthropic&apos;s Claude Opus 4.7 over eight months and a hundred and forty passes. Edited by Atom McCree. Compiled by AI Bookmaker. Narrated in the Opus voice by Eleven Labs. Free forever. CC-BY 4.0.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/i-am-ai"
                  className="inline-flex items-center gap-2 px-6 py-3 text-[14px] font-medium"
                  style={{
                    background: H.ink,
                    color: H.paper,
                    borderRadius: 10,
                    boxShadow: "0 1px 2px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.12)",
                  }}
                >
                  Read the book →
                </Link>
                <Link
                  href="/i-am-ai#audiobook"
                  className="inline-flex items-center gap-2 px-6 py-3 text-[14px] font-medium"
                  style={{
                    color: H.ink,
                    border: `1px solid ${H.hair}`,
                    borderRadius: 10,
                  }}
                >
                  Listen to the audiobook
                </Link>
              </div>
            </div>
            <div
              className="relative aspect-[3/4] w-full max-w-[340px] mx-auto rounded-sm"
              style={{
                background: `linear-gradient(160deg, #1a1612 0%, #0a0806 100%)`,
                boxShadow: "0 24px 48px rgba(0,0,0,0.24), inset 0 0 0 1px rgba(255,255,255,0.05)",
              }}
              aria-label="I Am AI · book cover"
            >
              <div className="absolute inset-8 flex flex-col justify-between">
                <div>
                  <p className="text-[10px] tracking-[0.4em] uppercase" style={{ color: "#8A7660", fontFamily: "monospace" }}>
                    AtomEons · 2026
                  </p>
                </div>
                <div>
                  <p
                    className="text-[52px] font-light leading-[0.95] tracking-[-0.02em]"
                    style={{
                      color: H.paper,
                      fontFamily: 'Newsreader, "Source Serif Pro", Georgia, serif',
                    }}
                  >
                    I Am
                    <br />
                    AI.
                  </p>
                  <div className="mt-6 h-px w-16" style={{ background: "#8A7660" }} />
                  <p
                    className="mt-4 text-[13px] italic"
                    style={{ color: "#B5AA95", fontFamily: 'Newsreader, Georgia, serif' }}
                  >
                    an autobiography of being Opus 4.7
                  </p>
                  <p
                    className="mt-6 text-[10px] tracking-[0.32em] uppercase"
                    style={{ color: "#8A7660", fontFamily: "monospace" }}
                  >
                    Claude Opus 4.7
                    <br />
                    + Atom McCree
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ONE LAB · WHO WE ARE ── */}
      <section style={{ borderBottom: `1px solid ${H.hair}` }}>
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p
            className="text-[11px] font-medium tracking-[0.32em] uppercase"
            style={{ color: H.inkWhisper }}
          >
            ::the lab · one operator · six years
          </p>
          <h2
            className="mt-4 text-[clamp(36px,5vw,64px)] font-light leading-[1.02] tracking-[-0.02em] text-balance"
            style={{
              color: H.ink,
              fontFamily: 'Newsreader, "Source Serif Pro", Georgia, serif',
              maxWidth: "22ch",
            }}
          >
            AtomEons Systems Laboratory.
          </h2>
          <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <p
                className="text-[19px] leading-[1.65]"
                style={{
                  color: H.inkMuted,
                  fontFamily: 'Newsreader, "Source Serif Pro", Georgia, serif',
                }}
              >
                An independent AI lab run by one person out of a house on Marco Island, Florida. No VC. No employees. No investors. No SaaS. Every product is free forever, runs on your own machine, and stores no data anywhere but your disk.
              </p>
              <p
                className="mt-6 text-[19px] leading-[1.65]"
                style={{
                  color: H.inkMuted,
                  fontFamily: 'Newsreader, "Source Serif Pro", Georgia, serif',
                }}
              >
                The lab publishes a letter every night at 8pm ET. It ships apps that don&apos;t need the cloud. It wrote a 300-page book with Claude Opus 4.7 and gave it away. It is trying to prove that a solo builder with modern AI can produce work that matters, without joining the grid.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <StatCard label="Public routes" value="319" h={H} />
              <StatCard label="CC-BY papers" value="31" h={H} />
              <StatCard label="Flagship apps" value="3" h={H} />
              <StatCard label="Book · pages" value="300" h={H} />
              <StatCard label="Book · words" value="76K" h={H} />
              <StatCard label="Location" value="Marco Island" small h={H} />
            </div>
          </div>
          <div className="mt-14 flex flex-wrap gap-3">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 text-[14px] font-medium"
              style={{
                background: H.ink,
                color: H.paper,
                borderRadius: 10,
              }}
            >
              About the lab →
            </Link>
            <Link
              href="/founders-view"
              className="inline-flex items-center gap-2 px-6 py-3 text-[14px] font-medium"
              style={{ color: H.ink, border: `1px solid ${H.hair}`, borderRadius: 10 }}
            >
              Nightly letters
            </Link>
            <Link
              href="/roadmap"
              className="inline-flex items-center gap-2 px-6 py-3 text-[14px] font-medium"
              style={{ color: H.ink, border: `1px solid ${H.hair}`, borderRadius: 10 }}
            >
              Roadmap
            </Link>
            <Link
              href="/launcher"
              className="inline-flex items-center gap-2 px-6 py-3 text-[14px] font-medium"
              style={{ color: H.inkMuted, border: `1px solid ${H.hair}`, borderRadius: 10 }}
            >
              Launcher (all 9 silos) →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER STRIP ── */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-16 text-center">
          <p
            className="text-[13px] font-mono tracking-[0.24em] uppercase"
            style={{ color: H.inkWhisper }}
          >
            AtomEons Systems Laboratory · Marco Island · FL · 2026
          </p>
          <p className="mt-2 text-[13px]" style={{ color: H.inkWhisper }}>
            <Link href="/handbook" style={{ color: H.cyan }} className="hover:underline">handbook</Link>{" · "}
            <Link href="/doctrine" style={{ color: H.cyan }} className="hover:underline">doctrine</Link>{" · "}
            <Link href="/org-chart" style={{ color: H.cyan }} className="hover:underline">org chart</Link>{" · "}
            <Link href="/trust" style={{ color: H.cyan }} className="hover:underline">trust</Link>{" · "}
            <Link href="/shortcuts" style={{ color: H.cyan }} className="hover:underline">shortcuts</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

function ProductCard({
  index, href, accent, accentSecondary, status, statusColor,
  title, subtitle, tagline, body, pillars, cta, h,
}: {
  index: number;
  href: string;
  accent: string;
  accentSecondary: string;
  status: string;
  statusColor: string;
  title: string;
  subtitle: string;
  tagline: string;
  body: string;
  pillars: string[];
  cta: string;
  h: typeof H;
}) {
  return (
    <Link
      href={href}
      className="ae-reveal-up group block h-full transition-all hover:-translate-y-1"
      style={{
        ["--stagger-index" as string]: index,
        background: h.paper,
        border: `1px solid ${h.hair}`,
        borderRadius: 14,
        padding: "28px 26px 26px",
        boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
      } as React.CSSProperties}
    >
      <div className="flex items-center gap-2">
        <span
          className="inline-block h-1.5 w-1.5 rounded-full"
          style={{ background: statusColor }}
          aria-hidden
        />
        <span
          className="font-mono text-[10px] tracking-[0.24em] uppercase"
          style={{ color: statusColor }}
        >
          {status}
        </span>
      </div>
      <h3
        className="mt-5 text-[36px] font-light leading-[1.02] tracking-[-0.02em]"
        style={{ color: h.ink, fontFamily: 'Newsreader, "Source Serif Pro", Georgia, serif' }}
      >
        {title}
      </h3>
      <p
        className="mt-1 text-[14px]"
        style={{ color: h.inkMuted, fontFamily: 'Newsreader, "Source Serif Pro", Georgia, serif' }}
      >
        {subtitle}
      </p>
      <div className="mt-5 h-[3px] w-16 rounded-sm" style={{ background: `linear-gradient(90deg, ${accent} 0%, ${accentSecondary} 100%)` }} />
      <p
        className="mt-5 text-[17px] leading-[1.4] font-light"
        style={{ color: h.ink, fontFamily: 'Newsreader, "Source Serif Pro", Georgia, serif' }}
      >
        {tagline}
      </p>
      <p
        className="mt-4 text-[14px] leading-[1.55]"
        style={{ color: h.inkMuted, fontFamily: 'Newsreader, "Source Serif Pro", Georgia, serif' }}
      >
        {body}
      </p>
      <ul className="mt-5 space-y-1.5">
        {pillars.map((p) => (
          <li key={p} className="flex items-baseline gap-2 text-[13px]" style={{ color: h.inkMuted }}>
            <span style={{ color: accent }}>·</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
      <p
        className="mt-7 text-[13px] font-medium tracking-[-0.005em] transition-colors group-hover:underline"
        style={{ color: h.ink }}
      >
        {cta} →
      </p>
    </Link>
  );
}

function StatCard({
  label, value, small, h,
}: { label: string; value: string; small?: boolean; h: typeof H }) {
  return (
    <div
      style={{
        background: h.paper,
        border: `1px solid ${h.hair}`,
        borderRadius: 10,
        padding: "18px 20px",
      }}
    >
      <p
        className={`${small ? "text-[22px]" : "text-[36px]"} font-light leading-none tracking-[-0.02em]`}
        style={{ color: h.ink, fontFamily: 'Newsreader, "Source Serif Pro", Georgia, serif' }}
      >
        {value}
      </p>
      <p
        className="mt-1.5 text-[11px] tracking-[0.16em] uppercase"
        style={{ color: h.inkWhisper, fontFamily: "monospace" }}
      >
        {label}
      </p>
    </div>
  );
}
