import { motion } from 'framer-motion';

/**
 * A small thank-you at the end of an entry.
 *
 * It only means anything if it is earned, so it animates in when it is
 * scrolled to rather than on load, and it says how long the reader actually
 * stayed. Decorative: the hand is hidden from screen readers, and the sentence
 * reads the same without it.
 */
export default function ArticleEnd({ minutes }) {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ type: 'spring', stiffness: 220, damping: 26 }}
      className="mt-12 flex items-center gap-3.5 rounded-2xl border border-primary/20 bg-primary/[0.06] px-5 py-4"
    >
      <span className="wave select-none text-2xl leading-none" aria-hidden="true">
        👋
      </span>
      <p className="text-sm leading-relaxed text-text-secondary">
        <strong className="font-bold text-strong">You made it to the end.</strong> All{' '}
        {minutes} minutes of it. If any of it was useful, tell me — I read every reply.
      </p>
    </motion.aside>
  );
}
