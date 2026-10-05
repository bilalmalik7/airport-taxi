import Link from "next/link";
import { airports, areas } from "@/lib/data";
import { site } from "@/lib/site";

export function Header() {
  return (
    <header className="header">
      <div className="wrap header-inner">
        <Link href="/" className="logo" aria-label={`${site.name} home`}>
          <span className="logo-mark">✈</span>
          <span>
            {site.name.split(" ").slice(0, -1).join(" ")} <b>{site.name.split(" ").slice(-1)}</b>
          </span>
        </Link>
        <nav className="nav" aria-label="Main">
          <Link href="/#prices">Prices</Link>
          <Link href="/#how">How it works</Link>
          <Link href="/#fleet">Fleet</Link>
          <Link href="/#faq">FAQ</Link>
        </nav>
        <div className="header-cta">
          <a href={`tel:${site.phoneHref}`} className="phone">
            📞 <span>{site.phone}</span>
          </a>
          <Link href="/book" className="btn primary sm">
            Book now
          </Link>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <p className="logo">
            <span className="logo-mark">✈</span> {site.name}
          </p>
          <p>{site.tagline}.</p>
          <p>
            <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
            <br />
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <br />
            Open {site.openingHours}
          </p>
          <p className="muted">{site.licence}</p>
        </div>
        <div>
          <h3>Airports</h3>
          <ul>
            {airports.map((a) => (
              <li key={a.code}>
                <Link href={`/airports/${a.slug}`}>{a.name} taxis</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Popular routes</h3>
          <ul>
            {areas.slice(0, 8).map((a) => (
              <li key={a.slug}>
                <Link href={`/routes/${a.slug}-to-glasgow-airport`}>{a.name} to Glasgow Airport</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="wrap footer-base">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}

export function StickyCall() {
  return (
    <div className="sticky-call">
      <a href={`tel:${site.phoneHref}`}>📞 Call</a>
      <a href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hi, I'd like to book an airport transfer")}`} target="_blank" rel="noopener">
        💬 WhatsApp
      </a>
      <Link href="/book">🚕 Book</Link>
    </div>
  );
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
