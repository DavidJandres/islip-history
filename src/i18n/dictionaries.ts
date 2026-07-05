import type { Locale } from "./config";

import enCommon from "./dictionaries/en/common.json";
import enNav from "./dictionaries/en/nav.json";
import enNavSummaries from "./dictionaries/en/nav-summaries.json";
import enFooter from "./dictionaries/en/footer.json";
import enHome from "./dictionaries/en/home.json";
import enAbout from "./dictionaries/en/about.json";
import enResearch from "./dictionaries/en/research.json";
import enFellowship from "./dictionaries/en/fellowship.json";
import enContact from "./dictionaries/en/contact.json";
import enFaq from "./dictionaries/en/faq.json";
import enSources from "./dictionaries/en/sources.json";
import enPrimarySources from "./dictionaries/en/primary-sources.json";
import enEssays from "./dictionaries/en/essays.json";
import enThematic from "./dictionaries/en/thematic.json";
import enExhibit from "./dictionaries/en/exhibit.json";
import enPeople from "./dictionaries/en/people.json";
import enTimeline from "./dictionaries/en/timeline.json";
import enCollections from "./dictionaries/en/collections.json";
import enTeach from "./dictionaries/en/teach.json";

import esCommon from "./dictionaries/es/common.json";
import esNav from "./dictionaries/es/nav.json";
import esNavSummaries from "./dictionaries/es/nav-summaries.json";
import esFooter from "./dictionaries/es/footer.json";
import esHome from "./dictionaries/es/home.json";
import esAbout from "./dictionaries/es/about.json";
import esResearch from "./dictionaries/es/research.json";
import esFellowship from "./dictionaries/es/fellowship.json";
import esContact from "./dictionaries/es/contact.json";
import esFaq from "./dictionaries/es/faq.json";
import esSources from "./dictionaries/es/sources.json";
import esPrimarySources from "./dictionaries/es/primary-sources.json";
import esEssays from "./dictionaries/es/essays.json";
import esThematic from "./dictionaries/es/thematic.json";
import esExhibit from "./dictionaries/es/exhibit.json";
import esPeople from "./dictionaries/es/people.json";
import esTimeline from "./dictionaries/es/timeline.json";
import esCollections from "./dictionaries/es/collections.json";
import esTeach from "./dictionaries/es/teach.json";
import deCommon from "./dictionaries/de/common.json";
import deNav from "./dictionaries/de/nav.json";
import deNavSummaries from "./dictionaries/de/nav-summaries.json";
import deFooter from "./dictionaries/de/footer.json";
import deHome from "./dictionaries/de/home.json";
import deAbout from "./dictionaries/de/about.json";
import deResearch from "./dictionaries/de/research.json";
import deFellowship from "./dictionaries/de/fellowship.json";
import deContact from "./dictionaries/de/contact.json";
import deFaq from "./dictionaries/de/faq.json";
import deSources from "./dictionaries/de/sources.json";
import dePrimarySources from "./dictionaries/de/primary-sources.json";
import deEssays from "./dictionaries/de/essays.json";
import deThematic from "./dictionaries/de/thematic.json";
import deExhibit from "./dictionaries/de/exhibit.json";
import dePeople from "./dictionaries/de/people.json";
import deTimeline from "./dictionaries/de/timeline.json";
import deCollections from "./dictionaries/de/collections.json";
import deTeach from "./dictionaries/de/teach.json";

// Copy lives in one JSON file per section (dictionaries/<locale>/<section>.json)
// so pages don't share one giant file that's painful to edit and quick to
// merge-conflict. The sections are assembled here. English defines the shape;
// the Spanish assembly below is type-checked against it, so a missing or
// misnamed key fails the build rather than shipping a blank string.
const en = {
  common: enCommon,
  nav: enNav,
  navSummaries: enNavSummaries,
  footer: enFooter,
  home: enHome,
  aboutProject: enAbout,
  aboutResearch: enResearch,
  aboutFellowship: enFellowship,
  contact: enContact,
  faq: enFaq,
  sources: enSources,
  primarySources: enPrimarySources,
  essays: enEssays,
  thematic: enThematic,
  exhibit: enExhibit,
  people: enPeople,
  timeline: enTimeline,
  collections: enCollections,
  teach: enTeach,
};

export type Dictionary = typeof en;

const es: Dictionary = {
  common: esCommon,
  nav: esNav,
  navSummaries: esNavSummaries,
  footer: esFooter,
  home: esHome,
  aboutProject: esAbout,
  aboutResearch: esResearch,
  aboutFellowship: esFellowship,
  contact: esContact,
  faq: esFaq,
  sources: esSources,
  primarySources: esPrimarySources,
  essays: esEssays,
  thematic: esThematic,
  exhibit: esExhibit,
  people: esPeople,
  timeline: esTimeline,
  collections: esCollections,
  teach: esTeach,
};

const de: Dictionary = {
  common: deCommon,
  nav: deNav,
  navSummaries: deNavSummaries,
  footer: deFooter,
  home: deHome,
  aboutProject: deAbout,
  aboutResearch: deResearch,
  aboutFellowship: deFellowship,
  contact: deContact,
  faq: deFaq,
  sources: deSources,
  primarySources: dePrimarySources,
  essays: deEssays,
  thematic: deThematic,
  exhibit: deExhibit,
  people: dePeople,
  timeline: deTimeline,
  collections: deCollections,
  teach: deTeach,
};

const dictionaries: Record<Locale, Dictionary> = { en, es, de };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

// Add a page: create en/<name>.json and es/<name>.json, import both, and add the
// section to `en` and `es`. Add a locale (e.g. Polish): create dictionaries/pl/
// and add a `pl` assembly plus the locale in config.ts.
