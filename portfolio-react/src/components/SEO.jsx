import { useEffect } from 'react';
import { captureHead } from '../seo/collector';
import { applyHead, buildHead } from '../seo/head';

/**
 * Declarative per-route <head>.
 *
 *   <SEO title="…" description="…" path="/products" jsonLd={[…]} />
 *
 * In the browser it rewrites the managed head tags on every route change.
 * During the build-time prerender the same head model is handed to the
 * collector, which scripts/prerender.mjs serialises into the static HTML.
 * One code path, so the static HTML and the SPA cannot disagree.
 */
export default function SEO(props) {
  const head = buildHead(props);

  // Statically false in the client bundle, so this branch is stripped there.
  if (import.meta.env.SSR) captureHead(head);

  // Serialised so the effect re-runs on content change, not on identity.
  const key = JSON.stringify(head);
  useEffect(() => {
    applyHead(JSON.parse(key));
  }, [key]);

  return null;
}
