// Skip to main content (WCAG 2.4.1). Hidden until focused.
export function SkipLink({ label }: { label: string }) {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4
        focus:z-50 focus:rounded-sm focus:bg-blue focus:px-4 focus:py-2
        focus:text-sm focus:font-semibold focus:text-white"
    >
      {label}
    </a>
  );
}
