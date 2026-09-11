import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * Reading progress for a long journey entry: a hairline bar across the top of
 * the viewport, and a back-to-top button that appears once the reader is far
 * enough in for it to be useful.
 *
 * WHY A SPRING RATHER THAN THE RAW SCROLL VALUE
 * ---------------------------------------------
 * `scrollYProgress` tracks the wheel exactly, which reads as twitchy on a
 * trackpad. A stiff spring keeps the bar honest about position while smoothing
 * the jitter out of it.
 *
 * Both pieces are decorative: the bar is `aria-hidden`, and the button is a
 * convenience over a keyboard Home key that already works. framer-motion
 * honours prefers-reduced-motion through <MotionConfig reducedMotion="user">
 * in App.jsx, so neither needs its own check.
 */
export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, { stiffness: 320, damping: 40, restDelta: 0.001 });

  // The ring is drawn with a dash offset, so the button needs progress as a
  // length rather than a fraction. 100 is the circle's circumference below.
  const dash = useTransform(width, (v) => 100 - Math.min(1, Math.max(0, v)) * 100);

  const [past, setPast] = useState(false);

  useEffect(() => {
    // `on('change')` rather than a scroll listener: the same value the bar is
    // already subscribed to, so this adds no extra work per frame.
    const stop = scrollYProgress.on('change', (v) => setPast(v > 0.12));
    return stop;
  }, [scrollYProgress]);

  const toTop = () =>
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });

  return (
    <>
      <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]">
        <motion.div
          style={{ scaleX: width }}
          className="h-full origin-left bg-gradient-to-r from-primary/40 via-primary to-primary-light shadow-glow"
        />
      </div>

      <AnimatePresence>
        {past && (
          <motion.button
            type="button"
            onClick={toTop}
            aria-label="Back to top"
            initial={{ opacity: 0, scale: 0.6, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 12 }}
            transition={{ type: 'spring', stiffness: 420, damping: 28 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="fixed bottom-6 right-5 z-50 grid size-12 place-items-center rounded-full border border-border-dark bg-card-dark/90 text-strong backdrop-blur-sm transition-colors hover:border-primary/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:bottom-8 sm:right-8"
          >
            {/* r = 15.9155 makes the circumference exactly 100, so the dash
                values above are readable as percentages. */}
            <svg viewBox="0 0 36 36" className="absolute inset-0 size-full -rotate-90">
              <circle
                cx="18"
                cy="18"
                r="15.9155"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-line/10"
              />
              <motion.circle
                cx="18"
                cy="18"
                r="15.9155"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="100"
                style={{ strokeDashoffset: dash }}
                className="text-primary"
              />
            </svg>
            <span className="material-symbols-outlined relative text-[20px]" aria-hidden="true">
              arrow_upward
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
