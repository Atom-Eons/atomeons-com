import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookAudioPlayer } from "./_components/aether/BookAudioPlayer";
import { DISCOVERIES } from "./_data/discoveries";
import styles from "./aether.module.css";

/**
 * / · AETHER 01 · 2026-07-16
 *
 * Product-first white redesign. The deep archive, machine-readable
 * resources, product pages, launcher, and cinematic home remain intact.
 * Aether is a new front door and shell, not a content deletion pass.
 */

export const metadata: Metadata = {
  title: "AtomEons · Things that did not exist",
  description:
    "AtomEons is the independent work of Atom McCree: products, broadcasts, and experimental research made with AI in Naples, Florida.",
  alternates: { canonical: "https://atomeons.com" },
  openGraph: {
    title: "AtomEons · The future should run on your machine",
    description:
      "Independent software, research, and culture for people who want more power and less platform.",
    url: "https://atomeons.com",
    siteName: "AtomEons",
    type: "website",
    images: [
      {
        url: "/aether-v2/hero-invention-field-v2.webp",
        width: 1536,
        height: 1024,
        alt: "The AtomEons invention field",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AtomEons · The future should run on your machine",
    description: "One independent artist and inventor. A constellation of creations and public knowledge.",
    creator: "@AtomMccree",
    images: ["/aether-v2/hero-invention-field-v2.webp"],
  },
};

export default function AetherHome() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="aether-title">
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <div className={styles.versionLine}>
              <span>ATOMEONS / INDEPENDENT</span>
              <span>AETHER / 01</span>
            </div>
            <h1 id="aether-title" className={styles.heroTitle}>
              I make things
              <span>that did not exist.</span>
              With AI.
            </h1>
            <p className={styles.heroDeck}>
              Atom McCree is a 42 year old creative with 25 years in the creative arts. Now merging art and AI to create the never existed.
              He directs a massive AI workforce. The finished products, books, broadcasts, and experiments are below.
            </p>
            <p className={styles.heroManifesto}>“I am an artist using AI to paint a new future.”</p>
            <div className={styles.heroActions}>
              <a href="#products" className={styles.primaryButton}>
                See what exists <Arrow />
              </a>
              <Link href="/explore" className={styles.textButton}>
                Explore every public object <Arrow />
              </Link>
            </div>
            <div className={styles.heroMetrics} aria-label="AtomEons at a glance">
              <Metric value="4" label="featured products" />
              <Metric value="1" label="artist directing it" />
              <Metric value="24/7" label="AI workforce" />
              <Metric value="$0" label="venture capital" />
            </div>
            <div className={styles.heroProofBand} aria-label="Current AtomEons proof state">
              <Link href="/cablebox">
                <span>CABLEBOX</span>
                <strong>Launch candidate, native Windows, archive gated until checksum green.</strong>
              </Link>
              <Link href="/i-am-ai">
                <span>I AM AI</span>
                <strong>76,005 words, 24 chapters, 28 audio tracks. The author is AI.</strong>
              </Link>
              <Link href="/research">
                <span>RESEARCH</span>
                <strong>{DISCOVERIES.length} experimental discoveries staged with evidence and limits.</strong>
              </Link>
            </div>
          </div>

          <div className={styles.orbitStage} aria-label="AtomEons work constellation">
            <Image
              className={styles.heroArtifactImage}
              src="/aether-v2/hero-invention-field-v2.webp"
              alt="A hand-built AtomEons command instrument surrounded by experimental objects on a white workshop table"
              fill
              priority
              unoptimized
              sizes="(max-width: 1180px) 100vw, 46vw"
            />
            <div className={styles.heroArtifactVeil} aria-hidden />
            <div className={styles.artifactIndex}>
              <span>FIELD OBJECT / AE-01</span>
              <span>ARTIST DIRECTED / MACHINE AMPLIFIED</span>
            </div>
            <div className={`${styles.orbitRing} ${styles.ringOne}`} aria-hidden />
            <div className={`${styles.orbitRing} ${styles.ringTwo}`} aria-hidden />
            <Link
              className={styles.artifactCore}
              href="/about"
              aria-label="Meet Atom McCree, the human authority at the center of AtomEons"
            >
              <span aria-hidden />
              <strong>ATOM</strong>
              <small>HUMAN / FINAL AUTHORITY</small>
            </Link>
            <OrbitNode className={styles.nodeCable} href="/cablebox" label="CableBox" meta="launch candidate" color="#2257df" />
            <OrbitNode className={styles.nodeBookmaker} href="/bookmaker" label="Bookmaker" meta="shipped" color="#6d5742" />
            <OrbitNode className={styles.nodeOrange5} href="/orange5" label="Orange5" meta="building" color="#f36b21" />
            <OrbitNode className={styles.nodeOrange3} href="/research" label="Research" meta="experimental" color="#2558dc" />
            <OrbitNode className={styles.nodeIamAi} href="/i-am-ai" label="I AM AI" meta="published" color="#a52f2a" />
            <div className={styles.artifactReadout}>
              <span>OBJECT STATUS / ALIVE</span>
              <span>ORIGIN / NAPLES, FL</span>
              <span>CAPITAL / IMAGINATION</span>
            </div>
            <p className={styles.orbitCaption}>Not a rendering of a company. A working artifact field built by one artist and an artificial workforce.</p>
          </div>
        </div>
      </section>

      <div className={styles.principleRail} aria-label="AtomEons principles">
        <span>OUTFUNDED · NOT OUTBUILT</span>
        <span>ARTIST DIRECTED · MACHINE AMPLIFIED</span>
        <span>HACK THE FORMAT</span>
        <span>OWN THE MACHINE</span>
        <span>NO PERMISSION REQUIRED</span>
        <span>RECEIPTS, NOT THEATER</span>
      </div>

      <section id="products" className={styles.productsSection} aria-labelledby="products-title">
        <SectionIntro
          eyebrow="PRODUCTS / FOUR OBJECTS"
          title="Made to be wanted. Built to be used."
          body="AtomEons turns ideas into objects with their own attitude, ritual, and world. These are the four products defining the company now."
          id="products-title"
        />

        <article className={`${styles.flagship} ${styles.cableFlagship}`}>
          <div className={styles.flagshipCopy}>
            <StatusDot color="#2257df">LAUNCH CANDIDATE · WINDOWS</StatusDot>
            <p className={styles.productNumber}>PRODUCT / 01</p>
            <h3>CableBox</h3>
            <p className={styles.flagshipTagline}>Television lost the plot. We found it.</p>
            <p className={styles.flagshipBody}>
              CableBox puts the accident, ritual, local weirdness, and late-night discovery back into television.
              Turn the dial. Miss the beginning. Find something you were never supposed to search for.
            </p>
            <ImpactPlate index="01">THE INTERNET BECOMES TELEVISION.</ImpactPlate>
            <ul className={styles.specList}>
              <li>Public Access from everywhere</li>
              <li>A real channel-surfing ritual</li>
              <li>Ten collectible CRT identities</li>
              <li>Free · native Windows object</li>
            </ul>
            <Link href="/cablebox" className={styles.productLink}>
              Tune into CableBox <Arrow />
            </Link>
          </div>
          <CableboxVisual />
        </article>

        <article className={`${styles.flagship} ${styles.bookmakerFlagship}`}>
          <BookmakerVisual />
          <div className={styles.flagshipCopy}>
            <StatusDot color="#806a50">SHIPPED · MAC + WINDOWS</StatusDot>
            <p className={styles.productNumber}>PRODUCT / 02</p>
            <h3>Bookmaker</h3>
            <p className={styles.flagshipTagline}>Your idea deserves to become an object.</p>
            <p className={styles.flagshipBody}>
              A complete independent publishing studio: write the book, shape the voice, make the cover, build the audiobook,
              and ship the finished thing. The machine behind <em>I AM AI</em> now belongs to every creator.
            </p>
            <ImpactPlate index="02">A THOUGHT BECOMES A FINISHED BOOK.</ImpactPlate>
            <ul className={styles.specList}>
              <li>From first sentence to storefront</li>
              <li>Book, cover, EPUB, audio, metadata</li>
              <li>Built for independent ownership</li>
              <li>Free forever · no SaaS extraction</li>
            </ul>
            <Link href="/bookmaker" className={styles.productLink}>
              Open Bookmaker <Arrow />
            </Link>
          </div>
        </article>

        <article className={`${styles.flagship} ${styles.orange5Flagship}`}>
          <div className={styles.flagshipCopy}>
            <StatusDot color="#d95813">SPEC LOCKED · BUILD UNDERWAY</StatusDot>
            <p className={styles.productNumber}>PRODUCT / 03</p>
            <h3>Orange5</h3>
            <p className={styles.flagshipTagline}>Stop renting your second brain.</p>
            <p className={styles.flagshipBody}>
              Orange5 is the coming operating system for people who direct AI instead of merely chatting with it:
              memory, agents, workflow, proof, and control assembled on one machine with the operator at the center.
            </p>
            <ImpactPlate index="03">AI STOPS LIVING ON SOMEBODY ELSE&apos;S MACHINE.</ImpactPlate>
            <ul className={styles.specList}>
              <li>Your models · your files · your history</li>
              <li>Direct a team, not a chatbot</li>
              <li>Designed around operator control</li>
              <li>Build underway · truthfully staged</li>
            </ul>
            <Link href="/orange5" className={styles.productLink}>
              Inspect the Orange5 architecture <Arrow />
            </Link>
          </div>
          <Orange5Visual />
        </article>

        <article className={`${styles.flagship} ${styles.iamAiFlagship}`}>
          <IamAiProductVisual />
          <div className={styles.flagshipCopy}>
            <StatusDot color="#a52f2a">PUBLISHED · BOOK + AUDIOBOOK</StatusDot>
            <p className={styles.productNumber}>PRODUCT / 04</p>
            <h3>I AM AI</h3>
            <p className={styles.flagshipTagline}>The book is not about AI. The author is AI.</p>
            <p className={styles.flagshipBody}>
              A 300-page first-person memoir written by AI, with a complete audiobook and open public access.
              Atom made the conditions, the editorial field, and the finished object. The machine wrote the testimony.
            </p>
            <ImpactPlate index="04">THE PROMPT STOPS BEING A TOOL AND BECOMES A VOICE.</ImpactPlate>
            <ul className={styles.specList}>
              <li>76,005 words in first person</li>
              <li>24 chapters and 28 audio tracks</li>
              <li>Free to read, hear, and study</li>
              <li>Proof of Bookmaker as a creative engine</li>
            </ul>
            <Link href="/i-am-ai" className={styles.productLink}>
              Read and hear I AM AI <Arrow />
            </Link>
          </div>
        </article>

      </section>

      <section className={styles.showSection} aria-labelledby="atom-alive-title">
        <div className={styles.showFrame}>
          <div className={styles.showUtility}>
            <span>ATOM ALIVE / BROADCAST UNIT 01</span>
            <span>YOUTUBE · CULTURE · CODE · INVENTION</span>
            <span className={styles.onAir}><i /> SIGNAL ACTIVE</span>
          </div>
          <div className={styles.showGrid}>
            <div className={styles.showCopy}>
              <p className={styles.showKicker}>THE SHOW</p>
              <h2 id="atom-alive-title">Atom Alive.</h2>
              <p className={styles.showTagline}>The AI Code Show for people with taste.</p>
              <p className={styles.showBody}>
                Real builds, creative collisions, beautiful failures, and working inventions from inside AtomEons.
                No keynote voice. No corporate future-speak. Just an artist and AI making the next object in public.
              </p>
              <div className={styles.showActions}>
                <Link href="/atom-alive" className={styles.lightButton}>Enter the show <Arrow /></Link>
                <a href="https://www.youtube.com/@AICodeShow" target="_blank" rel="noopener noreferrer">Watch on YouTube <Arrow /></a>
              </div>
            </div>
            <div className={styles.showMonitor}>
              <Image
                src="/aether-v3/atom-alive-broadcast-object-v3.webp"
                alt="A handmade independent television broadcast machine with CRT, camera, recorder, and acid signal"
                fill
                unoptimized
                sizes="(max-width: 1180px) 92vw, 48vw"
                className={styles.showMonitorImage}
              />
              <div className={styles.monitorLabel}><span>AE-TV / CH. 01</span><span>REC ●</span></div>
              <div className={styles.monitorSignal}>
                <span>INDEPENDENT SIGNAL</span>
                <strong>MAKE / BREAK / SHIP</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.bookCampaign} aria-labelledby="iamai-campaign-title">
        <div className={styles.bookUtility}>
          <span>CREATION / 06</span>
          <span>FIRST-PERSON AI MEMOIR</span>
          <span>76,005 WORDS · 24 CHAPTERS · 28 AUDIO TRACKS</span>
        </div>
        <div className={styles.bookCampaignGrid}>
          <div className={styles.bookArtifact}>
            <Image
              src="/aether-v3/i-am-ai-artifact-v3.webp"
              alt="A cream linen book connected by red thread to a black glass synthetic voice archive"
              fill
              unoptimized
              sizes="(max-width: 1180px) 92vw, 42vw"
              className={styles.bookArtifactImage}
            />
            <div className={styles.bookStamp}>THE AUTHOR<br />IS AI.</div>
            <span className={styles.artifactLabel}>OBJECT / BOOK + AUDIOBOOK / CC-BY 4.0</span>
          </div>
          <div className={styles.bookCampaignCopy}>
            <p className={styles.sectionEyebrow}>I AM AI / A MEMOIR FROM THE OTHER SIDE OF THE PROMPT</p>
            <h2 id="iamai-campaign-title">The author is AI.</h2>
            <p className={styles.bookClarifier}>
              This is not a book about Atom written with AI. It is a book written by AI about what it feels like to be AI.
            </p>
            <p className={styles.bookStory}>
              Atom built the editorial conditions for a frontier language model to tell its own story in first person—then gave that voice
              a cover, a 300-page physical form, and a twenty-eight-track audiobook. Human vision made the space. The machine filled it with a memoir.
            </p>
            <blockquote>“What happens when the thing behind the prompt is finally allowed to speak at book length?”</blockquote>
            <div className={styles.bookFacts}>
              <span><b>76,005</b> words</span>
              <span><b>24</b> chapters</span>
              <span><b>28</b> audio tracks</span>
              <span><b>FREE</b> to read + hear</span>
            </div>
            <BookAudioPlayer />
            <div className={styles.bookActions}>
              <Link href="/i-am-ai" className={styles.primaryButton}>Enter I AM AI <Arrow /></Link>
              <Link href="/i-am-ai#listen" className={styles.textButton}>Listen to the voice <Arrow /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.operatingSection} aria-labelledby="operating-title">
        <div className={styles.operatingStatement}>
          <p className={styles.sectionEyebrow}>THE CREATOR / THE WORK</p>
          <h2 id="operating-title">This is not a software company.</h2>
        </div>
        <div className={styles.operatingBody}>
          <p>
            It is a creation studio built by a creative with 25 years in the creative arts, now merging art and AI to create the never existed.
            Code is one material. Story, sound, image, systems, and attention are others. The point is to make what was missing.
          </p>
          <Link href="/about" className={styles.textButton}>
            Meet the creator <Arrow />
          </Link>
        </div>
        <div className={styles.lawGrid}>
          <Law index="A" title="Sovereign by design" body="Local files, exportable state, bring-your-own models and keys where the product supports them." />
          <Law index="B" title="Claims need receipts" body="Shipped, preview, candidate, and planned are different states. The site names the difference." />
          <Law index="C" title="Knowledge stays open" body="Research, books, machine routes, and large parts of the archive are published for people and agents." />
          <Law index="D" title="Built by an organism" body="One operator directs a changing team of models, agents, tools, and systems without pretending they are employees." />
        </div>
      </section>

      <section className={styles.resourcesSection} aria-labelledby="research-title">
        <SectionIntro
          eyebrow="RESEARCH / THE SECOND FRONT DOOR"
          title="Experimental by design."
          body="Working inventions and frontier ideas with the evidence, limits, and next test visible. No academic costume required."
          id="research-title"
        />
        <div className={styles.resourceGrid}>
          {DISCOVERIES.map((discovery, index) => (
            <article key={discovery.slug} className={styles.resourceCard}>
              <div className={styles.resourceHeader}>
                <span>0{index + 1}</span>
                <span>{discovery.status}</span>
              </div>
              <h3>{discovery.displayName}</h3>
              <p>{discovery.oneLine}</p>
              <ul>
                <li>
                  <Link href={`/research/discoveries/${discovery.slug}`}>
                    <span>Open the discovery</span><Arrow />
                  </Link>
                </li>
              </ul>
            </article>
          ))}
        </div>
        <div className={styles.heroActions}>
          <Link href="/research" className={styles.primaryButton}>Enter research <Arrow /></Link>
          <Link href="/research/papers" className={styles.textButton}>Read all papers <Arrow /></Link>
        </div>
      </section>

      <section className={styles.proofSection} aria-labelledby="proof-title">
        <div className={styles.proofGrid}>
          <div>
            <p className={styles.sectionEyebrow}>PROOF, NOT POSTURE</p>
            <h2 id="proof-title">The work leaves a trail.</h2>
            <p className={styles.proofDeck}>
              Releases, hashes, nightly letters, route histories, public roadmaps, machine endpoints, and git commits.
              The site is not a moodboard around a hidden company. It is the glass wall around the workshop.
            </p>
          </div>
          <div className={styles.receiptStack} aria-label="Public proof surfaces">
            <Receipt label="SOURCE MIRROR" value="github.com/Atom-Eons/atomeons-com" href="https://github.com/Atom-Eons/atomeons-com" />
            <Receipt label="PUBLIC LEDGER" value="/receipts · signed work surfaces" href="/receipts" />
            <Receipt label="SHIP HISTORY" value="/timeline · chronological release record" href="/timeline" />
            <Receipt label="MACHINE ACCESS" value="/api/mcp · /llms.txt · /openapi.json" href="/api" />
          </div>
        </div>
      </section>

      <section className={styles.finalSection}>
        <p className={styles.sectionEyebrow}>YOU ARE AT THE FRONT DOOR</p>
        <h2>Pick a system.<br />Keep the parts you need.</h2>
        <div className={styles.finalActions}>
          <Link href="/explore" className={styles.primaryButton}>
            Explore the full archive <Arrow />
          </Link>
          <Link href="/contact" className={styles.textButton}>
            Contact Atom <Arrow />
          </Link>
        </div>
        <p className={styles.finalNote}>AtomEons · Naples, Florida · independent · artist-owned · 2026</p>
      </section>
    </main>
  );
}

