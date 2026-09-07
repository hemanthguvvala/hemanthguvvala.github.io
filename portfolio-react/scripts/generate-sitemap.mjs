/**
 * Generates dist/sitemap.xml from the same route list the prerenderer uses.
 *
 * Only routes that were actually prerendered — and therefore return HTTP 200 —
 * are listed. The 404 page is excluded by construction.
 *
 * `lastmod` is the date of the last commit that touched the repository, which
 * is a real, defensible value. If git is unavailable the field is omitted
 * rather than guessed.
 */

import { execSync } from 'node:child_process';
import { writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { allRoutes } from './routes.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(here, '..', 'dist');

const SITE_URL = 'https://hemanthguvvala.github.io';

function lastCommitDate() {
  try {
    return execSync('git log -1 --format=%cs', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return null;
  }
}

async function main() {
  const { indexable } = await allRoutes();
  const lastmod = lastCommitDate();

  const urls = indexable
    .map((route) => {
      const loc = route.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${route.path}`;
      return [
        '  <url>',
        `    <loc>${loc}</loc>`,
        // An article carries its own publication date; everything else falls
        // back to the last commit that touched the repository.
        (route.lastmod ?? lastmod)
          ? `    <lastmod>${route.lastmod ?? lastmod}</lastmod>`
          : null,
        `    <changefreq>${route.changefreq}</changefreq>`,
        `    <priority>${route.priority}</priority>`,
        '  </url>',
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  await writeFile(join(distDir, 'sitemap.xml'), xml);
  console.log(`Wrote sitemap.xml with ${indexable.length} URLs (lastmod: ${lastmod ?? 'omitted'}).`);
}

main().catch((err) => {
  console.error('Sitemap generation failed:\n', err);
  process.exit(1);
});
