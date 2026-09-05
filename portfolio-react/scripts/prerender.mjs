/**
 * Static prerender for GitHub Pages.
 *
 * WHY THIS EXISTS
 * ---------------
 * GitHub Pages has no server-side routing. The previous setup shipped a single
 * index.html plus a 404.html that bounced deep links back to `/?p=<path>` with
 * JavaScript. Browsers coped, but every deep route answered crawlers with
 * **HTTP 404** — including six of the seven URLs advertised in sitemap.xml.
 *
 * The fix is to stop asking the server to route at all: render every known
 * route to a real HTML file at build time. `/products` is then a genuine file
 * that returns HTTP 200 with its content already in the markup.
 *
 * Each route is written twice, on purpose:
 *   dist/products.html        → serves /products
 *   dist/products/index.html  → serves /products/
 * GitHub Pages resolves extensionless URLs in different ways depending on
 * whether a matching file or directory exists. Writing both means a 200 either
 * way, and both copies carry the same canonical URL so there is no duplicate
 * content risk.
 *
 * 404.html is still generated — it is the correct response for genuinely
 * unknown URLs — but it now renders the branded 404 page instead of
 * redirecting, and it carries `noindex`.
 */

import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { allRoutes } from './routes.mjs';

const SITE_URL = 'https://hemanthguvvala.github.io';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const distDir = join(root, 'dist');
const ssrEntry = join(root, 'dist-ssr', 'entry-server.js');

const escapeHtml = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** JSON-LD must not be able to break out of its script element. */
const safeJson = (obj) => JSON.stringify(obj).replace(/</g, '\\u003c');

function renderHead(head) {
  if (!head) return '';

  const tags = [
    `<title>${escapeHtml(head.title)}</title>`,
    `<link rel="canonical" href="${escapeHtml(head.canonical)}" />`,
    `<meta name="description" content="${escapeHtml(head.description)}" />`,
    `<meta name="robots" content="${escapeHtml(head.robots)}" />`,
    `<meta property="og:type" content="${escapeHtml(head.type)}" />`,
    `<meta property="og:url" content="${escapeHtml(head.canonical)}" />`,
    `<meta property="og:title" content="${escapeHtml(head.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(head.description)}" />`,
    `<meta property="og:image" content="${escapeHtml(head.image)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escapeHtml(head.title)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:url" content="${escapeHtml(head.canonical)}" />`,
    `<meta name="twitter:title" content="${escapeHtml(head.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(head.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(head.image)}" />`,
  ];

  for (const block of head.jsonLd ?? []) {
    tags.push(`<script type="application/ld+json">${safeJson(block)}</script>`);
  }

  return tags.join('\n    ');
}

async function main() {
  const template = await readFile(join(distDir, 'index.html'), 'utf8');

  if (!template.includes('<!--app-head-->') || !template.includes('<!--app-html-->')) {
    throw new Error('dist/index.html is missing the <!--app-head--> / <!--app-html--> markers.');
  }

  const { render } = await import(pathToFileURL(ssrEntry).href);
  const { indexable, prerender, redirects } = await allRoutes();

  const written = [];

  for (const route of prerender) {
    const { html, head } = await render(route.path);

    if (!head) {
      throw new Error(`Route ${route.path} rendered without SEO metadata.`);
    }

    const page = template
      .replace('<!--app-head-->', renderHead(head))
      .replace('<!--app-html-->', html);

    if (route.path === '/') {
      await writeFile(join(distDir, 'index.html'), page);
      written.push('index.html');
      continue;
    }

    if (route.path === '/404') {
      await writeFile(join(distDir, '404.html'), page);
      written.push('404.html');
      continue;
    }

    const rel = route.path.replace(/^\//, '');

    // Directory form: /products/ and /products/quickscan/
    await mkdir(join(distDir, rel), { recursive: true });
    await writeFile(join(distDir, rel, 'index.html'), page);

    // Flat form: /products and /products/quickscan
    await mkdir(dirname(join(distDir, `${rel}.html`)), { recursive: true });
    await writeFile(join(distDir, `${rel}.html`), page);

    written.push(`${rel}/index.html + ${rel}.html`);
  }

  // Legacy paths: a 200 with a meta refresh and a canonical pointing at the
  // new URL. Without this they would fall through to 404.html, which answers
  // HTTP 404 and only recovers once the SPA has booted.
  for (const { from, to } of redirects) {
    const target = `${SITE_URL}${to}`;
    const stub = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Moved to ${to}</title>
    <link rel="canonical" href="${target}" />
    <meta name="robots" content="noindex, follow" />
    <meta http-equiv="refresh" content="0; url=${to}" />
  </head>
  <body>
    <p>This page has moved to <a href="${to}">${target}</a>.</p>
  </body>
</html>
`;
    const rel = from.replace(/^\//, '');
    await mkdir(join(distDir, rel), { recursive: true });
    await writeFile(join(distDir, rel, 'index.html'), stub);
    await writeFile(join(distDir, `${rel}.html`), stub);
    written.push(`${rel} → ${to} (redirect)`);
  }

  // The SSR bundle is a build artifact, not something to deploy.
  await rm(join(root, 'dist-ssr'), { recursive: true, force: true });

  console.log(`\nPrerendered ${prerender.length} routes:`);
  for (const w of written) console.log(`  ✓ ${w}`);
  console.log(`\n${indexable.length} indexable routes will be listed in sitemap.xml.`);
}

main().catch((err) => {
  console.error('\nPrerender failed:\n', err);
  process.exit(1);
});
