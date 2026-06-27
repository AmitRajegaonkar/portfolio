"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { PlaceholderImage } from "@/components/placeholder-image";
import { Reveal } from "@/components/reveal";

interface Moment {
  src: string;
  title: string;
}

// Title is derived from each image — typos in the source filenames cleaned up.
const moments: Moment[] = [
  {
    src: "/imgs/Beyond Code/SMART_INDIA_HACKATHON_ winner.jpg",
    title: "Smart India Hackathon — National Winner",
  },
  {
    src: "/imgs/Beyond Code/best startup ready prototype award.jpeg",
    title: "Best Startup-Ready Prototype Award",
  },
  {
    src: "/imgs/Beyond Code/core memeber of nation level hackthon .jpeg",
    title: "Core Member — National-Level Hackathon",
  },
  {
    src: "/imgs/Beyond Code/apprication from HOD.jpeg",
    title: "Appreciation from HOD",
  },
  {
    src: "/imgs/Beyond Code/ATHARVA UNIVERSITY  TECHITHON 2026.jpeg",
    title: "Atharva University — Techithon 2026",
  },
  {
    src: "/imgs/Beyond Code/Web Development Hackathon organized.jpg",
    title: "Web Development Hackathon — Winner",
  },
  {
    src: "/imgs/Beyond Code/iic regional meet 2005.jpeg",
    title: "IIC Regional Meet",
  },
  {
    src: "/imgs/Beyond Code/iic regional meet team .jpeg",
    title: "IIC Regional Meet — Team",
  },
  {
    src: "/imgs/Beyond Code/frist hackthon team.jpg",
    title: "First Hackathon — Team",
  },
  {
    src: "/imgs/Beyond Code/brusing at the frsit hackthone.jpeg",
    title: "Brushing at the First Hackathon 😅",
  },
];

export function BeyondCode() {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback((dir: number) => {
    setIndex((i) =>
      i === null ? i : (i + dir + moments.length) % moments.length
    );
  }, []);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [index, close, step]);

  const active = index === null ? null : moments[index];

  return (
    <section id="beyond" className="container scroll-mt-20 py-24 md:py-32">
      <Reveal>
        <p className="font-mono text-sm text-accent">{"// beyond code"}</p>
        <h2 className="mt-3 max-w-2xl font-heading text-4xl font-bold tracking-tight md:text-5xl">
          Beyond the code.
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
          Hackathons, awards, and the people I build with. The stuff that
          doesn&apos;t fit in a repo.
        </p>
      </Reveal>

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {moments.map((m, i) => (
          <Reveal key={m.src} delay={(i % 4) * 0.06}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`View: ${m.title}`}
              className="group relative block w-full overflow-hidden rounded-lg border border-border bg-[#0d0d0d] text-left transition-colors hover:border-accent/60"
            >
              <PlaceholderImage
                src={m.src}
                alt={m.title}
                label={m.title}
                className="aspect-[4/3] w-full rounded-none border-0 transition-transform duration-500 group-hover:scale-105"
              />
              {/* Caption overlay */}
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 pt-8">
                <span className="font-mono text-xs font-bold leading-snug text-foreground">
                  {m.title}
                </span>
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && index !== null ? (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-md border border-border bg-background/70 text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Previous"
              className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-md border border-border bg-background/70 text-foreground transition-colors hover:border-accent hover:text-accent md:left-6 md:h-12 md:w-12"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="Next"
              className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-md border border-border bg-background/70 text-foreground transition-colors hover:border-accent hover:text-accent md:right-6 md:h-12 md:w-12"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <span className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 rounded-full border border-border bg-background/70 px-3 py-1 font-mono text-xs text-muted-foreground">
              {index + 1} / {moments.length}
            </span>

            <motion.figure
              key={index}
              className="relative w-full max-w-4xl"
              initial={{ scale: 0.92, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={encodeURI(active.src)}
                alt={active.title}
                className="mx-auto max-h-[78vh] w-auto max-w-full rounded-md border border-border object-contain"
              />
              <figcaption className="mt-4 text-center font-heading text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                {active.title}
              </figcaption>
            </motion.figure>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
