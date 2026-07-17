import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AetherNav } from "./_components/aether/AetherNav";

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
import { AetherFooter } from "./_components/aether/AetherFooter";
import { XAdsPixel } from "./_components/XAdsPixel";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ScrollProgress } from "./_components/V3/ScrollProgress";
import { RevealOnScroll } from "./_components/V3/RevealOnScroll";
import { MarkdownAlternateLink } from "./_components/V3/MarkdownAlternateLink";
import { ContinueRecorder } from "./_components/V3/ContinueCard";
import { SiloSwitcher } from "./_components/V3/SiloSwitcher";

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
/**
 * Wave 107 mobile innovations · 2026-06-18
 * - viewportFit: "cover" lets the page extend under iOS notches and
 *   gesture handles; CompactNav / MobileBottomBar use env(safe-area-*).
 * - themeColor pairs (dark + light) so Safari + Android Chrome paint
 *   the OS chrome (status bar / app-switcher tile) to match whichever
 *   theme the user has on. Light value matches the V2 white theme;
 *   dark value matches the noir base.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#ffffff",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://atomeons.com"),
  title: {
    // Site-wide default: lab-grade, not product-grade. Each route
    // (/orangebox, /research/*, /founders-view, /intel/*, /press) sets
    // its own title and inherits this template suffix.
    default: "AtomEons — Artist-led AI creation lab.",
    template: "%s | AtomEons",
  },
  description:
    "AtomEons is an artist-led creation lab powered by a massive AI workforce. CableBox, AI Bookmaker, Orange5, the AI-authored memoir I AM AI, Atom Alive, open research, and new objects built outside the institution.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "AtomEons",
    statusBarStyle: "black-translucent",
  },
  keywords: [
    "AtomEons",
    "AtomEons Systems Laboratory",
    "Atom McCree",
    "independent AI lab",
    "one operator AI",
    "Orange³",
    "AI Bookmaker",
    "I AM AI",
    "AI-authored memoir",
    "Atom Alive",
    "The AI Code Show",
    "artist using AI",
    "ÆoNs Research",
    "Founder's View",
    "AI on-ramp",
    "AI for beginners",
    "AI tools recommendation",
    "AI builders to follow",
    "make money with AI",
    "skil.ski",
    "Lessons From Sci-Fi",
    "Marco Island AI lab",
    "CC-BY 4.0 research",
    "no VC AI",
    "no subscription AI",
  ],
  openGraph: {
    title: "AtomEons — Artist-led AI creation lab.",
    description:
      "One artist directing a massive AI workforce to create software, books, broadcasts, research, and things that did not exist yesterday.",
    url: "https://atomeons.com",
    siteName: "AtomEons",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AtomEons — Artist-led AI creation lab.",
    description:
      "One artist. Many artificial minds. Software, books, broadcasts, and new objects from outside the institution.",
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
    <html lang="en" suppressHydrationWarning className={`theme-white h-full antialiased ${inter.variable} bg-white`}>
      {/* bg-black moved to <html> so the SacredCanvas (fixed, z-index 0)
          can paint on top of the root background. Body keeps its
          stacking context but does not paint its own bg layer — the
          canvas + page sections compose over the html bg. */}
      <head>
        {/* No-flash GPU tier bootstrap · Wave 30 · JUNE ROCKET ·
            runs synchronously before any React component mounts. Reads
            atomeons.tier (user override) and atomeons.tier.resolved
            (last auto-detect result) and applies html.tier-{lite|
            standard|full} so heavy visuals never flash on a weak
            device. Also applies html.lite-mode as a legacy alias when
            tier === lite. Honors prefers-reduced-motion as a hard
            floor → lite. */}
        {/* Wave 109 synthesis #8 · prefetch the search index + graph index.
            search-index.json (~140 KB) powers ⌘K / inline search / live
            suggestions. graph-index.json (~80 KB) powers /constellation.
            Both are static; prefetching at low priority shaves ~60-100ms
            off first interaction without competing with critical CSS/JS. */}
        <link rel="prefetch" href="/search-index.json" as="fetch" crossOrigin="anonymous" />
        <link rel="prefetch" href="/graph-index.json" as="fetch" crossOrigin="anonymous" />
        {/* Wave 145b · Google Fonts preconnect · saves the DNS + TLS round-trip
            for Newsreader + JetBrains Mono (loaded via @import at the top of
            globals.css). Without preconnect the browser doesn't know it needs
            fonts.gstatic.com until it parses the CSS. crossOrigin required
            because font files ship with CORS. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Wave 145e · IndieWeb rel="me" identity verification.
            Establishes cross-service ownership of atomeons.com so
            Mastodon / Bluesky / IndieAuth / h-card readers can confirm
            the site belongs to the same identity as the linked
            profiles. Two-way verification: each linked profile must
            also link back to atomeons.com with rel="me" for the loop
            to close. Standard IndieWeb pattern. */}
        <link rel="me" href="https://x.com/AtomMccree" />
        <link rel="me" href="https://github.com/AtomEons" />
        <link rel="me" href="https://github.com/Atom-Eons" />
        <link rel="me" href="mailto:a.mccree@gmail.com" />
        <link rel="author" href="https://atomeons.com/about" />
        {/* Wave 143 · site-wide RSS discovery · lets feed readers, browsers,
            and LLM crawlers auto-discover /feed.xml (aggregate) and
            /founders-view/rss (letters-only) via the standard atom alternate
            link tags. Novel for a solo lab: two feeds, one hub aggregate. */}
        <link rel="alternate" type="application/rss+xml" title="AtomEons — everything published" href="/feed.xml" />
        <link rel="alternate" type="application/rss+xml" title="Founder's View — letters only" href="/founders-view/rss" />
        {/* Wave 145g · machine-readable heartbeat + agent manifest auto-discovery.
            Any agent parsing the site's <head> now sees the JSON heartbeat +
            LLM onboarding manifest without hunting. Complements /llms.txt
            (LLM-bootstrap) + /.well-known/agent.json (agent card) with an
            in-page alternate link for browsers + AI agents that follow the
            standard rel="alternate" pattern. */}
        <link rel="alternate" type="application/json" title="AtomEons live heartbeat" href="/api/live" />
        <link rel="alternate" type="text/markdown" title="AtomEons agent onboarding manifest" href="/api/agent-gateway" />
        {/* Wave 145m · OpenSearch descriptor · lets browsers add
            atomeons.com as a search engine. After adding, users can
            type `atomeons.com <query>` in the URL bar and go straight
            to /search?q=<query>. Firefox / Chrome / Edge / Vivaldi
            all honor this. */}
        <link
          rel="search"
          type="application/opensearchdescription+xml"
          title="AtomEons"
          href="/opensearch.xml"
        />
        {/* Wave 119 · Speculation Rules · Chrome (Chromium) prerenders
            same-origin links on intent (pointerover or focus) so the
            next page is ready instantly when the user clicks.
            'moderate' eagerness = prerender on hover/focus, not just
            on a deliberate click signal. The whole site feels like an
            installed app from the visitor's first hover. Browsers
            without Speculation Rules support ignore this gracefully
            (Firefox, Safari for now). */}
        <script
          type="speculationrules"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              prerender: [
                {
                  source: "document",
                  where: { and: [{ href_matches: "/*" }, { not: { href_matches: "/api/*" } }, { not: { href_matches: "/admin/*" } }, { not: { selector_matches: "[rel~=nofollow]" } }] },
                  eagerness: "moderate",
                },
              ],
              prefetch: [
                {
                  source: "document",
                  where: { and: [{ href_matches: "/*" }, { not: { href_matches: "/api/*" } }] },
                  eagerness: "conservative",
                },
              ],
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var c=localStorage.getItem('atomeons.tier');var r=localStorage.getItem('atomeons.tier.resolved');var prm=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;var t='full';if(prm){t='lite';}else if(c==='lite'||c==='standard'||c==='full'){t=c;}else if(c==='auto'||c===null){t=(r==='lite'||r==='standard'||r==='full')?r:'lite';}var h=document.documentElement;h.classList.remove('tier-lite','tier-standard','tier-full');h.classList.add('tier-'+t);if(t==='lite'){h.classList.add('lite-mode');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-[#11120F] font-sans">
        {/* MarkdownAlternateLink · per-page <link rel="alternate"
            type="text/markdown"> tag pointing at /api/md?route=<path>.
            React 19 auto-hoists this to <head>. Lets AI agents (Cursor,
            Claude web, ChatGPT browse) discover the markdown twin
            without UA-sniffing or HTML parsing. 2026-06-06. */}
        <MarkdownAlternateLink />
        {/* Wave 51 · silent recorder · stamps localStorage on every
            nav so the launcher's Continue card can resume. */}
        <ContinueRecorder />
        {/* Wave 47-49 · global Cmd-Shift-S silo switcher overlay.
            Mounted here so it's available on every page including the
            launcher itself. */}
        <SiloSwitcher />
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
              email: "atom@atomeons.com",
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
                "Artist-led AI creation lab. CableBox, AI Bookmaker, Orange5, the AI-authored memoir I AM AI, Atom Alive, open research, and machine-readable knowledge.",
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
              jobTitle: "Artist · AI Lab Inventor · AtomEons Founder",
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
                "Creative Direction",
                "Hip-Hop Poetry",
                "AI-Native Publishing",
              ],
            }),
          }}
        />
        <XAdsPixel />
        {/* LaunchBanner removed 2026-06-04: the ORANGEBOX free-week
            countdown was covering the now-fixed top nav. The banner
            component itself stays in the repo (app/_components/
            LaunchBanner.tsx) so a future launch can re-enable it by
            uncommenting one import + one element. */}
        {/* Wave 77d · CHROME CONSOLIDATION · operator: "navigation mess ·
            more intelligence · there is a way to have it all."
            Killed: NotificationBar (stale launch messaging — TAKEOVER is
            canonical at /we-are-ai · $1 strip outdated), AppToolbar
            (5 buttons folded into MegaHeader future pass), SearchInline
            (palette is reachable via ⌘K from anywhere · the inline bar
            ate vertical space on every page).
            Net: ONE chrome strip · the MegaHeader · h-14 (56px). */}
        {/* Wave 109 a11y · skip-to-content link · WCAG 2.4.1 Bypass Blocks.
            Invisible until focused; first Tab on any page jumps the user
            past the 56px chrome to the main content. Critical for
            keyboard + screen-reader users. */}
        <a
          href="#main-content"
          className="ae-skip-link"
        >
          Skip to main content
        </a>
        <AetherNav />
        {/* Wave 111 · scroll-progress hairline under the nav · "alive as you use it" */}
        <ScrollProgress />
        {/* Wave 113 · global RevealOnScroll observer · arms every
            .ae-reveal-{up,fade,scale} on the document + MutationObserver
            picks up late-arriving nodes (lazy lists, async data) */}
        <RevealOnScroll />
        <main id="main-content" className="flex-1 pt-[72px]">
          {children}
        </main>
        <AetherFooter />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
