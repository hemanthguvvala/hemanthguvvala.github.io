import { useEffect, useRef } from 'react';

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
      // The heading text already names the section; announcing "#" after it
      // adds nothing a screen reader user wants to hear.
      anchor.setAttribute('aria-hidden', 'true');
      anchor.tabIndex = -1;
      heading.append(anchor);
    }

    /* ── A section link the reader arrived on ─────────────────────────────
       The browser tries this before the route's chunk has loaded, so by the
       time the heading exists the attempt is long over. Done here, where the
       ids are, and before the reveal below classifies what is on screen —
       otherwise every block around the target counts as off-screen and the
       reader lands on a section that then fades in around them. */
    const target = window.location.hash.slice(1);
    if (target) {
      const heading = root.querySelector(`[id="${CSS.escape(decodeURIComponent(target))}"]`);
      if (heading) {
        // The jump has to complete before the reveal below measures what is on
        // screen, so `scroll-behavior: smooth` is suspended for it. Left
        // smooth, the measurement happens while the page is still at the top,
        // every block around the target is classified as off-screen, and the
        // reader arrives on a section that then fades in around them.
        const html = document.documentElement;
        const previous = html.style.scrollBehavior;
        html.style.scrollBehavior = 'auto';
        heading.scrollIntoView({ block: 'start' });
        html.style.scrollBehavior = previous;
      }
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

    for (const block of root.children) {
      // Anything already on screen is shown immediately. Animating it would
      // mean hiding text the reader can see, one frame after they saw it.
      if (block.getBoundingClientRect().top < window.innerHeight * 0.92) {
        block.classList.add('is-in');
      } else {
        io.observe(block);
      }
    }

    return () => {
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
