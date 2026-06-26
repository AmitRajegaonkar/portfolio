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
                I&apos;m a final year engineering student from Solapur who builds
                hardware products that real people use. Not just projects. Real
                deployments.
              </p>
              <p>
                I don&apos;t build things to add them to a resume. I build them
                because I can&apos;t not. Every project started because something
                annoyed me or I saw a gap and couldn&apos;t leave it alone.
              </p>
              <p className="text-foreground">
                Looking for an internship at an early-stage hardware startup
                where the work is real and I&apos;m useful from day one.
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
