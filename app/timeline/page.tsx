import type { Metadata } from "next";
import {
  RouteFacts,
  RouteFinal,
  RouteList,
  RoutePage,
  RouteSection,
} from "../_components/aether/RoutePage";

export const metadata: Metadata = {
  title: "Timeline",
  description: "A product-state timeline for the current AtomEons public work.",
  alternates: { canonical: "https://atomeons.com/timeline" },
};

const stateKey = [
  {
    label: "PUBLISHED",
    value: "Public artifact",
    body: "The object can be opened, read, heard, inspected, or cited now.",
  },
  {
    label: "AVAILABLE",
    value: "Usable offer",
    body: "The product has a public route and a clear utility promise, even while it continues to evolve.",
  },
  {
    label: "CANDIDATE",
    value: "Release gate",
    body: "The launch story is public, but a download or install remains gated until checksum and operator approval are green.",
  },
  {
    label: "BUILDING",
    value: "Active system",
    body: "The page describes architecture and direction without claiming a finished commercial release.",
  },
];

export default function TimelinePage() {
  return (
    <RoutePage
      eyebrow="TIMELINE / OBJECT STATES"
      title="No fake"
      accentTitle="future tense."
      lede="A release history organized by what exists now: published, available, launching, building, broadcasting, and testing."
      asideTitle="State matters more than hype."
      asideBody="Dates without proof create theater. This edition prioritizes inspectable state and links each milestone directly to the object."
      accent="#f36b21"
    >
      <RouteSection index="NOW / AETHER 01" title="The current sequence.">
        <RouteList
          cards={[
            { index: "01", meta: "PUBLISHED", title: "I AM AI", body: "The 76,005-word first-person AI memoir is free to read.", href: "/i-am-ai" },
            { index: "02", meta: "AVAILABLE", title: "Bookmaker", body: "The publishing system behind the finished book object.", href: "/bookmaker" },
            { index: "03", meta: "BROADCASTING", title: "Atom Alive", body: "The AI Code Show has its own signal and public home.", href: "/atom-alive" },
            { index: "04", meta: "LAUNCH CANDIDATE", title: "CableBox", body: "The native television object is moving toward launch.", href: "/cablebox" },
            { index: "05", meta: "IN DEVELOPMENT", title: "Orange5", body: "The sovereign AI operator system remains a build in progress.", href: "/orange5" },
            { index: "06", meta: "EXPERIMENTAL", title: "Research", body: "Papers and discoveries publish with status and limits visible.", href: "/research" },
            { index: "07", meta: "LIVE", title: "Aether", body: "The product-first white front door replaces the former production shell.", href: "/" },
          ]}
        />
      </RouteSection>
      <RouteSection
        index="STATE KEY / READ BEFORE THE HYPE"
        title="The timeline is a truth table, not a victory lap."
        body="Each entry is labeled by its current proof state. That keeps the public story ambitious without pretending every object is equally finished."
      >
        <RouteFacts facts={stateKey} />
      </RouteSection>
      <RouteFinal
        eyebrow="THE NEXT ENTRY REQUIRES PROOF"
        title="Build it. Name its state. Then put it here."
        actions={[
          { href: "/receipts", label: "Open receipts" },
          { href: "/explore", label: "Explore current work" },
        ]}
      />
    </RoutePage>
  );
}
