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
    title: dict.thematic.occupation.title,
    description: dict.thematic.occupation.intro,
    siteName: dict.common.siteName,
    path: "/research/occupation",
  });
}

export default async function OccupationPage({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  const t = dict.thematic.occupation;

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

      <ThemeCollection
        tag="occupation"
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
