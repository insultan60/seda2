/**
 * One paragraph, heading, list, or pull quote of article copy. The article
 * template renders whatever it is handed, so publishing a piece is a matter of
 * pasting its body in here — no page work required.
 */
export type Block =
  | { k: "p"; t: string }
  | { k: "h2"; t: string }
  | { k: "h3"; t: string }
  | { k: "h4"; t: string }
  | { k: "table"; head: string[]; rows: string[][] }
  | { k: "ul"; items: string[] }
  | { k: "ol"; items: string[] }
  | { k: "img"; src: string; alt: string; cap?: string }
  | { k: "quote"; t: string }
  /** Where the post's `faq` renders; at the end of the body when absent. */
  | { k: "faq" };
/* Inside "p", list items and table cells, [text](/path) becomes a link and
   **text** is bold (see the article page's inline renderer). Nothing else is
   parsed. */

export type Post = {
  slug: string;
  title: string;
  /** Display date, e.g. "July 16, 2026" */
  date: string;
  /** Machine-readable date for <time dateTime> */
  iso: string;
  tag: string;
  excerpt: string;
  /** Optional — roughly a third of the feed runs with art, the rest is text-only. */
  img?: string;
  /**
   * The full article. Absent until Alexandra supplies the copy — the titles and
   * dates came off the live Compass feed, but the bodies did not, and an article
   * page is not the place to improvise them. Posts without a body render an
   * honest "being prepared" state instead of a fabricated read.
   */
  body?: Block[];
  /** Optional override; otherwise estimated from the body length. */
  read?: string;
  /** Title tag, when it should differ from the headline. */
  seoTitle?: string;
  /** Meta description, when it should differ from the excerpt. */
  description?: string;
  /** Alt text for `img`, when it is the article's own photograph. */
  imgAlt?: string;
  /** Questions shown after the body, with FAQPage structured data. */
  faq?: { q: string; a: string }[];
};

