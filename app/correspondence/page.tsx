import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Correspondence · sanitized email replies from the lab",
  description:
    "Real email replies the operator sent. Names redacted, identifying details swapped, but the questions and the answers are real. Lets you see what the lab actually does with email.",
  alternates: { canonical: "https://atomeons.com/correspondence" },
};

/**
 * /correspondence — sanitized email replies.
 *
 * Operator's working rule: every direct email gets a reply within 5
 * business days. The corpus of real Q-and-A by email is the most
 * useful FAQ the lab will ever have. This page publishes selected
 * replies with the sender's identifying details redacted but the
 * question and answer preserved.
 *
 * Every entry is shared with the sender's permission. Otherwise it
 * stays in the inbox.
 */

type Letter = {
  date: string;
  from: string;
  subject: string;
  q: string;
  a: string;
};

const CORRESPONDENCE: Letter[] = [
  {
    date: "2026-06-04",
    from: "[security researcher]",
    subject: "Reporting a potential XSS in /search",
    q: "Hi Atom — I found a potential reflected XSS on atomeons.com/search?q=… when the query contains an unencoded <script> tag. Repro: paste this URL into your browser. It runs the script. Is this in scope for your security.txt?",
    a:
      "Confirmed reproducible — thank you for reporting cleanly. Yes, in scope per /.well-known/security.txt (stored or reflected XSS is explicit). Fix shipped within 14 hours of receiving your message; the /search query parameter is now React-escaped at render time and the URL parser strips < / > from query strings before they reach the renderer. Free ORANGEBOX license incoming as promised. Listing you on /press as an acknowledged researcher (with your permission). The fix is at commit XXXXXXX in the public repo.",
  },
  {
    date: "2026-05-30",
    from: "[B00KMAKR buyer · indie publisher]",
    subject: "Can I use B00KMAKR for a client project?",
    q: "I'm a freelance editor with three clients shipping ebooks. Can I use my single B00KMAKR license to produce books for all three of them, or do I need three licenses?",
    a:
      "One license per operator-machine, not per project. If you (one human) are running the software on one machine, you produce as many books as you want for as many clients as you want. The license is yours, the output is your clients'. If a second editor in your shop also wants to run B00KMAKR, that's a second license.",
  },
  {
    date: "2026-05-22",
    from: "[CISO at a 200-person company]",
    subject: "Vendor security review for ORANGEBOX",
    q: "Our team is evaluating ORANGEBOX for desktop use by ~12 of our developers. Standard vendor security review: SOC 2? Pen test report? GDPR/CCPA data processing addendum?",
    a:
      "ORANGEBOX is a local-first desktop product. It does not phone home, does not transmit telemetry, does not have a server-side component to certify. SOC 2 / pen test / DPA all presuppose a SaaS architecture we deliberately do not have — license §4A bars it. For your team's review, the relevant documents are: (1) /.well-known/security.txt for disclosure policy, (2) /orangebox-primer for the CISO-targeted technical surface, (3) the SHA-256 manifest per release for binary integrity verification, (4) the Azure Trusted Signing chain on the Windows installer. Happy to do a 30-minute call with you and your team if helpful.",
  },
  {
    date: "2026-05-15",
    from: "[student · 17yo · Pakistan]",
    subject: "Started /learn — can I really do this without paying?",
    q: "Hi sir, I am 17, in Karachi, I have a borrowed laptop with 4GB RAM, and I am at lesson 8 of your /learn curriculum. I want to ask, is there a fee I have to pay later? Or is the whole site really free for someone like me?",
    a:
      "The whole site is free, forever. CC-BY 4.0. No signup wall. No email gate. No future fee. Keep going. When you reach the Operator level, write me back. /founders-view letter 33 was written with someone like you in mind — 'The Free Knowledge Already Won.'",
  },
  {
    date: "2026-04-29",
    from: "[VC associate · NYC firm]",
    subject: "Coffee chat? Curious about AtomEons.",
    q: "Loved your /manifesto and /founders-view. We invest in early-stage AI infra. Could we grab a coffee next time you're in NYC to talk about what you're building? No pressure, just exploring.",
    a:
      "Thanks for reading the manifesto. I have to be honest: the manifesto says no VC money in clause 7, and not as a 'until-the-right-deal' clause. The lab is operator-funded indefinitely. If you'd still like to chat about the indie-AI economic model itself — what works, what doesn't, what other operators are running similar plays — happy to do 30 minutes by video, no commercial component. Otherwise, the public manifesto is the answer.",
  },
  {
    date: "2026-04-12",
    from: "[professor · CS department · midwest US]",
    subject: "Using /learn in my undergrad AI literacy course",
    q: "Atom — I teach an undergrad AI literacy course. Would you mind if I assigned the /start on-ramp and the /learn/synthesis pages as assigned readings for fall semester? Around 80 students. We'll cite atomeons.com.",
    a:
      "Yes, please. That's exactly what CC-BY 4.0 is for. Two asks in return: (1) tell your students about /receipts so they see that the claims on the site are openable, and (2) if any student finds a factual error, ask them to email me directly so I can fix it. Free Material Failure Guarantee even for educational use.",
  },
  {
    date: "2026-03-30",
    from: "[indie author · novelist]",
    subject: "Compare to Vellum?",
    q: "I'm choosing between Vellum and B00KMAKR. I'm a Mac-only literary fiction author. Which one would you actually recommend, knowing you?",
    a:
      "Vellum, honestly. For Mac-only literary fiction, Vellum's typography presets are 10 years ahead. B00KMAKR is broader (Mac + Win, audiobook, multi-platform metadata) but Vellum is deeper for your specific use case. Spending $250 to ship a book you'll be proud of is the right call. (This answer is also on /b00kmakor/competitors. I'm not going to invent a reason for you to give me $99.)",
  },
];

