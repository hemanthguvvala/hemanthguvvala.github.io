import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import SectionHeader from '../components/SectionHeader';
import ProductGrid from '../components/ProductGrid';
import CTASection from '../components/CTASection';
import ProductIcon from '../components/ProductIcon';
import ArticleCard from '../components/ArticleCard';
import { buildLoop, credibility, person, studio } from '../data/profile';
import {
  CATEGORIES,
  androidProducts,
  featuredProducts,
  inDevelopmentProducts,
  liveProducts,
  products,
  webProducts,
} from '../data/products';
import { JOURNEY_LABEL, JOURNEY_PATH, hasArticles, recentArticles } from '../data/journey';
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
            className="inline-flex items-center gap-2 rounded-full border border-line/5 bg-surface/80 px-3.5 py-1.5 backdrop-blur-sm"
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
            className="bg-gradient-to-br from-strong via-strong to-text-muted bg-clip-text pb-2 font-display text-[2.75rem] font-bold leading-[1.02] tracking-tight text-transparent sm:text-6xl lg:text-7xl"
          >
            {person.tagline}
          </motion.h1>

          <motion.p
            variants={rise}
            className="max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg"
          >
            I&rsquo;m {person.name} — a {person.jobTitle.toLowerCase()} at{' '}
            <span className="text-strong">{person.company}</span>, where I build event-driven
            backend systems in Java, Spring Boot and Kafka for global airlines. Outside of that I
            design, build and launch my own products: {androidProducts.filter((p) => p.status === 'live').length}{' '}
            Android apps on Google Play, plus web tools and a developer learning platform.
          </motion.p>

          <motion.div variants={rise} className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link to="/products" className={`${btn} bg-primary text-on-primary shadow-glow hover:bg-primary-light`}>
              Explore products
              <span className="material-symbols-outlined text-lg" aria-hidden="true">
                layers
              </span>
            </Link>
            <a
              href={person.resumeUrl}
              download
              onClick={() => track(EVENTS.resumeDownload, { from: 'hero' })}
              className={`${btn} border border-line/10 bg-surface/50 text-strong backdrop-blur-md hover:border-primary/50`}
            >
              View resume
              <span className="material-symbols-outlined text-lg text-text-secondary" aria-hidden="true">
                download
              </span>
            </a>
            <Link
              to="/contact"
              onClick={() => track(EVENTS.contactClick, { from: 'hero' })}
              className={`${btn} border border-line/10 bg-surface/50 text-strong backdrop-blur-md hover:border-line/25`}
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
      <section aria-labelledby="credibility-heading" className="border-y border-line/5 bg-surface/20 py-10">
        <div className="mx-auto max-w-content px-5 sm:px-6 lg:px-8">
          <h2 id="credibility-heading" className="sr-only">
            Professional background
          </h2>
          <ul className="grid list-none grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-5">
            {credibility.map((c) => (
              <li key={c.label} className="flex flex-col gap-1 border-l-2 border-primary/25 pl-4">
                <span className="text-sm font-bold leading-snug text-strong">{c.label}</span>
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
      <section aria-labelledby="studio-heading" className="border-t border-line/5 py-section">
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
                <dd className="font-display text-3xl font-bold text-strong">{s.value}</dd>
                <dt className="text-xs uppercase tracking-wider text-text-muted">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/*
        ───────────────────── SERVICES TEASER ─────────────────────
        Deliberately compact and placed after the studio introduction: the
        products are the identity, and this is the second thing a visitor
        learns, not the first. Full detail lives on /services.
      */}
      <section aria-labelledby="services-teaser-heading" className="border-t border-line/5 py-section">
        <div className="mx-auto max-w-content px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 rounded-3xl border border-border-dark bg-surface/30 p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div className="max-w-2xl">
              <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-primary">
                <span className="h-px w-8 bg-primary" aria-hidden="true" />
                Work with me
              </p>
              <h2
                id="services-teaser-heading"
                className="mt-4 font-display text-2xl font-bold tracking-tight text-strong sm:text-3xl"
              >
                Need something built?
              </h2>
              <p className="mt-3 leading-relaxed text-text-secondary">
                Alongside my own products, I help turn software ideas and product requirements into
                practical, production-ready solutions — web applications, Android apps, backends and
                MVPs.
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Link
                to="/services"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-on-primary transition-colors hover:bg-primary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Explore services
                <span className="material-symbols-outlined text-lg" aria-hidden="true">
                  arrow_forward
                </span>
              </Link>
              <Link
                to="/contact"
                onClick={() => track(EVENTS.contactClick, { from: 'home-services-teaser' })}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-line/10 px-5 text-sm font-bold text-strong transition-colors hover:border-primary/50 hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Discuss a project
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/*
        ───────────────────── LATEST FROM THE JOURNEY ─────────────────────
        Renders only once something is published. Until then the homepage is
        exactly as it was — an empty "latest writing" strip signals a dead site.
      */}
      {hasArticles && (
        <section aria-labelledby="journey-heading" className="border-t border-line/5 py-section">
          <div className="mx-auto max-w-content px-5 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <SectionHeader
                id="journey-heading"
                eyebrow="What I'm learning"
                title={`Latest from the ${JOURNEY_LABEL.toLowerCase()}`}
                description="What shipping these products actually taught me — what I changed, what happened, and what I would do differently."
              />
              <Link
                to={JOURNEY_PATH}
                className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-primary transition-colors hover:text-primary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                All entries
                <span className="material-symbols-outlined text-lg" aria-hidden="true">
                  arrow_forward
                </span>
              </Link>
            </div>

            <ul className="mt-10 grid list-none gap-5 lg:grid-cols-3">
              {recentArticles(3).map((article) => (
                <li key={article.slug} className="flex">
                  <ArticleCard article={article} headingLevel={3} from="home" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ───────────────────── ECOSYSTEM ───────────────────── */}
      <section aria-labelledby="ecosystem-heading" className="border-t border-line/5 py-section">
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
                  <span className="font-display text-sm font-bold leading-snug text-strong">
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
      <section aria-labelledby="engineering-heading" className="border-t border-line/5 py-section">
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
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-line/10 px-5 text-sm font-bold text-strong transition-colors hover:border-primary/50 hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
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
                <span className="font-bold text-strong">{m.title}</span>
                <span className="text-xs text-text-muted">{m.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────────────── FOUNDER ───────────────────── */}
      <section aria-labelledby="founder-heading" className="border-t border-line/5 py-section">
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
                className="relative aspect-[4/5] w-full rounded-2xl border border-line/10 object-cover shadow-raised"
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
      <section aria-labelledby="loop-heading" className="border-t border-line/5 py-section">
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
                <span className="font-display font-bold text-strong">{s.step}</span>
                <span className="text-xs leading-relaxed text-text-muted">{s.detail}</span>
              </li>
            ))}
          </ol>

          {/*
            Now building. Derived from products.js `status`, so it prunes itself
            when something ships. Deliberately no progress bars, percentages or
            launch dates — none of that would be verifiable, and a stale number
            is worse than no number. Renders nothing when the list is empty.
          */}
          {inDevelopmentProducts.length > 0 && (
            <div className="mt-6 rounded-2xl border border-dashed border-border-dark bg-surface/30 p-6 sm:p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-gold">
                  <span className="size-1.5 rounded-full bg-gold" aria-hidden="true" />
                  Now building
                </h3>
                <p className="text-xs text-text-muted">
                  Not yet released — no download links until they are.
                </p>
              </div>

              <ul className="mt-5 grid list-none gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {inDevelopmentProducts.map((p) => (
                  <li
                    key={p.slug}
                    className="flex items-center gap-3 rounded-xl border border-border-dark bg-card-dark/70 p-3.5"
                  >
                    <ProductIcon product={p} size={36} />
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-bold text-strong">{p.name}</span>
                      <span className="block text-[11px] text-text-muted">
                        {CATEGORIES[p.category]}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
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
