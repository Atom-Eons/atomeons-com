/**
 * TheConnections — the substrate underneath the canvas.
 *
 * Four layers the visitor needs to see: the multi-channel delivery
 * substrate (Hermes), the routing layer (Subscription-First Transport),
 * the connector fabric (70+ external services), and the workflow engine
 * (n8n, built into the installer).
 *
 * All four are already public names. No mechanism leak. The router's
 * priority order is publishable — it is in the operator's own LICENSE
 * and shipping docs already.
 */

type Connection = {
  layer: string;
  name: string;
  one_liner: string;
  body: string;
  accent: string;
};

const CONNECTIONS: Connection[] = [
  {
    layer: "DELIVERY SUBSTRATE",
    name: "Hermes",
    one_liner: "The cockpit goes where you are.",
    body: "Telegram. Discord. Slack. Signal. CLI. Email. Whatever channel you live in, the cockpit pushes results, takes inbound, and routes work back. The Nous Research substrate carries the messages. The cockpit owns the choreography.",
    accent: "#22F0D5",
  },
  {
    layer: "ROUTING LAYER",
    name: "Subscription-First Transport",
    one_liner: "Your existing subscriptions are the primary route.",
    body: "Claude CLI. Codex CLI. Gemini CLI. Grok CLI. Cursor. If you have a subscription, the cockpit uses it. OpenRouter universal fallback when the primary lane is rate-limited. Direct API only as the last resort. Zero token markup. The bill stays yours.",
    accent: "#FF7A1A",
  },
  {
    layer: "CONNECTOR FABRIC",
    name: "70+ services, 17 categories",
    one_liner: "Every external surface, one config.",
    body: "Reddit, Meta, TikTok, LinkedIn, Framer, Whisper, X, GitHub, Linear, Notion, Stripe — the connector fabric handles auth, retries, rate-limit math, and credential vault scoping for every service it touches. New connectors land each release.",
    accent: "#22F0D5",
  },
  {
    layer: "WORKFLOW ENGINE",
    name: "n8n, embedded",
    one_liner: "Your nervous system. Yours.",
    body: "n8n ships inside the cockpit installer — self-hosted, locked to 127.0.0.1, no per-task ceiling, no SaaS markup. Build workflows in the visual editor. Trigger them from the canvas, the schedule, or any connector event. The orchestration layer that finally costs nothing.",
    accent: "#FF7A1A",
  },
];

export function TheConnections() {
  return (
    <section className="relative bg-[#0A0F11] py-32">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="mb-16 max-w-3xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
            ::THE SUBSTRATE
          </p>
          <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-6xl">
            What the canvas
            <br />
            <span className="text-[#22F0D5]">stands on.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#9BA5A7] md:text-lg">
            Four load-bearing layers under every Silent Canvas action. Each
            ships in the binary. Each respects local-first, BYO-keys, and
            zero-markup. Each is the cockpit's answer to a vendor stack
            that wanted to be your nervous system instead.
          </p>
        </div>

        <div className="space-y-px overflow-hidden rounded-2xl bg-[#1A2225]">
          {CONNECTIONS.map((c) => (
            <div
              key={c.name}
              className="group grid gap-6 bg-black p-8 transition-colors hover:bg-[#0A0F11] md:grid-cols-[200px_1fr] md:gap-12 md:p-10"
            >
              <div>
                <p
                  className="font-mono text-[10px] uppercase tracking-[0.32em]"
                  style={{ color: c.accent }}
                >
                  {c.layer}
                </p>
                <h3 className="mt-2 text-2xl font-medium leading-tight text-[#F2F4F5] md:text-3xl">
                  {c.name}
                </h3>
              </div>
              <div>
                <p className="text-lg font-medium text-[#F2F4F5] md:text-xl">
                  {c.one_liner}
                </p>
                <p className="mt-3 text-base leading-relaxed text-[#9BA5A7]">
                  {c.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
