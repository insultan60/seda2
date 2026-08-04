import type { MetadataRoute } from "next";
import { SITE_URL } from "./site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Device-local saved listings — nothing here for a crawler to read, and
      // indexing it would surface an empty page under her name.
      disallow: "/my-search-portal",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
