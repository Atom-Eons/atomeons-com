import type { Metadata } from "next";
import "./globals.css";
import { Header } from "./_components/Header";
import { Footer } from "./_components/Footer";
import { MadeWithOrangebox } from "./_components/MadeWithOrangebox";
import { XAdsPixel } from "./_components/XAdsPixel";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AtomBoot } from "./_components/AtomBoot";
import { StickyBuyBar } from "./_components/StickyBuyBar";
import { CockpitFrame } from "./_components/v2/CockpitFrame";

export const metadata: Metadata = {
  metadataBase: new URL("https://atomeons.com"),
  title: {
    default: "ORANGEBOX v6.0.0 — the AI cockpit you own.",
    template: "%s | AtomEons",
  },
  description:
    "ORANGEBOX Command v6.0.0 — the AI cockpit you own. 60+ MCP tools. Mission-graph memory that survives every context reset. Swap claude / gpt / gemini / ollama mid-session. Local-first. Zero telemetry. $1 once, forever.",
  openGraph: {
    title: "ORANGEBOX v6.0.0 — the AI cockpit you own.",
    description:
      "60+ MCP tools · mission-graph memory · swap-lane router · local-first · zero telemetry · $1 once, forever.",
    url: "https://atomeons.com",
    siteName: "AtomEons",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ORANGEBOX v6.0.0 — the AI cockpit you own.",
    description:
      "60+ MCP tools · mission-graph memory · swap-lane router · local-first · $1 once, forever.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-black text-[#F2F4F5]">
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
                name: "ORANGEBOX Command v6.0.0",
                description:
                  "Local-first AI cockpit. 11 lanes, 60+ MCP tools, 15 departments. BYO keys, zero token markup. $1 once, forever.",
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
        <CockpitFrame />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
