import { localizedPath } from "@/i18n/config";
import { loadLocale, type LocaleParams } from "@/i18n/page";
import { buildMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Card } from "@/components/ui/card";
import { Breadcrumb } from "@/components/layout/breadcrumb";

// Teaching Materials landing. Six cards route to the five subpages plus a
// bilingual card that crosses to the other language's Teach home. The content
// pages themselves carry the lessons, activities, guides, and printables.

export async function generateMetadata({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  return buildMetadata({
    locale,
    title: dict.teach.title,
    description: dict.teach.intro[0],
    siteName: dict.common.siteName,
    path: "/teach",
  });
}

export default async function TeachPage({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  const t = dict.teach;
  const other = locale === "en" ? "es" : locale === "es" ? "de" : "en";

  const cards = [
    { c: t.cards.lessonPlans, href: localizedPath(locale, "/teach/lesson-plans") },
    { c: t.cards.primarySourceActivities, href: localizedPath(locale, "/teach/primary-source-activities") },
    { c: t.cards.exhibitGuide, href: localizedPath(locale, "/teach/exhibit-guide") },
    { c: t.cards.timelineActivities, href: localizedPath(locale, "/teach/timeline-activities") },
    { c: t.cards.printables, href: localizedPath(locale, "/teach/printables") },
    { c: t.cards.bilingual, href: localizedPath(other, "/teach") },
  ];

  return (
    <Section>
      <Breadcrumb
        homeLabel={dict.common.home}
        label={dict.common.breadcrumbLabel}
        homeHref={localizedPath(locale, "/")}
        trail={[{ label: t.breadcrumb }]}
      />

      <div className="mt-6 measure">
        <Eyebrow>{t.eyebrow}</Eyebrow>
        <h1 className="text-3xl sm:text-4xl">{t.title}</h1>
        {t.intro.map((para) => (
          <p key={para} className="mt-4 text-lg leading-relaxed text-ink/90">
            {para}
          </p>
        ))}
        <p className="mt-4 leading-relaxed text-muted">{t.audienceNote}</p>
      </div>

      <h2 className="mt-10 text-xs font-semibold uppercase tracking-[0.14em] text-gold-dark">
        {t.cardsHeading}
      </h2>
      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ c, href }) => (
          <Card key={href} title={c.title} href={href}>
            {c.blurb}
          </Card>
        ))}
      </div>

      <div className="mt-12 measure">
        <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-dark">
          {t.themesHeading}
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {t.themes.map((theme) => (
            <li
              key={theme}
              className="rounded-sm border border-line bg-white px-3 py-1.5 text-sm text-ink"
            >
              {theme}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
