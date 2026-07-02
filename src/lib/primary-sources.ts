// Primary-source documents used in the project: colonial and state laws, town
// records, resolutions, letters, and newspaper accounts. Stored as data so the
// Primary Sources page and the thematic pages (Occupation, Militia, Flags,
// Research Questions) can all read from one place. Quoted text preserves the
// original spelling, capitalization, and punctuation of the source or the
// available transcription. `theme` sets the group on the Primary Sources page;
// `tags` let a document also appear on a thematic page.

import type { Locale } from "@/i18n/config";
import { primarySourcesEs } from "./primary-sources-es";

export type SourceStatus = "verified" | "draft" | "review" | "pending";

export interface SourceExcerpt {
  label?: string;
  text: string;
}

export interface PrimarySource {
  id: string;
  theme: string;
  tags?: string[];
  title: string;
  date?: string;
  type: string;
  context: string;
  excerpts: SourceExcerpt[];
  whyItMatters?: string;
  citation: string;
  status?: SourceStatus;
}

// Theme groups, in the order the Primary Sources page shows them. Labels are
// localized in dictionaries/<locale>/primary-sources.json (`themes`).
export const sourceThemes = [
  "founding",
  "records",
  "revolution",
  "militia",
  "occupation",
  "laws",
  "newspapers",
  "context",
] as const;

export type SourceTheme = (typeof sourceThemes)[number];

