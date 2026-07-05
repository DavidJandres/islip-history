import { notFound } from "next/navigation";
import Link from "next/link";
import { localizedPath, isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/metadata";
import { lessonSlugs, getLesson } from "@/lib/teaching";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Rule } from "@/components/ui/rule";
import { Notice } from "@/components/ui/notice";
import { Breadcrumb } from "@/components/layout/breadcrumb";

type LessonParams = { params: Promise<{ locale: string; lesson: string }> };

export function generateStaticParams() {
  return lessonSlugs.map((lesson) => ({ lesson }));
}

async function resolve(params: LessonParams["params"]) {
  const { locale, lesson: slug } = await params;
  const lesson = getLesson(slug);
  if (!isLocale(locale) || !lesson) notFound();
  return { locale: locale as Locale, lesson, dict: getDictionary(locale) };
}

export async function generateMetadata({ params }: LessonParams) {
  const { locale, lesson, dict } = await resolve(params);
  return buildMetadata({
    locale,
    title: `${lesson.title} · ${dict.teach.lessonPlans.title}`,
    description: lesson.aim,
    siteName: dict.common.siteName,
    path: `/teach/lesson-plans/${lesson.id}`,
  });
}

// A labeled section (gold uppercase h2) used throughout the lesson.
function LabeledSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-dark">{label}</h2>
      <div className="mt-2 leading-relaxed text-ink/90">{children}</div>
    </section>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item} className="rounded-sm border border-line bg-white px-2.5 py-1 text-sm text-ink">
          {item}
        </li>
      ))}
    </ul>
  );
}

function Bullets({ items, ordered = false }: { items: string[]; ordered?: boolean }) {
  const cls = "space-y-1.5 pl-5 " + (ordered ? "list-decimal" : "list-disc");
  return ordered ? (
    <ol className={cls}>{items.map((i) => <li key={i}>{i}</li>)}</ol>
  ) : (
    <ul className={cls}>{items.map((i) => <li key={i}>{i}</li>)}</ul>
  );
}

