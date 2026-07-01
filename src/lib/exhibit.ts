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
}

export const panelImages: Partial<Record<PanelSlug, PanelImage>> = {
  "the-promise": {
    src: "/exhibit/the-promise.jpg",
    alt: "The 1823 William Stone engraved facsimile of the 1776 United States Declaration of Independence, showing its text and signatures.",
    credit:
      "The Declaration of Independence, 1823 William J. Stone facsimile of the 1776 original. Public domain.",
  },
  "before-the-town": {
    src: "/exhibit/before-the-town.jpg",
    alt: "A 1779 map of the colonial Province of New York, including all of Long Island, showing counties, manors, patents, townships, and private land grants.",
    credit:
      "A chorographical map of the Province of New-York, Claude Joseph Sauthier and William Faden, 1779. Library of Congress. Public domain.",
  },
  "revolution-comes-to-islip": {
    src: "/exhibit/revolution-comes-to-islip.jpg",
    alt: "A 1776 survey map of the Province of New York, including all of Long Island, the region that came under British occupation during the Revolution.",
    credit:
      "A map of the Province of New-York, Sauthier and Ratzer / William Faden, 1776. Library of Congress. Public domain.",
  },
  "washingtons-visit": {
    src: "/exhibit/washingtons-visit.jpg",
    alt: "Gilbert Stuart's 1796 full-length Lansdowne portrait of President George Washington.",
    credit:
      "George Washington (Lansdowne portrait) by Gilbert Stuart, 1796. National Portrait Gallery. Public domain.",
  },
};
