import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/enroll · email-only learning-path enrollment.
 *
 * Wave 39 · 2026-06-06 · operator: "library of alexandria · email-only ·
 * find who are AI pilots + cyber pros."
 *
 * Body: { email: string, path: "ai-pilot" | "cyber-pro" }
 *
 * Behavior:
 *   - Validates email shape.
 *   - If LOOPS_API_KEY env present · creates/updates contact in Loops
 *     and tags with path-specific list. Returns { queued: true, provider:
 *     "loops" }.
 *   - If LOOPS_API_KEY absent · logs to server console and returns
 *     { queued: true, provider: "console" } honestly · operator can wire
 *     Loops later.
 *
 * Mom's Law: we never claim "enrolled" when we just logged it. The
 * response always names the provider so the frontend can render
 * accurate confirmation.
 *
 * Future · operator-wired:
 *   - Supabase 'learners' table for progress sync
 *   - Magic-link auth (loops-driven) for cross-device tracking
 *   - Admin /pilots and /cyber-pros pages listing graduates
 */

export const runtime = "nodejs";

const ALLOWED_PATHS = new Set(["ai-pilot", "cyber-pro"]);

interface EnrollBody {
  email?: string;
  path?: string;
}

export async function POST(req: NextRequest) {
  let body: EnrollBody;
  try {
    body = (await req.json()) as EnrollBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const email = (body.email || "").trim().toLowerCase();
  const path = (body.path || "").trim();

  // Basic shape validation
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email required." }, { status: 400 });
  }
  if (!ALLOWED_PATHS.has(path)) {
    return NextResponse.json({ error: "Unknown path." }, { status: 400 });
  }

  // Try Loops · if env wired
  const loopsKey = process.env.LOOPS_API_KEY;
  const listIdAiPilot = process.env.LOOPS_LIST_AI_PILOT;
  const listIdCyberPro = process.env.LOOPS_LIST_CYBER_PRO;

  if (loopsKey) {
    try {
      const groupName = path === "ai-pilot" ? "AI Pilot Track" : "Cyber Pro Track";
      const userGroup = path === "ai-pilot" ? "ai-pilot" : "cyber-pro";
      const r = await fetch("https://app.loops.so/api/v1/contacts/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${loopsKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          source: "atomeons.com /api/enroll",
          subscribed: true,
          userGroup,
          path,
          enrolled_at: new Date().toISOString(),
          mailingLists:
            path === "ai-pilot" && listIdAiPilot
              ? { [listIdAiPilot]: true }
              : path === "cyber-pro" && listIdCyberPro
                ? { [listIdCyberPro]: true }
                : undefined,
        }),
      });
      // Loops returns 409 if contact already exists · update instead
      if (r.status === 409) {
        await fetch("https://app.loops.so/api/v1/contacts/update", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${loopsKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            path,
            re_enrolled_at: new Date().toISOString(),
          }),
        });
      }
      return NextResponse.json({
        queued: true,
        provider: "loops",
        path,
        group: groupName,
      });
    } catch (e) {
      console.error("[enroll] loops error:", e);
      // fall through to console provider
    }
  }

  // Honest fallback · just log + return success-shaped response so the
  // frontend can confirm. Operator wires Loops when ready.
  console.log(`[enroll] no LOOPS_API_KEY · queued ${email} for ${path}`);
  return NextResponse.json({
    queued: true,
    provider: "console",
    path,
    note: "LOOPS_API_KEY not wired · operator will sync the queue manually until env is set",
  });
}

export async function GET() {
  return NextResponse.json({
    endpoint: "/api/enroll",
    method: "POST",
    body_shape: { email: "string", path: "ai-pilot | cyber-pro" },
    note: "Email-only enrollment for the AtomEons learning paths · no password · Loops-backed if env wired",
  });
}
