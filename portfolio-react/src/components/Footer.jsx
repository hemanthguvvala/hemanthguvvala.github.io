import { Link } from 'react-router-dom';
import SocialLinks from './SocialLinks';
import { person, studio } from '../data/profile';
import { PLAY_DEVELOPER_URL } from '../data/products';
import { EVENTS, track } from '../utils/analytics';

const columns = [
  {
    heading: 'Products',
    links: [
      { to: '/products', label: 'All products' },
      { to: '/web-products', label: 'Web products' },
      { to: '/products/swapformat', label: 'SwapFormat' },
      { to: '/products/codedepth', label: 'CodeDepth' },
    ],
  },
  {
    heading: 'Work with me',
    links: [
      { to: '/services', label: 'Services' },
      { to: '/contact', label: 'Discuss a project' },
    ],
  },
  {
    heading: 'Profile',
    links: [
      { to: '/about', label: 'About' },
      { to: '/engineering', label: 'Engineering' },
      { to: '/timeline', label: 'Journey' },
      { to: '/awards', label: 'Awards' },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/5 bg-background-dark pb-8 pt-16">
      <div className="mx-auto max-w-content px-5 sm:px-6 lg:px-8">
        {/* Brand block spans 2, then one column per link group (3). */}
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2 flex flex-col gap-4 md:col-span-2">
            <p className="font-display text-xl font-bold text-white">
              Let&rsquo;s build something durable.
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-text-secondary">
              {studio.positioning}
            </p>
            <SocialLinks className="mt-2" />
          </div>

          {columns.map((col) => (
            <nav key={col.heading} aria-labelledby={`footer-${col.heading}`}>
              <h2
                id={`footer-${col.heading}`}
                className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted"
              >
                {col.heading}
              </h2>
              <ul className="mt-4 flex list-none flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-sm text-text-secondary transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="my-10 h-px w-full bg-white/5" />

        <div className="flex flex-col items-center justify-between gap-5 text-sm md:flex-row">
          <p className="text-text-muted">
            © {year} {person.name}. {studio.attribution}.
          </p>
          <ul className="flex list-none flex-wrap items-center justify-center gap-6">
            <li>
              <Link
                to="/contact"
                onClick={() => track(EVENTS.contactClick, { from: 'footer' })}
                className="text-text-muted transition-colors hover:text-primary"
              >
                Contact
              </Link>
            </li>
            <li>
              <a
                href={PLAY_DEVELOPER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted transition-colors hover:text-primary"
              >
                View all apps
              </a>
            </li>
            <li>
              <a
                href={person.resumeUrl}
                download
                onClick={() => track(EVENTS.resumeDownload, { from: 'footer' })}
                className="text-text-muted transition-colors hover:text-primary"
              >
                Download resume
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
