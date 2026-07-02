"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { localizedPath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { SearchResult } from "@/lib/search/types";
import { SearchResultItem } from "./search-result-item";

type RunSearch = (
  locale: Locale,
  query: string,
  limit?: number,
) => SearchResult[];

// The full /search results page. Reads ?q from the URL, keeps it in sync as the
// user types (so results are shareable and bookmarkable), and renders the
// complete ranked list. The index is loaded lazily on mount.
export function SearchPageClient({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const c = dict.common;
  const router = useRouter();
  const params = useSearchParams();
  const base = localizedPath(locale, "/search");

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const runRef = useRef<RunSearch | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const compute = useCallback(
    (q: string) => {
      const fn = runRef.current;
      const trimmed = q.trim();
      setResults(fn && trimmed ? fn(locale, trimmed) : []);
    },
    [locale],
  );

  // Load the index once, then run whatever query arrived in the URL.
  useEffect(() => {
    let cancelled = false;
    const initial = params.get("q") ?? "";
    if (initial) setQuery(initial);
    import("@/lib/search")
      .then((mod) => {
        if (cancelled) return;
        runRef.current = mod.runSearch;
        setLoading(false);
        compute(initial);
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // Run once on mount; URL updates afterwards are driven by the input.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onChange = (value: string) => {
    setQuery(value);
    compute(value);
    const trimmed = value.trim();
    router.replace(
      trimmed ? `${base}?q=${encodeURIComponent(trimmed)}` : base,
      { scroll: false },
    );
  };

  const trimmed = query.trim();
  const hasQuery = trimmed.length > 0;
  const countWord = results.length === 1 ? c.searchResultOne : c.searchResultMany;

  return (
    <>
      <form role="search" onSubmit={(e) => e.preventDefault()}>
        <div className="flex items-center gap-3 rounded-sm border border-line bg-white px-4 py-3 focus-within:border-blue">
          <Search aria-hidden="true" className="h-5 w-5 shrink-0 text-muted" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => onChange(e.target.value)}
            placeholder={c.searchPlaceholder}
            aria-label={c.searchDialogTitle}
            autoComplete="off"
            spellCheck={false}
            className="w-full bg-transparent text-base text-ink outline-none placeholder:text-muted"
          />
        </div>
      </form>

      <div className="mt-8">
        {loading && <p className="text-sm text-muted">{c.searchLoading}</p>}

        {!loading && hasQuery && (
          <p className="text-sm text-muted">
            {results.length} {countWord} {c.searchResultsFor}{" "}
            <span className="font-semibold text-ink">&ldquo;{trimmed}&rdquo;</span>
          </p>
        )}

        {!loading && hasQuery && results.length === 0 && (
          <div className="mt-6">
            <p className="font-heading text-lg font-bold text-ink">
              {c.searchNoResults}
            </p>
            <p className="mt-1 text-muted">{c.searchNoResultsHint}</p>
          </div>
        )}

        {results.length > 0 && (
          <ul className="mt-4 space-y-2">
            {results.map((result) => (
              <li key={result.doc.id}>
                <SearchResultItem result={result} query={trimmed} />
              </li>
            ))}
          </ul>
        )}

        {!loading && !hasQuery && (
          <p className="text-muted">{c.searchStartHint}</p>
        )}
      </div>
    </>
  );
}