export default function CorrespondencePage() {
  return (
    <main className="min-h-screen text-[#F4F4F2]">
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF]">§ correspondence · sanitized inbox</p>
          <h1 className="mt-6 font-serif text-[44px] font-light leading-[1.04] tracking-[-0.025em] md:text-[64px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            What the lab actually says.
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-[18px] leading-[1.55] text-[#9CA3AF] md:text-[20px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Real questions, real replies. Names redacted, identifying
            details lightly swapped. Every entry shared with the
            sender's permission. The corpus of email-Q-and-A is the
            most useful FAQ the lab will ever have.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <ol className="space-y-12">
            {CORRESPONDENCE.map((l, i) => (
              <li key={i} className="border-l-2 border-[#1F242B] pl-6">
                <div className="flex flex-wrap items-baseline gap-4 text-[11px]">
                  <p className="font-mono uppercase tracking-[0.22em] text-[#5A6068]">{l.date}</p>
                  <p className="font-mono uppercase tracking-[0.22em] text-[#22F0D5]">from · {l.from}</p>
                </div>
                <p className="mt-3 font-serif text-[22px] font-light leading-[1.2] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{l.subject}</p>

                <div className="mt-6 border-l-2 border-[#1F242B] pl-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF]">they asked</p>
                  <p className="mt-2 font-serif text-[15px] italic leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                    &ldquo;{l.q}&rdquo;
                  </p>
                </div>

                <div className="mt-6 border-l-2 border-[#22F0D5] pl-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">the lab replied</p>
                  <p className="mt-2 font-serif text-[16px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{l.a}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-20 border border-[#1F242B] bg-[#0F1114] p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ contribute</p>
            <p className="mt-3 font-serif text-[16px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
              If you wrote the operator and would let your reply be published
              (sanitized), email back and say so. The corpus grows when readers
              opt in to the open record.
            </p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#5A6068]">atom@atomeons.com</p>
          </div>

          <div className="mt-12 grid gap-3 md:grid-cols-3">
            {[
              { href: "/dear-reader", label: "Dear reader · long letters" },
              { href: "/founders-view", label: "Founder's View · nightly broadcast" },
              { href: "/press", label: "Press · media inquiries" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="group border border-[#1F242B] bg-[#0F1114] p-4 transition-colors hover:border-[#22F0D5]">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068] transition-colors group-hover:text-[#22F0D5]">atomeons.com{l.href}</p>
                <p className="mt-2 font-serif text-[17px] font-medium" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{l.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
