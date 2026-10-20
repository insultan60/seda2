import type { MetadataRoute } from "next";
import { SITE_URL } from "./site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Device-local saved listings — nothing here for a crawler to read, and
      // indexing it would surface an empty page under her name. /api/ is the
      // MLS photo proxy: crawling it costs a function run and full-size
      // photos through Vercel's origin, and there is nothing to index there.
      disallow: ["/my-search-portal", "/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
