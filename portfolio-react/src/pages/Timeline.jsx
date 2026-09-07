import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import SectionHeader from '../components/SectionHeader';
import { education, experience } from '../data/career';
import { person } from '../data/profile';
import { breadcrumbSchema, personSchema, webPageSchema } from '../seo/jsonld';

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Timeline() {
  return (
    <div className="pb-section-lg pt-32">
      <SEO
        title={`Journey — Career & Education | ${person.name}`}
        description="Career path from Software Engineer at Marlabs to Lead Product Engineer at IBS Software, plus education in Rayachoty, Andhra Pradesh."
        path="/timeline"
        jsonLd={[
          webPageSchema({
            title: `Journey | ${person.name}`,
            description: 'Career and education timeline.',
            path: '/timeline',
          }),
          personSchema(),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Journey', path: '/timeline' },
          ]),
        ]}
      />

      <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
        <SectionHeader
          as="h1"
          eyebrow="Journey"
          title="Career & education"
          description="From a Software Engineer role at Marlabs to leading product engineering at IBS Software — with every year of schooling completed in my hometown."
        />

        {/* ── Career ── */}
        <section aria-labelledby="roles-heading" className="mt-14">
          <h2
            id="roles-heading"
            className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted"
          >
            Professional experience
          </h2>

          <ol className="relative mt-8 flex list-none flex-col gap-6 before:absolute before:bottom-4 before:left-[19px] before:top-4 before:w-px before:bg-gradient-to-b before:from-primary/40 before:via-border-dark before:to-transparent">
            {experience.map((role) => (
              <motion.li
                key={role.id}
                variants={item}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                className="relative flex gap-5"
              >
                <span
                  className={`relative z-10 mt-1 flex size-10 shrink-0 items-center justify-center rounded-full border ${
                    role.isCurrent
                      ? 'border-primary/50 bg-primary/15 text-primary'
                      : 'border-border-dark bg-surface text-text-secondary'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                    {role.icon}
                  </span>
                </span>

                <div className="flex-1 rounded-2xl border border-border-dark bg-card-dark/70 p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs text-primary">{role.dateRange}</span>
                    {role.isCurrent && (
                      <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                        Current
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 font-display text-lg font-bold text-strong sm:text-xl">
                    {role.title}
                  </h3>
                  <p className="mt-0.5 text-sm font-medium text-primary">{role.company}</p>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                    {role.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </section>

        {/* ── Education ── */}
        <section aria-labelledby="education-heading" className="mt-16">
          <h2
            id="education-heading"
            className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted"
          >
            Education
          </h2>

          <ol className="mt-8 flex list-none flex-col gap-4">
            {education.map((e) => (
              <li
                key={e.id}
                className="flex flex-col gap-3 rounded-2xl border border-border-dark bg-card-dark/70 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border-dark bg-surface text-primary">
                  <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                    {e.icon}
                  </span>
                </span>
                <div className="flex-1">
                  <span className="font-mono text-xs text-text-muted">{e.dateRange}</span>
                  <h3 className="mt-1 font-display font-bold leading-snug text-strong">{e.title}</h3>
                  <p className="mt-0.5 text-sm text-text-secondary">{e.institution}</p>
                </div>
                <span className="shrink-0 rounded-lg border border-border-dark bg-surface px-3 py-1.5 font-mono text-xs text-primary">
                  {e.note}
                </span>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-14 flex flex-wrap gap-4">
          <Link
            to="/awards"
            className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-line/10 px-5 text-sm font-bold text-strong transition-colors hover:border-primary/50 hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Awards &amp; recognition
            <span className="material-symbols-outlined text-lg" aria-hidden="true">
              arrow_forward
            </span>
          </Link>
          <Link
            to="/engineering"
            className="inline-flex min-h-[48px] items-center gap-2 rounded-xl px-4 text-sm font-medium text-text-secondary transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Engineering &amp; expertise
          </Link>
        </div>
      </div>
    </div>
  );
}
