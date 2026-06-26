import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Reveal } from "@/components/reveal";

const columns = [
  {
    title: "Embedded Systems",
    skills: [
      "ESP32",
      "RP2040",
      "Raspberry Pi",
      "FreeRTOS",
      "I2C",
      "SPI",
      "UART",
      "MQTT",
      "PlatformIO",
    ],
  },
  {
    title: "Software",
    skills: [
      "Node.js",
      "Python",
      "C",
      "Embedded C",
      "REST APIs",
      "Git",
      "MongoDB",
      "OpenCV",
    ],
  },
  {
    title: "Hardware Design",
    skills: [
      "Fusion 360",
      "PCB Design",
      "KiCad",
      "EasyEDA",
      "3D Printing",
      "Schematic Design",
      "Electronics Prototyping",
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="container scroll-mt-20 py-24 md:py-32">
      <Reveal>
        <p className="font-mono text-sm text-accent">{"// capabilities"}</p>
        <h2 className="mt-3 max-w-2xl font-heading text-4xl font-bold tracking-tight md:text-5xl">
          What I work with.
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {columns.map((col, i) => (
          <Reveal key={col.title} delay={i * 0.1}>
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle className="font-mono text-lg text-accent">
                  {col.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <ul className="space-y-4">
                  {col.skills.map((s) => (
                    <li
                      key={s}
                      className="flex items-center gap-3 font-mono text-base text-foreground/90"
                    >
                      <span className="text-accent">{"→"}</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
