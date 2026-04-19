"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowDown } from "@phosphor-icons/react";

const D = "var(--font-display)";

const experience = [
  {
    role: "Intern",
    org: "Emirates Motor Company",
    location: "Abu Dhabi, U.A.E.",
    period: "07/2023",
    points: [
      "Assisted across departments, gaining direct exposure to automotive operations and processes.",
      "Conducted research and analysis on automotive market trends and customer preferences.",
    ],
  },
];

const education = [
  {
    degree: "Bachelor of Business Administration",
    school: "Manipal Academy of Higher Education",
    location: "Dubai, U.A.E.",
    period: "2025",
    detail: "Specialisation in Marketing · Passed with Distinction",
  },
];

const certs = [
  "Marketing Analytics",
  "Foundations of Strategy",
  "Firm Level Economics: Consumer & Producer Behavior",
];

const skills = [
  "Strategic Planning",
  "Market Research",
  "Data-Driven Analysis",
  "Team Collaboration",
  "Microsoft Office",
];

const openTo = [
  {
    num: "01",
    title: "Marketing & Business Roles",
    desc: "Strategy, market research, brand management, or business development. Particularly within automotive, motorsport, or luxury sectors.",
  },
  {
    num: "02",
    title: "Motorsport Management",
    desc: "Team operations, commercial partnerships, sponsorship coordination, or media roles within racing organisations.",
  },
  {
    num: "03",
    title: "Racing Opportunities",
    desc: "Competitive racing seats at national and international level. DD2, senior Rotax classes, or single-seater programmes.",
  },
];

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export default function CV() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="cv" className="py-28 md:py-36 bg-bg" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20"
        >
          <div>
            <p className="text-accent text-sm md:text-base tracking-[0.25em] uppercase mb-4 font-medium">
              Curriculum Vitae
            </p>
            <h2
              className="font-display leading-none uppercase text-text-primary"
              style={{ fontFamily: D, fontWeight: 900, fontSize: "clamp(3.5rem,8vw,7rem)", lineHeight: 0.95 }}
            >
              CV
            </h2>
            <div className="h-0.5 w-20 bg-accent mt-6" />
          </div>
          <a
            href="/cv.pdf"
            download
            className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white text-base font-semibold tracking-[0.15em] uppercase hover:bg-accent-hover active:scale-[0.98] transition-all duration-200 self-start"
          >
            <ArrowDown size={18} weight="bold" />
            Download CV
          </a>
        </motion.div>

        {/* CURRENTLY OPEN TO — BIG */}
        <Reveal delay={0.1}>
          <div className="mb-20 p-10 md:p-14 bg-bg-elevated border border-accent/30">
            <p className="text-accent text-sm md:text-base tracking-[0.25em] uppercase mb-10 font-medium">
              Currently Open To
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:items-stretch">
              {openTo.map((item) => (
                <div key={item.num} className="flex flex-col gap-4">
                  <span className="text-accent text-sm font-bold tracking-widest uppercase">
                    {item.num}
                  </span>
                  <h3
                    className="font-display uppercase text-text-primary"
                    style={{ fontFamily: D, fontWeight: 900, fontSize: "clamp(1.6rem,2.2vw,2.4rem)", lineHeight: 1.05, minHeight: "3.2em" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-text-secondary text-lg leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16 lg:gap-24">

          {/* Main */}
          <div className="space-y-16">

            <Reveal delay={0.15}>
              <p className="text-text-secondary text-sm tracking-[0.2em] uppercase mb-8 font-medium">
                Experience
              </p>
              {experience.map((e, i) => (
                <div key={i} className="border-t border-bg-border pt-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-6">
                    <div>
                      <h3
                        className="font-display uppercase text-text-primary leading-none"
                        style={{ fontFamily: D, fontWeight: 900, fontSize: "clamp(2rem,3.5vw,3.2rem)" }}
                      >
                        {e.role}
                      </h3>
                      <p className="text-text-secondary text-xl mt-2">
                        {e.org} · {e.location}
                      </p>
                    </div>
                    <span className="text-text-secondary text-base tracking-[0.12em] uppercase shrink-0 pt-1 font-medium">
                      {e.period}
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {e.points.map((p, j) => (
                      <li key={j} className="flex gap-4">
                        <span className="text-accent mt-2.5 shrink-0 w-1.5 h-1.5 rounded-full bg-accent block" />
                        <p className="text-text-secondary text-xl leading-relaxed">{p}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-text-secondary text-sm tracking-[0.2em] uppercase mb-8 font-medium">
                Education
              </p>
              {education.map((e, i) => (
                <div key={i} className="border-t border-bg-border pt-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                    <div>
                      <h3
                        className="font-display uppercase text-text-primary leading-none"
                        style={{ fontFamily: D, fontWeight: 900, fontSize: "clamp(2rem,3.5vw,3.2rem)" }}
                      >
                        {e.degree}
                      </h3>
                      <p className="text-text-secondary text-xl mt-2">
                        {e.school} · {e.location}
                      </p>
                    </div>
                    <span className="text-text-secondary text-base tracking-[0.12em] uppercase shrink-0 pt-1 font-medium">
                      {e.period}
                    </span>
                  </div>
                  <p className="text-accent text-xl font-medium">{e.detail}</p>
                </div>
              ))}
            </Reveal>
          </div>

          {/* Sidebar */}
          <div className="space-y-10">
            <Reveal delay={0.25}>
              <div className="mb-10">
                <p className="text-text-secondary text-sm tracking-[0.2em] uppercase mb-6 font-medium">
                  Skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <span
                      key={s}
                      className="px-4 py-2 border border-bg-border text-text-secondary text-base tracking-wide uppercase hover:border-accent/40 hover:text-text-primary transition-colors duration-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-text-secondary text-sm tracking-[0.2em] uppercase mb-6 font-medium">
                  Certificates
                </p>
                <div className="space-y-0">
                  {certs.map((c, i) => (
                    <div key={i} className="flex items-center gap-4 py-4 border-t border-bg-border last:border-b">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      <p className="text-text-secondary text-xl">{c}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="bg-bg-surface border border-bg-border p-7">
                <p className="text-accent text-sm tracking-[0.2em] uppercase mb-5 font-medium">
                  Racing Highlights
                </p>
                {[
                  { label: "2nd Place", sub: "Abu Dhabi Sports Council Championship 2024–25" },
                  { label: "Multi Race Winner", sub: "UAE RMC & Exhibition Classes" },
                  { label: "Multiple Podiums", sub: "UAE RMC & Exhibition Classes" },
                  { label: "Team CRG", sub: "Kart #426" },
                ].map((r, i) => (
                  <div key={i} className="py-3 border-t border-bg-border first:border-t-0">
                    <p className="text-text-primary text-base font-semibold tracking-wide uppercase" style={{ fontFamily: "var(--font-barlow)" }}>{r.label}</p>
                    <p className="text-text-secondary text-base leading-snug">{r.sub}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
