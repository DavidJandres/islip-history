import { ArrowRight } from "lucide-react";
import { localizedPath } from "@/i18n/config";
import { loadLocale, type LocaleParams } from "@/i18n/page";
import { buildMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ImageSlot } from "@/components/ui/image-slot";
import { VisitorCount } from "@/components/home/visitor-count";

export async function generateMetadata({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  return buildMetadata({
    locale,
    description: dict.home.lede[0],
    siteName: dict.common.siteName,
  });
}

export default async function HomePage({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  const home = dict.home;
  const link = (path: string) => localizedPath(locale, path);

  return (
    <>
      <Section padding="hero">
        <div className="measure">
          <Eyebrow>{home.eyebrow}</Eyebrow>
          <h1 className="text-4xl leading-[1.1] sm:text-5xl">{home.title}</h1>
          <p className="mt-5 text-lg font-semibold text-ink">{home.subtitle}</p>
          {home.lede.map((para) => (
            <p key={para} className="mt-4 leading-relaxed text-muted">
              {para}
            </p>
          ))}
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={link("/explore")}>
              {home.ctaExplore}
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Button>
            <Button href={link("/about")} variant="secondary">
              {home.ctaAbout}
            </Button>
          </div>
          <VisitorCount
            locale={locale}
            labelOne={home.visitorsOne}
            labelMany={home.visitorsMany}
          />
        </div>

        {/* Reserved lead image; drops in later without shifting the layout. */}
        <ImageSlot label={dict.common.imageComingSoon} aspect="wide" className="mt-12" priority />
      </Section>

      <Section surface="gray" size="narrow" aria-labelledby="bridge-heading">
        <Eyebrow>{home.bridgeEyebrow}</Eyebrow>
        <h2 id="bridge-heading" className="text-2xl sm:text-3xl">
          {home.bridgeTitle}
        </h2>
        {home.bridgeBody.map((para) => (
          <p key={para} className="mt-4 leading-relaxed text-ink/90">
            {para}
          </p>
        ))}
      </Section>

      <Section aria-labelledby="start-heading">
        <Eyebrow>{home.startEyebrow}</Eyebrow>
        <h2 id="start-heading" className="text-2xl sm:text-3xl">
          {home.startTitle}
        </h2>
        <p className="measure mt-3 text-muted">{home.startBody}</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {home.starts.map((point) => (
            <Card key={point.href} eyebrow={point.eyebrow} title={point.title} href={link(point.href)}>
              {point.body}
            </Card>
          ))}
        </div>
      </Section>

      <Section surface="blue" size="narrow" aria-labelledby="about-heading">
        <Eyebrow onDark>{home.aboutEyebrow}</Eyebrow>
        <h2 id="about-heading" className="text-2xl text-white sm:text-3xl">
          {home.aboutTitle}
        </h2>
        <p className="mt-4 leading-relaxed text-line-cool">{home.aboutBody}</p>
        <div className="mt-7">
          <Button href={link("/about")} variant="light">
            {home.aboutCta}
          </Button>
        </div>
      </Section>
    </>
  );
}
