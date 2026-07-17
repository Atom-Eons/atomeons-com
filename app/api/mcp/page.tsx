import type { Metadata } from "next";
import {
  RouteCards,
  RouteFinal,
  RouteNote,
  RoutePage,
  RouteSection,
} from "../../_components/aether/RoutePage";

export const metadata: Metadata = {
  title: "MCP status",
  description: "Current Model Context Protocol status and alternatives for AtomEons.",
};

export default function McpPage() {
  return (
    <RoutePage
      eyebrow="MCP / STATUS"
      title="Context is open."
      accentTitle="The server sleeps."
      lede="The current production site does not run a live Model Context Protocol server."
      asideTitle="A truthful 200 is better than a phantom endpoint."
      asideBody="Earlier dynamic experiments remain in preserved source history. Aether currently exposes static public context that any model or agent can fetch without credentials."
      accent="#2558dc"
    >
      <RouteSection index="ALTERNATIVES / LIVE NOW" title="Give the machine stable context.">
        <RouteCards
          cards={[
            { meta: "TEXT", title: "llms.txt", body: "Identity, canonical routes, product states, and usage guidance.", href: "/llms.txt" },
            { meta: "JSON", title: "OpenAPI", body: "The GET surfaces this static deployment commits to serving.", href: "/openapi.json" },
            { meta: "SOURCE", title: "GitHub", body: "The public source mirror and history for deeper inspection.", href: "https://github.com/Atom-Eons/atomeons-com" },
          ]}
        />
      </RouteSection>
      <RouteSection index="CAPABILITY / CURRENT" title="What is not running.">
        <RouteNote title="No live MCP transport.">
          This route is documentation, not an SSE, Streamable HTTP, or tool-call
          endpoint. It accepts no jobs and performs no writes. The boundary will
          change only when a supported runtime is deployed and independently verified.
        </RouteNote>
      </RouteSection>
      <RouteFinal
        eyebrow="STATIC CONTEXT / ZERO AUTH"
        title="Fetch what exists. Do not infer what does not."
        actions={[
          { href: "/api", label: "Machine index" },
          { href: "/api/agent-gateway", label: "Agent gateway status" },
        ]}
      />
    </RoutePage>
  );
}
