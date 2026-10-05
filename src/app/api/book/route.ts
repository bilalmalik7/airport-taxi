import { NextResponse } from "next/server";
import Stripe from "stripe";
import { findAirport, findArea, findVehicle } from "@/lib/data";
import { getQuote, gbp } from "@/lib/pricing";
import { site } from "@/lib/site";

type Body = Record<string, unknown>;

const str = (v: unknown, max = 300) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

async function notify(subject: string, rows: [string, string][], to: string[]) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.BOOKING_FROM_EMAIL;
  if (!key || !from) {
    console.log(`[booking] ${subject}\n` + rows.map(([k, v]) => `  ${k}: ${v}`).join("\n"));
    return;
  }
  const html = `<h2>${esc(subject)}</h2><table cellpadding="6">${rows
    .map(([k, v]) => `<tr><td><b>${esc(k)}</b></td><td>${esc(v)}</td></tr>`)
    .join("")}</table>`;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, subject, html }),
  });
  if (!res.ok) console.error("[booking] email failed", res.status, await res.text());
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const b = {
    direction: body.direction === "from" ? "from" : "to",
    area: str(body.area, 60),
    address: str(body.address),
    airport: str(body.airport, 3),
    date: str(body.date, 10),
    time: str(body.time, 5),
    flight: str(body.flight, 12),
    returnTrip: body.returnTrip === true,
    returnDate: str(body.returnDate, 10),
    returnTime: str(body.returnTime, 5),
    passengers: Number(body.passengers) || 1,
    suitcases: Number(body.suitcases) || 0,
    vehicle: str(body.vehicle, 20),
    meetAndGreet: body.meetAndGreet === true,
    childSeats: Number(body.childSeats) || 0,
    name: str(body.name, 100),
    email: str(body.email, 200),
    phone: str(body.phone, 30),
    notes: str(body.notes, 500),
    payment: body.payment === "driver" ? "driver" : "online",
  };

  const area = findArea(b.area);
  const airport = findAirport(b.airport);
  const vehicle = findVehicle(b.vehicle);
  const quote = getQuote(b);
  if (!area || !airport || !vehicle || !quote) return NextResponse.json({ error: "Please check your journey details." }, { status: 400 });
  if (!b.address || !b.date || !b.time) return NextResponse.json({ error: "Address, date and time are required." }, { status: 400 });
  if (!b.name || !/^\S+@\S+\.\S+$/.test(b.email) || b.phone.replace(/\D/g, "").length < 10)
    return NextResponse.json({ error: "Please check your contact details." }, { status: 400 });
  if (b.passengers > vehicle.passengers || b.suitcases > vehicle.suitcases)
    return NextResponse.json({ error: "That vehicle is too small for your group." }, { status: 400 });

  const ref = `GA-${Date.now().toString(36).toUpperCase().slice(-6)}`;
  const route = b.direction === "to" ? `${b.address} → ${airport.name}` : `${airport.name} → ${b.address}`;
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const payOnline = b.payment === "online" && !!stripeKey;

  const rows: [string, string][] = [
    ["Reference", ref],
    ["Route", route],
    ["Area", area.name],
    ["When", `${b.date} ${b.time}`],
    ["Flight", b.flight || "—"],
    ["Return", b.returnTrip ? `${b.returnDate} ${b.returnTime}` : "No"],
    ["Vehicle", `${vehicle.name} — ${b.passengers} pax, ${b.suitcases} cases`],
    ["Extras", [b.meetAndGreet && "Meet & greet", b.childSeats && `${b.childSeats} child seat(s)`].filter(Boolean).join(", ") || "—"],
    ["Customer", `${b.name} · ${b.phone} · ${b.email}`],
    ["Notes", b.notes || "—"],
    ["Price", gbp(quote.total)],
    ["Payment", payOnline ? "Online (Stripe) — check dashboard for payment" : "Pay the driver"],
  ];

  const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;
  let url = `${origin}/booking/confirmed?ref=${ref}`;

  if (payOnline) {
    try {
      const stripe = new Stripe(stripeKey);
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        customer_email: b.email,
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: "gbp",
              unit_amount: Math.round(quote.total * 100),
              product_data: { name: `Airport transfer ${ref}`, description: `${route} · ${b.date} ${b.time}` },
            },
          },
        ],
        metadata: Object.fromEntries(rows.map(([k, v]) => [k.toLowerCase(), v.slice(0, 450)])),
        success_url: `${url}&paid=1`,
        cancel_url: `${origin}/book?area=${area.slug}&airport=${airport.code}`,
      });
      url = session.url!;
    } catch (err) {
      console.error("[booking] stripe failed", err);
      return NextResponse.json({ error: "Online payment is unavailable right now — choose “Pay the driver” or call us." }, { status: 502 });
    }
  }

  const ownerEmail = process.env.BOOKING_NOTIFY_EMAIL || site.email;
  await Promise.all([
    notify(`New booking ${ref} — ${airport.shortName} ${b.date} ${b.time}`, rows, [ownerEmail]),
    notify(`Your ${site.name} booking ${ref}`, rows, [b.email]),
  ]);

  return NextResponse.json({ url, ref });
}
