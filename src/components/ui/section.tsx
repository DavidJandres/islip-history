import { cn } from "@/lib/utils";
import { Container } from "./container";

// A full-width band. Vertical padding lives here (via presets) so pages never
// accumulate conflicting margins between sections.
const padding = {
  default: "py-14 sm:py-16 lg:py-20",
  hero: "pt-16 pb-10 sm:pt-20 sm:pb-12 lg:pt-24",
  lg: "py-20 sm:py-24 lg:py-28",
  sm: "py-10 sm:py-12",
} as const;

const surfaces = {
  paper: "bg-paper",
  gray: "bg-gray",
  blue: "bg-blue text-white",
} as const;

interface SectionProps {
  children: React.ReactNode;
  surface?: keyof typeof surfaces;
  size?: "default" | "narrow";
  padding?: keyof typeof padding;
  as?: "section" | "div";
  "aria-labelledby"?: string;
  className?: string;
}

export function Section({
  children,
  surface = "paper",
  size = "default",
  padding: pad = "default",
  as: Tag = "section",
  className,
  ...rest
}: SectionProps) {
  return (
    <Tag className={cn(padding[pad], surfaces[surface], className)} {...rest}>
      <Container size={size}>{children}</Container>
    </Tag>
  );
}
