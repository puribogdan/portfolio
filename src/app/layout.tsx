import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";
import Magnetic from "@/components/Magnetic";
import Clock from "@/components/Clock";
import CommandMenu, { CommandButton } from "@/components/CommandMenu";
import { SITE } from "@/content/projects";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: { default: `${SITE.name} — AI systems & apps`, template: `%s — ${SITE.name}` },
  description:
    "I build AI systems that run real businesses: WhatsApp-to-ERP order engines, AI video pipelines, and the mobile apps on top of them.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Returning visitors skip the intro before first paint, so the overlay never flashes. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("intro"))document.documentElement.dataset.ready="1"}catch(e){}`,
          }}
        />
      </head>
      <body className="font-sans">
        <noscript>
          <style>{`[data-preloader]{display:none}.rise,.fade-in{animation:none}`}</style>
        </noscript>
        <Preloader />
        <SmoothScroll />
        <Cursor />
        <CommandMenu />

        <header className="fade-in fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-gradient-to-b from-bg/80 to-transparent px-4 py-5 md:px-8">
          <Link href="/" className="font-medium">
            {SITE.name}
          </Link>
          <nav className="flex items-center gap-4 text-sm text-muted md:gap-8">
            <Link href="/#work" className="transition-colors hover:text-fg">Work</Link>
            <Link href="/lab" className="transition-colors hover:text-fg">Lab</Link>
            <Link href="/about" className="transition-colors hover:text-fg">About</Link>
            <CommandButton />
          </nav>
        </header>

        {children}

        <footer id="contact" className="border-t border-line px-4 pt-24 pb-8 md:px-8 md:pt-36">
          <p className="font-mono text-xs text-muted">Have a process that should run itself?</p>
          <div className="mt-4 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <h2 className="text-[clamp(3rem,9vw,8rem)] leading-[0.95] font-medium tracking-tighter">
              Let&apos;s build <em className="font-serif font-normal text-accent">it</em>.
            </h2>
            <Magnetic>
              <a
                href={`mailto:${SITE.email}`}
                data-cursor="Email"
                className="grid size-36 place-items-center rounded-full bg-accent text-center font-medium text-bg transition-transform hover:scale-105 md:size-44"
              >
                Get in touch
              </a>
            </Magnetic>
          </div>
          <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 font-mono text-xs text-muted">
            <span>© 2026 {SITE.name}</span>
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-accent" /> Available for work
            </span>
            <span>
              {SITE.location} · <Clock />
            </span>
            <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-fg">
              {SITE.email}
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
