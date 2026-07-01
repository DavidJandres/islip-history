import { cn } from "@/lib/utils";

// Hairline divider. The site uses rules, not shadows, to separate content.
export function Rule({
  className,
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  return (
    <hr
      className={cn(
        "border-0 border-t",
        onDark ? "border-line-cool/30" : "border-line",
        className,
      )}
    />
  );
}
