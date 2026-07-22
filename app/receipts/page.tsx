import type { Metadata } from "next";
import { DISCOVERIES } from "../_data/discoveries";
import { PAPERS } from "../_data/research-papers";
import {
  RouteFacts,
  RouteFinal,
  RouteList,
  RoutePage,
  RouteSection,
} from "../_components/aether/RoutePage";

export const metadata: Metadata = {
  title: "Receipts",
  description: "Public proof surfaces for the claims made by AtomEons.",
  alternates: { canonical: "https://atomeons.com/receipts" },
};

const verificationMethod = [
  {
    label: "COUNT",
    value: "Numbers first",
    body: "Use visible counts for products, papers, discoveries, words, chapters, tracks, and source commits.",
  },
  {
    label: "OPEN",
    value: "Artifact next",
    body: "A serious claim should lead to a page, book, PDF, archive, source repo, timeline item, or contact path.",
  },
  {
    label: "COMPARE",
    value: "State matters",
    body: "Published, available, candidate, building, experimental, and gated states are intentionally separated.",
  },
  {
    label: "CHALLENGE",
    value: "Correction wins",
    body: "A specific correction with evidence should improve the public record faster than defensive marketing copy.",
  },
];

export default function ReceiptsPage() {
  return (
    <RoutePage
      eyebrow="RECEIPTS / PUBLIC LEDGER"
      title="Claims leave"
      accentTitle="a trail."
      lede="A compact, falsifiable ledger for what this edition of AtomEons actually publishes and what remains in progress."
      asideTitle="The site separates states."
      asideBody="Published, available, launch candidate, in development, hypothesis, and preserved archive are not synonyms. If a claim cannot be inspected, it does not get promoted here."
      accent="#101010"
      actions={[
        { href: "https://github.com/Atom-Eons/atomeons-com", label: "Inspect source", accent: true },
        { href: "/trust", label: "Read the trust contract" },
      ]}
    >
      <RouteSection index="CURRENT EDITION / MEASURED" title="What can be counted.">
        <RouteFacts
          facts={[
            { label: "PRODUCTS", value: "4 featured", body: "CableBox, Bookmaker, Orange5, and I AM AI." },
            { label: "PAPERS", value: String(PAPERS.length), body: "Every current paper has a page and direct PDF." },
            { label: "DISCOVERIES", value: String(DISCOVERIES.length), body: "AEyes, AtomSmasher, and AEMemory." },
            { label: "BOOK", value: "76,005 words", body: "I AM AI: 24 chapters and 28 audiobook tracks." },
            { label: "OPERATOR", value: "1 human", body: "Creative direction and final authority remain with Atom McCree." },
            { label: "VC", value: "$0", body: "No venture backing is claimed by this site." },
          ]}
        />
      </RouteSection>

      <RouteSection
        index="EVIDENCE / OPEN DOORS"
        title="Inspect the work."
        body="These surfaces are the shortest path from a public claim to something concrete."
      >
        <RouteList
          cards={[
            { index: "01", meta: "SOURCE", title: "GitHub mirror", body: "The canonical public source branch and commit history.", href: "https://github.com/Atom-Eons/atomeons-com" },
            { index: "02", meta: "BOOK", title: "I AM AI reader", body: "The complete browser-readable book artifact.", href: "/books/I-AM-AI-Opus-4.7.html" },
            { index: "03", meta: "RESEARCH", title: "Paper library", body: "Dedicated summaries and locally hosted PDF downloads.", href: "/research/papers" },
            { index: "04", meta: "RELEASE", title: "Timeline", body: "Current product states and public milestones without projection theater.", href: "/timeline" },
          ]}
        />
      </RouteSection>

      <RouteSection
        index="VERIFY / METHOD"
        title="How to audit the site without trusting the site."
        body="The receipts page should give a skeptical visitor a repeatable path: count what is claimed, open the artifact, compare the stated status, then challenge anything that fails inspection."
      >
        <RouteFacts facts={verificationMethod} />
      </RouteSection>

      <RouteFinal
        eyebrow="A CORRECTION IS A BETTER RECEIPT"
        title="If a claim is wrong, challenge it."
        actions={[
          { href: "mailto:a.mccree@gmail.com?subject=%5Bsupport%40atomeons.com%5D%20AtomEons%20receipt%20correction&body=AtomEons%20route%3A%20support%40atomeons.com%0ADirect%20destination%3A%20a.mccree%40gmail.com%0A%0APublic%20URL%3A%0AEvidence%3A%0A%0AMessage%3A%0A", label: "Report a correction" },
          { href: "/atlas", label: "Audit the atlas" },
        ]}
      />
    </RoutePage>
  );
}
