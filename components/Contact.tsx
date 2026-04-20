"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EnvelopeSimple, Phone, MapPin, LinkedinLogo, ArrowUpRight } from "@phosphor-icons/react";

const D = "var(--font-barlow)";

const contactItems = [
  { icon: EnvelopeSimple, label: "Email", value: "sajansarvesh155@gmail.com", href: "mailto:sajansarvesh155@gmail.com" },
  { icon: Phone, label: "Phone", value: "+971 56 317 4914", href: "tel:+971563174914" },
  { icon: MapPin, label: "Location", value: "Abu Dhabi, U.A.E.", href: null },
];

function SectionReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="bg-bg-surface" ref={ref}>

      {/* ── Image hero with ALL contact info overlaid ── */}
      <div className="relative w-full min-h-[70vh] flex items-center">
        {/* Background photo — full cover, slightly darkened */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/contact-bg.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ filter: "brightness(0.38)" }}
        />

        {/* Strong gradient on left so text always readable */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(13,11,11,0.92) 0%, rgba(13,11,11,0.7) 50%, rgba(13,11,11,0.2) 100%)" }}
        />
        {/* Bottom fade into bg-surface */}
        <div
          className="absolute inset-x-0 bottom-0 h-24"
          style={{ background: "linear-gradient(to bottom, transparent, #0f0d0d)" }}
        />

        {/* Contact content — overlaid, max-width container */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 py-20 md:py-28"
        >
          {/* Label + heading */}
          <p className="text-accent text-sm md:text-base tracking-[0.28em] uppercase mb-4 font-medium" style={{ fontFamily: D }}>
            Get in Touch
          </p>
          <h2
            className="font-display leading-none uppercase text-white mb-3"
            style={{ fontFamily: D, fontWeight: 900, fontSize: "clamp(3.5rem,8vw,7rem)", lineHeight: 0.95 }}
          >
            Contact
          </h2>
          <div className="h-0.5 w-16 bg-accent mb-10" />

          {/* Contact rows — directly on image */}
          <div className="flex flex-col gap-0 max-w-lg">
            {contactItems.map((item, i) => {
              const Icon = item.icon;
              const Wrapper = item.href ? "a" : "div";
              return (
                <Wrapper
                  key={i}
                  {...(item.href ? { href: item.href } : {})}
                  className={`group flex items-center gap-5 py-5 border-t border-white/15 ${item.href ? "cursor-pointer" : ""}`}
                >
                  <Icon
                    size={20}
                    className="text-white/50 group-hover:text-accent transition-colors duration-200 shrink-0"
                  />
                  <div>
                    <p className="text-white/40 text-xs tracking-[0.18em] uppercase mb-0.5" style={{ fontFamily: D }}>
                      {item.label}
                    </p>
                    <p
                      className="text-white text-lg md:text-xl font-medium group-hover:text-accent transition-colors duration-200"
                      style={{ fontFamily: D, textShadow: "0 1px 6px rgba(0,0,0,0.6)" }}
                    >
                      {item.value}
                    </p>
                  </div>
                </Wrapper>
              );
            })}
            <div className="border-t border-white/15" />
          </div>
        </motion.div>
      </div>

      {/* ── LinkedIn + footer below image ── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-16 pb-28 md:pb-36">

        <SectionReveal delay={0.1}>
          <div className="p-8 md:p-10 bg-bg border border-bg-border mb-0">
            <div className="flex items-start gap-5 mb-8">
              <LinkedinLogo size={28} className="text-accent shrink-0 mt-1" />
              <div>
                <h3
                  className="font-display text-3xl md:text-4xl uppercase text-text-primary leading-none mb-3"
                  style={{ fontFamily: D, fontWeight: 800 }}
                >
                  Connect on LinkedIn
                </h3>
                <p className="text-text-secondary text-xl leading-relaxed" style={{ fontFamily: D, fontWeight: 300 }}>
                  Want to get in touch? Reach me directly on LinkedIn. View my profile or send me a message.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://www.linkedin.com/in/sarvesh-sajan-59b1b126b/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-between gap-4 px-7 py-5 bg-accent text-white hover:bg-[#7a1c1c] active:scale-[0.98] transition-all duration-200 flex-1"
              >
                <div>
                  <p className="text-xs tracking-[0.15em] uppercase opacity-70 mb-1" style={{ fontFamily: D }}>View Profile</p>
                  <p className="text-base tracking-wide" style={{ fontFamily: D, fontWeight: 600 }}>linkedin.com/in/sarvesh-sajan</p>
                </div>
                <ArrowUpRight size={20} className="shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </a>
              <a
                href="https://www.linkedin.com/messaging/compose/?recipient=sarvesh-sajan-59b1b126b"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-between gap-4 px-7 py-5 border border-accent text-accent hover:bg-accent hover:text-white active:scale-[0.98] transition-all duration-200 flex-1"
              >
                <div>
                  <p className="text-xs tracking-[0.15em] uppercase opacity-70 mb-1" style={{ fontFamily: D }}>Send Message</p>
                  <p className="text-base tracking-wide" style={{ fontFamily: D, fontWeight: 600 }}>Direct Message</p>
                </div>
                <ArrowUpRight size={20} className="shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </a>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <div className="mt-16 pt-8 border-t border-bg-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <p className="text-text-muted text-base tracking-[0.1em] uppercase" style={{ fontFamily: D }}>
              © 2025 Sarvesh Sajan Pottangadi
            </p>
            <p className="text-text-muted text-base tracking-[0.1em] uppercase" style={{ fontFamily: D }}>
              Team CRG · Abu Dhabi, U.A.E.
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
