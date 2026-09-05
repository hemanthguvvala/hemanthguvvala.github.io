/**
 * Analytics scaffold — deliberately NOT wired to any provider.
 *
 * No analytics vendor is loaded by this site today. This module exists so that
 * outbound clicks are already instrumented at the call sites; adding a provider
 * later means implementing `dispatch()` once, not hunting through JSX.
 *
 * Privacy rules for whoever wires this up:
 *   - Never send personal data. No email, no name, no free-text input.
 *   - Payloads stay to a small, enumerable set of ids and categories.
 *   - Prefer a cookieless, privacy-respecting provider.
 */

/** Enumerated event names. Keep this list small and stable. */
export const EVENTS = {
  productOpen: 'product_open',
  playStoreClick: 'play_store_click',
  websiteClick: 'product_website_click',
  resumeDownload: 'resume_download',
  contactClick: 'contact_click',
  socialClick: 'social_click',
  filterChange: 'product_filter_change',
};

function dispatch(name, payload) {
  // No provider configured. Kept observable in development only.
  if (import.meta.env.DEV) {
    console.debug('[analytics]', name, payload);
  }
}

/**
 * @param {string} name  one of EVENTS
 * @param {Record<string, string|number|boolean>} [payload] non-personal only
 */
export function track(name, payload = {}) {
  if (!Object.values(EVENTS).includes(name)) return;
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
