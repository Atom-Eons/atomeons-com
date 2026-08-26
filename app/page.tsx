import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SignalField } from "./_components/launch/SignalField";
import styles from "./launch.module.css";

const cableboxDownload =
  "https://github.com/Atom-Eons/CableBox2/releases/download/v1.0.0/CableBox2-Windows-x64-1.0.0.zip";

const cableboxFeatures = [
  {
    number: "01",
    title: "Surf. Don’t search.",
    copy: "Move through a living dial instead of negotiating with another wall of thumbnails.",
    note: "LESS CHOOSING / MORE FINDING",
  },
  {
    number: "02",
    title: "Change the whole room.",
    copy: "Switch collectible television environments instantly. The cabinet is part of the show.",
    note: "DOZENS OF TV WORLDS",
  },
  {
    number: "03",
    title: "Bring your own movies.",
    copy: "Your local media joins the dial and keeps working offline. Your library stays yours.",
    note: "PERSONAL / LOCAL / OFFLINE",
  },
  {
    number: "04",
    title: "Know what’s on.",
    copy: "Open the cable guide for what is playing now and what is coming next—without leaving the television.",
    note: "ONE GUIDE / ZERO HOMEWORK",
  },
  {
    number: "05",
    title: "Keep the good stuff.",
    copy: "Slap a gold star on a channel and it becomes a favorite you can find again.",
    note: "FAVORITES FEEL PHYSICAL",
  },
  {
    number: "06",
    title: "A dead signal never wins.",
    copy: "Automatic recovery moves past failed streams so the screen keeps living.",
    note: "BUILT TO KEEP MOVING",
  },
];

