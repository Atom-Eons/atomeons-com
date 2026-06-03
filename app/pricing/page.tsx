import { redirect } from "next/navigation";

/**
 * /pricing — redirects to the canonical pricing surface on /orangebox.
 *
 * The old standalone /pricing page documented the $99 bundle SKU
 * (ORANGEBOX cockpit + AE Operations + Delta IDE). The 2026-05-30
 * WEB_PROJECT_FINAL_PACKAGE repositioning collapsed that bundle into
 * a single $99 perpetual ORANGEBOX product. The full pricing block
 * (FREE Beta · $99 Perpetual · Team Roadmap · comparison table ·
 * Anti-SaaS Commitment · ROI line) now lives on /orangebox#pricing
 * per §7 IA of the FINAL package.
 *
 * Old SEO + AI-search queries ("orangebox price", "is orangebox
 * subscription") that landed here get 308-redirected to the canonical
 * spot. Single source of truth, no stale $99 messaging.
 *
 * Dynamic pricing for non-orangebox products lives at /legal/pricing
 * (the mechanism) and /dynamic-world-pricing (the doctrine paper).
 */

export const dynamic = "force-static";

export default function PricingRedirect(): never {
  redirect("/orangebox#pricing");
}
