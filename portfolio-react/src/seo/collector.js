/**
 * Head sink for the build-time prerender.
 *
 * <SEO> hands its head model to `captureHead` while rendering on the server;
 * scripts/prerender.mjs reads it back with `takeHead` once the route has
 * finished rendering. Routes are prerendered one at a time and each renders a
 * single <SEO>, so a module-level slot is sufficient — and `takeHead` clears it
 * so a route that somehow rendered no <SEO> fails loudly instead of silently
 * inheriting the previous route's metadata.
 *
 * This module does nothing in the browser: the `import.meta.env.SSR` guard at
 * the call site is statically false in the client build, so the branch is
 * removed at bundle time.
 */

let captured = null;

export function captureHead(head) {
  captured = head;
}

export function takeHead() {
  const head = captured;
  captured = null;
  return head;
}
