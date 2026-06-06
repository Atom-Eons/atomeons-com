import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Atlas · rich sitemap · every surface on atomeons.com",
  description:
    "The full topology of the lab in one rich view. Every section · every subsection · every leaf. ~330 routes organized for human exploration. Companion to /constellation (the visual graph) and /sitemap.xml (the machine sitemap).",
  alternates: { canonical: "https://atomeons.com/atlas" },
};

/**
 * /atlas — rich sitemap.
 *
 * Three views of the lab's topology now exist:
 *   /sitemap.xml      machine-readable · XML · for crawlers
 *   /constellation    visual force-laid graph · for exploration via shape
 *   /atlas (this)     human-readable rich sitemap · for category browsing
 *
 * Grouped by section · each section shows its hierarchy + flagship
 * entries + total count + featured surface. Mom's-Law-grade
 * organization · no broken links · no aspirational entries.
 */

type Section = {
  key: string;
  title: string;
  oneliner: string;
  hub: string;
  groups: Array<{ heading: string; routes: Array<{ href: string; label: string; badge?: "NEW" | "LIVE" | "FLAGSHIP" }> }>;
};

const SECTIONS: Section[] = [
  {
    key: "learn",
    title: "Learn · 110+ routes",
    oneliner: "The five-level AI literacy curriculum + atlas deep dives + synthesis MED pages + career + verticals + tools.",
    hub: "/learn",
    groups: [
      {
        heading: "On-ramps",
        routes: [
          { href: "/start", label: "Start · 11-minute novice intro" },
          { href: "/learn", label: "The 5-level curriculum" },
          { href: "/learn/library", label: "Lesson library" },
          { href: "/q", label: "Q-pages · 20 answers", badge: "FLAGSHIP" },
          { href: "/glossary", label: "Glossary · plain English" },
          { href: "/learn/decision-tree", label: "Decision tree · pick next" },
        ],
      },
      {
        heading: "Persona paths",
        routes: [
          { href: "/learn/worker", label: "Worker · AI at the job" },
          { href: "/learn/builder", label: "Builder · ship features" },
          { href: "/learn/student", label: "Student · academic AI" },
          { href: "/learn/operator", label: "Operator · production AI" },
          { href: "/learn/curious", label: "Curious · just exploring" },
        ],
      },
      {
        heading: "Atlas · 32 deep dives",
        routes: [
          { href: "/learn/atlas", label: "Atlas index", badge: "FLAGSHIP" },
          { href: "/learn/atlas/mech-interp", label: "Mechanistic interpretability" },
          { href: "/learn/atlas/agent-harnesses", label: "Agent harnesses" },
          { href: "/learn/atlas/rag-architectures", label: "RAG architectures" },
          { href: "/learn/atlas/long-context-engineering", label: "Long-context engineering" },
          { href: "/learn/atlas/state-space-models", label: "State-space models · Mamba" },
          { href: "/learn/atlas/scaling-laws", label: "Scaling laws" },
        ],
      },
      {
        heading: "Synthesis · MED",
        routes: [
          { href: "/learn/synthesis", label: "All MED pages" },
          { href: "/learn/synthesis/context-windows-minimum-effective-dose", label: "Context windows · MED" },
          { href: "/learn/synthesis/tokens-and-api-costs-minimum-effective-dose", label: "Tokens + costs · MED" },
          { href: "/learn/synthesis/prompt-engineering-the-eighty-twenty", label: "Prompt engineering · 80/20" },
        ],
      },
      {
        heading: "Hands-on",
        routes: [
          { href: "/learn/labs", label: "Labs · 12 exercises", badge: "NEW" },
          { href: "/learn/projects", label: "Projects · 7 build-alongs", badge: "NEW" },
          { href: "/learn/exam", label: "Self-assessment", badge: "NEW" },
          { href: "/teach", label: "Teach · methodology", badge: "NEW" },
        ],
      },
      {
        heading: "Career + verticals",
        routes: [
          { href: "/learn/career", label: "Career index" },
          { href: "/learn/career/pathways", label: "Pathways" },
          { href: "/learn/career/salaries", label: "Salaries" },
          { href: "/learn/career/resume", label: "AI-ready resume" },
          { href: "/learn/vertical/healthcare", label: "Healthcare AI" },
          { href: "/learn/vertical/finance", label: "Finance AI" },
          { href: "/learn/vertical/defense", label: "Defense AI" },
        ],
      },
      {
        heading: "Tools",
        routes: [
          { href: "/learn/calc", label: "12 calculators" },
          { href: "/learn/calc/tools/cost-calculator", label: "Cost calculator" },
          { href: "/learn/calc/tools/token-counter", label: "Token counter" },
          { href: "/tools", label: "AI task router · 23 jobs" },
          { href: "/vs", label: "AI tool comparisons" },
          { href: "/supermodels", label: "Frontier leaderboard" },
        ],
      },
    ],
  },
  {
    key: "cyber",
    title: "Cyber · 40+ routes",
    oneliner: "Public-info cybersecurity catalog. Frameworks · defense · offense · AI security · breaches · careers · community · mythos.",
    hub: "/learn/cyber",
    groups: [
      {
        heading: "Reference",
        routes: [
          { href: "/learn/cyber", label: "Cyber index · 40 pages" },
          { href: "/learn/cyber/models", label: "22 industry models · the reference", badge: "FLAGSHIP" },
          { href: "/learn/cyber/mythos", label: "Defense-tech mythos", badge: "FLAGSHIP" },
          { href: "/learn/cyber/path", label: "Path · 0 to operator" },
          { href: "/learn/cyber/start", label: "Day-zero brief" },
          { href: "/learn/cyber/timeline", label: "60-year timeline" },
        ],
      },
      {
        heading: "Frameworks",
        routes: [
          { href: "/learn/cyber/mitre-attack", label: "MITRE ATT&CK" },
          { href: "/learn/cyber/nist-csf", label: "NIST CSF 2.0" },
          { href: "/learn/cyber/cyber-kill-chain", label: "Cyber Kill Chain" },
          { href: "/learn/cyber/zero-trust", label: "Zero Trust architecture" },
          { href: "/learn/cyber/post-quantum-crypto", label: "Post-quantum crypto" },
        ],
      },
      {
        heading: "AI security",
        routes: [
          { href: "/learn/cyber/ai-security", label: "AI security · flagship", badge: "FLAGSHIP" },
          { href: "/learn/cyber/llm-warfare", label: "LLM-era cyber warfare" },
          { href: "/q/what-is-prompt-injection", label: "What is prompt injection?" },
          { href: "/learn/trust/prompt-injection", label: "Prompt injection · defenses" },
        ],
      },
      {
        heading: "Defense + breaches",
        routes: [
          { href: "/learn/cyber/active-directory-defense", label: "AD defense" },
          { href: "/learn/cyber/email-security-stack", label: "Email security stack" },
          { href: "/learn/cyber/iot-embedded", label: "IoT + embedded" },
          { href: "/learn/cyber/ot-ics", label: "OT / ICS security" },
          { href: "/learn/cyber/mobile-security", label: "Mobile security" },
          { href: "/learn/cyber/breaches", label: "Breaches index" },
          { href: "/learn/cyber/colonial-pipeline-2021", label: "Colonial Pipeline" },
          { href: "/learn/cyber/log4shell-2021", label: "Log4Shell" },
          { href: "/learn/cyber/threat-actors", label: "Threat actor profiles" },
        ],
      },
      {
        heading: "Career + community",
        routes: [
          { href: "/learn/cyber/certs", label: "Certifications guide" },
          { href: "/learn/cyber/employers", label: "Where to work" },
          { href: "/learn/cyber/programs", label: "Degree programs" },
          { href: "/learn/cyber/conferences", label: "DEF CON · BSides · Black Hat" },
          { href: "/learn/cyber/podcasts", label: "Cyber podcasts" },
          { href: "/learn/cyber/youtube", label: "Cyber YouTube" },
          { href: "/learn/cyber/heroes", label: "Cyber heroes" },
          { href: "/learn/cyber/books", label: "Book canon" },
        ],
      },
    ],
  },
  {
    key: "research",
    title: "Research · 50+ routes",
    oneliner: "ÆoNs research papers · 35 decoded canonical AI papers · the AI Film Study monograph · intel decoded · live rankings.",
    hub: "/research",
    groups: [
      {
        heading: "Lab research",
        routes: [
          { href: "/research", label: "Research home" },
          { href: "/research/about", label: "About ÆoNs Research" },
          { href: "/research/papers", label: "31 papers · CC-BY 4.0" },
          { href: "/research/papers/mislabel-hypothesis", label: "Mislabel Hypothesis" },
          { href: "/research/papers/universal-defect", label: "Universal Defect" },
          { href: "/research/papers/light-code-validation-protocol", label: "Light-Code Validation Protocol" },
        ],
      },
      {
        heading: "Decoded papers · 35",
        routes: [
          { href: "/research/decoded", label: "Decoded index", badge: "FLAGSHIP" },
          { href: "/research/decoded/attention-is-all-you-need", label: "Attention Is All You Need" },
          { href: "/research/decoded/scaling-monosemanticity", label: "Scaling Monosemanticity" },
          { href: "/research/decoded/sleeper-agents", label: "Sleeper Agents" },
          { href: "/research/decoded/constitutional-ai", label: "Constitutional AI" },
          { href: "/research/decoded/mamba", label: "Mamba" },
          { href: "/research/decoded/rlhf", label: "RLHF" },
          { href: "/research/decoded/scaling-laws", label: "Scaling Laws" },
        ],
      },
      {
        heading: "Sci-fi monograph",
        routes: [
          { href: "/research/lessons-from-sci-fi", label: "Sci-fi index" },
          { href: "/research/lessons-from-sci-fi/monograph", label: "38-page monograph" },
          { href: "/research/lessons-from-sci-fi/tng", label: "TNG · the AI canon" },
          { href: "/research/lessons-from-sci-fi/chapters", label: "Chapter index" },
        ],
      },
      {
        heading: "Intel + live",
        routes: [
          { href: "/intel", label: "Intel home" },
          { href: "/intel/x-algorithm", label: "X algorithm decoded" },
          { href: "/supermodels", label: "Supermodels leaderboard" },
          { href: "/constellation", label: "Constellation graph", badge: "FLAGSHIP" },
          { href: "/datasets", label: "Open datasets" },
        ],
      },
    ],
  },
  {
    key: "products",
    title: "Products · 20+ routes",
    oneliner: "ORANGEBOX · B00KMAKR · skil.ski · I AM AI book. Each product has detail pages: changelog · roadmap · competitors.",
    hub: "/orangebox",
    groups: [
      {
        heading: "ORANGEBOX",
        routes: [
          { href: "/orangebox", label: "ORANGEBOX · v1.0.0" },
          { href: "/orangebox-primer", label: "Vendor security primer" },
          { href: "/orangebox/changelog", label: "Changelog" },
          { href: "/orangebox/roadmap", label: "Roadmap + anti-roadmap" },
          { href: "/orangebox/competitors", label: "vs alternatives" },
          { href: "/skills", label: "ÆSkill canon", badge: "NEW" },
        ],
      },
      {
        heading: "B00KMAKR",
        routes: [
          { href: "/b00kmakor", label: "B00KMAKR · v3.2.0" },
          { href: "/b00kmakor/changelog", label: "Changelog" },
          { href: "/b00kmakor/roadmap", label: "Roadmap" },
          { href: "/b00kmakor/competitors", label: "vs alternatives" },
        ],
      },
      {
        heading: "skil.ski",
        routes: [
          { href: "/skilski", label: "skil.ski · skill registry" },
          { href: "/skilski/changelog", label: "Changelog" },
          { href: "/skilski/roadmap", label: "Roadmap" },
          { href: "/skilski/competitors", label: "vs alternatives" },
        ],
      },
      {
        heading: "Books",
        routes: [
          { href: "/i-am-ai", label: "I AM AI · live", badge: "LIVE" },
          { href: "/i-am-ai/sample", label: "Free Chapter 1" },
          { href: "/i-am-ai/listen", label: "Free Chapter 20 audio" },
          { href: "/books", label: "The shelf" },
        ],
      },
      {
        heading: "Buy + compare",
        routes: [
          { href: "/compare", label: "All matrices" },
          { href: "/use-cases", label: "Use cases by persona" },
          { href: "/vendor-pack", label: "Vendor pack · CISO" },
          { href: "/pricing", label: "Pricing" },
          { href: "/support", label: "Support" },
        ],
      },
    ],
  },
  {
    key: "lab",
    title: "The Lab · 30+ routes",
    oneliner: "Trust · transparency · workspace · personal · signature · live · meta surfaces that make the lab legible to the outside.",
    hub: "/lab",
    groups: [
      {
        heading: "The room",
        routes: [
          { href: "/lab", label: "Lab · workspace" },
          { href: "/studio", label: "Studio · atelier" },
          { href: "/aesthetic", label: "Aesthetic · visual language" },
          { href: "/colophon", label: "Colophon · stack" },
          { href: "/integrations", label: "Integrations · service map" },
          { href: "/timeline", label: "Timeline · ship log" },
          { href: "/signature", label: "Signature · the mark" },
        ],
      },
      {
        heading: "Trust",
        routes: [
          { href: "/trust", label: "Trust posture" },
          { href: "/transparency", label: "Financial transparency" },
          { href: "/receipts", label: "Receipts ledger" },
          { href: "/manifesto", label: "14-clause manifesto" },
          { href: "/vendor-pack", label: "CISO bundle" },
          { href: "/audit-log", label: "Audit log · commits", badge: "NEW" },
          { href: "/north-star", label: "North Star · why", badge: "NEW" },
        ],
      },
      {
        heading: "Personal",
        routes: [
          { href: "/about", label: "About the operator" },
          { href: "/library", label: "Library · books" },
          { href: "/listening", label: "Listening · music" },
          { href: "/watching", label: "Watching · films + TV" },
          { href: "/influences", label: "Influences · named" },
          { href: "/dear-reader", label: "Dear reader · letters" },
          { href: "/correspondence", label: "Correspondence" },
        ],
      },
      {
        heading: "Live + data + dev",
        routes: [
          { href: "/now", label: "/now · ship log", badge: "LIVE" },
          { href: "/live", label: "/live · dashboard", badge: "LIVE" },
          { href: "/ask", label: "Ask the lab", badge: "LIVE" },
          { href: "/api", label: "Developer API" },
          { href: "/datasets", label: "Open datasets" },
          { href: "/constellation", label: "Force graph" },
          { href: "/explore", label: "Explore · rabbit hole", badge: "NEW" },
          { href: "/welcome", label: "Welcome · returning visitor", badge: "NEW" },
        ],
      },
    ],
  },
];

