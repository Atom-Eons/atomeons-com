import Link from "next/link";
import { PRODUCTS, RESEARCH_LINKS } from "../../_data/aether-canon";
import styles from "./AetherFooter.module.css";

const columns = [
  {
    title: "Products",
    links: [["All products", "/products"] as const, ...PRODUCTS.map((item) => [item.title, item.href] as const)],
  },
  {
    title: "Show",
    links: [
      ["Atom Alive", "/atom-alive"],
      ["Watch on YouTube", "https://www.youtube.com/@AICodeShow"],
      ["Books", "/books"],
      ["Art", "/art"],
      ["Cinema", "/cinema"],
    ],
  },
  {
    title: "Research",
    links: RESEARCH_LINKS.map((item) => [item.title, item.href] as const),
  },
  {
    title: "About",
    links: [
      ["About", "/about"],
      ["Contact", "/contact"],
      ["Press", "/press"],
      ["Receipts", "/receipts"],
      ["Timeline", "/timeline"],
      ["Explore archive", "/explore"],
      ["Full atlas", "/atlas"],
      ["For machines", "/api"],
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
            The independent work of one artist directing a massive AI workforce.
            Products, broadcasts, and independent research from Naples, Florida.
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
        <span>STATIC EDITION · NO TRACKING DATABASE · NO VC</span>
      </div>

      <div className={styles.commandBoard} aria-label="Footer priority routes">
        <Link href="/products">
          <span>01 / PRODUCTS</span>
          <strong>Start with the objects.</strong>
          <small>CableBox, Bookmaker, Orange5, and I AM AI.</small>
        </Link>
        <Link href="/cablebox">
          <span>02 / LAUNCH</span>
          <strong>Tune into CableBox.</strong>
          <small>The native Windows television object and current launch focus.</small>
        </Link>
        <Link href="/research">
          <span>03 / RESEARCH</span>
          <strong>Inspect the strange claims.</strong>
          <small>Discoveries, papers, evidence, PDFs, and visible limits.</small>
        </Link>
        <Link href="/contact">
          <span>04 / CONTACT</span>
          <strong>Send the signal.</strong>
          <small>Direct Gmail fail-safe for work, press, support, and corrections.</small>
        </Link>
      </div>

      <div className={styles.bottom}>
        <p>© 2026 AtomEons · Atom McCree + AI · Naples, FL</p>
        <nav aria-label="Footer utility links">
          <Link href="/legal/terms">Terms</Link>
          <Link href="/legal/privacy">Privacy</Link>
          <Link href="/trust">Trust</Link>
          <a href="https://x.com/AtomMccree" target="_blank" rel="me noopener">X</a>
          <a href="https://discord.gg/4wx3AGga" target="_blank" rel="noopener noreferrer">Discord</a>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}
