import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/reveal";

const infoCards = [
  { label: "Currently", value: "Final Year · Vishwaniketan iMEET" },
  { label: "Based in", value: "Mumbai (open to Pune · Bangalore)" },
  { label: "Running", value: "Amarklab — active hardware business" },
  { label: "Looking for", value: "IoT + Consumer Hardware startup" },
];

export function About() {
  return (
    <section
      id="about"
      className="border-t border-border bg-[#070707] scroll-mt-20"
    >
      <div className="container py-24 md:py-32">
        <Reveal>
          <p className="font-mono text-sm text-accent">{"// about"}</p>
        </Reveal>

        <div className="mt-8 grid gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <div className="space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              <p>
                I&apos;m a final year engineering student from Solapur. I build
                hardware because I can&apos;t stop — every gap I notice becomes a
                project I can&apos;t leave alone until it works.
              </p>
              <p>
                I don&apos;t separate learning from building. The 3D printer
                taught me manufacturing. The macropad taught me that firmware is
                the easy part. The deployments taught me that real users break
                things in ways you never imagine at your desk.
              </p>
              <p className="text-foreground">
                I&apos;m looking for an early-stage hardware startup where the
                work is real from day one. Not a guided internship. A real one.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid gap-4 sm:grid-cols-2">
              {infoCards.map((c) => (
                <Card key={c.label}>
                  <CardContent className="p-5">
                    <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      {c.label}
                    </p>
                    <p className="mt-2 font-medium leading-snug text-foreground">
                      {c.value}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
