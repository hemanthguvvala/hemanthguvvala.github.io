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
            <a href="https://github.com/hemanthguvvala" target="_blank" rel="noopener noreferrer" className="group p-3 bg-surface-light rounded-lg border border-white/10 hover:border-primary transition-all">
              <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">code</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
