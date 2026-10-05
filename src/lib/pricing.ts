import { findAirport, findArea, findVehicle } from "./data";

export const EXTRAS = {
  meetAndGreet: 8,
  childSeat: 5,
  nightSurchargeRate: 0.15, // 23:00 – 05:00
  returnDiscountRate: 0.05,
};

export type QuoteInput = {
  area: string;
  airport: string;
  vehicle: string;
  time?: string; // "HH:MM"
  returnTrip?: boolean;
  returnTime?: string;
  meetAndGreet?: boolean;
  childSeats?: number;
};

export type Quote = {
  base: number;
  lines: { label: string; amount: number }[];
  total: number;
};

const isNight = (time?: string) => {
  if (!time) return false;
  const hour = Number(time.split(":")[0]);
  return hour >= 23 || hour < 5;
};

const round = (n: number) => Math.round(n * 100) / 100;

// Used by both the browser (live price) and the server (what Stripe charges),
// so the customer can never change the amount they pay.
export function getQuote(input: QuoteInput): Quote | null {
  const area = findArea(input.area);
  const airport = findAirport(input.airport);
  const vehicle = findVehicle(input.vehicle);
  if (!area || !airport || !vehicle) return null;

  const leg = (time?: string) => {
    let fare = area.fares[airport.code] * vehicle.multiplier;
    if (isNight(time)) fare *= 1 + EXTRAS.nightSurchargeRate;
    return Math.round(fare);
  };

  const lines: Quote["lines"] = [];
  const outbound = leg(input.time);
  lines.push({ label: `${vehicle.name} — ${area.name} ↔ ${airport.shortName}`, amount: outbound });
  if (isNight(input.time)) lines.push({ label: "Includes night rate (11pm–5am)", amount: 0 });

  if (input.returnTrip) {
    const back = leg(input.returnTime);
    lines.push({ label: "Return journey", amount: back });
    lines.push({
      label: `Return discount (${EXTRAS.returnDiscountRate * 100}%)`,
      amount: -round((outbound + back) * EXTRAS.returnDiscountRate),
    });
  }
  if (input.meetAndGreet) lines.push({ label: "Meet & greet in arrivals", amount: EXTRAS.meetAndGreet });
  const seats = Math.min(Math.max(Number(input.childSeats) || 0, 0), 3);
  if (seats) lines.push({ label: `Child seat × ${seats}`, amount: seats * EXTRAS.childSeat });

  const total = round(lines.reduce((sum, l) => sum + l.amount, 0));
  return { base: area.fares[airport.code], lines, total };
}

export const fromPrice = (areaSlug: string, code: string) => {
  const area = findArea(areaSlug);
  const airport = findAirport(code);
  return area && airport ? area.fares[airport.code] : null;
};

export const gbp = (n: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", minimumFractionDigits: n % 1 ? 2 : 0 }).format(n);
