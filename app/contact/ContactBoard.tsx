"use client";

import { useState } from "react";
import styles from "./contact.module.css";

const DELIVERY_ADDRESS = "a.mccree@gmail.com";

const primaryChannels = [
  {
    index: "01",
    label: "MAKE SOMETHING",
    address: "hello@atomeons.com",
    subject: "Build something with AtomEons",
    body: "Collaborations, commissions, partnerships, strange proposals, and serious opportunities.",
    tone: "orange",
  },
  {
    index: "02",
    label: "PRODUCT SIGNAL",
    address: "support@atomeons.com",
    subject: "AtomEons product support",
    body: "Product questions, launch interest, bug reports, corrections, and help with a public artifact.",
    tone: "blue",
  },
  {
    index: "03",
    label: "TELL THE STORY",
    address: "press@atomeons.com",
    subject: "Press inquiry - AtomEons",
    body: "Interviews, profiles, appearances, image requests, fact checks, and media deadlines.",
    tone: "red",
  },
  {
    index: "04",
    label: "TEST THE EDGE",
    address: "research@atomeons.com",
    subject: "AtomEons research inquiry",
    body: "Papers, replications, technical criticism, experiments, independent research, and new evidence.",
    tone: "mint",
  },
] as const;

const directChannels = [
  ["CONTACT", "contact@atomeons.com", "General AtomEons inquiry"],
  ["ATOM", "atom@atomeons.com", "Direct note for Atom McCree"],
  ["PRIVACY", "privacy@atomeons.com", "Privacy or deletion request"],
  ["LEGAL", "legal@atomeons.com", "Legal or licensing question"],
] as const;

export function ContactBoard() {
  const [copied, setCopied] = useState("");

  function mailtoHref(address: string, subject: string) {
    return `mailto:${DELIVERY_ADDRESS}?subject=${encodeURIComponent(`[${address}] ${subject}`)}`;
  }

  async function copyAddress(address: string) {
    try {
      await navigator.clipboard.writeText(DELIVERY_ADDRESS);
      setCopied(address);
      window.setTimeout(() => setCopied((current) => current === address ? "" : current), 1800);
    } catch {
      window.location.href = mailtoHref(address, "AtomEons inquiry");
    }
  }

  return (
    <div className={styles.board}>
      <div className={styles.boardRail} aria-hidden>
        <span>CHOOSE A FREQUENCY</span>
        <i />
        <span>DIRECT GMAIL FAIL-SAFE</span>
      </div>

      <section className={styles.failSafePanel} aria-labelledby="direct-inbox-title">
        <div>
          <span className={styles.failSafeKicker}>CONFIRMED DESTINATION</span>
          <h2 id="direct-inbox-title">{DELIVERY_ADDRESS}</h2>
          <p>
            If a branded address ever fails, use this inbox. Every public contact route on this page opens a message
            to this address and keeps the intended AtomEons channel in the subject line.
          </p>
        </div>
        <div className={styles.failSafeActions}>
          <a href="mailto:a.mccree@gmail.com?subject=%5Bdirect%5D%20AtomEons%20inquiry">
            Email direct <span aria-hidden>â†—</span>
          </a>
          <button type="button" onClick={() => copyAddress("direct")}>
            {copied === "direct" ? "Copied" : "Copy inbox"}
          </button>
        </div>
      </section>

      <div className={styles.primaryGrid}>
        {primaryChannels.map((channel) => (
          <article className={styles.channel} data-tone={channel.tone} key={channel.address}>
            <div className={styles.channelTop}>
              <span>{channel.index}</span>
              <span>{channel.label}</span>
              <i aria-hidden />
            </div>
            <div className={styles.signalMark} aria-hidden>
              <span>{channel.index}</span>
              <i />
            </div>
            <h2>{channel.address}</h2>
            <small className={styles.deliveryLine}>delivers to {DELIVERY_ADDRESS}</small>
            <p>{channel.body}</p>
            <div className={styles.channelActions}>
              <a href={mailtoHref(channel.address, channel.subject)}>
                Write now <span aria-hidden>↗</span>
              </a>
              <button type="button" onClick={() => copyAddress(channel.address)}>
                {copied === channel.address ? "Copied" : "Copy direct"}
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.directGrid}>
        {directChannels.map(([label, address, subject]) => (
          <article className={styles.directChannel} key={address}>
            <span>{label}</span>
            <a href={mailtoHref(address, subject)}>{address}</a>
            <small>to {DELIVERY_ADDRESS}</small>
            <button type="button" onClick={() => copyAddress(address)}>
              {copied === address ? "COPIED" : "COPY"}
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
