import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Campaign heartbeat — Vercel Cron pings this every 30 min.
 *
 * Polls Stripe for total ORANGEBOX sales count, computes milestone state,
 * fires milestone email to operator on goal-tier crossings.
 *
 * Goal: 100 sales of ORANGEBOX Command v1.4.0.
 *
 * Milestones: 1, 5, 10, 25, 50, 75, 100.
 *
 * Auth: Vercel Cron sends Authorization: Bearer ${CRON_SECRET} header.
 *       Set CRON_SECRET in Vercel env. Without it, cron still runs but
 *       this endpoint refuses non-Vercel callers.
 */

const MILESTONES = [1, 5, 10, 25, 50, 75, 100] as const;
const OPERATOR_EMAIL = "a.mccree@gmail.com";
const PRODUCT_NAME_FILTER = "ORANGEBOX";

type HeartbeatPayload = {
  ok: boolean;
  ts: string;
  total_sales: number;
  total_revenue_usd: number;
  refunds: number;
  net_buyers: number;
  milestone_just_hit: number | null;
  milestones_passed: number[];
  next_milestone: number | null;
  remaining_to_goal: number;
  email_sent: boolean;
  email_via?: string;
  email_error?: string;
};

export async function GET(req: Request) {
  // Vercel Cron auth — REQUIRED. If CRON_SECRET is unset the endpoint
  // refuses to serve, because the payload below leaks live Stripe revenue
  // and buyer counts. Never let it run unauthenticated.
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    return NextResponse.json(
      { ok: false, error: "CRON_SECRET not configured — refusing to run." },
      { status: 503 },
    );
  }
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const stripe = getStripe();

  // Pull all successful payment intents for ORANGEBOX
  // (paginated; cap at 1000 — we'll never have more than that for $49 indie product)
  let totalSales = 0;
  let totalRevenue = 0;
  let refunds = 0;
  let cursor: string | undefined = undefined;
  const PAGE_LIMIT = 100;
  const MAX_PAGES = 10;

  for (let page = 0; page < MAX_PAGES; page++) {
    const res = await stripe.paymentIntents.list({
      limit: PAGE_LIMIT,
      ...(cursor ? { starting_after: cursor } : {}),
    });

    for (const pi of res.data) {
      // Only count succeeded payments where description/metadata mentions ORANGEBOX
      const isOrangebox =
        (pi.description ?? "").toUpperCase().includes(PRODUCT_NAME_FILTER) ||
        Object.values(pi.metadata ?? {}).some((v) =>
          String(v).toUpperCase().includes(PRODUCT_NAME_FILTER),
        );

      if (pi.status === "succeeded" && isOrangebox) {
        totalSales += 1;
        totalRevenue += pi.amount;
      }
    }

    if (!res.has_more) break;
    cursor = res.data[res.data.length - 1]?.id;
    if (!cursor) break;
  }

  // Pull refunds count (matters for net buyer math)
  try {
    const refundsList = await stripe.refunds.list({ limit: 100 });
    refunds = refundsList.data.filter((r) => r.status === "succeeded").length;
  } catch {
    // refunds endpoint failing shouldn't break the heartbeat
  }

  const netBuyers = Math.max(0, totalSales - refunds);

  // Milestone math
  const milestonesPassed = MILESTONES.filter((m) => netBuyers >= m);
  const lastMilestone = milestonesPassed[milestonesPassed.length - 1] ?? 0;
  const nextMilestone = MILESTONES.find((m) => m > netBuyers) ?? null;
  const remainingToGoal = Math.max(0, 100 - netBuyers);

  // Determine if we just crossed a milestone (within tolerance — we email
  // when net == milestone exactly, since cron runs every 30 min and Stripe
  // is the source of truth)
  const milestoneJustHit = MILESTONES.find((m) => netBuyers === m) ?? null;

  let emailSent = false;
  let emailVia: string | undefined;
  let emailError: string | undefined;

  if (milestoneJustHit !== null) {
    const result = await sendMilestoneEmail({
      to: OPERATOR_EMAIL,
      milestone: milestoneJustHit,
      totalSales,
      totalRevenueUsd: totalRevenue / 100,
      refunds,
      netBuyers,
      isGoalReached: milestoneJustHit === 100,
    });
    emailSent = result.ok;
    emailVia = result.via;
    emailError = result.error;
  }

  const payload: HeartbeatPayload = {
    ok: true,
    ts: new Date().toISOString(),
    total_sales: totalSales,
    total_revenue_usd: totalRevenue / 100,
    refunds,
    net_buyers: netBuyers,
    milestone_just_hit: milestoneJustHit,
    milestones_passed: [...milestonesPassed],
    next_milestone: nextMilestone,
    remaining_to_goal: remainingToGoal,
    email_sent: emailSent,
    ...(emailVia ? { email_via: emailVia } : {}),
    ...(emailError ? { email_error: emailError } : {}),
  };

  return NextResponse.json(payload, { status: 200 });
}

