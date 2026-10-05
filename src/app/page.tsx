import BookingForm from "@/components/BookingForm";
import { JsonLd } from "@/components/Chrome";
import HeroScene from "@/components/HeroScene";
import HowItWorks from "@/components/HowItWorks";
import { FadeUp, Reveal } from "@/components/Motion";
import { AreasMarquee, CtaBand, Faq, Features, Fleet, PriceTable, Reviews, Stats } from "@/components/Sections";
import { faqSchema } from "@/lib/schema";

export default function Home() {
  return (
    <>
      <JsonLd data={faqSchema()} />
      <section className="hero">
        <div className="hero-glow" aria-hidden />
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <FadeUp>
              <span className="eyebrow">🚕 Glasgow · Prestwick · Edinburgh airports</span>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h1>
                Glasgow airport taxis, <span className="hl">fixed price</span>, door to departures.
              </h1>
            </FadeUp>
            <FadeUp delay={0.16}>
              <p className="lead">
                Enter your pickup, see your price instantly and pay securely online. Licensed local drivers, live flight tracking and 45 minutes free waiting
                on arrivals.
              </p>
            </FadeUp>
            <FadeUp delay={0.24} className="hero-art">
              <HeroScene />
            </FadeUp>
          </div>
          <FadeUp delay={0.2} className="hero-form">
            <h2 className="form-title">Book your transfer</h2>
            <BookingForm />
            <p className="trust">🔒 Secure payment by Stripe · No hidden fees</p>
          </FadeUp>
        </div>
      </section>

      <AreasMarquee />
      <Stats />

      <section id="how" className="section wrap">
        <Reveal className="section-head">
          <span className="eyebrow">How it works</span>
          <h2>From your door to the departure lounge in 4 easy steps</h2>
        </Reveal>
        <HowItWorks />
      </section>

      <section id="prices" className="section alt">
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow">Fixed fares</span>
            <h2>Airport taxi prices from across Glasgow</h2>
            <p>Saloon one-way prices for up to 3 passengers. Click any price for route details and to book.</p>
          </Reveal>
          <Reveal>
            <PriceTable />
          </Reveal>
        </div>
      </section>

      <section className="section wrap">
        <Reveal className="section-head">
          <span className="eyebrow">Why book with us</span>
          <h2>Local Glasgow drivers you can rely on at 4am</h2>
        </Reveal>
        <Features />
      </section>

      <section id="fleet" className="section alt">
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow">Our fleet</span>
            <h2>A car for every group and every suitcase</h2>
          </Reveal>
          <Fleet />
        </div>
      </section>

      <section className="section wrap">
        <Reveal className="section-head">
          <span className="eyebrow">Reviews</span>
          <h2>What our passengers say</h2>
        </Reveal>
        <Reviews />
      </section>

      <section id="faq" className="section alt">
        <div className="wrap narrow">
          <Reveal className="section-head">
            <span className="eyebrow">FAQ</span>
            <h2>Glasgow airport transfer questions</h2>
          </Reveal>
          <Faq />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
