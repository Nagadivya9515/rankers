import type { MetadataRoute } from "next";
import { getBatches } from "@/lib/data";

const BASE_URL = "https://rankerspro.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/faculty",
    "/achievers",
    "/batches",
    "/mentorship",
    "/resources",
    "/legal/terms",
    "/legal/privacy",
    "/legal/refund",
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));

  const batchRoutes = getBatches().map((batch) => ({
    url: `${BASE_URL}/batches/${batch.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...batchRoutes];
}
