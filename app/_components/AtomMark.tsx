type Props = {
  size?: number;
  className?: string;
  /** seconds for one full revolution of the slowest orbit */
  speed?: number;
};

/**
 * Spinning AtomMark — three elliptical orbits rotating at different speeds,
 * a glowing nucleus, faint trail. Sized via the `size` prop.
 */
export function AtomMark({ size = 32, className = "", speed = 8 }: Props) {
  const fast = speed * 0.6;
  const med = speed;
  const slow = speed * 1.6;
  return (
    <svg
      viewBox="-50 -50 100 100"
      width={size}
      height={size}
      className={className}
      aria-label="AtomEons mark"
      role="img"
    >
      <defs>
        <radialGradient id="atom-nucleus-glow" cx="0" cy="0" r="50%">
          <stop offset="0%" stopColor="#ffc46b" stopOpacity="1" />
          <stop offset="60%" stopColor="#ff7a18" stopOpacity="1" />
          <stop offset="100%" stopColor="#ff7a18" stopOpacity="0" />
        </radialGradient>
        <filter id="atom-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* slow orbit — orange */}
      <g
        style={{
          transformOrigin: "center",
          animation: `atom-spin ${slow}s linear infinite`,
        }}
      >
        <ellipse
          cx="0"
          cy="0"
          rx="42"
          ry="14"
          fill="none"
          stroke="#ff7a18"
          strokeWidth="1.4"
          opacity="0.85"
          filter="url(#atom-glow)"
        />
        <circle cx="42" cy="0" r="2.2" fill="#ffc46b" filter="url(#atom-glow)" />
      </g>

      {/* mid orbit — amber, opposite direction */}
      <g
        style={{
          transformOrigin: "center",
          transform: "rotate(60deg)",
          animation: `atom-spin-reverse ${med}s linear infinite`,
        }}
      >
        <ellipse
          cx="0"
          cy="0"
          rx="42"
          ry="14"
          fill="none"
          stroke="#ffc46b"
          strokeWidth="1.2"
          opacity="0.7"
        />
        <circle cx="42" cy="0" r="1.8" fill="#75ff92" />
      </g>

      {/* fast orbit — blue */}
      <g
        style={{
          transformOrigin: "center",
          transform: "rotate(120deg)",
          animation: `atom-spin ${fast}s linear infinite`,
        }}
      >
        <ellipse
          cx="0"
          cy="0"
          rx="42"
          ry="14"
          fill="none"
          stroke="#59d9ff"
          strokeWidth="1"
          opacity="0.55"
        />
        <circle cx="42" cy="0" r="1.5" fill="#59d9ff" />
      </g>

      {/* nucleus */}
      <circle cx="0" cy="0" r="9" fill="url(#atom-nucleus-glow)" />
      <circle cx="0" cy="0" r="4" fill="#ffc46b" filter="url(#atom-glow)" />
    </svg>
  );
}
