/**
 * Jumping to a section of an article.
 *
 * One implementation, used by the contents rail, the narrow-screen contents
 * list and the `#` link on every heading, because the browser's own handling
 * of a fragment link is wrong here in three measured ways:
 *
 * 1. `scroll-behavior: smooth` animates the jump, and a section can be 7000px
 *    away — a second and a half of flying past content, with every block on
 *    the way animating in. The reader asked to be somewhere else, not to
 *    travel there.
 * 2. That animation is fragile. The narrow-screen list collapses when an item
 *    is clicked, which removes several hundred pixels from above the target
 *    while the scroll is in flight; the layout moves under it and the scroll
 *    dies. Measured: a jump that should have landed at 7196 landed at 439.
 * 3. The body reveals blocks as they enter the viewport, and the browser fires
 *    `hashchange` before a smooth scroll has moved anywhere — so anything
 *    listening to it reveals the viewport the reader is leaving, and they
 *    arrive on a section that is still invisible.
 *
 * The `href` stays a real `#id` link, so middle-click, copy-link and a reader
 * with JavaScript blocked all still go through the browser as usual.
 */

/** True for a click the browser should handle itself (new tab, download, …). */
export const isPlainClick = (event) =>
  !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && event.button === 0;

/** One instant jump, with `scroll-behavior: smooth` suspended for it. */
function scrollToInstantly(target) {
  const html = document.documentElement;
  const previous = html.style.scrollBehavior;
  html.style.scrollBehavior = 'auto';
  target.scrollIntoView({ block: 'start' });
  html.style.scrollBehavior = previous;
}

/**
 * Put a section on screen and make it readable, in one frame.
 *
 * The alternation is not belt-and-braces, it is required. An unrevealed block
 * sits 18px below its resting place, so the first jump aims at a position the
 * reveal is about to change — measured, that left the heading 18px under the
 * navigation bar. Revealing then re-aligning fixes it, and the second reveal
 * catches whatever that 18px shift brought into view. Everything here is
 * synchronous and instant, so the reader sees a single jump.
 *
 * ProseMotion owns the reveal and listens for the event.
 */
export function alignAndReveal(target) {
  const reveal = () => window.dispatchEvent(new Event('prose:reveal-now'));

  scrollToInstantly(target);
  reveal();
  scrollToInstantly(target);
  reveal();
}

export function jumpToSection(id) {
  const target = document.getElementById(id);
  if (!target) return;

  // Push first, so the entry left behind remembers the position it was at and
  // Back returns the reader to where they were reading.
  history.pushState(null, '', `#${id}`);
  alignAndReveal(target);
}
