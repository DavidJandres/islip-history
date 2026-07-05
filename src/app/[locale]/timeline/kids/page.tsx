import { ArrowRight } from "lucide-react";
import { localizedPath, defaultLocale } from "@/i18n/config";
import { loadLocale, type LocaleParams } from "@/i18n/page";
import { buildMetadata } from "@/lib/metadata";
import { timelineEras, timelineInEra } from "@/lib/timeline";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Rule } from "@/components/ui/rule";
import { Notice } from "@/components/ui/notice";
import { Breadcrumb } from "@/components/layout/breadcrumb";

// The child-friendly timeline: the same 47 moments as the main timeline, told
// through each entry's `inBrief` line only — short, plain, and honest about
// uncertainty. Every card links to the full entry on the main timeline, so the
// simple version is a doorway, never a replacement. Larger type and generous
// spacing are deliberate: this page is meant to be read aloud with children.

export async function generateMetadata({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  const k = dict.timeline.kids;
  return buildMetadata({
    locale,
    title: k.title,
    description: k.intro[0],
    siteName: dict.common.siteName,
    path: "/timeline/kids",
  });
}

export default async function KidsTimelinePage({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  const t = dict.timeline;
  const k = t.kids;

  return (
    <Section>
      <Breadcrumb
        homeLabel={dict.common.home}
        label={dict.common.breadcrumbLabel}
        homeHref={localizedPath(locale, "/")}
        trail={[
          { label: t.breadcrumb, href: localizedPath(locale, "/timeline") },
          { label: k.breadcrumb },
        ]}
      />

      <div className="mt-6 measure">
        <Eyebrow>{k.eyebrow}</Eyebrow>
        <h1 className="text-3xl sm:text-4xl">{k.title}</h1>
        {k.intro.map((para) => (
          <p key={para} className="mt-4 text-lg leading-relaxed text-ink/90">
            {para}
          </p>
        ))}
        <div className="mt-5 rounded-sm border-l-4 border-gold bg-gray p-4">
          <p className="text-base leading-relaxed text-ink">{k.honestyNote}</p>
        </div>
        {locale !== defaultLocale && (
          <Notice intent="info" label={dict.common.noticeInfo} className="mt-4">
            {t.translationNote}
          </Notice>
        )}
        <p className="mt-5">
          <a
            href={localizedPath(locale, "/timeline")}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue hover:underline"
          >
            {k.mainTimelineCta}
            <ArrowRight aria-hidden className="h-4 w-4" />
          </a>
        </p>
      </div>

      <Rule className="mt-12" />

      <div className="mt-8 space-y-12">
        {timelineEras.map((era) => {
          const entries = timelineInEra(era, locale);
          if (entries.length === 0) return null;
          return (
            <section key={era} aria-labelledby={`kids-era-${era}`}>
              <h2
                id={`kids-era-${era}`}
                className="inline-block rounded-sm bg-blue px-3 py-1.5 font-heading text-lg font-bold text-white sm:text-xl"
              >
                {t.eras[era]}
              </h2>
              <ol className="mt-6 grid gap-4 sm:grid-cols-2">
                {entries.map((entry) => (
                  <li
                    key={entry.id}
                    id={`kids-${entry.id}`}
                    className="flex scroll-mt-24 flex-col rounded-sm border border-line bg-white p-5"
                  >
                    <p className="text-sm font-bold uppercase tracking-[0.1em] text-gold-dark">
                      {entry.date}
                    </p>
                    <h3 className="mt-1 font-heading text-lg font-bold text-ink">
                      {entry.title}
                    </h3>
                    <p className="mt-2 flex-1 text-lg leading-relaxed text-ink/90">
                      {entry.inBrief}
                    </p>
                    <p className="mt-3">
                      <a
                        href={localizedPath(locale, `/timeline#${entry.id}`)}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-blue hover:underline"
                      >
                        {k.fullStoryLabel}
                        <ArrowRight aria-hidden className="h-3.5 w-3.5" />
                        <span className="sr-only">: {entry.title}</span>
                      </a>
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
