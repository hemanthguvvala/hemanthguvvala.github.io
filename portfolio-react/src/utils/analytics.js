/**
 * Analytics event layer.
 *
 * ── WHAT IS ACTUALLY COLLECTED ─────────────────────────────────────────────
 * Cloudflare Web Analytics (see components/Analytics.jsx) collects page views
 * and Core Web Vitals. It is cookieless, does not fingerprint visitors, and
 * stores no personal data, so it needs no consent banner.
 *
 * ── WHAT IS NOT ────────────────────────────────────────────────────────────
 * Cloudflare's free beacon has NO custom-events API on a domain that is not
 * proxied through Cloudflare, and hemanthguvvala.github.io cannot be proxied.
 * So every `track()` call below is captured, shaped and then dropped unless a
 * sink is registered. This is deliberate and honest: the instrumentation is
 * real and the call sites are correct, but nothing receives the events yet.
 *
 * To start collecting them, register a sink once at startup:
 *
 *   import { setSink } from './utils/analytics';
 *   setSink((name, payload) => myProvider.track(name, payload));
 *
 * Anything with a custom-event API works — Plausible, Umami, GoatCounter, a
 * serverless function of your own. No call site has to change.
 *
 * ── PRIVACY RULES FOR ANY SINK ─────────────────────────────────────────────
 *  - Never send personal data. No email, no name, no free-text input.
 *  - Payloads stay within a small, enumerable set of ids and categories.
 *  - Honour Do Not Track, as `track()` already does below.
 */

/** Enumerated event names. Keep this list small and stable. */
export const EVENTS = {
  pageView: 'page_view',

  // Journey
  articleView: 'article_view',
  articleCategoryView: 'article_category_view',
  articleSearch: 'article_search',
  articleShare: 'article_share',
  relatedArticleClick: 'related_article_click',

  // Products
  productOpen: 'product_open',
  playStoreClick: 'play_store_click',
  websiteClick: 'product_website_click',
  resumeDownload: 'resume_download',
  contactClick: 'contact_click',
  socialClick: 'social_click',
  filterChange: 'product_filter_change',

  // Opportunity funnel
  workWithMeClick: 'work_with_me_click',
  outboundLinkClick: 'outbound_link_click',

  clientError: 'client_error',
};

/**
 * The registered destination for events. Null until `setSink` is called, which
 * is the current production state — see the module comment.
 * @type {null | ((name: string, payload: object) => void)}
 */
let sink = null;

/** Registers the destination for tracked events. Call once at startup. */
export function setSink(fn) {
  sink = typeof fn === 'function' ? fn : null;
}

/** Whether the visitor has asked not to be tracked. */
function trackingRefused() {
  if (typeof navigator === 'undefined') return false;
  return navigator.doNotTrack === '1' || window.doNotTrack === '1';
}

function dispatch(name, payload) {
  if (import.meta.env.DEV) {
    console.debug('[analytics]', name, payload);
  }

  if (!sink) return;

  // A broken analytics call must never break the page.
  try {
    sink(name, payload);
  } catch {
    /* swallow: telemetry is never worth a user-visible failure */
  }
}

/**
 * @param {string} name  one of EVENTS
 * @param {Record<string, string|number|boolean>} [payload] non-personal only
 */
export function track(name, payload = {}) {
  if (!Object.values(EVENTS).includes(name)) return;
  if (trackingRefused()) return;
  dispatch(name, payload);
}

/** Convenience helper for product CTAs so call sites stay one-liners. */
export function trackProduct(name, product, extra = {}) {
  track(name, {
    slug: product.slug,
    platform: product.platform,
    category: product.category,
    status: product.status,
    ...extra,
  });
}
