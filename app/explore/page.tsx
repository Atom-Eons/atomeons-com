import type { Metadata } from "next";
import {
  RouteFinal,
  RouteList,
  RoutePage,
  RouteSection,
} from "../_components/aether/RoutePage";
import { SITE_GROUPS, SITE_INDEX } from "../_data/site-index";

export const metadata: Metadata = {
  title: "Explore",
  description: "The curated index of every current public AtomEons surface.",
  alternates: { canonical: "https://atomeons.com/explore" },
};

export default function ExplorePage() {
  return (
    <RoutePage
      eyebrow="EXPLORE / CURRENT PUBLIC INDEX"
      title="Everything with"
      accentTitle="a reason to exist."
      lede="The old site proved how much AI could place on a domain. Aether proves that the right things can be found."
      asideTitle="Curated, not erased."
      asideBody="The original work remains preserved in source history. This index presents the strongest products, creations, research, proof, and machine-readable resources as one coherent public system."
      accent="#2558dc"
      actions={[
        { href: "/search", label: "Search the index", accent: true },
        { href: "/random", label: "Surprise me" },
      ]}
    >
      {SITE_GROUPS.map((group) => (
        <RouteSection
          key={group}
          index={`${group.toUpperCase()} / INDEX`}
          title={group}
          body={`Every current ${group.toLowerCase()} surface in the Aether edition.`}
        >
          <RouteList
            cards={SITE_INDEX.filter((entry) => entry.category === group).map((entry, index) => ({
              index: String(index + 1).padStart(2, "0"),
              meta: entry.category,
              title: entry.title,
              body: entry.description,
              href: entry.href,
            }))}
          />
        </RouteSection>
      ))}
      <RouteFinal
        eyebrow="THE ARCHIVE IS A TOOL, NOT A LANDFILL"
        title="Find the signal. Enter the work."
        actions={[
          { href: "/products", label: "Start with products" },
          { href: "/research", label: "Enter research" },
        ]}
      />
    </RoutePage>
  );
}
