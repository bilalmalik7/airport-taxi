# Glasgow Airport Transfers — booking website

A fast, SEO-focused airport transfer booking site for a Glasgow private hire driver.
Built with Next.js, Framer Motion and Stripe.

## What's included

- **Instant booking with a live price**: a 3-step form (journey → vehicle → pay) with an animated price counter.
- **Online payment**: Stripe Checkout (card, Apple Pay, Google Pay), or the customer can choose "pay the driver".
- **Booking emails** to the owner and the customer (via Resend). Without a key, bookings are logged to the server console.
- **Local SEO**:
  - 48 route pages, e.g. `/routes/paisley-to-glasgow-airport`
  - 3 airport pages
  - TaxiService, FAQPage and Breadcrumb structured data
  - sitemap.xml, robots.txt, canonical URLs and per-page titles and descriptions
- **Animations**: an SVG hero where a taxi drives from the pickup pin to the terminal and a plane takes off. It uses no JavaScript, so it doesn't slow the page down. There are also a scroll-linked "how it works" track, a marquee of areas, card reveals, an animated booking confirmation and a CTA plane. All animation respects `prefers-reduced-motion`.
- **Mobile**: a sticky Call / WhatsApp / Book bar.

## Edit the business details

| What | File |
|---|---|
| Name, phone, WhatsApp, email, licence number | `src/lib/site.ts` |
| Areas, prices, journey times, airports, vehicles | `src/lib/data.ts` |
| Extras (meet & greet, child seat, night rate, return discount) | `src/lib/pricing.ts` |
| FAQ | `src/lib/faq.ts` |
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