export const metadata: Metadata = {
  title: "AtomEons | Things that did not exist",
  description:
    "Meet CableBox 2 and Atomic Orange: independent products made by Atom McCree and an AI workforce in Naples, Florida.",
  alternates: { canonical: "https://atomeons.com" },
  openGraph: {
    title: "AtomEons | Things that did not exist",
    description: "CableBox 2 is live. Atomic Orange is incoming. Try the future before anyone agrees on it.",
    url: "https://atomeons.com",
    siteName: "AtomEons",
    type: "website",
    images: [{ url: "/og-v27.png", width: 1727, height: 911, alt: "AtomEons — things that did not exist" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AtomEons | Things that did not exist",
    description: "CableBox 2 is live. Atomic Orange is incoming.",
    creator: "@AtomMccree",
    images: ["/og-v27.png"],
  },
};

export default function Home() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="home-title">
        <SignalField />
        <div className={styles.heroIndex} aria-hidden="true">
          <span>AE / 2026</span>
          <span>NAPLES, FL</span>
          <span>OBJECT 01 / LIVE</span>
        </div>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><i /> CABLEBOX 2 IS LIVE</p>
          <h1 id="home-title">
            <span>Turn it on.</span>
            <em>Get lost.</em>
          </h1>
          <p className={styles.heroLede}>
            Touch one button. A beautiful old television wakes up, starts playing,
            and keeps surprising you. No setup ritual. No decision fatigue. Just the
            pleasure of finding something you never asked for.
          </p>
          <div className={styles.heroActions}>
            <Link className={styles.primaryAction} href="/cablebox/web">
              Try CableBox now <Arrow />
            </Link>
            <a className={styles.secondaryAction} href={cableboxDownload}>
              Download for Windows <Arrow />
            </a>
          </div>
          <ul className={styles.heroProof} aria-label="CableBox 2 quick facts">
            <li><b>01</b><span>Starts in your browser</span></li>
            <li><b>02</b><span>Touch ready</span></li>
            <li><b>03</b><span>Free + open source</span></li>
          </ul>
        </div>

        <div className={styles.heroArtifact}>
          <div className={styles.artifactCoordinates} aria-hidden="true">
            <span>26.1423° N</span><span>81.7948° W</span>
          </div>
          <Link className={styles.heroObject} href="/cablebox/web" aria-label="Open the CableBox 2 web edition">
            <Image
              src="/cablebox-premiere/hero-active.webp"
              alt="CableBox 2 running inside a cinematic vintage television"
              fill
              priority
              unoptimized
              sizes="(max-width: 900px) 100vw, 52vw"
            />
            <span className={styles.objectScan} aria-hidden="true" />
            <span className={styles.objectGlow} aria-hidden="true" />
            <span className={styles.playPill}><i /> LIVE WEB EDITION</span>
            <span className={styles.objectNote}>ENTER THE SIGNAL ↗</span>
          </Link>
          <div className={styles.artifactReadout} aria-hidden="true">
            <span>OBJECT 01</span><b>CBX / II</b><small>ANALOG SOUL<br />DIGITAL NERVE</small>
          </div>
        </div>
        <div className={styles.transmissionRail} aria-hidden="true">
          <span>TELEVISION WITHOUT THE HOMEWORK</span>
          <i />
          <span>33 WORLDS / ONE DIAL</span>
          <i />
          <span>THE SIGNAL IS ALIVE</span>
        </div>
      </section>

      <section className={styles.thesis} aria-labelledby="thesis-title">
        <p>THE COMPANY / IN ONE SENTENCE</p>
        <h2 id="thesis-title">We make things people can feel before they know how to explain them.</h2>
        <div>
          <span>01</span>
          <p>
            No venture costume. No fake laboratory. Atom McCree is an artist and inventor
            directing an AI workforce from Naples, Florida. The work is the proof.
          </p>
        </div>
      </section>

      <section className={styles.featureManifest} aria-labelledby="features-title">
        <div className={styles.featureBand} aria-hidden="true">
          <span>NO LOGIN</span><i />
          <span>NO HOMEWORK</span><i />
          <span>JUST TELEVISION</span><i />
          <span>FREE / OPEN SOURCE</span>
        </div>
        <header className={styles.featureHeader}>
          <p>THE HUMAN VERSION / WHAT YOU GET</p>
          <h2 id="features-title">You do not need<br />a manual.</h2>
          <span>
            CableBox is one simple feeling with serious machinery hidden underneath:
            turn it on and television is fun again.
          </span>
        </header>
        <ul className={styles.featureGrid}>
          {cableboxFeatures.map((feature) => (
            <li key={feature.number} data-ghost={feature.number}>
              <b aria-hidden="true">{feature.number}</b>
              <div>
                <h3>{feature.title}</h3>
                <p>{feature.copy}</p>
                <small>{feature.note}</small>
              </div>
              <i aria-hidden="true" />
            </li>
          ))}
        </ul>
        <div className={styles.featureExit}>
          <span>THAT’S IT. YOU’RE READY.</span>
          <Link href="/cablebox/web">Turn it on <Arrow /></Link>
        </div>
      </section>

      <section className={styles.twoObjects} aria-labelledby="objects-title">
        <header className={styles.sectionHead}>
          <p>THE FRONT LINE / TWO OBJECTS</p>
          <h2 id="objects-title">One is on.<br />One is waking up.</h2>
        </header>

        <article className={`${styles.objectCard} ${styles.cableCard}`}>
          <div className={styles.cardNumber}>01</div>
          <div className={styles.cardCopy}>
            <p>AVAILABLE NOW / WINDOWS + WEB</p>
            <h3>CableBox 2</h3>
            <strong>Television without the homework.</strong>
            <span>
              Turn a knob and something good is already happening. The web edition is
              the fastest way in; the Windows edition is the full art object.
            </span>
            <ul className={styles.cardFeatureList} aria-label="CableBox 2 editions">
              <li>Play instantly in a browser</li>
              <li>Touch controls on phones</li>
              <li>Full Windows art object</li>
              <li>Free and open source</li>
            </ul>
            <div className={styles.cardActions}>
              <Link href="/cablebox/web">Try it <Arrow /></Link>
              <Link href="/cablebox">Meet CableBox 2 <Arrow /></Link>
            </div>
          </div>
          <div className={styles.cableDial} aria-hidden="true">
            <span>33</span><small>TELEVISION<br />WORLDS</small>
          </div>
        </article>

        <article className={`${styles.objectCard} ${styles.orangeCard}`}>
          <div className={styles.orangeVisual}>
            <Image
                src="/og.png"
              alt="Atomic Orange operator console in white and safety orange"
              fill
              unoptimized
              sizes="(max-width: 900px) 100vw, 48vw"
            />
          </div>
          <div className={styles.cardNumber}>02</div>
          <div className={styles.cardCopy}>
            <p>INCOMING / ATOMIC ORANGE</p>
            <h3>Your AI should know what you&apos;re building.</h3>
            <strong>A working relationship with memory—not another empty chat window.</strong>
            <span>
              Atomic Orange is the next AtomEons object: one place to direct the work,
              keep the history, choose the intelligence, and stay human at the controls.
              We will open it when the public build earns the claim.
            </span>
            <ul className={`${styles.cardFeatureList} ${styles.orangeFeatureList}`} aria-label="Atomic Orange goals">
              <li>Remembers the mission</li>
              <li>Routes the right work</li>
              <li>Shows the receipts</li>
              <li>Keeps you in control</li>
            </ul>
            <div className={styles.cardActions}>
              <Link href="/orange5">See the first signal <Arrow /></Link>
            </div>
          </div>
        </article>
      </section>

      <section className={styles.research} aria-labelledby="research-title">
        <header>
          <p>THE REST IS RESEARCH</p>
          <h2 id="research-title">Strange ideas.<br />Visible evidence.</h2>
          <span>
            Books, papers, discoveries, earlier products, and experiments remain public.
            They live in one quieter archive so the strongest work can breathe.
          </span>
          <Link href="/research">Enter experimental research <Arrow /></Link>
        </header>
        <div className={styles.researchStack}>
          <Link href="/research/discoveries/aeyes">
            <span>PHOTONIC VISION</span><strong>AEyes</strong><small>Can a different kind of eye change what a machine understands?</small>
          </Link>
          <Link href="/research/discoveries/aememory">
            <span>MEMORY</span><strong>AEMemory</strong><small>Continuity without drowning the intelligence in its own history.</small>
          </Link>
          <Link href="/research/discoveries/atomsmasher">
            <span>COMPRESSION</span><strong>AtomSmasher</strong><small>Keeping meaning while making the context radically smaller.</small>
          </Link>
          <Link href="/research">
            <span>THE FULL ARCHIVE</span><strong>And the fringe.</strong><small>Papers, cultural objects, failures, boundaries, and work still becoming.</small>
          </Link>
        </div>
      </section>

      <section className={styles.human} aria-labelledby="human-title">
        <div className={styles.humanSignal} aria-hidden="true"><span>AE</span></div>
        <div>
          <p>THE HUMAN / ATOM MCCREE</p>
          <h2 id="human-title">“I am an artist using AI to paint a new future.”</h2>
          <span>
            Hip-hop poet, artist, marketer, and independent inventor. Twenty-five years
            of creative practice turned toward making AI useful, cultural, strange, and human.
          </span>
          <div className={styles.humanLinks}>
            <Link href="/about">About AtomEons <Arrow /></Link>
            <Link href="/atom-alive">Watch Atom Alive <Arrow /></Link>
            <a href="https://github.com/Atom-Eons">Open GitHub <Arrow /></a>
          </div>
        </div>
      </section>

      <section className={styles.lastCall}>
        <p>THE FASTEST WAY TO UNDERSTAND US</p>
        <h2>Don&apos;t read another claim.<br />Turn on the television.</h2>
        <Link href="/cablebox/web">Try CableBox 2 <Arrow /></Link>
      </section>
    </main>
  );
}

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}
