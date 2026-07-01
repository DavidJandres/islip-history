// A small, dependency-free ranked full-text search engine tuned for a curated
// corpus (tens of documents, not millions). It is deliberately not a naive
// substring match: it tokenizes and folds text, weights fields, tolerates
// typos with bounded edit distance, rewards prefix matches (so results update
// sensibly as you type), and ranks with a TF-IDF-style score plus coverage and
// phrase boosts. Everything here is pure and unit-testable.

import type { MatchRange, SearchDoc, SearchResult } from "./types";
import {
  foldString,
  tokenize,
  tokenizeWithPositions,
} from "./normalize";

interface Token {
  term: string;
  start: number;
  end: number;
}

interface IndexedField {
  name: string;
  weight: number;
  text: string;
  folded: string;
  tokens: Token[];
}

interface IndexedDoc {
  doc: SearchDoc;
  fields: IndexedField[];
}

export interface SearchIndex {
  docs: IndexedDoc[];
  df: Map<string, number>; // document frequency per term
  size: number;
}

// Field weights. Title matches dominate; sources contribute but never lead.
const FIELD_WEIGHTS: Record<string, number> = {
  title: 7,
  subtitle: 4,
  keywords: 3,
  typeLabel: 1.5,
  body: 1,
  sources: 0.6,
};

export function createIndex(docs: SearchDoc[]): SearchIndex {
  const indexed: IndexedDoc[] = docs.map((doc) => {
    const fields: IndexedField[] = [];
    const add = (name: string, text: string | undefined) => {
      if (!text) return;
      const trimmed = text.trim();
      if (!trimmed) return;
      fields.push({
        name,
        weight: FIELD_WEIGHTS[name] ?? 1,
        text: trimmed,
        folded: foldString(trimmed),
        tokens: tokenizeWithPositions(trimmed),
      });
    };
    add("title", doc.title);
    add("subtitle", doc.subtitle);
    add("keywords", doc.keywords);
    add("typeLabel", doc.typeLabel);
    add("body", doc.body);
    add("sources", doc.sources);
    return { doc, fields };
  });

  const df = new Map<string, number>();
  for (const idoc of indexed) {
    const seen = new Set<string>();
    for (const field of idoc.fields) {
      for (const tok of field.tokens) seen.add(tok.term);
    }
    for (const term of seen) df.set(term, (df.get(term) ?? 0) + 1);
  }

  return { docs: indexed, df, size: indexed.length };
}

/** Bounded Levenshtein distance; returns max+1 once it's provably over budget. */
function boundedLevenshtein(a: string, b: string, max: number): number {
  const al = a.length;
  const bl = b.length;
  if (Math.abs(al - bl) > max) return max + 1;
  let prev: number[] = Array.from({ length: bl + 1 }, (_, j) => j);
  for (let i = 1; i <= al; i++) {
    const cur: number[] = [i];
    let rowMin = i;
    const ac = a.charCodeAt(i - 1);
    for (let j = 1; j <= bl; j++) {
      const cost = ac === b.charCodeAt(j - 1) ? 0 : 1;
      const v = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
      cur.push(v);
      if (v < rowMin) rowMin = v;
    }
    if (rowMin > max) return max + 1;
    prev = cur;
  }
  return prev[bl];
}

/** How well a query token matches a document token: 0 (no match) .. 1 (exact). */
function matchWeight(query: string, target: string): number {
  if (target === query) return 1;
  // Prefix: "isl" -> "islip". Slightly discounted, more so for very partial hits.
  if (query.length >= 2 && target.startsWith(query)) {
    const ratio = query.length / target.length;
    return 0.7 + 0.2 * ratio;
  }
  // Typo tolerance scales with token length so short words aren't over-matched.
  const maxDist = query.length >= 8 ? 2 : query.length >= 4 ? 1 : 0;
  if (maxDist > 0) {
    const dist = boundedLevenshtein(query, target, maxDist);
    if (dist <= maxDist) return dist === 1 ? 0.55 : 0.4;
  }
  return 0;
}

