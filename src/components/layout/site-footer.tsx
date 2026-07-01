import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Rule } from "@/components/ui/rule";
import { footerNav } from "@/lib/site";
import { partners } from "@/lib/partners";
import { localizedPath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

// Footer: a light band of funding/affiliated institutions above the dark
// directory and colophon. Link labels resolve from dict.nav; headings from
// dict.footer; structure from footerNav (lib/site).
export function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const nav = dict.nav as Record<string, string>;
  const f = dict.footer;

  return (
    <footer className="mt-auto">
      <div className="border-t border-line bg-gray">
        <Container>
          <div className="py-10">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-gold-dark">
              {f.partnersHeading}
            </p>
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-16">
              {partners.map((partner) => (
                <li key={partner.name}>
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={partner.width}
                    height={partner.height}
                    className="h-14 w-auto sm:h-16"
                  />
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </div>

      <div className="bg-blue-dark text-line-cool">
        <Container>
          <div className="grid gap-10 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
            <div>
              <div className="flex items-center gap-3">
                <Image
                  src="/logos/town-of-islip-seal.png"
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10"
                />
                <span className="font-heading text-base font-bold text-white">
                  {dict.common.siteLineTop}
                  <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                    {dict.common.siteLineBottom}
                  </span>
                </span>
              </div>
              <p className="mt-4 max-w-xs text-sm leading-relaxed">{f.rights}</p>
            </div>

            {footerNav.map((group) => (
              <nav key={group.headingKey} aria-label={f[group.headingKey]}>
                <h2 className="font-heading text-sm font-bold uppercase tracking-wide text-gold">
                  {f[group.headingKey]}
                </h2>
                <ul className="mt-3 space-y-2 text-sm">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={localizedPath(locale, item.href)}
                        className="text-line-cool transition-colors hover:text-white hover:underline underline-offset-2"
                      >
                        {nav[item.key]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <Rule onDark />

          <div className="flex flex-col gap-2 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {f.copyright} {dict.common.affiliation}.
            </p>
            <p className="text-gold">{f.languagesNote}</p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
