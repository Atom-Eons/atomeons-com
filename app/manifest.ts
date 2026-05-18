import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AtomEons",
    short_name: "AtomEons",
    description:
      "Private execution surfaces for one operator running serious AI-assisted projects. ORANGEBOX cockpit $1.",
    start_url: "/",
    display: "standalone",
    background_color: "#04100d",
    theme_color: "#ff7a18",
    icons: [
      { src: "/icon", sizes: "64x64", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
