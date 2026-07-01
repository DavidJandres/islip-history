import Link from "next/link";
import { localizedPath } from "@/i18n/config";
import { loadLocale, type LocaleParams } from "@/i18n/page";
import { buildMetadata } from "@/lib/metadata";
import { exhibitPanels, panelStatus } from "@/lib/exhibit";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Rule } from "@/components/ui/rule";
import { Button } from "@/components/ui/button";
import { ImageSlot } from "@/components/ui/image-slot";
import { Breadcrumb } from "@/components/layout/breadcrumb";

export async function generateMetadata({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  return buildMetadata({
    locale,
    title: dict.exhibit.title,
    description: dict.exhibit.lede,
    siteName: dict.common.siteName,
    path: "/exhibit",
  });
}

export default async function ExhibitPage({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  const ex = dict.exhibit;
  const firstPanel = exhibitPanels[0];

  return (
    <Section size="narrow">
      <Breadcrumb
        homeLabel={dict.common.home}
        homeHref={localizedPath(locale, "/")}
        trail={[{ label: ex.breadcrumb }]}
      />

      <div className="mt-6 measure">
        <Eyebrow>{ex.eyebrow}</Eyebrow>
        <h1 className="text-3xl sm:text-4xl">{ex.title}</h1>
        <p className="mt-5 text-lg font-semibold text-ink">{ex.lede}</p>
        {ex.intro.map((para) => (
          <p key={para} className="mt-4 leading-relaxed text-ink/90">
            {para}
          </p>
        ))}

        <div className="mt-8">
          <Button href={localizedPath(locale, `/exhibit/${firstPanel}`)}>
            {ex.startLabel}
          </Button>
        </div>
      </div>

      {/* Lead image for the exhibit; a reserved frame until an image is added. */}
      <ImageSlot
        label={dict.common.imageComingSoon}
        aspect="wide"
        className="mt-10"
        priority
      />

      <Rule className="mt-12" />

      <div className="mt-8">
        <h2 className="text-xl sm:text-2xl">{ex.panelsHeading}</h2>
        <p className="mt-2 text-muted">{ex.panelsHint}</p>

        <ol className="mt-6 divide-y divide-line">
          {exhibitPanels.map((slug, i) => {
            const panel = ex.panels[slug];
            return (
              <li key={slug}>
                <Link
                  href={localizedPath(locale, `/exhibit/${slug}`)}
                  className="group flex items-baseline gap-4 py-5 sm:gap-6"
                >
                  <span
                    aria-hidden
                    className="font-heading text-2xl font-bold tabular-nums text-gold sm:text-3xl"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-heading text-lg font-bold text-blue group-hover:underline sm:text-xl">
                      {panel.title}
                    </span>
                    <span className="mt-1 block leading-snug text-muted">
                      {panel.summary}
                    </span>
                    {panelStatus[slug] === "sourcing" && (
                      <span className="mt-2 inline-block text-xs font-semibold uppercase tracking-[0.12em] text-gold-dark">
                        {ex.sourcingNoticeTitle}
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
