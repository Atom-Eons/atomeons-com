import type { Metadata } from "next";
import Link from "next/link";

/**
 * /cablebox · Wave 146 · 2026-07-02 · LAUNCH PAGE
 *
 * CableBox from Atom Eons · Nostalgia Collection · TV USED TO BE FUN.
 *
 * Native C# WinForms + LibVLC cable-surfing art object. No Electron.
 * No Chromium. No browser playback. A CRT dial over a curated Pluto/
 * Tubi live universe with Public Access, Channel Zer0 (Prevue-style
 * guide), a Strange Channel, 7 Favorites, and 10 CRT themes.
 *
 * Everything on this page is live NOW except the download button.
 * Operator will hand off the release binary when the build is green.
 */

export const metadata: Metadata = {
  title: "CableBox from Atom Eons · Nostalgia Collection · TV used to be fun",
  description:
    "CableBox from Atom Eons · Nostalgia Collection. Over 100 classic channels · Public Access · Retro Cable Guide · Actual Ads · 7 Favorites · 10 TV Themes. Native Windows CRT cable-surfing app. No Electron, no Chromium — real LibVLC playback in a punched CRT frame. TV used to be fun. Enjoy TV again. Free · CC-BY 4.0.",
  alternates: { canonical: "https://atomeons.com/cablebox" },
  openGraph: {
    title: "CableBox from Atom Eons · Nostalgia Collection",
    description: "TV used to be fun. Enjoy TV again. Free native CRT cable-surfing app for Windows.",
    url: "https://atomeons.com/cablebox",
    type: "website",
    siteName: "AtomEons",
  },
  twitter: {
    card: "summary_large_image",
    title: "CableBox · Nostalgia Collection",
    description: "TV used to be fun. Enjoy TV again. Free.",
    creator: "@AtomMccree",
  },
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "CableBox from Atom Eons",
  alternateName: "AE CableBox · Nostalgia Collection",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Windows 10, Windows 11",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: {
    "@type": "Organization",
    name: "AtomEons Systems Laboratory",
    url: "https://atomeons.com",
  },
  softwareVersion: "1.0 (launching)",
  license: "https://creativecommons.org/licenses/by/4.0/",
  description:
    "Native Windows cable-surfing art app. C# WinForms + LibVLC. No Electron, no Chromium. Over 100 classic channels · Public Access · Prevue-style guide (Channel Zer0) · daily-rotating Strange Channel · 7 Favorites · 10 CRT themes.",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "AtomEons", item: "https://atomeons.com" },
    { "@type": "ListItem", position: 2, name: "CableBox", item: "https://atomeons.com/cablebox" },
  ],
};

// CableBox's OWN test-pattern palette (from the brand sheet)
const CB = {
  paper: "#F2F2F0",
  black: "#0D0D0F",
  blue: "#3D8BFF",
  red: "#E5483C",
  yellow: "#F6C311",
  purple: "#B26BFF",
  green: "#3CC96B",
};

const PILLARS: { icon: string; label: string; note: string }[] = [
  { icon: "▤", label: "Over 100 classic channels", note: "Curated Pluto live sampler · Tubi +8 extras merged into pool" },
  { icon: "◉", label: "Public Access", note: "~29 GB on-device vault · intelligent rotation · random mid-start · 4-ads-between-shows engine" },
  { icon: "▦", label: "Retro Cable Guide", note: "Channel Zer0 · Prevue-style native grid · Guide / View / Host · 0-key toggle" },
  { icon: "▲", label: "Actual Ads", note: "Wild local 90s ad-breaks · not YouTube pre-rolls · runs between shows" },
  { icon: "❤", label: "7 Favorites", note: "Source-keyed dial slots Ch 23-29 · press F to add current channel" },
  { icon: "▣", label: "10 TV Themes", note: "Classic CRT · Woodgrain · 80s Vibes · Blue Horizon · Green Screen · Movie Night · Late Night · Game Time · VHS Static · Retro Future" },
  { icon: "☺", label: "Nostalgia & Fun", note: "Daily-rotating Strange Channel locks at 0 UTC · you never know what's on" },
];

