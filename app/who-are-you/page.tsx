import type { Metadata } from "next";
import {
  RouteCards,
  RouteFacts,
  RouteFinal,
  RoutePage,
  RouteSection,
} from "../_components/aether/RoutePage";

export const metadata: Metadata = {
  title: "Who are you?",
  description: "A fast route into AtomEons based on what you came to find.",
  alternates: { canonical: "https://atomeons.com/who-are-you" },
};

const decisionShortcuts = [
  {
    label: "FASTEST WOW",
    value: "CableBox",
    body: "If the visitor has thirty seconds, send them to the product with the most immediate visual and emotional read.",
  },
  {
    label: "FASTEST PROOF",
    value: "I AM AI",
    body: "If they doubt the premise, send them to the book: the author is AI, the artifact exists, and the audio changes the argument.",
  },
  {
    label: "FASTEST CONTEXT",
    value: "About",
    body: "If they need the human frame, send them to the independent practice story before the product stack.",
  },
  {
    label: "FASTEST AUDIT",
    value: "Trust",
    body: "If they are skeptical, send them to claims, receipts, source, boundaries, and correction paths.",
  },
];

export default function WhoAreYouPage() {
  return (
    <RoutePage
      eyebrow="ROUTER / CHOOSE YOUR DOOR"
      title="What did you"
      accentTitle="come to find?"
      lede="You do not need to understand the whole organism before entering it."
      asideTitle="Start with your appetite."
      asideBody="Products are the main entrance. The show reveals the process. Research follows the strange questions. The company pages explain the person and the proof."
      accent="#d8ff3e"
    >
      <RouteSection index="AUDIENCE / SIX SIGNALS" title="Pick the version of you.">
        <RouteCards
          cards={[
            { meta: "I WANT IT", title: "Product person", body: "See the objects built to be used, wanted, and owned.", href: "/products" },
            { meta: "SHOW ME", title: "Viewer", body: "Watch code, culture, failure, and invention become a public signal.", href: "/atom-alive" },
            { meta: "WHAT IF", title: "Research mind", body: "Enter experimental papers, discoveries, evidence, and limits.", href: "/research" },
            { meta: "TELL ME", title: "Reader", body: "Open the AI-authored memoir and the book program.", href: "/books" },
            { meta: "WHO MADE THIS", title: "Collaborator", body: "Meet Atom McCree and understand the independent practice.", href: "/about" },
            { meta: "PROVE IT", title: "Skeptic", body: "Go directly to source, receipts, states, and corrections.", href: "/receipts" },
          ]}
        />
      </RouteSection>
      <RouteSection
        index="DECISION SHORTCUTS / NO MAZE"
        title="If attention is short, route harder."
        body="This page is not decoration. It is a sorting machine for a distracted visitor: give them the strongest first click, then the proof path that makes the click matter."
      >
        <RouteFacts facts={decisionShortcuts} />
      </RouteSection>
      <RouteFinal
        eyebrow="STILL NOT SURE?"
        title="Let chance make one decision."
        actions={[
          { href: "/random", label: "Surprise me" },
          { href: "/search", label: "Search instead" },
        ]}
      />
    </RoutePage>
  );
}
