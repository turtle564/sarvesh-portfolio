"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const line = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-end overflow-hidden bg-bg">

      {/* Full-bleed video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
          poster="/hero.jpg"
        >
          <source src="/hero.mp4" type="video/mp4" />
          {/* Fallback image if video fails */}
        </video>
        <Image
          src="/hero.jpg"
          alt="Sarvesh Sajan Pottangadi — CRG #426 at golden hour"
          fill
          priority
          quality={90}
          className="object-cover object-center -z-10"
          sizes="100vw"
        />
        {/* Cinematic overlay — dark at bottom, transparent at top */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, #0d0b0b 0%, #0d0b0bcc 30%, #0d0b0b55 60%, #0d0b0b22 85%, transparent 100%)",
          }}
        />
        {/* Subtle side vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, #0d0b0baa 0%, transparent 40%, transparent 60%, #0d0b0b66 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 pb-16 md:pb-24 pt-32 w-full">
        <motion.div variants={container} initial="hidden" animate="show">

          <motion.p
            variants={line}
            className="text-accent text-sm md:text-base font-500 tracking-[0.3em] uppercase mb-8"
            style={{ fontFamily: "var(--font-barlow)" }}
          >
            DD2 · Team CRG · #426 · Abu Dhabi, U.A.E.
          </motion.p>

          {/* Monumental name — Bugatti style */}
          <motion.div variants={line} className="overflow-hidden mb-2">
            <h1
              className="font-display leading-none tracking-tighter uppercase text-text-primary"
              style={{
                fontFamily: "var(--font-barlow)",
                fontWeight: 900,
                fontSize: "clamp(4.5rem, 14vw, 13rem)",
                lineHeight: 0.88,
              }}
            >
              Sarvesh
            </h1>
          </motion.div>
          <motion.div variants={line} className="overflow-hidden mb-10">
            <h1
              className="font-display leading-none tracking-tighter uppercase"
              style={{
                fontFamily: "var(--font-barlow)",
                fontWeight: 900,
                fontSize: "clamp(4.5rem, 14vw, 13rem)",
                lineHeight: 0.88,
                color: "#8b2020",
              }}
            >
              Sajan
            </h1>
          </motion.div>

          <motion.p
            variants={line}
            className="text-text-secondary text-xl md:text-2xl font-300 leading-relaxed max-w-[44ch] mb-12"
            style={{ fontFamily: "var(--font-barlow)", fontWeight: 300 }}
          >
            Professional karting driver. Race winner. Podium finisher.
            Based in Abu Dhabi, open to racing opportunities and professional roles.
          </motion.p>

          <motion.div variants={line} className="flex flex-wrap gap-4">
            <a
              href="#racing"
              className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white text-base font-600 tracking-[0.15em] uppercase hover:bg-accent-hover active:scale-[0.98] transition-all duration-200"
              style={{ fontFamily: "var(--font-barlow)", fontWeight: 600 }}
            >
              Race Record
            </a>
            <a
              href="/gallery"
              className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-text-primary text-base font-500 tracking-[0.15em] uppercase hover:border-white/50 hover:bg-white/5 active:scale-[0.98] transition-all duration-200"
              style={{ fontFamily: "var(--font-barlow)", fontWeight: 500 }}
            >
              Gallery
            </a>
            <a
              href="/Sarvesh%20Sajan%20CV.pdf"
              download
              className="inline-flex items-center gap-3 px-8 py-4 border border-bg-border text-text-secondary text-base font-500 tracking-[0.15em] uppercase hover:border-text-muted hover:text-text-primary active:scale-[0.98] transition-all duration-200"
              style={{ fontFamily: "var(--font-barlow)", fontWeight: 500 }}
            >
              Download CV
            </a>
          </motion.div>

        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
          className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-10 md:gap-16"
        >
          {[
            { value: "2nd", label: "Abu Dhabi Sports Council Championship 2024–25" },
            { value: "Multi", label: "Race Winner · UAE RMC & Exhibition" },
            { value: "Podiums", label: "UAE RMC & Exhibition Classes" },
          ].map((stat) => (
            <div key={stat.label}>
              <p
                className="font-display text-5xl md:text-6xl font-900 text-text-primary mb-2"
                style={{ fontFamily: "var(--font-barlow)", fontWeight: 900 }}
              >
                {stat.value}
              </p>
              <p
                className="text-text-muted text-sm md:text-base tracking-[0.1em] uppercase max-w-[20ch] leading-snug"
                style={{ fontFamily: "var(--font-barlow)" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 right-8 md:right-12 flex flex-col items-center gap-2"
      >
        <div className="w-px h-12 bg-white/20 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full bg-accent"
            animate={{ height: ["0%", "100%"], top: ["0%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <p
          className="text-text-muted text-xs tracking-[0.2em] uppercase rotate-90 origin-center mt-2"
          style={{ fontFamily: "var(--font-barlow)" }}
        >
          Scroll
        </p>
      </motion.div>
    </section>
  );
}
