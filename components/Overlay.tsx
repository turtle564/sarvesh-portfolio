"use client";

import { ReactNode } from "react";
import { motion, MotionValue } from "framer-motion";
import { useScrollFade } from "./ScrollyCanvas";

interface OverlayProps {
  children: ReactNode;
  progress: MotionValue<number>;
  enterAt?: number;
  exitAt?: number;
  className?: string;
}

export default function Overlay({
  children,
  progress,
  enterAt = 0,
  exitAt = 1,
  className = "",
}: OverlayProps) {
  const { opacity, y } = useScrollFade(progress, enterAt, exitAt);

  return (
    <motion.div style={{ opacity, y }} className={`absolute ${className}`}>
      {children}
    </motion.div>
  );
}

/* ── DimReveal ────────────────────────────────────────────── */
/* Image that is dimmed + blurred at rest, clears on hover    */

interface DimRevealProps {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}

export function DimReveal({ src, alt, className = "", onClick }: DimRevealProps) {
  return (
    <div
      className={`relative overflow-hidden cursor-pointer group ${className}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-all duration-700 ease-out
                   scale-[1.04] group-hover:scale-100
                   brightness-[0.18] group-hover:brightness-100
                   blur-[2px] group-hover:blur-0"
      />
      {/* Hover hint */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none
                      opacity-100 group-hover:opacity-0 transition-opacity duration-500">
        <span
          className="text-text-muted text-xs tracking-[0.2em] uppercase border border-bg-border px-4 py-2 bg-bg/60 backdrop-blur-sm"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Hover to reveal · Click to view
        </span>
      </div>
    </div>
  );
}
