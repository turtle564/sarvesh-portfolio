"use client";

import { useState } from "react";
import { useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X } from "@phosphor-icons/react";

const D = "var(--font-display)";

const stripPhotos = [
  { src: "/pits.jpg", title: "Out of the Pits", desc: "Coming out of the pits during practice. Getting the setup dialled in before qualifying (2023)." },
  { src: "/grid.jpg", title: "Pre-Grid", desc: "Waiting on the pre-grid before the race start. That quiet moment before everything kicks off (2022)." },
  { src: "/podium-2025.jpg", title: "UAE RMC Finale", desc: "Securing third place at the UAE RMC Finale. One of the strongest results of the season (2025)." },
];

const achievements = [
  {
    year: "2024–25",
    position: "2nd",
    title: "DD2 Abu Dhabi Sports Council Championship",
    detail: "Finished runner-up in the most competitive karting series in the UAE, run under the Abu Dhabi Sports Council and the U.A.E. RMC.",
  },
  {
    year: "2024–25",
    position: "Multi Race Winner",
    title: "UAE RMC & Exhibition Classes",
    detail: "Multiple outright race victories across the UAE Rotax Max Challenge and exhibition classes, competing against the fastest drivers in the region.",
  },
  {
    year: "2024–25",
    position: "Podiums",
    title: "UAE RMC & Exhibition Classes",
    detail: "Multiple top-3 finishes across the UAE RMC Championship and exhibition/open-class events throughout the season.",
  },
];

const specs = [
  { label: "Class", value: "Rotax Max DD2" },
  { label: "Kart Number", value: "#426" },
  { label: "Team", value: "CRG Middle East" },
  { label: "Series", value: "UAE RMC Championship" },
  { label: "Location", value: "Abu Dhabi, U.A.E." },
];

export default function Racing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section id="racing" className="py-28 md:py-36 bg-bg overflow-hidden" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">

        <div className="mb-20 overflow-hidden">
          <motion.p
            className="text-accent text-sm md:text-base tracking-[0.25em] uppercase mb-4 font-semibold"
            style={{ fontFamily: D }}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            On Track
          </motion.p>
          <motion.h2
            className="font-display leading-none uppercase text-text-primary"
            style={{ fontFamily: D, fontWeight: 900, fontSize: "clamp(3.5rem,8vw,7rem)", lineHeight: 0.95 }}
            initial={{ opacity: 0, x: -80 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.07 }}
          >
            Race Record
          </motion.h2>
          <motion.div
            className="h-0.5 bg-accent mt-6"
            initial={{ width: 0 }}
            animate={inView ? { width: 80 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-16 lg:gap-20">

          {/* Achievements */}
          <div>
            {achievements.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -70 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 + i * 0.13 }}
                className="group grid grid-cols-[96px_1fr] gap-6 md:gap-10 py-10 border-t border-bg-border hover:border-accent/50 transition-colors duration-300"
              >
                <p className="text-text-muted text-sm tracking-[0.1em] uppercase pt-1 font-medium">
                  {a.year}
                </p>
                <div>
                  <p
                    className="font-display uppercase text-accent mb-2 group-hover:text-text-primary transition-colors duration-300"
                    style={{ fontFamily: D, fontWeight: 900, fontSize: "clamp(2.5rem,5vw,4rem)", lineHeight: 1 }}
                  >
                    {a.position}
                  </p>
                  <h3
                    className="font-display uppercase text-text-primary mb-4 leading-tight"
                    style={{ fontFamily: D, fontWeight: 800, fontSize: "clamp(1.4rem,2.5vw,2.2rem)" }}
                  >
                    {a.title}
                  </h3>
                  <p className="text-text-secondary text-lg leading-relaxed max-w-[55ch]">
                    {a.detail}
                  </p>
                </div>
              </motion.div>
            ))}
            <div className="border-t border-bg-border" />
          </div>

          {/* Driver profile — fixed alignment */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="bg-bg-surface border border-bg-border p-8 h-fit lg:sticky lg:top-24"
          >
            <p className="text-accent text-xs tracking-[0.25em] uppercase mb-6 font-medium">
              Driver Profile
            </p>

            <div className="divide-y divide-bg-border">
              {specs.map((s) => (
                <div key={s.label} className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0">
                  <span className="text-text-muted text-sm tracking-[0.1em] uppercase shrink-0 pt-0.5">
                    {s.label}
                  </span>
                  <span className="text-text-primary text-base font-semibold text-right leading-snug">
                    {s.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-5 bg-accent/10 border border-accent/20">
              <p className="text-accent text-xs tracking-[0.2em] uppercase mb-3 font-medium">
                Open To
              </p>
              <p className="text-text-secondary text-base leading-relaxed">
                Professional roles in marketing and business, motorsport management, and future racing programmes.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Photo strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="mt-16 grid grid-cols-3 gap-3"
        >
          {stripPhotos.map((photo, i) => (
            <button
              key={i}
              onClick={() => setLightbox(i)}
              className="overflow-hidden aspect-[4/3] block w-full group relative"
              aria-label={photo.title}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover brightness-70 group-hover:brightness-100 transition-all duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-bg/80 to-transparent">
                <p className="text-text-primary text-sm font-semibold tracking-wide uppercase" style={{ fontFamily: D }}>{photo.title}</p>
              </div>
            </button>
          ))}
        </motion.div>

        {/* Photo lightbox */}
        <AnimatePresence>
          {lightbox !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[100] bg-bg/95 backdrop-blur-md flex items-center justify-center p-6 md:p-12"
              onClick={() => setLightbox(null)}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-5 right-5 text-text-secondary hover:text-text-primary transition-colors p-2"
                aria-label="Close"
              >
                <X size={26} />
              </button>
              <motion.div
                initial={{ scale: 0.94, opacity: 0, y: 16 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.94, opacity: 0, y: 16 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-3xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={stripPhotos[lightbox].src}
                  alt={stripPhotos[lightbox].title}
                  className="w-full max-h-[65vh] object-contain"
                />
                <div className="mt-5 border-t border-bg-border pt-5">
                  <p className="text-accent text-xs tracking-[0.2em] uppercase mb-1 font-medium" style={{ fontFamily: D }}>
                    Team CRG · Abu Dhabi
                  </p>
                  <h3
                    className="font-display uppercase text-text-primary mb-2"
                    style={{ fontFamily: D, fontWeight: 900, fontSize: "clamp(1.3rem,2vw,1.9rem)", lineHeight: 1 }}
                  >
                    {stripPhotos[lightbox].title}
                  </h3>
                  <p className="text-text-secondary text-lg leading-relaxed">
                    {stripPhotos[lightbox].desc}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
