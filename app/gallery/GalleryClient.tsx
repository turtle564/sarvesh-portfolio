"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { X, ArrowLeft } from "@phosphor-icons/react";
import { DimReveal } from "@/components/Overlay";

const D = "var(--font-display)";

const photos = [
  {
    src: "/hero.jpg",
    title: "Golden Hour — CRG #426",
    event: "UAE RMC Championship",
    year: "2024–25",
    description: "Pushing the CRG Go-Kart at the golden hour on track in Abu Dhabi. The fastest kart category in the UAE series.",
    featured: true,
  },
  {
    src: "/race-win-dad.jpg",
    title: "Race Win",
    event: "Exhibition Class",
    year: "2024–25",
    description: "After taking the win, celebrating with my dad trackside. One of the standout moments of the season.",
    featured: false,
  },
  {
    src: "/trophy-garage.jpg",
    title: "2nd Place Trophy",
    event: "Abu Dhabi Sports Council Championship",
    year: "2024–25",
    description: "Runner-up trophy in front of the team garage. The result of a full season of consistent pace and racecraft.",
    featured: false,
  },
  {
    src: "/leading-pack.jpg",
    title: "Leading the Pack",
    event: "UAE RMC Championship",
    year: "2024–25",
    description: "Out front and building the gap. Clean air, full commitment.",
    featured: false,
  },
  {
    src: "/crg-team.jpg",
    title: "Team CRG Middle East",
    event: "CRG Middle East",
    year: "2024–25",
    description: "The full Team CRG Middle East crew — the people behind every result.",
    featured: false,
  },
  {
    src: "/rain-race.jpg",
    title: "Racing in the Rain",
    event: "Dubai Kartdrome",
    year: "2023–24",
    description: "First year racing in the wet at Dubai Kartdrome. One of the most challenging conditions in karting.",
    featured: false,
  },
];

export default function GalleryClient() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true });

  return (
    <main className="min-h-[100dvh] bg-bg">

      {/* Nav */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-bg/90 backdrop-blur-md border-b border-bg-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 text-text-secondary hover:text-text-primary transition-colors duration-200">
            <ArrowLeft size={18} />
            <span className="text-sm tracking-[0.12em] uppercase font-medium">Back</span>
          </Link>
          <span className="text-base font-semibold tracking-wide text-text-primary">
            Sarvesh Sajan
          </span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-32 pb-24">

        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 36, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <p className="text-accent text-sm md:text-base tracking-[0.25em] uppercase mb-4 font-medium">
            On Track
          </p>
          <h1
            className="font-display leading-none uppercase text-text-primary"
            style={{ fontFamily: D, fontWeight: 900, fontSize: "clamp(3.5rem,8vw,7rem)", lineHeight: 0.95 }}
          >
            Gallery
          </h1>
          <div className="h-0.5 w-20 bg-accent mt-6 mb-8" />
          <p className="text-text-secondary text-xl leading-relaxed max-w-[52ch]">
            Moments from the UAE RMC Championship and Abu Dhabi Sports Council series.
            Team CRG Middle East · Kart #426.
          </p>
        </motion.div>

        {/* Featured */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mb-4"
        >
          <DimReveal
            src={photos[0].src}
            alt={photos[0].title}
            className="w-full aspect-[16/7]"
            onClick={() => setLightbox(0)}
          />
          <div className="pt-4 pb-2 flex items-start justify-between gap-4">
            <div>
              <p className="text-accent text-sm tracking-[0.18em] uppercase font-medium mb-1">
                {photos[0].event} · {photos[0].year}
              </p>
              <h2
                className="font-display uppercase text-text-primary"
                style={{ fontFamily: D, fontWeight: 900, fontSize: "clamp(1.6rem,3vw,2.8rem)", lineHeight: 1 }}
              >
                {photos[0].title}
              </h2>
            </div>
          </div>
          <p className="text-text-secondary text-lg">{photos[0].description}</p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
          {photos.slice(1).map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 + i * 0.1 }}
            >
              <DimReveal
                src={photo.src}
                alt={photo.title}
                className="w-full aspect-[4/3]"
                onClick={() => setLightbox(i + 1)}
              />
              <div className="pt-4 pb-2">
                <p className="text-accent text-xs tracking-[0.18em] uppercase font-medium mb-1">
                  {photo.event}
                </p>
                <h3
                  className="font-display uppercase text-text-primary mb-2"
                  style={{ fontFamily: D, fontWeight: 800, fontSize: "clamp(1.3rem,2vw,2rem)", lineHeight: 1 }}
                >
                  {photo.title}
                </h3>
                <p className="text-text-secondary text-base leading-relaxed">{photo.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-bg/97 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
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
              initial={{ scale: 0.93, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.93, opacity: 0, y: 20 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photos[lightbox].src}
                alt={photos[lightbox].title}
                className="w-full max-h-[70vh] object-contain"
              />
              <div className="pt-5 border-t border-bg-border mt-4">
                <p className="text-accent text-sm tracking-[0.18em] uppercase font-medium mb-1">
                  {photos[lightbox].event} · {photos[lightbox].year}
                </p>
                <h3
                  className="font-display uppercase text-text-primary mb-2"
                  style={{ fontFamily: D, fontWeight: 900, fontSize: "clamp(1.4rem,2.5vw,2.2rem)", lineHeight: 1 }}
                >
                  {photos[lightbox].title}
                </h3>
                <p className="text-text-secondary text-lg">{photos[lightbox].description}</p>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setLightbox((lightbox - 1 + photos.length) % photos.length)}
                  className="text-text-secondary hover:text-text-primary text-sm tracking-widest uppercase font-medium transition-colors"
                >
                  Prev
                </button>
                <span className="text-text-muted text-sm">
                  {lightbox + 1} / {photos.length}
                </span>
                <button
                  onClick={() => setLightbox((lightbox + 1) % photos.length)}
                  className="text-text-secondary hover:text-text-primary text-sm tracking-widest uppercase font-medium transition-colors"
                >
                  Next
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
