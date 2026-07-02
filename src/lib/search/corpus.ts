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
import { exhibitPanels, panelNumber, panelStatus, panelBodyTranslated } from "@/lib/exhibit";
import { bibliographyFlat } from "@/lib/bibliography";
import { primarySources } from "@/lib/primary-sources";
import { essays } from "@/lib/essays";
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

  // Exhibit panels — localized title/summary. The body indexed is the locale's
  // own translation once it exists (panelBodyTranslated), else the English
  // body so a Spanish visitor can still find a panel by its content.
  for (const slug of exhibitPanels) {
    const panel = dict.exhibit.panels[slug];
    const enPanel = en.exhibit.panels[slug];
    const bodyReady = panelStatus[slug] === "draft";
    const localizedBody = panelBodyTranslated[slug] ? panel.body : enPanel.body;
    docs.push({
      id: `exhibit-${slug}`,
      type: "exhibit",
      typeLabel: c.searchTypeExhibit,
      title: panel.title,
      subtitle: `${dict.exhibit.panelWord} ${panelNumber(slug)}`,
      href: href(`/exhibit/${slug}`),
      body: bodyReady ? localizedBody.join(" ") : "",
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
    {
      key: "timelineKids",
      title: dict.timeline.kids.title,
      body: [...dict.timeline.kids.intro, dict.timeline.kids.honestyNote].join(" "),
      path: "/timeline/kids",
    },
    { key: "explore", title: nav.explore, body: sum.explore, path: "/explore" },
    {
      key: "collections",
      title: dict.collections.title,
      body: [
        ...dict.collections.intro,
        ...Object.values(dict.collections.groups).map((g) => `${g.title} ${g.blurb}`),
      ].join(" "),
      path: "/explore/collections",
    },
    { key: "maps", title: nav.maps, body: sum.maps, path: "/explore/maps" },
    { key: "photographs", title: nav.photographs, body: sum.photographs, path: "/explore/photographs" },
    { key: "primarySources", title: nav.primarySources, body: sum.primarySources, path: "/explore/primary-sources" },
    { key: "research", title: nav.research, body: sum.research, path: "/research" },
    { key: "essays", title: nav.essays, body: sum.essays, path: "/research/essays" },
    {
      key: "occupation",
      title: nav.occupation,
      body: dict.thematic.occupation.intro,
      path: "/research/occupation",
    },
    {
      key: "flags",
      title: nav.flags,
      body: dict.thematic.flags.intro,
      path: "/research/flags",
    },
    {
      key: "militia",
      title: nav.militia,
      body: dict.thematic.militia.intro,
      path: "/research/militia",
    },
    {
      key: "questions",
      title: nav.questions,
      body: dict.thematic.questions.intro,
      path: "/research/questions",
    },
    {
      key: "sources",
      title: nav.sources,
      body: [sum.sources, ...bibliographyFlat].join(" "),
      path: "/research/sources",
    },
    {
      key: "about",
      title: nav.aboutProject,
      body: [
        dict.aboutProject.lede,
        ...dict.aboutProject.body,
        dict.aboutProject.usingBody,
        dict.aboutProject.accessBody,
      ].join(" "),
      path: "/about",
    },
    {
      key: "aboutResearch",
      title: nav.aboutResearch,
      body: [
        dict.aboutResearch.lede,
        ...dict.aboutResearch.intro,
        dict.aboutResearch.pillar1Body,
        dict.aboutResearch.pillar2Body,
        dict.aboutResearch.approachBody,
        dict.aboutResearch.examplesBody,
        dict.aboutResearch.standardsBody,
        dict.aboutResearch.outcomesBody,
      ].join(" "),
      path: "/about/research",
    },
    {
      key: "aboutFellowship",
      title: nav.aboutFellowship,
      body: [
        dict.aboutFellowship.lede,
        ...dict.aboutFellowship.intro,
        dict.aboutFellowship.foundationBody,
        dict.aboutFellowship.ackBody,
      ].join(" "),
      path: "/about/fellowship",
    },
    { key: "faq", title: dict.faq.title, body: dict.faq.intro, path: "/about/faq" },
    {
      key: "contact",
      title: nav.contact,
      body: [
        dict.contact.lede,
        dict.contact.correctionBody,
        dict.contact.contributeBody,
      ].join(" "),
      path: "/about/contact",
    },
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

  // Fellowship team and researchers, searchable by name, role, and bio so a
  // query like "Munkenbeck" or "Oberg" lands on the fellowship page.
  for (const member of dict.aboutFellowship.team) {
    docs.push({
      id: `team-${member.id}`,
      type: "person",
      typeLabel: c.searchTypeTeam,
      title: member.name,
      subtitle: member.role,
      href: href(`/about/fellowship#team-${member.id}`),
      body: member.bio,
    });
  }

  // Primary-source documents, each deep-linked to its card on the Primary
  // Sources page so a match lands the reader on the exact document.
  for (const s of primarySources) {
    docs.push({
      id: `primary-${s.id}`,
      type: "page",
      typeLabel: c.searchTypeSource,
      title: s.title,
      subtitle: [s.type, s.date].filter(Boolean).join(" · "),
      href: href(`/explore/primary-sources#source-${s.id}`),
      body: [s.context, s.whyItMatters, ...s.excerpts.map((e) => e.text)]
        .filter(Boolean)
        .join(" "),
    });
  }

  // Essays, each deep-linked to its card on the Essays page.
  for (const e of essays) {
    docs.push({
      id: `essay-${e.id}`,
      type: "page",
      typeLabel: c.searchTypeEssay,
      title: e.title,
      subtitle: e.author,
      href: href(`/research/essays#essay-${e.id}`),
      body: [e.summary, e.whyItMatters, ...e.excerpts].filter(Boolean).join(" "),
    });
  }

  // FAQ entries, searchable by question and answer.
  dict.faq.items.forEach((item, i) => {
    docs.push({
      id: `faq-${i}`,
      type: "page",
      typeLabel: c.searchTypePage,
      title: item.q,
      href: href(`/about/faq#faq-${i}`),
      body: item.a,
    });
  });

  return docs;
}
