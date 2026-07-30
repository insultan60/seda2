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
};

// Newest first. `img` values are stock placeholders pending the real article art.
export const POSTS: Post[] = [
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
export const LATEST_POSTS = POSTS.filter((p) => p.img).slice(0, 3);
