import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { isPlainClick, jumpToSection } from '../utils/sections';

/**
 * Contents for a journey entry, in two shapes from one source: a fixed rail
 * beside the article on wide screens, and a collapsible list on narrow ones.
 *
 * The list comes from `article.toc`, generated at build time, so it is in the
 * prerendered HTML — it is a navigation aid and a set of internal links, not
 * something to assemble from the DOM after hydration.
 */

/**
 * Which section the reader is in.
 *
 * Deliberately a scroll position check rather than an IntersectionObserver on
 * the headings: a section longer than the viewport has no heading intersecting
 * anything, and the rail would go blank in the middle of it. "The last heading
 * that has passed the top of the screen" is always answerable.
 */
function useActiveSection(toc) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (toc.length === 0) return undefined;

    let frame = 0;

    const measure = () => {
      frame = 0;

      // Just past the 6rem scroll-padding a jumped-to heading lands on, so the
      // section a reader was sent to is the one the rail highlights.
      const line = 104;
      let current = null;

      for (const { id } of toc) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }

      // Anything left over at the very bottom belongs to the last section —
      // a short final section may never reach the line on its own.
      const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 80;
      setActive(atBottom ? toc[toc.length - 1].id : current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [toc]);

  return active;
}

/** The rail. Hidden until there is room for it beside the 48rem article. */
export function ArticleTocRail({ toc }) {
  const active = useActiveSection(toc);

  if (toc.length < 3) return null;

  return (
    // The rail slides in with CSS, not framer-motion, so it is still there for
    // a reader with JavaScript blocked. Only the marker below needs a runtime.
    <nav
      aria-label="On this page"
      className="rail-enter fixed top-32 z-30 hidden max-h-[70vh] w-[12rem] overflow-y-auto xl:block xl:left-[calc(50%-37.5rem)]"
    >
      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
        On this page
      </p>

      <ul className="flex list-none flex-col gap-0.5 border-l border-line/10">
        {toc.map(({ id, text }) => {
          const on = active === id;
          return (
            <li key={id} className="relative">
              {/* One element moved between items rather than eleven fading in
                  and out — the eye follows a single travelling marker. */}
              {on && (
                <motion.span
                  layoutId="toc-marker"
                  aria-hidden="true"
                  transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  className="absolute -left-px top-1 h-[calc(100%-0.5rem)] w-[2px] rounded-full bg-primary"
                />
              )}
              <a
                href={`#${id}`}
                onClick={(event) => {
                  // A modified click is the reader opening this in a tab or
                  // copying it, which the href already handles.
                  if (!isPlainClick(event)) return;
                  event.preventDefault();
                  jumpToSection(id);
                }}
                aria-current={on ? 'true' : undefined}
                className={`block py-1.5 pl-3 pr-1 text-[13px] leading-snug transition-colors ${
                  on ? 'text-strong' : 'text-text-muted hover:text-text-secondary'
                }`}
              >
                {text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** The same list for narrow screens, where the rail has nowhere to sit. */
export function ArticleTocInline({ toc }) {
  const [open, setOpen] = useState(false);
  // The section a click asked for, held until the list has finished
  // collapsing. Jumping before then measures a layout that is about to move.
  const [pending, setPending] = useState(null);
  const active = useActiveSection(toc);

  if (toc.length < 3) return null;

  return (
    <div className="mt-8 rounded-2xl border border-border-dark bg-card-dark/60 xl:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-muted">
          Contents · {toc.length} sections
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="material-symbols-outlined text-[20px] text-primary"
          aria-hidden="true"
        >
          expand_more
        </motion.span>
      </button>

      {/* The jump waits for onExitComplete — the list has to be out of the
          layout before the target's position means anything. */}
      <AnimatePresence
        initial={false}
        onExitComplete={() => {
          if (!pending) return;
          jumpToSection(pending);
          setPending(null);
        }}
      >
        {open && (
          <motion.div
            key="toc"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <ol className="flex list-none flex-col gap-1 px-5 pb-5">
              {toc.map(({ id, text }, i) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={(event) => {
                      if (!isPlainClick(event)) return;
                      event.preventDefault();
                      setPending(id);
                      setOpen(false);
                    }}
                    aria-current={active === id ? 'true' : undefined}
                    className={`flex gap-3 rounded-lg px-2 py-2 text-sm transition-colors hover:bg-primary/10 ${
                      active === id ? 'text-strong' : 'text-text-secondary'
                    }`}
                  >
                    <span className="font-mono text-xs text-primary/70">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {text}
                  </a>
                </li>
              ))}
            </ol>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
