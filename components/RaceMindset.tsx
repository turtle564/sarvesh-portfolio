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
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <p className="text-accent text-sm md:text-base tracking-[0.25em] uppercase mb-4"
            style={{ fontFamily: "var(--font-barlow)" }}>
            Track Record. Board Room Ready.
          </p>
          <h2
            className="font-display leading-none uppercase text-text-primary"
            style={{ fontFamily: "var(--font-barlow)", fontWeight: 900, fontSize: "clamp(3rem,7vw,6.5rem)", lineHeight: 0.92 }}
          >
            Race Mind.
          </h2>
          <h2
            className="font-display leading-none uppercase"
            style={{ fontFamily: "var(--font-barlow)", fontWeight: 900, fontSize: "clamp(3rem,7vw,6.5rem)", lineHeight: 0.92, color: "#8b2020" }}
          >
            Real World.
          </h2>
          <div className="h-0.5 w-20 bg-accent mt-6 mb-8" />
          <p className="text-text-secondary text-xl md:text-2xl font-300 leading-relaxed max-w-[54ch]"
            style={{ fontFamily: "var(--font-barlow)", fontWeight: 300 }}>
            Competing at professional level in karting demands the same qualities that define high performers in business. The discipline, focus, and composure built on track translate directly into any professional environment.
          </p>
        </motion.div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {pillars.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 + i * 0.1 }}
              className="group p-8 md:p-10 border-t border-bg-border md:odd:border-r hover:bg-bg-surface transition-colors duration-400"
            >
              <div className="flex items-start gap-5 mb-5">
                <span className="text-accent font-display text-sm font-700 tracking-widest mt-1"
                  style={{ fontFamily: "var(--font-barlow)", fontWeight: 700 }}>
                  {p.num}
                </span>
                <h3
                  className="font-display text-3xl md:text-4xl font-900 uppercase text-text-primary group-hover:text-accent transition-colors duration-300 leading-none"
                  style={{ fontFamily: "var(--font-barlow)", fontWeight: 900 }}
                >
                  {p.title}
                </h3>
              </div>
              <p className="text-text-secondary text-lg md:text-xl font-300 leading-relaxed max-w-[50ch]"
                style={{ fontFamily: "var(--font-barlow)", fontWeight: 300 }}>
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
