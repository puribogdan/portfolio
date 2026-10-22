"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { SITE, WORK } from "@/content/projects";

const OPEN = "open-command-menu";

export function CommandButton() {
  return (
    <button
      onClick={() => window.dispatchEvent(new Event(OPEN))}
      className="rounded-full border border-line px-2.5 py-1 font-mono text-xs text-muted transition-colors hover:border-fg hover:text-fg"
      aria-label="Open command menu"
    >
      ⌘K
    </button>
  );
}

function Item({ onSelect, children, hint }: { onSelect: () => void; children: React.ReactNode; hint?: string }) {
  return (
    <Command.Item onSelect={onSelect} className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm data-[selected=true]:bg-line">
      <span>{children}</span>
      {hint && <span className="font-mono text-xs text-muted">{hint}</span>}
    </Command.Item>
  );
}

export default function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const show = () => setOpen(true);
    window.addEventListener("keydown", down);
    window.addEventListener(OPEN, show);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener(OPEN, show);
    };
  }, []);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command menu"
      overlayClassName="fixed inset-0 z-[95] bg-black/60 backdrop-blur-sm"
      contentClassName="fixed top-[15vh] left-1/2 z-[96] w-[min(560px,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-2xl border border-line bg-card shadow-2xl"
    >
      <Command.Input
        placeholder="Search projects, pages, actions…"
        className="w-full border-b border-line bg-transparent px-4 py-4 text-base outline-none placeholder:text-muted"
      />
      <Command.List className="max-h-[50vh] overflow-y-auto p-2 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:text-muted">
        <Command.Empty className="px-3 py-6 text-center text-sm text-muted">Nothing found.</Command.Empty>
        <Command.Group heading="Case studies">
          {WORK.map((p) => (
            <Item key={p.slug} onSelect={() => go(`/work/${p.slug}`)} hint={p.year}>
              {p.title}
            </Item>
          ))}
        </Command.Group>
        <Command.Group heading="Pages">
          <Item onSelect={() => go("/")}>Home</Item>
          <Item onSelect={() => go("/#work")}>Selected work</Item>
          <Item onSelect={() => go("/lab")}>Lab</Item>
          <Item onSelect={() => go("/about")}>About</Item>
        </Command.Group>
        <Command.Group heading="Contact">
          <Item
            onSelect={() => {
              navigator.clipboard.writeText(SITE.email).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              });
            }}
            hint={copied ? "Copied" : undefined}
          >
            Copy email
          </Item>
          <Item onSelect={() => (window.location.href = `mailto:${SITE.email}`)}>Send an email</Item>
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}
