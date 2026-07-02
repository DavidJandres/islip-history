import { localizedPath } from "@/i18n/config";
import { loadLocale, type LocaleParams } from "@/i18n/page";
import { buildMetadata } from "@/lib/metadata";
import { localizedPrimarySources, sourceThemes } from "@/lib/primary-sources";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Notice } from "@/components/ui/notice";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { SourceCard } from "@/components/research/source-card";

export async function generateMetadata({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  return buildMetadata({
    locale,
    title: dict.primarySources.title,
    description: dict.primarySources.intro,
    siteName: dict.common.siteName,
    path: "/explore/primary-sources",
  });
}

export default async function PrimarySourcesPage({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  const p = dict.primarySources;
  const themeLabels = p.themes as Record<string, string>;
  const labels = {
    readSource: p.readSource,
    whyMatters: p.whyMatters,
    status: p.status,
  };

  return (
    <Section size="narrow">
      <Breadcrumb
        homeLabel={dict.common.home}
        homeHref={localizedPath(locale, "/")}
        trail={[
          { label: dict.nav.explore, href: localizedPath(locale, "/explore") },
          { label: p.breadcrumb },
        ]}
      />

      <div className="mt-6 measure">
        <Eyebrow>{p.eyebrow}</Eyebrow>
        <h1 className="text-3xl sm:text-4xl">{p.title}</h1>
        <p className="mt-4 leading-relaxed text-muted">{p.intro}</p>
      </div>

      <Notice intent="editorial" label={dict.common.noticeEditorial} className="mt-6 measure">
        {p.note}
      </Notice>

      <div className="mt-10 space-y-12">
        {sourceThemes.map((theme) => {
          const items = localizedPrimarySources(locale).filter((s) => s.theme === theme);
          if (items.length === 0) return null;
          return (
            <section key={theme} aria-labelledby={`theme-${theme}`}>
              <h2
                id={`theme-${theme}`}
                className="scroll-mt-24 font-heading text-xl font-bold text-blue sm:text-2xl"
              >
                {themeLabels[theme]}
              </h2>
              <div className="mt-5 space-y-5">
                {items.map((source) => (
                  <SourceCard key={source.id} source={source} labels={labels} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </Section>
  );
}
