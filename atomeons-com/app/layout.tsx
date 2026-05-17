import type { Metadata } from "next";
import "./globals.css";
import { Header } from "./_components/Header";
import { Footer } from "./_components/Footer";
import { MadeWithOrangebox } from "./_components/MadeWithOrangebox";
import { XAdsPixel } from "./_components/XAdsPixel";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AtomBoot } from "./_components/AtomBoot";

export const metadata: Metadata = {
  metadataBase: new URL("https://atomeons.com"),
  title: {
    default: "ORANGEBOX v1.5.0 — the AI cockpit you actually own.",
    template: "%s | AtomEons",
  },
  description:
    "ORANGEBOX Command v1.5.0 — the AI cockpit you actually own. 60+ MCP tools. Mission-graph memory that survives every context reset. Swap claude / gpt / gemini / ollama mid-session. Local-first. Zero telemetry. $49 once, forever.",
  openGraph: {
    title: "ORANGEBOX v1.5.0 — the AI cockpit you actually own.",
    description:
      "60+ MCP tools · mission-graph memory · swap-lane router · local-first · zero telemetry · $49 once, forever.",
    url: "https://atomeons.com",
    siteName: "AtomEons",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ORANGEBOX v1.5.0 — the AI cockpit you actually own.",
    description:
      "60+ MCP tools · mission-graph memory · swap-lane router · local-first · $49 once, forever.",
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
                name: "ORANGEBOX v1 prototype",
                description:
                  "Private command cockpit for one operator. Single ZIP, Node 18+, runs locally.",
                price: "49",
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
