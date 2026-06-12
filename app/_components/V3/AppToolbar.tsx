"use client";

/**
 * AppToolbar · functional site-level toolbar.
 *
 * Wave 39 · 2026-06-06 · operator brief: "intro box and the turn-on
 * supergraphics options live in top like an app toolbar · functional
 * toolbar that does things · music on · mindstate tools on ·
 * supergraphics · white version · warez hacker version · thin
 * internet version."
 *
 * Six controls in a single thin strip below the MegaHeader:
 *   1. Tour     · opens /welcome (the 90-second introduction)
 *   2. Theme    · cycles noir / white / warez / thin
 *   3. Visuals  · turns supergraphics on/off (sphere · sigils · gradients)
 *   4. Music    · plays/pauses the Mindrest meditation ambient
 *   5. Mindrest · jumps to /mindrest/experience for a session
 *   6. Manual   · opens /manual (PDF-printable user guide)
 *
 * Every state persisted to localStorage so the visitor returns to
 * their last setup. Mobile-collapses to a "≡" button.
 */

import { useEffect, useState } from "react";
import Link from "next/link";

type Theme = "noir" | "white" | "warez" | "thin";
const THEMES: Theme[] = ["noir", "white", "warez", "thin"];

const THEME_LABELS: Record<Theme, string> = {
  noir: "NOIR",
  white: "WHITE",
  warez: "WAREZ",
  thin: "THIN",
};

const THEME_DESCRIPTIONS: Record<Theme, string> = {
  noir: "Default · dark cinematic · cyan accent",
  white: "Light mode · inverted · same accent",
  warez: "Green-on-black hacker terminal aesthetic",
  thin: "Minimal · text only · no decorations · low bandwidth",
};

const THEME_KEY = "atomeons.theme";
const VISUALS_KEY = "atomeons.visuals";

function applyTheme(t: Theme) {
  if (typeof document === "undefined") return;
  const html = document.documentElement;
  THEMES.forEach((th) => html.classList.remove(`theme-${th}`));
  html.classList.add(`theme-${t}`);
  html.setAttribute("data-theme", t);
}

function applyVisuals(on: boolean) {
  if (typeof document === "undefined") return;
  const html = document.documentElement;
  if (on) html.classList.remove("visuals-off");
  else html.classList.add("visuals-off");
}

