import type { MetadataRoute } from "next";

const BASE = "https://bni-ares-roster.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/members", "/coordinators", "/visitor", "/gallery", "/contact"];
  return routes.map((route) => ({
    url: `${BASE}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
