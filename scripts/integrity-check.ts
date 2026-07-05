// Content-integrity check: verifies that every deep link the site generates
// (search corpus hrefs, exhibit "Explore further" links) resolves to a real
// route AND a real anchor, that no ids collide, and that every theme/category
// used by the data has a label in both dictionaries. Run with:
//   npx tsx scripts/integrity-check.ts
import fs from "node:fs";
import path from "node:path";
import { buildCorpus } from "../src/lib/search/corpus";
import { createIndex, search } from "../src/lib/search/engine";
import { getDictionary } from "../src/i18n/dictionaries";
import { people } from "../src/lib/people";
import { timeline } from "../src/lib/timeline";
import { primarySources, sourceThemes } from "../src/lib/primary-sources";
import { essays, essayCategories } from "../src/lib/essays";
import { exhibitPanels, panelRelated, panelImages } from "../src/lib/exhibit";
import { lessonPlans, sourceActivities, timelineActivities, teachingLinks } from "../src/lib/teaching";
import { bibliographyGroups, bibliographyFlat } from "../src/lib/bibliography";
import { collectionGroups } from "../src/lib/collections";
import { timelineEs } from "../src/lib/timeline-es";
import { peopleEs } from "../src/lib/people-es";
import { primarySourcesEs } from "../src/lib/primary-sources-es";
import { essaysEs } from "../src/lib/essays-es";

let failures = 0;
const fail = (msg: string) => {
  failures++;
  console.log(`[FAIL] ${msg}`);
};
const ok = (msg: string) => console.log(`[ ok ] ${msg}`);

// ---------- 1. Route table from the filesystem ----------
const appDir = path.join(__dirname, "../src/app/[locale]");
const routes: string[] = [];
(function walk(dir: string, route: string) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) walk(path.join(dir, entry.name), `${route}/${entry.name}`);
    else if (entry.name === "page.tsx") routes.push(route || "/");
  }
})(appDir, "");

function routeExists(p: string): boolean {
  if (routes.includes(p)) return true;
  // dynamic segments
  if (/^\/people\/[^/]+$/.test(p)) {
    const slug = p.split("/")[2];
    return routes.includes("/people/[person]") && people.some((x) => x.slug === slug);
  }
  if (/^\/exhibit\/[^/]+$/.test(p)) {
    const slug = p.split("/")[2];
    return routes.includes("/exhibit/[panel]") && (exhibitPanels as readonly string[]).includes(slug);
  }
  if (/^\/teach\/lesson-plans\/[^/]+$/.test(p)) {
    const slug = p.split("/")[3];
    return routes.includes("/teach/lesson-plans/[lesson]") && lessonPlans.some((l) => l.id === slug);
  }
  return false;
}

// ---------- 2. Anchor table ----------
const dict = getDictionary("en");
function anchorExists(page: string, anchor: string): boolean {
  if (page === "/timeline") return timeline.some((e) => e.id === anchor);
  if (page === "/explore/primary-sources")
    return anchor.startsWith("source-") && primarySources.some((s) => `source-${s.id}` === anchor);
  if (page === "/research/essays")
    return anchor.startsWith("essay-") && essays.some((e) => `essay-${e.id}` === anchor);
  if (page === "/about/fellowship")
    return (
      dict.aboutFellowship.team.some((m) => `team-${m.id}` === anchor) ||
      dict.aboutFellowship.contributors.some((m) => `contributor-${m.id}` === anchor)
    );
  if (page === "/about/faq") {
    const i = Number(anchor.replace("faq-", ""));
    return anchor.startsWith("faq-") && Number.isInteger(i) && i >= 0 && i < dict.faq.items.length;
  }
  if (page === "/teach/primary-source-activities")
    return anchor.startsWith("activity-") && sourceActivities.some((a) => `activity-${a.id}` === anchor);
  if (page === "/teach/timeline-activities")
    return anchor.startsWith("tactivity-") && timelineActivities.some((a) => `tactivity-${a.id}` === anchor);
  return false;
}

