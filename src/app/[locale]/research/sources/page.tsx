import { localizedPath } from "@/i18n/config";
import { loadLocale, type LocaleParams } from "@/i18n/page";
import { buildMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Rule } from "@/components/ui/rule";
import { Notice } from "@/components/ui/notice";
import { Breadcrumb } from "@/components/layout/breadcrumb";

export async function generateMetadata({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  return buildMetadata({
    locale,
    title: dict.sources.title,
    description: dict.sources.intro,
    siteName: dict.common.siteName,
    path: "/research/sources",
  });
}

export default async function SourcesPage({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  const s = dict.sources;

  return (
    <Section size="narrow">
      <Breadcrumb
        homeLabel={dict.common.home}
        homeHref={localizedPath(locale, "/")}
        trail={[
          { label: dict.nav.research, href: localizedPath(locale, "/research") },
          { label: s.breadcrumb },
        ]}
      />

      <div className="mt-6 measure">
        <Eyebrow>{s.eyebrow}</Eyebrow>
        <h1 className="text-3xl sm:text-4xl">{s.title}</h1>
        <p className="mt-4 leading-relaxed text-muted">{s.intro}</p>
      </div>

      <div className="mt-10 measure space-y-10">
        {s.groups.map((group) => (
          <section key={group.heading}>
            <h2 className="font-heading text-xl font-bold text-blue">{group.heading}</h2>
            <ol className="mt-4 space-y-3 text-[0.95rem] leading-relaxed text-ink/90">
              {group.items.map((item) => (
                <li key={item} className="border-l-2 border-line pl-4">
                  {item}
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>

      <Notice intent="editorial" label={dict.common.noticeEditorial} className="mt-10 measure">
        {s.censusNote}
      </Notice>

      <Rule className="mt-10" />
      <p className="mt-6 measure text-sm text-muted">{s.missingNote}</p>
    </Section>
  );
}
