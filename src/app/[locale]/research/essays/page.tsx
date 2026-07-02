import { localizedPath } from "@/i18n/config";
import { loadLocale, type LocaleParams } from "@/i18n/page";
import { buildMetadata } from "@/lib/metadata";
import { localizedEssays, essayCategories } from "@/lib/essays";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { EssayCard } from "@/components/research/essay-card";

export async function generateMetadata({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  return buildMetadata({
    locale,
    title: dict.essays.title,
    description: dict.essays.intro,
    siteName: dict.common.siteName,
    path: "/research/essays",
  });
}

export default async function EssaysPage({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  const e = dict.essays;
  const categoryLabels = e.categories as Record<string, string>;
  const labels = { keyExcerpts: e.keyExcerpts, whyMatters: e.whyMatters };

  return (
    <Section size="narrow">
      <Breadcrumb
        homeLabel={dict.common.home}
        homeHref={localizedPath(locale, "/")}
        trail={[
          { label: dict.nav.research, href: localizedPath(locale, "/research") },
          { label: e.breadcrumb },
        ]}
      />

      <div className="mt-6 measure">
        <Eyebrow>{e.eyebrow}</Eyebrow>
        <h1 className="text-3xl sm:text-4xl">{e.title}</h1>
        <p className="mt-4 leading-relaxed text-muted">{e.intro}</p>
      </div>

      <div className="mt-10 space-y-12">
        {essayCategories.map((category) => {
          const items = localizedEssays(locale).filter((s) => s.category === category);
          if (items.length === 0) return null;
          return (
            <section key={category} aria-labelledby={`cat-${category}`}>
              <h2
                id={`cat-${category}`}
                className="scroll-mt-24 font-heading text-xl font-bold text-blue sm:text-2xl"
              >
                {categoryLabels[category]}
              </h2>
              <div className="mt-5 space-y-5">
                {items.map((essay) => (
                  <EssayCard key={essay.id} essay={essay} labels={labels} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </Section>
  );
}
