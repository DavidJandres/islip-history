import { localizedPath } from "@/i18n/config";
import { loadLocale, type LocaleParams } from "@/i18n/page";
import { buildMetadata } from "@/lib/metadata";
import { censusFigures } from "@/lib/census";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Breadcrumb } from "@/components/layout/breadcrumb";

export async function generateMetadata({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  return buildMetadata({
    locale,
    title: dict.aboutResearch.title,
    description: dict.aboutResearch.lede,
    siteName: dict.common.siteName,
    path: "/about/research",
  });
}

export default async function AboutResearchPage({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  const research = dict.aboutResearch;

  return (
    <Section size="narrow">
      <Breadcrumb
        homeLabel={dict.common.home}
        homeHref={localizedPath(locale, "/")}
        trail={[
          { label: dict.aboutProject.breadcrumb, href: localizedPath(locale, "/about") },
          { label: research.breadcrumb },
        ]}
      />

      <div className="mt-6 measure">
        <Eyebrow>{research.eyebrow}</Eyebrow>
        <h1 className="text-3xl sm:text-4xl">{research.title}</h1>
        <p className="mt-5 text-lg font-semibold text-ink">{research.lede}</p>
        {research.intro.map((para) => (
          <p key={para} className="mt-4 leading-relaxed text-ink/90">
            {para}
          </p>
        ))}

        <h2 className="mt-10 text-xl sm:text-2xl">{research.pillarsTitle}</h2>
        <h3 className="mt-6 font-heading text-lg text-blue">{research.pillar1Title}</h3>
        <p className="mt-2 leading-relaxed text-ink/90">{research.pillar1Body}</p>
        <h3 className="mt-6 font-heading text-lg text-blue">{research.pillar2Title}</h3>
        <p className="mt-2 leading-relaxed text-ink/90">{research.pillar2Body}</p>

        <h2 className="mt-10 text-xl sm:text-2xl">{research.approachTitle}</h2>
        <p className="mt-3 leading-relaxed text-ink/90">{research.approachBody}</p>

        <h2 className="mt-10 text-xl sm:text-2xl">{research.evidenceTitle}</h2>
        <p className="mt-3 leading-relaxed text-ink/90">{research.evidenceIntro}</p>

        <ul className="mt-5 space-y-px overflow-hidden rounded-sm border border-line">
          {censusFigures.map((fig) => (
            <li key={fig.id} className="flex items-baseline justify-between gap-4 bg-white px-4 py-3">
              <span className="text-sm text-ink">
                <span className="font-semibold">{fig.place}</span>
                {" — "}
                {locale === "es" ? fig.metricEs : fig.metricEn}
              </span>
              <span className="shrink-0 font-heading text-lg font-bold text-blue">~{fig.percent}%</span>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-muted">{research.evidenceCaption}</p>

        <h2 className="mt-10 text-xl sm:text-2xl">{research.examplesTitle}</h2>
        <p className="mt-3 leading-relaxed text-ink/90">{research.examplesBody}</p>

        <h2 className="mt-10 text-xl sm:text-2xl">{research.standardsTitle}</h2>
        <p className="mt-3 leading-relaxed text-ink/90">{research.standardsBody}</p>

        <h2 className="mt-10 text-xl sm:text-2xl">{research.outcomesTitle}</h2>
        <p className="mt-3 leading-relaxed text-ink/90">{research.outcomesBody}</p>
      </div>
    </Section>
  );
}
