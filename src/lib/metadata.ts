import type { Metadata } from "next";
import { siteConfig } from "./site";
import { locales, defaultLocale, localizedPath, type Locale } from "@/i18n/config";

interface PageMetaInput {
  locale: Locale;
  description: string;
  siteName: string;
  title?: string; // omit for the home page
  path?: string; // locale-agnostic, e.g. "/about"
}

// Builds title, canonical, and hreflang alternates (including x-default) for a
// page, so translations aren't treated as duplicates and search engines serve
// the right language.
export function buildMetadata({
  locale,
  title,
  description,
  siteName,
  path = "/",
}: PageMetaInput): Metadata {
  const fullTitle = title ? `${title} · ${siteName}` : siteName;
  const url = (loc: Locale) =>
    new URL(localizedPath(loc, path), siteConfig.url).toString();

  const languages: Record<string, string> = { "x-default": url(defaultLocale) };
  for (const loc of locales) languages[loc] = url(loc);

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url(locale), languages },
    openGraph: {
      title: fullTitle,
      description,
      url: url(locale),
      siteName,
      type: "website",
      locale: locale === "es" ? "es_419" : "en_US",
    },
    // summary, not summary_large_image: we don't ship an OG image yet, so don't
    // advertise one. Revisit when a 1200x630 card exists.
    twitter: { card: "summary", title: fullTitle, description },
  };
}
