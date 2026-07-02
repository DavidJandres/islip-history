// The People roster. Structured records live here (the established data-file
// pattern, like team.ts) rather than in the dictionaries, because there are
// many entries and the prose is English-first; the Spanish site shows these
// profiles in English with a notice until they are translated. UI chrome and
// section titles ARE translated (dictionaries/<locale>/people.json).
//
// portrait: a verified, licensed image or null. Most historical figures here
// have NO authenticated likeness, and inventing one would violate the project's
// "do not invent facts" rule — so null renders a dignified monogram plate
// labelled "No known likeness". Only add an image with a real credit.

import type { Locale } from "@/i18n/config";
import { peopleEs } from "./people-es";

export const peopleSections = [
  "origins",
  "revolution",
  "government",
  "unfinished",
  "community",
] as const;

export type PeopleSection = (typeof peopleSections)[number];

export interface Portrait {
  src: string;
  alt: string;
  credit: string;
}

export interface Person {
  slug: string;
  name: string;
  role: string; // short label for the index card
  dates: string | null; // lifespan when documented, else null
  section: PeopleSection;
  portrait: Portrait | null;
  bio: string[];
  whyMatters: string;
  connectionToday: string;
  cardText: string; // one-line summary for the index card
  sources: string[];
}

export const people: Person[] = [
  {
    slug: "winnaquaheagh",
    name: "Winnaquaheagh",
    role: "Sachem of lands that became Islip",
    dates: null,
    section: "origins",
    portrait: null,
    bio: [
      "Winnaquaheagh, identified in Town Historian material as Sachem of the lands in today's Islip Town, appears in the early land-transfer story connected to William Nicoll and the creation of Islip Grange. The sources describe the 1683 deed transferring land to Nicoll, with boundary language based on rivers and shoreline. That makes Winnaquaheagh essential to the story: Islip's colonial origin did not begin on empty land, but on Indigenous land that already carried Native history, authority, and meaning.",
    ],
    whyMatters:
      "Winnaquaheagh anchors the story before colonial Islip. His presence is a reminder that the town's history did not begin with William Nicoll or European patents.",
    connectionToday:
      "Including Winnaquaheagh helps the project avoid treating Indigenous people as background, and frames Islip's history as a layered story of land, power, memory, and belonging.",
    cardText:
      "Sachem of lands that became Islip, named in the 1683 land-transfer story with William Nicoll. His presence reminds us that Islip's history begins before colonial patents and town government.",
    sources: ['George J. Munkenbeck, "The Origins of the Town of Islip."'],
  },
  {
    slug: "william-nicoll",
    name: "William Nicoll",
    role: "Founder of Islip Grange",
    dates: null,
    section: "origins",
    portrait: null,
    bio: [
      'William Nicoll made the first purchase of land that became Islip Grange on November 29, 1683. Annotations to the 1798 Conklin letter describe this as the "first deeded land" and the birth of what Nicoll named "Islip Grange," covering land associated with today\'s East Islip, Great River, Islip Terrace, and surrounding areas. The Royal Governor confirmed the purchase with a royal patent on December 5, 1684.',
      "The founder himself apparently held no Islip town office; annotations to the town's first minute book suggest his influence worked instead through his provincial offices, including Speaker of the General Assembly. The family name, though, runs through the minute book for generations: a William Nicoll served as precinct supervisor for most years from 1747 to 1775, and another held the office again in the 1790s.",
    ],
    whyMatters:
      "Nicoll is central to the colonial origin of Islip Grange and to the legal land story that eventually developed into the Town of Islip.",
    connectionToday:
      "His story helps explain the Town Seal, local place names, early landholding patterns, and why Islip's founding is more complicated than a single date.",
    cardText:
      "William Nicoll's 1683 purchase created Islip Grange, the colonial landholding that became a foundation for the later Town of Islip.",
    sources: [
      'Nathaniel Conklin, "Description of the Town of Islip in Suffolk County," 1798 (annotated, Town of Islip Historian\'s Office).',
      'George J. Munkenbeck, "The Origins of the Town of Islip."',
      "Islip town minutes and annotations, in Carl A. Starace, ed., Book One of the Minutes of Town Meetings and Register of Animal Ear Marks of the Town of Islip, 1720–1861 (Town of Islip, 1982).",
    ],
  },
  {
    slug: "stephanus-van-cortlandt",
    name: "Stephanus Van Cortlandt",
    role: "First patentee of Sagtikos Manor",
    dates: null,
    section: "origins",
    portrait: null,
    bio: [
      "The beginnings of Sagtikos Manor go back to a royal patent granted to Stephanus Van Cortlandt on June 2, 1697, based on his 1692 purchase of 150 acres that became the first part of the estate. Town Historian material notes that Van Cortlandt was connected by family to William Nicoll, linking the Sagtikos story to the larger network of colonial landholding families.",
    ],
    whyMatters:
      "Van Cortlandt connects Sagtikos Manor to the earliest colonial property history of the town.",
    connectionToday:
      "His entry helps visitors see that Sagtikos Manor was not only a Revolutionary site but part of a longer colonial land story.",
    cardText:
      "Stephanus Van Cortlandt's 1697 patent marks the beginning of the Sagtikos Manor property story, tying one of Islip's most important historic sites to Long Island's colonial land networks.",
    sources: [
      'George J. Munkenbeck, "The Origins of the Town of Islip."',
      'Michele Antonio, "George Washington Slept at Sagtikos Manor," Patch, June 26, 2010. Secondary local-history source.',
    ],
  },
  {
    slug: "ananias-carll",
    name: "Ananias Carll",
    role: "Early town supervisor",
    dates: null,
    section: "government",
    portrait: null,
    bio: [
      "Ananias Carll inherited the Sagtikos property from Timothy Carll's line and appears in early Islip town records. He registered an earmark for cattle in 1726, was elected supervisor in 1731, served as an overseer for the poor in the late 1730s, and helped carry out a 1733 Assembly act to lay out a public highway through the Precinct of Islip.",
    ],
    whyMatters:
      "Carll connects property, local government, public roads, livestock, and poor relief — the practical work of early town life.",
    connectionToday:
      "His role shows that town government was built through everyday responsibilities: roads, records, public welfare, and land management.",
    cardText:
      "Ananias Carll shows early Islip government at work — Sagtikos, town roads, public office, and the practical duties that turned a scattered precinct into a functioning community.",
    sources: ['George J. Munkenbeck, "The Origins of the Town of Islip."'],
  },
  {
    slug: "jonathan-thompson",
    name: "Jonathan Thompson",
    role: "Brought Sagtikos into the Thompson family",
    dates: null,
    section: "revolution",
    portrait: null,
    bio: [
      "Jonathan Thompson of Brookhaven/Setauket purchased Sagtikos Manor — also called Apple Tree Farm — in 1758. Town Historian material states the property was bought for \u00a31,200 New York money, and that his son Isaac Thompson appears to have taken over managing the farm as a teenager.",
    ],
    whyMatters:
      "Jonathan Thompson brought Sagtikos Manor into the Thompson family, setting the stage for Isaac Thompson's Revolutionary-era story.",
    connectionToday:
      "His purchase is part of why Sagtikos became one of Islip's clearest links to the Revolution, Washington's Long Island tour, and the Gardiner family story.",
    cardText:
      "Jonathan Thompson's 1758 purchase of Sagtikos Manor brought the estate into the Thompson family and set the stage for its Revolutionary-era significance.",
    sources: [
      'George J. Munkenbeck, "Isaac Thompson \u2014 A Man on a Tightrope."',
      'Michele Antonio, "George Washington Slept at Sagtikos Manor," Patch, June 26, 2010. Secondary local-history source.',
    ],
  },
  {
    slug: "isaac-thompson",
    name: "Isaac Thompson",
    role: "Patriot, magistrate, and slaveholder",
    dates: "1743\u20131817",
    section: "revolution",
    portrait: null,
    bio: [
      'Isaac Thompson is one of the most important people in this story. The Town Historian\'s essay calls him "A Man on a Tightrope" \u2014 someone who held Crown, local political, and judicial offices while also taking patriot risks during the Revolutionary era. The source argues that Thompson was not simply a witness to history but someone who "made history," taking a stand that placed his life and family in danger.',
      "Thompson signed the Islip Precinct Articles of Association after a May 10, 1775 meeting of freeholders and residents called to discuss support for the Continental Congress. Signing placed Thompson, his family, and his property in jeopardy, because he was also a Crown magistrate and precinct official.",
      "The town's own minute book traces his public service year by year. He first appears in 1768 as an overseer of the poor, was elected an overseer of the highways in April 1775 alongside Benajah Strong, and in April 1776 was elected supervisor. He was re-elected at every wartime meeting, even as the minutes, as legal records in occupied territory, were dated by the reign of King George III, and he was still supervisor in April 1784 when the record first counted the years from American independence. His last election as supervisor came in April 1785.",
      "His story must also hold the harder history of slavery and labor at Sagtikos Manor. Drawing on Christopher Verga's work, the uploaded material states that during Thompson's ownership much of the work on the farm and in the home was performed by enslaved or indentured people. It notes that Thompson owned, on average, four enslaved people in the decades around 1790, 1800, and 1810 \u2014 and that this fuller story must be part of the 250th research.",
    ],
    whyMatters:
      "Isaac Thompson connects Islip directly to the Revolution, British occupation, Sagtikos Manor, local officeholding, and the contradictions of liberty in a slaveholding society.",
    connectionToday:
      "His life is the bridge between patriotic memory and honest public history. He lets the project show that the Revolution mattered, and that the promise of independence was incomplete.",
    cardText:
      'Isaac Thompson lived through the Revolution "on a tightrope" \u2014 a patriot sympathizer, local official, Crown magistrate, Sagtikos Manor resident, and slaveholder whose life reveals both the courage and the contradictions of Revolutionary Islip.',
    sources: [
      'George J. Munkenbeck, "Isaac Thompson \u2014 A Man on a Tightrope."',
      'Town of Islip Historian\'s Office, "A 250th Story."',
      "George J. Munkenbeck, \u201cIsaac Thompson \u2014 A Man on a Tightrope,\u201d drawing on Christopher Verga's research on slavery in Suffolk County.",
      "Islip town minutes, 1768\u20131785, in Carl A. Starace, ed., Book One of the Minutes of Town Meetings and Register of Animal Ear Marks of the Town of Islip, 1720\u20131861 (Town of Islip, 1982).",
    ],
  },
  {
    slug: "mary-gardiner-thompson",
    name: "Mary Gardiner Thompson",
    role: "Sagtikos Manor and the Gardiner connection",
    dates: null,
    section: "revolution",
    portrait: null,
    bio: [
      'Mary Gardiner Thompson was Isaac Thompson\'s wife and part of the Gardiner connection at Sagtikos Manor. Town Historian material describes her at the beginning of the occupation as pregnant and "lying in," while also caring for a young child \u2014 which helps explain why Isaac may have been unable or unwilling to leave Sagtikos: his family\'s health and safety tied him to the house.',
    ],
    whyMatters:
      "Mary Gardiner Thompson helps turn the Revolutionary story from a military account into a family and home-front one.",
    connectionToday:
      "Her story helps visitors understand that occupation affected households, women, children, and family decisions \u2014 not only soldiers and officials.",
    cardText:
      "Mary Gardiner Thompson's situation during the occupation shows how the Revolution entered family life. At Sagtikos, war was not only politics; it was pregnancy, children, risk, and survival.",
    sources: ['George J. Munkenbeck, "Isaac Thompson \u2014 A Man on a Tightrope."'],
  },
  {
    slug: "benajah-strong",
    name: "Benajah Strong",
    role: "Militia captain and last Supervisor of Islip Precinct",
    dates: null,
    section: "revolution",
    portrait: null,
    bio: [
      "Benajah Strong was a farmer, patriot, and public official whose life connected Islip's militia, its town government, and the Thompson family of Sagtikos Manor. Born about 1748, in May 1772 he married Hannah Thompson, a sister of Isaac Thompson, which also tied him to the Woodhull family.",
      "The town minutes put Strong inside local government just before the war: at the annual meeting of April 1775 he was elected an overseer of the highways alongside Isaac Thompson, weeks before Islip signed the Articles of Association. In February 1776, when Islip Precinct sought commissions for its own militia company, the residents chose Benajah Strong as their captain. A well-known supporter of the patriot cause, he was among those who fled to Connecticut when the British occupied Suffolk County, and he took part in several raids and missions. The British considered him a “notorious rebel.”",
      "After the war, Strong returned to public life. In April 1787 he was the last person elected Supervisor of the Precinct of Islip, and when the State of New York recognized Islip as a Town in 1788 he continued in town office: the minute book records him as Town Clerk from 1789 through 1795, and in 1795 the meeting voted to hold the next annual town meeting at his house.",
    ],
    whyMatters:
      "Benajah Strong shows that Islip's Revolution was carried by more than one family. As militia captain, refugee, raider, and the last precinct supervisor, he links the town's military organization, its wartime exile, and its transition from precinct to town.",
    connectionToday:
      "His career bridges the Revolution and the founding of Islip's town government. Marking and remembering figures like Strong is part of the Town's ongoing 250th research.",
    cardText:
      "Militia captain, wartime refugee, and the last Supervisor of Islip Precinct. Brother-in-law of Isaac Thompson, he links Islip's patriot militia to the founding of its town government.",
    sources: [
      'George J. Munkenbeck, "Islip Town Supervisor Captain Benajah Strong."',
      "Islip town minutes, 1775–1795, in Carl A. Starace, ed., Book One of the Minutes of Town Meetings and Register of Animal Ear Marks of the Town of Islip, 1720–1861 (Town of Islip, 1982).",
    ],
  },
  {
    slug: "george-washington",
    name: "George Washington",
    role: "First U.S. President",
    dates: "1732\u20131799",
    section: "revolution",
    portrait: {
      src: "/people/george-washington.jpg",
      alt: "Portrait of George Washington by Gilbert Stuart, 1796",
      credit: "Gilbert Stuart, 1796 (public domain), via Wikimedia Commons.",
    },
    bio: [
      'Washington\'s 1790 Long Island tour connects Islip\'s Revolutionary landscape to the new republic. The annotated 1798 Conklin publication quotes Washington\'s diary from April 21\u201322, 1790, including a visit to "Squire Thompson\'s" house and his departure from "Mr. Thompson\'s" the next morning. The notes identify that house as Sagtikos Manor, still standing on Montauk Highway.',
    ],
    whyMatters:
      "Washington's stop gives Islip a direct connection to the early presidency and the post-Revolutionary nation.",
    connectionToday:
      "His visit makes Sagtikos a symbol of transformation: a landscape of occupation became part of the route of the first president of the United States.",
    cardText:
      'George Washington\'s 1790 Long Island tour brought the first president through Islip\'s Revolutionary landscape. His diary references a stay at "Squire Thompson\'s," identified in Town Historian notes as Sagtikos Manor.',
    sources: [
      'Nathaniel Conklin, "Description of the Town of Islip in Suffolk County," 1798 (annotated, Town of Islip Historian\'s Office), quoting Washington\'s diary, April 21\u201322, 1790.',
      'George J. Munkenbeck, "Isaac Thompson \u2014 A Man on a Tightrope."',
    ],
  },
  {
    slug: "henry-clinton",
    name: "General Henry Clinton",
    role: "British general during the occupation",
    dates: "1730\u20131795",
    section: "revolution",
    portrait: {
      src: "/people/henry-clinton.jpg",
      alt: "Period engraved portrait of General Sir Henry Clinton",
      credit:
        "Period engraving (public domain), New York Public Library via Wikimedia Commons.",
    },
    bio: [
      'Town Historian material says visitors to Sagtikos Manor are told that British General Henry Clinton was there "from time to time" during the occupation of Long Island. Another section notes that his exact stays require further research in his papers, and that while troops used the estate when in the area, calling them permanently stationed there may be too strong.',
    ],
    whyMatters:
      "Clinton represents the British military presence on occupied Long Island and the pressure local families felt during the war.",
    connectionToday:
      "His entry shows why careful wording matters: the project can demonstrate how historians separate strong evidence, local tradition, and claims that still need research.",
    cardText:
      "General Henry Clinton appears in local Sagtikos tradition as part of the Manor's occupation story. The details still need research, making him a useful example of how public history handles evidence carefully.",
    sources: ['George J. Munkenbeck, "Isaac Thompson \u2014 A Man on a Tightrope."'],
  },
  {
    slug: "york-and-elizabeth",
    name: "York and Elizabeth",
    role: "A servant and a free woman, 1783",
    dates: null,
    section: "unfinished",
    portrait: null,
    bio: [
      'St. John\'s Episcopal Church booklet records a 1783 marriage between "York, a Black servant to William Nicoll, Esq." and "Elizabeth, a free Indian Woman." The booklet says this record, together with others, offers a glimpse of Islip Grange\'s population at the time \u2014 small, but ethnically mixed.',
    ],
    whyMatters:
      "York and Elizabeth represent people who often appear only briefly in records, yet are essential to the town's real history.",
    connectionToday:
      'Their story brings the "unfinished promise" into human form. They remind visitors that early Islip included Black and Indigenous lives, not only patentees, officials, and landowning families.',
    cardText:
      "York and Elizabeth appear in a 1783 St. John's marriage record \u2014 York as a Black servant to William Nicoll, Elizabeth as a free Indian woman. Their brief record reveals a more diverse early Islip than founding stories often show.",
    sources: [
      "St. John's Episcopal Church booklet (parish history), on the 1783 marriage record.",
    ],
  },
  {
    slug: "nathaniel-conklin",
    name: "Nathaniel Conklin",
    role: "Supervisor and chronicler of 1798",
    dates: null,
    section: "government",
    portrait: null,
    bio: [
      "Nathaniel Conklin served the Town of Islip in several positions over 33 years, sometimes holding more than one at a time. He was Supervisor for four years and also held roles including Fence Viewer, Commissioner of Schools, Commissioner of Highways, Overseer of Highways, a member of a commission to negotiate with Huntington over bay rights and islands, and a member of a committee to hire out grass on Captree Island.",
      "The town's first minute book shows the arc of that service: an overseer of the roads by 1793, a fence viewer, one of the town's first three commissioners of schools in 1796, and supervisor in 1797 and again from 1799 to 1801. He was supervisor when he wrote the January 1798 description, and school money he helped oversee appears in the meeting's orders of 1799.",
      'His 1798 "Description of the Town of Islip" was written to defend Islip\'s land claims and gives a rare view of the town near the end of the eighteenth century. The annotated publication notes that the letter was found in the New York State Archives and later transcribed and interpreted by Christopher Albergo and George Munkenbeck.',
    ],
    whyMatters:
      "Conklin preserved a detailed picture of early Islip's land, boundaries, population, economy, and government.",
    connectionToday:
      "His letter shows why archives matter. Without documents like this, much of early Islip would be far harder to reconstruct.",
    cardText:
      "Nathaniel Conklin's 1798 description of Islip is one of the clearest surviving views of the town near the founding era. His public service and records connect today's residents to an Islip long gone.",
    sources: [
      'Nathaniel Conklin, "Description of the Town of Islip in Suffolk County," January 11, 1798; transcribed and annotated by Christopher Albergo and George J. Munkenbeck, Town of Islip Historian\'s Office.',
      "Islip town minutes, 1793–1801, in Carl A. Starace, ed., Book One of the Minutes of Town Meetings and Register of Animal Ear Marks of the Town of Islip, 1720–1861 (Town of Islip, 1982).",
    ],
  },
  {
    slug: "abraham-gardiner-thompson",
    name: "Abraham Gardiner Thompson, M.D.",
    role: "Physician and designer of the Town Seal",
    dates: "1810\u20131887",
    section: "government",
    portrait: {
      src: "/logos/town-of-islip-seal.png",
      alt: "The Town of Islip seal \u2014 an 'eye' and a 'slip' of a plant \u2014 designed by Abraham Gardiner Thompson in 1883",
      credit: "Town of Islip seal, designed by A. G. Thompson (1883).",
    },
    bio: [
      "Abraham Gardiner Thompson was born in Islip Town on August 10, 1810, into an influential local family. He studied medicine, traveled to Paris for further surgical training, practiced medicine, served two terms in the New York State Assembly, was active in the Episcopal Church, and donated land connected to St. Mark's Church in Islip.",
      'His most lasting contribution to everyday life came in 1883, when Town Clerk Seth Clock asked him to design a seal for the Town of Islip. Town Historian material explains that the seal was not abstract symbolism but a rebus \u2014 showing Islip as an "eye" and a "slip" of a plant \u2014 recalling the English village connected to the Nicoll family and the town\'s unusual origin story.',
    ],
    whyMatters:
      "Thompson designed the Town Seal, one of the most visible symbols of Islip's civic identity.",
    connectionToday:
      "Every resident who sees the Town Seal is still seeing Abraham Gardiner Thompson's interpretation of Islip's history.",
    cardText:
      'Abraham Gardiner Thompson designed the Town Seal in 1883. His "eye" and "slip" rebus still shapes the official visual identity of Islip today.',
    sources: [
      "Town of Islip Historian's Office material on Abraham Gardiner Thompson and the Town Seal.",
    ],
  },
  {
    slug: "samuel-sitko",
    name: "Samuel Sitko",
    role: "Holocaust survivor, Central Islip",
    dates: null,
    section: "community",
    portrait: null,
    bio: [
      "Mollie Sebor's booklet on the Jewish community of Islip Town describes Adasse Farm in Central Islip as a sanctuary for Holocaust survivors after World War II. One named survivor was Samuel Sitko, who came to Central Islip at age 16 after the murder of his family at Auschwitz-Birkenau. The booklet notes that at least three other survivors are known to have found refuge at the dairy farm.",
    ],
    whyMatters:
      "Sitko's story connects Central Islip to global history, refugee resettlement, and Jewish community life after World War II.",
    connectionToday:
      'His story strengthens the project\'s "many roots, one town" theme by showing Islip as a place of refuge and rebuilding.',
    cardText:
      "Samuel Sitko, a Holocaust survivor, found refuge in Central Islip after World War II. His story connects Islip's local community history to global histories of persecution, survival, and new beginnings.",
    sources: ['Mollie Sebor, "The Story of the Jewish Community of Islip Town."'],
  },
  {
    slug: "ruby-and-doris-hodus",
    name: "Ruby and Doris Hodus",
    role: "Founders of the Brentwood Jewish Center",
    dates: null,
    section: "community",
    portrait: null,
    bio: [
      "On August 29, 1958, about 30 people met at the home of Ruby and Doris Hodus to discuss creating a Jewish sanctuary in Brentwood. On September 1, the Brentwood Jewish Center became the chosen name for a conservative congregation meant to serve the community.",
    ],
    whyMatters:
      "Ruby and Doris Hodus represent the household-level work behind religious and civic institutions.",
    connectionToday:
      "Their story shows how communities are built not only by officials, but by neighbors opening homes, organizing meetings, and creating places of belonging.",
    cardText:
      "Ruby and Doris Hodus hosted the 1958 meeting that helped lead to the Brentwood Jewish Center \u2014 a reminder that community institutions often begin in private homes.",
    sources: ['Mollie Sebor, "The Story of the Jewish Community of Islip Town."'],
  },
  {
    slug: "tobak-and-kaufman",
    name: "Harvey Tobak and Irv Kaufman",
    role: "Founders of B'nai Israel Reform Temple",
    dates: null,
    section: "community",
    portrait: null,
    bio: [
      "Mollie Sebor's booklet says B'nai Israel Reform Temple began when Harvey Tobak's daughter asked to go to church like the friend next door, creating a need for a temple in the East Islip and Sayville area. A meeting of five families took place in the home of Irv Kaufman, and by July 1964 B'nai Israel Reform Temple was founded.",
    ],
    whyMatters:
      "Tobak and Kaufman show how family life, children, and neighborhood ties could spark new religious institutions.",
    connectionToday:
      'Their story connects an everyday question of belonging \u2014 "Where does my child fit?" \u2014 to the creation of institutions that still shape community life.',
    cardText:
      "Harvey Tobak and Irv Kaufman are tied to the founding of B'nai Israel Reform Temple \u2014 a story of how a child's question and a family meeting helped create a lasting community institution.",
    sources: ['Mollie Sebor, "The Story of the Jewish Community of Islip Town."'],
  },
];

export const peopleSlugs = people.map((p) => p.slug);

// ---------- Localization ----------
// English above is canonical; Spanish overlays (people-es.ts) replace the
// display fields per person. Names, portraits, and citations stay as-is.

export function localizedPeople(locale: Locale): Person[] {
  if (locale === "en") return people;
  return people.map((p) => {
    const t = peopleEs[p.slug];
    return t ? { ...p, ...t } : p;
  });
}

export function getPerson(slug: string, locale: Locale = "en"): Person | undefined {
  return localizedPeople(locale).find((p) => p.slug === slug);
}

export function peopleInSection(section: PeopleSection, locale: Locale = "en"): Person[] {
  return localizedPeople(locale).filter((p) => p.section === section);
}

export const peoplePaths = people.map((p) => `/people/${p.slug}`);
