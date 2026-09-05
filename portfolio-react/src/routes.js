/**
 * The one route table.
 *
 * Both entry points read this list:
 *  - the browser (src/App.jsx) wraps each `load` in React.lazy, so every page
 *    stays in its own chunk;
 *  - the prerenderer (src/entry-server.jsx) awaits every `load` up front and
 *    renders the resolved components eagerly, so nothing suspends and the
 *    static HTML comes out inline instead of behind a Suspense placeholder.
 *
 * Adding a page means adding one entry here and, if it should be indexed, one
 * entry in scripts/routes.mjs.
 */

export const routes = [
  { path: '/', load: () => import('./pages/Home') },
  { path: '/products', load: () => import('./pages/Products') },
  { path: '/products/:slug', load: () => import('./pages/ProductDetail') },
  { path: '/web-products', load: () => import('./pages/WebProducts') },
  { path: '/services', load: () => import('./pages/Services') },
  { path: '/engineering', load: () => import('./pages/Engineering') },
  { path: '/about', load: () => import('./pages/About') },
  { path: '/timeline', load: () => import('./pages/Timeline') },
  { path: '/awards', load: () => import('./pages/Awards') },
  { path: '/contact', load: () => import('./pages/Contact') },
  { path: '*', load: () => import('./pages/NotFound') },
];

/** Legacy paths kept alive as redirects so old links and bookmarks still work. */
export const redirects = [{ from: '/skills', to: '/engineering' }];
