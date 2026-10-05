"use client";

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { airports, areas, vehicles } from "@/lib/data";
import { getQuote, gbp } from "@/lib/pricing";

type Props = { initialArea?: string; initialAirport?: string };

const STEPS = ["Journey", "Vehicle", "Pay"] as const;

const today = () => new Date().toISOString().slice(0, 10);

function AnimatedPrice({ value }: { value: number }) {
  const mv = useMotionValue(value);
  const spring = useSpring(mv, { stiffness: 120, damping: 20 });
  const text = useTransform(spring, (v) => gbp(Math.round(v)));
  useEffect(() => mv.set(value), [mv, value]);
  return <motion.span>{text}</motion.span>;
}

export default function BookingForm({ initialArea = "", initialAirport = "GLA" }: Props) {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [f, setF] = useState({
    direction: "to" as "to" | "from",
    area: initialArea,
    address: "",
    airport: initialAirport,
    date: "",
    time: "",
    flight: "",
    returnTrip: false,
    returnDate: "",
    returnTime: "",
    passengers: 1,
    suitcases: 1,
    vehicle: "saloon",
    meetAndGreet: false,
    childSeats: 0,
    name: "",
    email: "",
    phone: "",
    notes: "",
    payment: "online" as "online" | "driver",
  });

  const set = <K extends keyof typeof f>(key: K, value: (typeof f)[K]) => setF((prev) => ({ ...prev, [key]: value }));

  // Pick the smallest vehicle that fits whenever the party size changes.
  useEffect(() => {
    const current = vehicles.find((v) => v.id === f.vehicle)!;
    if (current.passengers < f.passengers || current.suitcases < f.suitcases) {
      const fit = vehicles.find((v) => v.passengers >= f.passengers && v.suitcases >= f.suitcases);
      if (fit) set("vehicle", fit.id);
    }
  }, [f.passengers, f.suitcases, f.vehicle]);

  const meetGreetAllowed = f.direction === "from" || f.returnTrip;
  const quote = useMemo(
    () =>
      getQuote({
        area: f.area,
        airport: f.airport,
        vehicle: f.vehicle,
        time: f.time,
        returnTrip: f.returnTrip,
        returnTime: f.returnTime,
        meetAndGreet: meetGreetAllowed && f.meetAndGreet,
        childSeats: f.childSeats,
      }),
    [f, meetGreetAllowed],
  );

  const validate = (s: number) => {
    if (s === 0) {
      if (!f.area) return "Choose your area so we can price your journey.";
      if (f.address.trim().length < 5) return `Enter the full ${f.direction === "to" ? "pickup" : "drop-off"} address.`;
      if (!f.date || !f.time) return "Choose a date and time.";
      if (f.direction === "from" && !f.flight.trim()) return "Add your flight number so we can track it.";
      if (f.returnTrip && (!f.returnDate || !f.returnTime)) return "Choose a date and time for your return.";
    }
    if (s === 2) {
      if (!f.name.trim()) return "Enter your name.";
      if (!/^\S+@\S+\.\S+$/.test(f.email)) return "Enter a valid email address.";
      if (f.phone.replace(/\D/g, "").length < 10) return "Enter a valid mobile number.";
    }
    return "";
  };

  const go = (next: number) => {
    if (next > step) {
      const msg = validate(step);
      if (msg) return setError(msg);
    }
    setError("");
    setDir(next > step ? 1 : -1);
    setStep(next);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) return go(step + 1);
    const msg = validate(2);
    if (msg) return setError(msg);
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...f, meetAndGreet: meetGreetAllowed && f.meetAndGreet }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSubmitting(false);
    }
  };

  const placeLabel = f.direction === "to" ? "Pickup address" : "Drop-off address";

  return (
    <form className="booking" onSubmit={submit} noValidate>
      <div className="booking-head">
        <div className="steps" aria-label="Booking progress">
          {STEPS.map((label, i) => (
            <button type="button" key={label} className={`step ${i === step ? "on" : ""} ${i < step ? "done" : ""}`} onClick={() => i < step && go(i)}>
              <span>{i < step ? "✓" : i + 1}</span>
              {label}
            </button>
          ))}
          <motion.div className="steps-bar" animate={{ width: `${(step / (STEPS.length - 1)) * 100}%` }} />
        </div>
      </div>

      <div className="booking-body">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.div
            key={step}
            custom={dir}
            initial={{ opacity: 0, x: 40 * dir }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 * dir }}
            transition={{ duration: 0.25 }}
          >
            {step === 0 && (
              <div className="grid">
                <div className="toggle full" role="radiogroup" aria-label="Direction">
                  {(["to", "from"] as const).map((d) => (
                    <button type="button" role="radio" aria-checked={f.direction === d} key={d} className={f.direction === d ? "on" : ""} onClick={() => set("direction", d)}>
                      {d === "to" ? "🚕 → ✈️ To the airport" : "✈️ → 🚕 From the airport"}
                    </button>
                  ))}
                </div>
                <label>
                  Your area
                  <select value={f.area} onChange={(e) => set("area", e.target.value)} required>
                    <option value="">Select area…</option>
                    {areas.map((a) => (
                      <option key={a.slug} value={a.slug}>
                        {a.name} ({a.postcodes})
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Airport
                  <select value={f.airport} onChange={(e) => set("airport", e.target.value)}>
                    {airports.map((a) => (
                      <option key={a.code} value={a.code}>
                        {a.name} ({a.code})
                      </option>
                    ))}
                  </select>
                </label>
                <label className="full">
                  {placeLabel}
                  <input value={f.address} onChange={(e) => set("address", e.target.value)} placeholder="House number, street and postcode" autoComplete="street-address" />
                </label>
                <label>
                  {f.direction === "to" ? "Pickup date" : "Landing date"}
                  <input type="date" min={today()} value={f.date} onChange={(e) => set("date", e.target.value)} />
                </label>
                <label>
                  {f.direction === "to" ? "Pickup time" : "Landing time"}
                  <input type="time" value={f.time} onChange={(e) => set("time", e.target.value)} />
                </label>
                <label className="full">
                  <span>Flight number {f.direction === "to" && <em>(optional)</em>}</span>
                  <input value={f.flight} onChange={(e) => set("flight", e.target.value.toUpperCase())} placeholder="e.g. EZY6922" />
                </label>
                <label className="check full">
                  <input type="checkbox" checked={f.returnTrip} onChange={(e) => set("returnTrip", e.target.checked)} />
                  Add a return journey and save 5%
                </label>
                <AnimatePresence>
                  {f.returnTrip && (
                    <motion.div className="grid full" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                      <label>
                        Return date
                        <input type="date" min={f.date || today()} value={f.returnDate} onChange={(e) => set("returnDate", e.target.value)} />
                      </label>
                      <label>
                        Return time
                        <input type="time" value={f.returnTime} onChange={(e) => set("returnTime", e.target.value)} />
                      </label>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {step === 1 && (
              <div className="grid">
                <label>
                  Passengers
                  <select value={f.passengers} onChange={(e) => set("passengers", Number(e.target.value))}>
                    {Array.from({ length: 8 }, (_, i) => (
                      <option key={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Suitcases
                  <select value={f.suitcases} onChange={(e) => set("suitcases", Number(e.target.value))}>
                    {Array.from({ length: 9 }, (_, i) => (
                      <option key={i}>{i}</option>
                    ))}
                  </select>
                </label>
                <div className="vehicles full" role="radiogroup" aria-label="Vehicle">
                  {vehicles.map((v) => {
                    const fits = v.passengers >= f.passengers && v.suitcases >= f.suitcases;
                    const price = getQuote({ area: f.area, airport: f.airport, vehicle: v.id, time: f.time })?.total;
                    return (
                      <motion.button
                        type="button"
                        role="radio"
                        aria-checked={f.vehicle === v.id}
                        key={v.id}
                        disabled={!fits}
                        whileHover={fits ? { y: -3 } : undefined}
                        whileTap={fits ? { scale: 0.97 } : undefined}
                        className={`vehicle ${f.vehicle === v.id ? "on" : ""}`}
                        onClick={() => set("vehicle", v.id)}
                      >
                        <strong>{v.name}</strong>
                        <small>{v.example}</small>
                        <span>
                          👤 {v.passengers} · 🧳 {v.suitcases}
                        </span>
                        {price !== undefined && <b>{gbp(price)}</b>}
                      </motion.button>
                    );
                  })}
                </div>
                {meetGreetAllowed && (
                  <label className="check full">
                    <input type="checkbox" checked={f.meetAndGreet} onChange={(e) => set("meetAndGreet", e.target.checked)} />
                    Meet &amp; greet in arrivals with a name board (+£8)
                  </label>
                )}
                <label className="full">
                  Child seats (+£5 each)
                  <select value={f.childSeats} onChange={(e) => set("childSeats", Number(e.target.value))}>
                    {[0, 1, 2, 3].map((n) => (
                      <option key={n}>{n}</option>
                    ))}
                  </select>
                </label>
              </div>
            )}

            {step === 2 && (
              <div className="grid">
                <label className="full">
                  Full name
                  <input value={f.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" />
                </label>
                <label>
                  Email
                  <input type="email" value={f.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" />
                </label>
                <label>
                  Mobile
                  <input type="tel" value={f.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" />
                </label>
                <label className="full">
                  <span>Notes for the driver <em>(optional)</em></span>
                  <textarea rows={2} value={f.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Extra stops, golf clubs, wheelchair…" />
                </label>
                <div className="toggle full" role="radiogroup" aria-label="Payment">
                  <button type="button" role="radio" aria-checked={f.payment === "online"} className={f.payment === "online" ? "on" : ""} onClick={() => set("payment", "online")}>
                    💳 Pay now online
                  </button>
                  <button type="button" role="radio" aria-checked={f.payment === "driver"} className={f.payment === "driver" ? "on" : ""} onClick={() => set("payment", "driver")}>
                    💷 Pay the driver
                  </button>
                </div>
                {quote && (
                  <ul className="summary full">
                    {quote.lines.map((l) => (
                      <li key={l.label}>
                        <span>{l.label}</span>
                        {l.amount !== 0 && <span>{gbp(l.amount)}</span>}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {error && (
          <motion.p className="error" role="alert" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="booking-foot">
        <div className="price">
          <small>{quote ? "Fixed price" : "Your price"}</small>
          <strong>{quote ? <AnimatedPrice value={quote.total} /> : "—"}</strong>
        </div>
        <div className="actions">
          {step > 0 && (
            <button type="button" className="btn ghost" onClick={() => go(step - 1)}>
              Back
            </button>
          )}
          <motion.button type="submit" className="btn primary" whileTap={{ scale: 0.97 }} disabled={submitting}>
            {step < 2 ? "Continue" : submitting ? "Booking…" : f.payment === "online" ? "Book & pay securely" : "Confirm booking"}
          </motion.button>
        </div>
      </div>
    </form>
  );
}
