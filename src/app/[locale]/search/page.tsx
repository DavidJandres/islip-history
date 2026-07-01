import { Suspense } from "react";
import { loadLocale, type LocaleParams } from "@/i18n/page";
import { buildMetadata } from "@/lib/metadata";
import { localizedPath } from "@/i18n/config";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { SearchPageClient } from "@/components/search/search-page-client";

export async function generateMetadata({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  return buildMetadata({
    locale,
    title: dict.common.searchFull,
    description: dict.common.searchStartHint,
    siteName: dict.common.siteName,
    path: "/search",
  });
}

export default async function SearchPage({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  const c = dict.common;
  return (
    <Section size="narrow">
      <Breadcrumb
        homeLabel={c.home}
        homeHref={localizedPath(locale, "/")}
        trail={[{ label: c.search }]}
      />
      <div className="mt-6 mb-6">
        <Eyebrow>{c.search}</Eyebrow>
        <h1 className="text-3xl sm:text-4xl">{c.searchFull}</h1>
      </div>
      <Suspense fallback={<p className="text-sm text-muted">{c.searchLoading}</p>}>
        <SearchPageClient locale={locale} dict={dict} />
      </Suspense>
    </Section>
  );
}
