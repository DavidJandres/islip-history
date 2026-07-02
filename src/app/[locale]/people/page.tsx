import Link from "next/link";
import { localizedPath, defaultLocale } from "@/i18n/config";
import { loadLocale, type LocaleParams } from "@/i18n/page";
import { buildMetadata } from "@/lib/metadata";
import { peopleSections, peopleInSection } from "@/lib/people";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Rule } from "@/components/ui/rule";
import { Notice } from "@/components/ui/notice";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Portrait } from "@/components/people/portrait";

export async function generateMetadata({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  return buildMetadata({
    locale,
    title: dict.people.title,
    description: dict.people.intro[0],
    siteName: dict.common.siteName,
    path: "/people",
  });
}

export default async function PeoplePage({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  const p = dict.people;

  return (
    <Section>
      <Breadcrumb
        homeLabel={dict.common.home}
        homeHref={localizedPath(locale, "/")}
        trail={[{ label: p.breadcrumb }]}
      />

      <div className="mt-6 measure">
        <Eyebrow>{p.eyebrow}</Eyebrow>
        <h1 className="text-3xl sm:text-4xl">{p.title}</h1>
        {p.intro.map((para) => (
          <p key={para} className="mt-4 leading-relaxed text-ink/90">
            {para}
          </p>
        ))}
        <Notice intent="editorial" label={dict.common.noticeEditorial} className="mt-6">
          {p.workingIndexNote}
        </Notice>
        {locale !== defaultLocale && (
          <Notice intent="info" label={dict.common.noticeInfo} className="mt-4">
            {p.translationNote}
          </Notice>
        )}
      </div>

      {/* Jump to a category, or simply scroll to browse everyone. The full
          roster always renders below; these are in-page anchors, not filters. */}
      <nav aria-label={p.browseByCategory} className="mt-8 flex flex-wrap gap-2">
        {peopleSections.map((section) => {
          const count = peopleInSection(section, locale).length;
          if (count === 0) return null;
          return (
            <a
              key={section}
              href={`#section-${section}`}
              className="inline-flex items-baseline gap-1.5 rounded-sm border border-line bg-white px-3 py-1.5 text-sm font-semibold text-blue transition-colors hover:border-blue hover:bg-gray"
            >
              {p.sections[section]}
              <span className="text-xs font-normal text-muted">{count}</span>
            </a>
          );
        })}
      </nav>

      <Rule className="mt-8" />

      <div className="mt-8 space-y-12">
        {peopleSections.map((section) => {
          const members = peopleInSection(section, locale);
          if (members.length === 0) return null;
          return (
            <section key={section} aria-labelledby={`section-${section}`}>
              <h2
                id={`section-${section}`}
                className="scroll-mt-24 text-xl font-bold text-blue sm:text-2xl"
              >
                {p.sections[section]}
              </h2>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                {members.map((person) => (
                  <li key={person.slug}>
                    <Link
                      href={localizedPath(locale, `/people/${person.slug}`)}
                      className="group flex gap-4 rounded-sm border border-line p-4 transition-colors hover:border-blue"
                    >
                      <Portrait portrait={person.portrait} name={person.name} size="sm" />
                      <div className="min-w-0">
                        <span className="block font-heading text-lg font-bold leading-tight text-blue group-hover:underline">
                          {person.name}
                        </span>
                        <span className="mt-1 block text-sm text-ink">
                          {person.role}
                        </span>
                        {person.dates && (
                          <span className="mt-0.5 block text-sm text-muted">
                            {person.dates}
                          </span>
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </Section>
  );
}
