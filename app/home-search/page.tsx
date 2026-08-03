import type { Metadata } from "next";
import SearchClient from "./SearchClient";
import "./search.css";

export const metadata: Metadata = {
  title: "Home Search — Alexandra Kerr | Search the Los Angeles MLS",
  description:
    "Search Los Angeles listings with Alexandra Kerr — filter by neighborhood, price, beds, baths, and status, with a live map.",
};

/* `?q=` is read here rather than in the client component so the first render
   already carries the filter — no effect, no post-hydration flash, and the
   neighborhood tiles that deep-link in get a correct result set immediately. */
export default async function HomeSearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const { q } = await searchParams;
  const initialQuery = (Array.isArray(q) ? q[0] : q) ?? "";

  return (
    <main id="main" className="page-search">
      <SearchClient initialQuery={initialQuery} />
    </main>
  );
}
