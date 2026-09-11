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

import { createHash } from 'node:crypto';
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

/**
 * ── CONTENT SECURITY POLICY ────────────────────────────────────────────────
 *
 * Built here rather than written into index.html for one reason: the policy
 * has to pin the inline theme script by hash, and a hash typed into a file
 * goes stale the moment the script it protects is edited — silently, with the
 * only symptom being a white flash for dark-mode visitors. Hashing the built
 * output means the two can never disagree.
 *
 * It ships as a `<meta http-equiv>` because GitHub Pages cannot set response
 * headers. That has one real consequence: `frame-ancestors` is ignored in a
 * meta policy, so it is not included here and this site can be framed. With
 * no authenticated action anywhere on it there is nothing to clickjack —
 * SECURITY.md records that as an accepted limit rather than an oversight.
 *
 * `'unsafe-inline'` in style-src is not laziness either. framer-motion
 * animates by writing inline style attributes, so a policy without it would
 * stop every animation on the site.
 */
const CSP_SOURCES = {
  // Cloudflare Web Analytics: the beacon, and where it reports to.
  script: ["'self'", 'https://static.cloudflareinsights.com'],
  connect: ["'self'", 'https://cloudflareinsights.com', 'https://static.cloudflareinsights.com'],
  // Google Fonts: the stylesheet comes from one host, the font files another.
  style: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
  font: ["'self'", 'https://fonts.gstatic.com', 'data:'],
  img: ["'self'", 'data:'],
};

/** Every inline <script> in the template, hashed the way CSP hashes them. */
function inlineScriptHashes(html) {
  const hashes = [];

  for (const match of html.matchAll(/<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/gi)) {
    const [, attributes, body] = match;

    // A `type` other than a JavaScript one is data, not code — JSON-LD is the
    // case here — and CSP does not govern it.
    if (/\btype\s*=\s*["']?(?!module|text\/javascript|application\/javascript)/i.test(attributes)) {
      continue;
    }
    if (!body.trim()) continue;

    hashes.push(`'sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}'`);
  }

  if (hashes.length === 0) {
    throw new Error(
      'No inline script found to hash for the CSP. If the theme script in ' +
        'index.html was removed, drop the hash from the policy deliberately ' +
        'rather than shipping one that matches nothing.',
    );
  }

  return hashes;
}

function cspMeta(template) {
  const policy = [
    "default-src 'self'",
    `script-src ${[...CSP_SOURCES.script, ...inlineScriptHashes(template)].join(' ')}`,
    `style-src ${CSP_SOURCES.style.join(' ')}`,
    `font-src ${CSP_SOURCES.font.join(' ')}`,
    `img-src ${CSP_SOURCES.img.join(' ')}`,
    `connect-src ${CSP_SOURCES.connect.join(' ')}`,
    "object-src 'none'",
    "base-uri 'self'",
    // There is no form on this site, and a policy that says so turns an
    // injected form into a dead end.
    "form-action 'none'",
    'upgrade-insecure-requests',
  ].join('; ');

  return `<meta http-equiv="Content-Security-Policy" content="${policy}" />`;
}

async function main() {
  const template = await readFile(join(distDir, 'index.html'), 'utf8');

  if (!template.includes('<!--app-head-->') || !template.includes('<!--app-html-->')) {
    throw new Error('dist/index.html is missing the <!--app-head--> / <!--app-html--> markers.');
  }

  if (!template.includes('<!--app-csp-->')) {
    throw new Error('dist/index.html is missing the <!--app-csp--> marker.');
  }

  const csp = cspMeta(template);

  const { render } = await import(pathToFileURL(ssrEntry).href);
  const { indexable, prerender, redirects } = await allRoutes();

  const written = [];

  for (const route of prerender) {
    const { html, head } = await render(route.path);

    if (!head) {
      throw new Error(`Route ${route.path} rendered without SEO metadata.`);
    }

    const page = template
      .replace('<!--app-csp-->', csp)
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
