import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

// Web app manifest: names the site for install prompts, Android chrome, and
// any platform that reads it for site identity. Colors match the paper
// background used everywhere (including the black-flash fix).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.publicName,
    short_name: siteConfig.shortName,
    description:
      "A public history exhibit and digital archive exploring Islip, Long Island, from early town records through the American Revolution and beyond.",
    start_url: "/",
    display: "browser",
    background_color: "#faf8f5",
    theme_color: "#faf8f5",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