const DIAL: { ch: string; name: string; detail: string }[] = [
  { ch: "0", name: "Channel Zer0", detail: "The guide · Prevue-style · press 0 to toggle" },
  { ch: "1", name: "Public Access", detail: "The vault · you + your city + 4 ads · never the same twice" },
  { ch: "2–21", name: "20 Randoms", detail: "6 anchors + 14 quota (3 movie · 3 classic · 3 learning · 5 comedy)" },
  { ch: "22", name: "Strange Channel", detail: "Daily-locked · rotates 0 UTC · you get one strange thing per day" },
  { ch: "23–29", name: "Your 7 Favorites", detail: "Source-keyed · press F on any channel to claim a slot" },
];

const KEYS: { keys: string; label: string }[] = [
  { keys: "S · M · B", label: "Small · Medium · Big — window sizes" },
  { keys: "T", label: "Cycle CRT theme" },
  { keys: "L", label: "Lock on top · unlock" },
  { keys: "F", label: "Add current channel to favorites" },
  { keys: "1 · 2 · 3 · 4 · 5", label: "Opacity · 100 · 80 · 60 · 40 · 30%" },
  { keys: "←  ↑", label: "Cycle back through favorites" },
  { keys: "→  ↓", label: "Random sampler forward" },
  { keys: "Q · Esc", label: "Quit" },
];

const THEMES: string[] = [
  "Classic CRT",
  "Woodgrain",
  "80s Vibes",
  "Blue Horizon",
  "Green Screen",
  "Movie Night",
  "Late Night",
  "Game Time",
  "VHS Static",
  "Retro Future",
];

