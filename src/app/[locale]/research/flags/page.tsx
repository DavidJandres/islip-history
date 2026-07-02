import { localizedPath } from "@/i18n/config";
import { loadLocale, type LocaleParams } from "@/i18n/page";
import { buildMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ImageSlot } from "@/components/ui/image-slot";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { ThemeCollection } from "@/components/research/theme-collection";

export async function generateMetadata({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  return buildMetadata({
    locale,
    title: dict.thematic.flags.title,
    description: dict.thematic.flags.intro,
    siteName: dict.common.siteName,
    path: "/research/flags",
  });
}

export default async function FlagsPage({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  const t = dict.thematic.flags;

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

      <div className="mt-10">
        <h2 className="font-heading text-xl font-bold text-blue sm:text-2xl">
          {t.galleryHeading}
        </h2>
        <div className="mt-5 grid gap-6 sm:grid-cols-3">
          {t.gallery.map((flag) => (
            <figure key={flag.name}>
              <ImageSlot
                label={dict.common.imageComingSoon}
                aspect="wide"
                contain
              />
              <figcaption className="mt-2">
                <span className="block font-heading text-sm font-bold text-blue">
                  {flag.name}
                </span>
                <span className="mt-1 block text-xs leading-snug text-muted">
                  {flag.note}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <ThemeCollection
        locale={locale}
        tag="flags"
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
