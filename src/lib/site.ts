// Identity and navigation, kept as data so the header, mobile menu, footer, and
// sitemap all read one source. Items carry a `key` (resolved to a label via
// dict.nav[key]) and a locale-agnostic href that components prefix at render.

import { peopleSections } from "./people";

// Canonical base URL, used for canonicals, hreflang, the sitemap, and JSON-LD.
// Order of preference: an explicit NEXT_PUBLIC_SITE_URL (set this to the real
// domain in production), then the URLs Vercel injects automatically, then local
// dev. This means a fresh Vercel deploy has correct absolute URLs with no config,
// while production can be pinned to a stable custom domain.
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  // Production is pinned to the real domain so the sitemap, canonicals,
  // hreflang, Open Graph, and JSON-LD can never emit *.vercel.app URLs —
  // Search Console treats those as outside the property.
  if (process.env.VERCEL_ENV === "production") return "https://theislippromise.org";
  const prod = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (prod) return `https://${prod}`;
  const preview = process.env.VERCEL_URL;
  if (preview) return `https://${preview}`;
  return "http://localhost:3000";
}

export const siteConfig = {
  url: resolveSiteUrl(),
  // The public brand for search results, social cards, and the web manifest.
  // The formal project name ("Town of Islip History Project" / its Spanish
  // form) remains the on-page heading and the schema.org alternateName.
  publicName: "The Islip Promise",
  shortName: "Islip Promise",
} as const;

export interface NavItem {
  key: string;
  href: string;
  children?: NavItem[];
  // In-page section anchors shown as a hover/expand dropdown (e.g. People by
  // category). Rendered like children, but they deep-link to `#section-<key>`
  // on the item's OWN page, so they are intentionally excluded from the sitemap
  // (which only walks `children`). Labels resolve from dict.people.sections.
  sectionKeys?: readonly string[];
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
  { key: "people", href: "/people", sectionKeys: peopleSections },
  {
    key: "timeline",
    href: "/timeline",
    children: [
      { key: "timelineMain", href: "/timeline" },
      { key: "timelineKids", href: "/timeline/kids" },
    ],
  },
  {
    key: "teach",
    href: "/teach",
    children: [
      { key: "teachLessonPlans", href: "/teach/lesson-plans" },
      { key: "teachActivities", href: "/teach/primary-source-activities" },
      { key: "teachExhibitGuide", href: "/teach/exhibit-guide" },
      { key: "teachTimelineActivities", href: "/teach/timeline-activities" },
      { key: "teachPrintables", href: "/teach/printables" },
    ],
  },
  {
    key: "research",
    href: "/research",
    children: [
      { key: "essays", href: "/research/essays" },
      { key: "occupation", href: "/research/occupation" },
      { key: "flags", href: "/research/flags" },
      { key: "militia", href: "/research/militia" },
      { key: "questions", href: "/research/questions" },
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
      { key: "faq", href: "/about/faq" },
      { key: "contact", href: "/about/contact" },
    ],
  },
];

export interface FooterGroup {
  headingKey: "exploreHeading" | "researchHeading" | "teachingHeading" | "aboutHeading";
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
      { key: "occupation", href: "/research/occupation" },
      { key: "flags", href: "/research/flags" },
      { key: "militia", href: "/research/militia" },
      { key: "questions", href: "/research/questions" },
      { key: "sources", href: "/research/sources" },
      { key: "timeline", href: "/timeline" },
      { key: "timelineKids", href: "/timeline/kids" },
      { key: "people", href: "/people" },
    ],
  },
  {
    headingKey: "teachingHeading",
    items: [
      { key: "teachLessonPlans", href: "/teach/lesson-plans" },
      { key: "teachActivities", href: "/teach/primary-source-activities" },
      { key: "teachExhibitGuide", href: "/teach/exhibit-guide" },
      { key: "teachTimelineActivities", href: "/teach/timeline-activities" },
      { key: "teachPrintables", href: "/teach/printables" },
    ],
  },
  {
    headingKey: "aboutHeading",
    items: [
      { key: "aboutProject", href: "/about" },
      { key: "aboutResearch", href: "/about/research" },
      { key: "aboutFellowship", href: "/about/fellowship" },
      { key: "faq", href: "/about/faq" },
      { key: "contact", href: "/about/contact" },
    ],
  },
];
