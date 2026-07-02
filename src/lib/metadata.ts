import type { Metadata } from "next";
import { siteConfig } from "./site";
import { locales, defaultLocale, localizedPath, type Locale } from "@/i18n/config";

interface PageMetaInput {
  locale: Locale;
  description: string;
  siteName: string;
  title?: string; // omit for the home page
  // Used verbatim as the document title when provided (the home page passes
  // its full branded title, e.g. "The Islip Promise | …").
  absoluteTitle?: string;
  path?: string; // locale-agnostic, e.g. "/about"
}

// Builds title, canonical, and hreflang alternates (including x-default) for a
// page, so translations aren't treated as duplicates and search engines serve
// the right language.
//
// Two names, two jobs — this is what a Google result shows:
//   • The bold SITE-NAME line = the formal project name (`siteName`), carried
//     by og:site_name here and by WebSite/Organization `name` in the JSON-LD.
//   • The clickable TITLE = "The Islip Promise | <page>" (brand leads), so the
//     public brand reads in every result while the site name stays the formal
//     project name.
export function buildMetadata({
  locale,
  title,
  absoluteTitle,
  description,
  siteName,
  path = "/",
}: PageMetaInput): Metadata {
  const brand = siteConfig.publicName;
  const fullTitle =
    absoluteTitle ?? `${brand} | ${title ?? siteName}`;
  const url = (loc: Locale) =>
    new URL(localizedPath(loc, path), siteConfig.url).toString();

  const languages: Record<string, string> = { "x-default": url(defaultLocale) };
  for (const loc of locales) languages[loc] = url(loc);

  return {
    title: fullTitle,
    description,
    applicationName: brand,
    alternates: { canonical: url(locale), languages },
    openGraph: {
      title: fullTitle,
      description,
      url: url(locale),
      // The formal name is the site-name line in search/social; the brand
      // leads the title above.
      siteName,
      type: "website",
      locale: locale === "es" ? "es_419" : "en_US",
      // 1200x630 brand card (public/og.png): town seal, brand, bilingual
      // tagline on the paper background. metadataBase makes the URL absolute.
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: "The Islip Promise: the Town of Islip seal beside the project name and the tagline 'Islip history, the Revolution, and a community archive'.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/og.png"],
    },
  };
}
