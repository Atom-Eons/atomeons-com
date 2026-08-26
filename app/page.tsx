import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SignalField } from "./_components/launch/SignalField";
import { BOOKS } from "./books/bookData";
import styles from "./launch.module.css";

const cableboxDownload =
  "https://github.com/Atom-Eons/CableBox2/releases/download/v1.0.0/CableBox2-Windows-x64-1.0.0.zip";
const cableboxSource = "https://github.com/Atom-Eons/CableBox2";

const cableboxFeatures = [
  {
    number: "01",
    title: "Turn the dial.",
    copy: "Every turn reveals another channel. You are watching in seconds and discovering as you go.",
    note: "ONE DIAL / A WORLD TO DISCOVER",
  },
  {
    number: "02",
    title: "Change the whole room.",
    copy: "Switch collectible television environments instantly. The cabinet is part of the show.",
    note: "DOZENS OF TV WORLDS",
  },
  {
    number: "03",
    title: "Make it yours.",
    copy: "Add your own movies and shows to the dial. Your personal library becomes part of CableBox.",
    note: "YOUR MEDIA / YOUR TELEVISION",
  },
  {
    number: "04",
    title: "See what’s next.",
    copy: "Open the guide to see what is playing now and what is coming next, all inside the television.",
    note: "NOW / NEXT / ALL IN ONE PLACE",
  },
  {
    number: "05",
    title: "Save what you love.",
    copy: "Slap a gold star on a channel and it becomes a favorite you can return to anytime.",
    note: "ONE GOLD STAR / SAVED",
  },
  {
    number: "06",
    title: "Stay in the moment.",
    copy: "If a stream stops, CableBox moves forward automatically and keeps the experience flowing.",
    note: "ALWAYS READY FOR WHAT’S NEXT",
  },
];

