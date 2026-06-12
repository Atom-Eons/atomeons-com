import type { Metadata } from "next";
import Link from "next/link";
import { AutoGlyph } from "../_components/V3/Illustrations";

/**
 * /soulkey · the canonical AtomEons identity architecture.
 *
 * Wave 40 · 2026-06-06 · operator canonized the dual-rail identity
 * doctrine: Cloud Sync (Google) · Sovereign Mode (DID/wallet) · Hybrid.
 *
 * Five-component stack:
 *   SOULKEY      cryptographic identity root
 *   SOUL GENOME  behavior identity DNA
 *   SOUL.01      runtime identity system
 *   Receipt Rail signed evidence
 *   Proof Resume public selective portfolio
 *
 * Mom's Law framing: this page describes the architecture as canon.
 * Implementation roadmap below names what's shipped vs what needs the
 * operator's Supabase/Google/wallet wiring. No "live" claims for
 * infrastructure that doesn't exist yet.
 */

export const metadata: Metadata = {
  title: "SOULKEY · the AtomEons identity architecture",
  description:
    "Canonical AtomEons identity stack: SOULKEY (cryptographic root) · SOUL GENOME (behavior DNA) · SOUL.01 (runtime) · Receipt Rail (signed evidence) · Proof Resume (selective portfolio). Three modes: Cloud Sync via Google OpenID Connect · Sovereign via DID/wallet (EIP-4361, W3C VC, DID Core) · Hybrid. Selective sovereignty by design.",
  alternates: { canonical: "https://atomeons.com/soulkey" },
  openGraph: {
    title: "SOULKEY · AtomEons Identity Canon",
    description:
      "Dual-rail identity: Google convenience + sovereign cryptographic ownership · selective public proof · user-choice architecture.",
    url: "https://atomeons.com/soulkey",
    type: "article",
  },
};

const CANON_LINE = [
  { phrase: "SOULKEY", verb: "owns." },
  { phrase: "SOUL GENOME", verb: "remembers." },
  { phrase: "SOUL.01", verb: "acts." },
  { phrase: "Receipt Rail", verb: "proves." },
  { phrase: "Proof Resume", verb: "travels." },
];

const MODES = [
  {
    name: "Cloud Sync",
    blurb:
      "Sign in with Google. Fastest UX. Progress syncs across devices. Backed by Atomeons database. Operator owns the convenience layer.",
    primary_id: "google_sub",
    accent: "#9D7FFF",
    standard:
      "Google OpenID Connect · the `sub` claim is the required user identifier · unique among Google Accounts · never reused · email may change but sub does not.",
    when:
      "Use when you want zero-config progress tracking across phone + laptop. The mainstream lane. Most users start here.",
  },
  {
    name: "Sovereign Mode",
    blurb:
      "Local keypair, DID, or wallet. Signed receipts. User-owned vault. Public proofs are selective. Atomeons never sees the private notes.",
    primary_id: "did:key | did:web | wallet address",
    accent: "#22F0D5",
    standard:
      "W3C DID Core for the identity layer · W3C Verifiable Credentials 2.0 for the resume objects · EIP-4361 Sign-In with Ethereum for wallet auth · DataIntegrityProof for signatures.",
    when:
      "Use when you want exportable, future-proof, censorship-resistant ownership of your skill receipts. The sovereign lane.",
  },
  {
    name: "Hybrid",
    blurb:
      "Google convenience + SOULKEY proof. Best of both. The cloud DB syncs across devices, the wallet/DID signs publishable proofs. User-controlled unlink.",
    primary_id: "google_sub ↔ wallet/DID linked",
    accent: "#C9A55C",
    standard:
      "google_sub stored alongside primary_did in the users table · user controls the link · either side can be unlinked without losing the other.",
    when:
      "Use when you want to publish proof on a resume that survives Google but still keep the easy login. The power-user lane.",
  },
];

