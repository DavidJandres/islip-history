import type { PrimarySource, SourceStatus } from "@/lib/primary-sources";

// A single primary-source card: a short context note anyone can read, the
// word-for-word document text tucked into an expandable panel (so long
// transcriptions don't overwhelm the page), a "why it matters" block, and the
// citation. Status is shown as a small badge when a source is not final.

interface SourceLabels {
  readSource: string;
  whyMatters: string;
  status: Record<SourceStatus, string>;
}

const STATUS_STYLE: Record<SourceStatus, string> = {
  verified: "border-blue/30 bg-blue/5 text-blue",
  draft: "border-line bg-gray text-muted",
  review: "border-gold/40 bg-gold/10 text-gold-dark",
  pending: "border-gold/40 bg-gold/10 text-gold-dark",
};

export function SourceCard({
  source,
  labels,
}: {
  source: PrimarySource;
  labels: SourceLabels;
}) {
  return (
    <article
      id={`source-${source.id}`}
      className="scroll-mt-24 rounded-sm border border-line bg-white p-5 sm:p-6"
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-gold-dark">
          {source.type}
        </span>
        {source.date && <span className="text-xs text-muted">{source.date}</span>}
        {source.status && (
          <span
            className={`rounded-sm border px-2 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wide ${STATUS_STYLE[source.status]}`}
          >
            {labels.status[source.status]}
          </span>
        )}
      </div>

      <h3 className="mt-2 font-heading text-lg font-bold text-blue sm:text-xl">
        {source.title}
      </h3>

      <p className="mt-2 leading-relaxed text-ink/90">{source.context}</p>

      <details className="group mt-4">
        <summary className="inline-flex cursor-pointer list-none items-center gap-1 text-sm font-semibold text-blue [&::-webkit-details-marker]:hidden">
          <span className="transition-transform group-open:rotate-90">›</span>
          {labels.readSource}
        </summary>
        <div className="mt-3 space-y-3 border-l-2 border-gold/40 pl-4 text-[0.95rem] leading-relaxed text-ink/90">
          {source.excerpts.map((ex, i) => (
            <div key={i}>
              {ex.label && (
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">
                  {ex.label}
                </p>
              )}
              <p className="whitespace-pre-line italic">{ex.text}</p>
            </div>
          ))}
        </div>
      </details>

      {source.whyItMatters && (
        <div className="mt-4 rounded-sm bg-gray p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gold-dark">
            {labels.whyMatters}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-ink/90">
            {source.whyItMatters}
          </p>
        </div>
      )}

      <p className="mt-3 text-xs leading-snug text-muted">{source.citation}</p>
    </article>
  );
}
