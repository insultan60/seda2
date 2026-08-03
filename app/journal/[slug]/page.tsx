import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { POSTS, getPost, readingTime, relatedPosts } from "../data";
import ShareRow from "./ShareRow";
import "../journal.css";
import "./article.css";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article — Alexandra Kerr" };
  return {
    title: `${post.title} — Alexandra Kerr | Los Angeles Real Estate`,
    description: post.excerpt,
  };
}

const BackArrow = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

/* eslint-disable @next/next/no-img-element */
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = relatedPosts(slug, 3);
  const read = readingTime(post);

  return (
    <main id="main" className="ar-page">
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
            <img src={post.img} alt="" aria-hidden="true" data-fallback />
          </div>
        </div>
      )}

      {/* ---------- BODY ---------- */}
      {post.body?.length ? (
        <div className="ar-body">
          <div className="container ar-narrow">
            {post.body.map((b, i) => {
              switch (b.k) {
                case "h2":
                  return <h2 key={i}>{b.t}</h2>;
                case "h3":
                  return <h3 key={i}>{b.t}</h3>;
                case "ul":
                  return (
                    <ul key={i}>
                      {b.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  );
                case "quote":
                  return <blockquote key={i} className="ar-quote">{b.t}</blockquote>;
                default:
                  return <p key={i}>{b.t}</p>;
              }
            })}
          </div>
        </div>
      ) : (
        /* No fabricated article copy. The headline and date are real — the body
           has not been supplied yet, and this says so plainly. */
        <div className="ar-body">
          <div className="container ar-narrow">
            <div className="ar-pending">
              <span className="ar-pending__badge">Full article coming shortly</span>
              <p className="ar-pending__lead">
                This piece is being prepared for the site. In the meantime, the summary above covers
                the substance of it — and if it&rsquo;s relevant to a decision you&rsquo;re weighing
                right now, the fastest route is simply to ask.
              </p>
              <div className="ar-pending__ctas">
                <Link className="btn btn--solid-moss" href="/contact">
                  Ask Alexandra
                </Link>
                <Link className="btn btn--outline-moss" href="/journal">
                  Browse the Journal
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

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

      {/* ---------- CONTINUE READING ---------- */}
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
