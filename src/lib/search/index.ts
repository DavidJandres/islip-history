// Public entry point for the search feature. Builds the index once per locale
// and caches it, so repeated queries (as the user types) are cheap. Imported
// lazily by the UI, keeping the corpus out of the initial bundle.

import type { Locale } from "@/i18n/config";
import { createIndex, search as engineSearch, type SearchIndex } from "./engine";
import { buildCorpus } from "./corpus";
import type { SearchResult } from "./types";

const cache = new Map<Locale, { index: SearchIndex; count: number }>();

function getIndex(locale: Locale) {
  let entry = cache.get(locale);
  if (!entry) {
    const docs = buildCorpus(locale);
    entry = { index: createIndex(docs), count: docs.length };
    cache.set(locale, entry);
  }
  return entry;
}

export function runSearch(
  locale: Locale,
  query: string,
  limit?: number,
): SearchResult[] {
  return engineSearch(getIndex(locale).index, query, limit ? { limit } : {});
}

/** Number of indexed documents for a locale (useful for empty-state copy). */
export function corpusSize(locale: Locale): number {
  return getIndex(locale).count;
}

export type { SearchResult } from "./types";
