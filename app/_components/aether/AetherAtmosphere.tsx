"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { usePathname } from "next/navigation";
import styles from "./AetherAtmosphere.module.css";

type AetherTheme =
  | "trust"
  | "forge"
  | "evidence"
  | "signal"
  | "story"
  | "connection"
  | "radiance";

type Burst = {
  id: number;
  x: number;
  y: number;
};

function energyForCount(count: number) {
  if (count >= 7) return "awake";
  if (count >= 3) return "curious";
  return "quiet";
}

function themeForPath(pathname: string) {
  if (pathname.includes("radiance")) return "radiance";
  if (
    pathname === "/atom-alive" ||
    pathname.startsWith("/cinema") ||
    pathname.startsWith("/cablebox")
  ) {
    return "signal";
  }
  if (pathname.startsWith("/orange5")) return "forge";
  if (pathname.startsWith("/research")) return "evidence";
  if (
    pathname.startsWith("/bookmaker") ||
    pathname.startsWith("/i-am-ai") ||
    pathname.startsWith("/books") ||
    pathname.startsWith("/art")
  ) {
    return "story";
  }
  if (pathname.startsWith("/contact") || pathname.startsWith("/press")) return "connection";
  return "trust";
}

const themeFrequencies: Record<AetherTheme, number> = {
  trust: 540,
  forge: 440,
  evidence: 510,
  signal: 620,
  story: 392,
  connection: 480,
  radiance: 330,
};

const themeLabels: Record<AetherTheme, string> = {
  trust: "CLARITY FIELD",
  forge: "FORGE HEAT",
  evidence: "EVIDENCE GREEN",
  signal: "BROADCAST RED",
  story: "STORY WARMTH",
  connection: "DIRECT ROUTE",
  radiance: "RADIANCE ALERT",
};

