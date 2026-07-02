// Destination-side exact-match location: the algorithm behind "Ctrl+F"
// behavior for search results. The search index finds the right DOCUMENT; this
// module finds the right WORDS inside the destination text so the UI can
// highlight them and scroll the first relevant one into view.
//
// Design goals, in order:
//   1. Deterministic and pure — unit-testable with no DOM.
//   2. Case- and diacritic-insensitive (same folding as the index), so what
//      matched in the index can be found again on the page.
//   3. Phrase-first: if the whole query appears (whitespace-tolerant), those
//      occurrences win. Otherwise fall back to per-token matches and pick the
//      densest window — the spot where the most distinct query words cluster —
//      as the scroll target. This scales to much longer texts: one linear scan.
//   4. Empty result (null) means "no exact match": callers keep the existing
//      card-anchor scroll as the fallback, so behavior never regresses.

import { foldWithMap, tokenize } from "./normalize";

export interface TargetRange {
  start: number;
  end: number;
}

export interface TextMatches {
  /** All match ranges in ORIGINAL string coordinates, sorted, non-overlapping. */
  ranges: TargetRange[];
  /** Index into `ranges` of the best scroll target. */
  best: number;
  /** True when the best target is a whole-phrase match. */
  phrase: boolean;
}

/**
 * Carry the query to the destination: insert `?q=` before any `#hash` so the
 * page can locate and highlight the matched words. Used by BOTH mouse click
 * and keyboard Enter (Enter activates the same link), so the two behave
 * identically by construction.
 */
export function buildTargetHref(href: string, query: string): string {
  const q = query.trim();
  if (!q) return href;
  const hashIndex = href.indexOf("#");
  const path = hashIndex === -1 ? href : href.slice(0, hashIndex);
  const hash = hashIndex === -1 ? "" : href.slice(hashIndex);
  const sep = path.includes("?") ? "&" : "?";
  return `${path}${sep}q=${encodeURIComponent(q)}${hash}`;
}

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** How many characters around a token can count as "the same spot". */
const WINDOW = 160;

/**
 * Locate `query` inside `text`, Ctrl+F style. Returns null when nothing
 * matches (callers fall back to the card anchor).
 */
export function findMatchRanges(text: string, query: string): TextMatches | null {
  const queryTokens = tokenize(query).filter((t) => t.length >= 2 || /\d/.test(t));
  if (queryTokens.length === 0 || !text) return null;

  const { folded, map } = foldWithMap(text);
  const toOriginal = (fStart: number, fEnd: number): TargetRange => {
    const start = map[fStart] ?? 0;
    const end = fEnd - 1 < map.length ? (map[fEnd - 1] ?? start) + 1 : text.length;
    return { start, end: Math.min(end, text.length) };
  };

  // 1. Phrase pass: all query tokens in order, separated by whitespace or
  //    punctuation runs. Tolerates "town  gun", "town-gun", line breaks.
  if (queryTokens.length >= 1) {
    const phraseRe = new RegExp(
      queryTokens.map(escapeRegExp).join("[^\\p{L}\\p{N}]{1,8}"),
      "gu",
    );
    const phraseRanges: TargetRange[] = [];
    let pm: RegExpExecArray | null;
    while ((pm = phraseRe.exec(folded)) !== null && phraseRanges.length < 200) {
      phraseRanges.push(toOriginal(pm.index, pm.index + pm[0].length));
      // Multi-token phrases: allow overlapping scans to continue after start.
      phraseRe.lastIndex = pm.index + Math.max(1, pm[0].length);
    }
    // Only accept the phrase pass as a "real" phrase when the query has 2+
    // tokens, or the single token matched as a whole word/word-prefix (checked
    // below by the token pass anyway).
    if (phraseRanges.length > 0 && queryTokens.length >= 2) {
      return { ranges: phraseRanges, best: 0, phrase: true };
    }
  }

  // 2. Token pass: each query token at a word start (exact or word-prefix).
  interface TokenHit extends TargetRange {
    token: string;
    fStart: number;
  }
  const hits: TokenHit[] = [];
  for (const qt of queryTokens) {
    const re = new RegExp(`(?<![\\p{L}\\p{N}])${escapeRegExp(qt)}`, "gu");
    let m: RegExpExecArray | null;
    while ((m = re.exec(folded)) !== null && hits.length < 400) {
      hits.push({ ...toOriginal(m.index, m.index + qt.length), token: qt, fStart: m.index });
      re.lastIndex = m.index + Math.max(1, qt.length);
    }
  }
  if (hits.length === 0) return null;

  hits.sort((a, b) => a.fStart - b.fStart);
  // Merge exact duplicates/overlaps (e.g. one token being a prefix of another).
  const merged: TokenHit[] = [];
  for (const h of hits) {
    const last = merged[merged.length - 1];
    if (last && h.start < last.end) {
      if (h.end > last.end) last.end = h.end;
    } else {
      merged.push(h);
    }
  }

  // 3. Densest window: the hit where the most DISTINCT query tokens appear
  //    within WINDOW characters wins; earliest such window breaks ties.
  let bestIdx = 0;
  let bestScore = -1;
  for (let i = 0; i < merged.length; i++) {
    const seen = new Set<string>([merged[i].token]);
    for (let j = i + 1; j < merged.length; j++) {
      if (merged[j].fStart - merged[i].fStart > WINDOW) break;
      seen.add(merged[j].token);
    }
    if (seen.size > bestScore) {
      bestScore = seen.size;
      bestIdx = i;
    }
  }

  return {
    ranges: merged.map(({ start, end }) => ({ start, end })),
    best: bestIdx,
    phrase: false,
  };
}
