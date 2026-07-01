import { createIndex, search } from "../src/lib/search/engine";
import type { SearchDoc } from "../src/lib/search/types";

const docs: SearchDoc[] = [
  {
    id: "george-washington",
    type: "person",
    typeLabel: "People",
    title: "George Washington",
    subtitle: "First U.S. President \u00b7 1732\u20131799",
    href: "/en/people/george-washington",
    body: "Washington's 1790 Long Island tour connects Islip's Revolutionary landscape to the new republic. His diary references a stay at Squire Thompson's house, identified as Sagtikos Manor on Montauk Highway.",
    keywords: "Revolution and Occupation",
  },
  {
    id: "isaac-thompson",
    type: "person",
    typeLabel: "People",
    title: "Isaac Thompson",
    subtitle: "Patriot, magistrate, and slaveholder \u00b7 1743\u20131817",
    href: "/en/people/isaac-thompson",
    body: "Isaac Thompson lived through the Revolution on a tightrope. Much of the labor on his farm and in the home was performed by enslaved or indentured people. He owned on average four enslaved people around 1790.",
    keywords: "Revolution and Occupation slavery",
  },
  {
    id: "panel-revolution",
    type: "exhibit",
    typeLabel: "Exhibit",
    title: "La Revoluci\u00f3n llega a Islip",
    subtitle: "Panel 3 de 7",
    href: "/es/exhibit/revolution-comes-to-islip",
    body: "Cuando la Revoluci\u00f3n lleg\u00f3 a Long Island, Islip no pudo mantenerse al margen. Sagtikos Manor da a la exposici\u00f3n un ancla revolucionaria local.",
    keywords: "Sagtikos Manor",
  },
  {
    id: "many-roots",
    type: "exhibit",
    typeLabel: "Exhibit",
    title: "Many Roots, One Town",
    subtitle: "Panel 6 of 7",
    href: "/en/exhibit/many-roots-one-town",
    body: "One clear example is the Jewish community of Islip Town. It traces the community through the Bay Shore United Hebrew Benevolent Cemetery Association and Holocaust survivors who found refuge at the Adasse Farm.",
    keywords: "Communities and Belonging",
  },
  {
    id: "tl-1710",
    type: "timeline",
    typeLabel: "Timeline",
    title: "Precinct government authorized",
    subtitle: "1710 \u00b7 Colonial Land and Local Government",
    href: "/en/timeline",
    body: "A colonial act passed in 1710 allowed the Precinct of Islip to elect assessors, a collector, constable, and supervisor.",
  },
  {
    id: "page-people",
    type: "page",
    typeLabel: "Pages",
    title: "People of Islip",
    href: "/en/people",
    body: "History is made by people: sachems and patentees, enslaved workers and servants, town supervisors, immigrants, veterans, refugees.",
  },
];

const index = createIndex(docs);

interface Case {
  q: string;
  expectTop?: string;
  expectEmpty?: boolean;
  note: string;
}

const cases: Case[] = [
  { q: "washington", expectTop: "george-washington", note: "exact title" },
  { q: "wasington", expectTop: "george-washington", note: "typo (missing h)" },
  { q: "washingtin", expectTop: "george-washington", note: "typo (substitution)" },
  { q: "isl", expectTop: undefined, note: "prefix -> Islip docs (any)" },
  { q: "revolucion", expectTop: "panel-revolution", note: "accent-insensitive (Revoluci\u00f3n)" },
  { q: "sagtikos manor", expectTop: undefined, note: "phrase across Sagtikos docs" },
  { q: "jewish community", expectTop: "many-roots", note: "multi-word body match" },
  { q: "isaac thompson slavery", expectTop: "isaac-thompson", note: "multi-word coverage" },
  { q: "1710", expectTop: "tl-1710", note: "numeric token" },
  { q: "zzzzqqq", expectEmpty: true, note: "garbage -> no results" },
  { q: "   ", expectEmpty: true, note: "whitespace -> no results" },
];

let pass = 0;
let fail = 0;
for (const c of cases) {
  const res = search(index, c.q, { limit: 5 });
  const top = res[0]?.doc.id;
  let ok = true;
  if (c.expectEmpty) ok = res.length === 0;
  else if (c.expectTop) ok = top === c.expectTop;
  else ok = res.length > 0;
  if (ok) pass++;
  else fail++;
  const arrow = ok ? "PASS" : "FAIL";
  const shown = res
    .slice(0, 3)
    .map((r) => `${r.doc.id}(${r.score.toFixed(2)})`)
    .join(", ");
  console.log(`[${arrow}] "${c.q}" — ${c.note}`);
  console.log(`        top=[${shown}]`);
}
console.log(`\n${pass} passed, ${fail} failed`);
if (fail > 0) process.exit(1);
