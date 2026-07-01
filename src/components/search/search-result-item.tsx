"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Highlight } from "./highlight";
import type { SearchResult } from "@/lib/search/types";

// One result row. In the dialog it behaves as an ARIA option (keyboard
// navigable); on the results page it is a plain link inside a list.
export function SearchResultItem({
  result,
  active = false,
  optionId,
  asOption = false,
  onSelect,
}: {
  result: SearchResult;
  active?: boolean;
  optionId?: string;
  asOption?: boolean;
  onSelect?: () => void;
}) {
  const { doc, titleRanges, snippet } = result;
  return (
    <Link
      href={doc.href}
      id={optionId}
      role={asOption ? "option" : undefined}
      aria-selected={asOption ? active : undefined}
      data-active={active ? "true" : undefined}
      onClick={onSelect}
      className={cn(
        "block scroll-mt-2 rounded-sm border px-4 py-3 transition-colors",
        active
          ? "border-blue bg-white"
          : "border-transparent hover:border-line hover:bg-white",
      )}
    >
      <div className="flex items-baseline gap-2">
        <span className="shrink-0 rounded-sm bg-blue/10 px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-blue">
          {doc.typeLabel}
        </span>
        <span className="font-heading text-base font-bold text-blue">
          <Highlight text={doc.title} ranges={titleRanges} />
        </span>
      </div>
      {doc.subtitle && <p className="mt-1 text-sm text-muted">{doc.subtitle}</p>}
      {snippet && (
        <p className="mt-1 text-sm leading-snug text-ink/80">
          <Highlight text={snippet.text} ranges={snippet.ranges} />
        </p>
      )}
    </Link>
  );
}
