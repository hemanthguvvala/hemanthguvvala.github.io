import { useEffect, useRef } from 'react';

const BEACON_SRC = 'https://static.cloudflareinsights.com/beacon.min.js';

/**
 * Cloudflare Web Analytics.
 *
 * Collects page views and Core Web Vitals. It is cookieless, does not
 * fingerprint, and stores no personal data — which is why this site needs no
 * consent banner and why it fits a portfolio whose own apps are privacy-first.
 *
 * The beacon hooks the History API, so client-side route changes are counted
 * without any help from the router. Do not add manual page-view tracking on
 * top of it; you get double counts.
 *
 * ── ACTIVATION ─────────────────────────────────────────────────────────────
 * Set VITE_CF_BEACON_TOKEN at build time. Without it this component renders
 * nothing, which is the correct behaviour for local development, previews and
 * anyone who forks the repo.
 *
 * The token is not a secret — Cloudflare beacon tokens are visible in the page
 * source of every site that uses them — but it is kept in an env var so the
 * repo stays deployable by someone else without silently reporting into this
 * site's dashboard.
 *
 * Loaded from a script tag rather than index.html so it can be skipped in
 * development, skipped during prerendering, and skipped for visitors who have
 * asked not to be tracked.
 */
export default function Analytics() {
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;

    const token = import.meta.env.VITE_CF_BEACON_TOKEN;
    if (!token) return;
    if (import.meta.env.DEV) return;

    // Honour Do Not Track even though the beacon is already anonymous.
    if (navigator.doNotTrack === '1' || window.doNotTrack === '1') return;

    if (document.querySelector(`script[src="${BEACON_SRC}"]`)) return;

    loaded.current = true;

    const script = document.createElement('script');
    script.src = BEACON_SRC;
    script.defer = true;
    script.setAttribute('data-cf-beacon', JSON.stringify({ token }));
    document.head.appendChild(script);
  }, []);

  return null;
}
