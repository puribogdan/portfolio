"use client";

import { useState } from "react";
import Image from "next/image";

// A native range input sits on top, so dragging, clicking and arrow keys all work for free.
export default function BeforeAfter({ before, after, label }: { before: string; after: string; label: string }) {
  const [pos, setPos] = useState(50);

  return (
    <figure>
      <div data-cursor="Drag" className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-line">
        <Image src={before} alt={`${label}, original photo`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
          <Image src={after} alt={`${label}, AI redesign`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
        <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-accent" style={{ left: `${pos}%` }}>
          <span className="absolute top-1/2 left-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent font-mono text-xs text-bg">
            ⟷
          </span>
        </div>
        <span className="pointer-events-none absolute top-3 left-3 rounded-full bg-bg/70 px-2.5 py-1 font-mono text-xs backdrop-blur">Before</span>
        <span className="pointer-events-none absolute top-3 right-3 rounded-full bg-bg/70 px-2.5 py-1 font-mono text-xs backdrop-blur">After</span>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`${label}: compare before and after`}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="mt-3 font-mono text-xs text-muted">{label}</figcaption>
    </figure>
  );
}
