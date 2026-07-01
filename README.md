# Town of Islip History Project

A public-history archive documenting the history of the Town of Islip, Suffolk
County, New York. Built as a statically-generated Next.js application designed
to remain maintainable and citable for decades.

> **Build status:** Phase 1 — *Bilingual shell, Home, and the About cluster*.
> The site is now fully internationalised (English + Spanish). The Home page,
> all four About pages (Project, Research, Fellowship, Contact), and intentional
> "coming soon" stubs for Explore, People, Timeline, Research, and Search are in
> place, on top of the Phase 0 design system and chrome. The collections and the
> public exhibit follow in subsequent phases per the approved roadmap.

## Stack

- **Next.js 15** (App Router, React Server Components by default)
- **TypeScript** (strict)
- **Tailwind CSS v4** — configured CSS-first; the design tokens live in
  `src/app/globals.css` under `@theme`. (v4 is what a fresh Next 15 project
  installs today; there is no `tailwind.config.js`.)
  under `prefers-reduced-motion`.
- **lucide-react** — icons
- **next/font** — Merriweather + Source Sans 3, self-hosted at build time
- **next/image** — image optimisation (used from Phase 3 onward)
- Deploys to **Vercel**

## Internationalisation (English / Spanish)

Every public route lives under `/[locale]/…`. English is the default
(`/en/…`); Spanish is at `/es/…`. A visitor's choice is remembered in the
`NEXT_LOCALE` cookie and applied by `src/middleware.ts`, which redirects any
un-prefixed path to the right locale. The header's language button swaps the
locale segment in place, so you stay on the same page.

- **Where the words live:** all UI strings and page copy are in
  `src/i18n/dictionaries/<locale>/`, one JSON file per section
  (`home.json`, `about.json`, `research.json`, …). The sections are assembled in
  `src/i18n/dictionaries.ts`; English defines the shape and Spanish is
  type-checked against it, so a missing key fails the build. Components never
  hard-code a language — they read `dict.*`.
- **Adding a page's copy:** create `en/<name>.json` and `es/<name>.json`, then
  import both and add the section to the `en` and `es` assemblies in
  `dictionaries.ts`.
- **Polish is in preparation:** it's announced in the footer and on *About →
  The Project*, and registered in `upcomingLocales` in `src/i18n/config.ts`. To
  publish it, move `"pl"` into `locales`, add a `localeNames` entry, and create a
  `src/i18n/dictionaries/pl/` folder with a `pl` assembly.

## A note on the census figures

The demographic numbers on *About → The Research* live in one file,
`src/lib/census.ts`, and are labelled on the page as **approximate and in
review**. They are drawn from U.S. Census Bureau QuickFacts but must be
**confirmed by hand against the live QuickFacts tables** (linked in that file)
before launch, since QuickFacts serves its values via JavaScript and they could
not be verified automatically.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # tsc --noEmit
npm run lint
```

Set `NEXT_PUBLIC_SITE_URL` in the environment (see `.env.example`) so canonical
URLs, the sitemap, and Open Graph tags resolve correctly. On Vercel this is a
project environment variable.

## Architecture

Routing lives in `src/app`; everything else is reusable and imported via the
`@/*` path alias.

```
src/
├── app/
│   ├── layout.tsx          # root: fonts + base metadata
│   ├── globals.css         # Tailwind v4 + design tokens (@theme)
│   ├── (site)/             # route group: shared public chrome
│   │   ├── layout.tsx      # header, nav, footer, <main> landmark
│   │   └── page.tsx        # Home
│   ├── not-found.tsx       # 404
│   ├── sitemap.ts          # SEO
│   └── robots.ts
├── components/
│   ├── layout/             # SkipLink, TopBar, SiteHeader, PrimaryNav,
│   │                       #   Breadcrumb, SiteFooter
│   └── ui/                 # Container, Section, Eyebrow, Rule, Button,
│                           #   Card, Notice  (the reusable primitives)
└── lib/
    ├── site.ts             # identity + navigation (single source of truth)
    ├── metadata.ts         # SEO metadata builder
    └── utils.ts            # cn() classname helper
```

**Principle:** `app/` holds routing only; a page is assembled from `Section`s
and `ui` primitives, with its data coming from `lib`. Add a destination once in
`lib/site.ts` and it appears in the header, mobile menu, footer, and sitemap.

## Design system

The locked palette and type pairing are defined once in `globals.css`:

| Token            | Value     | Role                          |
| ---------------- | --------- | ----------------------------- |
| `--color-paper`  | `#FAF8F5` | page background               |
| `--color-ink`    | `#1E293B` | body text                     |
| `--color-blue`   | `#174A7C` | primary / headings / links    |
| `--color-gold`   | `#B78C3B` | accent (large text, rules)    |
| `--color-gold-dark` | `#8C6A2C` | accent for small text (AA) |

Headings use **Merriweather**, body text uses **Source Sans 3**. Corners are
near-square (2px) and the design uses hairline rules rather than shadows.

## Accessibility

WCAG 2.1 AA is a build requirement: skip link, visible keyboard focus, semantic
landmarks, `aria-current` on the active route, reduced-motion support, and
colour pairings verified for contrast. The mobile menu manages focus and closes
on `Escape`.
