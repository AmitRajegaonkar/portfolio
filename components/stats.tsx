"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
} from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface Stat {
  value: string;
  label: string;
  // numeric target for count-up; null = render value as-is (e.g. "SIH 2024")
  target: number | null;
  prefix?: string;
  suffix?: string;
}

const stats: Stat[] = [
  { value: "22+", label: "Orders Shipped", target: 22, suffix: "+" },
  { value: "3", label: "Live Deployments", target: 3 },
  { value: "126K+", label: "Content Views", target: 126, suffix: "K+" },
  { value: "2024", label: "SIH National Winner", target: null },
];

function CountUp({
  target,
  prefix = "",
  suffix = "",
  play,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  play: boolean;
}) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!play) return;
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [play, target]);

  return (
    <span>
      {prefix}
      {val}
      {suffix}
    </span>
  );
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="border-y border-border bg-[#070707]">
      <div ref={ref} className="container py-12">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Card className="h-full bg-card/60">
                <CardContent className="flex flex-col gap-1 p-6">
                  <span className="font-heading text-4xl font-bold text-accent md:text-5xl">
                    {s.target !== null ? (
                      <CountUp
                        target={s.target}
                        suffix={s.suffix}
                        prefix={s.prefix}
                        play={inView}
                      />
                    ) : (
                      s.value
                    )}
                  </span>
                  <span className="mt-1 font-mono text-sm font-medium uppercase tracking-wider text-foreground/80 sm:text-base">
                    {s.label}
                  </span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
