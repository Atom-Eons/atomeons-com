# Supabase migrations · atomeons.com

Every DDL change applied to the **orangebox** Supabase project
(`sthziuzmreqnrxmllodj` — the database backing atomeons.com) is mirrored
here as a dated SQL file. The Supabase MCP / dashboard remains the
source of truth for what's currently live; this folder is the **audit
trail** so the repo + the database stay in lockstep per the operator's
3-way propagation rule (`Git + Supabase + Vercel must all move
together`).

## File naming

`YYYY-MM-DD_<snake_case_name>.sql`

The name should match what was passed to `apply_migration({name: ...})`
so the audit trail aligns 1:1 with the migration log Supabase keeps.

## When to add a file here

- DDL: `CREATE TABLE`, `ALTER TABLE`, `CREATE VIEW`, `CREATE POLICY`,
  `CREATE FUNCTION`, `GRANT`/`REVOKE`, etc.
- Any change applied via `mcp__...__apply_migration` or the Supabase
  dashboard SQL editor.
- Schema-relevant SECURITY hardening (RLS policies, search_path fixes,
  view security_invoker flips).

Do **not** add to this folder:
- Pure data mutations (those go through the live writers).
- Operator-private edits (rotate keys, restore from backup, etc.).

## Other Supabase projects

The operator has two other Supabase projects:
- `Skil.Ski` (`cwocgjjjizhifkfthzzw`) — separate brand, separate repo
- `atomeons-network-crm` (`jxemxqxmhlpfetuqewuf`) — CRM project

Their migrations live in their own repos. Don't add them here.
