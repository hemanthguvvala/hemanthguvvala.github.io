import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-background-dark z-10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center">
        {/* Top section */}
        <div className="flex flex-col md:flex-row w-full justify-between items-center gap-8 mb-12">
          <div className="flex flex-col items-center md:items-start gap-2">
            <h3 className="text-white text-xl font-bold font-display">Let's build something durable.</h3>
            <p className="text-slate-500 text-sm">Open for consulting and architectural reviews.</p>
          </div>
          <div className="flex gap-4">
            <a
              href="https://github.com/hemanthguvvala"
              target="_blank"
              rel="noopener noreferrer"
              className="size-12 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-primary hover:bg-primary/10 transition-all"
              aria-label="GitHub"
            >
              <span className="material-symbols-outlined">code</span>
            </a>
            <a
              href="https://www.linkedin.com/in/hemanthkumarguvvala/"
              target="_blank"
              rel="noopener noreferrer"
              className="size-12 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-primary hover:bg-primary/10 transition-all"
              aria-label="LinkedIn"
            >
              <span className="material-symbols-outlined">work</span>
            </a>
            <a
              href="https://play.google.com/store/apps/developer?id=Hemanth+Kumar+Guuvvala"
              target="_blank"
              rel="noopener noreferrer"
              className="size-12 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-primary hover:bg-primary/10 transition-all"
              aria-label="Google Play Store"
            >
              <span className="material-symbols-outlined">shop</span>
            </a>
            <a
              href="mailto:guvvalahemanthkumar@gmail.com"
              className="size-12 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-primary hover:bg-primary/10 transition-all"
              aria-label="Email"
            >
              <span className="material-symbols-outlined">alternate_email</span>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/5 mb-8"></div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center w-full gap-6 text-sm">
          <p className="text-slate-600">© 2026 Hemanth Kumar Guvvala. All rights reserved.</p>
          <div className="flex gap-8">
            <Link to="/contact" className="text-slate-600 hover:text-primary transition-colors">Contact</Link>
            <a 
              href="/Hemanth_Kumar_Guvvala_Resume.pdf" 
              download 
              className="text-slate-600 hover:text-primary transition-colors"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
