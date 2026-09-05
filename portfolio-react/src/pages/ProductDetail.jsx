import { Link, useParams } from 'react-router-dom';
import SEO from '../components/SEO';
import ProductIcon from '../components/ProductIcon';
import StatusBadge from '../components/StatusBadge';
import RelatedProducts from '../components/RelatedProducts';
import NotFound from './NotFound';
import { CATEGORIES, PLATFORMS, getProduct } from '../data/products';
import { person } from '../data/profile';
import { breadcrumbSchema, softwareApplicationSchema, webPageSchema } from '../seo/jsonld';
import { EVENTS, trackProduct } from '../utils/analytics';

const cta =
  'inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl px-6 text-base font-bold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';

export default function ProductDetail() {
  const { slug } = useParams();
  const product = getProduct(slug);

  // Unknown slug, or one deliberately kept out of the index because there is
  // not enough real content to justify a page.
  if (!product || !product.hasDetailPage) return <NotFound />;

  const path = `/products/${product.slug}`;
  const primaryUrl = product.websiteUrl ?? product.playStoreUrl;

  const seoTitle = product.tagline
    ? `${product.name} — ${product.tagline} | ${person.name}`
    : `${product.name} | ${person.name}`;

  // Several card descriptions are short one-liners; appending the platform and
  // author turns them into a full, still-factual sentence. Skipped when the
  // description is already long enough to fill a search snippet on its own.
  const attribution = `${
    product.platform === 'web' ? 'A web product' : 'An Android app'
  } designed and built by ${person.name}.`;
  const seoDescription =
    product.shortDescription.length + attribution.length + 1 <= 168
      ? `${product.shortDescription} ${attribution}`
      : product.shortDescription;

  return (
    <div className="pb-section-lg pt-32">
      <SEO
        title={seoTitle.length > 70 ? `${product.name} | ${person.name}` : seoTitle}
        description={seoDescription}
        path={path}
        type="article"
        jsonLd={[
          webPageSchema({
            title: product.name,
            description: product.shortDescription,
            path,
          }),
          softwareApplicationSchema(product),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Products', path: '/products' },
            { name: product.name, path },
          ]),
        ]}
      />

      <div className="mx-auto max-w-content px-5 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex list-none flex-wrap items-center gap-2 font-mono text-xs text-text-muted">
            <li>
              <Link to="/" className="transition-colors hover:text-primary">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link to="/products" className="transition-colors hover:text-primary">
                Products
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-text-secondary">
              {product.name}
            </li>
          </ol>
        </nav>

        {/* ── Header ── */}
        <header className="flex flex-col gap-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
            <ProductIcon product={product} size={88} eager className="sm:size-[88px]" />

            <div className="flex flex-1 flex-col gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <StatusBadge status={product.status} />
                <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                  {PLATFORMS[product.platform]} · {CATEGORIES[product.category]}
                </span>
              </div>

              <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                {product.name}
              </h1>

              {product.tagline && (
                <p className="text-lg text-primary sm:text-xl">{product.tagline}</p>
              )}

              {product.independentBrand && product.brandNote && (
                <p className="font-mono text-xs text-text-muted">{product.brandNote}</p>
              )}
            </div>
          </div>

          {/* ── Actions ── */}
          <div className="flex flex-col flex-wrap gap-3 sm:flex-row">
            {product.websiteUrl && (
              <a
                href={product.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackProduct(EVENTS.websiteClick, product, { from: 'detail' })}
                className={`${cta} bg-primary text-background-dark shadow-glow hover:bg-primary-light`}
              >
                Open {product.name}
                <span className="material-symbols-outlined text-lg" aria-hidden="true">
                  open_in_new
                </span>
              </a>
            )}

            {product.playStoreUrl && (
              <a
                href={product.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackProduct(EVENTS.playStoreClick, product, { from: 'detail' })}
                className={`${cta} ${
                  product.websiteUrl
                    ? 'border border-white/10 text-white hover:border-primary/50 hover:bg-primary/10'
                    : 'bg-primary text-background-dark shadow-glow hover:bg-primary-light'
                }`}
              >
                <span className="material-symbols-outlined text-lg" aria-hidden="true">
                  shop
                </span>
                Get it on Google Play
              </a>
            )}

            {product.privacyUrl && (
              <a
                href={product.privacyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${cta} border border-white/10 text-text-secondary hover:text-white`}
              >
                Privacy policy
              </a>
            )}
          </div>
        </header>

        {/* ── Body ── */}
        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="flex flex-col gap-10 lg:col-span-7">
            {product.longDescription && (
              <section aria-labelledby="overview-heading">
                <h2 id="overview-heading" className="font-display text-2xl font-bold text-white">
                  Overview
                </h2>
                <p className="mt-4 max-w-prose leading-relaxed text-text-secondary">
                  {product.longDescription}
                </p>
              </section>
            )}

            {product.features.length > 0 && (
              <section aria-labelledby="features-heading">
                <h2 id="features-heading" className="font-display text-2xl font-bold text-white">
                  What it does
                </h2>
                <ul className="mt-5 flex list-none flex-col gap-3">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-text-secondary">
                      <span
                        className="material-symbols-outlined mt-0.5 shrink-0 text-[20px] text-primary"
                        aria-hidden="true"
                      >
                        check_circle
                      </span>
                      <span className="leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {product.screenshots.length > 0 && (
              <section aria-labelledby="screens-heading">
                <h2 id="screens-heading" className="font-display text-2xl font-bold text-white">
                  Screens
                </h2>
                <ul className="mt-5 grid list-none grid-cols-2 gap-4 sm:grid-cols-3">
                  {product.screenshots.map((shot) => (
                    <li key={shot.src}>
                      <img
                        src={shot.src}
                        alt={shot.alt}
                        width={shot.width}
                        height={shot.height}
                        loading="lazy"
                        decoding="async"
                        className="w-full rounded-xl border border-white/10"
                      />
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* ── Facts panel ── */}
          <aside className="lg:col-span-5">
            <div className="rounded-2xl border border-border-dark bg-card-dark/70 p-6">
              <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted">
                At a glance
              </h2>
              <dl className="mt-5 flex flex-col gap-4 text-sm">
                {[
                  { term: 'Platform', value: PLATFORMS[product.platform] },
                  { term: 'Category', value: CATEGORIES[product.category] },
                  { term: 'Status', value: null, badge: true },
                  { term: 'Pricing', value: product.monetizationType },
                  { term: 'Launched', value: product.launchYear },
                  { term: 'Package', value: product.packageId, mono: true },
                  { term: 'Built by', value: person.name },
                ]
                  .filter((row) => row.badge || row.value)
                  .map((row) => (
                    <div
                      key={row.term}
                      className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-3 last:border-0 last:pb-0"
                    >
                      <dt className="text-text-muted">{row.term}</dt>
                      <dd
                        className={`text-right ${row.mono ? 'break-all font-mono text-xs text-text-secondary' : 'font-medium text-white'}`}
                      >
                        {row.badge ? <StatusBadge status={product.status} /> : row.value}
                      </dd>
                    </div>
                  ))}
              </dl>

              {primaryUrl && (
                <a
                  href={primaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackProduct(
                      product.websiteUrl ? EVENTS.websiteClick : EVENTS.playStoreClick,
                      product,
                      { from: 'detail-aside' },
                    )
                  }
                  className="mt-6 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary/10 text-sm font-bold text-primary transition-colors hover:bg-primary/20"
                >
                  {product.platform === 'web' ? 'Open the site' : 'View on Google Play'}
                  <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                    open_in_new
                  </span>
                </a>
              )}
            </div>
          </aside>
        </div>

        {/* ── Cross-product discovery ── */}
        <div className="mt-20 flex flex-col gap-12">
          <RelatedProducts product={product} />

          <p className="text-sm text-text-muted">
            <Link
              to="/products"
              className="font-medium text-primary underline underline-offset-4 hover:text-primary-light"
            >
              Browse all products
            </Link>{' '}
            built by {person.name}.
          </p>
        </div>
      </div>
    </div>
  );
}
