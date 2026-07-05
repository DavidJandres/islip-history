# German (Deutsch) — native-review notes

The German locale (`/de/…`) was drafted in western Standard German for readers in Rheinland-Pfalz / western Germany (no dialect, no Swiss/Austrian forms, plain public-history register), then machine-reviewed for grammar, orthography, terminology consistency, and preservation of the project's historical-caution rules. All blocking and grammatical errors found in review were fixed. What remains below are **polish items for a native speaker** — not errors, just places where a local reader may prefer a different word or a shorter sentence. Nothing here blocks publication.

## Terminology decisions (kept consistent site-wide)
- **The Islip Promise** — kept in English (project brand).
- **Town of Islip History Project** → *Geschichtsprojekt der Town of Islip*.
- **Town of Islip / "Town"** → kept as the proper civic name *Town of Islip* (never *Stadt Islip*); "die Town" is used as shorthand.
- **Precinct** → kept as *Precinct* (a name), glossed once as *Verwaltungsbezirk*.
- **Town Meeting** → kept once, then *Gemeindeversammlung*; town minutes → *Gemeindeprotokolle / die Protokolle der Town*.
- **Articles of Association**, **Provincial Congress**, **Continental Congress**, **Supervisor**, **Constable**, **Freeholder**, **Red Ensign**, **Union Flag**, **Huntington Liberty Flag**, **Whaleboat War**, **Culper Spy Ring**, and NYSED/framework names — kept in English (proper names), glossed where useful.
- **occupation / British occupation** → *Besatzung / britische Besatzung*.
- **militia** → *Miliz*; *Milizkompanie*, *Milizionäre*.
- **enslaved people** → *versklavte Menschen / versklavt* (person-first; never *Sklave* for the enslaved). The enslaver's role is *Sklavenhalter*.
- **"free Negros", "Mustee/Mustees"** → kept as the period terms in quotation marks and explained as terms of their time, without modernizing away their specificity.
- **belonging** → *Zugehörigkeit* (varied with *dazugehören*).
- **American Revolution** → *Amerikanische Revolution*.

Historical caution was preserved in German and independently re-checked: the 1776 town gun's purpose stays an open question (not "für die Miliz"); the King-George-III dating is framed as a required legal formula, **not** proof of loyalty; the project explicitly does **not** claim Isaac Thompson was in the Culper Spy Ring or that Washington came "um Spionen zu danken"; no place is called a "britisches Hauptquartier"; Hutton/Hudson is hedged ("offenbar dieselbe Person"); the occupation is kept complicated.

## Places worth a native-speaker check (optional polish)
**Civic vocabulary**
- *Bürgerschaft* is used for the ideal "citizenship" (home/research). A native may prefer *Staatsbürgerschaft* / *Bürgersein* for citizenship-as-status.
- "civics" is rendered as *staatsbürgerliche Bildung* (fellowship) and *Politikbildung der Oberstufe* (teach); consider harmonizing (*politische Bildung* / *Staatsbürgerkunde*).
- "militia": consider standardizing on *Islip-Miliz* (nav uses that; summaries use *Miliz von Islip*).
- "census" appears as both *Volkszählung* and *Zensus*; pick one.
- "Fence Viewer" appears as *Zaunprüfer* and *Zaunbeschauer* (the more historical term is *Zaunbeschauer*).
- "commission (officer's)": *Bestallung* is correct but archaic; *Offizierspatente / Ernennungen* may read clearer.

**Word choice / naturalness**
- *Historiker der Town of Islip* (office title) is masculine-marked; for an office, *Amt des Town Historian* may read more neutrally.
- collections: *Die Leben, die das Archiv benennen kann* is a touch literary; *Die Menschen / Lebensgeschichten* may flow better. *Herkunft* for "race" is a careful choice — please confirm it reads as intended.
- "race … Native American and African" gloss: harmonize *indigen-amerikanischer* vs *indigener amerikanischer* across the two source overlays.
- Several long sentences mirror long English originals (about.json, research pillar2, fellowship Sebor bio, timeline 1739 & 1798, exhibit panels) — grammatical, but a proofreader may wish to split them.

**Typography**
- English phrases/slogans are set in straight single quotes to stay JSON-safe; a native typographer may prefer German guillemets „…".

Anything you change here can be edited directly in `src/i18n/dictionaries/de/*.json` (UI, page prose, exhibit panels) and `src/lib/{timeline,people,primary-sources,essays}-de.ts` (per-entry content). Primary-source **excerpts stay in English by design** (historical transcriptions); only the surrounding German context/summaries are translated.
