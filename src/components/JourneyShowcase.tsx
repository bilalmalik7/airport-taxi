"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import DepartureScene from "./scenes/DepartureScene";
import HomePickupScene from "./scenes/HomePickupScene";
import MeetGreetScene from "./scenes/MeetGreetScene";

const chapters = [
  { icon: "🏠", title: "Picked up at your door", text: "Even at 4am. We text you when your driver is outside and load the bags for you.", secs: 14, Scene: HomePickupScene },
  { icon: "🛫", title: "Dropped at departures", text: "Right outside the terminal doors. No parking, no shuttle bus, no stress.", secs: 12, Scene: DepartureScene },
  { icon: "🛬", title: "Welcomed home", text: "Your driver waits in arrivals with your name and drives you straight home.", secs: 12, Scene: MeetGreetScene },
];

// Plays the three story scenes in order like a short film; tabs jump between them.
export default function JourneyShowcase() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const { Scene, secs } = chapters[i];

  useEffect(() => {
    if (!auto) return;
    const t = setTimeout(() => setI((n) => (n + 1) % chapters.length), secs * 1000);
    return () => clearTimeout(t);
  }, [i, auto, secs]);

  return (
    <div className="journey">
      <div className="journey-stage">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.97, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.02, filter: "blur(6px)" }}
            transition={{ duration: 0.45 }}
          >
            <Scene />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="journey-tabs" role="tablist" aria-label="Your journey">
        {chapters.map((c, n) => (
          <button
            key={c.title}
            role="tab"
            aria-selected={n === i}
            className={`journey-tab ${n === i ? "on" : ""}`}
            onClick={() => {
              setI(n);
              setAuto(false);
            }}
          >
            <span className="journey-icon">{c.icon}</span>
            <span>
              <small>Step {n + 1}</small>
              <b>{c.title}</b>
              <em>{c.text}</em>
            </span>
            {n === i && auto && <motion.i key={`bar-${i}`} className="journey-bar" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: c.secs, ease: "linear" }} />}
          </button>
        ))}
      </div>
    </div>
  );
}
