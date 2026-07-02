// The working timeline. Like people.ts, entries are structured English data;
// the Spanish site shows them in English with a notice until translated, while
// UI chrome and era titles are translated (dictionaries/<locale>/timeline.json).
// The list is deliberately incomplete and grows as sources are digitized.

export const timelineEras = [
  "before",
  "colonial",
  "revolution",
  "civic",
  "community",
  "today",
] as const;

export type TimelineEra = (typeof timelineEras)[number];

export interface TimelineEntry {
  id: string;
  date: string;
  title: string;
  era: TimelineEra;
  // One or two plain sentences for the child-friendly timeline (/timeline/kids).
  // Written to be honest about uncertainty in simple words ("the old papers
  // never say why"), never to trade caution for false certainty.
  inBrief: string;
  body: string[];
  whyToday: string;
  sources: string[];
}

export const timeline: TimelineEntry[] = [
  {
    id: "pre-1683",
    date: "Before 1683",
    title: "Indigenous land before colonial Islip",
    era: "before",
    inBrief: "Before Islip had its name, this was the home of Native people, including the Secatogue. Their story here is the oldest one.",
    body: [
      "The land that became Islip was Indigenous land before colonial patents and town government. Later colonial records identify Winnaquaheagh as Sachem of the lands in today's Islip Town and describe the transfer of land to William Nicoll.",
    ],
    whyToday:
      "The town's history begins before it had a European name. This shapes how the project discusses land, memory, and belonging.",
    sources: ['George J. Munkenbeck, "The Origins of the Town of Islip."'],
  },
  {
    id: "1683-nicoll-purchase",
    date: "November 29, 1683",
    title: "William Nicoll's first purchase and Islip Grange",
    era: "colonial",
    inBrief: "A man named William Nicoll bought land from Winnaquaheagh, a Secatogue leader. That purchase started the place later called Islip.",
    body: [
      "William Nicoll made the first purchase of land that became Islip Grange on November 29, 1683. The annotated 1798 letter describes this as the first deeded land and the beginning of Islip Grange, covering areas connected to today's East Islip, Great River, Islip Terrace, and surrounding hamlets.",
    ],
    whyToday:
      "This date appears in Islip's civic identity and Town Seal, but it marks a land purchase, not the full creation of modern town government.",
    sources: [
      'Nathaniel Conklin, "Description of the Town of Islip in Suffolk County," 1798 (annotated, Town of Islip Historian\'s Office).',
    ],
  },
  {
    id: "1684-royal-patent",
    date: "December 5, 1684",
    title: "Royal patent to William Nicoll",
    era: "colonial",
    inBrief: "The king's governor gave Nicoll an official paper for the land. Nicoll had to pay the king a small rent every year.",
    body: [
      "Royal Governor Thomas Dongan confirmed Nicoll's purchase with a royal patent on December 5, 1684. The patent required Nicoll to pay yearly rent to the Crown.",
    ],
    whyToday:
      "The patent story explains why land, law, and colonial authority are central to Islip's origins.",
    sources: [
      'Nathaniel Conklin, "Description of the Town of Islip in Suffolk County," 1798 (annotated, Town of Islip Historian\'s Office).',
    ],
  },
  {
    id: "1692-1697-sagtikos",
    date: "1692 / 1697",
    title: "Beginnings of Sagtikos Manor",
    era: "colonial",
    inBrief: "The land that became Sagtikos Manor got its start. Later, this house saw many important moments in Islip's story.",
    body: [
      "The Sagtikos Manor property story begins with Stephanus Van Cortlandt's 1692 purchase of land and a royal patent granted on June 2, 1697. This became the first part of what later developed into Sagtikos Manor.",
    ],
    whyToday:
      "Sagtikos becomes one of the project's strongest physical links between colonial Islip, the Revolution, and later Gardiner family history.",
    sources: [
      'George J. Munkenbeck, "The Origins of the Town of Islip."',
      'Michele Antonio, "George Washington Slept at Sagtikos Manor," Patch, June 26, 2010. Secondary local-history source.',
    ],
  },
  {
    id: "1706-carll",
    date: "1706",
    title: "Carll family acquisition of Sagtikos property",
    era: "colonial",
    inBrief: "The Carll family bought the Sagtikos land. In early Islip, family land and town jobs often went together.",
    body: [
      "Timothy Carll purchased the Sagtikos Manor property from the heirs of Stephanus Van Cortlandt in 1706. His son Ananias later inherited the land and became active in local government.",
    ],
    whyToday:
      "This shows how property, family networks, and local officeholding were connected in early Islip.",
    sources: ['George J. Munkenbeck, "The Origins of the Town of Islip."'],
  },
  {
    id: "1710-precinct",
    date: "1710",
    title: "Precinct government authorized",
    era: "colonial",
    inBrief: "A new law let the people of Islip choose their own local leaders for the first time. This is when Islip's government really began.",
    body: [
      "A colonial act passed in 1710 allowed the Precinct of Islip to elect assessors, a collector, constable, and supervisor. This is a key moment in the development of local government.",
    ],
    whyToday:
      "This is one of the strongest dates for explaining the beginning of Islip government, rather than leaning on 1683 too simply.",
    sources: ['George J. Munkenbeck, "The Origins of the Town of Islip."'],
  },
  {
    id: "1720-freeholders",
    date: "1720",
    title: "Early election by freeholders",
    era: "colonial",
    inBrief: "Back then, only men who owned land could vote. Women, Native people, Black people, and children were all left out.",
    body: [
      "Town records show that early local elections involved freeholders — male, property-holding qualified voters. This reveals that early local government was limited by property and gender.",
    ],
    whyToday:
      "This connects early local government to the exhibit's larger theme: the promise of civic participation was not originally open to everyone.",
    sources: ['George J. Munkenbeck, "The Origins of the Town of Islip."'],
  },
  {
    id: "1731-1742-carll-duties",
    date: "1731\u20131742",
    title: "Ananias Carll and early town duties",
    era: "colonial",
    inBrief: "Ananias Carll helped run the town, looking after roads and poor neighbors. Town jobs were work that neighbors shared.",
    body: [
      "Ananias Carll was elected supervisor in 1731, served as an overseer for the poor in the late 1730s, and helped carry out public highway work through the Precinct of Islip.",
    ],
    whyToday:
      "Roads, poor relief, and records show the practical beginnings of town government.",
    sources: ['George J. Munkenbeck, "The Origins of the Town of Islip."'],
  },
  {
    id: "1739-annual-meeting",
    date: "April 1739",
    title: "The annual town meeting at work",
    era: "colonial",
    inBrief: "Every April, neighbors met to pick the town's leaders and make rules. In 1739 they also paid for the care of a poor woman named Hannah Hulse.",
    body: [
      "The minutes for April 1739 show Islip's precinct government in full routine: George Phillips elected supervisor and clerk, plus assessors, a constable and collector, and overseers “to take care of ye Pore of ye Town.” At the same meeting, Anning Moubray agreed to board Hannah Hulse, a poor resident, at a set weekly rate. Year after year, the first Tuesday of April brought the same civic rhythm: elections, accounts, road work, fence viewers, and rules for hogs and boars running on the commons.",
    ],
    whyToday:
      "Decades before independence, Islip already governed itself through an annual meeting of neighbors. Self-government was a local habit before it became a national idea.",
    sources: [
      "Islip town minutes, April 1739, in Carl A. Starace, ed., Book One of the Minutes of Town Meetings and Register of Animal Ear Marks of the Town of Islip, 1720–1861 (Town of Islip, 1982).",
    ],
  },
  {
    id: "1758-jonathan-thompson",
    date: "1758",
    title: "Jonathan Thompson purchases Sagtikos Manor",
    era: "colonial",
    inBrief: "Jonathan Thompson bought Sagtikos Manor for his family. His son Isaac would live there during the Revolution.",
    body: [
      "Jonathan Thompson purchased Sagtikos Manor / Apple Tree Farm in 1758. The property later became central to Isaac Thompson's Revolutionary-era story.",
    ],
    whyToday:
      "This purchase sets up Sagtikos as a major Revolutionary site in Islip memory.",
    sources: ['George J. Munkenbeck, "Isaac Thompson \u2014 A Man on a Tightrope."'],
  },
  {
    id: "1765-fishing-rule",
    date: "April 1765",
    title: "The town regulates fishing in the bay",
    era: "colonial",
    inBrief: "The town made a rule: do not invite outsiders to fish in the bay. Rule-breakers paid a fine, and the money went to help the poor.",
    body: [
      "The annual meeting voted that any inhabitant who gave an outsider leave to fish in the bay or creeks would forfeit forty shillings \u201cto the overseers of the poor for the use of the poor of the Said town.\u201d The rule was continued in 1766 with a legal way to recover the fine, and the same instinct lasted: in 1815 the town voted that non-residents could not carry clams, fish, or fowl out of the town.",
    ],
    whyToday:
      "Bay access was town politics from the start. One vote ties together Islip's economy, its environment, and its care for its poorest residents.",
    sources: [
      "Islip town minutes, 1765, 1766, and 1815, in Carl A. Starace, ed., Book One of the Minutes of Town Meetings and Register of Animal Ear Marks of the Town of Islip, 1720\u20131861 (Town of Islip, 1982).",
    ],
  },
  {
    id: "1765-st-johns",
    date: "circa 1765",
    title: "St. John's / Charlotte Church built",
    era: "colonial",
    inBrief: "Around this time, Islip's first church building went up. Its old records help us learn about early families.",
    body: [
      "The St. John's Episcopal Church booklet says 1765 appears to be the most reliable date for the church building. It describes the building as the first church in Islip Town and the second oldest in Suffolk County.",
    ],
    whyToday:
      "The churchyard and church records preserve early Islip family, religious, and racial history.",
    sources: ["St. John's Episcopal Church booklet (parish history)."],
  },
  {
    id: "1775-april-meeting",
    date: "April 4, 1775",
    title: "Islip's last peacetime annual meeting",
    era: "revolution",
    inBrief: "In April 1775, the town meeting was completely normal: leaders picked, rules continued, no talk of war. Nobody knew everything was about to change.",
    body: [
      "At the annual meeting of Islip Precinct on April 4, 1775, the minutes record routine local business: William Nicoll re-elected supervisor, the usual hog rules continued, and the precinct's accounts settled. Among the officers chosen were Benajah Strong and Isaac Thompson as overseers of the highways, with Thompson also serving as an overseer of the poor. There is no sign of the crisis about to arrive; within a year, these same two men would organize Islip's militia company.",
    ],
    whyToday:
      "It shows ordinary people living normal lives just before history overtook them, a reminder that upheaval can arrive without warning.",
    sources: [
      'George J. Munkenbeck, "In the Good Old Colony Day: When We Were Under the King."',
      "Islip town minutes, April 1775, in Carl A. Starace, ed., Book One of the Minutes of Town Meetings and Register of Animal Ear Marks of the Town of Islip, 1720–1861 (Town of Islip, 1982).",
    ],
  },
  {
    id: "1775-lexington",
    date: "April 19, 1775",
    title: "Lexington and Concord",
    era: "revolution",
    inBrief: "Far away in Massachusetts, the first battles of the American Revolution were fought. The news traveled slowly to Long Island.",
    body: [
      "Fifteen days after Islip's annual meeting, fighting broke out at Lexington and Concord in Massachusetts. News reached Long Island slowly, often by word of mouth carried by boat.",
    ],
    whyToday:
      "The war that would occupy Islip for seven years began far away, but its consequences reached every Long Island town.",
    sources: ['George J. Munkenbeck, "In the Good Old Colony Day: When We Were Under the King."'],
  },
  {
    id: "1775-articles",
    date: "May 10, 1775",
    title: "Islip meeting on the Articles of Association",
    era: "revolution",
    inBrief: "People in Islip signed a paper promising to support the American cause. Signing took courage, because the king's government called it a crime.",
    body: [
      "Isaac Thompson attended a May 10, 1775 meeting of freeholders and residents of the Precinct of Islip to discuss whether to support the Continental Congress Articles of Association. He signed the Islip Precinct articles, placing himself and his family at risk because he was also a Crown magistrate and precinct official.",
    ],
    whyToday:
      "This event gives Islip a local pre-independence moment tied to the coming Revolution.",
    sources: ['George J. Munkenbeck, "Isaac Thompson \u2014 A Man on a Tightrope."'],
  },
  {
    id: "1775-census",
    date: "June 26, 1775",
    title: "Islip census and militia eligibility",
    era: "revolution",
    inBrief: "The town counted its people: 375 lived here, and 64 men were the right age to serve as part-time soldiers.",
    body: [
      "A census conducted by John Mowbrey and witnessed by Judge Isaac Thompson counted 375 residents of Islip Precinct and identified 64 men aged 16 to 50 subject to militia service. It was completed days after the Battle of Bunker Hill.",
    ],
    whyToday:
      "It gives a concrete sense of scale: a small precinct still had to make political and military decisions.",
    sources: ['Robert Finnegan, "Islip Militia: 250th Anniversary, 1776–2026," The Quahog, Winter 2026.'],
  },
  {
    id: "1776-militia-letter",
    date: "February 9, 1776",
    title: "Islip asks for its own militia company",
    era: "revolution",
    inBrief: "Islip asked for its very own militia company, with Benajah Strong as captain. About 36 or 37 men would belong to it.",
    body: [
      "Writing as chairman of the Committee of Islip, Isaac Thompson asked the Provincial Congress to commission officers for a militia company chosen by the precinct, naming Benajah Strong as captain. The company numbered about 36 or 37 men.",
    ],
    whyToday:
      "Islip organized itself politically and militarily before the occupation, rather than waiting to be acted upon.",
    sources: ['Isaac Thompson to the Provincial Congress, February 9, 1776, in George J. Munkenbeck, "Isaac Thompson — A Man on a Tightrope."'],
  },
  {
    id: "1776-thompson-supervisor",
    date: "April 1776",
    title: "Isaac Thompson becomes supervisor",
    era: "revolution",
    inBrief: "Isaac Thompson was chosen as the town's leader, called the supervisor. He kept that job through all the war years.",
    body: [
      "At the annual meeting in April 1776, the minutes record “Isaac Thompson Supervisor” for the first time, ending William Nicoll's long run in the office. Thompson, who had signed the Articles of Association and asked the Provincial Congress for a militia company, would be re-elected every year through the occupation; his last election as supervisor came in April 1785.",
    ],
    whyToday:
      "The man walking the Revolution's tightrope in Islip was not an outsider. He was the town's elected leader, chosen by his neighbors in the very spring the war was closing in.",
    sources: [
      "Islip town minutes, April 1776, in Carl A. Starace, ed., Book One of the Minutes of Town Meetings and Register of Animal Ear Marks of the Town of Islip, 1720–1861 (Town of Islip, 1982).",
      'George J. Munkenbeck, "Isaac Thompson — A Man on a Tightrope."',
    ],
  },
  {
    id: "1776-town-gun",
    date: "April 1776",
    title: "“A Gun and the accutriments,” town property",
    era: "revolution",
    inBrief: "The town bought a gun and its gear and wrote down that it belonged to the whole town. The old papers never say why, so it is still a mystery.",
    body: [
      "On the page following the April 1776 meeting, the clerk recorded that “A Gun and the accutriments” were “paid for at Said Town Meeting which are the property of the towns.” The minutes do not say what the gun was for. The date is suggestive, two months after Islip requested its militia commissions and three months before independence, but the record itself is a single sentence, and this project does not claim more than it says.",
    ],
    whyToday:
      "One line in a ledger can carry a whole moment: a small town buying a gun with public money in the spring of 1776. What it meant is a research question the digitized records now let anyone ask.",
    sources: [
      "Islip town minutes, April 1776, in Carl A. Starace, ed., Book One of the Minutes of Town Meetings and Register of Animal Ear Marks of the Town of Islip, 1720–1861 (Town of Islip, 1982).",
    ],
  },
  {
    id: "1776-declaration-huntington",
    date: "July 22, 1776",
    title: "The Declaration read at Huntington",
    era: "revolution",
    inBrief: "The Declaration of Independence was read out loud in nearby Huntington. People celebrated, but danger was on its way.",
    body: [
      "The Declaration of Independence was read publicly at Huntington. Nearby towns celebrated, but British military movements soon changed the mood across Long Island.",
    ],
    whyToday:
      "Independence was proclaimed just as the danger of invasion reached Islip's doorstep.",
    sources: ["Charles R. Street, ed., Huntington Town Records, vol. 3, excerpted in Town of Islip Revolutionary War Resource Guide."],
  },
  {
    id: "1776-battle-long-island",
    date: "August 27–29, 1776",
    title: "The Battle of Long Island",
    era: "revolution",
    inBrief: "The British army won a big battle in Brooklyn. After that, they controlled all of Long Island, including Islip.",
    body: [
      "British forces defeated the Continental Army at the Battle of Long Island, fought in Brooklyn (Kings County). Suffolk County militia, including men connected to Islip, had marched west after the Declaration was read.",
    ],
    whyToday:
      "The defeat opened Long Island to occupation. The battle was not fought in Islip, but its outcome shaped Islip's next seven years.",
    sources: ['George J. Munkenbeck, "The Colonial Flags of Islip Precinct: Part Two, The American Revolution."'],
  },
  {
    id: "1776-occupation-begins",
    date: "September 1, 1776",
    title: "British occupation of Long Island begins",
    era: "revolution",
    inBrief: "British soldiers took charge of Long Island. For about seven years, Islip's people had to live under their rule.",
    body: [
      "Following the defeat at Brooklyn, British and Loyalist forces occupied Long Island. Islip Precinct would remain under Crown authority until late 1783.",
    ],
    whyToday:
      "For six years, occupation shaped everyday life in Islip: homes, farms, loyalty, and survival.",
    sources: ['George J. Munkenbeck, "What was life like in Islip and the surrounding areas during the occupation?"'],
  },
  {
    id: "1776-privateers-inlet",
    date: "1776",
    title: "American privateers at Fire Island Inlet",
    era: "revolution",
    inBrief: "Years later, a town leader remembered three American ships hiding at Fire Island Inlet in 1776 and capturing British ships. We know this only because he wrote it down.",
    body: [
      "Writing in 1798, Supervisor Nathaniel Conklin recalled that “in the late war in the year 1776 there were three American privateers lay within this Inlet,” going out as opportunity offered, capturing British vessels, and bringing them through the inlet into the bay, among them a transport ship of about three hundred tons. His memory, written twenty-two years later, is the main evidence for this activity at Islip's inlet.",
    ],
    whyToday:
      "The Revolution at sea touched Islip directly: its own inlet sheltered American raiders. It also shows how much local history survives only because someone later wrote it down.",
    sources: [
      'Nathaniel Conklin, "Description of the Town of Islip in Suffolk County," January 11, 1798 (annotated, Town of Islip Historian\'s Office).',
    ],
  },
  {
    id: "1776-1783-occupation",
    date: "1776\u20131783",
    title: "British occupation affects Islip",
    era: "revolution",
    inBrief: "During the war, soldiers even used Islip's little church. Life was hard for ordinary families.",
    body: [
      "During the Revolution, Islip lived under British occupation. The St. John's booklet says the little shingled church was used as a military outpost and was left in bad shape after the British evacuated New York in 1783.",
    ],
    whyToday:
      "This makes the Revolution local: occupation affected buildings, families, worship, and daily life.",
    sources: ["St. John's Episcopal Church booklet (parish history)."],
  },
  {
    id: "1776-mary-thompson",
    date: "September\u2013October 1776",
    title: "Mary Gardiner Thompson and family under occupation",
    era: "revolution",
    inBrief: "Mary Thompson was expecting a baby when the soldiers came. Her family had to make hard choices to stay safe.",
    body: [
      "At the beginning of occupation, Mary Gardiner Thompson was late in pregnancy and caring for a young child. Town Historian material uses this to explain why Isaac Thompson may have remained at Sagtikos, choosing his family's health and safety during danger.",
    ],
    whyToday:
      "This shows the Revolution through family life, not only military or political events.",
    sources: ['George J. Munkenbeck, "Isaac Thompson \u2014 A Man on a Tightrope."'],
  },
  {
    id: "1777-1783-wartime-meetings",
    date: "1777\u20131783",
    title: "Town meetings continue under the King's name",
    era: "revolution",
    inBrief: "Even with soldiers in charge, the town still held its meeting every April. The papers had to use the king's name, but that does not tell us what people really believed.",
    body: [
      "Through every year of the British occupation, Islip held its annual April meeting, elected its officers, and kept its accounts. As legal records under Crown authority, the minutes dated each wartime meeting by the reign of King George III, through \u201cthe three and twentieth year\u201d in April 1783. That wording was the required official formula of an occupied place, not proof that Islip's people were Loyalists: the same meetings kept re-electing Isaac Thompson, who had signed the patriot Articles of Association, as supervisor.",
    ],
    whyToday:
      "The Revolution was not a clean break. Islip's own records show a community holding itself together under occupation, governing under one authority's forms while many of its people hoped for another.",
    sources: [
      "Islip town minutes, 1777\u20131783, in Carl A. Starace, ed., Book One of the Minutes of Town Meetings and Register of Animal Ear Marks of the Town of Islip, 1720\u20131861 (Town of Islip, 1982).",
    ],
  },
  {
    id: "1778-suspected",
    date: "June 30, 1778",
    title: "New York targets “suspected characters”",
    era: "revolution",
    inBrief: "A new law said people had to promise loyalty to New York. Even staying neutral, not picking a side, could bring trouble.",
    body: [
      "A New York law authorized commissioners to summon people considered neutral or of “equivocal and suspected” loyalty and require them to swear allegiance to the State.",
    ],
    whyToday:
      "It shows the Revolution was also a civil conflict, where neutrality itself could be treated as dangerous.",
    sources: ["New York State, Laws of the State of New York, vol. 1 (Albany, 1886)."],
  },
  {
    id: "1779-loyalty-laws",
    date: "October 1779",
    title: "New York punishes loyalty and plans for reoccupation",
    era: "revolution",
    inBrief: "New York punished people who helped the king's side by taking away their land. The war split neighbors apart.",
    body: [
      "Within two days, New York passed an act forfeiting and selling the estates of people who had adhered to the enemy (naming figures including Sir Henry Clinton), and an act to plan the temporary government of the southern district once the British left.",
    ],
    whyToday:
      "Property, punishment, and the difficult return to civil government were all part of the Revolution's local reach.",
    sources: ["New York State, Laws of the State of New York, vol. 1 (Albany, 1886)."],
  },
  {
    id: "1781-plundering",
    date: "1781",
    title: "Whaleboat raids and the plundering resolution",
    era: "revolution",
    inBrief: "Raiders in small boats crossed from Connecticut and robbed Long Island farms, even in Islip. People here faced danger from every side.",
    body: [
      "As armed boats from Connecticut raided occupied Long Island, New York resolved that its residents, though under British control, were still its subjects and deserved protection, not plunder. Newspaper accounts record repeated raids on the Nicoll house in Islip.",
    ],
    whyToday:
      "Islip residents were caught between occupiers, raiders, and suspicion from all sides, the “Whaleboat War” at their own shore.",
    sources: ["New York State Senate and Assembly resolution, June 28, 1781; Henry Onderdonk Jr., Revolutionary Incidents of Suffolk and Kings Counties."],
  },
  {
    id: "1782-1783-hutton",
    date: "1782–1783",
    title: "Poor relief in wartime: Johanna Hutton and her child",
    era: "revolution",
    inBrief: "Even during the war, the town helped a mother named Johanna Hutton and her child. Families took turns caring for them.",
    body: [
      "In the middle of the occupation, the town formalized its care for the poor. In 1782 the meeting agreed that the overseers of the poor, with one justice, would set and collect the money needed for poor relief. In 1783 it voted that Johanna Hutton and her child would be supported by the town's families in turn, in proportion to their tax ratings, beginning at the west end of town. The accounts also record payments to “Joanna Hudson,” apparently the same woman under a different spelling.",
    ],
    whyToday:
      "War did not pause ordinary hardship. A mother and child supported household by household shows both the roughness and the reality of an eighteenth-century safety net, and that it kept working through occupation.",
    sources: [
      "Islip town minutes, 1782–1783, in Carl A. Starace, ed., Book One of the Minutes of Town Meetings and Register of Animal Ear Marks of the Town of Islip, 1720–1861 (Town of Islip, 1982).",
    ],
  },
  {
    id: "1783-evacuation",
    date: "November 23, 1783",
    title: "The British evacuate; Islip rejoins the state",
    era: "revolution",
    inBrief: "The British finally sailed away, and the war was over. Islip was part of the new United States at last.",
    body: [
      "The last British forces left New York City, and Continental troops entered. After more than seven years, the occupation of Long Island ended and Islip returned to the State of New York.",
    ],
    whyToday:
      "Independence, declared in 1776, only became reality in Islip at the end of 1783.",
    sources: ['Office of the Town Historian, Town of Islip, "Abbreviated Time Line for Islip Precinct in the Revolution."'],
  },
  {
    id: "1783-st-johns-mixed",
    date: "1783",
    title: "St. John's name change and a mixed-population record",
    era: "revolution",
    inBrief: "A church record from 1783 tells of the wedding of York, a Black man, and Elizabeth, a free Native woman. It shows Islip was home to many kinds of people.",
    body: [
      "After the Revolution, parishioners voted to rename Charlotte Church as St. John's. The 1783 marriage record of York, a Black servant to William Nicoll, and Elizabeth, a free Indian woman, gives a rare glimpse into the small but ethnically mixed population of Islip Grange.",
    ],
    whyToday:
      "This connects the new nation to the unfinished promise of belonging and racial inclusion.",
    sources: ["St. John's Episcopal Church booklet (parish history)."],
  },
  {
    id: "1784-state-authority",
    date: "April 1784",
    title: "First town meeting under the State of New York",
    era: "revolution",
    inBrief: "For the first time, the town's papers stopped counting the years by the king. They counted from American independence instead.",
    body: [
      "The first April after the British evacuated New York, Islip's annual meeting opened with new words: held “by the Authority of the good People of the State of new york and in the Eighth year of the American Independence.” The offices, the hog act, and the accounts continued as before, and Isaac Thompson was re-elected supervisor, but the town now counted its years from 1776.",
    ],
    whyToday:
      "This heading is the Revolution's arrival in Islip's own handwriting: the moment the town's records stopped belonging to a king and started belonging to a state built on independence.",
    sources: [
      "Islip town minutes, April 1784, in Carl A. Starace, ed., Book One of the Minutes of Town Meetings and Register of Animal Ear Marks of the Town of Islip, 1720–1861 (Town of Islip, 1982).",
    ],
  },
  {
    id: "1790-washington",
    date: "April 21\u201322, 1790",
    title: "Washington's Long Island tour and Sagtikos Manor",
    era: "revolution",
    inBrief: "President George Washington stayed one night at Sagtikos Manor on his trip across Long Island. He came as the leader of the brand-new country.",
    body: [
      'George Washington\'s diary describes stopping at "Squire Thompson\'s" house on April 21, 1790, and leaving "Mr. Thompson\'s" the next morning. The Town Historian annotation identifies this house as Sagtikos Manor on today\'s Montauk Highway.',
    ],
    whyToday:
      "Washington's visit links Islip's occupied Revolutionary landscape to the new republic.",
    sources: [
      'Nathaniel Conklin, "Description of the Town of Islip in Suffolk County," 1798 (annotated, Town of Islip Historian\'s Office), quoting Washington\'s diary.',
    ],
  },
  {
    id: "1796-school-commissioners",
    date: "April 1796",
    title: "School commissioners elected",
    era: "revolution",
    inBrief: "The town picked its first school leaders. Islip had five little schoolhouses back then.",
    body: [
      "The annual meeting elected commissioners of the schools for the first time in the minute book: Richard Udall, Nathaniel Conklin, and Nehemiah Higbie, after New York State passed an act to encourage common schools in 1795. Conklin's 1798 description fills in the picture: five small schoolhouses, teachers hired by the quarter, and, in one year, twelve schoolmasters and 11,814 days of instruction. In 1799 the meeting ordered the school money collected in 1797 and 1798 paid into the town treasury.",
    ],
    whyToday:
      "Public education in Islip begins in these records, handled at the same meeting that elected fence viewers. Schools started here as a neighborly, local responsibility.",
    sources: [
      "Islip town minutes, 1796–1799, in Carl A. Starace, ed., Book One of the Minutes of Town Meetings and Register of Animal Ear Marks of the Town of Islip, 1720–1861 (Town of Islip, 1982).",
      'Nathaniel Conklin, "Description of the Town of Islip in Suffolk County," January 11, 1798 (annotated, Town of Islip Historian\'s Office).',
    ],
  },
  {
    id: "1798-conklin",
    date: "January 11, 1798",
    title: "Nathaniel Conklin describes Islip",
    era: "revolution",
    inBrief: "Town leader Nathaniel Conklin wrote a long letter describing Islip: its farms, bay, mills, taverns, schools, and about 120 houses.",
    body: [
      "Supervisor Nathaniel Conklin wrote a description of the Town of Islip on January 11, 1798, to defend the town's bounds in a dispute with Huntington. Along the way he described the whole town: farms and “necks” divided by creeks, houses along the South Country Road facing the bay, the pine plains covering about four fifths of the land, the bay's oysters and clams, crops and cattle, churches, five schoolhouses, two grist mills, six sawmills, five taverns, one physician, and about 120 dwelling houses, twenty-five of them lived in by “Indians, Mustees and free Negros.”",
    ],
    whyToday:
      "This is the fullest portrait of Islip in the first generation after independence that the project has found, and the anchor for asking who the town's promise actually included.",
    sources: [
      'Nathaniel Conklin, "Description of the Town of Islip in Suffolk County," January 11, 1798 (annotated, Town of Islip Historian\'s Office).',
    ],
  },
  {
    id: "1790-1800-population",
    date: "1790\u20131800",
    title: "Early population and people of color in Islip",
    era: "revolution",
    inBrief: "Old records show that about one out of every five homes in Islip belonged to Native, Black, or mixed families. Islip was never a town of just one people.",
    body: [
      "The annotated Conklin publication states that Islip's population was 609 in 1790 and 958 by 1800. It also notes that about 21 percent of 120 dwellings were occupied by people of color, estimating roughly 128 to 201 people in that category.",
    ],
    whyToday:
      "This is crucial for showing that early Islip was not only a story of white landholding families.",
    sources: [
      'Nathaniel Conklin, "Description of the Town of Islip in Suffolk County," 1798 (annotated, Town of Islip Historian\'s Office).',
    ],
  },
  {
    id: "1883-town-seal",
    date: "1883",
    title: "Abraham Gardiner Thompson designs the Town Seal",
    era: "civic",
    inBrief: "Islip got its town seal, which is a picture puzzle: an eye plus a plant cutting called a slip means “I-slip.” You can still see it today.",
    body: [
      'In 1883, Town Clerk Seth Clock asked Abraham Gardiner Thompson to design a seal for the Town of Islip. Thompson\'s design used an "eye" and a "slip" of a plant as a rebus and connected the symbol to the town\'s unusual origins.',
    ],
    whyToday:
      "The Town Seal still appears in government and civic life today, making this one of the most visible links between past and present.",
    sources: [
      "Town of Islip Historian's Office material on the Town Seal.",
    ],
  },
  {
    id: "1897-cemetery",
    date: "December 10, 1897",
    title: "Bay Shore United Hebrew Benevolent Cemetery Association recognized",
    era: "community",
    inBrief: "Jewish families started their own cemetery association. It was one of the first big steps for the Jewish community in Islip.",
    body: [
      "The Jewish Community booklet states that the Bay Shore United Hebrew Benevolent Cemetery Association became legally recognized on December 10, 1897. This helped establish Jewish burial and religious community life in Islip Town.",
    ],
    whyToday:
      "This shows how immigrant and religious communities built institutions that made belonging visible.",
    sources: ['Mollie Sebor, "The Story of the Jewish Community of Islip Town."'],
  },
  {
    id: "1918-synagogue",
    date: "1918",
    title: "First synagogue purchased in Islip Town",
    era: "community",
    inBrief: "The Jewish community bought its first synagogue building in Islip Town.",
    body: [
      "The Jewish Community booklet says the Bay Shore United Hebrew Benevolent Cemetery Association purchased the first synagogue in Islip Town from the Knights of Columbus in 1918.",
    ],
    whyToday: "This marks a major institutional step in Jewish life in Islip.",
    sources: ['Mollie Sebor, "The Story of the Jewish Community of Islip Town."'],
  },
  {
    id: "1933-merge",
    date: "1933",
    title: "Jewish organizations merge into the Bay Shore Jewish Center",
    era: "community",
    inBrief: "Smaller Jewish groups joined together and became the Bay Shore Jewish Center.",
    body: [
      "The Bay Shore United Hebrew Benevolent Cemetery Association merged with the Bay Shore Jewish Alliance, Ladies Aid Society, and Junior League to become what is now known as the Bay Shore Jewish Center.",
    ],
    whyToday: "This shows how small community groups became lasting institutions.",
    sources: ['Mollie Sebor, "The Story of the Jewish Community of Islip Town."'],
  },
  {
    id: "postwar-refuge",
    date: "Post\u2013World War II",
    title: "Holocaust survivors find refuge in Central Islip",
    era: "community",
    inBrief: "After World War II, some Jewish survivors of the Holocaust found a safe new home in Islip. Samuel Sitko was one of them.",
    body: [
      "After World War II, Jewish refugees came through Ellis Island and some made their way to Islip Town. Adasse Farm in Central Islip served as one sanctuary, including for Samuel Sitko and at least three other known survivors.",
    ],
    whyToday:
      "This connects Islip to global history, refuge, rebuilding, and immigrant belonging.",
    sources: ['Mollie Sebor, "The Story of the Jewish Community of Islip Town."'],
  },
  {
    id: "1958-brentwood",
    date: "August\u2013September 1958",
    title: "Brentwood Jewish Center organized",
    era: "community",
    inBrief: "About 30 neighbors met in a living room and decided to start the Brentwood Jewish Center.",
    body: [
      "About 30 people met at the home of Ruby and Doris Hodus on August 29, 1958, to discuss forming a Jewish sanctuary in Brentwood. On September 1, the name Brentwood Jewish Center was chosen.",
    ],
    whyToday:
      "This shows how residents created institutions to serve changing community needs.",
    sources: ['Mollie Sebor, "The Story of the Jewish Community of Islip Town."'],
  },
  {
    id: "1964-bnai-israel",
    date: "July 1964",
    title: "B'nai Israel Reform Temple founded",
    era: "community",
    inBrief: "Families in East Islip and Sayville started a new temple called B'nai Israel.",
    body: [
      "The Jewish Community booklet says B'nai Israel Reform Temple was founded in July 1964 after community organizing among families in the East Islip and Sayville area.",
    ],
    whyToday:
      "This connects family life, children, faith, and local institution-building.",
    sources: ['Mollie Sebor, "The Story of the Jewish Community of Islip Town."'],
  },
  {
    id: "2022-internship",
    date: "2022",
    title: "Town Historian internship and apprenticeship program",
    era: "today",
    inBrief: "The Town Historian's Office began teaching students how to study and share Islip's history.",
    body: [
      "The 2024 Vignettes issue says that since 2022, an intern and apprentice program has been part of the Town Historian's Office. The program teaches research, writing, document handling, preservation, interpretation, and public presentation.",
    ],
    whyToday:
      "This connects the project itself to a living tradition of public history in Islip.",
    sources: [
      "Town of Islip Historian's Office, Vignettes, 2024 special issue.",
    ],
  },
  {
    id: "2025-2026-expansion",
    date: "2025\u20132026",
    title: "Town Historian's Office expands public history work",
    era: "today",
    inBrief: "The Historian's Office keeps working to open Islip's story to everyone.",
    body: [
      "The 2025 Vignettes issue describes the Historian's Office entering its eleventh year and continuing efforts to open Islip's unique history to residents through staff, volunteers, agencies, organizations, events, and publications.",
    ],
    whyToday:
      "This is the institutional context for the website: the project is part of a larger effort to make Islip's history public, accessible, and useful.",
    sources: [
      "Town of Islip Historian's Office, Vignettes, 2025 special issue.",
    ],
  },
  {
    id: "2026-250th",
    date: "2025–2026",
    title: "Patriot markers and the 250th commemoration",
    era: "today",
    inBrief: "Islip is getting ready for America's 250th birthday. New markers honor the town's Revolution-era patriots.",
    body: [
      "With the Sons of the American Revolution, the Town Historian's Office researched and marked the burial places of Islip's known patriots, and a historic “Islip Militia” marker is planned near Islip Town Hall. These are among the first steps in the Town's 250th commemoration.",
    ],
    whyToday:
      "The Revolution is not only in old documents. It is still being researched, marked, and remembered in Islip today.",
    sources: ['George J. Munkenbeck, "Islip Patriots Honored this Summer"; Robert Finnegan, "Islip Militia: 250th Anniversary, 1776–2026."'],
  },
];

export function timelineInEra(era: TimelineEra): TimelineEntry[] {
  return timeline.filter((e) => e.era === era);
}
