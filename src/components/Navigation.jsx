import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Navigation() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/skills', label: 'Skills' },
    { to: '/products', label: 'Products' },
    { to: '/timeline', label: 'Timeline' },
    { to: '/awards', label: 'Awards' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-white/5 bg-background-dark/80 transition-all duration-300">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="relative size-8 flex items-center justify-center bg-primary/10 rounded-lg border border-primary/20 group-hover:border-primary/50 transition-colors">
            <span className="material-symbols-outlined text-primary text-xl">terminal</span>
          </div>
          <h2 className="text-white text-lg font-bold tracking-tight font-display">HKG</h2>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex flex-1 justify-end items-center gap-8">
          <div className="flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? 'text-white border-b-2 border-primary pb-0.5'
                    : 'text-slate-400 hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="h-6 w-px bg-white/10"></div>
          <Link
            to="/contact"
            className="flex items-center justify-center h-10 px-5 rounded-lg border border-white/10 hover:border-primary hover:bg-primary/10 text-white text-sm font-bold transition-all group"
          >
            <span className="mr-2">Contact</span>
            <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-1">arrow_forward</span>
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-white cursor-pointer p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className="material-symbols-outlined">{mobileOpen ? 'close' : 'menu'}</span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/5 bg-background-dark/95 backdrop-blur-md">
          <div className="flex flex-col px-6 py-4 gap-3">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`text-sm font-medium py-2 transition-colors ${
                  location.pathname === link.to ? 'text-primary' : 'text-slate-400 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 flex items-center justify-center h-10 px-5 rounded-lg bg-primary/10 border border-primary/20 text-primary text-sm font-bold"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