const STACK = [
  {
    name: "SOULKEY",
    role: "cryptographic account / identity root",
    detail:
      "The keypair (or DID, or wallet) that owns your AtomEons identity. Generated locally or imported. Never sent to the lab. The public key is your AtomEons ID in Sovereign and Hybrid modes.",
  },
  {
    name: "SOUL GENOME",
    role: "behavior identity DNA",
    detail:
      "Versioned record of how you actually use the lab · prompt style, learning velocity, tool preferences, completion patterns. Encoded into a portable model that travels with your SOULKEY. Operator-signed upgrades are auditable.",
  },
  {
    name: "SOUL.01",
    role: "runtime identity system",
    detail:
      "The runtime that interprets your SOUL GENOME against new content · personalizes lesson sequences · suggests next steps · runs locally in Sovereign mode (privacy preserved). Cloud Sync mode runs it server-side.",
  },
  {
    name: "Receipt Rail",
    role: "signed evidence of actions, learning, skill, work",
    detail:
      "Every significant lab event produces a canonicalized JSON receipt. Hashed. Signed by SOULKEY. Two kinds: Private (full event detail, encrypted vault) and Public (minimal verifiable credential, optional publish).",
  },
  {
    name: "Proof Resume",
    role: "public selective portfolio rendered from verifiable receipts",
    detail:
      "At /proof/{did-or-address}, the lab renders a selective public view of your verified work. You choose what surfaces. Verification button proves issuance + integrity + control + non-revocation + page authenticity.",
  },
];

const POWER_LEVELS = [
  {
    name: "Normal user",
    mode: "Cloud Sync",
    detail:
      "Sign in with Google. Track progress. Receive certificates by email. Done. No keys to manage.",
  },
  {
    name: "Advanced user",
    mode: "Sovereign Vault",
    detail:
      "Local SOULKEY · signed export of every milestone · take your skill history anywhere · verifiable independently of AtomEons.",
  },
  {
    name: "Power user · public builder",
    mode: "Published Proof Resume",
    detail:
      "Published proof page at /proof/{did}. VC credentials issued by did:web:atomeons.com. Wallet-linked ERC-1155 skill licenses for .CC cartridges. Permanent reputation that survives the lab.",
  },
];

const RECEIPT_PRIVATE_EXAMPLE = `{
  "receipt_id": "atomeons.receipt.000942",
  "subject": "did:key:z6Mk...",
  "event_type": "skill_sequence_completed",
  "skill": "Python API Debugging",
  "task": "Fixed malformed JSON endpoint",
  "evidence": {
    "tests_passed": 12,
    "artifact_hash": "sha256:...",
    "repo_commit": "abc123"
  },
  "private_notes": "User solved after two failed attempts.",
  "created_at": "2026-06-06T10:30:00Z"
}`;

const RECEIPT_PUBLIC_EXAMPLE = `{
  "type": ["VerifiableCredential", "AtomeonsSkillCredential"],
  "issuer": "did:web:atomeons.com",
  "credentialSubject": {
    "id": "did:key:z6Mk...",
    "skill": "Python API Debugging",
    "level": "Verified",
    "evidenceHash": "sha256:..."
  },
  "validFrom": "2026-06-06T10:30:00Z",
  "proof": {
    "type": "DataIntegrityProof",
    "proofPurpose": "assertionMethod"
  }
}`;

const DATA_MODEL = [
  {
    table: "users",
    cols: "id · google_sub (nullable) · primary_did (nullable) · created_at",
  },
  {
    table: "keys",
    cols: "id · user_id (nullable) · public_key · did · wallet_address (nullable) · key_type · created_at · revoked_at (nullable)",
  },
  {
    table: "receipts",
    cols: "id · subject_did · receipt_hash · receipt_type · private_payload_encrypted · public_payload_json · signature · created_at",
  },
  {
    table: "credentials",
    cols: "id · subject_did · issuer_did · vc_json · status · issued_at · revoked_at (nullable)",
  },
  {
    table: "anchors",
    cols: "id · receipt_hash · storage_uri · chain_tx (nullable) · anchor_type · created_at",
  },
  {
    table: "licenses",
    cols: "id · subject_did · token_standard · contract_address · token_id · entitlement · status",
  },
];

