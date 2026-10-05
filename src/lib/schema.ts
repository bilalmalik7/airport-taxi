import { areas } from "./data";
import { faqs } from "./faq";
import { site } from "./site";

export const businessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "TaxiService",
  "@id": `${site.url}/#business`,
  name: site.name,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  priceRange: "££",
  provider: {
    "@type": "LocalBusiness",
    name: site.name,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postcode,
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    openingHours: "Mo-Su 00:00-23:59",
  },
  areaServed: areas.map((a) => ({ "@type": "Place", name: `${a.name}, Scotland` })),
});

export const faqSchema = (list = faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: list.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: `${site.url}${it.path}`,
  })),
});
