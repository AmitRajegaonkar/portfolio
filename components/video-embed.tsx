"use client";

import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Converts any common YouTube / Vimeo URL into an embeddable iframe src.
 * Supported:
 *   https://www.youtube.com/watch?v=ID
 *   https://youtu.be/ID
 *   https://www.youtube.com/shorts/ID
 *   https://www.youtube.com/embed/ID  (already embed)
 *   https://vimeo.com/ID
 *   https://player.vimeo.com/video/ID (already embed)
 * Returns null if it can't recognize the URL.
 */
export function toEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url.trim());
    const host = u.hostname.replace(/^www\./, "");

    // YouTube
    if (host === "youtu.be") {
      const id = u.pathname.slice(1);
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (host === "youtube.com" || host === "m.youtube.com") {
      if (u.pathname.startsWith("/embed/")) return url;
      if (u.pathname.startsWith("/shorts/")) {
        const id = u.pathname.split("/")[2];
        return id ? `https://www.youtube.com/embed/${id}` : null;
      }
      const id = u.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    // Vimeo
    if (host === "player.vimeo.com") return url;
    if (host === "vimeo.com") {
      const id = u.pathname.split("/").filter(Boolean)[0];
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }

    return null;
  } catch {
    return null;
  }
}

/** Returns a YouTube poster thumbnail URL, or null for non-YouTube links. */
export function youTubePoster(url: string): string | null {
  const embed = toEmbedUrl(url);
  if (!embed || !embed.includes("youtube.com/embed/")) return null;
  const id = embed.split("/embed/")[1].split(/[?&]/)[0];
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}

/** Appends player params: muted by default and no control bar. */
function withParams(
  src: string,
  {
    muted,
    controls,
    autoPlay,
  }: { muted: boolean; controls: boolean; autoPlay: boolean }
): string {
  const isVimeo = src.includes("player.vimeo.com");
  const params: string[] = [];
  if (muted) params.push(isVimeo ? "muted=1" : "mute=1");
  if (autoPlay) params.push("autoplay=1");
  if (!controls) params.push("controls=0");
  if (!isVimeo) {
    // Tidy up the YouTube chrome too, and enable the JS API so we can
    // toggle mute from our own button.
    params.push("modestbranding=1", "rel=0", "playsinline=1", "enablejsapi=1");
  }
  if (params.length === 0) return src;
  return src.includes("?")
    ? `${src}&${params.join("&")}`
    : `${src}?${params.join("&")}`;
}

export function VideoEmbed({
  url,
  title,
  muted = true,
  controls = true,
  autoPlay = false,
  className,
}: {
  url: string;
  title: string;
  /** Start the player muted (default true). */
  muted?: boolean;
  /** Show the native player control bar (default true). */
  controls?: boolean;
  /** Autoplay on mount (default false). */
  autoPlay?: boolean;
  className?: string;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isMuted, setIsMuted] = useState(muted);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  const embed = toEmbedUrl(url);
  if (!embed) return null;

  const isVimeo = embed.includes("player.vimeo.com");
  const src = withParams(embed, { muted, controls, autoPlay });

  const post = (payload: object) => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify(payload),
      "*"
    );
  };

  const toggleMute = () => {
    const next = !isMuted;
    if (isVimeo) {
      post({ method: "setMuted", value: next });
    } else {
      // YouTube IFrame API. unMute also nudges playback so audio is audible.
      post({ event: "command", func: next ? "mute" : "unMute", args: [] });
      if (!next) {
        post({ event: "command", func: "playVideo", args: [] });
        setIsPlaying(true);
      }
    }
    setIsMuted(next);
  };

  const togglePlay = () => {
    const next = !isPlaying;
    if (isVimeo) {
      post({ method: next ? "play" : "pause" });
    } else {
      post({
        event: "command",
        func: next ? "playVideo" : "pauseVideo",
        args: [],
      });
    }
    setIsPlaying(next);
  };

  return (
    <div
      className={cn(
        "group relative aspect-video w-full overflow-hidden rounded-md border border-border bg-[#0d0d0d]",
        className
      )}
    >
      <iframe
        ref={iframeRef}
        src={src}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        className="absolute inset-0 h-full w-full"
      />

      {/* With native controls hidden, provide our own play/pause overlay and
          mute toggle. When controls are shown, let YouTube handle everything. */}
      {!controls ? (
        <>
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause video" : "Play video"}
            className="absolute inset-0 z-[5] h-full w-full cursor-pointer bg-transparent"
          />
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
            className="absolute bottom-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background/80 text-foreground backdrop-blur transition-colors hover:border-accent hover:text-accent"
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5" />
            ) : (
              <Volume2 className="h-5 w-5" />
            )}
          </button>
        </>
      ) : null}
    </div>
  );
}
