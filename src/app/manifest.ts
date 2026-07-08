import type { MetadataRoute } from "next";

/**
 * Web App Manifest for PWA & SEO.
 * Improves mobile search ranking signals and enables Add-to-Homescreen.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Trivllo — Hotels, Tours & Adventures",
    short_name: "Trivllo",
    description:
      "Book premium hotels, guided tours, and adventure experiences across India with Trivllo.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#015e09",
    orientation: "portrait-primary",
    categories: ["travel", "lifestyle", "shopping"],
    icons: [
      {
        src: "/trivllo-logo.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/trivllo-logo.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
