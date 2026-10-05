// Business details — edit these to match the client. Everything else on the
// site (SEO tags, structured data, footer, contact buttons) reads from here.
export const site = {
  name: "Glasgow Airport Transfers",
  shortName: "GAT",
  tagline: "Fixed-price airport taxis across Glasgow & the West of Scotland",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  phone: "0141 000 0000",
  phoneHref: "+441410000000",
  whatsapp: "447000000000", // international format, no + or spaces
  email: "bookings@example.co.uk",
  address: {
    street: "Glasgow",
    locality: "Glasgow",
    region: "Scotland",
    postcode: "G1",
    country: "GB",
  },
  geo: { lat: 55.8642, lng: -4.2518 },
  licence: "Glasgow City Council Private Hire Licence No. XXXX",
  openingHours: "24/7, 365 days a year",
};

export type Site = typeof site;
