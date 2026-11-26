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
    slug: "best-time-to-sell-a-house-in-los-angeles",
    title: "When Is the Best Time to Sell a House in Los Angeles?",
    seoTitle: "Best Time to Sell a House in Los Angeles: What the Data Says",
    description:
      "Best time to sell a house in Los Angeles? See what Zillow data shows, how luxury differs, and what it costs to sell in California. Alexandra Kerr, Compass.",
    date: "November 27, 2026",
    iso: "2026-11-27",
    tag: "Selling",
    excerpt:
      "The best time to sell a house in Los Angeles is spring, and April has the strongest record in Zillow's data. Here is the data, how luxury homes differ, what to prepare, and what selling costs in California.",
    img: "/assets/listings/representative-hollywood-hills.jpg",
    imgAlt: "A Los Angeles hillside home",
    body: [
      { k: "p", t: "The best time to sell a house in Los Angeles is spring, and April has the strongest record in Zillow's data. Its last two studies of Los Angeles sales both point to April, with sale premiums of 2.5% and 3.9%. This guide covers the data, how luxury homes differ, what to prepare, and what selling costs in California." },

      { k: "h2", t: "The Best Time to Sell a House in Los Angeles: What the Data Shows" },
      { k: "p", t: "Zillow ranks list dates in the 35 largest metro areas by the sale price sellers earned. For 2025 sales, the best Los Angeles window was the last two weeks of April, worth about 2.5%, or $25,300 on a typical home. For 2024 sales, it was the first half of April, worth 3.9%, or $39,300." },
      {
        k: "table",
        head: ["Source", "What it measures", "Los Angeles result"],
        rows: [
          ["Zillow, March 2026 (2025 sales)", "Best two-week window by sale price", "Last two weeks of April, +2.5% (about $25,300)"],
          ["Zillow, March 2025 (2024 sales)", "Same method", "First half of April, +3.9% (about $39,300)"],
          ["Clever Real Estate, 2026 data", "Month by days on market and price", "February fastest (44 days), June highest price"],
          ["HomeLight, as summarized by iBuyer.com", "Month by speed and price", "March fastest, August highest price"],
        ],
      },
      { k: "p", t: "Other sources name June, May or August, so the answers differ. Some studies rank price and others rank speed. They also differ in the year studied, the area covered and the home types included." },
      { k: "p", t: "The Zillow studies are the easiest to check because they publish the method and the years. Zillow also says the best week depends on local conditions. Treat April as a target window, not a promise." },
      { k: "p", t: "Spring brings the most competing listings too. One Los Angeles broker notes that inventory builds from April through June. A buyer who tours ten similar homes will pick the one that looks best and is priced right." },
      { k: "p", t: "Timing from listing to closing matters as well. One 2026 data set puts the average Los Angeles sale at 49 days on market plus 30 days to close, or about 79 days. At that pace, an April 1 listing points to a closing in mid to late June." },
      { k: "p", t: "For your street and price band, ask Alexandra to compare recent MLS sales. A citywide average will not tell you how your block behaves." },

      { k: "h2", t: "Luxury vs Entry-Level Homes: Does Timing Work the Same Way?" },
      { k: "p", t: "Not quite. Luxury in Los Angeles starts higher than most people expect. Realtor.com put the entry point to the top 10% of Los Angeles metro listings at nearly $3.9 million in August 2026, the highest in the country." },
      { k: "p", t: "Luxury buyers also behave differently. Compass's market outlook says buyers at the top of the market tend to be less sensitive to mortgage rates, and many pay cash. That makes a luxury sale less dependent on rates and on the spring rush." },
      { k: "p", t: "Luxury homes often take longer to sell. Realtor.com reported a national median of 74 days on market for luxury listings in August 2026. Redfin data, as reported by Stacker, put the Los Angeles metro median for all price tiers at 51.3 days in the first half of 2026." },
      { k: "p", t: "If you own a high-value home, preparation and price matter more than the calendar. A home that may need 90 days or more should launch early in the spring window, or in early fall. Some Los Angeles brokers see fall as a second window, when serious buyers return after summer." },
      { k: "p", t: "Many top-tier homes also sell through relationships before they reach the MLS. Our [Windsor Square page](/neighborhoods/windsor-square) describes how that works in one of the city's slowest-turnover areas." },
      { k: "p", t: "No public source we reviewed publishes a reliable month-by-month sales curve for Los Angeles luxury homes. For that reason, we do not name a best luxury month. Ask Alexandra to compare Compass and MLS sales in your price band." },
      { k: "p", t: "At the other end, a typical Los Angeles city home was worth $949,479 in Zillow's data through June 2026. Many buyers at that level rely on a mortgage, so spring timing and rates matter more." },

      { k: "h2", t: "Rates, Your Timeline and Preparation Lead Time" },
      { k: "h3", t: "Mortgage rates" },
      { k: "p", t: "You cannot time rates, but you can understand their effect. Freddie Mac's October 2026 average for a 30-year fixed loan was 7.33%, as cited in our [cost of living in Los Angeles guide](/journal/cost-of-living-los-angeles). A rate 0.8 points lower would trim the income a typical buyer needs by about $18,000." },
      { k: "p", t: "Compass's national outlook for 2026 calls for rising sales and flat prices. Waiting for lower rates can also bring more competing sellers. Price for the market you have." },
      { k: "h3", t: "Your personal timeline" },
      { k: "p", t: "The calendar should serve your plan. If you need proceeds for your next purchase, work backward from that closing date and allow about 79 days from listing to closing." },
      { k: "p", t: "If you are leaving the state, our [relocation page](/relocation) explains how a sale can run from a distance. Our guides to moving from Los Angeles to [Austin](/journal/moving-from-los-angeles-to-austin) and [Nashville](/journal/moving-from-los-angeles-to-nashville) show why the sale of your home matters more than the move itself." },
      { k: "h3", t: "Preparation lead time" },
      { k: "p", t: "Most of the work happens before the listing goes live. This sample timeline shows the order. Your home may need more or less time." },
      {
        k: "table",
        head: ["Weeks before listing", "Task", "Why it matters"],
        rows: [
          ["10 to 12", "Home valuation and pricing plan", "Sets the budget for everything after it"],
          ["8 to 10", "Repairs, inspections and permit checks", "Fixes problems before buyers find them"],
          ["4 to 8", "Paint, landscaping, decluttering, staging", "Shows the home at its best"],
          ["1 to 2", "Photography, video, floor plan, Coming Soon launch", "Builds interest before the public launch"],
        ],
      },
      { k: "p", t: "Compass says a Coming Soon listing builds interest without accruing days on market. Ask Alexandra whether it fits your home." },
      { k: "p", t: "Historic districts need extra time. In an HPOZ, routine exterior work can take about 3 to 21 days to approve, and larger work can take up to 75 days. Our [Mills Act guide](/journal/mills-act-los-angeles) covers those rules." },
      { k: "p", t: "The calendar helps here. If April 2027 is your target, December is a good month for the valuation, and January is the time to start repairs and permits." },
      { k: "p", t: "Preparation shows up in results. Santa Monica clients described sixteen offers in the first week, an all-cash buyer above list and a ten day escrow. You can read their story and others on the [testimonials page](/testimonials). Results vary by home and market." },

      { k: "h2", t: "Cost to Sell a House in California" },
      { k: "p", t: "Sellers in California commonly budget about 6% to 10% of the sale price once commission is included. Commission is the largest piece, and it is negotiated in your listing agreement. The rest comes from transfer taxes, title, escrow, preparation and credits." },
      { k: "p", t: "This sample net sheet is for a $1.2 million sale inside the City of Los Angeles, below the Measure ULA threshold. It is illustrative, not a quote." },
      {
        k: "table",
        head: ["Cost", "Sample at $1.2 million", "Notes"],
        rows: [
          ["Agent commission", "$66,000 (at 5.5%)", "Negotiated in your listing agreement"],
          ["Title, escrow and county transfer tax", "$8,000 to $12,000", "County tax is $1.10 per $1,000"],
          ["City of Los Angeles transfer tax", "$5,400", "$4.50 per $1,000, City of LA only"],
          ["Prep, staging and photography", "$3,000 to $10,000", "Varies by home"],
          ["Negotiated credits", "$0 to $18,000", "Depends on inspections and offers"],
          ["**Estimated total**", "**About $82,400 to $111,400**", "About 6.9% to 9.3% of price"],
        ],
      },
      { k: "p", t: "Sources: sample net sheet from Russell Realty Group (September 2026); City transfer tax rate from the City of Los Angeles. Total is our arithmetic from the sample." },
      { k: "h3", t: "What staging costs in Los Angeles" },
      { k: "p", t: "HomeAdvisor puts the average staging cost in Los Angeles near $4,000. Furniture rental for an empty home runs about $500 to $600 per room per month." },
      { k: "p", t: "An occupied home usually costs less because you use your own furniture. Costs also build each month a listing sits, which is one more reason to launch ready." },
      { k: "h3", t: "Measure ULA" },
      { k: "p", t: "Measure ULA adds a transfer tax on City of Los Angeles sales above set thresholds. For closings on or after July 1, 2026, the rate is 4% on sales above $5.4 million and 5.5% at $10.9 million or more. The rate applies to the full price." },
      { k: "p", t: "It is a cliff, not a bracket. A sale just under $5.4 million owes no ULA, while a $6 million sale owes $240,000. The tax is on top of the 0.56% combined city and county transfer taxes." },
      { k: "p", t: "The thresholds adjust every July 1 using the Chained Consumer Price Index. They apply only inside the City of Los Angeles, not in Beverly Hills, Santa Monica or Culver City. For a seller near the line, a closing date before or after July 1 can change which thresholds apply." },
      { k: "p", t: "Check the City of Los Angeles Office of Finance for current figures, and ask your CPA how the tax applies to your sale." },
      { k: "h3", t: "Compass Concierge" },
      { k: "p", t: "[Compass Concierge](/compass-concierge) fronts the cost of home improvements such as staging, painting and flooring, with nothing due until closing. Compass says repayment comes due when the home sells, if the listing ends, or after 12 months, whichever comes first." },
      { k: "p", t: "Compass is not a lender, and fees or interest may apply depending on your state. Terms and availability vary, so ask Alexandra for current details before you decide." },

      { k: "h2", t: "How Much Is My Home Worth in Los Angeles?" },
      { k: "p", t: "Citywide numbers will not price your home. Zillow's June 2026 values run from $1,173,800 in [Silver Lake](/neighborhoods/silver-lake) and Echo Park (ZIP 90026) to $1,919,869 in [Los Feliz](/neighborhoods/los-feliz). A single street can shift a value again." },
      { k: "p", t: "Alexandra starts with recent comparable sales on the same street and in the same micro-market. Then she adjusts for view, lot, condition and permit history. She shares her reasoning, so you can see how the number was reached." },
      { k: "p", t: "A [home valuation](/home-valuation) is the first step on every timeline above. It sets your price, your prep budget and your list date." },

      { k: "faq" },

      { k: "h2", t: "Plan Your Sale Around the Calendar and Your Home" },
      { k: "p", t: "The best time to sell a house in Los Angeles is a spring window, with April leading in Zillow's data. Your price band, preparation time and costs shape the result as much as the date, and Measure ULA matters near the top of the market. Start with a valuation, then work backward from your target list date." },
      { k: "p", t: "[Request a home valuation](/home-valuation), call Alexandra Kerr at [(310) 795-1440](tel:+13107951440), or reach out through the [contact page](/contact). Alexandra is an Estates Director at Compass with 13 years in Los Angeles real estate. You can also see her [recent results](/properties)." },
    ],
    faq: [
      { q: "Do I owe capital gains tax when I sell?", a: "Many owners can exclude up to $250,000 of gain, or $500,000 for married couples filing jointly, if they owned and lived in the home for at least two of the last five years. Rules and exceptions apply, so ask a CPA. The IRS explains the exclusion on its topic page." },
      { q: "Should I sell as is or fix things first?", a: "Selling as is saves time and money up front, but buyers often price in repairs and inspection findings. Fix safety and permit issues first, then decide on cosmetic work. Alexandra can help you rank the list by return." },
      { q: "What if my home sits without offers?", a: "Review the price and the presentation first. One Los Angeles broker notes that a price cut rarely brings back the urgency of a correct first price." },
      { q: "Can I stay in my home while it is listed?", a: "Yes, many sellers do. Staging with your own furniture costs less, but you will need to keep the home show-ready and leave during showings." },
      { q: "What disclosures does California require?", a: "Sellers give buyers written disclosures, including a Transfer Disclosure Statement and a natural hazard disclosure report. Gather permit records, repair receipts and inspection reports early so the package is ready on day one." },
    ],
  },
  {
    slug: "moving-to-los-angeles-from-new-york",
    title: "Moving to Los Angeles From New York: What Changes",
    seoTitle: "Moving to Los Angeles From New York: Costs & Neighborhoods",
    description:
      "Moving to Los Angeles from New York? See what changes, which neighborhoods feel closest to NYC, and what homes cost. Advice from Alexandra Kerr, Compass.",
    date: "November 26, 2026",
    iso: "2026-11-26",
    tag: "Relocation",
    excerpt:
      "Moving to Los Angeles from New York usually means trading the subway for a car and an apartment for a house, but it does not always mean a cheaper home. Here is what changes, which neighborhoods feel closest to New York, and what buying looks like, with dated numbers.",
    img: "/assets/listings/s2-rossmore.jpg",
    imgAlt: "A tree-lined Los Angeles street near Hancock Park",
    body: [
      { k: "p", t: "Moving to Los Angeles from New York usually means trading the subway for a car and an apartment for a house, but it does not always mean a cheaper home. This guide covers what changes, which neighborhoods feel closest to New York, and what buying looks like, with dated numbers. Most of it also applies if you are moving to Los Angeles from another state." },

      { k: "h2", t: "What Changes When You Move to Los Angeles From New York" },
      { k: "h3", t: "Getting around without the subway" },
      { k: "p", t: "Walk Score rates Los Angeles 69 for walkability against 88 for New York, and 53 for transit against 89. That gap shows up every day. Metro runs only two subway lines." },
      { k: "p", t: "In New York, you pick a home near a train. In Los Angeles, you pick one near your work, your freeway and the streets you want to walk." },
      { k: "p", t: "Test the drive before you fall for a street. Visit at 8 a.m. and again at 5 p.m., because a quiet street at noon can be a long commute." },
      { k: "h3", t: "Space, parking and the house itself" },
      { k: "p", t: "Most New Yorkers move from an apartment or co-op into a house. You gain a yard, a garage and room to spread out. You also gain a roof, drains and sometimes a retaining wall, and there is no building super to call." },
      { k: "p", t: "Older homes need a closer read. Alexandra checks permit history and hillside records before an offer, which our guide to [buying a hillside home in the Hollywood Hills](/journal/buying-a-hillside-home-in-the-hollywood-hills) explains." },
      { k: "h3", t: "Weather and pace" },
      { k: "p", t: "Los Angeles gets about 16 inches of rain a year against 44 in New York, and almost no snow against roughly 62 inches. Locals treat a rainy day as an event, so expect cancelled plans." },
      { k: "p", t: "The pace is looser too. Things run on a more relaxed timetable. Some New Yorkers love that, and others need a few months to adjust." },

      { k: "h2", t: "Los Angeles Neighborhoods That Feel Closest to New York" },
      { k: "p", t: "No Los Angeles neighborhood matches New York block for block. A few share walkable streets, older buildings and independent shops. One roundup lists Downtown, Silver Lake, Hollywood and Los Feliz among the best known pedestrian-friendly areas." },
      { k: "p", t: "Downtown and Hollywood are walkable, but their housing leans toward condos and apartments. The areas below suit buyers who want a house." },
      {
        k: "table",
        head: ["Neighborhood", "What feels familiar", "What differs", "Typical value"],
        rows: [
          ["[Los Feliz](/neighborhoods/los-feliz)", "Walkable village streets, strong architecture", "Hillside houses, not apartments", "$1,919,869 (Zillow, Jun 2026)"],
          ["[Silver Lake](/neighborhoods/silver-lake)", "Independent restaurants, reservoir loop", "Steep lots and winding streets", "$1,173,800, ZIP 90026 (Zillow, Jun 2026)"],
          ["Echo Park", "Lake, cafes, smaller homes", "Fewer luxury houses", "$1,114,759 (Zillow, Jun 2026)"],
          ["[Hancock Park](/neighborhoods/hancock-park) and [Windsor Square](/neighborhoods/windsor-square)", "Tree-lined blocks, period architecture", "Large lots, car-based, historic rules", "$3.6M to $7.8M, recent sales"],
        ],
      },
      { k: "p", t: "The “familiar” column is Alexandra’s editorial read, not a ranking." },
      { k: "p", t: "**Los Feliz** is the closest match for people who want to walk to dinner. Time Out calls it the central Los Angeles pocket best experienced on foot. The homes run from Spanish Colonial to Neutra and Lloyd Wright designs, so expect far more space than a one bedroom." },
      { k: "p", t: "**Silver Lake** offers a walkable core around Sunset Junction, with Craftsman and mid-century houses on the hills. If you love the look of those homes, read our [mid-century buyer’s guide](/journal/mid-century-modern-homes-los-angeles) first. Hillside lots reward buyers who can read a slope and a permit history." },
      { k: "p", t: "**Hancock Park and Windsor Square** suit buyers who prefer New York’s brownstone blocks to its towers. Larchmont Boulevard’s shops sit close to many streets. Both are historic districts, so exterior work needs review, and many Windsor Square homes sell before they reach the MLS. Our [Mills Act guide](/journal/mills-act-los-angeles) covers those rules." },

      { k: "h2", t: "Cost of Living in Los Angeles vs New York: Renting First or Buying Remotely" },
      { k: "h3", t: "Is Los Angeles cheaper than New York?" },
      { k: "p", t: "It depends on what you rent or buy. Zillow puts the typical New York City home at $825,854 as of September 2026, and Manhattan at $1,254,053. Los Angeles sits at $949,479 in data through June 2026." },
      {
        k: "table",
        head: ["Measure", "New York City", "Los Angeles"],
        rows: [
          ["Typical home value (Zillow)", "$825,854 (Sep 2026); Manhattan $1,254,053", "$949,479 (through Jun 2026)"],
          ["Typical rent (Zillow, Oct 2026)", "—", "$2,913 (LA metro)"],
          ["Sales closing over list price (Zillow, Sep 2026)", "22.3%", "42.3% (LA County)"],
        ],
      },
      { k: "p", t: "Compare like with like. Zillow’s index includes single-family homes, condos and co-ops, so apartments pull New York’s number down. A Los Angeles buyer is mostly buying a house." },
      { k: "p", t: "The walkable neighborhoods above are not bargains next to Manhattan’s typical value. Los Feliz sits well above it, and Silver Lake and Echo Park sit above Brooklyn’s $962,988. You get more space and a yard for the money, not a lower price." },
      { k: "p", t: "Costs after closing also differ. A sale resets your assessed value to your purchase price under Prop 13, so you start with a 1% base rate. Many City of Los Angeles bills land near 1.2%, and our [cost of living in Los Angeles guide](/journal/cost-of-living-los-angeles) shows the math." },
      { k: "p", t: "Insurance needs an early quote, especially on hillside homes. The California FAIR Plan raised rates by an average of 29.1% on October 15, 2026. California’s top state income tax rate is 12.3%, plus 1% on income over $1 million, and New York City residents also pay a city income tax. Compare your own numbers with a CPA." },
      { k: "h3", t: "Renting first vs buying remotely" },
      { k: "p", t: "Renting first lets you see streets at rush hour and learn how each area feels. It also means a second move, a second set of costs and a market that does not wait for you." },
      { k: "p", t: "Buying remotely lets you act on the right home when it appears. The risk is buying a street you have never stood on. A good agent closes that gap with honest video tours and plain answers about the downsides." },
      { k: "p", t: "A middle path works for many buyers. Book a short furnished stay in the neighborhood you most want to test, then shop with a shortlist already in hand." },

      { k: "h2", t: "How Buying a Home in Los Angeles Differs From New York" },
      { k: "p", t: "The process changes more than the prices do. These are the four differences New Yorkers notice first." },
      {
        k: "ol",
        items: [
          "**No board approval.** A co-op purchase in New York runs through a board package and interview. A Los Angeles house has no board, but you will inspect the roof, foundation and sewer line, and review permits.",
          "**Escrow instead of a closing table.** In New York, buyers usually hire an attorney to handle the closing. In California, a neutral escrow company holds funds and documents, and your agent coordinates the steps.",
          "**Faster, more competitive offers.** About 42% of LA County sales closed over list in September 2026, against about 22% in New York City. Strategy matters, which is why Alexandra builds offers around comparable sales on the same street.",
          "**Permit history carries weight.** Unpermitted work can limit what you can change, and it can affect value. Ask for records early.",
        ],
      },

      { k: "h2", t: "Moving to Los Angeles From Another State: How a Remote Purchase Works" },
      { k: "p", t: "Alexandra has guided relocations in both directions for over a decade. As a relocation real estate agent in Los Angeles, she runs the same four steps whether you are crossing the country or crossing a time zone." },
      {
        k: "ol",
        items: [
          "**Before you fly.** A call about what listing sites cannot tell you, such as the real commute, which streets go quiet at night and where the afternoon light falls. The shortlist starts there.",
          "**Touring remotely.** Walkthrough video shot on your schedule, with your questions answered ahead of time and honest notes on what photographs flatter.",
          "**Offer and escrow.** Strategy set against what the home is worth, then inspections, appraisal and digital signing coordinated across time zones.",
          "**Landing.** Keys, contractors and the small logistics nobody warns you about.",
        ],
      },
      { k: "p", t: "One West Hollywood couple managed a rental and then a sale from out of state and sold over asking within a month. You can read their story and others on the [testimonials page](/testimonials), and see the full process on the [relocation page](/relocation)." },

      { k: "faq" },

      { k: "h2", t: "Plan Your Move to Los Angeles From New York" },
      { k: "p", t: "Moving to Los Angeles from New York changes how you get around, how you buy and how far your budget stretches. Neighborhood, insurance and your first-year costs matter more than any citywide average." },
      { k: "p", t: "Alexandra Kerr is an Estates Director at Compass and a relocation real estate agent in Los Angeles with 13 years in the market. Call her at [(310) 795-1440](tel:+13107951440), start on the [relocation page](/relocation), or reach out through the [contact page](/contact). You can also browse the [portfolio](/properties) or start a [home search](/home-search) to see what your budget buys." },
    ],
    faq: [
      { q: "How much does it cost to ship a household from New York to Los Angeles?", a: "Estimates vary by size and date. moveBuddha puts a 2,789 mile move at $1,590 to $6,325, while North American Van Lines reports an average line haul of $3,900. Get at least three quotes." },
      { q: "Where should I stay while I house hunt?", a: "Choose a furnished short stay or hotel in the neighborhood you most want to test. Living there for a week tells you more than a map will." },
      { q: "Do I need earthquake insurance?", a: "Standard California homeowners policies typically exclude earthquake damage, so coverage is a separate policy. Ask an insurance agent for a quote before you write an offer." },
      { q: "When do I become a California tax resident?", a: "It depends on facts such as where you live and where you intend to stay. Talk to a CPA who handles both states. This guide is not tax or legal advice." },
      { q: "How early should I contact an agent before I fly out?", a: "Before you book flights. The first call shapes your shortlist, and the shortlist decides which neighborhoods you tour." },
    ],
  },
  {
    slug: "cost-of-living-los-angeles",
    title: "Cost of Living in Los Angeles: What You Really Need to Earn",
    seoTitle: "Cost of Living in Los Angeles: What You Need to Earn",
    description:
      "What does it cost to live in Los Angeles? See 2026 numbers for renters and owners, neighborhood prices, and LA vs Austin and Nashville.",
    date: "November 19, 2026",
    iso: "2026-11-19",
    tag: "Relocation",
    excerpt:
      "The cost of living in Los Angeles depends on one choice more than any other: whether you rent or own. A single adult covering basic needs in LA County needs about $60,000 a year before taxes, but buying a typical LA metro home takes roughly $255,000 to $273,000 in household income.",
    img: "/assets/listings/representative-hollywood-hills.jpg",
    imgAlt: "Hillside homes in the Hollywood Hills, Los Angeles",
    body: [
      { k: "p", t: "The cost of living in Los Angeles depends on one choice more than any other: whether you rent or own. A single adult covering basic needs in LA County needs about $60,000 a year before taxes, but buying a typical LA metro home takes roughly $255,000 to $273,000 in household income. This guide shows both numbers, the property tax, insurance and upkeep costs most guides skip, and how LA compares with Austin and Nashville." },

      { k: "h2", t: "Cost of Living in Los Angeles at a Glance" },
      { k: "p", t: "Cost of living data comes from several sources that measure different things. This table names the source and date for each line." },
      {
        k: "table",
        head: ["Category", "Los Angeles figure", "Source and date"],
        rows: [
          ["Housing, renting", "Typical rent $2,913 a month (metro)", "Zillow, Oct 2026"],
          ["Housing, owning", "Typical home value $950,752 (metro)", "Zillow, Oct 2026"],
          ["Transportation", "$14,497 a year per household", "BLS, 2023-24"],
          ["Groceries", "$6,546 a year at home, plus $5,312 eating out", "BLS, 2023-24"],
          ["Utilities", "California electricity rates run nearly double the U.S. average", "NBC Los Angeles, citing the state Legislative Analyst’s Office, Jan 2025"],
          ["Taxes", "State income tax 1% to 12.3%, plus 1% over $1 million; sales tax 10.25%", "NerdWallet; CDTFA, effective Oct 1, 2026"],
          ["Insurance", "Homeowners about $2,265 a year (benchmark policy)", "NerdWallet, May 2026"],
        ],
      },
      { k: "p", t: "The BLS figures cover the wider metro area, which includes Los Angeles, Orange, Riverside and San Bernardino counties. The average household there spent $90,594 a year in 2023-24, against $77,907 nationally. Housing took 36.6% of that budget." },
      { k: "p", t: "Housing is where Los Angeles stands apart. The Bureau of Economic Analysis puts overall LA prices 13.6% above the U.S. average in 2024, but housing rents sit 70% above it." },

      { k: "h2", t: "What a Single Adult Needs to Earn" },
      { k: "p", t: "MIT estimates that a single adult with no children in LA County needs $60,161 a year before taxes, or $28.92 an hour. MIT frames that as a minimum for basic needs, not a comfortable budget." },
      { k: "p", t: "The budget includes $22,471 for housing, $8,681 for transportation, $4,463 for food and $3,255 for health care. It also includes $10,906 in taxes." },
      { k: "p", t: "The housing line works out to about $1,870 a month, well below what new renters see. Zillow puts typical asking rent at $2,913, and a renter who keeps rent near 30% of income would need about $117,000." },
      { k: "p", t: "The Census Bureau explains part of the gap. Median gross rent in LA County was $1,954 for 2020 to 2024, a figure that includes long-running leases signed at older prices." },

      { k: "h2", t: "The Owner’s View: Property Tax, Insurance and Maintenance" },
      { k: "p", t: "Most cost of living guides stop at rent. Owners face three more bills: property tax, insurance and upkeep." },
      { k: "h3", t: "Property tax" },
      { k: "p", t: "Prop 13 caps the base property tax rate at 1% of assessed value, and the County’s FY 2025-26 tax resolution confirms that countywide levy. Voter-approved bonds add to it, which puts many City of Los Angeles bills near 1.2%." },
      { k: "p", t: "A sale resets the assessed value to your purchase price, and the value can rise only 2% a year after that. A few historic homes also carry Mills Act contracts that lower the bill, which our [Mills Act guide](/journal/mills-act-los-angeles) explains." },
      { k: "h3", t: "Insurance" },
      { k: "p", t: "NerdWallet’s May 2026 analysis puts a typical Los Angeles policy at $2,265 a year for $400,000 of dwelling coverage on a 1984 home. That is a benchmark, not a quote." },
      { k: "p", t: "Hillside and fire-zone homes can cost far more, and many owners rely on the California FAIR Plan. Its rates rose an average of 29.1% on October 15, 2026. Our guide to [buying a hillside home in the Hollywood Hills](/journal/buying-a-hillside-home-in-the-hollywood-hills) covers fire zones and insurance quotes in detail." },
      { k: "h3", t: "Maintenance" },
      { k: "p", t: "Many planners budget about 1% of a home’s value each year for repairs and upkeep. On a $950,752 home, that is roughly $9,500." },
      { k: "p", t: "Older homes cost more to keep up, and homes in historic districts need approval for exterior work. Both points are covered in the HPOZ section of our [Mills Act guide](/journal/mills-act-los-angeles)." },
      { k: "h3", t: "What it adds up to" },
      { k: "p", t: "Here is a typical new buyer in October 2026." },
      {
        k: "table",
        head: ["Monthly cost", "Amount"],
        rows: [
          ["Mortgage principal and interest ($190,150 down, 7.33%)", "$5,230"],
          ["Property tax (about 1.2% of price)", "$951"],
          ["Homeowners insurance (benchmark)", "$189"],
          ["**Core payment**", "**$6,370**"],
          ["Maintenance (1% rule of thumb)", "$792"],
          ["**All-in monthly cost**", "**$7,162**"],
        ],
      },
      { k: "p", t: "Assumptions: 20% down on Zillow’s $950,752 typical metro value, a 30-year fixed rate of 7.33% (Freddie Mac’s October average, as reported by Zillow), and the NerdWallet insurance benchmark." },
      { k: "p", t: "A common guideline keeps housing costs at 28% to 30% of gross income. At that range, the $6,370 core payment points to about $255,000 to $273,000 in yearly household income. A rate 0.8 points lower would trim that by about $18,000." },
      { k: "p", t: "Existing owners live in a different Los Angeles. The Census Bureau reports median monthly owner costs of $3,160 for LA County homeowners with a mortgage in 2020 to 2024, about half the new-buyer figure above. Median household income was $90,112, roughly a third of what a new buyer needs." },

      { k: "h2", t: "Los Angeles Neighborhood Affordability Range" },
      { k: "p", t: "Los Angeles is not one market. Typical home values run from under $600,000 to well over $3 million, and property tax moves with them." },
      {
        k: "table",
        head: ["Area", "Typical value", "Est. yearly property tax (about 1.2%)", "Source"],
        rows: [
          ["Downtown LA", "$565,120", "$6,800", "Zillow, Jun 2026"],
          ["South LA (ZIP 90003)", "$608,119", "$7,300", "Zillow, Jun 2026"],
          ["Lincoln Heights (ZIP 90031)", "$805,983", "$9,700", "Zillow, Jun 2026"],
          ["Mid-City", "$1,014,482", "$12,200", "Zillow, Jun 2026"],
          ["Echo Park", "$1,114,759", "$13,400", "Zillow, Jun 2026"],
          ["Silver Lake and Echo Park (ZIP 90026)", "$1,173,800", "$14,100", "Zillow, Jun 2026"],
          ["Mar Vista", "$1,855,319", "$22,300", "Zillow, Jun 2026"],
          ["Los Feliz", "$1,919,869", "$23,000", "Zillow, Jun 2026"],
          ["Hollywood Hills", "about $2.9 million (median list price)", "about $35,000", "[Alexandra’s Hollywood Hills guide](/journal/5-things-to-know-before-buying-a-hollywood-hills-home)"],
          ["Windsor Square and Hancock Park area", "$3.6 million to $7.8 million (recent sales)", "$44,000 to $93,000", "[Alexandra’s portfolio](/properties)"],
          ["Sunset Strip", "about $3 million (condos) to over $20 million", "varies", "[Alexandra’s Sunset Strip guide](/journal/luxury-real-estate-for-sale-sunset-strip)"],
        ],
      },
      { k: "p", t: "Zillow’s Home Value Index covers all home types, so condos pull some neighborhood figures down. Property tax estimates apply to new buyers. Long-time owners pay less." },
      { k: "p", t: "The spread matters more than any average. A buyer in Lincoln Heights and a buyer in Los Feliz face property tax bills about $13,000 apart." },
      { k: "p", t: "For more detail, see our neighborhood pages for [Silver Lake](/neighborhoods/silver-lake), [Hollywood Hills](/neighborhoods/hollywood-hills), [Hancock Park](/neighborhoods/hancock-park), [Windsor Square](/neighborhoods/windsor-square) and [Sunset Strip](/neighborhoods/sunset-strip). Our guide to the [wealthiest neighborhoods in Los Angeles](/journal/wealthiest-neighborhoods-in-los-angeles) covers the top of the range." },

      { k: "h2", t: "Cost of Living Los Angeles vs Austin and Nashville" },
      { k: "p", t: "Many LA owners compare their costs with Austin and Nashville before they sell. The table below uses the same sources and the same buyer assumptions for all three metros." },
      {
        k: "table",
        head: ["Measure", "Los Angeles", "Austin", "Nashville"],
        rows: [
          ["Overall price level (BEA 2024, U.S. = 100)", "113.6", "98.1", "96.3"],
          ["Housing rent index (BEA 2024)", "170.4", "120.4", "104.6"],
          ["Typical home value (Zillow, Oct 2026)", "$950,752", "$410,026", "$446,749"],
          ["Typical rent (Zillow, Oct 2026)", "$2,913", "$1,584", "$1,787"],
          ["Property tax on a typical home (estimate)", "about $11,400", "about $6,700", "about $3,100"],
          ["Insurance benchmark (NerdWallet, May 2026)", "$2,265", "$3,405", "$4,220 (Tennessee average)"],
          ["State income tax on wages", "1% to 12.3%", "None", "None"],
          ["Income to buy a typical home at 28% to 30% (our estimate)", "$255,000 to $273,000", "$124,000 to $133,000", "$123,000 to $132,000"],
        ],
      },
      { k: "p", t: "BEA’s housing index tracks tenants’ rents only, so it understates owner costs." },
      { k: "h3", t: "Cost of Living Los Angeles vs Austin" },
      { k: "p", t: "LA’s overall price level runs about 16% above Austin’s, and the gap is mostly housing. A typical LA home costs about 2.3 times Austin’s, and typical rent runs 84% higher." },
      { k: "p", t: "Texas has no state income tax, but its property tax is heavier. A $500,000 homestead inside Austin city limits owes about $8,215 a year in 2026. Alexandra’s guide to [moving from Los Angeles to Austin](/journal/moving-from-los-angeles-to-austin) makes the sale side of the move clear: what your LA home sells for matters more than the move itself." },
      { k: "h3", t: "Cost of Living Los Angeles vs Nashville" },
      { k: "p", t: "LA’s overall price level runs about 18% above Nashville’s. A typical LA home costs about 2.1 times Nashville’s, and typical rent runs 63% higher." },
      { k: "p", t: "Tennessee has no wage income tax, and Metro Nashville’s 2026 rate of $2.814 per $100 applies to assessments set at 25% of appraised value. That works out to about 0.70% of a home’s value. Insurance is where LA comes out cheaper, but LA’s tax-and-insurance bill is still the highest of the three, at about $13,700 a year on a typical home against $10,100 in Austin and $7,400 in Nashville. See Alexandra’s guide to [moving from Los Angeles to Nashville](/journal/moving-from-los-angeles-to-nashville) for the full picture." },

      { k: "faq" },

      { k: "h2", t: "Plan Around the Real Cost of Living in Los Angeles" },
      { k: "p", t: "The cost of living in Los Angeles is two numbers: a renter’s number near $60,000 to $117,000, and a new buyer’s number above $250,000. Your neighborhood, insurance quote and mortgage rate move the owner number more than any average does." },
      { k: "p", t: "Moving to or from Los Angeles? Start with our [relocation page](/relocation), then contact Alexandra Kerr at [310.795.1440](tel:+13107951440) or through the [contact page](/contact). Alexandra is an Estates Director at Compass with 13 years in Los Angeles real estate, and she will run your owner numbers before you make a move. If you are selling to relocate, start with a [home valuation](/home-valuation)." },
    ],
    faq: [
      { q: "What does a family of four need to earn in Los Angeles?", a: "MIT puts it at $33.83 an hour for each of two working parents with two children, or about $140,735 combined before taxes. If only one parent works, the figure is $50.03 an hour, or about $104,067. Child care alone costs $26,634 a year in MIT’s model." },
      { q: "Is Los Angeles getting cheaper?", a: "Partly. BEA’s housing rent index for the LA metro fell from 183.6 in 2020 to 170.4 in 2024. But Zillow’s October 2026 data shows LA rents up 2.1% over a year and home values up 0.8%. Zillow also reports the typical U.S. mortgage payment up 12.8% from a year ago, because mortgage rates averaged 7.33% in October." },
      { q: "What costs surprise new buyers after closing?", a: "The County reassesses the home at your purchase price and bills the difference as a supplemental tax, on top of your regular bill. The Auditor-Controller’s taxpayers’ guide explains how supplemental assessments work. Budget for it, along with your first insurance payment." },
      { q: "Why do cost of living sites show different numbers?", a: "They measure different things. BEA compares price levels for a fixed basket, MIT estimates a minimum budget by county, BLS tracks what households actually spend, and Zillow tracks asking rents and home values. Pick the source that matches your question." },
    ],
  },
  {
    slug: "mills-act-los-angeles",
    title: "Mills Act Los Angeles: How the Property Tax Break Works",
    seoTitle: "Mills Act Los Angeles: How the Property Tax Break Works",
    description:
      "The Mills Act in Los Angeles can lower property taxes on historic homes. See who qualifies, how savings work, and what buyers and sellers should check.",
    date: "November 18, 2026",
    iso: "2026-11-18",
    tag: "Buying",
    excerpt:
      "The Mills Act in Los Angeles can cut the property tax on a historic home by thousands of dollars a year. The City has not opened a new application cycle since 2020, so the practical question for most buyers is whether the home they want already has a contract.",
    img: "/assets/listings/s1-windsor414.jpg",
    imgAlt: "Historic home on South Windsor Boulevard in Windsor Square, Los Angeles",
    body: [
      { k: "p", t: "The Mills Act in Los Angeles can cut the property tax on a historic home by thousands of dollars a year. The City has not opened a new application cycle since 2020, so the practical question for most buyers is whether the home they want already has a contract. This guide covers how the program works, who qualifies, what a contract requires, and what to check before you buy or sell." },

      { k: "h2", t: "What the Mills Act Is and Who It Helps" },
      { k: "p", t: "California passed the Mills Act in 1972, and Los Angeles started its own program in 1996. City Planning calls it the city’s primary financial incentive for historic preservation. As of 2022, the City had about 947 contracts, the largest program in the state." },
      { k: "p", t: "Here is how it works. The owner signs a contract and agrees to rehabilitate and maintain the home. The contract renews every year, so it always has ten years left, and it stays with the property when the home sells." },
      { k: "p", t: "In return, the County Assessor values the home differently. Instead of market value, the Assessor uses an income approach based on what the home could rent for. Each year the Assessor compares three numbers: the Prop 13 base-year value, the current market value, and the Mills Act value. The lowest one sets your tax bill." },
      { k: "p", t: "That rule decides who benefits. Recent buyers and owners who just invested in the house often see real savings. An owner who bought decades ago may already have a Prop 13 value below the Mills Act value, and the City’s FAQ says that owner would see no reduction." },

      { k: "h2", t: "Mills Act Los Angeles Eligibility: Monuments and HPOZ Contributors" },
      { k: "p", t: "In the City of Los Angeles, a property qualifies if it is a Historic-Cultural Monument or a contributing property in an approved HPOZ. A non-contributing house inside an HPOZ does not qualify. You can check any address on the City’s ZIMAS map." },
      { k: "p", t: "For new applications, the City also set assessed-value limits: $1.5 million for a single-family home and $3 million for multi-family, commercial, or industrial property. Owners above those limits needed an exemption and a Historic Structure Report." },
      { k: "h3", t: "Is the program open right now?" },
      { k: "p", t: "No. City Planning has not accepted new contract applications while it reviews the program. A 2022 assessment found too little staff and funding to run it well, and it found that most savings go to owners in higher-opportunity neighborhoods." },
      { k: "p", t: "In March 2025, the City released draft changes. They include wider eligibility for National Register and California Register properties. The LA Conservancy reports that budget problems put many of those changes on hold. In December 2025, the City Council approved a new annual maintenance fee that began February 23, 2026." },
      { k: "p", t: "As of November 2026, no reopening date has been announced. Some draft ideas, such as not renewing older contracts, would affect current holders. Anyone buying a contract home should check the City’s program page for updates." },

      { k: "h2", t: "How Much Can the Mills Act Save? A Worked Example" },
      { k: "p", t: "The Assessor’s formula is simple on paper. Take the home’s estimated annual net income and divide it by a capitalization rate. The result is the Mills Act value." },
      { k: "p", t: "For an owner-occupied single-family home, the rate adds four parts. They are an interest component set each year by the State Board of Equalization, a 4% historic property risk component, a property tax component, and an amortization component. The 2026 interest component is 6.50%." },
      { k: "p", t: "Here is a simplified example. The numbers are illustrative, not a quote." },
      {
        k: "table",
        head: ["Step", "Amount"],
        rows: [
          ["Purchase price (new Prop 13 value)", "$3,000,000"],
          ["Tax on that value at 1%", "$30,000"],
          ["Estimated net income", "$109,000"],
          ["Cap rate (6.50% + 4.00% + 1.00% + 0.60%)", "12.10%"],
          ["Mills Act value ($109,000 ÷ 0.121)", "about $900,000"],
          ["Tax on that value at 1%", "about $9,000"],
          ["**Estimated yearly savings**", "**about $21,000**"],
        ],
      },
      { k: "p", t: "The Mills Act value is the lowest of the three, so it sets the bill. The 0.6% amortization figure comes from a sample City Planning worksheet. The Assessor sets the real number for each property." },
      { k: "p", t: "Three limits apply. Only the 1% general levy drops, and special district assessments stay the same. The Assessor also revalues every year, so taxes can rise slightly. Your actual figure comes from the County Assessor, not from this table." },

      { k: "h2", t: "Contract Obligations, Inspections and Renewal" },
      { k: "p", t: "A Mills Act contract is a promise to maintain the house, not just a tax break. Each contract includes a rehabilitation and maintenance plan with cost estimates, and the work must follow the Secretary of the Interior’s Standards for Rehabilitation. City review covers the interior and the exterior, which is stricter than HPOZ review." },
      { k: "p", t: "Owners can reorder the work with the Office of Historic Resources (OHR), but they cannot skip it. State law requires an inspection every five years. If an inspection finds a problem, the City sends a notice and allows 30 days to fix it or agree on a plan." },
      { k: "p", t: "City Planning says about 20 percent of inspected properties may not be fully compliant. That makes the contract a real part of ownership. Uncorrected breaches can lead to cancellation by the City Council, with a penalty of 12.5% of the home’s current fair market value." },
      { k: "p", t: "A non-renewal starts a ten-year wind down. After that the contract ends and the home returns to standard Prop 13 assessment." },
      { k: "p", t: "Since February 23, 2026, the City also charges an annual maintenance fee. It is $675 for residential properties with one to four units. The Conservancy notes it applies only to contracts signed after 2014, about 246 contracts." },

      { k: "h2", t: "Buying a Home That Already Has a Mills Act Contract" },
      { k: "p", t: "The contract binds every future owner, so a buyer inherits both the tax savings and the work. You do not apply for anything. A sale resets the Prop 13 base value to your price, and the Assessor then runs the Mills Act formula. The City says the program helps recent buyers most for that reason." },
      { k: "p", t: "City guidance tells sellers to disclose the contract fully, along with the work finished and the work still open. Buyers should read the contract before agreeing to it. Ask for these records early:" },
      {
        k: "ol",
        items: [
          "The recorded Mills Act contract and rehabilitation plan",
          "OHR inspection reports and any compliance letters",
          "A list of completed and remaining work, with deadlines",
          "The current tax bill, plus the Assessor’s Mills Act calculation",
          "The permit history from the Department of Building and Safety, with unpermitted work flagged",
          "The home’s HPOZ or monument status and the district’s Preservation Plan",
          "A cost estimate for remaining work from a contractor who knows historic homes",
          "The contract’s signing date, to see whether the annual fee applies",
        ],
      },
      { k: "p", t: "Do not use the seller’s tax bill as your forecast. It reflects their base year, not yours." },

      { k: "h2", t: "Finding Historic Homes for Sale in Los Angeles" },
      { k: "p", t: "Start where the districts cluster. [Hancock Park](/neighborhoods/hancock-park) and [Windsor Square](/neighborhoods/windsor-square) are both HPOZs, and Windsor Square became one in 2005. Whitley Heights, a Mediterranean-style hillside district near the Hollywood Bowl, has been an HPOZ since 1992 and sits in the [Hollywood Hills](/neighborhoods/hollywood-hills)." },
      { k: "p", t: "Historic does not only mean 1920s. The City sets no minimum age for monument status, so mid-century homes can qualify too. Our [mid-century buyer’s guide](/journal/mid-century-modern-homes-los-angeles) covers that side of the market." },
      { k: "p", t: "MLS listings do not always flag contract status. Ask your agent to check title and City records before you tour. Many Windsor Square homes sell through relationships before they reach the MLS, so it helps to have an agent who hears early. You can [browse the portfolio](/properties) or run a [home search](/home-search) to start." },

      { k: "h2", t: "HPOZ Los Angeles Explained: Remodel Rules for Historic Districts" },
      { k: "p", t: "An HPOZ is a local historic district added to a neighborhood’s zoning. Los Angeles has more than 30, and each has its own Preservation Plan with design guidelines. The HPOZ remodel rules come down to one idea: all exterior work gets reviewed, including landscaping and paint." },
      { k: "p", t: "That applies even when no building permit is needed. Even replacing a single window pane needs approval. Work done without review can bring Building and Safety enforcement and fines." },
      { k: "p", t: "Your home’s survey status sets the review path. Contributing and “Contributing Altered” homes get the strictest review, and you can look yours up on ZIMAS. Three paths cover most projects:" },
      {
        k: "ul",
        items: [
          "**Conforming Work:** routine maintenance, paint color, and landscaping. Staff approve it in about 3 to 21 days, and minor work has no fee.",
          "**Certificate of Appropriateness:** significant exterior work on a contributing home, including additions. It can take up to 75 days, and there is a 15-day appeal period.",
          "**Certificate of Compatibility:** new buildings, replacements, and demolition. The timeline matches the Certificate of Appropriateness.",
        ],
      },
      { k: "p", t: "Each district’s HPOZ Board meets twice a month and advises City Planning. Its volunteer members often suggest cost-effective repairs and craftspeople who know period homes." },
      { k: "p", t: "One buyer warning matters here. Unpermitted work must go before the Board, and if it cannot be made to comply, the owner may be told to restore the original condition. A hillside district adds its own checks too, covered in our guide to [buying a hillside home in the Hollywood Hills](/journal/buying-a-hillside-home-in-the-hollywood-hills)." },
      { k: "p", t: "An HPOZ also offers no financial incentive of its own. The Mills Act was the tool for that." },

      { k: "h2", t: "Historic-Cultural Monument Designation in Los Angeles" },
      { k: "p", t: "A Historic-Cultural Monument is an individual landmark protected under the City’s Cultural Heritage Ordinance, first adopted in 1962. Anyone can nominate a property, and the owner does not have to agree. The nomination moves from the Office of Historic Resources to the five-member Cultural Heritage Commission, then to the City Council." },
      { k: "p", t: "Once an application is complete, the owner is notified and a temporary stay is placed on demolition and significant alteration permits. That makes a pending nomination worth checking before you make an offer." },
      { k: "p", t: "Designation brings real benefits. It opens eligibility for the Mills Act, though the program is paused today. It also allows use of the California Historical Building Code and a bronze plaque, and it puts alterations under review against the Secretary of the Interior’s Standards." },
      { k: "p", t: "Designation is not a permanent shield. The Commission can delay a demolition permit for up to 180 days, with another 180 if the Council approves. Read the City’s monument FAQ and designation process for the full steps." },

      { k: "h2", t: "Selling a Historic Home in Los Angeles" },
      { k: "p", t: "Start with the records. Gather the Mills Act contract if one exists, inspection letters, permit history, and the district’s Preservation Plan. Buyers of historic homes ask for these early." },
      { k: "p", t: "Disclose the contract and document what work is done and what remains. Let buyers confirm the tax numbers with the Assessor, because your bill reflects your base year. Do not cancel a contract to simplify the sale, since the penalty is 12.5% of fair market value." },
      { k: "p", t: "Price with the right comparable sales. Match on district, style, original details, and condition, because an intact period home and a heavily remodeled one do not compare well. Alexandra’s [recent results](/properties) include homes on South Windsor Boulevard, South Rossmore Avenue, and McCadden Place." },
      { k: "p", t: "Plan your prep around review times. Exterior paint and landscaping in an HPOZ need approval before work starts. If you use [Compass Concierge](/compass-concierge) to cover pre-sale costs, scope the work so City review fits your listing date. A [home valuation](/home-valuation) is a good first step." },

      { k: "faq" },

      { k: "h2", t: "Before You Buy or Sell a Historic Home" },
      { k: "p", t: "The Mills Act in Los Angeles rewards owners who care for a historic home, but it is closed to new applicants for now. That makes the existing contract, the district rules, and the permit history the three things to read before you write or accept an offer. Watch the City’s Mills Act page, because a reopening would change how much designation matters." },
      { k: "p", t: "Thinking about a historic home? Contact Alexandra Kerr at [310.795.1440](tel:+13107951440) or through the [contact page](/contact). She will walk you through the contract, the district rules, and the numbers before you make a move." },
    ],
    faq: [
      { q: "Is the City’s program the same as Los Angeles County’s?", a: "No. The County’s program covers only unincorporated areas. Homes inside the City of Los Angeles go through City Planning’s Office of Historic Resources." },
      { q: "Can I add a room or guesthouse to a Mills Act home?", a: "Yes, if the design follows the Secretary of the Interior’s Standards and gets approval. The Assessor values new construction on a blended basis, so additions earn less tax reduction, and a large one can erase the savings. Talk to the Assessor before you draw plans." },
      { q: "Can I replace old windows or add solar panels?", a: "The City reviews both case by case. Double-pane units rarely match thin wood divided-light windows, and solar works best where the street cannot see it. City Planning also notes that wall and roof insulation often does more for energy bills than new windows." },
      { q: "Does an HPOZ help or hurt resale value?", a: "City Planning says homes in historic districts tend to appreciate faster than similar homes outside them, citing national studies. The tradeoff is added review, and some projects may not be allowed. An agent who sells in the district can show you how local buyers weigh both sides." },
    ],
  },
  {
    slug: "mid-century-modern-homes-los-angeles",
    title: "Mid-Century Modern Homes in Los Angeles: A Buyer's Guide",
    seoTitle: "Mid-Century Modern Homes in Los Angeles: Buyer's Guide",
    description:
      "Buying a mid-century modern home in Los Angeles? Learn the architects, best neighborhoods, inspection red flags and historic rules from a local agent.",
    date: "November 2, 2026",
    iso: "2026-11-02",
    tag: "Buying",
    excerpt:
      "Mid-century modern homes in Los Angeles were built roughly between 1945 and 1970, with flat or low roofs, walls of glass and open floor plans. The best known sit in the Hollywood Hills, Silver Lake, Los Feliz and Mar Vista, and many were designed by architects like John Lautner, Pierre Koenig and Gregory Ain. This guide shows how to spot an authentic one, what to inspect, and how historic rules and insurance can affect your plans.",
    img: "/journal/mid-century-modern-home-los-angeles.jpg",
    imgAlt: "Mid-century modern house with a stone wall, breeze-block screen and palm trees",
    body: [
      { k: "p", t: "Figures reflect the latest public data found on October 31, 2026. Each one shows its source and date. This is general information, not financial or legal advice." },

      { k: "h2", t: "What counts as a mid-century modern home?" },
      { k: "p", t: "A mid-century modern home is a house from about 1945 to 1970 that follows a clear set of design ideas. Look for these traits:" },
      {
        k: "ul",
        items: [
          "Flat or low-slope roofs with wide overhangs",
          "Walls of glass and high clerestory windows",
          "Open floor plans, usually on one level",
          "Post-and-beam structure, which frees the walls to hold glass",
          "A link to the outdoors, through patios, courtyards or pools, with natural wood, stone and brick inside",
        ],
      },
      { k: "p", t: "Los Angeles became the center of the style because of its mild climate and the Case Study House Program. The program, run by Arts & Architecture magazine from 1945 to 1966, asked architects to design modern homes for the postwar era." },
      { k: "h3", t: "How can you tell an authentic one from a remodel?" },
      { k: "p", t: "Start with the paperwork. Ask who designed the house, whether the original plans exist, and what the permit history shows." },
      { k: "p", t: "Then look at the house itself. Original clerestory windows, built-in cabinets and exposed beams are good signs. A house built last year in a mid-century style is a modern home, not a mid-century one, and an older house with a chopped-up floor plan has lost part of what buyers pay for." },

      { k: "h2", t: "Who designed the best mid-century modern homes in Los Angeles?" },
      { k: "p", t: "A handful of architects shaped the style in Los Angeles, and their houses still define neighborhoods like Silver Lake and the Hollywood Hills." },
      {
        k: "table",
        head: ["Architect", "Known for", "Where to look"],
        rows: [
          ["John Lautner", "Sculptural houses such as Silvertop (1957), the Chemosphere (1960) and the Garcia House (1962)", "Silver Lake and the Hollywood Hills"],
          ["Pierre Koenig", "Steel-and-glass Case Study Houses, including the Stahl House (1960)", "Hollywood Hills (Woods Drive)"],
          ["Richard Neutra", "The Neutra Colony (1948 to 1961) and the VDL Research House", "Silver Lake (Silver Lake Blvd, Neutra Place, Earl St)"],
          ["Gregory Ain", "Affordable modern housing, including the Mar Vista Tract (1948) and Avenel Cooperative Housing", "Mar Vista and Silver Lake"],
        ],
      },
      { k: "p", t: "Most of these are private homes, so view them respectfully from the street. Houses by these architects reach the market only occasionally, which is why alerts and agent relationships matter." },
      { k: "h3", t: "Are Richard Neutra homes for sale mid-century?" },
      { k: "p", t: "Some are, and some are not. Neutra's career began before the mid-century period, and his Lovell Health House in Los Feliz dates to 1929." },
      { k: "p", t: "When you search for Richard Neutra homes for sale, check the year first. A 1929 house and a 1950s house need different inspections and may follow different rules." },
      { k: "h3", t: "What about John Lautner homes in Los Angeles?" },
      { k: "p", t: "John Lautner homes tend to be bold, sculptural and tied closely to their sites. Silvertop overlooks the Silver Lake reservoir, and the Chemosphere sits on a steep Hollywood Hills slope." },
      { k: "p", t: "Because the structures are unusual, buyers should expect specialist inspections, and an engineer familiar with the architect's work is worth hiring." },

      { k: "h2", t: "What makes a home architecturally significant?" },
      { k: "p", t: "Architecturally significant homes share at least one of these traits:" },
      {
        k: "ul",
        items: [
          "They were designed by a recognized architect",
          "They show a style or period in a clear, well-preserved way",
          "They keep their original features, plans and materials",
          "They hold an official status, such as Historic-Cultural Monument, a Historic Preservation Overlay Zone (HPOZ) or the National Register of Historic Places",
        ],
      },
      { k: "p", t: "The Stahl House shows how the levels stack up. The City of Los Angeles named it a Historic-Cultural Monument in 1999, and it joined the National Register of Historic Places in 2013." },

      { k: "h2", t: "Where are the best neighborhoods for mid-century modern homes?" },
      { k: "p", t: "Four areas stand out, and each one buys you something different." },
      {
        k: "ul",
        items: [
          "**Hollywood Hills.** The Stahl House and the Chemosphere are here, and glass houses on steep lots are the signature. Slope, access and insurance decide whether a view house is a good purchase, so read our guides on [what to know before buying a Hollywood Hills home](/journal/5-things-to-know-before-buying-a-hollywood-hills-home) and [buying a hillside home](/journal/buying-a-hillside-home-in-the-hollywood-hills). You can also browse [Hollywood Hills homes for sale](/neighborhoods/hollywood-hills).",
          "**Silver Lake.** Silvertop, the Neutra Colony and Avenel Cooperative Housing are all here. Hillside lots reward buyers who can read a slope and a permit history, because a charming house can hide an expensive foundation or drainage problem. See [Silver Lake homes for sale](/neighborhoods/silver-lake).",
          "**Los Feliz.** The neighborhood mixes eras, from Lloyd Wright and Neutra to later modern houses on the same winding streets. Browse [Los Feliz homes for sale](/neighborhoods/los-feliz).",
          "**Mar Vista.** Gregory Ain designed the 52 homes of the Mar Vista Tract in 1948, marketed as \"Modernique Homes.\" In 2003 it became the city's first post-World War II HPOZ, according to the City of Los Angeles. Alexandra also serves clients in Mar Vista and Echo Park, where a smaller number of mid-century homes sit among older bungalows. See the [full list of areas she covers](/neighborhoods).",
        ],
      },

      { k: "h2", t: "What should you inspect before buying a mid-century modern home?" },
      { k: "p", t: "Plan for specialist checks, because the features buyers love are the same ones that need care. Here is what to look at in order of priority." },
      { k: "h3", t: "Roof and glass" },
      { k: "p", t: "Flat and low-slope roofs need steady attention to drainage and flashing. A leak near a large glass wall can cause hidden rot." },
      { k: "p", t: "Original single-pane glass in metal frames is common. Replacing large fixed windows with efficient glass while keeping the look can be expensive, so get quotes before you offer." },
      { k: "h3", t: "Structure and systems" },
      { k: "p", t: "Post-and-beam structures can often be strengthened for earthquakes without changing how the house looks. Ask whether any bracing or retrofit work has been done, and whether it was permitted." },
      { k: "p", t: "Original heating, wiring and plumbing may still be in place. Some mid-century homes have aluminum wiring, and older finishes can contain asbestos, so ask a licensed inspector to check both." },
      { k: "h4", t: "Red flags at a showing" },
      {
        k: "ul",
        items: [
          "Ceiling stains or soft spots near glass and roof edges",
          "Standing water on a flat roof",
          "Cracks in a slab floor or in retaining walls",
          "A floor plan that has been chopped up or enclosed",
          "New work with no permit papers",
        ],
      },
      { k: "h4", t: "Questions for the seller" },
      {
        k: "ul",
        items: [
          "Who was the architect or builder, and are original plans available?",
          "When was the roof last replaced, and by whom?",
          "Can you share permits and final inspections for additions, decks and walls?",
          "Has the lot had any drainage, slope or foundation repairs?",
        ],
      },
      { k: "h4", t: "Experts to call" },
      {
        k: "ul",
        items: [
          "A home inspector for the whole house",
          "A roofer who works on flat and low-slope roofs",
          "A structural engineer for beams, walls and retrofits",
          "A geotechnical engineer for steep lots",
          "A sewer camera inspector, since the line to the street is usually the owner's job",
        ],
      },
      { k: "p", t: "Buying a mid-century modern home goes best when these checks happen before your contingencies end. Ask your agent to confirm the dates in your contract." },

      { k: "h2", t: "How do historic rules affect a mid-century home?" },
      { k: "p", t: "Historic status can limit what you change on the outside, and it can also add value. Check the property's status before you plan a remodel." },
      { k: "p", t: "An HPOZ adds review for exterior changes. The Mar Vista Tract is one example, and a board reviews work there to protect the original design." },
      { k: "p", t: "A Historic-Cultural Monument or National Register listing adds its own rules and, in some cases, tax options. Some designated homes may qualify for the Mills Act property tax program, so confirm eligibility with the city's Office of Historic Resources before you count on it." },
      { k: "p", t: "Pull the permit history from the Los Angeles Department of Building and Safety (LADBS) and compare it with what you see. Unpermitted work can slow your loan, your insurance and your resale." },

      { k: "h2", t: "How much do mid-century modern homes cost, and what about insurance?" },
      { k: "p", t: "Prices swing widely by neighborhood, architect and condition. These snapshots show the area medians, which cover all homes and not only mid-century ones." },
      {
        k: "table",
        head: ["Neighborhood", "Mid-century highlights", "Price snapshot (all home types)"],
        rows: [
          ["Hollywood Hills", "Stahl House, Chemosphere, Garcia House", "About $2.9M median list price (Ruby Home MLS data, Oct. 9, 2026)"],
          ["Los Feliz", "Mix of eras, from 1929 modernism to later glass houses", "About $1.92M typical home value (Zillow, June 2026)"],
          ["Silver Lake", "Silvertop, Neutra Colony, Avenel Cooperative Housing", "About $1.46M median home value (Trulia, April 2026)"],
          ["Echo Park", "A smaller set of mid-century homes among older bungalows", "About $1.11M typical home value (Zillow, June 2026)"],
          ["Mar Vista", "Gregory Ain's Mar Vista Tract, 52 homes from 1948", "No reliable tract median found. Ask for sold prices on the exact street"],
        ],
      },
      { k: "p", t: "An architect-designed house often sells on a different scale than its neighborhood median. Ask for sold prices on the exact street, and for any recent sale of a house by the same architect." },
      { k: "p", t: "Insurance deserves an early look. Some insurers look closely at roof age, slope and drainage, and hillside homes may sit in a high fire hazard zone. Get a written quote before you remove contingencies." },
      { k: "p", t: "A standard homeowners policy does not cover earthquake damage. A separate earthquake policy is available, so ask a broker about it when you price your total costs." },

      { k: "h2", t: "What other architecturally significant homes can you buy in Los Angeles?" },
      { k: "p", t: "Mid-century is only one era. Los Angeles has several others, and each needs different care." },
      { k: "h3", t: "Lloyd Wright homes in Los Angeles" },
      { k: "p", t: "Lloyd Wright, the son of Frank Lloyd Wright, designed several Los Feliz houses in the 1920s. His work is far earlier than mid-century, and the houses are often sculptural and heavily detailed. Expect specialist repairs and closer review of any changes." },
      { k: "h3", t: "Craftsman homes in Los Angeles" },
      { k: "p", t: "Craftsman homes date mostly from the early 1900s through the 1920s. Look for low-pitched gables, deep eaves, wide porches and built-in cabinets." },
      { k: "p", t: "Silver Lake and Echo Park have many of them. Wood siding and trim need regular painting and pest care, and hillside lots can hide foundation and drainage problems." },
      { k: "h3", t: "Spanish Colonial Revival homes in Los Angeles" },
      { k: "p", t: "Spanish Colonial Revival homes were popular in the 1920s and 1930s. They usually have white stucco walls, red tile roofs and arched doors, and Los Feliz has many on its winding streets." },
      { k: "p", t: "Check the roof tile, the old plumbing and any additions, since older stucco homes often have layers of past repairs." },

      { k: "h2", t: "Why work with Alexandra Kerr on an architectural home?" },
      { k: "p", t: "Alexandra Kerr is a REALTOR, Estates Director and Senior Real Estate Specialist at Compass. Her focus is homes with history, character and distinctive architecture, and she has 13 years in Los Angeles real estate, 179 homes sold and $184 million in total sales. [More about Alexandra](/about)." },
      { k: "p", t: "She reads permit and property records with buyers before an offer is written, and she brings Compass private exclusives and off-market homes to the search. If you own a character home and plan to sell, start with a [home valuation](/home-valuation)." },

      { k: "faq" },

      { k: "h2", t: "Buying a mid-century modern home in Los Angeles" },
      { k: "p", t: "Mid-century modern homes in Los Angeles reward buyers who check the architect, the permits and the structure before they fall for the view. The same house can be a good purchase or a costly project depending on its roof, its glass and its history." },
      { k: "p", t: "If you want help finding or evaluating one, [schedule a consultation](/contact), [set up listing alerts](https://seda2.idxbroker.com/idx/usersignup), or call [(310) 795-1440](tel:+13107951440). You can also see which areas rank among the [wealthiest neighborhoods in Los Angeles](/journal/wealthiest-neighborhoods-in-los-angeles) before you narrow your search." },
    ],
    faq: [
      {
        q: "How do I find out who designed a house?",
        a: "Start with the permit history at LADBS and ask the listing agent for the original plans. The City of Los Angeles Office of Historic Resources and the Los Angeles Conservancy can also help you check a property's history and status.",
      },
      {
        q: "Will a mid-century home have high utility bills?",
        a: "It can. Original single-pane glass, thin insulation and older heating systems often cost more to run until they are upgraded. Ask the seller for recent utility bills before you offer.",
      },
      {
        q: "Is it harder to get a loan or appraisal on a one-of-a-kind home?",
        a: "It can be. Unusual homes have fewer similar sales, so appraisers may struggle to find good comparisons. Tell your lender early that the home is architecturally significant, and use our mortgage calculator to test your budget.",
      },
      {
        q: "Should I buy a restored home or an original one?",
        a: "A restored home costs more up front and may hide changes, so ask for permits and photos of the work. An original home may need new systems but keeps more of its character. In both cases, the inspection and the permit history matter more than the finish.",
      },
    ],
  },
  {
    slug: "wealthiest-neighborhoods-in-los-angeles",
    title: "Wealthiest Neighborhoods in Los Angeles: Beyond Beverly Hills",
    seoTitle: "Wealthiest Neighborhoods in Los Angeles: 2026 Price Guide",
    description:
      "See the wealthiest and most expensive neighborhoods in Los Angeles, with dated prices, recent sales and tips from a local Compass agent.",
    date: "November 1, 2026",
    iso: "2026-11-01",
    tag: "Buying",
    excerpt:
      "The wealthiest neighborhoods in Los Angeles sit on the Westside, where Bel Air, Pacific Palisades and Brentwood lead on income, and Beverly Hills and Holmby Hills lead on price. A second group of buyers skips the biggest lot and pays for architecture, history and a protected street, in places like Los Feliz, Hancock Park and Windsor Square. This guide covers both groups with dated numbers and recent sales, so you can see what each address really costs.",
    img: "/journal/beverly-hills-sign-beverly-gardens.jpg",
    imgAlt: "The Beverly Hills sign at Beverly Gardens Park",
    body: [
      { k: "p", t: "Figures reflect the latest public data found on October 31, 2026. Each one shows its source and date. This is general information, not financial advice." },

      { k: "h2", t: "Which are the wealthiest neighborhoods in Los Angeles?" },
      { k: "p", t: "\"Wealthy\" and \"expensive\" are two different questions, and most lists mix them up." },
      { k: "p", t: "Wealth is usually measured by household income. HomeSnacks' 2025 ranking of City of Los Angeles neighborhoods by median household income put Pacific Palisades first, followed by Bel Air, Beverly Glen and Brentwood." },
      { k: "p", t: "Price tells a different story. Beverly Hills, Bel Air and Holmby Hills make up the Platinum Triangle, where the largest estates and the highest price tags sit." },
      { k: "p", t: "The table below puts both groups next to the neighborhoods Alexandra Kerr works in every week. The numbers come from different sources, so read each row as a dated snapshot and not as an exact ranking." },
      {
        k: "table",
        head: ["Neighborhood", "Setting", "What buyers pay for", "Price snapshot"],
        rows: [
          ["Beverly Hills (90210)", "Its own city, west of Hollywood", "Estate size, address and privacy", "About $8.85M median list price (Realtor.com, March 2026)"],
          ["Holmby Hills", "Smallest corner of the Platinum Triangle", "Exclusivity and large lots", "Too few sales for a steady median. Redfin logged two sales in Nov. 2025, with a median of $11.6M"],
          ["Bel Air", "Hillside estates in the Santa Monica Mountains foothills", "Privacy, views and acreage", "About $4.14M typical home value (Zillow, Sept. 2026)"],
          ["[Sunset Strip](/neighborhoods/sunset-strip)", "Hillside above the Strip", "View corridor and access", "About $3M for a condo to over $20M for a hillside estate ([Alexandra's Sunset Strip guide](/journal/luxury-real-estate-for-sale-sunset-strip))"],
          ["[Windsor Square](/neighborhoods/windsor-square)", "Formal, tree-lined blocks", "An established address and privacy", "About $3.28M median sale price (Redfin, Nov. 2025)"],
          ["Pacific Palisades", "Coastal hills, still recovering from the 2025 fire", "Ocean proximity and lot size", "About $2.97M typical home value (Zillow, Sept. 2026)"],
          ["[Hollywood Hills](/neighborhoods/hollywood-hills)", "Canyons above the city", "View and quiet", "About $2.9M median list price (Ruby Home MLS data, Oct. 9, 2026)"],
          ["Brentwood", "Established Westside neighborhood next to Santa Monica", "Privacy and location", "About $2.83M typical home value (Zillow, Sept. 2026)"],
          ["[Hancock Park](/neighborhoods/hancock-park)", "Flat, wide, tree-lined streets", "Lot size and a protected streetscape", "About $2.0M median sale price (Redfin, Nov. 2025)"],
          ["[Los Feliz](/neighborhoods/los-feliz)", "Hillside streets below Griffith Park", "Pedigree and privacy", "About $1.92M typical home value (Zillow, June 2026)"],
        ],
      },
      { k: "p", t: "Medians include condos and smaller homes, so they sit well below what the best houses sell for. The sections below show that gap." },

      { k: "h2", t: "What are the most expensive neighborhoods in Los Angeles?" },
      { k: "p", t: "Beverly Hills, Bel Air and Holmby Hills carry the highest prices in the city. A few coastal pockets in nearby cities go higher on median price." },
      { k: "h3", t: "Beverly Hills, Bel Air and Holmby Hills" },
      { k: "p", t: "Bel Air shows two numbers because they measure different things. Zillow's typical home value is about $4.14M, while Realtor.com showed a median list price of about $6.5M in ZIP code 90077 in March 2026. The second number reflects what sellers ask today, and those homes tend to be larger." },
      { k: "p", t: "Beverly Hills is a separate city with its own rules and school district. Alexandra also serves clients there, along with Brentwood and Santa Monica. See the [full list of areas she covers](/neighborhoods)." },
      { k: "p", t: "Holmby Hills is the hardest to measure. With only a handful of sales a year, one deal can swing the median, and the $11.6M Redfin figure came from just two sales." },
      { k: "h3", t: "Brentwood and Pacific Palisades" },
      { k: "p", t: "Zillow ranks Bel Air, Pacific Palisades and Brentwood as the top three Los Angeles neighborhoods by typical home value. Brentwood is established and steady." },
      { k: "p", t: "Pacific Palisades needs more context. The January 2025 Palisades Fire destroyed more than 6,800 structures there, and CRE Daily reported in August 2026 that fewer than a third of owners of destroyed homes had rebuilding permits. Average prices had reached about $4M before the fire, so treat today's numbers as a market in recovery." },
      { k: "p", t: "Anyone looking at a lot or a rebuild there should check permits, utilities and insurance before making an offer." },
      { k: "h3", t: "Pricey pockets outside the city" },
      { k: "p", t: "Redfin's metro analysis, using data from October 15, 2025, ranked Manhattan Beach's Hill Section first at a $9.425M median sale price. The Riviera in Pacific Palisades followed at $9.4M." },
      { k: "p", t: "Calabasas' The Oaks, Malibu's Point Dume and Santa Monica's Regent Square rounded out the top five at roughly $5.5M to $6M. Many of the priciest pockets sit in other cities, which means different taxes, rules and school districts." },

      { k: "h2", t: "Where do buyers pay for character instead of size?" },
      { k: "p", t: "In Los Feliz, Hancock Park, Windsor Square, the Hollywood Hills and the Sunset Strip, price follows the street, the architecture and the view more than the lot alone." },
      { k: "p", t: "These medians look modest next to Beverly Hills. They do not show the top of each market, which is where Alexandra's recent sales come in." },
      { k: "h3", t: "Los Feliz" },
      { k: "p", t: "Los Feliz sits below Griffith Park, and Lloyd Wright, Neutra and Spanish Colonial homes share the same winding streets. Zillow's $1.92M figure covers every kind of home, so the best houses trade well above it." },
      { k: "p", t: "Buyers here weigh the pedigree of the house against a steep, private lot. Browse [homes for sale in Los Feliz](/neighborhoods/los-feliz)." },
      { k: "h3", t: "Hancock Park" },
      { k: "p", t: "Hancock Park is one of the few areas where the streetscape has been protected for a century. Wide streets and deep lots draw families who want space close to the city." },
      { k: "p", t: "Ask whether a property sits inside a Historic Preservation Overlay Zone before planning exterior work. Recent sales on McCadden Place closed between $3.65M and $3.75M. See [homes for sale in Hancock Park](/neighborhoods/hancock-park)." },
      { k: "h3", t: "Windsor Square" },
      { k: "p", t: "Windsor Square is formal and quiet, and turnover is slow. Many homes sell through relationships before they reach the MLS." },
      { k: "p", t: "The Windsor Square Association says nearly 90% of its roughly 1,100 homes keep the original street-facing design from the early 1920s. That history is part of what buyers pay for. Alexandra's recent sales on Windsor Boulevard closed at $3.64M and $7.775M. See [homes for sale in Windsor Square](/neighborhoods/windsor-square)." },
      { k: "h3", t: "Hollywood Hills and Sunset Strip" },
      { k: "p", t: "The Hollywood Hills had a median list price near $2.9M and an average of about $1,452 per square foot in Ruby Home MLS data on October 9, 2026. Slope, access and insurance matter as much as the view, so read our guides on [what to know before buying a Hollywood Hills home](/journal/5-things-to-know-before-buying-a-hollywood-hills-home) and [buying a hillside home](/journal/buying-a-hillside-home-in-the-hollywood-hills)." },
      { k: "p", t: "The Sunset Strip sells cantilevered, city-facing homes where price follows the view corridor. Our guide to [luxury real estate on the Sunset Strip](/journal/luxury-real-estate-for-sale-sunset-strip) shows what each price level buys. You can also read more about [Hollywood Hills homes](/neighborhoods/hollywood-hills) and [Sunset Strip homes](/neighborhoods/sunset-strip)." },

      { k: "h2", t: "What do $3.6M to $7.8M homes look like?" },
      { k: "p", t: "These are recent sales by Alexandra Kerr. The price per square foot is calculated from each sale price and the listed square footage." },
      {
        k: "table",
        head: ["Address", "Beds / baths", "Sq. ft.", "Sale price", "Price per sq. ft."],
        rows: [
          ["[414 S Windsor Blvd](/properties/414-s-windsor-blvd)", "4 / 4", "4,235", "$7,775,000", "$1,836"],
          ["[356 S Rossmore Ave](/properties/356-s-rossmore-ave)", "8 / 6", "5,878", "$6,300,000", "$1,072"],
          ["[11845 Pacific Ave](/properties/11845-pacific-ave)", "5 / 6", "4,648", "$4,275,000", "$920"],
          ["[621 N McCadden Pl](/properties/621-n-mccadden-pl)", "4 / 3", "2,678", "$3,750,000", "$1,400"],
          ["[514 N McCadden Pl](/properties/514-n-mccadden-pl)", "3 / 3", "2,483", "$3,650,000", "$1,470"],
          ["[206 N Windsor Blvd](/properties/206-n-windsor-blvd)", "3 / 3", "2,813", "$3,639,161", "$1,294"],
        ],
      },
      { k: "p", t: "The price per square foot runs from about $920 to $1,836. Each price reflects a different mix of street, lot, condition and design, which is why a neighborhood median rarely predicts what one house will sell for." },

      { k: "h2", t: "What really sets the price of a luxury home in Los Angeles?" },
      { k: "p", t: "The street, the view, the lot and the paperwork set the price more than square footage does. Five factors matter most:" },
      {
        k: "ol",
        items: [
          "**The street.** Two blocks apart can mean a different price, different privacy and different rules.",
          "**The view corridor.** In the hills and on the Sunset Strip, a protected view is worth more than extra rooms. A neighbor's new build can take it away.",
          "**Lot and access.** Flat lots in Hancock Park are simpler to expand. Hillside lots bring slopes, retaining walls and drainage to inspect.",
          "**Permits and overlays.** Unpermitted work can slow a loan, an insurance quote and a resale. In a Historic Preservation Overlay Zone, exterior changes usually need review by the city's Office of Historic Resources.",
          "**City rules and taxes.** The Measure ULA transfer tax applies to high-value sales inside the City of Los Angeles, while Beverly Hills and Santa Monica follow their own rules. Confirm current thresholds before you list or offer. Our [Hollywood Hills guide](/journal/5-things-to-know-before-buying-a-hollywood-hills-home) covers the tax and insurance details.",
        ],
      },
      { k: "p", t: "Price per square foot rarely tells the full story for the same reasons." },

      { k: "h2", t: "How do you choose between these neighborhoods?" },
      { k: "p", t: "Start with the price band, then narrow by street. Five steps work for most buyers:" },
      {
        k: "ol",
        items: [
          "**Use sold prices on the exact street.** A neighborhood median hides the gap between a condo and an estate.",
          "**Decide how much privacy and lot you need.** Hillside homes offer views, and flat lots offer easier upkeep.",
          "**Check which city the address sits in.** A Beverly Hills mailing address can fall outside the city limits, so confirm the jurisdiction on the property record.",
          "**Get an insurance quote and read the permit history.** Do this before you write an offer, especially in fire zones.",
          "**Ask about off-market homes.** In slow-turnover areas like Windsor Square, private sales often happen before a home reaches the MLS.",
        ],
      },
      { k: "p", t: "Set up [new listing alerts](/home-search) for your top two areas so you hear about homes as they come on the market." },

      { k: "h2", t: "Why work with Alexandra Kerr on a luxury home search?" },
      { k: "p", t: "Alexandra Kerr is a REALTOR, Estates Director and Senior Real Estate Specialist at Compass. She has 13 years in Los Angeles real estate, 179 homes sold and $184 million in total sales, and her work has been recognized by RealTrends and Los Angeles Magazine." },
      { k: "p", t: "Her focus is homes with history, character and distinctive architecture. She reads permit and property records with buyers before an offer is written, and she brings Compass private exclusives to the table. If you plan to sell, start with a [home valuation](/home-valuation)." },

      { k: "faq" },

      { k: "h2", t: "Choosing among the wealthiest neighborhoods in Los Angeles" },
      { k: "p", t: "The wealthiest neighborhoods in Los Angeles are not all priced alike, and the right fit depends on whether you want a famous address, a view or a protected street. Judge any address by sold prices on its own street, not by a neighborhood median." },
      { k: "p", t: "If you want an honest read on a specific block, [schedule a consultation](/contact) or call [(310) 795-1440](tel:+13107951440)." },
    ],
    faq: [
      {
        q: "Is Beverly Hills part of the City of Los Angeles?",
        a: "No. Beverly Hills is its own city, surrounded by Los Angeles. It has its own government, rules and school district, so a home there follows different rules than one in Bel Air or Holmby Hills.",
      },
      {
        q: "How long do luxury homes take to sell in these areas?",
        a: "It depends on the area and the price. Ruby Home MLS data showed an average of 88 days on the market in the Hollywood Hills on October 9, 2026. Redfin recorded 213 days in Holmby Hills in November 2025, though that came from only two sales.",
      },
      {
        q: "How much is property tax on a $3 million home in Los Angeles?",
        a: "New buyers pay about 1.2% to 1.25% of the purchase price each year, which is roughly $36,000 to $37,500 on $3 million. Prop 13 then caps yearly growth in assessed value at 2%. A supplemental tax bill usually arrives a few months after closing.",
      },
      {
        q: "Can I buy in one of these neighborhoods from out of state?",
        a: "Yes. Alexandra works with out-of-state buyers through video tours and digital signing, and local professionals handle inspections in person. Read more on the relocation page.",
      },
    ],
  },
  {
    slug: "moving-from-los-angeles-to-nashville",
    title: "Moving From Los Angeles to Nashville: Costs, Taxes, Homes",
    seoTitle: "Moving From Los Angeles to Nashville: Costs, Taxes, Homes",
    description:
      "Moving from Los Angeles to Nashville? Compare home prices, taxes, winters, and moving costs, plus how to sell your LA home first. By Alexandra Kerr.",
    date: "October 31, 2026",
    iso: "2026-10-31",
    tag: "Relocation",
    excerpt:
      "The median home in the Los Angeles metro area sold for about $860,000 in April 2026. In Nashville, the median that month was about $475,000. That gap explains much of the pull behind moving from Los Angeles to Nashville, but the move also brings real winters, higher sales tax, and a property tax system with no Prop 13 protection.",
    img: "/journal/nashville-skyline-cumberland-river.jpg",
    imgAlt: "Downtown Nashville skyline at sunset over the Cumberland River",
    body: [
      { k: "p", t: "This guide covers costs, taxes, neighborhoods, and how to sell your Los Angeles home before you leave." },

      { k: "h2", t: "Is Moving From Los Angeles to Nashville Worth It?" },
      { k: "p", t: "For many owners, yes. The savings are real, but the tax and weather trade-offs are different from what most people expect." },
      {
        k: "table",
        head: ["", "Los Angeles", "Nashville"],
        rows: [
          ["Median home price", "About $860,000 (metro, April 2026)", "About $475,000 (metro, April 2026)"],
          ["State income tax", "Up to 13.3%", "None on wages"],
          ["Property tax", "About 1.2% to 1.25% for new buyers in the city", "Roughly 0.7% to 0.9% effective rate in Davidson County"],
          ["Weather", "Typically 46 to 84 degrees, about 16 inches of rain", "Typically 27 to 89 degrees, about 49 inches of rain, 4 inches of snow"],
          ["Distance", "About 2,000 miles to Nashville by road", "About 2,000 miles to Los Angeles by road"],
        ],
      },
      { k: "p", t: "Nashville figures vary by source. Greater Nashville Realtors reported a median single-family price of about $537,000 across nine counties in June 2026, so use the number that matches the area you plan to buy in." },

      { k: "h2", t: "Cost of Living in Los Angeles vs Nashville" },
      { k: "h3", t: "Housing and Rent" },
      { k: "p", t: "Nashville prices have flattened. The metro median in April 2026 was about 1% above a year earlier and just under the October 2025 peak of $485,000. Local brokers also report rising inventory, which gives buyers more room to negotiate than they had in 2021 and 2022." },
      { k: "p", t: "One moving-industry comparison puts monthly basics for a single person at about $3,100 in Nashville versus $5,800 in Los Angeles, and $8,400 versus $12,700 for a family of four. If you are unsure which area fits, renting for the first few months is a low-risk way to learn the city." },
      { k: "h3", t: "Income, Sales, and Property Tax" },
      { k: "p", t: "Tennessee has no state income tax on wages, and the Hall Income Tax on interest and dividends ended in 2021. California’s rates run as high as 13.3%." },
      { k: "p", t: "Tennessee makes up for that with sales tax. Nashville’s combined rate runs from 9.25% to 9.75% depending on location, so big purchases cost more than you may expect." },
      { k: "p", t: "Property tax rates are low, with effective rates around 0.7% to 0.9% in Davidson County, but there is no Prop 13. The county reappraises every four years, and the 2025 reappraisal raised the median value by 45%. State law forces the rate down after a reappraisal, but the Metro Council can raise it again, and it did." },
      { k: "p", t: "In Los Angeles, Prop 13 limits how fast assessments rise, though new buyers in the city still pay about 1.2% to 1.25% of the purchase price. The dollar bill in Nashville can be lower, but it is less predictable." },
      { k: "h3", t: "Insurance and Budgeting" },
      { k: "p", t: "Get written homeowners insurance quotes before you make an offer, and ask about storm and wind deductibles. Budget for both heating and air conditioning, since Nashville needs each." },

      { k: "h2", t: "What Your Los Angeles Home Equity Buys in Nashville" },
      { k: "p", t: "Say you sell a home for $3 million. Before the mortgage payoff, taxes, and selling costs, that would cover a median Green Hills home, which sold for about $1.385 million over the 12 months through June 2026, with well over $1.5 million left." },
      { k: "p", t: "A median Belle Meade home would take most of it, since one 2026 market report puts that median near $2.85 million. Franklin and Brentwood offer more land and newer homes, with medians of about $813,000 and $1.275 million." },
      { k: "p", t: "Neighborhood medians swing widely by source, so compare sold prices on the specific streets you like." },

      { k: "h2", t: "Nashville Neighborhoods for Los Angeles Buyers" },
      { k: "p", t: "No Nashville neighborhood matches an LA one exactly. These pairings are based on feel, so treat them as a starting point." },
      {
        k: "ul",
        items: [
          "**Silver Lake and Echo Park to East Nashville.** Artists, musicians, and food people. Prices run from about $400,000 to $630,000 and up.",
          "**Los Feliz to 12 South and Hillsboro Village.** Walkable streets, boutiques, and restaurants between Belle Meade and downtown. 12 South runs about $600,000 to $900,000 and up.",
          "**Hancock Park and Windsor Square to Belle Meade.** Established streets, large lots, and a prime-address reputation, at prices well above the other areas.",
          "**Hollywood Hills and the Sunset Strip to Forest Hills and Green Hills.** More wooded and private. One report puts Forest Hills medians above $1.85 million.",
          "**Families to Franklin and Brentwood.** Williamson County suburbs with larger lots and strong school reputations.",
        ],
      },
      { k: "p", t: "Nashville has no ocean and no mountains. Expect rolling hills, rivers, and lakes instead, and views that are pleasant but not like the Hollywood Hills." },
      { k: "p", t: "Alexandra’s LA neighborhood guides can help you describe what you like about your current area: [Los Feliz](/neighborhoods/los-feliz), [Silver Lake](/neighborhoods/silver-lake), [Hancock Park](/neighborhoods/hancock-park), and [Hollywood Hills](/neighborhoods/hollywood-hills). That gives a Nashville agent a clear brief." },

      { k: "h2", t: "How to Sell Your Los Angeles Home Before You Move" },
      { k: "h3", t: "Sell First or Buy First" },
      { k: "p", t: "Some older advice told Nashville movers to buy first because both markets favored sellers. That has changed. Nashville inventory has been climbing and buyers have more room to negotiate, so selling first is a safer default." },
      { k: "p", t: "If you do buy first, you carry two homes until the LA sale closes. Confirm any bridge loan or home equity line with your lender before you commit." },
      { k: "p", t: "Alexandra runs sales for departing owners. She prepares, markets, and sells the LA home while you settle in Tennessee, and escrow runs without a return trip. [Compass Concierge](/compass-concierge) can cover prep costs such as repairs and staging, and you repay them at closing." },
      { k: "h3", t: "Capital Gains and Measure ULA" },
      { k: "p", t: "Federal tax rules help most sellers. You can exclude up to $250,000 of gain on your main home, or $500,000 on a joint return, if you owned and lived in it for two of the last five years. Those years do not have to be consecutive, so moving first often still qualifies. Our [Austin relocation guide](/journal/moving-from-los-angeles-to-austin) covers these tax rules in more depth." },
      { k: "p", t: "California taxes gains at its regular rates, up to 13.3%, and buyers must withhold 3 1/3% of the sale price unless the seller qualifies for an exemption. File Form 593 before closing if you do, and ask your escrow officer to walk you through it." },
      { k: "p", t: "If your home is in the City of Los Angeles and sells for more than $5.4 million, Measure ULA applies. For closings after June 30, 2026, the rate is 4% up to $10.9 million and 5.5% above that, charged on the full price. The seller typically pays it." },
      { k: "p", t: "This is general information, not tax or legal advice. Talk to a CPA before you list." },
      { k: "h3", t: "Selling From Out of State" },
      { k: "p", t: "You do not need to be in Los Angeles to close. Alexandra uses video walkthroughs and digital signing, and her vendors handle photography, staging, and repairs. Start with a [home valuation](/home-valuation) so you know your number before you set a timeline." },

      { k: "h2", t: "What Changes: Four Seasons, Humidity, Ice, and Daily Life" },
      { k: "p", t: "Nashville has four seasons. Typical temperatures run from about 27 to 89 degrees, compared with roughly 46 to 84 in Los Angeles, and the city gets about 49 inches of rain a year against about 16 in LA. Fall color arrives from mid-October to mid-November." },
      { k: "p", t: "Snow averages only about 4 inches a year, but ice is the bigger risk. Winter Storm Fern in January 2026 knocked out power to about 230,000 customers at its peak, the largest single outage in the local utility’s history. Ask about generators, tree cover, and power line routes when you tour homes." },
      { k: "p", t: "Spring brings severe thunderstorms, so ask any seller about past storm damage. You will still want a car, though walkable pockets like 12 South, Germantown, and The Gulch let you drive less. Music runs through daily life, from the Grand Ole Opry to small clubs on any given night." },

      { k: "h2", t: "Moving Costs and Logistics for a 2,000-Mile Move" },
      { k: "p", t: "Full-service movers charge about $3,800 to $8,800 for a two or three-bedroom home on this route, based on 2026 data. The trip covers roughly 2,000 miles, and one estimate puts transit at six to 17 days." },
      { k: "p", t: "Containers and rental trucks usually cost less but need more work from you. With a self-moving service like U-Pack, you pack, load, and unload while the company handles the driving." },
      { k: "p", t: "Spring and fall are the busiest moving seasons, so winter can cost less. Weigh that savings against winter weather along the route, which can delay trucks. Get at least three written quotes and confirm insurance, delivery windows, and extra fees." },

      { k: "h2", t: "Moving Timeline, Step by Step" },
      {
        k: "ol",
        items: [
          "**6 to 8 months out:** Meet with an LA agent about pricing and timing, and with a CPA about gains and residency.",
          "**4 to 6 months out:** Visit Nashville once, shortlist areas, and get introduced to a Nashville agent.",
          "**3 months out:** Repair, declutter, and book photography for your LA home.",
          "**2 months out:** List the house and collect mover quotes.",
          "**1 month out:** Complete escrow paperwork, including Form 593, schedule movers, and arrange utilities and insurance.",
          "**After you arrive:** Review your first assessment notice from the Davidson County Assessor and note the appeal deadline.",
        ],
      },

      { k: "faq" },

      { k: "h2", t: "Your Next Step in Moving From Los Angeles to Nashville" },
      { k: "p", t: "Moving from Los Angeles to Nashville works best when you plan the sale first and budget for winter. Your LA home’s value, taxes, and timeline set what you can buy in Tennessee." },
      { k: "p", t: "Alexandra has guided relocations in both directions for over a decade. [Plan your relocation](/relocation), [schedule a consultation](/contact), or call [310.795.1440](tel:+13107951440). Still comparing cities? Read our guide to [moving from Los Angeles to Austin](/journal/moving-from-los-angeles-to-austin)." },
    ],
    faq: [
      {
        q: "How long do I have to get a Tennessee driver license and register my car?",
        a: "Tennessee gives new residents 30 days to get a Tennessee driver license, and you surrender your California license when you apply. You also register the car through your county clerk, generally within 30 days.",
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
        q: "Does Nashville work if I work in entertainment?",
        a: "It can, but Nashville’s entertainment economy centers on music, not film and TV, and healthcare is a major employer too. Check where your work actually happens before you commit. Remote and flexible roles make the move easier.",
      },
      {
        q: "How do I choose a Nashville agent from out of state?",
        a: "Ask for recent sales in your price range and target neighborhoods, and verify the license with the Tennessee Real Estate Commission. Alexandra connects clients with vetted agents through her nationwide network.",
      },
    ],
  },
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
