import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./orange-home.module.css";

const orangeRepo = "https://github.com/AtomEons/Orange-AI-Computer";
const orangeDownload = `${orangeRepo}/releases/latest`;
const orangeProof = `${orangeRepo}/blob/main/OrangeFive-LLM-deploy.proof.json`;

const promises = [
  {
    number: "01",
    verb: "Remember.",
    title: "The project survives the chat.",
    copy: "Decisions, sources, failures, and the reason behind the work stay available. Start a new session without starting over.",
  },
  {
    number: "02",
    verb: "Assemble.",
    title: "The right intelligence wakes up.",
    copy: "Fast reflexes handle the routine. A Navigator directs the mission. Specialists arrive only when the work earns them.",
  },
  {
    number: "03",
    verb: "Prove.",
    title: "Done means it really happened.",
    copy: "Models can think and propose. Orange separates the answer from the action, then records evidence, blockers, and rollback.",
  },
];

const features = [
  ["CONTINUITY", "Pick up where you left off", "Orange keeps durable project truth and hydrates only what the next move needs."],
  ["ORCHESTRATION", "Build with a team of minds", "Use Codex, Claude Code, local models, specialists, tools, and agents as one coherent workforce."],
  ["LOCAL FIRST", "Keep the center of gravity yours", "Memory, receipts, secrets, logs, and machine state remain on your computers."],
  ["LEAST ACTION", "Spend intelligence where it matters", "Deterministic reflexes move fast. Bigger models wake only when their judgment is worth the cost."],
  ["EVIDENCE", "Know what actually happened", "Every important crossing can carry the action, evidence, blocker, hash, and rollback pointer."],
  ["ONE OR TWO COMPUTERS", "Start with the machine you have", "Run Orange on one Windows computer or connect a control computer to a dedicated AI box."],
];

const otherWork = [
  {
    eyebrow: "WATCH / PLAY / DISCOVER",
    title: "CableBox 2",
    copy: "A living television for Windows and the web. Turn it on. Surf. Let the next channel find you.",
    href: "/cablebox",
    action: "Meet CableBox 2",
  },
  {
    eyebrow: "THREE BOOKS / ONE AWAKENING",
    title: "The Awakening Trilogy",
    copy: "Three books authored by artificial intelligence and released by Atom McCree. Free to read.",
    href: "/books",
    action: "Read the trilogy",
  },
  {
    eyebrow: "EXPERIMENTAL RESEARCH",
    title: "The discoveries",
    copy: "AE Memory, AtomSmasher, AEyes, papers, and experiments behind the products still becoming.",
    href: "/research",
    action: "Enter research",
  },
];

