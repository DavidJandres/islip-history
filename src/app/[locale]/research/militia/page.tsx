import { localizedPath } from "@/i18n/config";
import { loadLocale, type LocaleParams } from "@/i18n/page";
import { buildMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { ThemeCollection } from "@/components/research/theme-collection";

export async function generateMetadata({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  return buildMetadata({
    locale,
    title: dict.thematic.militia.title,
    description: dict.thematic.militia.intro,
    siteName: dict.common.siteName,
    path: "/research/militia",
  });
}

export default async function MilitiaPage({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  const t = dict.thematic.militia;

  return (
    <Section size="narrow">
      <Breadcrumb
        homeLabel={dict.common.home}
        homeHref={localizedPath(locale, "/")}
        trail={[
          { label: dict.nav.research, href: localizedPath(locale, "/research") },
          { label: t.breadcrumb },
        ]}
      />
      <div className="mt-6 measure">
        <Eyebrow>{t.eyebrow}</Eyebrow>
        <h1 className="text-3xl sm:text-4xl">{t.title}</h1>
        <p className="mt-4 leading-relaxed text-ink/90">{t.intro}</p>
      </div>

      <div className="mt-8">
        <h2 className="font-heading text-sm font-bold uppercase tracking-[0.14em] text-gold-dark">
          {t.factsHeading}
        </h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          {t.facts.map((fact) => (
            <div key={fact.label} className="rounded-sm border border-line bg-white p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
                {fact.label}
              </dt>
              <dd className="mt-1 font-heading font-bold text-blue">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <ThemeCollection
        tag="militia"
        sourcesHeading={dict.thematic.sourcesHeading}
        essaysHeading={dict.thematic.essaysHeading}
        sourceLabels={{
          readSource: dict.primarySources.readSource,
          whyMatters: dict.primarySources.whyMatters,
          status: dict.primarySources.status,
        }}
        essayLabels={{
          keyExcerpts: dict.essays.keyExcerpts,
          whyMatters: dict.essays.whyMatters,
        }}
      />
    </Section>
  );
}
