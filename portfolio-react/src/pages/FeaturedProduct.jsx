import { motion } from 'framer-motion';

export default function FeaturedProduct() {
  return (
    <div className="page-container py-12 lg:py-24 px-4 sm:px-8">
      <div className="max-w-[1280px] w-full mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 px-4 opacity-70">
          <span className="text-primary text-sm font-bold tracking-widest uppercase font-display">Featured Work</span>
          <div className="h-[1px] w-12 bg-border-dark"></div>
          <span className="text-text-secondary text-sm">Case Study 01</span>
        </div>

        {/* Split Layout */}
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-center">
          {/* Left: Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative group order-2 lg:order-1"
          >
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/20 blur-[100px] rounded-full opacity-60"></div>
            <div className="absolute top-10 right-10 w-32 h-32 bg-blue-500/20 blur-[60px] rounded-full"></div>

            {/* Phone Frame */}
            <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[380px] transform transition-transform duration-700 hover:scale-[1.02] hover:-rotate-1">
              <div className="relative z-10 bg-[#0f1413] border-[6px] border-[#2a302e] rounded-[3rem] overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] aspect-[9/19]">
                {/* Dynamic Island */}
                <div className="absolute top-0 w-full h-8 bg-black z-20 flex justify-center pt-2">
                  <div className="w-24 h-6 bg-[#1a1a1a] rounded-full"></div>
                </div>

                {/* Screen Content */}
                <div className="w-full h-full bg-surface-dark flex flex-col relative overflow-hidden">
                  {/* App Header */}
                  <div className="pt-12 px-6 pb-4 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent">
                    <div className="flex flex-col">
                      <span className="text-text-secondary text-xs uppercase tracking-wider">Total Balance</span>
                      <span className="text-white font-display text-2xl font-bold">$124,592.00</span>
                    </div>
                    <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-sm">notifications</span>
                    </div>
                  </div>

                  {/* Chart Visual */}
                  <div className="h-48 px-4 w-full mt-4">
                    <div className="w-full h-full bg-gradient-to-t from-primary/10 to-transparent rounded-xl border border-white/5 relative overflow-hidden">
                      <svg className="absolute bottom-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 50">
                        <defs>
                          <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#00c29e" />
                            <stop offset="100%" stopColor="transparent" />
                          </linearGradient>
                        </defs>
                        <path d="M0 50 L10 40 L20 45 L30 30 L40 35 L60 10 L80 15 L100 0 V50 H0 Z" fill="url(#chartGradient)" opacity="0.4" />
                        <path d="M0 50 L10 40 L20 45 L30 30 L40 35 L60 10 L80 15 L100 0" fill="none" stroke="#00c29e" strokeWidth="2" />
                      </svg>
                    </div>
                  </div>

                  {/* List Items */}
                  <div className="mt-6 px-4 space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
                          <span className="material-symbols-outlined text-lg">swap_horiz</span>
                        </div>
                        <div>
                          <div className="text-white text-sm font-medium">Transfer Sent</div>
                          <div className="text-text-secondary text-xs">To external wallet</div>
                        </div>
                      </div>
                      <span className="text-white font-mono text-sm">- 0.45 BTC</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                          <span className="material-symbols-outlined text-lg">arrow_downward</span>
                        </div>
                        <div>
                          <div className="text-white text-sm font-medium">Deposit Received</div>
                          <div className="text-text-secondary text-xs">From Exchange</div>
                        </div>
                      </div>
                      <span className="text-primary font-mono text-sm">+ 12.00 ETH</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 opacity-50">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center">
                          <span className="material-symbols-outlined text-lg">grid_view</span>
                        </div>
                        <div>
                          <div className="text-white text-sm font-medium">NFT Minted</div>
                          <div className="text-text-secondary text-xs">Nebula Collection</div>
                        </div>
                      </div>
                      <span className="text-white font-mono text-sm">#4021</span>
                    </div>
                  </div>

                  {/* Bottom Tab Bar */}
                  <div className="absolute bottom-0 w-full h-20 bg-[#0f1413]/90 backdrop-blur flex justify-around items-center px-2 pb-4">
                    <div className="p-2 text-primary"><span className="material-symbols-outlined">home</span></div>
                    <div className="p-2 text-gray-500"><span className="material-symbols-outlined">account_balance_wallet</span></div>
                    <div className="size-12 rounded-full bg-primary flex items-center justify-center text-black -mt-6 shadow-lg shadow-primary/40">
                      <span className="material-symbols-outlined">add</span>
                    </div>
                    <div className="p-2 text-gray-500"><span className="material-symbols-outlined">insert_chart</span></div>
                    <div className="p-2 text-gray-500"><span className="material-symbols-outlined">person</span></div>
                  </div>
                </div>
              </div>
              {/* Reflection */}
              <div className="absolute -bottom-12 left-4 right-4 h-12 bg-black/40 blur-xl rounded-full scale-90 opacity-40"></div>
            </div>
          </motion.div>

          {/* Right: Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-8 order-1 lg:order-2"
          >
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-dark border border-border-dark mb-4">
                <span className="size-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-xs text-text-secondary font-medium tracking-wide">LIVE PRODUCTION v2.4</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-[1.1] mb-2 tracking-tight">
                Project: Nebula
              </h1>
              <h2 className="text-xl md:text-2xl font-display text-text-secondary font-medium tracking-tight">
                High-Throughput Transaction Engine
              </h2>
            </div>

            {/* Problem / Solution Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="group flex flex-col gap-3 rounded-2xl border border-[#395650]/50 bg-surface-dark p-5 hover:border-primary/30 transition-colors">
                <div className="size-10 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center border border-red-500/20">
                  <span className="material-symbols-outlined">warning</span>
                </div>
                <div>
                  <h3 className="text-white text-base font-bold font-display mb-1 group-hover:text-red-400 transition-colors">The Challenge</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">Legacy systems suffered from race conditions and data locks, failing to scale beyond 200 concurrent users.</p>
                </div>
              </div>
              <div className="group flex flex-col gap-3 rounded-2xl border border-[#395650]/50 bg-surface-dark p-5 hover:border-primary/30 transition-colors relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-10">
                  <span className="material-symbols-outlined text-6xl text-primary">bolt</span>
                </div>
                <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center border border-primary/20 relative z-10">
                  <span className="material-symbols-outlined">check_circle</span>
                </div>
                <div className="relative z-10">
                  <h3 className="text-white text-base font-bold font-display mb-1 group-hover:text-primary transition-colors">The Solution</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">Designed an event-driven architecture handling 10k TPS with &lt;50ms latency using optimistic locking.</p>
                </div>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-col gap-4 py-4 border-y border-border-dark border-dashed">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-text-secondary text-lg">code</span>
                <span className="text-white font-bold font-display text-sm tracking-wider uppercase">Tech Stack</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Go (Golang)', 'gRPC', 'Apache Kafka', 'Redis Cluster', 'Docker', 'PostgreSQL'].map((tech) => (
                  <span key={tech} className="inline-flex items-center px-3 py-1.5 rounded-lg bg-surface-dark border border-[#395650] text-sm text-text-secondary font-medium font-display hover:text-white hover:border-primary/50 cursor-default transition-all">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Feature List */}
            <div className="space-y-3">
              {[
                { title: 'Real-time Fraud Detection:', desc: 'ML pipeline analyzing transaction patterns in under 100ms.' },
                { title: 'Zero-Downtime Deployment:', desc: 'Blue/Green deployment strategy using Kubernetes.' },
                { title: 'Ledger Immutability:', desc: 'Append-only logs ensuring 100% financial auditability.' },
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary mt-0.5">verified</span>
                  <p className="text-text-secondary text-sm">
                    <strong className="text-white block sm:inline">{feature.title}</strong> {feature.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Actions */}
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <button className="flex items-center justify-center gap-2 rounded-xl h-12 px-8 bg-primary text-background-dark text-base font-bold font-display hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,194,158,0.2)]">
                <span>Launch Live Demo</span>
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
              <a href="#" className="flex items-center justify-center gap-2 rounded-xl h-12 px-6 border border-border-dark text-white text-base font-medium font-display hover:bg-surface-dark hover:border-primary/50 transition-colors">
                <span className="material-symbols-outlined text-lg">code</span>
                <span>View Repository</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
