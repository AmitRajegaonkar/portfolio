"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const badges = [
  "SIH 2024 Winner",
  "ESP32",
  "FreeRTOS",
  "Fusion 360",
  "Active Business",
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Grid background pattern */}
      <div className="pointer-events-none absolute inset-0 grid-bg grid-bg-fade" />

      <div className="container relative grid items-center gap-12 pt-24 md:grid-cols-[minmax(0,1fr)_300px] md:gap-12 md:pt-0 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.p
            variants={item}
            className="mb-6 font-mono text-sm text-accent"
          >
            {"// hardware + software builder"}
          </motion.p>

          <motion.h1
            variants={item}
            className="font-heading text-[2rem] font-extrabold leading-[1.06] tracking-tight [text-wrap:balance] sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl"
          >
            Amit Rajegaonkar.
            <br />
            <span className="text-accent">I Build Hardware That Ships.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Face recognition deployed for MP Police. RFID system running live in
            my college. A macropad better than anything on the market — with
            paying customers to prove it.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-2">
            {badges.map((b) => (
              <Badge key={b} variant="accent">
                {b}
              </Badge>
            ))}
          </motion.div>

          <motion.div
            variants={item}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Button size="lg" onClick={() => scrollToId("work")}>
              See My Work
            </Button>
            <Button asChild size="lg" variant="ghost">
              <a
                href="/Amit_Rajegaonkar_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileText className="h-4 w-4" />
                Resume
              </a>
            </Button>
            <Button
              size="lg"
              variant="ghost"
              onClick={() => scrollToId("contact")}
            >
              Get In Touch
            </Button>
          </motion.div>
        </motion.div>

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[300px] md:mx-0 md:max-w-none"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg border border-border bg-[#0d0d0d]">
            <Image
              src="/imgs/amit.png"
              alt="Amit Rajegaonkar"
              fill
              priority
              sizes="(max-width: 768px) 300px, 360px"
              className="object-cover"
            />
            {/* subtle accent frame accent */}
            <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-accent/10" />
          </div>
          <span className="absolute -bottom-3 left-4 bg-background px-2 font-mono text-xs text-accent">
            {"// solapur → mumbai"}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
