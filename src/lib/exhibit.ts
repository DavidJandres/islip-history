// The digital exhibit's structure, kept as data so the landing page, the panel
// pages, prev/next navigation, and the sitemap all read one source. Copy for
// each panel lives in the dictionaries (dictionaries/<locale>/exhibit.json),
// keyed by these same slugs; this file owns *order and status*, not words.
//
// Adding or reordering a panel here updates the landing list, the panel routes,
// prev/next, and the sitemap at once. The slug is also the public URL segment
// (/exhibit/<slug>) and is what a printed QR code will point at, so treat a
// published slug as permanent.

export const exhibitPanels = [
  "the-promise",
  "before-the-town",
  "revolution-comes-to-islip",
  "washingtons-visit",
  "an-unfinished-promise",
  "many-roots-one-town",
  "the-promise-continues",
] as const;

export type PanelSlug = (typeof exhibitPanels)[number];

export const panelCount = exhibitPanels.length;

// Editorial state of each panel's *factual* content.
//   "draft"    — has real, human-editable copy that makes no contested factual
//                claims (framing/orientation panels). Shown with a light
//                "draft, under review" note.
//   "sourcing" — the text is a placeholder awaiting confirmed sources. Shown
//                with a prominent editorial banner so nothing unverified can be
//                mistaken for finished, citable content.
export const panelStatus: Record<PanelSlug, "draft" | "sourcing"> = {
  "the-promise": "draft",
  "before-the-town": "draft",
  "revolution-comes-to-islip": "draft",
  "washingtons-visit": "draft",
  "an-unfinished-promise": "draft",
  "many-roots-one-town": "draft",
  "the-promise-continues": "draft",
};

// Whether each panel's SPANISH body is a real translation (true) or still the
// translation-pending placeholder (false). Deliberately separate from
// panelStatus, which tracks factual review of the English source text. The
// panel page shows the "Spanish in progress" notice only while this is false.
export const panelBodyTranslated: Record<PanelSlug, boolean> = {
  "the-promise": true,
  "before-the-town": true,
  "revolution-comes-to-islip": true,
  "washingtons-visit": true,
  "an-unfinished-promise": true,
  "many-roots-one-town": true,
  "the-promise-continues": true,
};

export function panelNumber(slug: PanelSlug): number {
  return exhibitPanels.indexOf(slug) + 1; // 1-based, for "Panel 4 of 7"
}

export function panelNeighbors(slug: PanelSlug): {
  prev: PanelSlug | null;
  next: PanelSlug | null;
} {
  const i = exhibitPanels.indexOf(slug);
  return {
    prev: i > 0 ? exhibitPanels[i - 1] : null,
    next: i < exhibitPanels.length - 1 ? exhibitPanels[i + 1] : null,
  };
}

export function isPanelSlug(value: string): value is PanelSlug {
  return (exhibitPanels as readonly string[]).includes(value);
}

// Locale-agnostic panel paths, for the sitemap to append.
export const exhibitPanelPaths = exhibitPanels.map((s) => `/exhibit/${s}`);

// Lead image for each panel. Verified public-domain images (Library of Congress,
// National Portrait Gallery) sit here; panels without one render a reserved
// "image coming soon" frame (see the [panel] page). To add a real image later,
// drop the file in /public/exhibit and add one entry here — no layout changes.
export interface PanelImage {
  src: string;
  alt: string;
  credit?: string;
  // A plain-text summary of what the image/map actually shows, rendered as the
  // visible figcaption. For information-bearing maps this is the WCAG "text
  // alternative nearby": a reader who cannot see the map still gets its point.
  caption?: string;
}

