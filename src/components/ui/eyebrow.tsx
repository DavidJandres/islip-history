import { cn } from "@/lib/utils";

// Small uppercase label above a heading. gold-dark clears AA on light surfaces;
// gold-light clears AA on the dark blue surfaces (onDark).
export function Eyebrow({
  children,
  onDark = false,
  className,
}: {
  children: React.ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mb-3 text-xs font-semibold uppercase tracking-[0.14em]",
        onDark ? "text-gold-light" : "text-gold-dark",
        className,
      )}
    >
      {children}
    </p>
  );
}
