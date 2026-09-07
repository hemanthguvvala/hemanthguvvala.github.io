/**
 * Compiles content/journey/*.md into src/data/journey.generated.js.
 *
 * WHY A BUILD STEP RATHER THAN RUNTIME PARSING
 * --------------------------------------------
 * Parsing Markdown in the browser would ship a parser to every visitor to
 * render text that never changes between deploys. Compiling here keeps `marked`
 * a devDependency, puts plain HTML strings in the bundle, and lets the
 * prerenderer emit complete article HTML with no runtime work.
 *
 * Runs before `dev` and `build`. The generated file is gitignored — it is
 * derived, and committing it invites edits to the output instead of the source.
 *
 * ── FRONTMATTER ────────────────────────────────────────────────────────────
 * Required:  title, description, date, category
 * Optional:  updated, tags, products, keyTakeaway, slug, draft, coverImage
 *
 *   ---
 *   title: Why I removed ads from PDF Toolkit
 *   description: One sentence for search results and social cards.
 *   date: 2026-09-06
 *   updated: 2026-09-20
 *   category: experiments
 *   tags: [android, monetisation]
 *   products: [pdf-toolkit]        # slugs from src/data/products.js
 *   keyTakeaway: The single sentence a reader should leave with.
 *   ---
 *
 * `products` is what makes an article part of the ecosystem rather than a blog
 * post: it renders real product cards and creates the article → product link
 * that the site is built around. Slugs are validated against products.js at
 * build time, so a typo fails the build instead of rendering a dead card.
 */

import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const contentDir = join(root, 'content', 'journey');
const outFile = join(root, 'src', 'data', 'journey.generated.js');

/**
 * Categories. Keys are URL-safe and used for filtering; labels are what a
 * reader sees. Adding one here makes its filter appear automatically.
 */
const CATEGORIES = {
  building: 'Building',
  findings: 'Findings',
  experiments: 'Experiments',
  engineering: 'Engineering',
  product: 'Product',
  business: 'Business',
};

/**
 * Minimal frontmatter parser. Deliberately not a YAML library: the supported
 * shape is `key: value` plus `[a, b]` lists, which is all an article needs.
 */
function parseFrontmatter(raw, file) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) throw new Error(`${file}: missing frontmatter block (--- ... ---)`);

  const meta = {};
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith('#')) continue;

    const sep = line.indexOf(':');
    if (sep === -1) throw new Error(`${file}: cannot parse frontmatter line "${line}"`);

    const key = line.slice(0, sep).trim();
    let value = line.slice(sep + 1).trim();

    if (/^\[.*\]$/.test(value)) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((v) => v.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean);
    } else {
      value = value.replace(/^['"]|['"]$/g, '');
      if (value === 'true') value = true;
      else if (value === 'false') value = false;
    }
    meta[key] = value;
  }

  return { meta, body: match[2] };
}

/** Rough reading time. Presented as an estimate in the UI, never as a fact. */
function readingMinutes(markdown) {
  const words = markdown.replace(/```[\s\S]*?```/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

/** Product slugs, so `products:` references can be validated at build time. */
async function knownProductSlugs() {
  const source = await readFile(resolve(root, 'src/data/products.js'), 'utf8');
  return new Set([...source.matchAll(/slug: '([^']+)'/g)].map((m) => m[1]));
}

const isDate = (v) => /^\d{4}-\d{2}-\d{2}$/.test(String(v));

async function main() {
  await mkdir(dirname(outFile), { recursive: true });
  if (!existsSync(contentDir)) await mkdir(contentDir, { recursive: true });

  const productSlugs = await knownProductSlugs();

  // Skip the authoring guide and underscore-prefixed files (templates, drafts).
  const files = (await readdir(contentDir)).filter(
    (f) => f.endsWith('.md') && !f.startsWith('_') && f !== 'README.md',
  );

  const articles = [];
  let drafts = 0;

  for (const file of files.sort()) {
    const { meta, body } = parseFrontmatter(await readFile(join(contentDir, file), 'utf8'), file);

    if (meta.draft === true) {
      drafts += 1;
      continue;
    }

    for (const required of ['title', 'description', 'date', 'category']) {
      if (!meta[required]) throw new Error(`${file}: frontmatter is missing "${required}"`);
    }

    if (!isDate(meta.date)) throw new Error(`${file}: date must be YYYY-MM-DD, got "${meta.date}"`);
    if (meta.updated && !isDate(meta.updated)) {
      throw new Error(`${file}: updated must be YYYY-MM-DD, got "${meta.updated}"`);
    }
    if (!CATEGORIES[meta.category]) {
      throw new Error(
        `${file}: unknown category "${meta.category}". Valid: ${Object.keys(CATEGORIES).join(', ')}`,
      );
    }

    const products = Array.isArray(meta.products) ? meta.products : [];
    for (const slug of products) {
      if (!productSlugs.has(slug)) {
        throw new Error(`${file}: products references unknown product slug "${slug}"`);
      }
    }

    const slug = meta.slug || file.replace(/\.md$/, '');
    if (articles.some((a) => a.slug === slug)) {
      throw new Error(`${file}: duplicate slug "${slug}"`);
    }

    articles.push({
      slug,
      title: meta.title,
      description: meta.description,
      date: String(meta.date),
      updated: meta.updated ? String(meta.updated) : null,
      category: meta.category,
      tags: Array.isArray(meta.tags) ? meta.tags : [],
      products,
      keyTakeaway: meta.keyTakeaway || null,
      coverImage: meta.coverImage || null,
      // A placeholder is a real, structurally complete article whose content is
      // illustrative. Flagged so the UI can label it honestly rather than
      // passing example writing off as a genuine account.
      placeholder: meta.placeholder === true,
      readingMinutes: readingMinutes(body),
      html: marked.parse(body, { async: false, gfm: true, breaks: false }),
    });
  }

  // Newest first — the order the index, the homepage and the feed all want.
  articles.sort((a, b) => b.date.localeCompare(a.date));

  const banner = `/**
 * GENERATED FILE — DO NOT EDIT.
 *
 * Written by scripts/build-journey.mjs from content/journey/*.md.
 * Edit the Markdown source, not this file. Regenerate with \`npm run journey\`.
 */\n\n`;

  await writeFile(
    outFile,
    `${banner}export const CATEGORIES = ${JSON.stringify(CATEGORIES, null, 2)};\n\n` +
      `export const generatedArticles = ${JSON.stringify(articles, null, 2)};\n`,
  );

  const n = articles.length;
  console.log(
    `Compiled ${n} journey article${n === 1 ? '' : 's'}` +
      `${drafts ? ` (${drafts} draft${drafts === 1 ? '' : 's'} skipped)` : ''}.`,
  );
}

main().catch((err) => {
  console.error('\nJourney build failed:\n', err.message ?? err);
  process.exit(1);
});
