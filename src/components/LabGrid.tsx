import { LAB } from "@/content/projects";

export default function LabGrid({ limit }: { limit?: number }) {
  return (
    <ul className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {LAB.slice(0, limit).map((item, i) => (
        <li key={item.name} className="group relative flex min-h-64 flex-col justify-between gap-8 bg-bg p-6 transition-colors hover:bg-card md:p-8">
          <div className="flex items-center justify-between font-mono text-xs text-muted">
            <span>{String(i + 1).padStart(2, "0")}</span>
            <span className="rounded-full border border-line px-2.5 py-1 transition-colors group-hover:border-accent group-hover:text-accent">
              {item.kind}
            </span>
          </div>
          <div>
            <h3 className="text-2xl font-medium tracking-tight">{item.name}</h3>
            <p className="mt-2 text-muted">{item.tagline}</p>
            <p className="mt-4 font-mono text-xs text-muted">{item.stack.join(" · ")}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
