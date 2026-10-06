# Glasgow Airport Transfers — booking website

A fast, SEO-focused airport transfer booking site for a Glasgow private hire driver.
Built with Next.js, Framer Motion and Stripe.

## What's included

- **Instant booking with a live price**: a 3-step form (journey → vehicle → pay) with an animated price counter.
- **Online payment**: Stripe Checkout (card, Apple Pay, Google Pay), or the customer can choose "pay the driver".
- **Booking emails** to the owner and the customer (via Resend). Without a key, bookings are logged to the server console.
- **Local SEO** (90+ pages):
  - 48 route pages, e.g. `/routes/paisley-to-glasgow-airport`
  - 16 area pages, e.g. `/areas/east-kilbride`, each with local copy and FAQs
  - 3 airport pages, 5 service pages (meet & greet, flight tracking, cruise, golf, business)
  - 6 travel guides (Article schema), e.g. "How early should you leave for Glasgow Airport?"
  - Open Graph share image for WhatsApp and Facebook previews
  - TaxiService, FAQPage and Breadcrumb structured data
  - sitemap.xml, robots.txt, canonical URLs and per-page titles and descriptions
- **Smart area search**: as the customer types, the site shows matching areas with prices and drive times to all three airports. It accepts town names, postcodes ("G12 8AA") and streets or neighbourhoods ("Byres Road", "Shawlands"), and tolerates typos ("pasley"). "Use my location" finds the nearest area. The same search powers the area picker in the booking form.
- **Journey film**: three story scenes play in order on the homepage, with tabs. 1) Pre-dawn pickup at home: lights on, taxi arrives, bags loaded, drive off into the sunrise. 2) Drop-off at departures: bag unloaded, "Have a great trip!", plane takes off. 3) Meet & greet on the way home.
- **Story animations**: a meet & greet scene where the driver waits with a name board, waves, takes the suitcase, loads the boot and drives off, with captions that highlight in sync. There is also a flight-tracking scene: the plane flies TFS → GLA, the status flips ON TIME → DELAYED → LANDED, and the driver is notified.
- **Other animations**: an SVG hero where a taxi drives from the pickup pin to the terminal and a plane takes off. It uses no JavaScript, so it doesn't slow the page down. There are also a scroll-linked "how it works" track, a marquee of areas, card reveals, an animated booking confirmation and a CTA plane. All animation respects `prefers-reduced-motion`.
- **Mobile**: a sticky Call / WhatsApp / Book bar.

## Edit the business details

| What | File |
|---|---|
| Name, phone, WhatsApp, email, licence number | `src/lib/site.ts` |
| Areas, prices, journey times, airports, vehicles | `src/lib/data.ts` |
| Extras (meet & greet, child seat, night rate, return discount) | `src/lib/pricing.ts` |
| FAQ | `src/lib/faq.ts` |
| Area descriptions, services, travel guides | `src/lib/content.ts` |
| Reviews (**replace the examples with real Google reviews**) | `src/components/Sections.tsx` |

Adding an area to `data.ts` automatically creates its route pages, its sitemap entries and its price-table row.

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in keys
npm run dev                  # http://localhost:3000
```

## Go live (Vercel)

1. Import this repo at vercel.com/new.
2. Add these environment variables (see `.env.example`):
   - `NEXT_PUBLIC_SITE_URL`
   - `STRIPE_SECRET_KEY`
   - `RESEND_API_KEY`
   - `BOOKING_NOTIFY_EMAIL`
   - `BOOKING_FROM_EMAIL`
3. Connect the domain.

## SEO checklist after launch

- Set up a **Google Business Profile** (category: "Airport shuttle service" / "Taxi service") and link it to the site.
- Submit `https://your-domain/sitemap.xml` in Google Search Console.
- Ask every customer for a Google review.
- List the business in local directories (Yell, Thomson Local, FreeIndex) using the same name, address and phone everywhere.
