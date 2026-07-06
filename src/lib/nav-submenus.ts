// Second-level "cascade" flyouts for the primary nav, plus the Exhibit flyout.
//
// Most nav labels come from dict.nav (see src/lib/site.ts). These menus are
// different: they are derived from CONTENT (exhibit panels, collection groups,
// primary-source themes, essay categories, lesson plans), so their labels live
// in the content dictionaries / data libs, not in dict.nav. We resolve them
// here, on the server, into a map keyed by the PARENT item's locale-agnostic
// href, and hand PrimaryNav a plain {href, label, group?} list. PrimaryNav
// imports only the TYPE from this file, so none of the content dictionaries are
// pulled into the client bundle.
//
// Keys are the same locale-agnostic hrefs used in primaryNav:
//   "/exhibit"                 -> a one-level flyout of the 7 panels (real routes)
//   "/explore/collections"     -> cascade: the 9 collection groups  (#anchors)
//   "/explore/primary-sources" -> cascade: the 8 source themes       (#anchors)
//   "/research/essays"         -> cascade: the 8 essay categories     (#anchors)
//   "/teach/lesson-plans"      -> cascade: the lessons, grouped by grade (routes)
//
// Anchor ids MUST match what the target pages already render:
//   collections page          id="collection-<key>"
//   primary-sources page      id="theme-<theme>"
//   essays page               id="cat-<category>"

import type { Dictionary } from "@/i18n/dictionaries";
import { exhibitPanels } from "./exhibit";
import { collectionGroups } from "./collections";
import { sourceThemes } from "./primary-sources";
import { essayCategories } from "./essays";
import { lessonPlans } from "./teaching";

export interface SubmenuEntry {
  // Locale-agnostic href (route or route#anchor); PrimaryNav prefixes the locale.
  href: string;
  // Already localized (resolved from the content dictionary below).
  label: string;
  // Optional heading shown when it changes down the list (lessons -> grade).
  group?: string;
}

// Resolve every content-derived submenu for one locale's dictionary. Called once
// per request in the layout (a server component) and passed to PrimaryNav.
export function navSubmenus(dict: Dictionary): Record<string, SubmenuEntry[]> {
  // dict.collections.groups is typed with its specific keys; collectionGroups
  // carries the same keys as plain strings, so widen the lookup once here.
  const groups = dict.collections.groups as Record<string, { title: string; blurb: string }>;

  return {
    "/exhibit": exhibitPanels.map((slug) => ({
      href: `/exhibit/${slug}`,
      label: dict.exhibit.panels[slug].title,
    })),
    "/explore/collections": collectionGroups.map((g) => ({
      href: `/explore/collections#collection-${g.key}`,
      label: groups[g.key].title,
    })),
    "/explore/primary-sources": sourceThemes.map((theme) => ({
      href: `/explore/primary-sources#theme-${theme}`,
      label: dict.primarySources.themes[theme],
    })),
    "/research/essays": essayCategories.map((category) => ({
      href: `/research/essays#cat-${category}`,
      label: dict.essays.categories[category],
    })),
    "/teach/lesson-plans": lessonPlans.map((lesson) => ({
      href: `/teach/lesson-plans/${lesson.id}`,
      label: lesson.title,
      group: lesson.grade,
    })),
  };
}