export default async function LessonPage({ params }: LessonParams) {
  const { locale, lesson: l, dict } = await resolve(params);
  const t = dict.teach;
  const L = t.lessonLabels;

  return (
    <Section size="narrow">
      <Breadcrumb
        homeLabel={dict.common.home}
        label={dict.common.breadcrumbLabel}
        homeHref={localizedPath(locale, "/")}
        trail={[
          { label: t.breadcrumb, href: localizedPath(locale, "/teach") },
          { label: t.lessonPlans.breadcrumb, href: localizedPath(locale, "/teach/lesson-plans") },
          { label: l.title },
        ]}
      />

      <div className="mt-6 measure">
        <Eyebrow>{`${l.grade} · ${l.course}`}</Eyebrow>
        <h1 className="text-3xl sm:text-4xl">{l.title}</h1>

        <div className="mt-5 rounded-sm border-l-4 border-gold bg-gray p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-dark">{L.aim}</p>
          <p className="mt-1 text-lg leading-relaxed text-ink">{l.aim}</p>
        </div>

        <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted">
          <div><dt className="inline font-semibold text-ink">{L.grade}: </dt><dd className="inline">{l.grade}</dd></div>
          <div><dt className="inline font-semibold text-ink">{L.time}: </dt><dd className="inline">{l.time}</dd></div>
        </dl>
        <p className="mt-3 text-sm italic text-muted">{t.lessonPlans.stonyBrookCredit}</p>

        {locale !== defaultLocale && (
          <Notice intent="editorial" title={t.contentPendingTitle} className="mt-5">
            <strong className="font-semibold">{t.contentPendingTitle}.</strong> {t.contentPending}
          </Notice>
        )}

        {/* NYSED standard */}
        <div className="mt-6 rounded-sm border border-line bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-dark">{L.nysed}</p>
          <p className="mt-1 font-semibold text-ink">
            {l.nysed.code} · {l.nysed.title}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-ink/90">{l.nysed.text}</p>
        </div>

        <LabeledSection label={L.ccStandards}>
          <ul className="space-y-1.5">
            {l.ccStandards.map((c) => (
              <li key={c.code}>
                <span className="font-semibold text-ink">{c.code}:</span> {c.text}
              </li>
            ))}
          </ul>
        </LabeledSection>

        <LabeledSection label={L.ssPractices}>
          <Chips items={l.ssPractices} />
        </LabeledSection>

        <LabeledSection label={L.mainIdeas}>
          <Bullets items={l.mainIdeas} ordered />
        </LabeledSection>

        <LabeledSection label={L.ssSkills}>
          <Bullets items={l.ssSkills} />
        </LabeledSection>

        <LabeledSection label={L.rationale}>
          <p className="font-semibold text-ink">{L.comesAfter}</p>
          <Bullets items={l.rationale.comesAfter} />
          <p className="mt-3 font-semibold text-ink">{L.focus}</p>
          <p>{l.rationale.focus}</p>
          <p className="mt-3 font-semibold text-ink">{L.prepares}</p>
          <Bullets items={l.rationale.prepares} />
        </LabeledSection>

        <LabeledSection label={L.priorKnowledge}>
          <p className="font-semibold text-ink">{L.likelyKnow}</p>
          <Bullets items={l.priorKnowledge.likelyKnow} />
          <p className="mt-3 font-semibold text-ink">{L.misconceptions}</p>
          <Bullets items={l.priorKnowledge.misconceptions} />
          <p className="mt-3 font-semibold text-ink">{L.prerequisiteSkills}</p>
          <Bullets items={l.priorKnowledge.prerequisiteSkills} />
          <p className="mt-3 font-semibold text-ink">{L.masteryChecks}</p>
          <Bullets items={l.priorKnowledge.masteryChecks} />
        </LabeledSection>

        <LabeledSection label={L.iep}>
          <p><span className="font-semibold text-ink">{L.iepStudent}: </span>{l.iep.profile}</p>
          <p className="mt-2 font-semibold text-ink">{L.modifications}</p>
          <Bullets items={l.iep.modifications} />
        </LabeledSection>

        <LabeledSection label={L.keyTerms}>
          <Chips items={l.keyTerms} />
        </LabeledSection>
      </div>

      {/* Lesson flow */}
      <div className="mt-12 measure">
        <h2 className="text-2xl font-bold text-ink">{L.lessonFlow}</h2>
        <div className="mt-6 space-y-8">
          {l.segments.map((s, i) => (
            <article key={i} className="rounded-sm border border-line bg-white p-5">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="rounded-sm bg-blue px-2 py-0.5 text-xs font-bold text-white">
                  {s.minutes} {L.min}
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-gold-dark">{s.kind}</span>
              </div>
              <h3 className="mt-2 font-heading text-lg font-bold text-ink">{s.title}</h3>
              {s.transition && <p className="mt-2 italic text-muted">{s.transition}</p>}

              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-gold-dark">{L.teacherWillDo}</p>
                  <div className="mt-2"><Bullets items={s.teacherWillDo} /></div>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-gold-dark">{L.studentsWillDo}</p>
                  <div className="mt-2"><Bullets items={s.studentsWillDo} /></div>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-ink/90">
                <span className="font-semibold text-ink">{L.alignment}: </span>{s.alignment}
              </p>

              {s.scaffoldingQuestions && s.scaffoldingQuestions.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-gold-dark">{L.scaffolding}</p>
                  <div className="mt-1"><Bullets items={s.scaffoldingQuestions} /></div>
                </div>
              )}
              {s.higherOrderQuestions && s.higherOrderQuestions.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-gold-dark">{L.higherOrder}</p>
                  <div className="mt-1"><Bullets items={s.higherOrderQuestions} /></div>
                </div>
              )}
              {s.ccStandards && s.ccStandards.length > 0 && (
                <p className="mt-3 text-sm text-muted">
                  <span className="font-semibold text-ink">{L.ccStandards}: </span>{s.ccStandards.join(", ")}
                </p>
              )}
              {s.assessment && (
                <p className="mt-2 text-sm leading-relaxed text-ink/90">
                  <span className="font-semibold text-ink">{L.segmentAssessment}: </span>{s.assessment}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>

      <div className="mt-12 measure">
        {/* Homework */}
        <LabeledSection label={L.homework}>
          <p>{l.homework.assignment}</p>
          <p className="mt-3 font-semibold text-ink">{L.requirements}</p>
          <Bullets items={l.homework.requirements} />
          <div className="mt-4 rounded-sm border-l-4 border-gold bg-gray p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-dark">{L.answerKey}</p>
            <div className="mt-2"><Bullets items={l.homework.answerKey} /></div>
          </div>
        </LabeledSection>

        {/* Related pages */}
        <LabeledSection label={t.labels.relatedPages}>
          <ul className="flex flex-wrap gap-2">
            {l.relatedPages.map((link) => (
              <li key={`${link.href}::${link.label}`}>
                <Link
                  href={localizedPath(locale, link.href)}
                  className="inline-flex items-center rounded-sm border border-line px-3 py-1.5 text-sm font-semibold text-blue transition-colors hover:border-blue hover:bg-gray"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </LabeledSection>

        <Notice intent="editorial" title={t.labels.teacherNote} className="mt-8">
          <strong className="font-semibold">{t.labels.teacherNote}.</strong> {l.teacherNote}
        </Notice>

        <div className="mt-6">
          <Chips items={l.themes} />
        </div>
      </div>

      <Rule className="mt-14" />
      <div className="mt-6">
        <a
          href={localizedPath(locale, "/teach/lesson-plans")}
          className="text-sm font-semibold text-blue hover:underline"
        >
          {L.backToLessons}
        </a>
      </div>
    </Section>
  );
}
