import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import SectionHeader from '../components/SectionHeader';
import ProductGrid from '../components/ProductGrid';
import CTASection from '../components/CTASection';
import { buildLoop, credibility, person, studio } from '../data/profile';
import {
  CATEGORIES,
  androidProducts,
  featuredProducts,
  liveProducts,
  products,
  webProducts,
} from '../data/products';
import { personSchema, productListSchema, websiteSchema } from '../seo/jsonld';
import { EVENTS, track } from '../utils/analytics';
import profileImage from '../assets/my_profile_image.jpg';

const rise = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

/** Category counts, computed from real data so the numbers can never drift. */
const ecosystem = Object.entries(CATEGORIES)
  .map(([key, label]) => ({
    key,
    label,
    count: products.filter((p) => p.category === key && p.shortDescription).length,
  }))
  .filter((c) => c.count > 0);

const btn =
  'inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl px-6 text-base font-bold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';

export default function Home() {
  return (
    <>
      <SEO
        title={`${person.name} | Lead Product Engineer & Product Builder`}
        description="Lead Product Engineer and independent product builder creating useful mobile apps, web products and developer-focused tools."
        path="/"
        jsonLd={[
          personSchema(),
          websiteSchema(),
          productListSchema(featuredProducts, { name: 'Featured products' }),
        ]}
      />

      {/* ─────────────────────────── HERO ─────────────────────────── */}
      <section className="relative flex min-h-[92vh] w-full flex-col justify-center overflow-hidden px-5 pb-16 pt-28 sm:px-6">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] max-w-[130vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,194,158,.15)_0%,rgba(15,35,31,0)_70%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-transparent to-background-dark" />
        </div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-7 text-center"
        >
          <motion.p
            variants={rise}
            className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-surface/80 px-3.5 py-1.5 backdrop-blur-sm"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-secondary">
              {person.jobTitle} · {person.secondaryTitle}
            </span>
          </motion.p>

          <motion.h1
            variants={rise}
            className="bg-gradient-to-br from-white via-white to-slate-500 bg-clip-text pb-2 font-display text-[2.75rem] font-bold leading-[1.02] tracking-tight text-transparent sm:text-6xl lg:text-7xl"
          >
            {person.tagline}
          </motion.h1>

          <motion.p
            variants={rise}
            className="max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg"
          >
            I&rsquo;m {person.name} — a {person.jobTitle.toLowerCase()} at{' '}
            <span className="text-white">{person.company}</span>, where I build event-driven
            backend systems in Java, Spring Boot and Kafka for global airlines. Outside of that I
            design, build and launch my own products: {androidProducts.filter((p) => p.status === 'live').length}{' '}
            Android apps on Google Play, plus web tools and a developer learning platform.
          </motion.p>

          <motion.div variants={rise} className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link to="/products" className={`${btn} bg-primary text-background-dark shadow-glow hover:bg-primary-light`}>
              Explore products
              <span className="material-symbols-outlined text-lg" aria-hidden="true">
                layers
              </span>
            </Link>
            <a
              href={person.resumeUrl}
              download
              onClick={() => track(EVENTS.resumeDownload, { from: 'hero' })}
              className={`${btn} border border-white/10 bg-surface/50 text-white backdrop-blur-md hover:border-primary/50`}
            >
              View resume
              <span className="material-symbols-outlined text-lg text-text-secondary" aria-hidden="true">
                download
              </span>
            </a>
            <Link
              to="/contact"
              onClick={() => track(EVENTS.contactClick, { from: 'hero' })}
              className={`${btn} border border-white/10 bg-surface/50 text-white backdrop-blur-md hover:border-white/25`}
            >
              Connect
              <span className="material-symbols-outlined text-lg text-text-secondary" aria-hidden="true">
                mail
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ───────────────────── TRUST / CREDIBILITY ───────────────────── */}
      <section aria-labelledby="credibility-heading" className="border-y border-white/5 bg-surface/20 py-10">
        <div className="mx-auto max-w-content px-5 sm:px-6 lg:px-8">
          <h2 id="credibility-heading" className="sr-only">
            Professional background
          </h2>
          <ul className="grid list-none grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-5">
            {credibility.map((c) => (
              <li key={c.label} className="flex flex-col gap-1 border-l-2 border-primary/25 pl-4">
                <span className="text-sm font-bold leading-snug text-white">{c.label}</span>
                <span className="text-xs text-text-muted">{c.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────────────── FEATURED PRODUCTS ───────────────────── */}
      <section aria-labelledby="featured-heading" className="py-section">
        <div className="mx-auto max-w-content px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeader
              id="featured-heading"
              eyebrow="Featured"
              title="Products I've built"
              description="A web image converter, a Java interview platform, and Android apps for scanning, documents and secure notes."
            />
            <Link
              to="/products"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-primary transition-colors hover:text-primary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              All {products.filter((p) => p.shortDescription).length} products
              <span className="material-symbols-outlined text-lg" aria-hidden="true">
                arrow_forward
              </span>
            </Link>
          </div>

          <div className="mt-10">
            <ProductGrid products={featuredProducts} eagerCount={3} />
          </div>
        </div>
      </section>

      {/* ───────────────────── STUDIO INTRO ───────────────────── */}
      <section aria-labelledby="studio-heading" className="border-t border-white/5 py-section">
        <div className="mx-auto grid max-w-content gap-12 px-5 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
          <div className="flex flex-col gap-6">
            <SectionHeader
              id="studio-heading"
              eyebrow="More than a portfolio"
              title="I don't only build software inside an organization."
              description="This site is the home for the products I build independently — the ones I design, launch, maintain and sometimes retire. Each keeps its own name and identity; what they share is that one person is behind all of them."
            />
            <p className="max-w-prose leading-relaxed text-text-secondary">
              I build tools that solve a specific problem rather than software for its own sake.
              Some are utilities I needed myself; some started as experiments and became real
              products; a few were archived when they stopped earning their place.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-primary transition-colors hover:text-primary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              How I think about products
              <span className="material-symbols-outlined text-lg" aria-hidden="true">
                arrow_forward
              </span>
            </Link>
          </div>

          {/* Live counts, derived — never hardcoded. */}
          <dl className="grid grid-cols-2 gap-4">
            {[
              { label: 'Live products', value: liveProducts.length, icon: 'rocket_launch' },
              { label: 'On Google Play', value: androidProducts.filter((p) => p.status === 'live').length, icon: 'shop' },
              { label: 'Web products', value: webProducts.length, icon: 'language' },
              { label: 'Categories', value: ecosystem.length, icon: 'category' },
            ].map((s) => (
              <div
                key={s.label}
                className="flex flex-col gap-2 rounded-2xl border border-border-dark bg-card-dark/70 p-5"
              >
                <span className="material-symbols-outlined text-primary" aria-hidden="true">
                  {s.icon}
                </span>
                <dd className="font-display text-3xl font-bold text-white">{s.value}</dd>
                <dt className="text-xs uppercase tracking-wider text-text-muted">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ───────────────────── ECOSYSTEM ───────────────────── */}
      <section aria-labelledby="ecosystem-heading" className="border-t border-white/5 py-section">
        <div className="mx-auto max-w-content px-5 sm:px-6 lg:px-8">
          <SectionHeader
            id="ecosystem-heading"
            eyebrow="Product ecosystem"
            title="Built across a few deliberate areas"
            description="Not a random list of side projects — the products cluster around problems I keep running into."
          />

          <ul className="mt-10 grid list-none grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {ecosystem.map((c) => (
              <li key={c.key}>
                <Link
                  to={`/products?category=${c.key}`}
                  className="flex h-full flex-col justify-between gap-4 rounded-2xl border border-border-dark bg-card-dark/70 p-5 transition-colors hover:border-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <span className="font-display text-sm font-bold leading-snug text-white">
                    {c.label}
                  </span>
                  <span className="font-mono text-xs text-primary">
                    {c.count} {c.count === 1 ? 'product' : 'products'}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────────────── ENGINEERING ───────────────────── */}
      <section aria-labelledby="engineering-heading" className="border-t border-white/5 py-section">
        <div className="mx-auto grid max-w-content gap-10 px-5 sm:px-6 lg:grid-cols-12 lg:items-center lg:px-8">
          <div className="lg:col-span-7">
            <SectionHeader
              id="engineering-heading"
              eyebrow="Engineering"
              title="The day job: distributed systems for airlines"
              description="At IBS Software I work on event-driven backend systems in Java, Spring Boot and Kafka — 30+ enterprise features delivered to 10+ global airlines, and 980+ production issues resolved at 100% SLA adherence."
            />
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/engineering"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/10 px-5 text-sm font-bold text-white transition-colors hover:border-primary/50 hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Engineering &amp; expertise
              </Link>
              <Link
                to="/timeline"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl px-3 text-sm font-medium text-text-secondary transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                See the journey
                <span className="material-symbols-outlined text-lg" aria-hidden="true">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>

          <ul className="grid list-none gap-4 sm:grid-cols-2 lg:col-span-5">
            {[
              { icon: 'speed', title: '30% faster', detail: 'Transaction throughput' },
              { icon: 'rocket_launch', title: '50% faster deploys', detail: 'AWS + Docker' },
              { icon: 'verified', title: '100% SLA', detail: 'Across 980+ issues' },
              { icon: 'smart_toy', title: 'Copilot rollout', detail: 'Org-wide adoption' },
            ].map((m) => (
              <li
                key={m.title}
                className="flex flex-col gap-1.5 rounded-2xl border border-border-dark bg-card-dark/70 p-5"
              >
                <span className="material-symbols-outlined mb-1 text-primary" aria-hidden="true">
                  {m.icon}
                </span>
                <span className="font-bold text-white">{m.title}</span>
                <span className="text-xs text-text-muted">{m.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────────────── FOUNDER ───────────────────── */}
      <section aria-labelledby="founder-heading" className="border-t border-white/5 py-section">
        <div className="mx-auto grid max-w-content items-center gap-10 px-5 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-8">
          <div className="lg:col-span-4">
            <div className="relative mx-auto w-full max-w-[260px]">
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-3xl bg-primary/10 blur-2xl"
              />
              <img
                src={profileImage}
                alt={`${person.name}, ${person.jobTitle}`}
                width={260}
                height={325}
                loading="lazy"
                decoding="async"
                className="relative aspect-[4/5] w-full rounded-2xl border border-white/10 object-cover shadow-raised"
              />
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:col-span-8">
            <SectionHeader id="founder-heading" eyebrow="Who's behind this" title={person.name} />
            <p className="font-mono text-sm text-primary">
              {person.jobTitle} · {person.secondaryTitle}
            </p>
            <p className="max-w-prose leading-relaxed text-text-secondary">
              I grew up in Rayachoty and did my entire education there, from CS Raju High School
              through a B.Tech in Electronics &amp; Communication at SSITS. I started at Marlabs in
              January 2022 and was head-hunted by IBS Software — my client at the time — within ten
              months. Software engineering is my profession; product building is how I explore
              ideas outside it.
            </p>
            <p className="max-w-prose text-sm leading-relaxed text-text-muted">
              {studio.attribution}. Every product listed on this site is designed, built, shipped
              and maintained by me.
            </p>
            <div>
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-primary transition-colors hover:text-primary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Read the full story
                <span className="material-symbols-outlined text-lg" aria-hidden="true">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────── BUILD LOOP ───────────────────── */}
      <section aria-labelledby="loop-heading" className="border-t border-white/5 py-section">
        <div className="mx-auto max-w-content px-5 sm:px-6 lg:px-8">
          <SectionHeader
            id="loop-heading"
            eyebrow="How a product gets built"
            title="Build, launch, learn, improve."
            description="Products are not finished when they ship. Some get better, and some get archived honestly."
          />

          <ol className="mt-10 grid list-none grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {buildLoop.map((s, i) => (
              <li
                key={s.step}
                className="relative flex flex-col gap-3 rounded-2xl border border-border-dark bg-card-dark/70 p-5"
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
        </div>
      </section>

      {/* ───────────────────── CTA ───────────────────── */}
      <section className="pb-section-lg pt-4">
        <div className="mx-auto max-w-content px-5 sm:px-6 lg:px-8">
          <CTASection />
        </div>
      </section>
    </>
  );
}
