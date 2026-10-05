import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookingForm from "@/components/BookingForm";
import { JsonLd } from "@/components/Chrome";
import { FadeUp, Reveal } from "@/components/Motion";
import { CtaBand, Features } from "@/components/Sections";
import { airports, allRoutes, findRoute, vehicles } from "@/lib/data";
import { EXTRAS, gbp, getQuote } from "@/lib/pricing";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => allRoutes.map((r) => ({ slug: r.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const route = findRoute((await params).slug);
  if (!route) return {};
  const { area, airport } = route;
  const price = area.fares[airport.code];
  return {
    title: `${area.name} to ${airport.name} Taxi from ${gbp(price)}`,
    description: `Fixed-price taxi from ${area.name} (${area.postcodes}) to ${airport.name} from ${gbp(price)}. About ${area.minutes[airport.code]} minutes, licensed drivers, flight tracking. Book online 24/7.`,
    alternates: { canonical: `/routes/${route.slug}` },
  };
}

export default async function RoutePage({ params }: Props) {
  const route = findRoute((await params).slug);
  if (!route) notFound();
  const { area, airport } = route;
  const price = area.fares[airport.code];
  const mins = area.minutes[airport.code];

  const routeFaqs = [
    {
      q: `How much is a taxi from ${area.name} to ${airport.name}?`,
      a: `A saloon from ${area.name} to ${airport.name} is a fixed ${gbp(price)} one way. Larger vehicles start from ${gbp(getQuote({ area: area.slug, airport: airport.code, vehicle: "estate" })!.total)}.`,
    },
    {
      q: `How long does it take to get from ${area.name} to ${airport.name}?`,
      a: `Around ${mins} minutes in normal traffic. For early-morning flights we recommend being picked up at least 2 hours 30 minutes before departure.`,
    },
    {
      q: `Can you pick me up from ${airport.name} and take me home to ${area.name}?`,
      a: `Yes. Add your flight number and we track it, so your driver is there when you land — with optional £${EXTRAS.meetAndGreet} meet & greet in arrivals.`,
    },
  ];

  const otherAirports = airports.filter((a) => a.code !== airport.code);
  const nearby = allRoutes.filter((r) => r.airport.code === airport.code && r.area.slug !== area.slug).slice(0, 8);

  return (
    <>
      <JsonLd data={faqSchema(routeFaqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: airport.name, path: `/airports/${airport.slug}` },
          { name: `${area.name} to ${airport.shortName}`, path: `/routes/${route.slug}` },
        ])}
      />
      <section className="page-hero">
        <div className="wrap hero-grid">
          <div>
            <FadeUp>
              <nav className="crumbs" aria-label="Breadcrumb">
                <Link href="/">Home</Link> › <Link href={`/airports/${airport.slug}`}>{airport.name}</Link> › {area.name}
              </nav>
              <h1>
                {area.name} to {airport.name} taxi
              </h1>
              <p className="lead">
                Fixed price from <b className="hl">{gbp(price)}</b> · around {mins} minutes · door to terminal. Serving {area.postcodes} with licensed local
                drivers, 24 hours a day.
              </p>
            </FadeUp>
            <Reveal>
              <div className="route-card">
                <div>
                  <small>Pickup</small>
                  <strong>{area.name}</strong>
                </div>
                <div className="route-line" aria-hidden>
                  <span className="route-car">🚕</span>
                </div>
                <div>
                  <small>Drop-off</small>
                  <strong>{airport.shortName} ({airport.code})</strong>
                </div>
              </div>
            </Reveal>
            <Reveal>
              <h2>Prices by vehicle</h2>
              <table className="prices compact">
                <tbody>
                  {vehicles.map((v) => (
                    <tr key={v.id}>
                      <th scope="row">
                        {v.name}
                        <small>
                          up to {v.passengers} passengers, {v.suitcases} cases
                        </small>
                      </th>
                      <td>{gbp(getQuote({ area: area.slug, airport: airport.code, vehicle: v.id })!.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="muted">One-way fixed fares. Night rate (11pm–5am) +15%. Book a return and save 5%.</p>
            </Reveal>
          </div>
          <FadeUp delay={0.15} className="hero-form">
            <h2 className="form-title">Book {area.name} → {airport.shortName}</h2>
            <BookingForm initialArea={area.slug} initialAirport={airport.code} />
          </FadeUp>
        </div>
      </section>

      <section className="section wrap narrow prose">
        <Reveal>
          <h2>
            Your {area.name} airport transfer, sorted
          </h2>
          <p>
            Whether you&apos;re catching a dawn flight or landing late at night, {site.name} gets you between {area.name} and {airport.name} without the
            stress of parking, trains or waiting for a meter taxi. {airport.blurb}
          </p>
          <p>
            Your price is fixed when you book, so roadworks and traffic never change what you pay. We text your driver&apos;s name, car and registration
            before pickup, and for arrivals we track your flight and allow 45 minutes free waiting after landing.
          </p>
        </Reveal>
        <Reveal>
          <h2>Frequently asked questions</h2>
          <div className="faq">
            {routeFaqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
        <Reveal>
          <h2>Other airports from {area.name}</h2>
          <ul className="chips">
            <li>
              <Link href={`/areas/${area.slug}`}>All {area.name} airport prices</Link>
            </li>
            {otherAirports.map((a) => (
              <li key={a.code}>
                <Link href={`/routes/${area.slug}-to-${a.slug}`}>
                  {area.name} → {a.shortName} · {gbp(area.fares[a.code])}
                </Link>
              </li>
            ))}
          </ul>
          <h2>More {airport.shortName} airport routes</h2>
          <ul className="chips">
            {nearby.map((r) => (
              <li key={r.slug}>
                <Link href={`/routes/${r.slug}`}>
                  {r.area.name} · {gbp(r.area.fares[airport.code])}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="section alt">
        <div className="wrap">
          <Features />
        </div>
      </section>
      <CtaBand title={`${area.name} to ${airport.shortName}? We've got you.`} />
    </>
  );
}
