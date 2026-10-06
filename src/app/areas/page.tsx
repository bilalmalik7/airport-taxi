import type { Metadata } from "next";
import AreaFinder from "@/components/AreaFinder";
import { FadeUp, Reveal } from "@/components/Motion";
import { AreaLinks, CtaBand, PriceTable } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Areas We Cover: Airport Taxis Across Greater Glasgow",
  description: "Fixed-price airport transfers from Glasgow, Paisley, East Kilbride, Hamilton, Motherwell, Cumbernauld, Kilmarnock and more to Glasgow, Prestwick and Edinburgh airports.",
  alternates: { canonical: "/areas" },
};

export default function AreasPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <FadeUp className="section-head">
            <span className="eyebrow">Areas we cover</span>
            <h1>Airport taxis across Greater Glasgow</h1>
            <p className="lead">Type your town, postcode or street to see your fares instantly.</p>
          </FadeUp>
          <FadeUp delay={0.1} className="areas-finder">
            <AreaFinder />
          </FadeUp>
          <AreaLinks />
        </div>
      </section>
      <section className="section wrap">
        <Reveal className="section-head">
          <h2>All fixed fares at a glance</h2>
        </Reveal>
        <PriceTable />
      </section>
      <CtaBand />
    </>
  );
}
