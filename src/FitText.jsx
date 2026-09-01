import { useRef, useLayoutEffect } from "react";

function useFitText() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;

    const apply = () => {

      el.style.fontSize = "";
      // clientWidth includes the parent's own padding, but that space isn't
      // actually available for a child to occupy — subtract it out, same as
      // CodeSection already does for the gutter's line count.
      const parentStyle = getComputedStyle(parent);
      const available =
        parent.clientWidth -
        parseFloat(parentStyle.paddingLeft) -
        parseFloat(parentStyle.paddingRight);
      const needed = el.scrollWidth;
      if (needed > available && available > 0) {
        const naturalSize = parseFloat(getComputedStyle(el).fontSize);
        el.style.fontSize = `${(naturalSize * available) / needed}px`;
      }
    };

    const ro = new ResizeObserver(apply);
    ro.observe(parent);
    apply();

    return () => ro.disconnect();
  }, []);

  return ref;
}
export function FitText({ children, className = "" }) {
  const ref = useFitText();
  return (
    <div ref={ref} className={`whitespace-nowrap ${className}`}>
      {children}
    </div>
  );
}

export default FitText;
