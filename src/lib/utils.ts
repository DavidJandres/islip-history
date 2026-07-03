// Join class names, dropping falsy values: cn("a", cond && "b") -> "a b".
export function cn(...inputs: Array<string | false | null | undefined>): string {
  return inputs.filter(Boolean).join(" ");
}

// Initials for a monogram avatar shown when a person has no photo. Drops a
// connective "and"/"y" so a pair like "York and Elizabeth" reads "YE", and
// drops suffixes after a comma (", Ph.D.").
export function initials(name: string): string {
  const parts = name
    .replace(/,.*$/, "")
    .split(/\s+/)
    .filter((w) => w.length > 0 && !["and", "y"].includes(w.toLowerCase()));
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}
