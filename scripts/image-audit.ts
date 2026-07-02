// Visual-asset audit: every image the site ships must exist, be referenced,
// carry non-vague alt text, and carry a credit with an explicit rights basis.
// Runs as part of `npm test`, so an uncited or unlabeled image fails CI.
//   npx tsx scripts/image-audit.ts
import fs from "node:fs";
import path from "node:path";
import { panelImages } from "../src/lib/exhibit";
import { people } from "../src/lib/people";
import { partners } from "../src/lib/partners";
import { teamPhotos } from "../src/lib/team";
import { getDictionary } from "../src/i18n/dictionaries";
import { bibliographyFlat } from "../src/lib/bibliography";

const ROOT = path.join(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");

let failures = 0;
const fail = (msg: string) => {
  failures++;
  console.log(`[FAIL] ${msg}`);
};
const ok = (msg: string) => console.log(`[ ok ] ${msg}`);

// ---------- 1. Every referenced asset exists ----------
const referenced = new Set<string>(["/sitemap.xsl", "/og.png", "/icons/icon-192.png"]);
for (const img of Object.values(panelImages)) if (img) referenced.add(img.src);
for (const p of people) if (p.portrait) referenced.add(p.portrait.src);
for (const src of Object.values(teamPhotos)) referenced.add(src);
for (const p of partners) referenced.add(p.logo);

// Assets referenced as string literals inside components/lib source (e.g. the
// Town Seal in the site header/footer and the JSON-LD logo), not via data files.
(function scanSrc(dir: string) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) scanSrc(p);
    else if (/\.(tsx?|css)$/.test(entry.name)) {
      const code = fs.readFileSync(p, "utf-8");
      // Extension required: route hrefs also start with /people/… etc.
      for (const m of code.matchAll(
        /["'](\/(?:logos|exhibit|people|team|icons)\/[^"']+\.(?:png|jpe?g|svg|webp|ico|gif))["']/g,
      )) {
        referenced.add(m[1]);
      }
    }
  }
})(path.join(ROOT, "src"));

for (const ref of referenced) {
  if (!fs.existsSync(path.join(PUBLIC, ref))) fail(`referenced asset missing on disk: public${ref}`);
}
ok(`${referenced.size} referenced public assets all exist`);

// App-convention icons (browser tab, iOS, legacy favicon).
for (const [file, minBytes] of [
  ["src/app/icon.png", 10_000],
  ["src/app/apple-icon.png", 10_000],
  ["src/app/favicon.ico", 2_000],
  ["public/og.png", 50_000],
] as const) {
  const p = path.join(ROOT, file);
  if (!fs.existsSync(p)) fail(`${file} missing`);
  else if (fs.statSync(p).size < minBytes)
    fail(`${file} suspiciously small (${fs.statSync(p).size}B) — generic/default icon?`);
}
ok("app icons + og card present and non-generic by size");

// ---------- 2. No orphan files in public/ ----------
(function walk(dir: string) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else {
      const rel = "/" + path.relative(PUBLIC, p).split(path.sep).join("/");
      if (!referenced.has(rel)) fail(`orphan asset (in public/, referenced nowhere): public${rel}`);
    }
  }
})(PUBLIC);
ok("no orphan assets in public/");

// ---------- 3. Alt-text quality ----------
const VAGUE = /^(old map|map|image|photo|picture|historical (image|map|photo))\.?$/i;
const informational: Array<{ where: string; alt: string | undefined }> = [
  ...Object.entries(panelImages).map(([slug, img]) => ({ where: `panelImages.${slug}`, alt: img?.alt })),
  ...people.filter((p) => p.portrait).map((p) => ({ where: `people.${p.slug}`, alt: p.portrait!.alt })),
];
for (const { where, alt } of informational) {
  if (!alt || alt.trim().length < 20) fail(`${where}: alt text missing or too short to be useful`);
  else if (VAGUE.test(alt.trim())) fail(`${where}: vague alt text ("${alt}")`);
}
ok(`${informational.length} informational images carry specific alt text`);

// Partner logos: the org name IS the informative alt.
for (const p of partners) {
  if (!p.name || p.name.length < 4) fail(`partners: logo ${p.logo} lacks an informative name/alt`);
}
// Team photos: alt comes from the member's name in both locales.
for (const locale of ["en", "es"] as const) {
  for (const m of getDictionary(locale).aboutFellowship.team) {
    if (!m.name?.trim()) fail(`team(${locale}): member ${m.id} has no name for photo alt`);
    if (!(m.id in teamPhotos)) fail(`team(${locale}): member ${m.id} has no photo mapping`);
  }
}
ok("logos and team photos have informative accessible names");

// ---------- 4. Credits + rights basis ----------
const RIGHTS = /(public domain|courtesy|status pending)/i;
const PROVENANCE =
  /(library of congress|national portrait gallery|museum of fine arts|wikimedia|new york public library|town of islip)/i;
const credited: Array<{ where: string; credit: string | undefined; kind: "image" | "map" }> = [
  ...Object.entries(panelImages).map(([slug, img]) => ({
    where: `panelImages.${slug}`,
    credit: img?.credit,
    kind: (img?.alt.toLowerCase().includes("map") ? "map" : "image") as "map" | "image",
  })),
  ...people
    .filter((p) => p.portrait)
    .map((p) => ({ where: `people.${p.slug}`, credit: p.portrait!.credit, kind: "image" as const })),
];
for (const { where, credit } of credited) {
  if (!credit) fail(`${where}: no credit`);
  else {
    if (!RIGHTS.test(credit)) fail(`${where}: credit lacks a rights basis (public domain / courtesy / status pending)`);
    // A public-domain claim needs a named institution, unless the credit
    // already carries an explicit pending-verification note.
    if (
      /public domain/i.test(credit) &&
      !PROVENANCE.test(credit) &&
      !/status pending/i.test(credit)
    )
      fail(`${where}: claims public domain without naming a source institution — mark "status pending" instead`);
  }
}
ok(`${credited.length} credited images carry a rights basis with named provenance`);

// ---------- 5. Information-bearing maps have text summaries ----------
for (const [slug, img] of Object.entries(panelImages)) {
  if (img && img.alt.toLowerCase().includes("map")) {
    if (!img.caption || img.caption.length < 60)
      fail(`panelImages.${slug}: map lacks a substantive nearby text summary (caption)`);
  }
}
ok("every map ships a text summary caption");

// ---------- 6. Bibliography credit entries per real image ----------
const flat = bibliographyFlat.join("\n");
for (const key of ["Sauthier", "Stone, William J.", "Stuart, Gilbert", "Henry Clinton", "Town of Islip seal", "Team photographs", "Partner and institutional logos"]) {
  if (!flat.includes(key)) fail(`bibliography visual group: no entry matching "${key}"`);
}
ok("bibliography visual group covers every real image class");

// ---------- 7. Manifest identity ----------
const manifest = fs.readFileSync(path.join(ROOT, "src/app/manifest.ts"), "utf-8");
if (!manifest.includes("publicName") && !manifest.includes("The Islip Promise"))
  fail("manifest.ts does not carry The Islip Promise identity");
ok("manifest carries The Islip Promise identity");

console.log(failures === 0 ? "\nImage audit passed." : `\n${failures} FAILURE(S).`);
process.exit(failures === 0 ? 0 : 1);
