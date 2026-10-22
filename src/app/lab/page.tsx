import type { Metadata } from "next";
import LabGrid from "@/components/LabGrid";
import Apps from "@/components/Apps";

export const metadata: Metadata = {
  title: "Lab",
  description: "Side projects, bots, hardware hacks and prototypes.",
};

export default function LabPage() {
  return (
    <main className="pt-36 md:pt-48">
      <div className="px-4 md:px-8">
        <h1 className="text-[clamp(3rem,10vw,9rem)] leading-[0.92] font-medium tracking-tighter">
          <span className="block overflow-hidden pb-[0.06em]">
            <span className="rise">
              The <em className="font-serif font-normal text-accent">lab</em>
            </span>
          </span>
        </h1>
        <p className="fade-in mt-6 max-w-2xl text-xl text-muted md:text-2xl">
          Small things built to scratch an itch: bots that watch the internet for me, a smartwatch turned into a tennis
          scoreboard, and tools I wanted to exist.
        </p>
        <div className="mt-16 md:mt-24">
          <LabGrid />
        </div>
      </div>
      <Apps />
    </main>
  );
}
