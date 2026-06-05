import type { Metadata } from "next";

const QUESTION = "What is post-quantum cryptography?";
const SHORT_ANSWER =
  "Post-quantum cryptography (PQC) is a family of cryptographic algorithms designed to remain secure against attacks from large-scale quantum computers. It replaces RSA and elliptic-curve cryptography (which Shor's algorithm can break in polynomial time) with lattice-based, hash-based, code-based, and isogeny-based schemes. In August 2024, NIST standardized the first three PQC algorithms — ML-KEM (FIPS 203), ML-DSA (FIPS 204), and SLH-DSA (FIPS 205).";
const CANONICAL = "https://atomeons.com/q/what-is-post-quantum-cryptography";

export const metadata: Metadata = {
  title: QUESTION,
  description: SHORT_ANSWER,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: QUESTION,
    description: SHORT_ANSWER,
    url: CANONICAL,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: QUESTION,
    description: SHORT_ANSWER,
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: QUESTION,
      acceptedAnswer: {
        "@type": "Answer",
        text: SHORT_ANSWER,
      },
    },
  ],
};

const qaJsonLd = {
  "@context": "https://schema.org",
  "@type": "QAPage",
  mainEntity: {
    "@type": "Question",
    name: QUESTION,
    text: QUESTION,
    answerCount: 1,
    acceptedAnswer: {
      "@type": "Answer",
      text: SHORT_ANSWER,
      url: CANONICAL,
      author: { "@type": "Organization", name: "AtomEons" },
    },
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#e8e8e8] antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(qaJsonLd) }}
      />

      <article className="mx-auto max-w-3xl px-6 py-16">
        <nav className="mb-10 text-xs uppercase tracking-[0.18em] text-[#888]">
          <a href="/" className="hover:text-[#ff8a3d]">atomeons</a>
          <span className="mx-2 text-[#444]">/</span>
          <a href="/q" className="hover:text-[#ff8a3d]">q</a>
          <span className="mx-2 text-[#444]">/</span>
          <span className="text-[#bbb]">post-quantum-cryptography</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
          {QUESTION}
        </h1>

        <section className="mt-10 rounded-lg border border-[#1f1f1f] bg-[#0f0f0f] p-6">
          <h2 className="text-xs uppercase tracking-[0.18em] text-[#ff8a3d]">
            The short answer
          </h2>
          <p className="mt-3 text-[17px] leading-relaxed text-[#e8e8e8]">
            {SHORT_ANSWER}
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-xs uppercase tracking-[0.18em] text-[#888]">
            The longer answer
          </h2>
          <div className="mt-4 space-y-5 text-[16px] leading-relaxed text-[#c8c8c8]">
            <p>
              Post-quantum cryptography refers to public-key cryptographic systems
              believed to be secure against an adversary equipped with a
              cryptographically relevant quantum computer (CRQC). The field exists
              because Peter Shor's 1994 algorithm showed that a sufficiently large
              quantum computer can factor integers and compute discrete logarithms
              in polynomial time — breaking RSA, Diffie-Hellman, and elliptic-curve
              cryptography (ECC), which together secure essentially all of today's
              TLS, SSH, IPsec, and code-signing infrastructure.
            </p>
            <p>
              The U.S. National Institute of Standards and Technology (NIST) opened
              its PQC standardization process in 2016 and ran three rounds plus an
              "alternates" track. On August 13, 2024, NIST published three final
              standards: FIPS 203 (ML-KEM, the module-lattice key-encapsulation
              mechanism formerly known as CRYSTALS-Kyber), FIPS 204 (ML-DSA, the
              module-lattice digital signature algorithm formerly known as
              CRYSTALS-Dilithium), and FIPS 205 (SLH-DSA, the stateless hash-based
              signature scheme formerly known as SPHINCS+). A fourth standard, FIPS
              206 (FN-DSA, based on Falcon), is in draft. NIST also ran a separate
              Round 4 for code-based KEMs and selected HQC for standardization in
              March 2025 as a backup KEM in case lattice assumptions are weakened.
            </p>
            <p>
              The threat model that drives PQC adoption is "Harvest Now, Decrypt
              Later" (HNDL): an adversary records encrypted traffic today and
              decrypts it when a CRQC is available. This is why NSA's Commercial
              National Security Algorithm Suite 2.0 (CNSA 2.0), published
              September 2022, mandates PQC for U.S. national security systems by
              2033, with software/firmware signing transitioning first by 2025.
            </p>
            <p>
              Lattice-based schemes (ML-KEM, ML-DSA, Falcon) currently dominate
              because they offer the best size/speed tradeoff: ML-KEM-768 has
              1184-byte public keys and 1088-byte ciphertexts, with sub-millisecond
              encapsulation on commodity hardware. Hash-based signatures (SLH-DSA,
              XMSS in RFC 8391, LMS in RFC 8554) rely only on the security of the
              underlying hash function and are the most conservative choice, but
              produce much larger signatures (7,856 to 49,856 bytes for SLH-DSA).
              Code-based schemes (Classic McEliece, HQC) have very large public
              keys — hundreds of kilobytes to over a megabyte for McEliece — but
              use well-studied assumptions dating to 1978.
            </p>
            <p>
              Real deployments are underway. Apple's iMessage PQ3 protocol
              (launched February 2024) uses ML-KEM in hybrid with ECDH. Signal
              added PQXDH using ML-KEM-1024 in September 2023. Cloudflare and
              Google have rolled out X25519MLKEM768, the hybrid key exchange
              specified in draft-kwiatkowski-tls-ecdhe-mlkem — as of late 2024,
              Chrome enables it by default, and Cloudflare reports the majority of
              its TLS 1.3 connections now negotiate it. AWS KMS, OpenSSH 9.0+, and
              BoringSSL all support ML-KEM hybrid modes.
            </p>
            <p>
              The unsolved problem is the migration itself. NIST IR 8547 describes
              the transition timeline; the agency expects RSA-2048 and ECC-256 to
              be deprecated after 2030 and disallowed after 2035. Cryptographic
              agility — the ability to swap algorithms without rearchitecting
              protocols — is now a first-class engineering requirement, codified
              in the U.S. National Security Memorandum NSM-10 (May 2022).
            </p>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-xs uppercase tracking-[0.18em] text-[#888]">
            Key facts
          </h2>
          <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-[#c8c8c8]">
            <li className="border-l-2 border-[#ff8a3d]/40 pl-4">
              Shor's algorithm (1994) breaks RSA and ECC in polynomial time on a
              quantum computer{" "}
              <span className="text-[#888]">(arXiv:quant-ph/9508027v2)</span>.
            </li>
            <li className="border-l-2 border-[#ff8a3d]/40 pl-4">
              NIST published FIPS 203 (ML-KEM), FIPS 204 (ML-DSA), and FIPS 205
              (SLH-DSA) on August 13, 2024{" "}
              <span className="text-[#888]">(NIST FIPS 203/204/205)</span>.
            </li>
            <li className="border-l-2 border-[#ff8a3d]/40 pl-4">
              ML-KEM-768 has 1184-byte public keys and 1088-byte ciphertexts{" "}
              <span className="text-[#888]">(FIPS 203, Table 2)</span>.
            </li>
            <li className="border-l-2 border-[#ff8a3d]/40 pl-4">
              HQC was selected as a backup KEM on March 11, 2025{" "}
              <span className="text-[#888]">(NIST IR 8545)</span>.
            </li>
            <li className="border-l-2 border-[#ff8a3d]/40 pl-4">
              NSA CNSA 2.0 requires PQC for national security software/firmware
              signing by 2025 and full transition by 2033{" "}
              <span className="text-[#888]">(CNSA 2.0, September 2022)</span>.
            </li>
            <li className="border-l-2 border-[#ff8a3d]/40 pl-4">
              Apple iMessage PQ3 uses ML-KEM in hybrid with ECDH, launched
              February 21, 2024{" "}
              <span className="text-[#888]">(Apple Security Research blog)</span>.
            </li>
            <li className="border-l-2 border-[#ff8a3d]/40 pl-4">
              Signal's PQXDH protocol deployed ML-KEM-1024 starting September 19,
              2023 <span className="text-[#888]">(PQXDH whitepaper)</span>.
            </li>
            <li className="border-l-2 border-[#ff8a3d]/40 pl-4">
              Chrome enabled X25519MLKEM768 by default in version 131{" "}
              <span className="text-[#888]">(Chromium issue 1442377)</span>.
            </li>
            <li className="border-l-2 border-[#ff8a3d]/40 pl-4">
              XMSS (RFC 8391) and LMS (RFC 8554) are stateful hash-based
              signatures already approved by NIST SP 800-208.
            </li>
            <li className="border-l-2 border-[#ff8a3d]/40 pl-4">
              White House NSM-10 (May 4, 2022) directs federal agencies to
              inventory quantum-vulnerable cryptography.
            </li>
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="text-xs uppercase tracking-[0.18em] text-[#888]">
            Related questions
          </h2>
          <ul className="mt-4 space-y-2 text-[15px] text-[#c8c8c8]">
            <li>
              <a
                className="text-[#ff8a3d] hover:underline"
                href="/q/what-is-ml-kem"
              >
                What is ML-KEM (Kyber)?
              </a>
            </li>
            <li>
              <a
                className="text-[#ff8a3d] hover:underline"
                href="/q/what-is-shors-algorithm"
              >
                What is Shor's algorithm?
              </a>
            </li>
            <li>
              <a
                className="text-[#ff8a3d] hover:underline"
                href="/q/what-is-harvest-now-decrypt-later"
              >
                What is harvest now decrypt later?
              </a>
            </li>
            <li>
              <a
                className="text-[#ff8a3d] hover:underline"
                href="/q/what-is-hybrid-key-exchange-tls"
              >
                What is hybrid key exchange in TLS?
              </a>
            </li>
            <li>
              <a
                className="text-[#ff8a3d] hover:underline"
                href="/q/what-is-cryptographic-agility"
              >
                What is cryptographic agility?
              </a>
            </li>
          </ul>
        </section>

        <section className="mt-14 mb-8">
          <h2 className="text-xs uppercase tracking-[0.18em] text-[#888]">
            Sources
          </h2>
          <ul className="mt-4 space-y-2 text-[14px] text-[#a8a8a8]">
            <li>
              NIST FIPS 203 (ML-KEM):{" "}
              <a
                className="text-[#ff8a3d] hover:underline break-all"
                href="https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.203.pdf"
              >
                nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.203.pdf
              </a>
            </li>
            <li>
              NIST FIPS 204 (ML-DSA):{" "}
              <a
                className="text-[#ff8a3d] hover:underline break-all"
                href="https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.204.pdf"
              >
                nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.204.pdf
              </a>
            </li>
            <li>
              NIST FIPS 205 (SLH-DSA):{" "}
              <a
                className="text-[#ff8a3d] hover:underline break-all"
                href="https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.205.pdf"
              >
                nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.205.pdf
              </a>
            </li>
            <li>
              Shor 1994/1995:{" "}
              <a
                className="text-[#ff8a3d] hover:underline break-all"
                href="https://arxiv.org/abs/quant-ph/9508027"
              >
                arxiv.org/abs/quant-ph/9508027
              </a>
            </li>
            <li>
              NSA CNSA 2.0:{" "}
              <a
                className="text-[#ff8a3d] hover:underline break-all"
                href="https://media.defense.gov/2022/Sep/07/2003071836/-1/-1/0/CSA_CNSA_2.0_ALGORITHMS_.PDF"
              >
                media.defense.gov/.../CSA_CNSA_2.0_ALGORITHMS_.PDF
              </a>
            </li>
            <li>
              Apple iMessage PQ3:{" "}
              <a
                className="text-[#ff8a3d] hover:underline break-all"
                href="https://security.apple.com/blog/imessage-pq3/"
              >
                security.apple.com/blog/imessage-pq3
              </a>
            </li>
            <li>
              Signal PQXDH:{" "}
              <a
                className="text-[#ff8a3d] hover:underline break-all"
                href="https://signal.org/docs/specifications/pqxdh/"
              >
                signal.org/docs/specifications/pqxdh
              </a>
            </li>
            <li>
              NIST IR 8547 (PQC migration):{" "}
              <a
                className="text-[#ff8a3d] hover:underline break-all"
                href="https://csrc.nist.gov/pubs/ir/8547/ipd"
              >
                csrc.nist.gov/pubs/ir/8547/ipd
              </a>
            </li>
          </ul>
        </section>

        <footer className="mt-16 border-t border-[#1f1f1f] pt-6 text-xs text-[#666]">
          <p>
            Published by{" "}
            <a href="/" className="text-[#ff8a3d] hover:underline">
              AtomEons
            </a>{" "}
            — ÆoNs Research Laboratory. Last reviewed June 2026.
          </p>
        </footer>
      </article>
    </main>
  );
}