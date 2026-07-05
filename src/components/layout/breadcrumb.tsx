import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  label: string;
  href?: string; // omit on the current (last) crumb
}

// Home is prepended automatically; the last crumb is the current page. Hrefs
// passed in are already locale-prefixed by the caller. `label` names the nav
// landmark; pass a localized string so it isn't announced in English on /es.
export function Breadcrumb({
  homeLabel,
  homeHref,
  trail,
  label = "Breadcrumb",
}: {
  homeLabel: string;
  homeHref: string;
  trail: Crumb[];
  label?: string;
}) {
  const crumbs: Crumb[] = [{ label: homeLabel, href: homeHref }, ...trail];

  return (
    <nav aria-label={label} className="text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-muted">
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li key={crumb.label} className="flex items-center gap-1.5">
              {crumb.href && !isLast ? (
                <Link
                  href={crumb.href}
                  className="hover:text-blue hover:underline underline-offset-2"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span aria-current="page" className="font-medium text-ink">
                  {crumb.label}
                </span>
              )}
              {!isLast ? (
                <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 text-line" />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
