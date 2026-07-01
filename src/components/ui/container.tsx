import { cn } from "@/lib/utils";

// Centres content with consistent gutters. "narrow" is for long-form reading.
export function Container({
  children,
  size = "default",
  className,
}: {
  children: React.ReactNode;
  size?: "default" | "narrow";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-6 lg:px-8",
        size === "default" ? "max-w-6xl" : "max-w-3xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
