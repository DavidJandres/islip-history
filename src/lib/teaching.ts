// Teaching Materials content, kept as data so the section pages, the search
// corpus, and the integrity check all read one source. Prose is English (the
// canonical language); the Spanish /teach pages render the shell in Spanish and
// show a "classroom materials in preparation" notice over this English content,
// exactly as the exhibit panels do before a translation lands. Anchors:
//   lessons          -> id="lesson-<id>"      on /teach/lesson-plans
//   source activities-> id="activity-<id>"    on /teach/primary-source-activities
//   timeline acts    -> id="tactivity-<id>"   on /teach/timeline-activities
// Every href in relatedPages / source MUST be a real route+anchor on this site;
// scripts/integrity-check.ts validates them all.

// A cross-link to another page on the site. href is locale-agnostic (prefixed
// at render); label is English, matching the source content.
export interface TeachLink {
  label: string;
  href: string;
}

// A NY P-12 Common Core literacy standard (RH/WHST), cited on the lesson.
export interface CCStandard {
  code: string;
  text: string;
}

// One timed segment of the lesson flow (Do-Now/Hook, a learning activity, or
// the closing), mirroring the two-column "teacher will do / students will do"
// structure of the Stony Brook template.
export interface LessonSegment {
  minutes: number;
  kind: string;
  title: string;
  transition?: string;
  teacherWillDo: string[];
  studentsWillDo: string[];
  alignment: string;
  scaffoldingQuestions?: string[];
  higherOrderQuestions?: string[];
  ccStandards?: string[];
  assessment?: string;
}

// A full lesson plan on the Stony Brook University Social Studies Lesson Plan
// Template (adapted with credit), pinned to one specific NYSED Framework Key
// Idea and grade so a teacher can drop it into the right course.
export interface LessonPlan {
  id: string;
  number: number;
  grade: string;
  course: string;
  time: string;
  title: string;
  aim: string;
  mainIdeas: string[];
  ssSkills: string[];
  ssPractices: string[];
  rationale: { comesAfter: string[]; focus: string; prepares: string[] };
  priorKnowledge: {
    likelyKnow: string[];
    misconceptions: string[];
    prerequisiteSkills: string[];
    masteryChecks: string[];
  };
  nysed: { code: string; title: string; text: string };
  ccStandards: CCStandard[];
  iep: { profile: string; modifications: string[] };
  keyTerms: string[];
  segments: LessonSegment[];
  homework: { assignment: string; requirements: string[]; answerKey: string[] };
  relatedPages: TeachLink[];
  teacherNote: string;
  themes: string[];
}

export interface VocabTerm {
  term: string;
  definition: string;
}

export interface SourceActivity {
  id: string;
  title: string;
  source: TeachLink;
  excerpt: string;
  excerptAttribution: string;
  context: string;
  vocabulary: VocabTerm[];
  sourcingQuestions: string[];
  closeReadingQuestions: string[];
  historicalThinkingQuestions: string[];
  todayQuestion: string;
  writingPrompt: string;
}

export interface ExhibitGuidePanel {
  slug: string;
  title: string;
  question: string;
}

export interface ExhibitGuide {
  beforeReading: string;
  panels: ExhibitGuidePanel[];
  surprised: string;
  included: string;
  leftOut: string;
  finalReflection: string;
}

export interface TimelineActivity {
  id: string;
  number: number;
  title: string;
  skill: string;
  steps: string[];
  example?: string;
  relatedPages: TeachLink[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Content lives in teaching-content.json (drafted by grounded writer agents,
// caution + link audited, then reviewed). Kept as JSON so the historical
// transcriptions and quotations need no escaping, and so the overclaim grep in
// scripts/qa.sh scans it the same as the .ts data. Every href in it is
// validated by scripts/integrity-check.ts.
// ─────────────────────────────────────────────────────────────────────────────

import content from "./teaching-content.json";

export const lessonPlans = content.lessonPlans as LessonPlan[];
export const sourceActivities = content.sourceActivities as SourceActivity[];
export const exhibitGuide = content.exhibitGuide as ExhibitGuide;
export const timelineActivities = content.timelineActivities as TimelineActivity[];

// Every internal href these materials point at, for the integrity check to
// resolve against real routes and anchors (like exhibit panelRelated).
export const teachingLinks: TeachLink[] = [
  ...lessonPlans.flatMap((l) => l.relatedPages),
  ...sourceActivities.map((a) => a.source),
  ...timelineActivities.flatMap((t) => t.relatedPages),
];

// Each full lesson gets its own printable route: /teach/lesson-plans/<id>.
export const lessonSlugs = lessonPlans.map((l) => l.id);

export function isLessonSlug(id: string): boolean {
  return lessonPlans.some((l) => l.id === id);
}

export function getLesson(id: string): LessonPlan | undefined {
  return lessonPlans.find((l) => l.id === id);
}

// Lessons grouped by grade, in roster order, for the index page.
export function lessonsByGrade(): { grade: string; lessons: LessonPlan[] }[] {
  const order: string[] = [];
  const map = new Map<string, LessonPlan[]>();
  for (const l of lessonPlans) {
    if (!map.has(l.grade)) {
      map.set(l.grade, []);
      order.push(l.grade);
    }
    map.get(l.grade)!.push(l);
  }
  return order.map((grade) => ({ grade, lessons: map.get(grade)! }));
}
