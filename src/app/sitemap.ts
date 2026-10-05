import type { MetadataRoute } from "next";

const BASE = "https://www.bniares.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/members", "/coordinators", "/visitor", "/gallery", "/contact", "/about", "/chapter-excellence"];
  return routes.map((route) => ({
    url: `${BASE}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
