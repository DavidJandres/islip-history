"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { findMatchRanges } from "@/lib/search/target";

// Ctrl+F for arriving visitors. When a page loads with `?q=` (added to every
// search-result link), this finds the searched words inside the destination —
// scoped to the `#anchor` card when one is present, the whole <main> when not —
// wraps them in <mark data-search-mark> and scrolls the most relevant one into
// view. Layers of defense:
//   • retries on a backoff schedule, so hydration/streaming timing can't beat us;
//   • ancestor <details> panels are opened before scrolling (long transcriptions
//     live in expandable panels);
//   • if the words can't be found, we do nothing — the browser's native scroll
//     to the card #anchor has already happened, so the old behavior is the floor.
// Mounted once in the locale layout inside <Suspense> (useSearchParams).

const RETRY_MS = [0, 120, 350, 800, 1600];
const MAX_MARKS = 80;

function clearMarks() {
  for (const mark of Array.from(document.querySelectorAll("mark[data-search-mark]"))) {
    const parent = mark.parentNode;
    if (!parent) continue;
    while (mark.firstChild) parent.insertBefore(mark.firstChild, mark);
    parent.removeChild(mark);
    parent.normalize();
  }
}

function collectTextNodes(root: Element): Text[] {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const tag = node.parentElement?.tagName;
      if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT" || tag === "MARK") {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  const nodes: Text[] = [];
  let n: Node | null;
  while ((n = walker.nextNode())) nodes.push(n as Text);
  return nodes;
}

/** Wrap [start,end) of a text node in a <mark>; returns the mark element. */
function wrapRange(node: Text, start: number, end: number): HTMLElement {
  const target = node.splitText(start);
  target.splitText(end - start);
  const mark = document.createElement("mark");
  mark.setAttribute("data-search-mark", "true");
  target.parentNode?.replaceChild(mark, target);
  mark.appendChild(target);
  return mark;
}

function scrollToMark(el: HTMLElement, smooth: boolean) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ block: "center", behavior: smooth && !reduced ? "smooth" : "auto" });
}

function markInViewport(el: HTMLElement): boolean {
  const r = el.getBoundingClientRect();
  return r.top >= 0 && r.bottom <= window.innerHeight;
}

function highlightAndScroll(query: string, hash: string): boolean {
  const anchorEl = hash ? document.getElementById(hash) : null;
  if (hash && !anchorEl) return false; // anchor not in DOM yet — retry
  const root = anchorEl ?? document.querySelector("main");
  if (!root) return false;

  clearMarks();

  // Find matches per text node; remember the globally best (phrase match
  // first, then the node whose densest window covers the most query tokens).
  interface NodePlan {
    node: Text;
    ranges: { start: number; end: number }[];
    bestRange: number;
    phrase: boolean;
  }
  const plans: NodePlan[] = [];
  for (const node of collectTextNodes(root)) {
    const found = findMatchRanges(node.nodeValue ?? "", query);
    if (found) {
      plans.push({ node, ranges: found.ranges, bestRange: found.best, phrase: found.phrase });
    }
  }
  if (plans.length === 0) return true; // inspected fully; no match — keep card anchor

  const bestPlan = plans.find((p) => p.phrase) ?? plans[0];

  // Wrap ranges back-to-front so earlier offsets stay valid; collect the
  // primary mark (the best range of the best plan).
  let primary: HTMLElement | null = null;
  let markCount = 0;
  for (const plan of plans) {
    if (markCount >= MAX_MARKS) break;
    const marks: (HTMLElement | null)[] = new Array(plan.ranges.length).fill(null);
    for (let i = plan.ranges.length - 1; i >= 0; i--) {
      if (markCount >= MAX_MARKS) break;
      const { start, end } = plan.ranges[i];
      if (end <= start || end > (plan.node.nodeValue?.length ?? 0)) continue;
      marks[i] = wrapRange(plan.node, start, end);
      markCount++;
    }
    if (plan === bestPlan) primary = marks[plan.bestRange] ?? marks.find(Boolean) ?? null;
  }
  if (!primary) return true;

  primary.setAttribute("data-search-mark", "primary");

  // Reveal matches hidden inside collapsed <details> (source transcriptions).
  for (let el = primary.parentElement; el; el = el.parentElement) {
    if (el instanceof HTMLDetailsElement) el.open = true;
  }

  scrollToMark(primary, true);
  return true;
}

export function SearchJump() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";

  useEffect(() => {
    // The /search page manages ?q= itself; plain navigations carry no query.
    if (!query.trim() || /\/search$/.test(pathname)) {
      clearMarks();
      return;
    }
    let done = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const attempt = () => {
      if (done) return;
      const hash = decodeURIComponent(window.location.hash.replace(/^#/, ""));
      if (highlightAndScroll(query, hash)) {
        done = true;
        // Framework scroll management (initial-load restoration, hydration
        // layout shifts) can cancel or undo the first smooth scroll. Verify a
        // few times after settling and re-scroll instantly if the primary
        // match is not actually on screen.
        for (const ms of [700, 1500, 2600]) {
          timers.push(
            setTimeout(() => {
              const primary = document.querySelector<HTMLElement>(
                'mark[data-search-mark="primary"]',
              );
              if (primary && !markInViewport(primary)) scrollToMark(primary, false);
            }, ms),
          );
        }
      }
    };
    const raf = requestAnimationFrame(attempt);
    for (const ms of RETRY_MS.slice(1)) timers.push(setTimeout(attempt, ms));
    // Same page + same query but a different #anchor (two results on one
    // page): React deps don't change, so re-run on the hash change itself.
    const onHash = () => {
      done = false;
      attempt();
    };
    window.addEventListener("hashchange", onHash);
    return () => {
      done = true;
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      window.removeEventListener("hashchange", onHash);
    };
  }, [pathname, query]);

  return null;
}
