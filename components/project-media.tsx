"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus, Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VideoEmbed, youTubePoster } from "@/components/video-embed";

// hero + INITIAL_REST = 3 images visible before "show more".
const INITIAL_REST = 2;

type LightboxItem =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; url: string; title: string };

// The currently open carousel: a list of items and the index within it.
type Lightbox = { items: LightboxItem[]; index: number };

export function ProjectMedia({
  images,
  videos,
  title,
}: {
  images: string[];
  videos?: string[];
  title: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [lightbox, setLightbox] = useState<Lightbox | null>(null);

  const close = useCallback(() => setLightbox(null), []);

  const step = useCallback((dir: number) => {
    setLightbox((lb) => {
      if (!lb) return lb;
      const n = lb.items.length;
      return { ...lb, index: (lb.index + dir + n) % n };
    });
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    // Lock background scroll while the lightbox is open.
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [lightbox, close, step]);

  // Pre-built carousels: clicking an image opens the image set; clicking a
  // video opens the video set. Arrows/buttons cycle within that set.
  const imageItems: LightboxItem[] = images.map((src, i) => ({
    type: "image",
    src,
    alt: i === 0 ? `${title} — main image` : `${title} — detail ${i}`,
  }));
  const videoItems: LightboxItem[] = (videos ?? []).map((url, i) => ({
    type: "video",
    url,
    title: `${title} — demo ${i + 1}`,
  }));

  const openImage = (i: number) =>
    setLightbox({ items: imageItems, index: i });
  const openVideo = (i: number) =>
    setLightbox({ items: videoItems, index: i });

  const active = lightbox ? lightbox.items[lightbox.index] : null;
  const showNav = (lightbox?.items.length ?? 0) > 1;

  const hero = images[0];
  const rest = images.slice(1);
  const visibleRest = expanded ? rest : rest.slice(0, INITIAL_REST);
  const hiddenCount = rest.length - INITIAL_REST;

  return (
    <div>
      {/* Image gallery */}
      {hero ? (
        <ImageTile
          src={hero}
          alt={`${title} — main image`}
          label={title}
          priority
          className="aspect-[16/9] w-full"
          onClick={() => openImage(0)}
        />
      ) : null}

      {visibleRest.length > 0 ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {visibleRest.map((img, i) => (
            <ImageTile
              key={img}
              src={img}
              alt={`${title} — detail ${i + 1}`}
              label={`${title} · ${i + 2}`}
              className="aspect-[4/3] w-full"
              onClick={() => openImage(i + 1)}
            />
          ))}
        </div>
      ) : null}

      {hiddenCount > 0 ? (
        <div className="mt-5 flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? (
              <>
                <Minus className="h-4 w-4" />
                Show less
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                {hiddenCount} more {hiddenCount === 1 ? "image" : "images"}
              </>
            )}
          </Button>
        </div>
      ) : null}

      {/* Demo videos — click a tile to open it in focus */}
      {videos && videos.length > 0 ? (
        <div className="mt-12">
          <p className="mb-4 font-mono text-sm uppercase tracking-wider text-accent">
            {videos.length > 1 ? "Demos" : "Demo"}
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {videos.map((url, i) => (
              <div key={url}>
                {videos.length > 1 ? (
                  <p className="mb-2 font-mono text-xs text-muted-foreground">
                    Demo {i + 1}
                  </p>
                ) : null}
                <VideoTile
                  url={url}
                  label={`${title} — demo ${i + 1}`}
                  onClick={() => openVideo(i)}
                />
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* Lightbox */}
      <AnimatePresence>
        {active && lightbox ? (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-md border border-border bg-background/70 text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Prev / Next carousel controls */}
            {showNav ? (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(-1);
                  }}
                  aria-label="Previous"
                  className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-md border border-border bg-background/70 text-foreground transition-colors hover:border-accent hover:text-accent md:left-6 md:h-12 md:w-12"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(1);
                  }}
                  aria-label="Next"
                  className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-md border border-border bg-background/70 text-foreground transition-colors hover:border-accent hover:text-accent md:right-6 md:h-12 md:w-12"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                <span className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 rounded-full border border-border bg-background/70 px-3 py-1 font-mono text-xs text-muted-foreground">
                  {lightbox.index + 1} / {lightbox.items.length}
                </span>
              </>
            ) : null}

            <motion.div
              key={lightbox.index}
              className="relative w-full max-w-5xl"
              initial={{ scale: 0.92, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
            >
              {active.type === "image" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={encodeURI(active.src)}
                  alt={active.alt}
                  className="mx-auto max-h-[82vh] w-auto max-w-full rounded-md border border-border object-contain"
                />
              ) : (
                <VideoEmbed
                  url={active.url}
                  title={active.title}
                  autoPlay
                  className="w-full"
                />
              )}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

// 1x1 dark pixel blur placeholder.
const BLUR =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAsLCwAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";

function ImageTile({
  src,
  alt,
  label,
  className,
  priority,
  onClick,
}: {
  src: string;
  alt: string;
  label: string;
  className?: string;
  priority?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Open ${label}`}
      className={`group relative block overflow-hidden rounded-md border border-border bg-[#0d0d0d] ${className ?? ""}`}
    >
      <Image
        src={encodeURI(src)}
        alt={alt}
        fill
        placeholder="blur"
        blurDataURL={BLUR}
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={priority}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15" />
    </button>
  );
}

function VideoTile({
  url,
  label,
  onClick,
}: {
  url: string;
  label: string;
  onClick: () => void;
}) {
  const poster = youTubePoster(url);
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Play ${label}`}
      className="group relative block aspect-video w-full overflow-hidden rounded-md border border-border bg-[#0d0d0d]"
    >
      {poster ? (
        <Image
          src={poster}
          alt={label}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 grid-bg" />
      )}
      <span className="absolute inset-0 bg-black/30 transition-colors duration-300 group-hover:bg-black/15" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-accent/60 bg-background/70 text-accent backdrop-blur transition-transform duration-300 group-hover:scale-110">
          <Play className="ml-1 h-7 w-7 fill-accent" />
        </span>
      </span>
    </button>
  );
}
