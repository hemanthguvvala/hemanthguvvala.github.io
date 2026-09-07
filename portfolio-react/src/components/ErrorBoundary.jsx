import { Component } from 'react';
import { EVENTS, track } from '../utils/analytics';

/**
 * Catches render errors so one broken component cannot blank the whole site.
 *
 * Without this, any exception thrown during render unmounts the entire React
 * tree and the visitor is left staring at an empty page — no navigation, no
 * explanation, nothing to click. That is the worst possible failure for a site
 * whose job is to send people to products and a contact form.
 *
 * It wraps the routed content only, so the header and footer survive the
 * failure and the visitor always has a way out.
 *
 * Must be a class: `componentDidCatch` has no hook equivalent, and pulling in
 * react-error-boundary for this would add a dependency to avoid twenty lines.
 */
export default class ErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error, info) {
    // Same pipeline as the global handlers in utils/observability.js.
    track(EVENTS.clientError, {
      kind: 'render',
      message: String(error?.message ?? error).slice(0, 300),
      path: typeof location !== 'undefined' ? location.pathname.slice(0, 120) : '',
      component: String(info?.componentStack ?? '')
        .trim()
        .split('\n')[0]
        .slice(0, 120),
    });
  }

  /**
   * Resets on navigation. Without this the fallback would persist while the
   * user clicks around, because the boundary's state survives a route change.
   */
  componentDidUpdate(prevProps) {
    if (this.state.failed && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ failed: false });
    }
  }

  render() {
    if (!this.state.failed) return this.props.children;

    return (
      <div className="flex min-h-[60vh] items-center justify-center px-5 py-32">
        <div className="w-full max-w-lg text-center">
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-primary">
            Something broke
          </p>
          <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-strong sm:text-4xl">
            This page didn&rsquo;t load properly
          </h1>
          <p className="mt-4 leading-relaxed text-text-secondary">
            That is a fault on my side, not yours. Reloading usually fixes it.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-on-primary transition-colors hover:bg-primary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Reload the page
            </button>
            {/* A plain anchor, not a Link: the router is what may have failed. */}
            <a
              href="/"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-line/10 px-5 text-sm font-bold text-strong transition-colors hover:border-primary/50 hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Go home
            </a>
            <a
              href="/products"
              className="inline-flex min-h-[48px] items-center px-4 text-sm font-medium text-text-secondary transition-colors hover:text-primary"
            >
              Browse products
            </a>
          </div>
        </div>
      </div>
    );
  }
}
