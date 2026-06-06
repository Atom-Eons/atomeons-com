import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-static";

/**
 * /llms.md — markdown-extension alias for /llms.txt.
 *
 * Some LLM ingestion pipelines specifically look for `.md` extensions
 * when deciding what to fetch. /llms.txt is the convention (anthropic-
 * spec'd), but `.md` is the format LLMs prefer to read. We serve the
 * exact same bytes under both extensions so nobody has to guess.
 *
 * Cached at the edge for 15 minutes.
 */
export async function GET() {
  const p = path.join(process.cwd(), "public", "llms.txt");
  const body = fs.readFileSync(p, "utf8");
  return new NextResponse(body, {
    status: 200,
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "cache-control": "public, max-age=900, s-maxage=900",
    },
  });
}
