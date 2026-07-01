import { Fragment } from "react";
import { localizedPath } from "@/i18n/config";
import { loadLocale, type LocaleParams } from "@/i18n/page";
import { buildMetadata } from "@/lib/metadata";
import { bibliographyGroups } from "@/lib/bibliography";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Rule } from "@/components/ui/rule";
import { Breadcrumb } from "@/components/layout/breadcrumb";

export async function generateMetadata({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  return buildMetadata({
    locale,
    title: dict.sources.title,
    description: dict.sources.intro,
    siteName: dict.common.siteName,
    path: "/research/sources",
  });
}

// Render a citation, turning any embedded URLs into links (trailing punctuation
// stays as plain text so the link target is clean).
function renderCitation(text: string) {
  return text.split(/(https?:\/\/\S+)/g).map((part, i) => {
    if (!/^https?:\/\//.test(part)) return <Fragment key={i}>{part}</Fragment>;
    const url = part.replace(/[.,;]+$/, "");
    const trailing = part.slice(url.length);
    return (
      <Fragment key={i}>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="break-words text-blue underline underline-offset-2"
        >
          {url}
        </a>
        {trailing}
      </Fragment>
    );
  });
}

export default async function SourcesPage({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  const s = dict.sources;
  const categories = s.categories as Record<string, string>;

  return (
    <Section size="narrow">
      <Breadcrumb
        homeLabel={dict.common.home}
        homeHref={localizedPath(locale, "/")}
        trail={[
          { label: dict.nav.research, href: localizedPath(locale, "/research") },
          { label: s.breadcrumb },
        ]}
      />

      <div className="mt-6 measure">
        <Eyebrow>{s.eyebrow}</Eyebrow>
        <h1 className="text-3xl sm:text-4xl">{s.title}</h1>
        <p className="mt-4 leading-relaxed text-muted">{s.intro}</p>
      </div>

      <div className="mt-10 measure space-y-10">
        {bibliographyGroups.map((group) => (
          <section key={group.id} aria-labelledby={`cat-${group.id}`}>
            <h2
              id={`cat-${group.id}`}
              className="scroll-mt-24 font-heading text-xl font-bold text-blue"
            >
              {categories[group.id]}
            </h2>
            {group.id === "review" && (
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.reviewIntro}</p>
            )}
            <ol className="mt-4 space-y-3 text-[0.95rem] leading-relaxed text-ink/90">
              {group.items.map((item) => (
                <li key={item} className="border-l-2 border-line pl-4">
                  {renderCitation(item)}
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>

      <Rule className="mt-12" />
      <p className="mt-6 measure text-sm text-muted">{s.missingNote}</p>
    </Section>
  );
}
