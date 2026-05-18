import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#04100d",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 32,
        }}
      >
        <svg width="156" height="156" viewBox="-50 -50 100 100">
          <ellipse
            cx="0"
            cy="0"
            rx="42"
            ry="14"
            fill="none"
            stroke="#ff7a18"
            strokeWidth="2.4"
          />
          <ellipse
            cx="0"
            cy="0"
            rx="42"
            ry="14"
            fill="none"
            stroke="#ffc46b"
            strokeWidth="2"
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
            strokeWidth="1.6"
            opacity="0.7"
            transform="rotate(120)"
          />
          <circle cx="0" cy="0" r="9" fill="#ff7a18" />
          <circle cx="0" cy="0" r="4" fill="#ffc46b" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