function checkHref(href: string, from: string) {
  const noLocale = href.replace(/^\/(en|es)(?=\/|#|$)/, "") || "/";
  const [page, anchor] = noLocale.split("#");
  const p = page === "" ? "/" : page;
  if (!routeExists(p)) fail(`${from}: route not found for ${href}`);
  else if (anchor && !anchorExists(p, anchor)) fail(`${from}: anchor #${anchor} not found on ${p}`);
}

// ---------- 3. Duplicate ids ----------
for (const [name, ids] of [
  ["primarySources", primarySources.map((s) => s.id)],
  ["essays", essays.map((e) => e.id)],
  ["timeline", timeline.map((e) => e.id)],
  ["people", people.map((p) => p.slug)],
] as const) {
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dupes.length) fail(`duplicate ids in ${name}: ${dupes.join(", ")}`);
  else ok(`${name}: ${ids.length} entries, no duplicate ids`);
}

// ---------- 4. Theme/category labels exist in both locales ----------
for (const locale of ["en", "es"] as const) {
  const d = getDictionary(locale);
  for (const s of primarySources)
    if (!(s.theme in d.primarySources.themes)) fail(`${locale}: no theme label for "${s.theme}"`);
  for (const e of essays)
    if (!(e.category in d.essays.categories)) fail(`${locale}: no category label for "${e.category}"`);
  for (const t of sourceThemes)
    if (!(t in d.primarySources.themes)) fail(`${locale}: sourceThemes "${t}" missing label`);
  for (const c of essayCategories)
    if (!(c in d.essays.categories)) fail(`${locale}: essayCategories "${c}" missing label`);
}
ok("all themes/categories labeled in en + es");

// ---------- 5. Corpus hrefs (both locales) ----------
for (const locale of ["en", "es"] as const) {
  const corpus = buildCorpus(locale);
  const ids = corpus.map((d) => d.id);
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dupes.length) fail(`corpus(${locale}): duplicate doc ids: ${dupes.join(", ")}`);
  for (const doc of corpus) checkHref(doc.href, `corpus(${locale}) ${doc.id}`);
  ok(`corpus(${locale}): ${corpus.length} docs, all hrefs resolve`);
}

// ---------- 6. Exhibit "Explore further" links ----------
let related = 0;
for (const panel of exhibitPanels) {
  for (const link of panelRelated[panel] ?? []) {
    related++;
    checkHref(link.href, `panelRelated(${panel})`);
  }
}
ok(`panelRelated: ${related} links, all resolve`);

// ---------- 6a. Teaching Materials internal links ----------
for (const link of teachingLinks) checkHref(link.href, "teaching");
ok(`teaching: ${teachingLinks.length} related/source links resolve`);

// ---------- 6b. Collections mash links + localized group labels ----------
{
  let count = 0;
  for (const group of collectionGroups) {
    for (const link of group.links) {
      count++;
      checkHref(link.href, `collections(${group.key})`);
    }
    for (const locale of ["en", "es"] as const) {
      const groups = getDictionary(locale).collections.groups as Record<
        string,
        { title: string; blurb: string }
      >;
      if (!groups[group.key]?.title) fail(`collections: ${locale} label missing for "${group.key}"`);
    }
  }
  ok(`collections: ${count} links resolve, all groups labeled in en + es`);
}

