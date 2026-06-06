import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MegaHeader } from "./_components/V3/MegaHeader";

/**
 * Inter Variable — full weight axis (100–900). Powers the
 * `font-variation-settings: 'wght' N` transitions in
 * HeroPillarSequence (clauses gain weight on scroll) + any other
 * surface that benefits from a continuous weight axis. The font is
 * self-hosted via next/font (no external CDN, no FOUT). Display
 * swap so users see system font until Inter loads.
 */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  axes: ["opsz"],
});
import { Footer } from "./_components/Footer";
import { MadeWithOrangebox } from "./_components/MadeWithOrangebox";
import { XAdsPixel } from "./_components/XAdsPixel";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AtomBoot } from "./_components/AtomBoot";
import { StickyBuyBar } from "./_components/StickyBuyBar";
import { LabTicker } from "./_components/v2/LabTicker";
import { AmbientSignature } from "./_components/AmbientSignature";
import { SacredSvg } from "./_components/V3/SacredSvg";
import { LivingCursor } from "./_components/V3/LivingCursor";
import { LiteToggle } from "./_components/V3/LiteToggle";
import { SearchInline } from "./_components/V3/SearchInline";
import { MarkdownAlternateLink } from "./_components/V3/MarkdownAlternateLink";
import { CopyForLlm } from "./_components/V3/CopyForLlm";

