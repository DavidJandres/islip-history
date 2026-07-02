import { siteConfig } from "./site";
import { locales, localizedPath, type Locale } from "@/i18n/config";

// JSON-LD builders. The site-level graph (Organization + WebSite) is rendered
// once in the root layout; the per-page builders (Person, Article, breadcrumb)
// are rendered by the individual record pages so search engines can offer rich
// results. Everything resolves against the canonical siteConfig.url.

const url = siteConfig.url;

// Absolute URL for a locale-agnostic path, e.g. abs("es", "/people/x").
function abs(locale: Locale, path: string): string {
  return new URL(localizedPath(locale, path), url).toString();
}

// The Project as an Organization, and the WebSite that points back to it by
// @id. `name` is the formal project name (`siteName`) — this is the strongest
// signal for the bold SITE-NAME line Google shows above each result, so it
// reads "Town of Islip History Project" with the seal beside it. The public
// brand ("The Islip Promise") is the alternateName and leads the page titles.
// A SearchAction lets engines expose a sitelinks search box.
export function siteJsonLd(siteName: string, locale: Locale, description?: string) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${url}#organization`,
      name: siteName,
      alternateName: siteConfig.publicName,
      url,
      ...(description ? { description } : {}),
      logo: { "@type": "ImageObject", url: `${url}/logos/town-of-islip-seal.png` },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${url}#website`,
      name: siteName,
      alternateName: siteConfig.publicName,
      url,
      ...(description ? { description } : {}),
      inLanguage: [...locales],
      publisher: { "@id": `${url}#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${abs(locale, "/search")}?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ];
}

export interface Crumb {
  name: string;
  path?: string; // locale-agnostic path; omit for the current (last) page
}

// A BreadcrumbList mirroring the visible <Breadcrumb> trail on record pages.
export function breadcrumbJsonLd(locale: Locale, crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      ...(c.path ? { item: abs(locale, c.path) } : {}),
    })),
  };
}

// A Person node for a roster page. Image is included only when a real,
// credited likeness exists (portrait is null for most historical figures).
export function personJsonLd(
  locale: Locale,
  person: {
    slug: string;
    name: string;
    role: string;
    cardText: string;
    portrait: { src: string } | null;
  },
) {
  const page = abs(locale, `/people/${person.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: person.role,
    description: person.cardText,
    url: page,
    mainEntityOfPage: page,
    ...(person.portrait
      ? { image: new URL(person.portrait.src, url).toString() }
      : {}),
  };
}

// An Article node for an exhibit panel, tied back to the site graph.
export function exhibitPanelJsonLd(
  locale: Locale,
  panel: { slug: string; title: string; summary: string },
) {
  const page = abs(locale, `/exhibit/${panel.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: panel.title,
    description: panel.summary,
    inLanguage: locale,
    url: page,
    mainEntityOfPage: page,
    isPartOf: { "@id": `${url}#website` },
    publisher: { "@id": `${url}#organization` },
  };
}
