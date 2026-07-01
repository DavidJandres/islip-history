import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { LanguageToggle } from "./language-toggle";
import { HeaderSearch } from "@/components/search/header-search";
import { localizedPath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

// Masthead: seal + wordmark (links home), language switch, and search entry.
export function SiteHeader({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const c = dict.common;
  return (
    <header className="bg-paper">
      <Container>
        <div className="flex items-center justify-between gap-4 py-5">
          <Link href={localizedPath(locale, "/")} className="flex items-center gap-3 rounded-sm">
            <Image src="/logos/town-of-islip-seal.png" alt="" width={48} height={48} className="h-11 w-11 shrink-0" priority />
            <span className="leading-tight">
              <span className="block font-heading text-lg font-bold text-blue sm:text-xl">
                {c.siteLineTop}
              </span>
              <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-gold-dark">
                {c.siteLineBottom}
              </span>
            </span>
            <span className="sr-only">{c.siteName}</span>
          </Link>

          <div className="flex items-center gap-2">
            <LanguageToggle locale={locale} label={c.switchLanguageLabel} otherName={c.otherLocaleName} />
            <HeaderSearch locale={locale} dict={dict} searchHref={localizedPath(locale, "/search")} />
          </div>
        </div>
      </Container>
    </header>
  );
}
