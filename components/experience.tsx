import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";

interface Role {
  company: string;
  location: string;
  title: string;
  period: string;
  current?: boolean;
  points: string[];
  stack?: string[];
}

// Sourced from Amit's resume — most recent first (top of the branch).
const roles: Role[] = [
  {
    company: "Amarklab",
    location: "Mumbai",
    title: "Product Engineer & Founder",
    period: "Jun 2025 — Present",
    current: true,
    points: [
      "Design and ship a workflow device end-to-end — owning firmware, mechanical design, manufacturing, and delivery.",
      "Fulfilled 20+ paid orders as sole founder, generating the company's first revenue.",
      "Grew product presence to 900+ Instagram followers and 126K+ total content views.",
    ],
    stack: ["RP2040", "Firmware", "KiCad", "Fusion 360"],
  },
  {
    company: "MP Police",
    location: "Bhopal",
    title: "Embedded Systems Developer",
    period: "Dec 2024 — Mar 2025",
    points: [
      "Engineered a face-recognition system for Madhya Pradesh Police using Raspberry Pi and OpenCV.",
      "Took a complete prototype to production-ready status, validated in a live demonstration to MP Police officials.",
      "Managed all phases from hardware selection to final demonstration.",
    ],
    stack: ["Raspberry Pi", "OpenCV", "Python"],
  },
  {
    company: "Vishwaniketan Institute",
    location: "Khopoli",
    title: "IoT Developer",
    period: "Feb 2024 — Nov 2024",
    points: [
      "Developed and deployed an RFID-based institute management system using ESP32 with a Node.js backend and real-time dashboard.",
      "Executed full setup including on-site hardware installation and software deployment — taking it from prototype to live deployment.",
    ],
    stack: ["ESP32", "RFID", "Node.js", "MongoDB"],
  },
];

export function Experience() {
  return (
    <section
      id="experience"
      className="border-t border-border bg-[#070707] scroll-mt-20"
    >
      <div className="container py-24 md:py-32">
        <Reveal>
          <p className="font-mono text-sm text-accent">{"// experience"}</p>
          <h2 className="mt-3 max-w-2xl font-heading text-4xl font-bold tracking-tight md:text-5xl">
            Where I&apos;ve worked.
          </h2>
        </Reveal>

        {/* Branch / timeline */}
        <div className="relative mt-14 pl-8 sm:pl-10">
          {/* The vertical branch line */}
          <span
            aria-hidden
            className="absolute left-[7px] top-2 bottom-2 w-px bg-border sm:left-[9px]"
          />

          <ol className="space-y-12">
            {roles.map((role, i) => (
              <Reveal as="li" key={role.company} delay={i * 0.08}>
                <div className="relative">
                  {/* Node on the branch */}
                  <span
                    aria-hidden
                    className={[
                      "absolute top-1.5 flex h-4 w-4 items-center justify-center rounded-full border",
                      "-left-8 sm:-left-10",
                      role.current
                        ? "border-accent bg-accent"
                        : "border-border bg-background",
                    ].join(" ")}
                  >
                    {role.current ? (
                      <span className="absolute h-4 w-4 animate-ping rounded-full bg-accent/60" />
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                    )}
                  </span>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-mono text-xs text-muted-foreground">
                      {role.period}
                    </span>
                    {role.current ? (
                      <span className="rounded-sm border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">
                        Now
                      </span>
                    ) : null}
                  </div>

                  <h3 className="mt-2 font-heading text-2xl font-semibold tracking-tight">
                    {role.title}
                  </h3>
                  <p className="mt-1 font-mono text-sm text-accent">
                    {role.company}
                    <span className="text-muted-foreground">
                      {" · "}
                      {role.location}
                    </span>
                  </p>

                  <ul className="mt-4 space-y-2">
                    {role.points.map((p) => (
                      <li
                        key={p}
                        className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span className="mt-1 text-accent">{"→"}</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>

                  {role.stack ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {role.stack.map((s) => (
                        <Badge key={s}>{s}</Badge>
                      ))}
                    </div>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
