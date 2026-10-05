import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookingForm from "@/components/BookingForm";
import { JsonLd } from "@/components/Chrome";
import { FadeUp, Reveal } from "@/components/Motion";
import { CtaBand, Faq } from "@/components/Sections";
import { airports, areas, findAirportBySlug } from "@/lib/data";
import { gbp } from "@/lib/pricing";
import { breadcrumbSchema } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => airports.map((a) => ({ slug: a.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const airport = findAirportBySlug((await params).slug);
  if (!airport) return {};
  const from = Math.min(...areas.map((a) => a.fares[airport.code]));
  return {
    title: `${airport.name} Taxi & Transfers from ${gbp(from)}`,
    description: `Fixed-price taxis to and from ${airport.name} across Glasgow and the West of Scotland, from ${gbp(from)}. Flight tracking, meet & greet, pay online.`,
    alternates: { canonical: `/airports/${airport.slug}` },
  };
}

export default async function AirportPage({ params }: Props) {
  const airport = findAirportBySlug((await params).slug);
  if (!airport) notFound();
  const sorted = [...areas].sort((a, b) => a.fares[airport.code] - b.fares[airport.code]);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: airport.name, path: `/airports/${airport.slug}` },
        ])}
      />
      <section className="page-hero">
        <div className="wrap hero-grid">
          <div>
            <FadeUp>
              <span className="eyebrow">✈️ {airport.code}</span>
              <h1>{airport.name} taxis &amp; transfers</h1>
              <p className="lead">{airport.blurb} Fixed prices from every part of Glasgow, with flight tracking and free waiting on arrivals.</p>
            </FadeUp>
            <Reveal>
              <h2>Fares to {airport.shortName}</h2>
              <ul className="area-prices">
                {sorted.map((a) => (
                  <li key={a.slug}>
                    <Link href={`/routes/${a.slug}-to-${airport.slug}`}>
                      <span>{a.name}</span>
                      <small>~{a.minutes[airport.code]} min</small>
                      <b>{gbp(a.fares[airport.code])}</b>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <FadeUp delay={0.15} className="hero-form">
            <h2 className="form-title">Book a {airport.shortName} transfer</h2>
            <BookingForm initialAirport={airport.code} />
          </FadeUp>
        </div>
      </section>
      <section className="section alt">
        <div className="wrap narrow">
          <Reveal className="section-head">
            <h2>Questions</h2>
          </Reveal>
          <Faq />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
