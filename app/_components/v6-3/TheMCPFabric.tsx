/**
 * TheMCPFabric — 60+ MCP connectors, surfaced as a category-grouped
 * badge cloud.
 *
 * Per orange-judge: LOAD-BEARING. The integration story. Buyers coming
 * from Claude Code or VS Code extensions need to understand what
 * connects and how they own the connection.
 *
 * Per mirrors: list tool names freely (they are public); describe
 * categories in plain English rather than publishing internal category
 * IDs verbatim. The 17 internal category labels are NEVER — buyer-facing
 * grouping is fine.
 *
 * Per misfits: telephone exchange patchboard grammar — dense chip cloud,
 * staggered bloom on reveal, category-by-category cadence.
 */

type Category = { name: string; chips: string[] };

const CATEGORIES: Category[] = [
  {
    name: "Code & Build",
    chips: [
      "GitHub",
      "GitLab",
      "Linear",
      "Repomix",
      "Claude Flow",
      "filesystem",
      "terminal",
      "git",
    ],
  },
  {
    name: "Comms",
    chips: ["Slack", "Discord", "Telegram", "Signal", "Loops", "Postmark"],
  },
  {
    name: "X & Social",
    chips: ["X (Twitter)", "Reddit", "LinkedIn", "TikTok", "Hermes 𝕏 feed"],
  },
  {
    name: "Ads & Marketing",
    chips: [
      "Meta Ads",
      "TikTok Ads",
      "Google Ads",
      "Pipeboard",
      "Plausible",
      "PostHog",
    ],
  },
  {
    name: "Docs & Notes",
    chips: ["Notion", "Confluence", "Google Drive", "Dropbox"],
  },
  {
    name: "Search & Web",
    chips: ["Tavily", "Brave", "Exa", "Firecrawl", "WebFetch"],
  },
  {
    name: "Commerce",
    chips: ["Stripe", "Shopify", "PayPal"],
  },
  {
    name: "AI Infra",
    chips: ["OpenRouter", "Groq", "Ollama", "Hugging Face", "Anthropic"],
  },
  {
    name: "Design & Media",
    chips: ["Framer", "Figma", "ElevenLabs", "Whisper.cpp", "ComfyUI"],
  },
  {
    name: "Deploy & Ops",
    chips: ["Vercel", "Cloudflare", "GitHub Actions", "n8n", "supabase"],
  },
];

export function TheMCPFabric() {
  const totalChips = CATEGORIES.reduce((n, c) => n + c.chips.length, 0);
  return (
    <section className="relative bg-[#0A0F11] py-32">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="mb-16 max-w-3xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#FF7A1A]">
            ::THE MCP FABRIC · CONNECTOR LAYER
          </p>
          <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-6xl">
            60+ tools.
            <br />
            <span className="text-[#22F0D5]">Wired at install.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#9BA5A7] md:text-lg">
            MCP connectors are not plugins you hunt down. They ship inside
            the binary. Credentials live in the vault. Permissions are scoped
            per-tool, never globally granted. Every call writes a receipt —
            tool name, input hash, cost in cents, status.
          </p>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.22em] text-[#22F0D5]">
            {totalChips}+ tools shown. more land each release.
          </p>
        </div>

        <div className="space-y-10">
          {CATEGORIES.map((cat) => (
            <div key={cat.name}>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.32em] text-[#6B7779]">
                {cat.name.toUpperCase()}{" "}
                <span className="text-[#1A2225]">·</span>{" "}
                <span className="text-[#22F0D5]/60">{cat.chips.length}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {cat.chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-[#1A2225] bg-black px-3 py-1.5 font-mono text-[11px] text-[#F2F4F5] transition-colors hover:border-[#22F0D5]/40"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-16 max-w-2xl font-mono text-base uppercase tracking-[0.18em] text-[#FF7A1A]">
          THE FABRIC IS ADDITIVE. OLD TOOLS NEVER BREAK WHEN NEW ONES ARRIVE.
        </p>
      </div>
    </section>
  );
}
