"use client";

import { useEffect, useState } from "react";

export function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);
  // Hidden when the pointer leaves the document or enters an iframe
  // (iframes swallow mousemove, so the dot would otherwise freeze at the edge).
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Only enable on devices with a fine pointer (mouse).
    if (
      typeof window === "undefined" ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }
    setEnabled(true);

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setActive(!!t.closest("a, button, [role='button']"));
    };
    // When focus shifts into an iframe (e.g. hovering a video), the window
    // blurs — hide the dot so it doesn't get stuck at the iframe boundary.
    const onBlur = () => setHidden(true);
    const onLeave = () => setHidden(true);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("blur", onBlur);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("blur", onBlur);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="cursor-dot pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        opacity: hidden ? 0 : 1,
      }}
    >
      <div
        className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-accent transition-[width,height,opacity] duration-150"
        style={{
          width: active ? 28 : 10,
          height: active ? 28 : 10,
          opacity: active ? 0.35 : 1,
        }}
      />
    </div>
  );
}
