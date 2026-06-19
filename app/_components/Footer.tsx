import Link from "next/link";
import { AtomMark } from "./AtomMark";
import { RouteSigil } from "./V3/RouteSigil";

/**
 * Footer — sitemap-style · 2026-06-05
 *
 * Replaces the 4-column footer with a 6-column sitemap that mirrors
 * the new MegaHeader IA 1:1. Every major surface is one click away
 * from any page, at all times. For a site with ~310 routes, the
 * footer must be a real navigation surface, not just a legal strip.
 *
 * Columns:
 *   1. Brand block (sigil + tagline + LIVE badges)
 *   2. Learn
 *   3. Cyber
 *   4. Research
 *   5. Products
 *   6. Lab
 *
 * Bottom row · 4-band utility:
 *   - "Live now" badges (ASK / NOW / CONSTELLATION / FV)
 *   - Operator + copyright
 *   - Legal microlinks
 *   - Verify links (X · LinkedIn · MCP)
 */

const COL = (heading: string, rows: Array<{ href: string; label: string; badge?: "NEW" | "LIVE" }>) => (
  <div key={heading}>
    <h2 className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#9BA5A7]">{heading}</h2>
    <ul className="mt-5 space-y-2.5 text-[13px] text-[#E7EBED]">
      {rows.map((r) => (
        <li key={r.href}>
          <Link href={r.href} className="inline-flex items-baseline gap-2 transition-colors hover:text-[#22F0D5]">
            <span>{r.label}</span>
            {r.badge ? (
              <span
                className="font-mono text-[8.5px] uppercase tracking-[0.22em]"
                style={{
                  color: r.badge === "LIVE" ? "#FF4D4D" : "#22F0D5",
                  border: `1px solid ${r.badge === "LIVE" ? "#FF4D4D" : "#22F0D5"}`,
                  padding: "1px 5px",
                }}
              >
                {r.badge}
              </span>
            ) : null}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export function Footer() {
  return (
    <footer className="relative z-10 mt-24 border-t border-[#1A2225] bg-black">
      {/* ─── Main sitemap grid ───────────────────────────────────── */}
      <div className="mx-auto w-full max-w-[1480px] px-6 py-16 md:px-8 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-7">
          {/* Brand block · 1 col */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-baseline gap-2">
              <span aria-hidden className="flex items-baseline self-center">
                <RouteSigil slug="/" size={22} accent="#22F0D5" />
              </span>
              <span className="text-[22px] font-semibold tracking-[-0.04em] text-[#F2F4F5]">Æ</span>
              <span className="text-[13px] font-medium uppercase tracking-[0.14em] text-[#F2F4F5]">ATOMEONS</span>
            </Link>
            <p className="mt-5 max-w-[260px] text-[13px] leading-[1.65] text-[#9BA5A7]">
              Independent AI research. Software, books, apps, lessons.
              One operator. Marco Island, FL.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link href="/ask" className="inline-flex items-center gap-1.5 border border-[#22F0D5] bg-[#0F1114] px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.22em] text-[#22F0D5] transition-colors hover:bg-[#22F0D5] hover:text-black">
                Ask the lab →
              </Link>
            </div>
          </div>

          {/* Learn */}
          {COL("Learn", [
            { href: "/start", label: "Start · 11-min" },
            { href: "/learn", label: "Curriculum" },
            { href: "/learn/atlas", label: "Atlas · deep dives" },
            { href: "/learn/synthesis", label: "Synthesis · MED" },
            { href: "/learn/playbooks", label: "Playbooks by job" },
            { href: "/learn/labs", label: "Labs", badge: "NEW" },
            { href: "/learn/projects", label: "Projects", badge: "NEW" },
            { href: "/learn/exam", label: "Exam", badge: "NEW" },
            { href: "/teach", label: "Teach", badge: "NEW" },
            { href: "/q", label: "Q-pages" },
            { href: "/glossary", label: "Glossary" },
          ])}

          {/* Cyber */}
          {COL("Cyber", [
            { href: "/learn/cyber", label: "Cyber index" },
            { href: "/learn/cyber/path", label: "Path · 0 to operator" },
            { href: "/learn/cyber/mitre-attack", label: "MITRE ATT&CK" },
            { href: "/learn/cyber/nist-csf", label: "NIST CSF 2.0" },
            { href: "/learn/cyber/zero-trust", label: "Zero Trust" },
            { href: "/learn/cyber/post-quantum-crypto", label: "Post-quantum crypto" },
            { href: "/learn/cyber/active-directory-defense", label: "AD defense" },
            { href: "/learn/cyber/llm-warfare", label: "LLM warfare" },
            { href: "/learn/cyber/breaches", label: "Breaches" },
            { href: "/learn/cyber/heroes", label: "Cyber heroes" },
            { href: "/learn/cyber/certs", label: "Certs guide" },
          ])}

          {/* Research */}
          {COL("Research", [
            { href: "/research", label: "Research home" },
            { href: "/research/papers", label: "Papers · 31" },
            { href: "/research/decoded", label: "Decoded · 35" },
            { href: "/research/decoded/attention-is-all-you-need", label: "Attention paper" },
            { href: "/research/decoded/scaling-monosemanticity", label: "Scaling monosemanticity" },
            { href: "/research/decoded/mamba", label: "Mamba" },
            { href: "/research/lessons-from-sci-fi", label: "Sci-fi monograph" },
            { href: "/intel/x-algorithm", label: "X algorithm decoded" },
            { href: "/supermodels", label: "Supermodels leaderboard" },
            { href: "/constellation", label: "Constellation graph", badge: "NEW" },
            { href: "/datasets", label: "Open datasets", badge: "NEW" },
          ])}

          {/* Products · Software */}
          {COL("Software", [
            { href: "/orangebox", label: "Orange³" },
            { href: "/orangebox/changelog", label: "OB changelog" },
            { href: "/orangebox/roadmap", label: "OB roadmap" },
            { href: "/orangebox/competitors", label: "OB vs alternatives" },
            { href: "/b00kmakor", label: "AI Bookmaker" },
            { href: "/skilski", label: "skil.ski" },
            { href: "/compare", label: "Compare matrices" },
            { href: "/use-cases", label: "Use cases" },
            { href: "/pricing", label: "Pricing" },
            { href: "/support", label: "Support" },
          ])}

          {/* Books */}
          {COL("Books", [
            { href: "/i-am-ai", label: "I AM AI · book", badge: "LIVE" },
            { href: "/i-am-ai/sample", label: "Free Chapter 1" },
            { href: "/i-am-ai/listen", label: "Free Chapter 20 audio" },
            { href: "/research/lessons-from-sci-fi", label: "AI Film Study" },
            { href: "/research/lessons-from-sci-fi/monograph", label: "38-page monograph" },
            { href: "/research/lessons-from-sci-fi/tng", label: "TNG · the AI canon" },
            { href: "/research/lessons-from-sci-fi/chapters", label: "Chapter index" },
            { href: "/books", label: "The shelf · reading lists" },
            { href: "/library", label: "Library · op's books" },
            { href: "/founders-view", label: "Founder's View", badge: "LIVE" },
          ])}

          {/* Lab · trust + transparency + identity hub */}
          {COL("Lab", [
            { href: "/lab", label: "Lab · workspace", badge: "NEW" },
            { href: "/studio", label: "Studio · atelier" },
            { href: "/integrations", label: "Integrations" },
            { href: "/timeline", label: "Timeline · ship log" },
            { href: "/signature", label: "Signature · mark" },
            { href: "/audit-log", label: "Audit log · commits", badge: "NEW" },
            { href: "/trust", label: "Trust posture" },
            { href: "/transparency", label: "Transparency" },
            { href: "/receipts", label: "Receipts ledger" },
            { href: "/manifesto", label: "Manifesto" },
            { href: "/skills", label: "ÆSkill canon", badge: "NEW" },
            { href: "/version", label: "Version · JUNE ROCKET", badge: "NEW" },
            { href: "/.well-known/security.txt", label: "security.txt" },
          ])}
        </div>

        {/* ─── Live + signature band ────────────────────────────── */}
        <div className="mt-14 border-t border-[#1A2225] pt-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF4D4D]">§ live · always-on</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  { href: "/ask", label: "/ask" },
                  { href: "/now", label: "/now" },
                  { href: "/live", label: "/live" },
                  { href: "/constellation", label: "/constellation" },
                  { href: "/founders-view", label: "/founders-view" },
                  { href: "/api/mcp", label: "/api/mcp · MCP server" },
                  { href: "/api/agent-gateway", label: "/api/agent-gateway · LLM onboarding" },
                  { href: "/api", label: "/api · dev docs" },
                ].map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="border border-[#1A2225] bg-[#0F1114] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7] transition-colors hover:border-[#22F0D5] hover:text-[#22F0D5]"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7]">§ machine-readable</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  { href: "/llms.txt", label: "llms.txt" },
                  { href: "/llms-full.txt", label: "llms-full.txt" },
                  { href: "/llms.md", label: "llms.md" },
                  { href: "/sitemap.xml", label: "sitemap.xml" },
                  { href: "/sitemap-ai.xml", label: "sitemap-ai.xml" },
                  { href: "/openapi.json", label: "openapi.json" },
                  { href: "/graph-index.json", label: "graph-index.json" },
                  { href: "/.well-known/mcp.json", label: ".well-known/mcp.json" },
                  { href: "/.well-known/ai.txt", label: ".well-known/ai.txt" },
                  { href: "/.well-known/security.txt", label: ".well-known/security.txt" },
                ].map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className="border border-[#1A2225] bg-[#0F1114] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7] transition-colors hover:border-[#22F0D5] hover:text-[#22F0D5]"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Bottom bar · operator + legal + verify ───────────────── */}
      <div className="border-t border-[#1A2225]">
        <div className="mx-auto flex w-full max-w-[1480px] flex-col items-start gap-3 px-6 py-6 text-[12px] text-[#6B7779] md:flex-row md:items-center md:justify-between md:px-8">
          <p>
            © 2026 AtomEons Systems Laboratory · Atom McCree · Marco Island, FL · operator-owned · no VC
            <br className="md:hidden" />
            <span className="hidden md:inline"> · </span>
            <span>Website created by Atom McCree + AI</span>
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <Link href="/legal/terms" className="transition-colors hover:text-[#E7EBED]">Terms</Link>
            <Link href="/legal/privacy" className="transition-colors hover:text-[#E7EBED]">Privacy</Link>
            <Link href="/legal/refund" className="transition-colors hover:text-[#E7EBED]">Refunds</Link>
            <a
              href="https://x.com/AtomMccree"
              target="_blank"
              rel="noopener"
              className="transition-colors hover:text-[#E7EBED]"
            >
              @AtomMccree
            </a>
            <a
              href="https://www.instagram.com/atomeons/"
              target="_blank"
              rel="noopener"
              className="transition-colors hover:text-[#E7EBED]"
            >
              instagram
            </a>
            <a
              href="https://www.twitch.tv/atomeons"
              target="_blank"
              rel="noopener"
              className="transition-colors hover:text-[#E7EBED]"
            >
              twitch
            </a>
            <a
              href="https://discord.gg/4wx3AGga"
              target="_blank"
              rel="noopener"
              className="transition-colors hover:text-[#E7EBED]"
            >
              discord
            </a>
            <a
              href="https://atommccree.com"
              target="_blank"
              rel="me noopener"
              className="transition-colors hover:text-[#E7EBED]"
            >
              atommccree.com
            </a>
            <a
              href="https://github.com/Atom-Eons/atomeons-com"
              target="_blank"
              rel="noopener"
              className="transition-colors hover:text-[#E7EBED]"
            >
              github
            </a>
            <a
              href="https://www.linkedin.com/developers/apps/verification/91a1ed08-379d-44d7-b347-b0b9977ca824"
              rel="me noopener"
              target="_blank"
              className="transition-colors hover:text-[#E7EBED]"
              aria-label="LinkedIn verify · developer app verification"
            >
              LinkedIn verify
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
