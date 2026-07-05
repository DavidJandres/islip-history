import { localizedPath, defaultLocale } from "@/i18n/config";
import { loadLocale, type LocaleParams } from "@/i18n/page";
import { buildMetadata } from "@/lib/metadata";
import { sourceActivities } from "@/lib/teaching";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Rule } from "@/components/ui/rule";
import { Notice } from "@/components/ui/notice";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { TeachField, TeachSteps, TeachRelated } from "@/components/teach/field";

export async function generateMetadata({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  const t = dict.teach.primarySourceActivities;
  return buildMetadata({
    locale,
    title: `${t.title} · ${dict.teach.title}`,
    description: t.intro[0],
    siteName: dict.common.siteName,
    path: "/teach/primary-source-activities",
  });
}

export default async function ActivitiesPage({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  const t = dict.teach;
  const p = t.primarySourceActivities;
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
      </div>

      <nav aria-label={L.onThisPage} className="mt-8 measure">
        <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-dark">
          {L.onThisPage}
        </h2>
        <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-blue">
          {sourceActivities.map((a) => (
            <li key={a.id}>
              <a href={`#activity-${a.id}`} className="hover:underline">
                {a.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-10">
        {sourceActivities.map((a, i) => (
          <article key={a.id} id={`activity-${a.id}`} className="scroll-mt-24 measure">
            {i > 0 && <Rule className="my-14" />}
            <h2 className="text-2xl font-bold sm:text-3xl">{a.title}</h2>

            <blockquote className="mt-4 rounded-sm border-l-4 border-blue bg-gray p-4">
              <p className="text-lg italic leading-relaxed text-ink">{a.excerpt}</p>
              <footer className="mt-2 text-sm text-muted">{a.excerptAttribution}</footer>
            </blockquote>

            <TeachRelated label={L.viewSource} links={[a.source]} locale={locale} />
            <TeachField label={L.context}>{a.context}</TeachField>

            <TeachField label={L.vocabulary}>
              <dl className="space-y-2">
                {a.vocabulary.map((v) => (
                  <div key={v.term}>
                    <dt className="inline font-semibold text-ink">{v.term}: </dt>
                    <dd className="inline">{v.definition}</dd>
                  </div>
                ))}
              </dl>
            </TeachField>

            <TeachSteps label={L.sourcing} items={a.sourcingQuestions} />
            <TeachSteps label={L.closeReading} items={a.closeReadingQuestions} />
            <TeachSteps label={L.historicalThinking} items={a.historicalThinkingQuestions} />

            <div className="mt-6 rounded-sm border-l-4 border-gold bg-gray p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-dark">
                {L.today}
              </p>
              <p className="mt-1 leading-relaxed text-ink">{a.todayQuestion}</p>
            </div>

            <TeachField label={L.writingPrompt}>{a.writingPrompt}</TeachField>
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
