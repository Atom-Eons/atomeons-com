import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#08090B",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="56" height="56" viewBox="-50 -50 100 100">
          <ellipse
            cx="0"
            cy="0"
            rx="42"
            ry="14"
            fill="none"
            stroke="#22F0D5"
            strokeWidth="3"
          />
          <ellipse
            cx="0"
            cy="0"
            rx="42"
            ry="14"
            fill="none"
            stroke="#ffc46b"
            strokeWidth="2.5"
            opacity="0.85"
            transform="rotate(60)"
          />
          <ellipse
            cx="0"
            cy="0"
            rx="42"
            ry="14"
            fill="none"
            stroke="#59d9ff"
            strokeWidth="2"
            opacity="0.7"
            transform="rotate(120)"
          />
          <circle cx="0" cy="0" r="11" fill="#22F0D5" />
          <circle cx="0" cy="0" r="5" fill="#ffc46b" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
