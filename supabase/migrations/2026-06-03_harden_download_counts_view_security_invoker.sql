-- ============================================================
-- 2026-06-03 · Harden public.download_counts
--
-- Supabase advisor flagged this view as SECURITY DEFINER, which
-- means anon/authenticated queries on the view would execute as
-- the owner (postgres) and BYPASS RLS on the underlying
-- download_events table. download_events RLS is currently enabled
-- with zero policies — meaning the view was the ONLY surface that
-- could expose event data outside service-role. That's a real leak.
--
-- This migration:
--   1. Flips the view to security_invoker = true so caller's role +
--      RLS apply. Anon/authenticated callers will see zero rows
--      because download_events has no anon-friendly policies.
--      Service-role (used by /api/admin/download-counts) continues
--      to work because service-role bypasses RLS.
--   2. Revokes the default PUBLIC SELECT grant the view inherited
--      at creation. Only the lab's service-role and the postgres
--      owner can read the view directly after this. Defense-in-
--      depth even though step 1 already makes anon reads return
--      empty sets.
--
-- Safe-to-rollback: ALTER VIEW SET (security_invoker = false) +
-- GRANT SELECT TO PUBLIC restores prior posture. No data touched.
-- ============================================================

ALTER VIEW public.download_counts SET (security_invoker = true);

REVOKE ALL ON public.download_counts FROM PUBLIC;
REVOKE ALL ON public.download_counts FROM anon;
REVOKE ALL ON public.download_counts FROM authenticated;

-- Keep service_role and the table owner reading the aggregate.
-- service_role is what /api/admin/download-counts uses via
-- serviceSupabase() in lib/supabase.ts.
GRANT SELECT ON public.download_counts TO service_role;
