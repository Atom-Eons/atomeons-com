import type { Metadata } from "next";
import "./globals.css";
import { Header } from "./_components/Header";
import { Footer } from "./_components/Footer";
import { MadeWithOrangebox } from "./_components/MadeWithOrangebox";
import { XAdsPixel } from "./_components/XAdsPixel";
import { Analytics } from "@vercel/analytics/next";
import { AtomBoot } from "./_components/AtomBoot";

export const metadata: Metadata = {
  metadataBase: new URL("https://atomeons.com"),
  title: {
    default: "AtomEons — An AI builder for all",
    template: "%s | AtomEons",
  },
  description:
    "ORANGEBOX Command v1.4.0 — the private AI operations cockpit. 15 departments, 15 skills, Codexa Local. $49 once, forever. Local-first, no telemetry, no subscription. This site was built in one day on ORANGEBOX.",
  openGraph: {
    title: "AtomEons — An AI builder for all",
    description:
      "ORANGEBOX Command v1.4.0 · the private AI operations cockpit · $49 once, forever · local-first · no telemetry · built in one day on ORANGEBOX.",
    url: "https://atomeons.com",
    siteName: "AtomEons",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AtomEons — An AI builder for all",
    description:
      "ORANGEBOX Command v1.4.0 · $49 once, forever · the private AI operations cockpit.",
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
      <body className="scanlines min-h-full flex flex-col bg-[#04100d] text-[#f7f0e4]">
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
      </body>
    </html>
  );
}
