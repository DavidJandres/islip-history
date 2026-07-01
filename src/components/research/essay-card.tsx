import type { Essay } from "@/lib/essays";

// An essay card: title and author, a plain-language summary, the key excerpts in
// an expandable panel (curated, not the full modern essay), a "why it matters"
// block, and the source note.

interface EssayLabels {
  keyExcerpts: string;
  whyMatters: string;
}

export function EssayCard({
  essay,
  labels,
}: {
  essay: Essay;
  labels: EssayLabels;
}) {
  return (
    <article className="rounded-sm border border-line bg-white p-5 sm:p-6">
      <h3 className="font-heading text-lg font-bold text-blue sm:text-xl">
        {essay.title}
      </h3>
      <p className="mt-1 text-sm font-semibold text-gold-dark">{essay.author}</p>

      <p className="mt-3 leading-relaxed text-ink/90">{essay.summary}</p>

      {essay.excerpts.length > 0 && (
        <details className="group mt-4">
          <summary className="inline-flex cursor-pointer list-none items-center gap-1 text-sm font-semibold text-blue [&::-webkit-details-marker]:hidden">
            <span className="transition-transform group-open:rotate-90">›</span>
            {labels.keyExcerpts}
          </summary>
          <div className="mt-3 space-y-3 border-l-2 border-gold/40 pl-4 text-[0.95rem] leading-relaxed text-ink/90">
            {essay.excerpts.map((ex, i) => (
              <p key={i} className="italic">
                “{ex}”
              </p>
            ))}
          </div>
        </details>
      )}

      {essay.whyItMatters && (
        <div className="mt-4 rounded-sm bg-gray p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gold-dark">
            {labels.whyMatters}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-ink/90">
            {essay.whyItMatters}
          </p>
        </div>
      )}

      <p className="mt-3 text-xs leading-snug text-muted">{essay.citation}</p>
    </article>
  );
}
