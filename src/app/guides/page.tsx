import type { Metadata } from "next";
import { FadeUp } from "@/components/Motion";
import { CtaBand, GuideCards } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Glasgow Airport Travel Guides & Tips",
  description: "Local drivers' advice on getting to Glasgow, Prestwick and Edinburgh airports: drive times, pick-up tips, taxis vs parking and travelling with children.",
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <FadeUp className="section-head">
            <span className="eyebrow">Travel guides</span>
            <h1>Glasgow airport guides from local drivers</h1>
            <p className="lead">Practical tips to make your next airport trip easier.</p>
          </FadeUp>
          <GuideCards />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
