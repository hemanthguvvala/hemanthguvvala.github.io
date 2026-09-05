import ProductCard from './ProductCard';
import { isRenderableCard } from '../data/products';

/**
 * Renders product cards, skipping entries that have no description yet — a
 * card with an empty body reads as broken rather than as "coming soon".
 * Those entries are surfaced separately by <BuildingStrip>.
 *
 * `eagerCount` keeps above-the-fold icons out of lazy loading so the first
 * screen does not shift as images arrive.
 */
export default function ProductGrid({ products, eagerCount = 0, columns = 3, emptyMessage }) {
  const renderable = products.filter(isRenderableCard);

  if (renderable.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-border-dark px-6 py-12 text-center text-text-secondary">
        {emptyMessage ?? 'No products match this filter.'}
      </p>
    );
  }

  const cols =
    columns === 2
      ? 'sm:grid-cols-2'
      : columns === 4
        ? 'sm:grid-cols-2 xl:grid-cols-4'
        : 'sm:grid-cols-2 lg:grid-cols-3';

  return (
    <ul className={`grid list-none grid-cols-1 gap-5 ${cols}`}>
      {renderable.map((product, i) => (
        <li key={product.slug} className="flex">
          <ProductCard product={product} eager={i < eagerCount} />
        </li>
      ))}
    </ul>
  );
}

/**
 * Compact row for products that exist but have nothing publishable written
 * about them yet. Honest about status without pretending they are shippable.
 */
export function BuildingStrip({ products, title = 'Currently building' }) {
  if (products.length === 0) return null;

  return (
    <div className="rounded-2xl border border-dashed border-border-dark bg-surface/30 p-6">
      <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted">{title}</h3>
      <ul className="mt-4 flex list-none flex-wrap gap-2">
        {products.map((p) => (
          <li
            key={p.slug}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-surface px-3 py-2 text-sm text-text-secondary"
          >
            <span className="size-1.5 rounded-full bg-gold" aria-hidden="true" />
            {p.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
