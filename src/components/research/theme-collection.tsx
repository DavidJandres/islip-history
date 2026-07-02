import { localizedPrimarySources } from "@/lib/primary-sources";
import { localizedEssays } from "@/lib/essays";
import { SourceCard } from "./source-card";
import { EssayCard } from "./essay-card";
import type { SourceStatus } from "@/lib/primary-sources";
import type { Locale } from "@/i18n/config";

// The shared body of a thematic page: the primary sources and essays tagged with
// `tag`, rendered as cards under localized section headings. Each thematic page
// (Occupation, Flags, Militia) is a filtered view over the same data.

export function ThemeCollection({
  tag,
  locale = "en",
  sourcesHeading,
  essaysHeading,
  sourceLabels,
  essayLabels,
}: {
  tag: string;
  locale?: Locale;
  sourcesHeading: string;
  essaysHeading: string;
  sourceLabels: {
    readSource: string;
    whyMatters: string;
    status: Record<SourceStatus, string>;
  };
  essayLabels: { keyExcerpts: string; whyMatters: string };
}) {
  const sources = localizedPrimarySources(locale).filter((s) => s.tags?.includes(tag));
  const themeEssays = localizedEssays(locale).filter((e) => e.tags?.includes(tag));

  return (
    <>
      {sources.length > 0 && (
        <section className="mt-12" aria-label={sourcesHeading}>
          <h2 className="font-heading text-xl font-bold text-blue sm:text-2xl">
            {sourcesHeading}
          </h2>
          <div className="mt-5 space-y-5">
            {sources.map((source) => (
              <SourceCard key={source.id} source={source} labels={sourceLabels} />
            ))}
          </div>
        </section>
      )}

      {themeEssays.length > 0 && (
        <section className="mt-12" aria-label={essaysHeading}>
          <h2 className="font-heading text-xl font-bold text-blue sm:text-2xl">
            {essaysHeading}
          </h2>
          <div className="mt-5 space-y-5">
            {themeEssays.map((essay) => (
              <EssayCard key={essay.id} essay={essay} labels={essayLabels} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
