import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// A drop-in image frame. Pass a `src` and it renders the optimized image with an
// optional credited caption; leave `src` empty and it renders a labelled
// "image coming soon" placeholder at the same dimensions. This lets every page
// reserve its picture space now and have real images added later by dropping a
// file in /public and filling one data entry — the layout never shifts.

const ASPECT = {
  wide: "aspect-[16/9]",
  photo: "aspect-[4/3]",
  portrait: "aspect-[3/4]",
  square: "aspect-square",
} as const;

export function ImageSlot({
  src,
  alt,
  credit,
  caption,
  label,
  aspect = "photo",
  sizes = "(min-width: 768px) 720px, 100vw",
  priority = false,
  className,
}: {
  src?: string;
  alt?: string;
  credit?: string; // shown italic in the caption when an image is present
  caption?: string; // describes the (intended) image; shown in both states
  label: string; // localized "Image coming soon", shown in the empty state
  aspect?: keyof typeof ASPECT;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={cn("my-8", className)}>
      <div
        className={cn(
          "relative overflow-hidden rounded-sm",
          ASPECT[aspect],
          src ? "border border-line" : "border border-dashed border-line bg-gray",
        )}
      >
        {src ? (
          <Image
            src={src}
            alt={alt ?? ""}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center">
            <ImageIcon aria-hidden className="h-8 w-8 text-muted opacity-60" />
            <span className="text-sm font-semibold text-muted">{label}</span>
            {caption && (
              <span className="max-w-xs text-xs leading-snug text-muted/80">{caption}</span>
            )}
          </div>
        )}
      </div>
      {src && (caption || credit) && (
        <figcaption className="mt-2 text-xs leading-snug text-muted">
          {caption}
          {caption && credit ? " " : ""}
          {credit && <span className="italic">{credit}</span>}
        </figcaption>
      )}
    </figure>
  );
}
