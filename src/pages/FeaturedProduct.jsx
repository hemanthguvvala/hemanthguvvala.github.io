export default function FeaturedProduct() {
  return (
    <div className="page-container py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-sm font-mono text-primary uppercase tracking-wider">// Spotlight</span>
          <h1 className="text-5xl md:text-7xl font-bold mt-4 mb-6">
            Featured <span className="text-primary">Product</span>
          </h1>
        </div>

        <div className="max-w-4xl mx-auto bg-surface-dark p-12 rounded-2xl border border-primary/30">
          <h2 className="text-4xl font-bold mb-6 text-white">Distributed Event Bus</h2>
          <p className="text-xl text-slate-300 leading-relaxed mb-8">
            A high-performance, scalable messaging system designed to handle millions of events per second 
            with guaranteed delivery and fault tolerance.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 bg-surface-light rounded-xl">
              <div className="text-4xl font-bold text-primary mb-2">10M+</div>
              <div className="text-sm text-slate-400">Events/sec</div>
            </div>
            <div className="text-center p-6 bg-surface-light rounded-xl">
              <div className="text-4xl font-bold text-accent mb-2">99.99%</div>
              <div className="text-sm text-slate-400">Uptime</div>
            </div>
            <div className="text-center p-6 bg-surface-light rounded-xl">
              <div className="text-4xl font-bold text-primary mb-2">&lt;50ms</div>
              <div className="text-sm text-slate-400">Latency</div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">Key Features</h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Horizontal scalability with auto-sharding
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Dead letter queue for failed messages
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Built-in monitoring and alerting
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
