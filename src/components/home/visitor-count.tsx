"use client";

import { useEffect, useRef, useState } from "react";
import { Users } from "lucide-react";

// A live global visit count. On mount it reads the current total; once the
// visitor has actually scrolled into the page (real engagement, not a bounce),
// it records this session exactly once (guarded by sessionStorage) and shows the
// updated number. If the counter backend isn't configured, the API returns a
// null count and this renders nothing — no layout gap, no error.

const SESSION_FLAG = "islip-visit-counted";
const SCROLL_THRESHOLD = 300; // px scrolled before a visit "counts"

export function VisitorCount({
  locale,
  labelOne,
  labelMany,
}: {
  locale: string;
  labelOne: string;
  labelMany: string;
}) {
  const [count, setCount] = useState<number | null>(null);
  const recorded = useRef(false);

  useEffect(() => {
    let cancelled = false;

    // Current total, for immediate display.
    fetch("/api/visits")
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled && typeof d.count === "number") setCount(d.count);
      })
      .catch(() => {});

    if (sessionStorage.getItem(SESSION_FLAG) === "1") recorded.current = true;

    const record = () => {
      if (recorded.current || window.scrollY < SCROLL_THRESHOLD) return;
      recorded.current = true;
      sessionStorage.setItem(SESSION_FLAG, "1");
      fetch("/api/visits", { method: "POST" })
        .then((r) => r.json())
        .then((d) => {
          if (!cancelled && typeof d.count === "number") setCount(d.count);
        })
        .catch(() => {});
      window.removeEventListener("scroll", record);
    };

    window.addEventListener("scroll", record, { passive: true });
    return () => {
      cancelled = true;
      window.removeEventListener("scroll", record);
    };
  }, []);

  if (count === null) return null;

  const label = count === 1 ? labelOne : labelMany;
  return (
    <p className="mt-10 inline-flex items-center gap-2 text-sm text-muted">
      <Users aria-hidden className="h-4 w-4 text-gold-dark" />
      <span>
        <strong className="font-semibold text-ink">
          {count.toLocaleString(locale)}
        </strong>{" "}
        {label}
      </span>
    </p>
  );
}
