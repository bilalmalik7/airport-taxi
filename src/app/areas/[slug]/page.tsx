import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookingForm from "@/components/BookingForm";
import { JsonLd } from "@/components/Chrome";
import { FadeUp, Reveal } from "@/components/Motion";
import { CtaBand, MeetGreetSection } from "@/components/Sections";
import { areaAbout } from "@/lib/content";
import { airports, areas, findArea, vehicles } from "@/lib/data";
import { gbp, getQuote } from "@/lib/pricing";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => areas.map((a) => ({ slug: a.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const area = findArea((await params).slug);
  if (!area) return {};
  const from = Math.min(...airports.map((a) => area.fares[a.code]));
  return {
    title: `${area.name} Airport Taxi & Transfers from ${gbp(from)}`,
    description: `Fixed-price airport taxis from ${area.name} (${area.postcodes}) to Glasgow, Prestwick and Edinburgh airports from ${gbp(from)}. Licensed local drivers, 24/7, pay online.`,
    alternates: { canonical: `/areas/${area.slug}` },
  };
}

export default async function AreaPage({ params }: Props) {
  const area = findArea((await params).slug);
  if (!area) notFound();
  const about = areaAbout[area.slug];
  const nearest = [...airports].sort((a, b) => area.minutes[a.code] - area.minutes[b.code])[0];

  const faq = [
    {
      q: `Which airport is closest to ${area.name}?`,
      a: `${nearest.name} is the quickest from ${area.name}, about ${area.minutes[nearest.code]} minutes by car. A fixed-price taxi costs ${gbp(area.fares[nearest.code])} in a saloon.`,
    },
    {
      q: `Do you pick up from all of ${area.name}?`,
      a: `Yes. We cover every address in ${area.name} (${area.postcodes})${about ? `, including ${about.landmarks.slice(0, 3).join(", ")}` : ""}.`,
    },
    {
      q: `Can I book an early-morning airport taxi from ${area.name}?`,
      a: "Yes, we run 24 hours a day, 365 days a year. Early-morning pickups between 11pm and 5am carry a 15% night rate, which is shown in your price before you book.",
    },
  ];

  return (
    <>
      <JsonLd data={faqSchema(faq)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Areas", path: "/areas" },
          { name: area.name, path: `/areas/${area.slug}` },
        ])}
      />
      <section className="page-hero">
        <div className="wrap hero-grid">
          <div>
            <FadeUp>
              <nav className="crumbs" aria-label="Breadcrumb">
                <Link href="/">Home</Link> › <Link href="/areas">Areas</Link> › {area.name}
              </nav>
              <h1>{area.name} airport taxis</h1>
              <p className="lead">{about?.intro}</p>
            </FadeUp>
            <Reveal>
              <div className="airport-mini">
                {airports.map((ap) => (
                  <Link key={ap.code} href={`/routes/${area.slug}-to-${ap.slug}`} className="airport-mini-card">
                    <small>{ap.code}</small>
                    <strong>{ap.shortName}</strong>
                    <span>~{area.minutes[ap.code]} min</span>
                    <b>{gbp(area.fares[ap.code])}</b>
                  </Link>
                ))}
              </div>
            </Reveal>
            {about && (
              <Reveal>
                <h2>Areas covered around {area.name}</h2>
                <ul className="chips">
                  {about.landmarks.map((l) => (
                    <li key={l}>
                      <span>📍 {l}</span>
                    </li>
                  ))}
                  <li>
                    <span>📮 {area.postcodes}</span>
                  </li>
                </ul>
              </Reveal>
            )}
          </div>
          <FadeUp delay={0.15} className="hero-form">
            <h2 className="form-title">Book from {area.name}</h2>
            <BookingForm initialArea={area.slug} initialAirport={nearest.code} />
          </FadeUp>
        </div>
      </section>

      <section className="section wrap narrow prose">
        <Reveal>
          <h2>{area.name} airport transfer prices</h2>
          <div className="table-scroll">
            <table className="prices">
              <thead>
                <tr>
                  <th scope="col">Vehicle</th>
                  {airports.map((ap) => (
                    <th scope="col" key={ap.code}>
                      {ap.shortName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {vehicles.map((v) => (
                  <tr key={v.id}>
                    <th scope="row">
                      {v.name}
                      <small>
                        {v.passengers} passengers · {v.suitcases} cases
                      </small>
                    </th>
                    {airports.map((ap) => (
                      <td key={ap.code}>
                        <Link href={`/routes/${area.slug}-to-${ap.slug}`}>{gbp(getQuote({ area: area.slug, airport: ap.code, vehicle: v.id })!.total)}</Link>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="muted">One-way fixed fares. Book a return and save 5%. Night rate (11pm–5am) +15%.</p>
        </Reveal>
        <Reveal>
          <h2>Questions from {area.name} travellers</h2>
          <div className="faq">
            {faq.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="section alt">
        <div className="wrap">
          <MeetGreetSection />
        </div>
      </section>
      <CtaBand title={`Flying from ${area.name}? Book in a minute.`} />
    </>
  );
}
