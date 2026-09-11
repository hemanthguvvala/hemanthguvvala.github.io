import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import ProductIcon from '../components/ProductIcon';
import StatusBadge from '../components/StatusBadge';
import ArticleShare from '../components/ArticleShare';
import ArticleEnd from '../components/ArticleEnd';
import ProseMotion from '../components/ProseMotion';
import ReadingProgress from '../components/ReadingProgress';
import { ArticleTocInline, ArticleTocRail } from '../components/ArticleToc';
import NotFound from './NotFound';
import {
  JOURNEY_LABEL,
  JOURNEY_PATH,
  articleNeighbours,
  articlePath,
  categoryLabel,
  formatDate,
  getArticle,
  relatedArticles,
} from '../data/journey';
import { CATEGORIES, PLATFORMS, getProduct } from '../data/products';
import { person } from '../data/profile';
import { articleSchema, breadcrumbSchema, webPageSchema } from '../seo/jsonld';
import { EVENTS, track, trackProduct } from '../utils/analytics';

export default function JourneyArticle() {
  const { slug } = useParams();
  const article = getArticle(slug);

  if (!article) return <NotFound />;

  const path = articlePath(article.slug);
  const products = article.products.map(getProduct).filter(Boolean);

  // Long entry titles would push "| Hemanth Kumar Guvvala" past the point
  // Google truncates. Better to lose the suffix than to have the name cut in
  // half in the result.
  const suffixed = `${article.title} | ${person.name}`;
  const seoTitle = suffixed.length > 70 ? article.title : suffixed;
  const related = relatedArticles(article);
  const { previous, next } = articleNeighbours(article.slug);
  // Older entries predate the generated contents list; `?? []` keeps them
  // rendering rather than requiring every article to be recompiled first.
  const toc = article.toc ?? [];

  // Hover lift, shared by every card on the page so they all answer the
  // pointer the same way. A spring, not a duration: it settles rather than
  // stopping, which is what makes it feel physical at this small a distance.
  const lift = {
    whileHover: { y: -3 },
    transition: { type: 'spring', stiffness: 400, damping: 30 },
  };

  return (
    <div className="pb-section-lg pt-32">
      <SEO
        title={seoTitle}
        description={article.description}
        path={path}
        type="article"
        jsonLd={[
          articleSchema(article, { path }),
          webPageSchema({ title: article.title, description: article.description, path }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: JOURNEY_LABEL, path: JOURNEY_PATH },
            { name: article.title, path },
          ]),
        ]}
      />

      <ReadingProgress />
      <ArticleTocRail toc={toc} />

      <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex list-none flex-wrap items-center gap-2 font-mono text-xs text-text-muted">
            <li>
              <Link to="/" className="transition-colors hover:text-primary">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link to={JOURNEY_PATH} className="transition-colors hover:text-primary">
                {JOURNEY_LABEL}
              </Link>
            </li>
          </ol>
        </nav>

        {/* ── Header. `article-enter` staggers the children in with CSS, so
              the entrance plays whether or not JavaScript does. ── */}
        <header className="article-enter flex flex-col gap-4 border-b border-line/5 pb-8">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-text-muted">
            <Link
              to={`${JOURNEY_PATH}?category=${article.category}`}
              className="text-primary transition-colors hover:text-primary-light"
            >
              {categoryLabel(article.category)}
            </Link>
            <span aria-hidden="true">·</span>
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{article.readingMinutes} min read</span>
          </p>

          <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-strong sm:text-4xl lg:text-5xl">
            {article.title}
          </h1>

          <p className="text-lg leading-relaxed text-text-secondary">{article.description}</p>

          {article.updated && article.updated !== article.date && (
            <p className="font-mono text-xs text-text-muted">
              Updated <time dateTime={article.updated}>{formatDate(article.updated)}</time>
            </p>
          )}

          <p className="text-sm text-text-muted">
            By{' '}
            <Link to="/about" className="text-text-secondary underline underline-offset-4 hover:text-primary">
              {person.name}
            </Link>
          </p>

          {article.placeholder && (
            <p className="rounded-xl border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-gold">
              <strong className="font-bold">Example entry.</strong> This shows the structure a
              journey entry uses. It is illustrative, not an account of real work.
            </p>
          )}
        </header>

        <ArticleTocInline toc={toc} />

        {/* ── Key takeaway, surfaced before the body ──
              Animated in CSS, not framer-motion, and that split is deliberate
              across this page: anything carrying words a reader came for
              animates with CSS, which finishes on its own with JavaScript
              blocked. framer-motion drives only what is decorative — the
              progress bar, hover lifts, the contents marker. */}
        {article.keyTakeaway && (
          <aside aria-label="Key takeaway" className="takeaway mt-10 rounded-2xl border border-primary/25 bg-primary/5 p-6">
            <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-primary">
              <span className="material-symbols-outlined pulse-twice text-[18px]" aria-hidden="true">
                lightbulb
              </span>
              Key takeaway
            </p>
            <p className="mt-2.5 leading-relaxed text-strong">{article.keyTakeaway}</p>
          </aside>
        )}

        <ProseMotion html={article.html} className="mt-10" />

        <ArticleEnd minutes={article.readingMinutes} />

        <ArticleShare article={article} path={path} />

        {/* ── Article → product. The ecosystem link that matters most. ── */}
        {products.length > 0 && (
          <section
            aria-labelledby="article-products"
            className="mt-16 border-t border-line/5 pt-10"
          >
            <h2 id="article-products" className="font-display text-xl font-bold text-strong">
              {products.length === 1 ? 'The product this is about' : 'Products this is about'}
            </h2>

            <ul className="mt-5 flex list-none flex-col gap-4">
              {products.map((p) => {
                const url = p.websiteUrl ?? p.playStoreUrl;
                return (
                  <motion.li
                    key={p.slug}
                    {...lift}
                    className="flex flex-col gap-4 rounded-2xl border border-border-dark bg-card-dark/70 p-5 transition-colors hover:border-primary/40 sm:flex-row sm:items-center sm:gap-5"
                  >
                    <ProductIcon product={p} size={52} />

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="font-display font-bold text-strong">{p.name}</h3>
                        <StatusBadge status={p.status} />
                      </div>
                      <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-text-muted">
                        {PLATFORMS[p.platform]} · {CATEGORIES[p.category]}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                        {p.shortDescription}
                      </p>
                    </div>

                    <div className="flex shrink-0 flex-wrap gap-2">
                      {url && (
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() =>
                            trackProduct(
                              p.websiteUrl ? EVENTS.websiteClick : EVENTS.playStoreClick,
                              p,
                              { from: `journey:${article.slug}` },
                            )
                          }
                          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-bold text-on-primary transition-colors hover:bg-primary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                          {p.platform === 'web' ? 'Open' : 'Google Play'}
                          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                            open_in_new
                          </span>
                        </a>
                      )}
                      {p.hasDetailPage && (
                        <Link
                          to={`/products/${p.slug}`}
                          onClick={() => trackProduct(EVENTS.productOpen, p, { from: 'journey' })}
                          className="inline-flex min-h-[44px] items-center rounded-lg border border-line/10 px-4 text-sm font-medium text-strong transition-colors hover:border-primary/50 hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                          Details
                        </Link>
                      )}
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </section>
        )}

        {/* ── Previous / next ── */}
        {(previous || next) && (
          <nav
            aria-label="More entries"
            className="mt-14 grid gap-4 border-t border-line/5 pt-10 sm:grid-cols-2"
          >
            {previous ? (
              <motion.div {...lift}>
                <Link
                  to={articlePath(previous.slug)}
                  onClick={() => track(EVENTS.relatedArticleClick, { direction: 'previous' })}
                  className="group flex h-full flex-col gap-1.5 rounded-xl border border-border-dark bg-card-dark/70 p-4 transition-colors hover:border-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                    {/* The arrow leans the way the link goes when pointed at. */}
                    <span
                      className="inline-block transition-transform group-hover:-translate-x-1"
                      aria-hidden="true"
                    >
                      ←
                    </span>{' '}
                    Newer
                  </span>
                  <span className="font-display font-bold text-strong">{previous.title}</span>
                </Link>
              </motion.div>
            ) : (
              <span />
            )}

            {next && (
              <motion.div {...lift} className="sm:col-start-2">
                <Link
                  to={articlePath(next.slug)}
                  onClick={() => track(EVENTS.relatedArticleClick, { direction: 'next' })}
                  className="group flex h-full flex-col gap-1.5 rounded-xl border border-border-dark bg-card-dark/70 p-4 text-right transition-colors hover:border-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                    Older{' '}
                    <span
                      className="inline-block transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </span>
                  <span className="font-display font-bold text-strong">{next.title}</span>
                </Link>
              </motion.div>
            )}
          </nav>
        )}

        {/* ── Related reading ── */}
        {related.length > 0 && (
          <section aria-labelledby="related-reading" className="mt-14 border-t border-line/5 pt-10">
            <h2 id="related-reading" className="font-display text-xl font-bold text-strong">
              Related reading
            </h2>
            <ul className="mt-5 flex list-none flex-col gap-3">
              {related.map((a) => (
                <motion.li key={a.slug} {...lift}>
                  <Link
                    to={articlePath(a.slug)}
                    onClick={() => track(EVENTS.relatedArticleClick, { slug: a.slug })}
                    className="flex flex-col gap-1 rounded-xl border border-border-dark bg-card-dark/70 p-4 transition-colors hover:border-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-wider text-primary">
                      {categoryLabel(a.category)}
                    </span>
                    <span className="font-display font-bold text-strong">{a.title}</span>
                    <span className="text-sm text-text-secondary">{a.description}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </section>
        )}

        {/* ── Back into the ecosystem ── */}
        <section className="mt-14 rounded-2xl border border-border-dark bg-surface/30 p-6 sm:p-7">
          <h2 className="font-display text-lg font-bold text-strong">
            Want to see what I&rsquo;m building?
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
            Everything written about here is a real product you can use. I also take on client work.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to="/products"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-on-primary transition-colors hover:bg-primary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Explore products
            </Link>
            <Link
              to="/services"
              onClick={() => track(EVENTS.workWithMeClick, { from: `journey:${article.slug}` })}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-line/10 px-5 text-sm font-bold text-strong transition-colors hover:border-primary/50 hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Work with me
            </Link>
            <Link
              to={JOURNEY_PATH}
              className="inline-flex min-h-[44px] items-center px-3 text-sm font-medium text-text-secondary transition-colors hover:text-primary"
            >
              All entries
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