// Newest first. `img` values are stock placeholders pending the real article art.
export const POSTS: Post[] = [
  {
    slug: "moving-from-los-angeles-to-austin",
    title: "Moving From Los Angeles to Austin: Costs, Taxes, Homes",
    seoTitle: "Moving From Los Angeles to Austin: Costs, Taxes, Homes",
    description:
      "Moving from Los Angeles to Austin? Compare home prices, taxes, and moving costs, plus how to sell your LA home first. A guide from Alexandra Kerr.",
    date: "October 30, 2026",
    iso: "2026-10-30",
    tag: "Relocation",
    excerpt:
      "The median home in the Los Angeles metro area sold for about $860,000 in April 2026. In Austin, the metro median that month was about $435,000. That gap is why so many owners are moving from Los Angeles to Austin, and it is why the sale of your LA home matters more than the move itself.",
    img: "/properties/1747-hollyvista/01-front.jpg",
    imgAlt: "Front walk of a Los Angeles home Alexandra Kerr sold on Hollyvista",
    body: [
      { k: "p", t: "This guide covers costs, taxes, neighborhoods, and the steps to sell your Los Angeles home before you leave." },

      { k: "h2", t: "Is Moving From Los Angeles to Austin Worth It?" },
      { k: "p", t: "For many owners, yes. The savings are real, but they are less simple than most headlines suggest." },
      {
        k: "table",
        head: ["", "Los Angeles", "Austin"],
        rows: [
          ["Median home price", "About $860,000 (metro, April 2026)", "About $435,000 (metro, April 2026)"],
          ["State income tax", "Up to 13.3%", "None"],
          ["Property tax", "About 1.2% to 1.25% for new buyers in the city", "1.30% median effective rate in Travis County"],
          ["Summers", "Dry", "Hot and humid"],
          ["Distance", "About 1,376 miles to Austin by road", "About 1,376 miles to Los Angeles by road"],
        ],
      },
      { k: "p", t: "The Austin figure is a metro median. The city of Austin itself costs more, and published medians range from roughly $520,000 to $595,000 depending on the source." },

      { k: "h2", t: "Cost of Living in Los Angeles vs Austin" },
      { k: "h3", t: "Housing and Rent" },
      { k: "p", t: "Austin prices have cooled. The metro median in April 2026 sat well below the April 2022 peak of about $551,000, and homes averaged 72 days on the market." },
      { k: "p", t: "That gives buyers room to negotiate, which was rare in 2021. If you are unsure of your neighborhood, renting for the first few months is a low-risk way to learn the city." },
      { k: "h3", t: "Income Tax and Property Tax" },
      { k: "p", t: "Texas does not collect a state income tax. That alone can raise take-home pay for working households." },
      { k: "p", t: "Property tax works differently. California’s Proposition 13 limits how fast your assessed value can rise, while Texas appraises homes every year. Travis County’s median effective rate is 1.30%, and the median annual bill is about $7,110. Some local brokerages quote combined rates of 1.8% to 2.3% before exemptions, so the number depends on your school district and any special tax districts." },
      { k: "p", t: "Texas offers two protections for homeowners. The school district homestead exemption is $140,000, and homesteaded properties also get a 10% annual cap on appraised value increases. You must apply with the county appraisal district, and the deadline is April 30." },
      { k: "h3", t: "Insurance and Utilities" },
      { k: "p", t: "One Austin brokerage reports that insurance costs in Travis County have risen about 20% since 2024. Get quotes before you make an offer, just as you would on an LA hillside." },
      { k: "p", t: "Utilities are closer than most people expect. A moving-industry price comparison put basic utilities at about $193 a month in Los Angeles and $181 in Austin. Summer air conditioning will push your Austin bill up." },

      { k: "h2", t: "What Your Los Angeles Home Equity Buys in Austin" },
      { k: "p", t: "Say you sell a home for $3 million. Before the mortgage payoff, taxes, and selling costs, that is enough to buy a median Tarrytown home and still have more than $1 million left over. Redfin put Tarrytown’s median sale price at about $1.55 million in January 2026, and Zillow put West Lake Hills near $1.96 million." },
      { k: "p", t: "The gap shrinks fast at the top of the market. Luxury buyers get more land, newer construction, and lake or Hill Country views, but not the same architecture or history. That is worth knowing before you set a budget." },

      { k: "h2", t: "Austin Neighborhoods for Los Angeles Buyers" },
      { k: "p", t: "No Austin neighborhood matches an LA one exactly. These pairings are based on feel, so treat them as a starting point." },
      {
        k: "ul",
        items: [
          "**Silver Lake and Echo Park to East Austin.** Creative energy, restaurants, and a mix of old bungalows and new builds. The median was about $645,000 in early 2026.",
          "**Los Feliz to Travis Heights and Zilker.** Character homes near big parks and trails. Travis Heights had a median near $956,000, and Zilker was closer to $1.4 million.",
          "**Hancock Park and Windsor Square to Tarrytown and Pemberton Heights.** Mature trees and established streets close to downtown.",
          "**Hollywood Hills and the Sunset Strip to West Lake Hills and Barton Creek.** Hill Country views, privacy, and Eanes ISD schools.",
        ],
      },
      { k: "p", t: "Families often add Lake Travis ISD, which serves Bee Cave and Lakeway. Austin has no match for the Pacific coast, so beach lovers should plan for Lake Travis and Barton Springs instead." },
      { k: "p", t: "Alexandra’s LA neighborhood guides can help you describe what you like about your current area: [Los Feliz](/neighborhoods/los-feliz), [Silver Lake](/neighborhoods/silver-lake), [Hancock Park](/neighborhoods/hancock-park), and [Hollywood Hills](/neighborhoods/hollywood-hills). That makes it easier for an Austin agent to find your match." },

      { k: "h2", t: "How to Sell Your Los Angeles Home Before You Move" },
      { k: "h3", t: "Sell First or Buy First" },
      { k: "p", t: "Selling first gives you a firm budget and no double mortgage. The cost is that you may need a rental in Austin while you search." },
      { k: "p", t: "Buying first lets you secure the Austin home you want, but you carry two homes until the LA sale closes. Some owners use a bridge loan or a home equity line for that gap, which adds cost and risk. Compare the numbers with your lender before you choose." },
      { k: "p", t: "Alexandra offers a departing-seller service: your LA home is prepared, marketed, and sold while you settle elsewhere. Staging, photography, and escrow run without a return trip. [Compass Concierge](/compass-concierge) can also front prep costs, such as repairs or staging, and collect them at closing." },
      { k: "h3", t: "Capital Gains and Measure ULA" },
      { k: "p", t: "Federal tax is where many sellers save the most. You may exclude up to $250,000 of gain from the sale of your main home, or $500,000 if you file jointly. The two years of ownership and use do not have to be consecutive or right before the sale. That means you can often move to Texas first and still qualify." },
      { k: "p", t: "California is stricter. The state taxes capital gains like ordinary income, at rates up to 13.3%. Buyers must also withhold 3 1/3% of the gross sale price on California real estate sales. A seller who qualifies for an exemption must submit Form 593 before closing to avoid that withholding, so raise it with your escrow officer early." },
      { k: "p", t: "If your home is in the City of Los Angeles and sells for more than $5.4 million, Measure ULA applies. For closings after June 30, 2026, the rate is 4% between $5.4 million and $10.9 million and 5.5% above that, charged on the whole price, not just the excess. The tax remains in effect after a statewide measure to limit it was withdrawn in June 2026. The seller typically pays it, so it shapes pricing and negotiation." },
      { k: "p", t: "This is general information, not tax or legal advice. Talk to a CPA before you list." },
      { k: "h3", t: "Selling From Out of State" },
      { k: "p", t: "You do not need to be in Los Angeles to close. Alexandra runs video walkthroughs and digital signing, and her vetted vendors handle photography, staging, and repairs. Start with a [home valuation](/home-valuation) so you know your number before you commit to a timeline." },

      { k: "h2", t: "What Changes: Heat, Humidity, Driving, and Daily Life" },
      { k: "p", t: "The climate is the first thing you will notice. Los Angeles typically ranges from 48 to 85 degrees, while Austin usually runs from 43 to 97, with much more humidity in summer. Plan for higher cooling costs from June through September." },
      { k: "p", t: "Austin has traffic too, mostly on I-35 and MoPac, and you will still want a car. Public transit exists but covers far less ground than most LA residents hope. Spring storms and flash flooding also happen in Central Texas, so check the flood map for any property you consider." },
      { k: "p", t: "The upside is lifestyle. Austin has more than 250 live music venues, plus Lady Bird Lake, Barton Springs, and the Hill Country within a short drive." },

      { k: "h2", t: "Moving Costs and Logistics for a 1,376-Mile Move" },
      { k: "p", t: "Full-service movers charge about $3,100 to $7,300 for a two or three-bedroom home on this route, based on March 2026 data. Your price depends on volume, timing, and how much packing you do yourself." },
      { k: "p", t: "Containers and rental trucks usually cost less but need more work from you. With U-Pack, for example, you pack, load, and unload while the company handles the driving." },
      { k: "p", t: "One Austin brokerage notes that moves between October and February tend to cost less. Get at least three written quotes, and confirm whether insurance, stairs, and long carries are included." },

      { k: "h2", t: "Moving Timeline, Step by Step" },
      {
        k: "ol",
        items: [
          "**6 to 8 months out:** Meet with an LA agent about pricing and timing, and with a CPA about gains and residency.",
          "**4 to 6 months out:** Shortlist Austin neighborhoods and get introduced to an Austin agent.",
          "**3 months out:** Repair, declutter, and book photography for your LA home.",
          "**2 months out:** List the house and collect mover quotes.",
          "**1 month out:** Complete escrow paperwork, including Form 593, and schedule movers.",
          "**After you arrive:** File your homestead exemption with the Travis Central Appraisal District, and mark April 30 on your calendar.",
        ],
      },

      { k: "faq" },

      { k: "h2", t: "Your Next Step in Moving From Los Angeles to Austin" },
      { k: "p", t: "Moving from Los Angeles to Austin works best when you plan the sale first. Your LA home’s value, taxes, and timeline set what you can buy in Texas." },
      { k: "p", t: "Alexandra has guided relocations in both directions for over a decade. [Plan your relocation](/relocation), [schedule a consultation](/contact), or call [310.795.1440](tel:+13107951440)." },
    ],
    faq: [
      {
        q: "How long do I have to get a Texas driver license and register my car?",
        a: "You have 30 days to register your vehicle and 90 days to get a Texas driver license from the Department of Public Safety. Bring proof of insurance and your title.",
      },
      {
        q: "Can I keep my LA home as a rental after I move?",
        a: "Yes, but it has tax consequences. Years as a rental can reduce your home sale exclusion, and California still taxes income from California property. Los Angeles also has tenant rules, so plan for a local property manager.",
      },
      {
        q: "Will California still tax me after I move?",
        a: "California taxes residents on all income and nonresidents on California-source income. The state looks at where your home, family, license, and voter registration are. Keep records of your move date and speak with a CPA.",
      },
      {
        q: "How do I choose an Austin agent from out of state?",
        a: "Ask for sales in your price range and neighborhoods, and check the license on the Texas Real Estate Commission website. Alexandra connects clients with vetted agents through her nationwide network.",
      },
      {
        q: "Should I buy in Austin before I visit in person?",
        a: "Use video tours to shortlist, then fly in for three or four days. Visit each area at rush hour and on a weekend, because commute and noise vary a lot by street.",
      },
    ],
  },
  {
    slug: "luxury-real-estate-for-sale-sunset-strip",
    title: "Luxury Real Estate for Sale on the Sunset Strip",
    seoTitle: "Luxury Real Estate for Sale on the Sunset Strip",
    description:
      "Browse luxury real estate for sale on the Sunset Strip. See prices, neighborhoods, and what to check before you buy, from LA agent Alexandra Kerr.",
    date: "October 29, 2026",
    iso: "2026-10-29",
    tag: "Buying",
    excerpt:
      "Luxury real estate for sale on the Sunset Strip starts near $3 million for a condo and climbs past $20 million for a hillside estate. The price depends less on square footage than on the street, the view, and the city the address sits in. This guide shows what each price level buys and what to check before you make an offer.",
    img: "/assets/listings/representative-sunset-strip.jpg",
    imgAlt: "Modern luxury home with palm trees in the hills above the Sunset Strip",
    body: [
      { k: "h2", t: "What Luxury Real Estate for Sale on the Sunset Strip Costs" },
      { k: "p", t: "The Sunset Strip is the stretch of Sunset Boulevard that runs about a mile and a half through West Hollywood. Most luxury buyers are really shopping the hills above it. Those hills hold very different kinds of homes, so a single “average price” does not help much." },
      { k: "p", t: "Public listing sites show the gap. Redfin’s luxury filter for the area reports a median list price near $1.14 million, but that number includes condos and smaller units. The Sunset Strip luxury homes most buyers picture sell in a different market." },
      { k: "p", t: "Here is a rough guide to asking prices on public listing sites at the time of writing." },
      {
        k: "table",
        head: ["Property type", "Typical asking range", "What drives the price"],
        rows: [
          ["Condos on Sunset Boulevard and Doheny Road", "About $3M to $5M, with penthouses above $10M", "Building, floor, views, and amenities"],
          ["Hillside homes on the lower streets", "About $3.9M to $5.1M", "Lot, view, and condition"],
          ["Homes on Sunset Plaza Drive", "About $7.5M to $10M", "View, privacy, and design"],
          ["Bird Streets and Doheny Estates", "About $11M to $20M and up", "Views, new construction, and the lot"],
        ],
      },
      { k: "p", t: "Source: asking prices on Redfin, Forbes Global Properties, and Nest Seekers. Prices change often, so ask for sold data on the street you like." },
      { k: "p", t: "Two homes of the same size can sit millions apart. A wide view and a flat building area can outweigh extra bedrooms. That is why Alexandra compares sales on the same street, not the same ZIP code." },

      { k: "h2", t: "Sunset Strip Luxury Neighborhoods, Street by Street" },
      { k: "p", t: "Each pocket above the Strip has its own price level and feel. Here is how the main ones differ." },
      { k: "h3", t: "Sunset Plaza" },
      { k: "p", t: "Sunset Plaza sits just above the Strip’s shops and restaurants. It borders the Bird Streets and Doheny Estates to the west and Laurel Canyon to the north and east." },
      { k: "p", t: "Buyers searching for Sunset Plaza homes for sale get city views and a short drive to dinner. Homes on Sunset Plaza Drive itself often list between about $7.5 million and $10 million." },
      { k: "h3", t: "The Bird Streets" },
      { k: "p", t: "The Bird Streets are a small group of winding roads between Beverly Hills and Sunset Plaza Drive. Many carry bird names, such as Blue Jay Way, Oriole Way, and Nightingale Drive. Their jetliner views can stretch from downtown Los Angeles to the Pacific Ocean and Catalina Island." },
      { k: "p", t: "Supply is tight, and new architect-designed homes often set the top prices. Bird Streets homes for sale come up rarely, so listing alerts matter." },
      { k: "h3", t: "Doheny Estates" },
      { k: "p", t: "Doheny Estates is a section of the Bird Streets area, but the two names are not the same. It has only five streets: North Doheny Drive above Kinglet Drive, Robin Drive, Nightingale Drive, Swallow Drive, and Marcheeta Place." },
      { k: "p", t: "According to Ruby Home, it sits in ZIP code 90069 and borders Trousdale Estates and La Collina Estates in Beverly Hills. Agents often use the two names as if they mean the same thing, so ask which street a listing is on." },
      { k: "h3", t: "Condo Buildings on Sunset Boulevard and Doheny Road" },
      { k: "p", t: "Not every buyer wants a hillside lot. Luxury condos on the Sunset Strip, including buildings at 9040 W Sunset Boulevard and 9255 Doheny Road, offer lock-and-leave living, and many include doorman service and shared amenities." },
      { k: "p", t: "Penthouses at 9040 W Sunset Boulevard have listed above $10 million. Before you offer, ask for the HOA budget and the reserve study." },

      { k: "h2", t: "West Hollywood or City of Los Angeles? Why the Address Matters" },
      { k: "p", t: "Two homes on the same hillside can fall under different city governments. Some addresses near the Strip and in ZIP code 90069 sit in the City of West Hollywood, while many hillside homes sit in the City of Los Angeles. Listing sites often label the same area either way." },
      { k: "p", t: "The city decides which planning and building office reviews your permits. It also changes which local taxes apply. For example, the Measure ULA transfer tax applies to high-value sales above a set threshold inside the City of Los Angeles, which was about $5.4 million at the time of writing." },
      { k: "p", t: "The seller usually pays that tax, but it can still shape pricing and negotiation. Confirm the current rates with your escrow officer." },
      { k: "p", t: "Look up the address on [ZIMAS](https://zimas.lacity.org/), the City of Los Angeles zoning map, and ask your title company to confirm the city before you tour." },

      { k: "h2", t: "What You Pay For: View, Lot, and Access" },
      { k: "p", t: "Luxury buyers on the Strip pay most for four things." },
      {
        k: "ul",
        items: [
          "**View.** A wide view of the city, the ocean, or both carries much of the premium. A view is rarely protected, so ask your agent to check the title report and see what the neighbors could build.",
          "**Lot and pad.** A larger, flat building area leaves room for a pool, parking, and future changes. A tight pad limits all three.",
          "**Access and privacy.** Gated or drive-on entry, a wider road, and screening from the street all add value.",
          "**Condition and design.** New homes by known architects sell at a premium. Older homes may be priced close to the value of the land.",
        ],
      },
      { k: "p", t: "In practice, a buyer who compares only bedrooms and square feet will miss most of what sets the price. The best comparison is a recent sale with a similar view, pad, and road." },

      { k: "h2", t: "Costs Beyond the Purchase Price" },
      { k: "p", t: "The list price is only the start. Plan for these costs before you shop." },
      {
        k: "ul",
        items: [
          "**Property tax.** New buyers in the City of Los Angeles pay about 1.2% to 1.25% of the purchase price each year. On a $10 million home, that is roughly $120,000 to $125,000.",
          "**Financing.** Most purchases at this level need a jumbo loan, which is a loan above the standard limit. Lenders ask for more paperwork and may order a longer appraisal. Test your budget with the [mortgage calculator](https://seda2.idxbroker.com/idx/mortgage).",
          "**HOA dues.** Condo owners pay monthly dues, and some buildings add special assessments for big repairs.",
          "**Insurance.** Coverage can be hard to find in high fire zones. Get written quotes before you remove contingencies.",
        ],
      },
      { k: "p", t: "This article gives general numbers, not tax or financial advice. Your lender and tax advisor can run the figures for your own purchase." },

      { k: "h2", t: "Checks Specific to the Sunset Strip" },
      { k: "p", t: "Our guides on [buying a hillside home](/journal/buying-a-hillside-home-in-the-hollywood-hills) and [what to know before buying in the Hollywood Hills](/journal/5-things-to-know-before-buying-a-hollywood-hills-home) cover slope, soil, fire zones, and insurance in detail. These are the extra checks that matter most near the Strip itself." },
      {
        k: "ul",
        items: [
          "**Neighbor plans.** Look for nearby construction that could block a view or add noise for a year or more.",
          "**Noise and traffic.** Homes close to Sunset Boulevard can hear nightlife and traffic, while the upper streets are much quieter. Visit at night and on a weekend before you decide.",
          "**Builder and history.** For a new or recently rebuilt home, ask who built it, when, and what warranty comes with it. Also ask for the sale history.",
          "**Condo documents.** Read the board minutes, the reserve fund, and any pending lawsuits before you offer.",
        ],
      },

      { k: "h2", t: "Private Exclusives and Off-Market Homes" },
      { k: "p", t: "Some luxury homes on the Sunset Strip sell quietly before they reach a public listing site. Owners who value privacy often test the market with a small group of agents first." },
      { k: "p", t: "Alexandra shows private exclusives and off-market homes through Compass, often before they reach the MLS. To compete, keep proof of funds or a lender letter ready, since sellers often ask for it before a showing. You can also set up [new listing alerts](https://seda2.idxbroker.com/idx/usersignup) to see fresh MLS listings as they appear." },

      { k: "h2", t: "How to Buy a Luxury Home on the Sunset Strip, Step by Step" },
      {
        k: "ol",
        items: [
          "**Set your budget and property type.** Decide between a condo, a hillside house, or a Bird Streets estate.",
          "**Get a lender letter or proof of funds.** Sellers at this level expect it.",
          "**Pick two or three streets.** Use the neighborhood sections above to narrow your search.",
          "**Tour in person, in daylight and at night.** Out-of-state buyers can start with video tours.",
          "**Compare recent sales on the same street.** Adjust for view, pad, and condition.",
          "**Write the offer with enough time for reports.** Set contingency periods so specialist findings arrive before you remove them.",
          "**Finish inspections, review documents, and close.** Many financed purchases close in about 30 days.",
        ],
      },

      { k: "h2", t: "Why Buy With Alexandra Kerr" },
      { k: "p", t: "Alexandra Kerr is a REALTOR, Estates Director, and Senior Real Estate Specialist at Compass. She has 13 years in Los Angeles real estate, 179 homes sold, and $184 million in total sales. Her work has been recognized by RealTrends and Los Angeles Magazine." },
      { k: "p", t: "Her focus is homes with history, character, and distinctive architecture. For Sunset Strip buyers, that means four things:" },
      {
        k: "ul",
        items: [
          "She reads permit and property records with you before an offer is written.",
          "She pulls recent sales on the same street, so your offer fits the block.",
          "She shows private exclusives and off-market homes through Compass.",
          "She runs video tours and digital signing for buyers who live out of state.",
        ],
      },
      { k: "p", t: "[Learn more about Alexandra](/about) or [see her portfolio](/properties)." },

      { k: "faq" },

      { k: "h2", t: "Your Next Step in Sunset Strip Luxury Real Estate" },
      { k: "p", t: "Luxury real estate for sale on the Sunset Strip favors buyers who study the street before the house. The right address, city, and lot matter as much as the finishes. Start by setting up listing alerts, then pick two streets and book a private tour." },
      { k: "p", t: "Ready to talk through a home? Browse the [home search](/home-search), read the [Sunset Strip neighborhood guide](/neighborhoods/sunset-strip), [schedule a consultation](/contact), or call Alexandra at [310.795.1440](tel:+13107951440)." },
    ],
    faq: [
      {
        q: "Can international buyers purchase luxury real estate on the Sunset Strip?",
        a: "Yes. California does not require buyers to be U.S. citizens. International buyers should expect to show proof of funds and should ask a tax advisor about U.S. tax and estate rules before they buy.",
      },
      {
        q: "Can I rent out a luxury home on the Sunset Strip?",
        a: "Long-term leasing is common. Public listing sites show asking rents from about $30,000 to more than $100,000 a month for larger homes. Short-term rentals face tighter rules, and those rules differ between the City of Los Angeles and West Hollywood, so check them before you count on rental income.",
      },
      {
        q: "Are luxury homes on the Sunset Strip a good investment?",
        a: "Limited supply supports demand, but no one can promise future prices. Carrying costs are high, and values can move with interest rates and the wider market. Ask for sold data on your exact street and speak with a financial advisor.",
      },
      {
        q: "How long does it take to close on a luxury home here?",
        a: "A cash purchase can close in as little as two to three weeks if the seller agrees. A financed purchase usually takes about 30 days or longer. Confirm the timeline with your lender before you offer.",
      },
      {
        q: "Should I hold title in a trust or an LLC?",
        a: "Many luxury buyers do, mainly for privacy. It can affect financing, property tax reassessment, and transfer tax, so the right choice depends on your situation. Ask a real estate attorney and a CPA before you sign.",
      },
    ],
  },
  {
    slug: "5-things-to-know-before-buying-a-hollywood-hills-home",
    title: "5 Things to Know Before Buying a Hollywood Hills Home",
    seoTitle: "5 Things to Know Before Buying a Hollywood Hills Home",
    description:
      "Buying in the Hollywood Hills? Learn the 5 things to check first: slope, fire access, insurance, true costs, and permits.",
    date: "October 26, 2026",
    iso: "2026-10-26",
    tag: "Buying",
    excerpt:
      "Check the slope, soil, and walls; confirm the fire zone and fire truck access; get an insurance quote before you offer; budget for the full cost, which is about $2.9 million at the median list price plus roughly $35,000 a year in property tax; and check permits and zoning before you plan any changes.",
    img: "/journal/hollywood-hills-hillside-home.jpg",
    imgAlt: "Modern hillside home with a pool above the canyon in the Hollywood Hills",
    body: [
      { k: "p", t: "Each one can change your price, your loan, or your insurance. Here is how to check them, in order." },

      { k: "h2", t: "Things to Know Before Buying a Hollywood Hills Home" },

      { k: "h3", t: "The Ground Moves: Check the Slope, Soil, and Walls" },
      { k: "p", t: "Water and weak soil can move a hill, so inspect the slope, walls, and drains before you offer." },
      { k: "h4", t: "Why the slope matters" },
      {
        k: "ul",
        items: [
          "Los Angeles has special hillside rules called the [Baseline Hillside Ordinance](https://planning.lacity.org/plans-policies/initiatives-policies/baseline-hillside-ordinance). They cover grading, drainage, parking, and street width.",
          "Many hillside projects need a soils or geology report before the city gives a permit.",
          "In March 2024, a landslide in the Hollywood Hills area led to four homes being red-tagged. A red tag means a home is unsafe to live in.",
        ],
      },
      { k: "h4", t: "Retaining walls" },
      { k: "p", t: "Most walls that hold a slope need a permit, an engineer's plan, and a city inspection." },
      { k: "p", t: "**Red flags at a showing:**" },
      {
        k: "ul",
        items: [
          "Walls that lean, bulge, or show stair-step cracks",
          "No drain holes at the base of a wall",
          "Fresh cut or filled slopes with no permit papers",
          "Downspouts that send water toward the slope",
        ],
      },
      { k: "p", t: "**Questions for the seller:**" },
      {
        k: "ul",
        items: [
          "Can you share permits and final inspections for walls, decks, driveways, and additions?",
          "Has this lot or a nearby lot had a slide or soil movement?",
        ],
      },
      { k: "h4", t: "Earthquake and landslide zones" },
      { k: "p", t: "California sellers give buyers a Natural Hazard Disclosure. It shows if the home sits in a fire zone, an earthquake fault zone, or a landslide or liquefaction zone." },
      { k: "p", t: "The Hollywood Fault runs roughly nine miles along the southern edge of the hills, according to the Southern California Earthquake Center. A zone label does not mean a home will fail. It means an expert should look closer." },
      { k: "h4", t: "Experts to call" },
      {
        k: "ul",
        items: [
          "A home inspector for the whole house",
          "A structural engineer for foundation or wall problems",
          "A geotechnical engineer (a soils expert) for steep lots",
          "A sewer camera inspector, since the sewer line to the street is usually the owner's job",
        ],
      },

      { k: "h3", t: "Can a Fire Truck Reach the Door? Fire Zones and Street Access" },
      { k: "p", t: "Much of the Hollywood Hills sits in a Very High Fire Hazard Severity Zone, so check the zone, the brush rules, and the road." },
      { k: "h4", t: "Fire zone and brush rules" },
      {
        k: "ul",
        items: [
          "Look up the address on the [CAL FIRE hazard map](https://egis.fire.ca.gov/FHSZ/).",
          "The Los Angeles Fire Department (LAFD) requires year-round brush clearing in these zones. Many owners must clear up to 200 feet around buildings.",
          "Ask the seller for brush clearance records.",
          "Ask about fire-hardening, such as ember-resistant vents, a Class A roof, and sprinklers.",
        ],
      },
      { k: "h4", t: "Street width and driveways" },
      {
        k: "ul",
        items: [
          "The city calls a street “substandard hillside limited” when it is under 36 feet wide or paved under 28 feet. That can limit parking, additions, and fire rules.",
          "Check the driveway slope, the turns, and any gate. A gate that looks fine to you may not meet fire rules.",
          "Ask how many permitted garage spaces the home has.",
        ],
      },

      { k: "h3", t: "Insurance Can Make or Break the Deal" },
      { k: "p", t: "Get an insurance quote before you offer, because in high-fire areas standard insurers may say no and the state's FAIR Plan may be your fallback." },
      { k: "h4", t: "How the FAIR Plan works" },
      {
        k: "ul",
        items: [
          "It is California's insurer of last resort, a safety net for people who cannot get regular coverage.",
          "It mainly covers fire. Many owners add a second policy, often called a DIC policy (difference in conditions).",
          "Rates were set to rise 29.1% for certain homeowners starting October 15, 2026.",
          "One insurance guide reports yearly costs from about $5,000 to more than $20,000 in wildfire ZIP codes of the Santa Monica Mountains. Your quote can differ.",
        ],
      },
      { k: "h4", t: "Your insurance to-do list" },
      {
        k: "ol",
        items: [
          "Ask a broker who writes high-fire homes for a written quote on your top picks.",
          "Get the quote before you remove contingencies.",
          "Add an insurance contingency, so you can leave the deal if you cannot get coverage on fair terms.",
        ],
      },
      { k: "p", t: "The California Department of Insurance keeps [wildfire insurance resources](https://www.insurance.ca.gov/01-consumers/140-catastrophes/WildfireResources.cfm) for buyers." },

      { k: "h3", t: "What a Hollywood Hills House Really Costs" },
      { k: "p", t: "The median list price is about $2.9 million, property tax on that runs about $35,000 to $36,000 a year, and insurance and repairs come on top." },
      { k: "h4", t: "How much is a house in the Hollywood Hills?" },
      {
        k: "table",
        head: ["Measure", "Number", "Source"],
        rows: [
          ["Median list price", "About $2.9 million", "Ruby Home MLS data, Oct. 9, 2026"],
          ["Average price per square foot", "About $1,452", "Ruby Home MLS data, Oct. 9, 2026"],
          ["Average days on market", "88 days", "Ruby Home MLS data, Oct. 9, 2026"],
        ],
      },
      { k: "p", t: "Searching only “Hollywood” can show Hollywood, Florida. This post covers Hollywood Hills, California." },
      { k: "h4", t: "Prices change by pocket" },
      {
        k: "table",
        head: ["Area", "Snapshot", "Source"],
        rows: [
          ["Whitley Heights", "About $845,000 median list price", "Realtor.com, May 2026"],
          ["Laurel Canyon", "About $2.5 million median list price", "Ruby Home, July 2026"],
          ["Outpost", "About $3.4 million median list price", "Realtor.com, May 2026"],
        ],
      },
      { k: "p", t: "Other sites show lower medians because they count areas differently. Ask for sold prices on the exact street you like." },
      { k: "h4", t: "Property tax and loans" },
      {
        k: "ul",
        items: [
          "New buyers in Los Angeles pay about 1.2% to 1.25% of the purchase price each year. On $2.9 million, that is about $35,000 to $36,000.",
          "Prop 13 then caps yearly growth in assessed value at 2%.",
          "Expect a supplemental tax bill 2 to 6 months after closing.",
          "Many buyers here need a jumbo loan, which is a loan above the standard limit.",
          "Lenders may flag slope or wall problems and ask for an engineer's report. Tell your lender early that the home is on a hillside.",
        ],
      },
      { k: "p", t: "Want to test your budget? Try the [mortgage calculator](https://seda2.idxbroker.com/idx/mortgage), then set up [new listing alerts](https://seda2.idxbroker.com/idx/usersignup) so Hollywood Hills homes reach you first." },

      { k: "h3", t: "Know the Rules Before You Plan a Remodel" },
      { k: "p", t: "Not every hillside lot allows the remodel you want, so check permits and zoning before you offer." },
      { k: "h4", t: "Permit history" },
      {
        k: "ul",
        items: [
          "Pull the permit history from the Los Angeles Department of Building and Safety (LADBS).",
          "Compare it to what you see: additions, decks, walls, and converted garages.",
          "Unpermitted work can slow your loan, your insurance, and your resale.",
        ],
      },
      { k: "h4", t: "Zoning layers" },
      { k: "p", t: "Look up the address on ZIMAS, the city's property info site. Look for these:" },
      {
        k: "ul",
        items: [
          "**A specific plan:** Hollywoodland's plan protects ridgelines, home character, and fire access.",
          "**An HPOZ (historic overlay zone):** It adds review for outside changes. Whitley Heights is one example.",
          "**The Baseline Hillside Ordinance:** It can limit size and add rules for slope and parking.",
        ],
      },
      { k: "h4", t: "Resale" },
      { k: "p", t: "The next buyer will ask about permits, parking, access, fire, and insurance, so keep your records. If you sell above $5.4 million inside the City of Los Angeles, the Measure ULA transfer tax applies, so confirm current rates before you list." },

      { k: "h2", t: "Why Buy With a Hollywood Hills Buyer's Agent" },
      { k: "p", t: "**A local buyer's agent checks the records, the street, and the comparable sales before you offer.** Alexandra Kerr helps Hollywood Hills buyers in four ways:" },
      {
        k: "ul",
        items: [
          "She reads permit and property records with you before an offer is written.",
          "She pulls recent sales on the same street, so your offer fits the block, not the ZIP code.",
          "She shows private exclusives and off-market homes through Compass, often before they reach the MLS.",
          "She runs video tours and digital signing for buyers who live out of state.",
        ],
      },
      { k: "p", t: "Alexandra is a REALTOR, Estates Director, and Senior Real Estate Specialist at Compass. She has 13 years in Los Angeles real estate, 179 homes sold, and $184 million in total sales. Her work has been recognized by RealTrends and Los Angeles Magazine." },
      { k: "p", t: "Ready to talk through a home? [Schedule a consultation](/contact) or call [(310) 795-1440](tel:+13107951440)." },
    ],
    faq: [
      {
        q: "Is Hollywood Hills the same as Hollywood?",
        a: "No. Hollywood Hills is the hillside area above Hollywood, in the Santa Monica Mountains. It has canyon streets, views, and its own hillside rules.",
      },
      {
        q: "How long does it take to buy a Hollywood Hills home?",
        a: "Many Los Angeles purchases close in about 30 days. Hillside checks can add time, so ask for enough days in your contingency period.",
      },
      {
        q: "Can I cancel if the inspection finds slope problems?",
        a: "If your contract has an inspection contingency, you can usually cancel or ask for repairs within the time window in the contract. After that window ends, you may lose the right. Ask your agent to confirm the dates.",
      },
      {
        q: "Do I need a buyer's agent?",
        a: "California does not require one. Buyers now usually sign a written agreement with their agent before touring homes, so ask how the agent is paid and what the service includes.",
      },
      {
        q: "Can I buy a Hollywood Hills home from out of state?",
        a: "Yes. Video tours and digital signing make it possible. Local pros still do the inspections in person.",
      },
    ],
  },
  {
    slug: "buying-a-hillside-home-in-the-hollywood-hills",
    title: "Buying a Hillside Home in the Hollywood Hills",
    seoTitle: "Buying a Hillside Home in the Hollywood Hills",
    description:
      "What to check before buying a hillside home in the Hollywood Hills: city rules, retaining walls, fire zone, insurance and a pre-offer checklist.",
    date: "October 22, 2026",
    iso: "2026-10-22",
    tag: "Buying",
    excerpt:
      "Buying a hillside home in the Hollywood Hills is not like buying a house in the flats. The view, the privacy and the architecture come with steep lots, retaining walls, narrow roads and a fire zone. Here is what to check before you make an offer.",
    img: "/journal/hollywood-hills-hillside-deck.jpg",
    imgAlt: "Deck of a Hollywood Hills home looking across the hillside to neighboring homes",
    body: [
      { k: "h2", t: "What Makes Hollywood Hills Homes Different" },
      { k: "p", t: "The Hollywood Hills climb the Santa Monica Mountains above Hollywood and the Sunset Strip. Most homes sit on steep lots along winding streets, often on a small flat building area called a pad." },
      { k: "p", t: "Each canyon has its own feel. Beachwood Canyon and Hollywood Knolls sit on the east side, close to Griffith Park and Lake Hollywood. Nichols Canyon, Laurel Canyon, Outpost Estates, Mount Olympus and the Bird Streets sit to the west, mostly in ZIP codes 90068, 90046 and 90069." },
      { k: "p", t: "Price follows the lot as much as the house. Alexandra Kerr's recent Hollywood Hills sales include homes on High Tower Drive, Pinehurst, Camrose Drive, Arlene Terrace and Tuxedo Terrace, and they sold for about $1.7 million to $3.1 million. Two homes of the same size can sit far apart in value because of the view, the pad, the road and the condition of the walls." },
      { k: "p", t: "For more on each area, see the [Hollywood Hills neighborhood guide](/neighborhoods/hollywood-hills)." },

      { k: "h2", t: "Check the Lot Before You Check the House" },
      { k: "h3", t: "Look at the pad and the slope" },
      { k: "p", t: "Start with where the house sits on the slope. A home at the top relies on its walls and drainage. A home below a steep slope can take runoff and debris from above." },
      { k: "p", t: "Walk the whole lot, including the edges you cannot see from the living room. Look at the ground above, below and beside the house." },
      {
        k: "img",
        src: "/journal/hollywood-hills-hillside-deck-long.jpg",
        alt: "Long deck along the side of a Hollywood Hills home, with railings over the slope",
        cap: "A deck built out over the slope at a Hollywood Hills home Alexandra sold on Pinehurst.",
      },
      { k: "h3", t: "Think about views and privacy" },
      { k: "p", t: "A view is worth paying for, but it is rarely guaranteed. In most cases a view is not protected unless a recorded easement or a neighborhood rule says so." },
      { k: "p", t: "Ask your agent to check the title report and look at what the neighbors could build." },

      { k: "h2", t: "Know the City Hillside Rules" },
      { k: "p", t: "Most of the Hollywood Hills sit inside the City of Los Angeles. Many lots fall in a mapped Hillside Area, which adds limits on house size, height and grading under the City's Baseline Hillside Ordinance." },
      { k: "p", t: "The City sets the maximum floor area using the slope of the land. A steep lot can allow a smaller house than the lot size suggests, which matters if you plan to build up or out." },
      { k: "p", t: "Look up the address on [ZIMAS](https://zimas.lacity.org/), the City's online zoning map, and read the zoning and Hillside Area notes. Then ask City Planning to confirm what you can build. A short check now can prevent a costly surprise later." },

      { k: "h2", t: "Request These Records Before You Offer" },
      { k: "p", t: "Ask the seller's agent for these documents as early as possible:" },
      {
        k: "ul",
        items: [
          "Permit history for the house, additions, pool, decks and retaining walls",
          "Geology and soils reports, plus the approval letters from the LADBS Grading Division",
          "The Natural Hazard Disclosure and any fire-zone documents",
          "The LADBS Residential Property Report, which sellers in the City of Los Angeles provide to buyers",
          "Records of slope repairs, wall replacements or drainage work",
          "Past insurance claims for fire, water or slope damage",
          "The road maintenance agreement, if the street is private",
        ],
      },
      { k: "p", t: "A geotechnical report shows what an engineer found in the soil and what the work must follow. A City approval letter means the Grading Division reviewed the report and set conditions." },
      { k: "p", t: "Pay close attention to unpermitted work. Decks, walls and additions without permits are common on older hillside homes. They can complicate insurance, financing and resale, and they can hide structural work that affects the slope." },

      { k: "h2", t: "Inspect Retaining Walls, Drainage and Foundations" },
      { k: "p", t: "On a hillside, the ground matters as much as the house. A general inspector usually notes symptoms and leaves slope stability to specialists, so plan to hire a structural or geotechnical engineer when the lot has tall walls or signs of movement." },
      { k: "p", t: "Signs to look for:" },
      {
        k: "ul",
        items: [
          "Leaning or bulging retaining walls",
          "Horizontal or stair-step cracks in walls and foundations",
          "Water stains, seepage or soggy ground near the house",
          "Downspouts that empty onto open slope",
          "Interior cracks that keep returning after patching",
          "Doors and windows that stick",
        ],
      },
      { k: "p", t: "Treat drainage as part of the structure. Water behind a wall or under a slab is a common cause of slope and wall trouble." },
      { k: "p", t: "Book the specialists on day one. Wall and soil assessments can take a week or two to schedule and report, and your contingency period keeps running." },

      { k: "h2", t: "Fire Zone, Brush Clearance and Insurance" },
      { k: "p", t: "Nearly all of the Hollywood Hills sit in a very high fire hazard zone on CAL FIRE's 2025 map, according to Time Out Los Angeles. The Natural Hazard Disclosure will confirm the zone for your exact address." },
      { k: "p", t: "In these zones, the Los Angeles Fire Department requires owners to clear brush within 200 feet of structures and keep grass cut to three inches. Roof surfaces need five feet of clearance from overhanging branches. LAFD inspects each year and charges an inspection fee." },
      { k: "p", t: "Insurance comes before the offer. Stanford researchers found that the state's FAIR Plan covered about 5% of California single-family homes in March 2026, up from 1.5% in December 2020. They also found that homeowners insurance premiums rose 84% since 2020." },
      { k: "p", t: "The FAIR Plan mainly covers fire, so many owners add a second policy for other risks. Standard policies often exclude earth movement, so ask each broker about it." },
      { k: "p", t: "Get written quotes for the exact address before you remove contingencies, and ideally before you offer. Ask which upgrades lower the premium. Ember-resistant vents, a fire-rated roof and good defensible space often help." },

      { k: "h2", t: "Road Access, Parking and Daily Life" },
      { k: "p", t: "Drive to the house at night and again at rush hour. Note the road width, the turns, the driveway slope and where guests will park." },
      { k: "p", t: "Narrow streets affect more than convenience. Trash pickup, deliveries, contractors and fire trucks all depend on the road. For new projects, City rules can require street improvements in some cases, so ask City Planning before you assume you can build." },
      { k: "p", t: "If the road is private, ask who repairs it, who pays and whether a written agreement exists. Shared roads can lead to shared bills." },

      { k: "h2", t: "Remodels and Additions on a Hillside Lot" },
      { k: "p", t: "Many buyers love a hillside home for what it could become. The rules decide how much that is." },
      { k: "p", t: "The Baseline Hillside Ordinance applies to many single-family zones in mapped Hillside Areas. Grading and retaining walls need City permits, and large earthwork can trigger extra approvals. In the City's hillside grading area, projects that move more than 1,000 cubic yards of earth require notice to nearby owners, per LADBS plan check requirements." },
      { k: "p", t: "Pay for the house as it stands today. Treat any addition as a bonus that still needs approval." },

      { k: "h2", t: "Buying a Hillside Home in the Hollywood Hills: Pre-Offer Checklist" },
      {
        k: "ol",
        items: [
          "Pull the zoning, Hillside Area and fire-zone details for the address on ZIMAS and in the Natural Hazard Disclosure.",
          "Request permits, geology reports and City approval letters.",
          "Get insurance quotes for the exact address, including earth movement coverage.",
          "Hire a general inspector, plus a structural or geotechnical specialist for walls and slope.",
          "Drive the road, test the driveway and check parking.",
          "Review the road agreement if the street is private.",
          "Ask City Planning what you can build if you plan changes.",
          "Compare prices with hillside sales that match on view, pad, access and condition.",
          "Set your contingency period so the reports arrive before you remove contingencies.",
          "Ask your lender about appraisal and insurance timing.",
        ],
      },

      // The questions (faq, below) sit here, between the checklist and the close.
      { k: "faq" },

      { k: "h2", t: "Before You Write the Offer" },
      { k: "p", t: "Buying a hillside home in the Hollywood Hills rewards buyers who check the lot, the records, the walls, the fire zone and the insurance first. The view is the easy part to love. The paperwork and the ground under the house decide whether the home holds its value." },
      { k: "p", t: "Thinking about a hillside home? Contact Alexandra Kerr at [310.795.1440](tel:+13107951440) or through the [contact page](/contact). She will walk you through the reports, the specialists and the numbers before you write an offer." },
    ],
    faq: [
      {
        q: "Are all Hollywood Hills homes in the City of Los Angeles?",
        a: "Most are, but not all. Some addresses near the Sunset Strip and ZIP code 90069 sit in the City of West Hollywood, which has its own building and planning rules. Confirm the city for your exact address before you plan any work.",
      },
      {
        q: "How do I know if the asking price is fair?",
        a: "Compare it with recent sales of homes that match on view, pad size, road access and condition, not only the same street. Then adjust for wall, drainage and insurance costs you will carry. A local agent who works these streets can show you the sales that truly match.",
      },
      {
        q: "Will a lender finance a hillside home?",
        a: "Often yes, but steep lots and unusual builds can slow an appraisal. Lenders also want proof of homeowners insurance before they fund the loan. Talk to a lender who knows hillside homes before you start touring.",
      },
      {
        q: "When should I tour or inspect a hillside home?",
        a: "Visit in daylight, and again after a rain if you can. Wet weather shows where water collects and which walls seep. If the weather stays dry, ask the seller for photos or records of how the property handled past storms.",
      },
      {
        q: "Do I need an agent who specializes in hillside homes?",
        a: "It helps. Records, reports and City rules shape value on a hillside, and a general agent may not read them often. Look for an agent who can explain each report and knows which specialists to bring in.",
      },
    ],
  },
  {
    slug: "14-years-running-favorite-investment",
    title: "14 Years Running: Why Real Estate Is Still America's Favorite Investment",
    date: "July 16, 2026",
    iso: "2026-07-16",
    tag: "Investing",
    excerpt:
      "Quick gut reaction: which investment do Americans trust more than stocks, gold, savings accounts, and bonds? The answer hasn't changed in fourteen years.",
  },
  {
    slug: "think-nobody-is-buying-think-again",
    title: "Think Nobody's Buying Homes Right Now? Think Again.",
    date: "July 16, 2026",
    iso: "2026-07-16",
    tag: "Selling",
    excerpt:
      "If you've been thinking about selling, you've probably seen plenty of headlines suggesting buyers have just about disappeared. The data tells a different story.",
  },
  {
    slug: "take-it-or-leave-it-attitude-fading",
    title: "The “Take It or Leave It” Attitude Is Fading from the Market — What That Means for You",
    date: "July 13, 2026",
    iso: "2026-07-13",
    tag: "Market Notes",
    excerpt:
      "Negotiations are back. More buyers are asking for better deals, and more sellers are giving them. Builders are throwing in incentives, too.",
  },
  {
    slug: "housing-market-second-half-2026",
    title: "What To Expect from the Housing Market in the Second Half of 2026",
    date: "July 9, 2026",
    iso: "2026-07-09",
    tag: "Market Notes",
    excerpt:
      "If the first half of this year has left you feeling stuck, you're not the only one. Mortgage rates moved higher than most forecasts expected.",
  },
  {
    slug: "student-loans-and-your-homeownership-plans",
    title: "Student Loans Are Back in the News. Don't Let It Put Your Homeownership Plans on Hold.",
    date: "July 9, 2026",
    iso: "2026-07-09",
    tag: "Buying",
    excerpt:
      "Student loans are back in the spotlight. Whether you've been following the headlines closely or just catching bits and pieces, it's worth knowing what actually changes for buyers.",
    img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1400&auto=format&fit=crop",
  },
  {
    slug: "what-buying-or-selling-gives-back",
    title: "What Buying or Selling a Home Gives Back to Your Community",
    date: "July 8, 2026",
    iso: "2026-07-08",
    tag: "Community",
    excerpt:
      "Buying or selling a home is a big financial decision, and right now it feels even bigger. But the ripple effect on your community is larger than most people realize.",
    img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1400&auto=format&fit=crop",
  },
  {
    slug: "down-payments-smaller-since-2021",
    title: "Down Payments Are Smaller Than They've Been Since 2021",
    date: "July 7, 2026",
    iso: "2026-07-07",
    tag: "Buying",
    excerpt:
      "Saving for a down payment can feel like the hardest part of buying a home. With affordability as tight as it has been, that number matters more than ever.",
  },
  {
    slug: "what-rising-inflation-means-for-your-move",
    title: "What Rising Inflation Means for Your Move",
    date: "July 4, 2026",
    iso: "2026-07-04",
    tag: "Market Notes",
    excerpt:
      "Data shows inflation is moving in the wrong direction. Before the headlines send anyone into a panic, here's what's actually happening and what it means for your plans.",
  },
  {
    slug: "one-factor-behind-home-prices",
    title: "The 1 Factor That Explains Everything Happening with Home Prices Right Now",
    date: "July 2, 2026",
    iso: "2026-07-02",
    tag: "Market Notes",
    excerpt:
      "You've probably heard that home prices are cooling off. That's true — nationally. But zoom in on individual markets and the picture changes entirely.",
  },
  {
    slug: "housing-market-stronger-than-you-think",
    title: "The Housing Market Is Stronger Than You Think",
    date: "July 1, 2026",
    iso: "2026-07-01",
    tag: "Market Notes",
    excerpt:
      "You've probably heard plenty of doom and gloom about the housing market lately. High rates. Stretched budgets. Headlines built to alarm. Here's what the numbers actually show.",
    img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1400&auto=format&fit=crop",
  },
  {
    slug: "more-sellers-taking-homes-off-market",
    title: "More Sellers Are Taking Their Homes off the Market. Here's What You Need To Know.",
    date: "July 1, 2026",
    iso: "2026-07-01",
    tag: "Selling",
    excerpt:
      "You may be reading that a near-record number of homeowners are pulling their houses off the market. If that headline made you nervous, let's unpack it.",
    img: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1400&auto=format&fit=crop",
  },
  {
    slug: "lower-asking-prices-win-for-buyers",
    title: "Lower Asking Prices Are a Win for Today's Buyers",
    date: "June 30, 2026",
    iso: "2026-06-30",
    tag: "Buying",
    excerpt:
      "If affordability has been the biggest thing standing between you and a home, there's a little good news. Asking prices have started to move.",
  },
  {
    slug: "your-house-didnt-sell-turn-it-around",
    title: "Your House Didn't Sell. Here's How To Turn It Around.",
    date: "June 25, 2026",
    iso: "2026-06-25",
    tag: "Selling",
    excerpt:
      "When your house doesn't sell, it's not just disappointing. It messes with your timing. Your plans. Your confidence. Here's how to reset.",
  },
  {
    slug: "mid-year-housing-market-update",
    title: "The Mid-Year Housing Market Update: Why Forecasts Changed in 2026",
    date: "June 25, 2026",
    iso: "2026-06-25",
    tag: "Market Notes",
    excerpt:
      "If the housing market feels confusing right now, you're not alone. Mortgage rates have risen and home sales haven't picked up the way anyone expected.",
  },
  {
    slug: "house-thats-been-sitting-best-deal",
    title: "That House That's Been Sitting Could Be Your Best Shot at a Deal",
    date: "June 22, 2026",
    iso: "2026-06-22",
    tag: "Buying",
    excerpt:
      "Open a home search and you'll see them. Listings that have been on the market two months. Three. Some longer. Most buyers scroll right past.",
  },
  {
    slug: "is-it-still-a-sellers-market",
    title: "Is It Still a Seller's Market? Here's What the Data Says.",
    date: "June 18, 2026",
    iso: "2026-06-18",
    tag: "Market Notes",
    excerpt:
      "Remember when sellers had all the power and buyers were stuck offering way over asking or waiving every contingency? That balance has shifted.",
    img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1400&auto=format&fit=crop",
  },
  {
    slug: "should-you-pay-buyers-closing-costs",
    title: "Should You Pay for Your Buyer's Closing Costs? What Sellers Need To Know.",
    date: "June 16, 2026",
    iso: "2026-06-16",
    tag: "Selling",
    excerpt:
      "A few years ago, sellers could get away with saying no to just about everything. No repairs. No concessions. No flexibility. Not anymore.",
  },
  {
    slug: "two-big-reasons-to-move-this-summer",
    title: "Two Big Reasons To Move This Summer",
    date: "June 9, 2026",
    iso: "2026-06-09",
    tag: "Buying",
    excerpt:
      "A lot of people who want to move are telling themselves the same thing: maybe I'll just wait until later this year, once things settle down.",
  },
  {
    slug: "moving-further-out-change-your-budget",
    title: "Could Moving a Bit Further Out Change Everything About Your Budget?",
    date: "June 3, 2026",
    iso: "2026-06-03",
    tag: "Buying",
    excerpt:
      "Whether you're dreaming about your first home or wondering if it's time to leave the one you're in, a few miles can change the math more than you'd think.",
  },
  {
    slug: "less-house-more-home",
    title: "Less House, More Home: Why Smaller Homes Are Paying Off for Today's Buyers",
    date: "June 2, 2026",
    iso: "2026-06-02",
    tag: "Buying",
    excerpt:
      "You started shopping with a specific mental image of your future home. Then the house in your budget came in smaller than you pictured.",
    img: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1400&auto=format&fit=crop",
  },
  {
    slug: "the-truth-about-affordability-today",
    title: "The Truth About Affordability Today",
    date: "May 27, 2026",
    iso: "2026-05-27",
    tag: "Affordability",
    excerpt:
      "Let's be real with each other for a second about affordability, because you deserve someone who will be honest and specific, not just optimistic.",
  },
  {
    slug: "what-veterans-dont-know-about-va-loans",
    title: "What Most Veterans Don't Know About Their Home Loan Benefits",
    date: "May 25, 2026",
    iso: "2026-05-25",
    tag: "Buying",
    excerpt:
      "VA loans remain one of the most powerful buying tools available — and one of the most widely misunderstood.",
  },
  {
    slug: "record-high-mortgage-debt-in-context",
    title: "Record-High Mortgage Debt Sounds Scary. Here's What the Data Actually Says.",
    date: "May 22, 2026",
    iso: "2026-05-22",
    tag: "Market Notes",
    excerpt:
      "Total mortgage debt just hit another record. Read on its own, that sounds alarming. Put in context, it looks very different.",
  },
  {
    slug: "newly-built-home-prices-three-year-low",
    title: "Newly Built Home Prices Hit a 3-Year Low",
    date: "May 21, 2026",
    iso: "2026-05-21",
    tag: "Market Notes",
    excerpt:
      "Builders have been adjusting, and new construction is now competing with resale inventory in a way it hasn't for years.",
  },
  {
    slug: "real-reason-people-are-still-moving",
    title: "The Real Reason Some People Are Still Moving Right Now",
    date: "May 19, 2026",
    iso: "2026-05-19",
    tag: "Buying",
    excerpt:
      "You may be telling yourself you'll wait — hoping mortgage rates come down, prices soften, or life feels less busy. Some people aren't waiting, and here's why.",
  },
  {
    slug: "think-home-prices-will-crash",
    title: "Think Home Prices Will Crash? Here's What the Experts Actually Expect.",
    date: "May 15, 2026",
    iso: "2026-05-15",
    tag: "Market Notes",
    excerpt:
      "One of the biggest reasons buyers are still sitting on the sidelines is that they think home prices are about to come crashing down.",
  },
];

