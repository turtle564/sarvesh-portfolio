"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const D = "var(--font-barlow)";

export default function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Video slowly zooms out, fades near end
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.07, 1.0]);
  const videoOpacity = useTransform(scrollYProgress, [0.8, 0.95], [1, 0]);

  // Gradient darkens progressively
  const gradientOpacity = useTransform(scrollYProgress, [0, 0.2, 0.9], [0.6, 0.8, 0.97]);

  // Phase 1: tag + name + tagline — all as one block
  // Fades in early, holds through middle, exits cleanly
  const phase1Opacity = useTransform(scrollYProgress, [0, 0.08, 0.42, 0.52], [0, 1, 1, 0]);
  const phase1Y = useTransform(scrollYProgress, [0, 0.1], [40, 0]);

  // Phase 2: stats + CTAs — only appears after phase 1 is gone
  const phase2Opacity = useTransform(scrollYProgress, [0.54, 0.64, 0.88, 0.96], [0, 1, 1, 0]);
  const phase2Y = useTransform(scrollYProgress, [0.54, 0.65], [32, 0]);

  // Scroll indicator
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.04, 0.14], [0, 1, 0]);

  return (
    <div ref={containerRef} style={{ height: "480vh" }} className="relative z-[20]">
      <div className="sticky top-0 h-[100dvh] overflow-hidden bg-bg">

        {/* Video */}
        <motion.div className="absolute inset-0" style={{ scale: videoScale, opacity: videoOpacity }}>
          <video
            autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover object-center"
            poster="/hero.jpg"
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hero.jpg" alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover object-center -z-10" />
        </motion.div>

        {/* Gradient vignette */}
        <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: gradientOpacity }}>
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0d0b0b 0%, #0d0b0bcc 28%, #0d0b0b66 55%, transparent 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #0d0b0b88 0%, transparent 50%, #0d0b0b44 100%)" }} />
        </motion.div>

        {/* ── Phase 1: Tag + Name + Tagline ── */}
        <motion.div
          style={{ opacity: phase1Opacity, y: phase1Y }}
          className="absolute inset-x-6 md:inset-x-12 bottom-16 md:bottom-20"
        >
          <p
            className="text-accent text-sm md:text-base tracking-[0.28em] uppercase mb-5 font-medium"
            style={{ fontFamily: D }}
          >
            Team CRG · #426 · Abu Dhabi, U.A.E.
          </p>

          <h1
            className="font-display leading-none tracking-tight uppercase text-text-primary"
            style={{ fontFamily: D, fontWeight: 900, fontSize: "clamp(3.6rem,10.5vw,10rem)", lineHeight: 0.9 }}
          >
            Sarvesh
          </h1>
          <h1
            className="font-display leading-none tracking-tight uppercase mb-8"
            style={{ fontFamily: D, fontWeight: 900, fontSize: "clamp(3.6rem,10.5vw,10rem)", lineHeight: 0.9, color: "#8b2020" }}
          >
            Sajan
          </h1>

          <p
            className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-[42ch]"
            style={{ fontFamily: D, fontWeight: 300 }}
          >
            Professional racing driver. Race winner. Podium finisher. Based in Abu Dhabi and open to racing opportunities and professional roles.
          </p>
        </motion.div>

        {/* ── Phase 2: Stats + CTAs ── */}
        <motion.div
          style={{ opacity: phase2Opacity, y: phase2Y }}
          className="absolute inset-x-6 md:inset-x-12 bottom-16 md:bottom-20 flex flex-col gap-10"
        >
          {/* Stats */}
          <div className="flex flex-wrap gap-10 md:gap-16 border-t border-white/15 pt-8">
            {[
              { value: "2nd", label: "Abu Dhabi Sports Council Championship 2024–25" },
              { value: "Multi", label: "Race Winner · UAE RMC & Exhibition" },
              { value: "Podiums", label: "UAE RMC & Exhibition Classes" },
            ].map((s) => (
              <div key={s.label}>
                <p
                  className="font-display text-5xl md:text-6xl text-text-primary mb-2"
                  style={{ fontFamily: D, fontWeight: 900 }}
                >
                  {s.value}
                </p>
                <p
                  className="text-text-muted text-sm md:text-base tracking-[0.1em] uppercase max-w-[18ch] leading-snug"
                  style={{ fontFamily: D }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#racing"
              className="inline-flex items-center px-8 py-4 bg-accent text-white text-sm tracking-[0.18em] uppercase hover:bg-[#7a1c1c] active:scale-[0.98] transition-all duration-200"
              style={{ fontFamily: D, fontWeight: 600 }}
            >
              Race Record
            </a>
            <Link
              href="/gallery"
              className="inline-flex items-center px-8 py-4 border border-white/25 text-text-primary text-sm tracking-[0.18em] uppercase hover:border-white/50 hover:bg-white/5 active:scale-[0.98] transition-all duration-200"
              style={{ fontFamily: D, fontWeight: 500 }}
            >
              Gallery
            </Link>
            <a
              href="/Sarvesh%20Sajan%20CV.pdf"
              download
              className="inline-flex items-center px-8 py-4 bg-accent text-white text-sm tracking-[0.18em] uppercase hover:bg-[#7a1c1c] active:scale-[0.98] transition-all duration-200"
              style={{ fontFamily: D, fontWeight: 600 }}
            >
              Download CV
            </a>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity: scrollOpacity }}
          className="absolute bottom-8 right-8 md:right-12 flex flex-col items-center gap-2 pointer-events-none"
        >
          <div className="w-px h-12 bg-white/20 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full bg-accent"
              animate={{ height: ["0%", "100%"], top: ["0%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <p className="text-text-muted text-xs tracking-[0.2em] uppercase" style={{ fontFamily: D, writingMode: "vertical-rl" }}>
            Scroll
          </p>
        </motion.div>

      </div>
    </div>
  );
}
