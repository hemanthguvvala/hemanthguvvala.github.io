import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import SectionHeader from '../components/SectionHeader';
import ProductIcon from '../components/ProductIcon';
import StatusBadge from '../components/StatusBadge';
import CTASection from '../components/CTASection';
import { CATEGORIES, webProducts } from '../data/products';
import { person } from '../data/profile';
import { breadcrumbSchema, productListSchema, softwareApplicationSchema, webPageSchema } from '../seo/jsonld';
import { EVENTS, trackProduct } from '../utils/analytics';

/**
 * Web products get their own page rather than being folded into the app grid.
 * They are substantial products with their own brands, and presenting them as
 * "links" would undersell them.
 */
export default function WebProducts() {
  return (
    <div className="pb-section-lg pt-32">
      <SEO
        title={`Web Products by ${person.name} | SwapFormat & CodeDepth`}
        description="SwapFormat, a private in-browser image converter, and CodeDepth, a Java interview preparation platform — two independent web products built by Hemanth Kumar Guvvala."
        path="/web-products"
        jsonLd={[
          webPageSchema({
            title: `Web Products by ${person.name}`,
            description:
              'Independent web products built by Hemanth Kumar Guvvala: SwapFormat and CodeDepth.',
            path: '/web-products',
          }),
          productListSchema(webProducts, {
            path: '/web-products',
            name: 'Web products',
          }),
          ...webProducts.map(softwareApplicationSchema).filter(Boolean),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Web Products', path: '/web-products' },
          ]),
        ]}
      />

      <div className="mx-auto max-w-content px-5 sm:px-6 lg:px-8">
        <SectionHeader
          as="h1"
          eyebrow="Web products"
          title="Products that live on the open web"
          description="Two independent web products, each with its own brand and audience. No install, no account — just a URL that does one job well."
        />

        <div className="mt-14 flex flex-col gap-8">
          {webProducts.map((product) => (
            <article
              key={product.slug}
              className="relative overflow-hidden rounded-3xl border border-border-dark bg-card-dark/70 p-6 sm:p-10"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full blur-3xl"
                style={{ backgroundColor: `${product.accent}1a` }}
              />

              <div className="relative grid gap-8 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-4">
                    <ProductIcon product={product} size={64} eager />
                    <div>
                      <h2 className="font-display text-2xl font-bold text-strong sm:text-3xl">
                        {product.name}
                      </h2>
                      <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-text-muted">
                        Web · {CATEGORIES[product.category]}
                      </p>
                    </div>
                    <StatusBadge status={product.status} className="ml-auto shrink-0" />
                  </div>

                  <p className="mt-6 text-lg leading-relaxed" style={{ color: product.accent }}>
                    {product.tagline}
                  </p>

                  <p className="mt-4 max-w-prose leading-relaxed text-text-secondary">
                    {product.longDescription}
                  </p>

                  <p className="mt-5 font-mono text-xs text-text-muted">{product.brandNote}</p>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <a
                      href={product.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackProduct(EVENTS.websiteClick, product, { from: 'web-products' })
                      }
                      className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl px-6 text-base font-bold text-on-primary transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      style={{ backgroundColor: product.accent }}
                    >
                      Visit {product.name}
                      <span className="material-symbols-outlined text-lg" aria-hidden="true">
                        open_in_new
                      </span>
                    </a>
                    <Link
                      to={`/products/${product.slug}`}
                      className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-line/10 px-6 text-base font-bold text-strong transition-colors hover:border-primary/50 hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      Learn more
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted">
                    What it does
                  </h3>
                  <ul className="mt-4 flex list-none flex-col gap-3">
                    {product.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-text-secondary">
                        <span
                          className="material-symbols-outlined mt-0.5 shrink-0 text-[18px]"
                          style={{ color: product.accent }}
                          aria-hidden="true"
                        >
                          check_circle
                        </span>
                        <span className="leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-12 text-sm text-text-muted">
          Also building for Android?{' '}
          <Link
            to="/products?category=utilities"
            className="font-medium text-primary underline underline-offset-4 hover:text-primary-light"
          >
            See the mobile apps
          </Link>
          .
        </p>

        <div className="mt-16">
          <CTASection />
        </div>
      </div>
    </div>
  );
}
