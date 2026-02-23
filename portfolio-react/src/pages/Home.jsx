import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="page-container">
      {/* Main Hero Section */}
      <main className="relative flex flex-col min-h-screen w-full">
        {/* Background Layers */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Central Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(0,194,158,0.15)_0%,rgba(15,35,31,0)_70%)] rounded-full animate-pulse-slow"></div>
          {/* Vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-transparent to-background-dark"></div>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center relative z-10 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full max-w-[960px] flex flex-col items-center text-center gap-8"
          >
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-dark border border-white/5 shadow-xl backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-xs font-medium tracking-widest text-slate-400 uppercase">Lead Product Engineer</span>
            </div>

            {/* Main Headlines */}
            <div className="flex flex-col gap-4">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-slate-500 pb-2 font-display">
                Hemanth Kumar<br className="hidden md:block" /> Guvvala
              </h1>
              <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 font-light leading-relaxed mt-4 border-l-2 border-primary/30 pl-6 text-left md:text-center md:border-l-0 md:pl-0">
                I architect <span className="text-primary font-medium">scalable distributed systems</span> with Java, Spring Boot & Kafka — delivering 30+ enterprise features to 10+ global airlines.
              </p>
            </div>

            {/* CTA Actions */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-8">
              <Link
                to="/products"
                className="flex items-center justify-center gap-2 h-14 px-8 bg-primary hover:bg-primary-dark text-background-dark text-base font-bold rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(0,194,158,0.4)] hover:shadow-[0_0_30px_-5px_rgba(0,194,158,0.6)] transform hover:-translate-y-0.5"
              >
                <span>View Products</span>
                <span className="material-symbols-outlined text-lg">layers</span>
              </Link>
              <a
                href="/Hemanth_Kumar_Guvvala_Resume.pdf"
                download
                className="flex items-center justify-center gap-2 h-14 px-8 bg-surface-dark/50 hover:bg-surface-dark border border-white/10 hover:border-primary/50 text-white text-base font-bold rounded-xl backdrop-blur-md transition-all group"
              >
                <span>Resume</span>
                <span className="material-symbols-outlined text-lg text-slate-400 group-hover:text-primary transition-colors">download</span>
              </a>
              <Link
                to="/contact"
                className="flex items-center justify-center gap-2 h-14 px-8 bg-surface-dark/50 hover:bg-surface-dark border border-white/10 hover:border-white/20 text-white text-base font-bold rounded-xl backdrop-blur-md transition-all"
              >
                <span>Contact</span>
                <span className="material-symbols-outlined text-lg text-slate-400">mail</span>
              </Link>
            </div>

            {/* Tech Stack Hint */}
            <div className="mt-16 pt-8 border-t border-white/5 w-full max-w-lg flex justify-between items-center text-slate-500 opacity-60 hover:opacity-100 transition-opacity">
              <span className="text-xs uppercase tracking-wider">Core Stack</span>
              <div className="flex gap-6">
                <span className="material-symbols-outlined" title="Java & Spring Boot">dns</span>
                <span className="material-symbols-outlined" title="AWS & Docker">cloud</span>
                <span className="material-symbols-outlined" title="Kafka & Microservices">hub</span>
                <span className="material-symbols-outlined" title="GitHub Copilot">smart_toy</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
          <span className="text-[10px] uppercase tracking-widest text-slate-500">Scroll</span>
          <span className="material-symbols-outlined text-primary text-xl">keyboard_arrow_down</span>
        </div>
      </main>

      {/* Engineering Philosophy Section */}
      <section className="w-full border-t border-white/5 py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-surface-dark/30 to-transparent pointer-events-none"></div>
        <div className="max-w-[960px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-bold text-white font-display">Engineering Philosophy</h3>
              <p className="text-slate-400 leading-relaxed">
                I translate complex business needs into robust technical solutions. With 980+ production issues resolved at 100% SLA adherence, I believe the best systems are the ones that run silently.
              </p>
              <div className="flex gap-4 pt-4">
                <div className="flex flex-col gap-1 p-4 rounded-xl bg-surface-dark border border-white/5 w-full">
                  <span className="material-symbols-outlined text-primary mb-2">speed</span>
                  <span className="text-white font-bold">30% Faster</span>
                  <span className="text-xs text-slate-500">Transaction throughput</span>
                </div>
                <div className="flex flex-col gap-1 p-4 rounded-xl bg-surface-dark border border-white/5 w-full">
                  <span className="material-symbols-outlined text-primary mb-2">rocket_launch</span>
                  <span className="text-white font-bold">50% Faster Deploys</span>
                  <span className="text-xs text-slate-500">AWS + Docker</span>
                </div>
              </div>
            </motion.div>

            {/* Abstract visual */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-[400px] w-full rounded-2xl overflow-hidden bg-surface-dark border border-white/10 group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-surface-dark to-background-dark opacity-60"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-xs text-primary mb-2 font-mono">CURRENT FOCUS</div>
                <div className="text-xl font-bold text-white mb-1 font-display">Event-Driven Microservices</div>
                <div className="text-sm text-slate-400">Scalable airline systems with Kafka & Spring Boot at IBS Software.</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
