import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import SectionHeader from '../components/SectionHeader';
import SocialLinks from '../components/SocialLinks';
import { person } from '../data/profile';
import { breadcrumbSchema, personSchema, webPageSchema } from '../seo/jsonld';
import { EVENTS, track } from '../utils/analytics';

/**
 * No contact form on purpose: a form on a static site needs a third-party
 * endpoint, which means collecting and storing personal data for no real
 * benefit over a mailto link.
 */
export default function Contact() {
  return (
    <div className="pb-section-lg pt-32">
      <SEO
        title={`Contact ${person.name} | Lead Product Engineer`}
        description="Get in touch with Hemanth Kumar Guvvala, Lead Product Engineer and independent product builder — by email, LinkedIn, GitHub or the Google Play developer profile."
        path="/contact"
        jsonLd={[
          webPageSchema({
            title: `Contact ${person.name}`,
            description: 'Email, LinkedIn, GitHub and Google Play developer profile.',
            path: '/contact',
          }),
          personSchema(),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ]),
        ]}
      />

      <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader
            as="h1"
            align="center"
            eyebrow="Contact"
            title="Let's talk"
            description="Open to conversations about backend engineering, product work, and the things I've shipped. Email is the most reliable way to reach me."
          />
        </motion.div>

        <div className="mt-12">
          <a
            href={`mailto:${person.email}`}
            onClick={() => track(EVENTS.contactClick, { from: 'contact-primary' })}
            className="group flex min-h-[64px] flex-col items-center justify-center gap-1 rounded-2xl bg-primary px-6 py-5 text-center transition-colors hover:bg-primary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <span className="font-mono text-xs uppercase tracking-wider text-background-dark/70">
              Email me
            </span>
            <span className="break-all font-display text-lg font-bold text-background-dark sm:text-xl">
              {person.email}
            </span>
          </a>
        </div>

        <div className="mt-6">
          <h2 className="sr-only">Profiles</h2>
          <SocialLinks variant="list" />
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          <a
            href={person.resumeUrl}
            download
            onClick={() => track(EVENTS.resumeDownload, { from: 'contact' })}
            className="flex min-h-[64px] items-center gap-4 rounded-xl border border-border-dark bg-card-dark/70 px-5 transition-colors hover:border-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <span className="material-symbols-outlined text-primary" aria-hidden="true">
              download
            </span>
            <span>
              <span className="block text-sm font-bold text-white">Download resume</span>
              <span className="block text-xs text-text-muted">PDF</span>
            </span>
          </a>

          <Link
            to="/products"
            className="flex min-h-[64px] items-center gap-4 rounded-xl border border-border-dark bg-card-dark/70 px-5 transition-colors hover:border-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <span className="material-symbols-outlined text-primary" aria-hidden="true">
              layers
            </span>
            <span>
              <span className="block text-sm font-bold text-white">See the products</span>
              <span className="block text-xs text-text-muted">Apps and web tools</span>
            </span>
          </Link>
        </div>

        <p className="mt-10 text-center text-xs text-text-muted">
          This site collects no personal data and has no contact form or tracking.
        </p>
      </div>
    </div>
  );
}
