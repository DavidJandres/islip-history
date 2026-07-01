import { notFound } from "next/navigation";
import { localizedPath, isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/metadata";
import { personJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";
import { peopleSlugs, getPerson } from "@/lib/people";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Rule } from "@/components/ui/rule";
import { Notice } from "@/components/ui/notice";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Portrait } from "@/components/people/portrait";

type PersonParams = { params: Promise<{ locale: string; person: string }> };

export function generateStaticParams() {
  return peopleSlugs.map((person) => ({ person }));
}

async function resolve(params: PersonParams["params"]) {
  const { locale, person: slug } = await params;
  const person = getPerson(slug);
  if (!isLocale(locale) || !person) notFound();
  return { locale: locale as Locale, person, dict: getDictionary(locale) };
}

export async function generateMetadata({ params }: PersonParams) {
  const { locale, person, dict } = await resolve(params);
  return buildMetadata({
    locale,
    title: `${person.name} \u00b7 ${dict.people.title}`,
    description: person.cardText,
    siteName: dict.common.siteName,
    path: `/people/${person.slug}`,
  });
}

export default async function PersonPage({ params }: PersonParams) {
  const { locale, person, dict } = await resolve(params);
  const p = dict.people;

  const jsonLd = [
    personJsonLd(locale, person),
    breadcrumbJsonLd(locale, [
      { name: dict.common.home, path: "/" },
      { name: p.breadcrumb, path: "/people" },
      { name: person.name },
    ]),
  ];

  return (
    <Section size="narrow">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumb
        homeLabel={dict.common.home}
        homeHref={localizedPath(locale, "/")}
        trail={[
          { label: p.breadcrumb, href: localizedPath(locale, "/people") },
          { label: person.name },
        ]}
      />

      <header className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-8">
        <Portrait
          portrait={person.portrait}
          name={person.name}
          size="lg"
          noLikenessLabel={p.noLikeness}
        />
        <div className="min-w-0">
          <Eyebrow>{p.sections[person.section]}</Eyebrow>
          <h1 className="text-3xl sm:text-4xl">{person.name}</h1>
          <p className="mt-2 text-lg font-semibold text-ink">{person.role}</p>
          {person.dates && <p className="mt-1 text-muted">{person.dates}</p>}
        </div>
      </header>

      {locale !== defaultLocale && (
        <Notice intent="info" label={dict.common.noticeInfo} className="mt-8">
          {p.translationNote}
        </Notice>
      )}

      <div className="mt-8 measure">
        {person.bio.map((para) => (
          <p key={para} className="mt-4 leading-relaxed text-ink/90">
            {para}
          </p>
        ))}

        <div className="mt-8">
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-dark">
            {p.whyMattersLabel}
          </h2>
          <p className="mt-2 leading-relaxed text-ink/90">{person.whyMatters}</p>
        </div>

        <div className="mt-6">
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-dark">
            {p.connectionTodayLabel}
          </h2>
          <p className="mt-2 leading-relaxed text-ink/90">
            {person.connectionToday}
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-dark">
            {p.sourcesLabel}
          </h2>
          <ol className="mt-3 space-y-2 text-sm leading-snug text-muted">
            {person.sources.map((src) => (
              <li key={src}>{src}</li>
            ))}
          </ol>
        </div>
      </div>

      <Rule className="mt-12" />
      <div className="mt-6">
        <a
          href={localizedPath(locale, "/people")}
          className="text-sm font-semibold text-blue hover:underline"
        >
          {p.backToPeople}
        </a>
      </div>
    </Section>
  );
}
