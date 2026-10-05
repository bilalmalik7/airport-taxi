import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/Chrome";
import { FadeUp, Reveal } from "@/components/Motion";
import { CtaBand, ServiceCards } from "@/components/Sections";
import FlightTrackScene from "@/components/scenes/FlightTrackScene";
import MeetGreetScene, { MeetGreetSteps } from "@/components/scenes/MeetGreetScene";
import HeroScene from "@/components/HeroScene";
import { services } from "@/lib/content";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => services.map((s) => ({ slug: s.slug }));

const find = (slug: string) => services.find((s) => s.slug === slug);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = find((await params).slug);
  if (!s) return {};
  return {
    title: `${s.name} | Glasgow Airport Transfers`,
    description: `${s.short} ${s.intro.split(". ")[0]}.`,
    alternates: { canonical: `/services/${s.slug}` },
  };
}

export default async function ServicePage({ params }: Props) {
  const s = find((await params).slug);
  if (!s) notFound();
  const quote = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Hi, I'd like a quote for ${s.name.toLowerCase()}`)}`;

  return (
    <>
      <JsonLd data={serviceSchema({ name: s.name, description: s.intro, path: `/services/${s.slug}` })} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: s.name, path: `/services/${s.slug}` },
        ])}
      />
      <section className="page-hero">
        <div className="wrap scene-split">
          <div>
            <FadeUp>
              <nav className="crumbs" aria-label="Breadcrumb">
                <Link href="/">Home</Link> › <Link href="/services">Services</Link> › {s.name}
              </nav>
              <span className="eyebrow">
                {s.icon} {s.name}
              </span>
              <h1>{s.name} in Glasgow</h1>
              <p className="lead">{s.intro}</p>
            </FadeUp>
            <FadeUp delay={0.1}>
              {s.scene === "meet" ? (
                <MeetGreetSteps />
              ) : (
                <ul className="ticks">
                  {s.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              )}
              <div className="cta-actions">
                <Link href="/book" className="btn primary">
                  Book online
                </Link>
                <a href={quote} target="_blank" rel="noopener" className="btn ghost">
                  💬 Get a quote on WhatsApp
                </a>
              </div>
            </FadeUp>
          </div>
          <FadeUp delay={0.15} className="scene-frame">
            {s.scene === "meet" ? <MeetGreetScene /> : s.scene === "flight" ? <FlightTrackScene /> : <HeroScene />}
          </FadeUp>
        </div>
      </section>
      {s.scene === "meet" && (
        <section className="section wrap narrow">
          <Reveal>
            <h2>What&apos;s included</h2>
            <ul className="ticks">
              {s.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </Reveal>
        </section>
      )}
      <section className="section alt">
        <div className="wrap">
          <Reveal className="section-head">
            <h2>Other services</h2>
          </Reveal>
          <ServiceCards />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
