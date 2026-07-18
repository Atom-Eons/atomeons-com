"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./cablebox.module.css";

const guideRows = [
  { time: "NOW", title: "THE FLOORWALKER", meta: "CABLE / SILENT FEATURE" },
  { time: "NEXT", title: "ATOM BOMB · 1946", meta: "CABLE / ARCHIVE FILM" },
  { time: "+42", title: "PUBLIC ACCESS AFTER DARK", meta: "HOMEBREW / LOCAL SIGNAL" },
  { time: "+71", title: "THE RINK", meta: "CABLE / SILENT FEATURE" },
] as const;

export function CableboxDemo() {
  const [channel, setChannel] = useState<0 | 1>(0);
  const [muted, setMuted] = useState(true);
  const [controlsOpen, setControlsOpen] = useState(false);
  const [tuning, setTuning] = useState(false);
  const [clock, setClock] = useState("--:--");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const swapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clearTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const updateClock = () => {
      setClock(
        new Intl.DateTimeFormat("en-US", {
          hour: "numeric",
          minute: "2-digit",
        }).format(new Date()),
      );
    };
    updateClock();
    const timer = window.setInterval(updateClock, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = muted;
    if (channel === 1) {
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [channel, muted]);

  useEffect(
    () => () => {
      if (swapTimer.current) clearTimeout(swapTimer.current);
      if (clearTimer.current) clearTimeout(clearTimer.current);
    },
    [],
  );

  const changeChannel = () => {
    if (swapTimer.current) clearTimeout(swapTimer.current);
    if (clearTimer.current) clearTimeout(clearTimer.current);
    setControlsOpen(false);
    setTuning(true);
    swapTimer.current = setTimeout(() => {
      setChannel((current) => (current === 0 ? 1 : 0));
    }, 110);
    clearTimer.current = setTimeout(() => setTuning(false), 360);
  };

  const toggleMute = () => setMuted((current) => !current);

  return (
    <section className={styles.demoSection} id="demo">
      <div className={styles.demoHeading}>
        <div>
          <p>PLAYABLE WEB PREMIERE / TWO CHANNELS</p>
          <h2>Stop reading about it.<br /><em>Touch the television.</em></h2>
        </div>
        <p>
          A sealed taste of CableBox. One living guide. One commercial-vault
          channel. Four controls. The complete dial stays inside the Windows release.
        </p>
      </div>

      <div
        className={`${styles.demoCabinet} ${tuning ? styles.demoTuning : ""}`}
        tabIndex={0}
        aria-label="Playable CableBox two-channel demo"
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            changeChannel();
          }
          if (event.key.toLowerCase() === "m") {
            event.preventDefault();
            toggleMute();
          }
          if (event.key.toLowerCase() === "c") {
            event.preventDefault();
            setControlsOpen((current) => !current);
          }
        }}
      >
        <div className={styles.demoTopBox}>
          <strong>CABLEBOX</strong>
          <span>WEB PREVIEW</span>
          <b>0{channel}</b>
          <i aria-hidden="true" />
        </div>

        <div className={styles.demoBezel}>
          <div className={styles.demoScreen}>
            <video
              ref={videoRef}
              className={`${styles.demoVideo} ${channel === 1 ? styles.demoVideoActive : ""}`}
              src="/cablebox-premiere/demo-univac-ad.mp4"
              poster="/cablebox-premiere/demo-univac-poster.webp"
              muted={muted}
              loop
              playsInline
              preload="metadata"
              aria-label="Vintage UNIVAC commercial from the CableBox starter vault"
            />

            <div className={`${styles.guideChannel} ${channel === 0 ? styles.guideActive : ""}`}>
              <div className={styles.guideMasthead}>
                <strong>CABLEBOX GUIDE</strong>
                <span>{clock} / GOOD SIGNAL</span>
              </div>
              <div className={styles.guideNow}>
                <span>00</span>
                <div>
                  <small>YOU ARE WATCHING</small>
                  <strong>THE GUIDE CHANNEL</strong>
                </div>
                <b>LIVE</b>
              </div>
              <div className={styles.guideRows}>
                {guideRows.map((row) => (
                  <div key={row.time}>
                    <b>{row.time}</b>
                    <strong>{row.title}</strong>
                    <span>{row.meta}</span>
                  </div>
                ))}
              </div>
              <div className={styles.guideAd}>
                <span>TONIGHT / RANDOM SURF</span>
                <strong>STOP CHOOSING.<br />START FINDING.</strong>
                <small>CABLEBOX · ATOM EONS</small>
              </div>
              <div className={styles.guideTicker}>
                <span>19 ROTATING CHANNELS</span>
                <span>3 MOVIE CHANNELS</span>
                <span>3 FAVORITES</span>
                <span>LOCAL SIGNAL</span>
              </div>
            </div>

            <div className={styles.demoScanlines} aria-hidden="true" />
            <div className={styles.demoStatic} aria-hidden="true" />

            {controlsOpen && (
              <div className={styles.demoControlsOverlay}>
                <p>CABLEBOX WEB CONTROLS</p>
                <div><kbd>M</kbd><span>Mute</span></div>
                <div><kbd>C</kbd><span>Controls</span></div>
                <div><kbd>←</kbd><span>Channel Left</span></div>
                <div><kbd>→</kbd><span>Channel Right</span></div>
                <small>THE FULL RELEASE HAS THE FULL REMOTE.</small>
              </div>
            )}

            <div className={styles.demoChannelBug}>
              <span>CH 0{channel}</span>
              <strong>{channel === 0 ? "GUIDE" : "AD VAULT"}</strong>
            </div>
          </div>

          <aside className={styles.demoHardware}>
            <span>AE / AL100–IV</span>
            <button type="button" onClick={toggleMute} aria-pressed={!muted}>
              <i aria-hidden="true" />
              <b>{muted ? "MUTED" : "SOUND"}</b>
            </button>
            <div className={styles.demoKnob} aria-hidden="true"><i /></div>
            <strong>CHANNEL<br />NEXT</strong>
            <div className={styles.demoKnob} aria-hidden="true"><i /></div>
            <div className={styles.demoSpeaker} aria-hidden="true" />
            <span>AE</span>
          </aside>
        </div>

        <div className={styles.demoRemote}>
          <button type="button" onClick={toggleMute} aria-pressed={!muted}>
            <kbd>M</kbd><span>{muted ? "UNMUTE" : "MUTE"}</span>
          </button>
          <button type="button" onClick={() => setControlsOpen((current) => !current)} aria-expanded={controlsOpen}>
            <kbd>C</kbd><span>CONTROLS</span>
          </button>
          <button type="button" onClick={changeChannel}>
            <kbd>←</kbd><span>CHANNEL</span>
          </button>
          <button type="button" onClick={changeChannel}>
            <kbd>→</kbd><span>CHANNEL</span>
          </button>
        </div>
      </div>

      <div className={styles.demoFoot}>
        <span>CHANNEL 00 / LIVING GUIDE</span>
        <span>CHANNEL 01 / CURATED COMMERCIAL VAULT</span>
        <span>AUDIO BEGINS MUTED</span>
      </div>
    </section>
  );
}
