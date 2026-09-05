import { prerenderToNodeStream } from 'react-dom/static';
// React Router v7 exports StaticRouter from the core package;
// the v6 'react-router-dom/server' entry point no longer exists.
import { Route, Routes, StaticRouter } from 'react-router';
import { AppShell, RedirectRoutes } from './App';
import { routes } from './routes';
import { takeHead } from './seo/collector';

/**
 * Build-time render entry. Used only by scripts/prerender.mjs.
 *
 * WHY THE ROUTES ARE RESOLVED EAGERLY
 * -----------------------------------
 * The browser build wraps each page in React.lazy. Reusing that tree here
 * would make every route suspend, and React would emit the Suspense fallback —
 * a spinner — in document order, appending the real markup after the footer
 * inside a hidden element for client script to swap in. The content is
 * technically present, but a static file whose visible markup is a spinner
 * defeats the point of prerendering.
 *
 * Resolving the loaders first means nothing suspends, so each page is emitted
 * inline and in order as ordinary HTML. The route list is shared with the
 * client (src/routes.js), so the two entry points cannot drift.
 *
 * Resolution is deferred to the first render() call rather than done with a
 * top-level await: the SSR bundle inlines its dynamic imports into a single
 * file, so running the loaders during module evaluation would touch page
 * bindings that have not been initialised yet.
 */
let routesPromise = null;

function loadRoutes() {
  routesPromise ??= Promise.all(
    routes.map(async (r) => ({ path: r.path, Component: (await r.load()).default })),
  );
  return routesPromise;
}

function ServerApp({ resolved }) {
  return (
    <AppShell>
      <Routes>
        {resolved.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
        {RedirectRoutes()}
      </Routes>
    </AppShell>
  );
}

export async function render(url) {
  const resolved = await loadRoutes();

  const { prelude } = await prerenderToNodeStream(
    <StaticRouter location={url}>
      <ServerApp resolved={resolved} />
    </StaticRouter>,
  );

  let html = '';
  for await (const chunk of prelude) html += chunk;

  // Read after the stream drains: <SEO> captures during render.
  return { html, head: takeHead() };
}
