/**
 * Client-side error capture.
 *
 * ── SCOPE ──────────────────────────────────────────────────────────────────
 * Core Web Vitals are NOT collected here. Cloudflare Web Analytics measures
 * LCP, CLS, INP and friends itself, from the real navigation timeline, and a
 * second PerformanceObserver would only duplicate that with worse data. If the
 * beacon is ever removed, that is the moment to add vitals here — not before.
 *
 * What Cloudflare does not do is tell you when JavaScript threw. That is what
 * this module is for: it catches uncaught errors and unhandled promise
 * rejections, reduces them to a small non-identifying shape, and hands them to
 * the analytics layer as a `client_error` event.
 *
 * ── HONEST LIMITATION ──────────────────────────────────────────────────────
 * Until a sink is registered (see utils/analytics.js), those events are shaped
 * and then dropped — Cloudflare's beacon cannot receive custom events on a
 * domain it does not proxy. Installing this now means that the day a sink
 * exists, error reporting starts working with no further changes.
 */

import { EVENTS, track } from './analytics';

/** Errors per page load, so a render loop cannot flood the sink. */
const MAX_REPORTS = 5;
let reported = 0;

/** URLs and messages can carry query strings; keep only what is diagnostic. */
function scrub(value, max = 300) {
  if (typeof value !== 'string') return '';
  return value.split('?')[0].slice(0, max);
}

function report(kind, message, source, line, column) {
  if (reported >= MAX_REPORTS) return;
  reported += 1;

  track(EVENTS.clientError, {
    kind,
    message: scrub(message),
    // Path only — never the full URL, which could carry query parameters.
    path: typeof location !== 'undefined' ? scrub(location.pathname, 120) : '',
    source: scrub(source, 200),
    line: Number.isFinite(line) ? line : 0,
    column: Number.isFinite(column) ? column : 0,
  });
}

/**
 * Installs the global handlers. Safe to call once from the browser entry only;
 * it no-ops during prerendering, where `window` does not exist.
 */
export function installErrorCapture() {
  if (typeof window === 'undefined') return;

  window.addEventListener('error', (event) => {
    // Resource load failures (img, script) surface here with no `error` object
    // and would otherwise be reported as blank messages.
    if (!event.error && !event.message) return;
    report('error', event.message, event.filename, event.lineno, event.colno);
  });

  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    const message =
      reason instanceof Error ? `${reason.name}: ${reason.message}` : String(reason ?? 'unknown');
    report('unhandledrejection', message);
  });
}
