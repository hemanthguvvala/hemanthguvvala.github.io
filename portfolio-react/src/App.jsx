import { Suspense, lazy, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ParticleField from './components/ParticleField';
import Analytics from './components/Analytics';
import ErrorBoundary from './components/ErrorBoundary';
import { redirects, routes } from './routes';
import './App.css';

// Home is the most common entry point, so it stays in the main chunk rather
// than costing a second request on first paint. Every other page is split.
import Home from './pages/Home';

const EAGER = { '/': Home };

const clientRoutes = routes.map((r) => ({
  path: r.path,
  Component: EAGER[r.path] ?? lazy(r.load),
}));

/**
 * Restores scroll on navigation. Keyed on pathname only — the products page
 * keeps its filter in the query string, and jumping to the top on every filter
 * change would be disorienting.
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function RouteFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-live="polite">
      <span className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}

/**
 * Layout shared by the browser app and the prerenderer. Holds everything
 * outside the routed content so the two entry points cannot drift apart.
 */
export function AppShell({ children }) {
  const { pathname } = useLocation();

  return (
    // "user" makes framer-motion honour prefers-reduced-motion across the whole
    // tree, so individual components don't each have to check.
    <MotionConfig reducedMotion="user">
      <div className="app">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:font-bold focus:text-background-dark"
        >
          Skip to main content
        </a>

        <Analytics />
        <div className="animated-grid" aria-hidden="true" />
        {pathname === '/' && <ParticleField />}

        <Navigation />
        {/* Scoped to the routed content: a broken page keeps the header,
            footer and navigation, so the visitor always has a way out. */}
        <main id="main-content">
          <ErrorBoundary resetKey={pathname}>{children}</ErrorBoundary>
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}

/** Redirect routes, shared by both entry points. */
export function RedirectRoutes() {
  return redirects.map((r) => (
    <Route key={r.from} path={r.from} element={<Navigate to={r.to} replace />} />
  ));
}

export default function App() {
  return (
    <AppShell>
      <ScrollToTop />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          {clientRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          {RedirectRoutes()}
        </Routes>
      </Suspense>
    </AppShell>
  );
}
