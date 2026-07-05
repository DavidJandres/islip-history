import { localizedPath } from "@/i18n/config";
import { loadLocale, type LocaleParams } from "@/i18n/page";
import { buildMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Rule } from "@/components/ui/rule";
import { Notice } from "@/components/ui/notice";
import { Card } from "@/components/ui/card";
import { Breadcrumb } from "@/components/layout/breadcrumb";

export async function generateMetadata({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  const t = dict.teach.printables;
  return buildMetadata({
    locale,
    title: `${t.title} · ${dict.teach.title}`,
    description: t.intro[0],
    siteName: dict.common.siteName,
    path: "/teach/printables",
  });
}

export default async function PrintablesPage({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  const t = dict.teach;
  const p = t.printables;

  // Composed from already-translated dictionary entries, so this index is fully
  // bilingual: the four teaching resources plus the two timelines.
  const resources = [
    { title: t.cards.lessonPlans.title, desc: t.cards.lessonPlans.blurb, href: "/teach/lesson-plans" },
    { title: t.cards.primarySourceActivities.title, desc: t.cards.primarySourceActivities.blurb, href: "/teach/primary-source-activities" },
    { title: t.cards.exhibitGuide.title, desc: t.cards.exhibitGuide.blurb, href: "/teach/exhibit-guide" },
    { title: t.cards.timelineActivities.title, desc: t.cards.timelineActivities.blurb, href: "/teach/timeline-activities" },
    { title: dict.nav.timelineMain, desc: dict.navSummaries.timelineMain, href: "/timeline" },
    { title: dict.nav.timelineKids, desc: dict.navSummaries.timelineKids, href: "/timeline/kids" },
  ];

  return (
    <Section size="narrow">
      <Breadcrumb
        homeLabel={dict.common.home}
        label={dict.common.breadcrumbLabel}
        homeHref={localizedPath(locale, "/")}
        trail={[
          { label: t.breadcrumb, href: localizedPath(locale, "/teach") },
          { label: p.breadcrumb },
        ]}
      />

      <div className="mt-6 measure">
        <Eyebrow>{t.eyebrow}</Eyebrow>
        <h1 className="text-3xl sm:text-4xl">{p.title}</h1>
        {p.intro.map((para) => (
          <p key={para} className="mt-4 text-lg leading-relaxed text-ink/90">
            {para}
          </p>
        ))}

        <Notice intent="editorial" title={p.preparingTitle} className="mt-6">
          <strong className="font-semibold">{p.preparingTitle}.</strong> {p.preparing}
        </Notice>
      </div>

      <h2 className="mt-10 text-xs font-semibold uppercase tracking-[0.14em] text-gold-dark">
        {p.listHeading}
      </h2>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {resources.map((r) => (
          <Card key={r.href} title={r.title} href={localizedPath(locale, r.href)}>
            {r.desc}
          </Card>
        ))}
      </div>

      <Rule className="mt-14" />
      <div className="mt-6">
        <a
          href={localizedPath(locale, "/teach")}
          className="text-sm font-semibold text-blue hover:underline"
        >
          {t.labels.backToTeach}
        </a>
      </div>
    </Section>
  );
}
