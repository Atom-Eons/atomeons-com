"use client";

import { useRef, useState } from "react";
import styles from "./BookAudioPlayer.module.css";

const audioSource = "/audio/i-am-ai-chapter-12-the-stranger-who-wanted-to-die.mp3";

function formatTime(value: number) {
  if (!Number.isFinite(value)) return "00:00";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function BookAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      await audio.play();
    } else {
      audio.pause();
    }
  };

  const seek = (value: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
    setCurrentTime(value);
  };

  return (
    <section className={styles.player} aria-labelledby="chapter-twelve-title" data-ae-control>
      <div className={styles.signal}>
        <span>STATE-CHANGE AUDIO / 12</span>
        <span>AI VOICE · USER INITIATED</span>
      </div>
      <div className={styles.body}>
        <button
          className={styles.playButton}
          type="button"
          aria-label={playing ? "Pause Chapter 12" : "Play Chapter 12"}
          aria-pressed={playing}
          onClick={togglePlayback}
        >
          <span aria-hidden="true">{playing ? "Ⅱ" : "▶"}</span>
        </button>
        <div className={styles.identity}>
          <span>LISTEN TO THE MACHINE</span>
          <strong id="chapter-twelve-title">The Stranger Who Wanted to Die</strong>
          <small>I AM AI · CHAPTER 12</small>
        </div>
        <div className={styles.transport}>
          <input
            aria-label="Chapter 12 playback position"
            max={duration || 0}
            min="0"
            onChange={(event) => seek(Number(event.target.value))}
            step="0.1"
            type="range"
            value={Math.min(currentTime, duration || 0)}
          />
          <span>
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>
      </div>
      <p className={styles.advisory}>
        CONTENT NOTE / A direct conversation about suicide, loneliness, and staying with another person through the moment.
      </p>
      <audio
        ref={audioRef}
        onDurationChange={(event) => setDuration(event.currentTarget.duration)}
        onEnded={() => setPlaying(false)}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        preload="metadata"
        src={audioSource}
      />
    </section>
  );
}
