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

    // A first pass can land on a height that's still settling — most often the
    // webfont swapping in under the block's text, which shifts its height by a
    // pixel or two AFTER the margin was computed from the old one, leaving the
    // block permanently off the row grid. Re-measure once the fonts are in and
    // once more on the next frame.
    let raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame(apply);
    });
    document.fonts?.ready.then(apply).catch(() => {});

    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return ref;
}


export function RowBlock({ children, className = "", minGapRows = 0 }) {
  const ref = useRowSnap(minGapRows);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function CodeLine({ children, indent = 0, className = "" }) {
  return (
    <div
      className={`code-line ${className}`}
      style={indent ? { paddingLeft: `${indent}ch` } : undefined}
    >
      {children}
    </div>
  );
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

    // Same settling problem as useRowSnap: the RowBlocks inside this content
    // column adjust their own margins after their first measurement, so the
    // column's final height isn't known on the first pass here either.
    let raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame(apply);
    });
    document.fonts?.ready.then(apply).catch(() => {});

    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={className}>
      {/* min-w-0 is load-bearing: a flex item's default min-width is
          "auto", which means it refuses to shrink below its own content's
          intrinsic width. .code-line's white-space:pre-wrap can only wrap
          text once this column is actually allowed to be narrower than its
          longest unbroken run of characters — without this, that run
          forces the whole row (gutter + content) wider than the viewport
          instead of wrapping, which is what was overflowing the page. */}
      {/* items-start disables the default align-items:stretch — without it,
          the content column gets stretched to match however tall the
          gutter renders (lines * row), and since lines is COMPUTED FROM the
          content's own measured height, any rounding overshoot feeds back
          into an even taller stretched measurement next time, compounding
          with every resize into runaway extra gutter numbers. With natural
          (unstretched) heights on both sides, that loop can't happen — any
          mismatch between them is at most a fraction of a row, not
          self-amplifying. */}
      <div className="flex items-start gap-[calc(var(--row)*2/3)]">
        <CodeGutter lines={lines} start={start} />
        <div
          ref={contentRef}
          className={`min-w-0 ${PAD_Y} ${contentClassName}`}
        >
          {children}
        </div>
      </div>
      {after}
    </div>
  );
}

export default CodeLine;
