import type { Metadata } from "next";
import RevealText from "@/components/RevealText";
import { SITE, STACK } from "@/content/projects";

export const metadata: Metadata = {
  title: "About",
  description: `${SITE.name} — ${SITE.role}, ${SITE.location}.`,
};

const SERVICES = [
  { title: "AI pipelines", body: "LLMs wired into real workflows: parsing messages, generating media, drafting replies, with confidence checks and a human in the loop." },
  { title: "Backend systems", body: "NestJS and FastAPI services with queues, retries, observability and the boring guards that keep production calm." },
  { title: "Mobile apps", body: "Flutter apps for iOS and Android, offline-first when the field demands it." },
];

const PRINCIPLES = [
  ["The model scores, code decides.", "AI proposes; deterministic code makes the final call."],
  ["Measure, don’t eyeball.", "Prompts and models get benchmarks, not vibes."],
  ["Port, don’t rewrite.", "Keep the logic that works and replace only what doesn’t."],
  ["Ship the boring version first.", "The simplest thing that works, then make it delightful."],
];

export default function AboutPage() {
  return (
    <main className="px-4 pt-36 md:px-8 md:pt-48">
      <h1 className="text-[clamp(3rem,10vw,9rem)] leading-[0.92] font-medium tracking-tighter">
        <span className="block overflow-hidden pb-[0.06em]">
          <span className="rise">
            Hi, I&apos;m <em className="font-serif font-normal text-accent">Bogdan</em>.
          </span>
        </span>
      </h1>

      <section className="py-20 md:py-32">
        <RevealText
          className="max-w-5xl text-[clamp(1.5rem,3.6vw,3.25rem)] leading-[1.15] font-medium tracking-tight"
          text={`I'm a developer in ${SITE.location.split(",")[0]} who builds AI systems for businesses that run on messages, photos and spreadsheets. I take a product from the first prototype to production: the model calls, the backend, the queue, the mobile app and the dashboard.`}
        />
      </section>

      <section className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3">
        {SERVICES.map((s, i) => (
          <div key={s.title} className="bg-bg p-6 md:p-10">
            <span className="font-mono text-xs text-accent">0{i + 1}</span>
            <h2 className="mt-4 text-2xl font-medium">{s.title}</h2>
            <p className="mt-2 text-muted">{s.body}</p>
          </div>
        ))}
      </section>

      <section className="py-20 md:py-32">
        <h2 className="mb-8 font-mono text-xs tracking-widest text-muted uppercase">How I work</h2>
        <ul>
          {PRINCIPLES.map(([title, body]) => (
            <li key={title} className="grid gap-2 border-t border-line py-8 md:grid-cols-2 md:py-10">
              <p className="text-2xl font-medium tracking-tight md:text-4xl">{title}</p>
              <p className="text-lg text-muted md:pt-2">{body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="pb-20 md:pb-32">
        <h2 className="mb-8 font-mono text-xs tracking-widest text-muted uppercase">Tools</h2>
        <ul className="flex flex-wrap gap-2">
          {STACK.map((s) => (
            <li key={s} className="rounded-full border border-line px-4 py-2 text-sm">
              {s}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
