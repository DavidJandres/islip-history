import { loadLocale, type LocaleParams } from "@/i18n/page";
import { buildMetadata } from "@/lib/metadata";
import { ComingSoon } from "@/components/layout/coming-soon";

export async function generateMetadata({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  return buildMetadata({
    locale,
    title: dict.nav.maps,
    description: dict.navSummaries.maps,
    siteName: dict.common.siteName,
    path: "/explore/maps",
  });
}

export default async function Page({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  return <ComingSoon locale={locale} dict={dict} sectionLabel={dict.nav.maps} />;
}
