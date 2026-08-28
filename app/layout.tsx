import type { Metadata, Viewport } from "next";
import { AetherAtmosphere } from "./_components/aether/AetherAtmosphere";
import { AetherFooter } from "./_components/aether/AetherFooter";
import { AetherNav } from "./_components/aether/AetherNav";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://atomeons.com"),
  applicationName: "AtomEons",
  title: { default: "AtomEons | Things that did not exist", template: "%s | AtomEons" },
  description:
    "Home of the Orange AI Computer: local-first intelligence for models, agents, memory, tools, and proof.",
  keywords: [
    "AtomEons", "Atom McCree", "The Orange AI Computer", "CableBox 2", "independent software",
    "experimental AI research", "Naples Florida",
  ],
  authors: [{ name: "Atom McCree", url: "https://atomeons.com/about" }],
  creator: "Atom McCree",
  publisher: "AtomEons",
  category: "technology",
  alternates: {
    canonical: "https://atomeons.com",
    types: { "text/plain": "https://atomeons.com/llms.txt", "application/json": "https://atomeons.com/openapi.json" },
  },
  icons: { icon: [{ url: "/favicon.ico" }, { url: "/favicon.svg", type: "image/svg+xml" }] },
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "AtomEons", statusBarStyle: "default" },
  openGraph: {
    title: "AtomEons | Things that did not exist",
    description: "Meet the Orange AI Computer: one mission, many minds, and work that survives the chat.",
    url: "https://atomeons.com",
    siteName: "AtomEons",
    locale: "en_US",
    type: "website",
    images: [{ url: "/orange-ai-computer/orange-ai-computer.jpg", width: 757, height: 757, alt: "The Orange AI Computer from Atom Eons" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AtomEons | Things that did not exist",
    description: "Meet the Orange AI Computer from Atom Eons.",
    creator: "@AtomMccree",
    images: ["/orange-ai-computer/orange-ai-computer.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#f7f7f2",
  colorScheme: "light",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://atomeons.com/#website",
      name: "AtomEons",
      url: "https://atomeons.com",
      description: "Independent products and experimental research by Atom McCree and an AI workforce.",
      inLanguage: "en-US",
      publisher: { "@id": "https://atomeons.com/#organization" },
    },
    {
      "@type": "Organization",
      "@id": "https://atomeons.com/#organization",
      name: "AtomEons",
      url: "https://atomeons.com",
      logo: "https://atomeons.com/favicon.svg",
      founder: { "@id": "https://atomeons.com/#atom-mccree" },
      foundingLocation: { "@type": "Place", name: "Naples, Florida" },
      sameAs: ["https://github.com/Atom-Eons", "https://www.youtube.com/@AICodeShow", "https://x.com/AtomMccree"],
    },
    {
      "@type": "Person",
      "@id": "https://atomeons.com/#atom-mccree",
      name: "Atom McCree",
      url: "https://atomeons.com/about",
      homeLocation: { "@type": "Place", name: "Naples, Florida" },
      jobTitle: "Artist and independent inventor",
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://atomeons.com/cablebox#software",
      name: "CableBox 2",
      url: "https://atomeons.com/cablebox",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Windows, Web",
      description: "A living vintage television with a changing dial, collectible cabinets, touch controls, and a smarter show director.",
      offers: { "@type": "Offer", availability: "https://schema.org/InStock", price: "0", priceCurrency: "USD" },
      codeRepository: "https://github.com/Atom-Eons/CableBox2",
      license: "https://www.gnu.org/licenses/gpl-3.0.html",
      creator: { "@id": "https://atomeons.com/#atom-mccree" },
      publisher: { "@id": "https://atomeons.com/#organization" },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://atomeons.com/#orange-ai-computer",
      name: "Orange AI Computer",
      url: "https://atomeons.com",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Windows",
      description: "A local-first AI computer control plane for models, agents, memory, tools, receipts, and recovery.",
      codeRepository: "https://github.com/AtomEons/Orange-AI-Computer",
      offers: { "@type": "Offer", availability: "https://schema.org/InStock", price: "0", priceCurrency: "USD" },
      creator: { "@id": "https://atomeons.com/#atom-mccree" },
      publisher: { "@id": "https://atomeons.com/#organization" },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-ae-energy="quiet">
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <AetherAtmosphere />
        <AetherNav />
        <div id="main-content" tabIndex={-1}>{children}</div>
        <AetherFooter />
      </body>
    </html>
  );
}
