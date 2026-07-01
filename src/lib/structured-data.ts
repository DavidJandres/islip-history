import { siteConfig } from "./site";
import { locales } from "@/i18n/config";

// JSON-LD describing the site: the Project as an Organization, and the WebSite
// that points back to it by @id. Rendered once in the root layout. A search
// action is intentionally omitted until on-site search actually works.
export function siteJsonLd(siteName: string) {
  const url = siteConfig.url;

  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${url}#organization`,
      name: siteName,
      url,
      logo: { "@type": "ImageObject", url: `${url}/logos/town-of-islip-seal.png` },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${url}#website`,
      name: siteName,
      url,
      inLanguage: [...locales],
      publisher: { "@id": `${url}#organization` },
    },
  ];
}
