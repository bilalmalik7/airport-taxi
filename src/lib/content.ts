import { areas } from "./data";

// Local detail for each area page — unique copy helps each page rank for "<area> airport taxi".
export const areaAbout: Record<string, { intro: string; landmarks: string[] }> = {
  "glasgow-city-centre": {
    intro: "From Merchant City flats to hotels around George Square and Central Station, we collect from anywhere in the city centre, and our drivers know every one-way street and bus gate.",
    landmarks: ["George Square", "Merchant City", "Central Station", "Buchanan Street", "SEC & Hydro"],
  },
  "west-end": {
    intro: "Students, families and visitors in the West End use us for early flights from Byres Road, Hyndland and Partick. Glasgow Airport is only about 15 minutes away on the Clyde Tunnel and M8.",
    landmarks: ["Byres Road", "University of Glasgow", "Kelvingrove", "Hyndland", "Partick"],
  },
  southside: {
    intro: "Shawlands, Strathbungo, Battlefield and Newlands are all covered. The M77 also makes the Southside a handy starting point for Prestwick Airport.",
    landmarks: ["Shawlands", "Queen's Park", "Pollokshields", "Battlefield", "Newlands"],
  },
  "east-end": {
    intro: "From Dennistoun to Parkhead and Shettleston, we cover the whole East End. The M8 eastbound gets you to Edinburgh Airport quickly, too.",
    landmarks: ["Dennistoun", "Parkhead", "Shettleston", "Tollcross", "Bridgeton"],
  },
  paisley: {
    intro: "Paisley is right next to Glasgow Airport, so it has our lowest fares. We pick up from the town centre, Ralston, Foxbar, Glenburn and Gallowhill.",
    landmarks: ["Paisley Abbey", "Gilmour Street", "Ralston", "Foxbar", "Glenburn"],
  },
  renfrew: {
    intro: "Renfrew sits next to the airport, so you're there within minutes. Pickups cover the town, Braehead and Inchinnan.",
    landmarks: ["Braehead", "Inchinnan", "Renfrew Town Hall", "Robertson Park"],
  },
  clydebank: {
    intro: "From Clydebank and Dalmuir, the Erskine Bridge or Clyde Tunnel gets you to Glasgow Airport fast. We cover Clydebank, Dalmuir, Old Kilpatrick and Duntocher.",
    landmarks: ["Dalmuir", "Old Kilpatrick", "Duntocher", "Golden Jubilee Hospital"],
  },
  "bearsden-milngavie": {
    intro: "Bearsden and Milngavie are quiet suburbs to the north-west. Families from here book us for school-holiday flights and larger estate cars for golf bags.",
    landmarks: ["Bearsden Cross", "Milngavie town centre", "Westerton", "Mugdock"],
  },
  "newton-mearns": {
    intro: "East Renfrewshire families travel with us from Newton Mearns, Giffnock and Clarkston. The M77 makes Prestwick an easy run.",
    landmarks: ["Giffnock", "Clarkston", "Eaglesham", "Busby"],
  },
  "east-kilbride": {
    intro: "Glasgow, Prestwick and Edinburgh are all within reach of East Kilbride. We pick up across the town, from the Village to Stewartfield and St Leonards.",
    landmarks: ["The Village", "Stewartfield", "St Leonards", "Calderwood"],
  },
  hamilton: {
    intro: "Hamilton is right beside the M74, which makes Edinburgh Airport surprisingly quick. We cover Hamilton, Blantyre, Bothwell and Uddingston.",
    landmarks: ["Blantyre", "Bothwell", "Uddingston", "Chatelherault"],
  },
  motherwell: {
    intro: "Edinburgh Airport is just 40 minutes from Motherwell and Wishaw, so many customers here fly from EDI. We pick up around Strathclyde Park, Newmains and Carluke too.",
    landmarks: ["Strathclyde Park", "Wishaw", "Newmains", "Carluke"],
  },
  "coatbridge-airdrie": {
    intro: "Coatbridge and Airdrie sit between Glasgow and Edinburgh, so either airport is easy. We pick up from Chapelhall, Calderbank and Caldercruix too.",
    landmarks: ["Summerlee", "Chapelhall", "Calderbank", "Caldercruix"],
  },
  cumbernauld: {
    intro: "Cumbernauld has our quickest run to Edinburgh Airport, at around 35 minutes. We also cover Condorrat, Kilsyth and Croy.",
    landmarks: ["Condorrat", "Kilsyth", "Croy", "Abronhill"],
  },
  dumbarton: {
    intro: "From Dumbarton, Alexandria and Balloch on Loch Lomond, the Erskine Bridge means a quick, scenic trip to Glasgow Airport.",
    landmarks: ["Dumbarton Castle", "Alexandria", "Balloch", "Loch Lomond Shores"],
  },
  kilmarnock: {
    intro: "Kilmarnock is only about 20 minutes from Prestwick Airport. We cover the whole of East Ayrshire, including Kilmaurs, Crosshouse and Galston.",
    landmarks: ["Kilmaurs", "Crosshouse", "Galston", "Rugby Park"],
  },
};

