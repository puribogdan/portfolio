"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// Follower dot for fine pointers; any element with data-cursor="Label" grows it into a labelled disc.
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = ref.current!;
    const x = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3" });

    let px = -1;
    let py = -1;
    const update = () => {
      const t = document.elementFromPoint(px, py);
      setLabel(t?.closest("[data-cursor]")?.getAttribute("data-cursor") ?? "");
      setHover(!!t?.closest("a, button, input, [role=option]"));
    };
    const move = (e: PointerEvent) => {
      el.style.opacity = "1";
      px = e.clientX;
      py = e.clientY;
      x(px);
      y(py);
      update();
    };
    // Content scrolls under a still pointer, so re-check what it is over.
    const scroll = () => px >= 0 && update();
    const leave = () => (el.style.opacity = "0");

    window.addEventListener("pointermove", move);
    window.addEventListener("scroll", scroll, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", scroll);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed top-0 left-0 z-[100] opacity-0 transition-opacity">
      <div
        className={`grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent text-bg transition-[width,height] duration-300 ease-out ${
          label ? "size-20" : hover ? "size-10 opacity-60" : "size-2.5"
        }`}
      >
        {label && <span className="text-xs font-medium">{label}</span>}
      </div>
    </div>
  );
}
