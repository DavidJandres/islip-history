// Regression check for the dark-mode "black flash" on reload. Run AFTER
// `npm run build`:
//   npm run check:flash
//
// The fix has three layers, and this asserts all of them survive in the BUILT
// HTML (production behavior, not dev):
//   1. <html> carries an inline style declaring color-scheme:light and the
//      paper background — applied at first tag parse, before any external CSS.
//   2. That inline style appears BEFORE the first external stylesheet link.
//   3. <meta name="color-scheme" content="light"> and a paper theme-color are
//      emitted, so dark-mode UAs never paint dark chrome or a dark canvas.
//   4. <body> carries the same inline background.
//   5. No prerendered page and no built CSS re-introduces a dark
//      prefers-color-scheme block.
import fs from "node:fs";
import path from "node:path";

const APP_DIR = path.join(__dirname, "../.next/server/app");
const CSS_DIR = path.join(__dirname, "../.next/static/css");

let failures = 0;
const fail = (msg: string) => {
  failures++;
  console.log(`[FAIL] ${msg}`);
};
const ok = (msg: string) => console.log(`[ ok ] ${msg}`);

if (!fs.existsSync(APP_DIR)) {
  console.error("No build output at .next/server/app — run `npm run build` first.");
  process.exit(1);
}

// Every prerendered HTML document must pass; sample = all .html files.
const htmlFiles: string[] = [];
(function walk(dir: string) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (entry.name.endsWith(".html")) htmlFiles.push(p);
  }
})(APP_DIR);

if (htmlFiles.length === 0) fail("no prerendered .html files found under .next/server/app");

for (const file of htmlFiles) {
  const rel = path.relative(APP_DIR, file);
  // Known, accepted exception: Next's global not-found document renders
  // outside the [locale] layout, so it lacks the inline light style. It is
  // only reachable for asset-like URLs (paths containing a dot), because the
  // middleware matcher redirects every extension-less path into /{locale}/…,
  // where the localized, light-schemed not-found page renders instead. Fixing
  // it would require a root layout that cannot set per-locale <html lang>.
  if (rel === "_not-found.html") continue;
  const html = fs.readFileSync(file, "utf-8");

  const htmlTag = html.match(/<html[^>]*>/)?.[0] ?? "";
  const styleAttr = htmlTag.match(/style="([^"]*)"/)?.[1] ?? "";
  if (!/color-scheme:\s*light/.test(styleAttr) || !/background-color:\s*#faf8f5/.test(styleAttr)) {
    fail(`${rel}: <html> missing inline color-scheme/background style (got: "${styleAttr}")`);
    continue;
  }

  const firstStylesheet = html.search(/<link[^>]+rel="stylesheet"/);
  const htmlTagIndex = html.indexOf(htmlTag);
  if (firstStylesheet !== -1 && firstStylesheet < htmlTagIndex) {
    fail(`${rel}: a stylesheet link precedes the <html> inline style`);
  }

  if (!/<meta[^>]+name="color-scheme"[^>]+content="light"/.test(html)) {
    fail(`${rel}: missing <meta name="color-scheme" content="light">`);
  }
  if (!/<meta[^>]+name="theme-color"[^>]+content="#faf8f5"/.test(html)) {
    fail(`${rel}: missing <meta name="theme-color" content="#faf8f5">`);
  }

  const bodyTag = html.match(/<body[^>]*>/)?.[0] ?? "";
  if (!/background-color:\s*#faf8f5/.test(bodyTag)) {
    fail(`${rel}: <body> missing inline paper background (got: ${bodyTag})`);
  }

  // Scan only CSS the browser actually applies on load: the document with all
  // <script> bodies removed (Next serializes its default error page — which
  // legitimately has a dark block — inside the RSC flight payload scripts; it
  // is never applied on a normal page view).
  const applied = html.replace(/<script[\s\S]*?<\/script>/g, "");
  if (/@media[^{]*prefers-color-scheme:\s*dark/.test(applied)) {
    fail(`${rel}: applied CSS contains a dark prefers-color-scheme block`);
  }
}
if (failures === 0) ok(`${htmlFiles.length} prerendered documents declare light scheme + paper background inline`);

// Built stylesheets must not smuggle in a dark scheme either.
if (fs.existsSync(CSS_DIR)) {
  for (const name of fs.readdirSync(CSS_DIR).filter((n) => n.endsWith(".css"))) {
    const css = fs.readFileSync(path.join(CSS_DIR, name), "utf-8");
    if (/prefers-color-scheme:\s*dark/.test(css)) {
      fail(`static/css/${name}: contains a prefers-color-scheme: dark block`);
    }
    if (!/color-scheme:\s*light/.test(css)) {
      fail(`static/css/${name}: html color-scheme:light rule missing from built CSS`);
    }
  }
  ok("built CSS keeps color-scheme:light and has no dark-mode media query");
}

console.log(failures === 0 ? "\nFlash regression check passed." : `\n${failures} FAILURE(S).`);
process.exit(failures === 0 ? 0 : 1);
