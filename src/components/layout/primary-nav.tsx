"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { primaryNav, type NavItem } from "@/lib/site";
import type { SubmenuEntry } from "@/lib/nav-submenus";
import { localizedPath, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

interface PrimaryNavProps {
  locale: Locale;
  labels: Record<string, string>;
  summaries: Record<string, string>;
  // Labels for a "people-by-category" style dropdown built from an item's
  // `sectionKeys` (resolved from dict.people.sections).
  sectionLabels: Record<string, string>;
  // Content-derived second-level menus, keyed by the parent's locale-agnostic
  // href (see src/lib/nav-submenus.ts). Two uses:
  //   - a TOP-LEVEL item with no children (Exhibit) becomes a one-level flyout;
  //   - a FLYOUT item (Collections, Primary Sources, Essays, Lesson Plans) gains
  //     a cascade that opens to the side.
  submenus: Record<string, SubmenuEntry[]>;
  // The localized word "submenu" (for the mobile expander's accessible name).
  submenuWord: string;
  menuLabel: string;
  closeLabel: string;
}

const isActive = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(href + "/");

interface DropdownEntry {
  href: string;
  label: string;
  summary?: string;
  // Present only for a flyout item that cascades (hrefs already localized).
  children?: SubmenuEntry[];
}

// A nav item's dropdown can come from sub-routes (`children`, e.g. Explore),
// in-page section anchors (`sectionKeys`, e.g. People by category), or a
// content-derived list keyed by the item's own href (`submenus`, e.g. Exhibit).
// A flyout item may itself carry a `children` cascade (from `submenus[href]`).
function dropdownEntries(
  item: NavItem,
  locale: Locale,
  labels: Record<string, string>,
  summaries: Record<string, string>,
  sectionLabels: Record<string, string>,
  submenus: Record<string, SubmenuEntry[]>,
): DropdownEntry[] {
  if (item.children?.length) {
    return item.children.map((c) => {
      const cascade = submenus[c.href];
      return {
        href: localizedPath(locale, c.href),
        label: labels[c.key],
        summary: summaries[c.key],
        children: cascade?.map((s) => ({
          href: localizedPath(locale, s.href),
          label: s.label,
          group: s.group,
        })),
      };
    });
  }
  if (item.sectionKeys?.length) {
    return item.sectionKeys.map((k) => ({
      href: localizedPath(locale, `${item.href}#section-${k}`),
      label: sectionLabels[k],
    }));
  }
  // A top-level item whose flyout is content-derived (Exhibit -> its 7 panels).
  const own = submenus[item.href];
  if (own?.length) {
    return own.map((s) => ({ href: localizedPath(locale, s.href), label: s.label }));
  }
  return [];
}

// A cascade/sub-list heading (e.g. a grade) is shown only when it changes.
function groupHeading(entries: SubmenuEntry[], index: number): string | null {
  const g = entries[index].group;
  if (!g) return null;
  if (index === 0) return g;
  return entries[index - 1].group === g ? null : g;
}

export function PrimaryNav({
  locale,
  labels,
  summaries,
  sectionLabels,
  submenus,
  submenuWord,
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
              submenus={submenus}
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
                submenus={submenus}
                submenuWord={submenuWord}
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
  submenus,
}: {
  item: NavItem;
  pathname: string;
  locale: Locale;
  labels: Record<string, string>;
  summaries: Record<string, string>;
  sectionLabels: Record<string, string>;
  submenus: Record<string, SubmenuEntry[]>;
}) {
  const href = localizedPath(locale, item.href);
  const active = isActive(pathname, href);
  const entries = dropdownEntries(item, locale, labels, summaries, sectionLabels, submenus);

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
    // A cascade handles (and stops) Escape while it is open; here we only get
    // Escape once the cascade is closed, so this closes the whole flyout.
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
          {entries.map((entry) => (
            <DesktopEntry
              key={entry.href}
              entry={entry}
              pathname={pathname}
              flyoutOpen={open}
            />
          ))}
        </div>
      )}
    </li>
  );
}

// Approximate width of a cascade popup; used only to decide whether it should
// open to the left instead of the right when it would run off-screen.
const CASCADE_WIDTH = 256;

