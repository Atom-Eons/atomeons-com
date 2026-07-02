import Link from "next/link";
import { Mail } from "lucide-react";

// Inline SVG icons — lucide-react 1.x dropped Github/Twitter brand icons.
// Kept hairline (strokeWidth 1.5) + 14px box to match other footer icons.
function GithubMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.77.11 3.06.73.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.13v3.16c0 .31.21.67.8.56C20.21 21.38 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

function XMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const labLinks = [
  { label: "Founder's View", href: "/founders-view" },
  { label: "Research papers", href: "/research/papers" },
  { label: "Handbook", href: "/handbook" },
  { label: "Doctrine", href: "/doctrine" },
  { label: "Org chart", href: "/org-chart" },
  { label: "Manifesto", href: "/manifesto" },
  { label: "Timeline", href: "/timeline" },
  { label: "Press", href: "/press" },
  { label: "About", href: "/about" },
  { label: "🎲 Random page", href: "/random" },
];

const productLinks = [
  { label: "Orange³", href: "/orangebox" },
  { label: "AI Bookmaker", href: "/b00kmakor" },
  { label: "I Am AI · the book", href: "/i-am-ai" },
];

const learnLinks = [
  { label: "Atlas", href: "/learn/atlas" },
  { label: "Career", href: "/learn/career" },
  { label: "Trust", href: "/learn/trust" },
  { label: "Decode", href: "/learn/decode" },
  { label: "Calc", href: "/learn/calc" },
  { label: "Books", href: "/books" },
  { label: "Monograph", href: "/research/lessons-from-sci-fi/monograph" },
  { label: "Decoded papers", href: "/learn/decoded" },
  { label: "Cyber", href: "/learn/cyber" },
];

const legalLinks = [
  { label: "Terms", href: "/legal/terms" },
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Refunds", href: "/legal/refunds" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#1F242B] bg-[#08090B] text-[#F4F4F2]">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-8">
          {/* Lab column */}
          <div>
            <h3 className="font-display text-xs font-medium uppercase tracking-[0.18em] text-[#7a818a]">
              Lab
            </h3>
            <ul className="mt-5 space-y-3">
              {labLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-display text-sm text-[#9CA3AF] transition-colors duration-200 hover:text-[#22F0D5]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products column */}
          <div>
            <h3 className="font-display text-xs font-medium uppercase tracking-[0.18em] text-[#7a818a]">
              Products
            </h3>
            <ul className="mt-5 space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-display text-sm text-[#9CA3AF] transition-colors duration-200 hover:text-[#22F0D5]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn column */}
          <div>
            <h3 className="font-display text-xs font-medium uppercase tracking-[0.18em] text-[#7a818a]">
              Learn
            </h3>
            <ul className="mt-5 space-y-3">
              {learnLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-display text-sm text-[#9CA3AF] transition-colors duration-200 hover:text-[#22F0D5]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal column */}
          <div>
            <h3 className="font-display text-xs font-medium uppercase tracking-[0.18em] text-[#7a818a]">
              Legal
            </h3>
            <ul className="mt-5 space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-display text-sm text-[#9CA3AF] transition-colors duration-200 hover:text-[#22F0D5]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="font-display mt-10 text-xs font-medium uppercase tracking-[0.18em] text-[#7a818a]">
              Contact
            </h3>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="mailto:a.mccree@gmail.com"
                  className="font-display inline-flex items-center gap-2 text-sm text-[#9CA3AF] transition-colors duration-200 hover:text-[#22F0D5]"
                  aria-label="Email Atom McCree"
                >
                  <Mail className="h-3.5 w-3.5" strokeWidth={1.5} />
                  Email
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/AtomMccree"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display inline-flex items-center gap-2 text-sm text-[#9CA3AF] transition-colors duration-200 hover:text-[#22F0D5]"
                  aria-label="Atom McCree on X"
                >
                  <XMark className="h-3.5 w-3.5" />
                  @AtomMccree
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/AtomEons"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display inline-flex items-center gap-2 text-sm text-[#9CA3AF] transition-colors duration-200 hover:text-[#22F0D5]"
                  aria-label="AtomEons on GitHub"
                >
                  <GithubMark className="h-3.5 w-3.5" />
                  AtomEons
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#1F242B]">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 py-6 sm:px-8 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="font-display select-none text-base text-[#F4F4F2]"
            >
              Æ
            </span>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#7a818a]">
              Built in Marco Island, FL · 2026 · Atom McCree + AI
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#7a818a]">
              © 2026 AtomEons Systems Laboratory
            </p>
            <Link
              href="/legal/terms"
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#7a818a] transition-colors duration-200 hover:text-[#22F0D5]"
            >
              Terms
            </Link>
            <Link
              href="/legal/privacy"
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#7a818a] transition-colors duration-200 hover:text-[#22F0D5]"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
