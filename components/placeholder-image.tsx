import Image from "next/image";
import { cn } from "@/lib/utils";

interface PlaceholderImageProps {
  /** Path to the real image when dropped in later. */
  src?: string;
  alt: string;
  /** Short label shown on the placeholder surface. */
  label?: string;
  className?: string;
  priority?: boolean;
  /**
   * Responsive `sizes` hint so next/image serves a correctly-scaled variant
   * instead of a full-width one. Defaults to a half-width layout.
   */
  sizes?: string;
}

// 1x1 dark pixel used as the blur placeholder until real photos are added.
const BLUR =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAsLCwAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";

/**
 * Renders a real next/image when `src` resolves to an actual file, otherwise
 * a dark technical placeholder rectangle with the project name as alt text.
 * Drop real photos into /public/projects to replace placeholders.
 */
export function PlaceholderImage({
  src,
  alt,
  label,
  className,
  priority,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: PlaceholderImageProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md border border-border bg-[#0d0d0d]",
        className
      )}
    >
      {src ? (
        // Real, next/image-optimized photo once the file is dropped in.
        // encodeURI handles folder/file names that contain spaces.
        <Image
          src={encodeURI(src)}
          alt={alt}
          fill
          placeholder="blur"
          blurDataURL={BLUR}
          sizes={sizes}
          quality={70}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="object-cover"
        />
      ) : (
        // Dark technical placeholder rectangle (project name as alt text).
        <>
          <div className="pointer-events-none absolute inset-0 grid-bg" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 p-4 text-center">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              [ image ]
            </span>
            <span className="font-mono text-xs text-muted-foreground/80">
              {label ?? alt}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
