import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProjectMedia } from "@/components/project-media";
import { Reveal } from "@/components/reveal";
import { Footer } from "@/components/footer";
import { projects, getProject, getNextProject } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = getProject(params.slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} — Amit Rajegaonkar`,
    description: project.description,
  };
}

export default function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const next = getNextProject(project.slug);

  const meta = [
    { label: "Status", value: project.status },
    { label: "Timeline", value: project.timeline },
    { label: "My Role", value: project.role },
  ];

  return (
    <>
      <main className="container max-w-5xl py-12 md:py-20">
        {/* Back button */}
        <Button asChild variant="ghost" size="sm">
          <Link href="/#work">
            <ArrowLeft className="h-4 w-4" />
            Back to work
          </Link>
        </Button>

        {/* Hero block */}
        <Reveal className="mt-10">
          <p className="font-mono text-sm text-muted-foreground">
            {"// "}
            {project.slug}
          </p>
          <h1 className="mt-3 font-heading text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            {project.title}
          </h1>
          <p className="mt-4 font-mono text-base text-accent md:text-lg">
            {project.outcome}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <Badge key={s} variant="accent">
                {s}
              </Badge>
            ))}
          </div>
        </Reveal>

        {/* Image gallery + demo videos (click to zoom into focus) */}
        <Reveal className="mt-12">
          <ProjectMedia
            images={project.images}
            videos={project.videos}
            title={project.title}
          />
        </Reveal>

        {/* Two column content */}
        <div className="mt-16 grid gap-12 md:grid-cols-[1fr_320px] md:gap-12">
          <Reveal className="space-y-10">
            <div>
              <h2 className="font-mono text-sm uppercase tracking-wider text-accent">
                The Problem
              </h2>
              <Paragraphs text={project.problem} />
            </div>

            <div>
              <h2 className="font-mono text-sm uppercase tracking-wider text-accent">
                What I Built
              </h2>
              <Paragraphs text={project.whatIBuilt} />
            </div>

            <div>
              <h2 className="font-mono text-sm uppercase tracking-wider text-accent">
                What I Learned / What Broke
              </h2>
              <Paragraphs text={project.whatILearned} />
            </div>
          </Reveal>

          {/* Metadata card */}
          <Reveal>
            <Card className="md:sticky md:top-24">
              <CardContent className="p-6">
                <div className="space-y-5">
                  {meta.map((m) => (
                    <div key={m.label}>
                      <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                        {m.label}
                      </p>
                      <p className="mt-1 text-sm font-medium text-foreground">
                        {m.value}
                      </p>
                    </div>
                  ))}

                  <Separator />

                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      Stack
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {project.stack.map((s) => (
                        <li
                          key={s}
                          className="flex items-center gap-2 font-mono text-sm text-muted-foreground"
                        >
                          <span className="text-accent">{"→"}</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </div>

        {/* Next project */}
        <Reveal className="mt-20">
          <Link href={`/projects/${next.slug}`} className="group block">
            <Card className="transition-colors duration-300 group-hover:border-accent/60">
              <CardContent className="flex flex-col gap-2 p-8 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    Next project
                  </p>
                  <p className="mt-2 font-heading text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent">
                    {next.title}
                  </p>
                  <p className="mt-1 font-mono text-sm text-accent">
                    {next.outcome}
                  </p>
                </div>
                <ArrowRight className="h-6 w-6 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-accent" />
              </CardContent>
            </Card>
          </Link>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}

// Renders text into one paragraph per blank-line-separated block.
function Paragraphs({ text }: { text: string }) {
  const blocks = text.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  return (
    <div className="mt-3 space-y-3">
      {blocks.map((b, i) => (
        <p key={i} className="text-base leading-relaxed text-muted-foreground">
          {b}
        </p>
      ))}
    </div>
  );
}
