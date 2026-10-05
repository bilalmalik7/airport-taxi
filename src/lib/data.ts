export type AirportCode = "GLA" | "PIK" | "EDI";

export type Airport = {
  code: AirportCode;
  slug: string;
  name: string;
  shortName: string;
  address: string;
  blurb: string;
};

export const airports: Airport[] = [
  {
    code: "GLA",
    slug: "glasgow-airport",
    name: "Glasgow Airport",
    shortName: "Glasgow",
    address: "Glasgow Airport, Paisley PA3 2SW",
    blurb:
      "Scotland's second-busiest airport, 8 miles west of the city centre beside the M8 at Junction 28.",
  },
  {
    code: "PIK",
    slug: "glasgow-prestwick-airport",
    name: "Glasgow Prestwick Airport",
    shortName: "Prestwick",
    address: "Glasgow Prestwick Airport, Prestwick KA9 2PL",
    blurb:
      "On the Ayrshire coast, about 35 minutes south of Glasgow via the M77, popular for holiday and low-cost flights.",
  },
  {
    code: "EDI",
    slug: "edinburgh-airport",
    name: "Edinburgh Airport",
    shortName: "Edinburgh",
    address: "Edinburgh Airport, Edinburgh EH12 9DN",
    blurb:
      "Scotland's busiest airport, around an hour east of Glasgow along the M8, with the widest choice of routes.",
  },
];

export type Area = {
  slug: string;
  name: string;
  postcodes: string;
  // Saloon fares (GBP) to each airport — one way.
  fares: Record<AirportCode, number>;
  // Typical drive time in minutes to each airport.
  minutes: Record<AirportCode, number>;
};

// Starting prices — the client can change any figure here.
export const areas: Area[] = [
  { slug: "glasgow-city-centre", name: "Glasgow City Centre", postcodes: "G1, G2, G3, G4", fares: { GLA: 25, PIK: 52, EDI: 78 }, minutes: { GLA: 15, PIK: 40, EDI: 60 } },
  { slug: "west-end", name: "West End", postcodes: "G11, G12, G20", fares: { GLA: 25, PIK: 55, EDI: 80 }, minutes: { GLA: 15, PIK: 45, EDI: 65 } },
  { slug: "southside", name: "Southside", postcodes: "G41, G42, G43, G44", fares: { GLA: 28, PIK: 45, EDI: 80 }, minutes: { GLA: 18, PIK: 35, EDI: 65 } },
  { slug: "east-end", name: "East End", postcodes: "G31, G32, G40", fares: { GLA: 30, PIK: 52, EDI: 72 }, minutes: { GLA: 22, PIK: 40, EDI: 55 } },
  { slug: "paisley", name: "Paisley", postcodes: "PA1, PA2, PA3", fares: { GLA: 15, PIK: 42, EDI: 85 }, minutes: { GLA: 8, PIK: 35, EDI: 65 } },
  { slug: "renfrew", name: "Renfrew", postcodes: "PA4", fares: { GLA: 15, PIK: 45, EDI: 85 }, minutes: { GLA: 8, PIK: 38, EDI: 65 } },
  { slug: "clydebank", name: "Clydebank", postcodes: "G81", fares: { GLA: 22, PIK: 55, EDI: 82 }, minutes: { GLA: 12, PIK: 45, EDI: 65 } },
  { slug: "bearsden-milngavie", name: "Bearsden & Milngavie", postcodes: "G61, G62", fares: { GLA: 30, PIK: 60, EDI: 80 }, minutes: { GLA: 20, PIK: 50, EDI: 60 } },
  { slug: "newton-mearns", name: "Newton Mearns", postcodes: "G77", fares: { GLA: 30, PIK: 38, EDI: 85 }, minutes: { GLA: 20, PIK: 30, EDI: 65 } },
  { slug: "east-kilbride", name: "East Kilbride", postcodes: "G74, G75", fares: { GLA: 35, PIK: 42, EDI: 75 }, minutes: { GLA: 25, PIK: 35, EDI: 55 } },
  { slug: "hamilton", name: "Hamilton", postcodes: "ML3", fares: { GLA: 38, PIK: 48, EDI: 65 }, minutes: { GLA: 28, PIK: 40, EDI: 45 } },
  { slug: "motherwell", name: "Motherwell & Wishaw", postcodes: "ML1, ML2", fares: { GLA: 40, PIK: 52, EDI: 60 }, minutes: { GLA: 30, PIK: 45, EDI: 40 } },
  { slug: "coatbridge-airdrie", name: "Coatbridge & Airdrie", postcodes: "ML5, ML6", fares: { GLA: 38, PIK: 58, EDI: 55 }, minutes: { GLA: 28, PIK: 48, EDI: 35 } },
  { slug: "cumbernauld", name: "Cumbernauld", postcodes: "G67, G68", fares: { GLA: 40, PIK: 65, EDI: 50 }, minutes: { GLA: 30, PIK: 55, EDI: 35 } },
  { slug: "dumbarton", name: "Dumbarton", postcodes: "G82", fares: { GLA: 28, PIK: 62, EDI: 90 }, minutes: { GLA: 15, PIK: 50, EDI: 70 } },
  { slug: "kilmarnock", name: "Kilmarnock", postcodes: "KA1, KA3", fares: { GLA: 40, PIK: 25, EDI: 95 }, minutes: { GLA: 30, PIK: 20, EDI: 75 } },
];

export type VehicleId = "saloon" | "estate" | "mpv" | "minibus";

export type Vehicle = {
  id: VehicleId;
  name: string;
  example: string;
  passengers: number;
  suitcases: number;
  multiplier: number;
};

export const vehicles: Vehicle[] = [
  { id: "saloon", name: "Saloon", example: "Toyota Prius or similar", passengers: 3, suitcases: 2, multiplier: 1 },
  { id: "estate", name: "Estate", example: "Skoda Octavia Estate or similar", passengers: 4, suitcases: 4, multiplier: 1.15 },
  { id: "mpv", name: "People Carrier", example: "Ford Galaxy or similar", passengers: 6, suitcases: 5, multiplier: 1.4 },
  { id: "minibus", name: "8-Seater", example: "Mercedes Vito or similar", passengers: 8, suitcases: 8, multiplier: 1.7 },
];

export const findArea = (slug: string) => areas.find((a) => a.slug === slug);
export const findAirport = (code: string) => airports.find((a) => a.code === code);
export const findAirportBySlug = (slug: string) => airports.find((a) => a.slug === slug);
export const findVehicle = (id: string) => vehicles.find((v) => v.id === id);

export const routeSlug = (area: Area, airport: Airport) => `${area.slug}-to-${airport.slug}`;

export const allRoutes = areas.flatMap((area) =>
  airports.map((airport) => ({ area, airport, slug: routeSlug(area, airport) })),
);

export const findRoute = (slug: string) => allRoutes.find((r) => r.slug === slug);