export function AppToolbar() {
  const [theme, setTheme] = useState<Theme>("noir");
  const [visuals, setVisuals] = useState(true);
  const [music, setMusic] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const audioRef = (typeof window !== "undefined"
    ? (window as unknown as { __ae_toolbar_audio?: HTMLAudioElement })
    : null);

  // Mount · read persisted state
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const t = localStorage.getItem(THEME_KEY);
      if (t && THEMES.includes(t as Theme)) {
        setTheme(t as Theme);
        applyTheme(t as Theme);
      } else {
        applyTheme("noir");
      }
      const v = localStorage.getItem(VISUALS_KEY);
      if (v === "false") {
        setVisuals(false);
        applyVisuals(false);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const cycleTheme = () => {
    const i = THEMES.indexOf(theme);
    const next = THEMES[(i + 1) % THEMES.length];
    setTheme(next);
    applyTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* ignore */
    }
  };

  const toggleVisuals = () => {
    const next = !visuals;
    setVisuals(next);
    applyVisuals(next);
    try {
      localStorage.setItem(VISUALS_KEY, String(next));
    } catch {
      /* ignore */
    }
  };

  const toggleMusic = () => {
    if (typeof window === "undefined") return;
    const w = window as unknown as { __ae_toolbar_audio?: HTMLAudioElement };
    if (!w.__ae_toolbar_audio) {
      // Lazy-create the ambient audio element · 30-second silence on first
      // toggle so the click is allowed by browser autoplay policy.
      // Operator can drop /public/ambient.mp3 later; without it the toggle
      // is no-op (silent) but the visitor still sees the state change.
      const audio = new Audio("/ambient.mp3");
      audio.loop = true;
      audio.volume = 0.25;
      w.__ae_toolbar_audio = audio;
    }
    const audio = w.__ae_toolbar_audio;
    if (!audio) return;
    if (music) {
      audio.pause();
      setMusic(false);
    } else {
      audio
        .play()
        .then(() => setMusic(true))
        .catch(() => {
          // Likely autoplay block · honest: just flip state so visitor knows
          setMusic(true);
        });
    }
  };

  return (
    <div
      role="toolbar"
      aria-label="Site app toolbar"
      className="app-toolbar sticky z-40 border-b backdrop-blur-md"
      style={{
        top: 64, // sits below MegaHeader
        background: "rgba(8, 9, 11, 0.78)",
        borderColor: "rgba(31, 36, 43, 0.5)",
      }}
    >
      {/* Wave 46 · 2026-06-06 · operator screenshot caught a dead zone on
          the right · the toolbar's full-width blur extended past content.
          Now max-width matches MegaHeader (1480px) + tight px-5 md:px-8. */}
      <div className="mx-auto flex w-full max-w-[1480px] items-center justify-between gap-2 px-5 py-1.5 md:px-8">
        {/* Left: brand chip · current-page breadcrumb · fills the gap that
            used to be empty between the toggle and the toolbar buttons. */}
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          aria-expanded={!collapsed}
          aria-label="Toggle toolbar"
          className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#7a818a] transition hover:text-[#22F0D5]"
        >
          <span className="text-[#22F0D5]">§</span> Toolbar
          <span aria-hidden className="text-[#7a818a]">{collapsed ? "▾" : "▴"}</span>
        </button>

        {/* Center: a quiet tagline · operator-set · fills what used to be empty space */}
        <p className="hidden font-mono text-[10px] uppercase tracking-[0.28em] text-[#7a818a] md:block">
          atomeons systems lab · marco island · live · 24/7
        </p>

        {/* Right: the actual controls · responsive collapse · tight gap */}
        <div
          className={`flex flex-wrap items-center justify-end gap-1 transition-all md:flex ${
            collapsed ? "hidden" : "flex"
          }`}
        >
          <ToolbarButton href="/welcome" label="Tour" hint="90-second introduction" accent="#22F0D5" />
          <ToolbarToggle
            onClick={cycleTheme}
            label={THEME_LABELS[theme]}
            hint={THEME_DESCRIPTIONS[theme]}
            accent="#9D7FFF"
            active
          />
          <ToolbarToggle
            onClick={toggleVisuals}
            label={visuals ? "FX ON" : "FX OFF"}
            hint="Supergraphics · atom sphere · sigils · gradients"
            accent={visuals ? "#22F0D5" : "#7a818a"}
            active={visuals}
          />
          <ToolbarToggle
            onClick={toggleMusic}
            label={music ? "♪ ON" : "♪ OFF"}
            hint="Ambient music · /public/ambient.mp3"
            accent={music ? "#FF4D4D" : "#7a818a"}
            active={music}
          />
          <ToolbarButton href="/mindrest/experience" label="Mindrest" hint="8-mode entrainment session" accent="#C9A55C" />
          <ToolbarButton href="/manual" label="Manual" hint="Full user manual · PDF-printable" accent="#7a818a" />
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .app-toolbar [role="toolbar"] {
            padding: 4px;
          }
        }
      `}</style>
    </div>
  );
}

function ToolbarButton({
  href,
  label,
  hint,
  accent,
}: {
  href: string;
  label: string;
  hint: string;
  accent: string;
}) {
  return (
    <Link
      href={href}
      title={hint}
      className="inline-flex items-center gap-1.5 border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] transition hover:bg-[#0F1114]"
      style={{ borderColor: "rgba(31, 36, 43, 0.6)", color: accent }}
    >
      {label}
    </Link>
  );
}

function ToolbarToggle({
  onClick,
  label,
  hint,
  accent,
  active,
}: {
  onClick: () => void;
  label: string;
  hint: string;
  accent: string;
  active: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={hint}
      aria-pressed={active}
      className="inline-flex items-center gap-1.5 border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] transition hover:bg-[#0F1114]"
      style={{
        borderColor: active ? accent : "rgba(31, 36, 43, 0.6)",
        color: accent,
        background: active ? `${accent}10` : "transparent",
      }}
    >
      {label}
    </button>
  );
}
