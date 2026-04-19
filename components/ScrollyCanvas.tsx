"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface ScrollyCanvasProps {
  children: (progress: MotionValue<number>) => ReactNode;
  height?: string;
  className?: string;
}

export default function ScrollyCanvas({
  children,
  height = "250vh",
  className = "",
}: ScrollyCanvasProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={ref} style={{ height }} className={`relative ${className}`}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {children(scrollYProgress)}
      </div>
    </div>
  );
}

/* ── Utility hooks ────────────────────────────────────────── */

export function useScrollFade(
  progress: MotionValue<number>,
  enterAt: number,
  exitAt: number
) {
  const opacity = useTransform(
    progress,
    [enterAt, enterAt + 0.08, exitAt - 0.08, exitAt],
    [0, 1, 1, 0]
  );
  const y = useTransform(progress, [enterAt, enterAt + 0.12], [36, 0]);
  return { opacity, y };
}

export function useScrollScale(
  progress: MotionValue<number>,
  enterAt: number,
  exitAt: number
) {
  const scale = useTransform(
    progress,
    [enterAt, enterAt + 0.1, exitAt - 0.1, exitAt],
    [0.94, 1, 1, 0.96]
  );
  const opacity = useTransform(
    progress,
    [enterAt, enterAt + 0.08, exitAt - 0.08, exitAt],
    [0, 1, 1, 0]
  );
  return { scale, opacity };
}