function idf(index: SearchIndex, term: string): number {
  const df = index.df.get(term) ?? 0;
  // +0.3 floor so unknown query terms (matched only fuzzily) still contribute.
  return Math.log(1 + index.size / (df + 1)) + 0.3;
}

function collectRanges(field: IndexedField, queryTokens: string[]): MatchRange[] {
  const ranges: MatchRange[] = [];
  for (const tok of field.tokens) {
    if (queryTokens.some((q) => matchWeight(q, tok.term) > 0)) {
      ranges.push({ start: tok.start, end: tok.end });
    }
  }
  return ranges;
}

const SNIPPET_BEFORE = 70;
const SNIPPET_LENGTH = 210;

function buildSnippet(
  field: IndexedField,
  queryTokens: string[],
): { text: string; ranges: MatchRange[] } | null {
  const matched = field.tokens.filter((tok) =>
    queryTokens.some((q) => matchWeight(q, tok.term) > 0),
  );
  if (matched.length === 0) return null;

  const first = matched[0];
  let start = Math.max(0, first.start - SNIPPET_BEFORE);
  let end = Math.min(field.text.length, start + SNIPPET_LENGTH);
  // Snap to word boundaries so we don't slice mid-word.
  if (start > 0) {
    const space = field.text.indexOf(" ", start);
    if (space !== -1 && space < first.start) start = space + 1;
  }
  if (end < field.text.length) {
    const space = field.text.lastIndexOf(" ", end);
    if (space > first.end) end = space;
  }

  const prefix = start > 0 ? "\u2026 " : "";
  const suffix = end < field.text.length ? " \u2026" : "";
  const offset = prefix.length;
  const ranges = matched
    .filter((tok) => tok.start >= start && tok.end <= end)
    .map((tok) => ({
      start: tok.start - start + offset,
      end: tok.end - start + offset,
    }));

  return { text: prefix + field.text.slice(start, end) + suffix, ranges };
}

export interface SearchOptions {
  limit?: number;
}

export function search(
  index: SearchIndex,
  rawQuery: string,
  options: SearchOptions = {},
): SearchResult[] {
  const queryTokens = tokenize(rawQuery);
  if (queryTokens.length === 0) return [];
  const queryFolded = foldString(rawQuery).trim();

  const results: SearchResult[] = [];

  for (const idoc of index.docs) {
    let score = 0;
    let matchedCount = 0;

    for (const qt of queryTokens) {
      const weight = idf(index, qt);
      let best = 0;
      for (const field of idoc.fields) {
        for (const tok of field.tokens) {
          const w = matchWeight(qt, tok.term);
          if (w > 0) {
            const contribution = w * field.weight;
            if (contribution > best) best = contribution;
          }
        }
      }
      if (best > 0) {
        matchedCount++;
        score += best * weight;
      }
    }

    if (matchedCount === 0) continue;

    // Coverage: strongly prefer documents that match more of the query.
    const coverage = matchedCount / queryTokens.length;
    score *= 0.35 + 0.65 * coverage;

    // Phrase boost: the whole query appears verbatim (folded) in a field.
    if (queryFolded.length >= 3) {
      for (const field of idoc.fields) {
        if (field.folded.includes(queryFolded)) {
          score += field.weight * 0.5;
          break;
        }
      }
    }

    // Highlight ranges: title first, then the best field for a snippet.
    const titleField = idoc.fields.find((f) => f.name === "title");
    const titleRanges = titleField
      ? collectRanges(titleField, queryTokens)
      : [];

    let snippet: SearchResult["snippet"] = null;
    for (const name of ["body", "subtitle", "keywords", "sources"]) {
      const field = idoc.fields.find((f) => f.name === name);
      if (field) {
        snippet = buildSnippet(field, queryTokens);
        if (snippet) break;
      }
    }

    results.push({ doc: idoc.doc, score, titleRanges, snippet });
  }

  results.sort(
    (a, b) => b.score - a.score || a.doc.title.localeCompare(b.doc.title),
  );

  return options.limit ? results.slice(0, options.limit) : results;
}
