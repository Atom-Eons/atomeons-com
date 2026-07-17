import type { Metadata } from "next";
import {
  RouteCards,
  RouteFinal,
  RoutePage,
  RouteSection,
} from "../_components/aether/RoutePage";

export const metadata: Metadata = {
  title: "Who are you?",
  description: "A fast route into AtomEons based on what you came to find.",
};

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
            { meta: "I WANT IT", title: "Product person", body: "See the objects built to be used, wanted, and owned.", href: "/#products" },
            { meta: "SHOW ME", title: "Viewer", body: "Watch code, culture, failure, and invention become a public signal.", href: "/atom-alive" },
            { meta: "WHAT IF", title: "Research mind", body: "Enter experimental papers, discoveries, evidence, and limits.", href: "/research" },
            { meta: "TELL ME", title: "Reader", body: "Open the AI-authored memoir and the book program.", href: "/books" },
            { meta: "WHO MADE THIS", title: "Collaborator", body: "Meet Atom McCree and understand the independent practice.", href: "/about" },
            { meta: "PROVE IT", title: "Skeptic", body: "Go directly to source, receipts, states, and corrections.", href: "/receipts" },
          ]}
        />
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
