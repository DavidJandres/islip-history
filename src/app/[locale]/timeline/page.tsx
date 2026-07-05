import { localizedPath, defaultLocale } from "@/i18n/config";
import { loadLocale, type LocaleParams } from "@/i18n/page";
import { buildMetadata } from "@/lib/metadata";
import { timelineEras, timelineInEra } from "@/lib/timeline";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Rule } from "@/components/ui/rule";
import { Notice } from "@/components/ui/notice";
import { Breadcrumb } from "@/components/layout/breadcrumb";

export async function generateMetadata({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  return buildMetadata({
    locale,
    title: dict.timeline.title,
    description: dict.timeline.intro[0],
    siteName: dict.common.siteName,
    path: "/timeline",
  });
}

export default async function TimelinePage({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  const t = dict.timeline;

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
          <p key={para} className="mt-4 leading-relaxed text-ink/90">
            {para}
          </p>
        ))}
        <Notice intent="editorial" label={dict.common.noticeEditorial} className="mt-6">
          {t.workingNote}
        </Notice>
        {locale !== defaultLocale && (
          <Notice intent="info" label={dict.common.noticeInfo} className="mt-4">
            {t.translationNote}
          </Notice>
        )}
        <p className="mt-5">
          <a
            href={localizedPath(locale, "/timeline/kids")}
            className="text-sm font-semibold text-blue hover:underline"
          >
            {t.kids.kidsCta} →
          </a>
        </p>
      </div>

      <Rule className="mt-12" />

      <div className="mt-8 space-y-14">
        {timelineEras.map((era) => {
          const entries = timelineInEra(era, locale);
          if (entries.length === 0) return null;
          return (
            <section key={era} aria-labelledby={`era-${era}`}>
              <h2
                id={`era-${era}`}
                className="text-xl font-bold text-blue sm:text-2xl"
              >
                {t.eras[era]}
              </h2>
              <ol className="relative ml-2 mt-6 space-y-9 border-l border-line pl-6">
                {entries.map((entry) => (
                  <li key={entry.id} id={entry.id} className="relative scroll-mt-24">
                    <span
                      aria-hidden
                      className="absolute top-1.5 h-2.5 w-2.5 rounded-full border-2 border-blue bg-paper"
                      style={{ left: "-29px" }}
                    />
                    <p className="text-sm font-semibold uppercase tracking-[0.1em] text-gold-dark">
                      {entry.date}
                    </p>
                    <h3 className="mt-1 font-heading text-lg font-bold text-ink">
                      {entry.title}
                    </h3>
                    {entry.body.map((para) => (
                      <p key={para} className="mt-2 leading-relaxed text-ink/90">
                        {para}
                      </p>
                    ))}
                    <p className="mt-3 text-sm leading-relaxed">
                      <span className="font-semibold text-ink">
                        {t.whyTodayLabel}:{" "}
                      </span>
                      <span className="text-ink/80">{entry.whyToday}</span>
                    </p>
                    <p className="mt-2 text-xs leading-snug text-muted">
                      {t.sourcesLabel}: {entry.sources.join("; ")}
                    </p>
                  </li>
                ))}
              </ol>
            </section>
          );
        })}
      </div>
    </Section>
  );
}
