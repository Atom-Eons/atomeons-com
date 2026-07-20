import type { Metadata } from "next";
import {
  RouteFacts,
  RouteFinal,
  RouteList,
  RoutePage,
  RouteSection,
} from "../_components/aether/RoutePage";
import { SITE_GROUPS, SITE_INDEX } from "../_data/site-index";

export const metadata: Metadata = {
  title: "Atlas",
  description: "The complete current map of the AtomEons Aether site.",
  alternates: { canonical: "https://atomeons.com/atlas" },
};

export default function AtlasPage() {
  return (
    <RoutePage
      eyebrow="ATLAS / AETHER 01"
      title="One organism."
      accentTitle="Six systems."
      lede="A map of the current public edition: what leads, what supports it, and how every surface connects."
      asideTitle="The hierarchy is deliberate."
      asideBody="Products lead. The show reveals the process. Research carries the frontier questions. Creations expand the artistic practice. Company pages establish identity and proof. Machine files keep the site legible to agents."
      accent="#101010"
    >
      <RouteSection index="SYSTEM / SIX FIELDS" title="The shape of AtomEons.">
        <RouteFacts
          facts={SITE_GROUPS.map((group) => ({
            label: group.toUpperCase(),
            value: `${SITE_INDEX.filter((entry) => entry.category === group).length} doors`,
            body: group === "Products" ? "The commercial and useful objects at the center." :
              group === "Show" ? "The public signal and creative process." :
              group === "Research" ? "Discoveries, papers, evidence, and limits." :
              group === "Creations" ? "Books, art, and moving image." :
              group === "Company" ? "Identity, directory, proof, trust, and legal context." :
              "Static resources for crawlers, models, and developers.",
          }))}
        />
      </RouteSection>
      <RouteSection index="ROUTE MAP / ALL CURRENT DOORS" title="The complete index.">
        <RouteList
          cards={SITE_INDEX.map((entry, index) => ({
            index: String(index + 1).padStart(2, "0"),
            meta: entry.category,
            title: entry.title,
            body: entry.description,
            href: entry.href,
          }))}
        />
      </RouteSection>
      <RouteFinal
        eyebrow="MAP COMPLETE"
        title="Now enter the part that pulls you."
        actions={[
          { href: "/who-are-you", label: "Choose by appetite" },
          { href: "/random", label: "Choose by chance" },
        ]}
      />
    </RoutePage>
  );
}
