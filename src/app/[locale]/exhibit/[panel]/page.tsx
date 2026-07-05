import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { localizedPath, isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/metadata";
import { exhibitPanelJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";
import {
  exhibitPanels,
  panelStatus,
  panelBodyTranslated,
  panelNumber,
  panelNeighbors,
  panelCount,
  panelImages,
  panelRelated,
  isPanelSlug,
  type PanelSlug,
} from "@/lib/exhibit";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Rule } from "@/components/ui/rule";
import { Notice } from "@/components/ui/notice";
import { ImageSlot } from "@/components/ui/image-slot";
import { Breadcrumb } from "@/components/layout/breadcrumb";

type PanelParams = { params: Promise<{ locale: string; panel: string }> };

// One statically-rendered page per (locale, panel). Stable, prerendered URLs
// are what let each panel become a QR-coded library display later.
export function generateStaticParams() {
  return exhibitPanels.map((panel) => ({ panel }));
}

async function resolve(params: PanelParams["params"]) {
  const { locale, panel } = await params;
  if (!isLocale(locale) || !isPanelSlug(panel)) notFound();
  return { locale: locale as Locale, panel: panel as PanelSlug, dict: getDictionary(locale) };
}

export async function generateMetadata({ params }: PanelParams) {
  const { locale, panel, dict } = await resolve(params);
  const copy = dict.exhibit.panels[panel];
  return buildMetadata({
    locale,
    title: `${copy.title} · ${dict.exhibit.title}`,
    description: copy.summary,
    siteName: dict.common.siteName,
    path: `/exhibit/${panel}`,
  });
}

export default async function PanelPage({ params }: PanelParams) {
  const { locale, panel, dict } = await resolve(params);
  const ex = dict.exhibit;
  const copy = ex.panels[panel];
  const status = panelStatus[panel];
  const n = panelNumber(panel);
  const { prev, next } = panelNeighbors(panel);

  // The English copy is the source of truth; other locales trail it. When a
  // non-default locale hasn't been translated yet, say so plainly rather than
  // showing a "draft under review" note over placeholder text.
  const untranslated = locale !== defaultLocale && !panelBodyTranslated[panel];

  const jsonLd = [
    exhibitPanelJsonLd(locale, {
      slug: panel,
      title: copy.title,
      summary: copy.summary,
    }),
    breadcrumbJsonLd(locale, [
      { name: dict.common.home, path: "/" },
      { name: ex.breadcrumb, path: "/exhibit" },
      { name: copy.title },
    ]),
  ];

  return (
    <Section size="narrow">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumb
        homeLabel={dict.common.home}
        label={dict.common.breadcrumbLabel}
        homeHref={localizedPath(locale, "/")}
        trail={[
          { label: ex.breadcrumb, href: localizedPath(locale, "/exhibit") },
          { label: copy.title },
        ]}
      />

      <div className="mt-6 measure">
        <Eyebrow>
          {ex.panelWord} {n} {ex.ofWord} {panelCount}
        </Eyebrow>
        <h1 className="text-3xl sm:text-4xl">{copy.title}</h1>

        {/* Plain-language summary anyone, including children, can read. The
            fuller, careful text follows below. */}
        <div className="mt-5 rounded-sm border-l-4 border-gold bg-gray p-4 sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-dark">
            {ex.inBriefLabel}
          </p>
          <p className="mt-1 text-lg leading-relaxed text-ink">{copy.inBrief}</p>
        </div>

        {untranslated ? (
          <Notice intent="editorial" title={ex.translationPendingTitle} className="mt-6">
            <strong className="font-semibold">{ex.translationPendingTitle}.</strong>{" "}
            {ex.translationPending}{" "}
            <a
              href={localizedPath(defaultLocale, `/exhibit/${panel}`)}
              className="font-semibold text-blue underline"
            >
              {ex.readInEnglish}
            </a>
          </Notice>
        ) : status === "sourcing" ? (
          <Notice intent="editorial" title={ex.sourcingNoticeTitle} className="mt-6">
            <strong className="font-semibold">{ex.sourcingNoticeTitle}.</strong>{" "}
            {ex.sourcingNotice}
          </Notice>
        ) : (
          <Notice intent="editorial" title={ex.draftNoticeTitle} className="mt-6">
            <strong className="font-semibold">{ex.draftNoticeTitle}.</strong>{" "}
            {ex.draftNotice}
          </Notice>
        )}

        {/* Lead image frame. Renders a real image once one is added to
            panelImages (lib/exhibit.ts); until then, a reserved placeholder.
            The explicit branch (rather than optional chaining) is what lets
            ImageSlot's types REQUIRE alt text whenever a real src is given. */}
        {(() => {
          const img = panelImages[panel];
          return img ? (
            <ImageSlot
              src={img.src}
              alt={locale === "es" && img.altEs ? img.altEs : img.alt}
              credit={img.credit}
              caption={
                (locale === "es" && img.captionEs ? img.captionEs : img.caption) ??
                copy.summary
              }
              label={dict.common.imageComingSoon}
              aspect="photo"
              contain
              priority
              className="my-8"
            />
          ) : (
            <ImageSlot
              caption={copy.summary}
              label={dict.common.imageComingSoon}
              aspect="photo"
              contain
              className="my-8"
            />
          );
        })()}

        {/* Larger body type than a standard article: this exhibit is written to
            be read by children as well as adults. */}
        <div className="mt-6">
          {copy.body.map((para) => (
            <p key={para} className="mt-4 text-lg leading-relaxed text-ink/90">
              {para}
            </p>
          ))}
        </div>

        {copy.sources.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-dark">
              {ex.sourcesHeading}
            </h2>
            <ol className="mt-3 space-y-2 text-sm leading-snug text-muted">
              {copy.sources.map((src) => (
                <li key={src}>{src}</li>
              ))}
            </ol>
          </div>
        )}

        {panelRelated[panel] && panelRelated[panel]!.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-dark">
              {ex.exploreFurther}
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {panelRelated[panel]!.map((link) => (
                <li key={link.href}>
                  <a
                    href={localizedPath(locale, link.href)}
                    className="inline-flex items-center rounded-sm border border-line px-3 py-1.5 text-sm font-semibold text-blue transition-colors hover:border-blue hover:bg-gray"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <Rule className="mt-12" />

      {/* Prev / next across the seven-panel sequence. */}
      <nav
        aria-label={ex.panelNavLabel}
        className="mt-6 flex items-stretch justify-between gap-4"
      >
        {prev ? (
          <PanelLink
            locale={locale}
            slug={prev}
            direction="prev"
            kicker={ex.prevLabel}
            title={ex.panels[prev].title}
          />
        ) : (
          <span />
        )}
        {next ? (
          <PanelLink
            locale={locale}
            slug={next}
            direction="next"
            kicker={ex.nextLabel}
            title={ex.panels[next].title}
          />
        ) : (
          <span />
        )}
      </nav>

      <div className="mt-8">
        <a
          href={localizedPath(locale, "/exhibit")}
          className="text-sm font-semibold text-blue hover:underline"
        >
          {ex.backToExhibit}
        </a>
      </div>
    </Section>
  );
}

function PanelLink({
  locale,
  slug,
  direction,
  kicker,
  title,
}: {
  locale: Locale;
  slug: PanelSlug;
  direction: "prev" | "next";
  kicker: string;
  title: string;
}) {
  const isNext = direction === "next";
  return (
    <a
      href={localizedPath(locale, `/exhibit/${slug}`)}
      className={`group flex max-w-[48%] flex-col gap-1 rounded-sm border border-line p-4 hover:border-blue ${
        isNext ? "items-end text-right" : "items-start"
      }`}
    >
      <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-gold-dark">
        {!isNext && <ArrowLeft aria-hidden className="h-3.5 w-3.5" />}
        {kicker}
        {isNext && <ArrowRight aria-hidden className="h-3.5 w-3.5" />}
      </span>
      <span className="font-heading font-bold text-blue group-hover:underline">
        {title}
      </span>
    </a>
  );
}
