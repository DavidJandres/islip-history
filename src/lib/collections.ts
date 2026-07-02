// The Collections landing page: an early, deliberately rough "mash" that
// groups the archive's existing material by theme and links OUT to it. This is
// a holding area, not a finished catalog — the page says so plainly. Nothing
// here duplicates content; every entry is a pointer to a source card, essay,
// timeline moment, person, or thematic page that already exists. Labels for
// each group live in dictionaries/<locale>/collections.json under `groups`.
//
// Hrefs are locale-agnostic (prefixed at render), same convention as
// panelRelated in exhibit.ts, and are verified by scripts/integrity-check.ts.

export interface CollectionLink {
  label: string;
  href: string;
}

export interface CollectionGroup {
  key: string;
  links: CollectionLink[];
}

export const collectionGroups: CollectionGroup[] = [
  {
    key: "townRecords",
    links: [
      { label: "The annual town meeting (1739–1800)", href: "/explore/primary-sources#source-town-minutes-annual-meetings" },
      { label: "Caring for the poor in the minutes", href: "/explore/primary-sources#source-town-minutes-poor-relief" },
      { label: "The 1765 fishing rule", href: "/explore/primary-sources#source-town-minutes-fishing-1765" },
      { label: "Wartime meetings under the King's name", href: "/explore/primary-sources#source-town-minutes-wartime" },
      { label: "1784: dating records by American independence", href: "/explore/primary-sources#source-town-minutes-1784" },
      { label: "Essay: A Town That Kept Meeting", href: "/research/essays#essay-town-kept-meeting" },
      { label: "Essay: What the Minutes Reveal About Daily Life", href: "/research/essays#essay-minutes-daily-life" },
      { label: "Timeline: the 1739 annual meeting", href: "/timeline#1739-annual-meeting" },
    ],
  },
  {
    key: "revolution",
    links: [
      { label: "The Islip Precinct Articles of Association (1775)", href: "/explore/primary-sources#source-articles-of-association-1775" },
      { label: "Town offices on the eve of revolution, and a town gun", href: "/explore/primary-sources#source-town-minutes-1775-1776" },
      { label: "The Islip Militia", href: "/research/militia" },
      { label: "Life Under Occupation", href: "/research/occupation" },
      { label: "The 1781 plundering resolution", href: "/explore/primary-sources#source-plundering-resolution-1781" },
      { label: "Timeline: occupation begins (1776)", href: "/timeline#1776-occupation-begins" },
      { label: "Timeline: privateers at Fire Island Inlet", href: "/timeline#1776-privateers-inlet" },
    ],
  },
  {
    key: "sagtikos",
    links: [
      { label: "Isaac Thompson", href: "/people/isaac-thompson" },
      { label: "Mary Gardiner Thompson", href: "/people/mary-gardiner-thompson" },
      { label: "Essay: Isaac Thompson, a Man on a Tightrope", href: "/research/essays#essay-thompson-tightrope" },
      { label: "Essay: Enslaved and Indentured Labor at Sagtikos", href: "/research/essays#essay-sagtikos-enslaved-labor" },
      { label: "Timeline: beginnings of Sagtikos Manor", href: "/timeline#1692-1697-sagtikos" },
      { label: "Timeline: Washington's 1790 visit", href: "/timeline#1790-washington" },
      { label: "George Washington", href: "/people/george-washington" },
    ],
  },
  {
    key: "mapsPlaces",
    links: [
      { label: "Exhibit: Before the Town (1779 province map)", href: "/exhibit/before-the-town" },
      { label: "Exhibit: Revolution Comes to Islip (1776 map)", href: "/exhibit/revolution-comes-to-islip" },
      { label: "Essay: Bay, Road, and Farm", href: "/research/essays#essay-bay-road-farm" },
      { label: "Conklin's 1798 description of the town", href: "/explore/primary-sources#source-conklin-description-1798" },
      { label: "Historical maps (in preparation)", href: "/explore/maps" },
    ],
  },
  {
    key: "people",
    links: [
      { label: "All people", href: "/people" },
      { label: "Winnaquaheagh", href: "/people/winnaquaheagh" },
      { label: "Benajah Strong", href: "/people/benajah-strong" },
      { label: "Nathaniel Conklin", href: "/people/nathaniel-conklin" },
      { label: "York and Elizabeth", href: "/people/york-and-elizabeth" },
      { label: "Samuel Sitko", href: "/people/samuel-sitko" },
    ],
  },
  {
    key: "dailyLife",
    links: [
      { label: "Essay: What the Minutes Reveal About Daily Life", href: "/research/essays#essay-minutes-daily-life" },
      { label: "Poor relief in the town minutes", href: "/explore/primary-sources#source-town-minutes-poor-relief" },
      { label: "Essay: In the Good Old Colony Day", href: "/research/essays#essay-good-old-colony-day" },
      { label: "Essay: Singing and Defying the British Occupiers", href: "/research/essays#essay-singing-defiance" },
      { label: "Timeline: the 1765 fishing rule", href: "/timeline#1765-fishing-rule" },
    ],
  },
  {
    key: "schoolsChurches",
    links: [
      { label: "School commissioners in the town records (1796)", href: "/explore/primary-sources#source-town-minutes-schools-1796" },
      { label: "Timeline: St. John's / Charlotte Church (c. 1765)", href: "/timeline#1765-st-johns" },
      { label: "Timeline: Bay Shore Hebrew cemetery association (1897)", href: "/timeline#1897-cemetery" },
      { label: "Timeline: the first synagogue (1918)", href: "/timeline#1918-synagogue" },
      { label: "Essay: The 1798 Description, Islip After the Revolution", href: "/research/essays#essay-conklin-1798-islip" },
    ],
  },
  {
    key: "raceStatus",
    links: [
      { label: "Essay: Who Lived in Islip? (1798)", href: "/research/essays#essay-who-lived-in-islip-1798" },
      { label: "Conklin's 1798 description of the town", href: "/explore/primary-sources#source-conklin-description-1798" },
      { label: "Timeline: York and Elizabeth's 1783 marriage record", href: "/timeline#1783-st-johns-mixed" },
      { label: "Essay: Enslaved and Indentured Labor at Sagtikos", href: "/research/essays#essay-sagtikos-enslaved-labor" },
      { label: "Timeline: people of color in early Islip (1790–1800)", href: "/timeline#1790-1800-population" },
    ],
  },
  {
    key: "flagsSymbols",
    links: [
      { label: "Flags & Symbols", href: "/research/flags" },
      { label: "Essay: The Colonial Flags of Islip Precinct, Part One", href: "/research/essays#essay-flags-part-one" },
      { label: "Essay: The Colonial Flags of Islip Precinct, Part Two", href: "/research/essays#essay-flags-part-two" },
      { label: "The Huntington Liberty Flag (regional context)", href: "/explore/primary-sources#source-huntington-liberty-flag" },
      { label: "Timeline: the 1883 Town Seal", href: "/timeline#1883-town-seal" },
    ],
  },
];
