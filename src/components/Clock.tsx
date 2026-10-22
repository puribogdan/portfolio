"use client";

import { useSyncExternalStore } from "react";
import { SITE } from "@/content/projects";

const fmt = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: SITE.timeZone,
  timeZoneName: "short",
});

const subscribe = (cb: () => void) => {
  const id = setInterval(cb, 1000);
  return () => clearInterval(id);
};

export default function Clock() {
  const time = useSyncExternalStore(subscribe, () => fmt.format(new Date()), () => "--:--");
  return <time suppressHydrationWarning>{time}</time>;
}
