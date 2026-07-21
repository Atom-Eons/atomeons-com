import type { Metadata } from "next";
import Link from "next/link";
import styles from "./ae-brawl.module.css";

export const metadata: Metadata = {
  title: "AE Brawl V56 · OpenAI Build Week",
  description:
    "AE Brawl is an AtomEons Build Week submission page: cinematic fight-discovery UX, Lead MCP explanation, AE research notes, and Devpost-ready submission assets.",
  alternates: { canonical: "https://atomeons.com/brawl" },
  openGraph: {
    title: "AE Brawl V56 · AtomEons",
    description:
      "A cinematic, human-readable fight-discovery experience built with Codex: Bruce Lee discipline, Double Dragon energy, and Lead MCP underneath.",
    url: "https://atomeons.com/brawl",
    siteName: "AtomEons",
    type: "website",
    images: [
      {
        url: "/ae-brawl/ae-brawl-v56-vibe.png",
        width: 1472,
        height: 832,
        alt: "Underground fight gym visual direction for AE Brawl",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AE Brawl V56 · AtomEons",
    description:
      "OpenAI Build Week submission page for a cinematic AI-powered fight-discovery experience.",
    creator: "@AtomMccree",
    images: ["/ae-brawl/ae-brawl-v56-vibe.png"],
  },
};

const devpostChecklist = [
  ["Project title", "AE Brawl"],
  ["Category", "Apps for your life, or Developer Tools if Lead MCP is the primary judging frame."],
  ["Working project URL", "Use the live route once deployed: https://atomeons.com/brawl"],
  ["Code repository", "Public repo, or private repo shared with testing@devpost.com and build-week-event@openai.com."],
  ["README", "Setup, sample mode, safety boundaries, Codex/GPT-5.6 usage, and judge testing path."],
  ["Demo video", "Public YouTube video under 3 minutes showing the page/app working and explaining Codex + GPT-5.6."],
  ["/feedback Session ID", "Get this from the Codex session where the majority of core functionality was built."],
  ["Safety statement", "Fictional entertainment layer; real training requires consent, supervision, and venue approval."],
] as const;

const slides = [
  {
    number: "01",
    title: "Lead MCP turns attention into a route.",
    body: "The visitor is not asked to understand infrastructure. They see a cinematic signal, choose a mode, and the system turns interest into a testable next action.",
  },
  {
    number: "02",
    title: "The agent layer keeps the story honest.",
    body: "Real-world data, fictional codenames, safety rules, and submission proof stay separated so judges can see product discipline instead of hype fog.",
  },
  {
    number: "03",
    title: "The UX behaves like a fight card.",
    body: "Short rounds, readable cards, big sensory moments, and clear controls keep the page human-readable under pressure.",
  },
  {
    number: "04",
    title: "The output becomes a packet.",
    body: "Devpost copy, manual links, About AtomEons notes, and judge instructions are staged as submission assets, not scattered afterthoughts.",
  },
] as const;

const innovations = [
  "Cinematic discovery interface: a visitor moves from signal to dossier to action without menu fatigue.",
  "Lead MCP framing: the site explains how an agent-friendly lead router can convert intent into safe next steps.",
  "Fiction/real boundary: entertainment mythology never pretends to be verified real-world venue data.",
  "Consent-first combat UX: the product sells energy while rejecting unsupervised or non-consensual contact.",
  "Submission packet design: the page doubles as a judging surface, README companion, and video script spine.",
] as const;

export default function AeBrawlPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="ae-brawl-title">
        <div className={styles.heroImage} aria-hidden>
          <img src="/ae-brawl/ae-brawl-v56-vibe.png" alt="" />
          <span className={styles.scan} />
          <span className={styles.glow} />
        </div>
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>OPENAI BUILD WEEK / V56 / SUBMISSION STAGE</p>
          <h1 id="ae-brawl-title">
            AE Brawl
            <span>Fight-discovery for the city after dark.</span>
          </h1>
          <p className={styles.deck}>
            A cinematic AI-powered experience for finding the right gym, night, discipline, and story.
            The mood is Bruce Lee discipline cut with Double Dragon arcade pressure, presented as a safe,
            consent-first product judges can understand in one pass.
          </p>
          <div className={styles.heroActions}>
            <a href="#devpost">Devpost checklist</a>
            <a href="#lead-mcp">Lead MCP slides</a>
            <a href="#packets">Download packets</a>
          </div>
        </div>
        <div className={styles.titlePlate} aria-hidden>
          <span>AE</span>
          <strong>BRAWL</strong>
          <small>CONTROLLED CHAOS / HUMAN READABLE</small>
        </div>
      </section>

      <section className={styles.intent} aria-labelledby="intent-title">
        <p className={styles.kicker}>THE ONE-LINE</p>
        <h2 id="intent-title">Not a fight app. A story engine for disciplined human movement.</h2>
        <div className={styles.intentGrid}>
          <article>
            <span>01</span>
            <h3>For users</h3>
            <p>Make the city feel alive: choose a discipline, find a signal, scout the room, and leave with a safe first-night story.</p>
          </article>
          <article>
            <span>02</span>
            <h3>For judges</h3>
            <p>Show a coherent product experience, not just a technical proof: UX, safety boundary, agent structure, and demo path.</p>
          </article>
          <article>
            <span>03</span>
            <h3>For AtomEons</h3>
            <p>Prove that AI can build culture-grade interfaces: visual mythology, practical routing, and accountable documentation.</p>
          </article>
        </div>
      </section>

      <section id="lead-mcp" className={styles.slides} aria-labelledby="slides-title">
        <div className={styles.sectionHead}>
          <p className={styles.kicker}>IMAGE-GEN SLIDESHOW / LEAD MCP</p>
          <h2 id="slides-title">Explain the machine as four fight rounds.</h2>
          <p>
            These are the slides to build or narrate in the demo video. Each slide should use the same visual grammar:
            dark gym, clean typography, neon edge, one clear idea per frame.
          </p>
        </div>
        <div className={styles.slideRail}>
          {slides.map((slide) => (
            <article key={slide.number}>
              <span>{slide.number}</span>
              <h3>{slide.title}</h3>
              <p>{slide.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.manual} aria-labelledby="manual-title">
        <div>
          <p className={styles.kicker}>AE RESEARCH DOC / TECHNICAL MANUAL</p>
          <h2 id="manual-title">Innovation claims, written so a judge can test them.</h2>
        </div>
        <ul>
          {innovations.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section id="packets" className={styles.packets} aria-labelledby="packet-title">
        <div className={styles.sectionHead}>
          <p className={styles.kicker}>SUBMISSION PACKETS</p>
          <h2 id="packet-title">Three judge-facing files.</h2>
          <p>Use these as source for Devpost fields, README sections, video narration, or print-to-PDF attachments.</p>
        </div>
        <div className={styles.packetGrid}>
          <a href="/ae-brawl/ae-brawl-technical-manual.md" download>
            <span>01 / MANUAL</span>
            <strong>AE Brawl Technical Manual</strong>
            <small>Lead MCP, UX model, safety rules, and innovation notes.</small>
          </a>
          <a href="/ae-brawl/about-atomeons-submission-packet.md" download>
            <span>02 / ABOUT</span>
            <strong>About AtomEons Packet</strong>
            <small>Founder/company copy for judges, press, and README.</small>
          </a>
          <a href="/ae-brawl/devpost-submission-copy.md" download>
            <span>03 / DEVPOST</span>
            <strong>Submission Copy Draft</strong>
            <small>Project description, video script, repo notes, and checklist.</small>
          </a>
        </div>
      </section>

      <section id="devpost" className={styles.checklist} aria-labelledby="checklist-title">
        <p className={styles.kicker}>DEVPOST / 120-MINUTE SUBMIT MODE</p>
        <h2 id="checklist-title">Nothing vague. Fill every field.</h2>
        <div className={styles.checkRows}>
          {devpostChecklist.map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.videoScript} aria-labelledby="video-title">
        <p className={styles.kicker}>DEMO VIDEO / UNDER 3 MINUTES</p>
        <h2 id="video-title">Shoot this sequence.</h2>
        <ol>
          <li><strong>0:00-0:20</strong> — Open on AE Brawl title and the problem: people want movement, story, and local signal, not another dead directory.</li>
          <li><strong>0:20-1:10</strong> — Show the page/app flow: choose discipline, location signal, dossier, Scout mode, StoryDrop, safety language.</li>
          <li><strong>1:10-1:55</strong> — Explain Lead MCP: intent comes in, safe route comes out, real and fictional layers stay separated.</li>
          <li><strong>1:55-2:35</strong> — Explain Codex/GPT-5.6: page, copy, UX structure, checks, documentation, and submission packet were built with Codex.</li>
          <li><strong>2:35-2:55</strong> — Close: AE Brawl makes the city playable while keeping consent, supervision, and truth boundaries visible.</li>
        </ol>
      </section>

      <section className={styles.finalCta}>
        <p className={styles.kicker}>FINAL SUBMIT STATE</p>
        <h2>Make the judges feel the room, then give them the receipts.</h2>
        <div>
          <Link href="/contact">Contact Atom</Link>
          <a href="https://openai.devpost.com/">Open Devpost</a>
        </div>
      </section>
    </main>
  );
}
