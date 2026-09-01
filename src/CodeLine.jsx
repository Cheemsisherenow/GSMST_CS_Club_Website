import { useRef, useState, useLayoutEffect } from "react";

const SUBPIXEL_TOLERANCE = 0.5;

const PAD_Y = "pt-[calc(var(--row)*13/18)] pb-[calc(var(--row)*10/9)]";

let probeEl = null;
function rowProbe() {
  if (probeEl) return probeEl;
  probeEl = document.createElement("div");
  probeEl.setAttribute("aria-hidden", "true");
  probeEl.style.cssText =
    "position:absolute;top:0;left:0;width:0;height:var(--row);visibility:hidden;pointer-events:none;";
  document.body.appendChild(probeEl);
  return probeEl;
}

// minGapRows guarantees AT LEAST that many extra rows of margin beyond
// whatever rounding-up already provides — needed because content that
// lands exactly on a row multiple (e.g. 3 lines at leading-none, each
// 8/3 of a row = exactly 8 rows) rounds up to itself, getting zero
// margin, which reads as no gap at all before the next thing.
export function useRowSnap(minGapRows = 0) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const probe = rowProbe();
    const apply = () => {
      const row = probe.getBoundingClientRect().height;
      if (!row) return;
      const h = el.getBoundingClientRect().height;
      const rows = Math.max(
        1,
        Math.ceil((h - SUBPIXEL_TOLERANCE) / row) + minGapRows
      );
      el.style.marginBottom = `${(rows * row - h).toFixed(3)}px`;
    };

    const ro = new ResizeObserver(apply);
    ro.observe(el); // content/font changes
    ro.observe(probe); // --row changes (viewport resize)
    apply();

    return () => ro.disconnect();
  }, []);

  return ref;
}

// Wrap any non-CodeLine content (headline, button row, card grid) in this and
// it will occupy a whole number of rows at whatever size it happens to be.
export function RowBlock({ children, className = "", minGapRows = 0 }) {
  const ref = useRowSnap(minGapRows);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function CodeLine({ children }) {
  return <div className="code-line">{children}</div>;
}

export function CodeGutter({ lines, start = 1 }) {
  return (
    <div
      className={`${PAD_Y} text-center px-[calc(var(--row)*2/9)] border-r border-[#3a2f26]`}
    >
      {Array.from({ length: lines }, (_, i) => (
        <div key={i} className="code-num text-[#6b5c49]">
          {start + i}
        </div>
      ))}
    </div>
  );
}

// Renders both columns and derives the gutter's line count from the content's
// real measured height, so the numbers can never run short or long.
export function CodeSection({
  className = "",
  contentClassName = "",
  start = 1,
  after = null,
  children,
}) {
  const contentRef = useRef(null);
  const [lines, setLines] = useState(0);

  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const probe = rowProbe();

    // The gutter's own width is fixed, so re-rendering it can't change the
    // content's height — this settles in one pass instead of oscillating.
    const apply = () => {
      const row = probe.getBoundingClientRect().height;
      if (!row) return;
      const cs = getComputedStyle(el);
      const inner =
        el.getBoundingClientRect().height -
        parseFloat(cs.paddingTop) -
        parseFloat(cs.paddingBottom);
      setLines(Math.max(1, Math.round(inner / row)));
    };

    const ro = new ResizeObserver(apply);
    ro.observe(el);
    ro.observe(probe);
    apply();

    return () => ro.disconnect();
  }, []);

  return (
    <div className={className}>
      <div className="flex gap-[calc(var(--row)*2/3)]">
        <CodeGutter lines={lines} start={start} />
        <div ref={contentRef} className={`${PAD_Y} ${contentClassName}`}>
          {children}
        </div>
      </div>
      {after}
    </div>
  );
}

export default CodeLine;
