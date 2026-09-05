/**
 * Product icon with a monogram fallback.
 *
 * Products without a shipped icon (web products, unpublished apps) render a
 * tinted monogram rather than a broken image or a generic placeholder.
 */
export default function ProductIcon({ product, size = 56, eager = false, className = '' }) {
  const dimension = { width: size, height: size };

  if (product.icon) {
    return (
      <img
        src={product.icon}
        alt=""
        width={size}
        height={size}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        style={dimension}
        className={`shrink-0 rounded-xl border border-white/10 bg-surface object-cover ${className}`}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      style={{
        ...dimension,
        backgroundColor: `${product.accent}1f`,
        borderColor: `${product.accent}59`,
        color: product.accent,
        fontSize: Math.max(13, Math.round(size * 0.3)),
      }}
      className={`inline-flex shrink-0 items-center justify-center rounded-xl border font-mono font-bold tracking-tight ${className}`}
    >
      {product.monogram ?? product.name.slice(0, 2).toUpperCase()}
    </span>
  );
}
