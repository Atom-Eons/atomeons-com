import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { verifyDownloadToken } from "@/lib/token";
import { PRODUCT } from "@/lib/constants";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// 25 MB binary + hash compute + stream — needs more than the default 10s
export const maxDuration = 60;

/**
 * SECURITY (v12): stream the blob through this route instead of 302-
 * redirecting to the raw Vercel Blob URL. The redirect-target was a
 * permanent unauthenticated URL — once a buyer's browser saw it (in
 * the address bar or DevTools), they could share it indefinitely and
 * the HMAC token gate was bypassed. Now the blob URL stays server-side
 * and only the buyer with a valid token gets the bytes.
 *
 * v6.0: the default artifact is orangebox-v6.0.0-setup.exe (NSIS).
 * Filename comes from lib/constants.ts so it auto-tracks future bumps.
 *
 * INTEGRITY (v6 ops fix — Mistakes Ledger entry 2026-05-17):
 * After buffering the upstream blob, we recompute SHA-256 and compare
 * against PRODUCT.FILE_SHA256. If they don't match, we refuse to serve
 * the file and return a 503 with a clear operator message. This makes
 * it impossible to silently ship the wrong binary to a paying buyer if
 * the operator forgets to update PRODUCT_BLOB_URL after a version bump.
 *
 * Tradeoff: 25MB buffered into memory + ~80ms SHA pass. Acceptable at
 * indie scale. Future optimization: streaming verify via tee'd stream.
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
  if (!upstream.ok) {
    return NextResponse.json(
      { error: "Product file fetch failed" },
      { status: 502 },
    );
  }

  // Buffer + hash + verify before serving.
  const arrayBuf = await upstream.arrayBuffer();
  const buf = Buffer.from(arrayBuf);
  const actualSha = createHash("sha256").update(buf).digest("hex");

  const expectedSha = PRODUCT.FILE_SHA256 ?? PRODUCT.ZIP_SHA256;
  if (expectedSha && actualSha !== expectedSha) {
    // Don't serve a mismatched binary to a paying buyer. Tell the operator.
    return NextResponse.json(
      {
        error: "Product integrity check failed.",
        detail: `Served file SHA-256 does not match the version's published hash. The buyer's checkout email is on file; we will refund and ship the correct binary as soon as the operator uploads the right artifact.`,
        actual_sha256: actualSha,
        expected_sha256: expectedSha,
        expected_version: PRODUCT.VERSION,
        action_required:
          "Operator: upload " +
          PRODUCT.FILENAME +
          " to Vercel Blob and update PRODUCT_BLOB_URL env var.",
      },
      { status: 503 },
    );
  }

  const filename = PRODUCT.FILENAME;
  const contentType = filename.endsWith(".zip")
    ? "application/zip"
    : "application/octet-stream";

  const headers: HeadersInit = {
    "Content-Type": contentType,
    "Content-Disposition": `attachment; filename="${filename}"`,
    "Content-Length": String(buf.byteLength),
    "Cache-Control": "private, no-store, max-age=0",
    "X-Content-Type-Options": "nosniff",
    "Accept-Ranges": "bytes",
    // Operator-facing integrity headers — buyers can inspect in DevTools
    "X-OBX-Version": PRODUCT.VERSION,
    "X-OBX-SHA256": actualSha,
  };

  return new Response(buf, { status: 200, headers });
}
