import { ArrowRight } from "lucide-react";
import { localizedPath } from "@/i18n/config";
import { loadLocale, type LocaleParams } from "@/i18n/page";
import { buildMetadata } from "@/lib/metadata";
import { collectionGroups } from "@/lib/collections";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Rule } from "@/components/ui/rule";
import { Notice } from "@/components/ui/notice";
import { Breadcrumb } from "@/components/layout/breadcrumb";

// Collections: an early, openly provisional "mash" of the archive grouped by
// theme. Every card links OUT to material that already lives elsewhere on the
// site (sources, essays, timeline anchors, people). Deliberately rougher than
// the exhibit — a broad landing place to be refined later.

export async function generateMetadata({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  const c = dict.collections;
  return buildMetadata({
    locale,
    title: c.title,
    description: c.intro[0],
    siteName: dict.common.siteName,
    path: "/explore/collections",
  });
}

export default async function CollectionsPage({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  const c = dict.collections;

  return (
    <Section>
      <Breadcrumb
        homeLabel={dict.common.home}
        homeHref={localizedPath(locale, "/")}
        trail={[
          { label: dict.nav.explore, href: localizedPath(locale, "/explore") },
          { label: c.breadcrumb },
        ]}
      />

      <div className="mt-6 measure">
        <Eyebrow>{c.eyebrow}</Eyebrow>
        <h1 className="text-3xl sm:text-4xl">{c.title}</h1>
        {c.intro.map((para) => (
          <p key={para} className="mt-4 leading-relaxed text-ink/90">
            {para}
          </p>
        ))}
        <Notice intent="editorial" label={c.provisionalTitle} className="mt-6">
          <strong className="font-semibold">{c.provisionalTitle}.</strong>{" "}
          {c.provisionalNote}
        </Notice>
      </div>

      <Rule className="mt-12" />

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {collectionGroups.map((group) => {
          const copy = c.groups[group.key as keyof typeof c.groups];
          return (
            <section
              key={group.key}
              aria-labelledby={`collection-${group.key}`}
              className="rounded-sm border border-line bg-white p-5"
            >
              <h2
                id={`collection-${group.key}`}
                className="font-heading text-lg font-bold text-blue"
              >
                {copy.title}
              </h2>
              <p className="mt-1.5 text-sm leading-snug text-muted">{copy.blurb}</p>
              <ul className="mt-4 space-y-1.5">
                {group.links.map((link) => (
                  <li key={link.href + link.label}>
                    <a
                      href={localizedPath(locale, link.href)}
                      className="group inline-flex items-start gap-1.5 text-sm font-semibold text-blue hover:underline"
                    >
                      <ArrowRight
                        aria-hidden
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-dark transition-transform group-hover:translate-x-0.5"
                      />
                      {link.label}
                    </a>
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
