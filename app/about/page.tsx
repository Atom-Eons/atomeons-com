import type { Metadata } from "next";
import {
  RouteCampaign,
  RouteCards,
  RouteFacts,
  RouteFinal,
  RoutePage,
  RouteSection,
} from "../_components/aether/RoutePage";

export const metadata: Metadata = {
  title: "About AtomEons",
  description:
    "AtomEons is the independent creative practice of Atom McCree in Naples, Florida: products, broadcasts, books, and experimental research made with AI.",
  alternates: { canonical: "https://atomeons.com/about" },
  openGraph: {
    title: "About AtomEons",
    description:
      "One artist in Naples, Florida directing AI as a creative workforce to make products, books, broadcasts, and experimental research.",
    url: "https://atomeons.com/about",
    siteName: "AtomEons",
    type: "website",
    images: [
      {
        url: "/aether-v2/hero-invention-field-v2.webp",
        width: 1536,
        height: 1024,
        alt: "The AtomEons invention field",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About AtomEons",
    description:
      "The artist, the machine workforce, and the independent practice behind AtomEons.",
    creator: "@AtomMccree",
    images: ["/aether-v2/hero-invention-field-v2.webp"],
  },
};

export default function AboutPage() {
  return (
    <RoutePage
      eyebrow="ABOUT / THE OPERATOR"
      title="A human artist."
      accentTitle="A machine workforce."
      lede="AtomEons is the independent creative practice of Atom McCree: a 42-year-old creative with 25 years in the creative arts, now merging art and AI to create the never existed."
      asideTitle="The company is the work becoming real."
      asideBody="No fake campus. No invented lab. No venture-capital costume. AtomEons is one operator in Naples, Florida using AI systems as instruments, collaborators, and production force."
      accent="#101010"
      actions={[
        { href: "/products", label: "See the products", accent: true },
        { href: "/press", label: "Open press facts" },
      ]}
    >
      <RouteCampaign
        image="/aether-v2/hero-invention-field-v2.webp"
        imageAlt="A bright independent invention field of handmade AI objects and working instruments"
        object="ATOM MCCREE / INDEPENDENT PRACTICE"
        measure="ART / AI / PRODUCTS / RESEARCH"
        label="ONE OPERATOR / MANY MACHINES"
        title="Outfunded. Outnumbered. Still building."
        note="NAPLES, FLORIDA / HUMAN FINAL AUTHORITY"
        priority
      />

      <RouteSection
        index="IDENTITY / CURRENT"
        title="The clean version."
        body="AtomEons should be understood as an artist-owned creation studio where AI is treated as material, instrument, workforce, and collaborator."
      >
        <RouteFacts
          facts={[
            {
              label: "CREATOR",
              value: "Atom McCree",
              body: "Hip hop poet, artist, marketer, polyglot, and AI-lab inventor with 25 years in the creative arts.",
            },
            {
              label: "LOCATION",
              value: "Naples, FL",
              body: "The work is based in Naples, Florida. The site does not claim a physical research campus.",
            },
            {
              label: "METHOD",
              value: "AI workforce",
              body: "Models, agents, tools, and systems are directed as a changing production organism.",
            },
            {
              label: "AUTHORITY",
              value: "Human final call",
              body: "AI expands the attempt. Atom keeps creative direction, taste, responsibility, and final judgment.",
            },
          ]}
        />
      </RouteSection>

      <RouteSection
        index="PRACTICE / FOUR LANES"
        title="What the practice makes."
        body="The site is organized around the work that can carry the company: products first, show second, research third, and the human story around it."
      >
        <RouteCards
          cards={[
            {
              meta: "PRODUCTS",
              title: "Objects people can want.",
              body: "CableBox, Bookmaker, Orange5, and I AM AI form the current public product line.",
              href: "/products",
            },
            {
              meta: "SHOW",
              title: "The process becomes signal.",
              body: "Atom Alive turns builds, failures, culture, code, and invention into a public show.",
              href: "/atom-alive",
            },
            {
              meta: "RESEARCH",
              title: "Experiments with named limits.",
              body: "Discoveries and papers are staged publicly with evidence, PDFs, status, and boundaries.",
              href: "/research",
            },
          ]}
        />
      </RouteSection>

      <RouteSection
        index="BOUNDARIES / TRUTH"
        title="The point is not to look bigger than reality."
        body="The more unusual the work gets, the more important the facts become. AtomEons can be strange without pretending to be an institution it is not."
      >
        <RouteFacts
          facts={[
            {
              label: "NOT A CAMPUS",
              value: "No fake lab",
              body: "Experimental research is real as work and documentation, not as a claimed academic facility.",
            },
            {
              label: "NOT A STARTUP COSTUME",
              value: "$0 VC",
              body: "The site names constraints instead of hiding them behind empty scale language.",
            },
            {
              label: "NOT A CHATBOT BRAND",
              value: "Finished objects",
              body: "The evidence is products, books, pages, downloads, audio, research PDFs, source, and receipts.",
            },
            {
              label: "NOT ANTI-HUMAN",
              value: "Artist directed",
              body: "The work argues for human taste and agency amplified by machines, not erased by them.",
            },
          ]}
        />
      </RouteSection>

      <RouteFinal
        eyebrow="THE WORK IS THE BIOGRAPHY"
        title="Understand AtomEons by touching the objects."
        actions={[
          { href: "/products", label: "Enter products", accent: true },
          { href: "/who-are-you", label: "Choose your route" },
          { href: "/contact", label: "Contact Atom" },
        ]}
      />
    </RoutePage>
  );
}
