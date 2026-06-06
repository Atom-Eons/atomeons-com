# SOULKEY · Identity Implementation Roadmap

**Wave 40 · 2026-06-06**

Operator canonized the SOULKEY identity architecture. This document is the implementation scope · what's shipped vs what needs operator wire-up.

The canon lives at [/soulkey](https://atomeons.com/soulkey).

---

## Canon line

```
SOULKEY      owns.
SOUL GENOME  remembers.
SOUL.01      acts.
Receipt Rail proves.
Proof Resume travels.
```

## Three modes

1. **Cloud Sync** · Google OpenID Connect · `sub` claim as primary key · server-side state.
2. **Sovereign Mode** · DID / wallet · signed receipts · local vault · published proofs are selective.
3. **Hybrid** · Google for convenience + SOULKEY for proof + export.

## Five-component stack

```
SOULKEY       cryptographic identity root
SOUL GENOME   behavior identity DNA
SOUL.01       runtime identity system
Receipt Rail  signed evidence
Proof Resume  public selective portfolio
```

---

## Phase status

### Phase 1 · CANON (✅ shipped Wave 40)

- [x] `/soulkey` doctrine page · full architecture made public.
- [x] `/proof/[id]` route stub · canonical shape with placeholder content.
- [x] Innovations brag-page entry · ATOM-SOULKEY-2026-0606 disclosure.
- [x] This roadmap document.

### Phase 2 · CLOUD SYNC (Google OpenID Connect)

Operator setup required:

- [ ] Create OAuth 2.0 client in Google Cloud Console.
- [ ] Vercel env: `GOOGLE_CLIENT_ID` + `GOOGLE_CLIENT_SECRET`.
- [ ] Vercel env: `NEXTAUTH_URL` (= `https://atomeons.com`).
- [ ] Vercel env: `NEXTAUTH_SECRET` (random 32 bytes).

Then build:

- [ ] `/api/auth/google` · OAuth code-flow handler.
- [ ] Validate Google ID token (signature, audience, expiry).
- [ ] Extract `sub` claim · use as internal user primary key.
- [ ] Supabase `users` table · `google_sub` UNIQUE NOT NULL.
- [ ] `/api/progress` · POST/GET endpoints for the cloud learning state.
- [ ] Cloud-synced enrollment in `/paths/ai-pilot` + `/paths/cyber-pro`.

Reference: <https://developers.google.com/identity/openid-connect>

### Phase 3 · SOVEREIGN MODE (DID + wallet)

- [ ] `/api/auth/wallet` · EIP-4361 nonce flow:
   1. Server issues a nonce.
   2. Client builds an ERC-4361 message + signs with wallet.
   3. Server recovers address from signature · stores session.
- [ ] In-browser DID key generation (libsodium or @noble/ed25519).
- [ ] Local vault component · IndexedDB encrypted via the SOULKEY-derived AES key.
- [ ] Canonical receipt JSON · RFC-8785 JCS for deterministic hashing.
- [ ] Receipt signing · Ed25519 over canonical bytes.
- [ ] Local-first signed-export bundle (.zip with receipts + manifest + signatures).

Reference: <https://eips.ethereum.org/EIPS/eip-4361>

### Phase 4 · VERIFIABLE CREDENTIALS

- [ ] Generate AtomEons issuer keypair · publish public key.
- [ ] `did:web:atomeons.com` DID document at `/.well-known/did.json`.
- [ ] Private key in Vercel env (`SOULKEY_ISSUER_PRIV`) · never committed.
- [ ] `/api/credentials/issue` · creates + signs VC for completed paths.
- [ ] `/api/credentials/verify` · public endpoint · returns five-check audit.
- [ ] `/proof/[did]` · render all VCs the holder chose to publish.
- [ ] Revocation list endpoint `/api/credentials/revocation-list-2025`.

References:
- <https://www.w3.org/TR/vc-data-model-2.0/>
- <https://www.w3.org/TR/did-core/>

### Phase 6 · SITE LEARNER RECORDS (operator-deferred · Wave 41 scoped)

Operator brief 2026-06-06: "i more want each completion of things to mark
the record if you so desire as a site learner. its a big project you can
scope and slate for later."

The opt-in completion-tracking layer that sits ABOVE the receipt rail:

- [ ] `learners` table in Supabase:
  - `subject_did` (FK to users or sovereign DID)
  - `enrolled_paths` array (ai-pilot, cyber-pro, etc · future expanded)
  - `completed_milestones` jsonb · per-path completion timestamps
  - `signed_receipts` array · references to receipts table
  - `public_resume_published` boolean · user opt-in
- [ ] `milestones` taxonomy · canonical list of trackable completion events:
  - Read a flagship lesson (e.g. /learn/lesson/scared-or-skeptical)
  - Finished an Atlas deep-dive
  - Passed a cheat-sheet (e.g. /best-practices/claude)
  - Submitted a path leg (4 legs per track currently · expandable)
  - Self-assessment exam submitted
  - Innovation contribution (operator-graded)
- [ ] `/api/learner/mark-complete` · client posts after lesson finish ·
  authenticated by Google sub or wallet sig per the user's mode
- [ ] `/api/learner/me` · returns this user's progress JSON
- [ ] `/profile/[did]` or `/learner/[id]` · public learner page (opt-in)
- [ ] Email-trigger via Loops when a learner crosses 100% of a track
- [ ] Hook into existing /paths/ai-pilot + /paths/cyber-pro enrollment
- [ ] Optional public proof published as a VerifiableCredential (loops
  back into Phase 4)

Operator framing: "find who are AI pilots and cyber pros · onboarding
ramp to find the best of the best · educate the rest." This phase
delivers the alumni-registry mechanic for the Library of Alexandria.

### Phase 5 · LICENSES + ANCHORS

- [ ] Decide chain · L2 (Base / Optimism) recommended for cost.
- [ ] Deploy ERC-1155 license contract.
- [ ] `/.CC` cartridge handoff:
   1. User signs challenge with wallet.
   2. Server verifies sig + checks license entitlement on-chain.
   3. Server returns encrypted cartridge manifest.
   4. Local engine decrypts and unlocks `.CC`.
- [ ] Public anchor publishing · receipt hash → IPFS pin + optional chain tx.
- [ ] Verify button on `/proof/[did]` runs all five audit checks live.

Reference: <https://eips.ethereum.org/EIPS/eip-1155>

---

## Data model · the six tables

To be added to Supabase. Names match the canonical doctrine.

```sql
-- Phase 2
CREATE TABLE users (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  google_sub      text UNIQUE,
  primary_did     text UNIQUE,
  created_at      timestamptz NOT NULL DEFAULT now()
);

-- Phase 3
CREATE TABLE keys (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid REFERENCES users(id),
  public_key      text NOT NULL,
  did             text,
  wallet_address  text,
  key_type        text NOT NULL CHECK (key_type IN ('ed25519','secp256k1','rsa','passkey')),
  created_at      timestamptz NOT NULL DEFAULT now(),
  revoked_at      timestamptz
);

-- Phase 3
CREATE TABLE receipts (
  id                          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_did                 text NOT NULL,
  receipt_hash                text NOT NULL UNIQUE,
  receipt_type                text NOT NULL CHECK (receipt_type IN ('private','public')),
  private_payload_encrypted   bytea,
  public_payload_json         jsonb,
  signature                   text NOT NULL,
  created_at                  timestamptz NOT NULL DEFAULT now()
);

-- Phase 4
CREATE TABLE credentials (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_did     text NOT NULL,
  issuer_did      text NOT NULL,
  vc_json         jsonb NOT NULL,
  status          text NOT NULL CHECK (status IN ('active','revoked','superseded')),
  issued_at       timestamptz NOT NULL DEFAULT now(),
  revoked_at      timestamptz
);

-- Phase 5
CREATE TABLE anchors (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  receipt_hash    text NOT NULL REFERENCES receipts(receipt_hash),
  storage_uri     text NOT NULL,
  chain_tx        text,
  anchor_type     text NOT NULL CHECK (anchor_type IN ('ipfs','arweave','chain','local')),
  created_at      timestamptz NOT NULL DEFAULT now()
);

-- Phase 5
CREATE TABLE licenses (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_did       text NOT NULL,
  token_standard    text NOT NULL DEFAULT 'ERC-1155',
  contract_address  text NOT NULL,
  token_id          text NOT NULL,
  entitlement       text NOT NULL,
  status            text NOT NULL CHECK (status IN ('active','expired','revoked'))
);
```

---

## Mom's Law on this roadmap

- Every checkbox here represents real work.
- The doctrine page does not claim Phases 2-5 are live.
- The `/proof/[id]` route stub labels itself as a scaffold honestly.
- When Phase 2 ships, this doc gets a SHIPPED stamp + a wave number.
- When Phase 5 ships, the verify button on `/proof/[did]` becomes functional and this doc closes.

Author · Atom McCree · CC-BY 4.0