export type Service = {
  slug: string;
  name: string;
  icon: string;
  short: string;
  intro: string;
  points: string[];
  scene?: "meet" | "flight";
};

export const services: Service[] = [
  {
    slug: "meet-and-greet",
    name: "Meet & Greet",
    icon: "🪧",
    short: "Your driver waits in arrivals with your name, then helps with your bags.",
    intro:
      "After a long flight, the last thing you want is to hunt for a taxi rank. With meet & greet your driver tracks your flight and waits in the arrivals hall with your name on a board. They walk you to the car and load your luggage.",
    points: ["Name board in the arrivals hall", "Live flight tracking: delays are no problem", "45 minutes free waiting after landing", "Help with luggage, prams and golf bags"],
    scene: "meet",
  },
  {
    slug: "flight-tracking",
    name: "Flight Tracking",
    icon: "🛰️",
    short: "Delayed or early? We watch your flight live and adjust automatically.",
    intro:
      "Give us your flight number and we do the rest. Your driver follows the flight in real time. If it lands early, late or diverts, your pickup moves with it, at no extra cost.",
    points: ["Real-time arrival tracking", "Pickup time adjusted automatically", "No charge for flight delays", "Text message when your driver is waiting"],
    scene: "flight",
  },
  {
    slug: "cruise-transfers",
    name: "Cruise Transfers",
    icon: "🛳️",
    short: "Glasgow and the airports to Greenock Ocean Terminal for your cruise.",
    intro:
      "Starting or ending a cruise at Greenock? We run fixed-price transfers between Greenock Ocean Terminal, Glasgow city hotels and Glasgow, Prestwick and Edinburgh airports, with plenty of room for cruise luggage.",
    points: ["Greenock Ocean Terminal pickups and drop-offs", "Estate and 8-seat vehicles for big suitcases", "Timed around embarkation and disembarkation", "Fixed price agreed in advance"],
  },
  {
    slug: "golf-transfers",
    name: "Golf Transfers",
    icon: "⛳",
    short: "Airport to course transfers with room for clubs: Ayrshire, Loch Lomond and beyond.",
    intro:
      "Scotland is the home of golf, and we get you there with your clubs. We run transfers from Glasgow, Prestwick and Edinburgh airports to Ayrshire's coastal links, Loch Lomond and courses across the central belt, in estates and minibuses with room for every bag.",
    points: ["Room for full-size golf bags", "Multi-day and multi-course itineraries", "Groups of up to 8 in one vehicle", "Fixed quotes for the whole trip"],
  },
  {
    slug: "business-travel",
    name: "Business Travel",
    icon: "💼",
    short: "Reliable airport runs and accounts for local companies.",
    intro:
      "Local firms trust us to get staff and visitors to their flights on time. You get monthly invoicing, receipts by email and drivers who know the importance of the 6am flight to London.",
    points: ["Monthly account invoicing", "Email receipts for every journey", "Priority booking for regular travellers", "Collections from offices and hotels"],
  },
];

