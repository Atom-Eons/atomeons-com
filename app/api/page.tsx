import type { Metadata } from "next";
import {
  RouteCards,
  RouteFacts,
  RouteFinal,
  RouteNote,
  RoutePage,
  RouteSection,
} from "../_components/aether/RoutePage";

export const metadata: Metadata = {
  title: "For machines",
  description: "Truthful machine-readable access to the current static AtomEons site.",
  alternates: { canonical: "https://atomeons.com/api" },
};

const capabilityMatrix = [
  {
    label: "LIVE",
    value: "GET documents",
    body: "Static pages, llms.txt, OpenAPI, route maps, paper pages, and public source links are safe to fetch.",
  },
  {
    label: "STATIC",
    value: "No account state",
    body: "The production site does not require login, session storage, Supabase, Stripe, or a server database to read.",
  },
  {
    label: "SLEEPING",
    value: "MCP / gateway",
    body: "Protocol and agent pages describe boundaries and alternatives; they are not live command transports.",
  },
  {
    label: "FORBIDDEN",
    value: "No public writes",
    body: "No job dispatch, mutation endpoint, credential exchange, or hidden operator control is exposed here.",
  },
];

export default function ApiPage() {
  return (
    <RoutePage
      eyebrow="MACHINE ACCESS / STATIC EDITION"
      title="Readable by"
      accentTitle="humans and machines."
      lede="A compact set of stable documents for models, agents, search engines, and developers."
      asideTitle="The current host is static."
      asideBody="There is no live write API, authenticated database, or dynamic agent service on this deployment. Machine access means public documents and stable GET resources until a server runtime is intentionally restored."
      accent="#2558dc"
      actions={[
        { href: "/llms.txt", label: "Open llms.txt", accent: true },
        { href: "/openapi.json", label: "Open OpenAPI" },
      ]}
    >
      <RouteSection index="INTERFACES / CURRENT" title="Four honest doors.">
        <RouteCards
          cards={[
            { meta: "TEXT", title: "llms.txt", body: "A compact description, canonical paths, product states, and crawler guidance.", href: "/llms.txt" },
            { meta: "JSON", title: "OpenAPI", body: "A static contract for public GET resources that actually exist.", href: "/openapi.json" },
            { meta: "STATUS", title: "MCP", body: "Protocol status and the best current alternatives for machine context.", href: "/api/mcp" },
          ]}
        />
      </RouteSection>
      <RouteSection
        index="CAPABILITY MATRIX / DO NOT GUESS"
        title="The machine contract is explicit."
        body="Modern machine access should be useful without implying hidden authority. This matrix tells agents what can be fetched, what is static, what is sleeping, and what is not available on the public host."
      >
        <RouteFacts facts={capabilityMatrix} />
      </RouteSection>
      <RouteSection index="BOUNDARY / IMPORTANT" title="No phantom backend.">
        <RouteNote title="Current deployment truth.">
          The Aether production build serves static assets from Cloudflare. It does not
          accept agent jobs, database writes, or arbitrary API requests. The preserved
          source history contains earlier experiments, but archived code is not advertised
          here as a live service.
        </RouteNote>
      </RouteSection>
      <RouteFinal
        eyebrow="STABLE PUBLIC INPUTS"
        title="Use the documents. Verify the source."
        actions={[
          { href: "https://github.com/Atom-Eons/atomeons-com", label: "GitHub mirror" },
          { href: "/api/agent-gateway", label: "Agent gateway status" },
        ]}
      />
    </RoutePage>
  );
}
