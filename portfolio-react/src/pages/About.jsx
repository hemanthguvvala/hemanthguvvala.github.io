import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import SectionHeader from '../components/SectionHeader';
import { awards, education, experience } from '../data/career';
import { androidProducts, liveProducts, webProducts } from '../data/products';
import { person, studio } from '../data/profile';
import { breadcrumbSchema, personSchema, webPageSchema } from '../seo/jsonld';
import profileImage from '../assets/my_profile_image.jpg';

const principles = [
  {
    icon: 'target',
    title: 'Solve one problem properly',
    body: 'I build tools that solve a specific problem rather than software for its own sake. A product that does one job well beats a product that does six jobs adequately.',
  },
  {
    icon: 'lock',
    title: 'Default to on-device',
    body: 'Several of my products deliberately avoid servers. SwapFormat converts images in the browser; QuickScan and Ghost Notes keep everything on the phone. If the data does not need to leave, it should not.',
  },
  {
    icon: 'inventory',
    title: 'Ship, then be honest',
    body: 'Launching is the start of the work. Some products get iterated on; some get archived. Pretending an unmaintained app is still alive helps nobody.',
  },
];

export default function About() {
  const liveAndroid = androidProducts.filter((p) => p.status === 'live').length;

  return (
    <div className="pb-section-lg pt-32">
      <SEO
        title={`About ${person.name} | Product Engineer & Builder`}
        description="Lead Product Engineer at IBS Software building event-driven systems in Java, Spring Boot and Kafka — and an independent product builder shipping Android apps and web products."
        path="/about"
        jsonLd={[
          webPageSchema({
            title: `About ${person.name}`,
            description:
              'Career, engineering philosophy and independent product building.',
            path: '/about',
          }),
          personSchema(),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
          ]),
        ]}
      />

      <div className="mx-auto max-w-content px-5 sm:px-6 lg:px-8">
        {/* ── Intro ── */}
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-7 lg:col-span-7"
          >
            <SectionHeader
              as="h1"
              eyebrow="About"
              title={
                <>
                  Software engineering is my profession.{' '}
                  <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                    Product building
                  </span>{' '}
                  is how I explore ideas outside it.
                </>
              }
            />

            <div className="flex max-w-prose flex-col gap-5 leading-relaxed text-text-secondary">
              <p>
                I&rsquo;m {person.name}, a {person.jobTitle} at {person.company}. I work on
                event-driven backend systems — Java, Spring Boot and Apache Kafka — for platforms
                used by global airlines. So far that has meant 30+ enterprise features delivered to
                10+ airlines, 980+ production issues resolved at 100% SLA adherence, and a 30%
                improvement in transaction throughput.
              </p>
              <p>
                Outside of that, I design and ship my own products. {liveAndroid} Android apps are
                live on Google Play, alongside {webProducts.length} web products: SwapFormat, an
                in-browser image converter, and CodeDepth, a Java interview preparation platform.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto w-full max-w-sm">
              <div aria-hidden="true" className="absolute -inset-4 rounded-3xl bg-primary/10 blur-3xl" />
              <img
                src={profileImage}
                alt={`${person.name}, ${person.jobTitle}`}
                width={384}
                height={480}
                loading="eager"
                decoding="async"
                className="relative aspect-[4/5] w-full rounded-2xl border border-line/10 object-cover shadow-raised"
              />
            </div>
          </motion.div>
        </div>

        {/* ── What I build ── */}
        <section aria-labelledby="build-heading" className="mt-section border-t border-line/5 pt-section">
          <SectionHeader
            id="build-heading"
            eyebrow="What I build"
            title="Two kinds of work"
            description="One pays the bills and taught me how large systems actually behave. The other is where I get to own the whole thing."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="flex flex-col gap-4 rounded-2xl border border-border-dark bg-card-dark/70 p-7">
              <span className="material-symbols-outlined text-primary" aria-hidden="true">
                dns
              </span>
              <h3 className="font-display text-xl font-bold text-strong">Enterprise engineering</h3>
              <p className="leading-relaxed text-text-secondary">
                Distributed, event-driven systems in the airline domain — the kind where
                correctness matters more than novelty and an outage has real consequences.
              </p>
              <Link
                to="/engineering"
                className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-light"
              >
                Engineering &amp; expertise
                <span className="material-symbols-outlined text-lg" aria-hidden="true">
                  arrow_forward
                </span>
              </Link>
            </div>

            <div className="flex flex-col gap-4 rounded-2xl border border-border-dark bg-card-dark/70 p-7">
              <span className="material-symbols-outlined text-primary" aria-hidden="true">
                deployed_code
              </span>
              <h3 className="font-display text-xl font-bold text-strong">Independent products</h3>
              <p className="leading-relaxed text-text-secondary">
                {liveProducts.length} live products across Android and the web — utilities,
                productivity tools, games and a developer learning platform. Design, build, launch,
                support: all of it.
              </p>
              <Link
                to="/products"
                className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-light"
              >
                Browse the products
                <span className="material-symbols-outlined text-lg" aria-hidden="true">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── How I think about products ── */}
        <section aria-labelledby="principles-heading" className="mt-section border-t border-line/5 pt-section">
          <SectionHeader
            id="principles-heading"
            eyebrow="How I think about products"
            title="Three things I keep coming back to"
          />

          <ul className="mt-10 grid list-none gap-5 lg:grid-cols-3">
            {principles.map((p) => (
              <li
                key={p.title}
                className="flex flex-col gap-3 rounded-2xl border border-border-dark bg-card-dark/70 p-7"
              >
                <span className="material-symbols-outlined text-primary" aria-hidden="true">
                  {p.icon}
                </span>
                <h3 className="font-display text-lg font-bold text-strong">{p.title}</h3>
                <p className="text-sm leading-relaxed text-text-secondary">{p.body}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Career ── */}
        <section aria-labelledby="career-heading" className="mt-section border-t border-line/5 pt-section">
          <SectionHeader
            id="career-heading"
            eyebrow="Career"
            title="Where I've worked"
            description="Born and raised in Rayachoty, where I also completed my entire education."
          />

          <ol className="mt-10 flex list-none flex-col gap-4">
            {experience.map((role) => (
              <li
                key={role.id}
                className="flex flex-col gap-2 rounded-2xl border border-border-dark bg-card-dark/70 p-6 sm:flex-row sm:items-start sm:gap-6"
              >
                <span className="shrink-0 font-mono text-xs text-primary sm:w-44">
                  {role.dateRange}
                </span>
                <span className="flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-display text-lg font-bold text-strong">{role.title}</span>
                    {role.isCurrent && (
                      <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                        Current
                      </span>
                    )}
                  </span>
                  <span className="mt-0.5 block text-sm text-primary">{role.company}</span>
                  <span className="mt-2 block text-sm leading-relaxed text-text-secondary">
                    {role.description}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Education ── */}
        <section aria-labelledby="education-heading" className="mt-section border-t border-line/5 pt-section">
          <SectionHeader id="education-heading" eyebrow="Education" title="Studied entirely in Rayachoty" />

          <ol className="mt-10 grid list-none gap-4 lg:grid-cols-3">
            {education.map((e) => (
              <li
                key={e.id}
                className="flex flex-col gap-2 rounded-2xl border border-border-dark bg-card-dark/70 p-6"
              >
                <span className="material-symbols-outlined text-primary" aria-hidden="true">
                  {e.icon}
                </span>
                <span className="font-mono text-xs text-text-muted">{e.dateRange}</span>
                <h3 className="font-display font-bold leading-snug text-strong">{e.title}</h3>
                <p className="text-sm text-text-secondary">{e.institution}</p>
                <p className="text-xs text-text-muted">{e.note}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Recognition ── */}
        <section aria-labelledby="recognition-heading" className="mt-section border-t border-line/5 pt-section">
          <SectionHeader
            id="recognition-heading"
            eyebrow="Recognition"
            title="Awards and challenges"
            description={`${awards.filter((a) => a.kind === 'professional').length} professional awards at IBS Software, including 1st place in the organization-wide Prompt Engineering Challenge 2025.`}
          />
          <div className="mt-8">
            <Link
              to="/awards"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-line/10 px-5 text-sm font-bold text-strong transition-colors hover:border-primary/50 hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              See all recognition
              <span className="material-symbols-outlined text-lg" aria-hidden="true">
                arrow_forward
              </span>
            </Link>
          </div>
        </section>

        {/* ── Closing ── */}
        <section className="mt-section rounded-3xl border border-border-dark bg-surface/40 p-8 sm:p-10">
          <p className="max-w-prose leading-relaxed text-text-secondary">
            {studio.attribution}. If you want to talk about backend systems, product work, or one
            of the things I&rsquo;ve shipped —{' '}
            <Link
              to="/contact"
              className="font-medium text-primary underline underline-offset-4 hover:text-primary-light"
            >
              get in touch
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