export type Guide = {
  slug: string;
  title: string;
  description: string;
  readMins: number;
  sections: { h: string; p: string[]; list?: string[] }[];
};

const glaTimes = [...areas].sort((a, b) => a.minutes.GLA - b.minutes.GLA);

export const guides: Guide[] = [
  {
    slug: "how-early-to-leave-for-glasgow-airport",
    title: "How early should you leave for Glasgow Airport?",
    description: "Drive times to Glasgow Airport from every part of Glasgow, plus how early to arrive for short-haul and long-haul flights.",
    readMins: 4,
    sections: [
      {
        h: "The short answer",
        p: [
          "Aim to arrive at Glasgow Airport around 2 hours before a short-haul flight and 3 hours before a long-haul flight. Always check your airline's own advice, because bag-drop and check-in times vary.",
          "Then work back from your drive time and add a buffer for traffic. A few spare minutes beats a sprint to the gate.",
        ],
      },
      {
        h: "Typical drive times to Glasgow Airport",
        p: ["These are typical times in normal traffic from the areas we cover most:"],
        list: glaTimes.map((a) => `${a.name}: about ${a.minutes.GLA} minutes`),
      },
      {
        h: "Allow extra time for",
        p: ["Weekday rush hour on the M8 can add 15–30 minutes, especially around the Kingston Bridge. Also leave more time on:"],
        list: ["Friday afternoons and the start of school holidays", "Weekends with big events at the SEC, Hydro or Hampden", "Winter mornings with ice or snow", "Travelling with young children or lots of luggage"],
      },
      {
        h: "Let us do the maths",
        p: ["When you book, tell us your flight time and we'll recommend a pickup time. Early-morning flights are our speciality: we run 24/7, and your driver will be outside before you've finished your coffee."],
      },
    ],
  },
  {
    slug: "glasgow-airport-pick-up-guide",
    title: "Glasgow Airport pick-up guide: meeting your driver",
    description: "Step-by-step guide to meeting your private hire driver at Glasgow Airport, from baggage reclaim to the car.",
    readMins: 3,
    sections: [
      {
        h: "Before you land",
        p: ["Make sure we have your flight number. We track it live, so you don't need to message us if you're delayed. Your driver will already know."],
      },
      {
        h: "With meet & greet",
        p: ["Once you've collected your bags and walked through into the arrivals hall, look for your driver holding a board with your name. They'll help with your luggage and walk you to the car."],
      },
      {
        h: "Without meet & greet",
        p: ["Switch your phone on when you land. We'll text you your driver's name, car and registration, plus where to meet. Give us a quick call or WhatsApp once you have your bags and we'll guide you to the car."],
      },
      {
        h: "Top tips",
        p: [],
        list: ["Keep your phone charged and roaming switched on", "Let us know if you're stuck in passport control or baggage reclaim", "Travelling with a pram, wheelchair or extra bags? Add a note when you book", "Your first 45 minutes after landing are free"],
      },
    ],
  },
  {
    slug: "glasgow-to-edinburgh-airport-taxi",
    title: "Glasgow to Edinburgh Airport by taxi: is it worth it?",
    description: "Cost, journey time and convenience of a taxi from Glasgow to Edinburgh Airport compared with public transport.",
    readMins: 4,
    sections: [
      {
        h: "Why fly from Edinburgh?",
        p: ["Edinburgh Airport is Scotland's busiest and often has routes or fares you can't get from Glasgow. For people in Lanarkshire and North Lanarkshire it can be just as close as Glasgow Airport."],
      },
      {
        h: "Journey time",
        p: ["By road it's usually about an hour from Glasgow city centre along the M8, and less from the east side of the city:"],
        list: [...areas].sort((a, b) => a.minutes.EDI - b.minutes.EDI).slice(0, 6).map((a) => `${a.name}: about ${a.minutes.EDI} minutes`),
      },
      {
        h: "Taxi vs public transport",
        p: [
          "Public transport from Glasgow to Edinburgh Airport needs at least one change, and early-morning services are limited. With luggage, children or a 6am flight, a door-to-door taxi is far less stressful.",
          "Split between a family or group, the fixed fare often works out close to what you'd pay in train tickets.",
        ],
      },
      {
        h: "Fixed fares to Edinburgh Airport",
        p: ["Every fare is fixed when you book, with no meter and no surprises. See prices from your area on our Edinburgh Airport page."],
      },
    ],
  },
  {
    slug: "glasgow-prestwick-airport-transfer-guide",
    title: "Glasgow Prestwick Airport transfer guide",
    description: "How to get to Glasgow Prestwick Airport from Glasgow, Ayrshire and Lanarkshire, with drive times and fixed taxi fares.",
    readMins: 3,
    sections: [
      {
        h: "Where is Prestwick Airport?",
        p: ["Glasgow Prestwick Airport is on the Ayrshire coast, about 35–40 minutes south of Glasgow via the M77 and A77. It's popular for holiday flights to Spain, Portugal and the Canaries."],
      },
      {
        h: "Drive times",
        p: [],
        list: [...areas].sort((a, b) => a.minutes.PIK - b.minutes.PIK).slice(0, 6).map((a) => `${a.name}: about ${a.minutes.PIK} minutes`),
      },
      {
        h: "Why take a taxi?",
        p: ["Holiday flights often leave very early or land late at night, when trains and buses are thin on the ground. A pre-booked taxi collects you at your door at any hour and has room for the whole family's luggage."],
      },
    ],
  },
  {
    slug: "airport-taxi-vs-parking-glasgow",
    title: "Airport taxi vs airport parking: which is cheaper?",
    description: "Compare the cost and convenience of a return airport taxi with driving and parking at Glasgow Airport.",
    readMins: 3,
    sections: [
      {
        h: "The hidden costs of parking",
        p: ["Parking is more than the daily rate. Add fuel, the shuttle-bus wait from long-stay car parks, and the chance of paying drive-up prices if you don't pre-book. Your car also sits unused for the whole trip."],
      },
      {
        h: "How a return taxi compares",
        p: [
          "Book a return with us and save 5%. For a week away, a fixed-price return transfer often costs about the same as, or less than, parking. You also get dropped right at departures and collected from arrivals.",
          "Compare the airport's current parking prices for your dates with our fixed return fare. Our price never changes on the day.",
        ],
      },
      {
        h: "The stress factor",
        p: ["No circling for spaces, no shuttle buses with heavy cases and no driving home tired after a red-eye. Someone else does the driving both ways."],
      },
    ],
  },
  {
    slug: "airport-taxi-with-children",
    title: "Taking an airport taxi with children: a parent's checklist",
    description: "Child seats, luggage space and timings: how to make the airport run easy with kids from Glasgow.",
    readMins: 3,
    sections: [
      {
        h: "Child seats",
        p: ["Add child seats when you book and they'll be fitted before we arrive. Tell us your children's ages in the notes and we'll bring the right seats."],
      },
      {
        h: "Pick the right vehicle",
        p: ["A family of four with suitcases, a buggy and a car seat usually needs an estate at least. For bigger families or two families travelling together, our 6-seat people carriers and 8-seaters keep everyone together."],
      },
      {
        h: "Checklist",
        p: [],
        list: ["Snacks and a drink for the journey", "Passports in one place, ready to show", "Buggy noted in your booking", "Tablet charged for the drive back", "Return journey booked at the same time to save 5%"],
      },
    ],
  },
];

