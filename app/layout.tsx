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
    }
  ]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-ae-energy="quiet">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <AetherAtmosphere />
        <AetherNav />
        {children}
        <AetherFooter />
      </body>
    </html>
  );
}
