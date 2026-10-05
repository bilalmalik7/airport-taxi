"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  { icon: "📍", title: "Enter your pickup", text: "Choose your area, address and airport. See your fixed price instantly." },
  { icon: "💳", title: "Pay securely", text: "Card, Apple Pay or Google Pay online, or pay the driver on the day." },
  { icon: "📲", title: "Driver details by text", text: "We confirm by email and text your driver's name, car and registration." },
  { icon: "✈️", title: "Arrive relaxed", text: "Door-to-terminal, on time. Flights tracked, 45 minutes free waiting on arrivals." },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  const carLeft = useTransform(progress, (x) => `calc(${x * 100}% - 14px)`);

  return (
    <div className="how" ref={ref}>
      <div className="how-track" aria-hidden>
        <motion.div className="how-fill" style={{ scaleX: progress }} />
        <motion.div className="how-car" style={{ left: carLeft }}>
          🚕
        </motion.div>
      </div>
      <ol>
      {steps.map((s, i) => (
        <motion.li
          key={s.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: i * 0.12, duration: 0.5 }}
        >
          <motion.span className="how-icon" whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}>
            {s.icon}
          </motion.span>
          <small>Step {i + 1}</small>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
        </motion.li>
      ))}
      </ol>
    </div>
  );
}
