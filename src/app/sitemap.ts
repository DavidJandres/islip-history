import type { MetadataRoute } from "next";
import { siteConfig, primaryNav } from "@/lib/site";
import { exhibitPanelPaths } from "@/lib/exhibit";
import { peoplePaths } from "@/lib/people";
import { locales, defaultLocale, localizedPath } from "@/i18n/config";

// Every static route in every locale, with hreflang alternates. Dynamic record
// routes get appended here once the Explore collections exist.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = new Set<string>(["/"]);
  for (const item of primaryNav) {
    paths.add(item.href);
    for (const child of item.children ?? []) paths.add(child.href);
  }
  // The exhibit's individual panels are statically generated but not in the nav.
  for (const path of exhibitPanelPaths) paths.add(path);
  // Each person has their own statically-generated page, also not in the nav.
  for (const path of peoplePaths) paths.add(path);

  const url = (loc: (typeof locales)[number], path: string) =>
    new URL(localizedPath(loc, path), siteConfig.url).toString();

  return [...paths].flatMap((path) => {
    const languages: Record<string, string> = { "x-default": url(defaultLocale, path) };
    for (const loc of locales) languages[loc] = url(loc, path);
    return locales.map((loc) => ({ url: url(loc, path), alternates: { languages } }));
  });
}
