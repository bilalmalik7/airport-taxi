"use client";

import { motion, useScroll, useSpring } from "framer-motion";
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
