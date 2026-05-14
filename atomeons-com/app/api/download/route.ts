import { NextResponse } from "next/server";
import { verifyDownloadToken } from "@/lib/token";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * SECURITY (v12): stream the blob through this route instead of 302-
 * redirecting to the raw Vercel Blob URL. The redirect-target was a
 * permanent unauthenticated URL — once a buyer's browser saw it (in
 * the address bar or DevTools), they could share it indefinitely and
 * the HMAC token gate was bypassed. Now the blob URL stays server-side
 * and only the buyer with a valid token gets the bytes.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("t");
  if (!token) {
    return NextResponse.json(
      { error: "Missing token parameter t" },
      { status: 400 },
    );
  }

  const claim = verifyDownloadToken(token);
  if (!claim) {
    return NextResponse.json(
      { error: "Token is invalid or expired" },
      { status: 401 },
    );
  }

  const blobUrl = process.env.PRODUCT_BLOB_URL;
  if (!blobUrl) {
    return NextResponse.json(
      { error: "Product file not configured (PRODUCT_BLOB_URL missing)" },
      { status: 500 },
    );
  }

  const upstream = await fetch(blobUrl, { cache: "no-store" });
  if (!upstream.ok || !upstream.body) {
    return NextResponse.json(
      { error: "Product file fetch failed" },
      { status: 502 },
    );
  }

  return new Response(upstream.body, {
    status: 200,
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition":
        'attachment; filename="ORANGEBOX-OS-AIO-v1.4.0.zip"',
      "Cache-Control": "private, no-store, max-age=0",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
