import Link from "next/link";
import styles from "./AetherFooter.module.css";

const columns = [
  {
    title: "Creations",
    links: [
      ["CableBox", "/cablebox"],
      ["AI Bookmaker", "/b00kmakor"],
      ["Orange5", "/orange5"],
      ["Orange³", "/orangebox"],
      ["skil.ski", "/skilski"],
      ["I AM AI", "/i-am-ai"],
    ],
  },
  {
    title: "Show + Culture",
    links: [
      ["Atom Alive", "/atom-alive"],
      ["Books", "/books"],
      ["Art", "/art"],
      ["Cinema", "/cinema"],
      ["Audiobook", "/i-am-ai#listen"],
      ["Founder's View", "/founders-view"],
    ],
  },
  {
    title: "Lab",
    links: [
      ["Launcher", "/launcher"],
      ["Learn", "/learn"],
      ["Research", "/research"],
      ["Cyber", "/learn/cyber"],
      ["Receipts", "/receipts"],
      ["Machine APIs", "/api"],
    ],
  },
  {
    title: "Institution",
    links: [
      ["About", "/about"],
      ["Press", "/press"],
      ["Roadmap", "/roadmap"],
      ["Trust", "/trust"],
      ["Audit log", "/audit-log"],
      ["Manifesto", "/manifesto"],
    ],
  },
] as const;

export function AetherFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brandBlock}>
          <Link href="/" className={styles.brand}>
            <span>Æ</span>
            <strong>ATOMEONS</strong>
          </Link>
          <p>
            A creation lab by one artist directing a massive AI workforce.
            Software, books, broadcasts, research, and new objects from Marco Island, Florida.
          </p>
          <div className={styles.status}>
            <span />
            GITHUB IS THE CANONICAL MIRROR
          </div>
          <a href="https://github.com/Atom-Eons/atomeons-com" target="_blank" rel="noopener noreferrer" className={styles.githubLink}>
            github.com/Atom-Eons/atomeons-com ↗
          </a>
        </div>

        <div className={styles.columns}>
          {columns.map((column) => (
            <div key={column.title}>
              <h2>{column.title}</h2>
              <ul>
                {column.links.map(([label, href]) => (
                  <li key={href}><Link href={href}>{label}<span aria-hidden>↗</span></Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.machineRail}>
        <Link href="/api/mcp">MCP SERVER</Link>
        <Link href="/api/agent-gateway">AGENT GATEWAY</Link>
        <Link href="/llms.txt">LLMS.TXT</Link>
        <Link href="/openapi.json">OPENAPI</Link>
        <span>319 ROUTES · NO VC</span>
      </div>

      <div className={styles.bottom}>
        <p>© 2026 AtomEons Systems Laboratory · Atom McCree + AI · Marco Island, FL</p>
        <nav aria-label="Footer utility links">
          <Link href="/legal/terms">Terms</Link>
          <Link href="/legal/privacy">Privacy</Link>
          <Link href="/trust">Trust</Link>
          <a href="https://x.com/AtomMccree" target="_blank" rel="me noopener">X</a>
          <a href="https://discord.gg/4wx3AGga" target="_blank" rel="noopener noreferrer">Discord</a>
          <a href="mailto:a.mccree@gmail.com">Email</a>
        </nav>
      </div>
    </footer>
  );
}
