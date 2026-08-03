import type { Metadata } from "next";
import SearchClient from "./SearchClient";
import "./search.css";

export const metadata: Metadata = {
  title: "Home Search — Alexandra Kerr | Search the Los Angeles MLS",
  description:
    "Search Los Angeles listings with Alexandra Kerr — filter by neighborhood, price, beds, baths, and status, with a live map.",
};

export default function HomeSearchPage() {
  return (
    <main id="main" className="page-search">
      <SearchClient />
    </main>
  );
}
