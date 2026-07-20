import type { Metadata } from "next";
import {
  RouteCampaign,
  RouteCards,
  RouteFacts,
  RouteFinal,
  RouteList,
  RouteNote,
  RoutePage,
  RouteSection,
} from "../_components/aether/RoutePage";

export const metadata: Metadata = {
  title: "Atom Alive · The AI Code Show",
  description:
    "Atom Alive is the AtomEons show: real builds, creative failures, culture, code, and invention from Atom McCree and an AI workforce.",
  alternates: { canonical: "https://atomeons.com/atom-alive" },
  openGraph: {
    title: "Atom Alive · The AI Code Show",
    description:
      "A code show for people with taste: make, break, explain, and ship the strange object.",
    url: "https://atomeons.com/atom-alive",
    siteName: "AtomEons",
    type: "website",
    images: [
      {
        url: "/aether-v3/atom-alive-broadcast-object-v3.webp",
        width: 1536,
        height: 1024,
        alt: "A handmade independent television broadcast machine for Atom Alive",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Atom Alive · The AI Code Show",
    description: "Real builds, creative failures, culture, code, and invention.",
    creator: "@AtomMccree",
    images: ["/aether-v3/atom-alive-broadcast-object-v3.webp"],
  },
};

export default function AtomAlivePage() {
  return (
    <RoutePage
      eyebrow="SHOW / ATOM ALIVE"
      title="The AI Code Show"
      accentTitle="with a pulse."
      lede="Atom Alive is where the work becomes visible: one artist, a changing AI workforce, and the next impossible object moving from idea to proof in public."
      asideTitle="Not a tutorial factory."
      asideBody="The code matters. The culture matters more. The show is built around tension, taste, failure, and the finished thing at the end."
      accent="#d60024"
      actions={[
        { href: "https://www.youtube.com/@AICodeShow", label: "Watch on YouTube", accent: true },
        { href: "/products", label: "See the products" },
      ]}
    >
      <RouteCampaign
        image="/aether-v3/atom-alive-broadcast-object-v3.webp"
        imageAlt="A handmade independent television broadcast machine with CRT, camera, recorder, and acid signal"
        object="ATOM ALIVE / BROADCAST UNIT 01"
        measure="MAKE / BREAK / EXPLAIN / SHIP"
        label="THE AI CODE SHOW"
        title="Creation is the plot."
        note="INDEPENDENT SIGNAL / YOUTUBE / NAPLES, FLORIDA"
        priority
      />

      <RouteSection
        index="FORMAT / FOUR BEATS"
        title="A build has to feel like a story."
        body="The audience does not need another screen recording. They need tension, stakes, taste, a living machine, and proof that something changed by the end."
      >
        <RouteCards
          cards={[
            { meta: "01", title: "Want the object", body: "Start with the emotional reason the thing should exist, not the toolchain." },
            { meta: "02", title: "Enter the machine", body: "Show the AI workforce, the constraints, the weird prompts, the wrong turns, and the repairs." },
            { meta: "03", title: "Keep the ugly middle", body: "Failures stay in the episode when they reveal how invention actually happens." },
            { meta: "04", title: "Leave with proof", body: "End with a working artifact, receipt, or honest state—not a fake victory lap." },
          ]}
        />
      </RouteSection>

      <RouteSection
        index="CURRENT ARC / CABLEBOX"
        title="The launch story is CableBox."
        body="CableBox is the clearest show object because the product is visual, emotional, and strange: a living vintage television that restores surfing, ritual, and accidental discovery."
      >
        <RouteList
          cards={[
            { index: "01", title: "The object", body: "Native Windows cable-surfing art, not a browser shell or another streaming menu.", href: "/cablebox" },
            { index: "02", title: "The release gate", body: "The download stays gated until archive, checksum, and public release facts are green.", href: "/receipts" },
            { index: "03", title: "The world", body: "Products, books, research, and the show all point at the same public practice.", href: "/products" },
          ]}
        />
      </RouteSection>

      <RouteSection index="SIGNAL / PROOF" title="What the show has to prove.">
        <RouteFacts
          facts={[
            { label: "HOST", value: "Atom McCree", body: "Artist, inventor, marketer, poet, and AI operator." },
            { label: "METHOD", value: "Human + AI workforce", body: "Models and agents are directed as creative instruments and production labor." },
            { label: "STANDARD", value: "Object at the end", body: "Every episode should move toward something inspectable." },
            { label: "CHANNEL", value: "@AICodeShow", body: "The public YouTube home for Atom Alive." },
          ]}
        />
        <RouteNote title="The show is part of the product system.">
          Atom Alive is not a side blog. It is the public engine room for the
          products, research, books, and strange objects AtomEons is building.
        </RouteNote>
      </RouteSection>

      <RouteFinal
        eyebrow="WATCH / THEN ENTER THE WORK"
        title="The machine is more interesting when it is making something real."
        actions={[
          { href: "https://www.youtube.com/@AICodeShow", label: "Open YouTube", accent: true },
          { href: "/cablebox", label: "Start with CableBox" },
          { href: "/products", label: "All products" },
        ]}
      />
    </RoutePage>
  );
}
