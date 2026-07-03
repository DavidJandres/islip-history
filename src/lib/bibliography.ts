// The project's working bibliography. Citations live here once, as data, so the
// English and Spanish pages render the exact same entries (a bibliography is not
// translated — only the page's headings and framing text are). Category headings
// are keyed by `id` and resolved to a localized label via dict.sources.categories.
//
// The "review" group deliberately re-lists a few works that also appear in their
// topical category, with a note on what to confirm before final publication.

export interface BibGroup {
  id: string;
  items: string[];
}

export const bibliographyGroups: BibGroup[] = [
  {
    id: "packets",
    items: [
      "Munkenbeck, George J. First Addendum to Town of Islip Revolutionary War Resource Guide. Office of the Town Historian, Town of Islip, New York, March 10, 2026.",
      "Munkenbeck, George J. First Addendum to Town of Islip Revolutionary War Resource Guide: Addendum One to Part Four, Costume and Revolutionary War British Army Information. Office of the Town Historian, Town of Islip, New York, March 10, 2026.",
      "Munkenbeck, George J. First Addendum to Town of Islip Revolutionary War Resource Guide: Addendum One to Part Six, Articles from Vignettes and Other Sources. Office of the Town Historian, Town of Islip, New York, March 10, 2026.",
      "Munkenbeck, George J. First Addendum to Town of Islip Revolutionary War Resource Guide: Addendum One to Part Three, Documents and Primary Sources. Office of the Town Historian, Town of Islip, New York, March 10, 2026.",
      "Munkenbeck, George J. Town of Islip Revolutionary War Resource Guide. First update. Office of the Town Historian, Town of Islip, New York, February 11, 2026.",
      "Munkenbeck, George J. Town of Islip Revolutionary War Resource Guide: Part Five, Laws and Resolutions Impacting the People of Islip Precinct. First update. Office of the Town Historian, Town of Islip, New York, February 11, 2026.",
      "Munkenbeck, George J. Town of Islip Revolutionary War Resource Guide: Part Four, Costume and Revolutionary War British Army Information. First update. Office of the Town Historian, Town of Islip, New York, February 11, 2026.",
      "Munkenbeck, George J. Town of Islip Revolutionary War Resource Guide: Part Seven, Articles from Other Sources. First update. Office of the Town Historian, Town of Islip, New York, February 11, 2026.",
      "Munkenbeck, George J. Town of Islip Revolutionary War Resource Guide: Part Six, Articles from Vignettes and Other Sources. First update. Office of the Town Historian, Town of Islip, New York, February 11, 2026.",
      "Munkenbeck, George J. “Abbreviated Time Line for Islip Precinct in the Revolution.” Office of the Town Historian, Town of Islip, New York. In Town of Islip Revolutionary War Resource Guide, Part 1, Sheet 3.",
    ],
  },
  {
    id: "essays",
    items: [
      "Munkenbeck, George J. “A 250th Story.” Office of the Town Historian, Town of Islip, New York. In Town of Islip Revolutionary War Resource Guide, Part Six.",
      "Munkenbeck, George J. “A Hymn That Hid Rebellion: Come, Thou Almighty King.” Office of the Town Historian, Town of Islip, New York. In Town of Islip Revolutionary War Resource Guide, Part Six.",
      "Munkenbeck, George J. “Another Islip Patriot Story.” Office of the Town Historian, Town of Islip, New York. In Town of Islip Revolutionary War Resource Guide, Part Six.",
      "Munkenbeck, George J. “In the Good Old Colony Day: When We Were Under the King.” Office of the Town Historian, Town of Islip, New York. In Town of Islip Revolutionary War Resource Guide, Part Six.",
      "Munkenbeck, George J. “Isaac Thompson: A Man on a Tightrope.” Office of the Town Historian, Town of Islip, New York. In Town of Islip Revolutionary War Resource Guide, Part Six.",
      "Munkenbeck, George J. “Islip Patriots Honored This Summer.” Office of the Town Historian, Town of Islip, New York. In Town of Islip Revolutionary War Resource Guide, Part Six.",
      "Munkenbeck, George J. “Islip Town Supervisor Captain Benajah Strong: ‘For Washington and Liberty!’” Office of the Town Historian, Town of Islip, New York. In Town of Islip Revolutionary War Resource Guide, Part Six.",
      "Munkenbeck, George J. “More to History than Facts and Figures.” Office of the Town Historian, Town of Islip, New York. In Town of Islip Revolutionary War Resource Guide, Part Six.",
      "Munkenbeck, George J. “Singing and Defying the British Occupiers.” Office of the Town Historian, Town of Islip, New York. In Town of Islip Revolutionary War Resource Guide, Part Six.",
      "Munkenbeck, George J. “The American Revolution.” Office of the Town Historian, Town of Islip, New York. In Town of Islip Revolutionary War Resource Guide, Part Six.",
      "Munkenbeck, George J. “The Colonial Flags of Islip Precinct: Part One, The Period from Colonization to the Revolution.” Office of the Town Historian, Town of Islip, New York. In Town of Islip Revolutionary War Resource Guide, Part Six.",
      "Munkenbeck, George J. “The Colonial Flags of Islip Precinct: Part Two, The American Revolution.” Office of the Town Historian, Town of Islip, New York. In Town of Islip Revolutionary War Resource Guide, Part Six.",
      "Munkenbeck, George J. “The Manor of St. George.” Office of the Town Historian, Town of Islip, New York. In Town of Islip Revolutionary War Resource Guide, Part Six.",
      "Munkenbeck, George J. “There’s More to History than Facts and Events.” Office of the Town Historian, Town of Islip, New York. In Town of Islip Revolutionary War Resource Guide, Part Six.",
      "Munkenbeck, George J. “What Was Life Like in Islip and the Surrounding Areas during the Occupation?” Office of the Town Historian, Town of Islip, New York. In Town of Islip Revolutionary War Resource Guide, Part Six.",
      "Munkenbeck, George J. “What Was the Response of Islip Residents in 1775 to the News from the North and the Act of the Continental Congress?” Office of the Town Historian, Town of Islip, New York. In Town of Islip Revolutionary War Resource Guide, Part Six.",
    ],
  },
  {
    id: "primary",
    items: [
      "Conklin, Nathaniel. “Description of the Town of Islip in Suffolk County.” January 11, 1798. Transcribed and annotated by Christopher Albergo and George J. Munkenbeck. Office of the Town Historian, Town of Islip, New York.",
      "New York State Commissioners of Statutory Revision. The Colonial Laws of New York from the Year 1664 to the Revolution. Albany: State Printer, 1894.",
      "New York State Commissioners of Statutory Revision. “An Act to Enable the Precincts of Islip, in the County of Suffolk, to Elect Two Assessors, a Collector, Constable and Supervisor.” Passed November 25, 1710. In The Colonial Laws of New York from the Year 1664 to the Revolution. Albany: State Printer, 1894.",
      "New York State Comptroller’s Office. New York in the Revolution as Colony and State. Albany, 1904.",
      "New York State Senate and Assembly. Resolution Concerning Armed Boats, Small Vessels of War, and Plundering on Long Island. June 28, 1781. Transcribed by J. Vermaelen. In Town of Islip Revolutionary War Resource Guide. Office of the Town Historian, Town of Islip, New York.",
      "New York State. Journals of the Provincial Congress, Provincial Convention, Committee of Safety and Council of Safety of the State of New York, 1775–1776–1777. Vol. 1. Albany, 1842.",
      "New York State. Laws of the State of New York Passed at the Sessions of the Legislature Held in the Years 1777, 1778, 1779, 1780, 1781, 1782, 1783 and 1784, Inclusive. Vol. 1. Albany: Weed, Parsons and Company, 1886.",
      "New York State. “An Act for the Forfeiture and Sale of the Estates of Persons Who Have Adhered to the Enemies of This State, and for Declaring the Sovereignty of the People of This State in Respect to All Property within the Same.” Passed October 22, 1779. In Laws of the State of New York Passed at the Sessions of the Legislature Held in the Years 1777–1784, vol. 1. Albany: Weed, Parsons and Company, 1886.",
      "New York State. “An Act More Effectually to Prevent the Mischiefs Arising from the Example and Influence of Persons of Equivocal and Suspected Characters in This State.” Passed June 30, 1778. In Laws of the State of New York Passed at the Sessions of the Legislature Held in the Years 1777–1784, vol. 1. Albany: Weed, Parsons and Company, 1886.",
      "New York State. “An Act to Enable the Person Administring the Government to Exchange Persons Applying for That Purpose, as Prisoners of War, for the Subjects of This State, Prisoners of War with the Enemy.” Passed March 20, 1781. In Laws of the State of New York Passed at the Sessions of the Legislature Held in the Years 1777–1784, vol. 1. Albany: Weed, Parsons and Company, 1886.",
      "New York State. “An Act to Provide for the Temporary Government of the Southern Parts of This State, Whenever the Enemy Shall Abandon or Be Dispossessed of the Same, and until the Legislature Can Be Convened.” Passed October 23, 1779. In Laws of the State of New York Passed at the Sessions of the Legislature Held in the Years 1777–1784, vol. 1. Albany: Weed, Parsons and Company, 1886.",
      "Starace, Carl A., ed. Book One of the Minutes of Town Meetings and Register of Animal Ear Marks of the Town of Islip, 1720–1861. Town of Islip, 1982.",
      "Street, Charles R., ed. Huntington Town Records, Including Babylon, Long Island, N.Y., 1776–1873. Vol. 3. Huntington, NY, 1889. Reprint/revision, 1958.",
      "“The Islip Precinct Articles of Association.” May 10, 1775. In George J. Munkenbeck, Town of Islip Revolutionary War Resource Guide, Part Six. Office of the Town Historian, Town of Islip, New York.",
      "Washington, George. The Diary of George Washington, from 1789 to 1791: Embracing the Opening of the First Congress, and His Tours through New England, Long Island, and the Southern States. Together with His Journal of a Tour to the Ohio, in 1753. Edited by Benson J. Lossing. Richmond: Press of the Historical Society, 1861.",
    ],
  },
  {
    id: "revwar",
    items: [
      "Fischer, David Hackett. Washington’s Crossing. New York: Oxford University Press, 2004.",
      "Lanning, Michael Lee. African Americans in the Revolutionary War. New York: Citadel Press, 2000.",
      "MacGiven, Robbie. British Light Infantry in the American Revolution. Osprey Elite Series, no. 237. Oxford: Osprey Publishing, 2021.",
      "Mather, Frederic Gregory. The Refugees of 1776 from Long Island to Connecticut. Albany, NY: J. B. Lyon Company, 1913.",
      "May, Robin. The British Army in North America, 1775–1783. Osprey Men-at-Arms Series, no. 39. London: Osprey Publishing.",
      "Morrissey, Brendan. Boston 1775. Osprey Campaign Series, no. 37. London: Osprey Publishing, 1993.",
      "Onderdonk, Henry, Jr. Revolutionary Incidents of Suffolk and Kings Counties: With an Account of the Battle of Long Island and the British Prisons and Prison-Ships at New York. New York, 1849.",
      "Overton, Albert G. Plunderers from Across the Sound. Florissant, MO, 1980.",
      "Peterson, Harold L. The Book of the Continental Soldier. Harrisburg, PA: Stackpole Books, 1968.",
      "Poole, Patrick. Black Patriots. Columbus, OH, 2024.",
      "Rhodehamel, John, ed. The American Revolution: Writings from the War of Independence. New York: Library of America, 2001.",
      "Roberts, James A. New York in the Revolution as Colony and State. Albany, NY: Brandow Printing Company, 1898.",
      "Schenckman, A. J. Patriots and Spies in Revolutionary New York. Guilford, CT: Globe Pequot Press, 2021.",
      "Wilbur, C. Keith. Picture Book of the Revolution’s Privateers. Harrisburg, PA: Stackpole Books, 1973.",
      "Wilbur, C. Keith. Revolutionary Medicine, 1700–1800. New York: Chelsea House, 1997.",
      "Wilbur, C. Keith. The Revolutionary Soldier, 1775–1783. Guilford, CT: Globe Pequot Press, 1993.",
      "Wright, Robert K., Jr. The Continental Army. Washington, DC: Center of Military History, United States Army, 1983.",
      "Zlatich, Marko. General Washington’s Army I: 1775–1778. Osprey Men-at-Arms Series, no. 273. London: Osprey Publishing, 1994.",
      "Zlatich, Marko. General Washington’s Army II: 1779–1783. Osprey Men-at-Arms Series, no. 390. London: Osprey Publishing, 1995.",
    ],
  },
  {
    id: "sagtikos",
    items: [
      "Bailey, Rosalie Fellows. The Nicoll Family and Islip Grange. Publication No. 20 of the Order of Colonial Lords of Manors in North America. New York, 1940.",
      "Gardiner, Sarah D. “The Sagtikos Manor 1697.” Address before the Order of Colonial Lords of Manors in America, 1935.",
      "Munkenbeck, George J. St. John’s Episcopal Church: Islip’s Mother of Churches. 2nd updated ed. Office of the Town Historian, Town of Islip, New York, 2018.",
      "Studenroth, Zachary N. St. John’s Episcopal Church, Oakdale, L.I., N.Y.: Historic Structure Report. 2005.",
    ],
  },
  {
    id: "community",
    items: [
      "Antonio, Michele. “George Washington Slept at Sagtikos Manor.” Patch, June 26, 2010. Updated June 27, 2010. https://patch.com/new-york/westislip/george-washington-slept-at-sagtikos-manor.",
      "Finnegan, Robert. “Islip Militia: 250th Anniversary, 1776–2026.” The Quahog, newsletter of the Historical Society of Islip Hamlet, Winter 2026.",
      "Metcalf, Reginald, Sr. “Reading of the Declaration of Independence and Creation of the Huntington Liberty Flag.” Town of Huntington Historian’s Office. Excerpted in Town of Islip Revolutionary War Resource Guide, Part Seven.",
      "Munkenbeck, George J., ed. Vignettes of Islip Town History. Office of the Town Historian, Town of Islip, New York, 2025.",
      "Munkenbeck, George J., ed. Vignettes of Islip Town History. Vol. VI, no. 1. Office of the Town Historian, Town of Islip, New York, January–March 2026.",
      "Munkenbeck, George J., ed. Vignettes of Islip Town History: Special Issue 2024, Work of Our History Research Interns. Vol. IV, no. 5. Office of the Town Historian, Town of Islip, New York, 2024.",
      "New York State 250th Commemoration Field Guide. New York State 250th commemoration materials.",
      "Sebor, Mollie. The Story of the Jewish Community of Islip Town. Girl Scout Gold Award project booklet. Office of the Town Historian, Town of Islip, New York.",
      "Verga, Christopher. “Slavery in Suffolk County, NY.” Quoted in George J. Munkenbeck, “Isaac Thompson: A Man on a Tightrope.” Town of Islip Revolutionary War Resource Guide, Part Six.",
    ],
  },
  {
    id: "newspapers",
    items: [
      "Brooklyn Eagle. November 15, 1896.",
      "Gaine’s New-York Gazette and Weekly Mercury. Revolutionary War-era newspaper excerpts reprinted in Henry Onderdonk Jr., Revolutionary Incidents of Suffolk and Kings Counties.",
      "New York Gazette. June 18, 1779 incident referenced in Town Historian material on Benajah Strong.",
      "New York Times. “Article about the Hanley Letter.” October 17, 1950.",
      "Rivington’s Royal Gazette. Revolutionary War-era newspaper excerpts reprinted in Henry Onderdonk Jr., Revolutionary Incidents of Suffolk and Kings Counties.",
    ],
  },
  {
    id: "visual",
    items: [
      "Lefferts, Charles M. Uniforms of the Armies in the War of the American Revolution, 1775–1783. Limited ed. of 500. New York: New-York Historical Society, 1926.",
      "Partner and institutional logos (Robert David Lion Gardiner Foundation; Stony Brook University; SUNY Geneseo; Town of Islip) appear courtesy of their respective organizations.",
      "Ritchie, Alexander Hay. Sir Henry Clinton (engraved portrait). Nineteenth century. New York Public Library, via Wikimedia Commons. Public domain. People page portrait. Catalog record: status pending — verify before final publication.",
      "Sauthier, Claude Joseph, and William Faden. A Chorographical Map of the Province of New-York. 1779. Library of Congress. Public domain. Lead image, “Before the Town.”",
      "Sauthier, Claude Joseph, Bernard Ratzer, and William Faden. A Map of the Province of New-York. 1776. Library of Congress. Public domain. Lead image, “Revolution Comes to Islip.”",
      "Site icons (favicon, app icons) and the social-sharing card are derived from the Town of Islip seal by this project. Authorization for this use: confirmation pending from the Town of Islip.",
      "Stone, William J. Declaration of Independence (engraved facsimile of the 1776 original). 1823. Public domain (1823 engraving). Lead image of the exhibit panel “The Promise.” Source of this scan: status pending — verify before final publication.",
      "Stuart, Gilbert. George Washington (Lansdowne portrait). 1796. National Portrait Gallery, Smithsonian Institution. Public domain. Lead image, “Washington's Visit.”",
      "Stuart, Gilbert. George Washington (The Athenaeum Portrait). 1796, unfinished. Museum of Fine Arts, Boston, and National Portrait Gallery, Smithsonian Institution. Public domain. People page portrait.",
      "Team and contributor photographs on the Fellowship page appear courtesy of the individuals shown.",
      "Town of Islip seal, designed by Abraham Gardiner Thompson, 1883. Courtesy of the Town of Islip. Site header and footer identity; basis of the site icons.",
      "United States Postal Service. Cold Blast Furnace at Hopewell Furnace, Pennsylvania. Photograph referenced in Town Historian material on bog iron and iron processing.",
    ],
  },
  {
    id: "digital",
    items: [
      "10 Million Names Project. 10 Million Names. https://10millionnames.org/.",
      "Atkin, George F. “The Bog Iron Industry.” International Molinological Society / IMHS 2019. https://imhs2019.com/the-bog-iron-industry.",
      "Daughters of the American Revolution. Forgotten Patriots: African American and American Indian Patriots in the Revolutionary War. Washington, DC: National Society Daughters of the American Revolution, 2008.",
      "Daughters of the American Revolution. Patriots of Color Database. https://www.dar.org/.",
      "Google Books. Digitized Colonial and Revolutionary-Era New York Sources. https://books.google.com/.",
      "Library of Congress. Digital Collections. https://www.loc.gov/collections/.",
      "National Park Service. The American Revolution Handbook. National Park Service.",
      "New York Public Library. Digital Collections. https://digitalcollections.nypl.org/.",
    ],
  },
  {
    id: "review",
    items: [
      "Gardiner, Sarah D. “The Sagtikos Manor 1697.” Address before the Order of Colonial Lords of Manors in America, 1935. — Note: Town Historian material indicates much of this monograph is only partially cited; use with care and check against other records.",
      "May, Robin. The British Army in North America, 1775–1783. Osprey Men-at-Arms Series, no. 39. London: Osprey Publishing. — Note: publication year to be confirmed from the physical book or title page.",
      "National Park Service. The American Revolution Handbook. — Note: exact edition, publication date, and URL to be confirmed before final publication.",
      "New York State 250th Commemoration Field Guide. — Note: full publisher, edition, and date to be confirmed before final publication.",
      "Poole, Patrick. Black Patriots. Columbus, OH, 2024. — Note: publisher details to be confirmed from the physical book or title page.",
      "Ritchie, Alexander Hay. Sir Henry Clinton (engraved portrait). — Note: locate the New York Public Library Digital Collections catalog record (item ID, date, source painting) before final publication.",
      "Stone, William J. Declaration of Independence facsimile, 1823. — Note: identify and name the repository this scan came from (e.g., National Archives or Library of Congress copy) before final publication.",
      "Town of Islip seal as project brand. — Note: obtain written confirmation from the Town of Islip that the project may use the seal as its favicon/brand mark and in the derived social card.",
      "United States Postal Service. Cold Blast Furnace at Hopewell Furnace, Pennsylvania. — Note: image credit and original source location to be confirmed before public use.",
      "Verga, Christopher. “Slavery in Suffolk County, NY.” — Note: cited via Munkenbeck's essay; the original article should be verified directly.",
    ],
  },
];

// Flat list of every citation, for the search index.
export const bibliographyFlat: string[] = bibliographyGroups.flatMap((g) => g.items);
