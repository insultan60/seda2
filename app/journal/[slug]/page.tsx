import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import FaqSection from "../../components/Faq";
import { SITE_URL } from "../../site";
import { PUBLISHED, getPost, readingTime, relatedPosts, type Block } from "../data";
import ShareRow from "./ShareRow";
import "../journal.css";
import "./article.css";

/* Only articles with their full copy get a page; every other slug is a 404
   (see PUBLISHED in ../data). */
export const dynamicParams = false;
export function generateStaticParams() {
  return PUBLISHED.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article — Alexandra Kerr" };
  const title = post.seoTitle ?? `${post.title} — Alexandra Kerr | Los Angeles Real Estate`;
  const description = post.description ?? post.excerpt;
  return {
    title,
    description,
    alternates: { canonical: `/journal/${slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/journal/${slug}`,
      publishedTime: post.iso,
      authors: ["Alexandra Kerr"],
      ...(post.img ? { images: [{ url: post.img, alt: post.imgAlt ?? post.title }] } : {}),
    },
  };
}

const BackArrow = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

/** [text](href) inside article copy becomes a link and **text** bold;
 *  everything else is text. */
function inline(t: string): ReactNode[] {
  return t.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g).map((part, i) => {
    const bold = part.match(/^\*\*([^*]+)\*\*$/);
    if (bold) return <strong key={i}>{bold[1]}</strong>;
    const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!m) return part;
    const [, text, href] = m;
    if (href.startsWith("/")) return <Link key={i} href={href}>{text}</Link>;
    const external = href.startsWith("http");
    return (
      <a key={i} href={href} {...(external ? { target: "_blank", rel: "noopener" } : {})}>
        {text}
      </a>
    );
  });
}

