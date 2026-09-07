/**
 * Journey — the public API over the compiled Markdown.
 *
 * The Markdown in content/journey/ is the source of truth. This module wraps
 * the generated output so nothing else imports a generated file directly.
 *
 * ── WHAT THIS SECTION IS ───────────────────────────────────────────────────
 * Building in public: what shipping a product actually taught me, what an
 * experiment showed, why a product decision went the way it did. Each article
 * can name the products it is about, which is what makes this an ecosystem
 * rather than a blog — a reader arriving from search lands on a real account of
 * building something, and the product it describes is one click away.
 *
 * Deep technical reference material belongs on CodeDepth. Publishing that here
 * too would split search authority between two sites competing for the same
 * queries.
 *
 * ── THE SECTION NAME LIVES HERE ────────────────────────────────────────────
 * `JOURNEY_PATH` and `JOURNEY_LABEL` are the only places the section is named.
 * Routes, navigation, canonical URLs, breadcrumbs, the sitemap and the RSS feed
 * all derive from them, and scripts/routes.mjs reads the path back out of this
 * file, so renaming the section is a two-line edit.
 */

import { CATEGORIES, generatedArticles } from './journey.generated';

export const JOURNEY_PATH = '/journey';
export const JOURNEY_LABEL = 'Journey';

export const JOURNEY_CATEGORIES = CATEGORIES;

/** Published articles, newest first. Drafts are dropped at build time. */
export const articles = generatedArticles;

export const hasArticles = articles.length > 0;

export const articlePath = (slug) => `${JOURNEY_PATH}/${slug}`;

export const getArticle = (slug) => articles.find((a) => a.slug === slug) ?? null;

export const categoryLabel = (key) => JOURNEY_CATEGORIES[key] ?? key;

/** Most recent articles — used on the homepage. */
export const recentArticles = (limit = 3) => articles.slice(0, limit);

/** Categories that actually have articles, with real counts. */
export const activeCategories = () =>
  Object.entries(JOURNEY_CATEGORIES)
    .map(([key, label]) => ({
      key,
      label,
      count: articles.filter((a) => a.category === key).length,
    }))
    .filter((c) => c.count > 0);

/** Every tag in use, most frequent first. */
export const activeTags = () => {
  const counts = new Map();
  for (const a of articles) for (const t of a.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([tag, count]) => ({ tag, count }));
};

/** Articles that mention a given product — powers the product → story link. */
export const articlesForProduct = (slug) => articles.filter((a) => a.products.includes(slug));

/**
 * Related reading. Prefers articles sharing a product, then a category, then a
 * tag — strongest relationship first, so suggestions stay genuinely relevant
 * rather than filling a row for its own sake.
 */
export function relatedArticles(article, limit = 2) {
  const others = articles.filter((a) => a.slug !== article.slug);
  const score = (a) =>
    (a.products.some((p) => article.products.includes(p)) ? 4 : 0) +
    (a.category === article.category ? 2 : 0) +
    (a.tags.some((t) => article.tags.includes(t)) ? 1 : 0);

  return others
    .map((a) => ({ a, s: score(a) }))
    .filter(({ s }) => s > 0)
    .sort((x, y) => y.s - x.s || y.a.date.localeCompare(x.a.date))
    .slice(0, limit)
    .map(({ a }) => a);
}

/**
 * Previous/next in publication order. `articles` is newest first, so the next
 * article to read is the one *older* than this — the direction a reader
 * working back through the journey expects.
 */
export function articleNeighbours(slug) {
  const i = articles.findIndex((a) => a.slug === slug);
  if (i === -1) return { previous: null, next: null };
  return {
    previous: articles[i - 1] ?? null, // newer
    next: articles[i + 1] ?? null, // older
  };
}

/** Display date. Fixed locale and UTC so server and client render identically. */
export function formatDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
