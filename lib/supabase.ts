// HARD GATE: this module exposes the service-role Supabase client.
// `server-only` makes Next.js refuse to bundle this into any client
// component at build time. The service-role key bypasses RLS — if it
// ever leaks into the browser bundle the whole project's gate is broken.
// All 7 current importers (cron route, founders-view server pages, /now,
// LatestFromLab, RSS) are server-side. Do not change that.
import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Lazy Supabase singletons. Two clients:
 *   - publicSupabase()   : anon key, public reads (founders_view_posts)
 *   - serviceSupabase()  : service-role key, server-only writes (cron inserts)
 *
 * Never import serviceSupabase() into a client component. The service-role
 * key bypasses RLS — surfacing it to the browser breaks the whole gate.
 */

let _pub: SupabaseClient | null = null;
let _srv: SupabaseClient | null = null;

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SRV = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function publicSupabase(): SupabaseClient {
  if (_pub) return _pub;
  if (!URL || !ANON) {
    throw new Error(
      "Supabase public env missing: NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY",
    );
  }
  _pub = createClient(URL, ANON, {
    auth: { persistSession: false },
  });
  return _pub;
}

export function serviceSupabase(): SupabaseClient {
  if (_srv) return _srv;
  if (!URL || !SRV) {
    throw new Error(
      "Supabase service env missing: NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY",
    );
  }
  _srv = createClient(URL, SRV, {
    auth: { persistSession: false },
  });
  return _srv;
}

export type FoundersViewPost = {
  id: string;
  slug: string;
  title: string;
  dek: string | null;
  body_md: string;
  voice_tags: string[];
  theme: string | null;
  word_count: number | null;
  model_used: string;
  generation_ms: number | null;
  status: "draft" | "published" | "retracted";
  published_at: string;
  created_at: string;
  retraction_reason: string | null;
};
