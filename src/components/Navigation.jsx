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
          <Link to="/" className={`text-sm font-medium transition-colors relative group \${location.pathname === '/' ? 'text-primary' : 'text-slate-400 hover:text-primary'}`}>
            <span>Home</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </Link>
          <Link to="/skills" className={`text-sm font-medium transition-colors relative group \${location.pathname === '/skills' ? 'text-primary' : 'text-slate-400 hover:text-primary'}`}>
            <span>Skills</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </Link>
          <Link to="/products" className={`text-sm font-medium transition-colors relative group \${location.pathname === '/products' ? 'text-primary' : 'text-slate-400 hover:text-primary'}`}>
            <span>Products</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </Link>
          <Link to="/awards" className={`text-sm font-medium transition-colors relative group \${location.pathname === '/awards' ? 'text-primary' : 'text-slate-400 hover:text-primary'}`}>
            <span>Awards</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
