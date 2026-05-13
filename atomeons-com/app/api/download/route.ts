import { NextResponse } from "next/server";
import { verifyDownloadToken } from "@/lib/token";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

  return NextResponse.redirect(blobUrl, 302);
}
