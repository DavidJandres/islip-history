import { localizedPath, defaultLocale } from "@/i18n/config";
import { loadLocale, type LocaleParams } from "@/i18n/page";
import { buildMetadata } from "@/lib/metadata";
import { timelineActivities } from "@/lib/teaching";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Rule } from "@/components/ui/rule";
import { Notice } from "@/components/ui/notice";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { TeachSteps, TeachRelated } from "@/components/teach/field";

export async function generateMetadata({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  const t = dict.teach.timelineActivities;
  return buildMetadata({
    locale,
    title: `${t.title} · ${dict.teach.title}`,
    description: t.intro[0],
    siteName: dict.common.siteName,
    path: "/teach/timeline-activities",
  });
}

export default async function TimelineActivitiesPage({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  const t = dict.teach;
  const p = t.timelineActivities;
  const L = t.labels;

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
        <p className="mt-3 text-sm text-muted">{L.printThisPage}</p>
        {locale !== defaultLocale && (
          <Notice intent="editorial" title={t.contentPendingTitle} className="mt-5">
            <strong className="font-semibold">{t.contentPendingTitle}.</strong>{" "}
            {t.contentPending}
          </Notice>
        )}

        <div className="mt-8 rounded-sm border border-line bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-dark">
            {p.useTimelinesHeading}
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            <li>
              <a
                href={localizedPath(locale, "/timeline")}
                className="inline-flex items-center rounded-sm border border-line px-3 py-1.5 text-sm font-semibold text-blue transition-colors hover:border-blue hover:bg-gray"
              >
                {p.fullTimeline}
              </a>
            </li>
            <li>
              <a
                href={localizedPath(locale, "/timeline/kids")}
                className="inline-flex items-center rounded-sm border border-line px-3 py-1.5 text-sm font-semibold text-blue transition-colors hover:border-blue hover:bg-gray"
              >
                {p.kidsTimeline}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <nav aria-label={L.onThisPage} className="mt-8 measure">
        <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-dark">
          {L.onThisPage}
        </h2>
        <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-blue">
          {timelineActivities.map((a) => (
            <li key={a.id}>
              <a href={`#tactivity-${a.id}`} className="hover:underline">
                {a.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-10">
        {timelineActivities.map((a, i) => (
          <article key={a.id} id={`tactivity-${a.id}`} className="scroll-mt-24 measure">
            {i > 0 && <Rule className="my-14" />}
            <h2 className="text-2xl font-bold sm:text-3xl">
              <span className="text-gold-dark">{a.number}. </span>
              {a.title}
            </h2>
            <p className="mt-2 text-sm text-muted">
              <span className="font-semibold text-ink">{p.skillLabel}: </span>
              {a.skill}
            </p>

            <TeachSteps label={p.stepsLabel} items={a.steps} />

            {a.example && (
              <div className="mt-6 rounded-sm border-l-4 border-gold bg-gray p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-dark">
                  {p.exampleLabel}
                </p>
                <p className="mt-1 leading-relaxed text-ink">{a.example}</p>
              </div>
            )}

            <TeachRelated label={L.relatedPages} links={a.relatedPages} locale={locale} />
          </article>
        ))}
      </div>

      <Rule className="mt-14" />
      <div className="mt-6">
        <a
          href={localizedPath(locale, "/teach")}
          className="text-sm font-semibold text-blue hover:underline"
        >
          {L.backToTeach}
        </a>
      </div>
    </Section>
  );
}
