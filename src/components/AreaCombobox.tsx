"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { areas, findArea } from "@/lib/data";
import { searchPlaces, type AreaHit } from "@/lib/search";
import { useLocateMe } from "./AreaFinder";

// Searchable area picker for the booking form: type "pai", "G12" or "Byres Road".
export default function AreaCombobox({ value, onChange }: { value: string; onChange: (slug: string) => void }) {
  const id = useId();
  const selected = findArea(value);
  const [q, setQ] = useState(selected?.name ?? "");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const box = useRef<HTMLDivElement>(null);
  const { state, locate } = useLocateMe((area) => {
    onChange(area.slug);
    setQ(area.name);
    setOpen(false);
  });

  useEffect(() => setQ(findArea(value)?.name ?? ""), [value]);

  const options: AreaHit[] = useMemo(() => {
    const typed = q && q !== selected?.name;
    if (!typed) return areas.map((area) => ({ type: "area" as const, area, score: 0 }));
    return searchPlaces(q).filter((h): h is AreaHit => h.type === "area");
  }, [q, selected]);

  useEffect(() => setActive(0), [q]);

  const pick = (slug: string) => {
    onChange(slug);
    setQ(findArea(slug)!.name);
    setOpen(false);
  };

  return (
    <div
      className="combo"
      ref={box}
      onBlur={(e) => {
        if (!box.current?.contains(e.relatedTarget as Node)) {
          setOpen(false);
          setQ(findArea(value)?.name ?? "");
        }
      }}
    >
      <div className="combo-input">
        <input
          role="combobox"
          aria-expanded={open}
          aria-controls={`${id}-list`}
          aria-activedescendant={open && options.length ? `${id}-${active}` : undefined}
          value={q}
          placeholder="Area or postcode…"
          autoComplete="off"
          onFocus={(e) => {
            setOpen(true);
            e.target.select();
          }}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
              setActive((a) => Math.min(a + 1, options.length - 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((a) => Math.max(a - 1, 0));
            } else if (e.key === "Enter" && open && options[active]) {
              e.preventDefault();
              pick(options[active].area.slug);
            } else if (e.key === "Escape") setOpen(false);
          }}
        />
        <button type="button" className="combo-locate" onClick={locate} title="Use my location" aria-label="Use my location">
          {state === "busy" ? <span className="spinner" aria-hidden /> : "📍"}
        </button>
      </div>
      {state === "error" && <small className="combo-note">Couldn&apos;t get your location. Please type your area.</small>}
      {state === "far" && <small className="combo-note">You seem outside our usual area. Pick the nearest or call us.</small>}
      <AnimatePresence>
        {open && (
          <motion.ul
            id={`${id}-list`}
            role="listbox"
            className="combo-list"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16 }}
          >
            {options.map((o, i) => (
              <li
                key={o.area.slug}
                id={`${id}-${i}`}
                role="option"
                aria-selected={o.area.slug === value}
                tabIndex={-1}
                className={`${i === active ? "active" : ""} ${o.area.slug === value ? "chosen" : ""}`}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => pick(o.area.slug)}
              >
                <span>
                  {o.area.name}
                  <small>{o.reason ?? o.area.postcodes}</small>
                </span>
                {o.area.slug === value && <b aria-hidden>✓</b>}
              </li>
            ))}
            {options.length === 0 && <li className="combo-empty">No match: try a nearby town or your postcode</li>}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
