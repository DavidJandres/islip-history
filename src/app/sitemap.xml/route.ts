import { siteConfig, primaryNav } from "@/lib/site";
import { exhibitPanelPaths } from "@/lib/exhibit";
import { peoplePaths } from "@/lib/people";
import { locales, defaultLocale, localizedPath } from "@/i18n/config";

// Explicit sitemap route handler. This replaced the Next MetadataRoute
// sitemap for one reason: browsers render stylesheet-less XML as a flat run
// of text nodes, which reads as "broken" to a human checking the URL. This
// handler emits the same standards-compliant XML (urlset/url/loc plus
// xhtml:link hreflang alternates) with an xml-stylesheet processing
// instruction pointing at /sitemap.xsl, so people see a styled, readable
// sitemap table while crawlers parse the XML exactly as before.
//
// Statically generated at build time, like every other page.
export const dynamic = "force-static";

const escapeXml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

function publicPaths(): string[] {
  const paths = new Set<string>(["/"]);
  for (const item of primaryNav) {
    paths.add(item.href);
    for (const child of item.children ?? []) paths.add(child.href);
  }
  // Statically generated record pages that are not in the nav.
  for (const path of exhibitPanelPaths) paths.add(path);
  for (const path of peoplePaths) paths.add(path);
  return [...paths];
}

export function GET(): Response {
  const abs = (loc: (typeof locales)[number], path: string) =>
    escapeXml(new URL(localizedPath(loc, path), siteConfig.url).toString());

  const entries: string[] = [];
  for (const path of publicPaths()) {
    const alternates = [
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(defaultLocale, path)}"/>`,
      ...locales.map(
        (loc) => `    <xhtml:link rel="alternate" hreflang="${loc}" href="${abs(loc, path)}"/>`,
      ),
    ].join("\n");
    for (const loc of locales) {
      entries.push(`  <url>\n    <loc>${abs(loc, path)}</loc>\n${alternates}\n  </url>`);
    }
  }

  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`,
    entries.join("\n"),
    `</urlset>`,
    ``,
  ].join("\n");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
