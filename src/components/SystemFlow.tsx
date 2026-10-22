"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Stages light up one after another when the diagram scrolls into view.
export default function SystemFlow({ stages }: { stages: string[] }) {
  const ref = useRef<HTMLOListElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 75%" } });
        gsap.utils.toArray<HTMLElement>("li", ref.current).forEach((li) => {
          const card = li.querySelector("[data-card]");
          const link = li.querySelector("[data-link]");
          tl.from(card, { opacity: 0.25, borderColor: "#26262a", duration: 0.25 });
          if (link) tl.from(link, { scale: 0, duration: 0.15, ease: "power2.out" });
        });
      },
      ref,
    );
    return () => mm.revert();
  }, []);

  return (
    <ol ref={ref} className="flex flex-col gap-0 md:flex-row md:items-stretch">
      {stages.map((s, i) => (
        <li key={s} className="flex flex-col items-stretch md:flex-1 md:flex-row md:items-center">
          <div data-card className="flex-1 rounded-2xl border border-accent bg-card p-4">
            <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
            <p className="mt-1 text-sm font-medium md:text-base">{s}</p>
          </div>
          {i < stages.length - 1 && (
            <span className="relative mx-auto h-6 w-px bg-line md:mx-0 md:h-px md:w-6">
              <span data-link className="absolute inset-0 origin-top bg-accent md:origin-left" />
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
