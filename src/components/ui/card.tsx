import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./eyebrow";

interface CardProps {
  title: string;
  eyebrow?: string;
  children?: React.ReactNode;
  href?: string; // when set, the whole card is a link
  className?: string;
}

// Bordered content block. With href, the entire card is one link target.
export function Card({ title, eyebrow, children, href, className }: CardProps) {
  const inner = (
    <>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h3 className="text-xl">
        {title}
        {href ? (
          <ArrowRight
            aria-hidden="true"
            className="ml-1.5 inline-block h-4 w-4 -translate-y-px text-gold-dark
              transition-transform duration-150 group-hover:translate-x-1"
          />
        ) : null}
      </h3>
      {children ? (
        <div className="mt-2 text-[0.95rem] leading-relaxed text-muted">
          {children}
        </div>
      ) : null}
    </>
  );

  const classes = cn(
    "block h-full rounded-sm border border-line bg-white p-6",
    href && "group transition-colors duration-150 hover:border-blue",
    className,
  );

  return href ? (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  ) : (
    <div className={classes}>{inner}</div>
  );
}
