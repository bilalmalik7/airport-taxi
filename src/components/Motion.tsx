"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function Reveal({ children, delay = 0, className, as = "div" }: { children: React.ReactNode; delay?: number; className?: string; as?: "div" | "li" | "article" }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}

export function CountUp({ to, decimals = 0, suffix = "" }: { to: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1800, bounce: 0 });
  const [text, setText] = useState((0).toFixed(decimals));
  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, mv, to]);
  useEffect(() => spring.on("change", (v) => setText(v.toFixed(decimals))), [spring, decimals]);
  return (
    <span ref={ref}>
      {text}
      {suffix}
    </span>
  );
}

// CSS-only entrance so above-the-fold content paints immediately, before JavaScript loads.
export function FadeUp({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <div className={`fade-up ${className ?? ""}`} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  );
}