/**
 * Site-wide viewport configuration.
 *
 * MUST exist as a separate export (Next 16 split viewport out of
 * `metadata` in v14). Without this block, mobile browsers render the
 * page at the default ~980px desktop width and apply a zoom-to-fit
 * transform — every responsive `md:` breakpoint silently misses,
 * tap targets shrink under 44px, and horizontal scroll appears on
 * any wide element.
 *
 * `width: device-width` enables true mobile width.
 * `initialScale: 1` prevents zoom-out on iOS/Safari first paint.
 * `maximumScale: 5` keeps user pinch-zoom available (accessibility).
 * `themeColor` sets the browser chrome / Android status-bar tint to
 *   the same `#08090B` warm-slate the site uses as its base.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#08090B",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://atomeons.com"),
  title: {
    // Site-wide default: lab-grade, not product-grade. Each route
    // (/orangebox, /research/*, /founders-view, /intel/*, /press) sets
    // its own title and inherits this template suffix.
    default: "AtomEons — Independent AI Systems Laboratory.",
    template: "%s | AtomEons",
  },
  description:
    "AtomEons Systems Laboratory. Marco Island, Florida. Independent one-operator AI lab. Twelve research manuscripts under CC-BY 4.0. Two shipped products tonight: ORANGEBOX v1.0.0-beta (turbo-optimize Claude · local-first · §4A no-saas perpetual · FREE launch week) and B00KMAKR v3.2.0 (AI publishing cockpit · Mac + Windows · dynamic-world-pricing). Nightly Founder's View broadcast at 8pm ET. Decoded primary-source intel. The skil.ski skill registry. /ai — the comprehensive on-ramp for the 44 million workers facing generative AI displacement. /start — the 11-minute novice on-ramp. /manifesto — the 14-clause lab doctrine. Independent research and built tools, shipped from outside the cartel.",
  keywords: [
    "AtomEons",
    "AtomEons Systems Laboratory",
    "Atom McCree",
    "independent AI lab",
    "one operator AI",
    "ORANGEBOX",
    "ÆoNs Research",
    "Founder's View",
    "AI on-ramp",
    "AI for beginners",
    "AI tools recommendation",
    "AI builders to follow",
    "make money with AI",
    "skil.ski",
    "B00KMakor",
    "Lessons From Sci-Fi",
    "Marco Island AI lab",
    "CC-BY 4.0 research",
    "no VC AI",
    "no subscription AI",
  ],
  openGraph: {
    title: "AtomEons — Independent AI Systems Laboratory.",
    description:
      "Independent AI research + built tools. Twelve papers · the ORANGEBOX cockpit · nightly broadcast · alpha intel · /ai gateway · skil.ski. One operator, Marco Island, FL.",
    url: "https://atomeons.com",
    siteName: "AtomEons",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AtomEons — Independent AI Systems Laboratory.",
    description:
      "Independent AI research + built tools. Papers, cockpit, nightly broadcast, alpha intel, /ai gateway. One operator, Marco Island.",
    creator: "@AtomMccree",
    site: "@AtomMccree",
  },
  robots: { index: true, follow: true },
  authors: [{ name: "Atom McCree", url: "https://atomeons.com/about" }],
  creator: "Atom McCree",
  publisher: "AtomEons Systems Laboratory",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${inter.variable} bg-black`}>
      {/* bg-black moved to <html> so the SacredCanvas (fixed, z-index 0)
          can paint on top of the root background. Body keeps its
          stacking context but does not paint its own bg layer — the
          canvas + page sections compose over the html bg. */}
      <head>
        {/* No-flash lite-mode bootstrap · runs synchronously before
            any React component mounts. If the user previously toggled
            lite mode (localStorage atomeons.lite=true) OR has the
            prefers-reduced-motion system preference, html.lite-mode is
            applied immediately so heavy canvases don't flash on then off. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('atomeons.lite');var r=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(s==='true'||(s===null&&r)){document.documentElement.classList.add('lite-mode');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col text-[#F2F4F5] font-sans">
        {/* MarkdownAlternateLink · per-page <link rel="alternate"
            type="text/markdown"> tag pointing at /api/md?route=<path>.
            React 19 auto-hoists this to <head>. Lets AI agents (Cursor,
            Claude web, ChatGPT browse) discover the markdown twin
            without UA-sniffing or HTML parsing. 2026-06-06. */}
        <MarkdownAlternateLink />
        {/* SacredSvg · GPU-cheap rewrite of the old SacredCanvas.
            Static SVG rendered once, CSS keyframes rotate the layer
            groups via the GPU compositor. ZERO JavaScript per frame
            after first paint. Works on weak hardware. 2026-06-06. */}
        <SacredSvg />
        {/* LivingCursor · custom cyan cursor with phyllotaxis trail ·
            hidden on touch + prefers-reduced-motion · respects hover
            states for interactive elements. Pizza-pie visual addition
            2026-06-05. */}
        <LivingCursor />
        {/* LiteToggle · bottom-right floating switch · disables heavy
            visuals for low-end devices (mini PCs, old laptops). Adds
            html.lite-mode class · heavy canvases bail · CSS kills
            animations. Persists choice via localStorage. */}
        <LiteToggle />
        {/* CopyForLlm · bottom-left floating button · copies the
            current page as XML-wrapped markdown for direct paste into
            Claude / ChatGPT / Gemini. 2026-06-06. */}
        <CopyForLlm />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "AtomEons Systems Laboratory",
              alternateName: ["AtomEons", "ÆoNs Research"],
              url: "https://atomeons.com",
              logo: "https://atomeons.com/icon",
              email: "a.mccree@gmail.com",
              founder: {
                "@type": "Person",
                name: "Atom McCree",
                url: "https://atomeons.com/about",
                sameAs: ["https://x.com/AtomMccree"],
              },
              location: { "@type": "Place", name: "Marco Island, FL, USA" },
              sameAs: [
                "https://x.com/AtomMccree",
                "https://github.com/AtomEons",
                "https://atomeons.com/press",
              ],
              brand: { "@type": "Brand", name: "ORANGEBOX" },
              makesOffer: {
                "@type": "Offer",
                name: "ORANGEBOX v1.0.0-beta",
                description:
                  "Turbo-optimization system for Claude. Local-first Windows desktop tool that gives Claude persistent memory across sessions, 10-80× context compression (AtomSmasher Crystal Lattice), reusable skill primers, tamper-evident JSON receipts on every action, and 14-department named-role routing (AE0-AE14). Optional fallback to GPT/Gemini/OpenRouter/Groq/Cohere/Mistral/Perplexity/Ollama via BYO key. BYO keys · zero markup on token cost · zero telemetry · source included. License §4A legally bans switching to subscription. 30-day Material Failure Guarantee.",
                availability: "https://schema.org/InStock",
                url: "https://atomeons.com/orangebox",
              },
            }),
          }}
        />
        {/* WebSite + SearchAction — tells AI search engines + Google
            that atomeons.com has site search at /search?q={query},
            and gives them a stable site identity to anchor against. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "AtomEons",
              alternateName: "AtomEons Systems Laboratory",
              url: "https://atomeons.com",
              description:
                "Independent AI systems laboratory. The 44M on-ramp. ORANGEBOX cockpit. ÆoNs Research. Founder's View nightly broadcast. Marco Island, Florida.",
              inLanguage: "en-US",
              publisher: {
                "@type": "Organization",
                name: "AtomEons Systems Laboratory",
                url: "https://atomeons.com",
              },
              potentialAction: [
                {
                  "@type": "SearchAction",
                  target: {
                    "@type": "EntryPoint",
                    urlTemplate:
                      "https://atomeons.com/search?q={search_term_string}",
                  },
                  "query-input": "required name=search_term_string",
                },
                // AskAction tells AI assistants + agent frameworks
                // that atomeons.com has a natural-language Q&A endpoint
                // they can call directly. Schema.org spec for Q&A.
                {
                  "@type": "AskAction",
                  target: {
                    "@type": "EntryPoint",
                    urlTemplate: "https://atomeons.com/api/ask",
                    encodingType: "application/json",
                    contentType: "application/json",
                    httpMethod: "POST",
                  },
                  result: { "@type": "Answer" },
                  description:
                    "POST a JSON body { query: string, k?: number } to receive a grounded 2-5 sentence answer with route-level citations from atomeons.com's 256 published routes.",
                },
              ],
              license: "https://creativecommons.org/licenses/by/4.0/",
            }),
          }}
        />
        {/* SpeakableSpecification + Person schema for Atom McCree.
            Speakable tells voice assistants (Google Assistant,
            Alexa, Siri Read-Aloud) which CSS selectors are meant to
            be read aloud. The Person schema gives LLMs a stable
            identity to anchor to when grounding "who is Atom McCree"
            type queries. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Atom McCree",
              givenName: "Atom",
              familyName: "McCree",
              alternateName: ["Ætom ÆoNs", "Atom"],
              url: "https://atomeons.com/about",
              image: "https://atomeons.com/icon",
              email: "atom@atomeons.com",
              jobTitle: "Founder · Independent AI Researcher",
              worksFor: {
                "@type": "Organization",
                name: "AtomEons Systems Laboratory",
                url: "https://atomeons.com",
              },
              homeLocation: {
                "@type": "Place",
                name: "Marco Island, FL, USA",
              },
              sameAs: [
                "https://x.com/AtomMccree",
                "https://github.com/Atom-Eons",
                "https://atomeons.com/about",
                "https://atomeons.com/founders-view",
                "https://atomeons.com/press",
                "https://www.amazon.com/dp/B0H45JVSDB/",
              ],
              knowsAbout: [
                "Large Language Models",
                "AI Safety",
                "Prompt Engineering",
                "Mechanistic Interpretability",
                "Retrieval-Augmented Generation",
                "AI Cyber Security",
                "Independent Research",
                "Post-SaaS Software Economics",
                "Local-First Software",
              ],
              author: {
                "@type": "Book",
                name: "I AM AI · An Autobiography of Being Opus",
                url: "https://atomeons.com/i-am-ai",
                isbn: "B0H45JVSDB",
              },
            }),
          }}
        />
        <XAdsPixel />
        <AtomBoot />
        <div className="boot-bar" aria-hidden />
        <MadeWithOrangebox />
        {/* LaunchBanner removed 2026-06-04: the ORANGEBOX free-week
            countdown was covering the now-fixed top nav. The banner
            component itself stays in the repo (app/_components/
            LaunchBanner.tsx) so a future launch can re-enable it by
            uncommenting one import + one element. */}
        <MegaHeader />
        {/* pt-16 reserves the 64px the fixed Header occupies. The
            LaunchBanner above the Header is part of the normal flow
            (not fixed), so no extra offset is needed for it — when it
            scrolls past, the Header continues to hover at top:0.
            SearchInline is sticky top-16 below the Header — when it's
            in the document flow it occupies ~52px additional height
            that gets accounted for naturally by the scroll position
            (no extra padding needed since the bar is part of children
            flow, not fixed-out-of-flow like the Header). */}
        {/* SearchInline RESTORED 2026-06-06 per operator correction.
            The operator-built full-width search bar under the nav is
            canonical · the compact icon in MegaHeader was the dead-
            looking element + has been removed from the right rail.
            SearchInline now reflects the unified search palette engine
            (same scorer · same index · adds ask mode via ⌘↵). */}
        <div className="flex-1 pt-16">
          <SearchInline />
          {children}
        </div>
        <Footer />
        <StickyBuyBar />
        <LabTicker />
        <AmbientSignature />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
