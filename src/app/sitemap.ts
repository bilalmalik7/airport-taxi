import type { MetadataRoute } from "next";
import { airports, allRoutes } from "@/lib/data";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/book`, lastModified: now, priority: 0.9 },
    ...airports.map((a) => ({ url: `${site.url}/airports/${a.slug}`, lastModified: now, priority: 0.8 })),
    ...allRoutes.map((r) => ({ url: `${site.url}/routes/${r.slug}`, lastModified: now, priority: 0.7 })),
  ];
}
