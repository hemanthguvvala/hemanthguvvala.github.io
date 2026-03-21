#!/bin/bash
cd portfolio-react/src

# Create Navigation Component
cat > components/Navigation.jsx << 'EOF'
import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation();
  
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-xl border-b border-white/5 bg-background-dark/80">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="relative size-10 flex items-center justify-center bg-primary/10 rounded-lg border border-primary/30 group-hover:border-primary transition-all">
            <span className="material-symbols-outlined text-primary text-2xl">code</span>
          </div>
          <div>
            <h2 className="text-white text-xl font-bold tracking-tight">HKG</h2>
            <p className="text-xs text-slate-500 font-mono">v2.5.0</p>
          </div>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className={`text-sm font-medium transition-colors relative group ${location.pathname === '/' ? 'text-primary' : 'text-slate-400 hover:text-primary'}`}>
            <span>Home</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </Link>
          <Link to="/skills" className={`text-sm font-medium transition-colors relative group ${location.pathname === '/skills' ? 'text-primary' : 'text-slate-400 hover:text-primary'}`}>
            <span>Skills</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </Link>
          <Link to="/products" className={`text-sm font-medium transition-colors relative group ${location.pathname === '/products' ? 'text-primary' : 'text-slate-400 hover:text-primary'}`}>
            <span>Products</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </Link>
          <Link to="/awards" className={`text-sm font-medium transition-colors relative group ${location.pathname === '/awards' ? 'text-primary' : 'text-slate-400 hover:text-primary'}`}>
            <span>Awards</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </Link>
          <button className="px-6 py-2.5 bg-gradient-to-r from-primary to-accent text-background-dark font-bold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all transform hover:-translate-y-0.5">
            <span className="flex items-center gap-2">
              Contact
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
EOF

# Create Footer Component
cat > components/Footer.jsx << 'EOF'
export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-12 z-10 bg-surface-dark/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-white mb-2">Hemanth Kumar Guvvala</h3>
            <p className="text-slate-500 text-sm font-mono">Senior Product Engineer • System Architect</p>
            <p className="text-slate-600 text-xs mt-2">© 2026 All rights reserved.</p>
          </div>
          <div className="flex gap-4">
            <a href="https://github.com/hemanthguvvala" className="group p-3 bg-surface-light rounded-lg border border-white/10 hover:border-primary transition-all">
              <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">code</span>
            </a>
            <a href="#" className="group p-3 bg-surface-light rounded-lg border border-white/10 hover:border-primary transition-all">
              <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">work</span>
            </a>
            <a href="#" className="group p-3 bg-surface-light rounded-lg border border-white/10 hover:border-primary transition-all">
              <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">mail</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
EOF

echo "Navigation and Footer components created!"