// ---------- 7. Bibliography: alphabetical order + coverage ----------
{
  const sortKey = (s: string) => s.replace(/^[“”"'‘’]+/, "").toLowerCase();
  for (const g of bibliographyGroups) {
    for (let i = 1; i < g.items.length; i++) {
      if (sortKey(g.items[i]) < sortKey(g.items[i - 1])) {
        fail(`bibliography group "${g.id}": item ${i} out of alphabetical order (${g.items[i].slice(0, 50)}…)`);
      }
    }
  }
  // Every load-bearing source or image cited in site content must be
  // represented in the bibliography (matched by a distinctive substring).
  const mustHave = [
    "Starace", "Conklin, Nathaniel", "Munkenbeck", "Onderdonk", "Finnegan",
    "Sebor", "Street, Charles R.", "Lossing", "Colonial Laws of New York",
    "Vermaelen", "Metcalf", "Antonio, Michele", "St. John", "Field Guide",
    "Verga", "Islip Precinct Articles of Association", "Sauthier",
    "Stone, William J.", "Stuart, Gilbert", "Henry Clinton", "Quahog",
    "Weed, Parsons",
  ];
  const flat = bibliographyFlat.join("\n");
  for (const key of mustHave) {
    if (!flat.includes(key)) fail(`bibliography: no entry matching "${key}"`);
  }
  ok(`bibliography: ${bibliographyFlat.length} entries alphabetized, ${mustHave.length} load-bearing sources covered`);
}

// ---------- 8. Images: every real image ships alt text and a credit ----------
{
  for (const [slug, img] of Object.entries(panelImages)) {
    if (!img) continue;
    if (!img.alt || img.alt.length < 20) fail(`panelImages.${slug}: alt text missing or too vague`);
    if (!img.credit || !/public domain|courtesy/i.test(img.credit))
      fail(`panelImages.${slug}: credit missing or lacks a rights basis`);
  }
  for (const p of people) {
    if (p.portrait) {
      if (!p.portrait.alt || p.portrait.alt.length < 15) fail(`people.${p.slug}: portrait alt too vague`);
      if (!p.portrait.credit) fail(`people.${p.slug}: portrait credit missing`);
    }
  }
  ok("images: all exhibit + people images carry specific alt text and credits");
}

// ---------- 9. Spanish coverage: every entry has a complete overlay ----------
{
  for (const e of timeline) {
    const t = timelineEs[e.id];
    if (!t) fail(`es coverage: timeline "${e.id}" has no Spanish overlay`);
    else if (t.body.length !== e.body.length)
      fail(`es coverage: timeline "${e.id}" body has ${t.body.length} paragraphs, English has ${e.body.length}`);
  }
  for (const p of people) {
    const t = peopleEs[p.slug];
    if (!t) fail(`es coverage: person "${p.slug}" has no Spanish overlay`);
    else if (t.bio.length !== p.bio.length)
      fail(`es coverage: person "${p.slug}" bio has ${t.bio.length} paragraphs, English has ${p.bio.length}`);
  }
  for (const s of primarySources) {
    const t = primarySourcesEs[s.id];
    if (!t) fail(`es coverage: source "${s.id}" has no Spanish overlay`);
    else {
      if (t.excerptLabels.length !== s.excerpts.length)
        fail(`es coverage: source "${s.id}" excerptLabels length ${t.excerptLabels.length} != excerpts ${s.excerpts.length}`);
      s.excerpts.forEach((ex, i) => {
        if (!!ex.label !== !!t.excerptLabels[i])
          fail(`es coverage: source "${s.id}" excerpt ${i} label presence mismatch`);
      });
      if (!!s.date !== !!t.date) fail(`es coverage: source "${s.id}" date presence mismatch`);
    }
  }
  for (const e of essays) {
    if (!essaysEs[e.id]) fail(`es coverage: essay "${e.id}" has no Spanish overlay`);
  }
  ok(
    `es coverage: ${Object.keys(timelineEs).length} timeline + ${Object.keys(peopleEs).length} people + ${Object.keys(primarySourcesEs).length} sources + ${Object.keys(essaysEs).length} essays overlays complete`,
  );
}

// ---------- 10. New content is findable in search ----------
const index = createIndex(buildCorpus("en"));
const expectTop: Array<[string, string]> = [
  ["town gun", "primary-town-minutes-1775-1776"],
  ["Mustees", "primary-conklin-description-1798"],
  ["Johanna Hutton", "timeline-1782-1783-hutton"],
  ["fishing bay forty shillings", "primary-town-minutes-fishing-1765"],
  ["school commissioners", "timeline-1796-school-commissioners"],
  ["privateers inlet", "timeline-1776-privateers-inlet"],
  ["King George wartime meetings", "primary-town-minutes-wartime"],
  ["American Independence 1784", "primary-town-minutes-1784"],
  ["annual town meeting", "primary-town-minutes-annual-meetings"],
  ["who lived in Islip", "essay-who-lived-in-islip-1798"],
];
for (const [q, want] of expectTop) {
  const hits = search(index, q).slice(0, 5);
  const pos = hits.findIndex((h) => h.doc.id === want);
  if (pos < 0)
    fail(`search "${q}": ${want} not in top 5 (got: ${hits.map((h) => h.doc.id).join(", ")})`);
  else ok(`search "${q}" -> ${want} (rank ${pos + 1})`);
}

// ---------- 10a. Teaching Materials are findable by teacher-style queries ----------
// The user's target queries: teacher, lesson plan, primary source activity,
// classroom, occupation lesson, Islip Revolution lesson, child-friendly
// timeline, belonging. Each must surface a teaching doc (teach-*) in the top 6,
// or the exact page where noted.
const teachExpect: Array<[string, string]> = [
  ["teacher classroom materials", "teach-"],
  ["lesson plan", "teach-"],
  ["primary source activity", "teach-"],
  ["classroom activity", "teach-"],
  ["occupation lesson", "teach-"],
  ["Islip revolution lesson", "teach-"],
  ["belonging lesson", "teach-"],
  ["child-friendly timeline activity", "teach-"],
  ["exhibit guide for students", "teach-exhibit-guide"],
];
for (const [q, want] of teachExpect) {
  const hits = search(index, q).slice(0, 6);
  const pos = hits.findIndex((h) => h.doc.id.startsWith(want));
  if (pos < 0)
    fail(`teach search "${q}": no ${want} in top 6 (got: ${hits.map((h) => h.doc.id).join(", ")})`);
  else ok(`teach search "${q}" -> ${hits[pos].doc.id} (rank ${pos + 1})`);
}

console.log(failures === 0 ? "\nAll integrity checks passed." : `\n${failures} FAILURE(S).`);
process.exit(failures === 0 ? 0 : 1);
