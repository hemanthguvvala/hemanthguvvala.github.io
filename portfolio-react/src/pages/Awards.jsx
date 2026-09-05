import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import SectionHeader from '../components/SectionHeader';
import { awards } from '../data/career';
import { person } from '../data/profile';
import { breadcrumbSchema, personSchema, webPageSchema } from '../seo/jsonld';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const professional = awards.filter((a) => a.kind === 'professional');
const academic = awards.filter((a) => a.kind === 'academic');

function AwardList({ items }) {
  return (
    <motion.ul
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      className="grid list-none gap-5 md:grid-cols-2 lg:grid-cols-3"
    >
      {items.map((award) => (
        <motion.li
          key={`${award.title}-${award.year ?? 'na'}`}
          variants={item}
          className={`group relative flex flex-col gap-3 overflow-hidden rounded-2xl border bg-card-dark/80 p-6 shadow-card transition-colors duration-300 ${
            award.highlight
              ? 'border-primary/35 hover:border-primary/60'
              : 'border-border-dark hover:border-primary/35'
          }`}
        >
          {award.highlight && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-14 -top-14 size-48 rounded-full bg-primary/10 blur-3xl"
            />
          )}

          <div className="relative flex items-start justify-between gap-3">
            <span
              className={`flex size-11 shrink-0 items-center justify-center rounded-xl border border-border-dark ${
                award.highlight ? 'bg-primary/15 text-primary' : 'bg-surface text-primary'
              }`}
            >
              <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
                {award.icon}
              </span>
            </span>
            {award.year && (
              <span className="font-mono text-xs text-text-muted">{award.year}</span>
            )}
          </div>

          <h3 className="relative font-display text-lg font-bold leading-snug text-white">
            {award.title}
          </h3>

          <p className="relative text-xs text-primary">{award.issuer}</p>

          <p className="relative text-sm leading-relaxed text-text-secondary">
            {award.description}
          </p>
        </motion.li>
      ))}
    </motion.ul>
  );
}

export default function Awards() {
  return (
    <div className="pb-section-lg pt-32">
      <SEO
        title={`Awards & Recognition | ${person.name}`}
        description="Professional recognition at IBS Software including the Prompt Engineering Challenge 2025 win, GitHub Copilot Hackathon, Code Quest and multiple team awards."
        path="/awards"
        jsonLd={[
          webPageSchema({
            title: `Awards & Recognition | ${person.name}`,
            description: 'Professional and academic recognition.',
            path: '/awards',
          }),
          personSchema(),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Awards', path: '/awards' },
          ]),
        ]}
      />

      <div className="mx-auto max-w-content px-5 sm:px-6 lg:px-8">
        <SectionHeader
          as="h1"
          eyebrow="Recognition"
          title="Awards & recognition"
          description="Recognition earned at IBS Software and during my studies. Every entry lists who gave it and when."
        />

        <section aria-labelledby="professional-heading" className="mt-14">
          <h2
            id="professional-heading"
            className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted"
          >
            Professional — {professional.length} awards
          </h2>
          <div className="mt-6">
            <AwardList items={professional} />
          </div>
        </section>

        {academic.length > 0 && (
          <section aria-labelledby="academic-heading" className="mt-16">
            <h2
              id="academic-heading"
              className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted"
            >
              Academic
            </h2>
            <div className="mt-6">
              <AwardList items={academic} />
            </div>
          </section>
        )}

        <div className="mt-16 flex flex-wrap gap-4">
          <Link
            to="/timeline"
            className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-white/10 px-5 text-sm font-bold text-white transition-colors hover:border-primary/50 hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            See the full journey
            <span className="material-symbols-outlined text-lg" aria-hidden="true">
              arrow_forward
            </span>
          </Link>
          <Link
            to="/products"
            className="inline-flex min-h-[48px] items-center gap-2 rounded-xl px-4 text-sm font-medium text-text-secondary transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Products I&rsquo;ve built
          </Link>
        </div>
      </div>
    </div>
  );
}
