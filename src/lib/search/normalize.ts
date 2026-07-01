// Normalization for search. All matching happens on a "folded" form of the
// text: lowercased, with diacritics stripped (NFD + combining-mark removal).
// This makes queries accent-insensitive in both directions — "revolucion"
// matches "Revolución", and "Jose" matches "José" — which matters on a
// bilingual site. Highlighting needs to map folded positions back to the
// original string, so foldWithMap tracks that mapping.

const COMBINING_MARKS = /[\u0300-\u036f]/g;

/** Lowercase + strip diacritics. Length may change (marks are removed). */
export function foldString(input: string): string {
  return input.normalize("NFD").replace(COMBINING_MARKS, "").toLowerCase();
}

/**
 * Fold a string while recording, for each character of the folded output, the
 * index in the ORIGINAL string it came from. Used to translate a match found
 * in folded space back to a highlight range in the text the user sees.
 */
export function foldWithMap(input: string): { folded: string; map: number[] } {
  let folded = "";
  const map: number[] = [];
  let index = 0;
  for (const ch of input) {
    const f = ch.normalize("NFD").replace(COMBINING_MARKS, "").toLowerCase();
    for (let k = 0; k < f.length; k++) map.push(index);
    folded += f;
    index += ch.length; // advance by the original char's UTF-16 length
  }
  return { folded, map };
}

const TOKEN_RE = /[\p{L}\p{N}]+/gu;

/** Folded tokens for a query or field: runs of letters/digits, accents removed. */
export function tokenize(input: string): string[] {
  const folded = foldString(input);
  return folded.match(TOKEN_RE) ?? [];
}

/**
 * Tokens with their character ranges in the ORIGINAL string, so matches can be
 * highlighted in place. Ranges are approximate to within a combining sequence,
 * which is imperceptible for highlighting.
 */
export function tokenizeWithPositions(
  original: string,
): Array<{ term: string; start: number; end: number }> {
  const { folded, map } = foldWithMap(original);
  const out: Array<{ term: string; start: number; end: number }> = [];
  const re = new RegExp(TOKEN_RE.source, "gu");
  let m: RegExpExecArray | null;
  const lastOriginal = original.length;
  while ((m = re.exec(folded)) !== null) {
    const fStart = m.index;
    const fEnd = m.index + m[0].length;
    const start = map[fStart] ?? 0;
    const end = fEnd - 1 < map.length ? (map[fEnd - 1] ?? start) + 1 : lastOriginal;
    out.push({ term: m[0], start, end: Math.min(end, lastOriginal) });
  }
  return out;
}
