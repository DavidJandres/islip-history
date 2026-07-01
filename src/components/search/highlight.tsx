import type { ReactNode } from "react";
import type { MatchRange } from "@/lib/search/types";

// Render `text`, wrapping the given character ranges in <mark>. Ranges are
// clamped and applied left-to-right so overlaps or out-of-bounds values from
// the engine can never throw.
export function Highlight({
  text,
  ranges,
}: {
  text: string;
  ranges: MatchRange[];
}) {
  if (!ranges || ranges.length === 0) return <>{text}</>;
  const sorted = [...ranges].sort((a, b) => a.start - b.start);
  const nodes: ReactNode[] = [];
  let cursor = 0;
  sorted.forEach((range, i) => {
    const start = Math.max(cursor, range.start);
    const end = Math.max(start, Math.min(range.end, text.length));
    if (start > cursor) nodes.push(text.slice(cursor, start));
    if (end > start) {
      nodes.push(
        <mark key={i} className="rounded-[1px] bg-gold/30 px-0.5 text-ink">
          {text.slice(start, end)}
        </mark>,
      );
    }
    cursor = Math.max(cursor, end);
  });
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return <>{nodes}</>;
}
