import type { Metadata } from "next";
import BookingForm from "@/components/BookingForm";
import { FadeUp } from "@/components/Motion";
import { findAirport, findArea } from "@/lib/data";

export const metadata: Metadata = {
  title: "Book an Airport Transfer Online",
  description: "Book your fixed-price Glasgow airport taxi in under a minute. Instant price, secure online payment, licensed drivers.",
  alternates: { canonical: "/book" },
};

export default async function BookPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams;
  const area = sp.area && findArea(sp.area) ? sp.area : "";
  const airport = sp.airport && findAirport(sp.airport) ? sp.airport : "GLA";
  return (
    <section className="page-hero">
      <div className="wrap narrow">
        <FadeUp>
          <h1>Book your airport transfer</h1>
          <p className="lead">Instant fixed price. Pay online or pay the driver.</p>
        </FadeUp>
        <FadeUp delay={0.1} className="hero-form">
          <BookingForm initialArea={area} initialAirport={airport} />
        </FadeUp>
      </div>
    </section>
  );
}
