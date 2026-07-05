import { ArrowRight } from "lucide-react";
import { localizedPath, defaultLocale } from "@/i18n/config";
import { loadLocale, type LocaleParams } from "@/i18n/page";
import { buildMetadata } from "@/lib/metadata";
import { exhibitGuide } from "@/lib/teaching";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Rule } from "@/components/ui/rule";
import { Notice } from "@/components/ui/notice";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { TeachField } from "@/components/teach/field";

export async function generateMetadata({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  const t = dict.teach.exhibitGuide;
  return buildMetadata({
    locale,
    title: `${t.title} · ${dict.teach.title}`,
    description: t.intro[0],
    siteName: dict.common.siteName,
    path: "/teach/exhibit-guide",
  });
}

export default async function ExhibitGuidePage({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  const t = dict.teach;
  const eg = t.exhibitGuide;
  const L = t.labels;

  return (
    <Section size="narrow">
      <Breadcrumb
        homeLabel={dict.common.home}
        label={dict.common.breadcrumbLabel}
        homeHref={localizedPath(locale, "/")}
        trail={[
          { label: t.breadcrumb, href: localizedPath(locale, "/teach") },
          { label: eg.breadcrumb },
        ]}
      />

      <div className="mt-6 measure">
        <Eyebrow>{t.eyebrow}</Eyebrow>
        <h1 className="text-3xl sm:text-4xl">{eg.title}</h1>
        {eg.intro.map((para) => (
          <p key={para} className="mt-4 text-lg leading-relaxed text-ink/90">
            {para}
          </p>
        ))}
        <p className="mt-3 text-sm text-muted">{L.printThisPage}</p>
        {locale !== defaultLocale && (
          <Notice intent="editorial" title={t.contentPendingTitle} className="mt-5">
            <strong className="font-semibold">{t.contentPendingTitle}.</strong>{" "}
            {t.contentPending}
          </Notice>
        )}

        <div className="mt-8 rounded-sm border-l-4 border-gold bg-gray p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-dark">
            {eg.beforeReadingHeading}
          </p>
          <p className="mt-1 text-lg leading-relaxed text-ink">{exhibitGuide.beforeReading}</p>
        </div>
      </div>

      <div className="mt-12 measure">
        <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-dark">
          {eg.panelQuestionsHeading}
        </h2>
        <ol className="mt-5 space-y-5">
          {exhibitGuide.panels.map((panel, i) => (
            <li key={panel.slug} className="rounded-sm border border-line bg-white p-5">
              <h3 className="font-heading text-lg font-bold text-ink">
                <span className="text-gold-dark">{i + 1}. </span>
                {panel.title}
              </h3>
              <p className="mt-2 leading-relaxed text-ink/90">{panel.question}</p>
              <p className="mt-3">
                <a
                  href={localizedPath(locale, `/exhibit/${panel.slug}`)}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-blue hover:underline"
                >
                  {eg.openPanel}
                  <ArrowRight aria-hidden className="h-3.5 w-3.5" />
                  <span className="sr-only">: {panel.title}</span>
                </a>
              </p>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-12 measure">
        <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-dark">
          {eg.reflectHeading}
        </h2>
        <TeachField label={eg.surprisedLabel}>{exhibitGuide.surprised}</TeachField>
        <TeachField label={eg.includedLabel}>{exhibitGuide.included}</TeachField>
        <TeachField label={eg.leftOutLabel}>{exhibitGuide.leftOut}</TeachField>

        <div className="mt-8 rounded-sm border-l-4 border-gold bg-gray p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-dark">
            {eg.finalReflectionLabel}
          </p>
          <p className="mt-1 text-lg leading-relaxed text-ink">{exhibitGuide.finalReflection}</p>
        </div>
      </div>

      <Rule className="mt-14" />
      <div className="mt-6">
        <a
          href={localizedPath(locale, "/teach")}
          className="text-sm font-semibold text-blue hover:underline"
        >
          {L.backToTeach}
        </a>
      </div>
    </Section>
  );
}
