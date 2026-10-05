import type { MetadataRoute } from "next";
import { guides, services } from "@/lib/content";
import { airports, allRoutes, areas } from "@/lib/data";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({ url: `${site.url}${path}`, lastModified: now, priority });
  return [
    page("", 1),
    page("/book", 0.9),
    ...airports.map((a) => page(`/airports/${a.slug}`, 0.9)),
    page("/areas", 0.8),
    ...areas.map((a) => page(`/areas/${a.slug}`, 0.8)),
    page("/services", 0.7),
    ...services.map((s) => page(`/services/${s.slug}`, 0.7)),
    ...allRoutes.map((r) => page(`/routes/${r.slug}`, 0.7)),
    page("/guides", 0.6),
    ...guides.map((g) => page(`/guides/${g.slug}`, 0.6)),
  ];
}
