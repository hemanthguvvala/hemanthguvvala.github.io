import { Link, useParams } from 'react-router-dom';
import SEO from '../components/SEO';
import ProductIcon from '../components/ProductIcon';
import StatusBadge from '../components/StatusBadge';
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
  const related = relatedArticles(article);
  const { previous, next } = articleNeighbours(article.slug);

  return (
    <div className="pb-section-lg pt-32">
      <SEO
        title={`${article.title} | ${person.name}`}
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

        {/* ── Header ── */}
        <header className="flex flex-col gap-4 border-b border-white/5 pb-8">
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

          <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
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

        {/* ── Key takeaway, surfaced before the body ── */}
        {article.keyTakeaway && (
          <aside
            aria-label="Key takeaway"
            className="mt-10 rounded-2xl border border-primary/25 bg-primary/5 p-6"
          >
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
              Key takeaway
            </p>
            <p className="mt-2.5 leading-relaxed text-white">{article.keyTakeaway}</p>
          </aside>
        )}

        {/*
          Compiled at build time by scripts/build-journey.mjs from Markdown in
          this repository — first-party content from a trusted source, never
          user input. That is what makes dangerouslySetInnerHTML acceptable here.
        */}
        <article
          className="article-prose mt-10"
          dangerouslySetInnerHTML={{ __html: article.html }}
        />

        {/* ── Article → product. The ecosystem link that matters most. ── */}
        {products.length > 0 && (
          <section
            aria-labelledby="article-products"
            className="mt-16 border-t border-white/5 pt-10"
          >
            <h2 id="article-products" className="font-display text-xl font-bold text-white">
              {products.length === 1 ? 'The product this is about' : 'Products this is about'}
            </h2>

            <ul className="mt-5 flex list-none flex-col gap-4">
              {products.map((p) => {
                const url = p.websiteUrl ?? p.playStoreUrl;
                return (
                  <li
                    key={p.slug}
                    className="flex flex-col gap-4 rounded-2xl border border-border-dark bg-card-dark/70 p-5 sm:flex-row sm:items-center sm:gap-5"
                  >
                    <ProductIcon product={p} size={52} />

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="font-display font-bold text-white">{p.name}</h3>
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
                          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-bold text-background-dark transition-colors hover:bg-primary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
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
                          className="inline-flex min-h-[44px] items-center rounded-lg border border-white/10 px-4 text-sm font-medium text-white transition-colors hover:border-primary/50 hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                          Details
                        </Link>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {/* ── Previous / next ── */}
        {(previous || next) && (
          <nav
            aria-label="More entries"
            className="mt-14 grid gap-4 border-t border-white/5 pt-10 sm:grid-cols-2"
          >
            {previous ? (
              <Link
                to={articlePath(previous.slug)}
                onClick={() => track(EVENTS.relatedArticleClick, { direction: 'previous' })}
                className="flex flex-col gap-1.5 rounded-xl border border-border-dark bg-card-dark/70 p-4 transition-colors hover:border-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                  ← Newer
                </span>
                <span className="font-display font-bold text-white">{previous.title}</span>
              </Link>
            ) : (
              <span />
            )}

            {next && (
              <Link
                to={articlePath(next.slug)}
                onClick={() => track(EVENTS.relatedArticleClick, { direction: 'next' })}
                className="flex flex-col gap-1.5 rounded-xl border border-border-dark bg-card-dark/70 p-4 text-right transition-colors hover:border-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:col-start-2"
              >
                <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                  Older →
                </span>
                <span className="font-display font-bold text-white">{next.title}</span>
              </Link>
            )}
          </nav>
        )}

        {/* ── Related reading ── */}
        {related.length > 0 && (
          <section aria-labelledby="related-reading" className="mt-14 border-t border-white/5 pt-10">
            <h2 id="related-reading" className="font-display text-xl font-bold text-white">
              Related reading
            </h2>
            <ul className="mt-5 flex list-none flex-col gap-3">
              {related.map((a) => (
                <li key={a.slug}>
                  <Link
                    to={articlePath(a.slug)}
                    onClick={() => track(EVENTS.relatedArticleClick, { slug: a.slug })}
                    className="flex flex-col gap-1 rounded-xl border border-border-dark bg-card-dark/70 p-4 transition-colors hover:border-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-wider text-primary">
                      {categoryLabel(a.category)}
                    </span>
                    <span className="font-display font-bold text-white">{a.title}</span>
                    <span className="text-sm text-text-secondary">{a.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ── Back into the ecosystem ── */}
        <section className="mt-14 rounded-2xl border border-border-dark bg-surface/30 p-6 sm:p-7">
          <h2 className="font-display text-lg font-bold text-white">
            Want to see what I&rsquo;m building?
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
            Everything written about here is a real product you can use. I also take on client work.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to="/products"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-background-dark transition-colors hover:bg-primary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Explore products
            </Link>
            <Link
              to="/services"
              onClick={() => track(EVENTS.workWithMeClick, { from: `journey:${article.slug}` })}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/10 px-5 text-sm font-bold text-white transition-colors hover:border-primary/50 hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
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