export function AetherAtmosphere() {
  const pathname = usePathname();
  const [motionOn, setMotionOn] = useState(true);
  const [soundOn, setSoundOn] = useState(false);
  const [burst, setBurst] = useState<Burst | null>(null);
  const audioRef = useRef<AudioContext | null>(null);
  const theme = themeForPath(pathname) as AetherTheme;

  useEffect(() => {
    document.documentElement.dataset.aeTheme = theme;

    return () => {
      delete document.documentElement.dataset.aeTheme;
    };
  }, [theme]);

  useEffect(() => {
    const prefersCalm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const storedMotion = window.localStorage.getItem("ae-motion");
    const storedSound = window.localStorage.getItem("ae-sound");
    const storedEnergy = Number(window.sessionStorage.getItem("ae-energy") ?? 0);
    const nextMotion = storedMotion === null ? !prefersCalm : storedMotion === "on";
    const nextSound = storedSound === "on";

    setMotionOn(nextMotion);
    setSoundOn(nextSound);
    document.documentElement.dataset.aeMotion = nextMotion ? "on" : "off";
    document.documentElement.dataset.aeSound = nextSound ? "on" : "off";
    document.documentElement.dataset.aeEnergy = energyForCount(storedEnergy);
  }, []);

  const playTone = useCallback(
    (frequency = themeFrequencies[theme], echo = false) => {
      const AudioContextConstructor =
        window.AudioContext ||
        (
          window as typeof window & {
            webkitAudioContext?: typeof AudioContext;
          }
        ).webkitAudioContext;

      if (!AudioContextConstructor) return;

      const context = audioRef.current ?? new AudioContextConstructor();
      audioRef.current = context;

      if (context.state === "suspended") {
        void context.resume();
      }

      const now = context.currentTime;
      const oscillator = context.createOscillator();
      const gain = context.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(frequency, now);
      oscillator.frequency.exponentialRampToValueAtTime(frequency * 1.035, now + 0.055);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(echo ? 0.012 : 0.018, now + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.075);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(now);
      oscillator.stop(now + 0.08);
    },
    [theme],
  );

  useEffect(() => {
    let frame = 0;

    const handleGaze = (event: PointerEvent) => {
      if (!motionOn || event.pointerType === "touch") return;
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth - 0.5) * 6;
        const y = (event.clientY / window.innerHeight - 0.5) * 6;
        document.documentElement.style.setProperty("--ae-gaze-x", `${x.toFixed(2)}px`);
        document.documentElement.style.setProperty("--ae-gaze-y", `${y.toFixed(2)}px`);
        document.documentElement.style.setProperty("--ae-cursor-x", `${event.clientX.toFixed(0)}px`);
        document.documentElement.style.setProperty("--ae-cursor-y", `${event.clientY.toFixed(0)}px`);
      });
    };

    window.addEventListener("pointermove", handleGaze, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handleGaze);
      document.documentElement.style.removeProperty("--ae-gaze-x");
      document.documentElement.style.removeProperty("--ae-gaze-y");
      document.documentElement.style.removeProperty("--ae-cursor-x");
      document.documentElement.style.removeProperty("--ae-cursor-y");
    };
  }, [motionOn]);

  useEffect(() => {
    const handlePointer = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element) || !target.closest("a, button, [role='button']")) {
        return;
      }
      if (target.closest("[data-ae-control]")) return;

      const nextEnergy = Math.min(
        Number(window.sessionStorage.getItem("ae-energy") ?? 0) + 1,
        12,
      );
      window.sessionStorage.setItem("ae-energy", String(nextEnergy));
      document.documentElement.dataset.aeEnergy = energyForCount(nextEnergy);

      if (motionOn) {
        setBurst({ id: Date.now(), x: event.clientX, y: event.clientY });
      }

      if (soundOn) {
        playTone();
      }
    };

    window.addEventListener("pointerdown", handlePointer, { passive: true });
    return () => window.removeEventListener("pointerdown", handlePointer);
  }, [motionOn, playTone, soundOn]);

  const toggleSound = () => {
    const nextSound = !soundOn;
    setSoundOn(nextSound);
    document.documentElement.dataset.aeSound = nextSound ? "on" : "off";
    window.localStorage.setItem("ae-sound", nextSound ? "on" : "off");

    if (nextSound) {
      playTone(themeFrequencies[theme] * 0.84, true);
      window.setTimeout(() => playTone(themeFrequencies[theme], true), 70);
    }
  };

  const toggleMotion = () => {
    const nextMotion = !motionOn;
    setMotionOn(nextMotion);
    document.documentElement.dataset.aeMotion = nextMotion ? "on" : "off";
    window.localStorage.setItem("ae-motion", nextMotion ? "on" : "off");
  };

  return (
    <>
      <div className={styles.layer} aria-hidden="true">
        <span className={styles.gazeLens} />
        <span className={styles.spark} />
        <span className={styles.trace} />
        <span className={styles.cross} />
        <span className={`${styles.mote} ${styles.moteA}`} />
        <span className={`${styles.mote} ${styles.moteB}`} />
        <span className={styles.themeBadge}>{themeLabels[theme]}</span>
        {burst ? (
          <span
            className={styles.burst}
            key={burst.id}
            style={
              {
                "--burst-x": `${burst.x}px`,
                "--burst-y": `${burst.y - 72}px`,
              } as CSSProperties
            }
          />
        ) : null}
      </div>
      <div className={styles.controls} aria-label="Site sensory controls" data-ae-control>
        <span className={styles.controlsLabel}>SENSES</span>
        <button
          aria-label={`${motionOn ? "Disable" : "Enable"} ambient motion`}
          aria-pressed={motionOn}
          onClick={toggleMotion}
          type="button"
        >
          MOTION <b>{motionOn ? "ON" : "OFF"}</b>
        </button>
        <button
          aria-label={`${soundOn ? "Disable" : "Enable"} interaction sounds`}
          aria-pressed={soundOn}
          onClick={toggleSound}
          type="button"
        >
          SOUND <b>{soundOn ? "ON" : "OFF"}</b>
        </button>
      </div>
    </>
  );
}
