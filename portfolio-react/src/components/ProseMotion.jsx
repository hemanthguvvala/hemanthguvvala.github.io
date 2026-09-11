import { useEffect, useRef } from 'react';
import { alignAndReveal, isPlainClick, jumpToSection } from '../utils/sections';

/**
 * The article body, with the three things a long entry earns: blocks that
 * arrive as you scroll to them, a copy button on every code block, and a link
 * on every heading.
 *
 * WHY THIS IS DOM WORK RATHER THAN COMPONENTS
 * -------------------------------------------
 * The body is one compiled HTML string from scripts/build-journey.mjs, so
 * there are no React children here to wrap in <motion.div>. Parsing that
 * string into a component tree to animate it would ship a parser to every
 * reader and put the site's own writing behind a runtime transform.
 *
 * WHY THE REVEAL IS OPT-IN RATHER THAN OPT-OUT
 * --------------------------------------------
 * `data-reveal` is set here, on the client, and the CSS that hides a block
 * before it scrolls into view is scoped to that attribute. So the prerendered
 * HTML — the copy Google reads and the page a reader gets with JavaScript
 * blocked — is fully visible. An animation must never be the reason an article
 * cannot be read.
 *
 * Nothing below runs when the reader has asked for reduced motion, which also
 * means the attribute is never set and the CSS never applies.
 */
export default function ProseMotion({ html, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;

    const timers = new Set();
    const observers = new Set();

    /* ── Code blocks: a wrapper, so the button cannot scroll away ──────────
       `pre` scrolls horizontally, and an absolutely positioned child of a
       scrolling box slides out of sight with the content. The button belongs
       to a static wrapper around it instead. */
    for (const pre of root.querySelectorAll('pre')) {
      if (pre.parentElement?.classList.contains('prose-code')) continue;

      const wrap = document.createElement('div');
      wrap.className = 'prose-code';
      pre.replaceWith(wrap);
      wrap.append(pre);

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'prose-copy';
      button.setAttribute('aria-label', 'Copy code');
      button.innerHTML =
        '<span class="material-symbols-outlined" aria-hidden="true">content_copy</span>' +
        '<span class="prose-copy-label">Copy</span>';

      button.addEventListener('click', async () => {
        const text = (pre.querySelector('code') ?? pre).textContent ?? '';
        try {
          await navigator.clipboard.writeText(text);
        } catch {
          return; // Clipboard access can be refused; say nothing rather than lie.
        }

        button.classList.add('is-copied');
        button.querySelector('.prose-copy-label').textContent = 'Copied';

        const t = setTimeout(() => {
          button.classList.remove('is-copied');
          const label = button.querySelector('.prose-copy-label');
          if (label) label.textContent = 'Copy';
          timers.delete(t);
        }, 1800);
        timers.add(t);
      });

      wrap.append(button);
    }

    /* ── Headings: a link to the section, revealed on hover or focus ─────── */
    for (const heading of root.querySelectorAll('h2[id], h3[id]')) {
      if (heading.querySelector('.heading-anchor')) continue;

      const anchor = document.createElement('a');
      anchor.className = 'heading-anchor';
      anchor.href = `#${heading.id}`;
      anchor.textContent = '#';
      // Same jump the contents lists make. Left to the browser, a smooth
      // scroll fires `hashchange` before it has moved, so the reveal below
      // would show the viewport being left rather than the one arrived at.
      anchor.addEventListener('click', (event) => {
        if (!isPlainClick(event)) return;
        event.preventDefault();
        jumpToSection(heading.id);
      });
      // The heading text already names the section; announcing "#" after it
      // adds nothing a screen reader user wants to hear.
      anchor.setAttribute('aria-hidden', 'true');
      anchor.tabIndex = -1;
      heading.append(anchor);
    }

    /* ── The reveal ──────────────────────────────────────────────────────── */
    // No observer, no way to reveal anything later — so leave the article
    // alone rather than hiding text that would never come back.
    if (
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return () => {
        for (const t of timers) clearTimeout(t);
      };
    }

    root.dataset.reveal = 'on';

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.02 },
    );
    observers.add(io);

    /**
     * Show, with no animation at all, everything that is on screen right now.
     *
     * Used at setup and again after a jump from the contents list. Two reasons
     * it is `is-shown` (no transition) rather than `is-in` (transition):
     * animating a block the reader is already looking at means hiding text one
     * frame after they saw it; and an unrevealed block sits 18px low, so a
     * jump cannot align to it while that offset is still transitioning away.
     */
    const revealVisible = () => {
      for (const block of root.children) {
        // `is-in` is deliberately not skipped: a block the observer has just
        // started fading in is still 18px low for half a second, and a jump
        // cannot align to a target that is mid-transition. Adding `is-shown`
        // snaps it to its resting place.
        if (block.classList.contains('is-shown')) continue;
        const { top, bottom } = block.getBoundingClientRect();
        if (bottom > 0 && top < window.innerHeight * 0.92) {
          block.classList.add('is-shown');
          io.unobserve(block);
        } else if (!block.classList.contains('is-in')) {
          io.observe(block);
        }
      }
    };

    revealVisible();
    window.addEventListener('prose:reveal-now', revealVisible);
    // Any jump the browser makes itself: a heading's own `#` link, a
    // middle-click opened in this tab, Back and Forward between sections.
    // Those do not go through the contents list, and waiting for the observer
    // to catch up means landing on a section that is still invisible.
    window.addEventListener('hashchange', revealVisible);

    /* ── A section link the reader arrived on ─────────────────────────────
       The browser tries this itself, but it does so before the route's
       code-split chunk has loaded, so by the time the heading exists the
       attempt is long over. Done here, where the ids are, and deliberately
       after the reveal is listening — `alignAndReveal` needs it. */
    const fragment = window.location.hash.slice(1);
    if (fragment) {
      const arrived = root.querySelector(`[id="${CSS.escape(decodeURIComponent(fragment))}"]`);
      if (arrived) alignAndReveal(arrived);
    }

    return () => {
      window.removeEventListener('prose:reveal-now', revealVisible);
      window.removeEventListener('hashchange', revealVisible);
      for (const t of timers) clearTimeout(t);
      for (const o of observers) o.disconnect();
    };
  }, [html]);

  return (
    /*
      Compiled at build time by scripts/build-journey.mjs from Markdown in this
      repository — first-party content from a trusted source, never user input.
      That is what makes dangerouslySetInnerHTML acceptable here.
    */
    <article
      ref={ref}
      className={`article-prose ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
