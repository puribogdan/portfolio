import Image from "next/image";
import Phone from "@/components/Phone";
import { APPS } from "@/content/projects";

const FAN = ["-rotate-6 translate-x-6 translate-y-4", "z-10", "rotate-6 -translate-x-6 translate-y-4"];

// The phone's own UI next to what it renders: real Android Auto in a landscape head-unit frame.
function CarScreen({ screen, phone, name }: { screen: string; phone: string; name: string }) {
  return (
    <div className="relative mb-10 w-full max-w-sm transition-transform duration-700 ease-out group-hover:-translate-y-3">
      <div className="relative aspect-[5/3] overflow-hidden rounded-2xl border-[6px] border-[#1d1d20] shadow-2xl">
        <Image src={screen} alt={`Android Auto running on ${name}`} fill sizes="384px" className="object-cover" />
      </div>
      <div className="absolute -right-4 -bottom-8 w-20 rotate-6 md:w-24">
        <Phone src={phone} alt={`${name} home screen`} />
      </div>
    </div>
  );
}

export default function Apps() {
  return (
    <section className="py-24 md:py-36">
      <div className="mb-10 flex items-end justify-between px-4 md:px-8">
        <h2 className="font-mono text-xs tracking-widest text-muted uppercase">Apps I&apos;ve shipped</h2>
        <span className="font-mono text-xs text-muted md:hidden">Swipe →</span>
      </div>

      <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-8">
        {APPS.map((app) => (
          <li
            key={app.name}
            className="group w-[85vw] shrink-0 snap-center overflow-hidden rounded-3xl border border-line bg-card md:w-auto"
          >
            <div className="relative flex h-80 items-end justify-center overflow-hidden px-8 pt-10 md:h-96">
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-accent/10 to-transparent" />
              {app.screens ? (
                app.screens.map((s, i) => (
                  <div
                    key={s}
                    className={`-mb-24 w-36 shrink-0 transition-transform duration-700 ease-out group-hover:-translate-y-6 md:w-44 ${FAN[i]}`}
                  >
                    <Phone src={s} alt={`${app.name} screen ${i + 1}`} />
                  </div>
                ))
              ) : app.car ? (
                <CarScreen {...app.car} name={app.name} />
              ) : (
                <div className="-mb-24 w-44 transition-transform duration-700 ease-out group-hover:-translate-y-6 md:w-52">
                  <Phone>
                    <div className="flex h-full flex-col gap-3 p-4 pt-8">
                      <span className="font-serif text-2xl italic">{app.name}</span>
                      {app.points?.map((pt) => (
                        <span key={pt} className="rounded-xl border border-line bg-card p-3 text-xs">
                          <span className="mb-1 block size-1.5 rounded-full bg-accent" />
                          {pt}
                        </span>
                      ))}
                    </div>
                  </Phone>
                </div>
              )}
            </div>
            <div className="relative z-20 border-t border-line bg-card p-6">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-2xl font-medium">{app.name}</h3>
                <span className="font-mono text-xs text-muted">{app.platform}</span>
              </div>
              <p className="mt-2 text-muted">{app.tagline}</p>
              <p className="mt-4 font-mono text-xs text-muted">{app.stack.join(" · ")}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
