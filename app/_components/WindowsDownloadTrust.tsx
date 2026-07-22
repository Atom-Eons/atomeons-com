"use client";

import { useState } from "react";
import styles from "./WindowsDownloadTrust.module.css";

type WindowsDownloadTrustProps = {
  productName: string;
  releaseState: string;
  sourceHref: string;
  downloadHref?: string;
  filename?: string;
  version?: string;
  sha256?: string;
  buildDate?: string;
  attestationHref?: string;
  surface?: "ink" | "paper";
};

const MICROSOFT_SMARTSCREEN_DOCS =
  "https://learn.microsoft.com/en-us/windows/apps/package-and-deploy/smartscreen-reputation";

export function WindowsDownloadTrust({
  productName,
  releaseState,
  sourceHref,
  downloadHref,
  filename,
  version,
  sha256,
  buildDate,
  attestationHref,
  surface = "ink",
}: WindowsDownloadTrustProps) {
  const [copied, setCopied] = useState(false);
  const releaseReady = Boolean(
    downloadHref && filename && version && sha256 && buildDate && attestationHref,
  );

  const copyChecksum = async () => {
    if (!sha256) return;
    await navigator.clipboard.writeText(sha256);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <aside
      className={`${styles.trustPanel} ${surface === "paper" ? styles.paper : styles.ink}`}
      aria-labelledby={`${productName.toLowerCase().replace(/\s+/g, "-")}-windows-trust`}
    >
      <div className={styles.signalLine}>
        <span>WINDOWS / DOWNLOAD TRUST</span>
        <span>{releaseState}</span>
      </div>

      <div className={styles.introGrid}>
        <div>
          <p className={styles.eyebrow}>WINDOWS MAY INTERRUP THE INSTALLATION</p>
          <h2 id={`${productName.toLowerCase().replace(/\s+/g, "-")}-windows-trust`}>
            Windows is cautious with new apps. <em>Fair. We’re new.</em>
          </h2>
        </div>
        <div className={styles.explanation}>
          <p>
            AtomEons is a new independent publisher, so Microsoft SmartScreen may call
            {` ${productName} `}“unrecognized.” That is a <strong>download-reputation warning,
            not a malware detection.</strong>
          </p>
          <p>
            Download only from this page. When the blue screen appears, choose:
          </p>
          <p className={styles.runPath}><b>More info</b><i>→</i><b>Run anyway</b></p>
        </div>
      </div>

      <div className={styles.actions}>
        {releaseReady ? (
          <a className={styles.primaryAction} href={downloadHref}>Continue Download</a>
        ) : (
          <span className={`${styles.primaryAction} ${styles.disabledAction}`} aria-disabled="true">
            Continue Download · Opens on green
          </span>
        )}
        {attestationHref ? (
          <a className={styles.secondaryAction} href={attestationHref} target="_blank" rel="noopener noreferrer">
            Verify This Build ↗
          </a>
        ) : (
          <span className={`${styles.secondaryAction} ${styles.disabledAction}`} aria-disabled="true">
            Verify This Build · Pending
          </span>
        )}
      </div>

      <div className={styles.proofGrid}>
        <div>
          <span>EXACT FILE + VERSION</span>
          <strong>{filename && version ? `${filename} · ${version}` : "Publishes with the verified release"}</strong>
        </div>
        <div className={styles.checksumCell}>
          <span>SHA-256 CHECKSUM</span>
          <code>{sha256 ?? "PENDING PUBLIC BUILD RECEIPT"}</code>
          <button type="button" onClick={copyChecksum} disabled={!sha256}>
            {copied ? "COPIED" : "COPY"}
          </button>
        </div>
        <div>
          <span>BUILD DATE</span>
          <strong>{buildDate ?? "Publishes with the verified release"}</strong>
        </div>
        <div>
          <span>INDEPENDENT VERIFICATION</span>
          {attestationHref ? (
            <a href={attestationHref} target="_blank" rel="noopener noreferrer">Public build attestation ↗</a>
          ) : (
            <strong>Attestation link opens on green</strong>
          )}
        </div>
      </div>

      <div className={styles.walkthroughGrid}>
        <figure className={styles.walkthrough}>
          <picture>
            <source
              media="(prefers-reduced-motion: reduce)"
              srcSet="/windows-trust/smartscreen-run-anyway-poster.webp"
            />
            <img
              src="/windows-trust/smartscreen-run-anyway.gif"
              alt="Five-second walkthrough: select More info on the Windows protected your PC screen, then select Run anyway"
              width="960"
              height="540"
              loading="lazy"
            />
          </picture>
          <figcaption><span>5 SECOND WALKTHROUGH</span><strong>More info → Run anyway</strong></figcaption>
        </figure>

        <div className={styles.safetyColumn}>
          <div className={styles.stopNotice}>
            <span>STOP / DIFFERENT WARNING</span>
            <strong>If Windows says “Threat detected” or quarantines the file, stop.</strong>
            <p>That is a different warning. Do not continue—contact AtomEons before proceeding.</p>
          </div>
          <p className={styles.microsoftNote}>
            Microsoft explains that SmartScreen’s unrecognized-app notice uses publisher
            and file reputation. The notice alone does not mean malware was detected.
            <a href={MICROSOFT_SMARTSCREEN_DOCS} target="_blank" rel="noopener noreferrer">
              Microsoft SmartScreen documentation ↗
            </a>
          </p>
          <a className={styles.sourceLink} href={sourceHref} target="_blank" rel="noopener noreferrer">
            PUBLIC SOURCE / GITHUB MIRROR ↗
          </a>
        </div>
      </div>
    </aside>
  );
}
