/**
 * One paragraph, heading, list, or pull quote of article copy. The article
 * template renders whatever it is handed, so publishing a piece is a matter of
 * pasting its body in here — no page work required.
 */
export type Block =
  | { k: "p"; t: string }
  | { k: "h2"; t: string }
  | { k: "h3"; t: string }
  | { k: "ul"; items: string[] }
  | { k: "ol"; items: string[] }
  | { k: "img"; src: string; alt: string; cap?: string }
  | { k: "quote"; t: string }
  /** Where the post's `faq` renders; at the end of the body when absent. */
  | { k: "faq" };
/* Inside "p" and list items, [text](/path) becomes a link (see the article
   page's inline renderer). Nothing else is parsed. */

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
    .map((b) => ("items" in b ? b.items.join(" ") : "t" in b ? b.t : ""))
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
