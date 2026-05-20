import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "./_components/Header";

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
    "AtomEons Systems Laboratory. Marco Island, Florida. One operator. Twelve research manuscripts (CC-BY 4.0), the ORANGEBOX cockpit, a nightly broadcast at 8pm ET, live intel surfaces, the skil.ski registry. Independent research and built tools, shipped from outside the cartel.",
  openGraph: {
    title: "AtomEons — Independent AI Systems Laboratory.",
    description:
      "Independent AI research and built tools. Twelve papers · the ORANGEBOX cockpit · nightly broadcast · alpha intel · skil.ski. One operator, Marco Island.",
    url: "https://atomeons.com",
    siteName: "AtomEons",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AtomEons — Independent AI Systems Laboratory.",
    description:
      "Independent AI research + built tools. Papers, cockpit, nightly broadcast, alpha intel. One operator, Marco Island.",
    creator: "@AtomMccree",
    site: "@AtomMccree",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${inter.variable}`}>
      <body className="min-h-full flex flex-col bg-black text-[#F2F4F5] font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "AtomEons Systems Laboratory",
              url: "https://atomeons.com",
              logo: "https://atomeons.com/icon",
              email: "a.mccree@gmail.com",
              founder: { "@type": "Person", name: "Atom McCree" },
              location: { "@type": "Place", name: "Marco Island, FL, USA" },
              brand: { "@type": "Brand", name: "ORANGEBOX" },
              makesOffer: {
                "@type": "Offer",
                name: "ORANGEBOX Command v6.1.0 Agent Mode",
                description:
                  "Local-first native AI cockpit. Rust + egui. 11 lanes, 60+ MCP tools, multi-model routing, agent loop with 9 tools, repo indexer, tab autocomplete. BYO keys, zero token markup. $1 once — free first 7 days of launch.",
                price: "1",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
                url: "https://atomeons.com/orangebox",
              },
            }),
          }}
        />
        <XAdsPixel />
        <AtomBoot />
        <div className="boot-bar" aria-hidden />
        <MadeWithOrangebox />
        <Header />
        <div className="screen-flicker flex-1">{children}</div>
        <Footer />
        <StickyBuyBar />
        <LabTicker />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
