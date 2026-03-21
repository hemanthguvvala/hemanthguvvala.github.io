import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="page-container py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px]"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Typography & Philosophy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 flex flex-col gap-8"
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-primary"></span>
              <span className="text-primary text-xs font-bold tracking-widest uppercase">01. About Me</span>
            </div>
            <h1 className="text-white text-4xl lg:text-6xl font-bold leading-[1.1] tracking-tight font-display">
              Translating{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-200">
                complex needs
              </span>{' '}
              into robust solutions.
            </h1>
            <div className="space-y-6">
              <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
                Born and raised in Rayachoty, I completed my entire education in my hometown — from CS Raju High
                School through B.Tech ECE at SSITS. In January 2022, I started my career at Marlabs as a Software
                Engineer, where my work with client IBS Software led to being head-hunted as a permanent employee
                within 10 months.
              </p>
              <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
                Today as Lead Product Engineer at IBS Software, my expertise spans Java, Spring Boot, and
                event-driven microservices with Kafka. I've delivered 30+ enterprise features to 10+ global airlines
                and resolved over 980 production issues maintaining 100% SLA adherence.
              </p>
            </div>

            {/* Signature / Quote Block */}
            <div className="mt-8 border-l-2 border-primary/30 pl-6 py-2">
              <p className="text-slate-500 italic font-medium">
                "I pioneered the organization-wide adoption of GitHub Copilot, demonstrably improving developer productivity and code quality."
              </p>
              <p className="text-primary text-sm font-bold mt-2">— Hemanth K.G., 1st Place — Prompt Engineering Challenge 2025</p>
            </div>
          </motion.div>

          {/* Right Column: Abstract Visual & Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6 relative h-full min-h-[500px] flex items-center justify-center lg:justify-end"
          >
            {/* Main Card */}
            <div className="relative z-10 w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-surface-dark shadow-2xl">
              {/* Abstract background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-surface-dark to-background-dark opacity-80"></div>
              {/* Grid overlay */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              ></div>
              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-90"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-background-dark/20 to-background-dark/80"></div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col gap-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="size-2 rounded-full bg-primary animate-pulse"></div>
                  <span className="text-primary text-xs font-mono uppercase tracking-widest">System Online</span>
                </div>
                <div className="h-px w-full bg-gradient-to-r from-primary/50 to-transparent"></div>
                {/* Stat 1 */}
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Issues Resolved</p>
                    <p className="text-white text-2xl font-bold font-mono">980+</p>
                  </div>
                  <span className="material-symbols-outlined text-primary/50">bug_report</span>
                </div>
                {/* Stat 2 */}
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">SLA Adherence</p>
                    <p className="text-white text-2xl font-bold font-mono">100%</p>
                  </div>
                  <span className="material-symbols-outlined text-primary/50">verified</span>
                </div>
              </div>
            </div>

            {/* Floating Card: Experience */}
            <div className="absolute -left-4 top-20 z-20 hidden md:flex flex-col gap-2 p-4 rounded-xl bg-surface-light/90 backdrop-blur-sm border border-white/10 shadow-xl max-w-[180px]">
              <div className="size-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary mb-1">
                <span className="material-symbols-outlined">database</span>
              </div>
              <span className="text-white font-bold text-lg leading-none">~4 Years</span>
              <span className="text-slate-400 text-xs">Product Engineering</span>
            </div>

            {/* Floating Card: Stack */}
            <div className="absolute -right-6 bottom-32 z-20 hidden md:flex items-center gap-3 p-4 rounded-xl bg-background-dark border border-primary/30 shadow-xl shadow-primary/5">
              <div className="flex -space-x-3">
                <div className="size-8 rounded-full bg-[#395650] flex items-center justify-center border border-background-dark text-white text-[10px] font-bold">
                  JV
                </div>
                <div className="size-8 rounded-full bg-[#2a4540] flex items-center justify-center border border-background-dark text-white text-[10px] font-bold">
                  SB
                </div>
                <div className="size-8 rounded-full bg-[#1b3831] flex items-center justify-center border border-background-dark text-white text-[10px] font-bold">
                  KF
                </div>
              </div>
              <div>
                <p className="text-white text-xs font-bold">Core Stack</p>
                <p className="text-primary text-[10px]">Production Ready</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="mt-20">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </div>
      </div>
    </div>
  );
}
