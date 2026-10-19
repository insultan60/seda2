import type { FaqItem } from "../components/Faq";

/**
 * Copy for the neighborhood pages that share one template
 * (app/neighborhoods/[area]/page.tsx), from the October 2026 content briefs.
 * Los Feliz came first and has its own page; these three follow the same
 * shape, so they are data rather than three copies of the markup.
 *
 * What was deliberately left out of the briefs, and why:
 *
 * - Sections marked "include only if Alexandra sells here" (Moreno Highlands
 *   and Ivanhoe in Silver Lake; Laurel Canyon and the Bird Streets in the
 *   Hollywood Hills) and every "Condos" section marked "include only if
 *   Alexandra has sold condos". Add them here once that is confirmed.
 * - The market snapshot tables, which arrived as placeholders. The brief's
 *   fallback is a list of her recent sales in the area, which the page builds
 *   from her own listing records.
 * - Client stories, unless a real testimonial from that area exists in
 *   app/testimonials/data.ts. The brief is explicit: no written-by-us quotes.
 * - Links to pages that do not exist yet (a Windsor Square page) point at
 *   that area's write-up in the Neighborhoods guide instead.
 */

export type Checklist = { title: string; items: string[] };
export type Prose = { title: string; paras: string[] };
export type Nearby = { name: string; blurb: string; href: string };

export type AreaCopy = {
  /** Must match a FEATURED entry's name in ./data.ts (image, ZIPs, matching). */
  name: string;
  title: string;
  description: string;
  h1: string;
  heroLine: string;
  intro: { h2: string; paras: string[]; trust: string[] };
  listings: { lead: string; empty: string };
  architecture: { h2: string; paras: string[]; sections: Prose[] };
  buying: { h2: string; paras: string[]; checklists: Checklist[]; after: string };
  selling: { h2: string; paras: string[] };
  market: { h2: string; paras: string[] };
  living: { h2: string; paras: string[]; zip: string };
  faqTitle: string;
  faqs: FaqItem[];
  nearby: Nearby[];
  closing: { h2: string; text: string };
};

