import { Link } from 'react-router-dom';
import SEO from './SEO';
import { legal } from '../data/legal';
import { breadcrumbSchema, webPageSchema } from '../seo/jsonld';
import { formatDate } from '../data/journey';

/**
 * The shell both legal documents share: title, the date the wording last
 * changed, and the body.
 *
 * The body reuses `.article-prose`, the same typography journey entries get.
 * A legal document is long-form reading and deserves the measure and spacing
 * the writing already has — and it means these pages carry no styling of their
 * own to drift from the rest of the site.
 *
 * Deliberately indexable. A privacy policy or a set of terms that search
 * engines cannot see is harder to point at later as something a visitor was
 * put on notice of.
 */
export default function LegalDocument({ title, description, path, breadcrumb, children }) {
  return (
    <div className="pb-section-lg pt-32">
      <SEO
        title={`${title} | ${legal.owner}`}
        description={description}
        path={path}
        jsonLd={[
          webPageSchema({ title, description, path }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: breadcrumb ?? title, path },
          ]),
        ]}
      />

      <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex list-none flex-wrap items-center gap-2 font-mono text-xs text-text-muted">
            <li>
              <Link to="/" className="transition-colors hover:text-primary">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{breadcrumb ?? title}</li>
          </ol>
        </nav>

        <header className="article-enter flex flex-col gap-4 border-b border-line/5 pb-8">
          <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
            Legal · Last updated <time dateTime={legal.updated}>{formatDate(legal.updated)}</time>
          </p>
          <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-strong sm:text-4xl">
            {title}
          </h1>
          <p className="text-lg leading-relaxed text-text-secondary">{description}</p>
        </header>

        <div className="article-prose mt-10">{children}</div>

        <p className="mt-14 border-t border-line/5 pt-8 text-sm text-text-muted">
          Questions about this document, or a request for permission, go to{' '}
          <a
            href={`mailto:${legal.noticeEmail}`}
            className="text-primary underline underline-offset-4"
          >
            {legal.noticeEmail}
          </a>
          . See also the{' '}
          <Link to="/privacy" className="text-primary underline underline-offset-4">
            privacy policy
          </Link>{' '}
          and the{' '}
          <Link to="/terms" className="text-primary underline underline-offset-4">
            terms of use
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
