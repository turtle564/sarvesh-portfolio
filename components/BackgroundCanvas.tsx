"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  bvx: number; bvy: number;
  r: number; a: number;
}

interface GlowOrb {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
  baseAlpha: number;
  phase: number;
}

type RipplePhase = "expand" | "flash" | "fade";
interface Ripple {
  x: number; y: number;
  r: number; maxR: number;
  a: number;
  phase: RipplePhase;
  flashFrames: number;
}

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    let raf: number;
    let mouseX = W / 2;
    let mouseY = H / 2;
    let scrollVel = 0;
    let lastScrollY = window.scrollY;
    let time = 0;
    const ripples: Ripple[] = [];

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    resize();

    const isMobile = W < 768;

    // ── Particles ────────────────────────────────────────────────────────
    const COUNT = isMobile
      ? Math.min(40, Math.floor((W * H) / 15000))
      : Math.min(85, Math.floor((W * H) / 10000));

    const particles: Particle[] = Array.from({ length: COUNT }, () => {
      const bvx = (Math.random() - 0.5) * 0.36;
      const bvy = (Math.random() - 0.5) * 0.36;
      return {
        x: Math.random() * W, y: Math.random() * H,
        vx: bvx, vy: bvy, bvx, bvy,
        r: Math.random() * 1.5 + 0.4,
        a: Math.random() * 0.4 + 0.22,
      };
    });

    // ── Ambient glow orbs — large soft crimson blobs ──────────────────────
    // Positioned across the viewport, react to scroll, breathe slowly
    const orbs: GlowOrb[] = [
      { x: W * 0.22, y: H * 0.28, vx: 0.12,  vy: 0.06,  radius: isMobile ? 180 : 300, baseAlpha: 0.20, phase: 0 },
      { x: W * 0.78, y: H * 0.58, vx: -0.09, vy: 0.08,  radius: isMobile ? 150 : 240, baseAlpha: 0.16, phase: 2.1 },
      { x: W * 0.50, y: H * 0.82, vx: 0.07,  vy: -0.10, radius: isMobile ? 200 : 320, baseAlpha: 0.18, phase: 4.2 },
    ];

    // ── Event handlers ───────────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };

    const onScroll = () => {
      const y = window.scrollY;
      scrollVel = (y - lastScrollY) * 0.1;
      lastScrollY = y;
    };

    const onClick = (e: MouseEvent) => {
      if (ripples.length >= 4) ripples.shift(); // cap active ripples
      ripples.push({
        x: e.clientX, y: e.clientY,
        r: 0,
        maxR: 55 + Math.random() * 25, // smaller: 55–80px
        a: 0.82,
        phase: "expand",
        flashFrames: 0,
      });
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll",    onScroll,    { passive: true });
    window.addEventListener("click",     onClick,     { passive: true });
    window.addEventListener("resize",    resize);

    const LINK_DIST    = isMobile ? 95 : 118;
    const MOUSE_R      = 160;
    const MOUSE_STR    = 0.030;
    const SPEED_CAP    = 2.6;

    // ── Main loop ────────────────────────────────────────────────────────
    const tick = () => {
      time++;
      ctx.clearRect(0, 0, W, H);
      scrollVel *= 0.87;

      // ── Draw glow orbs first (behind particles) ──
      for (const orb of orbs) {
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Scroll shifts orbs
        orb.vy += scrollVel * 0.04;
        orb.vy *= 0.985;

        // Wrap gently
        if (orb.x < -orb.radius)         orb.x = W + orb.radius;
        else if (orb.x > W + orb.radius)  orb.x = -orb.radius;
        if (orb.y < -orb.radius)          orb.y = H + orb.radius;
        else if (orb.y > H + orb.radius)  orb.y = -orb.radius;

        // Breathing pulse: alpha oscillates gently
        const breathe = 1 + 0.18 * Math.sin(time * 0.015 + orb.phase);
        const alpha = orb.baseAlpha * breathe;

        // Radial gradient — deep crimson core fading to nothing
        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        grad.addColorStop(0,    `rgba(139, 32, 32, ${alpha})`);
        grad.addColorStop(0.45, `rgba(120, 25, 25, ${alpha * 0.55})`);
        grad.addColorStop(1,    `rgba(100, 20, 20, 0)`);

        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // ── Particles ──
      for (const p of particles) {
        // Mouse gravity
        const mdx = mouseX - p.x;
        const mdy = mouseY - p.y;
        const md  = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < MOUSE_R && md > 1) {
          const f = ((MOUSE_R - md) / MOUSE_R) * MOUSE_STR;
          p.vx += (mdx / md) * f;
          p.vy += (mdy / md) * f;
        }

        // Scroll drift
        p.vy += scrollVel * 0.052;

        // Spring back to base
        p.vx += (p.bvx - p.vx) * 0.022;
        p.vy += (p.bvy - p.vy) * 0.022;

        // Speed cap
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > SPEED_CAP) { p.vx = (p.vx / spd) * SPEED_CAP; p.vy = (p.vy / spd) * SPEED_CAP; }

        p.x += p.vx; p.y += p.vy;

        if (p.x < -10) p.x = W + 10; else if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10; else if (p.y > H + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(185, 58, 58, ${p.a})`;
        ctx.fill();
      }

      // ── Connections ──
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK_DIST) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(155, 42, 42, ${(1 - d / LINK_DIST) * 0.20})`;
            ctx.lineWidth = 0.55;
            ctx.stroke();
          }
        }
      }

      // ── Ripples ──
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];

        if (rp.phase === "expand") {
          rp.r += (rp.maxR - rp.r) * 0.10 + 1.5;

          // Push particles at wavefront
          for (const p of particles) {
            const dx = p.x - rp.x; const dy = p.y - rp.y;
            const d = Math.sqrt(dx * dx + dy * dy);
            const zone = 22;
            if (d < rp.r + zone && d > rp.r - zone && d > 1) {
              const str = 1.0 * (1 - Math.abs(d - rp.r) / zone);
              p.vx += (dx / d) * str; p.vy += (dy / d) * str;
            }
          }
          if (rp.r >= rp.maxR * 0.88) { rp.phase = "flash"; rp.flashFrames = 0; }

        } else if (rp.phase === "flash") {
          rp.flashFrames++;
          // Quick bright pop at max, then hand off to fade
          rp.a = 0.88 + Math.sin((rp.flashFrames / 5) * Math.PI) * 0.12;
          if (rp.flashFrames >= 5) rp.phase = "fade";

        } else {
          rp.a -= 0.035; rp.r += 0.9;
        }

        if (rp.a <= 0) { ripples.splice(i, 1); continue; }

        // Main ring
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(215, 72, 72, ${rp.a})`;
        ctx.lineWidth = rp.phase === "flash" ? 2 : 1.4;
        ctx.stroke();

        // Second softer inner ring for depth
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r * 0.78, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(160, 42, 42, ${rp.a * 0.35})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();

        // Soft radial fill at edge
        const grad = ctx.createRadialGradient(rp.x, rp.y, rp.r * 0.6, rp.x, rp.y, rp.r);
        grad.addColorStop(0, `rgba(180, 50, 50, 0)`);
        grad.addColorStop(1, `rgba(180, 50, 50, ${rp.a * 0.11})`);
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll",    onScroll);
      window.removeEventListener("click",     onClick);
      window.removeEventListener("resize",    resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 10, opacity: 0.62, mixBlendMode: "screen" }}
    />
  );
}