export const panelImages: Partial<Record<PanelSlug, PanelImage>> = {
  "the-promise": {
    src: "/exhibit/the-promise.jpg",
    alt: "The 1823 William Stone engraved facsimile of the 1776 United States Declaration of Independence, showing its text and signatures.",
    credit:
      "The Declaration of Independence, 1823 William J. Stone facsimile of the 1776 original. Public domain.",
    caption:
      "The Declaration of Independence as engraved by William J. Stone in 1823, the best-known image of the 1776 text and its signatures.",
  },
  "before-the-town": {
    src: "/exhibit/before-the-town.jpg",
    alt: "A 1779 map of the colonial Province of New York, including all of Long Island, showing counties, manors, patents, townships, and private land grants.",
    credit:
      "A chorographical map of the Province of New-York, Claude Joseph Sauthier and William Faden, 1779. Library of Congress. Public domain.",
    caption:
      "This 1779 map shows the colonial Province of New York, with all of Long Island. Islip lies on the south shore of Suffolk County, between the Great South Bay and the island's wooded interior, divided into large private landholdings rather than villages.",
  },
  "revolution-comes-to-islip": {
    src: "/exhibit/revolution-comes-to-islip.jpg",
    alt: "A 1776 survey map of the Province of New York, including all of Long Island, the region that came under British occupation during the Revolution.",
    credit:
      "A map of the Province of New-York, Sauthier and Ratzer / William Faden, 1776. Library of Congress. Public domain.",
    caption:
      "This 1776 survey map shows Long Island as the war began. After the fighting at Brooklyn in August 1776, British forces controlled everything on this map east of the city, including Islip.",
  },
  "washingtons-visit": {
    src: "/exhibit/washingtons-visit.jpg",
    alt: "Gilbert Stuart's 1796 full-length Lansdowne portrait of President George Washington.",
    credit:
      "George Washington (Lansdowne portrait) by Gilbert Stuart, 1796. National Portrait Gallery. Public domain.",
    caption:
      "Gilbert Stuart's 1796 portrait of President George Washington, painted six years after his Long Island tour.",
  },
};

// "Explore further" links that bridge each panel to the deeper research pages,
// primary sources, essays, and people. Hrefs are locale-agnostic (prefixed at
// render); labels are English, matching the exhibit's source content.
export interface RelatedLink {
  label: string;
  href: string;
}

export const panelRelated: Partial<Record<PanelSlug, RelatedLink[]>> = {
  "the-promise": [
    { label: "About the research", href: "/about/research" },
    { label: "The timeline", href: "/timeline" },
  ],
  "before-the-town": [
    { label: "The 1710 Precinct act", href: "/explore/primary-sources#source-islip-precinct-1710" },
    { label: "The annual town meeting", href: "/explore/primary-sources#source-town-minutes-annual-meetings" },
    { label: "William Nicoll", href: "/people/william-nicoll" },
    { label: "Winnaquaheagh", href: "/people/winnaquaheagh" },
  ],
  "revolution-comes-to-islip": [
    { label: "The Islip Militia", href: "/research/militia" },
    { label: "The Articles of Association", href: "/explore/primary-sources#source-articles-of-association-1775" },
    { label: "The 1776 town gun", href: "/explore/primary-sources#source-town-minutes-1775-1776" },
    { label: "Benajah Strong", href: "/people/benajah-strong" },
    { label: "Flags & symbols", href: "/research/flags" },
  ],
  "washingtons-visit": [
    { label: "George Washington", href: "/people/george-washington" },
    { label: "Research questions", href: "/research/questions" },
    { label: "Henry Clinton", href: "/people/henry-clinton" },
  ],
  "an-unfinished-promise": [
    { label: "Life Under Occupation", href: "/research/occupation" },
    { label: "Wartime town meetings", href: "/explore/primary-sources#source-town-minutes-wartime" },
    { label: "Poor relief in the minutes", href: "/explore/primary-sources#source-town-minutes-poor-relief" },
    { label: "Enslaved labor at Sagtikos", href: "/research/essays#essay-sagtikos-enslaved-labor" },
    { label: "Isaac Thompson", href: "/people/isaac-thompson" },
  ],
  "many-roots-one-town": [
    { label: "The 1798 description", href: "/explore/primary-sources#source-conklin-description-1798" },
    { label: "Who lived in Islip in 1798?", href: "/research/essays#essay-who-lived-in-islip-1798" },
    { label: "Samuel Sitko", href: "/people/samuel-sitko" },
    { label: "The timeline", href: "/timeline" },
  ],
  "the-promise-continues": [
    { label: "The town's first minute book", href: "/explore/primary-sources#source-town-minutes-annual-meetings" },
    { label: "Research questions", href: "/research/questions" },
    { label: "Bibliography & sources", href: "/research/sources" },
    { label: "The fellowship", href: "/about/fellowship" },
  ],
};