/* eslint-disable @next/next/no-img-element */
function renderBlock(b: Exclude<Block, { k: "faq" }>, i: number) {
  switch (b.k) {
    case "h2":
      return <h2 key={i}>{b.t}</h2>;
    case "h3":
      return <h3 key={i}>{b.t}</h3>;
    case "h4":
      return <h4 key={i}>{b.t}</h4>;
    case "table":
      return (
        <div key={i} className="ar-table">
          <table>
            <thead>
              <tr>{b.head.map((h) => <th key={h} scope="col">{h}</th>)}</tr>
            </thead>
            <tbody>
              {b.rows.map((r) => (
                <tr key={r.join("|")}>{r.map((c, j) => <td key={j}>{inline(c)}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "ul":
      return (
        <ul key={i}>
          {b.items.map((it) => <li key={it}>{inline(it)}</li>)}
        </ul>
      );
    case "ol":
      return (
        <ol key={i} className="ar-steps">
          {b.items.map((it) => <li key={it}>{inline(it)}</li>)}
        </ol>
      );
    case "img":
      return (
        <figure key={i} className="ar-figure">
          <img src={b.src} alt={b.alt} loading="lazy" data-fallback />
          {b.cap && <figcaption>{b.cap}</figcaption>}
        </figure>
      );
    case "quote":
      return <blockquote key={i} className="ar-quote">{b.t}</blockquote>;
    default:
      return <p key={i}>{inline(b.t)}</p>;
  }
}

/** A run of body blocks in the narrow reading column. */
const BodyRun = ({ blocks }: { blocks: Block[] }) =>
  blocks.length ? (
    <div className="ar-body">
      <div className="container ar-narrow">
        {blocks.map((b, i) => (b.k === "faq" ? null : renderBlock(b, i)))}
      </div>
    </div>
  ) : null;

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post?.body) notFound();

  const related = relatedPosts(slug, 3);
  const read = readingTime(post);
  const url = `${SITE_URL}/journal/${post.slug}`;

  // The FAQ renders where the body marks it, or after the body when unmarked.
  const at = post.body.findIndex((b) => b.k === "faq");
  const before = at < 0 ? post.body : post.body.slice(0, at);
  const after = at < 0 ? [] : post.body.slice(at + 1);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.description ?? post.excerpt,
        datePublished: post.iso,
        dateModified: post.iso,
        mainEntityOfPage: url,
        url,
        ...(post.img ? { image: `${SITE_URL}${post.img}` } : {}),
        author: { "@id": `${SITE_URL}/#agent`, "@type": "RealEstateAgent", name: "Alexandra Kerr", url: `${SITE_URL}/about` },
        publisher: { "@id": `${SITE_URL}/#agent` },
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Journal", item: `${SITE_URL}/journal` },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  return (
    <main id="main" className="ar-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ---------- HEAD ---------- */}
      <header className="ar-head">
        <div className="container ar-narrow">
          <Link className="ar-back" href="/journal">
            <BackArrow />
            Back to the Journal
          </Link>
          <p className="ar-kicker">
            <span className="ar-kicker__tag">{post.tag}</span>
            <span className="ar-kicker__dot" aria-hidden="true">·</span>
            <time dateTime={post.iso}>{post.date}</time>
            {read && (
              <>
                <span className="ar-kicker__dot" aria-hidden="true">·</span>
                <span>{read}</span>
              </>
            )}
          </p>
          <h1 className="ar-title">{post.title}</h1>
          <p className="ar-standfirst">{post.excerpt}</p>

          <div className="ar-byline">
            <div className="ar-byline__who">
              <img src="/assets/alexandra-headshot.jpg" alt="Alexandra Kerr" data-fallback />
              <div>
                <p className="ar-byline__name">Alexandra Kerr</p>
                <p className="ar-byline__role">Estates Director, Compass</p>
              </div>
            </div>
            <ShareRow title={post.title} />
          </div>
        </div>
      </header>

      {/* ---------- HERO IMAGE (only when the article has art) ---------- */}
      {post.img && (
        <div className="ar-hero">
          <div className="container">
            {post.imgAlt ? (
              <img src={post.img} alt={post.imgAlt} data-fallback />
            ) : (
              <img src={post.img} alt="" aria-hidden="true" data-fallback />
            )}
          </div>
        </div>
      )}

      {/* ---------- BODY ---------- */}
      <BodyRun blocks={before} />
      {post.faq?.length ? (
        <div className="ar-faq">
          <FaqSection items={post.faq} title="Frequently Asked Questions" />
        </div>
      ) : null}
      <BodyRun blocks={after} />

      {/* ---------- AUTHOR ---------- */}
      <div className="container ar-narrow">
        <aside className="ar-author">
          <img src="/assets/alexandra-headshot.jpg" alt="Alexandra Kerr" data-fallback />
          <div>
            <p className="ar-author__name">Alexandra Kerr</p>
            <p className="ar-author__role">Estates Director, Compass · Los Angeles</p>
            <p className="ar-author__bio">
              Alexandra has spent over a decade representing buyers and sellers across Los Feliz,
              Hancock Park, the Hollywood Hills and the Eastside — with a particular fluency in
              architecturally significant homes and the people who care about them.
            </p>
            <Link className="text-link" href="/about">
              More about Alexandra<i className="arrow" aria-hidden="true"></i>
            </Link>
          </div>
        </aside>
      </div>

      {/* ---------- CONTINUE READING (once there is something else to read) ---------- */}
      {related.length > 0 && (
        <section className="ar-related">
          <div className="container">
            <div className="section-head section-head--split reveal">
              <div>
                <p className="eyebrow">Keep Reading</p>
                <h2 className="h2 h2--sub">More from the Journal</h2>
              </div>
              <Link className="text-link" href="/journal">
                View all articles<i className="arrow" aria-hidden="true"></i>
              </Link>
            </div>
            <div className="ar-related__grid">
              {related.map((p, i) => (
                <article
                  className="jr-card reveal"
                  key={p.slug}
                  style={{ "--d": `${i * 0.07}s` } as React.CSSProperties}
                >
                  {p.img && (
                    <Link className="jr-card__media" href={`/journal/${p.slug}`} aria-label={p.title}>
                      <img src={p.img} alt="" loading="lazy" data-fallback />
                    </Link>
                  )}
                  <div className="jr-card__body">
                    <p className="jr-meta">
                      <time dateTime={p.iso}>{p.date}</time>
                      <span className="jr-meta__dot" aria-hidden="true">·</span>
                      <span className="jr-meta__tag">{p.tag}</span>
                    </p>
                    <h3 className="jr-card__title">
                      <Link href={`/journal/${p.slug}`}>{p.title}</Link>
                    </h3>
                    <p className="jr-card__excerpt">{p.excerpt}</p>
                    <Link className="jr-card__cta" href={`/journal/${p.slug}`}>
                      Read Post
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- CTA ---------- */}
      <section className="jr-cta">
        <div className="container jr-cta__inner reveal">
          <div>
            <p className="eyebrow eyebrow--clay">Stay Close to the Market</p>
            <h2 className="h2 h2--light">
              The market moves quietly<br />before it moves loudly.
            </h2>
            <p className="jr-cta__sub">
              Neighborhood insight, off-market opportunities, and a plain-English read on what the
              headlines actually mean for Los Angeles.
            </p>
          </div>
          <div className="jr-cta__actions">
            <Link className="btn btn--solid-light" href="/contact">
              Let&rsquo;s Connect
            </Link>
            <Link className="btn btn--ghost-light" href="/properties">
              View the Portfolio
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