function DesktopEntry({
  entry,
  pathname,
  flyoutOpen,
}: {
  entry: DropdownEntry;
  pathname: string;
  flyoutOpen: boolean;
}) {
  const children = entry.children ?? [];
  const hasCascade = children.length > 0;
  const entryActive = pathname === entry.href;

  const [open, setOpen] = useState(false);
  const [flipLeft, setFlipLeft] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  // Plain flyout link (no cascade): render exactly as the flyout always has.
  if (!hasCascade) {
    return (
      <Link
        href={entry.href}
        aria-current={entryActive ? "page" : undefined}
        tabIndex={flyoutOpen ? undefined : -1}
        className={cn(
          "block rounded-sm px-3 py-2 hover:bg-gray",
          entryActive && "border-l-2 border-gold bg-gray",
        )}
      >
        <span className="text-sm font-semibold text-blue">{entry.label}</span>
        {entry.summary && (
          <span className="mt-0.5 block text-xs leading-snug text-muted">{entry.summary}</span>
        )}
      </Link>
    );
  }

  const reveal = () => {
    // Decide the side before showing, so it never visibly jumps: if a
    // right-opening popup would run past the viewport, open it to the left.
    const wrap = wrapRef.current;
    if (wrap && typeof window !== "undefined") {
      const rect = wrap.getBoundingClientRect();
      setFlipLeft(rect.right + CASCADE_WIDTH + 16 > window.innerWidth);
    }
    setOpen(true);
  };
  const hide = () => setOpen(false);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      reveal();
      // Move into the submenu once its links are tabbable.
      requestAnimationFrame(() => subRef.current?.querySelector<HTMLElement>("a")?.focus());
    } else if (e.key === "ArrowLeft" && open) {
      e.preventDefault();
      setOpen(false);
      linkRef.current?.focus();
    } else if (e.key === "Escape" && open) {
      // Collapse the cascade first and keep the parent flyout open.
      e.preventDefault();
      e.stopPropagation();
      setOpen(false);
      linkRef.current?.focus();
    }
  };

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={reveal}
      onMouseLeave={hide}
      onFocus={reveal}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) hide();
      }}
      onKeyDown={onKeyDown}
    >
      <Link
        ref={linkRef}
        href={entry.href}
        aria-current={entryActive ? "page" : undefined}
        aria-haspopup="true"
        aria-expanded={open}
        tabIndex={flyoutOpen ? undefined : -1}
        className={cn(
          "flex items-center gap-2 rounded-sm px-3 py-2 hover:bg-gray",
          entryActive && "border-l-2 border-gold bg-gray",
        )}
      >
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold text-blue">{entry.label}</span>
          {entry.summary && (
            <span className="mt-0.5 block text-xs leading-snug text-muted">{entry.summary}</span>
          )}
        </span>
        <ChevronRight aria-hidden className="h-4 w-4 shrink-0 text-muted" />
      </Link>

      <div
        ref={subRef}
        className={cn(
          "absolute top-0 z-50 w-64 rounded-sm border border-line bg-white p-2 shadow-md transition-opacity duration-150",
          flipLeft ? "right-full mr-1" : "left-full ml-1",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        {children.map((sub, i) => {
          const heading = groupHeading(children, i);
          const subActive = pathname === sub.href;
          return (
            <div key={sub.href}>
              {heading && (
                <p className="px-3 pb-1 pt-2 text-[0.7rem] font-semibold uppercase tracking-wide text-muted first:pt-1">
                  {heading}
                </p>
              )}
              <Link
                href={sub.href}
                aria-current={subActive ? "page" : undefined}
                tabIndex={open ? undefined : -1}
                className={cn(
                  "block rounded-sm px-3 py-1.5 text-sm hover:bg-gray",
                  subActive ? "font-semibold text-blue" : "text-ink",
                )}
              >
                {sub.label}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MobileItem({
  item,
  pathname,
  locale,
  labels,
  summaries,
  sectionLabels,
  submenus,
  submenuWord,
}: {
  item: NavItem;
  pathname: string;
  locale: Locale;
  labels: Record<string, string>;
  summaries: Record<string, string>;
  sectionLabels: Record<string, string>;
  submenus: Record<string, SubmenuEntry[]>;
  submenuWord: string;
}) {
  const href = localizedPath(locale, item.href);
  const active = isActive(pathname, href);
  const entries = dropdownEntries(item, locale, labels, summaries, sectionLabels, submenus);

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
          {entries.map((entry) => (
            <MobileEntry
              key={entry.href}
              entry={entry}
              pathname={pathname}
              submenuWord={submenuWord}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

function MobileEntry({
  entry,
  pathname,
  submenuWord,
}: {
  entry: DropdownEntry;
  pathname: string;
  submenuWord: string;
}) {
  const children = entry.children ?? [];
  const hasCascade = children.length > 0;
  const entryActive = pathname === entry.href;
  const [open, setOpen] = useState(false);

  if (!hasCascade) {
    return (
      <li>
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
  }

  return (
    <li>
      <div className="flex items-center justify-between gap-1">
        <Link
          href={entry.href}
          aria-current={entryActive ? "page" : undefined}
          className={cn(
            "block flex-1 py-1.5 text-sm hover:text-blue",
            entryActive ? "font-semibold text-blue" : "text-muted",
          )}
        >
          {entry.label}
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={`${entry.label} ${submenuWord}`}
          className="shrink-0 rounded-sm p-1.5 text-muted hover:text-blue"
        >
          <ChevronDown
            aria-hidden
            className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
          />
        </button>
      </div>
      {open && (
        <ul className="mb-1 ml-2 space-y-0.5 border-l border-line pl-3">
          {children.map((sub, i) => {
            const heading = groupHeading(children, i);
            return (
              <li key={sub.href}>
                {heading && (
                  <p className="pb-0.5 pt-1.5 text-[0.7rem] font-semibold uppercase tracking-wide text-muted first:pt-0.5">
                    {heading}
                  </p>
                )}
                <Link
                  href={sub.href}
                  className="block py-1 text-sm text-muted hover:text-blue"
                >
                  {sub.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}
