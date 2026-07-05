import { ChevronDown } from "lucide-react";
import { localizedPath } from "@/i18n/config";
import { loadLocale, type LocaleParams } from "@/i18n/page";
import { buildMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Rule } from "@/components/ui/rule";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { AskForm } from "@/components/faq/ask-form";

export async function generateMetadata({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  return buildMetadata({
    locale,
    title: dict.faq.title,
    description: dict.faq.intro,
    siteName: dict.common.siteName,
    path: "/about/faq",
  });
}

export default async function FaqPage({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  const faq = dict.faq;

  return (
    <Section size="narrow">
      <Breadcrumb
        homeLabel={dict.common.home}
        label={dict.common.breadcrumbLabel}
        homeHref={localizedPath(locale, "/")}
        trail={[
          { label: dict.aboutProject.breadcrumb, href: localizedPath(locale, "/about") },
          { label: faq.breadcrumb },
        ]}
      />

      <div className="mt-6 measure">
        <Eyebrow>{faq.eyebrow}</Eyebrow>
        <h1 className="text-3xl sm:text-4xl">{faq.title}</h1>
        <p className="mt-4 leading-relaxed text-muted">{faq.intro}</p>
      </div>

      <div className="mt-8 measure divide-y divide-line border-y border-line">
        {faq.items.map((item, i) => (
          <details key={item.q} id={`faq-${i}`} className="group scroll-mt-24 py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-lg font-bold text-blue [&::-webkit-details-marker]:hidden">
              {item.q}
              <ChevronDown
                aria-hidden
                className="h-5 w-5 shrink-0 text-muted transition-transform group-open:rotate-180"
              />
            </summary>
            <p className="mt-3 leading-relaxed text-ink/90">{item.a}</p>
          </details>
        ))}
      </div>

      <Rule className="mt-14" />

      <div className="mt-10 measure">
        <Eyebrow>{faq.askEyebrow}</Eyebrow>
        <h2 className="text-2xl sm:text-3xl">{faq.askTitle}</h2>
        <p className="mt-3 leading-relaxed text-muted">{faq.askBody}</p>
        <div className="mt-6">
          <AskForm
            labels={{
              nameLabel: faq.nameLabel,
              emailLabel: faq.emailLabel,
              questionLabel: faq.questionLabel,
              requiredHint: faq.requiredHint,
              submit: faq.submit,
              sending: faq.sending,
              successTitle: faq.successTitle,
              successBody: faq.successBody,
              errorInvalid: faq.errorInvalid,
              errorGeneric: faq.errorGeneric,
              errorNotConfigured: faq.errorNotConfigured,
              privacyNote: faq.privacyNote,
            }}
          />
        </div>
      </div>
    </Section>
  );
}
