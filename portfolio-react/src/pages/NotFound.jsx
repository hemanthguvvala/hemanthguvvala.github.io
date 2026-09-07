import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { featuredProducts } from '../data/products';
import ProductIcon from '../components/ProductIcon';

const links = [
  { to: '/', label: 'Home', icon: 'home', detail: 'Start from the top' },
  { to: '/products', label: 'Products', icon: 'layers', detail: 'Everything I have built' },
  { to: '/contact', label: 'Contact', icon: 'mail', detail: 'Get in touch' },
];

/**
 * Branded 404. Always noindex — a soft 404 in the index is worse than no page.
 * Doubles as the fallback for product slugs that have no detail page.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col justify-center pb-section-lg pt-32">
      <SEO
        title="Page not found | Hemanth Kumar Guvvala"
        description="This page does not exist. Head back to the products directory or the homepage."
        path="/404"
        robots="noindex, follow"
      />

      <div className="mx-auto w-full max-w-3xl px-5 text-center sm:px-6">
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-primary">Error 404</p>

        <h1 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight text-strong sm:text-5xl">
          Looks like this page went off the roadmap.
        </h1>

        <p className="mx-auto mt-5 max-w-xl leading-relaxed text-text-secondary">
          The URL you followed doesn&rsquo;t match anything here. It may have been renamed, or the
          product it pointed at may have been archived.
        </p>

        <ul className="mt-10 grid list-none grid-cols-1 gap-4 sm:grid-cols-3">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="flex h-full flex-col items-center gap-2 rounded-2xl border border-border-dark bg-card-dark/70 px-4 py-6 transition-colors hover:border-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <span className="material-symbols-outlined text-primary" aria-hidden="true">
                  {l.icon}
                </span>
                <span className="font-display font-bold text-strong">{l.label}</span>
                <span className="text-xs text-text-muted">{l.detail}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-14">
          <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted">
            Or try one of these
          </h2>
          <ul className="mt-5 flex list-none flex-wrap justify-center gap-3">
            {featuredProducts.slice(0, 4).map((p) => (
              <li key={p.slug}>
                <Link
                  to={`/products/${p.slug}`}
                  className="inline-flex items-center gap-2.5 rounded-xl border border-border-dark bg-card-dark/70 py-2 pl-2 pr-4 text-sm text-text-secondary transition-colors hover:border-primary/40 hover:text-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <ProductIcon product={p} size={28} />
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
