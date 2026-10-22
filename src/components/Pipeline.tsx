"use client";

import { useLayoutEffect, useRef, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

type IconName = "chat" | "photo" | "wave" | "order" | "render" | "play";

const STEPS: {
  in: { title: string; detail: string; icon: IconName };
  out: { title: string; detail: string; icon: IconName };
  project: string;
  blurb: string;
  stack: string[];
}[] = [
  {
    in: { title: "WhatsApp", detail: "„20 baxuri apă plată, livrare joi”", icon: "chat" },
    out: { title: "ERP order #4821", detail: "Apă plată 2L × 20 · joi", icon: "order" },
    project: "Evolio Order Engine",
    blurb: "WhatsApp and email messages become validated ERP orders. Nobody retypes anything.",
    stack: ["NestJS", "BullMQ", "Mistral OCR", "OpenTelemetry"],
  },
  {
    in: { title: "Room photo", detail: "bedroom_112.jpg", icon: "photo" },
    out: { title: "Redesigned room", detail: "4 styles · 2 angles", icon: "render" },
    project: "AI Interior Design",
    blurb: "Upload a photo of a room, get photoreal redesigns back in seconds.",
    stack: ["Next.js 16", "NestJS", "Supabase", "AI SDK"],
  },
  {
    in: { title: "Voice + images", detail: "story_audio.wav", icon: "wave" },
    out: { title: "video.mp4", detail: "1080p · rendered", icon: "play" },
    project: "DreamPop",
    blurb: "A queue of AI workers turns audio and images into finished, narrated videos.",
    stack: ["FastAPI", "Redis / RQ", "ffmpeg", "Deepgram"],
  },
];

// Diagram geometry in SVG user units; HTML cards are placed with the same numbers as percentages.
const LAYOUTS = {
  wide: {
    w: 1200, h: 620, card: 220, ai: { x: 600, y: 310, r: 80 },
    ins: [[150, 110], [150, 310], [150, 510]],
    outs: [[1050, 110], [1050, 310], [1050, 510]],
  },
  tall: {
    w: 400, h: 640, card: 116, ai: { x: 200, y: 320, r: 58 },
    ins: [[68, 70], [200, 70], [332, 70]],
    outs: [[68, 570], [200, 570], [332, 570]],
  },
};

const ACCENT = "#d4ff3a";
const LINE = "#26262a";

const subscribe = (cb: () => void) => {
  const mq = matchMedia("(max-width: 767px)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

function curve([x1, y1]: number[], [x2, y2]: number[], tall: boolean) {
  if (tall) {
    const my = (y1 + y2) / 2;
    return `M${x1} ${y1} C${x1} ${my} ${x2} ${my} ${x2} ${y2}`;
  }
  const mx = (x1 + x2) / 2;
  return `M${x1} ${y1} C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`;
}

export default function Pipeline() {
  const root = useRef<HTMLElement>(null);
  const tall = useSyncExternalStore(
    subscribe,
    () => matchMedia("(max-width: 767px)").matches,
    () => false,
  );
  const L = tall ? LAYOUTS.tall : LAYOUTS.wide;
  const ai = [L.ai.x, L.ai.y];
  const pct = (v: number, of: number) => `${(v / of) * 100}%`;

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
    const mm = gsap.matchMedia();

    // Reduced motion: no pin, no timeline; the markup's default state is the finished diagram.
    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        const q = gsap.utils.selector(root);
        const ins = q("[data-in]");
        const outs = q("[data-out]");
        const captions = q("[data-caption]");

        gsap.set([...ins, ...outs], { opacity: 0.3 });
        gsap.set(q("[data-glow]"), { strokeDashoffset: 1 });
        gsap.set(q("[data-packet]"), { opacity: 0 });
        gsap.set(captions.slice(1), { autoAlpha: 0, y: 24 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: q("[data-stage]")[0],
            pin: true,
            start: "top top",
            end: `+=${STEPS.length * 110}%`,
            scrub: 0.6,
          },
        });

        STEPS.forEach((_, i) => {
          const s = `s${i}`;
          const packet = q(`[data-packet="${i}"]`)[0];
          tl.addLabel(s);
          if (i > 0) {
            tl.to(captions[i - 1], { autoAlpha: 0, y: -24, duration: 0.5 }, s)
              .to(captions[i], { autoAlpha: 1, y: 0, duration: 0.5 }, s)
              .to([ins[i - 1], outs[i - 1]], { borderColor: LINE, duration: 0.5 }, s);
          }
          tl.to(ins[i], { opacity: 1, borderColor: ACCENT, duration: 0.5 }, s)
            .set(packet, { opacity: 1 }, `${s}+=0.3`)
            .to(q(`[data-glow="in-${i}"]`), { strokeDashoffset: 0, duration: 1.5 }, `${s}+=0.3`)
            .to(packet, { motionPath: { path: `#in-${i}` }, duration: 1.5 }, "<")
            .fromTo(q("[data-ring]"), { scale: 1, opacity: 0.9 }, { scale: 1.5, opacity: 0, duration: 0.8 })
            .to(q(`[data-glow="out-${i}"]`), { strokeDashoffset: 0, duration: 1.5 }, "<")
            .to(packet, { motionPath: { path: `#out-${i}` }, duration: 1.5 }, "<")
            .set(packet, { opacity: 0 })
            .to(outs[i], { opacity: 1, borderColor: ACCENT, duration: 0.6 })
            .to({}, { duration: 0.8 });
        });
      },
      root,
    );

    return () => mm.revert();
  }, [tall]);

  return (
    <section ref={root} aria-labelledby="pipeline-title">
      <div
        data-stage
        className="flex h-svh flex-col items-center justify-center gap-5 px-4 py-8 md:gap-6 md:px-8"
      >
        <h2
          id="pipeline-title"
          className="font-mono text-xs tracking-widest text-muted uppercase"
        >
          Input <span className="text-accent">→</span> AI{" "}
          <span className="text-accent">→</span> Outcome
        </h2>

        <div
          className="relative"
          style={{
            aspectRatio: `${L.w} / ${L.h}`,
            width: `min(100%, calc((100svh - ${tall ? 16 : 21}rem) * ${L.w / L.h}))`,
          }}
        >
          <svg
            viewBox={`0 0 ${L.w} ${L.h}`}
            className="absolute inset-0 h-full w-full"
            fill="none"
            aria-hidden
          >
            {STEPS.map((_, i) => (
              <g key={i}>
                <path id={`in-${i}`} d={curve(L.ins[i], ai, tall)} stroke={LINE} strokeWidth={2} />
                <path id={`out-${i}`} d={curve(ai, L.outs[i], tall)} stroke={LINE} strokeWidth={2} />
                {(["in", "out"] as const).map((dir) => (
                  <path
                    key={dir}
                    data-glow={`${dir}-${i}`}
                    d={dir === "in" ? curve(L.ins[i], ai, tall) : curve(ai, L.outs[i], tall)}
                    stroke={ACCENT}
                    strokeWidth={2}
                    pathLength={1}
                    strokeDasharray={1}
                  />
                ))}
                <circle data-packet={i} r={tall ? 5 : 7} fill={ACCENT} opacity={0} />
              </g>
            ))}
          </svg>

          {STEPS.map((step, i) =>
            (["in", "out"] as const).map((dir) => {
              const [x, y] = (dir === "in" ? L.ins : L.outs)[i];
              const node = step[dir];
              return (
                <div
                  key={dir + i}
                  {...{ [`data-${dir}`]: i }}
                  className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col gap-1 rounded-xl border border-line bg-card p-2 md:gap-2 md:rounded-2xl md:p-4"
                  style={{ left: pct(x, L.w), top: pct(y, L.h), width: pct(L.card, L.w) }}
                >
                  <div className="flex items-center gap-2">
                    <Icon name={node.icon} />
                    <span className="text-[11px] leading-tight font-medium md:text-sm">{node.title}</span>
                  </div>
                  {!tall && <p className="truncate font-mono text-xs text-muted">{node.detail}</p>}
                </div>
              );
            }),
          )}

          <div
            className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
            style={{ left: pct(L.ai.x, L.w), top: pct(L.ai.y, L.h), width: pct(L.ai.r * 2, L.w), aspectRatio: "1" }}
          >
            <span data-ring className="absolute inset-0 rounded-full border-2 border-accent opacity-0" />
            <div className="flex h-full w-full flex-col items-center justify-center rounded-full border border-line bg-card">
              <span className="font-serif text-3xl italic md:text-5xl">AI</span>
              <span className="whitespace-nowrap font-mono text-[9px] text-muted md:text-[11px]">LLM · OCR</span>
            </div>
          </div>
        </div>

        <div className="grid w-full max-w-5xl motion-reduce:gap-8 motion-reduce:md:grid-cols-3">
          {STEPS.map((step, i) => (
            <div key={i} data-caption className="motion-safe:[grid-area:1/1]">
              <p className="font-mono text-xs text-accent">
                0{i + 1} / 0{STEPS.length}
              </p>
              <h3 className="mt-1 text-xl font-medium md:text-3xl">{step.project}</h3>
              <p className="mt-1 max-w-xl text-sm text-muted md:text-base">{step.blurb}</p>
              <ul className="mt-3 hidden flex-wrap gap-2 md:flex">
                {step.stack.map((s) => (
                  <li key={s} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
    chat: <path d="M4 5h16v11H9l-5 4z" />,
    photo: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 16 5-5 4 4 3-3 6 6" />
      </>
    ),
    wave: <path d="M3 12h2M7 8v8M11 5v14M15 9v6M19 11v2" />,
    order: <path d="M6 3h12v18H6zM9 8h6M9 12h6M9 16h3" />,
    render: <path d="m12 3 2 6 6 2-6 2-2 6-2-6-6-2 6-2z" />,
    play: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m10 9 5 3-5 3z" />
      </>
    ),
  };
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-3.5 shrink-0 text-accent md:size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden
    >
      {paths[name]}
    </svg>
  );
}
