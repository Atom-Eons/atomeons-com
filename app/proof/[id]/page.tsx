import type { Metadata } from "next";
import Link from "next/link";

/**
 * /proof/[id] · the public Proof Resume route.
 *
 * Wave 40 · 2026-06-06 · canonical shape from the SOULKEY architecture.
 * Currently a SCAFFOLD · renders the structure with placeholder content.
 *
 * When operator wires Supabase + DID infrastructure (Phase 4 of the
 * SOULKEY roadmap), this route fetches:
 *   1. The DID document for the [id] (did:key, did:web, or wallet addr)
 *   2. All verifiable credentials the holder chose to make public
 *   3. Receipt anchors for those credentials
 *   4. Endorsements (signed mentions from other DIDs)
 * And renders the live verifiable portfolio.
 *
 * Until then · the page renders the structure honestly · marks itself
 * as "scaffold" · invites operator follow-through.
 */

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Proof Resume · ${id}`,
    description:
      "Public selective portfolio rendered from verifiable receipts and credentials. Part of the AtomEons SOULKEY identity architecture · /soulkey for the full doctrine.",
    alternates: {
      canonical: `https://atomeons.com/proof/${encodeURIComponent(id)}`,
    },
    robots: { index: false }, // proof resumes are user-published · not crawled by default
  };
}

