// Interpretive essays and research notes, mostly modern Town Historian writing
// from the Revolutionary War Resource Guide and Vignettes. These are modern
// authored works, so they are presented as CURATED EXCERPTS with a summary and
// a source note, not reproduced in full. Tagged by theme so the thematic pages
// (Occupation, Flags, Militia, Research Questions) can reuse them.

export interface Essay {
  id: string;
  category: string;
  tags?: string[];
  title: string;
  author: string;
  summary: string;
  excerpts: string[];
  whyItMatters?: string;
  citation: string;
}

// Category groups in display order; labels are localized in essays.json.
export const essayCategories = [
  "revolution",
  "sagtikos",
  "occupation",
  "music",
  "flags",
  "patriots",
  "method",
] as const;

export type EssayCategory = (typeof essayCategories)[number];

export const essays: Essay[] = [
  // ---------------- Revolution & Local Choice ----------------
  {
    id: "defiance-1775",
    category: "revolution",
    tags: ["militia"],
    title: "A Time of Defiance and Uncertainty: Islip Precinct, 1775",
    author: "George J. Munkenbeck",
    summary:
      "Explains the local meaning of the Islip Precinct Articles of Association. It places the May 10, 1775 meeting after Lexington and Concord and before the British occupation, and explains the political risk of signing.",
    excerpts: [
      "On May 10, 1775, a special meeting was held by Islip Precinct where those who wished could sign the supporting document. At the time of the signing… the war was on as the Battles at Lexington and Concord had occurred on April 19, 1775.",
      "A signature on this paper was an act of treason and so the first steps were taken. This document was the first real division of the population into sides with those supporting the patriot cause called “Associators” and those who did not called “non-Associators.”",
    ],
    whyItMatters:
      "This essay pairs directly with the Articles of Association primary source. The document gives the words; the essay explains the danger, the timing, and the fact that neutrality would soon become impossible.",
    citation:
      "George J. Munkenbeck, “It Was a Time of Defiance and Uncertainty: Islip Precinct 1775,” in Town of Islip Revolutionary War Resource Guide, Part Six.",
  },
  {
    id: "response-1775",
    category: "revolution",
    title: "What Was the Response of Islip Residents in 1775?",
    author: "George J. Munkenbeck",
    summary:
      "Treats the Articles of Association as a major organizing step and explains how Islip residents were asked to take sides before British occupation, and who was excluded from signing.",
    excerpts: [
      "What most people miss is that the Articles of Association were the first real organization of a government in the colonies at least as far as unified action was concerned. Abraham Lincoln considered them the first real constitution.",
      "In 1776 the population of Islip Precinct was 375 and it appears that 35 of those eligible signed the Islip document… considering slaves, free blacks, native Americans, women and children could not sign. Also, the Quakers who lived in Islip could not sign due to their religious beliefs.",
    ],
    whyItMatters:
      "It shows that the Revolution divided communities before it became a local military occupation, and it connects civic participation to exclusion: many people lived in Islip but could not legally sign.",
    citation:
      "George J. Munkenbeck, “What was the Response of Islip Residents in 1775…?,” in Town of Islip Revolutionary War Resource Guide, Part Six.",
  },

  // ---------------- Sagtikos Manor & Isaac Thompson ----------------
  {
    id: "thompson-tightrope",
    category: "sagtikos",
    tags: ["occupation"],
    title: "Isaac Thompson: A Man on a Tightrope",
    author: "George J. Munkenbeck",
    summary:
      "The core essay of the project. It argues that Isaac Thompson should be understood not merely as the host of George Washington, but as an active figure whose family, offices, property, and choices placed him in danger during occupation.",
    excerpts: [
      "Isaac Thompson, who was the host, is mentioned but what we get is a picture of a man who was a witness to history and not an active part of it. The story of the life of Isaac Thompson is one of a man who made history took a stand risking his own life and the lives of his family.",
      "He attended the May 10, 1775, meeting of the freeholders and residents of the Precinct of Islip… He signed the Islip Precinct articles which he knew would place him, his family and his property in jeopardy, doubly so as he was a Crown magistrate and Precinct official.",
    ],
    whyItMatters:
      "It gives the strongest interpretive basis for making Isaac Thompson and Sagtikos Manor central to the exhibit: supporting the patriot cause in Islip could threaten family, property, office, and personal safety.",
    citation:
      "George J. Munkenbeck, “Isaac Thompson: A Man on a Tightrope,” in Town of Islip Revolutionary War Resource Guide, Part Six.",
  },
  {
    id: "250th-story",
    category: "sagtikos",
    title: "A 250th Story: The Walls Have Ears",
    author: "George J. Munkenbeck",
    summary:
      "Frames Sagtikos Manor as a way to tell the Thompson family's experience during occupation, using two interpretive ideas: “Walls Have Ears,” and Isaac Thompson walking a tightrope through six years of occupation.",
    excerpts: [
      "The family's and others' experiences on the Manor were like all those living in Islip Precinct at the time and perhaps a bit worse.",
      "Isaac Thompson was basically walking on a tightrope or balancing on the edge of a knife during the six years of occupation due to his patriot sympathies and position as a Crown magistrate.",
    ],
    whyItMatters:
      "It shows Sagtikos is not just a house-tour site, but a place where local Revolutionary politics, danger, family life, and memory meet.",
    citation:
      "George J. Munkenbeck, “A 250th Story,” in Town of Islip Revolutionary War Resource Guide, Part Six.",
  },
  {
    id: "sagtikos-before-thompson",
    category: "sagtikos",
    title: "Sagtikos Manor Before the Thompson Family",
    author: "George J. Munkenbeck",
    summary:
      "Explains Sagtikos Manor before Isaac Thompson, connecting Stephanus Van Cortlandt, Timothy and Ananias Carll, and Jonathan Thompson to the early property and town-government history.",
    excerpts: [
      "The beginnings of what we call Sagtikos Manor go back to a Royal Patent granted to Stephanus Van Cortlandt on June 2, 1697, based on his 1692 purchase of 150 acres… Stephanus Van Cortlandt was the uncle-in-law of the founder of Islip, William Nicoll.",
      "Ananias Carll is first mentioned for having registered an ear mark for his cattle in 1726. He was elected Supervisor at the annual meeting of 1731… It was Selah who in 1758 sold by then much enlarged tract to Jonathan Thompson of Brookhaven (Setauket).",
    ],
    whyItMatters:
      "It lets the site show that Sagtikos Manor was not only a Revolutionary War site but part of a longer colonial landholding and town-government story.",
    citation:
      "George J. Munkenbeck, “Isaac Thompson: A Man on a Tightrope,” citing Carl Starace, Book One of the Minutes of Town Meetings… of the Town of Islip, in Town of Islip Revolutionary War Resource Guide.",
  },
  {
    id: "sagtikos-enslaved-labor",
    category: "sagtikos",
    tags: ["occupation"],
    title: "Enslaved and Indentured Labor at Sagtikos Manor",
    author: "Christopher Verga, quoted by George J. Munkenbeck",
    summary:
      "Connects Sagtikos Manor to slavery and indentured labor. The passage comes through Munkenbeck's essay quoting Christopher Verga's work on slavery in Suffolk County. The original Verga article should be verified directly.",
    excerpts: [
      "During his ownership most of the work on the farm and in the home was performed by slaves or indentured servants… this manor was also home to several enslaved people who were erased from the history of Long Island.",
      "According to New York State Census Records the third proprietor of the Manor, Isaac Thompson, owned an average of four slaves in the decades of 1790, 1800 and 1810… The full story of these enslaved people needs to be told and that will be one of the focuses of the 250th research work in the coming years.",
    ],
    whyItMatters:
      "This is essential for connecting past to present. It prevents Sagtikos from being presented only as a patriotic or presidential site, and shows the same place was shaped by enslaved and indentured labor.",
    citation:
      "Christopher Verga, “Slavery in Suffolk County, NY,” quoted in George J. Munkenbeck, “Isaac Thompson: A Man on a Tightrope,” in Town of Islip Revolutionary War Resource Guide.",
  },

  // ---------------- Life Under Occupation ----------------
  {
    id: "life-under-occupation",
    category: "occupation",
    tags: ["occupation"],
    title: "What Was Life Like in Islip During the Occupation?",
    author: "George J. Munkenbeck",
    summary:
      "Explains why occupation was difficult for people who stayed on Long Island: living under Crown authority, distrusted by British forces, and vulnerable to raids from across the Sound.",
    excerpts: [
      "It is hard for us to imagine a sparsely populated rural Islip Town let alone one where soldiers passed on the road and were quartered in the local homes… For the residents of the Precinct, it was a time when they seemed to have no friends.",
      "Since they were under occupation they all were British subjects, so the licenses were interpreted rather liberally by those who held them. This led to what has been termed “The Whaleboat War.”",
    ],
    whyItMatters:
      "A core essay for the occupation story. Islip residents were caught between occupying forces, patriot raiders, loyalist suspicion, Connecticut whaleboat raids, property seizures, and local danger.",
    citation:
      "George J. Munkenbeck, “What was life like in Islip and the surrounding areas during the occupation?,” in Town of Islip Revolutionary War Resource Guide, Part Six.",
  },
  {
    id: "british-soldier",
    category: "occupation",
    tags: ["occupation"],
    title: "The British Soldier and the Occupation of Islip",
    author: "George J. Munkenbeck",
    summary:
      "Gives concrete examples of occupation pressures: soldiers quartered in homes, seizures, farms drained for supplies, and prisoners held without trial. It presents occupation as complicated, not a simple story.",
    excerpts: [
      "The residents of Islip Precinct found themselves “hosting” British troops whether they wanted to or not. When large troop movements occurred, they might be bivouacked on your land and often the farms woodlot, and fences and even buildings would be used for firewood.",
      "Your forage would be used to feed the army's animals, and your livestock would either be “purchased,” seized or just plain stolen.",
    ],
    whyItMatters:
      "One of the strongest sections for explaining occupation as lived experience, with specifics visitors can picture: homes, fences, livestock, food, woodlots, prisons, and danger.",
    citation:
      "George J. Munkenbeck, “The British Soldier,” in Town of Islip Revolutionary War Resource Guide: Part Four.",
  },
  {
    id: "magistrate",
    category: "occupation",
    title: "What Was a Magistrate Under British Colonial Jurisprudence?",
    author: "George J. Munkenbeck",
    summary:
      "Explains why Isaac Thompson's role as a magistrate mattered. Magistrates handled local legal matters, warrants, and order, which made Thompson's position during the Revolution more complicated.",
    excerpts: [
      "In colonial America, magistrates, often called justices of the peace, primarily handled minor legal matters within their local areas. They presided over petty crimes, issued warrants, and sometimes played a role in civil disputes.",
      "Considering that he would be friends with the Nicolls who controlled most of Islip… Isaac Thompson played a much larger role than we have told the story of at Sagtikos… Perhaps it is time for the walls to talk.",
    ],
    whyItMatters:
      "It helps visitors understand that Thompson's life was politically dangerous because he was part of local justice, taxation, and Crown-era authority while also becoming connected to patriot resistance.",
    citation:
      "George J. Munkenbeck, “What was a magistrate under British Colonial Jurisprudence?,” in Town of Islip Revolutionary War Resource Guide: Part Four.",
  },

  // ---------------- Music, Worship & Resistance ----------------
  {
    id: "singing-defiance",
    category: "music",
    tags: ["occupation"],
    title: "Singing and Defying the British Occupiers",
    author: "George J. Munkenbeck",
    summary:
      "Explains how music could be compliance and resistance at the same time. Under occupation, residents might be required to sing “God Save the King,” but flexible eighteenth-century tunes let colonists sing different words to familiar melodies.",
    excerpts: [
      "Often, the occupiers would require the residents to sing “God Save the King” at their meetings and religious services. To comply (so to speak) the colonists found a way to obey and protest in song all at the same time!",
      "This ability to fit other words to a well-known tune by knowing the rhythm was what gave the colonists the idea on how to “twist the tail” of the British lion.",
    ],
    whyItMatters:
      "It shows resistance was not only military. It could be cultural, musical, religious, and subtle.",
    citation:
      "George J. Munkenbeck, “Singing and Defying the British Occupiers,” in Town of Islip Revolutionary War Resource Guide, Part Six.",
  },
  {
    id: "hymn-rebellion",
    category: "music",
    tags: ["occupation"],
    title: "A Hymn That Hid Rebellion: Come, Thou Almighty King",
    author: "George J. Munkenbeck",
    summary:
      "Explains how “Come, Thou Almighty King” could work as hidden resistance because it could be sung to the same tune as “God Save the King.” One story tells of a Long Island congregation doing exactly this. The specific story is best framed as tradition unless further verified.",
    excerpts: [
      "One story that is told is that a congregation on Long Island was required to sing the anthem to begin their religious services. As the occupation authorities listened outside, they heard the music but misinterpreted the words being sung.",
      "Instead of a first line that read “God save great George our King,” they were singing the hymn whose first line is “Come, thou almighty King!”",
    ],
    whyItMatters:
      "One of the project's most memorable human stories: people under occupation could outwardly comply while inwardly resisting, connecting religion, language, music, and politics.",
    citation:
      "George J. Munkenbeck, “A Hymn that Hid Rebellion: Come, Thou Almighty King,” in Town of Islip Revolutionary War Resource Guide, Part Six.",
  },
  {
    id: "good-old-colony-day",
    category: "music",
    title: "In the Good Old Colony Day: When We Were Under the King",
    author: "George J. Munkenbeck",
    summary:
      "Shows the contrast between ordinary local government and the crisis about to arrive. At Islip's April 1775 annual meeting, residents were still handling routine business; within months, war and occupation would transform daily life.",
    excerpts: [
      "Nothing in the minutes of the Islip Precinct's annual meeting held on April 4, 1775, indicates any concern that the news from Massachusetts… was on the mind of the residents as the crisis was reaching a critical point.",
      "In the passage of just a few months, war would come to Long Island. Islip militiamen faced defeat and prison, many residents would flee and for the next seven years Islip would be occupied by British troops.",
    ],
    whyItMatters:
      "One of the best essays for connecting past to present: it shows how ordinary people can be living normal lives right before history overtakes them.",
    citation:
      "George J. Munkenbeck, “In the Good Old Colony Day: When We Were Under the King,” in Town of Islip Revolutionary War Resource Guide, Part Six.",
  },

  // ---------------- Flags & Symbols ----------------
  {
    id: "flags-part-one",
    category: "flags",
    tags: ["flags"],
    title: "The Colonial Flags of Islip Precinct, Part One",
    author: "George J. Munkenbeck",
    summary:
      "Uses flags to explain political change before the Revolution, connecting Dutch and English colonial authority, the Nicoll family, Islip's “middle ground” status, and the Red Ensign flown in colonial times.",
    excerpts: [
      "Islip was still a middle ground, and contemporary maps show it as “Indian Territory.” When in 1683 the East Riding (original name for Suffolk) was formed into a county… it was not shown to be part of any town.",
      "The Red Ensign also called the Red Duster that became the Civil Flag used in the colonies be flown over Islip during colonial times and during the time of British occupation.",
    ],
    whyItMatters:
      "It turns abstract colonial history into visual history, and supports an illustrated flag resource with image slots for the Union Flag, St. George's Cross, and the Red Ensign.",
    citation:
      "George J. Munkenbeck, “The Colonial Flags of Islip Precinct: Part One,” in Town of Islip Revolutionary War Resource Guide, Part Six.",
  },
  {
    id: "flags-part-two",
    category: "flags",
    tags: ["flags", "militia"],
    title: "The Colonial Flags of Islip Precinct, Part Two: The Revolution",
    author: "George J. Munkenbeck",
    summary:
      "Follows the flag story into the Revolution, from the British Red Ensign to the Huntington Liberty Flag and back to the Red Ensign during occupation. It is careful to say Islip militiamen “likely” marched under Huntington's flag.",
    excerpts: [
      "So, what flag flew over today's Town of Islip and was carried by its militia into battle? That is not an easy question. With the militia of Islip closely tied to Huntington it is likely that the flag that Huntington used was the one the members of the militia marched under.",
      "At a reading of the Decoration of Independence in July 1776, a flag was raised in Huntington that had the Union Flag removed from the canton and the words “George III” removed, leaving a red flag emblazed with the word “Liberty.” … With the defeat at Brooklyn the flag over Islip would once again be the Red Ensign for six more years until 1783.",
    ],
    whyItMatters:
      "A strong candidate for the visual side of the site. It connects political change to something visitors can see, while keeping the flag claim appropriately cautious.",
    citation:
      "George J. Munkenbeck, “The Colonial Flags of Islip Precinct: Part Two, The American Revolution,” in Town of Islip Revolutionary War Resource Guide, Part Six.",
  },

  // ---------------- Local Patriots & Memory ----------------
  {
    id: "benajah-strong",
    category: "patriots",
    tags: ["militia"],
    title: "Captain Benajah Strong: “For Washington and Liberty!”",
    author: "George J. Munkenbeck",
    summary:
      "Introduces Benajah Strong, an Islip official and patriot connected to the militia, local government, the Thompson family, and refugee experience during the Revolution.",
    excerpts: [
      "In April 1787, 39-year-old Benajah Strong was the last person to be elected to the office of Supervisor of the Precinct of Islip as for in a year the State of New York would recognize Islip as a Town by law.",
      "As a well-known supporter of the patriot cause. He was one of those who fled to Connecticut when the British occupied Suffolk County, but he was involved in several raids and missions and was considered a “notorious rebel.”",
    ],
    whyItMatters:
      "Benajah Strong connects Islip's patriot militia, refugee experience, local government, and family networks, and expands the People page beyond Isaac Thompson and Washington.",
    citation:
      "George J. Munkenbeck, “Islip Town Supervisor Captain Benajah Strong: ‘For Washington and Liberty!’,” in Town of Islip Revolutionary War Resource Guide, Part Six.",
  },
  {
    id: "islip-militia-anniversary",
    category: "patriots",
    tags: ["militia"],
    title: "Islip Militia: 250th Anniversary, 1776–2026",
    author: "Robert Finnegan",
    summary:
      "A concise account of the Islip Militia Company that connects the 1775 census, Isaac Thompson, Benajah Strong, and local military organization, with concrete numbers.",
    excerpts: [
      "The June 26, 1775 census conducted by John Mowbrey, and witnessed by Judge Isaac Thompson, identified 64 men of Islip's 375 residents that would be subject to military service.",
      "The Islip Militia Company consisted of 38 men who were assigned to the 1 Suffolk County Militia Regiment under Brigadier General Nathaniel Woodhull. Judge Isaac Thompson also served in this Regiment.",
    ],
    whyItMatters:
      "It connects population, military service, Isaac Thompson, and Benajah Strong to the local effort to organize Islip separately from surrounding towns.",
    citation:
      "Robert Finnegan, “Islip Militia: 250th Anniversary, 1776–2026,” The Quahog, Winter 2026.",
  },
  {
    id: "patriots-honored",
    category: "patriots",
    title: "Islip Patriots Honored This Summer",
    author: "George J. Munkenbeck",
    summary:
      "Connects the Revolutionary generation to present-day commemoration, describing research to identify and mark the burial places of known Islip patriots.",
    excerpts: [
      "On a very hot day Mr. Haddock and the Town Historian visited the known burial places of these men who risked everything by siding with the patriot cause and mounted signs provided by the Sons of the American Revolution at the burying grounds and cemeteries of Islip Town.",
      "These signs are the first steps in our 250th celebration here in the Town of Islip.",
    ],
    whyItMatters:
      "It shows the Revolution is not only in old documents. It is still being researched, marked, and remembered in Islip cemeteries today.",
    citation:
      "George J. Munkenbeck, “Islip Patriots Honored this Summer,” in Town of Islip Revolutionary War Resource Guide, Part Six.",
  },
  {
    id: "manor-st-george",
    category: "patriots",
    title: "The Manor of St. George and Fort St. George",
    author: "George J. Munkenbeck",
    summary:
      "Places Islip's story within the larger Long Island landscape. The Manor of St. George in Mastic was raided during the Revolution and connects to the earliest form of the Purple Heart through Sergeant Elijah Churchill.",
    excerpts: [
      "The colonial version of this structure was the main portion of Fort St. George raided at 3 AM on November 23, 1780.",
      "For his valiant service at these two raids Sergeant Elijah Churchill of the Second Regiment of Continental Dragoons received the first decoration that the common soldier was eligible to earn, the Purple Heart.",
    ],
    whyItMatters:
      "Useful for building a broader Long Island Revolutionary map around Islip; it strengthens regional context without replacing the Islip story.",
    citation:
      "George J. Munkenbeck, “The Manor of St. George,” in Town of Islip Revolutionary War Resource Guide, Part Six.",
  },

  // ---------------- Research Methods & Source Gaps ----------------
  {
    id: "more-than-facts",
    category: "method",
    title: "There's More to History than Facts and Events",
    author: "George J. Munkenbeck",
    summary:
      "Explains the method behind the project: history is not only a list of facts or famous people. Understanding Islip during the Revolution also means daily life, fear, music, news, food, family, work, and memory.",
    excerpts: [
      "To understand history and events of year's past we need to look at more than facts, events and even the “big players” in those times to put the event in context.",
      "To gain the full picture we need to know what they ate, what they read, the news that reached them and the music they listened to and the songs they sang, just to name a few things.",
    ],
    whyItMatters:
      "It states the interpretive method of the whole project and justifies the attention to everyday life, music, and worship.",
    citation:
      "George J. Munkenbeck, “There's More to History than Facts and Events,” in Town of Islip Revolutionary War Resource Guide, Part Six.",
  },
  {
    id: "huntington-records",
    category: "method",
    tags: ["occupation"],
    title: "Why Huntington Records Matter for Islip",
    author: "George J. Munkenbeck",
    summary:
      "Explains why the project sometimes uses nearby Huntington records: Islip's own minutes are quiet about the occupation, while Huntington's preserve more detail about orders and military pressures.",
    excerpts: [
      "The Islip Precinct minutes are rather silent on the impact and orders given to the residents but the Huntington Town minutes contain many of the orders and records of the impact of the occupation on their residents.",
      "The fact that even that set of records really lists any comments on the military issues other than support to the occupying forces shows the control that the occupation forces had over the residents.",
    ],
    whyItMatters:
      "Excellent for the Research pages: silence in records is itself meaningful. The lack of dramatic wartime entries in Islip's minutes may reflect the control and danger of occupation.",
    citation:
      "George J. Munkenbeck, First Addendum to Town of Islip Revolutionary War Resource Guide, Office of the Town Historian, March 10, 2026.",
  },
];

// Flat text for the search index.
export const essaysSearchText: string = essays
  .map((e) =>
    [e.title, e.author, e.summary, e.whyItMatters, ...e.excerpts]
      .filter(Boolean)
      .join(" "),
  )
  .join(" ");
