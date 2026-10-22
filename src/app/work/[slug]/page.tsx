import { ViewTransition } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SystemFlow from "@/components/SystemFlow";
import BeforeAfter from "@/components/BeforeAfter";
import Magnetic from "@/components/Magnetic";
import { WORK } from "@/content/projects";

// Every slug is prerendered below; a Suspense fallback here would break the title morph from the work list.
export const instant = false;

export function generateStaticParams() {
  return WORK.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = WORK.find((w) => w.slug === slug);
  return p ? { title: p.title, description: p.tagline } : {};
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const i = WORK.findIndex((w) => w.slug === slug);
  if (i < 0) notFound();
  const p = WORK[i];
  const next = WORK[(i + 1) % WORK.length];

  const sections = [
    ["The problem", p.problem],
    ["What I built", p.built],
    ["What was hard", p.hard],
    ["Outcome", p.outcome],
  ];

  return (
    <main className="px-4 pt-36 md:px-8 md:pt-48">
      <p className="fade-in font-mono text-xs text-muted">
        Case study · {p.tags.join(" · ")}
      </p>
      <h1 className="mt-4 text-[clamp(3rem,9vw,8.5rem)] leading-[0.95] font-medium tracking-tighter">
        <ViewTransition name={`title-${p.slug}`} share="morph" default="none">
          <span className="inline-block">{p.title}</span>
        </ViewTransition>
      </h1>
      <p className="fade-in mt-6 max-w-3xl text-xl text-muted md:text-3xl">{p.tagline}</p>

      <dl className="fade-in mt-16 grid grid-cols-2 gap-6 border-y border-line py-8 md:grid-cols-4">
        {[
          ["Client", p.client],
          ["Role", p.role],
          ["Year", p.year],
          ["Stack", p.stack.slice(0, 4).join(", ")],
        ].map(([k, v]) => (
          <div key={k}>
            <dt className="font-mono text-xs text-muted">{k}</dt>
            <dd className="mt-1">{v}</dd>
          </div>
        ))}
      </dl>

      <section className="py-20 md:py-28">
        <h2 className="mb-8 font-mono text-xs tracking-widest text-muted uppercase">How it flows</h2>
        <SystemFlow stages={p.flow} />
      </section>

      {p.facts && (
        <section className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-4">
          {p.facts.map((f) => (
            <div key={f.label} className="bg-bg p-6 md:p-8">
              <p className="text-4xl font-medium tracking-tight text-accent md:text-6xl">{f.value}</p>
              <p className="mt-2 text-sm text-muted">{f.label}</p>
            </div>
          ))}
        </section>
      )}

      <div className="py-12 md:py-20">
        {sections.map(([title, body], n) => (
          <section key={title} className="grid gap-4 border-t border-line py-10 md:grid-cols-[1fr_2fr] md:py-14">
            <h2 className="flex gap-4 text-xl font-medium md:text-2xl">
              <span className="font-mono text-xs text-accent">0{n + 1}</span>
              {title}
            </h2>
            <p className="max-w-3xl text-lg leading-relaxed text-muted md:text-xl">{body}</p>
          </section>
        ))}
      </div>

      {p.beforeAfter && (
        <section className="pb-20">
          <h2 className="mb-8 font-mono text-xs tracking-widest text-muted uppercase">Before / after — drag to compare</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {p.beforeAfter.map((b) => (
              <BeforeAfter key={b.label} {...b} />
            ))}
          </div>
        </section>
      )}

      <section className="pb-20">
        <h2 className="mb-8 font-mono text-xs tracking-widest text-muted uppercase">Key decisions</h2>
        <ul className="grid gap-4 md:grid-cols-2">
          {p.decisions.map((d) => (
            <li key={d.title} className="rounded-2xl border border-line bg-card p-6 md:p-8">
              <h3 className="text-xl font-medium">{d.title}</h3>
              <p className="mt-2 text-muted">{d.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 font-mono text-xs text-muted">{p.stack.join(" · ")}</p>
      </section>

      <section className="border-t border-line py-20 text-center md:py-32">
        <p className="font-mono text-xs text-muted">Next case study</p>
        <Magnetic strength={0.15}>
          <Link
            href={`/work/${next.slug}`}
            data-cursor="Next"
            className="mt-4 block text-[clamp(2.5rem,8vw,7rem)] leading-none font-medium tracking-tighter transition-colors hover:text-accent"
          >
            <ViewTransition name={`title-${next.slug}`} share="morph" default="none">
              <span className="inline-block">{next.title}</span>
            </ViewTransition>
          </Link>
        </Magnetic>
      </section>
    </main>
  );
}