async function sendMilestoneEmail({
  to,
  milestone,
  totalSales,
  totalRevenueUsd,
  refunds,
  netBuyers,
  isGoalReached,
}: {
  to: string;
  milestone: number;
  totalSales: number;
  totalRevenueUsd: number;
  refunds: number;
  netBuyers: number;
  isGoalReached: boolean;
}): Promise<{ ok: boolean; via: string; error?: string }> {
  const subject = isGoalReached
    ? `🎯 ORANGEBOX 100 SALES HIT — goal reached`
    : `ORANGEBOX milestone: ${milestone} ${milestone === 1 ? "sale" : "sales"}`;

  const html = `
    <h2>${isGoalReached ? "100 SALES." : `Milestone: ${milestone} sales.`}</h2>
    <p>Total successful payments: <strong>${totalSales}</strong></p>
    <p>Refunds: <strong>${refunds}</strong></p>
    <p>Net buyers: <strong>${netBuyers}</strong></p>
    <p>Total revenue: <strong>$${totalRevenueUsd.toFixed(2)}</strong></p>
    ${isGoalReached
      ? `<p><strong>The /goal: 100 ORANGEBOX sales has been hit.</strong> Mission counter is at 100 net buyers. Time to celebrate, then pivot to ORANGEBOX v1.5.</p>`
      : `<p>${100 - netBuyers} sales to reach the 100-sale goal.</p>`
    }
    <p>— atomeons.com heartbeat</p>
  `;

  const text = `${subject}\n\nTotal successful payments: ${totalSales}\nRefunds: ${refunds}\nNet buyers: ${netBuyers}\nTotal revenue: $${totalRevenueUsd.toFixed(2)}\n\n${100 - netBuyers} sales to goal.\n\n— atomeons.com heartbeat`;

  // Try Resend first (richer for one-off transactional)
  const resendKey = process.env.RESEND_API_KEY;
  const resendFrom = process.env.RESEND_FROM_EMAIL;
  if (resendKey && resendFrom) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: resendFrom,
          to,
          subject,
          html,
          text,
        }),
      });
      if (!res.ok) {
        const body = await res.text();
        return { ok: false, via: "resend", error: `resend ${res.status}: ${body}` };
      }
      return { ok: true, via: "resend" };
    } catch (e) {
      return {
        ok: false,
        via: "resend",
        error: e instanceof Error ? e.message : String(e),
      };
    }
  }

  // Fallback: Loops transactional (uses generic milestone template ID if set)
  const loopsKey = process.env.LOOPS_API_KEY;
  const loopsMilestoneId = process.env.LOOPS_MILESTONE_TRANSACTIONAL_ID;
  if (loopsKey && loopsMilestoneId) {
    try {
      const res = await fetch("https://app.loops.so/api/v1/transactional", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${loopsKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transactionalId: loopsMilestoneId,
          email: to,
          dataVariables: {
            milestone: String(milestone),
            totalSales: String(totalSales),
            netBuyers: String(netBuyers),
            totalRevenueUsd: totalRevenueUsd.toFixed(2),
            refunds: String(refunds),
            remainingToGoal: String(100 - netBuyers),
            isGoalReached: isGoalReached ? "yes" : "no",
          },
        }),
      });
      if (!res.ok) {
        const body = await res.text();
        return { ok: false, via: "loops", error: `loops ${res.status}: ${body}` };
      }
      return { ok: true, via: "loops" };
    } catch (e) {
      return {
        ok: false,
        via: "loops",
        error: e instanceof Error ? e.message : String(e),
      };
    }
  }

  return {
    ok: false,
    via: "none",
    error:
      "No email provider configured. Set RESEND_API_KEY+RESEND_FROM_EMAIL or LOOPS_API_KEY+LOOPS_MILESTONE_TRANSACTIONAL_ID.",
  };
}