/**
 * Home-page teaser: the three newest posts that carry art, so the home grid
 * never renders a card with an empty figure.
 */
/**
 * Posts with their full article copy. Only these are published: the rest are
 * titles from the Compass feed awaiting their bodies, and they stay off the
 * site (no page, no listing, no sitemap entry) until the copy arrives.
 */
export const PUBLISHED = POSTS.filter((p) => p.body?.length);

/**
 * The journal is live once there is at least one finished article. Until then
 * /journal shows its coming-soon panel (noindex), the menus leave it out and
 * the home page hides its journal section.
 */
export const JOURNAL_LIVE = PUBLISHED.length > 0;

export const LATEST_POSTS = PUBLISHED.filter((p) => p.img).slice(0, 3);

export const getPost = (slug: string) => PUBLISHED.find((p) => p.slug === slug);

/** Reading time at ~220 wpm, rounded up. Returns null when there is no body. */
export function readingTime(post: Post): string | null {
  if (post.read) return post.read;
  if (!post.body?.length) return null;
  const words = post.body
    .map((b) => ("items" in b ? b.items.join(" ") : "rows" in b ? b.rows.flat().join(" ") : "t" in b ? b.t : ""))
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 220))} min read`;
}

/**
 * Up to `n` other posts, preferring ones filed under the same tag so the
 * "Continue Reading" row stays topical rather than merely adjacent.
 */
export function relatedPosts(slug: string, n = 3): Post[] {
  const current = getPost(slug);
  const rest = PUBLISHED.filter((p) => p.slug !== slug);
  if (!current) return rest.slice(0, n);
  const sameTag = rest.filter((p) => p.tag === current.tag);
  return [...sameTag, ...rest.filter((p) => p.tag !== current.tag)].slice(0, n);
}