export default function AtlasPage() {
  return (
    <main className="min-h-screen text-[#F4F4F2]">
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF]">§ atlas · rich sitemap · ~330 routes</p>
          <h1 className="mt-6 font-serif text-[44px] font-light leading-[1.04] tracking-[-0.025em] md:text-[64px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            The full topology, organized for humans.
          </h1>
          <p className="speakable-answer mt-6 max-w-3xl font-serif text-[18px] leading-[1.55] text-[#9CA3AF] md:text-[20px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Companion to /sitemap.xml (machine) and /constellation
            (visual graph). Every section · every flagship route ·
            every leaf · grouped for category browsing. Use this as
            the table of contents.
          </p>
        </div>
      </section>

      {SECTIONS.map((section) => (
        <section key={section.key} className="border-b border-[#1F242B]">
          <div className="mx-auto max-w-5xl px-6 py-14 md:py-20">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="font-serif text-[32px] font-light leading-[1.1] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                {section.title}
              </h2>
              <Link href={section.hub} className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5] underline decoration-[#1F242B] underline-offset-4 hover:decoration-[#22F0D5]">
                → section hub · {section.hub}
              </Link>
            </div>
            <p className="mt-3 max-w-2xl font-serif text-[15px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{section.oneliner}</p>

            <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {section.groups.map((g, gi) => (
                <div key={gi}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ {g.heading}</p>
                  <ul className="mt-4 space-y-2">
                    {g.routes.map((r) => (
                      <li key={r.href}>
                        <Link href={r.href} className="group inline-flex items-baseline gap-2">
                          <span className="font-serif text-[13.5px] leading-[1.5] text-[#F4F4F2] transition-colors group-hover:text-[#22F0D5]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                            {r.label}
                          </span>
                          {r.badge ? (
                            <span
                              className="font-mono text-[8.5px] uppercase tracking-[0.22em]"
                              style={{
                                color: r.badge === "LIVE" ? "#FF4D4D" : r.badge === "FLAGSHIP" ? "#C9A55C" : "#22F0D5",
                                border: `1px solid ${r.badge === "LIVE" ? "#FF4D4D" : r.badge === "FLAGSHIP" ? "#C9A55C" : "#22F0D5"}`,
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
              ))}
            </div>
          </div>
        </section>
      ))}

      <section>
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ three views of the same topology</p>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            <Link href="/sitemap.xml" className="group border border-[#1F242B] bg-[#0F1114] p-5 transition-colors hover:border-[#22F0D5]">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">machine</p>
              <h3 className="mt-3 font-serif text-[20px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>/sitemap.xml</h3>
              <p className="mt-2 font-serif text-[13px] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>XML · for crawlers · standard sitemap protocol · global coverage.</p>
            </Link>
            <Link href="/constellation" className="group border border-[#1F242B] bg-[#0F1114] p-5 transition-colors hover:border-[#22F0D5]">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">visual</p>
              <h3 className="mt-3 font-serif text-[20px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>/constellation</h3>
              <p className="mt-2 font-serif text-[13px] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>Interactive force-laid graph · 278 nodes · 648 edges · click to navigate.</p>
            </Link>
            <Link href="/explore" className="group border border-[#1F242B] bg-[#0F1114] p-5 transition-colors hover:border-[#22F0D5]">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">curated</p>
              <h3 className="mt-3 font-serif text-[20px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>/explore</h3>
              <p className="mt-2 font-serif text-[13px] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>7 paths by intent · the rabbit hole · pick where you actually want to go.</p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
