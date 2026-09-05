import { Link } from 'react-router-dom';
import ProductIcon from './ProductIcon';
import StatusBadge from './StatusBadge';
import { CATEGORIES, PLATFORMS } from '../data/products';
import { EVENTS, trackProduct } from '../utils/analytics';

/**
 * A product card.
 *
 * Accessibility note: the card is deliberately NOT one big link. It carries
 * several independent actions (detail page, Play Store, website), so wrapping
 * it in a single anchor would make those actions unreachable and produce a
 * nested-interactive violation. The heading is the primary link; each CTA is
 * its own control with its own accessible name.
 */
export default function ProductCard({ product, eager = false }) {
  const detailPath = product.hasDetailPage ? `/products/${product.slug}` : null;
  const isArchived = product.status === 'archived';

  return (
    <article
      className={`group relative flex h-full flex-col gap-4 rounded-2xl border border-border-dark bg-card-dark/80 p-5 shadow-card transition-colors duration-300 focus-within:border-primary/50 hover:border-primary/40 sm:p-6 ${
        isArchived ? 'opacity-75' : ''
      }`}
    >
      <div className="flex items-start gap-4">
        <ProductIcon product={product} size={56} eager={eager} />

        <div className="min-w-0 flex-1">
          <h3 className="font-display text-lg font-bold leading-snug text-white">
            {detailPath ? (
              <Link
                to={detailPath}
                className="rounded outline-none transition-colors after:absolute after:inset-0 after:content-[''] hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card-dark"
                onClick={() => trackProduct(EVENTS.productOpen, product)}
              >
                {product.name}
              </Link>
            ) : (
              product.name
            )}
          </h3>

          <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-text-muted">
            <span>{PLATFORMS[product.platform]}</span>
            <span aria-hidden="true">·</span>
            <span>{CATEGORIES[product.category]}</span>
          </p>
        </div>

        <StatusBadge status={product.status} className="shrink-0" />
      </div>

      <p className="text-sm leading-relaxed text-text-secondary">{product.shortDescription}</p>

      {/* Actions sit above the stretched heading link so they stay clickable. */}
      <div className="relative z-10 mt-auto flex flex-wrap items-center gap-2 pt-1">
        {product.websiteUrl && (
          <a
            href={product.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackProduct(EVENTS.websiteClick, product)}
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg bg-primary px-3.5 text-sm font-bold text-background-dark transition-colors hover:bg-primary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Open site
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
              open_in_new
            </span>
          </a>
        )}

        {product.playStoreUrl && (
          <a
            href={product.playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackProduct(EVENTS.playStoreClick, product)}
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border border-white/10 px-3.5 text-sm font-medium text-white transition-colors hover:border-primary/50 hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
              shop
            </span>
            Google Play
          </a>
        )}

        {/* No valid destination: state why instead of inventing a link. */}
        {!product.websiteUrl && !product.playStoreUrl && (
          <span className="inline-flex min-h-[44px] cursor-not-allowed items-center rounded-lg border border-dashed border-white/10 px-3.5 text-sm text-text-muted">
            {isArchived ? 'No longer available' : 'Not released yet'}
          </span>
        )}

        {detailPath && (
          <Link
            to={detailPath}
            className="inline-flex min-h-[44px] items-center gap-1 px-1 text-sm font-medium text-text-secondary transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Learn more
            <span
              className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              arrow_forward
            </span>
          </Link>
        )}
      </div>
    </article>
  );
}
