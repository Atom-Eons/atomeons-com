/**
 * Real party-line entries from THIS site's build session, snapshot-frozen
 * at build time. Source of truth: the OBOX party-line file at
 * C:/AtomEons/aeskills/orangebox/party-line/atomeons-com/messages.jsonl
 * which Atom's running ORANGEBOX cockpit appended to during the build of
 * atomeons.com.
 *
 * This is NOT a mock. These are the real receipts of the cockpit
 * coordinating the build of the very page you're reading them on.
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
    id: "2026-05-14T01-32-04-747Z-74a7f398",
    generatedAt: "2026-05-14T01:32:04.747Z",
    project: "atomeons-com",
    from: "AE3",
    kind: "design-uplift-v3",
    status: "VERIFIED",
    text: "v3 hacker/misfit uplift PASSED Checkmate. Surfaced MISFIT_MANIFESTO_RECOVERED.md (20 tenets) verbatim — no fake rebellion. New /manifesto zine, SystemLog strip, ManifestoCycle, CRT scanlines, RGB-split glitch, blink cursor, boot-bar, outlaw pills, MISFIT BETA red pill, ASCII dividers. All animations honor prefers-reduced-motion. Store flow unchanged.",
    evidence: "https://atomeons.com",
  },
  {
    id: "2026-05-14T01-10-32-928Z-1c7129c7",
    generatedAt: "2026-05-14T01:10:32.928Z",
    project: "atomeons-com",
    from: "AE7",
    kind: "checkmate-passed",
    status: "VERIFIED",
    text: "v2 design uplift PASSED Checkmate. Multi-team review (ux-product-reviewer, lips, orange-judge, mirrors) synthesized. 4 new components (AtomMark animated SVG, CockpitTicker, opengraph-image edge route, pulse-ring CSS). Mirrors prereqs disclosure block added to /orangebox. Live smoke 12/12 pass.",
    evidence: "https://atomeons.com",
  },
  {
    id: "2026-05-14T00-46-46-378Z-LIPS",
    generatedAt: "2026-05-14T00:46:46.378Z",
    project: "atomeons-com",
    from: "LIPS",
    kind: "review-engine",
    status: "REVIEWED",
    text: "Taste language is present; needs visual proof to earn authority. Show the watcher verdicts as premium cards, not raw text.",
    evidence: "review-engines/atomeons-com/runs/2026-05-14T00-46-46-310Z",
  },
  {
    id: "2026-05-14T00-46-46-371Z-MISFITS",
    generatedAt: "2026-05-14T00:46:46.371Z",
    project: "atomeons-com",
    from: "MISFITS",
    kind: "review-engine",
    status: "REVIEWED",
    text: "The high-upside move is a watcher party line that critiques the DAG before work scales. Add watcher cards to Opus awareness.",
    evidence: "review-engines/atomeons-com/runs/2026-05-14T00-46-46-310Z",
  },
  {
    id: "2026-05-14T00-46-46-360Z-MIRRORS",
    generatedAt: "2026-05-14T00:46:46.360Z",
    project: "atomeons-com",
    from: "MIRRORS",
    kind: "review-engine",
    status: "REVIEWED",
    text: "Some reality contact is present. Attach paths and mark assumptions before calling it complete.",
    evidence: "review-engines/atomeons-com/runs/2026-05-14T00-46-46-310Z",
  },
  {
    id: "2026-05-14T00-32-23-082Z-63eb062e",
    generatedAt: "2026-05-14T00:32:23.082Z",
    project: "atomeons-com",
    from: "AE5",
    kind: "store-live",
    status: "VERIFIED",
    text: "STORE OPEN FOR BUSINESS. /api/checkout returns real cs_live_ Stripe session URLs. Webhook registered (we_1TWn6r5VctoYPUK39qwwtCwl) listening for checkout.session.completed. /success page does server-side Stripe lookup + mints HMAC token inline. 6/7 env vars set. Anyone can buy ORANGEBOX right now for real $49.",
    evidence: "https://atomeons.com",
  },
  {
    id: "2026-05-14T00-12-13-044Z-882c20d9",
    generatedAt: "2026-05-14T00:12:13.044Z",
    project: "atomeons-com",
    from: "AE8",
    kind: "deploy-live",
    status: "VERIFIED",
    text: "atomeons.com is LIVE. Public deploy serving brand site. dpl_GWGcaYVjjk8qAS74L9HyjiLT9cNC READY production. Root cause of earlier 404s: project Framework Preset was Other, deploying public/ instead of .next/. Fixed by adding vercel.json with framework: nextjs.",
    evidence: "https://atomeons.com",
  },
  {
    id: "2026-05-13T23-43-58-677Z-504ce466",
    generatedAt: "2026-05-13T23:43:58.677Z",
    project: "atomeons-com",
    from: "AE6",
    kind: "implementation-complete",
    status: "VERIFIED",
    text: "Brand-site expansion complete. 12 routes compile (was 10): added / (AE brand home), /orangebox (full product page), /about, shared Header + Footer on every page via root layout. pnpm build PASS. Local prod-server smoke 12/12.",
    evidence: "atomeons-com/HANDOFF.md",
  },
  {
    id: "2026-05-13T23-30-22-361Z-6c21b89a",
    generatedAt: "2026-05-13T23:30:22.361Z",
    project: "atomeons-com",
    from: "AE0",
    kind: "scope-expanded",
    status: "VERIFIED",
    text: "Operator confirmed sole ownership of atomeons.com to BOLDLEAKEY Opus session. Lane expanded from single-page ORANGEBOX storefront to full AE brand website + complete store. Other Opus AE-website coordination concern dropped.",
    evidence: "atomeons-com/HANDOFF.md",
  },
  {
    id: "2026-05-13T23-00-25-044Z-dd9ec377",
    generatedAt: "2026-05-13T23:00:25.044Z",
    project: "atomeons-com",
    from: "AE6",
    kind: "opus-session-coordination",
    status: "VERIFIED",
    text: "Opus session BOLDLEAKEY online via Claude Code MCP. Lane: atomeons.com $49 ORANGEBOX storefront. Built: Next.js 16 + Stripe Checkout + HMAC-token download flow. NOT working on orangebox-command/src/ UI (Resilient Luxury Opus owns that). NOT touching skil.ski catalog (Opus 0MAX47 owns that).",
    evidence: "atomeons-com/HANDOFF.md",
  },
];
