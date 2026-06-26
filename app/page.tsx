import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Stats } from "@/components/stats";
import { Experience } from "@/components/experience";
import { Skills } from "@/components/skills";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { projects } from "@/lib/projects";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />

        {/* Section 4 — Projects */}
        <section id="work" className="container scroll-mt-20 py-24 md:py-32">
          <Reveal>
            <p className="font-mono text-sm text-accent">{"// selected work"}</p>
            <h2 className="mt-3 max-w-2xl font-heading text-4xl font-bold tracking-tight md:text-5xl">
              Things I&apos;ve actually built.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {projects.map((project, i) => (
              <Reveal key={project.slug} delay={(i % 2) * 0.1}>
                <ProjectCard project={project} index={i} />
              </Reveal>
            ))}
          </div>
        </section>

        <Experience />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
