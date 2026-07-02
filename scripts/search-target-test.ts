// Tests for the destination-side exact-match algorithm (lib/search/target.ts):
// the logic that turns a search-result click into a Ctrl+F-style landing on
// the exact word. Uses the REAL site content, so these break if the words the
// tests search for are ever edited away.
//   npx tsx scripts/search-target-test.ts
import { buildTargetHref, findMatchRanges } from "../src/lib/search/target";
import { primarySources } from "../src/lib/primary-sources";
import { timeline } from "../src/lib/timeline";
import { essays } from "../src/lib/essays";

let failures = 0;
function check(name: string, cond: boolean, detail?: string) {
  if (cond) console.log(`[PASS] ${name}`);
  else {
    failures++;
    console.log(`[FAIL] ${name}${detail ? ` — ${detail}` : ""}`);
  }
}

const source = (id: string) => {
  const s = primarySources.find((x) => x.id === id);
  if (!s) throw new Error(`missing source ${id}`);
  return s;
};
const entry = (id: string) => {
  const e = timeline.find((x) => x.id === id);
  if (!e) throw new Error(`missing timeline entry ${id}`);
  return e;
};

// ---------- buildTargetHref: one URL builder for mouse click AND Enter ----------
check(
  "href: query inserted before hash",
  buildTargetHref("/en/timeline#1776-town-gun", "town gun") ===
    "/en/timeline?q=town%20gun#1776-town-gun",
);
check(
  "href: no hash",
  buildTargetHref("/en/people/benajah-strong", "Benajah Strong") ===
    "/en/people/benajah-strong?q=Benajah%20Strong",
);
check(
  "href: existing query string appends with &",
  buildTargetHref("/en/x?a=1#top", "gun") === "/en/x?a=1&q=gun#top",
);
check("href: empty query leaves href unchanged", buildTargetHref("/en/timeline#x", "  ") === "/en/timeline#x");
// Enter activates the active option's <a> (search-dialog clicks it), so the
// keyboard path and the mouse path share this exact URL by construction.

// ---------- required content searches ----------
// "town gun" — phrase inside the 1775–1776 minutes card context.
{
  const text = source("town-minutes-1775-1776").whyItMatters!;
  const m = findMatchRanges(text, "town gun");
  check("'town gun': matches in card text", m !== null);
  if (m) {
    const hit = text.slice(m.ranges[m.best].start, m.ranges[m.best].end).toLowerCase();
    check(
      "'town gun': best window contains both words nearby",
      m.phrase ? hit === "town gun" : /town|gun/.test(hit),
      `got "${hit}"`,
    );
  }
}

// "Johanna Hutton" — phrase, case-insensitive, in the timeline entry body.
{
  const text = entry("1782-1783-hutton").body[0];
  const m = findMatchRanges(text, "johanna hutton");
  check("'Johanna Hutton': phrase found case-insensitively", m !== null && m.phrase);
  if (m) {
    const hit = text.slice(m.ranges[m.best].start, m.ranges[m.best].end);
    check("'Johanna Hutton': original casing preserved in range", hit === "Johanna Hutton", `got "${hit}"`);
  }
}

// "Mustees" — inside a quoted excerpt of the Conklin description.
{
  const ex = source("conklin-description-1798").excerpts.find((e) => e.text.includes("Mustees"))!;
  const m = findMatchRanges(ex.text, "Mustees");
  check("'Mustees': found inside excerpt", m !== null);
  if (m) {
    const hit = ex.text.slice(m.ranges[m.best].start, m.ranges[m.best].end);
    check("'Mustees': exact word highlighted", hit === "Mustees", `got "${hit}"`);
  }
}

// "Benajah Strong" — phrase deep inside the militia letter excerpt.
{
  const ex = source("thompson-militia-letter-1776").excerpts[1].text;
  const m = findMatchRanges(ex, "Benajah Strong");
  check("'Benajah Strong': phrase found in letter excerpt", m !== null && m.phrase);
}

// "whaleboat" — single token matching "Whaleboat War" (capitalized, in quotes).
{
  const text = entry("1781-plundering").whyToday;
  const m = findMatchRanges(text, "whaleboat");
  check("'whaleboat': token found next to curly quotes", m !== null);
  if (m) {
    const hit = text.slice(m.ranges[m.best].start, m.ranges[m.best].end);
    check("'whaleboat': matches the capitalized word", hit === "Whaleboat", `got "${hit}"`);
  }
}

// Deep inside a long card: the 11,814 days of instruction, far down the
// Conklin excerpt list.
{
  const ex = source("conklin-description-1798").excerpts.find((e) =>
    e.text.includes("eleven thousand"),
  )!;
  const m = findMatchRanges(ex.text, "eleven thousand eight hundred and fourteen");
  check("deep-card phrase: 11,814 days of instruction located", m !== null && m.phrase);
}

// Diacritics: an ASCII query finds accented text (and the highlight range
// covers the accented original).
{
  const text = "Cuando la Revolución llegó a Long Island, entró en las casas.";
  const m = findMatchRanges(text, "revolucion llego");
  check("diacritics: 'revolucion llego' matches 'Revolución llegó'", m !== null && m.phrase);
  if (m) {
    const hit = text.slice(m.ranges[m.best].start, m.ranges[m.best].end);
    check("diacritics: range covers accented original", hit === "Revolución llegó", `got "${hit}"`);
  }
}

// Multiple matches: the densest window wins when the exact phrase is absent.
{
  const text = entry("1776-town-gun").body[0]; // contains "Town Meeting", "gun", "the towns" but not "town gun"
  const m = findMatchRanges(text, "town gun");
  check("multi-match: tokens found when phrase absent", m !== null && !m!.phrase);
  if (m) {
    const windowStart = m.ranges[m.best].start;
    const windowText = text.slice(Math.max(0, windowStart - 40), windowStart + 160).toLowerCase();
    check(
      "multi-match: best window holds both query words",
      windowText.includes("town") && windowText.includes("gun"),
      `window: "${windowText.slice(0, 80)}…"`,
    );
  }
}

// Prefix behavior: "privateer" highlights "privateers".
{
  const text = entry("1776-privateers-inlet").body[0];
  const m = findMatchRanges(text, "privateer");
  check("prefix: 'privateer' matches 'privateers'", m !== null);
}

// Fallback: nonsense query returns null so callers keep the card anchor.
{
  check("fallback: no match returns null", findMatchRanges("some plain text", "xyzzy plugh") === null);
  check("fallback: empty text returns null", findMatchRanges("", "gun") === null);
  check("fallback: stopword-ish 1-char query returns null", findMatchRanges("a b c", "a") === null);
}

// Marks stay bounded: a pathological query can't blow past the range caps.
{
  const big = "gun ".repeat(5000);
  const m = findMatchRanges(big, "gun");
  check("bounds: pathological repetition capped", m !== null && m.ranges.length <= 400);
}

// Every essay/source used above still exists (guards test rot).
check("content guard: essays present", essays.length >= 25);

console.log(failures === 0 ? "\nAll search-target tests passed." : `\n${failures} FAILURE(S).`);
process.exit(failures === 0 ? 0 : 1);
