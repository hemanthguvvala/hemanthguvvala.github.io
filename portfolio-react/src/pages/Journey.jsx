import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SEO from '../components/SEO';
import SectionHeader from '../components/SectionHeader';
import ArticleCard from '../components/ArticleCard';
import {
  JOURNEY_LABEL,
  JOURNEY_PATH,
  activeCategories,
  articles,
  categoryLabel,
} from '../data/journey';
import { person } from '../data/profile';
import { breadcrumbSchema, personSchema, webPageSchema } from '../seo/jsonld';
import { EVENTS, track } from '../utils/analytics';

const categories = activeCategories();

export default function Journey() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState('');

  const active = categories.some((c) => c.key === params.get('category'))
    ? params.get('category')
    : 'all';

  const setCategory = (key) => {
    // Keep the default out of the URL so /journey stays canonical.
    setParams(key === 'all' ? {} : { category: key }, { replace: true });
    track(EVENTS.articleCategoryView, { category: key });
  };

  const results = useMemo(() => {
    const base = active === 'all' ? articles : articles.filter((a) => a.category === active);
    const q = query.trim().toLowerCase();
    if (!q) return base;
    return base.filter((a) =>
      [a.title, a.description, a.keyTakeaway, categoryLabel(a.category), ...a.tags]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(q),
    );
  }, [active, query]);

  return (
    <div className="pb-section-lg pt-32">
      <SEO
        title={`${JOURNEY_LABEL} — Building in public | ${person.name}`}
        description="Notes from building and shipping independent software products: what worked, what did not, what the data showed, and what I would do differently."
        path={JOURNEY_PATH}
        jsonLd={[
          webPageSchema({
            title: `${JOURNEY_LABEL} by ${person.name}`,
            description: 'Building products, running experiments and documenting what I learn.',
            path: JOURNEY_PATH,
          }),
          personSchema(),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: JOURNEY_LABEL, path: JOURNEY_PATH },
          ]),
        ]}
      />

      <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
        <SectionHeader
          as="h1"
          eyebrow={JOURNEY_LABEL}
          title="Building products, and writing down what I learn"
          description="Each entry is an account of something I actually built, changed or measured — what I was trying to do, what happened, and what I would do differently. The products these describe are one click away."
        />

        {articles.length === 0 ? (
          <p className="mt-12 rounded-2xl border border-dashed border-border-dark px-6 py-12 text-center text-text-secondary">
            Nothing published yet. The first entry is on its way.
          </p>
        ) : (
          <>
            {/* Filters + search */}
            <div className="mt-10 flex flex-col gap-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div
                  role="group"
                  aria-label="Filter entries by category"
                  className="-mx-1 flex flex-wrap gap-2 px-1"
                >
                  {[{ key: 'all', label: 'All', count: articles.length }, ...categories].map((c) => {
                    const isActive = active === c.key;
                    return (
                      <button
                        key={c.key}
                        type="button"
                        onClick={() => setCategory(c.key)}
                        aria-pressed={isActive}
                        className={`inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border px-3.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                          isActive
                            ? 'border-primary bg-primary/15 text-primary'
                            : 'border-border-dark bg-card-dark/60 text-text-secondary hover:border-primary/40 hover:text-white'
                        }`}
                      >
                        {c.label}
                        <span className="font-mono text-[11px] opacity-70">{c.count}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="relative lg:w-64">
                  <label htmlFor="journey-search" className="sr-only">
                    Search entries
                  </label>
                  <span
                    className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-text-muted"
                    aria-hidden="true"
                  >
                    search
                  </span>
                  <input
                    id="journey-search"
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onBlur={(e) => e.target.value.trim() && track(EVENTS.articleSearch, {})}
                    placeholder="Search entries"
                    className="min-h-[44px] w-full rounded-lg border border-border-dark bg-card-dark/60 pl-10 pr-3 text-sm text-white placeholder:text-text-muted focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
              </div>

              <p aria-live="polite" className="font-mono text-xs text-text-muted">
                {results.length} {results.length === 1 ? 'entry' : 'entries'}
                {query.trim() && ` matching “${query.trim()}”`}
              </p>
            </div>

            {results.length === 0 ? (
              <p className="mt-8 rounded-2xl border border-dashed border-border-dark px-6 py-12 text-center text-text-secondary">
                Nothing matches that. Try a different search or category.
              </p>
            ) : (
              <ul className="mt-8 flex list-none flex-col gap-4">
                {results.map((article) => (
                  <li key={article.slug}>
                    <ArticleCard article={article} headingLevel={2} from="journey-index" />
                  </li>
                ))}
              </ul>
            )}

            <p className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-text-muted">
              <a
                href="/rss.xml"
                className="font-medium text-primary underline underline-offset-4 hover:text-primary-light"
              >
                Subscribe via RSS
              </a>
              <Link to="/products" className="transition-colors hover:text-primary">
                See the products these are about
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
