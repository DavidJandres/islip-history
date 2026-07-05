"use client";

import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import { locales, localeNames, isLocale, type Locale } from "@/i18n/config";

// Accessible language switcher for three or more locales. Each language is a
// real link (keyboard-focusable, right-clickable, works without JS), shown in
// its OWN name with its own `lang` attribute so a screen reader pronounces
// "Espanol" / "Deutsch" correctly. The current language is not a link and is
// marked aria-current. The choice is remembered in NEXT_LOCALE on click. No
// hover-only menu, no focus trap.
export function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();

  const pathFor = (target: Locale) => {
    const segs = pathname.split("/");
    if (isLocale(segs[1])) segs[1] = target;
    else segs.splice(1, 0, target);
    return segs.join("/") || `/${target}`;
  };

  const remember = (target: Locale) => () => {
    document.cookie = `NEXT_LOCALE=${target};path=/;max-age=31536000;samesite=lax`;
  };

  return (
    <nav aria-label={label} className="flex items-center gap-1.5">
      <Languages aria-hidden="true" className="h-4 w-4 shrink-0 text-gold-dark" />
      <ul className="flex items-center gap-0.5">
        {locales.map((loc) => (
          <li key={loc}>
            {loc === locale ? (
              <span
                aria-current="true"
                lang={loc}
                className="rounded-sm px-1.5 py-1 text-sm font-bold text-ink"
              >
                {localeNames[loc]}
              </span>
            ) : (
              <a
                href={pathFor(loc)}
                onClick={remember(loc)}
                lang={loc}
                className="rounded-sm px-1.5 py-1 text-sm font-semibold text-blue hover:underline"
              >
                {localeNames[loc]}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
