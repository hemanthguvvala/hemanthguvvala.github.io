/**
 * The list of routes that get prerendered to static HTML and listed in the
 * sitemap. Derived from the product data, so a new product with a detail page
 * is picked up automatically — there is no second list to keep in sync.
 *
 * Kept as .mjs with a plain re-read of products.js so the build scripts do not
 * need a bundler to run.
 */

import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));

/**
 * Static routes, with the sitemap priority each should carry.
 * `/404` is rendered but deliberately excluded from the sitemap.
 */
export const STATIC_ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  { path: '/products', priority: '0.9', changefreq: 'monthly' },
  { path: '/web-products', priority: '0.9', changefreq: 'monthly' },
  { path: '/services', priority: '0.9', changefreq: 'monthly' },
  { path: '/engineering', priority: '0.8', changefreq: 'yearly' },
  { path: '/about', priority: '0.8', changefreq: 'yearly' },
  { path: '/timeline', priority: '0.6', changefreq: 'yearly' },
  { path: '/awards', priority: '0.6', changefreq: 'yearly' },
  { path: '/contact', priority: '0.7', changefreq: 'yearly' },
  // Low priority on purpose: these must be indexable so a visitor can be
  // shown to have had notice of them, but they are not what the site is for.
  { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' },
];

/**
 * The articles section path, read from src/data/articles.js so renaming the
 * section is a single edit there rather than a change in two places.
 */
export async function journeyPath() {
  const source = await readFile(resolve(here, '../src/data/journey.js'), 'utf8');
  return source.match(/export const JOURNEY_PATH = '([^']+)'/)?.[1] ?? '/journey';
}

/**
 * Published articles, from the file scripts/build-articles.mjs generates.
 *
 * The index and each article are only prerendered and listed in the sitemap
 * when at least one article exists — an empty section is thin content, and
 * advertising it before there is anything to read is worse than not having it.
 */
export async function articleRoutes() {
  const generated = resolve(here, '../src/data/journey.generated.js');
  if (!existsSync(generated)) return [];

  const { generatedArticles } = await import(pathToFileURL(generated).href);
  if (!generatedArticles?.length) return [];

  const base = await journeyPath();

  return [
    { path: base, priority: '0.8', changefreq: 'weekly' },
    ...generatedArticles.map((a) => ({
      path: `${base}/${a.slug}`,
      priority: '0.7',
      changefreq: 'yearly',
      lastmod: a.date,
    })),
  ];
}

/**
 * Reads the product slugs that have detail pages straight out of products.js
 * without importing JSX-adjacent modules.
 */
export async function productRoutes() {
  const source = await readFile(resolve(here, '../src/data/products.js'), 'utf8');

  const slugs = [];
  // Walk each product literal and keep the ones flagged hasDetailPage: true.
  const blocks = source.split(/\n {2}\{\n/).slice(1);
  for (const block of blocks) {
    if (!/hasDetailPage:\s*true/.test(block)) continue;
    const slug = block.match(/slug:\s*'([^']+)'/)?.[1];
    if (slug) slugs.push(slug);
  }

  if (slugs.length === 0) {
    throw new Error(
      'routes.mjs found no product detail pages. products.js format may have changed.',
    );
  }

  return slugs.map((slug) => ({
    path: `/products/${slug}`,
    priority: '0.7',
    changefreq: 'monthly',
  }));
}

/**
 * Legacy paths, read from src/routes.js so the client redirects and the static
 * redirect stubs cannot disagree. These get a meta-refresh HTML file rather
 * than a prerendered page: on static hosting that is the only way a legacy URL
 * can answer 200 and still send visitors on to the new path.
 */
export async function redirectRoutes() {
  const source = await readFile(resolve(here, '../src/routes.js'), 'utf8');
  const block = source.match(/export const redirects = \[(.*?)\];/s)?.[1] ?? '';
  return [...block.matchAll(/from:\s*'([^']+)',\s*to:\s*'([^']+)'/g)].map((m) => ({
    from: m[1],
    to: m[2],
  }));
}

/** Every route to prerender, sitemap entries plus the noindex 404. */
export async function allRoutes() {
  const indexable = [...STATIC_ROUTES, ...(await productRoutes()), ...(await articleRoutes())];
  return {
    indexable,
    prerender: [...indexable, { path: '/404', priority: null, changefreq: null }],
    redirects: await redirectRoutes(),
  };
}