const VERIFICATION_PROOFS = [
  "The credential was issued by Atomeons (did:web:atomeons.com) or a trusted issuer.",
  "The receipt hash matches the original event (canonicalized JSON SHA-256).",
  "The subject controls the key / address (challenge-response or wallet sig).",
  "The credential has not been revoked (status list lookup).",
  "The public page did not invent or alter the claim (signature over canonical bytes).",
];

const ROADMAP = [
  {
    phase: "Phase 1 · CANON (this wave · Wave 40)",
    items: [
      "Doctrine page at /soulkey · the architecture made public.",
      "Proof-resume route shape at /proof/[id] · placeholder with full structure.",
      "Implementation roadmap document committed to the repo.",
      "SOULKEY added to /innovations as a registered invention.",
    ],
  },
  {
    phase: "Phase 2 · CLOUD SYNC (Google OpenID Connect)",
    items: [
      "Operator wires GOOGLE_CLIENT_ID + GOOGLE_CLIENT_SECRET in Vercel env.",
      "/api/auth/google · OAuth code-flow endpoint · validates ID token · extracts sub.",
      "Supabase users table · primary key on google_sub when present.",
      "/api/progress · POST/GET endpoints for the cloud-synced learning state.",
      "Cloud-synced enrollment in /paths/ai-pilot + /paths/cyber-pro.",
    ],
  },
  {
    phase: "Phase 3 · SOVEREIGN MODE (DID + wallet)",
    items: [
      "/api/auth/wallet · EIP-4361 Sign-In with Ethereum nonce flow.",
      "did:key generator in browser (libsodium / @noble/ed25519).",
      "Local vault component · IndexedDB · encrypted via SOULKEY.",
      "Canonical receipt JSON spec · RFC-8785 JSON Canonicalization.",
      "Receipt signing · Ed25519 over canonical bytes.",
      "Local-first export · download signed receipt bundle as .zip.",
    ],
  },
  {
    phase: "Phase 4 · VERIFIABLE CREDENTIALS",
    items: [
      "did:web:atomeons.com DID document published at /.well-known/did.json.",
      "Issuer keypair generated · public key in DID doc · private key in vercel env.",
      "/api/credentials/issue · creates and signs VC for completed learning paths.",
      "/api/credentials/verify · public endpoint that proves a VC's signature + revocation.",
      "/proof/[did] · live render of all VCs the holder chose to publish.",
    ],
  },
  {
    phase: "Phase 5 · LICENSES + ANCHORS",
    items: [
      "ERC-1155 license contract decision · which chain · which standard.",
      "/.CC cartridge handoff · wallet-signed challenge · entitlement check · encrypted manifest delivery.",
      "Public anchor publishing · receipt hash → IPFS or chain · operator chooses.",
      "Proof resume verification button · five-check audit (issuer · hash · control · revocation · authenticity).",
    ],
  },
];

const CC_LINK = `User owns ERC-1155 skill license
  → Local engine signs challenge
  → Atomeons verifies wallet / DID
  → Engine checks license entitlement
  → Downloads encrypted cartridge manifest
  → Unlocks .CC skill locally
  → Completion receipts are signed
  → User can publish skill proof to resume`;

const SOUL01_LINK = `SOUL.01 behavior receipts
  → signed by SOULKEY
  → stored in private vault
  → selected public proofs become reputation
  → SOUL GENOME versions are signed
  → model upgrades are auditable`;

