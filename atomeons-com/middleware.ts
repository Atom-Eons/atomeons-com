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
  "/orangeb0x": "/orangebox",
  "/0rangebox": "/orangebox",
  "/0rangeb0x": "/orangebox",
  "/blueb0x": "/orangebox",
  "/bluebox": "/orangebox",
  "/blue-b0x": "/orangebox",
};

export function middleware(req: NextRequest) {
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
