import Image from "next/image";
import Link from "next/link";
import { hasSpecs, locationLabel, priceLabel, type Listing } from "../properties/data";

/* Same breakpoints as the home page's listing grids (.listings__grid and
   .sold__grid in globals.css), so the browser downloads a card-sized image. */
const CARD_SIZES = "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw";

/** A neighborhood page's listing cards: her active homes, or her sold ones. */
export default function ListingCards({ items, sold }: { items: Listing[]; sold?: boolean }) {
  return (
    <div className={sold ? "sold__grid" : "listings__grid"}>
      {items.map((l) => (
        <article className={`listing${sold ? " listing--sold" : ""}`} key={l.slug}>
          <figure className="listing__media">
            <Image src={l.img} alt={[l.addr, l.city].filter(Boolean).join(", ")} fill sizes={CARD_SIZES} />
            <span className={`badge ${l.badgeCls}`}>{l.badge}</span>
          </figure>
          <div className="listing__body">
            <p className="listing__price">{priceLabel(l)}</p>
            <h3 className="listing__addr">{l.addr}</h3>
            <p className="listing__city">
              {[locationLabel(l), hasSpecs(l) && `${l.beds} Bd · ${l.baths} Ba · ${l.sqft} Sq.Ft.`]
                .filter(Boolean)
                .join(" · ")}
            </p>
            <Link className="text-link listing__view" href={`/properties/${l.slug}`} aria-label={`View ${l.addr}`}>
              View<i className="arrow" aria-hidden="true"></i>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
