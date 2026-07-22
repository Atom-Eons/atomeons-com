import type { Metadata } from "next";
import {
  RouteCards,
  RouteFinal,
  RouteNote,
  RoutePage,
  RouteSection,
} from "../../_components/aether/RoutePage";

export const metadata: Metadata = {
  title: "Agent gateway status",
  description: "Current agent access boundary for the static AtomEons production site.",
  alternates: { canonical: "https://atomeons.com/api/agent-gateway" },
};

export default function AgentGatewayPage() {
  return (
    <RoutePage
      eyebrow="AGENT GATEWAY / STATUS"
      title="Read access."
      accentTitle="No command access."
      lede="Agents can inspect the public site and source mirror. They cannot dispatch work into this production deployment."
      asideTitle="The gateway is documentation-only."
      asideBody="There is no public job queue, mutation endpoint, credential exchange, or database binding behind this route. That boundary protects both the operator and visitors."
      accent="#f36b21"
    >
      <RouteSection index="ACCESS / CURRENT" title="What agents can use.">
        <RouteCards
          cards={[
            { meta: "PUBLIC", title: "Route atlas", body: "A complete human-readable index of the current public system.", href: "/atlas" },
            { meta: "MACHINE", title: "llms.txt", body: "Compact context for language models and retrieval systems.", href: "/llms.txt" },
            { meta: "SOURCE", title: "Repository", body: "Public code and history without production mutation authority.", href: "https://github.com/Atom-Eons/atomeons-com" },
          ]}
        />
      </RouteSection>
      <RouteSection index="BOUNDARY / NO MUTATIONS" title="This page is not a control plane.">
        <RouteNote title="No commands are accepted.">
          Agent work, when used by AtomEons, remains operator-directed and outside this
          public static host. A future gateway would require authentication, scopes,
          receipts, revocation, and an explicit production release before being described
          as live.
        </RouteNote>
      </RouteSection>
      <RouteFinal
        eyebrow="HUMAN FINAL AUTHORITY"
        title="Machines may read. The operator decides."
        actions={[
          { href: "/api", label: "Machine index" },
          { href: "/trust", label: "Trust contract" },
        ]}
      />
    </RoutePage>
  );
}
