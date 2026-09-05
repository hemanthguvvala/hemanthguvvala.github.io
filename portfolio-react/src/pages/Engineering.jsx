import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import SectionHeader from '../components/SectionHeader';
import { engineeringAreas } from '../data/career';
import { person } from '../data/profile';
import { breadcrumbSchema, personSchema, webPageSchema } from '../seo/jsonld';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Engineering() {
  return (
    <div className="pb-section-lg pt-32">
      <SEO
        title={`Engineering | Java, Spring Boot & Kafka | ${person.name}`}
        description="Backend and product engineering: Java, Spring Boot, Apache Kafka, microservices, AWS and Docker — the work behind 30+ enterprise features delivered to global airlines."
        path="/engineering"
        jsonLd={[
          webPageSchema({
            title: 'Engineering & Expertise',
            description:
              'Java, Spring Boot, Kafka, microservices, cloud and AI-assisted development.',
            path: '/engineering',
          }),
          personSchema(),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Engineering', path: '/engineering' },
          ]),
        ]}
      />

      <div className="mx-auto max-w-content px-5 sm:px-6 lg:px-8">
        <SectionHeader
          as="h1"
          eyebrow="Engineering & expertise"
          title="Backend systems that run quietly"
          description="I build event-driven backend systems for airline platforms at IBS Software — and ship Android and web products on my own time. These are the areas I actually work in."
        />

        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-12 grid list-none auto-rows-fr grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {engineeringAreas.map((area) => (
            <motion.li
              key={area.title}
              variants={item}
              className={`group relative flex flex-col justify-between gap-6 overflow-hidden rounded-2xl border border-border-dark bg-card-dark/80 p-6 shadow-card transition-colors duration-300 hover:border-primary/40 sm:p-8 ${area.span}`}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-primary/5 blur-3xl transition-colors duration-500 group-hover:bg-primary/10"
              />

              <div className="relative flex flex-col gap-3">
                <span className="mb-1 flex size-12 items-center justify-center rounded-xl border border-border-dark bg-surface text-primary transition-transform duration-300 group-hover:scale-110">
                  <span className="material-symbols-outlined text-[28px]" aria-hidden="true">
                    {area.icon}
                  </span>
                </span>
                <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
                  {area.title}
                </h2>
                <p className="max-w-md text-sm leading-relaxed text-text-secondary">
                  {area.description}
                </p>
              </div>

              <ul className="relative mt-auto flex list-none flex-wrap gap-2">
                {area.tags.map((tag) => (
                  <li
                    key={tag.label}
                    className={`rounded-md border border-border-dark bg-surface px-3 py-1.5 font-mono text-xs font-medium ${
                      tag.highlight ? 'text-primary' : 'text-slate-300'
                    }`}
                  >
                    {tag.label}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </motion.ul>

        {/* Internal linking */}
        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          {[
            {
              to: '/products',
              title: 'Products',
              detail: 'What I build outside the day job',
              icon: 'layers',
            },
            {
              to: '/timeline',
              title: 'Journey',
              detail: 'Career and education',
              icon: 'timeline',
            },
            {
              to: '/awards',
              title: 'Recognition',
              detail: 'Awards and challenges',
              icon: 'emoji_events',
            },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="flex items-center gap-4 rounded-2xl border border-border-dark bg-card-dark/70 p-5 transition-colors hover:border-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <span className="material-symbols-outlined text-primary" aria-hidden="true">
                {l.icon}
              </span>
              <span>
                <span className="block font-display font-bold text-white">{l.title}</span>
                <span className="block text-xs text-text-muted">{l.detail}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
