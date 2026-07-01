import { Mail } from "lucide-react";
import { localizedPath } from "@/i18n/config";
import { loadLocale, type LocaleParams } from "@/i18n/page";
import { buildMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Breadcrumb } from "@/components/layout/breadcrumb";

export async function generateMetadata({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  return buildMetadata({
    locale,
    title: dict.contact.title,
    description: dict.contact.lede,
    siteName: dict.common.siteName,
    path: "/about/contact",
  });
}

export default async function ContactPage({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  const contact = dict.contact;

  return (
    <Section size="narrow">
      <Breadcrumb
        homeLabel={dict.common.home}
        homeHref={localizedPath(locale, "/")}
        trail={[
          { label: dict.aboutProject.breadcrumb, href: localizedPath(locale, "/about") },
          { label: contact.breadcrumb },
        ]}
      />

      <div className="mt-6 measure">
        <Eyebrow>{contact.eyebrow}</Eyebrow>
        <h1 className="text-3xl sm:text-4xl">{contact.title}</h1>
        <p className="mt-5 text-lg font-semibold text-ink">{contact.lede}</p>

        <ul className="mt-8 divide-y divide-line overflow-hidden rounded-sm border border-line">
          {contact.contacts.map((person) => (
            <li key={person.email} className="bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-gold-dark">{person.label}</p>
              <p className="mt-1 font-semibold text-ink">{person.name}</p>
              <a
                href={`mailto:${person.email}`}
                className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-blue hover:underline underline-offset-2"
              >
                <Mail aria-hidden className="h-4 w-4" />
                {person.email}
              </a>
            </li>
          ))}
        </ul>

        <h2 className="mt-10 text-xl sm:text-2xl">{contact.correctionTitle}</h2>
        <p className="mt-3 leading-relaxed text-ink/90">{contact.correctionBody}</p>

        <h2 className="mt-10 text-xl sm:text-2xl">{contact.contributeTitle}</h2>
        <p className="mt-3 leading-relaxed text-ink/90">{contact.contributeBody}</p>
      </div>
    </Section>
  );
}
