import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlaceholderImage } from "@/components/placeholder-image";
import type { Project } from "@/lib/projects";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const num = String(index + 1).padStart(2, "0");

  return (
    // `relative` + a stretched overlay link keeps the whole card clickable
    // while letting the GitHub icon sit on top as its own separate link.
    <Card className="group relative flex h-full flex-col overflow-hidden transition-colors duration-300 hover:border-accent/60">
      <PlaceholderImage
        src={project.images[0]}
        alt={project.title}
        label={project.title}
        className="aspect-[16/10] w-full rounded-none border-0 border-b border-border"
      />

      {/* GitHub icon — sits above the stretched link (z-20) */}
      <a
        href={project.github || "#"}
        target={project.github ? "_blank" : undefined}
        rel={project.github ? "noopener noreferrer" : undefined}
        aria-label={`${project.title} on GitHub`}
        className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background/80 text-foreground backdrop-blur transition-colors hover:border-accent hover:text-accent"
      >
        <Github className="h-4 w-4" />
      </a>

      <CardContent className="flex flex-1 flex-col p-6">
        <span className="font-mono text-xs text-muted-foreground">{num} /</span>
        <h3 className="mt-2 font-heading text-2xl font-semibold tracking-tight">
          {project.title}
        </h3>
        <p className="mt-2 font-mono text-sm text-accent">{project.outcome}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <Badge key={s}>{s}</Badge>
          ))}
        </div>

        <span className="mt-6 inline-flex items-center gap-1 font-mono text-sm text-foreground transition-colors group-hover:text-accent">
          View Project
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </CardContent>

      {/* Stretched link: makes the entire card navigate to the detail page. */}
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`View ${project.title}`}
        className="absolute inset-0 z-10"
      />
    </Card>
  );
}
