import { Link, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { person } from '../data/profile';
import { JOURNEY_LABEL, JOURNEY_PATH, hasArticles } from '../data/journey';

const links = [
  { to: '/products', label: 'Products' },
  { to: '/web-products', label: 'Web Products' },
  { to: '/services', label: 'Services' },
  // Hidden until the first article ships — an empty section is worse than none.
  ...(hasArticles ? [{ to: JOURNEY_PATH, label: JOURNEY_LABEL }] : []),
  { to: '/engineering', label: 'Engineering' },
  { to: '/about', label: 'About' },
  { to: '/timeline', label: 'Career' },
];

export default function Navigation() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  const toggleRef = useRef(null);

  // Close the mobile menu whenever the route changes, otherwise it stays open
  // over the new page. Adjusting state during render rather than in an effect
  // avoids a second render pass that would flash the open menu, and unlike an
  // onClick handler on each link it also covers browser back/forward.
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMobileOpen(false);
  }

  // Escape closes the menu and returns focus to the control that opened it.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${
      isActive ? 'text-strong border-b-2 border-primary pb-0.5' : 'text-text-secondary hover:text-primary'
    }`;

  return (
    <nav
      className="fixed top-0 z-50 w-full border-b border-line/5 bg-background-dark/85 backdrop-blur-md"
      aria-label="Main"
    >
      <div className="mx-auto flex h-20 max-w-content items-center justify-between px-5 sm:px-6 lg:px-10">
        <Link
          to="/"
          className="group flex items-center gap-3 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          aria-label={`${person.name} — home`}
        >
          <span className="flex size-9 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 transition-colors group-hover:border-primary/50">
            <span className="material-symbols-outlined text-xl text-primary" aria-hidden="true">
              terminal
            </span>
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-base font-bold tracking-tight text-strong">
              {person.initials}
            </span>
            <span className="mt-0.5 hidden font-mono text-[10px] uppercase tracking-wider text-text-muted sm:block">
              Product Builder
            </span>
          </span>
        </Link>

        <div className="hidden flex-1 items-center justify-end gap-7 lg:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
          <span className="h-6 w-px bg-line/10" aria-hidden="true" />
          <ThemeToggle />
          <Link
            to="/contact"
            className="group inline-flex h-10 items-center justify-center rounded-lg border border-line/10 px-5 text-sm font-bold text-strong transition-all hover:border-primary hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Contact
            <span
              className="material-symbols-outlined ml-2 text-base transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            >
              arrow_forward
            </span>
          </Link>
        </div>

        {/* The theme control sits outside the menu so it is reachable on
            mobile without opening the navigation first. */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            ref={toggleRef}
            type="button"
            className="-mr-2 flex size-11 items-center justify-center rounded-lg text-strong transition-colors hover:bg-line/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              {mobileOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-line/5 bg-background-dark/98 backdrop-blur-md lg:hidden"
        >
          <ul className="flex list-none flex-col gap-1 px-5 py-4">
            {[{ to: '/', label: 'Home' }, ...links, { to: '/awards', label: 'Awards' }].map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) =>
                    `flex min-h-[48px] items-center rounded-lg px-3 text-base font-medium transition-colors ${
                      isActive ? 'bg-primary/10 text-primary' : 'text-text-secondary hover:text-strong'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
            <li className="mt-2">
              <Link
                to="/contact"
                className="flex min-h-[48px] items-center justify-center rounded-lg bg-primary px-5 text-base font-bold text-on-primary"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
