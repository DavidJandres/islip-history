import { localizedPath } from "@/i18n/config";
import { loadLocale, type LocaleParams } from "@/i18n/page";
import { buildMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/layout/breadcrumb";

export async function generateMetadata({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  return buildMetadata({
    locale,
    title: dict.aboutProject.title,
    description: dict.aboutProject.lede,
    siteName: dict.common.siteName,
    path: "/about",
  });
}

export default async function AboutProjectPage({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  const about = dict.aboutProject;

  return (
    <Section size="narrow">
      <Breadcrumb
        homeLabel={dict.common.home}
        homeHref={localizedPath(locale, "/")}
        trail={[{ label: about.breadcrumb }]}
      />

      <div className="mt-6 measure">
        <Eyebrow>{about.eyebrow}</Eyebrow>
        <h1 className="text-3xl sm:text-4xl">{about.title}</h1>
        <p className="mt-5 text-lg font-semibold text-ink">{about.lede}</p>

        {about.body.map((para) => (
          <p key={para} className="mt-4 leading-relaxed text-ink/90">
            {para}
          </p>
        ))}

        <h2 className="mt-10 text-xl sm:text-2xl">{about.usingTitle}</h2>
        <p className="mt-3 leading-relaxed text-ink/90">{about.usingBody}</p>

        <h2 className="mt-10 text-xl sm:text-2xl">{about.accessTitle}</h2>
        <p className="mt-3 leading-relaxed text-ink/90">{about.accessBody}</p>

        <div className="mt-8">
          <Button href={localizedPath(locale, "/about/contact")} variant="secondary">
            {about.contactCta}
          </Button>
        </div>
      </div>
    </Section>
  );
}
