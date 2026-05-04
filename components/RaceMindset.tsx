"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const pillars = [
  {
    num: "01",
    title: "Precision",
    desc: "Racing is won and lost in hundredths of a second. Every input, braking point, steering angle, throttle application, has to be calculated precisely. That zero-margin discipline transfers directly into strategy, analysis, and execution in any professional role.",
  },
  {
    num: "02",
    title: "High-Stakes Decisions",
    desc: "Race situations evolve in seconds. Tyre management, gap management, overtake windows. All decided under pressure with no room for hesitation. The ability to make fast, accurate decisions under stress is a competitive edge in any boardroom.",
  },
  {
    num: "03",
    title: "Teamwork",
    desc: "No driver wins alone. Engineering, mechanics, strategy, data. Racing is a collective performance. Building trust within a team, communicating technical feedback clearly, and elevating everyone around you is core to how I work.",
  },
  {
    num: "04",
    title: "Dedication",
    desc: "Competing at professional level while completing a degree with distinction isn't a coincidence. It's the result of structured commitment, time management, and the refusal to accept second-best. In the kart or in the classroom.",
  },
];

export default function RaceMindset() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="mindset" className="py-28 md:py-36 bg-bg overflow-hidden" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="mb-20">
          <motion.p
            className="text-accent text-sm md:text-base tracking-[0.25em] uppercase mb-4 font-semibold"
            style={{ fontFamily: "var(--font-display)" }}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Track Record. Board Room Ready.
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              className="font-display leading-none uppercase text-text-primary"
              style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(3rem,7vw,6.5rem)", lineHeight: 0.95 }}
              initial={{ opacity: 0, x: -80 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            >
              Race Mind.
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              className="font-display leading-none uppercase"
              style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(3rem,7vw,6.5rem)", lineHeight: 0.95, color: "#8b2020" }}
              initial={{ opacity: 0, x: -80 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
            >
              Real World.
            </motion.h2>
          </div>
          <motion.div
            className="h-0.5 bg-accent mt-6 mb-8"
            initial={{ width: 0 }}
            animate={inView ? { width: 80 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          />
          <motion.p
            className="text-text-secondary text-xl md:text-2xl leading-relaxed max-w-[54ch]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          >
            Competing at professional level in karting demands the same qualities that define high performers in business. The discipline, focus, and composure built on track translate directly into any professional environment.
          </motion.p>
        </div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {pillars.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.2 + i * 0.1 }}
              className="group p-8 md:p-10 border-t border-bg-border md:odd:border-r hover:bg-bg-surface transition-colors duration-300"
            >
              <div className="flex items-start gap-5 mb-5">
                <span className="text-accent text-sm font-bold tracking-widest mt-1"
                  style={{ fontFamily: "var(--font-display)" }}>
                  {p.num}
                </span>
                <h3
                  className="font-display text-2xl md:text-3xl uppercase text-text-primary group-hover:text-accent transition-colors duration-300 leading-tight"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
                >
                  {p.title}
                </h3>
              </div>
              <p className="text-text-secondary text-lg leading-relaxed max-w-[50ch]">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
        <div className="border-t border-bg-border" />
      </div>
    </section>
  );
}
