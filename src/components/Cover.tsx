import Image from "next/image";
import type { CaseStudy } from "@/content/projects";

// Project thumbnail: a landscape image, a row of real screens, or a typographic card built from its flow.
export default function Cover({ project, sizes = "448px" }: { project: CaseStudy; sizes?: string }) {
  const ba = project.beforeAfter?.[0]?.after;
  const cover = project.cover ?? (ba ? { src: ba } : undefined);

  if (cover && "src" in cover) {
    return <Image src={cover.src} alt="" fill sizes={sizes} className="object-cover object-top" />;
  }

  if (cover) {
    return (
      <div className="absolute inset-0 overflow-hidden bg-card">
        <div className="absolute -top-1/3 left-1/4 size-3/4 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute inset-x-0 top-6 flex justify-center gap-3">
          {cover.tiles.map((src, i) => (
            <div
              key={src}
              className={`relative w-[28%] overflow-hidden rounded-xl border-4 border-[#1d1d20] shadow-2xl ${i === 1 ? "" : "translate-y-6"}`}
              style={{ aspectRatio: cover.aspect }}
            >
              <Image src={src} alt="" fill sizes="140px" className="object-cover object-top" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex flex-col justify-between overflow-hidden bg-card p-6">
      <div className="absolute -top-1/3 -right-1/4 size-3/4 rounded-full bg-accent/20 blur-3xl" />
      <span className="relative font-serif text-4xl leading-none italic">{project.title}</span>
      <ol className="relative flex flex-wrap gap-1.5">
        {project.flow.map((s, i) => (
          <li key={s} className="rounded-full border border-line bg-bg/60 px-2.5 py-1 font-mono text-[10px] text-muted">
            <span className="text-accent">{i + 1}</span> {s}
          </li>
        ))}
      </ol>
    </div>
  );
}
