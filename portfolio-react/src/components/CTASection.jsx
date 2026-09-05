import { Link } from 'react-router-dom';
import { getProduct } from '../data/products';
import { person } from '../data/profile';
import { EVENTS, track, trackProduct } from '../utils/analytics';

const swapformat = getProduct('swapformat');
const codedepth = getProduct('codedepth');

const base =
  'inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';

/** Closing call to action, shared by the homepage and the products directory. */
export default function CTASection() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="relative overflow-hidden rounded-3xl border border-border-dark bg-surface/40 px-6 py-14 text-center sm:px-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
        <h2
          id="cta-heading"
          className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          Explore what I&rsquo;m building.
        </h2>
        <p className="text-text-secondary">
          Mobile apps, web tools and a developer learning platform — all built and maintained by
          one engineer.
        </p>

        <div className="flex flex-col flex-wrap justify-center gap-3 sm:flex-row">
          <Link to="/products" className={`${base} bg-primary text-background-dark hover:bg-primary-light`}>
            Explore products
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
              layers
            </span>
          </Link>

          <a
            href={codedepth.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackProduct(EVENTS.websiteClick, codedepth, { from: 'cta' })}
            className={`${base} border border-white/10 text-white hover:border-primary/50 hover:bg-primary/10`}
          >
            Visit CodeDepth
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
              open_in_new
            </span>
          </a>

          <a
            href={swapformat.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackProduct(EVENTS.websiteClick, swapformat, { from: 'cta' })}
            className={`${base} border border-white/10 text-white hover:border-primary/50 hover:bg-primary/10`}
          >
            Visit SwapFormat
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
              open_in_new
            </span>
          </a>

          <Link
            to="/contact"
            onClick={() => track(EVENTS.contactClick, { from: 'cta' })}
            className={`${base} border border-white/10 text-white hover:border-white/25`}
          >
            Connect with {person.shortName}
          </Link>
        </div>
      </div>
    </section>
  );
}
