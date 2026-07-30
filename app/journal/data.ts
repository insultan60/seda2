export type Post = {
  img: string;
  tag: string;
  title: string;
  date: string;
};

export const POSTS: Post[] = [
  {
    img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1400&auto=format&fit=crop",
    tag: "Architecture · Placeholder",
    title: "Reading a Spanish Colonial: what handcrafted tile tells you about a home",
    date: "July 2026",
  },
  {
    img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1400&auto=format&fit=crop",
    tag: "Market Notes · Placeholder",
    title: "Mid‑year check‑in: how L.A.'s east side neighborhoods are moving",
    date: "June 2026",
  },
  {
    img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1400&auto=format&fit=crop",
    tag: "Selling · Placeholder",
    title: "Before the photographer arrives: a room‑by‑room staging primer",
    date: "May 2026",
  },
  {
    img: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1400&auto=format&fit=crop",
    tag: "Buying · Placeholder",
    title: "First-time buyer in Los Angeles? Five questions to ask before you tour",
    date: "April 2026",
  },
  {
    img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1400&auto=format&fit=crop",
    tag: "Neighborhoods · Placeholder",
    title: "Why Los Feliz keeps its value: character, canopy, and community",
    date: "March 2026",
  },
  {
    img: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1400&auto=format&fit=crop",
    tag: "Relocation · Placeholder",
    title: "Moving to L.A. from out of state: a stress-free relocation checklist",
    date: "February 2026",
  },
];

/** The three most recent posts, as teased on the home page. */
export const LATEST_POSTS = POSTS.slice(0, 3);
