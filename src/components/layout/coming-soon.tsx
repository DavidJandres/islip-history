import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { localizedPath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

// Placeholder for sections not yet built, so nav links never dead-end.
export function ComingSoon({
  locale,
  dict,
  sectionLabel,
}: {
  locale: Locale;
  dict: Dictionary;
  sectionLabel: string;
}) {
  const c = dict.common;
  return (
    <Section size="narrow" padding="lg" className="text-center">
      <Eyebrow>
        {sectionLabel} · {c.comingSoonKicker}
      </Eyebrow>
      <h1 className="text-3xl sm:text-4xl">{c.comingSoonHeading}</h1>
      <p className="mx-auto mt-4 max-w-prose text-muted">{c.comingSoonBody}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href={localizedPath(locale, "/about")}>{c.comingSoonAbout}</Button>
        <Button href={localizedPath(locale, "/")} variant="secondary">
          {c.comingSoonHome}
        </Button>
      </div>
    </Section>
  );
}
