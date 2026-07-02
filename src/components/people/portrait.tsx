import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Portrait as PortraitData } from "@/lib/people";

// Initials for the monogram plate. Drops the connective "and" so a pair like
// "York and Elizabeth" reads "YE" rather than "YA".
function initials(name: string): string {
  const parts = name
    .replace(/,.*$/, "") // drop suffixes like ", M.D."
    .split(/\s+/)
    .filter((w) => w.length > 0 && w.toLowerCase() !== "and");
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

// A person's portrait. Renders a verified, credited image, or an honest
// monogram plate when no authenticated likeness exists.
export function Portrait({
  portrait,
  name,
  size = "sm",
  noLikenessLabel,
  className,
}: {
  portrait: PortraitData | null;
  name: string;
  size?: "sm" | "lg";
  noLikenessLabel?: string;
  className?: string;
}) {
  const box =
    size === "lg" ? "w-36 sm:w-44" : "w-16 sm:w-20";
  const frame = cn(
    box,
    "aspect-[4/5] shrink-0 overflow-hidden rounded-sm border border-line bg-gray",
  );

  if (portrait) {
    return (
      <figure className={className}>
        <div className={cn(frame, "relative")}>
          {/* At card size (people index) the image sits inside a link whose
              text is the person's name, so the full descriptive alt would be
              read twice; treat it as decorative there. The standalone lg
              rendering on the person page keeps the full alt + credit. */}
          <Image
            src={portrait.src}
            alt={size === "sm" ? "" : portrait.alt}
            fill
            sizes="(min-width: 640px) 11rem, 5rem"
            className="object-contain"
          />
        </div>
        {size === "lg" && (
          <figcaption className="mt-2 max-w-44 text-xs leading-snug text-muted">
            {portrait.credit}
          </figcaption>
        )}
      </figure>
    );
  }

  const labeled = size === "lg" && Boolean(noLikenessLabel);
  return (
    // Without its label the monogram plate holds no accessible content, so
    // hide the whole figure from assistive tech (the person's name is the
    // adjacent link/heading text); the labeled lg plate stays exposed.
    <figure className={className} aria-hidden={labeled ? undefined : true}>
      <div className={cn(frame, "flex items-center justify-center")}>
        <span
          aria-hidden
          className="font-heading text-2xl font-bold text-blue/70 sm:text-3xl"
        >
          {initials(name)}
        </span>
      </div>
      {labeled && (
        <figcaption className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
          {noLikenessLabel}
        </figcaption>
      )}
    </figure>
  );
}
