"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden />;
}

export function WhatsAppFab() {
  return (
    <motion.a
      className="wa-fab"
      href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hi, I'd like a quote for an airport transfer")}`}
      target="_blank"
      rel="noopener"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.08 }}
    >
      <svg viewBox="0 0 32 32" aria-hidden>
        <path
          fill="currentColor"
          d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.2.6 4.4 1.7 6.3L3 29l7.3-1.9c1.8 1 3.8 1.5 5.8 1.5 7 0 12.7-5.7 12.7-12.6S23 3 16 3zm0 23.2c-1.9 0-3.7-.5-5.3-1.4l-.4-.2-4.3 1.1 1.2-4.2-.3-.4a10.4 10.4 0 0 1-1.6-5.5C5.3 9.8 10.1 5.2 16 5.2s10.6 4.6 10.6 10.4S21.9 26.2 16 26.2zm5.8-7.8c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1-1.9-.9-3.1-1.7-4.4-3.8-.3-.6.3-.5 1-1.8.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 2.1.9 3 1 4 .8.7-.1 1.9-.8 2.2-1.5.3-.8.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"
        />
      </svg>
      <span className="wa-ping" />
    </motion.a>
  );
}

// Small floating "app notification" cards that cycle beside the hero scene.
const toasts = [
  { icon: "✅", title: "Booking confirmed", text: "West End → Glasgow Airport, 04:30" },
  { icon: "🛬", title: "Flight landed", text: "Driver waiting in arrivals" },
  { icon: "💷", title: "Fixed price", text: "No meter, no surge, ever" },
];

export function HeroToasts() {
  return (
    <div className="toasts" aria-hidden>
      {toasts.map((t, i) => (
        <div key={t.title} className={`toast toast-${i}`}>
          <span>{t.icon}</span>
          <div>
            <b>{t.title}</b>
            <small>{t.text}</small>
          </div>
        </div>
      ))}
    </div>
  );
}

// Cycles the last word of the headline. The first word is rendered on the server, so SEO text is intact.
export function RotatingWord({ words, interval = 2600 }: { words: string[]; interval?: number }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words.length, interval]);
  return (
    <span className="rotator">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[i]}
          className="hl"
          initial={{ y: "70%", opacity: 0, rotateX: -70 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          exit={{ y: "-70%", opacity: 0, rotateX: 70 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// Subtle 3D tilt that follows the pointer, with a soft light spot.
export function Tilt({ children, className, max = 8 }: { children: React.ReactNode; className?: string; max?: number }) {
  const rx = useSpring(0, { stiffness: 200, damping: 18 });
  const ry = useSpring(0, { stiffness: 200, damping: 18 });
  const [spot, setSpot] = useState({ x: 50, y: 50 });
  return (
    <motion.div
      className={`tilt ${className ?? ""}`}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900, ["--sx" as string]: `${spot.x}%`, ["--sy" as string]: `${spot.y}%` }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        ry.set((px - 0.5) * max * 2);
        rx.set(-(py - 0.5) * max * 2);
        setSpot({ x: px * 100, y: py * 100 });
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

export function BackToTop() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useEffect(() => scrollY.on("change", (v) => setShow(v > 1200)), [scrollY]);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          className="to-top"
          aria-label="Back to top"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          whileHover={{ y: -4 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <span aria-hidden>🚕</span>
          <small>Top</small>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
