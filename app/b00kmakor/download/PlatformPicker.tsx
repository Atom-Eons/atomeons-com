"use client";

import { useEffect, useState } from "react";
import { trackDownload } from "../../_components/trackDownload";

/**
 * PlatformPicker — auto-detects the visitor's OS and highlights the
 * matching download tile with a "This is the one for you →" badge.
 *
 * Why client-side: we need navigator.userAgent / navigator.platform,
 * which only exist in the browser. SSR renders both tiles equal; on
 * hydration the matching one lights up.
 *
 * Detection precedence:
 *   1. navigator.userAgentData.platform (modern browsers, accurate)
 *   2. navigator.platform substring match
 *   3. navigator.userAgent substring match (fallback)
 *   4. unknown → both tiles equal (no highlight)
 *
 * For Mom: she doesn't need to know what OS she's on. The page tells her.
 */

type Artifact = {
  label: string;
  url: string;
  filename: string;
  size: string;
  sha: string;
  verifyCmd: string;
  color: string;
  accent: string;
};

type DetectedOS = "mac" | "windows" | "unknown";

function detectOS(): DetectedOS {
  if (typeof navigator === "undefined") return "unknown";

  // Modern path — userAgentData
  const uaData = (
    navigator as Navigator & {
      userAgentData?: { platform?: string };
    }
  ).userAgentData;
  if (uaData?.platform) {
    const p = uaData.platform.toLowerCase();
    if (p.includes("mac")) return "mac";
    if (p.includes("win")) return "windows";
  }

  // Classic path — navigator.platform
  const plat = (navigator.platform || "").toLowerCase();
  if (plat.includes("mac")) return "mac";
  if (plat.includes("win")) return "windows";

  // Fallback — userAgent string
  const ua = (navigator.userAgent || "").toLowerCase();
  if (ua.includes("mac os")) return "mac";
  if (ua.includes("windows")) return "windows";

  return "unknown";
}

export default function PlatformPicker({
  macArtifact,
  winArtifact,
}: {
  macArtifact: Artifact;
  winArtifact: Artifact;
}) {
  const [os, setOs] = useState<DetectedOS>("unknown");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setOs(detectOS());
    setMounted(true);
  }, []);

  const yours: Artifact | null =
    !mounted || os === "unknown"
      ? null
      : os === "mac"
        ? macArtifact
        : winArtifact;

  return (
    <div>
      {/* MOM-GRADE BANNER — only renders after hydration when we detected an OS */}
      {yours && (
        <div className="mb-6 rounded-2xl border border-[#22F0D5]/40 bg-gradient-to-r from-[#0A1A1C] to-[#0A0F11] p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
            ::we detected your computer
          </p>
          <p className="mt-2 text-lg leading-snug text-[#F2F4F5] md:text-xl">
            You&apos;re on{" "}
            <span className="font-semibold" style={{ color: yours.color }}>
              {os === "mac" ? "a Mac" : "Windows"}
            </span>
            . The{" "}
            <span className="font-semibold" style={{ color: yours.color }}>
              {os === "mac" ? "Mac version" : "Windows version"}
            </span>{" "}
            is the one you want. Click the matching tile below.
          </p>
        </div>
      )}

      {/* Both tiles · matching one gets a "★ For you" badge */}
      <div className="grid gap-6 md:grid-cols-2">
        {[macArtifact, winArtifact].map((a) => {
          const isYours =
            yours !== null && a.filename === yours.filename;
          return (
            <div
              key={a.filename}
              className="relative rounded-2xl border bg-[#0A0F11] p-7 transition-shadow"
              style={{
                borderColor: isYours ? a.color : a.color + "33",
                boxShadow: isYours ? `0 0 60px -10px ${a.color}55` : "none",
              }}
            >
              {isYours && (
                <span
                  className="absolute -top-3 left-5 rounded-full px-3 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-black"
                  style={{ background: a.color }}
                >
                  ★ This is yours
                </span>
              )}
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
                onClick={() =>
                  trackDownload({
                    product: "b00kmakor",
                    platform:
                      a.filename.toLowerCase().includes("mac")
                        ? "mac"
                        : "windows",
                    surface: "download-page",
                  })
                }
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
          );
        })}
      </div>

      {/* SOFT FALLBACK · if we couldn't detect, gently tell the buyer */}
      {mounted && !yours && (
        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7]">
          ::we couldn&apos;t auto-detect your computer · pick the platform you&apos;re on
        </p>
      )}
    </div>
  );
}
