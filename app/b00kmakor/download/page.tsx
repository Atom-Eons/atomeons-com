import type { Metadata } from "next";
import Link from "next/link";

/**
 * /b00kmakor/download — buyer-facing download landing page.
 *
 * Reached after a successful "buy" interaction on /b00kmakor — during
 * the free-week countdown the buyer hits /api/checkout/b00kmakor and
 * gets redirected here (via NEXT_PUBLIC_B00KMAKOR_DOWNLOAD_URL pointing
 * at this route). After the countdown, Stripe checkout's success_url
 * also lands buyers here.
 *
 * Page shows both platform zips + both manuals + the SHA-256 hashes
 * + verification instructions for each OS. The license + grandfather
 * clause is stated explicitly so the buyer knows exactly what they own.
 *
 * Public on purpose. The cost of someone sharing the URL is zero —
 * the artifacts are already in the lab's ledger with public SHA-256s,
 * and during the free week ALL buyers get them gratis anyway. After
 * the free week, the dynamic-world-pricing means there's no single
 * "list price" to undercut — the buyer in their country still pays
 * their fair tier rate or gets the free week's grandfathered copy.
 */

export const metadata: Metadata = {
  title:
    "B00KMAKR v3.2.0 download — Mac + Windows · grab both · SHA-256 verified",
  description:
    "Direct downloads for B00KMAKR v3.2.0. Mac zip (2.10 MB) + Windows zip (1.04 MB) + both manuals (book-red Mac · blue Windows). SHA-256 receipts published. Grandfather-for-life clause applies during the free-week countdown.",
  alternates: { canonical: "https://atomeons.com/b00kmakor/download" },
  robots: { index: false, follow: false }, // buyer-only page, not for crawl indexing
};

// Blob-hosted artifact URLs — populated by Vercel Blob upload on 2026-05-30.
const ARTIFACTS = {
  macZip: {
    label: "Mac · v3.2.0 bundle",
    url: "https://idv0aauaxicyf09e.public.blob.vercel-storage.com/b00kmakor/v3.2.0/B00KMAKR-Mac-v3.2.0-FINAL.zip",
    filename: "B00KMAKR-Mac-v3.2.0-FINAL.zip",
    size: "2.10 MB",
    sha: "27c11258e4f28986c10d768254444d916f8b30b6f32b77ffe86c5bd5607034b3",
    verifyCmd: 'shasum -a 256 "B00KMAKR-Mac-v3.2.0-FINAL.zip"',
    color: "#FFB87A",
    accent: "book-red",
  },
  winZip: {
    label: "Windows · v3.2.0 bundle",
    url: "https://idv0aauaxicyf09e.public.blob.vercel-storage.com/b00kmakor/v3.2.0/B00KMAKR-Windows-v3.2.0-FINAL.zip",
    filename: "B00KMAKR-Windows-v3.2.0-FINAL.zip",
    size: "1.04 MB",
    sha: "8f6d1ced50ff19316a94cf3dbbd8bfbc945e36e3ae1b36d0997e047e76e7896d",
    verifyCmd: 'Get-FileHash "B00KMAKR-Windows-v3.2.0-FINAL.zip" -Algorithm SHA256',
    color: "#7AB8FF",
    accent: "blue",
  },
  macManual: {
    label: "Mac manual (book-red)",
    url: "https://idv0aauaxicyf09e.public.blob.vercel-storage.com/b00kmakor/v3.2.0/B00KMAKR-Manual.pdf",
    filename: "B00KMAKR-Manual.pdf",
    size: "1.28 MB",
    sha: "3240c4c2908664dcbb0d204026f70152fc9ac2ffc3b504afead64d4ed8df88b3",
    verifyCmd: 'shasum -a 256 "B00KMAKR-Manual.pdf"',
    color: "#FFB87A",
    accent: "book-red PDF",
  },
  winManual: {
    label: "Windows manual (blue)",
    url: "https://idv0aauaxicyf09e.public.blob.vercel-storage.com/b00kmakor/v3.2.0/B00KMAKR-Windows-Manual.pdf",
    filename: "B00KMAKR-Windows-Manual.pdf",
    size: "816 KB",
    sha: "d80eb124477fbbb27841e0de736731831da6d724ec0d4f88060c63dbefc92dae",
    verifyCmd: 'Get-FileHash "B00KMAKR-Windows-Manual.pdf" -Algorithm SHA256',
    color: "#7AB8FF",
    accent: "blue PDF",
  },
};

