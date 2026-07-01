"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { SearchDialog } from "./search-dialog";

function isEditable(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  if (!el) return false;
  return (
    el.tagName === "INPUT" ||
    el.tagName === "TEXTAREA" ||
    el.tagName === "SELECT" ||
    el.isContentEditable
  );
}

// The masthead search entry. Renders as a real link to /search so it works
// with JavaScript disabled; when JS is on, it opens the search dialog instead.
export function HeaderSearch({
  locale,
  dict,
  searchHref,
}: {
  locale: Locale;
  dict: Dictionary;
  searchHref: string;
}) {
  const c = dict.common;
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLAnchorElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "/" && !isEditable(e.target)) {
        e.preventDefault();
        setOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <a
        ref={triggerRef}
        href={searchHref}
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
        aria-haspopup="dialog"
        className="inline-flex items-center gap-2 rounded-sm border border-line px-3.5 py-2
          text-sm font-semibold text-blue transition-colors hover:border-blue hover:bg-white"
      >
        <Search aria-hidden="true" className="h-4 w-4" />
        <span className="hidden sm:inline">{c.searchFull}</span>
        <span className="sm:sr-only">{c.search}</span>
      </a>
      <SearchDialog open={open} onClose={close} locale={locale} dict={dict} />
    </>
  );
}
