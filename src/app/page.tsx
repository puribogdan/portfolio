import Link from "next/link";
import Pipeline from "@/components/Pipeline";
import RevealText from "@/components/RevealText";
import WorkList from "@/components/WorkList";
import Apps from "@/components/Apps";
import LabGrid from "@/components/LabGrid";
import { SITE, STACK } from "@/content/projects";

const HEADLINE = [
  <>I build AI systems</>,
  <>
    that run <em className="font-serif font-normal text-accent">real</em>
  </>,
  <>businesses.</>,
];

export default function Home() {
  return (
    <main>
      <section className="flex min-h-svh flex-col justify-end gap-10 px-4 pb-10 md:px-8 md:pb-14">
        <p className="fade-in flex items-center gap-2 font-mono text-xs text-muted" style={{ animationDelay: "0.6s" }}>
          <span className="size-2 animate-pulse rounded-full bg-accent" />
          Available for work · {SITE.location}
        </p>

        <h1 className="text-[clamp(2.75rem,10vw,9.5rem)] leading-[0.92] font-medium tracking-tighter">
          {HEADLINE.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.06em]">
              <span className="rise" style={{ animationDelay: `${0.1 + i * 0.12}s` }}>
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div
          className="fade-in flex flex-col justify-between gap-6 border-t border-line pt-6 text-muted md:flex-row md:items-end"
          style={{ animationDelay: "0.8s" }}
        >
          <p className="max-w-md">
            WhatsApp-to-ERP order engines, AI video pipelines, and the Flutter apps on top of them. Built end to end.
          </p>
          <p className="font-mono text-xs">Scroll to see how ↓</p>
        </div>
      </section>

      <Pipeline />

      <section className="px-4 py-24 md:px-8 md:py-40">
        <RevealText
          className="max-w-6xl text-[clamp(1.75rem,4.2vw,3.75rem)] leading-[1.1] font-medium tracking-tight"
          text="I like problems where software replaces someone retyping things. Messages into orders, photos into designs, ideas into finished videos — with a human in the loop exactly where it matters."
        />
      </section>

      <WorkList />

      <Apps />

      <section className="px-4 py-24 md:px-8 md:py-36">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="font-mono text-xs tracking-widest text-muted uppercase">From the lab</h2>
          <Link href="/lab" data-cursor="Open" className="font-mono text-xs text-muted transition-colors hover:text-accent">
            All experiments →
          </Link>
        </div>
        <LabGrid limit={3} />
      </section>

      <section aria-label="Tools I use" className="overflow-hidden border-y border-line py-8">
        <ul className="marquee flex w-max gap-12 pr-12 text-3xl font-medium tracking-tight text-muted md:text-5xl">
          {[...STACK, ...STACK].map((s, i) => (
            <li key={i} aria-hidden={i >= STACK.length} className="flex items-center gap-12">
              {s} <span className="text-accent">✦</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
