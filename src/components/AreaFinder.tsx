"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useId, useMemo, useState } from "react";
import { airports, findArea, type Area } from "@/lib/data";
import { gbp } from "@/lib/pricing";
import { nearestArea, POPULAR, searchPlaces, type Hit } from "@/lib/search";
import { site } from "@/lib/site";

const EXAMPLES = ["Paisley", "G12", "Byres Road", "East Kilbride", "Edinburgh", "Hamilton"];

// Types out example searches in the placeholder so people know what they can enter.
function useTypewriter(words: string[], active: boolean) {
  const [text, setText] = useState("");
  useEffect(() => {
    if (!active) return;
    let w = 0;
    let i = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const word = words[w];
      i += deleting ? -1 : 1;
      setText(word.slice(0, i));
      let wait = deleting ? 45 : 95;
      if (!deleting && i === word.length) [deleting, wait] = [true, 1400];
      else if (deleting && i === 0) [deleting, w, wait] = [false, (w + 1) % words.length, 300];
      timer = setTimeout(tick, wait);
    };
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, [words, active]);
  return text;
}

export function useLocateMe(onFound: (area: Area, km: number) => void) {
  const [state, setState] = useState<"idle" | "busy" | "error" | "far">("idle");
  const locate = () => {
    if (!navigator.geolocation) return setState("error");
    setState("busy");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { area, km } = nearestArea(pos.coords.latitude, pos.coords.longitude);
        if (km > 25) return setState("far");
        setState("idle");
        onFound(area, km);
      },
      () => setState("error"),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 600000 },
    );
  };
  return { state, locate };
}

function AreaResult({ area, reason, active }: { area: Area; reason?: string; active: boolean }) {
  return (
    <div className={`finder-hit ${active ? "active" : ""}`}>
      <div className="finder-hit-head">
        <span className="finder-pin" aria-hidden>
          📍
        </span>
        <div>
          <Link href={`/areas/${area.slug}`} className="finder-name">
            {area.name}
          </Link>
          <small>{reason ?? area.postcodes}</small>
        </div>
        <Link href={`/book?area=${area.slug}`} className="btn primary sm">
          Book
        </Link>
      </div>
      <div className="finder-airports">
        {airports.map((ap, i) => (
          <motion.div key={ap.code} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + i * 0.05 }}>
            <Link href={`/routes/${area.slug}-to-${ap.slug}`} className="finder-chip">
              <span>✈ {ap.code}</span>
              <b>{gbp(area.fares[ap.code])}</b>
              <small>{area.minutes[ap.code]} min</small>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function AreaFinder({ dark = false }: { dark?: boolean }) {
  const id = useId();
  const [q, setQ] = useState("");
  const [focused, setFocused] = useState(false);
  const [active, setActive] = useState(0);
  const [located, setLocated] = useState<{ area: Area; km: number } | null>(null);
  const placeholder = useTypewriter(EXAMPLES, !q && !focused);
  const { state, locate } = useLocateMe((area, km) => {
    setLocated({ area, km });
    setQ("");
  });

  const hits: Hit[] = useMemo(() => {
    if (q) return searchPlaces(q);
    if (located) return [{ type: "area", area: located.area, reason: `Nearest to you · about ${Math.max(1, Math.round(located.km))} km`, score: 100 }];
    return [];
  }, [q, located]);

  useEffect(() => setActive(0), [q]);

  const onKey = (e: React.KeyboardEvent) => {
    if (!hits.length) return;
    if (e.key === "ArrowDown") (e.preventDefault(), setActive((a) => (a + 1) % hits.length));
    if (e.key === "ArrowUp") (e.preventDefault(), setActive((a) => (a - 1 + hits.length) % hits.length));
    if (e.key === "Enter") {
      e.preventDefault();
      const h = hits[active];
      window.location.href = h.type === "area" ? `/book?area=${h.area.slug}` : `/airports/${h.airport.slug}`;
    }
  };

  return (
    <div className={`finder ${dark ? "dark" : ""}`}>
      <div className={`finder-box ${focused ? "focus" : ""}`}>
        <span className="finder-icon" aria-hidden>
          🔎
        </span>
        <input
          role="combobox"
          aria-expanded={hits.length > 0}
          aria-controls={`${id}-list`}
          aria-activedescendant={hits.length ? `${id}-${active}` : undefined}
          aria-label="Search your area, postcode or street"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setLocated(null);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={onKey}
          placeholder={focused ? "Area, postcode or street…" : `Try “${placeholder}”`}
          autoComplete="off"
        />
        {q && (
          <button type="button" className="finder-clear" onClick={() => setQ("")} aria-label="Clear search">
            ✕
          </button>
        )}
        <button type="button" className="finder-locate" onClick={locate} disabled={state === "busy"}>
          {state === "busy" ? <span className="spinner" aria-hidden /> : "📍"}
          <span>Use my location</span>
        </button>
      </div>

      <AnimatePresence mode="popLayout">
        {state === "error" && !q && (
          <motion.p key="err" className="finder-note" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            We couldn&apos;t get your location. Just type your area or postcode instead.
          </motion.p>
        )}
        {state === "far" && !q && (
          <motion.p key="far" className="finder-note" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            You look a little outside our usual area, but we may still cover you.{" "}
            <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener">
              Ask us on WhatsApp
            </a>
            .
          </motion.p>
        )}
      </AnimatePresence>

      {!q && !located && (
        <div className="finder-popular">
          <span>Popular:</span>
          {POPULAR.map((slug) => {
            const a = findArea(slug)!;
            return (
              <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }} type="button" key={slug} onClick={() => setQ(a.name)}>
                {a.name}
              </motion.button>
            );
          })}
        </div>
      )}

      <ul id={`${id}-list`} role="listbox" className="finder-list">
        <AnimatePresence mode="popLayout" initial={false}>
          {hits.map((h, i) => (
            <motion.li
              layout
              id={`${id}-${i}`}
              role="option"
              aria-selected={i === active}
              key={h.type === "area" ? h.area.slug : h.airport.code}
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.15 } }}
              transition={{ type: "spring", stiffness: 380, damping: 30, delay: i * 0.04 }}
              onMouseEnter={() => setActive(i)}
            >
              {h.type === "area" ? (
                <AreaResult area={h.area} reason={h.reason} active={i === active} />
              ) : (
                <Link href={`/airports/${h.airport.slug}`} className={`finder-hit airport ${i === active ? "active" : ""}`}>
                  <span className="finder-pin" aria-hidden>
                    ✈️
                  </span>
                  <div>
                    <span className="finder-name">{h.airport.name}</span>
                    <small>See fares from every area →</small>
                  </div>
                </Link>
              )}
            </motion.li>
          ))}
        </AnimatePresence>
        {q.trim().length >= 2 && hits.length === 0 && (
          <motion.li className="finder-empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <span aria-hidden>🗺️</span>
            <div>
              <b>No exact match for “{q}”</b>
              <small>
                We probably still cover you.{" "}
                <a href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Hi, do you cover ${q}?`)}`} target="_blank" rel="noopener">
                  Ask us on WhatsApp
                </a>{" "}
                or <a href={`tel:${site.phoneHref}`}>call {site.phone}</a>.
              </small>
            </div>
          </motion.li>
        )}
      </ul>
    </div>
  );
}
