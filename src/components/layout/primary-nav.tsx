"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { primaryNav, type NavItem } from "@/lib/site";
import { localizedPath, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

interface PrimaryNavProps {
  locale: Locale;
  labels: Record<string, string>;
  summaries: Record<string, string>;
  // Labels for a "people-by-category" style dropdown built from an item's
  // `sectionKeys` (resolved from dict.people.sections).
  sectionLabels: Record<string, string>;
  menuLabel: string;
  closeLabel: string;
}

const isActive = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(href + "/");

interface DropdownEntry {
  href: string;
  label: string;
  summary?: string;
}

// A nav item's dropdown can come from either sub-routes (`children`, e.g.
// Explore) or in-page section anchors (`sectionKeys`, e.g. People by category).
// Both render the same way; only the target differs (a real route vs a #anchor
// on the item's own page).
function dropdownEntries(
  item: NavItem,
  locale: Locale,
  labels: Record<string, string>,
  summaries: Record<string, string>,
  sectionLabels: Record<string, string>,
): DropdownEntry[] {
  if (item.children?.length) {
    return item.children.map((c) => ({
      href: localizedPath(locale, c.href),
      label: labels[c.key],
      summary: summaries[c.key],
    }));
  }
  if (item.sectionKeys?.length) {
    return item.sectionKeys.map((k) => ({
      href: localizedPath(locale, `${item.href}#section-${k}`),
      label: sectionLabels[k],
    }));
  }
  return [];
}

export function PrimaryNav({
  locale,
  labels,
  summaries,
  sectionLabels,
  menuLabel,
  closeLabel,
}: PrimaryNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the menu after navigating.
  useEffect(() => setOpen(false), [pathname]);

  // Escape closes the menu and returns focus to the button.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <nav aria-label="Primary" className="border-y border-line bg-paper">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <ul className="hidden items-stretch md:flex">
          {primaryNav.map((item) => (
            <DesktopItem
              key={item.href}
              item={item}
              pathname={pathname}
              locale={locale}
              labels={labels}
              summaries={summaries}
              sectionLabels={sectionLabels}
            />
          ))}
        </ul>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="flex items-center gap-2 py-3 text-sm font-semibold text-blue md:hidden"
        >
          {open ? <X aria-hidden className="h-5 w-5" /> : <Menu aria-hidden className="h-5 w-5" />}
          {open ? closeLabel : menuLabel}
        </button>
      </div>

      {/* Mobile panel: a CSS grid-rows animation (0fr -> 1fr) replaces a JS
          animation library. `inert` when closed keeps the collapsed links out
          of the tab order; reduced-motion users get an instant open via the
          global transition reset. */}
      <div
        id="mobile-nav"
        inert={!open || undefined}
        className={cn(
          "grid overflow-hidden transition-[grid-template-rows] duration-200 ease-out md:hidden",
          open ? "grid-rows-[1fr] border-t border-line" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <ul className="px-5 py-3 sm:px-6">
            {primaryNav.map((item) => (
              <MobileItem
                key={item.href}
                item={item}
                pathname={pathname}
                locale={locale}
                labels={labels}
                summaries={summaries}
                sectionLabels={sectionLabels}
              />
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

function DesktopItem({
  item,
  pathname,
  locale,
  labels,
  summaries,
  sectionLabels,
}: {
  item: NavItem;
  pathname: string;
  locale: Locale;
  labels: Record<string, string>;
  summaries: Record<string, string>;
  sectionLabels: Record<string, string>;
}) {
  const href = localizedPath(locale, item.href);
  const active = isActive(pathname, href);
  const entries = dropdownEntries(item, locale, labels, summaries, sectionLabels);

  // State-driven flyout instead of CSS-only :hover/:focus-within, so that
  // (a) aria-expanded reports the real state to screen readers,
  // (b) Escape dismisses hover- or focus-triggered content without moving the
  //     pointer or focus (WCAG 2.1 AA, 1.4.13), and
  // (c) hovering, tabbing to the item, and tabbing through the flyout links
  //     all behave identically. Focus leaving the item closes it again.
  const [open, setOpen] = useState(false);
  const parentLinkRef = useRef<HTMLAnchorElement>(null);
  const hasFlyout = entries.length > 0;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && open) {
      e.preventDefault();
      e.stopPropagation();
      setOpen(false);
      parentLinkRef.current?.focus();
    }
  };

  return (
    <li
      className="relative"
      onMouseEnter={hasFlyout ? () => setOpen(true) : undefined}
      onMouseLeave={hasFlyout ? () => setOpen(false) : undefined}
      onFocus={hasFlyout ? () => setOpen(true) : undefined}
      onBlur={
        hasFlyout
          ? (e) => {
              // Close only when focus fully leaves the item and its flyout.
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
            }
          : undefined
      }
      onKeyDown={hasFlyout ? onKeyDown : undefined}
    >
      <Link
        ref={parentLinkRef}
        href={href}
        aria-current={active ? "page" : undefined}
        aria-haspopup={hasFlyout ? "true" : undefined}
        aria-expanded={hasFlyout ? open : undefined}
        className={cn(
          "flex items-center gap-1 border-b-2 px-4 py-4 text-sm font-semibold transition-colors",
          active
            ? "border-gold text-blue"
            : "border-transparent text-ink hover:border-line hover:text-blue",
        )}
      >
        {labels[item.key]}
        {hasFlyout && (
          <ChevronDown
            aria-hidden
            className={cn(
              "h-3.5 w-3.5 text-muted transition-transform",
              open && "rotate-180",
            )}
          />
        )}
      </Link>

      {hasFlyout && (
        <div
          className={cn(
            "absolute left-0 top-full z-40 w-72 rounded-sm border border-line bg-white p-2 transition-all duration-150",
            open
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-1 opacity-0",
          )}
        >
          {entries.map((entry) => {
            const entryActive = pathname === entry.href;
            return (
              <Link
                key={entry.href}
                href={entry.href}
                aria-current={entryActive ? "page" : undefined}
                tabIndex={open ? undefined : -1}
                className={cn(
                  "block rounded-sm px-3 py-2 hover:bg-gray",
                  entryActive && "border-l-2 border-gold bg-gray",
                )}
              >
                <span className="text-sm font-semibold text-blue">{entry.label}</span>
                {entry.summary && (
                  <span className="mt-0.5 block text-xs leading-snug text-muted">
                    {entry.summary}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </li>
  );
}

function MobileItem({
  item,
  pathname,
  locale,
  labels,
  summaries,
  sectionLabels,
}: {
  item: NavItem;
  pathname: string;
  locale: Locale;
  labels: Record<string, string>;
  summaries: Record<string, string>;
  sectionLabels: Record<string, string>;
}) {
  const href = localizedPath(locale, item.href);
  const active = isActive(pathname, href);
  const entries = dropdownEntries(item, locale, labels, summaries, sectionLabels);

  return (
    <li className="border-b border-line last:border-0">
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className={cn("block py-3 text-base font-semibold", active ? "text-blue" : "text-ink")}
      >
        {labels[item.key]}
      </Link>
      {entries.length > 0 && (
        <ul className="-mt-1 mb-2 ml-3 space-y-1 border-l border-line pl-3">
          {entries.map((entry) => {
            const entryActive = pathname === entry.href;
            return (
              <li key={entry.href}>
                <Link
                  href={entry.href}
                  aria-current={entryActive ? "page" : undefined}
                  className={cn(
                    "block py-1.5 text-sm hover:text-blue",
                    entryActive ? "font-semibold text-blue" : "text-muted",
                  )}
                >
                  {entry.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}
