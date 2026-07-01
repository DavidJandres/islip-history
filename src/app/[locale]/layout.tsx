import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Merriweather, Source_Sans_3 } from "next/font/google";
import { locales, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { siteConfig } from "@/lib/site";
import { siteJsonLd } from "@/lib/structured-data";
import { SkipLink } from "@/components/layout/skip-link";
import { TopBar } from "@/components/layout/top-bar";
import { SiteHeader } from "@/components/layout/site-header";
import { PrimaryNav } from "@/components/layout/primary-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import "../globals.css";

// Self-hosted at build time. Only the weights actually used are requested.
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-merriweather",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-source-sans",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  robots: { index: true, follow: true },
};

// The whole site lives under /[locale], so this is the root layout: it renders
// <html lang> per translation and the shared chrome. Nav and the language
// toggle are the only client components.
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <html lang={locale} className={`${merriweather.variable} ${sourceSans.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd(dict.common.siteName)) }}
        />
        <div className="flex min-h-screen flex-col">
          <SkipLink label={dict.common.skipToContent} />
          <TopBar affiliation={dict.common.affiliation} />
          <SiteHeader locale={locale} dict={dict} />
          <PrimaryNav
            locale={locale}
            labels={dict.nav}
            summaries={dict.navSummaries}
            menuLabel={dict.common.menu}
            closeLabel={dict.common.close}
          />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <SiteFooter locale={locale} dict={dict} />
        </div>
      </body>
    </html>
  );
}