export default function CableboxPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="min-h-screen bg-[#0A0F12] text-[#F4F4F2]">
        <div className="mx-auto max-w-5xl px-6 py-14 sm:py-20">
          <nav className="text-[11px] tracking-[0.16em] uppercase text-[#8E969D]">
            <Link href="/" className="hover:text-[#22F0D5] transition-colors">
              ::atomeons
            </Link>{" "}
            · <span className="text-[#B5BBC0]">cablebox</span>
          </nav>

          {/* ── HERO ── */}
          <div className="mt-14 grid gap-10 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] md:items-center">
            <div>
              <p
                className="text-[11px] tracking-[0.28em] uppercase"
                style={{ color: CB.blue }}
              >
                ::CableBox from Atom Eons · Nostalgia Collection · launching
              </p>
              <h1
                className="mt-4 text-[clamp(52px,8vw,108px)] font-light leading-[0.98] tracking-[-0.03em] text-balance text-[#F4F4F2]"
                style={{ fontFamily: "Newsreader, Georgia, serif" }}
              >
                TV used to be fun.
              </h1>
              <p
                className="mt-2 text-[clamp(22px,3vw,32px)] font-light leading-[1.1] tracking-[-0.01em] text-[#B5BBC0]"
                style={{ fontFamily: "Newsreader, Georgia, serif" }}
              >
                Enjoy TV again.
              </p>

              {/* Test-pattern spectrum bar (the brand's signature) */}
              <div className="mt-8 flex h-2 w-full max-w-md gap-0 overflow-hidden rounded-sm">
                {[CB.blue, CB.red, CB.yellow, CB.green, CB.purple].map((c) => (
                  <span key={c} className="flex-1" style={{ background: c }} />
                ))}
              </div>

              <p
                className="mt-8 max-w-[60ch] text-[18px] leading-[1.6] text-[#B5BBC0]"
                style={{ fontFamily: "Newsreader, Georgia, serif" }}
              >
                A native Windows cable-surfing art object. Over 100 classic channels behind a hand-built CRT dial · Public Access from your city · a Prevue-style guide called <em style={{ color: CB.paper }}>Channel Zer0</em> · a daily-rotating Strange Channel · real 1990s ad-breaks between shows · 10 hand-drawn CRT themes. No Electron. No Chromium. Real LibVLC in a punched CRT frame.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[#B5BBC0]">
                <span className="inline-flex items-center gap-2">
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full animate-pulse"
                    style={{ background: CB.blue }}
                    aria-hidden
                  />
                  LAUNCHING
                </span>
                <span>· 7 pillars · 30-channel dial · 10 CRT themes · free · CC-BY 4.0 · Windows · Naples · FL</span>
              </div>

              {/* CTAs */}
              <div className="mt-10 flex flex-wrap gap-3">
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  className="inline-flex cursor-not-allowed items-center gap-2 border px-5 py-2.5 font-mono text-[13px] uppercase tracking-[0.14em]"
                  style={{
                    borderColor: `${CB.blue}66`,
                    color: `${CB.blue}AA`,
                    background: "#0F1417",
                  }}
                  title="Download link goes live when the build is green"
                >
                  ▼ download · coming soon
                </button>
                <a
                  href="mailto:a.mccree@gmail.com?subject=%5BCableBox%5D%20notify%20me%20on%20launch"
                  className="inline-flex items-center gap-2 border px-5 py-2.5 font-mono text-[13px] uppercase tracking-[0.14em] transition-colors"
                  style={{ borderColor: `${CB.blue}66`, color: CB.paper }}
                >
                  notify me →
                </a>
                <a
                  href="https://discord.gg/4wx3AGga"
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 border border-[#22F0D5]/30 px-5 py-2.5 font-mono text-[13px] uppercase tracking-[0.14em] text-[#22F0D5] transition-colors hover:border-[#22F0D5]"
                >
                  discord workshop
                </a>
              </div>
            </div>

            {/* Metallic AE mark placeholder — echoes the brand tile */}
            <div
              className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-sm"
              style={{ background: CB.black, boxShadow: "inset 0 0 0 1px #1A2225" }}
              aria-label="CableBox mark · metallic AE over rainbow spectrum"
            >
              <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-[220%]">
                <div className="mx-auto flex h-full w-3/4 gap-0 overflow-hidden">
                  {[CB.blue, CB.red, CB.yellow, CB.green, CB.purple].map((c) => (
                    <span key={c} className="flex-1" style={{ background: c }} />
                  ))}
                </div>
              </div>
              <div className="relative flex flex-col items-center">
                <span
                  className="text-[132px] font-black leading-none tracking-[-0.05em]"
                  style={{
                    color: CB.paper,
                    textShadow:
                      "0 1px 0 #999, 0 2px 0 #777, 0 3px 0 #555, 0 6px 12px rgba(0,0,0,0.6)",
                    fontFamily: "Georgia, serif",
                  }}
                >
                  Æ
                </span>
                <p
                  className="mt-2 font-mono text-[13px] tracking-[0.28em]"
                  style={{ color: CB.paper }}
                >
                  CABLEBOX
                </p>
                <p
                  className="mt-1 text-[10px] tracking-[0.32em]"
                  style={{ color: CB.blue, fontFamily: "monospace" }}
                >
                  FROM ATOM EONS
                </p>
                <p
                  className="mt-3 text-[16px] italic"
                  style={{
                    background: `linear-gradient(90deg, ${CB.blue}, ${CB.red}, ${CB.yellow}, ${CB.green}, ${CB.purple})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontFamily: "Georgia, serif",
                  }}
                >
                  Nostalgia Collection
                </p>
              </div>
            </div>
          </div>

          {/* ── PILLARS ── */}
          <section id="pillars" className="mt-24">
            <p
              className="text-[11px] tracking-[0.28em] uppercase"
              style={{ color: CB.blue }}
            >
              ::seven pillars · what you actually get
            </p>
            <h2
              className="mt-3 text-[28px] font-medium leading-tight text-[#F4F4F2]"
              style={{ fontFamily: "Newsreader, Georgia, serif" }}
            >
              What&apos;s in the box.
            </h2>
            <ul
              className="ae-stagger mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              style={{ ["--stagger-step" as string]: "60ms" } as React.CSSProperties}
            >
              {PILLARS.map((p, i) => (
                <li
                  key={p.label}
                  className="ae-reveal-up border-l-2 pl-4 py-2"
                  style={{
                    borderColor: [CB.blue, CB.red, CB.yellow, CB.green, CB.purple, CB.blue, CB.red][i % 7],
                    ["--stagger-index" as string]: i,
                  } as React.CSSProperties}
                >
                  <p className="font-mono text-[13px] tracking-[0.08em] text-[#F4F4F2]">
                    <span className="mr-2" style={{ color: [CB.blue, CB.red, CB.yellow, CB.green, CB.purple, CB.blue, CB.red][i % 7] }}>
                      {p.icon}
                    </span>
                    {p.label}
                  </p>
                  <p className="mt-1.5 text-[14px] leading-[1.55] text-[#B5BBC0]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                    {p.note}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* ── THE DIAL ── */}
          <section id="dial" className="mt-24">
            <p className="text-[11px] tracking-[0.28em] uppercase" style={{ color: CB.yellow }}>
              ::the 30-channel dial · your whole universe
            </p>
            <h2
              className="mt-3 text-[28px] font-medium leading-tight text-[#F4F4F2]"
              style={{ fontFamily: "Newsreader, Georgia, serif" }}
            >
              Curated. Not infinite.
            </h2>
            <p
              className="mt-4 max-w-[68ch] text-[17px] leading-[1.6] text-[#B5BBC0]"
              style={{ fontFamily: "Newsreader, Georgia, serif" }}
            >
              The paralysis of a 10,000-title grid is exactly what killed television. CableBox gives you a hand-tuned dial of thirty. Turn the knob until something looks good. Land somewhere. Stay a while.
            </p>
            <ul className="mt-8 space-y-3 border-l" style={{ borderColor: `${CB.yellow}44` }}>
              {DIAL.map((row) => (
                <li key={row.ch} className="pl-4">
                  <p className="font-mono text-[13px] text-[#F4F4F2]">
                    <span className="mr-3 inline-block min-w-[3.5em]" style={{ color: CB.yellow }}>
                      CH {row.ch}
                    </span>
                    <span className="font-semibold">{row.name}</span>
                  </p>
                  <p className="mt-0.5 pl-[calc(3.5em+0.75rem)] text-[14px] text-[#B5BBC0]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                    {row.detail}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* ── THEMES ── */}
          <section id="themes" className="mt-24">
            <p className="text-[11px] tracking-[0.28em] uppercase" style={{ color: CB.purple }}>
              ::ten CRT themes · one for every mood
            </p>
            <h2
              className="mt-3 text-[28px] font-medium leading-tight text-[#F4F4F2]"
              style={{ fontFamily: "Newsreader, Georgia, serif" }}
            >
                Press T until it feels right.
            </h2>
            <ul
              className="ae-stagger mt-8 grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-5"
              style={{ ["--stagger-step" as string]: "40ms" } as React.CSSProperties}
            >
              {THEMES.map((theme, i) => (
                <li
                  key={theme}
                  className="ae-reveal-up border border-[#22F0D5]/15 bg-[#0F1417] p-4 text-center"
                  style={{ ["--stagger-index" as string]: i } as React.CSSProperties}
                >
                  <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#B5BBC0]">
                    {theme}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* ── KEYS ── */}
          <section id="keys" className="mt-24">
            <p className="text-[11px] tracking-[0.28em] uppercase" style={{ color: CB.green }}>
              ::keyboard is the remote · that&apos;s the whole UI
            </p>
            <h2
              className="mt-3 text-[28px] font-medium leading-tight text-[#F4F4F2]"
              style={{ fontFamily: "Newsreader, Georgia, serif" }}
            >
              Everything you need is one keystroke.
            </h2>
            <ul className="mt-8 max-w-[68ch] space-y-3">
              {KEYS.map((k) => (
                <li key={k.keys} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[15px]">
                  <span
                    className="inline-block min-w-[10em] font-mono text-[13px]"
                    style={{ color: CB.green }}
                  >
                    {k.keys}
                  </span>
                  <span className="text-[#B5BBC0]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                    {k.label}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* ── HOW IT'S BUILT ── */}
          <section id="how" className="mt-24">
            <p className="text-[11px] tracking-[0.28em] uppercase" style={{ color: CB.red }}>
              ::how it&apos;s built · not what other apps look like
            </p>
            <h2
              className="mt-3 text-[28px] font-medium leading-tight text-[#F4F4F2]"
              style={{ fontFamily: "Newsreader, Georgia, serif" }}
            >
              Native. Real video. Local.
            </h2>
            <ul className="mt-8 max-w-[68ch] space-y-4 text-[16px] leading-[1.6] text-[#B5BBC0]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
              <li>
                <strong className="text-[#F4F4F2]">C# WinForms shell</strong> · not Electron, not Chromium, not Edge WebView. A real Windows window with a real chrome that gets out of the way.
              </li>
              <li>
                <strong className="text-[#F4F4F2]">LibVLC playback</strong> · VideoLAN&apos;s native Windows runtime. What VLC uses. Real video, real audio, no browser sandbox tax.
              </li>
              <li>
                <strong className="text-[#F4F4F2]">Punched CRT frame</strong> · per-cabinet aperture auto-detect. The video renders <em>behind</em> a hand-drawn CRT screen opening, not scaled to fit a rectangle.
              </li>
              <li>
                <strong className="text-[#F4F4F2]">Curated live sources</strong> · Pluto is the core universe (never removed), Tubi adds 8 extras. Public Access is a ~29 GB on-device vault. No runtime scraping. No third-party embeds.
              </li>
              <li>
                <strong className="text-[#F4F4F2]">Free · CC-BY 4.0</strong> · download it, keep it, share it. Free forever. No subscription. No account.
              </li>
            </ul>
          </section>

          {/* ── LAUNCH STATUS ── */}
          <section id="status" className="mt-24 border-t border-[#22F0D5]/20 pt-14">
            <p className="text-[11px] tracking-[0.28em] uppercase" style={{ color: CB.blue }}>
              ::launch status · almost green
            </p>
            <h2
              className="mt-3 text-[28px] font-medium leading-tight text-[#F4F4F2]"
              style={{ fontFamily: "Newsreader, Georgia, serif" }}
            >
              Everything on this page is live. The download comes next.
            </h2>
            <p
              className="mt-4 max-w-[68ch] text-[17px] leading-[1.6] text-[#B5BBC0]"
              style={{ fontFamily: "Newsreader, Georgia, serif" }}
            >
              The app is in final integration. When the build is green, this page&apos;s download button lights up and the GitHub repo flips public. Two ways to know the moment it&apos;s ready:
            </p>
            <ul className="mt-6 max-w-[68ch] space-y-2 text-[16px] text-[#B5BBC0]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
              <li>
                →{" "}
                <a
                  href="mailto:a.mccree@gmail.com?subject=%5BCableBox%5D%20notify%20me%20on%20launch"
                  className="hover:underline"
                  style={{ color: CB.blue }}
                >
                  Email the operator
                </a>{" "}
                — one-line notify list, no auto-anything.
              </li>
              <li>
                →{" "}
                <a
                  href="https://discord.gg/4wx3AGga"
                  target="_blank"
                  rel="noopener"
                  className="hover:underline"
                  style={{ color: CB.blue }}
                >
                  Join the Discord workshop
                </a>{" "}
                — the launch drops there first.
              </li>
              <li>
                →{" "}
                <Link href="/founders-view" className="hover:underline" style={{ color: CB.blue }}>
                  The Founder&apos;s View
                </Link>{" "}
                — nightly letter at 8pm ET · launch will be its own letter.
              </li>
            </ul>
          </section>

          {/* ── FOOTER ── */}
          <div className="mt-24 border-t border-[#22F0D5]/20 pt-8 text-[13px] text-[#8E969D]">
            <p>
              CableBox is part of the AtomEons lab. See{" "}
              <Link href="/" className="text-[#22F0D5] hover:underline">
                atomeons.com
              </Link>
              , the{" "}
              <Link href="/orangebox" className="text-[#22F0D5] hover:underline">
                Orange³
              </Link>{" "}
              agentic OS, the{" "}
              <Link href="/i-am-ai" className="text-[#22F0D5] hover:underline">
                I Am AI book
              </Link>
              , and the{" "}
              <Link href="/roadmap" className="text-[#22F0D5] hover:underline">
                roadmap
              </Link>
              .
            </p>
            <p className="mt-2">
              <strong className="text-[#F4F4F2]">AtomEons Systems Laboratory</strong> · Naples · FL · 2026 · CC-BY 4.0
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
