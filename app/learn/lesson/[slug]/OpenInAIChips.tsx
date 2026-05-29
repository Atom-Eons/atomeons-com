/**
 * OpenInAIChips — quick-launch row to the three big chat AIs.
 *
 * Renders three small branded buttons next to the Copy button. Each
 * opens the respective chat AI in a new tab so the user can paste the
 * prompt they just copied. None of the chat AIs support URL-driven
 * prompt prefill (as of mid-2026), so this is a one-click launch,
 * not a deep-link prefill — but the friction drop from "now go find
 * claude.ai" to "click here, paste, send" is real.
 *
 * Server component. Pure presentation.
 */
export function OpenInAIChips({ accent = "#22F0D5" }: { accent?: string }) {
  const targets = [
    { href: "https://claude.ai/new", label: "Claude", color: "#cc785c" },
    { href: "https://chatgpt.com", label: "ChatGPT", color: "#10a37f" },
    {
      href: "https://gemini.google.com/app",
      label: "Gemini",
      color: "#4285f4",
    },
  ];
  return (
    <div className="mt-4">
      <p
        className="font-mono text-[10px] uppercase tracking-[0.28em]"
        style={{ color: accent }}
      >
        ::or open one in a new tab — then paste
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {targets.map((t) => (
          <a
            key={t.label}
            href={t.href}
            target="_blank"
            rel="noopener"
            className="group inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] transition-all"
            style={{
              borderColor: t.color + "55",
              background: t.color + "12",
              color: t.color,
            }}
          >
            <span
              className="size-1.5 rounded-full"
              style={{ background: t.color }}
              aria-hidden
            />
            <span className="font-semibold">{t.label}</span>
            <span className="opacity-60 transition-opacity group-hover:opacity-100">
              ↗
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
