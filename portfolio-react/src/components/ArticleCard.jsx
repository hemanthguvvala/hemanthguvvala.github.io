import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { articlePath, categoryLabel, formatDate } from '../data/journey';
import { EVENTS, track } from '../utils/analytics';

/**
 * A journey article in list form.
 *
 * Like ProductCard, the heading carries a stretched link rather than wrapping
 * the whole card in an anchor — that keeps the markup free of nested
 * interactive elements while the entire card stays clickable.
 *
 * `headingLevel` lets the same card sit under an h1 on the journey index and
 * under an h2 on the homepage without either page skipping a heading level.
 */
export default function ArticleCard({ article, headingLevel = 2, from }) {
  const Heading = `h${headingLevel}`;

  return (
    // The same 3px lift the article page gives its cards, so a card behaves
    // the same wherever a reader meets one. Reduced motion is handled globally
    // by <MotionConfig reducedMotion="user">.
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="group relative flex h-full flex-col rounded-2xl border border-border-dark bg-card-dark/70 p-6 transition-colors focus-within:border-primary/50 hover:border-primary/40 sm:p-7"
    >
      <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-text-muted">
        <span className="text-primary">{categoryLabel(article.category)}</span>
        <span aria-hidden="true">·</span>
        <time dateTime={article.date}>{formatDate(article.date)}</time>
        <span aria-hidden="true">·</span>
        <span>{article.readingMinutes} min read</span>
      </p>

      <Heading className="mt-2.5 font-display text-xl font-bold leading-snug text-strong">
        <Link
          to={articlePath(article.slug)}
          onClick={() =>
            track(EVENTS.articleView, {
              slug: article.slug,
              category: article.category,
              ...(from ? { from } : {}),
            })
          }
          className="rounded outline-none transition-colors after:absolute after:inset-0 after:content-[''] hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card-dark"
        >
          {article.title}
        </Link>
      </Heading>

      <p className="mt-2.5 leading-relaxed text-text-secondary">{article.description}</p>

      {/* Placeholders are labelled rather than quietly shipped as real writing. */}
      {article.placeholder && (
        <p className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-md border border-gold/30 bg-gold/10 px-2.5 py-1 font-mono text-[11px] text-gold">
          Example entry
        </p>
      )}

      {article.tags.length > 0 && (
        <ul className="mt-4 flex list-none flex-wrap gap-2">
          {article.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md border border-border-dark bg-surface px-2.5 py-1 font-mono text-[11px] text-text-secondary"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </motion.article>
  );
}
