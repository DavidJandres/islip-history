import { Info, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

// Editorial callout. "editorial" is for the honest "in review / to verify"
// flags this archive uses while sourcing content; "info" is general guidance.
export function Notice({
  children,
  intent = "info",
  title,
  label,
  className,
}: {
  children: React.ReactNode;
  intent?: "info" | "editorial";
  title?: string;
  // Accessible name for the region when there is no visible `title`. Pass a
  // localized string so the landmark isn't announced in English on /es pages.
  label?: string;
  className?: string;
}) {
  const isEditorial = intent === "editorial";
  const Icon = isEditorial ? FileText : Info;

  return (
    <aside
      role="note"
      aria-label={title ?? label ?? (isEditorial ? "Editorial note" : "Note")}
      className={cn(
        "flex gap-3 rounded-sm border-l-4 bg-gray p-4 text-[0.95rem] leading-relaxed",
        isEditorial ? "border-gold" : "border-blue",
        className,
      )}
    >
      <Icon
        aria-hidden="true"
        className={cn(
          "mt-0.5 h-5 w-5 shrink-0",
          isEditorial ? "text-gold-dark" : "text-blue",
        )}
      />
      <div className="text-ink">{children}</div>
    </aside>
  );
}
