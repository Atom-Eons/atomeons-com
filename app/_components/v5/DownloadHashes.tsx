/**
 * Real SHA-256 hashes from the v6.0.0 BUILD receipt.
 * Source: receipts/BUILD_v6.0.0.json
 *
 * v6.0 is native — no webview, no chromium bundled. The default ship
 * artifact is the NSIS setup.exe (one file, double-click, 2-second launch).
 * The portable zip and the naked native binary are alternates.
 */

const ARTIFACTS = [
  {
    file: "orangebox-v6.0.0-setup.exe",
    label: "Windows installer · default",
    sub: "NSIS setup · double-click · 2-second launch",
    sizeBytes: 24_830_668, // ~23.68 MB
    sha256:
      "8ecc770f4fab50cedecfa3a98eca2f18e0603762fab41adb8355ffedf87eeaf9",
    pill: "BUY THIS",
  },
  {
    file: "orangebox-v6.0.0-portable.zip",
    label: "Portable zip",
    sub: "unzip-and-run · no installer · ideal for USB / lab boxes",
    sizeBytes: 36_397_809, // ~34.71 MB
    sha256:
      "f605ceb7cd850ce624edee215963c2ca77901c255ba3eaed39e4e7bcfc1acb68",
  },
  {
    file: "orangebox.exe",
    label: "Native binary · standalone",
    sub: "4.46 MB · Rust + egui · PE32+ x86-64 GUI · no chromium",
    sizeBytes: 4_676_485, // ~4.46 MB
    sha256:
      "f7e189d30884b74e890688b6a1407ea37c7d2a6d11eebb23a9164e3e931825d6",
  },
];

function fmtMB(n: number) {
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
}

export function DownloadHashes() {
  return (
    <section className="relative bg-black py-32">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="mb-16 max-w-3xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
            ::binary integrity
          </p>
          <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-6xl">
            Hashes published.
            <br />
            <span className="text-[#22F0D5]">Verify before you trust.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-[#9BA5A7]">
            Every v6.0.0 binary has its SHA-256 in the public release.
            The default download is the NSIS setup (24.8 MB). Compare with{" "}
            <code className="font-mono text-sm text-[#22F0D5]">
              Get-FileHash
            </code>{" "}
            before install. Receipt JSON ships inside the portable zip at{" "}
            <code className="font-mono text-sm text-[#22F0D5]">
              receipts/BUILD_v6.0.0.json
            </code>
            .
          </p>
        </div>

        <div className="space-y-4">
          {ARTIFACTS.map((a) => (
            <div
              key={a.file}
              className={`rounded-2xl border bg-[#0A0F11] p-6 md:p-8 ${
                a.pill
                  ? "border-[#22F0D5]/60 shadow-[0_0_60px_-20px_rgba(34, 240, 213,0.5)]"
                  : "border-[#1A2225]"
              }`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#22F0D5]">
                    {a.label}{" "}
                    {a.pill ? (
                      <span className="ml-2 rounded border border-[#22F0D5] bg-[#22F0D5]/15 px-1.5 py-0.5 text-[9px] text-[#22F0D5]">
                        {a.pill}
                      </span>
                    ) : null}
                  </p>
                  <p className="mt-2 break-all font-mono text-sm font-medium text-[#F2F4F5] md:text-base">
                    {a.file}
                  </p>
                  <p className="mt-1 text-xs text-[#6B7779]">{a.sub}</p>
                </div>
                <span className="font-mono text-sm font-medium text-[#22F0D5]">
                  {fmtMB(a.sizeBytes)}
                </span>
              </div>

              <div className="mt-5 border-t border-[#1A2225] pt-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
                  sha-256
                </p>
                <p className="mt-2 break-all font-mono text-xs text-[#9BA5A7] md:text-sm">
                  {a.sha256}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 max-w-3xl font-mono text-xs leading-relaxed text-[#6B7779]">
          PowerShell ·{" "}
          <code className="text-[#22F0D5]">
            Get-FileHash .\orangebox-v6.0.0-setup.exe -Algorithm SHA256
          </code>
          {"  "}·{"  "}bash ·{" "}
          <code className="text-[#22F0D5]">
            shasum -a 256 orangebox-v6.0.0-setup.exe
          </code>
        </p>

        <div className="mt-8 rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 md:p-7">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#22F0D5]">
            ::chrome / smartscreen warning · this is normal
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[#9BA5A7] md:text-base">
            Chrome will warn you on first download because atomeons.com is a
            brand-new domain with no reputation history. The binary is unsigned
            in v6.0.0 (EV cert wired in v6.1). Verify the SHA-256 above against
            the file you downloaded, then click{" "}
            <span className="text-[#F2F4F5]">More info → Run anyway</span> on
            the SmartScreen prompt. If the hash matches, the file is the same
            bytes we built.
          </p>
        </div>
      </div>
    </section>
  );
}
