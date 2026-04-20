"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Racing", href: "#racing" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "/gallery" },
  { label: "CV", href: "#cv" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-bg/90 backdrop-blur-md border-b border-bg-border"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <a
            href="#"
            className="text-base font-semibold tracking-wide text-text-primary hover:text-accent transition-colors duration-200"
          >
            Sarvesh Sajan
          </a>

          <div className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              link.href.startsWith("/") && !link.href.includes(".") ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium tracking-widest uppercase text-text-secondary hover:text-text-primary transition-colors duration-200"
                  style={{ fontFamily: "var(--font-barlow)", letterSpacing: "0.1em" }}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium tracking-widest uppercase text-text-secondary hover:text-text-primary transition-colors duration-200"
                  style={{ fontFamily: "var(--font-barlow)", letterSpacing: "0.1em" }}
                >
                  {link.label}
                </a>
              )
            ))}
            <a
              href="/Sarvesh%20Sajan%20CV.pdf"
              download
              className="text-sm font-medium tracking-widest uppercase px-5 py-2 border border-accent text-accent hover:bg-accent hover:text-text-primary transition-all duration-200"
              style={{ fontFamily: "var(--font-barlow)", letterSpacing: "0.1em" }}
            >
              Download CV
            </a>
          </div>

          <button
            className="md:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-px bg-text-primary transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block w-4 h-px bg-text-primary transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-px bg-text-primary transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-bg flex flex-col items-center justify-center gap-10 md:hidden"
          >
            {links.map((link) => (
              link.href.startsWith("/") && !link.href.includes(".") ? (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-4xl font-800 tracking-widest uppercase text-text-primary hover:text-accent transition-colors duration-200"
                  style={{ fontFamily: "var(--font-barlow)", fontWeight: 800, letterSpacing: "0.1em" }}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-4xl font-800 tracking-widest uppercase text-text-primary hover:text-accent transition-colors duration-200"
                  style={{ fontFamily: "var(--font-barlow)", fontWeight: 800, letterSpacing: "0.1em" }}
                >
                  {link.label}
                </a>
              )
            ))}
            <a
              href="/Sarvesh%20Sajan%20CV.pdf"
              download
              onClick={() => setMenuOpen(false)}
              className="font-display text-xl font-600 tracking-widest uppercase px-8 py-3 border border-accent text-accent"
              style={{ fontFamily: "var(--font-barlow)", fontWeight: 600 }}
            >
              Download CV
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
