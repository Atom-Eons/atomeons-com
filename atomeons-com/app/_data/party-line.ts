/**
 * Sample build receipts — what every ORANGEBOX project produces.
 *
 * These are illustrative entries showing the shape and voice of
 * party-line messages an ORANGEBOX cockpit writes while coordinating
 * a real project. They are NOT real telemetry from any specific
 * customer or operator.
 *
 * Cockpit format spec lives in the Opus system manual section 11
 * (Party Line) inside the product ZIP.
 */

export type PartyLineEntry = {
  id: string;
  generatedAt: string;
  project: string;
  from: string;
  kind: string;
  status: string;
  text: string;
  evidence: string;
};

export const SNAPSHOT_AT = "2026-05-14T01:32:04Z";

export const PARTY_LINE: PartyLineEntry[] = [
  {
    id: "sample-01",
    generatedAt: "2026-05-14T01:32:04.000Z",
    project: "myproject",
    from: "AE3",
    kind: "design-uplift",
    status: "VERIFIED",
    text: "Design pass complete. Hero refactored, 6 new components shipped, mesh-gradient surface live, scroll-reveal motion-safe. LIPS swapped 5 H2s. All animations honor prefers-reduced-motion. Build green.",
    evidence: "./project/proof/design-uplift-snapshot.png",
  },
  {
    id: "sample-02",
    generatedAt: "2026-05-14T01:10:32.000Z",
    project: "myproject",
    from: "AE7",
    kind: "checkmate-passed",
    status: "VERIFIED",
    text: "Multi-team review (UX + LIPS + Orange + Mirrors) synthesized. 12/12 acceptance criteria pass. No claim ships without receipt; no fake green; no decorative panels.",
    evidence: "./project/receipts/checkmate-passed.md",
  },
  {
    id: "sample-03",
    generatedAt: "2026-05-14T00:46:46.000Z",
    project: "myproject",
    from: "LIPS",
    kind: "review-engine",
    status: "REVIEWED",
    text: "Voice diagnosis: copy slipping into generic AI-tool register. 5 concrete swaps proposed: hero subhead, CTA H2, product H2, about H2, closing CTA H2. Each tighter, more specific, more confident.",
    evidence: "./project/review-engines/runs/lips-pass.md",
  },
  {
    id: "sample-04",
    generatedAt: "2026-05-14T00:46:46.000Z",
    project: "myproject",
    from: "MIRRORS",
    kind: "review-engine",
    status: "REVIEWED",
    text: "Theater debt detected: site claims 'truth over theater' while hiding three product preconditions from the buy page. Single hard fix proposed. Assumptions now labeled and on-page.",
    evidence: "./project/review-engines/runs/mirrors-pass.md",
  },
  {
    id: "sample-05",
    generatedAt: "2026-05-14T00:46:46.000Z",
    project: "myproject",
    from: "ORANGE",
    kind: "review-engine",
    status: "REVIEWED",
    text: "Ruling: cut three sections that don't earn their place (doctrine repeat on home, in-progress card, standalone Requires box). Top 3 additions ranked by impact-per-build-minute.",
    evidence: "./project/review-engines/runs/orange-pass.md",
  },
  {
    id: "sample-06",
    generatedAt: "2026-05-14T00:32:23.000Z",
    project: "myproject",
    from: "AE5",
    kind: "store-live",
    status: "VERIFIED",
    text: "Checkout endpoint returns valid live-mode session URLs. Webhook auto-registered for checkout.session.completed. Success page does server-side session verify + mints signed download token inline.",
    evidence: "./project/receipts/store-smoke.md",
  },
  {
    id: "sample-07",
    generatedAt: "2026-05-14T00:12:13.000Z",
    project: "myproject",
    from: "AE8",
    kind: "deploy-live",
    status: "VERIFIED",
    text: "Production deploy READY. Build 14s. Routes 12. Cache cold. Custom domain alias attached. DNS resolved. Smoke green across all routes; API endpoints return graceful errors when env unset.",
    evidence: "./project/proof/deploy-smoke.json",
  },
  {
    id: "sample-08",
    generatedAt: "2026-05-13T23:43:58.000Z",
    project: "myproject",
    from: "AE6",
    kind: "implementation-complete",
    status: "VERIFIED",
    text: "Brand-site expansion complete. 12 routes compile. Shared header + footer wired via root layout. Local prod-server smoke 12/12 OK including proper missing-token JSON on /api/download.",
    evidence: "./project/proof/build-smoke.txt",
  },
  {
    id: "sample-09",
    generatedAt: "2026-05-13T23:30:22.000Z",
    project: "myproject",
    from: "AE0",
    kind: "scope-expanded",
    status: "VERIFIED",
    text: "Operator confirmed lane scope. Single-page storefront promoted to full brand site + complete store. Anti-collision: not touching adjacent lanes; all writes confined to assigned worktree.",
    evidence: "./project/HANDOFF.md",
  },
  {
    id: "sample-10",
    generatedAt: "2026-05-13T23:00:25.000Z",
    project: "myproject",
    from: "AE6",
    kind: "session-coordination",
    status: "VERIFIED",
    text: "Opus session online via Claude Code MCP. Lane: storefront build. Stack: Next.js + Stripe Checkout + HMAC-token download flow. Worktree branched. Awaits operator-gated deploy steps.",
    evidence: "./project/HANDOFF.md",
  },
];
