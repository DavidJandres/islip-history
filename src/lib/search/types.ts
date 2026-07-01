// Shared search types. Kept free of any React/Next imports so the ranking
// engine can be unit-tested in isolation and bundled into a lazy client chunk.

export type SearchType = "person" | "exhibit" | "timeline" | "page";

export interface SearchDoc {
  id: string;
  type: SearchType;
  typeLabel: string; // localized badge, e.g. "People" / "Personas"
  title: string;
  subtitle?: string; // role, dates, era, panel number, etc.
  href: string;
  body?: string; // main searchable prose
  keywords?: string; // extra terms (section label, aliases, card text)
  sources?: string; // citations
}

export interface MatchRange {
  start: number; // inclusive, index into the displayed string
  end: number; // exclusive
}

export interface SearchResult {
  doc: SearchDoc;
  score: number;
  titleRanges: MatchRange[];
  snippet: { text: string; ranges: MatchRange[] } | null;
}
