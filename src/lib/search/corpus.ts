// Assembles the searchable corpus for a locale from the same data the pages
// render, so the index can never drift from the site. Titles, subtitles, and
// section labels are localized; long-form bodies for the exhibit are taken from
// the English copy (the Spanish bodies are still being translated), so a
// Spanish visitor can still find a panel by its content and follow the
// "read in English" link. People and timeline prose is English for now by the
// same rule. This module is isomorphic (no server-only APIs) so it can be
// lazily imported into a client chunk.

import { getDictionary } from "@/i18n/dictionaries";
import { localizedPath, type Locale } from "@/i18n/config";
import { people } from "@/lib/people";
import { timeline } from "@/lib/timeline";
import { exhibitPanels, panelNumber, panelStatus } from "@/lib/exhibit";
import type { SearchDoc } from "./types";

const join = (parts: Array<string | undefined | null>) =>
  parts.filter((p) => p && p.trim().length > 0).join(" \u00b7 ");

export function buildCorpus(locale: Locale): SearchDoc[] {
  const dict = getDictionary(locale);
  const en = getDictionary("en"); // canonical long-form bodies
  const c = dict.common;
  const href = (path: string) => localizedPath(locale, path);
  const docs: SearchDoc[] = [];

  // People — each has its own page.
  for (const p of people) {
    docs.push({
      id: `person-${p.slug}`,
      type: "person",
      typeLabel: c.searchTypePerson,
      title: p.name,
      subtitle: join([p.role, p.dates]),
      href: href(`/people/${p.slug}`),
      body: [...p.bio, p.whyMatters, p.connectionToday].join(" "),
      keywords: [dict.people.sections[p.section], p.cardText].join(" "),
      sources: p.sources.join(" "),
    });
  }

  // Timeline — a single page; deep-link to each entry's anchor.
  for (const e of timeline) {
    docs.push({
      id: `timeline-${e.id}`,
      type: "timeline",
      typeLabel: c.searchTypeTimeline,
      title: e.title,
      subtitle: join([e.date, dict.timeline.eras[e.era]]),
      href: href(`/timeline#${e.id}`),
      body: [...e.body, e.whyToday].join(" "),
      keywords: dict.timeline.eras[e.era],
      sources: e.sources.join(" "),
    });
  }

  // Exhibit panels — localized title/summary, English body for search recall.
  for (const slug of exhibitPanels) {
    const panel = dict.exhibit.panels[slug];
    const enPanel = en.exhibit.panels[slug];
    const bodyReady = panelStatus[slug] === "draft";
    docs.push({
      id: `exhibit-${slug}`,
      type: "exhibit",
      typeLabel: c.searchTypeExhibit,
      title: panel.title,
      subtitle: `${dict.exhibit.panelWord} ${panelNumber(slug)}`,
      href: href(`/exhibit/${slug}`),
      body: bodyReady ? enPanel.body.join(" ") : "",
      keywords: panel.summary,
      sources: panel.sources.join(" "),
    });
  }

  // Key pages, so the site's sections are reachable by name/description.
  const nav = dict.nav;
  const sum = dict.navSummaries;
  const pages: Array<{ key: string; title: string; body?: string; path: string }> = [
    { key: "home", title: c.siteName, body: c.affiliation, path: "/" },
    {
      key: "exhibit",
      title: dict.exhibit.title,
      body: [dict.exhibit.lede, ...dict.exhibit.intro].join(" "),
      path: "/exhibit",
    },
    { key: "people", title: dict.people.title, body: dict.people.intro.join(" "), path: "/people" },
    {
      key: "timeline",
      title: dict.timeline.title,
      body: dict.timeline.intro.join(" "),
      path: "/timeline",
    },
    { key: "explore", title: nav.explore, path: "/explore" },
    { key: "collections", title: nav.collections, body: sum.collections, path: "/explore/collections" },
    { key: "maps", title: nav.maps, body: sum.maps, path: "/explore/maps" },
    { key: "photographs", title: nav.photographs, body: sum.photographs, path: "/explore/photographs" },
    { key: "primarySources", title: nav.primarySources, body: sum.primarySources, path: "/explore/primary-sources" },
    { key: "research", title: nav.research, path: "/research" },
    { key: "essays", title: nav.essays, body: sum.essays, path: "/research/essays" },
    { key: "sources", title: nav.sources, body: sum.sources, path: "/research/sources" },
    { key: "about", title: nav.aboutProject, body: sum.aboutProject, path: "/about" },
    { key: "aboutResearch", title: nav.aboutResearch, body: sum.aboutResearch, path: "/about/research" },
    { key: "aboutFellowship", title: nav.aboutFellowship, body: sum.aboutFellowship, path: "/about/fellowship" },
    { key: "contact", title: nav.contact, body: sum.contact, path: "/about/contact" },
  ];
  for (const page of pages) {
    docs.push({
      id: `page-${page.key}`,
      type: "page",
      typeLabel: c.searchTypePage,
      title: page.title,
      href: href(page.path),
      body: page.body,
    });
  }

  return docs;
}