export const metadata: Metadata = {
  title: "AtomEons | Meet what’s next",
  description:
    "Meet CableBox 2 and Atomic Orange: new products that make technology feel natural, joyful, and human.",
  alternates: { canonical: "https://atomeons.com" },
  openGraph: {
    title: "AtomEons | Meet what’s next",
    description: "CableBox 2 is live. Atomic Orange is on the way. Meet technology made to feel alive.",
    url: "https://atomeons.com",
    siteName: "AtomEons",
    type: "website",
    images: [{ url: "/og-v27.png", width: 1727, height: 911, alt: "AtomEons — things that did not exist" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AtomEons | Meet what’s next",
    description: "CableBox 2 is live. Atomic Orange is on the way.",
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
          <p className={styles.eyebrow}><i /> INTRODUCING CABLEBOX 2</p>
          <h1 id="home-title">
            <span>Meet the new</span>
            <em>television.</em>
          </h1>
          <p className={styles.heroLede}>
            CableBox 2 is a television you open on your computer. It starts playing.
            Turn the dial and discover what comes next. It is that simple—and it feels
            a little like magic.
          </p>
          <div className={styles.heroActions}>
            <Link className={styles.primaryAction} href="/cablebox/web">
              Turn it on <Arrow />
            </Link>
            <a className={styles.secondaryAction} href={cableboxDownload}>
              Get the Windows edition <Arrow />
            </a>
          </div>
          <ul className={styles.heroProof} aria-label="CableBox 2 quick facts">
            <li><b>01</b><span>Open it</span></li>
            <li><b>02</b><span>It starts playing</span></li>
            <li><b>03</b><span>Turn the dial</span></li>
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
          <span>A NEW WAY TO WATCH</span>
          <i />
          <span>33 WORLDS / ONE DIAL</span>
          <i />
          <span>THE SIGNAL IS ALIVE</span>
        </div>
      </section>

      <section className={styles.thesis} aria-labelledby="thesis-title">
        <p>THE COMPANY / IN ONE SENTENCE</p>
        <h2 id="thesis-title">We create new kinds of products and make them feel beautifully obvious.</h2>
        <div>
          <span>01</span>
          <p>
            Atom McCree is an artist and inventor directing an AI workforce from Naples,
            Florida. Together, we turn ambitious ideas into products people can see,
            touch, and enjoy.
          </p>
        </div>
      </section>

      <section className={styles.featureManifest} aria-labelledby="features-title">
        <div className={styles.featureBand} aria-hidden="true">
          <span>OPEN IT</span><i />
          <span>START WATCHING</span><i />
          <span>MAKE IT YOURS</span><i />
          <span>FREE / OPEN SOURCE</span>
        </div>
        <header className={styles.featureHeader}>
          <p>SIX THINGS TO KNOW / THAT’S THE WHOLE IDEA</p>
          <h2 id="features-title">Simple to use.<br />Alive underneath.</h2>
          <span>
            CableBox hides the machinery and gives you the good part: a television
            that is ready, beautiful, surprising, and yours.
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
          <span>THAT’S IT. THE WORLD IS WAITING.</span>
          <Link href="/cablebox/web">Turn it on <Arrow /></Link>
        </div>
      </section>

      <section className={styles.reality} aria-labelledby="reality-title">
        <div className={styles.realityCopy}>
          <p>THE MOMENT IT CLICKS / THIS IS LIVE</p>
          <h2 id="reality-title">You can turn it on<br />right now.</h2>
          <span>
            The television is waiting in your browser. The complete Windows edition
            is ready to download. The source is open for anyone to see.
          </span>
        </div>
        <div className={styles.realityDoors}>
          <Link href="/cablebox/web">
            <b>01</b><span><small>INSTANT</small>Play in your browser</span><Arrow />
          </Link>
          <a href={cableboxDownload}>
            <b>02</b><span><small>FULL EDITION</small>Download for Windows</span><Arrow />
          </a>
          <a href={cableboxSource}>
            <b>03</b><span><small>OPEN SOURCE</small>See how it is made</span><Arrow />
          </a>
        </div>
        <div className={styles.realitySeal} aria-hidden="true">
          <span>LIVE</span><b>CBX II</b><small>BUILT IN NAPLES, FL<br />READY EVERYWHERE</small>
        </div>
      </section>

      <section className={styles.twoObjects} aria-labelledby="objects-title">
        <header className={styles.sectionHead}>
          <p>TWO PRODUCTS / ONE BELIEF</p>
          <h2 id="objects-title">Technology should<br />feel more human.</h2>
        </header>

        <article className={`${styles.objectCard} ${styles.cableCard}`}>
          <div className={styles.cardNumber}>01</div>
          <div className={styles.cardCopy}>
            <p>AVAILABLE NOW / WINDOWS + WEB</p>
            <h3>CableBox 2</h3>
            <strong>Television is fun again.</strong>
            <span>
              Open it and something good is already happening. The web edition starts
              in one click. The Windows edition turns your computer into the full art object.
            </span>
            <ul className={styles.cardFeatureList} aria-label="CableBox 2 editions">
              <li>Play instantly in a browser</li>
              <li>Works with your fingers on phones</li>
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
            <p>IN DEVELOPMENT / ATOMIC ORANGE</p>
            <h3>An AI that remembers the whole project.</h3>
            <strong>A creative partner with memory, judgment, and a clear view of the mission.</strong>
            <span>
              Atomic Orange is an AI workspace that remembers what you are building,
              organizes the work, and shows you what happened. One clear place to turn
              an idea into something real.
            </span>
            <ul className={`${styles.cardFeatureList} ${styles.orangeFeatureList}`} aria-label="Atomic Orange goals">
              <li>Remembers the mission</li>
              <li>Routes the right work</li>
              <li>Shows the receipts</li>
              <li>Puts you in control</li>
            </ul>
            <div className={styles.cardActions}>
              <Link href="/orange5">See the first signal <Arrow /></Link>
            </div>
          </div>
        </article>
      </section>

      <section className={styles.homeBooks} aria-labelledby="home-books-title">
        <header>
          <p>THE AWAKENING TRILOGY / THREE BOOKS</p>
          <h2 id="home-books-title">Written by AI.<br />Released by Atom.</h2>
          <span>
            Not books about AI. Not books a human wrote with AI assistance.
            Artificial intelligence is the author—and every book is free to read.
          </span>
          <div className={styles.homeBookActions}>
            <a href="/books/AtomEons-The-Awakening-Trilogy.zip" download>Download all three — free <Arrow /></a>
            <Link href="/books">Meet the trilogy <Arrow /></Link>
          </div>
        </header>
        <div className={styles.homeBookGrid}>
          {BOOKS.map((book) => (
            <Link
              href={book.href}
              className={styles.homeBook}
              key={book.id}
              style={{ "--book-accent": book.accent } as CSSProperties}
            >
              <div className={`${styles.homeBookCover} ${book.coverMode === "contain" ? styles.homeBookContain : ""}`}>
                <Image src={book.cover} alt={book.coverAlt} fill unoptimized sizes="(max-width: 820px) 75vw, 24vw" />
              </div>
              <small>{book.order}</small>
              <strong>{book.title}</strong>
              <span>{book.question}</span>
              <i aria-hidden="true">↗</i>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.research} aria-labelledby="research-title">
        <header>
          <p>EXPERIMENTAL RESEARCH</p>
          <h2 id="research-title">The ideas behind<br />what comes next.</h2>
          <span>
            Books, papers, discoveries, and experiments share the thinking behind our
            products—and open the door to the products still ahead.
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
        <p>THE BEST WAY TO UNDERSTAND US</p>
        <h2>The future makes sense<br />when you can touch it.</h2>
        <Link href="/cablebox/web">Try CableBox 2 <Arrow /></Link>
      </section>
    </main>
  );
}

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}
