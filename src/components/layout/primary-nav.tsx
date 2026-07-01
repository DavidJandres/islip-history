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
  menuLabel: string;
  closeLabel: string;
}

const isActive = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(href + "/");

export function PrimaryNav({
  locale,
  labels,
  summaries,
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
}: {
  item: NavItem;
  pathname: string;
  locale: Locale;
  labels: Record<string, string>;
  summaries: Record<string, string>;
}) {
  const href = localizedPath(locale, item.href);
  const active = isActive(pathname, href);
  const children = item.children ?? [];

  return (
    <li className="group relative">
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className={cn(
          "flex items-center gap-1 border-b-2 px-4 py-4 text-sm font-semibold transition-colors",
          active
            ? "border-gold text-blue"
            : "border-transparent text-ink hover:border-line hover:text-blue",
        )}
      >
        {labels[item.key]}
        {children.length > 0 && (
          <ChevronDown
            aria-hidden
            className="h-3.5 w-3.5 text-muted transition-transform group-hover:rotate-180"
          />
        )}
      </Link>

      {children.length > 0 && (
        <div
          className="invisible absolute left-0 top-full z-40 w-72 -translate-y-1 rounded-sm
            border border-line bg-white p-2 opacity-0 transition-all duration-150
            group-hover:visible group-hover:translate-y-0 group-hover:opacity-100
            group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100"
        >
          {children.map((child) => (
            <Link
              key={child.href}
              href={localizedPath(locale, child.href)}
              className="block rounded-sm px-3 py-2 hover:bg-gray"
            >
              <span className="text-sm font-semibold text-blue">{labels[child.key]}</span>
              {summaries[child.key] && (
                <span className="mt-0.5 block text-xs leading-snug text-muted">
                  {summaries[child.key]}
                </span>
              )}
            </Link>
          ))}
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
}: {
  item: NavItem;
  pathname: string;
  locale: Locale;
  labels: Record<string, string>;
}) {
  const href = localizedPath(locale, item.href);
  const active = isActive(pathname, href);

  return (
    <li className="border-b border-line last:border-0">
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className={cn("block py-3 text-base font-semibold", active ? "text-blue" : "text-ink")}
      >
        {labels[item.key]}
      </Link>
      {item.children && item.children.length > 0 && (
        <ul className="-mt-1 mb-2 ml-3 space-y-1 border-l border-line pl-3">
          {item.children.map((child) => (
            <li key={child.href}>
              <Link
                href={localizedPath(locale, child.href)}
                className="block py-1.5 text-sm text-muted hover:text-blue"
              >
                {labels[child.key]}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
