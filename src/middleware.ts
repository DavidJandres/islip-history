import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale, isLocale } from "@/i18n/config";

const LOCALE_COOKIE = "NEXT_LOCALE";

// Redirect any un-prefixed path to a locale. We deliberately don't sniff
// Accept-Language: the site is English-first with an explicit switch, and the
// visitor's last choice is remembered in NEXT_LOCALE.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`),
  );
  if (hasLocale) return NextResponse.next();

  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale = cookie && isLocale(cookie) ? cookie : defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
