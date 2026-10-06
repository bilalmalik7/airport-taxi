import { areaAbout } from "./content";
import { airports, areas, type Airport, type Area } from "./data";

// Approximate centre of each area, used by "use my location".
export const areaCoords: Record<string, [number, number]> = {
  "glasgow-city-centre": [55.8609, -4.2514],
  "west-end": [55.8746, -4.293],
  southside: [55.829, -4.278],
  "east-end": [55.851, -4.205],
  paisley: [55.8456, -4.4239],
  renfrew: [55.872, -4.392],
  clydebank: [55.901, -4.405],
  "bearsden-milngavie": [55.925, -4.333],
  "newton-mearns": [55.772, -4.334],
  "east-kilbride": [55.7644, -4.177],
  hamilton: [55.777, -4.039],
  motherwell: [55.789, -3.991],
  "coatbridge-airdrie": [55.862, -4.0],
  cumbernauld: [55.946, -3.99],
  dumbarton: [55.944, -4.57],
  kilmarnock: [55.611, -4.495],
};

export type AreaHit = { type: "area"; area: Area; reason?: string; score: number };
export type AirportHit = { type: "airport"; airport: Airport; score: number };
export type Hit = AreaHit | AirportHit;

const norm = (s: string) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, " ").trim();

// One typo allowed (insert, delete or swap a letter) so "pasley" still finds Paisley.
function closeEnough(a: string, b: string) {
  if (Math.abs(a.length - b.length) > 1) return false;
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return dp[a.length][b.length] <= 1;
}

function scoreText(q: string, text: string) {
  const t = norm(text);
  if (t === q) return 100;
  if (t.startsWith(q)) return 90;
  if (t.split(" ").some((w) => w.startsWith(q))) return 75;
  if (q.length >= 3 && t.includes(q)) return 60;
  if (q.length >= 5 && t.split(" ").some((w) => closeEnough(q, w.slice(0, q.length)) || closeEnough(q, w))) return 45;
  return 0;
}

export function searchPlaces(input: string): Hit[] {
  const q = norm(input);
  if (q.length < 2) return [];
  // "G12 8AA", "G128AA" and "G12" all give the outward code "g12".
  const compact = q.replace(/ /g, "");
  const first = q.includes(" ") ? q.split(" ")[0] : /^[a-z]{1,2}\d{1,2}\d[a-z]{2}$/.test(compact) ? compact.slice(0, -3) : compact;
  const outward = /^[a-z]{1,2}\d{1,2}$/.test(first) ? first : undefined;
  const hits: Hit[] = [];

  for (const area of areas) {
    let best = scoreText(q, area.name);
    let reason: string | undefined;

    const codes = area.postcodes.toLowerCase().split(/,\s*/);
    if (outward) {
      if (codes.includes(outward)) [best, reason] = [Math.max(best, 98), `Covers ${outward.toUpperCase()}`];
      else if (codes.some((c) => c.startsWith(outward)) && best < 50) [best, reason] = [50, `Postcodes ${area.postcodes}`];
    }

    for (const place of areaAbout[area.slug]?.landmarks ?? []) {
      const s = scoreText(q, place) - 5;
      if (s > best) [best, reason] = [s, `Includes ${place}`];
    }
    if (best > 0) hits.push({ type: "area", area, reason, score: best });
  }

  for (const airport of airports) {
    const s = Math.max(scoreText(q, airport.name), q === airport.code.toLowerCase() ? 99 : 0);
    if (s > 0) hits.push({ type: "airport", airport, score: s - 10 });
  }

  return hits.sort((a, b) => b.score - a.score).slice(0, 6);
}

export function nearestArea(lat: number, lng: number) {
  const rad = (d: number) => (d * Math.PI) / 180;
  const km = (a: [number, number]) => {
    const dLat = rad(a[0] - lat);
    const dLng = rad(a[1] - lng);
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(lat)) * Math.cos(rad(a[0])) * Math.sin(dLng / 2) ** 2;
    return 6371 * 2 * Math.asin(Math.sqrt(h));
  };
  const ranked = areas.map((area) => ({ area, km: km(areaCoords[area.slug]) })).sort((a, b) => a.km - b.km);
  return ranked[0];
}

export const POPULAR = ["paisley", "west-end", "east-kilbride", "glasgow-city-centre", "hamilton"];
