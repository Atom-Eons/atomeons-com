"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import styles from "./cablebox.module.css";

const signals = [
  {
    src: "/cablebox-premiere/hero-active.webp",
    label: "FEATURE PRESENTATION",
    detail: "CHANNEL 03 / BIG MODE",
  },
  {
    src: "/cablebox-premiere/theme-space.webp",
    label: "DEEP SPACE",
    detail: "CABINET 03 / GOOD SIGNAL",
  },
  {
    src: "/cablebox-premiere/theme-gatsby.webp",
    label: "GATSBY",
    detail: "CABINET 09 / GOOD SIGNAL",
  },
  {
    src: "/cablebox-premiere/theme-underwater.webp",
    label: "UNDERWATER",
    detail: "CABINET 06 / GOOD SIGNAL",
  },
  {
    src: "/cablebox-premiere/theme-patchouli.webp",
    label: "PATCHOULI",
    detail: "CABINET 07 / GOOD SIGNAL",
  },
] as const;

export function CableboxPremiere() {
  const [channel, setChannel] = useState(0);
  const [tuning, setTuning] = useState(false);
  const swapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clearTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const tune = (nextChannel: number) => {
    if (swapTimer.current) clearTimeout(swapTimer.current);
    if (clearTimer.current) clearTimeout(clearTimer.current);

    const normalized = (nextChannel + signals.length) % signals.length;
    setTuning(true);
    swapTimer.current = setTimeout(() => setChannel(normalized), 115);
    clearTimer.current = setTimeout(() => setTuning(false), 370);
  };

  const randomSurf = () => {
    const offset = 1 + Math.floor(Math.random() * (signals.length - 1));
    tune(channel + offset);
  };

  return (
    <section
      className={`${styles.premiere} ${tuning ? styles.isTuning : ""}`}
      tabIndex={0}
      aria-label="Interactive CableBox premiere screen. Use left and right arrow keys to surf or R for random."
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          tune(channel - 1);
        }
        if (event.key === "ArrowRight" || event.key.toLowerCase() === "t") {
          event.preventDefault();
          tune(channel + 1);
        }
        if (event.key.toLowerCase() === "r") {
          event.preventDefault();
          randomSurf();
        }
      }}
    >
      <Image
        key={signals[channel].src}
        src={signals[channel].src}
        alt={`Real CableBox screen showing the ${signals[channel].label.toLowerCase()} television environment`}
        fill
        priority
        unoptimized
        sizes="100vw"
        className={styles.premiereImage}
      />
      <div className={styles.premiereShade} />
      <div className={styles.tuningNoise} aria-hidden="true" />

      <div className={styles.festivalLine}>
        <span>ATOM EONS PICTURES PRESENTS</span>
        <span>WORLD PREMIERE / WINDOWS</span>
      </div>

      <div className={styles.heroCopy}>
        <p className={styles.kicker}>A LIVING TELEVISION BY ATOM EONS</p>
        <h1>CABLEBOX</h1>
        <p className={styles.heroLine}>Turn it on. Surf.</p>
      </div>

      <div className={styles.signalHud} aria-live="polite">
        <span>{signals[channel].detail}</span>
        <strong>{signals[channel].label}</strong>
      </div>

      <div className={styles.remote}>
        <button type="button" onClick={() => tune(channel - 1)} aria-label="Previous CableBox signal">
          <kbd>←</kbd>
          <span>DOWN</span>
        </button>
        <button type="button" className={styles.randomButton} onClick={randomSurf}>
          <kbd>R</kbd>
          <span>RANDOM SURF</span>
        </button>
        <button type="button" onClick={() => tune(channel + 1)} aria-label="Next CableBox signal">
          <kbd>→</kbd>
          <span>UP</span>
        </button>
      </div>

      <div className={styles.focusNote}>CLICK THE SCREEN · THEN USE R / ← / →</div>
    </section>
  );
}
