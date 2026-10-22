"use client";

import { useEffect, useState } from "react";

const WORDS = ["Salut", "Hello", "Hola", "Bonjour", "Ciao", "Hallo", "Olá", "Salut"];

// Once per session. Sets html[data-ready] when done, which un-pauses the hero's CSS animations.
export default function Preloader() {
  const [i, setI] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("intro") === "1";
      sessionStorage.setItem("intro", "1");
    } catch {}
    const skip = seen || matchMedia("(prefers-reduced-motion: reduce)").matches;
    let n = 0;
    const finish = () => {
      setDone(true);
      document.documentElement.dataset.ready = "1";
    };
    let t: ReturnType<typeof setTimeout>;
    const step = () => {
      if (skip || ++n >= WORDS.length) return finish();
      setI(n);
      t = setTimeout(step, 160);
    };
    t = setTimeout(step, skip ? 0 : 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      data-preloader
      aria-hidden
      className={`fixed inset-0 z-[90] grid place-items-center bg-[#050506] transition-[translate,visibility] duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        done ? "invisible -translate-y-full" : ""
      }`}
    >
      <p className="flex items-center gap-3 text-4xl font-medium tracking-tight md:text-6xl">
        <span className="size-2.5 rounded-full bg-accent md:size-3" />
        {WORDS[i]}
      </p>
    </div>
  );
}
