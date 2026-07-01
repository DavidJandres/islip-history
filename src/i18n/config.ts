export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
};

// Languages announced but not yet published. Surfaced in the footer and the
// About page as "in preparation" so visitors know more are coming.
export const upcomingLocales = ["pl"] as const;
export const upcomingLocaleNames: Record<(typeof upcomingLocales)[number], string> = {
  pl: "Polski",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// Prefix a locale-agnostic path with the active locale: ("es", "/about") -> "/es/about".
export function localizedPath(locale: Locale, path: string): string {
  if (path === "/") return `/${locale}`;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean}`;
}

// Publishing Polish: move "pl" into `locales`, add a `localeNames` entry, and
// create a dictionaries/pl assembly. It's already announced via upcomingLocales.
