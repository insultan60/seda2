import type { Metadata } from "next";
import HomeSearchClient from "./HomeSearchClient";
import "./home-search.css";
import "./andrew-search.css";

export const metadata: Metadata = {
  title: "Home Search — Alexandra Kerr | Search the Los Angeles MLS",
  description:
    "Search active Los Angeles listings across the Greater L.A. MLS with Alexandra Kerr — filter by neighborhood, price, beds, baths, and home type, with a live map.",
};

export default function HomeSearchPage() {
  return <HomeSearchClient />;
}
