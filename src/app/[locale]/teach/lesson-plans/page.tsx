import { FileText } from "lucide-react";
import { localizedPath, defaultLocale } from "@/i18n/config";
import { loadLocale, type LocaleParams } from "@/i18n/page";
import { buildMetadata } from "@/lib/metadata";
import { lessonsByGrade } from "@/lib/teaching";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Rule } from "@/components/ui/rule";
import { Notice } from "@/components/ui/notice";
import { Card } from "@/components/ui/card";
import { Breadcrumb } from "@/components/layout/breadcrumb";

export async function generateMetadata({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  const t = dict.teach.lessonPlans;
  return buildMetadata({
    locale,
    title: `${t.title} · ${dict.teach.title}`,
    description: t.intro[0],
    siteName: dict.common.siteName,
    path: "/teach/lesson-plans",
  });
}

export default async function LessonPlansPage({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  const t = dict.teach;
  const p = t.lessonPlans;
  const groups = lessonsByGrade();

  return (
    <Section size="narrow">
      <Breadcrumb
        homeLabel={dict.common.home}
        label={dict.common.breadcrumbLabel}
        homeHref={localizedPath(locale, "/")}
        trail={[
          { label: t.breadcrumb, href: localizedPath(locale, "/teach") },
          { label: p.breadcrumb },
        ]}
      />

      <div className="mt-6 measure">
        <Eyebrow>{t.eyebrow}</Eyebrow>
        <h1 className="text-3xl sm:text-4xl">{p.title}</h1>
        {p.intro.map((para) => (
          <p key={para} className="mt-4 text-lg leading-relaxed text-ink/90">
            {para}
          </p>
        ))}
        <p className="mt-4 text-sm italic text-muted">
          {p.stonyBrookCredit}{" "}
          <a
            href="/standards/stony-brook-lesson-template.pdf"
            className="font-semibold not-italic text-blue hover:underline"
          >
            {p.stonyBrookTemplateLabel} ({p.standards.pdfLabel})
          </a>
        </p>
        {locale !== defaultLocale && (
          <Notice intent="editorial" title={t.contentPendingTitle} className="mt-5">
            <strong className="font-semibold">{t.contentPendingTitle}.</strong> {t.contentPending}
          </Notice>
        )}
      </div>

      {/* Standards & alignment */}
      <div className="mt-10 measure rounded-sm border border-line bg-gray p-5">
        <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-dark">
          {p.standards.heading}
        </h2>
        <p className="mt-2 leading-relaxed text-ink/90">{p.standards.blurb}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">{p.standards.cclsNote}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          <li>
            <a
              href="/standards/nys-ss-framework-k-8.pdf"
              className="inline-flex items-center gap-1.5 rounded-sm border border-line bg-white px-3 py-1.5 text-sm font-semibold text-blue hover:border-blue"
            >
              <FileText aria-hidden className="h-4 w-4" />
              {p.standards.frameworkK8} ({p.standards.pdfLabel})
            </a>
          </li>
          <li>
            <a
              href="/standards/nys-ss-framework-9-12.pdf"
              className="inline-flex items-center gap-1.5 rounded-sm border border-line bg-white px-3 py-1.5 text-sm font-semibold text-blue hover:border-blue"
            >
              <FileText aria-hidden className="h-4 w-4" />
              {p.standards.framework912} ({p.standards.pdfLabel})
            </a>
          </li>
        </ul>
      </div>

      {/* Lessons grouped by grade */}
      {groups.map((group) => (
        <section key={group.grade} className="mt-12" aria-labelledby={`grade-${group.grade.replace(/\s+/g, "-")}`}>
          <h2
            id={`grade-${group.grade.replace(/\s+/g, "-")}`}
            className="text-2xl font-bold text-ink"
          >
            {group.grade}
          </h2>
          <p className="mt-1 text-sm text-muted">{group.lessons[0].course}</p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {group.lessons.map((l) => (
              <Card
                key={l.id}
                eyebrow={`${t.lessonLabels.standardBadge} ${l.nysed.code} · ${l.nysed.title}`}
                title={l.title}
                href={localizedPath(locale, `/teach/lesson-plans/${l.id}`)}
              >
                <span className="block">{l.aim}</span>
                <span className="mt-2 block text-sm text-muted">{l.time}</span>
              </Card>
            ))}
          </div>
        </section>
      ))}

      {/* Roadmap */}
      <div className="mt-14 measure rounded-sm border-l-4 border-gold bg-gray p-5">
        <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-dark">
          {p.roadmap.heading}
        </h2>
        <p className="mt-2 leading-relaxed text-ink/90">{p.roadmap.intro}</p>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-ink/90">
          {p.roadmap.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <Rule className="mt-14" />
      <div className="mt-6">
        <a
          href={localizedPath(locale, "/teach")}
          className="text-sm font-semibold text-blue hover:underline"
        >
          {t.labels.backToTeach}
        </a>
      </div>
    </Section>
  );
}
