// Join class names, dropping falsy values: cn("a", cond && "b") -> "a b".
export function cn(...inputs: Array<string | false | null | undefined>): string {
  return inputs.filter(Boolean).join(" ");
}
