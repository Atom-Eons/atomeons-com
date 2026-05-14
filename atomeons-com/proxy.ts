import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Stylized-spelling redirects → canonical /orangebox.
 * Case-insensitive: lower-cased path is matched, then 308-redirected.
 *
 * Covers historical + stylized variants of the product name so any
 * link the operator scribbles ends up at the right place.
 */
const REDIRECTS: Record<string, string> = {
  // canonical product spelling variants
  "/orangeb0x": "/orangebox",
  "/0rangebox": "/orangebox",
  "/0rangeb0x": "/orangebox",
  "/0b0x": "/orangebox",
  "/obox": "/orangebox",
  "/o-box": "/orangebox",
  "/orange": "/orangebox",
  "/oranged": "/orangebox",
  "/orangbox": "/orangebox",
  "/orabgebox": "/orangebox",
  // legacy BLUEB0X naming (the v1.3 audit flagged these as stale)
  "/blueb0x": "/orangebox",
  "/bluebox": "/orangebox",
  "/blue-b0x": "/orangebox",
  // intent shortcuts
  "/install": "/orangebox#install",
  "/buy": "/orangebox#buy",
  "/download": "/orangebox#install",
  "/cockpit": "/orangebox",
  "/product": "/orangebox",
  // Dotted versions (e.g. /v1.4.0) are excluded by the proxy matcher
  // (treats . as an asset extension). Use undotted variants instead.
  "/v14": "/orangebox",
  "/v140": "/orangebox",
};

export function proxy(req: NextRequest) {
  const lower = req.nextUrl.pathname.toLowerCase();
  const dest = REDIRECTS[lower];
  if (!dest) return NextResponse.next();
  const url = req.nextUrl.clone();
  url.pathname = dest;
  return NextResponse.redirect(url, 308);
}

export const config = {
  // Skip API routes, Next internals, and asset paths (anything with a dot).
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
