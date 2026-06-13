import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AtomEons Systems Laboratory",
    short_name: "AtomEons",
    description:
      "Solo-operator AI lab · Orange³ sovereign agentic OS · AI Bookmaker publishing cockpit · I Am AI book + audiobook · all free always · §4A no-SaaS.",
    start_url: "/",
    display: "standalone",
    background_color: "#08090B",
    theme_color: "#22F0D5",
    icons: [
      { src: "/icon", sizes: "64x64", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