export default function B00KMakrDownloadPage() {
  return (
    <main className="relative isolate min-h-screen bg-black text-[#F2F4F5]">
      {/* breadcrumb */}
      <div className="mx-auto w-full max-w-5xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/b00kmakor" className="hover:text-[#22F0D5]">B00KMAKR</Link>{" "}
          <span className="text-[#1A2225]">/</span> download · v3.2.0
        </p>
      </div>

      {/* HERO */}
      <section className="mx-auto w-full max-w-5xl px-6 pt-16 pb-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
          ::v3.2.0 · grab your platform · grandfathered for life
        </p>
        <h1 className="mt-6 text-balance text-5xl font-medium leading-[1] tracking-tight md:text-7xl">
          B<span className="text-[#FF7A1A]">0</span>
          <span className="text-[#FF7A1A]">0</span>K<span className="text-[#22F0D5]">MAKR</span> is yours.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-[1.65] text-[#C8CCCE] md:text-lg">
          Grab the platform you live on. If you use both, grab both —
          the license covers you on every machine you own. Verify the
          SHA-256 against the lab&apos;s public ledger before unzipping;
          the commands are next to each file.
        </p>
      </section>

      {/* TWO PLATFORM ZIPS */}
      <section className="mx-auto w-full max-w-5xl px-6 py-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
          ::the apps
        </p>
        <h2 className="mt-3 text-3xl font-medium tracking-tight md:text-4xl">
          Pick your platform.
        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {[ARTIFACTS.macZip, ARTIFACTS.winZip].map((a) => (
            <div
              key={a.filename}
              className="rounded-2xl border bg-[#0A0F11] p-7"
              style={{ borderColor: a.color + "55" }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="size-3 rounded-full"
                  style={{ background: a.color }}
                />
                <p
                  className="font-mono text-[10px] uppercase tracking-[0.22em]"
                  style={{ color: a.color }}
                >
                  ::{a.label}
                </p>
              </div>
              <p className="mt-4 text-xl font-medium text-[#F2F4F5]">
                {a.filename}
              </p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.22em] text-[#9BA5A7]">
                {a.size} · {a.accent} accent · SHA-256 verified
              </p>

              <a
                href={a.url}
                download
                className="mt-6 inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition-colors"
                style={{
                  borderColor: a.color,
                  background: a.color,
                  color: "#0A0F11",
                }}
              >
                Download · {a.size} ↓
              </a>

              <details className="mt-6 group">
                <summary className="cursor-pointer font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779] hover:text-[#22F0D5]">
                  ::verify integrity (SHA-256)
                </summary>
                <div className="mt-3 space-y-2">
                  <code className="block break-all rounded bg-black/40 p-3 font-mono text-[11px] text-[#22F0D5]">
                    {a.sha}
                  </code>
                  <code className="block rounded bg-black/40 p-3 font-mono text-[11px] text-[#C8CCCE]">
                    {a.verifyCmd}
                  </code>
                </div>
              </details>
            </div>
          ))}
        </div>
      </section>

      {/* TWO MANUALS */}
      <section className="mx-auto w-full max-w-5xl px-6 py-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
          ::the manuals
        </p>
        <h2 className="mt-3 text-3xl font-medium tracking-tight md:text-4xl">
          Read the manual that matches your platform.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-[1.6] text-[#C8CCCE]">
          Both PDFs embed their fonts so they look identical on every
          screen. The Mac manual uses the book-red accent. The Windows
          manual uses blue so you know at a glance which one you&apos;re
          reading.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {[ARTIFACTS.macManual, ARTIFACTS.winManual].map((a) => (
            <div
              key={a.filename}
              className="rounded-2xl border bg-[#0A0F11] p-6"
              style={{ borderColor: a.color + "44" }}
            >
              <p
                className="font-mono text-[10px] uppercase tracking-[0.22em]"
                style={{ color: a.color }}
              >
                ::{a.label}
              </p>
              <p className="mt-3 text-lg font-medium text-[#F2F4F5]">
                {a.filename}
              </p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.22em] text-[#9BA5A7]">
                {a.size} · embedded fonts
              </p>
              <a
                href={a.url}
                download
                className="mt-5 inline-flex items-center gap-2 rounded-lg border border-[#22F0D5]/40 bg-[#0A0F11] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5] hover:bg-[#22F0D5]/10"
              >
                Download PDF ↓
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* LICENSE + GRANDFATHER */}
      <section className="mx-auto w-full max-w-5xl px-6 py-12">
        <div className="rounded-2xl border border-[#22F0D5]/30 bg-[#0A1A1C] p-7 md:p-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
            ::license · what you just got
          </p>
          <h2 className="mt-4 text-2xl font-medium tracking-tight md:text-3xl">
            Yours forever. No catch.
          </h2>
          <ul className="mt-5 space-y-3 text-[15px] leading-[1.7] text-[#C8CCCE]">
            <li className="flex items-baseline gap-3">
              <span className="font-mono text-[#22F0D5]">▲</span>
              <span>
                Once · forever. You own this version of B00KMAKR on
                every machine you operate. No subscription. License
                §4A no-SaaS covenant binds the lab to never move this
                product to a recurring fee.
              </span>
            </li>
            <li className="flex items-baseline gap-3">
              <span className="font-mono text-[#22F0D5]">▲</span>
              <span>
                <span className="font-semibold text-[#F2F4F5]">Free-week grandfather clause:</span>{" "}
                if you downloaded during the free-week countdown, your
                license is grandfathered for life — even after the
                price changes for new buyers. The lab will not retroactively
                bill you.
              </span>
            </li>
            <li className="flex items-baseline gap-3">
              <span className="font-mono text-[#22F0D5]">▲</span>
              <span>
                <span className="font-semibold text-[#F2F4F5]">30-day Material Failure Guarantee:</span>{" "}
                if B00KMAKR doesn&apos;t materially work for your writing
                workflow, email{" "}
                <a
                  href="mailto:a.mccree@gmail.com?subject=B00KMAKR%20Material%20Failure%20Guarantee"
                  className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4"
                >
                  a.mccree@gmail.com
                </a>{" "}
                within 30 days. Full refund, no support-queue gauntlet.
              </span>
            </li>
            <li className="flex items-baseline gap-3">
              <span className="font-mono text-[#22F0D5]">▲</span>
              <span>
                Source code is included inside both zips (advanced/source
                on Windows, mac-stage on Mac) so you can audit, fork,
                self-build, or self-rebrand at will. Redistribution is
                not granted by default — see{" "}
                <Link
                  href="/legal/terms"
                  className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4"
                >
                  License §3
                </Link>
                .
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* SUPPORT */}
      <section className="mx-auto w-full max-w-5xl px-6 py-12 pb-32">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
          ::if something is wrong
        </p>
        <h2 className="mt-3 text-2xl font-medium tracking-tight md:text-3xl">
          Direct line to the founder.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-[1.65] text-[#C8CCCE]">
          No support queue, no ticket gauntlet. If a SHA-256 doesn&apos;t
          match, if a binary won&apos;t open, if your platform
          isn&apos;t covered — email the founder. The lab is one
          operator and one machine; you get the operator directly.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="mailto:a.mccree@gmail.com?subject=B00KMAKR%20v3.2.0%20issue"
            className="inline-flex items-center gap-2 rounded-lg border border-[#FF7A1A] bg-[#FF7A1A] px-6 py-3 text-sm font-semibold text-black hover:bg-[#FFA45A]"
          >
            email the founder →
          </a>
          <Link
            href="/b00kmakor"
            className="inline-flex items-center gap-2 rounded-lg border border-[#22F0D5]/40 bg-[#0A0F11] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5] hover:bg-[#22F0D5]/10"
          >
            ::back to the product page
          </Link>
        </div>
      </section>

      {/* footer */}
      <div className="mx-auto w-full max-w-5xl px-6 pb-10">
        <div className="flex flex-col items-start justify-between gap-4 border-t border-[#1A2225] pt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779] sm:flex-row sm:items-center">
          <span>2026 · AtomEons Systems Laboratory · Marco Island, FL</span>
          <Link href="/" className="hover:text-[#22F0D5]">
            ← back to atomeons
          </Link>
        </div>
      </div>
    </main>
  );
}