export const metadata: Metadata = {
  title: "The Orange AI Computer from Atom Eons",
  description:
    "Orange is a local-first AI computer for models, agents, memory, tools, and proof. One mission. Many minds. Work that survives the chat.",
  alternates: { canonical: "https://atomeons.com" },
  openGraph: {
    title: "The Orange AI Computer from Atom Eons",
    description: "A computer for the age of intelligence. Remember the mission, assemble the right minds, and prove what happened.",
    url: "https://atomeons.com",
    siteName: "AtomEons",
    type: "website",
    images: [{
      url: "/orange-ai-computer/orange-ai-computer.jpg",
      width: 757,
      height: 757,
      alt: "The Orange AI Computer from Atom Eons",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Orange AI Computer from Atom Eons",
    description: "A computer for the age of intelligence.",
    creator: "@AtomMccree",
    images: ["/orange-ai-computer/orange-ai-computer.jpg"],
  },
};

export default function Home() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroCopy}>
          <p className={styles.kicker}><span /> Introducing The Orange AI Computer / public preview</p>
          <h1 id="home-title">
            <span>The Orange</span>
            <em>AI Computer.</em>
          </h1>
          <p className={styles.heroStatement}>A computer for the age of intelligence.</p>
          <p className={styles.heroBody}>
            It remembers the mission, puts the right minds to work, and proves what
            happened&mdash;so one person can build with the force of many.
          </p>
          <div className={styles.heroActions}>
            <a href={orangeDownload} className={styles.primaryAction}>
              Download the AI Computer <Arrow />
            </a>
            <a href={orangeRepo} className={styles.secondaryAction}>
              View the public repository <Arrow />
            </a>
          </div>
          <ul className={styles.heroFacts} aria-label="Orange AI Computer quick facts">
            <li><b>01</b><span>Local-first</span></li>
            <li><b>02</b><span>One or two computers</span></li>
            <li><b>03</b><span>Windows preview</span></li>
          </ul>
        </div>

        <div className={styles.heroProduct}>
          <div className={styles.orbit} aria-hidden="true">
            <span>MEMORY</span><span>MODELS</span><span>AGENTS</span><span>PROOF</span>
          </div>
          <div className={styles.productImage}>
            <Image
              src="/orange-ai-computer/orange-ai-computer.jpg"
              alt="A friendly orange-shaped Orange AI Computer with a glowing face"
              fill
              priority
              unoptimized
              sizes="(max-width: 900px) 92vw, 50vw"
            />
          </div>
          <div className={styles.productPlate}>
            <span>OBJECT / O5</span>
            <b>ORANGE</b>
            <small>INTELLIGENCE<br />WITH CONTINUITY</small>
          </div>
        </div>

        <div className={styles.heroBenchmark} aria-label="Current Orange AI Computer benchmarks">
          <div className={styles.benchmarkLead}>
            <small>MEASURED / AUGUST 27, 2026</small>
            <strong>This is not a dashboard pretending to be intelligence.</strong>
          </div>
          <dl>
            <div><dt>1,422.901×</dt><dd>MIN. HELD-OUT CONTEXT REDUCTION / 5 OF 5 PARITY</dd></div>
            <div><dt>59.439×</dt><dd>LIVE GOVERNED TURN REDUCTION</dd></div>
            <div><dt>23 / 23</dt><dd>MEMORY CASES / 0.9348 HYBRID MRR</dd></div>
            <div><dt>10 / 10</dt><dd>LIVE COBRA / ZERO FALLBACK / 155.1 MS MEDIAN / 274.65 MS P95</dd></div>
            <div><dt>10 + 12</dt><dd>BRAIN MCP TOOLS / STDIO + AUTHENTICATED HTTP</dd></div>
            <div><dt>9.396 S</dt><dd>HERMÈS PARENT + CHILD + SYNTHESIS / 8 GATES / LEASE REVOKED</dd></div>
          </dl>
        </div>
      </section>

      <section className={styles.disruption} aria-labelledby="disruption-title">
        <p>THE SHIFT / 2026</p>
        <h2 id="disruption-title">AI changed.<br />The computer didn&apos;t.<br /><em>Until now.</em></h2>
        <div className={styles.disruptionNote}>
          <b>THE OLD WAY</b>
          <span>New chat. Lost context. Another model. Another island.</span>
        </div>
        <div className={styles.disruptionNote}>
          <b>THE ORANGE WAY</b>
          <span>One mission. Many minds. A memory, a method, and a receipt.</span>
        </div>
      </section>

      <section className={styles.promiseSection} aria-labelledby="promise-title">
        <header>
          <p>THREE THINGS CHANGE EVERYTHING</p>
          <h2 id="promise-title">It knows the work.<br />It forms the team.<br />It tells the truth.</h2>
        </header>
        <div className={styles.promiseGrid}>
          {promises.map((promise) => (
            <article key={promise.number}>
              <span>{promise.number}</span>
              <h3>{promise.verb}</h3>
              <strong>{promise.title}</strong>
              <p>{promise.copy}</p>
              <i aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      <section className={styles.systemSection} aria-labelledby="system-title">
        <div className={styles.systemVisual}>
          <Image
            src="/orange-ai-computer/orange-ai-computer-system.png"
            alt="Orange AI Computer control node and compute node connected as one intelligence system"
            fill
            unoptimized
            sizes="(max-width: 900px) 100vw, 58vw"
          />
          <span className={styles.systemSignal} aria-hidden="true" />
          <div className={styles.systemCaption}>
            <small>CONTROL</small><i /><small>INTELLIGENCE</small><i /><small>COMPUTE</small>
          </div>
        </div>
        <div className={styles.systemCopy}>
          <p>ONE SYSTEM / EVERY MIND</p>
          <h2 id="system-title">Models are workers.<br /><em>Orange is the computer.</em></h2>
          <span>
            Use the AI tools you already know. Orange gives them shared project
            continuity, governed access to real tools, and a common definition of done.
          </span>
          <ul>
            <li><b>CONNECT</b> Codex, Claude Code, MCP clients, local models, and specialists</li>
            <li><b>DIRECT</b> Fast reflexes, a mission-aware Navigator, and bounded agents</li>
            <li><b>REMEMBER</b> Decisions, sources, failures, and the path that produced the result</li>
            <li><b>VERIFY</b> Separate fluent answers from actions that actually happened</li>
          </ul>
          <a href={orangeRepo}>Explore the architecture <Arrow /></a>
        </div>
      </section>

      <section className={styles.featureSection} aria-labelledby="feature-title">
        <header>
          <p>WHAT IT DOES FOR YOU</p>
          <h2 id="feature-title">More progress.<br />Less amnesia.</h2>
          <span>
            The machinery is deep. The experience is simple: give Orange a mission,
            let it choose the smallest capable route, and keep the proof.
          </span>
        </header>
        <div className={styles.featureList}>
          {features.map(([label, title, copy], index) => (
            <article key={label}>
              <small>{String(index + 1).padStart(2, "0")} / {label}</small>
              <h3>{title}</h3>
              <p>{copy}</p>
              <b aria-hidden="true">+</b>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.installSection} aria-labelledby="install-title">
        <div className={styles.installIntro}>
          <p>AN AI CAN INSTALL THE AI COMPUTER</p>
          <h2 id="install-title">Three steps.<br />Then Orange wakes up.</h2>
          <span>
            Orange discovers the computer you have, chooses a one-computer or
            two-computer plan, adopts compatible tools, and keeps machine state outside
            the package.
          </span>
          <a href={orangeDownload}>Download the Windows preview <Arrow /></a>
        </div>
        <ol className={styles.installSteps}>
          <li><b>01</b><div><strong>Download + extract</strong><span>Get the latest Orange AI Computer package from the public repository.</span></div></li>
          <li><b>02</b><div><strong>Open the folder</strong><span>Use Codex or Claude Code on your Windows computer.</span></div></li>
          <li className={styles.sayStep}>
            <b>03</b>
            <div>
              <strong>Say this.</strong>
              <blockquote>Read INSTALL_ORANGE.md completely and install Orange AI Computer.</blockquote>
            </div>
          </li>
        </ol>
      </section>

      <section className={styles.proofSection} aria-labelledby="proof-title">
        <div className={styles.proofSeal} aria-hidden="true">
          <span>O5</span><b>PROVEN</b><small>PACKAGE<br />LIFECYCLE</small>
        </div>
        <div className={styles.proofCopy}>
          <p>PUBLIC PREVIEW / HONEST BY DESIGN</p>
          <h2 id="proof-title">Trust the evidence.<br />Not the performance.</h2>
          <span>
            The release package contains 2,386 hash-locked files. Its clean apply,
            readiness, rollback, data preservation, and unchanged payload were tested
            from an extracted package. Machine-specific readiness still has to pass on
            your computer.
          </span>
          <div className={styles.proofActions}>
            <a href={orangeProof}>Inspect package proof <Arrow /></a>
            <a href={`${orangeRepo}/blob/main/PREVIEW_STATUS.md`}>Read preview limits <Arrow /></a>
          </div>
        </div>
        <dl className={styles.proofFacts}>
          <div><dt>2,386</dt><dd>HASH-LOCKED FILES</dd></div>
          <div><dt>SHA-256</dt><dd>DOWNLOAD INTEGRITY</dd></div>
          <div><dt>LOCAL</dt><dd>MEMORY + STATE</dd></div>
          <div><dt>VISIBLE</dt><dd>BLOCKERS + ROLLBACK</dd></div>
        </dl>
      </section>

      <section className={styles.moreSection} aria-labelledby="more-title">
        <header>
          <p>FROM ATOM EONS</p>
          <h2 id="more-title">The computer is new.<br />The mission is larger.</h2>
        </header>
        <div className={styles.moreGrid}>
          {otherWork.map((item, index) => (
            <Link href={item.href} key={item.title} className={styles.moreCard}>
              <small>0{index + 1} / {item.eyebrow}</small>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <span>{item.action} <Arrow /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.finalSection}>
        <p>THE ORANGE AI COMPUTER / FROM ATOM EONS</p>
        <h2>Give intelligence<br />a place to live.</h2>
        <div>
          <a href={orangeDownload}>Download the AI Computer <Arrow /></a>
          <a href={orangeRepo}>Open GitHub <Arrow /></a>
        </div>
        <span>Windows public preview. Source, package proof, and known limits are visible before you begin.</span>
      </section>
    </main>
  );
}

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}
