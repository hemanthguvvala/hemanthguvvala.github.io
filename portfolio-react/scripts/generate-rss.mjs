/**
 * Writes dist/rss.xml from the compiled articles.
 *
 * RSS is how writing gets distributed without depending on a platform — feed
 * readers, newsletter tools and aggregators all consume it. It costs one small
 * file at build time and nothing at runtime.
 *
 * The feed carries each article's `description`, not its full HTML: a summary
 * feed brings readers to the site, where the products and services they might
 * actually want are one click away.
 *
 * Writes nothing when there are no published articles — an empty feed is worse
 * than no feed, because readers subscribe once and never come back.
 */

import { writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { journeyPath } from './routes.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const distDir = join(root, 'dist');

const SITE_URL = 'https://hemanthguvvala.github.io';
const AUTHOR = 'Hemanth Kumar Guvvala';

/** XML has five predefined entities; escape all of them. */
const esc = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

/** RFC 822, which is what RSS 2.0 requires — not ISO 8601. */
const rfc822 = (isoDate) => new Date(`${isoDate}T00:00:00Z`).toUTCString();

async function main() {
  const generated = resolve(root, 'src/data/journey.generated.js');
  if (!existsSync(generated)) {
    console.log('No compiled articles; skipping rss.xml.');
    return;
  }

  const { generatedArticles } = await import(pathToFileURL(generated).href);
  if (!generatedArticles?.length) {
    console.log('No published articles; skipping rss.xml.');
    return;
  }

  const base = await journeyPath();
  const feedUrl = `${SITE_URL}/rss.xml`;

  const items = generatedArticles
    .map((a) => {
      const url = `${SITE_URL}${base}/${a.slug}`;
      return `    <item>
      <title>${esc(a.title)}</title>
      <link>${esc(url)}</link>
      <guid isPermaLink="true">${esc(url)}</guid>
      <description>${esc(a.description)}</description>
      <pubDate>${rfc822(a.date)}</pubDate>
${(a.tags ?? []).map((t) => `      <category>${esc(t)}</category>`).join('\n')}
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(AUTHOR)} — Articles</title>
    <link>${esc(`${SITE_URL}${base}`)}</link>
    <description>Notes on building and shipping independent software products.</description>
    <language>en</language>
    <lastBuildDate>${rfc822(generatedArticles[0].date)}</lastBuildDate>
    <atom:link href="${esc(feedUrl)}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  await writeFile(join(distDir, 'rss.xml'), xml);
  console.log(`Wrote rss.xml with ${generatedArticles.length} item(s).`);
}

main().catch((err) => {
  console.error('RSS generation failed:\n', err);
  process.exit(1);
});
