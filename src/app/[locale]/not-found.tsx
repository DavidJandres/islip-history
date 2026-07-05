"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { defaultLocale, isLocale, localizedPath, type Locale } from "@/i18n/config";

// not-found.tsx receives no route params, so we read the locale from the path.
// Copy is kept inline (not from the dictionaries) so a 404 doesn't pull the
// full content dictionaries into the client bundle. The chrome around this is
// already localised by the layout.
const copy: Record<Locale, { title: string; body: string; home: string; about: string }> = {
  en: {
    title: "This page could not be found",
    body: "The address may be mistyped, or the page may have moved. You can return home or read about the project.",
    home: "Return home",
    about: "About the project",
  },
  es: {
    title: "No se encontró esta página",
    body: "Es posible que la dirección esté mal escrita o que la página se haya movido. Puede volver al inicio o conocer el proyecto.",
    home: "Volver al inicio",
    about: "Sobre el proyecto",
  },
  de: {
    title: "Diese Seite wurde nicht gefunden",
    body: "Möglicherweise ist die Adresse falsch geschrieben, oder die Seite wurde verschoben. Sie können zur Startseite zurückkehren oder mehr über das Projekt erfahren.",
    home: "Zur Startseite",
    about: "Über das Projekt",
  },
};

export default function NotFound() {
  const seg = usePathname().split("/")[1];
  const locale: Locale = isLocale(seg) ? seg : defaultLocale;
  const t = copy[locale];

  return (
    <section className="bg-paper py-20 sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-3xl px-5 text-center sm:px-6 lg:px-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-gold-dark">Error 404</p>
        <h1 className="text-3xl sm:text-4xl">{t.title}</h1>
        <p className="mx-auto mt-4 max-w-prose text-muted">{t.body}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href={localizedPath(locale, "/")}
            className="inline-flex items-center justify-center rounded-sm bg-blue px-5 py-2.5
              text-sm font-semibold text-white transition-colors hover:bg-blue-dark"
          >
            {t.home}
          </Link>
          <Link
            href={localizedPath(locale, "/about")}
            className="inline-flex items-center justify-center rounded-sm border border-blue px-5 py-2.5
              text-sm font-semibold text-blue transition-colors hover:bg-blue hover:text-white"
          >
            {t.about}
          </Link>
        </div>
      </div>
    </section>
  );
}
