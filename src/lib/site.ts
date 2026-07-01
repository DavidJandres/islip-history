// Identity and navigation, kept as data so the header, mobile menu, footer, and
// sitemap all read one source. Items carry a `key` (resolved to a label via
// dict.nav[key]) and a locale-agnostic href that components prefix at render.

// Canonical base URL, used for canonicals, hreflang, the sitemap, and JSON-LD.
// Order of preference: an explicit NEXT_PUBLIC_SITE_URL (set this to the real
// domain in production), then the URLs Vercel injects automatically, then local
// dev. This means a fresh Vercel deploy has correct absolute URLs with no config,
// while production can be pinned to a stable custom domain.
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const prod = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (prod) return `https://${prod}`;
  const preview = process.env.VERCEL_URL;
  if (preview) return `https://${preview}`;
  return "http://localhost:3000";
}

export const siteConfig = {
  url: resolveSiteUrl(),
} as const;

export interface NavItem {
  key: string;
  href: string;
  children?: NavItem[];
}

export const primaryNav: NavItem[] = [
  { key: "exhibit", href: "/exhibit" },
  {
    key: "explore",
    href: "/explore",
    children: [
      { key: "collections", href: "/explore/collections" },
      { key: "maps", href: "/explore/maps" },
      { key: "photographs", href: "/explore/photographs" },
      { key: "primarySources", href: "/explore/primary-sources" },
    ],
  },
  { key: "people", href: "/people" },
  { key: "timeline", href: "/timeline" },
  {
    key: "research",
    href: "/research",
    children: [
      { key: "essays", href: "/research/essays" },
      { key: "sources", href: "/research/sources" },
    ],
  },
  {
    key: "about",
    href: "/about",
    children: [
      { key: "aboutProject", href: "/about" },
      { key: "aboutResearch", href: "/about/research" },
      { key: "aboutFellowship", href: "/about/fellowship" },
      { key: "contact", href: "/about/contact" },
    ],
  },
];

export interface FooterGroup {
  headingKey: "exploreHeading" | "researchHeading" | "aboutHeading";
  items: { key: string; href: string }[];
}

// Stated explicitly rather than sliced out of primaryNav: the footer's shape is
// an editorial choice and shouldn't shift if the top nav is reordered. Labels
// come from dict.nav[key]; headings from dict.footer[headingKey].
export const footerNav: FooterGroup[] = [
  {
    headingKey: "exploreHeading",
    items: [
      { key: "collections", href: "/explore/collections" },
      { key: "maps", href: "/explore/maps" },
      { key: "photographs", href: "/explore/photographs" },
      { key: "primarySources", href: "/explore/primary-sources" },
    ],
  },
  {
    headingKey: "researchHeading",
    items: [
      { key: "essays", href: "/research/essays" },
      { key: "sources", href: "/research/sources" },
      { key: "timeline", href: "/timeline" },
      { key: "people", href: "/people" },
    ],
  },
  {
    headingKey: "aboutHeading",
    items: [
      { key: "aboutProject", href: "/about" },
      { key: "aboutResearch", href: "/about/research" },
      { key: "aboutFellowship", href: "/about/fellowship" },
      { key: "contact", href: "/about/contact" },
    ],
  },
];
