/**
 * Head model shared by the client runtime and the build-time prerenderer.
 *
 * Both paths consume the SAME `buildHead()` output, so what a crawler sees in
 * the static HTML is exactly what the SPA would have produced. There is no
 * second source of truth to drift.
 */

import { SITE_URL, person } from '../data/profile';

const DEFAULT_IMAGE = '/assets/og/og-default.png';

/** Absolute URL for a site-relative path. Never produces a double slash. */
export function absoluteUrl(path = '/') {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Canonical URLs are stored WITHOUT a trailing slash (except the root) so a
 * page can never end up with two competing canonical forms.
 */
export function canonicalUrl(path = '/') {
  if (!path || path === '/') return `${SITE_URL}/`;
  const clean = `/${path.replace(/^\/+|\/+$/g, '')}`;
  return `${SITE_URL}${clean}`;
}

/**
 * Refusal of AI use, appended to whatever indexing directive a page carries.
 *
 * Kept here, in the one place a page's robots value is assembled, so there is
 * exactly one `robots` meta per page. Declaring these in index.html instead
 * would emit a second tag whose interaction with the first is left to each
 * crawler to decide — combining them here removes the question.
 *
 * These tokens are a convention, not a standard, and a crawler that has
 * decided not to care will ignore them. Their job is to make the refusal
 * unambiguous and discoverable on every page, alongside /robots.txt, /ai.txt,
 * /.well-known/tdmrep.json and the terms of use.
 */
const AI_REFUSAL = 'noai, noimageai';

/**
 * Normalises SEO props into the complete set of tags a page needs.
 * @returns {{title:string, description:string, canonical:string, image:string,
 *   type:string, robots:string, jsonLd:object[]}}
 */
export function buildHead({
  title,
  description,
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
  robots = 'index, follow',
  jsonLd = [],
} = {}) {
  return {
    title,
    description,
    canonical: canonicalUrl(path),
    image: absoluteUrl(image),
    type,
    robots: `${robots}, ${AI_REFUSAL}`,
    jsonLd: Array.isArray(jsonLd) ? jsonLd.filter(Boolean) : [jsonLd].filter(Boolean),
  };
}

/**
 * The tag list, in the order they should appear in <head>.
 * Used by both the DOM updater and the prerenderer's HTML serialiser.
 */
export function headToTags(head) {
  return [
    { name: 'title', content: head.title },
    { name: 'description', content: head.description },
    { name: 'author', content: person.name },
    { name: 'robots', content: head.robots },
    { property: 'og:type', content: head.type },
    { property: 'og:site_name', content: person.name },
    { property: 'og:url', content: head.canonical },
    { property: 'og:title', content: head.title },
    { property: 'og:description', content: head.description },
    { property: 'og:image', content: head.image },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: head.title },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:url', content: head.canonical },
    { name: 'twitter:title', content: head.title },
    { name: 'twitter:description', content: head.description },
    { name: 'twitter:image', content: head.image },
  ].filter((t) => t.content);
}

const MANAGED = 'data-seo';

/**
 * Applies a head model to the live document. Removes previously managed tags
 * first so navigating between routes can never leave duplicates behind.
 */
export function applyHead(head) {
  if (typeof document === 'undefined') return;

  document.title = head.title;

  document.querySelectorAll(`[${MANAGED}]`).forEach((el) => el.remove());

  const frag = document.createDocumentFragment();

  for (const tag of headToTags(head)) {
    const el = document.createElement('meta');
    if (tag.name) el.setAttribute('name', tag.name);
    if (tag.property) el.setAttribute('property', tag.property);
    el.setAttribute('content', tag.content);
    el.setAttribute(MANAGED, '');
    frag.appendChild(el);
  }

  const link = document.createElement('link');
  link.setAttribute('rel', 'canonical');
  link.setAttribute('href', head.canonical);
  link.setAttribute(MANAGED, '');
  frag.appendChild(link);

  for (const block of head.jsonLd) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(block);
    script.setAttribute(MANAGED, '');
    frag.appendChild(script);
  }

  document.head.appendChild(frag);
}
