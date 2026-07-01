import { localizedPath } from "@/i18n/config";
import { loadLocale, type LocaleParams } from "@/i18n/page";
import { buildMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Breadcrumb } from "@/components/layout/breadcrumb";

export async function generateMetadata({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  return buildMetadata({
    locale,
    title: dict.thematic.questions.title,
    description: dict.thematic.questions.intro,
    siteName: dict.common.siteName,
    path: "/research/questions",
  });
}

export default async function QuestionsPage({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  const t = dict.thematic.questions;

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

      <ol className="mt-10 space-y-5">
        {t.items.map((item, i) => (
          <li
            key={item.q}
            className="rounded-sm border border-line border-l-4 border-l-gold bg-white p-5 sm:p-6"
          >
            <h2 className="flex gap-3 font-heading text-lg font-bold text-blue">
              <span className="shrink-0 tabular-nums text-gold-dark">
                {String(i + 1).padStart(2, "0")}
              </span>
              {item.q}
            </h2>
            <p className="mt-2 pl-8 text-[0.95rem] leading-relaxed text-ink/90">
              {item.note}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
