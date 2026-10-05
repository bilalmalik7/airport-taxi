import type { Metadata } from "next";
import { FadeUp } from "@/components/Motion";
import { CtaBand, FlightSection, MeetGreetSection, ServiceCards } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Services: Meet & Greet, Flight Tracking, Cruise & Golf Transfers",
  description: "Airport meet & greet, live flight tracking, Greenock cruise transfers, golf transfers and business accounts from Glasgow's fixed-price airport taxi service.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <FadeUp className="section-head">
            <span className="eyebrow">Our services</span>
            <h1>Everything you need between door and departure gate</h1>
          </FadeUp>
          <ServiceCards />
        </div>
      </section>
      <section className="section wrap">
        <MeetGreetSection />
      </section>
      <section className="section dark">
        <div className="wrap">
          <FlightSection />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
