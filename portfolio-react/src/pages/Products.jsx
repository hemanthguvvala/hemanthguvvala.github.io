import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEO from '../components/SEO';
import SectionHeader from '../components/SectionHeader';
import ProductGrid from '../components/ProductGrid';
import CTASection from '../components/CTASection';
import {
  CATEGORIES,
  PLAY_DEVELOPER_URL,
  isRenderableCard,
  products,
} from '../data/products';
import { person } from '../data/profile';
import { breadcrumbSchema, productListSchema, webPageSchema } from '../seo/jsonld';
import { EVENTS, track } from '../utils/analytics';

/**
 * Filters are derived from the data, so adding a product in a new category
 * makes its filter appear automatically. Counts are always real.
 */
const FILTERS = [
  { key: 'all', label: 'All', match: () => true },
  { key: 'android', label: 'Mobile Apps', match: (p) => p.platform === 'android' },
  { key: 'web', label: 'Web Products', match: (p) => p.platform === 'web' },
  ...Object.entries(CATEGORIES).map(([key, label]) => ({
    key,
    label,
    match: (p) => p.category === key,
  })),
  { key: 'archived', label: 'Archived', match: (p) => p.status === 'archived' },
];

/** Archived products are excluded from every filter except "Archived" itself. */
const visibleFor = (filter) => {
  const f = FILTERS.find((x) => x.key === filter) ?? FILTERS[0];
  return products.filter((p) => {
    if (f.key !== 'archived' && p.status === 'archived') return false;
    return f.match(p);
  });
};

const counts = Object.fromEntries(
  FILTERS.map((f) => [f.key, visibleFor(f.key).filter(isRenderableCard).length]),
);

export default function Products() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState('');

  const active = FILTERS.some((f) => f.key === params.get('category'))
    ? params.get('category')
    : 'all';

  const setFilter = (key) => {
    // Keep the default filter out of the URL so /products stays canonical.
    setParams(key === 'all' ? {} : { category: key }, { replace: true });
    track(EVENTS.filterChange, { filter: key });
  };

  const results = useMemo(() => {
    const base = visibleFor(active);
    const q = query.trim().toLowerCase();
    if (!q) return base;
    return base.filter((p) =>
      [p.name, p.shortDescription, p.tagline, CATEGORIES[p.category], ...(p.keywords ?? [])]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(q),
    );
  }, [active, query]);

  const cards = results.filter(isRenderableCard);

  // The ItemList must describe what this page actually shows on load, which is
  // the default (non-archived) view. Listing archived products in structured
  // data that a visitor only sees behind a filter is a markup/schema mismatch.
  const listed = visibleFor('all').filter(isRenderableCard);

  return (
    <div className="pb-section-lg pt-32">
      <SEO
        title={`Products by ${person.name} | Apps & Web Products`}
        description="Explore mobile apps, web products, utilities, games, productivity tools and developer-focused products built by Hemanth Kumar Guvvala."
        path="/products"
        jsonLd={[
          webPageSchema({
            title: `Products by ${person.name}`,
            description:
              'Mobile apps, web products and developer tools designed, built and launched by Hemanth Kumar Guvvala.',
            path: '/products',
          }),
          productListSchema(listed),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Products', path: '/products' },
          ]),
        ]}
      />

      <div className="mx-auto max-w-content px-5 sm:px-6 lg:px-8">
        <SectionHeader
          as="h1"
          eyebrow="Product directory"
          title="Products I've built"
          description="A collection of mobile apps, web products and experiments I've designed, built and launched. Each keeps its own identity — what they share is that one person builds and maintains them."
        />

        {/* ── Filters + search ── */}
        <div className="mt-10 flex flex-col gap-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div
              role="group"
              aria-label="Filter products by type"
              className="-mx-1 flex flex-wrap gap-2 px-1"
            >
              {FILTERS.filter((f) => counts[f.key] > 0).map((f) => {
                const isActive = active === f.key;
                return (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => setFilter(f.key)}
                    aria-pressed={isActive}
                    className={`inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border px-3.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                      isActive
                        ? 'border-primary bg-primary/15 text-primary'
                        : 'border-border-dark bg-card-dark/60 text-text-secondary hover:border-primary/40 hover:text-strong'
                    }`}
                  >
                    {f.label}
                    <span className="font-mono text-[11px] opacity-70">{counts[f.key]}</span>
                  </button>
                );
              })}
            </div>

            <div className="relative lg:w-72">
              <label htmlFor="product-search" className="sr-only">
                Search products
              </label>
              <span
                className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-text-muted"
                aria-hidden="true"
              >
                search
              </span>
              <input
                id="product-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products"
                className="min-h-[44px] w-full rounded-lg border border-border-dark bg-card-dark/60 pl-10 pr-3 text-sm text-strong placeholder:text-text-muted focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>

          <p aria-live="polite" className="font-mono text-xs text-text-muted">
            {cards.length} {cards.length === 1 ? 'product' : 'products'}
            {query.trim() && ` matching “${query.trim()}”`}
          </p>
        </div>

        <div className="mt-8">
          <ProductGrid
            products={cards}
            eagerCount={3}
            // Cards sit directly under this page's h1, so they are h2 here.
            headingLevel={2}
            emptyMessage={
              query.trim()
                ? `Nothing matches “${query.trim()}”. Try a different search.`
                : 'No products in this category yet.'
            }
          />
        </div>

        <p className="mt-10 text-sm text-text-muted">
          Looking for everything on Google Play?{' '}
          <a
            href={PLAY_DEVELOPER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary underline underline-offset-4 hover:text-primary-light"
          >
            View all apps on the developer page
          </a>
          .
        </p>

        <div className="mt-16">
          <CTASection />
        </div>
      </div>
    </div>
  );
}
