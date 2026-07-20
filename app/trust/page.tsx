import type { Metadata } from "next";
import {
  RouteCards,
  RouteFinal,
  RouteNote,
  RoutePage,
  RouteSection,
} from "../_components/aether/RoutePage";

export const metadata: Metadata = {
  title: "Trust",
  description: "The public trust contract for AtomEons claims, states, privacy, and corrections.",
  alternates: { canonical: "https://atomeons.com/trust" },
};

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
          { href: "mailto:support@atomeons.com?subject=AtomEons%20correction", label: "Send a correction" },
        ]}
      />
    </RoutePage>
  );
}
