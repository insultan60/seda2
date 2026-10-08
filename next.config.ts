import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* AVIF first, WebP behind it. A listing card renders about 450px wide, so
       handing it the full 2560px JPEG — which is what a plain <img> does —
       throws away most of the download. These formats plus Next's responsive
       widths take a card image from hundreds of KB to tens. */
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      /* Neighborhood and journal art: stock, pending Alexandra's own
         photography (see CLIENT-REQUESTS.md Q4). Once those are licensed and
         downloaded into public/, this entry goes with them. */
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  /* public/idx-wrapper.html is the static copy of /idx-wrapper that IDX
     Broker fetches. Like the route, it stays out of search results. */
  async headers() {
    return [{ source: "/idx-wrapper.html", headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }] }];
  },
};

export default nextConfig;
