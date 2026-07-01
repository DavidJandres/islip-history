// Demographic figures shown on the Research page, kept in one place so there's
// a single spot to update when they're verified or a new ACS vintage lands.
//
// NOT YET VERIFIED: these are approximate values from Census QuickFacts, which
// serves numbers via JavaScript and couldn't be read programmatically. Confirm
// each against the live table in `source` before launch. The page labels them
// as approximate and in-review.

export interface CensusFigure {
  id: string;
  place: string;
  metricEn: string;
  metricEs: string;
  percent: number;
  source: string;
}

const QF = "https://www.census.gov/quickfacts/fact/table";

export const censusFigures: CensusFigure[] = [
  {
    id: "islip-hispanic",
    place: "Town of Islip",
    metricEn: "Hispanic or Latino",
    metricEs: "hispano o latino",
    percent: 37.8,
    source: `${QF}/isliptownsuffolkcountynewyork`,
  },
  {
    id: "islip-foreign-born",
    place: "Town of Islip",
    metricEn: "Foreign-born residents",
    metricEs: "residentes nacidos en el extranjero",
    percent: 23.2,
    source: `${QF}/isliptownsuffolkcountynewyork`,
  },
  {
    id: "islip-language",
    place: "Town of Islip",
    metricEn: "Speak a language other than English at home (age 5+)",
    metricEs: "hablan un idioma distinto del inglés en casa (5 años o más)",
    percent: 36.6,
    source: `${QF}/isliptownsuffolkcountynewyork`,
  },
  {
    id: "central-islip-hispanic",
    place: "Central Islip",
    metricEn: "Hispanic or Latino",
    metricEs: "hispano o latino",
    percent: 63.1,
    source: `${QF}/centralislipcdpnewyork`,
  },
  {
    id: "bay-shore-hispanic",
    place: "Bay Shore",
    metricEn: "Hispanic or Latino",
    metricEs: "hispano o latino",
    percent: 39.2,
    source: `${QF}/bayshorecdpnewyork`,
  },
];
