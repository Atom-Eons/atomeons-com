import type { Metadata } from "next";
import {
  RouteCards,
  RouteFacts,
  RouteFinal,
  RouteList,
  RouteNote,
  RoutePage,
  RouteSection,
} from "../_components/aether/RoutePage";

export const metadata: Metadata = {
  title: "Trust",
  description: "The public trust contract for AtomEons claims, states, privacy, and corrections.",
  alternates: { canonical: "https://atomeons.com/trust" },
  openGraph: {
    title: "Trust - AtomEons",
    description:
      "The public trust contract for AtomEons claims, product states, research boundaries, privacy, and corrections.",
    url: "https://atomeons.com/trust",
    siteName: "AtomEons",
    type: "website",
    images: [
      {
        url: "/aether-v2/hero-invention-field-v2.webp",
        width: 1536,
        height: 1024,
        alt: "AtomEons public proof and trust field",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trust - AtomEons",
    description: "Visible state, bounded claims, direct contact, and correction paths.",
    creator: "@AtomMccree",
    images: ["/aether-v2/hero-invention-field-v2.webp"],
  },
};

const proofLedger = [
  {
    label: "PRODUCT CLAIM",
    value: "Objects exist",
    body: "Verify through product routes, screenshots, public reader surfaces, release gates, and source history.",
  },
  {
    label: "RESEARCH CLAIM",
    value: "Status bounded",
    body: "Verify through discovery pages, paper pages, PDFs, summaries, limits, and next-test language.",
  },
  {
    label: "CONTACT CLAIM",
    value: "Direct route",
    body: "Verify through visible Gmail fail-safe links and subject lines; the static site does not claim a working form backend.",
  },
  {
    label: "DEPLOY CLAIM",
    value: "Versioned",
    body: "Verify through receipts, GitHub commits, archive hashes, and the live-version boundary when hosting lags source.",
  },
];

export default function TrustPage() {
  return (
    <RoutePage
      eyebrow="TRUST / PUBLIC CONTRACT"
      title="Wonder without"
      accentTitle="fake certainty."
      lede="AtomEons can be ambitious, strange, independent, and experimental without pretending the unfinished is finished."
      asideTitle="Trust is a behavior."
      asideBody="The promise is not perfection. The promise is visible state, bounded claims, direct source when possible, corrections when wrong, and no invented institution behind the language."
      accent="#2558dc"
    >
      <RouteSection index="CONTRACT / SIX RULES" title="What this site owes you.">
        <RouteCards
          cards={[
            { meta: "01", title: "Name the state", body: "Published, available, candidate, building, experimental, and archived remain distinct." },
            { meta: "02", title: "Show the object", body: "Strong claims should lead to code, a reader, a PDF, a release, or another inspectable artifact." },
            { meta: "03", title: "Name the limit", body: "Research pages state uncertainty and do not imply peer review or institutional affiliation." },
            { meta: "04", title: "Keep authority human", body: "AI multiplies the work. Atom McCree retains creative direction and final responsibility." },
            { meta: "05", title: "Collect less", body: "The current static site does not need accounts, trackers, or a database to let you read it." },
            { meta: "06", title: "Correct the record", body: "A specific correction with evidence outranks clean marketing copy." },
          ]}
        />
      </RouteSection>

      <RouteSection
        index="CURRENT STATE / FAST READ"
        title="What is true in this edition."
        body="This page is the anti-hype layer. It should make the current state easier to verify than to misunderstand."
      >
        <RouteFacts
          facts={[
            {
              label: "AVAILABLE",
              value: "Bookmaker",
              body: "Presented as the creator publishing engine and proven by the I AM AI artifact path.",
            },
            {
              label: "PUBLISHED",
              value: "I AM AI",
              body: "Dedicated product page, public reader, audiobook sample, and correction that the author is AI.",
            },
            {
              label: "CANDIDATE",
              value: "CableBox",
              body: "Launch page is public; Windows archive remains gated until final checksum/operator green.",
            },
            {
              label: "BUILDING",
              value: "Orange5",
              body: "Dedicated page is architecture/status only, not a downloadable final release claim.",
            },
            {
              label: "EXPERIMENTAL",
              value: "Research",
              body: "Discoveries and papers are public, but claims stay bounded by evidence and limits.",
            },
            {
              label: "CONTACT",
              value: "Gmail fail-safe",
              body: "Public contact routes deliver to a.mccree@gmail.com; no static form database is claimed.",
            },
          ]}
        />
      </RouteSection>

      <RouteSection
        index="PROOF LEDGER / CLAIM TO ARTIFACT"
        title="Every strong sentence needs a place to land."
        body="The trust system is simple: if the site says a thing exists, it should point to the object, the source, the PDF, the receipt, the contact path, or the visible boundary that explains why it is not public yet."
      >
        <RouteFacts facts={proofLedger} />
      </RouteSection>

      <RouteSection
        index="VERIFY / OPEN DOORS"
        title="Where to check the claim."
        body="The fastest trust path is not persuasion. It is a link from the sentence to the artifact."
      >
        <RouteList
          cards={[
            {
              index: "01",
              meta: "SOURCE",
              title: "GitHub mirror",
              body: "Public source history for the current AtomEons site.",
              href: "https://github.com/Atom-Eons/atomeons-com",
            },
            {
              index: "02",
              meta: "BOOK",
              title: "I AM AI reader",
              body: "The browser-readable AI-authored book artifact.",
              href: "/books/I-AM-AI-Opus-4.7.html",
            },
            {
              index: "03",
              meta: "RESEARCH",
              title: "Paper library",
              body: "Dedicated summaries and local PDF downloads.",
              href: "/research/papers",
            },
            {
              index: "04",
              meta: "CONTACT",
              title: "Direct correction path",
              body: "Use the Gmail fail-safe with evidence and the exact public URL.",
              href: "mailto:a.mccree@gmail.com?subject=%5Bsupport%40atomeons.com%5D%20AtomEons%20trust%20correction&body=AtomEons%20route%3A%20support%40atomeons.com%0ADirect%20destination%3A%20a.mccree%40gmail.com%0A%0APublic%20URL%3A%0AEvidence%3A%0A%0AMessage%3A%0A",
            },
          ]}
        />
      </RouteSection>
      <RouteSection index="BOUNDARY / RESEARCH" title="Experimental means alive, not proven.">
        <RouteNote title="Read the complete source.">
          Paper summaries are entry points, not substitutes for the PDFs. Discoveries
          distinguish working systems, architecture, measurements, and future tests.
          Nothing on this site is medical, legal, financial, or safety-critical advice.
        </RouteNote>
      </RouteSection>
      <RouteFinal
        eyebrow="RECEIPTS OVER POSTURE"
        title="Trust the trail, not the typography."
        actions={[
          { href: "/receipts", label: "Inspect receipts" },
          { href: "mailto:a.mccree@gmail.com?subject=%5Bsupport%40atomeons.com%5D%20AtomEons%20correction&body=AtomEons%20route%3A%20support%40atomeons.com%0ADirect%20destination%3A%20a.mccree%40gmail.com%0A%0APublic%20URL%3A%0AEvidence%3A%0A%0AMessage%3A%0A", label: "Send a correction" },
        ]}
      />
    </RoutePage>
  );
}
