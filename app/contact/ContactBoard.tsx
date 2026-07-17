"use client";

import { useState } from "react";
import styles from "./contact.module.css";

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

  async function copyAddress(address: string) {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(address);
      window.setTimeout(() => setCopied((current) => current === address ? "" : current), 1800);
    } catch {
      window.location.href = `mailto:${address}`;
    }
  }

  return (
    <div className={styles.board}>
      <div className={styles.boardRail} aria-hidden>
        <span>CHOOSE A FREQUENCY</span>
        <i />
        <span>ALL ROUTES / LIVE</span>
      </div>

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
            <p>{channel.body}</p>
            <div className={styles.channelActions}>
              <a href={`mailto:${channel.address}?subject=${encodeURIComponent(channel.subject)}`}>
                Write now <span aria-hidden>↗</span>
              </a>
              <button type="button" onClick={() => copyAddress(channel.address)}>
                {copied === channel.address ? "Copied" : "Copy address"}
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.directGrid}>
        {directChannels.map(([label, address, subject]) => (
          <article className={styles.directChannel} key={address}>
            <span>{label}</span>
            <a href={`mailto:${address}?subject=${encodeURIComponent(subject)}`}>{address}</a>
            <button type="button" onClick={() => copyAddress(address)}>
              {copied === address ? "COPIED" : "COPY"}
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
