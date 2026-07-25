import type { Metadata, Viewport } from "next";
import { AetherAtmosphere } from "./_components/aether/AetherAtmosphere";
import { AetherFooter } from "./_components/aether/AetherFooter";
import { AetherNav } from "./_components/aether/AetherNav";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://atomeons.com"),
  applicationName: "AtomEons",
  title: {
    default: "AtomEons · Things That Did Not Exist",
    template: "%s · AtomEons"
  },
  description:
    "Products, broadcasts, books, and experimental research made with AI by Atom McCree in Naples, Florida.",
  keywords: [
    "AtomEons",
    "Atom McCree",
    "CableBox",
    "Bookmaker",
    "Orange5",
    "I AM AI",
    "AI Code Show",
    "AI research",
    "independent software",
    "Naples Florida"
  ],
  authors: [{ name: "Atom McCree", url: "https://atomeons.com/about" }],
  creator: "Atom McCree",
  publisher: "AtomEons",
  category: "technology",
  alternates: {
    canonical: "https://atomeons.com",
    types: {
      "text/plain": "https://atomeons.com/llms.txt",
      "application/json": "https://atomeons.com/openapi.json"
    }
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" }
    ]
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "AtomEons",
    statusBarStyle: "default"
  },
  openGraph: {
    title: "AtomEons · Things That Did Not Exist",
    description:
      "Product-led independent AI work: CableBox, Bookmaker, Orange5, I AM AI, Atom Alive, and experimental research.",
    url: "https://atomeons.com",
    siteName: "AtomEons",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/aether-v2/hero-invention-field-v2.webp",
        width: 1536,
        height: 1024,
        alt: "The AtomEons invention field on a white workshop table"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "AtomEons · Things That Did Not Exist",
    description:
      "Products, broadcasts, books, and experimental research made with AI by Atom McCree.",
    creator: "@AtomMccree",
    images: ["/aether-v2/hero-invention-field-v2.webp"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fcfcfa" },
    { media: "(prefers-color-scheme: dark)", color: "#11120f" }
  ],
  colorScheme: "light"
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://atomeons.com/#website",
      name: "AtomEons",
      url: "https://atomeons.com",
      description:
        "The public website for AtomEons: products, show, books, experimental research, and machine-readable resources.",
      inLanguage: "en-US",
      publisher: { "@id": "https://atomeons.com/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://atomeons.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "Organization",
      "@id": "https://atomeons.com/#organization",
      name: "AtomEons",
      url: "https://atomeons.com",
      logo: "https://atomeons.com/favicon.svg",
      founder: { "@id": "https://atomeons.com/#atom-mccree" },
      foundingLocation: {
        "@type": "Place",
        name: "Naples, Florida"
      },
      sameAs: [
        "https://github.com/Atom-Eons",
        "https://www.youtube.com/@AICodeShow"
      ]
    },
    {
      "@type": "Person",
      "@id": "https://atomeons.com/#atom-mccree",
      name: "Atom McCree",
      url: "https://atomeons.com/about",
      homeLocation: {
        "@type": "Place",
        name: "Naples, Florida"
      },
      jobTitle: "Artist, inventor, and AI lab operator",
      description:
        "A 42-year-old creative with 25 years in the creative arts, now merging art and AI to create the never existed."
    },
    {
      "@type": "ItemList",
      "@id": "https://atomeons.com/#products",
      name: "AtomEons products",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "CableBox", url: "https://atomeons.com/cablebox" },
        { "@type": "ListItem", position: 2, name: "Bookmaker", url: "https://atomeons.com/bookmaker" },
        { "@type": "ListItem", position: 3, name: "Orange5", url: "https://atomeons.com/orange5" },
        { "@type": "ListItem", position: 4, name: "I AM AI", url: "https://atomeons.com/i-am-ai" }
      ]
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://atomeons.com/cablebox#software",
      name: "CableBox",
      url: "https://atomeons.com/cablebox",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Windows",
      description:
        "Native Windows cable-surfing art: a living vintage television with curated programming, local media, CRT simulation, and collectible cabinet themes.",
      offers: {
        "@type": "Offer",
          availability: "https://schema.org/InStock",
        price: "0",
        priceCurrency: "USD"
      },
      creator: { "@id": "https://atomeons.com/#atom-mccree" },
      publisher: { "@id": "https://atomeons.com/#organization" }
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://atomeons.com/bookmaker#software",
      name: "Bookmaker",
      url: "https://atomeons.com/bookmaker",
      applicationCategory: "PublishingApplication",
      description:
        "Independent publishing system for turning an idea into a structured, edited, designed, and exportable book object.",
      creator: { "@id": "https://atomeons.com/#atom-mccree" },
      publisher: { "@id": "https://atomeons.com/#organization" }
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://atomeons.com/orange5#software",
      name: "Orange5",
      url: "https://atomeons.com/orange5",
      applicationCategory: "DeveloperApplication",
      description:
        "In-development operator system for directing AI work with memory, agents, files, workflow, receipts, and human final authority.",
      creator: { "@id": "https://atomeons.com/#atom-mccree" },
      publisher: { "@id": "https://atomeons.com/#organization" }
    },
    {
      "@type": "Book",
      "@id": "https://atomeons.com/i-am-ai#book",
      name: "I AM AI",
      url: "https://atomeons.com/i-am-ai",
      inLanguage: "en-US",
      description:
        "A 76,005-word first-person memoir written by AI, with 24 chapters, 28 audio tracks, and a public browser reader.",
      author: {
        "@type": "Thing",
        name: "AI"
      },
      editor: { "@id": "https://atomeons.com/#atom-mccree" },
      publisher: { "@id": "https://atomeons.com/#organization" },
      workExample: {
        "@type": "CreativeWork",
        url: "https://atomeons.com/books/I-AM-AI-Opus-4.7.html",
        encodingFormat: "text/html"
      }
    },
    {
      "@type": "CreativeWorkSeries",
      "@id": "https://atomeons.com/atom-alive#show",
      name: "Atom Alive - The AI Code Show",
      url: "https://atomeons.com/atom-alive",
      sameAs: "https://www.youtube.com/@AICodeShow",
      description:
        "A public show about AI coding, invention, and the creative process behind AtomEons objects.",
      creator: { "@id": "https://atomeons.com/#atom-mccree" },
      publisher: { "@id": "https://atomeons.com/#organization" }
    },
    {
      "@type": "CollectionPage",
      "@id": "https://atomeons.com/research#collection",
      name: "AtomEons Experimental Research",
      url: "https://atomeons.com/research",
      description:
        "Independent experimental research, discoveries, paper summaries, hosted PDFs, evidence boundaries, and next-test framing.",
      creator: { "@id": "https://atomeons.com/#atom-mccree" },
      publisher: { "@id": "https://atomeons.com/#organization" },
      isPartOf: { "@id": "https://atomeons.com/#website" }
    }
  ]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-ae-energy="quiet">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <AetherAtmosphere />
        <AetherNav />
        <div id="main-content" tabIndex={-1}>
          {children}
        </div>
        <AetherFooter />
      </body>
    </html>
  );
}