export const AREA_PAGES: Record<string, AreaCopy> = {
  "hancock-park": {
    name: "Hancock Park",
    title: "Hancock Park Real Estate Agent & Homes for Sale | Compass",
    description:
      "Alexandra Kerr is a Hancock Park real estate agent at Compass. Find historic homes for sale and get local advice on preservation rules.",
    h1: "Hancock Park Real Estate Agent",
    heroLine:
      "Period homes on wide, tree-lined streets, and the rules that protect them. Buy or sell in Hancock Park with an agent who knows both.",
    intro: {
      h2: "A Historic Neighborhood With Its Own Rules",
      paras: [
        "Hancock Park real estate is shaped by its history. G. Allan Hancock developed the neighborhood in the 1920s, and its period homes, set back on wide streets, remain largely intact. Because the area is a protected historic district, buying here means understanding the rules as well as the house.",
        "Alexandra Kerr is a Los Angeles real estate agent and Estates Director at Compass. She works with buyers and sellers in Hancock Park, with a focus on homes with history. Hancock Park luxury real estate rewards careful preparation, and she helps you prepare.",
      ],
      trust: [
        "Compass agent and Estates Director",
        "Preservation-zone rules and permit records reviewed before any offer",
        "A Hancock Park realtor who reads the rules as well as the listing",
        "One point of contact from first showing to closing",
      ],
    },
    listings: {
      lead: "These are Alexandra’s current Hancock Park listings and her recent results. Browse Hancock Park houses for sale, including historic homes for sale, from classic period estates to updated family homes.",
      empty: "No Hancock Park homes are listed right now. Sign up for alerts and you will hear first when one comes to market.",
    },
    architecture: {
      h2: "Hancock Park Architecture and Historic Homes",
      paras: [
        "Hancock Park architecture is period revival at its most consistent. The City of Los Angeles describes the historic district as 1,282 parcels, mostly single-family homes, with a period of significance running from 1922 to 1956. Homes sit well back from the street behind lawns and mature trees.",
      ],
      sections: [
        {
          title: "The styles you will see",
          paras: [
            "Hancock Park historic homes follow a handful of revival styles. Tudor homes bring steep rooflines and timber detail. Spanish Colonial and Mediterranean homes bring stucco walls and tile roofs. Monterey and Colonial Revival homes bring balconies and symmetry.",
          ],
        },
        {
          title: "What the preservation zone means for owners",
          paras: [
            "Hancock Park is a Historic Preservation Overlay Zone, known in Los Angeles as an HPOZ. In an HPOZ, most exterior changes are reviewed by the neighborhood’s HPOZ Board or City Planning staff. That can include additions, windows, fences, paint color, and changes to significant trees or landscaping.",
            "The rules protect the streetscape, and they shape what an owner can change. Requirements vary by project, so check before you plan any work.",
          ],
        },
        {
          title: "Hancock Park and Windsor Square",
          paras: [
            "Windsor Square sits to the east, and the two neighborhoods are often mentioned together. Hancock Park runs from Melrose Avenue to Wilshire Boulevard and from Highland Avenue to Rossmore Avenue, and it surrounds the Wilshire Country Club. For a closer look at its neighbor, see Windsor Square in our Los Angeles neighborhood guide.",
          ],
        },
      ],
    },
    buying: {
      h2: "Buying a Home in Hancock Park",
      paras: [
        "Houses for sale in Hancock Park raise questions that most neighborhoods do not. Whether you are browsing homes in Hancock Park or ready to buy a house in Hancock Park, start with the rules.",
      ],
      checklists: [
        {
          title: "Buying a historic home: what to ask",
          items: [
            "Whether the house is a contributing structure in the preservation zone, and what that means for changes",
            "What exterior work has been approved in the past, and whether earlier work had approval",
            "Permit history and any unpermitted additions",
            "Foundation, roof, and the age of the wiring, plumbing, and sewer lines",
            "Plans for an addition, a pool, or fencing, checked against the review rules before you make an offer",
          ],
        },
      ],
      after: "Alexandra reads the preservation records with you before an offer is written, so your plans and the rules line up.",
    },
    selling: {
      h2: "Selling Your Hancock Park Home",
      paras: [
        "If you want to sell your house in Hancock Park, preparation starts with the preservation rules. Visible exterior changes may need review, so plan any work before you list, not after.",
        "Alexandra prices against sales on similar streets, adjusted for lot, condition, and the quality of past work. Photography and marketing show the original detail and the setting that draw buyers here.",
        "Wondering what your home is worth? Start with a home valuation. Home values in Hancock Park move with condition and care as much as with size.",
      ],
    },
    market: {
      h2: "Hancock Park Real Estate Market",
      paras: [
        "The Hancock Park real estate market rewards condition and originality. Two homes of the same size can trade differently depending on the street, the lot, the state of the original detail, and what past owners changed. Hancock Park home prices make more sense street by street than as one average.",
      ],
    },
    living: {
      h2: "Living in Hancock Park",
      paras: [
        "Hancock Park sits in the Wilshire area of central Los Angeles. The Hancock Park neighborhood is quiet by city standards: streets are wide and tree-lined, homes sit back from the road, and the Wilshire Country Club fills much of its center.",
        "Larchmont Village, just to the east, has the shops, cafes, and restaurants most residents use day to day.",
      ],
      /* The brief also listed 90005, 90010 and 90036 as edge ZIPs, flagged
         "verify against USPS before launch". Until that is done the page names
         only the two the site's own Hancock Park search already uses. */
      zip: "Hancock Park addresses most often use 90004 or 90020. ZIP codes cross neighborhood lines, so check the exact address when you search.",
    },
    faqTitle: "Hancock Park Real Estate Questions",
    faqs: [
      {
        q: "Where is Hancock Park in Los Angeles?",
        a: "Hancock Park is a residential neighborhood in the Wilshire area of central Los Angeles. Its boundaries are generally Melrose Avenue to the north, Wilshire Boulevard to the south, Highland Avenue to the west, and Rossmore Avenue to the east.",
      },
      {
        q: "What is a historic preservation overlay zone, and how does it affect buying in Hancock Park?",
        a: "An HPOZ is a local historic district with extra zoning rules. In Hancock Park, most exterior changes are reviewed by the HPOZ Board or City Planning staff before work begins. Ask what has been approved on a home before you buy, and check your own plans against the rules.",
      },
      {
        q: "What ZIP codes is Hancock Park in?",
        a: "Hancock Park addresses most often use 90004 or 90020. ZIP codes cross neighborhood lines, so check the exact address when you search.",
      },
      {
        q: "Is Hancock Park a good place to live?",
        a: "It suits people who want a quiet, tree-lined setting with historic homes in the middle of the city. The trade-offs are review rules for exterior changes and the care older houses need. Walk the neighborhood and Larchmont Village to see whether the pace fits.",
      },
      {
        q: "How is Hancock Park different from Windsor Square and Larchmont?",
        a: "Windsor Square is a smaller historic neighborhood just to the east, and Larchmont is the village and shopping area nearby. Hancock Park is the larger area of period homes between Melrose and Wilshire that surrounds the Wilshire Country Club. Buyers often compare them, and our Los Angeles neighborhood guide covers Windsor Square too.",
      },
      {
        q: "How do I choose a real estate agent in Hancock Park?",
        a: "Look for experience with historic homes and preservation review, not just a Los Angeles license. Ask about recent sales on similar streets, how the agent reads permit and approval records, and who handles marketing. You can confirm any agent’s license on the California Department of Real Estate website.",
      },
    ],
    nearby: [
      {
        name: "Windsor Square",
        blurb: "A smaller historic neighborhood just east, with its own period homes and an active neighborhood association.",
        href: "/neighborhoods#windsor-square",
      },
      {
        name: "Larchmont Village",
        blurb: "The nearby village with shops, cafes, and restaurants.",
        href: "/neighborhoods",
      },
      {
        name: "Los Feliz",
        blurb: "A hillside neighborhood below Griffith Park, known for architecturally significant homes.",
        href: "/neighborhoods/los-feliz",
      },
    ],
    closing: {
      h2: "Talk to a Hancock Park Real Estate Agent",
      text: "Historic homes reward good questions asked early. Call (310) 795-1440 or send a message, and Alexandra will help you plan your next step.",
    },
  },

  "silver-lake": {
    name: "Silver Lake",
    title: "Silver Lake Real Estate Agent & Homes for Sale | Compass",
    description:
      "Alexandra Kerr is a Silver Lake real estate agent at Compass. Find homes for sale near the reservoir, sell with confidence, and get local advice.",
    h1: "Silver Lake Real Estate Agent",
    heroLine:
      "A reservoir at the center, with craftsman and mid-century homes on the hills around it. Buy or sell in Silver Lake with an agent who knows each block.",
    intro: {
      h2: "Real Estate in Silver Lake, Los Angeles",
      paras: [
        "Silver Lake real estate is a mix of flat streets near the reservoir and hillside streets above it, with homes from many decades side by side. A craftsman bungalow on one block and a glass house on the next can sit a short walk apart.",
        "Alexandra Kerr is a Los Angeles real estate agent and Estates Director at Compass. She works with buyers and sellers in Silver Lake, with a focus on character homes. Silver Lake luxury real estate rarely follows a formula. The right house depends on the street, the lot, and the work already done, and she helps you read all three.",
      ],
      trust: [
        "Compass agent and Estates Director",
        "Older-home and permit records reviewed before any offer",
        "A Silver Lake realtor who knows craftsman, mid-century, and modern homes",
        "One point of contact from first showing to closing",
      ],
    },
    listings: {
      lead: "These are Alexandra’s current Silver Lake listings and her recent results. Browse Silver Lake houses for sale, from original bungalows to updated hillside homes.",
      empty: "No Silver Lake homes are listed right now. Sign up for alerts and you will see new ones as soon as they come to market.",
    },
    architecture: {
      h2: "Silver Lake Architecture and Homes",
      paras: [
        "Silver Lake architecture shows how the neighborhood grew. The area began as a small community called Ivanhoe, and the reservoir, built in 1907, gave Silver Lake its name. Homes were added over the decades, which is why bungalows, Spanish-style houses, mid-century designs, and newer builds share the same hills.",
      ],
      sections: [
        {
          title: "Craftsman and period homes",
          paras: [
            "Silver Lake craftsman homes and other historic homes bring original detail: wood trim, built-ins, deep porches, and mature gardens. They also bring the questions every older house raises, from foundations to wiring to past additions.",
          ],
        },
        {
          title: "Mid-century and modern homes",
          paras: [
            "Mid-century and modern houses tend to sit on the hillside lots, where glass and decks open toward the view. With these homes the structure and the slope work together, so how the house meets the hill matters as much as how it looks.",
          ],
        },
      ],
    },
    buying: {
      h2: "Buying a Home in Silver Lake",
      paras: [
        "Houses for sale in Silver Lake range from original bungalows to rebuilt hillside homes. Whether you plan to buy a house in Silver Lake for its character or its views, a few careful checks keep the purchase simple.",
      ],
      checklists: [
        {
          title: "Older homes: what to review",
          items: [
            "Permit history and any work done without a permit",
            "Foundation, bolting, and signs of settling",
            "Age of the electrical, plumbing, and sewer lines",
            "Whether the property sits in a historic district, which can affect exterior changes",
          ],
        },
        {
          title: "Hillside homes",
          items: [
            "Retaining walls, drainage, and the slope itself",
            "Road width, parking, and access",
            "Whether the lot is in a mapped Hillside Area, which affects how much can be built",
          ],
        },
      ],
      after: "Alexandra pulls and reads these records alongside you, so questions come up while there is still time to negotiate.",
    },
    selling: {
      h2: "Selling Your Silver Lake Home",
      paras: [
        "If you want to sell your house in Silver Lake, the first decision is often what to restore, what to update, and what to leave alone. Original character appeals to many buyers here, and it helps most when the house is in sound shape.",
        "Alexandra prices against recent sales in the same pocket, adjusted for lot, view, condition, and the quality of past work. Staging and photography are planned to show original features and the setting.",
        "Wondering how much your home is worth? Start with a home valuation.",
      ],
    },
    market: {
      h2: "Silver Lake Real Estate Market",
      paras: [
        "The Silver Lake real estate market varies from street to street. A renovated hillside house, an original bungalow, and a condo can sit close together and trade very differently, so one average rarely fits. Silver Lake home prices follow the lot, the view, the condition, and the character of the house.",
      ],
    },
    living: {
      h2: "Living in Silver Lake",
      paras: [
        "Life in the Silver Lake neighborhood centers on the reservoir, where a path circles the water and neighbors walk, run, and meet. Cafes, shops, and restaurants line streets such as Sunset Boulevard and Silver Lake Boulevard.",
        "Walkability depends on the street. Homes on the flats are close to everything, while hillside streets mean stairs and a drive for some errands.",
      ],
      zip: "Silver Lake is mainly covered by the 90026 and 90039 ZIP codes. Some edge addresses carry 90027 or 90029, so check the exact address when you search.",
    },
    faqTitle: "Silver Lake Real Estate Questions",
    faqs: [
      {
        q: "Is Silver Lake a good place to live?",
        a: "It suits people who want a walkable, creative neighborhood with older homes and open space around the reservoir. The trade-offs are older houses that need care, parking on hillside streets, and a car for some errands. Walk the area at different times of day before you decide.",
      },
      {
        q: "What ZIP codes is Silver Lake in?",
        a: "Silver Lake is mainly covered by 90026 and 90039, and some edge addresses carry 90027 or 90029. Check the exact address when you search.",
      },
      {
        q: "What should I check before buying an older or hillside home in Silver Lake?",
        a: "Start with permit history, the foundation, and the age of the wiring and plumbing. On hillside lots, add retaining walls, drainage, and access. Ask whether the property sits in a historic district or a mapped Hillside Area. Alexandra can walk you through each of these before you make an offer.",
      },
      {
        q: "How is Silver Lake different from Echo Park and Los Feliz?",
        a: "Silver Lake is built around its reservoir, with flat and hillside streets and homes from many eras. Echo Park has its own lake, and Los Feliz sits below Griffith Park with a village of its own. Buyers often compare all three. Read more on our Los Feliz page.",
      },
      {
        q: "How do I choose a real estate agent in Silver Lake?",
        a: "Look for experience with older and hillside homes, not just a Los Angeles license. Ask about recent sales near your street, how the agent reviews permits and records, and who handles marketing. You can confirm any agent’s license on the California Department of Real Estate website.",
      },
      {
        q: "What types of homes are for sale in Silver Lake?",
        a: "You will find craftsman bungalows, Spanish-style houses, mid-century and modern homes, and newer builds. Condos are also part of the mix. Hillside homes tend to offer views, while homes on the flats sit closer to the reservoir and neighborhood streets.",
      },
    ],
    nearby: [
      {
        name: "Los Feliz",
        blurb: "Village shops below Griffith Park, with a mix of flat and hillside streets.",
        href: "/neighborhoods/los-feliz",
      },
      {
        name: "Echo Park",
        blurb: "Another neighborhood built around its own lake, with hills and older homes.",
        href: "/neighborhoods",
      },
      {
        name: "Hollywood Hills",
        blurb: "Canyon roads, privacy, and city views above Hollywood.",
        href: "/neighborhoods/hollywood-hills",
      },
    ],
    closing: {
      h2: "Talk to a Silver Lake Real Estate Agent",
      text: "Whether you are eyeing a bungalow near the reservoir or planning to sell a home you have loved for years, a short conversation is a good first step. Call (310) 795-1440 or send a message.",
    },
  },

  "hollywood-hills": {
    name: "Hollywood Hills",
    title: "Hollywood Hills Real Estate Agent & Homes for Sale | Compass",
    description:
      "Alexandra Kerr is a Hollywood Hills real estate agent at Compass. Find homes for sale, sell with confidence, and get local advice on hillside properties.",
    h1: "Hollywood Hills Real Estate Agent",
    heroLine:
      "Canyon roads, city views, and homes built for privacy. Buy or sell in the Hollywood Hills with an agent who reads the slope, the permits, and the street.",
    intro: {
      h2: "Hollywood Hills Real Estate, Street by Street",
      paras: [
        "Hollywood Hills real estate is bought and sold one road at a time. Two homes with the same view can differ in access, parking, lot shape, and what a hillside permit will allow.",
        "Alexandra Kerr is a Los Angeles real estate agent and Estates Director at Compass. She works with buyers and sellers in the hills, with a focus on character homes and hillside properties. Hollywood Hills luxury real estate rewards patient research, and she does that research with you.",
      ],
      trust: [
        "Compass agent and Estates Director",
        "Permits, slopes, and access reviewed before any offer",
        "A Hollywood Hills realtor who knows the roads, not just the listings",
        "One point of contact from first showing to closing",
      ],
    },
    listings: {
      lead: "These are Alexandra’s current Hollywood Hills listings and her recent results. Browse houses for sale in the Hollywood Hills, from canyon retreats to luxury homes with wide city views.",
      empty: "No Hollywood Hills homes are listed right now. Sign up for alerts and you will hear first when one comes to market.",
    },
    architecture: {
      h2: "Hollywood Hills Architecture and Homes",
      paras: [
        "Hollywood Hills architecture follows the land. Houses step down a slope, sit on a cut pad, or reach out over a drop on tall supports, so the structure often shows how a lot was solved. You will find mid-century glass houses, sharp contemporary builds, Spanish and Mediterranean revival homes, and older cottages, sometimes within a few blocks of each other.",
      ],
      sections: [
        {
          title: "East and West Hollywood Hills",
          paras: [
            "The hills are not one market. Hollywood Hills East sits toward Griffith Park, Lake Hollywood, and Los Feliz. Hollywood Hills West runs toward West Hollywood and Mulholland Drive. Lots, road widths, and buyer expectations shift between them, so the same budget can buy very different homes.",
          ],
        },
        {
          title: "What the land decides",
          paras: [
            "Slope, pad size, and road access shape a home’s value as much as its square footage. A flat, usable yard is rare. A view can be protected by the lot or lost to a new build next door. Narrow roads affect parking, deliveries, and construction, so each street needs its own look.",
          ],
        },
      ],
    },
    buying: {
      h2: "Buying a Home in the Hollywood Hills",
      paras: [
        "Most people who buy a house in the Hollywood Hills are paying for a view and a setting. A few careful checks protect that purchase.",
      ],
      checklists: [
        {
          title: "Hillside homes: what to review before an offer",
          items: [
            "Permit history, including any work done without a permit",
            "Retaining walls, drainage, and slope stability",
            "Whether the lot is in a mapped Hillside Area, which affects how much can be built",
            "Road width, parking, and access for deliveries and construction",
            "Fire hazard zone status and insurance availability, checked early",
          ],
        },
      ],
      after: "Alexandra reviews these records with you before an offer is written, so the hard questions come up before you commit, not after.",
    },
    selling: {
      h2: "Selling Your Hollywood Hills Home",
      paras: [
        "If you want to sell your house in the Hollywood Hills, pricing starts with the right comparables. A sale one canyon over may say very little about your street.",
        "Alexandra looks at recent sales in the same pocket, then adjusts for view, lot, access, and condition. Photography and marketing are planned to show the setting, because buyers want to see the view and the privacy before they visit.",
        "Curious what your home is worth? Start with a home valuation.",
      ],
    },
    market: {
      h2: "Hollywood Hills Real Estate Market",
      paras: [
        "The Hollywood Hills real estate market moves by pocket, not by ZIP code. View, lot, and road access explain most of the gap between one home and the next, so a single average rarely tells the whole story.",
      ],
    },
    living: {
      h2: "Living in the Hollywood Hills",
      paras: [
        "Living in the Hollywood Hills means canyon roads, trees, and a quiet that surprises people who work in the city. Downtown, the studios, and the Sunset Strip are a short drive away. Most daily errands involve a car, and many roads are narrow, steep, and shared with walkers.",
      ],
      zip: "The Hollywood Hills sit within the 90046, 90068, and 90069 ZIP codes. Hollywood Hills East falls in 90068. ZIP codes cross neighborhood lines, so check the exact address when you search.",
    },
    faqTitle: "Hollywood Hills Real Estate Questions",
    faqs: [
      {
        q: "Is the Hollywood Hills part of Los Angeles?",
        a: "Yes. The Hollywood Hills are a neighborhood of the City of Los Angeles, on the slopes of the Santa Monica Mountains above Hollywood. Parts of the hills sit next to West Hollywood, a separate city, so check the address when you search.",
      },
      {
        q: "What ZIP codes are in the Hollywood Hills?",
        a: "The hills sit within the 90046, 90068, and 90069 ZIP codes, and Hollywood Hills East is in 90068. ZIP codes cross neighborhood lines, so confirm by address.",
      },
      {
        q: "What should I check before buying a hillside home in the Hollywood Hills?",
        a: "Review the permit history, retaining walls, drainage, and slope. Check whether the lot is in a Hillside Area, since that affects how much can be built. Confirm road access and parking, and ask about insurance early. Alexandra goes through these records with buyers before an offer is written.",
      },
      {
        q: "Is the Hollywood Hills a good place to live?",
        a: "It suits people who want privacy, views, and a quiet setting close to the city. The trade-offs are narrow roads, steep driveways, and a car for most errands. Visiting at different times of day shows what daily life feels like.",
      },
      {
        q: "How do I choose a real estate agent in the Hollywood Hills?",
        a: "Look for hillside experience, not just a Los Angeles license. Ask about recent sales in the same pocket, how the agent reviews permits and access, and who handles marketing. You can confirm any agent’s license on the California Department of Real Estate website.",
      },
      {
        q: "How is the Hollywood Hills different from Los Feliz?",
        a: "The Hollywood Hills are steeper and more private, with canyon roads and homes set above the street. Los Feliz offers a walkable village and a mix of flat and hillside streets. Many buyers compare the two, and the right fit depends on how much privacy and view matter to you. Read more on our Los Feliz page.",
      },
    ],
    nearby: [
      {
        name: "Los Feliz",
        blurb: "A walkable village below Griffith Park, with flat and hillside streets.",
        href: "/neighborhoods/los-feliz",
      },
      {
        name: "Silver Lake",
        blurb: "Hillside streets and craftsman homes around the reservoir.",
        href: "/neighborhoods/silver-lake",
      },
      {
        name: "Sunset Strip",
        blurb: "City-facing homes close to the west side’s nightlife.",
        href: "/neighborhoods#sunset-strip",
      },
    ],
    closing: {
      h2: "Talk to a Hollywood Hills Real Estate Agent",
      text: "Buying a home with a view, or selling one with a story, starts with a short conversation. Call (310) 795-1440 or send a message, and Alexandra will take it from there.",
    },
  },
};

export const AREA_SLUGS = Object.keys(AREA_PAGES);
