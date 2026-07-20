import type { Metadata } from "next";
import {
  RouteCards,
  RouteFinal,
  RoutePage,
  RouteSection,
} from "./_components/aether/RoutePage";

export const metadata: Metadata = {
  title: "Signal Not Found",
  description: "The AtomEons recovery page for missing or moved routes.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <RoutePage
      eyebrow="404 / SIGNAL LOST"
      title="The signal"
      accentTitle="moved."
      lede="That route is not part of the current Aether map. The archive is preserved, but this public edition routes attention toward the strongest working surfaces."
      asideTitle="Recover cleanly."
      asideBody="Start with the products if you want the work, search if you know the name, research if you came for the strange frontier, or contact Atom if something important is missing."
      accent="#d60024"
      actions={[
        { href: "/products", label: "Open products", accent: true },
        { href: "/search", label: "Search the site" },
      ]}
    >
      <RouteSection
        index="RECOVERY / FOUR DOORS"
        title="No dead ends."
        body="A missing route should not waste the visitor. These are the fastest paths back into the live system."
      >
        <RouteCards
          cards={[
            {
              meta: "PRODUCTS",
              title: "See what exists",
              body: "CableBox, Bookmaker, Orange5, and I AM AI: the four public products defining AtomEons now.",
              href: "/products",
            },
            {
              meta: "SHOW",
              title: "Watch the machine work",
              body: "Atom Alive is the public engine room for builds, failure, culture, code, and launch proof.",
              href: "/atom-alive",
            },
            {
              meta: "RESEARCH",
              title: "Enter the frontier",
              body: "Experimental discoveries, papers, PDFs, limits, and evidence without academic costume.",
              href: "/research",
            },
            {
              meta: "SEARCH",
              title: "Find the signal",
              body: "Search routes, products, papers, discoveries, books, proof, and machine-readable surfaces.",
              href: "/search",
            },
            {
              meta: "ATLAS",
              title: "Map the site",
              body: "Open the whole Aether system as a single structured route map.",
              href: "/atlas",
            },
            {
              meta: "CONTACT",
              title: "Report a missing thing",
              body: "If a public object should be here and is not, send the correction directly to Atom.",
              href: "/contact",
            },
          ]}
        />
      </RouteSection>

      <RouteFinal
        eyebrow="404 / RECOVERED"
        title="The wrong door still enters the building."
        actions={[
          { href: "/", label: "Return home", accent: true },
          { href: "/explore", label: "Explore index" },
          { href: "/random", label: "Random doorway" },
        ]}
      />
    </RoutePage>
  );
}
