import Link from "next/link";
import { localizedPath, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

// A labeled block used across the teaching pages: a small gold uppercase label
// over its content. Kept below the page h1 and each item's h2, so the label is
// an h3 in the outline. Teachers can skim by these labels.
export function TeachField({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mt-6", className)}>
      <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-dark">
        {label}
      </h3>
      <div className="mt-2 leading-relaxed text-ink/90">{children}</div>
    </div>
  );
}

// An unordered labeled list (learning goals, materials).
export function TeachList({ label, items }: { label: string; items: string[] }) {
  return (
    <TeachField label={label}>
      <ul className="list-disc space-y-1.5 pl-5">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </TeachField>
  );
}

// An ordered labeled list (discussion / sourcing / close-reading questions).
export function TeachSteps({ label, items }: { label: string; items: string[] }) {
  return (
    <TeachField label={label}>
      <ol className="list-decimal space-y-1.5 pl-5">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
    </TeachField>
  );
}

// A labeled row of "related pages" chips. Hrefs are locale-agnostic and
// prefixed here at render.
export function TeachRelated({
  label,
  links,
  locale,
}: {
  label: string;
  links: { label: string; href: string }[];
  locale: Locale;
}) {
  return (
    <TeachField label={label}>
      <ul className="flex flex-wrap gap-2">
        {links.map((link) => (
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
    </TeachField>
  );
}
