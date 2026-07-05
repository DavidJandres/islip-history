"use client";

import { usePathname, useRouter } from "next/navigation";
import { Languages } from "lucide-react";
import { isLocale, type Locale } from "@/i18n/config";

// Swaps the locale segment of the current path, remembers the choice in
// NEXT_LOCALE (read by middleware next visit), and navigates.
export function LanguageToggle({
  locale,
  label,
  otherName,
}: {
  locale: Locale;
  label: string;
  otherName: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const other: Locale = locale === "en" ? "es" : "en";

  function switchLocale() {
    const segments = pathname.split("/");
    if (isLocale(segments[1])) segments[1] = other;
    else segments.splice(1, 0, other);

    document.cookie = `NEXT_LOCALE=${other};path=/;max-age=31536000;samesite=lax`;
    router.push(segments.join("/") || `/${other}`);
  }

  return (
    <button
      type="button"
      onClick={switchLocale}
      aria-label={label}
      lang={other}
      className="inline-flex items-center gap-1.5 rounded-sm border border-line px-3 py-2
        text-sm font-semibold text-blue transition-colors hover:border-blue hover:bg-white"
    >
      <Languages aria-hidden="true" className="h-4 w-4" />
      <span>{otherName}</span>
    </button>
  );
}
