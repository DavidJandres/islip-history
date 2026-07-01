import { notFound } from "next/navigation";
import { isLocale } from "./config";
import { getDictionary } from "./dictionaries";

// Shared prop type for every [locale] page and its generateMetadata.
export type LocaleParams = { params: Promise<{ locale: string }> };

// Resolve the locale from the route and load its dictionary. A bad locale
// 404s here so callers can trust the returned `locale` is valid.
export async function loadLocale(params: LocaleParams["params"]) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return { locale, dict: getDictionary(locale) };
}
