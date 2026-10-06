import type { Metadata } from "next";
import Link from "next/link";
import { FadeUp } from "@/components/Motion";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Booking confirmed", robots: { index: false } };

export default async function Confirmed({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const { ref = "", paid } = await searchParams;
  return (
    <section className="page-hero confirmed">
      <div className="wrap narrow center">
        <div className="celebrate" aria-hidden>
          {Array.from({ length: 28 }, (_, i) => (
            <i key={i} style={{ left: `${(i * 37) % 100}%`, animationDelay: `${(i % 7) * 0.12}s`, background: ["#ffb703", "#ff7a00", "#5b8bd6", "#1f9d63", "#e85d75"][i % 5] }} />
          ))}
          <span className="celebrate-taxi">🚕💨</span>
        </div>
        <FadeUp>
          <div className="tick" aria-hidden>
            <svg viewBox="0 0 52 52">
              <circle cx="26" cy="26" r="24" />
              <path d="M14 27 l8 8 l16 -17" />
            </svg>
          </div>
          <h1>You&apos;re booked!</h1>
          <p className="lead">
            {paid ? "Payment received. " : ""}Your reference is <b>{ref.replace(/[^A-Z0-9-]/gi, "")}</b>. We&apos;ve emailed your confirmation and will text your
            driver&apos;s details before pickup.
          </p>
          <p>
            Questions? Call <a href={`tel:${site.phoneHref}`}>{site.phone}</a>.
          </p>
          <Link href="/" className="btn primary">
            Back to home
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
