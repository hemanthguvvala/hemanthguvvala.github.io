import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import SectionHeader from '../components/SectionHeader';
import ProductIcon from '../components/ProductIcon';
import { differentiators, engagementTypes, processSteps, services } from '../data/services';
import { getProduct } from '../data/products';
import { person } from '../data/profile';
import { breadcrumbSchema, personSchema, servicesSchema, webPageSchema } from '../seo/jsonld';
import { EVENTS, track } from '../utils/analytics';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const btn =
  'inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl px-6 text-base font-bold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';

/** Products cited as proof, resolved once so the page renders from real data. */
const proofProducts = [
  ...new Set(services.flatMap((s) => s.proof)),
]
  .map(getProduct)
  .filter((p) => p && p.status === 'live');

export default function Services() {
  return (
    <div className="pb-section-lg pt-32">
      <SEO
        title={`Software & Product Development Services | ${person.name}`}
        description="Software and product development services from Hemanth Kumar Guvvala — web applications, Android apps, backend and APIs, MVP development, product engineering and technical consulting."
        path="/services"
        jsonLd={[
          webPageSchema({
            title: 'Software & Product Development Services',
            description:
              'Web, Android, backend, MVP development, product engineering and technical consulting by Hemanth Kumar Guvvala.',
            path: '/services',
          }),
          personSchema(),
          servicesSchema(services),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
          ]),
        ]}
      />

      <div className="mx-auto max-w-content px-5 sm:px-6 lg:px-8">
        {/* ───────────────────────── HERO ───────────────────────── */}
        <SectionHeader
          as="h1"
          eyebrow="Services"
          title="Software & Product Development Services"
          description="I build digital products and software systems for businesses, teams and individuals — from focused MVPs to production-ready applications."
        />

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/contact"
            onClick={() => track(EVENTS.contactClick, { from: 'services-hero' })}
            className={`${btn} bg-primary text-background-dark shadow-glow hover:bg-primary-light`}
          >
            Discuss a project
            <span className="material-symbols-outlined text-lg" aria-hidden="true">
              arrow_forward
            </span>
          </Link>
          <Link
            to="/products"
            className={`${btn} border border-white/10 bg-surface/50 text-white hover:border-primary/50`}
          >
            See my products
            <span className="material-symbols-outlined text-lg text-text-secondary" aria-hidden="true">
              layers
            </span>
          </Link>
        </div>

        {/* ───────────────────── SERVICES GRID ───────────────────── */}
        <section aria-labelledby="what-heading" className="mt-section border-t border-white/5 pt-section">
          <SectionHeader
            id="what-heading"
            eyebrow="What I can build"
            title="Eight things I take on"
            description="Each one is work I do either professionally or on my own products — not a menu padded out to look comprehensive."
          />

          <motion.ul
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="mt-10 grid list-none auto-rows-fr grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service) => {
              const proof = service.proof.map(getProduct).filter((p) => p && p.status === 'live');

              return (
                <motion.li
                  key={service.id}
                  variants={item}
                  className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-border-dark bg-card-dark/80 p-6 shadow-card transition-colors duration-300 hover:border-primary/40"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-primary/5 blur-3xl transition-colors duration-500 group-hover:bg-primary/10"
                  />

                  <span className="relative flex size-12 items-center justify-center rounded-xl border border-border-dark bg-surface text-primary transition-transform duration-300 group-hover:scale-110">
                    <span className="material-symbols-outlined text-[26px]" aria-hidden="true">
                      {service.icon}
                    </span>
                  </span>

                  <h3 className="relative font-display text-xl font-bold leading-snug text-white">
                    {service.title}
                  </h3>

                  <p className="relative text-sm font-medium text-primary">{service.summary}</p>

                  <p className="relative text-sm leading-relaxed text-text-secondary">
                    {service.detail}
                  </p>

                  {service.tags.length > 0 && (
                    <ul className="relative flex list-none flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-md border border-border-dark bg-surface px-2.5 py-1 font-mono text-[11px] text-text-secondary"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Proof links, only where a shipped product actually
                      demonstrates the service. */}
                  {proof.length > 0 && (
                    <p className="relative mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-white/5 pt-4 text-xs text-text-muted">
                      <span>Built:</span>
                      {proof.map((p, i) => (
                        <span key={p.slug}>
                          <Link
                            to={`/products/${p.slug}`}
                            className="font-medium text-primary underline underline-offset-4 hover:text-primary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                          >
                            {p.name.split(':')[0]}
                          </Link>
                          {i < proof.length - 1 && <span aria-hidden="true">,</span>}
                        </span>
                      ))}
                    </p>
                  )}
                </motion.li>
              );
            })}
          </motion.ul>
        </section>

        {/* ───────────────────── WHY WORK WITH ME ───────────────────── */}
        <section aria-labelledby="why-heading" className="mt-section border-t border-white/5 pt-section">
          <SectionHeader
            id="why-heading"
            eyebrow="Why work with me"
            title="One person, accountable for the whole thing"
            description="I am a Lead Product Engineer by day and an independent product builder the rest of the time. Both matter for the work you would be hiring me for."
          />

          <ul className="mt-10 grid list-none gap-5 md:grid-cols-2 lg:grid-cols-3">
            {differentiators.map((d) => (
              <li
                key={d.title}
                className="flex flex-col gap-3 rounded-2xl border border-border-dark bg-card-dark/70 p-6"
              >
                <span className="material-symbols-outlined text-primary" aria-hidden="true">
                  {d.icon}
                </span>
                <h3 className="font-display text-lg font-bold text-white">{d.title}</h3>
                <p className="text-sm leading-relaxed text-text-secondary">{d.body}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ───────────────── WHAT I CAN HELP YOU BUILD ───────────────── */}
        <section aria-labelledby="help-heading" className="mt-section border-t border-white/5 pt-section">
          <SectionHeader
            id="help-heading"
            eyebrow="Engagements"
            title="What I can help you build"
            description="If your situation looks like one of these, it is worth a conversation."
          />

          <ul className="mt-10 grid list-none grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {engagementTypes.map((e) => (
              <li
                key={e.label}
                className="flex items-start gap-3 rounded-xl border border-border-dark bg-card-dark/70 p-4"
              >
                <span className="material-symbols-outlined mt-0.5 shrink-0 text-[20px] text-primary" aria-hidden="true">
                  {e.icon}
                </span>
                <span>
                  <span className="block text-sm font-bold text-white">{e.label}</span>
                  <span className="block text-xs text-text-muted">{e.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* ───────────────── BUILT, NOT JUST PROMISED ───────────────── */}
        <section aria-labelledby="proof-heading" className="mt-section border-t border-white/5 pt-section">
          <SectionHeader
            id="proof-heading"
            eyebrow="Proof"
            title="Built, not just promised"
            description="The clearest evidence of what I can build for you is what I have already built for myself. Every one of these is live and publicly available."
          />

          <ul className="mt-10 grid list-none grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {proofProducts.map((p) => (
              <li key={p.slug} className="flex">
                <Link
                  to={`/products/${p.slug}`}
                  className="flex h-full w-full items-start gap-3 rounded-xl border border-border-dark bg-card-dark/70 p-4 transition-colors hover:border-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <ProductIcon product={p} size={44} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-display font-bold text-white">{p.name}</span>
                    <span className="mt-0.5 line-clamp-2 block text-xs leading-relaxed text-text-secondary">
                      {p.shortDescription}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-sm text-text-muted">
            <Link
              to="/products"
              className="font-medium text-primary underline underline-offset-4 hover:text-primary-light"
            >
              Browse everything I have built
            </Link>{' '}
            — or see the{' '}
            <Link
              to="/engineering"
              className="font-medium text-primary underline underline-offset-4 hover:text-primary-light"
            >
              engineering side
            </Link>{' '}
            of the work.
          </p>
        </section>

        {/* ───────────────────────── PROCESS ───────────────────────── */}
        <section aria-labelledby="process-heading" className="mt-section border-t border-white/5 pt-section">
          <SectionHeader
            id="process-heading"
            eyebrow="How I work"
            title="A simple, visible process"
            description="No heavyweight methodology. You should always know what is being built and why."
          />

          <ol className="mt-10 grid list-none grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((s, i) => (
              <li
                key={s.step}
                className="flex flex-col gap-3 rounded-2xl border border-border-dark bg-card-dark/70 p-5"
              >
                <span className="font-mono text-xs text-primary/70">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="material-symbols-outlined text-primary" aria-hidden="true">
                  {s.icon}
                </span>
                <span className="font-display font-bold text-white">{s.step}</span>
                <span className="text-xs leading-relaxed text-text-muted">{s.detail}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* ─────────────────────── FINAL CTA ─────────────────────── */}
        <section
          aria-labelledby="services-cta-heading"
          className="relative mt-section overflow-hidden rounded-3xl border border-border-dark bg-surface/40 px-6 py-14 text-center sm:px-10"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
          />

          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
            <h2
              id="services-cta-heading"
              className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              Have a product or software problem to solve?
            </h2>
            <p className="text-text-secondary">
              Tell me what you are trying to build or improve. If I am not the right person for it,
              I will say so.
            </p>
            <Link
              to="/contact"
              onClick={() => track(EVENTS.contactClick, { from: 'services-cta' })}
              className={`${btn} bg-primary text-background-dark hover:bg-primary-light`}
            >
              Let&rsquo;s talk
              <span className="material-symbols-outlined text-lg" aria-hidden="true">
                arrow_forward
              </span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
