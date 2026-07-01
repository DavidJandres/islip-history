import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "light";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm px-5 py-2.5 " +
  "text-sm font-semibold transition-colors duration-150";

const variants: Record<Variant, string> = {
  primary: "bg-blue text-white hover:bg-blue-dark",
  secondary: "border border-blue text-blue hover:bg-blue hover:text-white",
  light: "border border-white text-white hover:bg-white hover:text-blue",
};

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  href?: string; // renders a Link instead of a button
  external?: boolean;
}

// One action element. Renders a real <button>, or a styled <Link> when href is
// given. Focus styling is global (see globals.css), not repeated here.
export function Button({
  children,
  variant = "primary",
  className,
  href,
  external,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variants[variant], className);

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
