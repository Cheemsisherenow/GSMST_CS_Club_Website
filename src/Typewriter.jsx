import { useRef, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText);

// Reveals its children character-by-character, then leaves a blinking
// cursor behind once it's done. Shared across every page's big headline
// instead of each page defining its own copy.
export default function Typewriter({ children, speed = 0.05 }) {
  const containerRef = useRef(null);
  const [done, setDone] = useState(false);

  useGSAP(() => {
    const split = SplitText.create(containerRef.current, { type: "chars" });
    gsap.set(split.chars, { opacity: 0 });
    gsap.to(split.chars, {
      opacity: 1,
      duration: 0,
      stagger: speed,
      ease: "none",
      onComplete: () => setDone(true),
    });
    return () => split.revert();
  }, []);

  return (
    <>
      <span ref={containerRef}>{children}</span>
      {done && <span className="animate-[blink_1s_infinite]">_</span>}
    </>
  );
}
