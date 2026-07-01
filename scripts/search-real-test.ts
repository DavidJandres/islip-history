import { createIndex, search } from "../src/lib/search/engine";
import type { SearchDoc } from "../src/lib/search/types";
import { people } from "../src/lib/people";
import { timeline } from "../src/lib/timeline";

// Mirror the people+timeline portion of the real corpus.
const docs: SearchDoc[] = [];
for (const p of people) {
  docs.push({
    id: `person-${p.slug}`,
    type: "person",
    typeLabel: "People",
    title: p.name,
    subtitle: [p.role, p.dates].filter(Boolean).join(" · "),
    href: `/en/people/${p.slug}`,
    body: [...p.bio, p.whyMatters, p.connectionToday].join(" "),
    keywords: p.cardText,
    sources: p.sources.join(" "),
  });
}
for (const e of timeline) {
  docs.push({
    id: `timeline-${e.id}`,
    type: "timeline",
    typeLabel: "Timeline",
    title: e.title,
    subtitle: e.date,
    href: `/en/timeline#${e.id}`,
    body: [...e.body, e.whyToday].join(" "),
    sources: e.sources.join(" "),
  });
}

const index = createIndex(docs);
console.log(`indexed ${docs.length} real documents\n`);

const cases: Array<{ q: string; expect: string; note: string }> = [
  { q: "sitko", expect: "person-samuel-sitko", note: "surname" },
  { q: "town seal", expect: "person-abraham-gardiner-thompson", note: "phrase in body" },
  { q: "tightrope", expect: "person-isaac-thompson", note: "distinctive word" },
  { q: "enslaved", expect: "person-isaac-thompson", note: "topical term" },
  { q: "thompsan", expect: "person-", note: "typo -> a Thompson" },
  { q: "brentwood jewish", expect: "person-ruby-and-doris-hodus", note: "multi-word" },
  { q: "precinct government", expect: "timeline-1710-precinct", note: "timeline entry" },
  { q: "washington sagtikos", expect: "person-george-washington", note: "two terms" },
  { q: "revolucion", expect: "", note: "accent-free (should still return hits)" },
];

let pass = 0;
for (const c of cases) {
  const res = search(index, c.q, { limit: 4 });
  const top = res[0]?.doc.id ?? "";
  const inTop3 = res.slice(0, 3).some((r) => r.doc.id.startsWith(c.expect));
  const ok = c.expect === "" ? res.length > 0 : inTop3;
  pass += ok ? 1 : 0;
  console.log(`[${ok ? "PASS" : "FAIL"}] "${c.q}" (${c.note})`);
  console.log(
    `        ${res.slice(0, 3).map((r) => `${r.doc.id}=${r.score.toFixed(1)}`).join(", ") || "(none)"}`,
  );
  if (res[0]?.snippet) {
    const s = res[0].snippet;
    console.log(`        snippet: ${s.text.slice(0, 90)}${s.text.length > 90 ? "…" : ""}`);
  }
}
console.log(`\n${pass}/${cases.length} passed`);
if (pass < cases.length) process.exit(1);