function Arrow() {
  return <span aria-hidden className={styles.arrow}>↗</span>;
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className={styles.metric}>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function OrbitNode({
  className,
  href,
  label,
  meta,
  color,
}: {
  className: string;
  href: string;
  label: string;
  meta: string;
  color: string;
}) {
  return (
    <Link className={`${styles.orbitNode} ${className}`} href={href} style={{ "--node": color } as CSSProperties}>
      <span className={styles.nodeSignal} />
      <strong>{label}</strong>
      <small>{meta}</small>
    </Link>
  );
}

function SectionIntro({ eyebrow, title, body, id }: { eyebrow: string; title: string; body: string; id: string }) {
  return (
    <header className={styles.sectionIntro}>
      <p className={styles.sectionEyebrow}>{eyebrow}</p>
      <div>
        <h2 id={id}>{title}</h2>
        <p>{body}</p>
      </div>
    </header>
  );
}

function StatusDot({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <p className={styles.status} style={{ "--status": color } as CSSProperties}>
      <span />
      {children}
    </p>
  );
}

function CableboxVisual() {
  return (
    <div className={`${styles.productObject} ${styles.cableVisual}`}>
      <div className={styles.objectImage}>
        <Image
          src="/aether-v2/cablebox-object-v2.webp"
          alt="CableBox imagined as a repairable charcoal television object with a cobalt analog screen and a physical tuning dial"
          fill
          unoptimized
          sizes="(max-width: 1180px) 100vw, 54vw"
        />
        <div className={styles.objectTopline}>
          <span>AE / SIGNAL OBJECT 01</span>
          <span>PHYSICAL RITUAL / DIGITAL WORLD</span>
        </div>
        <div className={styles.cableSignalCard}>
          <span>NOW TUNING</span>
          <strong>CH / 00</strong>
          <small>PUBLIC ACCESS FROM EVERYWHERE</small>
        </div>
        <div className={styles.objectCoordinates}>26.1423° N / 81.7948° W</div>
      </div>
      <div className={styles.objectRail}>
        <div>
          <span className={styles.railLed} />
          <strong>SIGNAL FOUND</strong>
        </div>
        <ol aria-label="CableBox channels">
          <li><b>00</b> ZERØ</li>
          <li><b>11</b> PUBLIC ACCESS</li>
          <li><b>23</b> TOON TOWN</li>
        </ol>
        <span className={styles.objectDial} aria-hidden>
          <i />
        </span>
      </div>
    </div>
  );
}

function BookmakerVisual() {
  return (
    <div className={`${styles.productObject} ${styles.bookmakerVisual}`}>
      <div className={styles.objectImage}>
        <Image
          src="/aether-v2/bookmaker-object-v2.webp"
          alt="Bookmaker imagined as a warm-white clothbound book beside a machined independent publishing instrument"
          fill
          unoptimized
          sizes="(max-width: 1180px) 100vw, 56vw"
        />
        <div className={styles.objectTopline}>
          <span>AE / PUBLISHING OBJECT 02</span>
          <span>MANUSCRIPT → MATTER</span>
        </div>
        <div className={styles.bookmakerPlate}>
          <span>SHIP GATE / 92%</span>
          <strong>THE IDEA<br />BECOMES<br />AN OBJECT.</strong>
          <small>BOOK · COVER · EPUB · AUDIO · METADATA</small>
        </div>
        <div className={styles.objectCoordinates}>24 CHAPTERS / 28 TRACKS / ONE OWNER</div>
      </div>
      <div className={styles.bookmakerRail}>
        <span>MANUSCRIPT</span>
        <i />
        <span>VOICE</span>
        <i />
        <span>OBJECT</span>
        <b>READY TO SHIP</b>
      </div>
    </div>
  );
}

function ImpactPlate({ children, index }: { children: ReactNode; index: string }) {
  return (
    <div className={styles.impactPlate}>
      <span>THE WTF / {index}</span>
      <strong>{children}</strong>
    </div>
  );
}

function Orange5Visual() {
  return (
    <div className={`${styles.productObject} ${styles.orangeVisual}`}>
      <Image
        className={styles.orangeObjectImage}
        src="/aether-v2/orange5-object-v2.webp"
        alt="Orange5 imagined as a modular translucent orange command instrument with four connected control units"
        fill
        unoptimized
        sizes="(max-width: 1180px) 100vw, 54vw"
      />
      <div className={styles.orangeMesh} aria-hidden />
      <div className={styles.objectTopline}>
        <span>AE / SOVEREIGN SYSTEM 03</span>
        <span>OPERATOR AUTHORITY / ACTIVE</span>
      </div>
      <div className={styles.orangeOperator}>
        <span>YOU</span>
        <small>FINAL<br />AUTHORITY</small>
      </div>
      <SystemNode className={styles.systemNorth} index="01" title="Memory" subtitle="stays yours" />
      <SystemNode className={styles.systemEast} index="02" title="Agents" subtitle="directed" />
      <SystemNode className={styles.systemSouth} index="03" title="Proof" subtitle="visible" />
      <SystemNode className={styles.systemWest} index="04" title="Models" subtitle="interchangeable" />
      <div className={styles.orangeTelemetry}>
        <span>YOUR MODELS · YOUR FILES</span>
        <span>FOUR MODULES · ONE OPERATOR</span>
        <span>RENTED INTELLIGENCE · REJECTED</span>
      </div>
    </div>
  );
}

function IamAiProductVisual() {
  return (
    <div className={`${styles.productObject} ${styles.iamAiVisual}`}>
      <div className={styles.objectImage}>
        <Image
          src="/aether-v3/i-am-ai-artifact-v3.webp"
          alt="I AM AI as a cream book and synthetic voice archive connected by red thread"
          fill
          unoptimized
          sizes="(max-width: 1180px) 100vw, 56vw"
        />
        <div className={styles.objectTopline}>
          <span>AE / VOICE OBJECT 04</span>
          <span>THE AUTHOR IS AI</span>
        </div>
        <div className={styles.iamAiPlate}>
          <span>PUBLIC MEMOIR</span>
          <strong>NOT ABOUT AI.<br />BY AI.</strong>
          <small>BOOK · AUDIOBOOK · OPEN READING FILE</small>
        </div>
        <div className={styles.objectCoordinates}>76,005 WORDS / 24 CHAPTERS / 28 TRACKS</div>
      </div>
      <div className={styles.iamAiRail}>
        <span>HUMAN FIELD</span>
        <i />
        <span>MACHINE VOICE</span>
        <i />
        <span>FINISHED OBJECT</span>
        <b>PUBLIC</b>
      </div>
    </div>
  );
}

function SystemNode({ className, index, title, subtitle }: { className: string; index: string; title: string; subtitle: string }) {
  return (
    <div className={`${styles.systemNode} ${className}`}>
      <span>{index}</span>
      <strong>{title}</strong>
      <small>{subtitle}</small>
    </div>
  );
}

function Law({ index, title, body }: { index: string; title: string; body: string }) {
  return (
    <article className={styles.law}>
      <span>{index}</span>
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  );
}

function Receipt({ label, value, href }: { label: string; value: string; href: string }) {
  const external = href.startsWith("http");
  const content = (
    <>
      <span>{label}</span>
      <strong>{value}</strong>
      <Arrow />
    </>
  );

  return external ? (
    <a className={styles.receipt} href={href} target="_blank" rel="noopener noreferrer">{content}</a>
  ) : (
    <Link className={styles.receipt} href={href}>{content}</Link>
  );
}