export default async function ProofResumePage({ params }: PageProps) {
  const { id } = await params;

  // PLACEHOLDER · would fetch from Supabase + verify DID + load VCs.
  // For Wave 40 · render the canonical structure with example shape.
  const isExample = id === "example";

  return (
    <main className="mx-auto max-w-[1100px] px-6 py-20 text-[#F4F4F2] md:px-10 md:py-24">
      <header className="border-b border-[#1F242B] pb-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
          PROOF RESUME · ATOMEONS SOULKEY · 2026
        </p>
        <h1
          className="mt-6 break-all text-[clamp(28px,4vw,42px)] font-light leading-tight"
          style={{ fontFamily: "Newsreader, Georgia, serif", fontWeight: 300 }}
        >
          {isExample ? "Example Resume" : id}
        </h1>
        <p className="mt-4 font-mono text-[12px] text-[#9CA3AF]">
          Subject identifier · <span className="text-[#22F0D5]">{id}</span>
        </p>
        <p className="mt-6 max-w-[64ch] text-[16px] leading-[1.55] text-[#9CA3AF]">
          {isExample
            ? "This is the canonical shape · the live route renders verifiable credentials and signed receipts for a real DID or wallet address. Wired in Phase 4 of the SOULKEY roadmap."
            : "Public selectively-rendered portfolio for this subject. Verifiable below."}
        </p>
        {!isExample && (
          <p className="mt-6 border-l-2 border-[#C9A55C] bg-[#0F1114] p-4 font-mono text-[12px] text-[#C9A55C]">
            ⚠ SCAFFOLD · the live /proof/[id] route requires Phase 4
            (DID infrastructure + VC issuance) to be wired. See{" "}
            <Link href="/soulkey" className="underline">
              /soulkey
            </Link>{" "}
            for the implementation roadmap.
          </p>
        )}
      </header>

      {/* IDENTITY PROOF */}
      <section className="mt-12">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Identity proof
        </h2>
        <div className="mt-6 border border-[#1F242B] p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5]">
            Subject DID / address
          </p>
          <p className="mt-2 break-all font-mono text-[13px] text-[#F4F4F2]">{id}</p>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068]">
            Controlled key verified · {isExample ? "did:key:z6Mk..." : "(verification pending Phase 4)"}
          </p>
        </div>
      </section>

      {/* SKILL CREDENTIALS */}
      <section className="mt-16">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Skill credentials · verifiable
        </h2>
        <p className="mt-3 text-[14px] leading-[1.6] text-[#9CA3AF]">
          Each entry is a W3C Verifiable Credential issued by{" "}
          <code className="font-mono text-[#22F0D5]">did:web:atomeons.com</code> ·
          signed via DataIntegrityProof · publicly verifiable.
        </p>
        <ul className="mt-6 space-y-4">
          {isExample ? (
            [
              {
                skill: "AI Pilot · 5 levels + Atlas + Cheat Sheets + Exam",
                level: "Graduated",
                evidenceHash: "sha256:9f3a4c2e...",
                validFrom: "2026-06-06T10:30:00Z",
              },
              {
                skill: "Python API Debugging",
                level: "Verified · level 3",
                evidenceHash: "sha256:8b1e7f0a...",
                validFrom: "2026-05-21T14:12:00Z",
              },
              {
                skill: "Prompt Engineering · 80/20",
                level: "Verified · level 2",
                evidenceHash: "sha256:71d2b5e9...",
                validFrom: "2026-05-15T09:45:00Z",
              },
            ].map((c, i) => (
              <li key={i} className="border border-[#22F0D5]/30 bg-[#0F1114] p-5">
                <p
                  className="text-[20px] font-light leading-tight text-[#F4F4F2]"
                  style={{ fontFamily: "Newsreader, Georgia, serif" }}
                >
                  {c.skill}
                </p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5]">
                  {c.level}
                </p>
                <p className="mt-3 font-mono text-[11px] text-[#9CA3AF]">
                  Evidence · {c.evidenceHash}
                </p>
                <p className="mt-1 font-mono text-[10px] text-[#5A6068]">
                  Issued · {c.validFrom}
                </p>
              </li>
            ))
          ) : (
            <li className="border border-[#1F242B] bg-[#0F1114] p-5 text-[14px] text-[#9CA3AF]">
              No public credentials yet · or none chosen for publication. Subject
              controls visibility per SOULKEY canon.
            </li>
          )}
        </ul>
      </section>

      {/* PROJECT RECEIPTS */}
      <section className="mt-16">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Project receipts · publicly chosen
        </h2>
        <ul className="mt-6 space-y-3">
          {isExample ? (
            [
              "Built an AtomEons-class daily-broadcast generator · receipt 000942",
              "Shipped Crystal Lattice Compression compatible loader · receipt 000871",
              "Decoded the AlphaFold 3 paper into a curriculum lesson · receipt 000823",
            ].map((r, i) => (
              <li
                key={i}
                className="flex gap-3 border-l-2 border-[#C9A55C]/40 pl-5 text-[14px] leading-[1.6] text-[#9CA3AF]"
              >
                <span>{r}</span>
              </li>
            ))
          ) : (
            <li className="text-[14px] text-[#9CA3AF]">
              No public receipts surfaced.
            </li>
          )}
        </ul>
      </section>

      {/* VERIFICATION */}
      <section className="mt-16 border-l-4 border-[#22F0D5] bg-[#0F1114] p-8">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#22F0D5]">
          § Verification
        </h2>
        <p className="mt-4 text-[15px] leading-[1.65] text-[#F4F4F2]">
          When wired (Phase 4), pressing Verify runs a five-check audit:
        </p>
        <ol className="mt-4 list-decimal space-y-2 pl-6 text-[14px] leading-[1.6] text-[#9CA3AF]">
          <li>The credential was issued by AtomEons (did:web:atomeons.com).</li>
          <li>The receipt hash matches the original event (RFC-8785 canonical SHA-256).</li>
          <li>The subject controls the key / address (challenge-response or wallet signature).</li>
          <li>The credential has not been revoked (status-list lookup).</li>
          <li>The public page did not invent or alter the claim (signature over canonical bytes).</li>
        </ol>
        <button
          type="button"
          disabled
          className="mt-6 inline-flex items-center gap-2 border border-[#5A6068] bg-[#08090B] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#5A6068]"
          aria-label="Verification scaffold · Phase 4 wire-up pending"
        >
          Verify · Phase 4 pending
        </button>
      </section>

      <footer className="mt-20 border-t border-[#1F242B] pt-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#5A6068]">
          /proof/{id} · canonical shape · CC-BY 4.0 · see /soulkey for the architecture
        </p>
        <div className="mt-4">
          <Link
            href="/soulkey"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5] hover:underline"
          >
            ← SOULKEY canon
          </Link>
        </div>
      </footer>
    </main>
  );
}