export const primarySources: PrimarySource[] = [
  // ---------------- Founding & Local Government ----------------
  {
    id: "islip-precinct-1710",
    theme: "founding",
    tags: ["government"],
    title: "Act Creating the Precinct of Islip Government",
    date: "November 25, 1710",
    type: "Colonial law",
    status: "verified",
    context:
      "This colonial act is one of the most important documents for the origins of Islip government. It did not create a modern town, but it allowed the Precinct of Islip to elect local officials and keep public accounts.",
    excerpts: [
      {
        text: "An Act to enable the Precincts of Islip, in the County of Suffolk, to elect two Assessors, a Collector, Constable and Supervisor.\n\n[Passed, November 25, 1710.]\n\nBe it enacted by the Governour, Councill and Assembly, and by Authority of the same, That from and after the publication of this Act, it shall and may be lawful for the Inhabitants of the Districts & Precincts of Islip, in the County of Suffolk, on the South side of Long Island, from the Westernmost Limits of the Land of Thomas Willets, the Easternmost part of the Lands of William Nicoll, near Blew Point, and they are hereby Impower'd & required Annually to Elect & Chose, among them, two Assessors and a Collector, to Assess and Collect such Taxes as shall be now or hereafter laid or Impos'd on them & a Constable and Supervisor, for keeping the Peace & Auditing their Publick Accounts, at the usual time the County of Suffolk hath or shall do.",
      },
    ],
    whyItMatters:
      "This is one of the strongest founding documents for Islip's government. It shows that early Islip civic life was built around taxation, public accounts, local order, and elected offices, and it complicates the simpler claim that Islip was simply “founded in 1683.”",
    citation:
      "New York State Commissioners of Statutory Revision, “An Act to enable the Precincts of Islip…,” passed November 25, 1710, in The Colonial Laws of New York from the Year 1664 to the Revolution (Albany: State Printer, 1894), 722–723.",
  },
  {
    id: "thompson-town-offices",
    theme: "founding",
    tags: ["government"],
    title: "Town Minutes on Isaac Thompson's Public Offices",
    type: "Town record",
    status: "verified",
    context:
      "The Precinct of Islip minutes trace Isaac Thompson's public service. They show he was not only a Sagtikos Manor figure but held practical local offices tied to highways, poor relief, town supervision, records, accounts, licenses, and assessment.",
    excerpts: [
      {
        text: "The minutes for the Precinct of Islip reveal that Isaac Thompson entered government service by being elected as one of the “Overseers of the Highways” in April 1768 at the age of 26.",
      },
      {
        text: "Isaac Thompson would remain the Supervisor of the Precinct of Islip until 1785, continuing in the office throughout the entire occupation period and into the precinct becoming part of the State of New York. He also held the office of Clerk in the year 1779… In 1787 he was elected as the Assessor, a person who set the tax rate or other funds owed to the Precinct.",
      },
    ],
    whyItMatters:
      "This makes Isaac Thompson more than a mansion owner or Washington host. He was part of Islip's working government before, during, and after the Revolution, which made his patriot sympathies riskier during occupation.",
    citation:
      "Precinct of Islip minutes, excerpts discussed in George J. Munkenbeck, “Isaac Thompson: A Man on a Tightrope,” in Town of Islip Revolutionary War Resource Guide.",
  },

  // ---------------- Town Records & Early Descriptions ----------------
  // Curated from the town's first minute book (Starace transcription, digitized
  // by the Office of the Town Historian) and Nathaniel Conklin's 1798
  // description. Bracketed words normalize obvious slips in the transcription.
  {
    id: "town-minutes-annual-meetings",
    theme: "records",
    tags: ["government"],
    title: "The Annual Town Meeting: Local Government at Work",
    date: "1739–1800",
    type: "Town minutes",
    status: "verified",
    context:
      "Every year on the first Tuesday of April, the freeholders and inhabitants of Islip met and elected the officers who ran the town: a supervisor, a clerk, assessors, a collector, a constable, overseers of the poor, overseers of the highways, and fence viewers. The first minute book records this meeting year after year, through peace, war, and occupation. The 1739 entry below is typical, and the meetings themselves were held in neighbors' houses, set for two o'clock in the afternoon.",
    excerpts: [
      {
        label: "The officers chosen in April 1739",
        text: "George Phillips Supervisor & Clark, Thomas Willits & George Phillips Assessors, John Arthur Constable & Collector, Ananias Carle & James Sextone Overseers to take care of ye Pore of ye Town for ye year ensuing.",
      },
      {
        label: "Meeting times and places (1780 and 1795)",
        text: "It is agreed upon that our Town meetings for the future Shall begin at Two O Clock. [1780]\n\nTown Meeting to be held the next year at the House of Benajah Strong's the 1st Tuesday of April at 2 °clock on s.d day. [1795]",
      },
    ],
    whyItMatters:
      "The annual meeting is one of Islip's oldest institutions. These entries show self-government as a working routine, with ordinary neighbors taking yearly turns as supervisor, clerk, assessor, constable, overseer, and fence viewer, decades before American independence made self-government a national idea.",
    citation:
      "Islip town minutes, 1739–1800, in Carl A. Starace, ed., Book One of the Minutes of Town Meetings and Register of Animal Ear Marks of the Town of Islip, 1720–1861 (Town of Islip, 1982); digitized by the Office of the Town Historian, Town of Islip.",
  },
  {
    id: "town-minutes-poor-relief",
    theme: "records",
    tags: ["government"],
    title: "Caring for the Poor in the Town Minutes",
    date: "1739–1787",
    type: "Town minutes",
    status: "verified",
    context:
      "Long before public welfare systems, the town itself was responsible for its poorest residents, and overseers of the poor were elected every April. The minutes show what that duty looked like in practice: weekly board for Hannah Hulse, nursing for “Old Joseph” in sickness, town grain for a woman the clerk called “Indian hannah,” and, in the middle of the occupation, a formal plan to raise poor-relief money (1782) and to support Johanna Hutton and her child (1783).",
    excerpts: [
      {
        label: "Hannah Hulse, 1739",
        text: "It was agreed at ye Town Meeting by Aning Moubray to keep Hannah Hulse ye year ensuing at one Shilling and ten pence three farthings Per week as many weeks as he keeps her if she should live within ye year.",
      },
      {
        label: "Joseph Nicolls, 1740",
        text: "Joseph Nicolls Mallator [mulatto] agreed to keep Hannah Hulse for 2 shillings per week so long as ye overseers shall see fit.",
      },
      {
        label: "Nursing care, 1750",
        text: "Paid to John Moubray for his Mother's nursing Old Joseph in his sickness out of the Towns money the Sum of Thirteen Shillings and Six Pence.",
      },
      {
        label: "Johanna Hutton and her child, 1783",
        text: "It is Voted by the majority of the town that Johanah Hutton & Her Child for to begin at the west End of the town[.] & Each family to ceape [keep] ther in perposhion [proportion] as they are Rated.",
      },
      {
        label: "Grain for Indian Hannah, 1787",
        text: "Paid to Garet Monfort one of the towns men two Pounds of the towns money on account of findin[g] grain for Indian hannah.",
      },
    ],
    whyItMatters:
      "These entries put individual people, including people of color, into Islip's civic record decades before any census counted them. They also show the town treating care for the poor as ordinary public business that kept working through the war: in 1782 the meeting agreed that the overseers of the poor, with one justice, would set and collect the money needed, and in 1783 it arranged support for Johanna Hutton and her child family by family. Accounts beside the 1782 minutes record payments to “Joanna Hudson,” apparently the same woman under a different spelling.",
    citation:
      "Islip town minutes, 1739–1787, in Carl A. Starace, ed., Book One of the Minutes of Town Meetings and Register of Animal Ear Marks of the Town of Islip, 1720–1861 (Town of Islip, 1982); digitized by the Office of the Town Historian, Town of Islip.",
  },
  {
    id: "town-minutes-fishing-1765",
    theme: "records",
    tags: ["government"],
    title: "Protecting the Bay: The 1765 Fishing Rule",
    date: "April 1765",
    type: "Town minutes",
    status: "verified",
    context:
      "The Great South Bay fed Islip's families and its economy, and the town treated access to it as town business. In 1765 the annual meeting voted that any inhabitant who gave an outsider leave to fish in the bay or creeks would forfeit forty shillings, and the fine went to the poor. The rule was renewed in 1766 with a legal way to recover the fine, and the instinct lasted: in 1815 the town voted that non-residents could not carry clams, fish, horsefeet [horseshoe crabs], or fowl out of the town.",
    excerpts: [
      {
        label: "The 1765 vote",
        text: "It is also concluded upon by the majority of Voats that i[f] any one of the Inhabitants of the precinct of Islip Shall Give Leave to any furniener [foreigner] to fish in the bay or also in the Creek that He Shall forfit the Sum of forty shillings to the overseers of the poor for the use of the poor of the Said town.",
      },
      {
        label: "The same instinct in 1815",
        text: "Voted, that any person not being a resident in the town of Islip Shall not Catch or Carry out of the town any fish under the penalty of ten dollars for every offence.",
      },
    ],
    whyItMatters:
      "Bay access was town politics from the beginning. This is an early piece of local economic and environmental regulation, and the fine's destination, “the use of the poor,” ties the bay's bounty directly to the town's care for its neediest residents.",
    citation:
      "Islip town minutes, 1765, 1766, and 1815, in Carl A. Starace, ed., Book One of the Minutes of Town Meetings and Register of Animal Ear Marks of the Town of Islip, 1720–1861 (Town of Islip, 1982); digitized by the Office of the Town Historian, Town of Islip.",
  },
  {
    id: "town-minutes-1775-1776",
    theme: "records",
    tags: ["government"],
    title: "Town Offices on the Eve of Revolution, and a Town Gun",
    date: "April 1775 – April 1776",
    type: "Town minutes",
    status: "verified",
    context:
      "The town's own minute book records the Revolution arriving inside ordinary local government. At the annual meeting in April 1775, weeks before Islip signed the Articles of Association, Benajah Strong and Isaac Thompson were elected overseers of the highways, and Thompson was also an overseer of the poor. Within a year the same two men had organized Islip's militia company, with Strong as captain. At the April 1776 meeting, Isaac Thompson was elected supervisor for the first time, replacing William Nicoll, and the clerk recorded the purchase of a gun as town property.",
    excerpts: [
      {
        label: "April 1775: town offices",
        text: "Overseers of the Poor: Jacob Willets Senior, Obediah Green, Isaac Thomson. Overseers of the Highway: James Morris Junior, William Smith Junior, Benajah Strong, Isaac Thomson.",
      },
      {
        label: "April 1776: a new supervisor",
        text: "Jacob Willets Clerk. Isaac Thompson Supervisor. Platt Smith Constable and Collector.",
      },
      {
        label: "The town gun",
        text: "A Gun and the accutriments paid for at Said Town Meeting which are the property of the towns.",
      },
    ],
    whyItMatters:
      "The minutes do not say why the town bought the gun, and this project does not claim it was for the militia. What the record does show is a town whose elected leaders, Thompson and Strong, were the same men organizing Islip's part in the Revolution, and a town meeting in April 1776 paying for a gun and recording it as public property. The date is suggestive; the purpose remains an open research question.",
    citation:
      "Islip town minutes, April 1775 and April 1776, in Carl A. Starace, ed., Book One of the Minutes of Town Meetings and Register of Animal Ear Marks of the Town of Islip, 1720–1861 (Town of Islip, 1982); digitized by the Office of the Town Historian, Town of Islip.",
  },
  {
    id: "town-minutes-wartime",
    theme: "records",
    tags: ["occupation"],
    title: "Wartime Town Meetings Under the King's Name",
    date: "1777–1783",
    type: "Town minutes",
    status: "verified",
    context:
      "British and Loyalist forces occupied Long Island from September 1776 until late 1783, and Islip's minute book shows the town holding its annual meeting every April through all of it. The meetings elected the usual officers, continued the usual hog and boar rules, and kept the accounts. As legal records made under Crown authority, they dated each wartime meeting by the reign of King George III. Isaac Thompson, who had signed the Articles of Association in 1775, was re-elected supervisor at every one of these meetings.",
    excerpts: [
      {
        label: "April 1777",
        text: "At a Town Meeting of Said Presinct held the first Tuesday of April in the Seventeenth year of his present Majesties Reign George the Third King of Great Britain &:C: It was therein Declared by the Majority of Votes approved of as followeth… Isaac Thompson Supervisor.",
      },
      {
        label: "April 1783, the last meeting dated by the Crown",
        text: "At a town meeting of the precinct held the first tuesday in April In the three and twentieth year of the Reign of his Majesty King George the third King of great Britain & c…",
      },
    ],
    whyItMatters:
      "The King's name in these headings is not proof that Islip's people were Loyalists. It is the official wording required of legal records in occupied territory, and it is evidence of how complicated the transition to independence really was: a town could keep governing itself, care for its poor, and re-elect a supervisor who had signed a patriot pledge, all under a dateline that still said “his Majesty King George the third.”",
    citation:
      "Islip town minutes, 1777–1783, in Carl A. Starace, ed., Book One of the Minutes of Town Meetings and Register of Animal Ear Marks of the Town of Islip, 1720–1861 (Town of Islip, 1982); digitized by the Office of the Town Historian, Town of Islip.",
  },
  {
    id: "town-minutes-1784",
    theme: "records",
    tags: ["government"],
    title: "1784: Dating the Town's Records by American Independence",
    date: "April 1784",
    type: "Town minutes",
    status: "verified",
    context:
      "The British evacuated New York in November 1783. When Islip's annual meeting gathered the following April, the clerk opened the record with entirely new words: not the reign of a king, but the authority of the people of the State of New York and the year of American independence. Isaac Thompson, supervisor through every year of the war, was re-elected under the new heading.",
    excerpts: [
      {
        label: "The April 1784 heading",
        text: "At a town meting of the precenct held the first tuesday in April by the Authority of the good People of the State of new york and in the Eighth year of the American Independence…",
      },
      {
        label: "April 1785",
        text: "At a town meting of the precinct held the first tuesday in Apri[l] by the Authority of the People of the State of New York and in the Ninth year of the American Independancey…",
      },
    ],
    whyItMatters:
      "This heading is the Revolution's paper trail in Islip: the moment the town's own records stopped counting years by George III and started counting them from 1776. Nothing else about the meeting changed, the same offices, the same hog act, the same accounts, and that is exactly the point. Independence arrived in Islip's records not as a battle but as a change in whose name the town governed itself.",
    citation:
      "Islip town minutes, April 1784 and April 1785, in Carl A. Starace, ed., Book One of the Minutes of Town Meetings and Register of Animal Ear Marks of the Town of Islip, 1720–1861 (Town of Islip, 1982); digitized by the Office of the Town Historian, Town of Islip.",
  },
  {
    id: "town-minutes-schools-1796",
    theme: "records",
    tags: ["government"],
    title: "School Commissioners Appear in the Town Records",
    date: "1796–1799",
    type: "Town minutes",
    status: "verified",
    context:
      "In April 1796 the annual meeting elected commissioners of the schools for the first time in the minute book: Richard Udall, Nathaniel Conklin, and Nehemiah Higbie. New York State had passed an act to encourage common schools in 1795, and Islip's records show the town taking part the following spring: commissioners elected in 1796 and again in 1797, and in 1799 an order about school money collected in 1797 and 1798. Conklin's own 1798 description fills in the picture with five small schoolhouses, teachers hired by the quarter, and 11,814 days of instruction in a single year.",
    excerpts: [
      {
        label: "April 1796",
        text: "Commisioners of the Schools: Richard Udall, Nathaniel Conklin, Nehemiah Higbie.",
      },
      {
        label: "April 1799",
        text: "The Commissioners of Schools & Collector are ordered to pay the monies collected in the Town for the use of Schools in the years 1797 & 1798 into the hands of the Town Treasurer.",
      },
    ],
    whyItMatters:
      "Public education enters Islip's records here, handled at the same annual meeting that elected fence viewers and continued the hog act. It also connects two of the project's sources: Nathaniel Conklin, one of the town's first school commissioners, is the same man who wrote the 1798 description of the town.",
    citation:
      "Islip town minutes, 1796–1799, in Carl A. Starace, ed., Book One of the Minutes of Town Meetings and Register of Animal Ear Marks of the Town of Islip, 1720–1861 (Town of Islip, 1982); digitized by the Office of the Town Historian, Town of Islip.",
  },
  {
    id: "conklin-description-1798",
    theme: "records",
    tags: ["government"],
    title: "Nathaniel Conklin's Description of the Town of Islip",
    date: "January 11, 1798",
    type: "Letter / official description",
    status: "verified",
    context:
      "Supervisor Nathaniel Conklin wrote this description to defend Islip's boundaries in a dispute with Huntington, but he gave far more than a boundary argument: a full portrait of the town fifteen years after the Revolution. He described the farms and “necks” divided by creeks, the houses strung along the South Country Road facing the bay, the pine plains covering about four fifths of the town, the bay's oysters, clams, and waterfowl, the crops and cattle, the churches, schoolhouses, mills, and taverns, and who lived in the town's roughly 120 houses.",
    excerpts: [
      {
        label: "The shape of the town",
        text: "the lands and meadows are divided in farms or necks (as they are called) by Creeks and Brooks mostly about half of a mile apart… the houses and other buildings are mostly set on the North side of the said road facing the Road, the Bay, and the Ocean.",
      },
      {
        label: "Fire Island Inlet and the privateers of 1776",
        text: "in the late war in the year 1776 there were three American privateers lay within this Inlet, and went out, as opportunity offered; and captured a number of British Vessels, and brought them through this Inlet into the Bay; among which was a Transport ship of about three hundred Tons burthen.",
      },
      {
        label: "The bay's bounty",
        text: "In this bay and within the limits of this Town are some Oysters, plenty of Clams; and in the season for them plenty of wild Geese, Brant, and Ducks, of almost every kind, and Snipes also Fish of various kinds, the most esteemed of which is the Sheepshead and many of them are sent to the New York market.",
      },
      {
        label: "Who lived in Islip",
        text: "There are in this Town about one hundred and twenty dweling [dwelling] houses twenty-five of which Indians, Mustees and free Negros live in.",
      },
      {
        label: "Churches and schools",
        text: "there are five Small houses built for Schoolhouses in this town, but the Schoolmasters, are commonly hired by the quarter of the year… from the first of March 1796 to first of March 1797 there were twelve masters had been imployed [employed] in teaching schools in this Town and number of the days instructed were eleven thousand eight hundred and fourteen.",
      },
      {
        label: "The poor and the taverns",
        text: "At present there is not any poor person that is supported at the expense of this Town… for several years past… the money received for granting permit[s] to retail Spiritual Liquors has been sufficient to Support the Poor of this Town… there are five Taverns in this Town and all on the South Country Road.",
      },
    ],
    whyItMatters:
      "This is the fullest picture the project has found of what Islip actually was in the first generation after independence: a farming and bay town of about 120 households, roughly one in five of them home to Native, mixed-ancestry, and free Black residents (“Mustee” is a period word for people of mixed ancestry, commonly Native American and African). It anchors the exhibit's hardest question in a primary source: who lived in the town the Revolution had promised to make free?",
    citation:
      "Nathaniel Conklin, “Description of the Town of Islip in Suffolk County,” January 11, 1798; transcribed and annotated by Christopher Albergo and George J. Munkenbeck, Office of the Town Historian, Town of Islip.",
  },

  // ---------------- Revolution & Loyalty ----------------
  {
    id: "articles-of-association-1775",
    theme: "revolution",
    tags: ["militia"],
    title: "The Islip Precinct Articles of Association",
    date: "May 10, 1775",
    type: "Founding document",
    status: "verified",
    context:
      "On May 10, 1775, weeks after Lexington and Concord, Islip Precinct held a special meeting where residents could sign a local document supporting the Continental Congress's Articles of Association. Signing was not symbolic. The Town Historian explains that a signature on this paper was an act of treason against the Crown.",
    excerpts: [
      {
        label: "The Islip Precinct Articles of Association",
        text: "Persuaded that the salvation of the rights and liberties of America depends, under God, on the firm union of its inhabitants… We, the Freemen, Freeholders, and inhabitants of Islip Precinct, being greatly alarmed at the avowed design of the ministry to raise an revenue in America, and shocked by the bloody scene now acting the Massachusetts Bay, do, in the most solemn manner, resolve never to become slaves; and do associate under the ties of religion, honor, and love to our country to adopt and endeavor to carry into execution, whatever measure may be recommended by the Continental Congress, or resolved upon by our Provincial Convention… until a reconciliation between Great Britian and America on constructional principles (which we most ardently desire) can be obtained.",
      },
      {
        label: "Context from the Town Historian",
        text: "In 1776 the population of Islip Precinct was 375 and it appears that 35 of those eligible signed the Islip document, not counting those who signed elsewhere. This was a large number of supporters considering slaves, free blacks, native Americans, women and children could not sign. Also, the Quakers who lived in Islip could not sign due to their religious beliefs. Only five residents were listed as refusing to sign. A signature on this paper was an act of treason and so the first steps were taken.",
      },
    ],
    whyItMatters:
      "This is one of the clearest documents showing that Islip residents made political choices before the British occupation. It also supports the exhibit's larger theme: independence was a promise, but participation was limited. Women, enslaved people, free Black people, Native Americans, children, and Quakers were excluded or unable to sign.",
    citation:
      "“The Islip Precinct Articles of Association,” May 10, 1775, in George J. Munkenbeck, Town of Islip Revolutionary War Resource Guide, Part Six, Office of the Town Historian, Town of Islip. Full signer list under review.",
  },

  // ---------------- Militia & Military Organization ----------------
  {
    id: "thompson-militia-letter-1776",
    theme: "militia",
    tags: ["militia"],
    title: "Isaac Thompson Requests Commissions for an Islip Militia Company",
    date: "February 9, 1776",
    type: "Letter",
    status: "verified",
    context:
      "Writing as chairman of the Committee of Islip, Isaac Thompson asked the Provincial Congress to grant commissions for officers of a militia company chosen by the people of the precinct. The letter names Benajah Strong as captain and shows Islip residents wanted a company of their own rather than being split between the Smithtown and Huntington companies.",
    excerpts: [
      {
        text: "Islip in Suffolk County, February 9th, A.D. 1776.\n\nSIR – There never has been a militia company formed in this precinct. But they that bore arms in the east part of this precinct have been in the Smithtown company; and those in the west part of this precinct have been under a Huntington captain, which has been disagreeable to the greatest part of the people of this precinct, and it has been the cause of uneasiness amongst us.",
      },
      {
        text: "The people of this precinct proceeded to the choice of their officers. They unanimously chose Benajah Strong, for their Captain; Jeremiah Terry, for their first lieutenant; Samuel Oakley, for their second lieutenant; and Annen Mobray, for their ensign… We desire that commissions may be granted to the above named persons.\n\nSigned by order of the committee of Islip,\nISAAC THOMPSON, Chairman.\n\nP.S. there is about thirty-six or thirty-seven that would belong to this company.",
      },
    ],
    whyItMatters:
      "This shows Islip was not passive before occupation. Local residents organized politically and militarily, selected their own officers, and sought recognition from the Provincial Congress. It connects Isaac Thompson, Benajah Strong, Jeremiah Terry, Samuel Oakley, and Annen Mobray to the local patriot movement.",
    citation:
      "Isaac Thompson, Committee of Islip, to the President of the Provincial Congress, February 9, 1776, excerpted in George J. Munkenbeck, “Isaac Thompson: A Man on a Tightrope,” in Town of Islip Revolutionary War Resource Guide.",
  },
  {
    id: "provincial-congress-militia-1776",
    theme: "militia",
    tags: ["militia"],
    title: "Provincial Congress Entry on the Islip Militia Company",
    date: "February 9, 1776",
    type: "Government record",
    status: "verified",
    context:
      "This entry summarizes Isaac Thompson's February 1776 letter to the Provincial Congress and condenses the militia story into a single paragraph.",
    excerpts: [
      {
        text: "Entry 565. Isaac Thompson, Chairman of Committee of Islip, writes to Congress, Feb. 9, 76, that there never has been a militia company in that precinct, but that the east part bore arms in the Smithtown company, and the west were under a Huntington Captain, which has caused uneasiness. The people, with the consent of Col. Potter, assembled and chose Benajah Strong, Captain; Jerem'h Terry, 1st Lt.; Sam'l Oakley, 2d Lt.; and Annen Mowbray, En., who signed the association. The company numbers 36 or 37.",
      },
    ],
    citation:
      "Provincial Congress entry concerning the Islip militia company, February 9, 1776, excerpted in George J. Munkenbeck, “Isaac Thompson: A Man on a Tightrope,” in Town of Islip Revolutionary War Resource Guide.",
  },
  {
    id: "islip-census-1775",
    theme: "militia",
    tags: ["militia"],
    title: "1775 Census and Militia Eligibility in Islip",
    date: "June 26, 1775",
    type: "Census record",
    status: "review",
    context:
      "The 1775 census gives a concrete population figure for Islip Precinct and the number of men subject to militia service. The full census table has not yet been separately extracted; for now the figures come through Robert Finnegan's summary.",
    excerpts: [
      {
        text: "The June 26, 1775 census conducted by John Mowbrey, and witnessed by Judge Isaac Thompson, identified 64 men of Islip's 375 residents that would be subject to military service. This census was completed days after the Battle of Bunker Hill (June 17, 1775).",
      },
    ],
    whyItMatters:
      "This gives a sense of scale. Islip Precinct was small, but the Revolution still required political and military decisions from its residents.",
    citation:
      "Robert Finnegan, “Islip Militia: 250th Anniversary, 1776–2026,” The Quahog, Winter 2026, excerpted in Town of Islip Revolutionary War Resource Guide. Full census table pending.",
  },

  // ---------------- Occupation & Civilian Life ----------------
  {
    id: "plundering-resolution-1781",
    theme: "occupation",
    tags: ["occupation"],
    title: "Resolution on Armed Boats, Plundering, and Long Island Residents",
    date: "June 28, 1781",
    type: "State resolution",
    status: "verified",
    context:
      "This New York State resolution shows how complicated life on occupied Long Island became. The State argued that Long Island residents, though they lived under British control, should not automatically be treated as British subjects or targets for plunder. It complained that armed boats from Connecticut were landing on Long Island, taking property, and harming civilians.",
    excerpts: [
      {
        text: "State of New York. In Senate, June 28, 1781.\n\nWhereas it appears… that a number of armed boats and other small vessels of war are constantly cruising in the Sound… the crews from them frequently land upon Long Island and under the Authority of commissions of war from the Governor of Connecticut plunder the inhabitants… and in many instances of their cash, wearing apparel, bedding and the necessary provisions for their families and even proceed to insult and beat them…",
      },
      {
        text: "And whereas altho' the inhabitants of Long Island were unhappily reduced by the enemy to the necessity of laying down the arms they had taken in defence of their invaded country… Yet they ought not therefore to be deemed subjects of the British Crown or in anywise objects of military depredations, and the Legislature doth insist that the inhabitants of said Island… are still subjects of and owe allegiance to and have a right to protection from this State.",
      },
    ],
    whyItMatters:
      "This complicates the usual patriot-versus-loyalist story. Long Island residents could be trapped between British occupation, New York State authority, Connecticut raiders, and wartime suspicion. For Islip, occupation was not simply a military condition. It affected property, family safety, political identity, and everyday survival.",
    citation:
      "New York State Senate and Assembly, resolution concerning armed boats and plundering on Long Island, June 28, 1781, transcribed by J. Vermaelen, in Town of Islip Revolutionary War Resource Guide.",
  },
  {
    id: "huntington-vessels-1776",
    theme: "occupation",
    tags: ["occupation"],
    title: "Huntington Town Records: British Vessels and Fear Before Occupation",
    date: "August 26, 1776",
    type: "Town record / letter",
    status: "verified",
    context:
      "This Huntington record shows the fear and uncertainty on Long Island just before the British campaign. The Town Historian uses Huntington records because Islip's own minutes are comparatively quiet about occupation. These nearby records help explain the pressures Islip residents also faced.",
    excerpts: [
      {
        text: "HUNTINGTON, Aug. 26, 76.\n\nI had not arrived at my house from Jamaica half an hour, before I received information by express from Capt. Thompson of Brookhaven, that two ships, one brig and three tenders had landed a number of regular troops between Old Man's and Wading Rivers, who at one o'clock were shooting cattle… I think Gen. Washington should be acquainted. Our women are in great tumult.\n\nIn great haste, yours.\nGILBERT POTTER.",
      },
    ],
    whyItMatters:
      "This shows how quickly fear spread across Long Island in August 1776. The human detail, “Our women are in great tumult,” shows that invasion affected households and families, not only soldiers.",
    citation:
      "Gilbert Potter to Gen. Woodhull, August 26, 1776, in Charles R. Street, ed., Huntington Town Records… vol. 3, excerpted in Town of Islip Revolutionary War Resource Guide.",
  },
  {
    id: "huntington-independence-1776",
    theme: "occupation",
    tags: ["occupation"],
    title: "Huntington Town Records: Joy After Independence, Fear Before Occupation",
    date: "July–August 1776",
    type: "Town record",
    status: "verified",
    context:
      "This excerpt captures the shift from celebration to danger in the summer of 1776. Huntington celebrated independence, but British military movements quickly changed the mood, framing Islip's context as part of a regional Long Island story.",
    excerpts: [
      {
        text: "the Declaration of Independence of the Colonies had been proclaimed on the 4th of this month and read to 20,000 militia in New York and the city had celebrated the event by overthrowing the statue of George III. Huntington was wild with joy and excitement but their happiness was soon nipped in the bud.",
      },
    ],
    whyItMatters:
      "This shows the emotional swing of 1776: public joy at independence followed almost immediately by military danger and occupation.",
    citation:
      "Huntington Town Records, vol. 3, concerning July–August 1776, in Charles R. Street, ed., Huntington Town Records… vol. 3, excerpted in Town of Islip Revolutionary War Resource Guide.",
  },

  // ---------------- Laws, Property & Punishment ----------------
  {
    id: "suspected-characters-1778",
    theme: "laws",
    tags: ["occupation"],
    title: "Act on “Equivocal and Suspected Characters”",
    date: "June 30, 1778",
    type: "State law",
    status: "verified",
    context:
      "This New York law shows how the Revolutionary state treated neutrality and suspected loyalty to Britain. It authorized commissioners to summon people considered “neutral and equivocal characters” and require them to swear allegiance to the State of New York.",
    excerpts: [
      {
        text: "AN ACT more effectually to prevent the mischiefs arising from the example and influence of persons of equivocal and suspected characters in this State. Passed the 30th of June, 1778.\n\nWhereas certain of the inhabitants of this State have during the course of the present cruel war… affected to maintain a neutrality which there is reason to suspect was in many instances dictated by a poverty of spirit and an undue attachment to property.",
      },
      {
        label: "The required oath",
        text: "I A B do solemnly and without any mental reservation or equivocation whatever, swear and call God to witness… that I do believe and acknowledge the State of New York to be of right a free and independent State.",
      },
    ],
    whyItMatters:
      "This helps explain why the Revolution was also a civil conflict. People were pressured to declare loyalty, neutrality could be treated as dangerous, and political identity had legal consequences. For Islip residents under occupation, public allegiance could become risky.",
    citation:
      "New York State, “An Act more effectually to prevent the mischiefs arising from… persons of equivocal and suspected characters,” passed June 30, 1778, in Laws of the State of New York… 1777–1784, vol. 1 (Albany: Weed, Parsons and Company, 1886).",
  },
  {
    id: "forfeiture-1779",
    theme: "laws",
    tags: ["occupation"],
    title: "Act for the Forfeiture and Sale of Loyalist Estates",
    date: "October 22, 1779",
    type: "State law",
    status: "verified",
    context:
      "This law declared that certain people who adhered to the enemies of the State had forfeited their estates, and it named people banished from New York. It shows how Revolutionary governments punished loyalty to Britain and how property became part of the political struggle.",
    excerpts: [
      {
        text: "AN ACT, for the forfeiture and sale of the estates of persons Who have adhered to the enemies of this State… Passed the 22d of October, 1779.",
      },
      {
        label: "Named persons",
        text: "George Muirson, Richard Floyd and Parker Wickham of Suffolk county Esquires, Henry Lloyd the elder… and Sir Henry Clinton knight be and each of them are hereby severally declared to be ipso facto convicted and attainted of the offence aforesaid… [and] declared to be forever banished from this State.",
      },
    ],
    whyItMatters:
      "This shows how the Revolution reached into property, punishment, exile, and legal identity. It reminds visitors that the Revolution was also a civil conflict over loyalty, land, law, and the future of government.",
    citation:
      "New York State, “An Act for the forfeiture and sale of the estates of persons Who have adhered to the enemies of this State…,” passed October 22, 1779, in Laws of the State of New York… 1777–1784, vol. 1 (Albany: Weed, Parsons and Company, 1886).",
  },
  {
    id: "temporary-government-1779",
    theme: "laws",
    tags: ["occupation"],
    title: "Temporary Government for Southern New York After British Evacuation",
    date: "October 23, 1779",
    type: "State law",
    status: "verified",
    context:
      "This law planned how the southern parts of the state, including Suffolk County, would be governed once the British left. It shows New York expected the transition from occupation to restored government to be difficult, giving a temporary council power over order, food prices, billeting, supplies, elections, and suspected disaffection.",
    excerpts: [
      {
        text: "AN ACT to provide for the temporary government of the southern parts of this State, whenever the enemy shall abandon or be dispossessed of the same, and until the legislature can be convened. Passed the 23d of October, 1779.",
      },
      {
        text: "For the purpose of preventing a monopoly of any of the necessaries of life… For the purpose of billeting troops… For the purpose of seizing and impressing fuel, forage, vessels, horses, teams… For the purpose of holding elections… in order to prevent persons charged with, or suspected of disaffection to the freedom and independence of this State from electing or being elected.",
      },
    ],
    whyItMatters:
      "Restoring government after occupation was not expected to be simple. The state anticipated shortages, suspicion, loyalty disputes, elections, and military demands. For Islip, the end of occupation was not just a return to normal life.",
    citation:
      "New York State, “An Act to provide for the temporary government of the southern parts of this State,” passed October 23, 1779, excerpted in Town of Islip Revolutionary War Resource Guide, Part Five.",
  },
  {
    id: "prisoner-exchange-1781",
    theme: "laws",
    tags: ["occupation"],
    title: "Prisoner Exchange and Forfeiture of Property",
    date: "March 20, 1781",
    type: "State law",
    status: "verified",
    context:
      "This law let certain inhabitants apply to be treated as prisoners of war for exchange. The language is striking: once approved, the applicant would be treated as a prisoner of war and a subject of the King of Great Britain, and their New York real estate would be forfeited to the people of the State.",
    excerpts: [
      {
        text: "AN ACT to enable the person administring the government to exchange persons applying for that purpose, as prisoners of war… Passed the 20th of March, 1781… the said inhabitant so applying, shall… be deemed and treated as a prisoner of war… and a subject of the King of Great Britain, and all… the real estate, held or claimed within this State, by such person… shall be… forfeited to and vested in the people of this State.",
      },
    ],
    whyItMatters:
      "This shows how deeply the Revolution affected legal identity and property. A person's wartime status could become tied to whether they were treated as a prisoner, a British subject, or someone whose property could be forfeited.",
    citation:
      "New York State, “An Act to enable the person administring the government to exchange persons applying for that purpose, as prisoners of war,” passed March 20, 1781, excerpted in Town of Islip Revolutionary War Resource Guide, Part Five.",
  },

  // ---------------- Newspapers & Raid Accounts ----------------
  {
    id: "onderdonk-raids",
    theme: "newspapers",
    tags: ["occupation"],
    title: "Newspaper Accounts of Raids on Islip",
    date: "1778–1781",
    type: "Newspaper excerpts",
    status: "verified",
    context:
      "Revolutionary-era newspaper items, collected by Henry Onderdonk Jr., record raids, robberies, and whaleboat activity around Islip and Blue Point. Several concern the home of William Nicoll, Esq. They show the Whaleboat War as it touched Islip's shore.",
    excerpts: [
      {
        label: "Gaine, March 9, 1778",
        text: "Moses Sawyer… came over from the Main, a few days since, and robbed the farm of Wm. Nicoll, Esq., of said Island, of 110 bushels of wheat, and carried off grain, belonging to Tho's Dering, of Suffolk Co.",
      },
      {
        label: "Gaine, June 15–22, 1778",
        text: "Last Sat. night a party of 14 armed men landed on L. I., and entered the house of W. Nicoll, Esq., Islip, and robbed him of a sum of money, plate, some arms, a quantity of clothing… They appeared to be very well acquainted in the family, as they knew where to find everything they wanted.",
      },
      {
        label: "Rivington, 1781",
        text: "Five whale-boats, containing about 50 men, made their appearance in the South Bay, where they attacked and took a sloop provisions, lumber belonging to Messrs. Keteltas & Nicoll… There are many more similar entries. Life on occupied Long Island was not an easy life for anyone!",
      },
    ],
    whyItMatters:
      "These accounts make occupation concrete and local. Islip residents were caught between occupying forces, loyalist suspicion, and Connecticut whaleboat raids, with property seizures a constant danger.",
    citation:
      "Henry Onderdonk Jr., Revolutionary Incidents of Suffolk and Kings Counties (New York, 1849), excerpted in George J. Munkenbeck, “What was life like in Islip… during the occupation?,” Town of Islip Revolutionary War Resource Guide, Part Six.",
  },

  // ---------------- Regional Context ----------------
  {
    id: "huntington-liberty-flag",
    theme: "context",
    tags: ["flags"],
    title: "Reading of the Declaration and the Huntington Liberty Flag",
    date: "1776",
    type: "Regional context",
    status: "review",
    context:
      "Although this concerns Huntington, it helps explain what was happening nearby in 1776. Because Islip's militia was closely tied to Huntington, the Town Historian suggests Islip militiamen may have marched under the same flag. The wording is deliberately careful: it says “likely,” not certain.",
    excerpts: [
      {
        text: "On September 1, 1776 British troops occupied Huntington, where they would remain until March 1783. In 1975, almost 200 years after it was created, the Huntington Liberty Flag was designated as the official flag of the Town of Huntington.",
      },
    ],
    whyItMatters:
      "Islip was part of a larger Long Island occupation story. Huntington's Revolutionary records and commemorations provide regional context for what Islip residents likely experienced. This project does not claim Islip definitely had its own Liberty Flag.",
    citation:
      "Reginald Metcalf Sr., “Reading of the Declaration of Independence and Creation of the Huntington Liberty Flag,” Town of Huntington Historian's Office, excerpted in Town of Islip Revolutionary War Resource Guide.",
  },
];

// ---------- Localization ----------
// English above is canonical. Spanish overlays (primary-sources-es.ts)
// translate the editorial frame — title, type, date wording, context,
// why-it-matters, excerpt labels — while the document excerpts themselves stay
// in their original language, as transcriptions should.

export function localizedPrimarySources(locale: Locale): PrimarySource[] {
  if (locale === "en") return primarySources;
  return primarySources.map((s) => {
    const t = primarySourcesEs[s.id];
    if (!t) return s;
    return {
      ...s,
      title: t.title,
      type: t.type,
      date: t.date ?? s.date,
      context: t.context,
      whyItMatters: t.whyItMatters ?? s.whyItMatters,
      excerpts: s.excerpts.map((ex, i) =>
        t.excerptLabels[i] ? { ...ex, label: t.excerptLabels[i]! } : ex,
      ),
    };
  });
}

// Flat text for the search index.
export const primarySourcesSearchText: string = primarySources
  .map((s) =>
    [s.title, s.type, s.date, s.context, s.whyItMatters, ...s.excerpts.map((e) => e.text)]
      .filter(Boolean)
      .join(" "),
  )
  .join(" ");
