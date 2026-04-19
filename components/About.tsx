"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const D = "var(--font-display)";

const traits = [
  {
    num: "01",
    label: "On Track",
    desc: "Professional racing driver with Team CRG. Race winner and multiple podium finisher in the UAE's top karting championships. Raced at the sharp end of every grid.",
  },
  {
    num: "02",
    label: "Off Track",
    desc: "BBA Marketing graduate from Manipal Academy of Higher Education, passed with distinction. Hands-on experience at Emirates Motor Company with a focus on automotive trends and consumer analysis.",
  },
  {
    num: "03",
    label: "Available",
    desc: "Open to professional roles in marketing, business, and motorsport management. Also open to future racing programmes when the timing is right.",
  },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-28 md:py-36 bg-bg-surface" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          <motion.div
            initial={{ opacity: 0, y: 36, scale: 0.97 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-accent text-sm md:text-base tracking-[0.25em] uppercase mb-4 font-medium">
              The Driver
            </p>
            <h2
              className="font-display leading-none uppercase text-text-primary mb-8"
              style={{ fontFamily: D, fontWeight: 900, fontSize: "clamp(3.5rem,8vw,7rem)", lineHeight: 0.95 }}
            >
              About
            </h2>
            <div className="h-0.5 w-20 bg-accent mb-10" />

            <p className="text-text-primary text-xl md:text-2xl leading-relaxed max-w-[48ch] mb-6">
              I'm a professional racing driver and marketing graduate based in Abu Dhabi, U.A.E.
            </p>
            <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-[48ch]">
              Racing with Team CRG in one of the most demanding categories in karting, while earning a marketing degree with distinction. The same precision and the refusal to accept second-best that defines my racing drives my professional ambitions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 36, scale: 0.97 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="lg:pt-16"
          >
            {traits.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 + i * 0.1 }}
                className="py-8 border-t border-bg-border last:border-b"
              >
                <div className="flex gap-6 items-start">
                  <span className="text-accent text-sm font-bold tracking-widest uppercase mt-1 w-10 shrink-0">
                    {t.num}
                  </span>
                  <div>
                    <h3
                      className="font-display uppercase text-text-primary mb-3 leading-none"
                      style={{ fontFamily: D, fontWeight: 900, fontSize: "clamp(1.6rem,2.5vw,2.4rem)" }}
                    >
                      {t.label}
                    </h3>
                    <p className="text-text-secondary text-lg leading-relaxed max-w-[42ch]">
                      {t.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
