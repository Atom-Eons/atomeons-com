import type { Metadata } from "next";
import {
  RouteFinal,
  RoutePage,
  RouteSection,
} from "../_components/aether/RoutePage";
import { SearchClient } from "./SearchClient";

export const metadata: Metadata = {
  title: "Search",
  description: "Search the current AtomEons public site.",
  alternates: { canonical: "https://atomeons.com/search" },
};

export default function SearchPage() {
  return (
    <RoutePage
      eyebrow="SEARCH / CURRENT INDEX"
      title="Find the"
      accentTitle="signal."
      lede="Search the focused Aether edition without digging through the preserved historical sprawl."
      asideTitle="Fast, local, and private."
      asideBody="This search runs in your browser against the small public route index. It does not send your query to a database or third-party search provider."
      accent="#2558dc"
    >
      <RouteSection index="INDEX / LIVE" title="What are you looking for?">
        <SearchClient />
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
