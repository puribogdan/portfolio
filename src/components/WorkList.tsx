"use client";

import { useEffect, useRef, useState, ViewTransition } from "react";
import Link from "next/link";
import gsap from "gsap";
import Cover from "@/components/Cover";
import { WORK } from "@/content/projects";

export default function WorkList() {
  const preview = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);
  const [inside, setInside] = useState(false);

  // The floating preview trails the pointer; it only exists for fine pointers (hidden via CSS otherwise).
  useEffect(() => {
    const el = preview.current!;
    const x = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });
    let px = -1;
    let py = -1;
    const move = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      x(px);
      y(py);
    };
    // Rows scroll under a still pointer; pointerenter/leave don't fire for that.
    const scroll = () => {
      if (px < 0) return;
      const row = document.elementFromPoint(px, py)?.closest<HTMLElement>("[data-row]");
      setInside(!!row);
      if (row) setActive(Number(row.dataset.row));
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", scroll);
    };
  }, []);

  return (
    <section id="work" className="scroll-mt-20 px-4 py-24 md:px-8 md:py-36">
      <div className="mb-10 flex items-end justify-between">
        <h2 className="font-mono text-xs tracking-widest text-muted uppercase">Selected work</h2>
        <span className="font-mono text-xs text-muted">({String(WORK.length).padStart(2, "0")})</span>
      </div>

      <ul onPointerEnter={() => setInside(true)} onPointerLeave={() => setInside(false)} className="border-t border-line">
        {WORK.map((p, i) => (
          <li key={p.slug} data-row={i} onPointerEnter={() => setActive(i)}>
            <Link
              href={`/work/${p.slug}`}
              data-cursor="View"
              className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 border-b border-line py-7 transition-colors md:grid-cols-[4rem_1fr_16rem_5rem] md:py-10"
            >
              <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
              <ViewTransition name={`title-${p.slug}`} share="morph" default="none">
                <span className="text-3xl font-medium tracking-tight transition-[translate,color] duration-500 group-hover:translate-x-3 group-hover:text-accent md:text-6xl">
                  {p.title}
                </span>
              </ViewTransition>
              <span className="text-right font-mono text-xs text-muted md:order-last">{p.year}</span>
              <span className="col-start-2 col-end-4 mt-2 text-sm text-muted md:col-auto md:mt-0">{p.tags.join(" · ")}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div
        ref={preview}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-40 hidden [@media(hover:hover)_and_(pointer:fine)]:block"
      >
        <div
          className={`relative -mt-36 -ml-56 h-72 w-[28rem] overflow-hidden rounded-2xl transition-[scale,opacity] duration-500 ease-out ${
            inside && active >= 0 ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
            style={{ transform: `translateY(${-Math.max(active, 0) * 100}%)` }}
          >
            {WORK.map((p, i) => (
              <div key={p.slug} className="absolute inset-x-0 h-full" style={{ top: `${i * 100}%` }}>
                <Cover project={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