export default function SoulkeyPage() {
  return (
    <main className="mx-auto max-w-[1100px] px-6 py-20 text-[#F4F4F2] md:px-10 md:py-24">
      <header className="border-b border-[#1F242B] pb-12">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
              CANON · IDENTITY ARCHITECTURE · 2026-06-06
            </p>
            <h1
              className="mt-6 text-balance text-[clamp(48px,9vw,120px)] font-light leading-[0.92]"
              style={{ fontFamily: "Newsreader, Georgia, serif", fontWeight: 300 }}
            >
              SOULKEY.
            </h1>
            <p
              className="mt-4 text-[clamp(20px,2.4vw,28px)] font-light italic leading-[1.35] text-[#9CA3AF]"
              style={{ fontFamily: "Newsreader, Georgia, serif" }}
            >
              Dual-rail identity. Selective sovereignty by design.
            </p>
            <p className="mt-6 max-w-[64ch] text-[18px] leading-[1.55] text-[#9CA3AF]">
              Cloud Sync for the convenience layer. Sovereign Mode for
              the proof layer. Hybrid for the power user. The lab does
              not put every raw receipt on a public ledger · users
              choose what becomes public.
            </p>
          </div>
          <div className="hidden md:block" style={{ opacity: 0.6 }} aria-hidden>
            <AutoGlyph slug="/soulkey" size={180} hue={175} />
          </div>
        </div>
      </header>

      {/* THE CANON LINE */}
      <section className="mt-16 border-l-4 border-[#22F0D5] bg-[#0F1114] p-8">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#22F0D5]">
          § The canon line
        </h2>
        <ul
          className="mt-6 space-y-3 text-[28px] font-light leading-[1.2] text-[#F4F4F2]"
          style={{ fontFamily: "Newsreader, Georgia, serif" }}
        >
          {CANON_LINE.map((l) => (
            <li key={l.phrase} className="flex flex-wrap items-baseline gap-3">
              <span className="font-mono text-[14px] uppercase tracking-[0.32em] text-[#22F0D5]">
                {l.phrase}
              </span>
              <span className="text-[#9CA3AF]">{l.verb}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* THE STACK */}
      <section className="mt-20">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § The five-component stack
        </h2>
        <ul className="mt-8 space-y-6">
          {STACK.map((c) => (
            <li key={c.name} className="border-l-2 border-[#22F0D5]/40 pl-6">
              <p className="font-mono text-[14px] uppercase tracking-[0.22em] text-[#22F0D5]">
                {c.name}
              </p>
              <p className="mt-1 text-[18px] font-light italic text-[#9CA3AF]">
                {c.role}
              </p>
              <p className="mt-2 text-[15px] leading-[1.65] text-[#9CA3AF]">
                {c.detail}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* THREE MODES */}
      <section className="mt-20">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Three modes · user-choice architecture
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {MODES.map((m) => (
            <article
              key={m.name}
              className="border p-6"
              style={{ borderColor: "#1F242B" }}
            >
              <p
                className="font-mono text-[11px] uppercase tracking-[0.32em]"
                style={{ color: m.accent }}
              >
                {m.name}
              </p>
              <p
                className="mt-3 text-[20px] font-light leading-tight text-[#F4F4F2]"
                style={{ fontFamily: "Newsreader, Georgia, serif" }}
              >
                {m.blurb}
              </p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a]">
                Primary ID · {m.primary_id}
              </p>
              <p className="mt-3 text-[13px] leading-[1.6] text-[#9CA3AF]">
                <span className="font-mono uppercase tracking-[0.22em] text-[#C9A55C]">Standard · </span>
                {m.standard}
              </p>
              <p className="mt-3 text-[13px] leading-[1.6] text-[#9CA3AF]">
                <span className="font-mono uppercase tracking-[0.22em] text-[#22F0D5]">When · </span>
                {m.when}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* TWO RECEIPT TYPES */}
      <section className="mt-20">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Two receipt types · privacy by default
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <article className="border border-[#1F242B] p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#C9A55C]">
              Private Receipt
            </p>
            <p
              className="mt-3 text-[18px] font-light text-[#F4F4F2]"
              style={{ fontFamily: "Newsreader, Georgia, serif" }}
            >
              Full event detail. Stored locally or encrypted cloud. Project data, timestamps, tool outputs, scores.
            </p>
            <pre className="mt-4 overflow-x-auto rounded border border-[#1F242B] bg-[#08090B] p-4 font-mono text-[11px] leading-[1.55] text-[#9CA3AF]">
              {RECEIPT_PRIVATE_EXAMPLE}
            </pre>
          </article>
          <article className="border border-[#22F0D5]/30 p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#22F0D5]">
              Public Verifiable Credential
            </p>
            <p
              className="mt-3 text-[18px] font-light text-[#F4F4F2]"
              style={{ fontFamily: "Newsreader, Georgia, serif" }}
            >
              Minimal verifiable claim · no private payload unless user chooses · hash · issuer · subject · skill · level · timestamp · proof.
            </p>
            <pre className="mt-4 overflow-x-auto rounded border border-[#22F0D5]/20 bg-[#08090B] p-4 font-mono text-[11px] leading-[1.55] text-[#9CA3AF]">
              {RECEIPT_PUBLIC_EXAMPLE}
            </pre>
          </article>
        </div>
      </section>

      {/* DATA MODEL */}
      <section className="mt-20">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Data model · 6 tables
        </h2>
        <table className="mt-8 w-full border-collapse text-[13px]">
          <thead>
            <tr className="border-b border-[#1F242B] text-left">
              <th className="py-2 pr-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a]">
                Table
              </th>
              <th className="py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a]">
                Columns
              </th>
            </tr>
          </thead>
          <tbody>
            {DATA_MODEL.map((t) => (
              <tr key={t.table} className="border-b border-[#0F1114]">
                <td className="py-3 pr-6 align-top font-mono text-[12px] text-[#22F0D5]">
                  {t.table}
                </td>
                <td className="py-3 align-top font-mono text-[12px] leading-[1.6] text-[#F4F4F2]">
                  {t.cols}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-6 max-w-[80ch] text-[14px] leading-[1.65] text-[#9CA3AF]">
          Layered: public ledger = proof layer · private vault = memory layer · Atomeons DB = convenience layer. The public ledger carries truth anchors, not raw receipts.
        </p>
      </section>

      {/* PROOF RESUME */}
      <section className="mt-20">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Proof Resume · /proof/{`{did-or-address}`}
        </h2>
        <p className="mt-4 max-w-[72ch] text-[15px] leading-[1.65] text-[#9CA3AF]">
          The selectively-public portfolio rendered from your signed receipts and verifiable credentials. You choose what surfaces. Verification button proves the page didn&apos;t invent the claim.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="border border-[#1F242B] p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
              Sections (operator-curated)
            </p>
            <ul className="mt-3 space-y-1.5 text-[13px] leading-[1.55] text-[#9CA3AF]">
              <li>· Identity proof</li>
              <li>· Skill credentials</li>
              <li>· Project receipts</li>
              <li>· Artifact hashes</li>
              <li>· Model / course completions</li>
              <li>· Endorsements</li>
              <li>· Optional public work history</li>
              <li>· Verification button</li>
            </ul>
          </div>
          <div className="border border-[#1F242B] p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
              The verification button proves
            </p>
            <ol className="mt-3 list-decimal space-y-1.5 pl-4 text-[13px] leading-[1.55] text-[#9CA3AF]">
              {VERIFICATION_PROOFS.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ol>
          </div>
        </div>
        <div className="mt-6">
          <Link
            href="/proof/example"
            className="inline-flex items-center gap-2 border border-[#22F0D5] bg-[#22F0D5]/10 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5] transition hover:bg-[#22F0D5]/20"
          >
            See the proof-resume shape →
          </Link>
        </div>
      </section>

      {/* POWER LEVELS */}
      <section className="mt-20">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Three power levels
        </h2>
        <ul className="mt-8 space-y-5">
          {POWER_LEVELS.map((p) => (
            <li key={p.name} className="border-l-2 border-[#22F0D5]/40 pl-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#22F0D5]">
                {p.name} · {p.mode}
              </p>
              <p className="mt-2 text-[15px] leading-[1.65] text-[#F4F4F2]">
                {p.detail}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* LINKS TO .CC + SOUL.01 */}
      <section className="mt-20 grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
            § How this links to .CC cartridges
          </h2>
          <pre className="mt-4 overflow-x-auto rounded border border-[#1F242B] bg-[#08090B] p-5 font-mono text-[11px] leading-[1.6] text-[#9CA3AF]">
            {CC_LINK}
          </pre>
        </div>
        <div>
          <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
            § How this links to SOUL.01
          </h2>
          <pre className="mt-4 overflow-x-auto rounded border border-[#1F242B] bg-[#08090B] p-5 font-mono text-[11px] leading-[1.6] text-[#9CA3AF]">
            {SOUL01_LINK}
          </pre>
        </div>
      </section>

      {/* ROADMAP */}
      <section className="mt-20">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Implementation roadmap · 5 phases · honest scope
        </h2>
        <p className="mt-4 max-w-[72ch] text-[14px] leading-[1.6] text-[#9CA3AF]">
          Phase 1 is this wave. Phases 2-5 need operator-wired keys + infra. Every phase ships independently.
        </p>
        <ol className="mt-8 space-y-8 list-none pl-0">
          {ROADMAP.map((p, i) => (
            <li key={p.phase} className="border-l-2 border-[#22F0D5]/40 pl-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#22F0D5]">
                {p.phase}
              </p>
              <ul className="mt-3 space-y-2 text-[14px] leading-[1.6] text-[#9CA3AF]">
                {p.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className={`mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full ${i === 0 ? "bg-[#22F0D5]" : "bg-[#7a818a]"}`} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a]">
                {i === 0 ? "STATUS · shipped this wave" : `STATUS · scoped · awaiting operator wire-up`}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* STANDARDS CITED */}
      <section className="mt-20 border-t border-[#1F242B] pt-12">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Standards cited
        </h2>
        <ul className="mt-6 space-y-2 text-[14px] leading-[1.6]">
          <li>
            <a
              href="https://developers.google.com/identity/openid-connect"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#22F0D5] hover:underline"
            >
              ↗ Google OpenID Connect · the `sub` claim spec
            </a>
          </li>
          <li>
            <a
              href="https://eips.ethereum.org/EIPS/eip-4361"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#22F0D5] hover:underline"
            >
              ↗ EIP-4361 · Sign-In with Ethereum
            </a>
          </li>
          <li>
            <a
              href="https://www.w3.org/TR/vc-data-model-2.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#22F0D5] hover:underline"
            >
              ↗ W3C Verifiable Credentials Data Model 2.0
            </a>
          </li>
          <li>
            <a
              href="https://www.w3.org/TR/did-core/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#22F0D5] hover:underline"
            >
              ↗ W3C Decentralized Identifiers (DID) v1.0
            </a>
          </li>
          <li>
            <a
              href="https://eips.ethereum.org/EIPS/eip-1155"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#22F0D5] hover:underline"
            >
              ↗ ERC-1155 · multi-token license standard
            </a>
          </li>
          <li>
            <a
              href="https://www.rfc-editor.org/rfc/rfc8785"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#22F0D5] hover:underline"
            >
              ↗ RFC 8785 · JSON Canonicalization Scheme
            </a>
          </li>
        </ul>
      </section>

      <footer className="mt-20 border-t border-[#1F242B] pt-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#7a818a]">
          /soulkey · canonical doctrine · CC-BY 4.0 · last updated 2026-06-06
        </p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#7a818a]">
          Disclosure ID · ATOM-SOULKEY-2026-0606 · architecture authored by Atom McCree
        </p>
      </footer>
    </main>
  );
}
