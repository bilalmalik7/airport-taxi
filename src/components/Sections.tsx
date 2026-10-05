import Link from "next/link";
import { airports, areas, vehicles, type Area } from "@/lib/data";
import { faqs } from "@/lib/faq";
import { gbp } from "@/lib/pricing";
import { site } from "@/lib/site";
import { CountUp, Reveal } from "./Motion";

export function Stats() {
  return (
    <section className="stats wrap" aria-label="Why customers book with us">
      <Reveal className="stat">
        <strong>24/7</strong>
        <span>Early flights & late arrivals</span>
      </Reveal>
      <Reveal className="stat" delay={0.08}>
        <strong>
          <CountUp to={45} /> min
        </strong>
        <span>Free waiting after landing</span>
      </Reveal>
      <Reveal className="stat" delay={0.16}>
        <strong>
          <CountUp to={airports.length} />
        </strong>
        <span>Airports: GLA, PIK & EDI</span>
      </Reveal>
      <Reveal className="stat" delay={0.24}>
        <strong>£0</strong>
        <span>Hidden fees or surge pricing</span>
      </Reveal>
    </section>
  );
}

export function AreasMarquee() {
  const names = areas.map((a) => a.name);
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee-track">
        {[...names, ...names].map((n, i) => (
          <span key={i}>📍 {n}</span>
        ))}
      </div>
    </div>
  );
}

export function PriceTable({ list = areas }: { list?: Area[] }) {
  return (
    <div className="table-scroll">
      <table className="prices">
        <thead>
          <tr>
            <th scope="col">From</th>
            {airports.map((a) => (
              <th scope="col" key={a.code}>
                {a.shortName} <small>({a.code})</small>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {list.map((area) => (
            <tr key={area.slug}>
              <th scope="row">
                {area.name}
                <small>{area.postcodes}</small>
              </th>
              {airports.map((ap) => (
                <td key={ap.code}>
                  <Link href={`/routes/${area.slug}-to-${ap.slug}`}>{gbp(area.fares[ap.code])}</Link>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const features = [
  { icon: "💷", title: "Fixed prices", text: "Know the fare before you travel. No meter running in traffic on the M8." },
  { icon: "🛬", title: "Flight tracking", text: "Delayed? We see it too and adjust your pickup automatically." },
  { icon: "🪪", title: "Licensed local drivers", text: "Council-licensed, PVG-checked drivers who know every Glasgow shortcut." },
  { icon: "🧼", title: "Clean, modern cars", text: "Air-conditioned saloons, estates, people carriers and 8-seaters." },
  { icon: "👶", title: "Child seats", text: "Baby and booster seats fitted for you on request." },
  { icon: "🤝", title: "Meet & greet", text: "Your driver waits in arrivals with your name and helps with bags." },
];

export function Features() {
  return (
    <div className="features">
      {features.map((f, i) => (
        <Reveal key={f.title} className="feature" delay={i * 0.06}>
          <span className="feature-icon">{f.icon}</span>
          <h3>{f.title}</h3>
          <p>{f.text}</p>
        </Reveal>
      ))}
    </div>
  );
}

function CarIcon({ long = false }: { long?: boolean }) {
  const w = long ? 120 : 100;
  return (
    <svg viewBox={`0 0 ${w + 20} 50`} className="car-icon" aria-hidden>
      <rect x="10" y="20" width={w} height="18" rx="7" fill="currentColor" />
      <path d={`M ${long ? 22 : 30} 20 L ${long ? 32 : 42} 6 L ${w - 20} 6 L ${w - 6} 20 Z`} fill="currentColor" />
      <path d={`M ${long ? 30 : 40} 19 L ${long ? 37 : 46} 9 L ${w / 2 + 8} 9 L ${w / 2 + 8} 19 Z M ${w / 2 + 12} 19 L ${w / 2 + 12} 9 L ${w - 22} 9 L ${w - 12} 19 Z`} fill="#9ed0ff" />
      <circle cx="32" cy="38" r="8" fill="#14284f" />
      <circle cx={w - 12} cy="38" r="8" fill="#14284f" />
    </svg>
  );
}

export function Fleet() {
  return (
    <div className="fleet">
      {vehicles.map((v, i) => (
        <Reveal key={v.id} className="fleet-card" delay={i * 0.08}>
          <CarIcon long={v.passengers > 4} />
          <h3>{v.name}</h3>
          <p className="muted">{v.example}</p>
          <p>
            👤 Up to {v.passengers} passengers · 🧳 {v.suitcases} suitcases
          </p>
          <p className="from">From {gbp(Math.round(15 * v.multiplier))}</p>
        </Reveal>
      ))}
    </div>
  );
}

// Example reviews so the client can see the layout. Replace with real Google
// reviews before launch — never publish made-up reviews.
const reviews = [
  { name: "Example customer", place: "West End → Glasgow Airport", text: "Driver was waiting outside at 4am, helped with our cases and had us at departures in 15 minutes." },
  { name: "Example customer", place: "Edinburgh Airport → Hamilton", text: "Our flight was an hour late and the driver was still there with a name board. Fixed price, no fuss." },
  { name: "Example customer", place: "East Kilbride → Prestwick", text: "Booked the 8-seater for a family holiday. Spotless car, child seats already fitted." },
];

export function Reviews() {
  return (
    <div className="reviews">
      {reviews.map((r, i) => (
        <Reveal key={i} className="review" delay={i * 0.1}>
          <span className="stars" aria-label="5 out of 5">★★★★★</span>
          <p>“{r.text}”</p>
          <p className="muted">
            <b>{r.name}</b> · {r.place} <span className="tag">Example — replace with real review</span>
          </p>
        </Reveal>
      ))}
    </div>
  );
}

export function Faq() {
  return (
    <div className="faq">
      {faqs.map((f) => (
        <details key={f.q}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function CtaBand({ title = "Ready when your flight is." }: { title?: string }) {
  return (
    <section className="cta">
      <div className="wrap cta-inner">
        <Reveal>
          <h2>{title}</h2>
          <p>Book online in under a minute, or call us any time on {site.phone}.</p>
        </Reveal>
        <div className="cta-actions">
          <Link href="/book" className="btn primary">
            Get my fixed price
          </Link>
          <a href={`tel:${site.phoneHref}`} className="btn light">
            Call {site.phone}
          </a>
        </div>
      </div>
      <div className="cta-plane" aria-hidden>
        ✈
      </div>
    </section>
  );
}
