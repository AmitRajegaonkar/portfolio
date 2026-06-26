import { Mail, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20">
      <div className="container py-24 text-center md:py-32">
        <Reveal>
          <p className="font-mono text-sm text-muted-foreground">{"// contact"}</p>
          <h2 className="mx-auto mt-4 max-w-3xl font-heading text-4xl font-bold tracking-tight md:text-6xl">
            Building something hard?
          </h2>
          <p className="mt-3 font-heading text-3xl font-bold text-accent md:text-4xl">
            Let&apos;s talk.
          </p>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            If you&apos;re a founder or engineer at a hardware startup and need
            someone who ships from day one — reach out.
          </p>

          {/* Email as plain, copyable text */}
          <a
            href="mailto:amitrajegaonkar@gmail.com"
            className="mt-8 inline-block select-all font-mono text-lg text-foreground underline-offset-4 transition-colors hover:text-accent hover:underline md:text-xl"
          >
            amitrajegaonkar@gmail.com
          </a>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href="mailto:amitrajegaonkar@gmail.com">
                <Mail className="h-4 w-4" />
                Email
              </a>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <a
                href="https://www.linkedin.com/in/amitrajegaonkar"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <a
                href="https://github.com/amitrajegaonkar"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
