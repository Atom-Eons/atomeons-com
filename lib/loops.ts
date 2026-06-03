/**
 * Loops.so REST API helpers — contact upsert + event triggers.
 *
 * The site's outbound email rail. lib/email.ts uses LOOPS_API_KEY +
 * LOOPS_TRANSACTIONAL_ID for transactional sends. This file adds the
 * marketing-list side: pushing contacts into Loops + firing events
 * that drip campaigns can listen for.
 *
 * Env vars:
 *   LOOPS_API_KEY              — required, from loops.so → Settings → API
 *   LOOPS_CYBER_LIST_ID        — optional, the Loops mailing list ID for
 *                                the cyber-career-track audience. Find it
 *                                in Loops dashboard → Audience → Mailing
 *                                Lists → click your list → URL contains the ID.
 *                                If unset, cyber subscribers land as contacts
 *                                but aren't auto-added to a list.
 *
 * All helpers are best-effort. They never throw — they return a result
 * object. Callers should not fail the user's flow just because Loops is
 * misconfigured. The operator can wire up Loops at any point and the
 * historical Supabase records can be backfilled later via a Loops bulk
 * import (Supabase → CSV export → Loops Contacts → Import CSV).
 */

const LOOPS_BASE = "https://app.loops.so/api/v1";

type LoopsResult = {
  ok: boolean;
  via: "loops" | "skipped";
  status?: number;
  error?: string;
};

type ContactPayload = {
  email: string;
  firstName?: string;
  lastName?: string;
  source?: string;
  userGroup?: string;
  subscribed?: boolean;
  mailingLists?: Record<string, boolean>;
  [customField: string]: string | number | boolean | Record<string, boolean> | undefined;
};

/**
 * Upsert a contact in Loops. Uses the /contacts/update endpoint which
 * creates the contact if missing and updates if present. Idempotent.
 *
 * Returns { ok: true, via: "skipped" } if LOOPS_API_KEY is not set —
 * the caller should treat that as a non-fatal "Loops not configured."
 */
export async function loopsUpsertContact(
  payload: ContactPayload,
): Promise<LoopsResult> {
  const key = process.env.LOOPS_API_KEY;
  if (!key) return { ok: true, via: "skipped" };

  try {
    const res = await fetch(`${LOOPS_BASE}/contacts/update`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      return {
        ok: false,
        via: "loops",
        status: res.status,
        error: `Loops upsertContact ${res.status}: ${text.slice(0, 200)}`,
      };
    }
    return { ok: true, via: "loops", status: res.status };
  } catch (e) {
    return {
      ok: false,
      via: "loops",
      error: e instanceof Error ? e.message : String(e),
    };
  }
}

type EventPayload = {
  email: string;
  eventName: string;
  eventProperties?: Record<string, string | number | boolean>;
  contactProperties?: Record<string, string | number | boolean>;
  mailingLists?: Record<string, boolean>;
};

/**
 * Fire a Loops event. Use this to trigger Loops Loops (drip campaigns).
 * Operator sets up the drip in the Loops dashboard listening for the
 * event name; this endpoint kicks it off.
 *
 * For the cyber subscribe flow, the event name is "cyberSubscribed"
 * and a Loops drip can fire the 6-letter sequence from there.
 */
export async function loopsSendEvent(
  payload: EventPayload,
): Promise<LoopsResult> {
  const key = process.env.LOOPS_API_KEY;
  if (!key) return { ok: true, via: "skipped" };

  try {
    const res = await fetch(`${LOOPS_BASE}/events/send`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      return {
        ok: false,
        via: "loops",
        status: res.status,
        error: `Loops sendEvent ${res.status}: ${text.slice(0, 200)}`,
      };
    }
    return { ok: true, via: "loops", status: res.status };
  } catch (e) {
    return {
      ok: false,
      via: "loops",
      error: e instanceof Error ? e.message : String(e),
    };
  }
}

/**
 * High-level: add a cyber subscriber to Loops + fire the cyberSubscribed
 * event so any drip campaign listening will start. Designed to be called
 * from /api/cyber/subscribe AFTER the Supabase insert succeeds.
 *
 * Best-effort: any failure is logged-but-not-thrown. The user's signup
 * is already in Supabase; Loops is the secondary delivery surface.
 */
export async function loopsRegisterCyberSubscriber(args: {
  email: string;
  persona?: string | null;
  source?: string | null;
}): Promise<{ contact: LoopsResult; event: LoopsResult }> {
  const cyberListId = process.env.LOOPS_CYBER_LIST_ID;
  const mailingLists =
    cyberListId && cyberListId.length > 0
      ? { [cyberListId]: true }
      : undefined;

  const contact = await loopsUpsertContact({
    email: args.email,
    source: args.source ?? "cyber-start",
    userGroup: "cyber",
    subscribed: true,
    persona: args.persona ?? undefined,
    mailingLists,
  });

  const event = await loopsSendEvent({
    email: args.email,
    eventName: "cyberSubscribed",
    eventProperties: {
      source: args.source ?? "cyber-start",
      persona: args.persona ?? "(none)",
    },
    mailingLists,
  });

  return { contact, event };
}
