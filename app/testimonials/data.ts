export type Testimonial = {
  /** "Seller" / "Buyer" — read off the quote itself, never assumed. */
  type: "Buyer" | "Seller";
  quote: string;
  /** Initials for the home-page carousel avatar. */
  av: string;
  cite: string;
  place: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    type: "Seller",
    quote:
      "Sixteen offers in the first week. Alexandra secured an all‑cash buyer above list and closed escrow in ten days. We still can't quite believe how effortless she made it feel.",
    av: "AB",
    cite: "Alan B. & Joan C.",
    place: "Santa Monica",
  },
  {
    type: "Seller",
    quote:
      "Professional photography — drone shots included — an all‑cash offer, and the smoothest escrow we've ever experienced. Alexandra treats your home like the cover story it is.",
    av: "CB",
    cite: "Cheryl B.",
    place: "Hollywood Hills",
  },
  {
    type: "Buyer",
    quote:
      "As first‑time buyers we were nervous — buying during COVID, no less. Alexandra found us our dream home and held our hands through every single step.",
    av: "AM",
    cite: "Amit & Mary S.",
    place: "Los Feliz",
  },
  {
    type: "Seller",
    quote:
      "In one of the most competitive markets imaginable, she priced our home perfectly and sold it above asking. Sharp, calm, and relentless in the best way.",
    av: "BC",
    cite: "Bradley & Claudia R.",
    place: "Los Feliz",
  },
  {
    type: "Seller",
    quote:
      "We were out of state the entire time. Alexandra managed the rental, then the sale — over ask, within a month. Total peace of mind from two time zones away.",
    av: "NS",
    cite: "Nancy & Stephen G.",
    place: "West Hollywood",
  },
];
