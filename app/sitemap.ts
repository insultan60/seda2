import type { MetadataRoute } from "next";
import { POSTS } from "./journal/data";
import { getListings } from "./properties/listings";
import { SITE_URL } from "./site";

/**
 * Built from the same data the pages render from, so a listing or article added
 * to those files is in the sitemap the moment it ships — nobody has to remember
 * to update this.
 *
 * /my-search-portal is deliberately absent: it renders whatever this browser has
 * starred in localStorage, so there is nothing there for a crawler to index.
 */
export const revalidate = 900;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const listings = await getListings();
  const now = new Date();

  const staticRoutes: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "", priority: 1, freq: "weekly" },
    { path: "/properties", priority: 0.9, freq: "weekly" },
    { path: "/home-search", priority: 0.8, freq: "daily" },
    { path: "/about", priority: 0.8, freq: "monthly" },
    { path: "/neighborhoods", priority: 0.8, freq: "monthly" },
    { path: "/contact", priority: 0.7, freq: "yearly" },
    { path: "/testimonials", priority: 0.7, freq: "monthly" },
    { path: "/relocation", priority: 0.7, freq: "monthly" },
    { path: "/home-valuation", priority: 0.7, freq: "monthly" },
    { path: "/compass-concierge", priority: 0.6, freq: "yearly" },
    { path: "/journal", priority: 0.6, freq: "weekly" },
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: `${SITE_URL}${r.path}`,
      lastModified: now,
      changeFrequency: r.freq,
      priority: r.priority,
    })),
    ...listings.map(({ slug }) => ({
      url: `${SITE_URL}/properties/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...POSTS.map((p) => ({
      url: `${SITE_URL}/journal/${p.slug}`,
      // The article's own publish date, not the build date — a crawler reading
      // "modified today" on a piece from July learns nothing from it.
      lastModified: new Date(p.iso),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
