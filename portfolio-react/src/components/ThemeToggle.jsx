import { useSyncExternalStore } from 'react';

const STORAGE_KEY = 'theme';
const CHANGE_EVENT = 'themechange';

/**
 * The theme lives outside React — it is an attribute on <html>, set before
 * first paint by the inline script in index.html, plus a system media query.
 * `useSyncExternalStore` is the right primitive for exactly that: it reads the
 * live value rather than mirroring it into component state, so there is no
 * setState-in-effect and no window where the two disagree.
 */
function subscribe(onChange) {
  const mq = window.matchMedia('(prefers-color-scheme: light)');
  mq.addEventListener('change', onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    mq.removeEventListener('change', onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

function getSnapshot() {
  const explicit = document.documentElement.getAttribute('data-theme');
  if (explicit === 'light' || explicit === 'dark') return explicit;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

/**
 * During prerendering there is no document to read. Returning null makes the
 * static HTML render the placeholder below, and the real control appears once
 * hydrated — which is correct, because the right icon is unknowable on the
 * server and guessing would show the wrong one for a frame.
 */
const getServerSnapshot = () => null;

/**
 * Light/dark switch.
 *
 * The theme is applied before first paint by the inline script in index.html;
 * this only reflects and changes it. That ordering is what prevents a
 * dark-mode visitor seeing a white flash on every page load.
 */
export default function ThemeToggle({ className = '' }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);

    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Private mode can refuse storage; the theme still applies for this visit.
    }

    // Keep the browser UI colour in step with the page.
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', next === 'light' ? '#f6faf8' : '#0f231f');

    window.dispatchEvent(new Event(CHANGE_EVENT));
  };

  // Reserve the space so the header does not shift once the control appears.
  if (theme === null) {
    return <span className={`block size-10 ${className}`} aria-hidden="true" />;
  }

  const goingTo = theme === 'light' ? 'dark' : 'light';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${goingTo} theme`}
      title={`Switch to ${goingTo} theme`}
      className={`flex size-10 items-center justify-center rounded-lg border border-line/10 text-text-secondary transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${className}`}
    >
      <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
        {theme === 'light' ? 'dark_mode' : 'light_mode'}
      </span>
    </button>
  );
}
