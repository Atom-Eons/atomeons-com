import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./orange.module.css";

export const metadata: Metadata = {
  title: "Atomic Orange | Incoming",
  description:
    "Atomic Orange is the incoming AtomEons operator surface: one place to direct AI work, keep the history, and remain human at the controls.",
  alternates: { canonical: "https://atomeons.com/orange5" },
  openGraph: {
    title: "Atomic Orange | Your AI should remember what you are building",
    description: "A working relationship with memory—not another empty chat window.",
    url: "https://atomeons.com/orange5",
    siteName: "AtomEons",
    type: "website",
    images: [{ url: "/aether-v2/orange5-object-v2.webp", width: 1536, height: 1024, alt: "Atomic Orange operator object" }],
  },
};

export default function AtomicOrangePage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="orange-title">
        <div className={styles.copy}>
          <p><i /> INCOMING / OBJECT 02</p>
          <h1 id="orange-title">Your AI should remember what you&apos;re building.</h1>
          <span>
            Atomic Orange is one place to direct the work, keep the history, choose
            the intelligence, and stay human at the controls.
          </span>
          <a href="mailto:a.mccree@gmail.com?subject=Atomic%20Orange%20launch%20signal">Get the launch signal <b aria-hidden="true">↗</b></a>
          <small>NO FAKE DOWNLOAD / WE OPEN IT WHEN THE PUBLIC BUILD EARNS THE CLAIM</small>
        </div>
        <div className={styles.object}>
          <Image src="/aether-v2/orange5-object-v2.webp" alt="White and safety-orange Atomic Orange operator console" fill priority unoptimized sizes="(max-width: 900px) 100vw, 52vw" />
          <span>ATOMIC ORANGE / FIRST SIGNAL</span>
        </div>
      </section>

      <section className={styles.problem} aria-labelledby="problem-title">
        <p>THE PROBLEM</p>
        <h2 id="problem-title">Every empty chat window asks you to become a stranger again.</h2>
        <div>
          <span>01</span>
          <p>You repeat the project. You hunt for the file. You reconstruct the decision. You teach the machine who you are, then the window closes.</p>
        </div>
      </section>

      <section className={styles.promise} aria-labelledby="promise-title">
        <header><p>THE PROMISE / IN HUMAN TERMS</p><h2 id="promise-title">Less re-explaining.<br />More making.</h2></header>
        <div className={styles.grid}>
          <article><span>REMEMBER</span><h3>Pick up where you left off.</h3><p>The history of the work should return as useful context, not a mountain of transcript.</p></article>
          <article><span>DIRECT</span><h3>Run a studio, not a chat.</h3><p>Give different jobs to different kinds of intelligence while you keep the direction.</p></article>
          <article><span>SEE</span><h3>Know what actually happened.</h3><p>Files, changes, checks, links, and proof stay visible when the work says it is done.</p></article>
          <article><span>OWN</span><h3>Keep the person in the machine.</h3><p>Your files, your history, your judgment, and your final say remain at the center.</p></article>
        </div>
      </section>

      <section className={styles.status}>
        <div><p>CURRENT PUBLIC STATE</p><h2>It is working.<br />It is not yours yet.</h2></div>
        <div><p>Atomic Orange is actively used inside AtomEons. The public product, documentation, source boundary, and download have not yet been handed off as a verified release.</p><strong>That distinction matters.</strong><span>When it is ready, this page will become the front door—not a promise pretending to be a product.</span></div>
      </section>

      <section className={styles.research}>
        <p>THE IDEAS UNDERNEATH</p>
        <div>
          <Link href="/research/discoveries/aememory"><span>01</span><strong>AEMemory</strong><small>Continuity without transcript overload.</small><b>↗</b></Link>
          <Link href="/receipts"><span>02</span><strong>Receipts</strong><small>Proof that the work actually happened.</small><b>↗</b></Link>
          <Link href="/research"><span>03</span><strong>Research</strong><small>The wider experimental field.</small><b>↗</b></Link>
        </div>
      </section>

      <section className={styles.final}>
        <h2>Your machine.<br />Your mind.<br />Still you.</h2>
        <a href="mailto:a.mccree@gmail.com?subject=Atomic%20Orange%20launch%20signal">Get the signal ↗</a>
      </section>
    </main>
  );
}
