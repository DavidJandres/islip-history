import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pin the file-tracing root to this project so an unrelated lockfile elsewhere
  // on the machine doesn't trigger a workspace-root warning during builds.
  outputFileTracingRoot: __dirname,
  images: {
    formats: ["image/avif", "image/webp"],
    // Two partner seals (Stony Brook, SUNY Geneseo) are SVG. Allow next/image to
    // serve them, sandboxed with a strict CSP so the SVGs can't run scripts.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // All assets are local under /public; remote hosts (e.g. a future IIIF
    // endpoint for Explore) would be added here.
    remotePatterns: [],
  },
};

export default nextConfig;
