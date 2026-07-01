"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { localizedPath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { SearchResult } from "@/lib/search/types";
import { SearchResultItem } from "./search-result-item";

const DIALOG_LIMIT = 8;
const LIST_ID = "site-search-listbox";
const optionId = (i: number) => `site-search-option-${i}`;

type RunSearch = (
  locale: Locale,
  query: string,
  limit?: number,
) => SearchResult[];

export function SearchDialog({
  open,
  onClose,
  locale,
  dict,
}: {
  open: boolean;
  onClose: () => void;
  locale: Locale;
  dict: Dictionary;
}) {
  const c = dict.common;
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);

  const runRef = useRef<RunSearch | null>(null);
  const queryRef = useRef("");
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  queryRef.current = query;

  const compute = useCallback(
    (q: string) => {
      const fn = runRef.current;
      const trimmed = q.trim();
      if (!fn || !trimmed) {
        setResults([]);
        setActive(0);
        return;
      }
      setResults(fn(locale, trimmed, DIALOG_LIMIT));
      setActive(0);
    },
    [locale],
  );

  // Lazy-load the index the first time the dialog opens.
  useEffect(() => {
    if (!open || runRef.current) return;
    let cancelled = false;
    setLoading(true);
    import("@/lib/search")
      .then((mod) => {
        if (cancelled) return;
        runRef.current = mod.runSearch;
        setLoading(false);
        compute(queryRef.current);
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [open, compute]);

  // Focus the input on open; lock scroll; reset on close.
  useEffect(() => {
    if (open) {
      const id = requestAnimationFrame(() => inputRef.current?.focus());
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        cancelAnimationFrame(id);
        document.body.style.overflow = prevOverflow;
      };
    }
    setQuery("");
    setResults([]);
    setActive(0);
  }, [open]);

  // Keep the active option scrolled into view.
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>('[data-active="true"]');
    el?.scrollIntoView({ block: "nearest" });
  }, [active, results]);

  const goToResultsPage = useCallback(() => {
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`${localizedPath(locale, "/search")}?q=${encodeURIComponent(trimmed)}`);
    onClose();
  }, [query, locale, router, onClose]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (results.length ? Math.min(i + 1, results.length - 1) : 0));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const chosen = results[active];
      if (chosen) {
        // Click the active result's link so Enter navigates exactly like a
        // mouse click, including scrolling to the target's #anchor. (router.push
        // does not scroll to a hash.) The link's onClick closes the dialog.
        document.getElementById(optionId(active))?.click();
      } else {
        goToResultsPage();
      }
      return;
    }
    if (e.key === "Tab") {
      // Minimal focus trap: keep focus within the panel.
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input',
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  if (!open) return null;

  const trimmed = query.trim();
  const showEmpty = trimmed.length > 0 && !loading && results.length === 0;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center px-4 pt-[10vh]"
      role="presentation"
      onMouseDown={onClose}
    >
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-[1px]" aria-hidden="true" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={c.searchDialogTitle}
        className="relative flex max-h-[80vh] w-full max-w-2xl flex-col overflow-hidden rounded-sm border border-line bg-paper shadow-xl"
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <Search aria-hidden="true" className="h-5 w-5 shrink-0 text-muted" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              compute(e.target.value);
            }}
            placeholder={c.searchPlaceholder}
            aria-label={c.searchDialogTitle}
            role="combobox"
            aria-expanded={results.length > 0}
            aria-controls={LIST_ID}
            aria-activedescendant={results.length ? optionId(active) : undefined}
            aria-autocomplete="list"
            autoComplete="off"
            spellCheck={false}
            className="w-full bg-transparent text-base text-ink outline-none placeholder:text-muted"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label={c.close}
            className="shrink-0 rounded-sm p-1 text-muted transition-colors hover:bg-white hover:text-ink"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>

        <div ref={listRef} className="min-h-0 flex-1 overflow-y-auto p-2">
          {!trimmed && (
            <p className="px-3 py-6 text-center text-sm text-muted">
              {c.searchStartHint}
            </p>
          )}
          {trimmed && loading && (
            <p className="px-3 py-6 text-center text-sm text-muted">
              {c.searchLoading}
            </p>
          )}
          {showEmpty && (
            <div className="px-3 py-8 text-center">
              <p className="font-heading text-base font-bold text-ink">
                {c.searchNoResults}
              </p>
              <p className="mt-1 text-sm text-muted">{c.searchNoResultsHint}</p>
            </div>
          )}
          {results.length > 0 && (
            <div role="listbox" id={LIST_ID} aria-label={c.searchDialogTitle} className="space-y-1">
              {results.map((result, i) => (
                <SearchResultItem
                  key={result.doc.id}
                  result={result}
                  asOption
                  optionId={optionId(i)}
                  active={i === active}
                  onSelect={onClose}
                />
              ))}
            </div>
          )}
        </div>

        {results.length > 0 && (
          <div className="flex items-center justify-between border-t border-line px-4 py-2.5 text-xs text-muted">
            <Link
              href={`${localizedPath(locale, "/search")}?q=${encodeURIComponent(trimmed)}`}
              onClick={onClose}
              className="font-semibold text-blue hover:underline"
            >
              {c.searchViewAll}
            </Link>
            <span className="hidden sm:flex items-center gap-3">
              <kbd className="rounded border border-line bg-white px-1.5 py-0.5 font-sans">↑↓</kbd>
              <kbd className="rounded border border-line bg-white px-1.5 py-0.5 font-sans">↵</kbd>
              <kbd className="rounded border border-line bg-white px-1.5 py-0.5 font-sans">esc</kbd>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
