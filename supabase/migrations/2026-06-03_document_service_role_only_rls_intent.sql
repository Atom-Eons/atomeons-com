-- ============================================================
-- 2026-06-03 · Explicit service-role-only RLS policies
--
-- Three tables (download_events, orangebox_v63_waitlist, orders)
-- have RLS enabled but no policies. The Supabase advisor flagged
-- this as INFO `rls_enabled_no_policy` — the locked-out posture IS
-- intentional (service_role bypasses RLS to do all the work; no
-- anon/authenticated access desired), but the missing policies
-- make intent ambiguous to future operators reading the schema.
--
-- This migration adds explicit "service_role only" policies on
-- each table. Functionally no-op (service_role already bypasses
-- RLS), but documents the design intent + satisfies the lint.
--
-- Anon + authenticated remain locked out — no SELECT/INSERT/
-- UPDATE/DELETE possible from those roles.
-- ============================================================

-- ------------------------------------------------------------
-- download_events — write path: /api/track/download (service)
--                  read path: /api/admin/download-counts (service)
-- ------------------------------------------------------------
CREATE POLICY "service_role_full_access"
  ON public.download_events
  AS PERMISSIVE
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

COMMENT ON TABLE public.download_events IS
  'Privacy-preserving download tracker. Inserts via /api/track/download with hashed IP + bucketed UA. Reads via /api/admin/download-counts behind CRON_SECRET bearer. Service-role only — no anon/authenticated access.';

-- ------------------------------------------------------------
-- orangebox_v63_waitlist — launch waitlist captures
-- ------------------------------------------------------------
CREATE POLICY "service_role_full_access"
  ON public.orangebox_v63_waitlist
  AS PERMISSIVE
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

COMMENT ON TABLE public.orangebox_v63_waitlist IS
  'ORANGEBOX v6.3 launch waitlist. Inserts via /api/orangebox/waitlist with email + persona. Service-role only — no anon/authenticated access.';

-- ------------------------------------------------------------
-- orders — Stripe checkout completion ledger
-- ------------------------------------------------------------
CREATE POLICY "service_role_full_access"
  ON public.orders
  AS PERMISSIVE
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

COMMENT ON TABLE public.orders IS
  'Stripe checkout completion ledger. Inserts via Stripe webhook handler /api/checkout/webhook. Reads via admin endpoints behind CRON_SECRET bearer. Service-role only — no anon/authenticated access. Holds payment metadata + customer email.';
