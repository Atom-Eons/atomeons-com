import type { Metadata } from "next";
import {
  RouteFinal,
  RoutePage,
  RouteSection,
} from "../_components/aether/RoutePage";
import { DISCOVERIES } from "../_data/discoveries";
import { PAPERS } from "../_data/research-papers";
import { SITE_INDEX } from "../_data/site-index";
import { SearchClient, type SearchEntry } from "./SearchClient";

export const metadata: Metadata = {
  title: "Search",
  description: "Search the current AtomEons public site.",
  alternates: { canonical: "https://atomeons.com/search" },
};

const searchEntries: SearchEntry[] = [
  ...SITE_INDEX.map((entry) => ({ ...entry, kind: "route" as const })),
  ...DISCOVERIES.map((discovery) => ({
    title: discovery.displayName,
    href: `/research/discoveries/${discovery.slug}`,
    description: discovery.oneLine,
    category: "Discoveries",
    keywords: [
      discovery.name,
      discovery.category,
      discovery.status,
      discovery.proposition,
      ...discovery.principles.flatMap((principle) => [principle.label, principle.value]),
    ],
    kind: "discovery" as const,
  })),
  ...PAPERS.map((paper) => ({
    title: paper.title,
    href: `/research/papers/${paper.slug}`,
    description: paper.kid_summary,
    category: "Papers",
    keywords: [paper.authors, paper.status, paper.date, ...paper.keywords],
    kind: "paper" as const,
  })),
];

export default function SearchPage() {
  return (
    <RoutePage
      eyebrow="SEARCH / CURRENT INDEX"
      title="Find the"
      accentTitle="signal."
      lede="Search the focused Aether edition without digging through the preserved historical sprawl."
      asideTitle="Fast, local, and private."
      asideBody="This search runs in your browser against a compact public index of routes, products, discoveries, and papers. It does not send your query to a database or third-party search provider."
      accent="#2558dc"
    >
      <RouteSection index="INDEX / LIVE" title="What are you looking for?">
        <SearchClient entries={searchEntries} />
      </RouteSection>
      <RouteFinal
        eyebrow="DISCOVERY HAS TWO MODES"
        title="Search when you know. Spin when you do not."
        actions={[
          { href: "/random", label: "Random doorway" },
          { href: "/explore", label: "Browse the index" },
        ]}
      />
    </RoutePage>
  );
}
