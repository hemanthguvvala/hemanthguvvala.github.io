import ProductCard from './ProductCard';
import { isRenderableCard } from '../data/products';

/**
 * Renders product cards. Entries with no description at all are skipped — a
 * card with an empty body reads as broken. In practice every product carries at
 * least a "Details coming soon." line, so this is a guard, not a code path.
 *
 * `eagerCount` keeps above-the-fold icons out of lazy loading so the first
 * screen does not shift as images arrive.
 */
export default function ProductGrid({
  products,
  eagerCount = 0,
  columns = 3,
  emptyMessage,
  headingLevel = 3,
}) {
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
          <ProductCard product={product} eager={i < eagerCount} headingLevel={headingLevel} />
        </li>
      ))}
    </ul>
  );
}
